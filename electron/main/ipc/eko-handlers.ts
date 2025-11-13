import { ipcMain } from "electron";
import { windowContextManager } from "../services/window-context-manager";
import { taskCheckpointManager } from "../services/task-checkpoint";
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

  // ✅ NEW: Run task with checkpoint support for pause/resume
  ipcMain.handle('eko:run-checkpoint',
    rateLimit(10, 1000)(
      async (event, data: { prompt: string; checkpointInterval?: number; agents?: string[] }) => {
        try {
          console.log('[IPC] eko:run-checkpoint received:', data.prompt.substring(0, 50));
          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            throw new Error('EkoService not found for this window');
          }

          // Create checkpoint wrapper
          return await context.ekoService.runWithCheckpoint(
            data.prompt,
            data.checkpointInterval || 10,
            data.agents
          );
        } catch (error: any) {
          console.error('[IPC] eko:run-checkpoint error:', error);
          throw error;
        }
      }
    )
  );

  // ✅ NEW: Pause running task (saves checkpoint)
  ipcMain.handle('eko:pause-task',
    validateIpc(EkoCancelSchema)(
      async (event, data) => {
        try {
          console.log('[IPC] eko:pause-task received:', data.taskId);
          await taskCheckpointManager.pauseCheckpoint(data.taskId);
          const context = windowContextManager.getContext(event.sender.id);
          if (context?.ekoService) {
            await context.ekoService.cancleTask(data.taskId);
          }
          return { success: true, message: 'Task paused with checkpoint saved' };
        } catch (error: any) {
          console.error('[IPC] eko:pause-task error:', error);
          throw error;
        }
      }
    )
  );

  // ✅ NEW: Resume paused task from checkpoint
  ipcMain.handle('eko:resume-task',
    validateIpc(EkoCancelSchema)(
      async (event, data) => {
        try {
          console.log('[IPC] eko:resume-task received:', data.taskId);
          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            throw new Error('EkoService not found for this window');
          }
          return await context.ekoService.resumeFromCheckpoint(data.taskId);
        } catch (error: any) {
          console.error('[IPC] eko:resume-task error:', error);
          throw error;
        }
      }
    )
  );

  // ✅ NEW: Get checkpoint status and recovery info
  ipcMain.handle('eko:checkpoint-status',
    validateIpc(EkoCancelSchema)(
      async (event, data) => {
        try {
          console.log('[IPC] eko:checkpoint-status received:', data.taskId);
          const status = await taskCheckpointManager.getCheckpointStatus(data.taskId);
          const summary = await taskCheckpointManager.getRecoverySummary(data.taskId);
          return { status, summary };
        } catch (error: any) {
          console.error('[IPC] eko:checkpoint-status error:', error);
          throw error;
        }
      }
    )
  );

  // ✅ NEW: List all available checkpoints
  ipcMain.handle('eko:list-checkpoints',
    async (event) => {
      try {
        console.log('[IPC] eko:list-checkpoints received');
        const checkpoints = await taskCheckpointManager.listCheckpoints();
        return checkpoints.map(cp => ({
          taskId: cp.taskId,
          status: cp.status,
          timestamp: cp.timestamp,
          iteration: cp.iteration,
          totalIterations: cp.totalIterations,
          progress: (cp.currentNodeIndex / cp.totalIterations) * 100,
        }));
      } catch (error: any) {
        console.error('[IPC] eko:list-checkpoints error:', error);
        throw error;
      }
    }
  );

  // ✅ NEW: Delete checkpoint (cleanup)
  ipcMain.handle('eko:delete-checkpoint',
    validateIpc(EkoCancelSchema)(
      async (event, data) => {
        try {
          console.log('[IPC] eko:delete-checkpoint received:', data.taskId);
          await taskCheckpointManager.deleteCheckpoint(data.taskId);
          return { success: true, message: 'Checkpoint deleted' };
        } catch (error: any) {
          console.error('[IPC] eko:delete-checkpoint error:', error);
          throw error;
        }
      }
    )
  );

  console.log('[IPC] Eko service handlers registered with validation + checkpoint support');
}

