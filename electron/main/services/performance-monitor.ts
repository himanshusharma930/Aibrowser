/**
 * Performance Monitor - Real-time metrics collection
 */

export class PerformanceMonitor {
  private metrics = {
    ipcCalls: 0,
    messagesBatched: 0,
    batchesSent: 0,
    averageBatchSize: 0,
    totalBytes: 0,
    memoryUsage: 0,
    startTime: Date.now(),
  };

  private readonly interval = 30000;
  private timer: NodeJS.Timeout | null = null;
  private listeners: Map<string, Function[]> = new Map();

  constructor() {
    this.startMonitoring();
  }

  private startMonitoring(): void {
    this.timer = setInterval(() => {
      this.collectMetrics();
      this.emit('metricsUpdate', this.getMetrics());
    }, this.interval);
  }

  private collectMetrics(): void {
    const memUsage = process.memoryUsage();
    this.metrics.memoryUsage = memUsage.heapUsed;
    this.metrics.totalBytes += memUsage.heapUsed;
  }

  public recordIPCCall(channel: string): void {
    this.metrics.ipcCalls++;
  }

  public recordBatch(messageCount: number): void {
    this.metrics.messagesBatched += messageCount;
    this.metrics.batchesSent++;
    this.metrics.averageBatchSize =
      this.metrics.messagesBatched / this.metrics.batchesSent || 0;
  }

  public getMetrics() {
    return {
      ...this.metrics,
      efficiency: this.metrics.messagesBatched > 0
        ? this.metrics.batchesSent / this.metrics.messagesBatched
        : 1,
      elapsedTime: Date.now() - this.metrics.startTime,
    };
  }

  public reset(): void {
    this.metrics = {
      ipcCalls: 0,
      messagesBatched: 0,
      batchesSent: 0,
      averageBatchSize: 0,
      totalBytes: 0,
      memoryUsage: 0,
      startTime: Date.now(),
    };
  }

  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public getBatchingReport(): string {
    const metrics = this.getMetrics();
    return `
IPC Performance Report:
- Total IPC Calls: ${metrics.ipcCalls}
- Messages Batched: ${metrics.messagesBatched}
- Batches Sent: ${metrics.batchesSent}
- Average Batch Size: ${metrics.averageBatchSize.toFixed(2)}
- Efficiency: ${(metrics.efficiency * 100).toFixed(1)}%
- Memory Usage: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB
- Runtime: ${(metrics.elapsedTime / 1000).toFixed(2)}s
    `.trim();
  }

  public on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
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

  public destroy(): void {
    this.stop();
    this.listeners.clear();
  }
}