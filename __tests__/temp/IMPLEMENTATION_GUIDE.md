# Electron Improvements - Implementation Guide

Quick reference for implementing key recommendations.

---

## 1. IPC Message Batching (Quick Win)

### File: `electron/main/services/eko-service.ts`

Add to class properties:
```typescript
private streamMessageBuffer: StreamCallbackMessage[] = [];
private batchFlushTimer: NodeJS.Timeout | null = null;
private readonly BATCH_SIZE = 20;
private readonly BATCH_FLUSH_MS = 50;
```

Replace callback creation:
```typescript
private createCallback() {
  return {
    onMessage: (message: StreamCallbackMessage): Promise<void> => {
      this.logger.debug('Stream callback received', { type: message.type });

      if (!this.mainWindow || this.mainWindow.isDestroyed()) {
        this.logger.warn('Main window is destroyed');
        return Promise.resolve();
      }

      // Buffer message
      this.streamMessageBuffer.push(message);

      // Flush if buffer full
      if (this.streamMessageBuffer.length >= this.BATCH_SIZE) {
        this.flushStreamBatch();
      } else if (!this.batchFlushTimer) {
        this.batchFlushTimer = setTimeout(() => {
          this.flushStreamBatch();
          this.batchFlushTimer = null;
        }, this.BATCH_FLUSH_MS);
      }

      return Promise.resolve();
    }
  };
}

private flushStreamBatch(): void {
  if (this.streamMessageBuffer.length === 0) return;

  try {
    this.mainWindow?.webContents.send('eko-stream-batch', {
      messages: this.streamMessageBuffer,
      batchId: `batch_${Date.now()}`,
      count: this.streamMessageBuffer.length
    });
  } catch (error) {
    this.logger.error('Failed to send stream batch', error as Error);
  }

  this.streamMessageBuffer = [];
}
```

### Update Frontend Handler: `src/pages/main.tsx`

```typescript
// Replace 'eko-stream-message' listener with batch handler
window.api?.on('eko-stream-batch', (batch: any) => {
  batch.messages.forEach((message: any) => {
    handleStreamMessage(message);
  });
});
```

**Expected Result**: 150+ IPC calls → 5-10 calls per task

---

## 2. IPC Handler Registry

### New File: `electron/main/ipc/registry.ts`

```typescript
import { IpcMainInvokeEvent, ipcMain } from 'electron';
import { z } from 'zod';
import { createLogger } from '../utils/logger';

const logger = createLogger('IPCRegistry');

interface IPCHandlerConfig {
  name: string;
  handler: (event: IpcMainInvokeEvent, args: any) => Promise<any>;
  schema?: z.ZodSchema;
  timeout?: number;
  cache?: { ttl: number; keyFn?: (args: any) => string };
  maxConcurrent?: number;
}

export class IPCRegistry {
  private handlers: Map<string, IPCHandlerConfig> = new Map();
  private cache: Map<string, { data: any; expiry: number }> = new Map();
  private concurrencyCounters: Map<string, number> = new Map();

  register(config: IPCHandlerConfig): void {
    this.handlers.set(config.name, config);
    this.concurrencyCounters.set(config.name, 0);

    ipcMain.handle(config.name, async (event, args) => {
      try {
        // Check concurrency
        const concurrentCount = this.concurrencyCounters.get(config.name) || 0;
        const maxConcurrent = config.maxConcurrent || 10;

        if (concurrentCount >= maxConcurrent) {
          throw new Error(
            `Handler ${config.name} concurrency limit (${maxConcurrent}) exceeded. Active: ${concurrentCount}`
          );
        }

        // Validate
        let validated = args;
        if (config.schema) {
          try {
            validated = config.schema.parse(args);
          } catch (error: any) {
            logger.warn(`Validation failed for ${config.name}`, {
              errors: error.errors
            });
            throw new Error(`Validation failed: ${error.message}`);
          }
        }

        // Check cache
        if (config.cache) {
          const cacheKey = config.cache.keyFn?.(validated) ?? config.name;
          const cached = this.cache.get(cacheKey);

          if (cached && cached.expiry > Date.now()) {
            logger.debug(`Cache hit for ${config.name}`);
            return cached.data;
          }
        }

        // Execute with timeout
        this.concurrencyCounters.set(config.name, concurrentCount + 1);
        const startTime = performance.now();

        try {
          const result = await (config.timeout
            ? this.withTimeout(config.handler, config.timeout, event, validated)
            : config.handler(event, validated));

          // Cache result
          if (config.cache) {
            const cacheKey = config.cache.keyFn?.(validated) ?? config.name;
            this.cache.set(cacheKey, {
              data: result,
              expiry: Date.now() + config.cache.ttl
            });
          }

          logger.debug(`Handler ${config.name} completed`, {
            duration: Math.round(performance.now() - startTime)
          });

          return result;
        } finally {
          this.concurrencyCounters.set(config.name, concurrentCount);
        }
      } catch (error: any) {
        logger.error(`IPC handler error [${config.name}]`, error);
        throw error;
      }
    });

    logger.info(`Handler registered: ${config.name}`);
  }

  private withTimeout(
    handler: (event: IpcMainInvokeEvent, args: any) => Promise<any>,
    ms: number,
    event: IpcMainInvokeEvent,
    args: any
  ): Promise<any> {
    return Promise.race([
      handler(event, args),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Handler timeout after ${ms}ms`)), ms)
      )
    ]);
  }

  getStats() {
    return {
      registered: this.handlers.size,
      cacheSize: this.cache.size,
      handlers: Array.from(this.handlers.keys()),
      concurrency: Object.fromEntries(this.concurrencyCounters)
    };
  }

  cleanup(): void {
    this.handlers.clear();
    this.cache.clear();
    this.concurrencyCounters.clear();
  }
}

export const ipcRegistry = new IPCRegistry();
```

### File: `electron/main/ipc/index.ts`

```typescript
import { ipcRegistry } from './registry';
import { EkoRunSchema, ModifyTaskSchema } from './validation-schemas';
import { ekoService } from '../services/eko-service';
import { ConfigManager } from '../utils/config-manager';

export function registerAllIpcHandlers(): void {
  // Eko handlers
  ipcRegistry.register({
    name: 'eko:run',
    handler: async (event, args) => {
      return await ekoService.run(args.message);
    },
    schema: EkoRunSchema,
    timeout: 600000,
    maxConcurrent: 3
  });

  ipcRegistry.register({
    name: 'eko:cancel',
    handler: async (event, args) => {
      return await ekoService.cancelTask(args.taskId);
    },
    timeout: 30000,
    maxConcurrent: 10
  });

  // Config handlers with caching
  ipcRegistry.register({
    name: 'config:get-model',
    handler: async (event, args) => {
      return ConfigManager.getInstance().getModelConfig(args.provider);
    },
    cache: { ttl: 60000 },
    timeout: 5000,
    maxConcurrent: 20
  });

  // ... register other handlers
}
```

---

## 3. Enhanced Input Validation Schemas

### New File: `electron/main/ipc/validation-schemas.ts`

```typescript
import { z } from 'zod';

// Define schemas for all IPC handlers
export const EkoRunSchema = z.object({
  message: z.string()
    .min(1, 'Message cannot be empty')
    .max(10000, 'Message too long'),
  taskId: z.string().uuid().optional(),
  timeout: z.number().min(1000).max(600000).optional()
});

export const ModifyTaskSchema = z.object({
  taskId: z.string().uuid(),
  modification: z.string()
    .min(1, 'Modification cannot be empty')
    .max(5000, 'Modification too long')
});

export const ConfigGetSchema = z.object({
  provider: z.enum(['deepseek', 'qwen', 'google', 'anthropic', 'openrouter', 'custom'])
});

export const ConfigSaveSchema = z.object({
  provider: z.string(),
  apiKey: z.string().optional(),
  model: z.string().optional(),
  baseURL: z.string().url().optional()
});

// Type exports for handlers
export type EkoRunArgs = z.infer<typeof EkoRunSchema>;
export type ModifyTaskArgs = z.infer<typeof ModifyTaskSchema>;
export type ConfigGetArgs = z.infer<typeof ConfigGetSchema>;
export type ConfigSaveArgs = z.infer<typeof ConfigSaveSchema>;
```

---

## 4. Error Type Hierarchy

### New File: `electron/main/utils/app-errors.ts`

```typescript
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public context: Record<string, any> = {},
    public recoverable: boolean = false,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      context: this.context,
      recoverable: this.recoverable
    };
  }

  toIPC() {
    return {
      error: this.message,
      code: this.code,
      details: this.context
    };
  }
}

// Specific error types
export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('VALIDATION_ERROR', message, context, false, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super('NOT_FOUND', `${resource} not found: ${id}`, { resource, id }, false, 404);
  }
}

export class AgentError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('AGENT_ERROR', message, context, true, 500);
  }
}

export class ConfigError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('CONFIG_ERROR', message, context, false, 400);
  }
}

export class TimeoutError extends AppError {
  constructor(operation: string, timeout: number) {
    super(
      'TIMEOUT',
      `${operation} timed out after ${timeout}ms`,
      { operation, timeout },
      true,
      504
    );
  }
}

export class ConcurrencyError extends AppError {
  constructor(handler: string, limit: number) {
    super(
      'CONCURRENCY_LIMIT',
      `Handler ${handler} exceeded concurrency limit (${limit})`,
      { handler, limit },
      true,
      429
    );
  }
}
```

---

## 5. Add Priority Task Queue

### File: `electron/main/services/task-scheduler.ts` (modify)

```typescript
interface QueuedTaskWithPriority extends QueuedTask {
  priority: 'critical' | 'high' | 'normal' | 'low';
  retryCount: number;
  maxRetries: number;
}

class PriorityTaskQueue {
  private queue: QueuedTaskWithPriority[] = [];

  enqueue(task: QueuedTaskWithPriority): void {
    this.queue.push(task);
    this.sort();
  }

  dequeue(): QueuedTaskWithPriority | undefined {
    return this.queue.shift();
  }

  private sort(): void {
    const priorityOrder = { critical: 0, high: 1, normal: 2, low: 3 };

    this.queue.sort((a, b) => {
      // Higher priority first
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Then by scheduled time (earlier first)
      return a.scheduledTime.getTime() - b.scheduledTime.getTime();
    });
  }

  getStats() {
    const stats: Record<string, number> = { critical: 0, high: 0, normal: 0, low: 0 };

    for (const task of this.queue) {
      stats[task.priority]++;
    }

    return { total: this.queue.length, byPriority: stats };
  }

  clear(): void {
    this.queue = [];
  }

  get size(): number {
    return this.queue.size;
  }
}
```

---

## 6. Performance Metrics Collection

### New File: `electron/main/utils/metrics.ts`

```typescript
export interface Metric {
  name: string;
  value: number;
  unit: string;
  tags: Record<string, string>;
  timestamp: number;
}

export class MetricsCollector {
  private metrics: Metric[] = [];
  private readonly maxMetrics = 5000;

  recordMetric(
    name: string,
    value: number,
    unit: string,
    tags: Record<string, string> = {}
  ): void {
    this.metrics.push({
      name,
      value,
      unit,
      tags,
      timestamp: Date.now()
    });

    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  getMetrics(name?: string, timeWindowMs?: number): Metric[] {
    let result = this.metrics;

    if (name) {
      result = result.filter(m => m.name === name);
    }

    if (timeWindowMs) {
      const cutoff = Date.now() - timeWindowMs;
      result = result.filter(m => m.timestamp > cutoff);
    }

    return result;
  }

  getStats(name: string, timeWindowMs?: number): { avg: number; min: number; max: number; count: number } | null {
    const metrics = this.getMetrics(name, timeWindowMs);

    if (metrics.length === 0) {
      return null;
    }

    const values = metrics.map(m => m.value);

    return {
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length
    };
  }

  clear(): void {
    this.metrics = [];
  }
}

export const metricsCollector = new MetricsCollector();
```

### Usage in key operations:

```typescript
// In EkoService.run()
const startTime = performance.now();

try {
  const result = await this.eko.run(message);
  const duration = performance.now() - startTime;

  metricsCollector.recordMetric(
    'task_duration',
    duration,
    'ms',
    {
      status: result.error ? 'failed' : 'success',
      taskId: result.taskId
    }
  );

  return result;
} catch (error) {
  // ...
}
```

---

## Testing the Improvements

### Test IPC Batching

```typescript
// In DevTools console
let batchCount = 0;
let messageCount = 0;

window.api?.on('eko-stream-batch', (batch: any) => {
  batchCount++;
  messageCount += batch.messages.length;
  console.log(`Batch ${batchCount}: ${batch.messages.length} messages`);
});

// Run a task and check console
// Should see 5-10 batches instead of 200+ individual messages
```

### Test Handler Registry

```typescript
// In main process console
const stats = ipcRegistry.getStats();
console.log('Registered handlers:', stats.handlers);
console.log('Cache size:', stats.cacheSize);
console.log('Concurrency:', stats.concurrency);
```

### Monitor Metrics

```typescript
// In main process
setInterval(() => {
  const taskDuration = metricsCollector.getStats('task_duration', 3600000);
  const ipcLatency = metricsCollector.getStats('ipc_latency', 3600000);

  console.log('Task Duration (1hr):', taskDuration);
  console.log('IPC Latency (1hr):', ipcLatency);
}, 60000);
```

---

## Integration Checklist

- [ ] Implement IPC message batching (1-2 days)
- [ ] Create IPC handler registry (1-2 days)
- [ ] Add validation schemas (0.5-1 day)
- [ ] Implement error type hierarchy (0.5 day)
- [ ] Add priority task queue (0.5-1 day)
- [ ] Set up metrics collection (0.5-1 day)
- [ ] Update frontend listeners for batched messages
- [ ] Test with long-running tasks
- [ ] Monitor memory usage improvements
- [ ] Deploy and measure improvements

**Total Estimated Time**: 5-8 days for all improvements

