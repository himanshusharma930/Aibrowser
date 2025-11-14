import { z } from 'zod';

// ==================== Core Validation Schemas ====================

// Task execution schemas
export const EkoRunSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  taskId: z.string().optional(),
  config: z.any().optional(),
});

export const EkoModifySchema = z.object({
  taskId: z.string().min(1, 'Task ID required'),
  workflow: z.string().min(1, 'Workflow cannot be empty'),
});

export const EkoCancelSchema = z.object({
  taskId: z.string().min(1, 'Task ID required'),
});

// Browser navigation schemas
export const NavigateSchema = z.object({
  url: z.string().url('Invalid URL'),
  timeout: z.number().min(1000).max(60000).optional(),
});

export const ScreenshotSchema = z.object({
  fullPage: z.boolean().optional(),
  timeout: z.number().min(1000).max(30000).optional(),
});

// Configuration schemas
export const UserModelConfigSchema = z.object({
  model: z.string(),
  provider: z.enum(['deepseek', 'qwen', 'google', 'anthropic', 'openrouter', 'custom']),
  apiKey: z.string().min(1, 'API key cannot be empty'),
  baseUrl: z.string().url().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().min(100).optional(),
});

export const AgentConfigSchema = z.object({
  name: z.string(),
  enabled: z.boolean(),
  customPrompt: z.string().optional(),
  tools: z.record(z.boolean()).optional(),
});

// MCP tool schemas
export const MCPToolSchema = z.object({
  serverId: z.string(),
  toolName: z.string(),
  enabled: z.boolean(),
});

// File operation schemas
export const FileWriteSchema = z.object({
  path: z.string().min(1),
  content: z.string(),
  encoding: z.enum(['utf8', 'ascii', 'utf16le']).optional(),
});

export const FileReadSchema = z.object({
  path: z.string().min(1),
  encoding: z.enum(['utf8', 'ascii', 'utf16le']).optional(),
});

// ==================== Error Schemas ====================

export const ErrorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.any().optional(),
  timestamp: z.number(),
});

// ==================== Response Schemas ====================

export const SuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.any(),
  timestamp: z.number(),
});

// ==================== Batch Message Schemas ====================

export const BatchMessageSchema = z.object({
  type: z.literal('batch'),
  messages: z.array(
    z.object({
      channel: z.string(),
      data: z.any(),
      id: z.string(),
      timestamp: z.number(),
    })
  ),
  batchId: z.string(),
  timestamp: z.number(),
});

export const SingleMessageSchema = z.object({
  type: z.literal('single'),
  channel: z.string(),
  data: z.any(),
  timestamp: z.number(),
});

// ==================== IPC Channel Registry ====================

export const IPC_CHANNELS = {
  // Eko services
  EKO_RUN: 'eko:run',
  EKO_MODIFY: 'eko:modify',
  EKO_CANCEL: 'eko:cancel',
  EKO_GET_STATUS: 'eko:get-status',

  // Browser navigation
  NAVIGATE: 'browser:navigate',
  SCREENSHOT: 'browser:screenshot',
  GO_BACK: 'browser:go-back',
  GO_FORWARD: 'browser:go-forward',

  // Configuration
  GET_MODEL_CONFIGS: 'config:get-model-configs',
  SAVE_MODEL_CONFIGS: 'config:save-model-configs',
  GET_AGENT_CONFIG: 'config:get-agent-config',
  SAVE_AGENT_CONFIG: 'config:save-agent-config',

  // MCP Tools
  GET_MCP_TOOLS: 'mcp:get-tools',
  SET_MCP_TOOL_ENABLED: 'mcp:set-tool-enabled',
  GET_MCP_SERVERS: 'mcp:get-servers',

  // File operations
  FILE_READ: 'file:read',
  FILE_WRITE: 'file:write',
  FILE_DELETE: 'file:delete',

  // Metrics & monitoring
  GET_METRICS: 'metrics:get',
  RESET_METRICS: 'metrics:reset',
  GET_HANDLER_INFO: 'handler:get-info',
} as const;

// ==================== Default Handler Options ====================

export const DEFAULT_HANDLER_OPTIONS = {
  QUICK: {
    timeout: 5000,
    retryCount: 0,
    rateLimitMs: 0,
  },
  STANDARD: {
    timeout: 30000,
    retryCount: 1,
    rateLimitMs: 100,
  },
  LONG_RUNNING: {
    timeout: 120000,
    retryCount: 2,
    rateLimitMs: 500,
  },
  FILE_OPERATION: {
    timeout: 60000,
    retryCount: 1,
    rateLimitMs: 200,
  },
} as const;

// ==================== Handler Configuration Map ====================

export const HANDLER_CONFIGS = {
  [IPC_CHANNELS.EKO_RUN]: {
    schema: EkoRunSchema,
    ...DEFAULT_HANDLER_OPTIONS.LONG_RUNNING,
    description: 'Execute Eko agent task',
  },
  [IPC_CHANNELS.EKO_MODIFY]: {
    schema: EkoModifySchema,
    ...DEFAULT_HANDLER_OPTIONS.STANDARD,
    description: 'Modify Eko workflow',
  },
  [IPC_CHANNELS.NAVIGATE]: {
    schema: NavigateSchema,
    ...DEFAULT_HANDLER_OPTIONS.STANDARD,
    description: 'Navigate browser to URL',
  },
  [IPC_CHANNELS.SCREENSHOT]: {
    schema: ScreenshotSchema,
    ...DEFAULT_HANDLER_OPTIONS.STANDARD,
    description: 'Take screenshot',
  },
  [IPC_CHANNELS.GET_MODEL_CONFIGS]: {
    ...DEFAULT_HANDLER_OPTIONS.QUICK,
    description: 'Get model configurations',
  },
  [IPC_CHANNELS.SAVE_MODEL_CONFIGS]: {
    schema: z.array(UserModelConfigSchema),
    ...DEFAULT_HANDLER_OPTIONS.STANDARD,
    description: 'Save model configurations',
  },
  [IPC_CHANNELS.FILE_READ]: {
    schema: FileReadSchema,
    ...DEFAULT_HANDLER_OPTIONS.FILE_OPERATION,
    description: 'Read file contents',
  },
  [IPC_CHANNELS.FILE_WRITE]: {
    schema: FileWriteSchema,
    ...DEFAULT_HANDLER_OPTIONS.FILE_OPERATION,
    description: 'Write to file',
  },
} as const;