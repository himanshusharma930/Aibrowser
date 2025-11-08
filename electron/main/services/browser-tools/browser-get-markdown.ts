/**
 * Browser Get Markdown Tool
 *
 * Extracts the HTML from the current page and converts it to markdown format.
 * Useful for extracting readable text from web pages for analysis or summarization.
 *
 * @priority HIGH
 * @complexity LOW
 * @risk LOW
 */

import { AgentContext } from '@jarvis-agent/core';
import type { Tool, ToolResult } from '@jarvis-agent/core/types';
import TurndownService from 'turndown';

export const browserGetMarkdownTool: Tool = {
  name: 'browser_get_markdown',
  description: 'Get the markdown content of the current page. Converts HTML to markdown format, useful for extracting readable text from web pages for analysis or summarization.',
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
      // Use execute_script to get page HTML
      // Note: We get both head and body content separately to avoid serialization issues
      const htmlContent = await agentContext.agent.execute_script(
        agentContext,
        () => {
          // Get head and body HTML separately
          const head = document.head ? document.head.innerHTML : '';
          const body = document.body ? document.body.innerHTML : '';
          const htmlTag = document.documentElement.outerHTML.match(/<html[^>]*>/i)?.[0] || '<html>';

          // Reconstruct the full HTML
          return `${htmlTag}<head>${head}</head><body>${body}</body></html>`;
        },
        []
      );

      // Validate HTML was retrieved
      if (!htmlContent || typeof htmlContent !== 'string') {
        return {
          content: [{
            type: 'text',
            text: 'Error: Failed to retrieve page HTML'
          }],
          isError: true
        };
      }

      // Convert HTML to Markdown using Turndown
      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
      });

      const markdown = turndownService.turndown(htmlContent);

      return {
        content: [{ type: 'text', text: markdown }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error getting markdown: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
