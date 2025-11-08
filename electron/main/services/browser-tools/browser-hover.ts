/**
 * Browser Hover Tool
 *
 * Hovers over an element on the page using either index or CSS selector.
 * Triggers hover states and related events.
 *
 * @phase 4
 * @priority MEDIUM
 * @complexity LOW
 * @risk LOW
 */

import type { Tool, ToolResult } from '@jarvis-agent/core/types';
import type { AgentContext } from '@jarvis-agent/core';

interface BrowserHoverArgs {
  index?: number;
  selector?: string;
}

export const browserHoverTool: Tool = {
  name: 'browser_hover',
  description: 'Hover over an element on the page. Either index or selector must be provided.',
  parameters: {
    type: 'object',
    properties: {
      index: {
        type: 'number',
        description: 'Index of the element to hover (from browser_get_clickable_elements)'
      },
      selector: {
        type: 'string',
        description: 'CSS selector for the element to hover'
      }
    },
    required: []
  },
  execute: async (
    args: BrowserHoverArgs,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    try {
      if (!args.index && !args.selector) {
        return {
          content: [{
            type: 'text',
            text: 'Error: Either index or selector must be provided'
          }],
          isError: true
        };
      }

      const result = await (agentContext.agent as any).execute_script(agentContext, 
        agentContext,
        (index: number | undefined, selector: string | undefined) => {
          let element: Element | null = null;

          if (selector) {
            element = document.querySelector(selector);
          } else if (index !== undefined) {
            // Get element by index from all interactive elements
            const clickableSelectors = [
              'a[href]', 'button', 'input', 'select', 'textarea',
              '[onclick]', '[role="button"]', '[role="link"]', '[tabindex]'
            ];
            const elements = document.querySelectorAll(clickableSelectors.join(','));
            element = elements[index] || null;
          }

          if (!element) {
            return {
              success: false,
              message: `Element not found for ${selector ? `selector: ${selector}` : `index: ${index}`}`
            };
          }

          const htmlEl = element as HTMLElement;

          // Trigger hover events
          const mouseoverEvent = new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          const mouseenterEvent = new MouseEvent('mouseenter', {
            bubbles: true,
            cancelable: true,
            view: window
          });

          htmlEl.dispatchEvent(mouseoverEvent);
          htmlEl.dispatchEvent(mouseenterEvent);

          // Scroll into view if needed
          htmlEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

          return {
            success: true,
            tagName: htmlEl.tagName.toLowerCase(),
            text: htmlEl.innerText?.trim().substring(0, 50) || '',
            message: `Successfully hovered over ${htmlEl.tagName.toLowerCase()}`
          };
        },
        [args.index, args.selector]
      );

      if (!result.success) {
        return {
          content: [{
            type: 'text',
            text: result.message
          }],
          isError: true
        };
      }

      return {
        content: [{
          type: 'text',
          text: `${result.message}${result.text ? `: "${result.text}"` : ''}`
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error hovering element: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
