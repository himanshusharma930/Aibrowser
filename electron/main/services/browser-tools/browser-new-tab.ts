/**
 * Browser New Tab Tool
 *
 * Opens a new URL in the browser. Note: In the current Electron WebContentsView architecture,
 * this navigates the current view to the new URL rather than creating a separate tab.
 *
 * @priority HIGH
 * @complexity HIGH
 * @risk MEDIUM
 * @phase 2
 */

import { AgentContext } from '@jarvis-agent/core';
import type { Tool, ToolResult } from '@jarvis-agent/core/types';

interface BrowserNewTabArgs {
  url: string;
}

export const browserNewTabTool: Tool = {
  name: 'browser_new_tab',
  description: 'Navigate to a new URL. Opens the specified URL in the browser. Note: This navigates to the URL in the current browser view.',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL to open (must include protocol, e.g., "https://example.com")'
      }
    },
    required: ['url']
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    const { url } = args as BrowserNewTabArgs;

    try {
      // Validate URL format
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return {
          content: [{
            type: 'text',
            text: `Invalid URL: ${url}. URL must start with http:// or https://`
          }],
          isError: true
        };
      }

      // Use the agent's navigate_to method to open the URL
      const result = await agentContext.agent.navigate_to(agentContext, url);

      return {
        content: [{
          type: 'text',
          text: `Navigated to: ${result.url}${result.title ? ` (${result.title})` : ''}`
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error opening new tab: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
