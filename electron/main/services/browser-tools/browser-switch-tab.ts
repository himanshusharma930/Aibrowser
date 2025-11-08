/**
 * Browser Switch Tab Tool
 *
 * Switches to a specific tab by ID. Uses the agent's built-in tab management.
 *
 * @priority HIGH
 * @complexity HIGH
 * @risk MEDIUM
 * @phase 2
 */

import { Tool, AgentContext, ToolResult } from '@jarvis-agent/core';

interface BrowserSwitchTabArgs {
  tabId: number;
}

export const browserSwitchTabTool: Tool = {
  name: 'browser_switch_tab',
  description: 'Switch to a specific browser tab by its ID. Use browser_get_all_tabs tool first to get available tab IDs.',
  parameters: {
    type: 'object',
    properties: {
      tabId: {
        type: 'number',
        description: 'ID of the tab to switch to (obtained from browser_get_all_tabs)'
      }
    },
    required: ['tabId']
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    const { tabId } = args as BrowserSwitchTabArgs;

    try {
      // Use the agent's switch_tab method
      const result = await agentContext.agent.switch_tab(agentContext, tabId);

      return {
        content: [{
          type: 'text',
          text: `Switched to tab ${result.tabId}: ${result.title || result.url}`
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error switching tab: ${error.message}. Make sure to use browser_get_all_tabs first to get valid tab IDs.`
        }],
        isError: true
      };
    }
  }
};
