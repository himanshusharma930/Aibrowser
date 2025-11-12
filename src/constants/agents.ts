/**
 * Application Constants - Agent Configuration
 *
 * Defines application-wide constants including agent types and feature flags.
 */

/**
 * Agents that should display detailed panel output
 *
 * These agents execute tasks that produce visual/detailed results that users
 * should see in real-time in the detail panel:
 *
 * - **Browser**: Web automation tasks that interact with web pages
 *   (clicking, typing, scrolling, form submission, etc.)
 *
 * - **File**: File system operations and content viewing
 *   (reading files, navigating directories, viewing content)
 *
 * When these agents execute tool calls, the detail panel automatically shows:
 * - Tool execution status (running/completed/error)
 * - Browser URL or file path
 * - Tool execution history with playback controls
 * - Screenshots for Browser tasks
 *
 * Used in:
 * - main.tsx:455 - Conditionally show detail panel on tool execution
 * - main.tsx:514 - Conditionally take screenshots on tool completion
 *
 * @type {string[]}
 */
export const DETAIL_PANEL_AGENTS = ['Browser', 'File'] as const

/**
 * Type-safe agent name union
 * Used to ensure only valid agent names are used throughout the application
 */
export type DetailPanelAgent = (typeof DETAIL_PANEL_AGENTS)[number]

/**
 * Check if an agent should display detailed output
 *
 * @param agentName - The agent name to check
 * @returns True if the agent displays detailed output, false otherwise
 */
export function isDetailPanelAgent(agentName: string): agentName is DetailPanelAgent {
  return DETAIL_PANEL_AGENTS.includes(agentName as DetailPanelAgent)
}
