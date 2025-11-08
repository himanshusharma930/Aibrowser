/**
 * Browser Press Key Tool
 *
 * Simulates pressing a keyboard key with optional modifiers.
 * Supports standard keys (Enter, Tab, Escape) and modifier keys (Shift, Control, Alt, Meta).
 *
 * @priority MEDIUM
 * @complexity MEDIUM
 * @risk MEDIUM
 */

import { Tool, AgentContext, ToolResult } from '@jarvis-agent/core';

interface BrowserPressKeyArgs {
  key: string;
  modifiers?: string[];
}

export const browserPressKeyTool: Tool = {
  name: 'browser_press_key',
  description: 'Press a keyboard key with optional modifiers. Supports keys like "Enter", "Tab", "Escape", and modifiers like "Shift", "Control", "Alt", "Meta". The key press is dispatched to the currently focused element.',
  parameters: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'Key to press (e.g., "Enter", "Tab", "Escape", "ArrowDown", "a", "1")'
      },
      modifiers: {
        type: 'array',
        items: { type: 'string' },
        description: 'Optional modifier keys: "Shift", "Control", "Alt", "Meta" (Command on Mac)'
      }
    },
    required: ['key']
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext
  ): Promise<ToolResult> => {
    const { key, modifiers = [] } = args as BrowserPressKeyArgs;

    try {
      // Use execute_script to simulate keyboard event
      await agentContext.agent.execute_script(
        agentContext,
        (keyName: string, mods: string[]) => {
          const event = new KeyboardEvent('keydown', {
            key: keyName,
            shiftKey: mods.includes('Shift'),
            ctrlKey: mods.includes('Control'),
            altKey: mods.includes('Alt'),
            metaKey: mods.includes('Meta'),
            bubbles: true,
            cancelable: true
          });

          const target = document.activeElement || document.body;
          target.dispatchEvent(event);

          // Also dispatch keyup for completeness
          const keyupEvent = new KeyboardEvent('keyup', {
            key: keyName,
            shiftKey: mods.includes('Shift'),
            ctrlKey: mods.includes('Control'),
            altKey: mods.includes('Alt'),
            metaKey: mods.includes('Meta'),
            bubbles: true,
            cancelable: true
          });
          target.dispatchEvent(keyupEvent);
        },
        [key, modifiers]
      );

      const modifierText = modifiers.length > 0 ? ` with ${modifiers.join('+')}` : '';
      return {
        content: [{
          type: 'text',
          text: `Pressed key: ${key}${modifierText}`
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error pressing key: ${error.message}`
        }],
        isError: true
      };
    }
  }
};
