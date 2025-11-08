/**
 * Browser Scroll Tool
 *
 * Scrolls the page in a specified direction (up/down/left/right) or to top/bottom.
 * Supports both vertical and horizontal scrolling.
 * Returns current scroll position after scrolling.
 *
 * @priority MEDIUM
 * @complexity MEDIUM
 * @risk LOW
 */

import { Tool, AgentContext, ToolResult } from '@jarvis-agent/core';

interface BrowserScrollArgs {
  direction: 'up' | 'down' | 'left' | 'right' | 'top' | 'bottom';
  amount?: number;
}

export const browserScrollTool: Tool = {
  name: 'browser_scroll',
  description: 'Scroll the page in a specified direction. Can scroll by a specific amount (up/down/left/right) or to absolute positions (top/bottom). Returns the current scroll position after scrolling.',
  parameters: {
    type: 'object',
    properties: {
      direction: {
        type: 'string',
        enum: ['up', 'down', 'left', 'right', 'top', 'bottom'],
        description: 'Direction to scroll: "up" (scroll up by amount), "down" (scroll down by amount), "left" (scroll left by amount), "right" (scroll right by amount), "top" (scroll to page top), "bottom" (scroll to page bottom)'
      },
      amount: {
        type: 'number',
        description: 'Pixels to scroll for "up", "down", "left", or "right" directions. Default: 500. Ignored for "top" and "bottom" directions.'
      }
    },
    required: ['direction']
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    const { direction, amount = 500 } = args as BrowserScrollArgs;

    try {
      // Use execute_script to scroll
      const result = await agentContext.agent.execute_script(
        agentContext,
        (dir: string, amt: number) => {
          let scrollX = 0;
          let scrollY = 0;

          switch (dir) {
            case 'up':
              scrollY = -amt;
              window.scrollBy(0, scrollY);
              break;
            case 'down':
              scrollY = amt;
              window.scrollBy(0, scrollY);
              break;
            case 'left':
              scrollX = -amt;
              window.scrollBy(scrollX, 0);
              break;
            case 'right':
              scrollX = amt;
              window.scrollBy(scrollX, 0);
              break;
            case 'top':
              window.scrollTo(0, 0);
              scrollY = -window.scrollY;
              break;
            case 'bottom':
              window.scrollTo(0, document.body.scrollHeight);
              scrollY = document.body.scrollHeight - window.scrollY;
              break;
          }

          return {
            newScrollX: window.scrollX,
            newScrollY: window.scrollY,
            scrollWidth: document.body.scrollWidth,
            scrollHeight: document.body.scrollHeight,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight
          };
        },
        [direction, amount]
      );

      return {
        content: [{
          type: 'text',
          text: `Scrolled ${direction}. Current position: X=${result.newScrollX}px / ${result.scrollWidth}px, Y=${result.newScrollY}px / ${result.scrollHeight}px (viewport: ${result.viewportWidth}x${result.viewportHeight}px)`
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error scrolling: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
