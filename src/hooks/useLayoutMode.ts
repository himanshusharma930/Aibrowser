import { useState, useCallback } from 'react';
import { LayoutMode } from '@/type';

// Session storage key for first message tracking
const FIRST_MESSAGE_KEY = 'manus-first-message-sent';

/**
 * Custom hook for managing layout mode (full-width vs split)
 * Implements progressive disclosure pattern where browser view appears after first message
 */
export function useLayoutMode() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => {
    // Check session storage for first message flag
    if (typeof window !== 'undefined') {
      const hasFirstMessage = sessionStorage.getItem(FIRST_MESSAGE_KEY);
      return hasFirstMessage ? 'split' : 'full-width';
    }
    return 'full-width';
  });

  /**
   * Transition from full-width to split layout
   * Called when user sends their first message
   */
  const transitionToSplitLayout = useCallback(() => {
    setLayoutMode('split');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(FIRST_MESSAGE_KEY, 'true');
    }
    console.log('[LayoutMode] Transitioned to split layout');
  }, []);

  /**
   * Reset to full-width layout
   * Called when navigating back to home page
   */
  const resetToFullWidth = useCallback(() => {
    setLayoutMode('full-width');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(FIRST_MESSAGE_KEY);
    }
    console.log('[LayoutMode] Reset to full-width layout');
  }, []);

  /**
   * Check if this is the first message (no flag in session storage)
   */
  const isFirstMessage = useCallback(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem(FIRST_MESSAGE_KEY);
    }
    return true;
  }, []);

  return {
    layoutMode,
    transitionToSplitLayout,
    resetToFullWidth,
    isFirstMessage
  };
}

// Export the session storage key for use in other components
export { FIRST_MESSAGE_KEY };
