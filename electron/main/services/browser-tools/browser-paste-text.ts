/**
 * Browser Paste Text Tool
 *
 * Instantly injects text into input fields without simulating typing events.
 * Useful for fast form filling and bypassing typing delays.
 *
 * @phase 3
 * @priority HIGH
 * @complexity LOW
 * @risk LOW
 */

import { AgentContext } from '@jarvis-agent/core';
import type { Tool, ToolResult } from '@jarvis-agent/core/types';

interface BrowserPasteTextArgs {
  selector: string;
  text: string;
  clearExisting?: boolean;
}

interface BrowserPasteTextResult {
  success: boolean;
  selector: string;
  textLength: number;
  elementType: string;
  previousValue?: string;
  error?: string;
  message?: string;
}

export const browserPasteTextTool: Tool = {
  name: 'browser_paste_text',
  description: 'Instantly inject text into input fields, textareas, or contenteditable elements. Bypasses typing simulation for faster form filling.',
  parameters: {
    type: 'object',
    properties: {
      selector: {
        type: 'string',
        description: 'CSS selector for the target input element (e.g., "#email", ".search-input")'
      },
      text: {
        type: 'string',
        description: 'Text content to paste into the element'
      },
      clearExisting: {
        type: 'boolean',
        description: 'Clear existing value before pasting (default: false)',
        default: false
      }
    },
    required: ['selector', 'text']
  },
  execute: async (
    args: BrowserPasteTextArgs,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    try {
      const result: BrowserPasteTextResult = await agentContext.agent.execute_script(
        agentContext,
        (selector: string, text: string, clearExisting: boolean) => {
          const element = document.querySelector(selector);

          if (!element) {
            return {
              success: false,
              selector,
              textLength: 0,
              elementType: '',
              error: 'ELEMENT_NOT_FOUND',
              message: `No element found for selector: ${selector}`
            };
          }

          let previousValue = '';
          let elementType = element.tagName.toLowerCase();

          // Handle different element types
          if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            previousValue = clearExisting ? element.value : '';
            if (clearExisting) {
              element.value = '';
            }
            element.value += text;

            // Trigger input events for framework reactivity (React, Vue, Angular)
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));

          } else if (element.getAttribute('contenteditable') === 'true') {
            previousValue = clearExisting ? (element.textContent || '') : '';
            if (clearExisting) {
              element.textContent = '';
            }
            element.textContent += text;

            // Trigger input event for contenteditable
            element.dispatchEvent(new Event('input', { bubbles: true }));

          } else {
            return {
              success: false,
              selector,
              textLength: 0,
              elementType,
              error: 'INVALID_ELEMENT_TYPE',
              message: `Element is not a valid input type: ${elementType}. Must be input, textarea, or contenteditable element.`
            };
          }

          return {
            success: true,
            selector,
            textLength: text.length,
            elementType,
            previousValue: clearExisting ? previousValue : undefined
          };
        },
        [args.selector, args.text, args.clearExisting ?? false]
      );

      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        isError: !result.success
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error pasting text: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
