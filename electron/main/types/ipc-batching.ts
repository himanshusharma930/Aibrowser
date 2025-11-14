import { z } from 'zod';

// IPC Message Schemas
export const IPCMessageSchema = z.object({
  type: z.enum(['single', 'batch']),
  channel: z.string(),
  data: z.any(),
  timestamp: z.number(),
});

export const BatchMessageSchema = z.object({
  type: z.literal('batch'),
  messages: z.array(z.object({
    channel: z.string(),
    data: z.any(),
    id: z.string(),
    timestamp: z.number(),
  })),
  batchId: z.string(),
  timestamp: z.number(),
});

// IPC Handler Configuration
export const IPCHandlerConfigSchema = z.object({
  channel: z.string(),
  validator: z.any().optional(),
  transformer: z.function().optional(),
  timeout: z.number().min(100).max(30000).optional(),
  retryCount: z.number().min(0).max(5).optional(),
});

// Batching Configuration
export const BatchConfigSchema = z.object({
  maxBatchSize: z.number().min(1).max(1000),
  maxWaitTime: z.number().min(10).max(5000),
  enabled: z.boolean(),
  channels: z.array(z.string()).optional(),
});

// Performance Metrics
export const PerformanceMetricsSchema = z.object({
  messagesBatched: z.number().min(0),
  messagesSent: z.number().min(0),
  batchesCreated: z.number().min(0),
  averageBatchSize: z.number().min(0),
  totalBytesSaved: z.number().min(0),
  efficiency: z.number().min(0).max(1),
});

// Error Handling
export const IPCErrorSchema = z.object({
  type: z.enum(['validation', 'timeout', 'retry', 'unknown']),
  message: z.string(),
  channel: z.string(),
  data: z.any().optional(),
  timestamp: z.number(),
});

// Handler Registry Configuration
export const HandlerRegistryConfigSchema = z.object({
  enableBatching: z.boolean().default(true),
  enableMetrics: z.boolean().default(true),
  enableValidation: z.boolean().default(true),
  enableRetry: z.boolean().default(true),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

// Default configurations
export const DEFAULT_BATCH_CONFIG = {
  maxBatchSize: 50,
  maxWaitTime: 100,
  enabled: true,
  channels: ['eko-stream-message', 'browser-updates', 'task-progress'],
};

export const DEFAULT_REGISTRY_CONFIG = {
  enableBatching: true,
  enableMetrics: true,
  enableValidation: true,
  enableRetry: true,
  logLevel: 'info' as const,
};