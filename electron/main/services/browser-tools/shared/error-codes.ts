/**
 * Standardized error codes for browser tools
 * Based on Requirements v2.0 - Section 9.0
 */
export enum BrowserToolErrorCode {
  ELEMENT_NOT_FOUND = 'ELEMENT_NOT_FOUND',
  INVALID_SELECTOR = 'INVALID_SELECTOR',
  TIMEOUT_EXCEEDED = 'TIMEOUT_EXCEEDED',
  INVALID_ELEMENT_TYPE = 'INVALID_ELEMENT_TYPE',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  CDP_COMMAND_FAILED = 'CDP_COMMAND_FAILED',
  EXECUTION_ERROR = 'EXECUTION_ERROR'
}

export interface BrowserToolError {
  code: BrowserToolErrorCode;
  message: string;
  details?: any;
}

export function createBrowserToolError(
  code: BrowserToolErrorCode,
  message: string,
  details?: any
): BrowserToolError {
  return { code, message, details };
}
