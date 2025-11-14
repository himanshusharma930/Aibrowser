import { v4 as uuidv4 } from 'uuid';
import type { Agent } from '@jarvis-agent/core';
// ✅ PHASE 2: Import centralized logging
import { createLogger } from "../utils/logger";
import { ErrorCategory, ErrorSeverity } from "../utils/error-handler";

/**
 * Agent Context Manager
 * Handles state sharing between multiple agents within a workflow
 * Enables agent handoff patterns and context preservation
 */

export interface AgentState {
  agentName: string;
  timestamp: number;
  variables: Record<string, any>;
  sessionState: {
    cookies?: string[];
    headers?: Record<string, string>;
    auth?: Record<string, any>;
  };
  lastToolResults?: Array<{
    toolName: string;
    params: Record<string, any>;
    result: any;
    timestamp: number;
  }>;
}

export interface ContextTransfer {
  fromAgent: string;
  toAgent: string;
  timestamp: number;
  context: Record<string, any>;
  variables: Record<string, any>;
  handoffReason?: string;
}

export interface WindowContext {
  windowId: number;
  contextId: string;
  createdAt: number;
  updatedAt: number;
  globalVariables: Record<string, any>;
  agentStates: Map<string, AgentState>;
  contextTransfers: ContextTransfer[];
  isActive: boolean;
}

/**
 * Manages agent context across multiple agents
 * Supports:
 * - Per-window context isolation
 * - Agent state sharing within window
 * - Agent handoff with explicit context transfer
 * - Context compression and cleanup
 */
export class AgentContextManager {
  private windowContexts: Map<number, WindowContext> = new Map();
  private contextCache: Map<string, WindowContext> = new Map();
  private readonly MAX_CONTEXT_SIZE = 50 * 1024 * 1024; // 50MB per window
  private readonly MAX_CONTEXT_AGE = 24 * 60 * 60 * 1000; // 24 hours
  // ✅ PHASE 2: Add logger instance
  private logger = createLogger('AgentContextManager');

  /**
   * Initialize context for a window
   */
  async initializeWindowContext(windowId: number): Promise<WindowContext> {
    if (this.windowContexts.has(windowId)) {
      const context = this.windowContexts.get(windowId)!;
      context.updatedAt = Date.now();
      // ✅ PHASE 2: Log context reuse
      this.logger.debug('Reusing existing window context', { windowId });
      return context;
    }

    const contextId = `ctx_${windowId}_${uuidv4()}`;
    const context: WindowContext = {
      windowId,
      contextId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      globalVariables: {},
      agentStates: new Map(),
      contextTransfers: [],
      isActive: true,
    };

    this.windowContexts.set(windowId, context);
    this.contextCache.set(contextId, context);

    // ✅ PHASE 2: Log context initialization
    this.logger.info('Window context initialized', { windowId, contextId });

    return context;
  }

  /**
   * Save agent state to window context
   */
  async saveAgentState(
    windowId: number,
    agentName: string,
    variables: Record<string, any>,
    sessionState?: any,
    toolResults?: any[]
  ): Promise<AgentState> {
    const context = await this.ensureWindowContext(windowId);

    const agentState: AgentState = {
      agentName,
      timestamp: Date.now(),
      variables,
      sessionState: sessionState || {},
      lastToolResults: toolResults || [],
    };

    context.agentStates.set(agentName, agentState);
    context.updatedAt = Date.now();

    // ✅ PHASE 2: Log agent state update
    this.logger.debug('Agent state saved', {
      windowId,
      agentName,
      variableCount: Object.keys(variables).length,
      toolResultCount: toolResults?.length || 0
    });

    // Cleanup if context gets too large
    if (this.getContextSize(context) > this.MAX_CONTEXT_SIZE) {
      this.logger.warn('Context size exceeded, compressing', {
        windowId,
        currentSize: this.getContextSize(context),
        maxSize: this.MAX_CONTEXT_SIZE
      });
      await this.compressContext(context);
    }

    return agentState;
  }

  /**
   * Get agent state from window context
   */
  async getAgentState(windowId: number, agentName: string): Promise<AgentState | null> {
    const context = this.windowContexts.get(windowId);
    if (!context) return null;

    return context.agentStates.get(agentName) || null;
  }

  /**
   * Transfer context between agents (handoff)
   */
  async transferContext(
    windowId: number,
    fromAgent: string,
    toAgent: string,
    contextData: Record<string, any>,
    reason?: string
  ): Promise<ContextTransfer> {
    const context = await this.ensureWindowContext(windowId);

    const transfer: ContextTransfer = {
      fromAgent,
      toAgent,
      timestamp: Date.now(),
      context: contextData,
      variables: context.globalVariables,
      handoffReason: reason,
    };

    context.contextTransfers.push(transfer);
    context.updatedAt = Date.now();

    // Update target agent's state if it exists
    const toAgentState = context.agentStates.get(toAgent);
    if (toAgentState) {
      toAgentState.variables = {
        ...toAgentState.variables,
        ...contextData,
      };
      toAgentState.timestamp = Date.now();
    }

    // ✅ PHASE 2: Log agent handoff
    this.logger.info('Agent context transferred (handoff)', {
      windowId,
      fromAgent,
      toAgent,
      reason: reason || 'not specified',
      dataSize: JSON.stringify(contextData).length
    });

    return transfer;
  }

  /**
   * Set global variable (accessible to all agents in window)
   */
  async setGlobalVariable(windowId: number, key: string, value: any): Promise<void> {
    const context = await this.ensureWindowContext(windowId);
    context.globalVariables[key] = value;
    context.updatedAt = Date.now();
  }

  /**
   * Get global variable
   */
  async getGlobalVariable(windowId: number, key: string): Promise<any> {
    const context = this.windowContexts.get(windowId);
    if (!context) return undefined;

    return context.globalVariables[key];
  }

  /**
   * Get all variables accessible to an agent (merged global + agent-specific)
   */
  async getAgentVariables(windowId: number, agentName: string): Promise<Record<string, any>> {
    const context = this.windowContexts.get(windowId);
    if (!context) return {};

    const agentState = context.agentStates.get(agentName);
    return {
      ...context.globalVariables,
      ...(agentState?.variables || {}),
    };
  }

  /**
   * Get context transfer history
   */
  async getContextTransferHistory(
    windowId: number,
    fromAgent?: string,
    toAgent?: string
  ): Promise<ContextTransfer[]> {
    const context = this.windowContexts.get(windowId);
    if (!context) return [];

    return context.contextTransfers.filter(ct => {
      if (fromAgent && ct.fromAgent !== fromAgent) return false;
      if (toAgent && ct.toAgent !== toAgent) return false;
      return true;
    });
  }

  /**
   * Get all agent states in window
   */
  async getAllAgentStates(windowId: number): Promise<Map<string, AgentState>> {
    const context = this.windowContexts.get(windowId);
    if (!context) return new Map();

    return new Map(context.agentStates);
  }

  /**
   * Clear context when task completes or window closes
   */
  async clearWindowContext(windowId: number): Promise<void> {
    const context = this.windowContexts.get(windowId);
    if (!context) {
      // ✅ PHASE 2: Log context not found
      this.logger.debug('No context found to clear', { windowId });
      return;
    }

    context.isActive = false;
    context.agentStates.clear();
    context.contextTransfers = [];

    this.windowContexts.delete(windowId);
    this.contextCache.delete(context.contextId);

    // ✅ PHASE 2: Log context cleanup
    this.logger.info('Window context cleared', { windowId, contextId: context.contextId });
  }

  /**
   * Compress context to reduce memory usage
   * Removes old transfers and redundant data
   */
  private async compressContext(context: WindowContext): Promise<void> {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    const transfersBeforeCount = context.contextTransfers.length;

    // Keep only recent transfers (last hour)
    context.contextTransfers = context.contextTransfers.filter(
      ct => now - ct.timestamp < oneHour
    );

    // Compress agent states (keep only essential data)
    for (const [, agentState] of context.agentStates) {
      // Keep only last 3 tool results
      if (agentState.lastToolResults && agentState.lastToolResults.length > 3) {
        agentState.lastToolResults = agentState.lastToolResults.slice(-3);
      }

      // Remove large objects
      for (const key in agentState.variables) {
        const value = agentState.variables[key];
        if (typeof value === 'object' && JSON.stringify(value).length > 10000) {
          delete agentState.variables[key];
        }
      }
    }

    context.updatedAt = Date.now();

    // ✅ PHASE 2: Log context compression
    this.logger.info('Agent context compressed', {
      windowId: context.windowId,
      transfersPruned: transfersBeforeCount - context.contextTransfers.length,
      newSize: this.getContextSize(context)
    });
  }

  /**
   * Get estimated size of context in bytes
   */
  private getContextSize(context: WindowContext): number {
    try {
      const json = JSON.stringify({
        globalVariables: context.globalVariables,
        agentStates: Array.from(context.agentStates.values()),
        contextTransfers: context.contextTransfers,
      });
      return json.length;
    } catch {
      return 0;
    }
  }

  /**
   * Get or initialize window context
   */
  private async ensureWindowContext(windowId: number): Promise<WindowContext> {
    if (this.windowContexts.has(windowId)) {
      return this.windowContexts.get(windowId)!;
    }
    return this.initializeWindowContext(windowId);
  }

  /**
   * Cleanup old contexts (background task)
   */
  async cleanupOldContexts(): Promise<void> {
    const now = Date.now();
    const toDelete: number[] = [];

    for (const [windowId, context] of this.windowContexts) {
      if (now - context.updatedAt > this.MAX_CONTEXT_AGE || !context.isActive) {
        toDelete.push(windowId);
      }
    }

    if (toDelete.length > 0) {
      // ✅ PHASE 2: Log periodic cleanup
      this.logger.debug('Cleaning up old contexts', {
        windowsToClean: toDelete.length,
        totalContexts: this.windowContexts.size
      });
    }

    for (const windowId of toDelete) {
      await this.clearWindowContext(windowId);
    }
  }

  /**
   * Get all active window contexts (for monitoring)
   */
  getActiveContexts(): WindowContext[] {
    return Array.from(this.windowContexts.values()).filter(ctx => ctx.isActive);
  }

  /**
   * Export context for persistence or debugging
   */
  async exportContext(windowId: number): Promise<Record<string, any> | null> {
    const context = this.windowContexts.get(windowId);
    if (!context) return null;

    return {
      contextId: context.contextId,
      windowId: context.windowId,
      createdAt: context.createdAt,
      updatedAt: context.updatedAt,
      globalVariables: context.globalVariables,
      agentStates: Array.from(context.agentStates.entries()).map(([name, state]) => ({
        agent: name,
        ...state,
      })),
      contextTransfers: context.contextTransfers,
    };
  }

  /**
   * Import context from persistence
   */
  async importContext(windowId: number, data: Record<string, any>): Promise<WindowContext> {
    const context = await this.initializeWindowContext(windowId);

    context.globalVariables = data.globalVariables || {};

    if (data.agentStates && Array.isArray(data.agentStates)) {
      for (const agentData of data.agentStates) {
        const { agent, ...state } = agentData;
        context.agentStates.set(agent, state as AgentState);
      }
    }

    if (data.contextTransfers && Array.isArray(data.contextTransfers)) {
      context.contextTransfers = data.contextTransfers;
    }

    return context;
  }
}

// Singleton instance
export const agentContextManager = new AgentContextManager();

// Periodic cleanup task
setInterval(() => {
  agentContextManager.cleanupOldContexts().catch(err => {
    // ✅ PHASE 2: Use logger for background task errors
    const logger = createLogger('AgentContextManager.Cleanup');
    logger.error(
      'Error cleaning up old contexts',
      err as Error,
      {},
      ErrorCategory.STORAGE,
      ErrorSeverity.MEDIUM,
      true // recoverable - will retry next hour
    );
  });
}, 60 * 60 * 1000); // Every hour
