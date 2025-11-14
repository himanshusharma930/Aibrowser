import { BrowserWindow, dialog, WebContentsView } from "electron";
import { EkoService } from "./eko-service";
import { windowContextManager, type WindowContext } from "./window-context-manager";
import { ConfigManager } from "../utils/config-manager";
import { createWindow } from '../ui/window';
import { createView } from "../ui/view";
// ✅ PHASE 2: Import centralized logging
import { createLogger } from "../utils/logger";
import { ErrorCategory, ErrorSeverity } from "../utils/error-handler";


/**
 * Task execution context
 */
interface TaskWindowContext {
  window: BrowserWindow;
  view: WebContentsView;
  ekoService: EkoService;
  taskId: string;
  executionId: string;
  createdAt: Date;
}

/**
 * Task window manager
 * Responsible for creating and managing independent execution windows for scheduled tasks
 * Manages windows by taskId, supports window reuse
 */
export class TaskWindowManager {
  private taskWindows: Map<string, TaskWindowContext> = new Map(); // Manage by taskId
  private maxConcurrentTasks: number = 3; // Maximum concurrent tasks
  // ✅ PHASE 2: Add logger instance
  private logger = createLogger('TaskWindowManager');

  /**
   * Create or reuse execution window for task
   * @param taskId Task ID
   * @param executionId Execution ID
   * @returns Window context
   */
  async createTaskWindow(taskId: string, executionId: string): Promise<TaskWindowContext> {
    // Check if window for this task already exists (window reuse)
    const existingContext = this.taskWindows.get(taskId);

    if (existingContext) {
      // ✅ PHASE 2: Use logger for window reuse
      this.logger.info('Reusing existing task window', { taskId, executionId });

      // Terminate currently executing task
      if (existingContext.executionId) {
        this.logger.debug('Terminating previous task execution', {
          taskId,
          previousExecutionId: existingContext.executionId
        });
        try {
          await existingContext.ekoService.cancelTask(existingContext.executionId);
        } catch (error) {
          // ✅ PHASE 2: Use logger for window error
          this.logger.error(
            'Failed to terminate previous task during window reuse',
            error as Error,
            { taskId, previousExecutionId: existingContext.executionId },
            ErrorCategory.WINDOW,
            ErrorSeverity.MEDIUM,
            true // recoverable - task can still execute
          );
        }
      }

      // Update execution ID
      existingContext.executionId = executionId;

      // Reload page with new executionId (keep original loadURL format)
      const taskWindowUrl = ConfigManager.getInstance().getTaskWindowUrl();
      existingContext.window.loadURL(`${taskWindowUrl}?taskId=${taskId}&executionId=${executionId}`);

      // Focus window
      existingContext.window.show();
      existingContext.window.focus();

      return existingContext;
    }

    // Check concurrency limit (only for new windows)
    if (this.taskWindows.size >= this.maxConcurrentTasks) {
      // ✅ PHASE 2: Log concurrency limit violation
      const error = `Maximum concurrent tasks reached (${this.maxConcurrentTasks})`;
      this.logger.error(
        error,
        new Error(error),
        { currentWindows: this.taskWindows.size, maxConcurrentTasks: this.maxConcurrentTasks },
        ErrorCategory.WINDOW,
        ErrorSeverity.MEDIUM,
        true // recoverable - user can wait or close another task
      );
      throw new Error(error);
    }

    // ✅ PHASE 2: Log new window creation
    this.logger.info('Creating new task window', {
      taskId,
      executionId,
      totalWindows: this.taskWindows.size + 1
    });

    // Create new window (keep original loadURL format)
    const taskWindowUrl = ConfigManager.getInstance().getTaskWindowUrl();
    const taskWindow = createWindow(`${taskWindowUrl}?taskId=${taskId}&executionId=${executionId}`)

    // Create detailView
    const detailView = createView(`https://www.google.com`, "view", '2');

    // Set detailView position and size
    taskWindow.contentView.addChildView(detailView);
    detailView.setBounds({
      x: 818,
      y: 264,
      width: 748,
      height: 560,
    });

    // Set detailView hidden by default
    detailView.setVisible(false);

    detailView.webContents.setWindowOpenHandler(({url}) => {
        detailView.webContents.loadURL(url);
        return {
          action: "deny",
        }
      })

    // Listen for detail view URL changes
    detailView.webContents.on('did-navigate', (_event, url) => {
      // ✅ PHASE 2: Use logger for view navigation
      this.logger.debug('Detail view navigation', { taskId, url, event: 'did-navigate' });
      taskWindow?.webContents.send('url-changed', url);
    });

    detailView.webContents.on('did-navigate-in-page', (_event, url) => {
      // ✅ PHASE 2: Use logger for in-page navigation
      this.logger.debug('Detail view in-page navigation', { taskId, url, event: 'did-navigate-in-page' });
      taskWindow?.webContents.send('url-changed', url);
    });

    // Create independent EkoService instance for this window
    const ekoService = new EkoService(taskWindow, detailView);

    // Ensure window is visible
    taskWindow.show();
    taskWindow.focus();

    // Create context
    const context: TaskWindowContext = {
      window: taskWindow,
      view: detailView,
      ekoService,
      taskId,
      executionId,
      createdAt: new Date()
    };

    // Record window by taskId (instead of executionId)
    this.taskWindows.set(taskId, context);

    // Also register to windowContextManager
    const windowContext: WindowContext = {
      window: taskWindow,
      detailView,
      historyView: null,
      ekoService,
      webContentsId: taskWindow.webContents.id,
      windowType: 'scheduled-task',
      taskId,
      currentExecutionId: executionId
    };
    windowContextManager.registerWindow(windowContext);

    // Listen for window close event (close: triggered before closing, can be prevented)
    // Check task status, prompt user
    taskWindow.on('close', async (event) => {
      // Check if any task is running
      const hasRunningTask = ekoService.hasRunningTask();

      if (hasRunningTask) {
        // ✅ PHASE 2: Log user confirmation prompt
        this.logger.warn('Task still running, prompting user for confirmation', { taskId });

        // Prevent default close behavior
        event.preventDefault();

        // Show confirmation dialog
        const { response } = await dialog.showMessageBox(taskWindow, {
          type: 'warning',
          title: 'Scheduled Task Running',
          message: 'A scheduled task is currently executing. Closing the window will terminate the task',
          detail: 'Please choose an action:',
          buttons: ['Cancel', 'Stop Task and Close'],
          defaultId: 0,
          cancelId: 0
        });

        if (response === 1) {
          // ✅ PHASE 2: Log user decision to stop and close
          this.logger.info('User chose to stop task and close window', { taskId });

          // Get all task IDs
          const allTaskIds = ekoService['eko']?.getAllTaskId() || [];

          // Abort all tasks
          await ekoService.abortAllTasks();

          // Send abort event (frontend will listen and update IndexedDB)
          allTaskIds.forEach(tid => {
            taskWindow.webContents.send('task-aborted-by-system', {
              taskId: tid,
              reason: 'User closed scheduled task window, task terminated',
              timestamp: new Date().toISOString()
            });
          });

          // Delay to ensure message delivery and processing
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Actually close window
          taskWindow.destroy();
        }
        // response === 0: cancel close, do nothing
      }
      // No task running, allow closing
    });

    // Clean up on window close
    taskWindow.on('closed', () => {
      // ✅ PHASE 2: Log window closed event
      this.logger.info('Window closed, performing cleanup', { taskId, remainingWindows: this.taskWindows.size - 1 });

      // Remove from taskWindows
      this.taskWindows.delete(taskId);

      // Safely unregister window context (check if webContents is destroyed)
      try {
        if (!taskWindow.isDestroyed() && taskWindow.webContents) {
          windowContextManager.unregisterWindow(taskWindow.webContents.id);
        }
      } catch (error) {
        // ✅ PHASE 2: Log window unregistration error
        this.logger.error(
          'Failed to unregister window context',
          error as Error,
          { taskId },
          ErrorCategory.WINDOW,
          ErrorSeverity.MEDIUM,
          false // non-recoverable window error
        );
      }

      this.logger.debug('Window cleanup completed', { taskId, remainingWindows: this.taskWindows.size });
    });

    // ✅ PHASE 2: Log successful window creation
    this.logger.info('Task window created successfully', {
      taskId,
      executionId,
      totalWindows: this.taskWindows.size
    });

    return context;
  }

  /**
   * Close task window (by taskId)
   * @param taskId Task ID
   */
  async closeTaskWindow(taskId: string): Promise<void> {
    const context = this.taskWindows.get(taskId);
    if (!context) {
      // ✅ PHASE 2: Log window not found
      this.logger.warn('Attempted to close non-existent task window', { taskId });
      return;
    }

    if (!context.window.isDestroyed()) {
      context.window.close();
    }

    // ✅ PHASE 2: Log window close operation
    this.logger.debug('Task window close initiated', { taskId });
  }

  /**
   * Get task window context (by taskId)
   * @param taskId Task ID
   */
  getTaskWindow(taskId: string): TaskWindowContext | undefined {
    return this.taskWindows.get(taskId);
  }

  /**
   * Get current number of executing tasks
   */
  getRunningTaskCount(): number {
    return this.taskWindows.size;
  }

  /**
   * Check if new task can be executed
   */
  canRunNewTask(): boolean {
    return this.taskWindows.size < this.maxConcurrentTasks;
  }

  /**
   * Set maximum concurrent tasks
   * @param max Maximum concurrency (1-5)
   */
  setMaxConcurrentTasks(max: number): void {
    if (max < 1 || max > 5) {
      // ✅ PHASE 2: Log concurrency configuration error
      const error = 'Maximum concurrent tasks must be between 1-5';
      this.logger.error(
        error,
        new Error(error),
        { requestedMax: max },
        ErrorCategory.CONFIG,
        ErrorSeverity.MEDIUM,
        false // non-recoverable - invalid config
      );
      throw new Error(error);
    }
    this.maxConcurrentTasks = max;
    // ✅ PHASE 2: Log concurrency configuration change
    this.logger.info('Task concurrency limit updated', { maxConcurrentTasks: max });
  }

  /**
   * Get all running tasks
   */
  getRunningTasks(): Array<{ taskId: string; executionId: string; createdAt: Date }> {
    return Array.from(this.taskWindows.values()).map(ctx => ({
      taskId: ctx.taskId,
      executionId: ctx.executionId,
      createdAt: ctx.createdAt
    }));
  }

  /**
   * Close all task windows
   */
  closeAllTaskWindows(): void {
    // ✅ PHASE 2: Log bulk window closure
    this.logger.info('Closing all task windows', { windowCount: this.taskWindows.size });

    Array.from(this.taskWindows.values()).forEach((context) => {
      if (!context.window.isDestroyed()) {
        context.window.close();
      }
    });

    this.taskWindows.clear();

    // ✅ PHASE 2: Log cleanup completion
    this.logger.debug('All task windows closed and cleared');
  }

  /**
   * Destroy manager
   */
  destroy(): void {
    this.closeAllTaskWindows();
  }
}

// Singleton instance
export const taskWindowManager = new TaskWindowManager();
