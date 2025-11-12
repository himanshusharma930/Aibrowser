/**
 * Tool Execution State Types
 *
 * Defines types for tracking tool execution status and information
 * throughout the application lifecycle.
 */

/**
 * Current tool execution information
 *
 * @property toolName - Name of the tool being executed (e.g., 'click', 'type', 'screenshot')
 * @property operation - Description of the operation being performed
 * @property status - Current execution status: 'running', 'completed', or 'error'
 */
export interface CurrentToolState {
  toolName: string
  operation: string
  status: 'running' | 'completed' | 'error'
}
