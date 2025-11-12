/**
 * useEkoStreamHandler Hook
 *
 * Encapsulates message stream processing logic including:
 * - Stream message handling
 * - Task ID reconciliation (temporary → real)
 * - Tool state updates
 * - Detail panel visibility management
 *
 * This hook extracts complex stream handling from main.tsx to improve
 * component readability, testability, and separation of concerns.
 */

import { useCallback } from 'react'
import type { StreamCallbackMessage } from '@jarvis-agent/core/dist/types'
import type { MessageProcessor } from '@/utils/messageTransform'
import type { Task, ToolAction } from '@/models'
import type { CurrentToolState } from '@/types/tool'
import { DETAIL_PANEL_AGENTS } from '@/constants/agents'

/**
 * Helper function to build task update object based on message type
 */
const buildTaskUpdates = (
  message: StreamCallbackMessage,
  updatedMessages: Task['messages']
): Partial<Task> => {
  const updates: Partial<Task> = { messages: updatedMessages }

  if (message.type === 'workflow' && message.workflow?.name) {
    updates.name = message.workflow.name
    updates.workflow = message.workflow
  }

  if (message.type === 'error') {
    updates.status = 'error'
  }

  return updates
}

/**
 * Options for useEkoStreamHandler hook
 */
interface UseEkoStreamHandlerOptions {
  isHistoryMode: boolean
  messageProcessorRef: React.MutableRefObject<MessageProcessor>
  taskIdRef: React.MutableRefObject<string>
  currentTaskId: string | undefined
  setCurrentTaskId: (taskId: string) => void
  replaceTaskId: (tempId: string, realId: string) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  setCurrentTool: (tool: CurrentToolState | null) => void
  setShowDetail: (show: boolean) => void
  handleToolComplete: (message: ToolAction) => Promise<void>
  getToolOperation: (message: StreamCallbackMessage) => string
  getToolStatus: (messageType: string) => 'running' | 'completed' | 'error'
}

/**
 * Hook for handling Eko stream messages
 *
 * Centralizes message processing logic that was previously scattered in main.tsx callback
 * Returns a memoized onMessage handler suitable for Eko integration
 *
 * @param options - Configuration options for stream handling
 * @returns Object containing memoized onMessage handler
 */
export const useEkoStreamHandler = ({
  isHistoryMode,
  messageProcessorRef,
  taskIdRef,
  currentTaskId,
  setCurrentTaskId,
  replaceTaskId,
  updateTask,
  setCurrentTool,
  setShowDetail,
  handleToolComplete,
  getToolOperation,
  getToolStatus,
}: UseEkoStreamHandlerOptions) => {
  /**
   * Main message handler for stream events
   * Memoized to prevent unnecessary re-renders and stale closures
   */
  const onMessage = useCallback(
    (message: StreamCallbackMessage) => {
      // Skip processing if in history mode
      if (isHistoryMode) return

      // Process message to update message list
      const updatedMessages = messageProcessorRef.current.processStreamMessage(message)

      // Handle task ID replacement: temporary task ID → real task ID
      const isCurrentTaskTemporary = taskIdRef.current?.startsWith('temp-')
      const hasRealTaskId = message.taskId && !message.taskId.startsWith('temp-')

      if (isCurrentTaskTemporary && hasRealTaskId) {
        const tempTaskId = taskIdRef.current
        const realTaskId = message.taskId

        // Replace temporary task with real task
        replaceTaskId(tempTaskId, realTaskId)
        taskIdRef.current = realTaskId

        // Update task with message and workflow info
        updateTask(realTaskId, buildTaskUpdates(message, updatedMessages))
        return // Exit early after task ID replacement
      }

      // Set task ID if not already set and not temporary
      if (message.taskId && !currentTaskId && !message.taskId.startsWith('temp-')) {
        setCurrentTaskId(message.taskId)
      }

      // Update or create task with new messages
      const taskIdToUpdate = message.taskId || taskIdRef.current
      if (taskIdToUpdate) {
        updateTask(taskIdToUpdate, buildTaskUpdates(message, updatedMessages))
      }

      // Handle tool call messages - update tool state and show detail panel
      if (message.type.includes('tool')) {
        const toolName = (message as any).toolName || 'Unknown tool'
        const operation = getToolOperation(message)
        const status = getToolStatus(message.type)

        // Update current tool state
        setCurrentTool({
          toolName,
          operation,
          status,
        })

        // Show detail panel for Browser and File agents
        if (DETAIL_PANEL_AGENTS.includes((message as any).agentName)) {
          setShowDetail(true)
        }

        // Handle tool result - capture screenshot and update history
        if (message.type === 'tool_result') {
          void handleToolComplete({
            type: 'tool',
            id: (message as any).toolId,
            toolName: (message as any).toolName,
            status: 'completed',
            timestamp: new Date(),
            agentName: (message as any).agentName,
          })
        }
      }
    },
    [
      isHistoryMode,
      currentTaskId,
      messageProcessorRef,
      taskIdRef,
      replaceTaskId,
      setCurrentTaskId,
      updateTask,
      setCurrentTool,
      setShowDetail,
      handleToolComplete,
      getToolOperation,
      getToolStatus,
    ]
  )

  return { onMessage }
}
