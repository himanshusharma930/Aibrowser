import { ipcMain } from "electron";
import { ConfigManager, type UserModelConfigs, type ProviderType } from "../utils/config-manager";
import { windowContextManager } from "../services/window-context-manager";
import { store } from "../utils/store";
// ✅ SECURITY FIX: Import validation middleware and schemas
import { validateIpc } from "./validation-middleware";
import {
  UserModelConfigsSchema,
  GetModelConfigSchema,
  SetSelectedProviderSchema,
  GetEnvVarSchema
} from "../../../src/types/ipc-contracts";

/**
 * Register all configuration-related IPC handlers
 * ✅ SECURITY FIX: Critical handlers now validate input
 */
export function registerConfigHandlers() {
  // Get user model configurations
  ipcMain.handle('config:get-user-configs', async () => {
    try {
      const configManager = ConfigManager.getInstance();
      return configManager.getUserModelConfigs();
    } catch (error: any) {
      console.error('IPC config:get-user-configs error:', error);
      throw error;
    }
  });

  // Save user model configurations - ✅ VALIDATED (critical: handles API keys)
  ipcMain.handle('config:save-user-configs',
    validateIpc(UserModelConfigsSchema)(
      async (_event, configs) => {
        try {
          const configManager = ConfigManager.getInstance();
          configManager.saveUserModelConfigs(configs);

          // Reload EkoService configuration for all windows
          const contexts = windowContextManager.getAllContexts();
          contexts.forEach(context => {
            if (context.ekoService) {
              context.ekoService.reloadConfig();
            }
          });

          return { success: true };
        } catch (error: any) {
          console.error('IPC config:save-user-configs error:', error);
          throw error;
        }
      }
    )
  );

  // Get model configuration for specific provider - ✅ VALIDATED
  ipcMain.handle('config:get-model-config',
    validateIpc(GetModelConfigSchema)(
      async (_event, data) => {
        try {
          const configManager = ConfigManager.getInstance();
          return configManager.getModelConfig(data.provider);
        } catch (error: any) {
          console.error('IPC config:get-model-config error:', error);
          throw error;
        }
      }
    )
  );

  // Get API key source (user/env/none) - ✅ VALIDATED
  ipcMain.handle('config:get-api-key-source',
    validateIpc(GetModelConfigSchema)( // Reuse schema (just needs provider)
      async (_event, data) => {
        try {
          const configManager = ConfigManager.getInstance();
          return configManager.getApiKeySource(data.provider);
        } catch (error: any) {
          console.error('IPC config:get-api-key-source error:', error);
          throw error;
        }
      }
    )
  );

  // Get selected provider
  ipcMain.handle('config:get-selected-provider', async () => {
    try {
      const configManager = ConfigManager.getInstance();
      return configManager.getSelectedProvider();
    } catch (error: any) {
      console.error('IPC config:get-selected-provider error:', error);
      throw error;
    }
  });

  // Get environment variable - ✅ VALIDATED (security risk if unvalidated)
  ipcMain.handle('config:get-env-var',
    validateIpc(GetEnvVarSchema)(
      async (_event, data) => {
        try {
          // ✅ SECURITY: Only allow reading specific whitelisted env vars
          const allowedEnvVars = [
            'NODE_ENV',
            'DEEPSEEK_API_KEY',
            'QWEN_API_KEY',
            'GOOGLE_API_KEY',
            'ANTHROPIC_API_KEY',
            'OPENROUTER_API_KEY',
            'CUSTOM_API_KEY'
          ];

          if (!allowedEnvVars.includes(data.key)) {
            console.warn(`[IPC Security] Attempt to read disallowed env var: ${data.key}`);
            return '';
          }

          return process.env[data.key] || '';
        } catch (error: any) {
          console.error('IPC config:get-env-var error:', error);
          return '';
        }
      }
    )
  );

  // Set selected provider - ✅ VALIDATED
  ipcMain.handle('config:set-selected-provider',
    validateIpc(SetSelectedProviderSchema)(
      async (_event, data) => {
        try {
          const configManager = ConfigManager.getInstance();
          configManager.setSelectedProvider(data.provider);

          // Reload EkoService configuration for all windows
          const contexts = windowContextManager.getAllContexts();
          contexts.forEach(context => {
            if (context.ekoService) {
              context.ekoService.reloadConfig();
            }
          });

          return { success: true };
        } catch (error: any) {
          console.error('IPC config:set-selected-provider error:', error);
          throw error;
        }
      }
    )
  );

  // Get saved language preference
  ipcMain.handle('config:get-language', async () => {
    try {
      const language = store.get('app.language', 'en-US');
      return language;
    } catch (error: any) {
      console.error('IPC config:get-language error:', error);
      return 'en-US';
    }
  });

  // Handle language change notification from renderer
  ipcMain.handle('language-changed', async (_event, language: string) => {
    try {
      // Basic validation: only allow supported languages
      const supportedLanguages = ['en-US', 'zh-CN'];
      if (!supportedLanguages.includes(language)) {
        throw new Error(`Unsupported language: ${language}`);
      }

      // Store language preference in electron-store
      store.set('app.language', language);
      console.log(`[IPC] Language changed to: ${language}`);
      return { success: true };
    } catch (error: any) {
      console.error('IPC language-changed error:', error);
      throw error;
    }
  });

  console.log('[IPC] Configuration handlers registered with validation');
}
