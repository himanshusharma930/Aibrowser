import { ipcMain } from 'electron';
import { Log } from '@jarvis-agent/core';
import { agentContextManager } from '../services/agent-context-manager';

/**
 * Phase 2: Agent Context Manager IPC Handlers
 * Provides IPC endpoints for multi-agent state coordination
 *
 * Handlers:
 * - agent-context:save-state - Save agent state to context
 * - agent-context:get-state - Retrieve agent state
 * - agent-context:transfer-context - Transfer context between agents (handoff)
 * - agent-context:set-global-var - Set global variable accessible to all agents
 * - agent-context:get-global-var - Get global variable
 * - agent-context:get-agent-variables - Get merged variables (global + agent-specific)
 * - agent-context:get-transfer-history - Get context transfer audit trail
 * - agent-context:get-all-states - Get all agent states snapshot
 * - agent-context:export-context - Export context for persistence
 * - agent-context:import-context - Import context from persistence
 */

export function setupAgentContextHandlers() {
  /**
   * Save agent state to window context
   */
  ipcMain.handle(
    'agent-context:save-state',
    async (
      _,
      windowId: number,
      agentName: string,
      variables: Record<string, any>,
      sessionState?: any
    ) => {
      try {
        const agentState = await agentContextManager.saveAgentState(
          windowId,
          agentName,
          variables,
          sessionState
        );
        Log.info(`[IPC] Saved agent state for ${agentName} in window ${windowId}`);
        return { success: true, agentState };
      } catch (error: any) {
        Log.error('[IPC] Error saving agent state:', error);
        return { success: false, error: error.message };
      }
    }
  );

  /**
   * Get agent state from window context
   */
  ipcMain.handle('agent-context:get-state', async (_, windowId: number, agentName: string) => {
    try {
      const agentState = await agentContextManager.getAgentState(windowId, agentName);
      if (!agentState) {
        return { success: true, agentState: null };
      }
      Log.info(`[IPC] Retrieved agent state for ${agentName} in window ${windowId}`);
      return { success: true, agentState };
    } catch (error: any) {
      Log.error('[IPC] Error retrieving agent state:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Transfer context between agents (handoff pattern)
   */
  ipcMain.handle(
    'agent-context:transfer-context',
    async (
      _,
      windowId: number,
      fromAgent: string,
      toAgent: string,
      contextData: Record<string, any>,
      reason?: string
    ) => {
      try {
        const transfer = await agentContextManager.transferContext(
          windowId,
          fromAgent,
          toAgent,
          contextData,
          reason
        );
        Log.info(
          `[IPC] Transferred context from ${fromAgent} to ${toAgent} in window ${windowId}. Reason: ${reason || 'N/A'}`
        );
        return { success: true, transfer };
      } catch (error: any) {
        Log.error('[IPC] Error transferring context:', error);
        return { success: false, error: error.message };
      }
    }
  );

  /**
   * Set global variable accessible to all agents in window
   */
  ipcMain.handle(
    'agent-context:set-global-var',
    async (_, windowId: number, key: string, value: any) => {
      try {
        await agentContextManager.setGlobalVariable(windowId, key, value);
        Log.info(`[IPC] Set global variable '${key}' in window ${windowId}`);
        return { success: true };
      } catch (error: any) {
        Log.error('[IPC] Error setting global variable:', error);
        return { success: false, error: error.message };
      }
    }
  );

  /**
   * Get global variable
   */
  ipcMain.handle('agent-context:get-global-var', async (_, windowId: number, key: string) => {
    try {
      const value = await agentContextManager.getGlobalVariable(windowId, key);
      Log.info(`[IPC] Retrieved global variable '${key}' from window ${windowId}`);
      return { success: true, value };
    } catch (error: any) {
      Log.error('[IPC] Error retrieving global variable:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Get all variables accessible to an agent (merged global + agent-specific)
   */
  ipcMain.handle(
    'agent-context:get-agent-variables',
    async (_, windowId: number, agentName: string) => {
      try {
        const variables = await agentContextManager.getAgentVariables(windowId, agentName);
        Log.info(`[IPC] Retrieved merged variables for ${agentName} in window ${windowId}`);
        return { success: true, variables };
      } catch (error: any) {
        Log.error('[IPC] Error retrieving agent variables:', error);
        return { success: false, error: error.message };
      }
    }
  );

  /**
   * Get context transfer history
   */
  ipcMain.handle(
    'agent-context:get-transfer-history',
    async (_, windowId: number, fromAgent?: string, toAgent?: string) => {
      try {
        const history = await agentContextManager.getContextTransferHistory(
          windowId,
          fromAgent,
          toAgent
        );
        Log.info(`[IPC] Retrieved context transfer history for window ${windowId}`);
        return { success: true, history };
      } catch (error: any) {
        Log.error('[IPC] Error retrieving context transfer history:', error);
        return { success: false, error: error.message };
      }
    }
  );

  /**
   * Get snapshot of all agent states in window
   */
  ipcMain.handle('agent-context:get-all-states', async (_, windowId: number) => {
    try {
      const allStates = await agentContextManager.getAllAgentStates(windowId);
      // Convert Map to serializable object
      const statesObject = Object.fromEntries(allStates);
      Log.info(`[IPC] Retrieved all agent states for window ${windowId}`);
      return { success: true, states: statesObject };
    } catch (error: any) {
      Log.error('[IPC] Error retrieving all agent states:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Export context for persistence or debugging
   */
  ipcMain.handle('agent-context:export-context', async (_, windowId: number) => {
    try {
      const exportedContext = await agentContextManager.exportContext(windowId);
      if (!exportedContext) {
        return { success: true, context: null };
      }
      Log.info(`[IPC] Exported context for window ${windowId}`);
      return { success: true, context: exportedContext };
    } catch (error: any) {
      Log.error('[IPC] Error exporting context:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Import context from persistence
   */
  ipcMain.handle(
    'agent-context:import-context',
    async (_, windowId: number, data: Record<string, any>) => {
      try {
        const importedContext = await agentContextManager.importContext(windowId, data);
        Log.info(`[IPC] Imported context for window ${windowId}`);
        return { success: true, context: importedContext };
      } catch (error: any) {
        Log.error('[IPC] Error importing context:', error);
        return { success: false, error: error.message };
      }
    }
  );

  /**
   * Clear window context on task completion or window close
   */
  ipcMain.handle('agent-context:clear-context', async (_, windowId: number) => {
    try {
      await agentContextManager.clearWindowContext(windowId);
      Log.info(`[IPC] Cleared context for window ${windowId}`);
      return { success: true };
    } catch (error: any) {
      Log.error('[IPC] Error clearing context:', error);
      return { success: false, error: error.message };
    }
  });

  Log.info('[IPC] Agent Context Manager handlers registered (10 endpoints)');
}
