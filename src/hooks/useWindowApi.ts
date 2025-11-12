/**
 * useWindowApi Hook
 *
 * Provides type-safe access to window.api methods
 * Replaces scattered `(window.api as any)` casts with properly typed helpers
 *
 * This hook:
 * - Eliminates 'as any' type casts
 * - Provides memoized API helpers
 * - Ensures consistent error handling
 * - Enables IDE refactoring support
 */

import { useCallback } from 'react'

/**
 * Type-safe window.api interface
 */
interface WindowApi {
  getCurrentUrl?: () => Promise<string>
  onUrlChange?: (handler: (url: string) => void) => void
  setDetailViewVisible?: (visible: boolean) => void
  hideHistoryView?: () => void
  getMainViewScreenshot?: () => Promise<{ imageBase64?: string }>
  removeAllListeners?: (event: string) => void
}

/**
 * Return type for useWindowApi hook
 */
interface UseWindowApiReturn {
  getCurrentUrl: () => Promise<string>
  onUrlChange: (handler: (url: string) => void) => () => void
  setDetailViewVisible: (visible: boolean) => Promise<void>
  hideHistoryView: () => Promise<void>
  getMainViewScreenshot: () => Promise<string | undefined>
}

/**
 * Hook for type-safe access to Electron window.api
 *
 * Provides memoized helpers for:
 * - URL retrieval and change notifications
 * - Detail view visibility management
 * - Screenshot capture
 * - History view management
 *
 * @returns Object with typed API helpers
 */
export const useWindowApi = (): UseWindowApiReturn => {
  const api = window.api as WindowApi

  /**
   * Get current browser URL from main view
   */
  const getCurrentUrl = useCallback(async (): Promise<string> => {
    if (!api?.getCurrentUrl) {
      console.warn('[WindowApi] getCurrentUrl not available')
      return ''
    }

    try {
      return await api.getCurrentUrl()
    } catch (error) {
      console.error('[WindowApi] Failed to get current URL:', error)
      return ''
    }
  }, [api])

  /**
   * Subscribe to URL change events
   *
   * @param handler - Callback when URL changes
   * @returns Unsubscribe function
   */
  const onUrlChange = useCallback(
    (handler: (url: string) => void) => {
      if (!api?.onUrlChange) {
        console.warn('[WindowApi] onUrlChange not available')
        return () => undefined
      }

      try {
        api.onUrlChange(handler)
      } catch (error) {
        console.error('[WindowApi] Failed to register URL change handler:', error)
      }

      // Return cleanup function
      return () => {
        try {
          api?.removeAllListeners?.('url-change')
        } catch (error) {
          console.error('[WindowApi] Failed to unsubscribe from URL changes:', error)
        }
      }
    },
    [api]
  )

  /**
   * Set detail view visibility
   *
   * @param visible - Whether detail view should be visible
   */
  const setDetailViewVisible = useCallback(
    async (visible: boolean): Promise<void> => {
      if (!api?.setDetailViewVisible) {
        console.warn('[WindowApi] setDetailViewVisible not available')
        return
      }

      try {
        await api.setDetailViewVisible(visible)
      } catch (error) {
        console.error('[WindowApi] Failed to set detail view visibility:', error)
      }
    },
    [api]
  )

  /**
   * Hide history view
   */
  const hideHistoryView = useCallback(async (): Promise<void> => {
    if (!api?.hideHistoryView) {
      console.warn('[WindowApi] hideHistoryView not available')
      return
    }

    try {
      await api.hideHistoryView()
    } catch (error) {
      console.error('[WindowApi] Failed to hide history view:', error)
    }
  }, [api])

  /**
   * Capture screenshot from main view
   *
   * @returns Base64 encoded screenshot data, or undefined if capture fails
   */
  const getMainViewScreenshot = useCallback(async (): Promise<string | undefined> => {
    if (!api?.getMainViewScreenshot) {
      console.warn('[WindowApi] getMainViewScreenshot not available')
      return undefined
    }

    try {
      const result = await api.getMainViewScreenshot()
      return result?.imageBase64
    } catch (error) {
      console.error('[WindowApi] Failed to capture screenshot:', error)
      return undefined
    }
  }, [api])

  return {
    getCurrentUrl,
    onUrlChange,
    setDetailViewVisible,
    hideHistoryView,
    getMainViewScreenshot,
  }
}
