/**
 * Browser Select Tool
 *
 * Selects an option from a dropdown/select element.
 * Supports selection by value, text, or index.
 *
 * @phase 4
 * @priority MEDIUM
 * @complexity LOW
 * @risk LOW
 */

import type { Tool, ToolResult } from '@jarvis-agent/core/types';
import type { AgentContext } from '@jarvis-agent/core';
import type { LanguageModelV2ToolCallPart } from '@jarvis-agent/core/types';

interface BrowserSelectArgs {
  index?: number;
  selector?: string;
  value: string;
}

export const browserSelectTool: Tool = {
  name: 'browser_select',
  description: 'Select an option from a dropdown/select element. Either index or selector must be provided.',
  parameters: {
    type: 'object',
    properties: {
      index: {
        type: 'number',
        description: 'Index of the select element (from browser_get_clickable_elements)'
      },
      selector: {
        type: 'string',
        description: 'CSS selector for the select element'
      },
      value: {
        type: 'string',
        description: 'Value to select (can be option value, text, or index)'
      }
    },
    required: ['value']
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext,
    _toolCall: LanguageModelV2ToolCallPart
  ): Promise<ToolResult> => {
    try {
      const typedArgs = args as unknown as BrowserSelectArgs;
      if (!typedArgs.index && !typedArgs.selector) {
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
        (index: number | undefined, selector: string | undefined, value: string) => {
          let element: Element | null = null;

          if (selector) {
            element = document.querySelector(selector);
          } else if (index !== undefined) {
            const selects = document.querySelectorAll('select');
            element = selects[index] || null;
          }

          if (!element || element.tagName.toLowerCase() !== 'select') {
            return {
              success: false,
              message: `Select element not found for ${selector ? `selector: ${selector}` : `index: ${index}`}`
            };
          }

          const selectEl = element as HTMLSelectElement;
          let optionSelected = false;
          let selectedText = '';

          // Try to select by value first
          for (let i = 0; i < selectEl.options.length; i++) {
            const option = selectEl.options[i];
            if (option.value === value) {
              selectEl.selectedIndex = i;
              optionSelected = true;
              selectedText = option.text;
              break;
            }
          }

          // If not found, try by text
          if (!optionSelected) {
            for (let i = 0; i < selectEl.options.length; i++) {
              const option = selectEl.options[i];
              if (option.text.toLowerCase().includes(value.toLowerCase())) {
                selectEl.selectedIndex = i;
                optionSelected = true;
                selectedText = option.text;
                break;
              }
            }
          }

          // If still not found, try by index
          if (!optionSelected) {
            const optionIndex = parseInt(value, 10);
            if (!isNaN(optionIndex) && optionIndex >= 0 && optionIndex < selectEl.options.length) {
              selectEl.selectedIndex = optionIndex;
              optionSelected = true;
              selectedText = selectEl.options[optionIndex].text;
            }
          }

          if (!optionSelected) {
            return {
              success: false,
              message: `No option found matching: "${value}"`
            };
          }

          // Trigger change event
          const changeEvent = new Event('change', { bubbles: true });
          selectEl.dispatchEvent(changeEvent);

          return {
            success: true,
            selectedValue: selectEl.value,
            selectedText,
            message: `Successfully selected option: "${selectedText}"`
          };
        },
        [typedArgs.index, typedArgs.selector, typedArgs.value]
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
          text: `${result.message} (value: ${result.selectedValue})`
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error selecting option: ${error.message}`
        }],
        isError: true
      };
    }
  }
};