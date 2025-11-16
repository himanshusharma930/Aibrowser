/**
 * Task Checkpoint System
 *
 * Enables pause/resume capability for long-running Eko workflows by persisting:
 * - Current workflow state and progress
 * - Agent context and variables
 * - Tool execution results
 * - Iteration count and failure points
 *
 * Supports 12-Factor Agent pattern: micro-workflows with state snapshots
 * Reference: CLAUDE.md → 12-Factor Agent Best Practices → Context Window Management
 */

import { app } from "electron";
import path from "node:path";
import fs from "fs/promises";
import { Log } from "@jarvis-agent/core";
// ✅ PHASE 2: Import centralized logging
import { createLogger } from "../utils/logger";
import { ErrorCategory, ErrorSeverity } from "../utils/error-handler";

/**
 * Checkpoint data structure capturing complete workflow state
 */
export interface Checkpoint {
  id: string;
  taskId: string;
  timestamp: number;
  status: 'in_progress' | 'paused' | 'failed' | 'completed';

  // Workflow state
  workflowXml: string;
  currentNodeIndex: number;
  completedNodes: string[];

  // Context preservation
  agentContext: {
    variables: Record<string, any>;
    sessionState: Record<string, any>;
  };
  globalContext: {
    variables: Record<string, any>;
  };

  // Execution metadata
  iteration: number;
  totalIterations: number;
  toolResults: Array<{
    toolName: string;
    params: Record<string, any>;
    result: any;
    timestamp: number;
  }>;

  // Error tracking
  failurePoint?: string;
  error?: {
    message: string;
    code: string;
    timestamp: number;
  };

  // Retry metadata
  retryCount: number;
  lastRetryTimestamp?: number;
}

/**
 * TaskCheckpointManager - Manages persistence and recovery of workflow checkpoints
 */
export class TaskCheckpointManager {
  private checkpointDir: string;
  private checkpoints: Map<string, Checkpoint> = new Map();
  private autoSaveInterval: number = 10000; // Auto-save every 10 seconds
  // ✅ PHASE 2: Add logger instance
  private logger = createLogger('TaskCheckpointManager');

  constructor() {
    this.checkpointDir = path.join(app.getPath('userData'), 'checkpoints');
    this.initializeCheckpointDir();
  }

  /**
   * Initialize checkpoint directory
   */
  private async initializeCheckpointDir() {
    try {
      await fs.mkdir(this.checkpointDir, { recursive: true });
      // ✅ PHASE 2: Use logger for initialization
      this.logger.info('Checkpoint directory initialized', { path: this.checkpointDir });
    } catch (error) {
      // ✅ PHASE 2: Use logger for initialization error
      this.logger.error(
        'Failed to initialize checkpoint directory',
        error as Error,
        { path: this.checkpointDir },
        ErrorCategory.FILE_SYSTEM,
        ErrorSeverity.HIGH,
        false // non-recoverable - unable to save checkpoints
      );
    }
  }

  /**
   * Generate unique checkpoint ID
   */
  private generateCheckpointId(): string {
    return `cp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create new checkpoint from workflow state
   */
  async createCheckpoint(
    taskId: string,
    workflowXml: string,
    currentNodeIndex: number,
    completedNodes: string[],
    agentContext: any,
    globalContext: any,
    metadata: {
      iteration: number;
      totalIterations: number;
      toolResults: any[];
    }
  ): Promise<Checkpoint> {
    const checkpoint: Checkpoint = {
      id: this.generateCheckpointId(),
      taskId,
      timestamp: Date.now(),
      status: 'in_progress',
      workflowXml,
      currentNodeIndex,
      completedNodes,
      agentContext: {
        variables: agentContext?.variables || {},
        sessionState: agentContext?.sessionState || {},
      },
      globalContext: {
        variables: globalContext?.variables || {},
      },
      iteration: metadata.iteration,
      totalIterations: metadata.totalIterations,
      toolResults: metadata.toolResults || [],
      retryCount: 0,
    };

    this.checkpoints.set(taskId, checkpoint);
    await this.persistCheckpoint(checkpoint);

    // ✅ PHASE 2: Use logger for checkpoint creation
    this.logger.info('Checkpoint created', {
      taskId,
      checkpointId: checkpoint.id,
      iteration: metadata.iteration,
      totalIterations: metadata.totalIterations,
      progress: (currentNodeIndex / metadata.totalIterations) * 100
    });

    return checkpoint;
  }

  /**
   * Update checkpoint with new state
   */
  async updateCheckpoint(
    taskId: string,
    updates: Partial<Checkpoint>
  ): Promise<Checkpoint | null> {
    const checkpoint = this.checkpoints.get(taskId);
    if (!checkpoint) {
      // ✅ PHASE 2: Use logger for checkpoint not found
      this.logger.warn('Attempted to update non-existent checkpoint', { taskId });
      return null;
    }

    const updated = {
      ...checkpoint,
      ...updates,
      timestamp: Date.now(), // Always update timestamp
    };

    this.checkpoints.set(taskId, updated);
    await this.persistCheckpoint(updated);

    // ✅ PHASE 2: Use logger for checkpoint update
    this.logger.debug('Checkpoint updated', {
      taskId,
      checkpointId: checkpoint.id,
      newStatus: updated.status
    });

    return updated;
  }

  /**
   * Save checkpoint to disk (called periodically or before pause)
   */
  async persistCheckpoint(checkpoint: Checkpoint): Promise<void> {
    try {
      const filePath = path.join(this.checkpointDir, `${checkpoint.taskId}.json`);
      await fs.writeFile(
        filePath,
        JSON.stringify(checkpoint, null, 2),
        'utf-8'
      );
      // ✅ PHASE 2: Use logger for persistence
      this.logger.debug('Checkpoint persisted to disk', {
        taskId: checkpoint.taskId,
        path: filePath,
        status: checkpoint.status
      });
    } catch (error) {
      // ✅ PHASE 2: Use logger for persistence error
      this.logger.error(
        'Failed to persist checkpoint',
        error as Error,
        { taskId: checkpoint.taskId, checkpointId: checkpoint.id },
        ErrorCategory.STORAGE,
        ErrorSeverity.HIGH,
        true // recoverable - can retry persistence
      );
      throw error;
    }
  }

  /**
   * Load checkpoint for task resumption
   */
  async loadCheckpoint(taskId: string): Promise<Checkpoint | null> {
    try {
      // Check in-memory cache first
      if (this.checkpoints.has(taskId)) {
        return this.checkpoints.get(taskId)!;
      }

      // Load from disk
      const filePath = path.join(this.checkpointDir, `${taskId}.json`);
      const data = await fs.readFile(filePath, 'utf-8');
      const checkpoint = JSON.parse(data) as Checkpoint;

      this.checkpoints.set(taskId, checkpoint);

      // ✅ PHASE 2: Use logger for checkpoint loading
      this.logger.info('Checkpoint loaded from disk', {
        taskId,
        checkpointId: checkpoint.id,
        status: checkpoint.status,
        iteration: checkpoint.iteration,
        progress: (checkpoint.currentNodeIndex / checkpoint.totalIterations) * 100
      });

      return checkpoint;
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        // ✅ PHASE 2: Log checkpoint not found (expected case)
        this.logger.debug('No checkpoint found on disk', { taskId });
        return null;
      }

      // ✅ PHASE 2: Use logger for checkpoint load error
      this.logger.error(
        'Failed to load checkpoint',
        error as Error,
        { taskId },
        ErrorCategory.STORAGE,
        ErrorSeverity.MEDIUM,
        true // recoverable - can start fresh or retry
      );
      return null;
    }
  }

  /**
   * Associate an existing checkpoint with a new task ID (real Eko task ID)
   */
  async associateCheckpointWithTaskId(oldTaskId: string, newTaskId: string): Promise<void> {
    if (!oldTaskId || !newTaskId || oldTaskId === newTaskId) {
      return;
    }

    const checkpoint = this.checkpoints.get(oldTaskId);
    if (!checkpoint) {
      // Attempt to load from disk in case it was evicted from the cache
      const loaded = await this.loadCheckpoint(oldTaskId);
      if (!loaded) {
        this.logger.warn('Cannot associate checkpoint: source checkpoint not found', {
          oldTaskId,
          newTaskId
        });
        return;
      }
      this.checkpoints.set(oldTaskId, loaded);
    }

    const updatedCheckpoint = this.checkpoints.get(oldTaskId);
    if (!updatedCheckpoint) {
      return;
    }

    const oldPath = path.join(this.checkpointDir, `${oldTaskId}.json`);
    updatedCheckpoint.taskId = newTaskId;

    // Update cache keys
    this.checkpoints.delete(oldTaskId);
    this.checkpoints.set(newTaskId, updatedCheckpoint);

    try {
      await fs.rm(oldPath, { force: true });
    } catch (error) {
      this.logger.warn('Failed to delete old checkpoint file during association', {
        oldTaskId,
        newTaskId,
        error: (error as Error).message
      });
    }

    await this.persistCheckpoint(updatedCheckpoint);

    this.logger.info('Checkpoint task ID associated with real task ID', {
      oldTaskId,
      newTaskId,
      checkpointId: updatedCheckpoint.id
    });
  }

  /**
   * Mark checkpoint as paused (preserves state for later resume)
   */
  async pauseCheckpoint(taskId: string): Promise<void> {
    const checkpoint = this.checkpoints.get(taskId);
    if (checkpoint) {
      checkpoint.status = 'paused';
      await this.persistCheckpoint(checkpoint);
      // ✅ PHASE 2: Use logger for pause operation
      this.logger.info('Task paused with checkpoint', {
        taskId,
        checkpointId: checkpoint.id,
        iteration: checkpoint.iteration,
        totalIterations: checkpoint.totalIterations,
        progress: (checkpoint.currentNodeIndex / checkpoint.totalIterations) * 100
      });
    }
  }

  /**
   * Mark checkpoint as failed with error details
   */
  async failCheckpoint(
    taskId: string,
    error: { message: string; code: string },
    failurePoint?: string
  ): Promise<void> {
    const checkpoint = this.checkpoints.get(taskId);
    if (checkpoint) {
      checkpoint.status = 'failed';
      checkpoint.error = {
        message: error.message,
        code: error.code,
        timestamp: Date.now(),
      };
      checkpoint.failurePoint = failurePoint;
      await this.persistCheckpoint(checkpoint);
      // ✅ PHASE 2: Use logger for failure tracking
      this.logger.error(
        'Task failed at checkpoint',
        new Error(error.message),
        {
          taskId,
          checkpointId: checkpoint.id,
          failurePoint,
          iteration: checkpoint.iteration,
          error: error.code
        },
        ErrorCategory.AGENT,
        ErrorSeverity.MEDIUM,
        true // recoverable - can retry from checkpoint
      );
    }
  }

  /**
   * Mark checkpoint as completed
   */
  async completeCheckpoint(taskId: string, result: any): Promise<void> {
    const checkpoint = this.checkpoints.get(taskId);
    if (checkpoint) {
      checkpoint.status = 'completed';
      checkpoint.toolResults.push({
        toolName: 'workflow_complete',
        params: {},
        result,
        timestamp: Date.now(),
      });
      await this.persistCheckpoint(checkpoint);
      // ✅ PHASE 2: Use logger for completion
      this.logger.info('Task completed from checkpoint', {
        taskId,
        checkpointId: checkpoint.id,
        totalIterations: checkpoint.totalIterations,
        totalToolResults: checkpoint.toolResults.length
      });
    }
  }

  /**
   * Delete checkpoint (after successful completion or manual cleanup)
   */
  async deleteCheckpoint(taskId: string): Promise<void> {
    try {
      const filePath = path.join(this.checkpointDir, `${taskId}.json`);
      await fs.unlink(filePath);
      this.checkpoints.delete(taskId);
      // ✅ PHASE 2: Use logger for deletion
      this.logger.info('Checkpoint deleted', { taskId, path: filePath });
    } catch (error) {
      // ✅ PHASE 2: Use logger for deletion error
      this.logger.error(
        'Failed to delete checkpoint file',
        error as Error,
        { taskId },
        ErrorCategory.STORAGE,
        ErrorSeverity.LOW,
        true // recoverable - file cleanup not critical
      );
    }
  }

  /**
   * Get checkpoint status without loading full state
   */
  async getCheckpointStatus(taskId: string): Promise<{
    exists: boolean;
    status?: string;
    iteration?: number;
    failurePoint?: string;
    timestamp?: number;
  }> {
    const checkpoint = await this.loadCheckpoint(taskId);
    if (!checkpoint) {
      return { exists: false };
    }
    return {
      exists: true,
      status: checkpoint.status,
      iteration: checkpoint.iteration,
      failurePoint: checkpoint.failurePoint,
      timestamp: checkpoint.timestamp,
    };
  }

  /**
   * List all checkpoints
   */
  async listCheckpoints(): Promise<Checkpoint[]> {
    try {
      const files = await fs.readdir(this.checkpointDir);
      const checkpoints: Checkpoint[] = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          const taskId = file.replace('.json', '');
          const checkpoint = await this.loadCheckpoint(taskId);
          if (checkpoint) {
            checkpoints.push(checkpoint);
          }
        }
      }

      // ✅ PHASE 2: Use logger for checkpoint listing
      this.logger.debug('Listed all checkpoints', { count: checkpoints.length });

      return checkpoints.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      // ✅ PHASE 2: Use logger for listing error
      this.logger.error(
        'Failed to list checkpoints',
        error as Error,
        { path: this.checkpointDir },
        ErrorCategory.STORAGE,
        ErrorSeverity.MEDIUM,
        true // recoverable - can retry
      );
      return [];
    }
  }

  /**
   * Cleanup old checkpoints (older than maxAge milliseconds)
   */
  async cleanupOldCheckpoints(maxAge: number = 7 * 24 * 60 * 60 * 1000): Promise<number> {
    try {
      const checkpoints = await this.listCheckpoints();
      const now = Date.now();
      let deleted = 0;

      for (const checkpoint of checkpoints) {
        if (checkpoint.status === 'completed' && (now - checkpoint.timestamp) > maxAge) {
          await this.deleteCheckpoint(checkpoint.taskId);
          deleted++;
        }
      }

      if (deleted > 0) {
        // ✅ PHASE 2: Use logger for cleanup operation
        this.logger.info('Cleaned up old checkpoints', {
          count: deleted,
          totalBefore: checkpoints.length,
          maxAge
        });
      }

      return deleted;
    } catch (error) {
      // ✅ PHASE 2: Use logger for cleanup error
      this.logger.error(
        'Failed to cleanup old checkpoints',
        error as Error,
        { maxAge },
        ErrorCategory.STORAGE,
        ErrorSeverity.MEDIUM,
        true // recoverable - will retry next time
      );
      return 0;
    }
  }

  /**
   * Get checkpoint recovery summary (for UI display)
   */
  async getRecoverySummary(taskId: string): Promise<{
    canRecover: boolean;
    progress: number;
    lastNode: string;
    failureReason?: string;
    estimatedTokensSaved: number;
  } | null> {
    const checkpoint = await this.loadCheckpoint(taskId);
    if (!checkpoint) {
      return null;
    }

    const progress = (checkpoint.currentNodeIndex / checkpoint.totalIterations) * 100;
    const lastNode = checkpoint.completedNodes[checkpoint.completedNodes.length - 1];

    // Rough estimation: 1 node ≈ 500 tokens
    const nodesSaved = checkpoint.completedNodes.length;
    const estimatedTokensSaved = nodesSaved * 500;

    return {
      canRecover: checkpoint.status === 'paused' || checkpoint.status === 'failed',
      progress,
      lastNode,
      failureReason: checkpoint.error?.message,
      estimatedTokensSaved,
    };
  }

  /**
   * Force cleanup all checkpoints for a task (called on window close)
   */
  async forceCleanup(taskId: string): Promise<void> {
    try {
      const checkpoint = this.checkpoints.get(taskId);
      if (checkpoint && checkpoint.status === 'in_progress') {
        // Mark as paused instead of deleting, for potential recovery
        checkpoint.status = 'paused';
        await this.persistCheckpoint(checkpoint);

        // ✅ PHASE 2: Use logger for force cleanup
        this.logger.info('Force cleanup: task paused for recovery', {
          taskId,
          checkpointId: checkpoint.id,
          iteration: checkpoint.iteration
        });
      }
    } catch (error) {
      // ✅ PHASE 2: Use logger for force cleanup error
      this.logger.error(
        'Failed to perform force cleanup',
        error as Error,
        { taskId },
        ErrorCategory.AGENT,
        ErrorSeverity.MEDIUM,
        true // recoverable - cleanup next time
      );
    }
  }
}

// Export singleton instance
export const taskCheckpointManager = new TaskCheckpointManager();
