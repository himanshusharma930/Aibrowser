/**
 * Phase 2: Agent Context Manager
 * Manages multi-agent state coordination and context transfer for browser windows
 *
 * Key Features:
 * - Per-window context isolation (prevents cross-window state leakage)
 * - Multi-agent state tracking with variables and session state
 * - Context transfer (handoff) between agents with audit trail
 * - Global variables accessible to all agents in a window
 * - Memory management with compression and cleanup
 * - Export/import for persistence and debugging
 */

export interface AgentState {
  agentName: string;
  timestamp: number;
  variables: Record<string, any>;
  sessionState?: {
    cookies?: string[];
    headers?: Record<string, string>;
    auth?: Record<string, any>;
  };
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
  isActive: boolean;
  globalVariables: Record<string, any>;
  agentStates: Map<string, AgentState>;
  contextTransfers: ContextTransfer[];
}

export interface ExportedContext {
  windowId: number;
  contextId: string;
  createdAt: number;
  updatedAt: number;
  globalVariables: Record<string, any>;
  agentStates: Record<string, AgentState>;
  contextTransfers: ContextTransfer[];
}

class AgentContextManagerService {
  private contexts: Map<number, WindowContext> = new Map();
  private readonly MAX_CONTEXT_SIZE = 50 * 1024 * 1024; // 50MB per window
  private readonly CONTEXT_TTL = 24 * 60 * 60 * 1000; // 24 hours
  private readonly MAX_TRANSFERS_PER_WINDOW = 1000;

  /**
   * Initialize context for a window
   */
  async initializeWindowContext(windowId: number): Promise<WindowContext> {
    // Return existing context if already initialized
    if (this.contexts.has(windowId)) {
      const context = this.contexts.get(windowId)!;
      context.updatedAt = Date.now();
      return context;
    }

    const context: WindowContext = {
      windowId,
      contextId: `ctx_${windowId}_${Date.now()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      globalVariables: {},
      agentStates: new Map(),
      contextTransfers: [],
    };

    this.contexts.set(windowId, context);
    return context;
  }

  /**
   * Save agent state to window context
   */
  async saveAgentState(
    windowId: number,
    agentName: string,
    variables: Record<string, any>,
    sessionState?: any
  ): Promise<AgentState> {
    let context = this.contexts.get(windowId);
    if (!context) {
      context = await this.initializeWindowContext(windowId);
    }

    const agentState: AgentState = {
      agentName,
      timestamp: Date.now(),
      variables,
      sessionState,
    };

    context.agentStates.set(agentName, agentState);
    context.updatedAt = Date.now();

    // Check if compression is needed
    await this.compressContextIfNeeded(windowId);

    return agentState;
  }

  /**
   * Get agent state from window context
   */
  async getAgentState(windowId: number, agentName: string): Promise<AgentState | null> {
    const context = this.contexts.get(windowId);
    if (!context) {
      return null;
    }

    const agentState = context.agentStates.get(agentName);
    return agentState || null;
  }

  /**
   * Transfer context from one agent to another (handoff pattern)
   */
  async transferContext(
    windowId: number,
    fromAgent: string,
    toAgent: string,
    contextData: Record<string, any>,
    handoffReason?: string
  ): Promise<ContextTransfer> {
    let context = this.contexts.get(windowId);
    if (!context) {
      context = await this.initializeWindowContext(windowId);
    }

    const transfer: ContextTransfer = {
      fromAgent,
      toAgent,
      timestamp: Date.now(),
      context: contextData,
      variables: contextData,
      handoffReason,
    };

    context.contextTransfers.push(transfer);
    context.updatedAt = Date.now();

    // Merge transferred variables into target agent state
    const targetAgentState = context.agentStates.get(toAgent);
    if (targetAgentState) {
      targetAgentState.variables = {
        ...targetAgentState.variables,
        ...contextData,
      };
      targetAgentState.timestamp = Date.now();
    } else {
      // Create agent state if it doesn't exist
      await this.saveAgentState(windowId, toAgent, contextData, {});
    }

    // Limit history to prevent unbounded growth
    if (context.contextTransfers.length > this.MAX_TRANSFERS_PER_WINDOW) {
      context.contextTransfers = context.contextTransfers.slice(-this.MAX_TRANSFERS_PER_WINDOW);
    }

    return transfer;
  }

  /**
   * Set global variable accessible to all agents in window
   */
  async setGlobalVariable(windowId: number, key: string, value: any): Promise<void> {
    let context = this.contexts.get(windowId);
    if (!context) {
      context = await this.initializeWindowContext(windowId);
    }

    context.globalVariables[key] = value;
    context.updatedAt = Date.now();
  }

  /**
   * Get global variable
   */
  async getGlobalVariable(windowId: number, key: string): Promise<any> {
    const context = this.contexts.get(windowId);
    if (!context) {
      return undefined;
    }

    return context.globalVariables[key];
  }

  /**
   * Get merged variables (global + agent-specific)
   * Agent-specific variables override global variables
   */
  async getAgentVariables(windowId: number, agentName: string): Promise<Record<string, any>> {
    const context = this.contexts.get(windowId);
    if (!context) {
      return {};
    }

    const merged = {
      ...context.globalVariables,
    };

    const agentState = context.agentStates.get(agentName);
    if (agentState) {
      Object.assign(merged, agentState.variables);
    }

    return merged;
  }

  /**
   * Get context transfer history
   * Can be filtered by fromAgent and/or toAgent
   */
  async getContextTransferHistory(
    windowId: number,
    fromAgent?: string,
    toAgent?: string
  ): Promise<ContextTransfer[]> {
    const context = this.contexts.get(windowId);
    if (!context) {
      return [];
    }

    let history = context.contextTransfers;

    if (fromAgent && toAgent) {
      // Both filters: match both direction
      history = history.filter((t) => t.fromAgent === fromAgent && t.toAgent === toAgent);
    } else if (fromAgent) {
      // Only fromAgent filter
      history = history.filter((t) => t.fromAgent === fromAgent);
    } else if (toAgent) {
      // Only toAgent filter
      history = history.filter((t) => t.toAgent === toAgent);
    }

    return history;
  }

  /**
   * Get snapshot of all agent states in window
   */
  async getAllAgentStates(windowId: number): Promise<Map<string, AgentState>> {
    const context = this.contexts.get(windowId);
    if (!context) {
      return new Map();
    }

    return new Map(context.agentStates);
  }

  /**
   * Export context for persistence or debugging
   */
  async exportContext(windowId: number): Promise<ExportedContext | null> {
    const context = this.contexts.get(windowId);
    if (!context) {
      return null;
    }

    const agentStatesObject: Record<string, AgentState> = {};
    for (const [agentName, agentState] of Array.from(context.agentStates.entries())) {
      agentStatesObject[agentName] = agentState;
    }

    return {
      windowId: context.windowId,
      contextId: context.contextId,
      createdAt: context.createdAt,
      updatedAt: context.updatedAt,
      globalVariables: context.globalVariables,
      agentStates: agentStatesObject,
      contextTransfers: context.contextTransfers,
    };
  }

  /**
   * Import context from persistence
   */
  async importContext(windowId: number, data: any): Promise<WindowContext> {
    let context = this.contexts.get(windowId);
    if (!context) {
      context = await this.initializeWindowContext(windowId);
    }

    // Restore global variables
    if (data.globalVariables) {
      context.globalVariables = { ...data.globalVariables };
    }

    // Restore agent states
    if (data.agentStates && Array.isArray(data.agentStates)) {
      for (const agentState of data.agentStates) {
        context.agentStates.set(agentState.agentName, agentState);
      }
    }

    // Restore context transfers
    if (data.contextTransfers && Array.isArray(data.contextTransfers)) {
      context.contextTransfers = [...data.contextTransfers];
    }

    context.updatedAt = Date.now();
    return context;
  }

  /**
   * Clear window context
   */
  async clearWindowContext(windowId: number): Promise<void> {
    const context = this.contexts.get(windowId);
    if (context) {
      context.isActive = false;
      context.agentStates.clear();
      context.contextTransfers = [];
      context.globalVariables = {};
    }

    this.contexts.delete(windowId);
  }

  /**
   * Get all active contexts for monitoring
   */
  getActiveContexts(): WindowContext[] {
    const contexts: WindowContext[] = [];
    for (const context of Array.from(this.contexts.values())) {
      if (context.isActive) {
        contexts.push(context);
      }
    }
    return contexts;
  }

  /**
   * Clean up old contexts (older than TTL)
   */
  async cleanupOldContexts(): Promise<number> {
    const now = Date.now();
    const windowIdsToDelete: number[] = [];

    for (const [windowId, context] of Array.from(this.contexts.entries())) {
      if (now - context.updatedAt > this.CONTEXT_TTL) {
        windowIdsToDelete.push(windowId);
      }
    }

    for (const windowId of windowIdsToDelete) {
      this.contexts.delete(windowId);
    }

    return windowIdsToDelete.length;
  }

  /**
   * Compress context if it exceeds size limit
   */
  private async compressContextIfNeeded(windowId: number): Promise<void> {
    const context = this.contexts.get(windowId);
    if (!context) {
      return;
    }

    // Estimate size (simplified)
    const estimatedSize = JSON.stringify({
      globalVariables: context.globalVariables,
      agentStates: Array.from(context.agentStates.values()),
      contextTransfers: context.contextTransfers,
    }).length;

    if (estimatedSize > this.MAX_CONTEXT_SIZE) {
      // Remove old transfers first
      if (context.contextTransfers.length > 100) {
        context.contextTransfers = context.contextTransfers.slice(-100);
      }

      // Compress large variables
      for (const [, agentState] of context.agentStates) {
        for (const [key, value] of Object.entries(agentState.variables)) {
          const valueStr = JSON.stringify(value);
          if (valueStr.length > 100000) {
            // Remove large fields
            delete agentState.variables[key];
          }
        }
      }
    }
  }
}

// Export singleton instance
export const agentContextManager = new AgentContextManagerService();
export { AgentContextManagerService };
