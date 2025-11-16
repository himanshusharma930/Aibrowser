/**
 * Browser Get Clickable Elements Tool
 *
 * Extracts all clickable, hoverable, and selectable elements from the page.
 * Returns indexed list of interactive elements with their properties.
 *
 * @phase 4
 * @priority HIGH
 * @complexity MEDIUM
 * @risk LOW
 */

import type { Tool, ToolResult } from '@jarvis-agent/core/types';
import type { AgentContext } from '@jarvis-agent/core';

interface ClickableElement {
  index: number;
  tagName: string;
  type?: string;
  text: string;
  selector: string;
  attributes: Record<string, string>;
  isVisible: boolean;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const browserGetClickableElementsTool: Tool = {
  name: 'browser_get_clickable_elements',
  description: 'Get all clickable, hoverable, or selectable elements on the current page. Returns indexed list of interactive elements with their properties.',
  parameters: {
    type: 'object',
    properties: {
      includeHidden: {
        type: 'boolean',
        description: 'Include hidden elements (default: false)'
      }
    },
    required: []
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    try {
      const includeHidden = args.includeHidden === true;

      const elements: ClickableElement[] = await agentContext.agent.execute_script(
        agentContext,
        (includeHidden: boolean) => {
          const clickableSelectors = [
            'a[href]',
            'button',
            'input[type="button"]',
            'input[type="submit"]',
            'input[type="reset"]',
            'input[type="checkbox"]',
            'input[type="radio"]',
            'select',
            'textarea',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="password"]',
            'input[type="search"]',
            'input[type="tel"]',
            'input[type="url"]',
            'input[type="number"]',
            '[onclick]',
            '[role="button"]',
            '[role="link"]',
            '[role="menuitem"]',
            '[role="tab"]',
            '[tabindex]'
          ];

          const elements = document.querySelectorAll(clickableSelectors.join(','));
          const results: any[] = [];

          elements.forEach((el, index) => {
            const htmlEl = el as HTMLElement;
            const rect = htmlEl.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(htmlEl);

            const isVisible = rect.width > 0 &&
                             rect.height > 0 &&
                             computedStyle.visibility !== 'hidden' &&
                             computedStyle.display !== 'none' &&
                             computedStyle.opacity !== '0';

            if (!includeHidden && !isVisible) {
              return;
            }

            // Generate CSS selector
            let selector = htmlEl.tagName.toLowerCase();
            if (htmlEl.id) {
              selector = `#${htmlEl.id}`;
            } else if (htmlEl.className) {
              const classes = htmlEl.className.split(' ').filter(c => c).join('.');
              if (classes) selector += `.${classes}`;
            }

            // Get attributes
            const attributes: Record<string, string> = {};
            Array.from(htmlEl.attributes).forEach(attr => {
              attributes[attr.name] = attr.value;
            });

            results.push({
              index,
              tagName: htmlEl.tagName.toLowerCase(),
              type: (htmlEl as HTMLInputElement).type || undefined,
              text: htmlEl.innerText?.trim().substring(0, 100) || htmlEl.getAttribute('aria-label') || '',
              selector,
              attributes,
              isVisible,
              boundingBox: {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
              }
            });
          });

          return results;
        },
        [includeHidden]
      );

      const summary = `Found ${elements.length} interactive elements:\n` +
        `- ${elements.filter(e => e.tagName === 'a').length} links\n` +
        `- ${elements.filter(e => e.tagName === 'button').length} buttons\n` +
        `- ${elements.filter(e => e.tagName === 'input').length} inputs\n` +
        `- ${elements.filter(e => e.tagName === 'select').length} selects\n` +
        `- ${elements.filter(e => !e.isVisible).length} hidden elements`;

      return {
        content: [{
          type: 'text',
          text: `${summary}\n\n${JSON.stringify(elements, null, 2)}`
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error getting clickable elements: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
