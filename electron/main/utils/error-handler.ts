/**
 * Centralized Error Handler for Manus Electron
 * Provides unified error logging, tracking, and recovery strategies
 * Follows SOLID principles: Single Responsibility, Dependency Inversion
 */

import fs from 'fs';
import path from 'path';
import { app } from 'electron';

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'LOW',           // Can be recovered silently
  MEDIUM = 'MEDIUM',     // User should be notified
  HIGH = 'HIGH',         // Application feature affected
  CRITICAL = 'CRITICAL'  // Application may crash/become unstable
}

/**
 * Error categories for better tracking and recovery
 */
export enum ErrorCategory {
  IPC = 'IPC',                         // Inter-process communication
  AGENT = 'AGENT',                     // AI agent execution
  STORAGE = 'STORAGE',                 // Database/storage operations
  CONFIG = 'CONFIG',                   // Configuration management
  WINDOW = 'WINDOW',                   // Window/UI operations
  BROWSER = 'BROWSER',                 // Browser automation
  NETWORK = 'NETWORK',                 // Network operations
  FILE_SYSTEM = 'FILE_SYSTEM',         // File operations
  UNKNOWN = 'UNKNOWN'
}

/**
 * Structured error information
 */
export interface ErrorInfo {
  id?: string;                       // Unique error identifier
  category: ErrorCategory;
  severity: ErrorSeverity;
  message: string;
  code?: string;
  context?: Record<string, any>;
  timestamp: Date;
  stackTrace?: string;
  userId?: string;
  windowId?: string;
  taskId?: string;
  isRecoverable: boolean;
}

/**
 * Error recovery strategy
 */
export interface RecoveryStrategy {
  action: 'RETRY' | 'FALLBACK' | 'ABORT' | 'IGNORE';
  delayMs?: number;
  maxRetries?: number;
  fallbackValue?: any;
}

/**
 * Centralized Error Handler
 */
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: ErrorInfo[] = [];
  private maxLogSize: number = 1000;
  private logFilePath: string;
  private errorCallbacks: Map<ErrorCategory, Set<(error: ErrorInfo) => void>> = new Map();

  private constructor() {
    this.logFilePath = path.join(app.getPath('userData'), 'error.log');
    this.initializeErrorLog();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Initialize error log file
   */
  private initializeErrorLog(): void {
    try {
      if (!fs.existsSync(this.logFilePath)) {
        fs.writeFileSync(this.logFilePath, '[]');
      }
    } catch (error) {
      console.error('[ErrorHandler] Failed to initialize error log:', error);
    }
  }

  /**
   * Handle an error with full context
   */
  public handle(
    error: Error | string,
    category: ErrorCategory = ErrorCategory.UNKNOWN,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context?: Record<string, any>,
    isRecoverable: boolean = false
  ): ErrorInfo {
    const errorInfo: ErrorInfo = {
      id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      category,
      severity,
      message: error instanceof Error ? error.message : error,
      stackTrace: error instanceof Error ? error.stack : undefined,
      context,
      timestamp: new Date(),
      isRecoverable
    };

    // Add to in-memory log
    this.addToLog(errorInfo);

    // Persist to file
    this.persistError(errorInfo);

    // Notify callbacks
    this.notifyCallbacks(errorInfo);

    // Log based on severity
    this.logBySeverity(errorInfo);

    return errorInfo;
  }

  /**
   * Handle IPC errors specifically
   */
  public handleIpcError(
    error: Error | string,
    handlerName: string,
    severity: ErrorSeverity = ErrorSeverity.HIGH,
    context?: Record<string, any>
  ): ErrorInfo {
    return this.handle(
      error,
      ErrorCategory.IPC,
      severity,
      {
        handler: handlerName,
        ...context
      },
      false // IPC errors are generally not auto-recoverable
    );
  }

  /**
   * Handle agent execution errors
   */
  public handleAgentError(
    error: Error | string,
    taskId: string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context?: Record<string, any>
  ): ErrorInfo {
    return this.handle(
      error,
      ErrorCategory.AGENT,
      severity,
      {
        taskId,
        ...context
      },
      true // Agent errors may be recoverable (retry, pause/resume)
    );
  }

  /**
   * Handle window errors
   */
  public handleWindowError(
    error: Error | string,
    windowId: string,
    severity: ErrorSeverity = ErrorSeverity.HIGH,
    context?: Record<string, any>
  ): ErrorInfo {
    return this.handle(
      error,
      ErrorCategory.WINDOW,
      severity,
      {
        windowId,
        ...context
      },
      false
    );
  }

  /**
   * Handle storage errors
   */
  public handleStorageError(
    error: Error | string,
    operation: string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context?: Record<string, any>
  ): ErrorInfo {
    return this.handle(
      error,
      ErrorCategory.STORAGE,
      severity,
      {
        operation,
        ...context
      },
      true // Storage errors may be recoverable
    );
  }

  /**
   * Add to in-memory log
   */
  private addToLog(errorInfo: ErrorInfo): void {
    this.errorLog.push(errorInfo);

    // Keep only recent errors
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize);
    }
  }

  /**
   * Persist error to file
   */
  private persistError(errorInfo: ErrorInfo): void {
    try {
      const data = fs.readFileSync(this.logFilePath, 'utf-8');
      const errors = JSON.parse(data);
      errors.push(errorInfo);

      // Keep only recent errors in file too
      if (errors.length > 100) {
        errors.shift();
      }

      fs.writeFileSync(this.logFilePath, JSON.stringify(errors, null, 2));
    } catch (error) {
      console.error('[ErrorHandler] Failed to persist error:', error);
    }
  }

  /**
   * Log based on severity
   */
  private logBySeverity(errorInfo: ErrorInfo): void {
    const prefix = `[${errorInfo.category}] `;
    const message = `${prefix}${errorInfo.message}`;

    switch (errorInfo.severity) {
      case ErrorSeverity.CRITICAL:
        console.error(`❌ CRITICAL: ${message}`, errorInfo.context);
        break;
      case ErrorSeverity.HIGH:
        console.error(`⚠️  HIGH: ${message}`, errorInfo.context);
        break;
      case ErrorSeverity.MEDIUM:
        console.warn(`⚠️  MEDIUM: ${message}`, errorInfo.context);
        break;
      case ErrorSeverity.LOW:
        console.log(`ℹ️  LOW: ${message}`, errorInfo.context);
        break;
    }

    // Always log stack trace for debugging
    if (errorInfo.stackTrace) {
      console.debug(`Stack:\n${errorInfo.stackTrace}`);
    }
  }

  /**
   * Subscribe to errors in specific category
   */
  public onError(category: ErrorCategory, callback: (error: ErrorInfo) => void): void {
    if (!this.errorCallbacks.has(category)) {
      this.errorCallbacks.set(category, new Set());
    }
    this.errorCallbacks.get(category)!.add(callback);
  }

  /**
   * Unsubscribe from error category
   */
  public offError(category: ErrorCategory, callback: (error: ErrorInfo) => void): void {
    this.errorCallbacks.get(category)?.delete(callback);
  }

  /**
   * Notify all callbacks
   */
  private notifyCallbacks(errorInfo: ErrorInfo): void {
    const callbacks = this.errorCallbacks.get(errorInfo.category);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(errorInfo);
        } catch (error) {
          console.error('[ErrorHandler] Error in callback:', error);
        }
      });
    }
  }

  /**
   * Get recovery strategy based on error
   */
  public getRecoveryStrategy(errorInfo: ErrorInfo): RecoveryStrategy {
    if (!errorInfo.isRecoverable) {
      return { action: 'ABORT' };
    }

    switch (errorInfo.category) {
      case ErrorCategory.NETWORK:
        return { action: 'RETRY', delayMs: 1000, maxRetries: 3 };
      case ErrorCategory.STORAGE:
        return { action: 'RETRY', delayMs: 500, maxRetries: 2 };
      case ErrorCategory.AGENT:
        return { action: 'FALLBACK', fallbackValue: null };
      default:
        return { action: 'IGNORE' };
    }
  }

  /**
   * Get recent errors
   */
  public getRecentErrors(limit: number = 50): ErrorInfo[] {
    return this.errorLog.slice(-limit);
  }

  /**
   * Get errors by category
   */
  public getErrorsByCategory(category: ErrorCategory): ErrorInfo[] {
    return this.errorLog.filter(e => e.category === category);
  }

  /**
   * Clear error log
   */
  public clearLog(): void {
    this.errorLog = [];
  }

  /**
   * Export error report
   */
  public exportErrorReport(): {
    timestamp: string;
    stats: {
      totalErrors: number;
      highestSeverity: ErrorSeverity;
      mostCommonCategory: ErrorCategory;
      bySeverity: Record<string, number>;
      byCategory: Record<string, number>;
    };
    errors: ErrorInfo[];
  } {
    const bySeverity = {
      critical: this.getErrorsBySeverity(ErrorSeverity.CRITICAL).length,
      high: this.getErrorsBySeverity(ErrorSeverity.HIGH).length,
      medium: this.getErrorsBySeverity(ErrorSeverity.MEDIUM).length,
      low: this.getErrorsBySeverity(ErrorSeverity.LOW).length
    };

    // Calculate most common category
    const categoryCount: Record<string, number> = {};
    this.errorLog.forEach(error => {
      categoryCount[error.category] = (categoryCount[error.category] || 0) + 1;
    });

    const mostCommonCategory = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] as ErrorCategory || ErrorCategory.UNKNOWN;

    // Find highest severity
    let highestSeverity = ErrorSeverity.LOW;
    if (bySeverity.critical > 0) highestSeverity = ErrorSeverity.CRITICAL;
    else if (bySeverity.high > 0) highestSeverity = ErrorSeverity.HIGH;
    else if (bySeverity.medium > 0) highestSeverity = ErrorSeverity.MEDIUM;

    return {
      timestamp: new Date().toISOString(),
      stats: {
        totalErrors: this.errorLog.length,
        highestSeverity,
        mostCommonCategory,
        bySeverity,
        byCategory: categoryCount
      },
      errors: this.errorLog
    };
  }

  /**
   * Get total error count
   */
  public getTotalErrorCount(): number {
    return this.errorLog.length;
  }

  /**
   * Get errors count by category
   */
  public getErrorsCountByCategory(): Record<string, number> {
    const counts: Record<string, number> = {};
    this.errorLog.forEach(error => {
      counts[error.category] = (counts[error.category] || 0) + 1;
    });
    return counts;
  }

  /**
   * Get error info by ID
   */
  public getErrorInfo(errorId: string): ErrorInfo | undefined {
    return this.errorLog.find(e => e.id === errorId);
  }

  /**
   * Clear all error logs and return count
   */
  public clearLogs(): number {
    const count = this.errorLog.length;
    this.errorLog = [];
    return count;
  }

  /**
   * Get errors by severity (public overload without parameters returns all by severity)
   */
  public getErrorsBySeverity(severity?: ErrorSeverity): ErrorInfo[] {
    if (severity === undefined) {
      return this.errorLog;
    }
    return this.errorLog.filter(e => e.severity === severity);
  }

}

/**
 * Global error handler instance
 */
export const errorHandler = ErrorHandler.getInstance();
