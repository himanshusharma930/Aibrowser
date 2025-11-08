/**
 * Browser Read Links Tool
 *
 * Reads all links from the current page and returns them as a formatted list.
 * Each link includes its text content and href URL.
 *
 * @priority HIGH
 * @complexity LOW
 * @risk LOW
 */

import { AgentContext } from '@jarvis-agent/core';
import type { Tool, ToolResult } from '@jarvis-agent/core/types';

export const browserReadLinksTool: Tool = {
  name: 'browser_read_links',
  description: 'Read all links from the current page. Returns a formatted list of all anchor tags with their text and href URLs.',
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
      // Use execute_script to extract all links
      const links = await agentContext.agent.execute_script(
        agentContext,
        () => {
          const anchors = Array.from(document.querySelectorAll('a[href]'));
          return anchors.map((a: any) => ({
            text: a.textContent?.trim() || '',
            href: a.href
          }));
        },
        []
      );

      // Format links as numbered list
      const linksText = links
        .map((link: any, idx: number) => `${idx + 1}. ${link.text} (${link.href})`)
        .join('\n');

      return {
        content: [{
          type: 'text',
          text: linksText || 'No links found on page.'
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error reading links: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
