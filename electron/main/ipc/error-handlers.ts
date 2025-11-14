import { ipcMain } from "electron";
import { errorHandler } from "../utils/error-handler";
import { createLogger } from "../utils/logger";
import { ErrorCategory, ErrorSeverity } from "../utils/error-handler";

const logger = createLogger('ErrorHandlers');

/**
 * Register IPC handlers for error tracking and reporting
 * Provides UI access to centralized error logs and recovery information
 */
export function registerErrorHandlers() {
  /**
   * Get recent errors (last N errors)
   * Format: error:get-recent-errors?count=50
   */
  ipcMain.handle('error:get-recent-errors', async (_event, count: number = 50) => {
    try {
      const recentErrors = errorHandler.getRecentErrors(count);

      // ✅ PHASE 2: Log error retrieval
      logger.debug('Retrieved recent errors from error handler', {
        count: recentErrors.length,
        maxRequested: count
      });

      return {
        success: true,
        errors: recentErrors,
        timestamp: Date.now(),
        count: recentErrors.length
      };
    } catch (error) {
      // ✅ PHASE 2: Log error retrieval failure
      logger.error(
        'Failed to retrieve recent errors',
        error as Error,
        { count },
        ErrorCategory.STORAGE,
        ErrorSeverity.MEDIUM,
        true // recoverable - will retry
      );

      return {
        success: false,
        errors: [],
        error: (error as Error).message,
        timestamp: Date.now()
      };
    }
  });

  /**
   * Get errors by category
   * Format: error:get-errors-by-category?category=IPC
   */
  ipcMain.handle('error:get-errors-by-category', async (_event, category: string) => {
    try {
      const categoryErrors = errorHandler.getErrorsByCategory(category);

      // ✅ PHASE 2: Log category filter
      logger.debug('Retrieved errors by category', {
        category,
        count: categoryErrors.length
      });

      return {
        success: true,
        category,
        errors: categoryErrors,
        timestamp: Date.now(),
        count: categoryErrors.length
      };
    } catch (error) {
      // ✅ PHASE 2: Log category retrieval failure
      logger.error(
        'Failed to retrieve errors by category',
        error as Error,
        { category },
        ErrorCategory.STORAGE,
        ErrorSeverity.MEDIUM,
        true
      );

      return {
        success: false,
        category,
        errors: [],
        error: (error as Error).message,
        timestamp: Date.now()
      };
    }
  });

  /**
   * Export error report for analysis
   * Generates comprehensive error statistics and summary
   */
  ipcMain.handle('error:export-report', async (_event) => {
    try {
      const report = errorHandler.exportErrorReport();

      // ✅ PHASE 2: Log report export
      logger.info('Error report exported', {
        totalErrors: report.stats.totalErrors,
        highestSeverity: report.stats.highestSeverity,
        mostCommonCategory: report.stats.mostCommonCategory
      });

      return {
        success: true,
        report,
        timestamp: Date.now()
      };
    } catch (error) {
      // ✅ PHASE 2: Log export failure
      logger.error(
        'Failed to export error report',
        error as Error,
        {},
        ErrorCategory.STORAGE,
        ErrorSeverity.MEDIUM,
        true
      );

      return {
        success: false,
        error: (error as Error).message,
        timestamp: Date.now()
      };
    }
  });

  /**
   * Clear all error logs
   * Dangerous operation - clears all accumulated error history
   */
  ipcMain.handle('error:clear-logs', async (_event) => {
    try {
      const clearedCount = errorHandler.clearLogs();

      // ✅ PHASE 2: Log manual clear operation
      logger.warn('Error logs manually cleared', {
        clearedCount,
        timestamp: new Date().toISOString()
      });

      return {
        success: true,
        clearedCount,
        timestamp: Date.now(),
        message: `Cleared ${clearedCount} error logs`
      };
    } catch (error) {
      // ✅ PHASE 2: Log clear failure
      logger.error(
        'Failed to clear error logs',
        error as Error,
        {},
        ErrorCategory.STORAGE,
        ErrorSeverity.MEDIUM,
        false // non-recoverable - user action
      );

      return {
        success: false,
        error: (error as Error).message,
        timestamp: Date.now()
      };
    }
  });

  /**
   * Get error handler statistics
   * Returns summary of error trends and distribution
   */
  ipcMain.handle('error:get-statistics', async (_event) => {
    try {
      const stats = {
        totalErrors: errorHandler.getTotalErrorCount(),
        errorsBySeverity: errorHandler.getErrorsBySeverity(),
        errorsByCategory: errorHandler.getErrorsCountByCategory(),
        recentErrorsCount: errorHandler.getRecentErrors(100).length,
        timestamp: Date.now()
      };

      // ✅ PHASE 2: Log statistics retrieval
      logger.debug('Error statistics retrieved', {
        totalErrors: stats.totalErrors,
        recentCount: stats.recentErrorsCount
      });

      return {
        success: true,
        stats,
        timestamp: Date.now()
      };
    } catch (error) {
      // ✅ PHASE 2: Log stats retrieval failure
      logger.error(
        'Failed to retrieve error statistics',
        error as Error,
        {},
        ErrorCategory.STORAGE,
        ErrorSeverity.MEDIUM,
        true
      );

      return {
        success: false,
        error: (error as Error).message,
        timestamp: Date.now()
      };
    }
  });

  /**
   * Get recovery summary for a specific error
   * Shows recommended recovery strategy
   */
  ipcMain.handle('error:get-recovery-summary', async (_event, errorId: string) => {
    try {
      const errorInfo = errorHandler.getErrorInfo(errorId);

      if (!errorInfo) {
        logger.warn('Error not found for recovery summary', { errorId });
        return {
          success: false,
          error: `Error with ID ${errorId} not found`,
          timestamp: Date.now()
        };
      }

      const recovery = errorHandler.getRecoveryStrategy(errorInfo);

      // ✅ PHASE 2: Log recovery summary retrieval
      logger.debug('Recovery summary retrieved', {
        errorId,
        category: errorInfo.category,
        severity: errorInfo.severity,
        strategy: recovery.strategy
      });

      return {
        success: true,
        errorInfo,
        recovery,
        timestamp: Date.now()
      };
    } catch (error) {
      // ✅ PHASE 2: Log recovery summary failure
      logger.error(
        'Failed to retrieve recovery summary',
        error as Error,
        { errorId },
        ErrorCategory.STORAGE,
        ErrorSeverity.MEDIUM,
        true
      );

      return {
        success: false,
        error: (error as Error).message,
        timestamp: Date.now()
      };
    }
  });

  // ✅ PHASE 2: Log successful error handler registration
  logger.info('Error tracking IPC handlers registered');
}
