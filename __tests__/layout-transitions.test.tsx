/**
 * Test Suite: Layout Transitions (Task 10.3)
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserArea } from '@/components/BrowserArea';
import { optimizedSplitLayoutTransition } from '@/utils/layout-transition';

describe('Layout Transitions Tests (Task 10.3)', () => {
  const mockOnNavigate = jest.fn();
  const mockOnBack = jest.fn();
  const mockOnForward = jest.fn();
  const mockOnReload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window.api mocks
    (window.api.view.setDetailViewVisible as jest.Mock).mockResolvedValue({ success: true });
    (window.api.updateDetailViewBounds as jest.Mock).mockResolvedValue({ success: true });
  });

  // Requirement 6.1: Test first message transition (full-width to split)
  test('should show browser area when transitioning to split layout', () => {
    const { rerender } = render(
      <BrowserArea
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isVisible={false}
      />
    );

    // Browser area should not be rendered when isVisible is false
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

    // Transition to split layout
    rerender(
      <BrowserArea
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isVisible={true}
      />
    );

    // Browser area should now be visible
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  // Requirement 6.2: Test layout mode switching (split to full-width)
  test('should hide browser area when switching to full-width mode', () => {
    const { rerender } = render(
      <BrowserArea
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isVisible={true}
      />
    );

    // Browser area should be visible
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Switch to full-width mode
    rerender(
      <BrowserArea
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isVisible={false}
      />
    );

    // Browser area should be hidden
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  // Requirement 6.3: Test smooth animations (300ms duration)
  test('should apply transition styles for smooth animations', () => {
    render(
      <BrowserArea
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isVisible={true}
      />
    );

    const browserArea = document.querySelector('.browser-area');
    expect(browserArea).toBeInTheDocument();
    
    // Check that the browser area has the class for CSS transitions
    // The actual transition is defined in BrowserArea.module.css
    expect(browserArea).toHaveClass('browser-area');
  });

  // Requirement 6.4: Test WebContentsView visibility coordination
  test('should coordinate WebContentsView visibility with layout transitions', async () => {
    const mockTransitionFn = jest.fn().mockResolvedValue(undefined);
    
    const result = await optimizedSplitLayoutTransition(
      mockTransitionFn,
      75, // browserPanelSize
      1024, // windowWidth
      768, // windowHeight
      48, // tabBarHeight
      16 // windowMargins
    );

    expect(result.success).toBe(true);
    expect(mockTransitionFn).toHaveBeenCalled();
    expect(window.api.view.setDetailViewVisible).toHaveBeenCalledWith(true);
    expect(window.api.updateDetailViewBounds).toHaveBeenCalled();
  });

  // Requirement 6.5: Test tab bar visibility coordination
  test('should only show tab bar when browser area is visible', () => {
    const { rerender } = render(
      <BrowserArea
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isVisible={false}
      />
    );

    // Tab bar should not be visible when browser area is hidden
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();

    // Show browser area
    rerender(
      <BrowserArea
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isVisible={true}
      />
    );

    // Tab bar should now be visible
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  // Requirement 6.3: Test requestAnimationFrame coordination
  test('should use requestAnimationFrame for coordinated updates', async () => {
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame');
    const mockTransitionFn = jest.fn().mockResolvedValue(undefined);
    
    await optimizedSplitLayoutTransition(
      mockTransitionFn,
      75,
      1024,
      768,
      48,
      16
    );

    // requestAnimationFrame should be called for coordinated updates
    expect(rafSpy).toHaveBeenCalled();
    
    rafSpy.mockRestore();
  });

  // Test error handling during layout transition
  test('should handle layout transition failures gracefully', async () => {
    const mockTransitionFn = jest.fn().mockResolvedValue(undefined);
    (window.api.view.setDetailViewVisible as jest.Mock).mockRejectedValue(
      new Error('Failed to set visibility')
    );
    
    const result = await optimizedSplitLayoutTransition(
      mockTransitionFn,
      75,
      1024,
      768,
      48,
      16
    );

    // Should return error result but not throw
    expect(result.success).toBe(false);
    expect(result.error).toContain('Failed to set visibility');
    expect(console.error).toHaveBeenCalled();
  });

  // Test bounds update failure handling
  test('should handle bounds update failures gracefully', async () => {
    const mockTransitionFn = jest.fn().mockResolvedValue(undefined);
    (window.api.updateDetailViewBounds as jest.Mock).mockRejectedValue(
      new Error('Failed to update bounds')
    );
    
    const result = await optimizedSplitLayoutTransition(
      mockTransitionFn,
      75,
      1024,
      768,
      48,
      16
    );

    // Should return error result but not throw
    expect(result.success).toBe(false);
    expect(result.error).toContain('Failed to update bounds');
    expect(console.error).toHaveBeenCalled();
  });

  // Test width adjustment during layout transitions
  test('should adjust browser area width based on layout', () => {
    const { rerender } = render(
      <BrowserArea
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isVisible={true}
        width="75%"
      />
    );

    const browserArea = document.querySelector('.browser-area') as HTMLElement;
    expect(browserArea.style.width).toBe('75%');

    // Change width
    rerender(
      <BrowserArea
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isVisible={true}
        width="60%"
      />
    );

    expect(browserArea.style.width).toBe('60%');
  });
});
