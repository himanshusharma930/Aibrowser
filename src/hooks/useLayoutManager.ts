import { useState, useEffect, useMemo, useCallback } from 'react'
import { PanelLayoutState, DetailViewBounds } from '@/type'
import { loadPersistedLayout, createDebouncedPersist, clampPanelSize } from '@/utils/panel-layout-storage'
import { calculateDetailViewBounds, validateBounds } from '@/utils/detail-view-bounds'
import { createDebouncedBoundsUpdate } from '@/utils/layout-transition'

/**
 * Custom hook for managing layout state and WebContentsView coordination
 * Handles panel resizing, bounds calculation, and layout persistence
 */
export const useLayoutManager = (layoutMode: 'full-width' | 'split') => {
    // Panel layout state management
    const [layout, setLayout] = useState<PanelLayoutState>(() => loadPersistedLayout())
    const debouncedPersist = useMemo(() => createDebouncedPersist(500), [])

    // Requirement 8.2: Optimized debounced bounds update using requestAnimationFrame
    // Creates a debounced version that batches DOM operations to avoid layout thrashing
    const debouncedUpdateBounds = useMemo(() => createDebouncedBoundsUpdate(16), [])

    // Panel resize handler with constraint validation and WebContentsView coordination
    // Requirement 8.2: Use optimized bounds update with requestAnimationFrame
    const handleResize = useCallback(async (sizes: number[]) => {
        try {
            const [browserSize, sidebarSize] = sizes

            // Validate constraints
            const clampedBrowserSize = clampPanelSize(browserSize, 40, 85)
            const clampedSidebarSize = 100 - clampedBrowserSize

            if (Math.abs(browserSize - clampedBrowserSize) > 0.1) {
                console.warn('[PanelResize] Browser panel out of range, clamped:', browserSize, '→', clampedBrowserSize)
                return // Don't update if out of range
            }

            // Update layout state (React state update)
            const newLayout: PanelLayoutState = {
                browserPanelSize: clampedBrowserSize,
                aiSidebarSize: clampedSidebarSize,
                isCollapsed: clampedSidebarSize < 15,
                lastModified: Date.now()
            }

            setLayout(newLayout)

            // Calculate and update browser view bounds for WebContentsView coordination
            // Uses requestAnimationFrame batching to avoid layout thrashing
            try {
                const bounds = calculateDetailViewBounds(
                    window.innerWidth,
                    clampedBrowserSize,
                    window.innerHeight,
                    layoutMode,
                    48, // tabBarHeight
                    16  // windowMargins
                )
                // Debounced update with requestAnimationFrame batching
                await debouncedUpdateBounds(bounds)
            } catch (boundsError) {
                console.error('[PanelResize] Error calculating detail view bounds:', boundsError)
                // Non-blocking - panel resize succeeded, bounds update failed
            }

            // Debounced persistence to localStorage
            try {
                debouncedPersist(newLayout)
            } catch (persistError) {
                console.error('[PanelResize] Error persisting layout:', persistError)
                // Non-blocking - layout updated in memory, persistence failed
            }
        } catch (error) {
            console.error('[PanelResize] Unexpected error during panel resize:', error)
            // Keep current layout if resize fails completely
        }
    }, [debouncedPersist, debouncedUpdateBounds, layoutMode])

    // Update browser view bounds when layout mode changes
    // Requirement 8.2: Use optimized bounds update with requestAnimationFrame
    useEffect(() => {
        // Only update bounds when in split mode (browser area is visible)
        if (layoutMode !== 'split') {
            return
        }

        // Requirement 7.3: Handle layout transition failures gracefully
        const updateBounds = async () => {
            try {
                const bounds = calculateDetailViewBounds(
                    window.innerWidth,
                    layout.browserPanelSize,
                    window.innerHeight,
                    layoutMode,
                    48, // tabBarHeight
                    16  // windowMargins
                )
                // Use debounced update with requestAnimationFrame for smooth transitions
                await debouncedUpdateBounds(bounds)
                console.log('[LayoutMode] Browser view bounds updated for layout mode:', layoutMode)
            } catch (error) {
                // Requirement 7.3: Log error, keep current layout
                console.error('[LayoutMode] Failed to update browser view bounds:', error)
                // Don't show user notification - this is a background operation
                // Browser view will keep its current bounds until next successful update
            }
        }

        updateBounds()
    }, [layoutMode, layout.browserPanelSize, debouncedUpdateBounds]) // Re-run when layout mode or browser panel size changes

    // Handle window resize to update WebContentsView bounds
    // Requirement 8.2: Use optimized bounds update with requestAnimationFrame
    useEffect(() => {
        const handleWindowResize = async () => {
            try {
                const bounds = calculateDetailViewBounds(
                    window.innerWidth,
                    layout.browserPanelSize,
                    window.innerHeight,
                    layoutMode,
                    48, // tabBarHeight
                    16  // windowMargins
                )
                // Debounced update with requestAnimationFrame batching
                await debouncedUpdateBounds(bounds)
            } catch (error) {
                console.error('[WindowResize] Error calculating detail view bounds:', error)
            }
        }

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [layout.browserPanelSize, layoutMode, debouncedUpdateBounds])

    return {
        layout,
        setLayout,
        handleResize
    }
}