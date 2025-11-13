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
      Log.info('[TaskCheckpoint] Checkpoint directory initialized:', this.checkpointDir);
    } catch (error) {
      Log.error('[TaskCheckpoint] Failed to initialize checkpoint directory:', error);
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

    Log.info(`[TaskCheckpoint] Created checkpoint ${checkpoint.id} for task ${taskId}`);
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
      Log.warn(`[TaskCheckpoint] Checkpoint not found for task ${taskId}`);
      return null;
    }

    const updated = {
      ...checkpoint,
      ...updates,
      timestamp: Date.now(), // Always update timestamp
    };

    this.checkpoints.set(taskId, updated);
    await this.persistCheckpoint(updated);

    Log.debug(`[TaskCheckpoint] Updated checkpoint ${checkpoint.id} for task ${taskId}`);
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
      Log.debug(`[TaskCheckpoint] Persisted checkpoint to ${filePath}`);
    } catch (error) {
      Log.error('[TaskCheckpoint] Failed to persist checkpoint:', error);
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
      Log.info(`[TaskCheckpoint] Loaded checkpoint from disk for task ${taskId}`);
      return checkpoint;
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        Log.debug(`[TaskCheckpoint] No checkpoint found for task ${taskId}`);
        return null;
      }
      Log.error('[TaskCheckpoint] Failed to load checkpoint:', error);
      return null;
    }
  }

  /**
   * Mark checkpoint as paused (preserves state for later resume)
   */
  async pauseCheckpoint(taskId: string): Promise<void> {
    const checkpoint = this.checkpoints.get(taskId);
    if (checkpoint) {
      checkpoint.status = 'paused';
      await this.persistCheckpoint(checkpoint);
      Log.info(`[TaskCheckpoint] Paused task ${taskId}`);
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
      Log.error(`[TaskCheckpoint] Failed task ${taskId} at ${failurePoint}: ${error.message}`);
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
      Log.info(`[TaskCheckpoint] Completed task ${taskId}`);
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
      Log.info(`[TaskCheckpoint] Deleted checkpoint for task ${taskId}`);
    } catch (error) {
      Log.warn(`[TaskCheckpoint] Failed to delete checkpoint for task ${taskId}:`, error);
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

      return checkpoints.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      Log.error('[TaskCheckpoint] Failed to list checkpoints:', error);
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

      Log.info(`[TaskCheckpoint] Cleaned up ${deleted} old checkpoints`);
      return deleted;
    } catch (error) {
      Log.error('[TaskCheckpoint] Failed to cleanup old checkpoints:', error);
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
      }
      Log.info(`[TaskCheckpoint] Forced cleanup for task ${taskId}`);
    } catch (error) {
      Log.error('[TaskCheckpoint] Failed to force cleanup:', error);
    }
  }
}

// Export singleton instance
export const taskCheckpointManager = new TaskCheckpointManager();
