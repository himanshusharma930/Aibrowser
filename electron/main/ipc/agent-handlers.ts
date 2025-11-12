import { ipcMain } from 'electron';
import { ConfigManager } from '../utils/config-manager';
import { windowContextManager } from '../services/window-context-manager';
import mcpToolManager from '../../../src/lib/mcpTools';
// ✅ SECURITY FIX: Import validation middleware and schemas
import { validateIpc } from './validation-middleware';
import { AgentConfigSchema, SetMcpToolEnabledSchema } from '../../../src/types/ipc-contracts';

/**
 * Register agent configuration related IPC handlers
 * ✅ SECURITY FIX: Critical handlers now validate input
 */
export function registerAgentHandlers() {
  const configManager = ConfigManager.getInstance();

  /**
   * Get agent configuration
   */
  ipcMain.handle('agent:get-config', async () => {
    try {
      const agentConfig = configManager.getAgentConfig();
      return { success: true, data: agentConfig };
    } catch (error: any) {
      console.error('Failed to get agent config:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Save agent configuration and reload all EkoServices - ✅ VALIDATED
   */
  ipcMain.handle('agent:save-config',
    validateIpc(AgentConfigSchema)(
      async (_event, config) => {
        try {
          configManager.saveAgentConfig(config);

          // Reload all window contexts
          const contexts = windowContextManager.getAllContexts();
          contexts.forEach(context => {
            if (context.ekoService) {
              context.ekoService.reloadConfig();
            }
          });

          return { success: true };
        } catch (error: any) {
          console.error('Failed to save agent config:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Get all available MCP tools with their status
   */
  ipcMain.handle('agent:get-mcp-tools', async () => {
    try {
      // Get all tools with their enabled status
      const tools = mcpToolManager.getAllToolsWithStatus();
      return { success: true, data: tools };
    } catch (error: any) {
      console.error('Failed to get MCP tools:', error);
      return { success: false, error: error.message };
    }
  });

  /**
   * Update MCP tool enabled status - ✅ VALIDATED
   */
  ipcMain.handle('agent:set-mcp-tool-enabled',
    validateIpc(SetMcpToolEnabledSchema)(
      async (_event, data) => {
        try {
          // Update tool status in McpToolManager
          mcpToolManager.setToolEnabled(data.toolName, data.enabled);

          // Update config in ConfigManager
          configManager.setMcpToolConfig(data.toolName, { enabled: data.enabled });

          return { success: true };
        } catch (error: any) {
          console.error('Failed to set MCP tool status:', error);
          return { success: false, error: error.message };
        }
      }
    )
  );

  /**
   * Reload agent configuration from storage
   */
  ipcMain.handle('agent:reload-config', async () => {
    try {
      // Get latest config
      const agentConfig = configManager.getAgentConfig();

      // Update MCP tools status
      const availableTools = mcpToolManager.getAllToolNames();
      availableTools.forEach(toolName => {
        const toolConfig = agentConfig.mcpTools[toolName];
        if (toolConfig !== undefined) {
          mcpToolManager.setToolEnabled(toolName, toolConfig.enabled);
        }
      });

      // Reload all EkoServices
      const contexts = windowContextManager.getAllContexts();
      contexts.forEach(context => {
        if (context.ekoService) {
          context.ekoService.reloadConfig();
        }
      });

      return { success: true, data: agentConfig };
    } catch (error: any) {
      console.error('Failed to reload agent config:', error);
      return { success: false, error: error.message };
    }
  });

  console.log('[IPC] Agent configuration handlers registered with validation');
}
