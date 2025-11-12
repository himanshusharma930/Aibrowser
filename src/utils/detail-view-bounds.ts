import { DetailViewBounds } from '@/type'

/**
 * Calculate browser view bounds based on window dimensions and panel layout
 * The browser view occupies the LEFT side of the window (Browser Panel area)
 * @param windowWidth - Current window width in pixels
 * @param browserPanelPercent - Browser panel width as percentage (40-85)
 * @param windowHeight - Current window height in pixels
 * @param layoutMode - Current layout mode ('full-width' or 'split')
 * @param tabBarHeight - Height of the tab bar in pixels (default 48px)
 * @param windowMargins - Margins around the browser panel in pixels (default 16px)
 * @returns DetailViewBounds object with calculated position and size for browser view
 */
export function calculateDetailViewBounds(
  windowWidth: number,
  browserPanelPercent: number,
  windowHeight?: number,
  layoutMode?: 'full-width' | 'split',
  tabBarHeight: number = 48,
  windowMargins: number = 16
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

  // Browser view occupies the LEFT panel area with margins and tab bar offset
  // Position: x = left margin, y = top margin + tab bar height
  // Size: width = panel width - left and right margins, height = window height - top and bottom margins - tab bar height
  const bounds: DetailViewBounds = {
    x: windowMargins,
    y: windowMargins + tabBarHeight,
    width: Math.max(100, browserPanelWidth - (2 * windowMargins)), // Minimum 100px width
    height: Math.max(100, (windowHeight || 900) - (2 * windowMargins) - tabBarHeight) // Minimum 100px height
  }

  console.log('[BrowserViewBounds] Calculated bounds:', {
    windowWidth,
    windowHeight,
    browserPanelPercent,
    browserPanelWidth,
    layoutMode,
    tabBarHeight,
    windowMargins,
    bounds
  })

  return bounds
}

/**
 * Validate and adjust detail view bounds to ensure they're within window constraints
 * Requirements 4.1, 4.2, 8.3, 8.4, 8.5: Validate bounds before applying to WebContentsView
 * @param bounds - DetailViewBounds to validate
 * @param windowWidth - Current window width for validation
 * @param windowHeight - Current window height for validation
 * @returns Validated and adjusted DetailViewBounds
 */
export function validateBounds(
  bounds: DetailViewBounds,
  windowWidth: number,
  windowHeight: number
): DetailViewBounds {
  const originalBounds = { ...bounds };
  let adjusted = false;

  // Ensure non-negative values
  if (bounds.x < 0) {
    bounds.x = 0;
    adjusted = true;
  }
  if (bounds.y < 0) {
    bounds.y = 0;
    adjusted = true;
  }
  if (bounds.width < 0) {
    bounds.width = 100;
    adjusted = true;
  }
  if (bounds.height < 0) {
    bounds.height = 100;
    adjusted = true;
  }

  // Requirement 8.3, 8.4: Ensure minimum dimensions (100px width/height)
  if (bounds.width < 100) {
    bounds.width = 100;
    adjusted = true;
  }
  if (bounds.height < 100) {
    bounds.height = 100;
    adjusted = true;
  }

  // Requirement 8.5: Ensure bounds don't exceed window dimensions
  if (bounds.x + bounds.width > windowWidth) {
    bounds.width = Math.max(100, windowWidth - bounds.x);
    adjusted = true;
  }
  if (bounds.y + bounds.height > windowHeight) {
    bounds.height = Math.max(100, windowHeight - bounds.y);
    adjusted = true;
  }

  // Ensure bounds fit within window
  if (bounds.x >= windowWidth) {
    bounds.x = Math.max(0, windowWidth - bounds.width);
    adjusted = true;
  }
  if (bounds.y >= windowHeight) {
    bounds.y = Math.max(0, windowHeight - bounds.height);
    adjusted = true;
  }

  // Requirement 8.5: Log warnings for adjusted bounds
  if (adjusted) {
    console.warn('[BrowserViewBounds] Bounds adjusted to fit within window:', {
      original: originalBounds,
      adjusted: bounds,
      window: { width: windowWidth, height: windowHeight }
    });
  }

  return bounds;
}

/**
 * Validate detail view bounds to ensure they're within reasonable limits
 * @param bounds - DetailViewBounds to validate
 * @param windowWidth - Current window width for validation
 * @param windowHeight - Current window height for validation
 * @returns boolean - true if bounds are valid
 * @deprecated Use validateBounds instead for automatic adjustment
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