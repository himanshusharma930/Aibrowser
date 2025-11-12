/**
 * Layout Transition Utilities
 * 
 * Optimizes layout transitions by:
 * - Using requestAnimationFrame for coordinated updates
 * - Batching DOM reads and writes to avoid layout thrashing
 * - Coordinating React state updates with Electron WebContentsView updates
 * 
 * Requirements: 6.3, 6.4, 8.2
 */

import { DetailViewBounds } from '@/type';
import { calculateDetailViewBounds, validateBounds } from './detail-view-bounds';

/**
 * Transition to split layout with optimized performance
 * 
 * Enhanced to show browser area with tab bar, update WebContentsView visibility,
 * calculate and apply new bounds with tab bar offset, and add smooth transition animation
 * 
 * Steps:
 * 1. Update React state (triggers re-render to show browser area with tab bar)
 * 2. Wait for next frame (ensures DOM is updated with smooth animation)
 * 3. Update WebContentsView visibility (show browser view)
 * 4. Calculate and apply new bounds with tab bar offset
 * 
 * @param transitionToSplitLayout - Function to update React layout state
 * @param browserPanelSize - Browser panel size percentage
 * @param windowWidth - Current window width
 * @param windowHeight - Current window height
 * @param tabBarHeight - Tab bar height in pixels (default 48)
 * @param windowMargins - Window margins in pixels (default 16)
 * @returns Promise that resolves when transition is complete
 * 
 * Requirements: 6.1, 6.3
 */
export async function optimizedSplitLayoutTransition(
  transitionToSplitLayout: () => void,
  browserPanelSize: number,
  windowWidth: number,
  windowHeight: number,
  tabBarHeight: number = 48,
  windowMargins: number = 16
): Promise<{ success: boolean; error?: string }> {
  try {
    // Step 1: Update React state first
    // This triggers a re-render and shows the browser area with tab bar
    // The browser area component will render with smooth CSS transition (300ms ease-in-out)
    transitionToSplitLayout();
    console.log('[LayoutTransition] React state updated to split mode - browser area with tab bar will appear');

    // Step 2: Wait for next animation frame
    // This ensures React has finished rendering and the DOM is updated
    // The browser area is now visible with its tab bar component
    // Avoids layout thrashing by batching DOM reads/writes
    await new Promise<void>(resolve => {
      requestAnimationFrame(() => {
        console.log('[LayoutTransition] Animation frame - DOM updated, browser area visible');
        resolve();
      });
    });

    // Step 3: Show browser view (Electron WebContentsView)
    // This happens after React DOM is updated to ensure smooth transition
    // The WebContentsView will appear below the tab bar
    if (window.api?.view?.setDetailViewVisible) {
      try {
        await window.api.view.setDetailViewVisible(true);
        console.log('[LayoutTransition] WebContentsView visibility set to true');
      } catch (viewError) {
        console.error('[LayoutTransition] Failed to show WebContentsView:', viewError);
        // Non-blocking - layout mode changed, but view visibility failed
        return { success: false, error: 'Failed to show WebContentsView' };
      }
    }

    // Step 4: Calculate and apply new bounds with tab bar offset
    // This positions the WebContentsView correctly below the tab bar
    // Bounds account for: window margins (16px) + tab bar height (48px)
    try {
      const bounds = calculateDetailViewBounds(
        windowWidth,
        browserPanelSize,
        windowHeight,
        'split',
        tabBarHeight,
        windowMargins
      );

      // Validate bounds before applying
      const validatedBounds = validateBounds(bounds, windowWidth, windowHeight);

      if (window.api?.view?.updateDetailViewBounds) {
        await window.api.view.updateDetailViewBounds(validatedBounds);
        console.log('[LayoutTransition] WebContentsView bounds updated with tab bar offset:', validatedBounds);
      }
    } catch (boundsError) {
      console.error('[LayoutTransition] Failed to update bounds:', boundsError);
      // Non-blocking - layout transition succeeded, bounds update failed
      return { success: false, error: 'Failed to update bounds' };
    }

    console.log('[LayoutTransition] Split layout transition complete - browser area with tab bar visible');
    return { success: true };
  } catch (error) {
    console.error('[LayoutTransition] Unexpected error during transition:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Transition to full-width layout with optimized performance
 * 
 * Enhanced to hide browser area and tab bar, expand AI chat panel to full width,
 * hide WebContentsView, and maintain smooth transition
 * 
 * Steps:
 * 1. Hide WebContentsView first
 * 2. Wait for next frame
 * 3. Update React state (hides browser area, expands AI chat panel with smooth transition)
 * 
 * @param resetToFullWidth - Function to update React layout state
 * @returns Promise that resolves when transition is complete
 * 
 * Requirements: 6.2, 6.3
 */
export async function optimizedFullWidthLayoutTransition(
  resetToFullWidth: () => void
): Promise<{ success: boolean; error?: string }> {
  try {
    // Step 1: Hide WebContentsView first
    // This removes the browser content from view
    if (window.api?.view?.setDetailViewVisible) {
      try {
        await window.api.view.setDetailViewVisible(false);
        console.log('[LayoutTransition] WebContentsView hidden');
      } catch (viewError) {
        console.error('[LayoutTransition] Failed to hide WebContentsView:', viewError);
        // Continue anyway - we can still update React state
      }
    }

    // Step 2: Wait for next animation frame
    // Ensures smooth coordination between Electron and React updates
    await new Promise<void>(resolve => {
      requestAnimationFrame(() => {
        console.log('[LayoutTransition] Animation frame - preparing for full-width');
        resolve();
      });
    });

    // Step 3: Update React state
    // This hides the browser area (including tab bar) and expands AI chat panel to full width
    // The AI chat panel will smoothly transition to 100% width (300ms ease-in-out)
    resetToFullWidth();
    console.log('[LayoutTransition] React state updated to full-width mode - browser area and tab bar hidden, AI panel expanded');

    console.log('[LayoutTransition] Full-width layout transition complete - AI chat panel at full width');
    return { success: true };
  } catch (error) {
    console.error('[LayoutTransition] Unexpected error during transition:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Update WebContentsView bounds with optimized batching
 * 
 * Uses requestAnimationFrame to batch bounds updates and avoid layout thrashing
 * 
 * @param bounds - New bounds to apply
 * @returns Promise that resolves when bounds are updated
 */
export async function optimizedBoundsUpdate(
  bounds: DetailViewBounds
): Promise<{ success: boolean; error?: string }> {
  try {
    // Wait for next animation frame to batch with other layout operations
    await new Promise<void>(resolve => {
      requestAnimationFrame(() => {
        resolve();
      });
    });

    // Validate bounds before applying
    const validatedBounds = validateBounds(
      bounds,
      window.innerWidth,
      window.innerHeight
    );

    if (window.api?.updateDetailViewBounds) {
      await window.api.updateDetailViewBounds(validatedBounds);
      console.log('[BoundsUpdate] Bounds updated successfully');
      return { success: true };
    }

    return { success: false, error: 'updateDetailViewBounds API not available' };
  } catch (error) {
    console.error('[BoundsUpdate] Failed to update bounds:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Debounced bounds update factory
 * Creates a debounced version of bounds update for resize operations
 * 
 * @param delay - Debounce delay in milliseconds (default 16ms for 60fps)
 * @returns Debounced bounds update function
 */
export function createDebouncedBoundsUpdate(delay: number = 16) {
  let timeoutId: NodeJS.Timeout | null = null;
  let pendingBounds: DetailViewBounds | null = null;

  return (bounds: DetailViewBounds): Promise<{ success: boolean; error?: string }> => {
    // Store the latest bounds
    pendingBounds = bounds;

    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Return a promise that resolves when the debounced update completes
    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        if (pendingBounds) {
          const result = await optimizedBoundsUpdate(pendingBounds);
          pendingBounds = null;
          resolve(result);
        } else {
          resolve({ success: false, error: 'No pending bounds to update' });
        }
      }, delay);
    });
  };
}
