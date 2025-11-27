/**
 * Focus Management and Keyboard Navigation Utilities
 *
 * Comprehensive utilities for managing focus, implementing keyboard shortcuts,
 * and ensuring proper keyboard navigation throughout the application.
 *
 * Features:
 * - Focus trap for modal dialogs
 * - Focus restoration after dialogs close
 * - Keyboard shortcut management
 * - Accessible focus indicators
 * - Focus outline visibility
 * - Keyboard event handling utilities
 * - Navigation context management
 */

/**
 * Focus manager for keyboard navigation and focus handling
 */
export class FocusManager {
  private focusStack: HTMLElement[] = [];
  private focusTrapActive: boolean = false;
  private keyboardShortcuts: Map<string, () => void> = new Map();
  private lastFocusedElement: HTMLElement | null = null;

  /**
   * Initialize focus manager
   */
  constructor() {
    this.setupGlobalKeyboardHandlers();
  }

  /**
   * Set up global keyboard handlers
   */
  private setupGlobalKeyboardHandlers(): void {
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
  }

  /**
   * Handle global keyboard events
   */
  private handleGlobalKeydown(event: KeyboardEvent): void {
    // Check for registered shortcuts
    const shortcutKey = this.getShortcutKey(event);
    if (shortcutKey && this.keyboardShortcuts.has(shortcutKey)) {
      const handler = this.keyboardShortcuts.get(shortcutKey);
      if (handler) {
        event.preventDefault();
        handler();
      }
    }

    // Handle focus navigation
    if (event.key === 'Escape' && this.focusTrapActive) {
      this.releaseFocusTrap();
    }

    // Handle Tab key for focus management
    if (event.key === 'Tab') {
      this.handleTabNavigation(event);
    }
  }

  /**
   * Convert keyboard event to shortcut key string
   */
  private getShortcutKey(event: KeyboardEvent): string {
    const parts: string[] = [];
    if (event.ctrlKey) parts.push('ctrl');
    if (event.shiftKey) parts.push('shift');
    if (event.altKey) parts.push('alt');
    if (event.metaKey) parts.push('meta');
    parts.push(event.key.toLowerCase());
    return parts.join('+');
  }

  /**
   * Register keyboard shortcut
   */
  registerShortcut(
    shortcut: string,
    handler: () => void,
    description?: string
  ): void {
    this.keyboardShortcuts.set(shortcut.toLowerCase(), handler);
    if (description) {
      console.info(`Keyboard shortcut registered: ${shortcut} - ${description}`);
    }
  }

  /**
   * Unregister keyboard shortcut
   */
  unregisterShortcut(shortcut: string): void {
    this.keyboardShortcuts.delete(shortcut.toLowerCase());
  }

  /**
   * Get all registered shortcuts
   */
  getShortcuts(): Array<[string, () => void]> {
    return Array.from(this.keyboardShortcuts.entries());
  }

  /**
   * Enable focus trap for modal dialog
   */
  enableFocusTrap(element: HTMLElement): void {
    if (this.focusTrapActive) {
      this.releaseFocusTrap();
    }

    this.lastFocusedElement = document.activeElement as HTMLElement;
    this.focusStack.push(element);
    this.focusTrapActive = true;

    // Focus first focusable element in the trap
    this.focusFirstElement(element);
  }

  /**
   * Release focus trap
   */
  releaseFocusTrap(): void {
    this.focusStack.pop();
    this.focusTrapActive = this.focusStack.length > 0;

    // Restore focus to previously focused element
    if (this.lastFocusedElement && !this.focusTrapActive) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }

  /**
   * Focus first focusable element in container
   */
  private focusFirstElement(container: HTMLElement): void {
    const focusable = this.getFocusableElements(container);
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }

  /**
   * Get all focusable elements in container
   */
  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(container.querySelectorAll(selector));
  }

  /**
   * Handle Tab key navigation within focus trap
   */
  private handleTabNavigation(event: KeyboardEvent): void {
    if (!this.focusTrapActive || this.focusStack.length === 0) {
      return;
    }

    const container = this.focusStack[this.focusStack.length - 1];
    const focusable = this.getFocusableElements(container);

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const activeElement = document.activeElement as HTMLElement;
    const currentIndex = focusable.indexOf(activeElement);

    if (event.shiftKey) {
      // Shift+Tab - move to previous element
      if (currentIndex <= 0) {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      }
    } else {
      // Tab - move to next element
      if (currentIndex >= focusable.length - 1) {
        event.preventDefault();
        focusable[0].focus();
      }
    }
  }

  /**
   * Restore focus to element
   */
  restoreFocus(element: HTMLElement): void {
    if (element && document.contains(element)) {
      element.focus();
      // Announce focus change to screen readers
      this.announceToScreenReader(`Focus moved to ${element.getAttribute('aria-label') || element.textContent}`);
    }
  }

  /**
   * Announce message to screen readers using ARIA live region
   */
  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    let liveRegion = document.querySelector(`[aria-live="${priority}"]`) as HTMLElement;

    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }

    liveRegion.textContent = message;
  }

  /**
   * Enable visible focus indicator
   */
  enableVisibleFocus(): void {
    const style = document.createElement('style');
    style.textContent = `
      *:focus-visible {
        outline: 2px solid var(--color-info, #3B82F6) !important;
        outline-offset: 2px !important;
        border-radius: 2px;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Cleanup focus manager
   */
  destroy(): void {
    this.keyboardShortcuts.clear();
    this.focusStack = [];
    this.focusTrapActive = false;
  }
}

/**
 * Keyboard event utilities
 */
export const KeyboardUtils = {
  /**
   * Check if key is alphanumeric
   */
  isAlphanumeric(event: KeyboardEvent): boolean {
    const key = event.key;
    return /^[a-zA-Z0-9]$/.test(key);
  },

  /**
   * Check if key is arrow key
   */
  isArrowKey(event: KeyboardEvent): boolean {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);
  },

  /**
   * Check if key is modifier key
   */
  isModifierKey(event: KeyboardEvent): boolean {
    return ['Control', 'Shift', 'Alt', 'Meta'].includes(event.key);
  },

  /**
   * Create keyboard event
   */
  createKeyboardEvent(key: string, options: Partial<KeyboardEventInit> = {}): KeyboardEvent {
    return new KeyboardEvent('keydown', {
      key,
      code: key,
      bubbles: true,
      cancelable: true,
      ...options
    });
  },

  /**
   * Simulate keyboard press
   */
  simulateKeyPress(element: HTMLElement, key: string): void {
    const event = this.createKeyboardEvent(key);
    element.dispatchEvent(event);
  },

  /**
   * Get human-readable key name
   */
  getKeyName(key: string): string {
    const keyNames: Record<string, string> = {
      'Enter': 'Enter',
      'Escape': 'Esc',
      'ArrowUp': 'Up Arrow',
      'ArrowDown': 'Down Arrow',
      'ArrowLeft': 'Left Arrow',
      'ArrowRight': 'Right Arrow',
      'Tab': 'Tab',
      ' ': 'Space',
      'Backspace': 'Backspace',
      'Delete': 'Delete'
    };
    return keyNames[key] || key;
  }
};

/**
 * Navigation context for managing navigation state across components
 */
export class NavigationContext {
  private currentPath: string = '/';
  private navigationHistory: string[] = [];
  private navigationListeners: Set<(path: string) => void> = new Set();

  constructor(initialPath: string = '/') {
    this.currentPath = initialPath;
    this.navigationHistory.push(initialPath);
  }

  /**
   * Navigate to path
   */
  navigate(path: string): void {
    if (path !== this.currentPath) {
      this.currentPath = path;
      this.navigationHistory.push(path);
      this.notifyListeners(path);
    }
  }

  /**
   * Go back in history
   */
  goBack(): void {
    if (this.navigationHistory.length > 1) {
      this.navigationHistory.pop();
      this.currentPath = this.navigationHistory[this.navigationHistory.length - 1];
      this.notifyListeners(this.currentPath);
    }
  }

  /**
   * Get current path
   */
  getCurrentPath(): string {
    return this.currentPath;
  }

  /**
   * Get navigation history
   */
  getHistory(): string[] {
    return [...this.navigationHistory];
  }

  /**
   * Subscribe to navigation changes
   */
  subscribe(listener: (path: string) => void): () => void {
    this.navigationListeners.add(listener);
    return () => this.navigationListeners.delete(listener);
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(path: string): void {
    this.navigationListeners.forEach(listener => listener(path));
  }

  /**
   * Clear history
   */
  clearHistory(): void {
    this.navigationHistory = [this.currentPath];
  }
}

/**
 * Accessible dropdown menu handler
 */
export class AccessibleDropdownMenu {
  private isOpen: boolean = false;
  private focusManager: FocusManager;
  private triggerElement: HTMLElement;
  private menuElement: HTMLElement;
  private menuItems: HTMLElement[];

  constructor(
    triggerElement: HTMLElement,
    menuElement: HTMLElement,
    focusManager: FocusManager
  ) {
    this.triggerElement = triggerElement;
    this.menuElement = menuElement;
    this.focusManager = focusManager;
    this.menuItems = Array.from(menuElement.querySelectorAll('[role="menuitem"], button, a'));

    this.setupEventListeners();
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    this.triggerElement.addEventListener('click', () => this.toggle());
    this.triggerElement.addEventListener('keydown', (e) => this.handleTriggerKeydown(e));
    this.menuElement.addEventListener('keydown', (e) => this.handleMenuKeydown(e));
    document.addEventListener('click', (e) => this.handleDocumentClick(e));
  }

  /**
   * Handle trigger element keydown
   */
  private handleTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.open();
    }
  }

  /**
   * Handle menu keydown
   */
  private handleMenuKeydown(event: KeyboardEvent): void {
    const currentIndex = this.menuItems.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusItem((currentIndex + 1) % this.menuItems.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusItem((currentIndex - 1 + this.menuItems.length) % this.menuItems.length);
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Home':
        event.preventDefault();
        this.focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusItem(this.menuItems.length - 1);
        break;
    }
  }

  /**
   * Handle document click
   */
  private handleDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.triggerElement.contains(target) && !this.menuElement.contains(target)) {
      this.close();
    }
  }

  /**
   * Open menu
   */
  open(): void {
    if (!this.isOpen) {
      this.isOpen = true;
      this.menuElement.style.display = 'block';
      this.triggerElement.setAttribute('aria-expanded', 'true');
      this.focusManager.enableFocusTrap(this.menuElement);
      this.focusItem(0);
    }
  }

  /**
   * Close menu
   */
  close(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.menuElement.style.display = 'none';
      this.triggerElement.setAttribute('aria-expanded', 'false');
      this.focusManager.releaseFocusTrap();
      this.triggerElement.focus();
    }
  }

  /**
   * Toggle menu
   */
  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Focus menu item
   */
  private focusItem(index: number): void {
    if (this.menuItems[index]) {
      this.menuItems[index].focus();
    }
  }

  /**
   * Destroy menu handler
   */
  destroy(): void {
    this.triggerElement.removeEventListener('click', () => this.toggle());
    this.menuElement.removeEventListener('keydown', (e) => this.handleMenuKeydown(e));
    document.removeEventListener('click', (e) => this.handleDocumentClick(e));
  }
}

/**
 * Create global focus manager instance
 */
export const globalFocusManager = new FocusManager();

const focusManagementExports = {
  FocusManager,
  KeyboardUtils,
  NavigationContext,
  AccessibleDropdownMenu,
  globalFocusManager
};

export default focusManagementExports;
