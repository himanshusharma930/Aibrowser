import { ipcMain } from 'electron';
import { Log } from '@jarvis-agent/core';
import { agentContextManager } from '../services/agent-context-manager';
import { z } from 'zod';
// ✅ SECURITY FIX: Import validation middleware and schemas
import { validateIpc, validateIpcArgs } from './validation-middleware';
import {
  SaveAgentStateSchema,
  GetAgentStateSchema,
  SetGlobalVarSchema,
  GetGlobalVarSchema
} from '../../../src/types/ipc-contracts';

/**
 * Phase 2: Agent Context Manager IPC Handlers
 * Provides IPC endpoints for multi-agent state coordination
 * ✅ SECURITY FIX: All handlers now validate input
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
   * Save agent state to window context - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:save-state',
    validateIpc(SaveAgentStateSchema)(
      async (_, data) => {
        try {
          const agentState = await agentContextManager.saveAgentState(
            data.windowId,
            data.agentName,
            data.variables,
            data.sessionState
          );
          Log.info(`[IPC] Saved agent state for ${data.agentName} in window ${data.windowId}`);
          return { success: true, agentState };
        } catch (error: any) {
          Log.error('[IPC] Error saving agent state:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Get agent state from window context - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:get-state',
    validateIpc(GetAgentStateSchema)(
      async (_, data) => {
        try {
          const agentState = await agentContextManager.getAgentState(data.windowId, data.agentName);
          if (!agentState) {
            return { success: true, agentState: null };
          }
          Log.info(`[IPC] Retrieved agent state for ${data.agentName} in window ${data.windowId}`);
          return { success: true, agentState };
        } catch (error: any) {
          Log.error('[IPC] Error retrieving agent state:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Transfer context between agents (handoff pattern) - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:transfer-context',
    validateIpcArgs([
      z.number().int().min(0),  // windowId
      z.string().min(1).max(100),  // fromAgent
      z.string().min(1).max(100),  // toAgent
      z.record(z.string(), z.unknown()),  // contextData
      z.string().optional()  // reason
    ])(
      async (_, windowId, fromAgent, toAgent, contextData, reason) => {
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
    )
  );

  /**
   * Set global variable accessible to all agents in window - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:set-global-var',
    validateIpcArgs([
      z.number().int().min(0),  // windowId
      z.string().min(1).max(100),  // key
      z.unknown()  // value
    ])(
      async (_, windowId, key, value) => {
        try {
          await agentContextManager.setGlobalVariable(windowId, key, value);
          Log.info(`[IPC] Set global variable '${key}' in window ${windowId}`);
          return { success: true };
        } catch (error: any) {
          Log.error('[IPC] Error setting global variable:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Get global variable - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:get-global-var',
    validateIpcArgs([
      z.number().int().min(0),  // windowId
      z.string().min(1).max(100)  // key
    ])(
      async (_, windowId, key) => {
        try {
          const value = await agentContextManager.getGlobalVariable(windowId, key);
          Log.info(`[IPC] Retrieved global variable '${key}' from window ${windowId}`);
          return { success: true, value };
        } catch (error: any) {
          Log.error('[IPC] Error retrieving global variable:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Get all variables accessible to an agent (merged global + agent-specific) - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:get-agent-variables',
    validateIpcArgs([
      z.number().int().min(0),  // windowId
      z.string().min(1).max(100)  // agentName
    ])(
      async (_, windowId, agentName) => {
        try {
          const variables = await agentContextManager.getAgentVariables(windowId, agentName);
          Log.info(`[IPC] Retrieved merged variables for ${agentName} in window ${windowId}`);
          return { success: true, variables };
        } catch (error: any) {
          Log.error('[IPC] Error retrieving agent variables:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Get context transfer history - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:get-transfer-history',
    validateIpcArgs([
      z.number().int().min(0),  // windowId
      z.string().min(1).max(100).optional(),  // fromAgent
      z.string().min(1).max(100).optional()  // toAgent
    ])(
      async (_, windowId, fromAgent, toAgent) => {
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
    )
  );

  /**
   * Get snapshot of all agent states in window - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:get-all-states',
    validateIpcArgs([
      z.number().int().min(0)  // windowId
    ])(
      async (_, windowId) => {
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
      }
    )
  );

  /**
   * Export context for persistence or debugging - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:export-context',
    validateIpcArgs([
      z.number().int().min(0)  // windowId
    ])(
      async (_, windowId) => {
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
      }
    )
  );

  /**
   * Import context from persistence - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:import-context',
    validateIpcArgs([
      z.number().int().min(0),  // windowId
      z.record(z.string(), z.unknown())  // data
    ])(
      async (_, windowId, data) => {
        try {
          const importedContext = await agentContextManager.importContext(windowId, data);
          Log.info(`[IPC] Imported context for window ${windowId}`);
          return { success: true, context: importedContext };
        } catch (error: any) {
          Log.error('[IPC] Error importing context:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Clear window context on task completion or window close - ✅ VALIDATED
   */
  ipcMain.handle(
    'agent-context:clear-context',
    validateIpcArgs([
      z.number().int().min(0)  // windowId
    ])(
      async (_, windowId) => {
        try {
          await agentContextManager.clearWindowContext(windowId);
          Log.info(`[IPC] Cleared context for window ${windowId}`);
          return { success: true };
        } catch (error: any) {
          Log.error('[IPC] Error clearing context:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  Log.info('[IPC] Agent Context Manager handlers registered (10 endpoints)');
}
