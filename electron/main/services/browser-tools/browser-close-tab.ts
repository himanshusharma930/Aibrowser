/**
 * Browser Close Tab Tool
 *
 * Closes the current browser tab. In the single WebContentsView architecture,
 * this navigates back to the home page or a blank page.
 *
 * @priority HIGH
 * @complexity HIGH
 * @risk MEDIUM
 * @phase 2
 */

import { Tool, AgentContext, ToolResult } from '@jarvis-agent/core';

export const browserCloseTabTool: Tool = {
  name: 'browser_close_tab',
  description: 'Close the current browser tab. In the current architecture, this navigates back in history or to a blank page if no history exists.',
  parameters: {
    type: 'object',
    properties: {},
    required: []
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    try {
      // Try to go back in history first
      try {
        await agentContext.agent.go_back(agentContext);

        return {
          content: [{
            type: 'text',
            text: 'Closed current tab (navigated back in history)'
          }],
          isError: false
        };
      } catch (backError) {
        // If going back fails, navigate to about:blank
        await agentContext.agent.navigate_to(agentContext, 'about:blank');

        return {
          content: [{
            type: 'text',
            text: 'Closed current tab (navigated to blank page - no history available)'
          }],
          isError: false
        };
      }
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error closing tab: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
