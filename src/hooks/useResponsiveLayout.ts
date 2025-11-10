import { useState, useEffect, useCallback, useMemo } from 'react';

export interface ResponsiveBreakpoint {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
  isXL: boolean;
  width: number;
  height: number;
}

export interface ResponsiveLayoutConfig {
  browserPanelPercent: number;
  aiSidebarPercent: number;
  minBrowserWidth: number;
  minSidebarWidth: number;
}

// Helper function to calculate breakpoint outside the hook
const calculateBreakpointHelper = (width: number, height: number): ResponsiveBreakpoint => {
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024 && width < 1440,
    isLarge: width >= 1440 && width < 1920,
    isXL: width >= 1920,
    width,
    height
  };
};

/**
 * Custom hook for managing responsive layout based on viewport size
 * Provides breakpoint detection and layout configuration
 */
export function useResponsiveLayout() {
  const [breakpoint, setBreakpoint] = useState<ResponsiveBreakpoint>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isLarge: false,
        isXL: false,
        width: 1024,
        height: 768
      };
    }

    return calculateBreakpointHelper(window.innerWidth, window.innerHeight);
  });

  const calculateBreakpoint = useCallback((width: number, height: number): ResponsiveBreakpoint => {
    return calculateBreakpointHelper(width, height);
  }, []);

  const getLayoutConfig = useCallback((bp: ResponsiveBreakpoint): ResponsiveLayoutConfig => {
    // Mobile and tablet: more balanced split
    if (bp.isMobile || bp.isTablet) {
      return {
        browserPanelPercent: 60,
        aiSidebarPercent: 40,
        minBrowserWidth: 300,
        minSidebarWidth: 300
      };
    }

    // Desktop and larger: standard split
    return {
      browserPanelPercent: 75,
      aiSidebarPercent: 25,
      minBrowserWidth: 400,
      minSidebarWidth: 320
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Debounce resize events for performance
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newBreakpoint = calculateBreakpoint(window.innerWidth, window.innerHeight);
        setBreakpoint(newBreakpoint);
        console.log('[ResponsiveLayout] Breakpoint updated:', {
          width: newBreakpoint.width,
          height: newBreakpoint.height,
          type: newBreakpoint.isMobile ? 'mobile' :
                newBreakpoint.isTablet ? 'tablet' :
                newBreakpoint.isDesktop ? 'desktop' :
                newBreakpoint.isLarge ? 'large' : 'xl'
        });
      }, 150); // 150ms debounce
    };

    window.addEventListener('resize', handleResize);
    
    // Initial calculation
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateBreakpoint]);

  const layoutConfig = useMemo(() => getLayoutConfig(breakpoint), [breakpoint, getLayoutConfig]);

  return {
    breakpoint,
    layoutConfig
  };
}
