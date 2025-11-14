import { WebContents } from 'electron';
import { PerformanceMonitor } from './performance-monitor';

export interface BatchMessage {
  channel: string;
  data: any;
  id: string;
  timestamp: number;
}

export interface BatchConfig {
  maxBatchSize: number;
  maxWaitTime: number;
  enabled: boolean;
}

export class IPCBatchManager {
  private batches = new Map<string, BatchMessage[]>();
  private timers = new Map<string, NodeJS.Timeout>();
  private config: BatchConfig;
  private metrics = {
    messagesBatched: 0,
    messagesSent: 0,
    batchesCreated: 0,
    averageBatchSize: 0,
  };
  private performanceMonitor: PerformanceMonitor;
  private listeners: Map<string, Function[]> = new Map();

  constructor(config: Partial<BatchConfig> = {}, performanceMonitor?: PerformanceMonitor) {
    this.config = {
      maxBatchSize: 50,
      maxWaitTime: 100,
      enabled: true,
      ...config,
    };
    this.performanceMonitor = performanceMonitor || new PerformanceMonitor();
  }

  public addMessage(channel: string, data: any, webContents: WebContents): void {
    if (!this.config.enabled) {
      this.performanceMonitor.recordIPCCall(channel);
      webContents.send(channel, data);
      return;
    }

    const id = `${channel}_${Date.now()}_${Math.random()}`;
    const message: BatchMessage = {
      channel,
      data,
      id,
      timestamp: Date.now(),
    };

    if (!this.batches.has(channel)) {
      this.batches.set(channel, []);
    }

    this.batches.get(channel)!.push(message);
    this.metrics.messagesBatched++;

    if (!this.timers.has(channel)) {
      this.timers.set(
        channel,
        setTimeout(() => this.flushBatch(channel, webContents), this.config.maxWaitTime)
      );
    }

    if (this.batches.get(channel)!.length >= this.config.maxBatchSize) {
      this.flushBatch(channel, webContents);
    }
  }

  private flushBatch(channel: string, webContents: WebContents): void {
    const messages = this.batches.get(channel);
    if (!messages || messages.length === 0) return;

    const batch = {
      type: 'batch',
      messages,
      batchId: `batch_${channel}_${Date.now()}`,
      timestamp: Date.now(),
    };

    webContents.send(channel, batch);

    this.metrics.messagesSent += messages.length;
    this.metrics.batchesCreated++;
    this.metrics.averageBatchSize =
      (this.metrics.averageBatchSize * (this.metrics.batchesCreated - 1) + messages.length) /
      this.metrics.batchesCreated;

    this.performanceMonitor.recordBatch(messages.length);

    this.batches.delete(channel);
    if (this.timers.has(channel)) {
      clearTimeout(this.timers.get(channel)!);
      this.timers.delete(channel);
    }
  }

  public flushAll(webContents: WebContents): void {
    for (const [channel] of this.batches) {
      this.flushBatch(channel, webContents);
    }
  }

  public setConfig(config: Partial<BatchConfig>): void {
    this.config = { ...this.config, ...config };
  }

  public getMetrics() {
    return { ...this.metrics };
  }

  public resetMetrics(): void {
    this.metrics = {
      messagesBatched: 0,
      messagesSent: 0,
      batchesCreated: 0,
      averageBatchSize: 0,
    };
  }

  public clearBatch(channel?: string): void {
    if (channel) {
      this.batches.delete(channel);
      if (this.timers.has(channel)) {
        clearTimeout(this.timers.get(channel)!);
        this.timers.delete(channel);
      }
    } else {
      this.batches.clear();
      for (const timer of this.timers.values()) {
        clearTimeout(timer);
      }
      this.timers.clear();
    }
  }

  public on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  public off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      for (const callback of callbacks) {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      }
    }
  }
}