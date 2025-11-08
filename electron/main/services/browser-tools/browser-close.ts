/**
 * Browser Close Tool
 *
 * Closes the entire browser instance when the task is complete.
 * This is different from browser_close_tab which only closes the current tab.
 *
 * @phase 5
 * @priority LOW
 * @complexity LOW
 * @risk LOW
 */

import type { Tool, ToolResult } from '@jarvis-agent/core/types';
import type { AgentContext } from '@jarvis-agent/core';

export const browserCloseTool: Tool = {
  name: 'browser_close',
  description: 'Close the entire browser instance when the task is done and the browser is not needed anymore. Use browser_close_tab to close only the current tab.',
  parameters: {
    type: 'object',
    properties: {},
    required: []
  },
  execute: async (
    _args: Record<string, unknown>,
    _agentContext: AgentContext
  ): Promise<ToolResult> => {
    try {
      // Note: In the Electron environment, we don't actually want to close the browser
      // as it's the main application window. Instead, we'll navigate to a blank page
      // or return a message indicating the task is complete.

      // For a true browser close, you would need to integrate with the browser manager
      // and call something like: browserManager.close_instance(instance_id)

      return {
        content: [{
          type: 'text',
          text: 'Browser close requested. In Electron environment, the browser window remains open. Use the application close button to exit.'
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error closing browser: ${error.message}`
        }],
        isError: true
      };
    }
  }
};