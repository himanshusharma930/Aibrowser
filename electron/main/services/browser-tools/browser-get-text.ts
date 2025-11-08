/**
 * Browser Get Text Tool
 *
 * Gets text content from a specific element using CSS selector.
 * Returns the trimmed text content of the matched element.
 *
 * @priority MEDIUM
 * @complexity LOW
 * @risk LOW
 */

import { Tool, AgentContext, ToolResult } from '@jarvis-agent/core';

interface BrowserGetTextArgs {
  selector: string;
}

export const browserGetTextTool: Tool = {
  name: 'browser_get_text',
  description: 'Get text content from a specific element using CSS selector. Returns the text content of the first matching element.',
  parameters: {
    type: 'object',
    properties: {
      selector: {
        type: 'string',
        description: 'CSS selector of the element to get text from (e.g., "#main-title", ".content-body", "h1")'
      }
    },
    required: ['selector']
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    const { selector } = args as BrowserGetTextArgs;

    try {
      // Use execute_script to get element text
      const text = await agentContext.agent.execute_script(
        agentContext,
        (sel: string) => {
          try {
            const element = document.querySelector(sel);
            if (!element) {
              return null;
            }
            const textContent = element.textContent?.trim();
            return textContent || '';
          } catch (e) {
            // If selector is invalid, return null
            return null;
          }
        },
        [selector]
      );

      // Check if selector was invalid or element not found
      if (text === null) {
        return {
          content: [{
            type: 'text',
            text: `No element found with selector: ${selector}`
          }],
          isError: true
        };
      }

      // Check if text is actually a string (not "Successful" or other unexpected value)
      if (typeof text !== 'string') {
        return {
          content: [{
            type: 'text',
            text: `Unexpected result type from selector: ${selector}. Got: ${typeof text}`
          }],
          isError: true
        };
      }

      return {
        content: [{ type: 'text', text: text }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error getting text: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
