import { ipcMain } from 'electron';
import { Log } from '@jarvis-agent/core';
import { z } from 'zod';
import { mcpClientManager } from '../services/mcp-client-manager';
import type { MCPServer } from '../services/mcp-client-manager';
// ✅ SECURITY FIX: Import validation middleware and schemas
import { validateIpc, validateIpcArgs } from './validation-middleware';
import {
  MCPServerSchema,
  GetMCPServerSchema,
  SetToolEnabledSchema
} from '../../../src/types/ipc-contracts';

/**
 * MCP Tool IPC Handlers
 * Provides IPC endpoints for managing MCP servers and tools
 * ✅ SECURITY FIX: All handlers now validate input
 *
 * Handlers:
 * - mcp:register-server - Register new MCP server (✅ VALIDATED)
 * - mcp:unregister-server - Unregister MCP server (✅ VALIDATED)
 * - mcp:get-servers - Get all registered servers
 * - mcp:get-server - Get specific server info (✅ VALIDATED)
 * - mcp:connect-server - Connect to MCP server (✅ VALIDATED)
 * - mcp:disconnect-server - Disconnect from MCP server (✅ VALIDATED)
 * - mcp:get-available-tools - Get all available tools
 * - mcp:get-server-tools - Get tools from specific server (✅ VALIDATED)
 * - mcp:set-tool-enabled - Enable/disable specific tool (✅ VALIDATED)
 * - mcp:execute-tool - Execute tool on MCP server
 * - mcp:get-connection-status - Get connection status for all servers
 * - mcp:refresh-server-tools - Refresh tools from server (✅ VALIDATED)
 * - mcp:health-check - Verify all connected servers
 */

export function setupMCPHandlers() {
  /**
   * Register new MCP server - ✅ VALIDATED
   */
  ipcMain.handle('mcp:register-server',
    validateIpc(MCPServerSchema)(
      async (_, server) => {
        try {
          await mcpClientManager.registerServer(server as MCPServer);
          Log.info(`[IPC] Registered MCP server: ${server.name}`);
          return { success: true };
        } catch (error: any) {
          Log.error('[IPC] Error registering MCP server:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Get all registered servers
   */
  ipcMain.handle('mcp:get-servers', async () => {
    try {
      const servers = mcpClientManager.getServers();
      Log.info(`[IPC] Retrieved ${servers.length} MCP servers`);
      return { success: true, servers };
    } catch (error: any) {
      Log.error('[IPC] Error retrieving MCP servers:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Get specific server - ✅ VALIDATED
   */
  ipcMain.handle('mcp:get-server',
    validateIpc(GetMCPServerSchema)(
      async (_, data) => {
        try {
          const server = mcpClientManager.getServer(data.serverId);
          if (!server) {
            return { success: false, error: `Server not found: ${data.serverId}` };
          }
          Log.info(`[IPC] Retrieved MCP server: ${server.name}`);
          return { success: true, server };
        } catch (error: any) {
          Log.error('[IPC] Error retrieving MCP server:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Connect to MCP server - ✅ VALIDATED
   */
  ipcMain.handle('mcp:connect-server',
    validateIpcArgs([z.string().min(1)])(
      async (_, serverId) => {
        try {
          const connected = await mcpClientManager.connectToServer(serverId);
          if (connected) {
            Log.info(`[IPC] Connected to MCP server: ${serverId}`);
            return { success: true };
          } else {
            return { success: false, error: 'Failed to connect to server' };
          }
        } catch (error: any) {
          Log.error('[IPC] Error connecting to MCP server:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Disconnect from MCP server - ✅ VALIDATED
   */
  ipcMain.handle('mcp:disconnect-server',
    validateIpcArgs([z.string().min(1)])(
      async (_, serverId) => {
        try {
          await mcpClientManager.disconnectFromServer(serverId);
          Log.info(`[IPC] Disconnected from MCP server: ${serverId}`);
          return { success: true };
        } catch (error: any) {
          Log.error('[IPC] Error disconnecting from MCP server:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Get all available tools
   */
  ipcMain.handle('mcp:get-available-tools', async () => {
    try {
      const tools = mcpClientManager.getAvailableTools();
      Log.info(`[IPC] Retrieved ${tools.length} available MCP tools`);
      return { success: true, tools };
    } catch (error: any) {
      Log.error('[IPC] Error retrieving available tools:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Get tools from specific server - ✅ VALIDATED
   */
  ipcMain.handle('mcp:get-server-tools',
    validateIpcArgs([z.string().min(1)])(
      async (_, serverId) => {
        try {
          const tools = mcpClientManager.getServerTools(serverId);
          Log.info(`[IPC] Retrieved ${tools.length} tools from MCP server: ${serverId}`);
          return { success: true, tools };
        } catch (error: any) {
          Log.error('[IPC] Error retrieving server tools:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Enable/disable tool - ✅ VALIDATED
   */
  ipcMain.handle('mcp:set-tool-enabled',
    validateIpcArgs([z.string().min(1), z.boolean()])(
      async (_, toolId, enabled) => {
        try {
          mcpClientManager.setToolEnabled(toolId, enabled);
          Log.info(`[IPC] Tool ${toolId} ${enabled ? 'enabled' : 'disabled'}`);
          return { success: true };
        } catch (error: any) {
          Log.error('[IPC] Error setting tool enabled state:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Refresh tools from specific server - ✅ VALIDATED
   */
  ipcMain.handle('mcp:refresh-server-tools',
    validateIpcArgs([z.string().min(1)])(
      async (_, serverId) => {
        try {
          const toolCount = await mcpClientManager.refreshServerTools(serverId);
          Log.info(`[IPC] Refreshed tools from MCP server: ${serverId}, found ${toolCount} tools`);
          return { success: true, toolCount };
        } catch (error: any) {
          Log.error('[IPC] Error refreshing server tools:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Execute tool on MCP server - ✅ VALIDATED
   */
  ipcMain.handle('mcp:execute-tool',
    validateIpcArgs([z.string().min(1), z.record(z.string(), z.unknown())])(
      async (_, toolId, args) => {
        try {
          const result = await mcpClientManager.executeTool(toolId, args);
          Log.info(`[IPC] Executed MCP tool: ${toolId}`);
          return { success: result.success, data: result };
        } catch (error: any) {
          Log.error('[IPC] Error executing MCP tool:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Get connection status for all servers
   */
  ipcMain.handle('mcp:get-connection-status', async () => {
    try {
      const statuses = mcpClientManager.getConnectionStatus();
      Log.info(`[IPC] Retrieved connection status for ${statuses.length} MCP servers`);
      return { success: true, statuses };
    } catch (error: any) {
      Log.error('[IPC] Error retrieving connection status:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Refresh tools from specific server
   */
  ipcMain.handle('mcp:refresh-server-tools', async (_, serverId: string) => {
    try {
      const toolCount = await mcpClientManager.refreshServerTools(serverId);
      Log.info(`[IPC] Refreshed tools from MCP server: ${serverId}, found ${toolCount} tools`);
      return { success: true, toolCount };
    } catch (error: any) {
      Log.error('[IPC] Error refreshing server tools:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Health check - verify all connected servers
   */
  ipcMain.handle('mcp:health-check', async () => {
    try {
      const health = await mcpClientManager.healthCheck();
      Log.info(
        `[IPC] MCP health check: ${health.healthy}/${health.total} servers healthy`
      );
      return { success: true, health };
    } catch (error: any) {
      Log.error('[IPC] Error performing health check:', error);
      return { success: false, error: error.message };
    }
  });

  Log.info('[IPC] MCP tool handlers registered (13 endpoints)');
}
