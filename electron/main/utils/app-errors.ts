import { ErrorSeverity, ErrorCategory } from './error-handler';

/**
 * Comprehensive error type hierarchy for Electron application
 */

// Base error class with categorization
export abstract class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public category: ErrorCategory,
    public severity: ErrorSeverity,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      category: this.category,
      severity: this.severity,
      context: this.context,
      stack: this.stack,
    };
  }
}

// ==================== IPC Errors ====================

export class IPCValidationError extends AppError {
  constructor(
    message: string,
    public validationErrors: Record<string, any>,
    context?: Record<string, any>
  ) {
    super(
      message,
      'IPC_VALIDATION_ERROR',
      ErrorCategory.IPC,
      ErrorSeverity.MEDIUM,
      context
    );
  }
}

export class IPCTimeoutError extends AppError {
  constructor(channel: string, timeout: number, context?: Record<string, any>) {
    super(
      `IPC handler timeout on channel "${channel}" after ${timeout}ms`,
      'IPC_TIMEOUT',
      ErrorCategory.IPC,
      ErrorSeverity.HIGH,
      { channel, timeout, ...context }
    );
  }
}

export class IPCRateLimitError extends AppError {
  constructor(channel: string, minInterval: number, context?: Record<string, any>) {
    super(
      `Rate limit exceeded for channel "${channel}". Min interval: ${minInterval}ms`,
      'IPC_RATE_LIMITED',
      ErrorCategory.IPC,
      ErrorSeverity.LOW,
      { channel, minInterval, ...context }
    );
  }
}

export class IPCHandlerNotFoundError extends AppError {
  constructor(channel: string, context?: Record<string, any>) {
    super(
      `No handler registered for IPC channel "${channel}"`,
      'IPC_HANDLER_NOT_FOUND',
      ErrorCategory.IPC,
      ErrorSeverity.MEDIUM,
      { channel, ...context }
    );
  }
}

// ==================== Agent Errors ====================

export class AgentExecutionError extends AppError {
  constructor(
    message: string,
    public agentName: string,
    public failedStep?: number,
    context?: Record<string, any>
  ) {
    super(
      message,
      'AGENT_EXECUTION_ERROR',
      ErrorCategory.AGENT,
      ErrorSeverity.HIGH,
      { agentName, failedStep, ...context }
    );
  }
}

export class AgentToolError extends AppError {
  constructor(
    toolName: string,
    message: string,
    public toolError?: any,
    context?: Record<string, any>
  ) {
    super(
      `Tool "${toolName}" failed: ${message}`,
      'AGENT_TOOL_ERROR',
      ErrorCategory.AGENT,
      ErrorSeverity.MEDIUM,
      { toolName, ...context }
    );
  }
}

export class WorkflowParseError extends AppError {
  constructor(
    message: string,
    public xmlError?: any,
    context?: Record<string, any>
  ) {
    super(
      message,
      'WORKFLOW_PARSE_ERROR',
      ErrorCategory.AGENT,
      ErrorSeverity.HIGH,
      context
    );
  }
}

// ==================== Browser/View Errors ====================

export class BrowserNavigationError extends AppError {
  constructor(
    url: string,
    message: string,
    context?: Record<string, any>
  ) {
    super(
      `Navigation to "${url}" failed: ${message}`,
      'BROWSER_NAVIGATION_ERROR',
      ErrorCategory.BROWSER,
      ErrorSeverity.MEDIUM,
      { url, ...context }
    );
  }
}

export class BrowserElementError extends AppError {
  constructor(
    selector: string,
    operation: string,
    message: string,
    context?: Record<string, any>
  ) {
    super(
      `Element operation "${operation}" on "${selector}" failed: ${message}`,
      'BROWSER_ELEMENT_ERROR',
      ErrorCategory.BROWSER,
      ErrorSeverity.MEDIUM,
      { selector, operation, ...context }
    );
  }
}

export class ViewCreationError extends AppError {
  constructor(
    viewType: string,
    message: string,
    context?: Record<string, any>
  ) {
    super(
      `Failed to create ${viewType} view: ${message}`,
      'VIEW_CREATION_ERROR',
      ErrorCategory.BROWSER,
      ErrorSeverity.HIGH,
      { viewType, ...context }
    );
  }
}

// ==================== File System Errors ====================

export class FileOperationError extends AppError {
  constructor(
    operation: 'read' | 'write' | 'delete',
    path: string,
    message: string,
    context?: Record<string, any>
  ) {
    super(
      `File ${operation} failed for "${path}": ${message}`,
      `FILE_${operation.toUpperCase()}_ERROR`,
      ErrorCategory.FILE_SYSTEM,
      ErrorSeverity.MEDIUM,
      { path, operation, ...context }
    );
  }
}

export class PermissionDeniedError extends AppError {
  constructor(
    resource: string,
    operation: string,
    context?: Record<string, any>
  ) {
    super(
      `Permission denied for ${operation} on "${resource}"`,
      'PERMISSION_DENIED',
      ErrorCategory.FILE_SYSTEM,
      ErrorSeverity.MEDIUM,
      { resource, operation, ...context }
    );
  }
}

// ==================== Configuration Errors ====================

export class ConfigurationError extends AppError {
  constructor(
    key: string,
    message: string,
    context?: Record<string, any>
  ) {
    super(
      `Configuration error for "${key}": ${message}`,
      'CONFIGURATION_ERROR',
      ErrorCategory.CONFIG,
      ErrorSeverity.HIGH,
      { key, ...context }
    );
  }
}

export class InvalidAPIKeyError extends AppError {
  constructor(
    provider: string,
    context?: Record<string, any>
  ) {
    super(
      `Invalid or missing API key for provider "${provider}"`,
      'INVALID_API_KEY',
      ErrorCategory.CONFIG,
      ErrorSeverity.HIGH,
      { provider, ...context }
    );
  }
}

// ==================== Memory/Resource Errors ====================

export class MemoryError extends AppError {
  constructor(
    operation: string,
    availableMemory: number,
    requiredMemory: number,
    context?: Record<string, any>
  ) {
    super(
      `Insufficient memory for "${operation}". Available: ${availableMemory}MB, Required: ${requiredMemory}MB`,
      'MEMORY_ERROR',
      ErrorCategory.SYSTEM,
      ErrorSeverity.CRITICAL,
      { operation, availableMemory, requiredMemory, ...context }
    );
  }
}

export class TaskQueueError extends AppError {
  constructor(
    message: string,
    public queueSize: number,
    context?: Record<string, any>
  ) {
    super(
      message,
      'TASK_QUEUE_ERROR',
      ErrorCategory.SYSTEM,
      ErrorSeverity.HIGH,
      { queueSize, ...context }
    );
  }
}

// ==================== Error Factory ====================

export class ErrorFactory {
  static fromError(error: any, defaultCategory: ErrorCategory = ErrorCategory.UNKNOWN): AppError {
    // If already an AppError, return as is
    if (error instanceof AppError) {
      return error;
    }

    // Create a generic error with extracted information
    const message = error?.message || String(error);
    const code = error?.code || 'UNKNOWN_ERROR';

    return new AppError(
      message,
      code,
      defaultCategory,
      ErrorSeverity.MEDIUM,
      { originalError: error }
    );
  }

  static wrap(fn: Function, category: ErrorCategory = ErrorCategory.UNKNOWN) {
    return async (...args: any[]) => {
      try {
        return await fn(...args);
      } catch (error) {
        throw this.fromError(error, category);
      }
    };
  }
}

// ==================== Error Handler Utilities ====================

export function isRecoverable(error: AppError): boolean {
  return [
    ErrorSeverity.LOW,
    ErrorSeverity.MEDIUM,
  ].includes(error.severity);
}

export function isRetryable(error: AppError): boolean {
  return [
    'IPC_TIMEOUT',
    'AGENT_EXECUTION_ERROR',
    'BROWSER_NAVIGATION_ERROR',
  ].includes(error.code);
}

export function getRetryDelay(attempts: number): number {
  return Math.min(1000 * Math.pow(2, attempts), 30000); // Exponential backoff, max 30s
}