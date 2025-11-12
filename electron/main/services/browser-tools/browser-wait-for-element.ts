/**
 * Browser Wait For Element Tool
 *
 * Polls for element existence with configurable timeout and interval.
 * Supports visibility state checking (visible/hidden/any).
 *
 * @phase 3
 * @priority HIGH
 * @complexity MEDIUM
 * @risk LOW
 */

import { AgentContext } from '@jarvis-agent/core';
import type { Tool, ToolResult } from '@jarvis-agent/core/types';

interface BrowserWaitForElementArgs {
  selector: string;
  timeout?: number;
  pollInterval?: number;
  state?: 'visible' | 'hidden' | 'any';
}

interface BrowserWaitForElementResult {
  success: boolean;
  selector: string;
  found: boolean;
  elapsedTime: number;
  elementCount?: number;
  isVisible?: boolean;
  error?: string;
  message?: string;
}

export const browserWaitForElementTool: Tool = {
  name: 'browser_wait_for_element',
  description: 'Wait for an element to appear in the DOM with configurable timeout and visibility requirements. Polls every 100ms by default.',
  parameters: {
    type: 'object',
    properties: {
      selector: {
        type: 'string',
        description: 'CSS selector for the target element to wait for'
      },
      timeout: {
        type: 'number',
        description: 'Maximum wait time in milliseconds (default: 30000)',
        default: 30000
      },
      pollInterval: {
        type: 'number',
        description: 'Polling interval in milliseconds (default: 100)',
        default: 100
      },
      state: {
        type: 'string',
        enum: ['visible', 'hidden', 'any'],
        description: 'Required visibility state: "visible" (must be visible), "hidden" (must be hidden), "any" (just exists)',
        default: 'any'
      }
    },
    required: ['selector']
  },
  execute: async (
    args: BrowserWaitForElementArgs,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    try {
      const timeout = args.timeout ?? 30000;
      const pollInterval = args.pollInterval ?? 100;
      const state = args.state ?? 'any';

      const result: BrowserWaitForElementResult = await agentContext.agent.execute_script(
        agentContext,
        (selector: string, timeout: number, interval: number, requiredState: string) => {
          return new Promise((resolve) => {
            const startTime = Date.now();

            const checkElement = () => {
              const elements = document.querySelectorAll(selector);
              const elapsedTime = Date.now() - startTime;

              if (elements.length > 0) {
                const element = elements[0] as HTMLElement;
                const rect = element.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(element);

                const isVisible = rect.width > 0 &&
                                 rect.height > 0 &&
                                 computedStyle.visibility !== 'hidden' &&
                                 computedStyle.display !== 'none' &&
                                 computedStyle.opacity !== '0';

                // Check if visibility state matches requirement
                let stateMatches = true;
                if (requiredState === 'visible') {
                  stateMatches = isVisible;
                } else if (requiredState === 'hidden') {
                  stateMatches = !isVisible;
                }

                if (stateMatches) {
                  resolve({
                    success: true,
                    selector,
                    found: true,
                    elapsedTime,
                    elementCount: elements.length,
                    isVisible
                  });
                  return;
                }
              }

              // Check timeout
              if (elapsedTime >= timeout) {
                resolve({
                  success: false,
                  selector,
                  found: false,
                  elapsedTime,
                  error: 'TIMEOUT_EXCEEDED',
                  message: `Element not found within ${timeout}ms for selector: ${selector}`
                });
                return;
              }

              // Continue polling
              setTimeout(checkElement, interval);
            };

            checkElement();
          });
        },
        [args.selector, timeout, pollInterval, state]
      );

      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        isError: !result.success
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error waiting for element: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
