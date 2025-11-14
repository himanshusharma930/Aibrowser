/**
 * Standardized Logger for Manus Electron
 * Provides consistent logging across the application
 * Integrates with centralized error handling
 */

import { ErrorHandler, ErrorCategory, ErrorSeverity } from './error-handler';

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

/**
 * Standardized Logger
 */
export class Logger {
  private module: string;
  private errorHandler: ErrorHandler;

  constructor(module: string) {
    this.module = module;
    this.errorHandler = ErrorHandler.getInstance();
  }

  /**
   * Get formatted prefix
   */
  private getPrefix(): string {
    return `[${this.module}]`;
  }

  /**
   * Debug level logging
   */
  public debug(message: string, data?: any): void {
    console.debug(`${this.getPrefix()} ${message}`, data || '');
  }

  /**
   * Info level logging
   */
  public info(message: string, data?: any): void {
    console.log(`${this.getPrefix()} ${message}`, data || '');
  }

  /**
   * Warning level logging
   */
  public warn(message: string, data?: any): void {
    console.warn(`${this.getPrefix()} ⚠️  ${message}`, data || '');
  }

  /**
   * Error level logging (with error tracking)
   */
  public error(
    message: string,
    error?: Error | string,
    context?: Record<string, any>,
    category: ErrorCategory = ErrorCategory.UNKNOWN,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    isRecoverable: boolean = false
  ): void {
    console.error(`${this.getPrefix()} ❌ ${message}`, error || '');

    // Track error in centralized handler
    this.errorHandler.handle(
      error || message,
      category,
      severity,
      {
        module: this.module,
        ...context
      },
      isRecoverable
    );
  }

  /**
   * Critical error (will exit application on critical count)
   */
  public critical(
    message: string,
    error?: Error | string,
    context?: Record<string, any>,
    category: ErrorCategory = ErrorCategory.UNKNOWN
  ): void {
    console.error(`${this.getPrefix()} 🔴 CRITICAL: ${message}`, error || '');

    this.errorHandler.handle(
      error || message,
      category,
      ErrorSeverity.CRITICAL,
      {
        module: this.module,
        ...context
      },
      false
    );
  }

  /**
   * Log IPC communication
   */
  public logIpc(channel: string, data?: any, isRequest: boolean = true): void {
    const direction = isRequest ? '→' : '←';
    this.debug(`${direction} IPC:${channel}`, data);
  }

  /**
   * Log performance metrics
   */
  public logPerformance(label: string, duration: number): void {
    const emoji = duration > 1000 ? '⚠️ ' : '✅ ';
    this.info(`${emoji}${label}: ${duration}ms`);
  }

  /**
   * Log agent execution
   */
  public logAgentExecution(taskId: string, status: 'START' | 'PROGRESS' | 'SUCCESS' | 'ERROR', data?: any): void {
    const emoji = {
      'START': '🚀',
      'PROGRESS': '⏳',
      'SUCCESS': '✅',
      'ERROR': '❌'
    }[status];

    this.info(`${emoji} Agent [${taskId}] ${status}`, data);
  }

  /**
   * Log window operations
   */
  public logWindow(windowId: string, operation: string, data?: any): void {
    this.debug(`🪟 Window [${windowId}] ${operation}`, data);
  }

  /**
   * Log storage operations
   */
  public logStorage(operation: string, details?: any): void {
    this.debug(`💾 Storage: ${operation}`, details);
  }
}

/**
 * Create logger instance for a module
 */
export function createLogger(moduleName: string): Logger {
  return new Logger(moduleName);
}

/**
 * Global logger instance for general use
 */
export const logger = new Logger('App');
