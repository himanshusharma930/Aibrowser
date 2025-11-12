import { PanelLayoutState } from '@/type'

// Default layout configuration
const DEFAULT_LAYOUT: PanelLayoutState = {
  browserPanelSize: 75,
  aiSidebarSize: 25,
  isCollapsed: false,
  lastModified: Date.now()
}

// localStorage key for panel layout persistence
const STORAGE_KEY = 'ai-browser-panel-layout'

/**
 * Load persisted panel layout from localStorage with validation
 * @returns PanelLayoutState - validated layout or defaults
 */
export function loadPersistedLayout(): PanelLayoutState {
  // Check if we're in the browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return DEFAULT_LAYOUT
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      console.log('[Layout] No persisted layout found, using defaults')
      return DEFAULT_LAYOUT
    }

    const parsed = JSON.parse(stored) as PanelLayoutState

    // Validate constraints
    if (
      typeof parsed.browserPanelSize !== 'number' ||
      typeof parsed.aiSidebarSize !== 'number' ||
      parsed.browserPanelSize < 40 ||
      parsed.browserPanelSize > 85 ||
      parsed.aiSidebarSize < 15 ||
      parsed.aiSidebarSize > 60 ||
      Math.abs(parsed.browserPanelSize + parsed.aiSidebarSize - 100) > 1 // Allow 1% tolerance
    ) {
      console.warn('[Layout] Invalid persisted layout, using defaults:', parsed)
      return DEFAULT_LAYOUT
    }

    console.log('[Layout] Restored persisted layout:', parsed)
    return parsed
  } catch (error) {
    console.error('[Layout] Failed to load persisted layout:', error)
    return DEFAULT_LAYOUT
  }
}

/**
 * Persist panel layout to localStorage with error handling
 * @param layout - PanelLayoutState to persist
 */
export function persistLayout(layout: PanelLayoutState): void {
  // Check if we're in the browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return
  }

  try {
    const layoutWithTimestamp = {
      ...layout,
      lastModified: Date.now()
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layoutWithTimestamp))
    console.log('[Layout] Layout persisted successfully:', layoutWithTimestamp)
  } catch (error) {
    console.error('[Layout] Failed to persist layout:', error)
    // Continue with in-memory state - don't throw error
    // This handles private browsing mode and quota exceeded scenarios
  }
}

/**
 * Create a debounced version of persistLayout to avoid excessive writes
 * @param delay - Debounce delay in milliseconds (default: 500ms)
 * @returns Debounced persist function
 */
export function createDebouncedPersist(delay: number = 500) {
  let timeoutId: NodeJS.Timeout | null = null

  return function debouncedPersist(layout: PanelLayoutState) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      persistLayout(layout)
      timeoutId = null
    }, delay)
  }
}

/**
 * Validate panel layout constraints
 * @param layout - Layout to validate
 * @returns boolean - true if valid
 */
export function validateLayout(layout: Partial<PanelLayoutState>): boolean {
  if (typeof layout.browserPanelSize !== 'number' || typeof layout.aiSidebarSize !== 'number') {
    return false
  }

  return (
    layout.browserPanelSize >= 40 &&
    layout.browserPanelSize <= 85 &&
    layout.aiSidebarSize >= 15 &&
    layout.aiSidebarSize <= 60 &&
    Math.abs(layout.browserPanelSize + layout.aiSidebarSize - 100) <= 1
  )
}

/**
 * Clamp panel size to valid range
 * @param size - Panel size to clamp
 * @param min - Minimum allowed size
 * @param max - Maximum allowed size
 * @returns Clamped size
 */
export function clampPanelSize(size: number, min: number, max: number): number {
  return Math.min(Math.max(size, min), max)
}