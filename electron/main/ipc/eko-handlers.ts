import { ipcMain } from "electron";
import { windowContextManager } from "../services/window-context-manager";
// ✅ SECURITY FIX: Import validation middleware and schemas
import { validateIpc, validateIpcArgs, rateLimit } from "./validation-middleware";
import {
  EkoRunSchema,
  EkoModifySchema,
  EkoExecuteSchema,
  EkoCancelSchema
} from "../../../src/types/ipc-contracts";

/**
 * Register all Eko service related IPC handlers
 * All handlers support window isolation through windowContextManager
 * ✅ SECURITY FIX: All handlers now validate input using Zod schemas
 */
export function registerEkoHandlers() {
  // Run new task - with rate limiting (max 10 calls/second to prevent DoS)
  ipcMain.handle('eko:run',
    rateLimit(10, 1000)(
      validateIpc(EkoRunSchema)(
        async (event, data) => {
          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            throw new Error('EkoService not found for this window');
          }
          return await context.ekoService.run(data.message);
        }
      )
    )
  );

  // Modify existing task - with validation
  ipcMain.handle('eko:modify',
    validateIpc(EkoModifySchema)(
      async (event, data) => {
        try {
          console.log('IPC eko:modify received:', data.taskId, data.message);
          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            throw new Error('EkoService not found for this window');
          }
          return await context.ekoService.modify(data.taskId, data.message);
        } catch (error: any) {
          console.error('IPC eko:modify error:', error);
          throw error;
        }
      }
    )
  );

  // Execute task - with validation
  ipcMain.handle('eko:execute',
    validateIpc(EkoExecuteSchema)(
      async (event, data) => {
        try {
          console.log('IPC eko:execute received:', data.taskId);
          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            throw new Error('EkoService not found for this window');
          }
          return await context.ekoService.execute(data.taskId);
        } catch (error: any) {
          console.error('IPC eko:execute error:', error);
          throw error;
        }
      }
    )
  );

  // Get task status - with validation
  ipcMain.handle('eko:getTaskStatus',
    validateIpc(EkoExecuteSchema)( // Reuse same schema (just needs taskId)
      async (event, data) => {
        try {
          console.log('IPC eko:getTaskStatus received:', data.taskId);
          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            throw new Error('EkoService not found for this window');
          }
          return await context.ekoService.getTaskStatus(data.taskId);
        } catch (error: any) {
          console.error('IPC eko:getTaskStatus error:', error);
          throw error;
        }
      }
    )
  );

  // Cancel task - with validation
  ipcMain.handle('eko:cancel-task',
    validateIpc(EkoCancelSchema)(
      async (event, data) => {
        try {
          console.log('IPC eko:cancel-task received:', data.taskId);
          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            throw new Error('EkoService not found for this window');
          }
          const result = await context.ekoService.cancleTask(data.taskId);
          return { success: true, result };
        } catch (error: any) {
          console.error('IPC eko:cancel-task error:', error);
          throw error;
        }
      }
    )
  );

  console.log('[IPC] Eko service handlers registered with validation');
}

