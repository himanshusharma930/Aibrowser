import { DetailViewBounds } from '@/type'

/**
 * Calculate browser view bounds based on window dimensions and panel layout
 * The browser view occupies the LEFT side of the window (Browser Panel area)
 * @param windowWidth - Current window width in pixels
 * @param browserPanelPercent - Browser panel width as percentage (40-85)
 * @param windowHeight - Current window height in pixels
 * @param layoutMode - Current layout mode ('full-width' or 'split')
 * @returns DetailViewBounds object with calculated position and size for browser view
 */
export function calculateDetailViewBounds(
  windowWidth: number,
  browserPanelPercent: number,
  windowHeight?: number,
  layoutMode?: 'full-width' | 'split'
): DetailViewBounds {
  // Validate inputs
  if (windowWidth <= 0) {
    console.warn('[BrowserViewBounds] Invalid window width:', windowWidth)
    windowWidth = 1024 // Fallback to reasonable default
  }

  if (browserPanelPercent < 40 || browserPanelPercent > 85) {
    console.warn('[BrowserViewBounds] Browser panel percent out of range:', browserPanelPercent)
    browserPanelPercent = Math.min(Math.max(browserPanelPercent, 40), 85)
  }

  // In full-width mode, browser view is off-screen (hidden)
  if (layoutMode === 'full-width') {
    return {
      x: -windowWidth, // Off-screen left
      y: 0,
      width: 0,
      height: windowHeight || 900
    };
  }

  // In split mode (or default), calculate normal bounds
  // Calculate browser panel width in pixels (LEFT side)
  const browserPanelWidth = Math.floor((windowWidth * browserPanelPercent) / 100)

  // Browser view occupies the entire LEFT panel area
  // Position: top-left corner (0, 0)
  // Size: full height, calculated width based on panel percentage
  const bounds: DetailViewBounds = {
    x: 0,
    y: 0,
    width: Math.max(100, browserPanelWidth), // Minimum 100px width
    height: windowHeight || 900 // Use provided height or default
  }

  console.log('[BrowserViewBounds] Calculated bounds:', {
    windowWidth,
    windowHeight,
    browserPanelPercent,
    browserPanelWidth,
    layoutMode,
    bounds
  })

  return bounds
}

/**
 * Validate detail view bounds to ensure they're within reasonable limits
 * @param bounds - DetailViewBounds to validate
 * @param windowWidth - Current window width for validation
 * @param windowHeight - Current window height for validation
 * @returns boolean - true if bounds are valid
 */
export function validateDetailViewBounds(
  bounds: DetailViewBounds,
  windowWidth: number,
  windowHeight: number
): boolean {
  // Check for negative values
  if (bounds.x < 0 || bounds.y < 0 || bounds.width < 0 || bounds.height < 0) {
    return false
  }

  // Check minimum dimensions
  if (bounds.width < 100 || bounds.height < 100) {
    return false
  }

  // Check if bounds exceed window dimensions
  if (bounds.x + bounds.width > windowWidth || bounds.y + bounds.height > windowHeight) {
    return false
  }

  return true
}

/**
 * Get responsive detail view configuration based on screen size
 * @param windowWidth - Current window width
 * @returns Configuration object with responsive settings
 */
export function getResponsiveDetailViewConfig(windowWidth: number) {
  if (windowWidth >= 1024) {
    // Desktop: horizontal layout
    return {
      sidebarStartY: 264,
      detailViewHeight: 560,
      isHorizontalLayout: true
    }
  } else if (windowWidth >= 640) {
    // Tablet: vertical layout
    return {
      sidebarStartY: 200,
      detailViewHeight: 400,
      isHorizontalLayout: false
    }
  } else {
    // Mobile: compact layout
    return {
      sidebarStartY: 150,
      detailViewHeight: 300,
      isHorizontalLayout: false
    }
  }
}