import { MemoryError, TaskQueueError, AppError } from '../utils/app-errors';
import { ErrorSeverity, ErrorCategory } from '../utils/error-handler';

/**
 * Memory management system for long-running tasks
 */

export interface MemoryConfig {
  maxHeapSize: number; // MB
  warningThreshold: number; // % of max
  criticalThreshold: number; // % of max
  cleanupInterval: number; // ms
  enableAutoCleanup: boolean;
}

export interface ResourceStats {
  heapUsed: number;
  heapTotal: number;
  external: number;
  arrayBuffers: number;
  timestamp: number;
}

export class MemoryManager {
  private config: MemoryConfig;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private stats: ResourceStats[] = [];
  private maxStatsHistory = 100;

  constructor(config: Partial<MemoryConfig> = {}) {
    this.config = {
      maxHeapSize: 512, // MB
      warningThreshold: 80, // 80%
      criticalThreshold: 95, // 95%
      cleanupInterval: 60000, // 1 minute
      enableAutoCleanup: true,
      ...config,
    };

    if (this.config.enableAutoCleanup) {
      this.startAutoCleanup();
    }
  }

  /**
   * Check current memory usage
   */
  public checkMemory(): ResourceStats {
    const usage = process.memoryUsage();

    const stats: ResourceStats = {
      heapUsed: usage.heapUsed / 1024 / 1024,
      heapTotal: usage.heapTotal / 1024 / 1024,
      external: usage.external / 1024 / 1024,
      arrayBuffers: usage.arrayBuffers / 1024 / 1024,
      timestamp: Date.now(),
    };

    // Keep history for trending
    this.stats.push(stats);
    if (this.stats.length > this.maxStatsHistory) {
      this.stats.shift();
    }

    // Check thresholds
    this.validateMemoryUsage(stats);

    return stats;
  }

  /**
   * Validate memory usage against thresholds
   */
  private validateMemoryUsage(stats: ResourceStats): void {
    const percentUsed = (stats.heapUsed / this.config.maxHeapSize) * 100;

    if (percentUsed >= this.config.criticalThreshold) {
      throw new MemoryError(
        'Task execution',
        stats.heapUsed,
        this.config.maxHeapSize,
        {
          percentUsed: percentUsed.toFixed(2),
          severity: 'CRITICAL',
        }
      );
    }

    if (percentUsed >= this.config.warningThreshold) {
      console.warn(
        `[Memory Warning] Heap usage at ${percentUsed.toFixed(2)}% of max (${stats.heapUsed.toFixed(1)}MB/${this.config.maxHeapSize}MB)`
      );
    }
  }

  /**
   * Force garbage collection (if available)
   */
  public forceGarbageCollection(): void {
    if (global.gc) {
      global.gc();
      console.log('[Memory] Garbage collection triggered');
    } else {
      console.warn('[Memory] Garbage collection not available. Run with --expose-gc flag');
    }
  }

  /**
   * Start automatic cleanup
   */
  private startAutoCleanup(): void {
    this.cleanupTimer = setInterval(() => {
      const stats = this.checkMemory();
      const percentUsed = (stats.heapUsed / this.config.maxHeapSize) * 100;

      if (percentUsed > 70) {
        this.forceGarbageCollection();
      }
    }, this.config.cleanupInterval);
  }

  /**
   * Stop automatic cleanup
   */
  public stopAutoCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  /**
   * Get memory statistics
   */
  public getStats(): {
    current: ResourceStats;
    peak: ResourceStats;
    average: ResourceStats;
    trend: 'stable' | 'increasing' | 'decreasing';
  } {
    if (this.stats.length === 0) {
      return {
        current: this.checkMemory(),
        peak: this.checkMemory(),
        average: this.checkMemory(),
        trend: 'stable',
      };
    }

    const current = this.stats[this.stats.length - 1];
    const peak = this.stats.reduce((max, stat) =>
      stat.heapUsed > max.heapUsed ? stat : max
    );

    const average: ResourceStats = {
      heapUsed: this.stats.reduce((sum, s) => sum + s.heapUsed, 0) / this.stats.length,
      heapTotal: this.stats.reduce((sum, s) => sum + s.heapTotal, 0) / this.stats.length,
      external: this.stats.reduce((sum, s) => sum + s.external, 0) / this.stats.length,
      arrayBuffers: this.stats.reduce((sum, s) => sum + s.arrayBuffers, 0) / this.stats.length,
      timestamp: Date.now(),
    };

    // Determine trend
    let trend: 'stable' | 'increasing' | 'decreasing' = 'stable';
    if (this.stats.length >= 3) {
      const recent = this.stats.slice(-3);
      const diff = recent[recent.length - 1].heapUsed - recent[0].heapUsed;
      if (diff > 5) trend = 'increasing';
      else if (diff < -5) trend = 'decreasing';
    }

    return { current, peak, average, trend };
  }

  /**
   * Get memory usage report
   */
  public getReport(): string {
    const stats = this.getStats();
    return `
Memory Report:
- Current: ${stats.current.heapUsed.toFixed(1)}MB / ${this.config.maxHeapSize}MB
- Peak: ${stats.peak.heapUsed.toFixed(1)}MB
- Average: ${stats.average.heapUsed.toFixed(1)}MB
- External: ${stats.current.external.toFixed(1)}MB
- Trend: ${stats.trend}
- Percentage: ${((stats.current.heapUsed / this.config.maxHeapSize) * 100).toFixed(1)}%
    `.trim();
  }

  public destroy(): void {
    this.stopAutoCleanup();
    this.stats = [];
  }
}

/**
 * Task resource pool for managing concurrent task memory
 */
export class TaskResourcePool {
  private tasks = new Map<string, { memory: number; createdAt: number }>();
  private memoryManager: MemoryManager;
  private maxTaskMemory: number; // MB

  constructor(maxTaskMemory: number = 100, memoryManager?: MemoryManager) {
    this.maxTaskMemory = maxTaskMemory;
    this.memoryManager = memoryManager || new MemoryManager();
  }

  /**
   * Register a task and allocate memory
   */
  public registerTask(taskId: string, estimatedMemory: number = 10): void {
    const currentUsage = this.memoryManager.checkMemory();

    if (currentUsage.heapUsed + estimatedMemory > 512) {
      throw new TaskQueueError(
        'Cannot register task: insufficient memory',
        this.tasks.size,
        {
          currentMemory: currentUsage.heapUsed,
          estimatedMemory,
          maxTaskMemory: this.maxTaskMemory,
        }
      );
    }

    this.tasks.set(taskId, {
      memory: estimatedMemory,
      createdAt: Date.now(),
    });
  }

  /**
   * Unregister task and release memory
   */
  public unregisterTask(taskId: string): void {
    this.tasks.delete(taskId);
  }

  /**
   * Get all active tasks
   */
  public getActiveTasks(): string[] {
    return Array.from(this.tasks.keys());
  }

  /**
   * Cleanup old tasks
   */
  public cleanupOldTasks(maxAgeMs: number = 3600000): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [taskId, task] of this.tasks) {
      if (now - task.createdAt > maxAgeMs) {
        this.tasks.delete(taskId);
        cleaned++;
      }
    }

    return cleaned;
  }

  public destroy(): void {
    this.tasks.clear();
    this.memoryManager.destroy();
  }
}