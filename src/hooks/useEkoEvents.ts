/**
 * useEkoEvents Hook
 *
 * Centralizes Electron IPC event handling for:
 * - History panel visibility
 * - Task aborted by system
 * - Task execution completion
 *
 * This hook extracts scattered event listener logic from main.tsx to:
 * - Eliminate duplicate removeAllListeners calls
 * - Provide typed event handlers
 * - Ensure consistent cleanup
 * - Improve code organization
 */

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { App } from 'antd'
import { useHistoryStore } from '@/stores/historyStore'
import type { Task } from '@/models'
import { scheduledTaskStorage } from '@/lib/scheduled-task-storage'

/**
 * Typed payload for task aborted events
 */
type TaskAbortedPayload = {
  taskId: string
  reason: string
  timestamp: number
}

/**
 * Typed payload for task execution complete events
 */
type TaskExecutionCompletePayload = {
  taskId: string
  executionId: string
  status: Task['status']
  endTime?: string
}

/**
 * Typed payload for open history panel events
 */
type OpenHistoryPayload = Record<string, unknown>

/**
 * Window API interface for event handling
 */
interface WindowApi {
  onOpenHistoryPanel?: (handler: (payload: OpenHistoryPayload) => void) => void
  onTaskAbortedBySystem?: (handler: (payload: TaskAbortedPayload) => void) => void
  onTaskExecutionComplete?: (handler: (payload: TaskExecutionCompletePayload) => Promise<void>) => void
  removeAllListeners?: (event: string) => void
}

/**
 * Options for useEkoEvents hook
 */
interface UseEkoEventsOptions {
  isTaskDetailMode: boolean
  tasks: Task[]
  updateTask: (taskId: string, updates: Partial<Task>) => void
  scheduledTaskIdFromUrl?: string
  taskIdRef: React.MutableRefObject<string>
}

/**
 * Hook for managing Electron IPC event listeners
 *
 * Handles three main event types:
 * 1. History panel toggle - triggered from external windows
 * 2. Task aborted by system - system-level task termination
 * 3. Task completion - scheduled task execution completion
 *
 * @param options - Configuration options for event handling
 */
export const useEkoEvents = ({
  isTaskDetailMode,
  tasks,
  updateTask,
  scheduledTaskIdFromUrl,
  taskIdRef,
}: UseEkoEventsOptions) => {
  const { t } = useTranslation('main')
  const { message: antdMessage } = App.useApp()

  const api = window.api as WindowApi

  /**
   * Handle open history panel event
   * Triggered from external windows to show history in main window
   */
  useEffect(() => {
    if (!isTaskDetailMode || !api?.onOpenHistoryPanel) return

    const handleOpenHistoryPanel = (_payload: OpenHistoryPayload) => {
      const { setShowHistoryPanel } = useHistoryStore.getState()
      setShowHistoryPanel(true)
    }

    api.onOpenHistoryPanel(handleOpenHistoryPanel)

    return () => {
      api?.removeAllListeners?.('open-history-panel')
    }
  }, [isTaskDetailMode, api])

  /**
   * Handle task aborted by system event
   * Triggered when system terminates a task
   */
  useEffect(() => {
    if (!api?.onTaskAbortedBySystem) return

    const handleTaskAbortedBySystem = (payload: TaskAbortedPayload) => {
      const { taskId, reason, timestamp } = payload

      try {
        updateTask(taskId, {
          status: 'abort',
          endTime: new Date(timestamp),
        })

        antdMessage.warning(
          t('task_terminated_with_reason', { reason: reason || 'Unknown reason' })
        )
      } catch (error) {
        console.error('[Eko Events] Failed to update aborted task:', error)
      }
    }

    api.onTaskAbortedBySystem(handleTaskAbortedBySystem)

    return () => {
      api?.removeAllListeners?.('task-aborted-by-system')
    }
  }, [updateTask, antdMessage, t, api])

  /**
   * Handle task execution completion event
   * Triggered when scheduled task completes execution
   */
  useEffect(() => {
    if (!isTaskDetailMode || !api?.onTaskExecutionComplete) return

    const handleTaskExecutionComplete = async (payload: TaskExecutionCompletePayload) => {
      const { taskId, status, endTime: endTimeStr } = payload

      try {
        const endTimeDate = endTimeStr ? new Date(endTimeStr) : new Date()

        // Update current task with completion info
        if (taskIdRef.current) {
          const currentTask = tasks.find((t) => t.id === taskIdRef.current)
          const startTime = currentTask?.startTime || currentTask?.createdAt

          updateTask(taskIdRef.current, {
            endTime: endTimeDate,
            duration: startTime ? endTimeDate.getTime() - startTime.getTime() : undefined,
            status,
          })
        }

        // Update scheduled task's last execution time
        const scheduledTaskId = scheduledTaskIdFromUrl || taskId
        if (scheduledTaskId) {
          await scheduledTaskStorage.updateScheduledTask(scheduledTaskId, {
            lastExecutedAt: endTimeDate,
          })
        }

        antdMessage.success(t('task_execution_completed'))
      } catch (error) {
        console.error('[Eko Events] Failed to update task completion:', error)
        antdMessage.error(t('failed_update_task_status'))
      }
    }

    api.onTaskExecutionComplete(handleTaskExecutionComplete)

    return () => {
      api?.removeAllListeners?.('task-execution-complete')
    }
  }, [isTaskDetailMode, tasks, updateTask, scheduledTaskIdFromUrl, taskIdRef, antdMessage, t, api])
}
