import { ipcMain, IpcMainInvokeEvent, WebContents } from 'electron';
import { z, ZodSchema } from 'zod';
import { EventEmitter } from 'events';

export interface HandlerOptions {
  schema?: ZodSchema;
  timeout?: number;
  retryCount?: number;
  rateLimitMs?: number;
  description?: string;
}

export interface HandlerMetadata {
  name: string;
  description?: string;
  schema?: ZodSchema;
  timeout: number;
  retryCount: number;
  rateLimitMs: number;
  callCount: number;
  lastCalled?: number;
  averageResponseTime: number;
}

export type IPCHandler = (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any> | any;

export class IPCHandlerRegistry extends EventEmitter {
  private handlers = new Map<string, { handler: IPCHandler; options: HandlerOptions }>();
  private metadata = new Map<string, HandlerMetadata>();
  private rateLimitCache = new Map<string, number>();

  /**
   * Register a new IPC handler with validation and error handling
   */
  public register(
    channel: string,
    handler: IPCHandler,
    options: HandlerOptions = {}
  ): void {
    if (this.handlers.has(channel)) {
      console.warn(`Handler for channel "${channel}" already exists. Overwriting.`);
    }

    this.handlers.set(channel, { handler, options });

    // Initialize metadata
    this.metadata.set(channel, {
      name: channel,
      description: options.description,
      schema: options.schema,
      timeout: options.timeout || 30000,
      retryCount: options.retryCount || 0,
      rateLimitMs: options.rateLimitMs || 0,
      callCount: 0,
      averageResponseTime: 0,
    });

    // Register with ipcMain
    ipcMain.handle(channel, async (event, ...args) => {
      return this.handleIPC(channel, event, args);
    });

    this.emit('handlerRegistered', { channel, description: options.description });
  }

  /**
   * Unregister a handler
   */
  public unregister(channel: string): boolean {
    const removed = this.handlers.delete(channel);
    this.metadata.delete(channel);
    this.rateLimitCache.delete(channel);

    if (removed) {
      ipcMain.removeHandler(channel);
      this.emit('handlerUnregistered', { channel });
    }

    return removed;
  }

  /**
   * Main IPC handler with validation, rate limiting, and error handling
   */
  private async handleIPC(
    channel: string,
    event: IpcMainInvokeEvent,
    args: any[]
  ): Promise<any> {
    const startTime = Date.now();
    const meta = this.metadata.get(channel)!;
    const { handler, options } = this.handlers.get(channel)!;

    try {
      // Rate limiting
      if (options.rateLimitMs && options.rateLimitMs > 0) {
        const lastCall = this.rateLimitCache.get(channel) || 0;
        const timeSinceLastCall = Date.now() - lastCall;

        if (timeSinceLastCall < options.rateLimitMs) {
          throw new RateLimitError(
            `Rate limit exceeded. Min interval: ${options.rateLimitMs}ms`
          );
        }
        this.rateLimitCache.set(channel, Date.now());
      }

      // Input validation
      if (options.schema) {
        try {
          const validated = options.schema.parse(args[0]);
          args[0] = validated;
        } catch (validationError) {
          throw new ValidationError(
            `Validation failed for channel "${channel}"`,
            validationError
          );
        }
      }

      // Execute handler with timeout
      let result: any;
      let attempt = 0;
      const maxRetries = options.retryCount || 0;

      while (attempt <= maxRetries) {
        try {
          result = await Promise.race([
            handler(event, ...args),
            this.createTimeout(options.timeout || 30000),
          ]);
          break;
        } catch (error) {
          attempt++;
          if (attempt > maxRetries) {
            throw error;
          }
          // Log retry attempt
          this.emit('handlerRetry', { channel, attempt, maxAttempts: maxRetries + 1 });
          await this.delay(Math.pow(2, attempt) * 100); // Exponential backoff
        }
      }

      // Update metadata
      const responseTime = Date.now() - startTime;
      meta.callCount++;
      meta.lastCalled = Date.now();
      meta.averageResponseTime =
        (meta.averageResponseTime * (meta.callCount - 1) + responseTime) / meta.callCount;

      this.emit('handlerSuccess', {
        channel,
        responseTime,
        callCount: meta.callCount,
      });

      return result;
    } catch (error) {
      // Update error metadata
      meta.callCount++;
      meta.lastCalled = Date.now();

      const responseTime = Date.now() - startTime;

      if (error instanceof ValidationError) {
        this.emit('handlerValidationError', {
          channel,
          error: error.message,
          responseTime,
        });
        throw {
          code: 'VALIDATION_ERROR',
          message: error.message,
          details: error.originalError,
        };
      }

      if (error instanceof RateLimitError) {
        this.emit('handlerRateLimited', {
          channel,
          error: error.message,
        });
        throw {
          code: 'RATE_LIMITED',
          message: error.message,
        };
      }

      if (error instanceof TimeoutError) {
        this.emit('handlerTimeout', {
          channel,
          timeout: options.timeout,
        });
        throw {
          code: 'TIMEOUT',
          message: `Handler timeout after ${options.timeout}ms`,
        };
      }

      // Generic error
      this.emit('handlerError', {
        channel,
        error: error instanceof Error ? error.message : String(error),
        responseTime,
      });

      throw {
        code: 'HANDLER_ERROR',
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Get handler metadata
   */
  public getMetadata(channel: string): HandlerMetadata | undefined {
    return this.metadata.get(channel);
  }

  /**
   * Get all registered handlers
   */
  public getHandlers(): string[] {
    return Array.from(this.handlers.keys());
  }

  /**
   * Get performance metrics for all handlers
   */
  public getMetrics() {
    const metrics = new Map<
      string,
      {
        callCount: number;
        averageResponseTime: number;
        lastCalled?: number;
      }
    >();

    for (const [channel, meta] of this.metadata) {
      metrics.set(channel, {
        callCount: meta.callCount,
        averageResponseTime: meta.averageResponseTime,
        lastCalled: meta.lastCalled,
      });
    }

    return metrics;
  }

  /**
   * Reset metrics
   */
  public resetMetrics(channel?: string): void {
    if (channel) {
      const meta = this.metadata.get(channel);
      if (meta) {
        meta.callCount = 0;
        meta.averageResponseTime = 0;
        meta.lastCalled = undefined;
      }
    } else {
      for (const meta of this.metadata.values()) {
        meta.callCount = 0;
        meta.averageResponseTime = 0;
        meta.lastCalled = undefined;
      }
    }
  }

  private createTimeout(ms: number): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new TimeoutError(`Operation timed out after ${ms}ms`)), ms)
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Custom Error Classes
export class ValidationError extends Error {
  constructor(
    message: string,
    public originalError: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

// Singleton instance
let registryInstance: IPCHandlerRegistry | null = null;

export function getIPCRegistry(): IPCHandlerRegistry {
  if (!registryInstance) {
    registryInstance = new IPCHandlerRegistry();
  }
  return registryInstance;
}

export function resetIPCRegistry(): void {
  registryInstance = null;
}