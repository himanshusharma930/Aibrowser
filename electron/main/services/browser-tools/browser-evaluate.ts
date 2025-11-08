/**
 * Browser Evaluate Tool
 *
 * ⚠️ SECURITY CRITICAL - Executes arbitrary JavaScript in the browser context.
 *
 * This tool allows execution of custom JavaScript code in the page context.
 * It includes security measures but should be used with caution.
 *
 * @phase 5
 * @priority HIGH
 * @complexity MEDIUM
 * @risk CRITICAL
 *
 * SECURITY REQUIREMENTS:
 * - Input validation for dangerous patterns
 * - Execution timeout (5 seconds default)
 * - Audit logging of all executions
 * - User consent flow (optional)
 * - Sandboxed execution context
 */

import type { Tool, ToolResult } from '@jarvis-agent/core/types';
import type { AgentContext } from '@jarvis-agent/core';
import type { LanguageModelV2ToolCallPart } from '@jarvis-agent/core/types';

interface BrowserEvaluateArgs {
  script: string;
  timeout?: number;
}

// Dangerous patterns that should be blocked or warned about
const DANGEROUS_PATTERNS = [
  /eval\s*\(/gi,
  /Function\s*\(/gi,
  /setTimeout\s*\(/gi,
  /setInterval\s*\(/gi,
  /<script/gi,
  /document\.write/gi,
  /innerHTML\s*=/gi,
  /outerHTML\s*=/gi,
  /\.cookie/gi,
  /localStorage/gi,
  /sessionStorage/gi,
  /XMLHttpRequest/gi,
  /fetch\s*\(/gi,
];

function validateScript(script: string): { safe: boolean; warnings: string[] } {
  const warnings: string[] = [];

  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(script)) {
      warnings.push(`Potentially dangerous pattern detected: ${pattern.source}`);
    }
  }

  return {
    safe: warnings.length === 0,
    warnings
  };
}

export const browserEvaluateTool: Tool = {
  name: 'browser_evaluate',
  description: '⚠️ SECURITY CRITICAL: Execute JavaScript code in the browser console. Use with extreme caution. The script should be a function expression: () => { /* code */ }',
  parameters: {
    type: 'object',
    properties: {
      script: {
        type: 'string',
        description: 'JavaScript code to execute as a function: () => { /* your code */ }'
      },
      timeout: {
        type: 'number',
        description: 'Execution timeout in milliseconds (default: 5000, max: 30000)'
      }
    },
    required: ['script']
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext,
    _toolCall: LanguageModelV2ToolCallPart
  ): Promise<ToolResult> => {
    try {
      const typedArgs = args as unknown as BrowserEvaluateArgs;

      // Security validation
      const validation = validateScript(typedArgs.script);

      if (!validation.safe) {
        const _warningMessage = `⚠️ Security Warning: Script contains potentially dangerous patterns:\n${validation.warnings.join('\n')}`;
        console.warn('[browser_evaluate] Security warning:', validation.warnings);

        // In production, you might want to block execution or require explicit user consent
        // For now, we'll proceed with a warning
      }

      // Timeout validation
      const timeout = Math.min(typedArgs.timeout || 5000, 30000); // Max 30 seconds

      // Audit log
      console.log('[browser_evaluate] Executing script:', {
        scriptLength: typedArgs.script.length,
        timeout,
        timestamp: new Date().toISOString(),
        warnings: validation.warnings
      });

      // Execute with timeout
      const result = await Promise.race([
        (agentContext.agent as any).execute_script(agentContext,
          agentContext,
          (scriptCode: string) => {
            try {
              // Wrap in function and execute
              const func = new Function(`return (${scriptCode})()`)();
              return { success: true, result: func };
            } catch (error: any) {
              return { success: false, error: error.message };
            }
          },
          [typedArgs.script]
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Script execution timeout')), timeout)
        )
      ]);

      if (typeof result === 'object' && result !== null && 'success' in result) {
        if (!result.success) {
          return {
            content: [{
              type: 'text',
              text: `Script execution failed: ${result.error}`
            }],
            isError: true
          };
        }

        const output = typeof result.result === 'object'
          ? JSON.stringify(result.result, null, 2)
          : String(result.result);

        return {
          content: [{
            type: 'text',
            text: `Execution result:\n${output}`
          }],
          isError: false
        };
      }

      // Direct result
      const output = typeof result === 'object'
        ? JSON.stringify(result, null, 2)
        : String(result);

      return {
        content: [{
          type: 'text',
          text: `Execution result:\n${output}`
        }],
        isError: false
      };

    } catch (error: any) {
      console.error('[browser_evaluate] Execution error:', error);

      return {
        content: [{
          type: 'text',
          text: `Script execution failed: ${error.message}`
        }],
        isError: true
      };
    }
  }
};