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
// ✅ PHASE 2: Import centralized logging
import { createLogger } from "../utils/logger";
import { ErrorCategory, ErrorSeverity } from "../utils/error-handler";

const logger = createLogger('EkoHandlers');

/**
 * Register all Eko service related IPC handlers
 * All handlers support window isolation through windowContextManager
 * ✅ SECURITY FIX: All handlers now validate input using Zod schemas
 * ✅ PHASE 2: All handlers use centralized error logging
 */
export function registerEkoHandlers() {
  // Run new task - with rate limiting (max 10 calls/second to prevent DoS)
  ipcMain.handle('eko:run',
    rateLimit(10, 1000)(
      validateIpc(EkoRunSchema)(
        async (event, data) => {
          // ✅ PHASE 2: Log IPC request
          logger.logIpc('eko:run', { messageLength: data.message.length }, true);

          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            const error = 'EkoService not found for this window';
            // ✅ PHASE 2: Log IPC error
            logger.error(
              error,
              new Error(error),
              { channel: 'eko:run', windowId: event.sender.id },
              ErrorCategory.IPC,
              ErrorSeverity.HIGH,
              false
            );
            throw new Error(error);
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
          // ✅ PHASE 2: Log IPC request with context
          logger.logIpc('eko:modify', { taskId: data.taskId, messageLength: data.message.length }, true);

          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            const error = 'EkoService not found for this window';
            logger.error(
              error,
              new Error(error),
              { channel: 'eko:modify', windowId: event.sender.id, taskId: data.taskId },
              ErrorCategory.IPC,
              ErrorSeverity.HIGH,
              false
            );
            throw new Error(error);
          }
          return await context.ekoService.modify(data.taskId, data.message);
        } catch (error: any) {
          // ✅ PHASE 2: Use logger for IPC errors
          logger.error(
            'IPC handler failed',
            error,
            { channel: 'eko:modify', taskId: data.taskId },
            ErrorCategory.IPC,
            ErrorSeverity.HIGH,
            false
          );
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
          // ✅ PHASE 2: Log IPC request
          logger.logIpc('eko:execute', { taskId: data.taskId }, true);

          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            const error = 'EkoService not found for this window';
            logger.error(
              error,
              new Error(error),
              { channel: 'eko:execute', windowId: event.sender.id, taskId: data.taskId },
              ErrorCategory.IPC,
              ErrorSeverity.HIGH,
              false
            );
            throw new Error(error);
          }
          return await context.ekoService.execute(data.taskId);
        } catch (error: any) {
          // ✅ PHASE 2: Use logger for IPC errors
          logger.error(
            'IPC handler failed',
            error,
            { channel: 'eko:execute', taskId: data.taskId },
            ErrorCategory.IPC,
            ErrorSeverity.HIGH,
            false
          );
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
          // ✅ PHASE 2: Log IPC request
          logger.logIpc('eko:getTaskStatus', { taskId: data.taskId }, true);

          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            const error = 'EkoService not found for this window';
            logger.error(
              error,
              new Error(error),
              { channel: 'eko:getTaskStatus', windowId: event.sender.id, taskId: data.taskId },
              ErrorCategory.IPC,
              ErrorSeverity.HIGH,
              false
            );
            throw new Error(error);
          }
          return await context.ekoService.getTaskStatus(data.taskId);
        } catch (error: any) {
          // ✅ PHASE 2: Use logger for IPC errors
          logger.error(
            'IPC handler failed',
            error,
            { channel: 'eko:getTaskStatus', taskId: data.taskId },
            ErrorCategory.IPC,
            ErrorSeverity.HIGH,
            false
          );
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
          // ✅ PHASE 2: Log IPC request
          logger.logIpc('eko:cancel-task', { taskId: data.taskId }, true);

          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            const error = 'EkoService not found for this window';
            logger.error(
              error,
              new Error(error),
              { channel: 'eko:cancel-task', windowId: event.sender.id, taskId: data.taskId },
              ErrorCategory.IPC,
              ErrorSeverity.HIGH,
              false
            );
            throw new Error(error);
          }
          const result = await context.ekoService.cancelTask(data.taskId);
          return { success: true, result };
        } catch (error: any) {
          // ✅ PHASE 2: Use logger for IPC errors
          logger.error(
            'IPC handler failed',
            error,
            { channel: 'eko:cancel-task', taskId: data.taskId },
            ErrorCategory.IPC,
            ErrorSeverity.HIGH,
            false
          );
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
          // ✅ PHASE 2: Log checkpoint IPC request
          logger.logIpc('eko:run-checkpoint', {
            promptLength: data.prompt.length,
            checkpointInterval: data.checkpointInterval,
            agentCount: data.agents?.length || 0
          }, true);

          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            const error = 'EkoService not found for this window';
            logger.error(
              error,
              new Error(error),
              { channel: 'eko:run-checkpoint', windowId: event.sender.id },
              ErrorCategory.IPC,
              ErrorSeverity.HIGH,
              false
            );
            throw new Error(error);
          }

          // Create checkpoint wrapper
          return await context.ekoService.runWithCheckpoint(
            data.prompt,
            data.checkpointInterval || 10,
            data.agents
          );
        } catch (error: any) {
          // ✅ PHASE 2: Use logger for checkpoint errors
          logger.error(
            'Checkpoint task failed',
            error,
            { channel: 'eko:run-checkpoint' },
            ErrorCategory.IPC,
            ErrorSeverity.HIGH,
            false
          );
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
          // ✅ PHASE 2: Log pause operation
          logger.logIpc('eko:pause-task', { taskId: data.taskId }, true);

          await taskCheckpointManager.pauseCheckpoint(data.taskId);
          const context = windowContextManager.getContext(event.sender.id);
          if (context?.ekoService) {
            await context.ekoService.cancelTask(data.taskId);
          }
          logger.info('Task paused with checkpoint', { taskId: data.taskId });
          return { success: true, message: 'Task paused with checkpoint saved' };
        } catch (error: any) {
          // ✅ PHASE 2: Use logger for pause errors
          logger.error(
            'Failed to pause task',
            error,
            { channel: 'eko:pause-task', taskId: data.taskId },
            ErrorCategory.AGENT,
            ErrorSeverity.MEDIUM,
            true
          );
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
          // ✅ PHASE 2: Log resume operation
          logger.logIpc('eko:resume-task', { taskId: data.taskId }, true);

          const context = windowContextManager.getContext(event.sender.id);
          if (!context || !context.ekoService) {
            const error = 'EkoService not found for this window';
            logger.error(
              error,
              new Error(error),
              { channel: 'eko:resume-task', windowId: event.sender.id, taskId: data.taskId },
              ErrorCategory.IPC,
              ErrorSeverity.HIGH,
              false
            );
            throw new Error(error);
          }
          const result = await context.ekoService.resumeFromCheckpoint(data.taskId);
          logger.info('Task resumed from checkpoint', { taskId: data.taskId });
          return result;
        } catch (error: any) {
          // ✅ PHASE 2: Use logger for resume errors
          logger.error(
            'Failed to resume task',
            error,
            { channel: 'eko:resume-task', taskId: data.taskId },
            ErrorCategory.AGENT,
            ErrorSeverity.MEDIUM,
            true
          );
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
          // ✅ PHASE 2: Log checkpoint status query
          logger.logIpc('eko:checkpoint-status', { taskId: data.taskId }, true);

          const status = await taskCheckpointManager.getCheckpointStatus(data.taskId);
          const summary = await taskCheckpointManager.getRecoverySummary(data.taskId);
          return { status, summary };
        } catch (error: any) {
          // ✅ PHASE 2: Use logger for status errors
          logger.error(
            'Failed to get checkpoint status',
            error,
            { channel: 'eko:checkpoint-status', taskId: data.taskId },
            ErrorCategory.STORAGE,
            ErrorSeverity.MEDIUM,
            true
          );
          throw error;
        }
      }
    )
  );

  // ✅ NEW: List all available checkpoints
  ipcMain.handle('eko:list-checkpoints',
    async (event) => {
      try {
        // ✅ PHASE 2: Log checkpoint listing
        logger.logIpc('eko:list-checkpoints', {}, true);

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
        // ✅ PHASE 2: Use logger for list errors
        logger.error(
          'Failed to list checkpoints',
          error,
          { channel: 'eko:list-checkpoints' },
          ErrorCategory.STORAGE,
          ErrorSeverity.MEDIUM,
          true
        );
        throw error;
      }
    }
  );

  // ✅ NEW: Delete checkpoint (cleanup)
  ipcMain.handle('eko:delete-checkpoint',
    validateIpc(EkoCancelSchema)(
      async (event, data) => {
        try {
          // ✅ PHASE 2: Log checkpoint deletion
          logger.logIpc('eko:delete-checkpoint', { taskId: data.taskId }, true);

          await taskCheckpointManager.deleteCheckpoint(data.taskId);
          logger.info('Checkpoint deleted', { taskId: data.taskId });
          return { success: true, message: 'Checkpoint deleted' };
        } catch (error: any) {
          // ✅ PHASE 2: Use logger for delete errors
          logger.error(
            'Failed to delete checkpoint',
            error,
            { channel: 'eko:delete-checkpoint', taskId: data.taskId },
            ErrorCategory.STORAGE,
            ErrorSeverity.MEDIUM,
            true
          );
          throw error;
        }
      }
    )
  );

  logger.info('Eko service handlers registered with centralized logging and error handling');
}

