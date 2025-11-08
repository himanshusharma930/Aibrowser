/**
 * Common interfaces for browser tools
 */

export interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface ElementVisibility {
  exists: boolean;
  visible: boolean;
  inViewport: boolean;
}

export interface BaseToolResult {
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Type guard for checking if element is form input
 */
export function isFormElement(element: Element): element is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement {
  return element instanceof HTMLInputElement ||
         element instanceof HTMLTextAreaElement ||
         element instanceof HTMLSelectElement;
}

/**
 * Type guard for checking if element is contenteditable
 */
export function isContentEditable(element: Element): boolean {
  return (element as HTMLElement).getAttribute('contenteditable') === 'true';
}
