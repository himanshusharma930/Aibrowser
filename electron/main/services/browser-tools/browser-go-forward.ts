/**
 * Browser Go Forward Tool
 *
 * Navigates forward in browser history (opposite of go_back).
 * Useful for moving forward after going back in history.
 *
 * @priority LOW
 * @complexity LOW
 * @risk LOW
 */

import { Tool, AgentContext, ToolResult } from '@jarvis-agent/core';

export const browserGoForwardTool: Tool = {
  name: 'browser_go_forward',
  description: 'Navigate forward in browser history. This is the opposite of go_back and only works if you have previously navigated backward.',
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
      // Use execute_script to call history.forward()
      await agentContext.agent.execute_script(
        agentContext,
        () => {
          window.history.forward();
        },
        []
      );

      // Wait for navigation to complete
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        content: [{
          type: 'text',
          text: 'Navigated forward in browser history.'
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error going forward: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
