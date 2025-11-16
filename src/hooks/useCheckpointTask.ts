/**
 * useCheckpointTask Hook
 *
 * React hook for checkpoint-aware task execution with pause/resume capability.
 * Manages task state, streaming messages, and checkpoint recovery.
 *
 * Usage:
 * ```tsx
 * const { taskState, runTask, pauseTask, resumeTask, listCheckpoints } = useCheckpointTask();
 *
 * <button onClick={() => runTask("Search for latest news")}>
 *   {taskState.status === 'running' ? 'Running...' : 'Start Task'}
 * </button>
 * ```
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export interface TaskState {
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed';
  taskId: string | null;
  progress: number; // 0-100
  currentMessage: string;
  error: string | null;
  checkpointId: string | null;
  canResume: boolean;
  estimatedTokensSaved: number;
}

export interface StreamMessage {
  type: 'text_streaming' | 'tool_streaming' | 'tool_result' | 'error' | 'checkpoint_saved' | 'completed';
  content?: string;
  toolName?: string;
  message?: string;
  checkpointId?: string;
}

export function useCheckpointTask() {
  const [taskState, setTaskState] = useState<TaskState>({
    status: 'idle',
    taskId: null,
    progress: 0,
    currentMessage: '',
    error: null,
    checkpointId: null,
    canResume: false,
    estimatedTokensSaved: 0,
  });

  const [checkpoints, setCheckpoints] = useState<any[]>([]);
  const streamAbortRef = useRef<AbortController | null>(null);

  /**
   * Run task with checkpoint support
   */
  const runTask = useCallback(
    async (
      prompt: string,
      options?: {
        checkpointInterval?: number;
        agents?: string[];
      }
    ) => {
      try {
        // Check if resuming from checkpoint
        const existingCheckpoint = await window.api.eko.ekoCheckpointStatus(taskState.taskId || '');
        if (existingCheckpoint?.status && ['paused', 'failed'].includes(existingCheckpoint.status.status as string)) {
          const shouldResume = await new Promise(resolve => {
            // In real app, show UI dialog
            resolve(confirm(`Resume previous task? Progress: ${existingCheckpoint.summary?.progress?.toFixed(0)}%`));
          });
          if (shouldResume) {
            return resumeTask(taskState.taskId!);
          }
        }

        setTaskState(s => ({
          ...s,
          status: 'running',
          progress: 0,
          error: null,
          currentMessage: 'Starting task...',
        }));

        // Request checkpoint-aware execution
        const result = await window.api.eko.ekoRunCheckpoint(prompt, {
          checkpointInterval: options?.checkpointInterval || 10,
          agents: options?.agents,
        });

        // Set task ID once we know it
        const taskId = result.id || `task_${Date.now()}`;
        setTaskState(s => ({ ...s, taskId }));

        // Listen to stream events
        streamAbortRef.current = new AbortController();
        const handleMessage = (event: any, message: StreamMessage) => {
          if (message.type === 'text_streaming') {
            setTaskState(s => ({
              ...s,
              currentMessage: message.content || '',
            }));
          } else if (message.type === 'tool_streaming') {
            setTaskState(s => ({
              ...s,
              currentMessage: `Executing: ${message.toolName}`,
            }));
          } else if (message.type === 'checkpoint_saved') {
            setTaskState(s => ({
              ...s,
              checkpointId: message.checkpointId || null,
              progress: Math.min(s.progress + 5, 95),
              canResume: true,
            }));
          } else if (message.type === 'error') {
            setTaskState(s => ({
              ...s,
              status: 'failed',
              error: message.message || null,
              canResume: true, // Can resume after error
            }));
          } else if (message.type === 'completed') {
            setTaskState(s => ({
              ...s,
              status: 'completed',
              progress: 100,
              currentMessage: 'Task completed',
            }));
          }
        };

        // Register listener (IPC event)
        if (window.api?.onEkoStreamMessage) {
          window.api.onEkoStreamMessage(handleMessage);
        }

        // Wait for completion
        await result.promise;
      } catch (error: any) {
        setTaskState(s => ({
          ...s,
          status: 'failed',
          error: error.message,
          canResume: true,
        }));
      }
    },
    [taskState.taskId]
  );

  /**
   * Pause running task
   */
  const pauseTask = useCallback(async () => {
    if (!taskState.taskId) return;

    try {
      const result = await window.api.eko.ekoPauseTask(taskState.taskId);
      setTaskState(s => ({
        ...s,
        status: 'paused',
        canResume: true,
        currentMessage: 'Task paused',
      }));

      // Get checkpoint info for UI
      const status = await window.api.eko.ekoCheckpointStatus(taskState.taskId);
      if (status?.summary !== null && status?.summary !== undefined) {
        setTaskState(s => ({
          ...s,
          progress: status.summary!.progress,
          estimatedTokensSaved: status.summary!.estimatedTokensSaved,
        }));
      }
    } catch (error: any) {
      setTaskState(s => ({
        ...s,
        error: `Failed to pause: ${error.message}`,
      }));
    }
  }, [taskState.taskId]);

  /**
   * Resume paused task from checkpoint
   */
  const resumeTask = useCallback(async (taskId: string) => {
    try {
      setTaskState(s => ({
        ...s,
        status: 'running',
        error: null,
        currentMessage: 'Resuming task from checkpoint...',
      }));

      const result = await window.api.eko.ekoResumeTask(taskId);

      // Listen to stream events again
      if (window.api?.eko?.onEkoStreamMessage) {
        window.api.eko.onEkoStreamMessage((event: any, message: StreamMessage) => {
          if (message.type === 'completed') {
            setTaskState(s => ({
              ...s,
              status: 'completed',
              progress: 100,
            }));
          } else if (message.type === 'error') {
            setTaskState(s => ({
              ...s,
              status: 'failed',
              error: message.message || null,
            }));
          }
        });
      }

      try {
        await result.promise;
      } finally {
        // Listener cleanup not supported by current API
        // onEkoStreamMessage doesn't return cleanup function
      }
    } catch (error: any) {
      setTaskState(s => ({
        ...s,
        status: 'failed',
        error: `Failed to resume: ${error.message}`,
      }));
    }
  }, []);

  /**
   * List all available checkpoints for recovery
   */
  const listCheckpoints = useCallback(async () => {
    try {
      const checkpoints = await window.api.eko.ekoListCheckpoints();
      setCheckpoints(checkpoints);
      return checkpoints;
    } catch (error: any) {
      console.error('Failed to list checkpoints:', error);
      return [];
    }
  }, []);

  /**
   * Delete checkpoint (cleanup)
   */
  const deleteCheckpoint = useCallback(async (taskId: string) => {
    try {
      await window.api.eko.ekoDeleteCheckpoint(taskId);
      setCheckpoints(cp => cp.filter(c => c.taskId !== taskId));
    } catch (error: any) {
      console.error('Failed to delete checkpoint:', error);
    }
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (streamAbortRef.current) {
        streamAbortRef.current.abort();
      }
    };
  }, []);

  return {
    taskState,
    runTask,
    pauseTask,
    resumeTask,
    listCheckpoints,
    deleteCheckpoint,
    checkpoints,
  };
}
