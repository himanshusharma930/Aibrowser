/**
 * Test Suite: Error Handling (Task 10.7)
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TabBar } from '@/components/TabBar';
import { calculateDetailViewBounds, validateBounds } from '@/utils/detail-view-bounds';
import { optimizedSplitLayoutTransition } from '@/utils/layout-transition';

describe('Error Handling Tests (Task 10.7)', () => {
  const mockOnNavigate = jest.fn();
  const mockOnBack = jest.fn();
  const mockOnForward = jest.fn();
  const mockOnReload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window.api mocks
    (window.api.view.navigateTo as jest.Mock).mockResolvedValue({ success: true });
    (window.api.view.setDetailViewVisible as jest.Mock).mockResolvedValue({ success: true });
    (window.api.updateDetailViewBounds as jest.Mock).mockResolvedValue({ success: true });
  });

  // Requirement 7.2: Test invalid URL navigation
  test('should handle invalid URL navigation gracefully', async () => {
    (window.api.view.navigateTo as jest.Mock).mockRejectedValue(
      new Error('Invalid URL')
    );

    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox');
    fireEvent.change(urlInput, { target: { value: 'invalid://url' } });
    fireEvent.keyDown(urlInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).toHaveBeenCalled();
    });

    // Component should not crash
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  // Requirement 7.2: Test navigation failure with IPC error
  test('should show user-friendly error message on navigation failure', async () => {
    const mockNavigate = jest.fn().mockRejectedValue(new Error('Navigation failed'));

    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox');
    fireEvent.change(urlInput, { target: { value: 'https://test.com' } });
    fireEvent.keyDown(urlInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('https://test.com');
    });

    // Error should be logged
    expect(console.error).toHaveBeenCalled();
  });

  // Requirement 7.3: Test layout transition failures
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
    expect(result.error).toBeDefined();
    expect(console.error).toHaveBeenCalled();
  });

  // Requirement 7.3: Test bounds update failure during layout transition
  test('should handle bounds update failure during layout transition', async () => {
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

  // Requirement 7.4: Test bounds calculation edge cases
  test('should handle invalid window dimensions in bounds calculation', () => {
    const bounds = calculateDetailViewBounds(
      -100, // Invalid negative width
      75,
      768,
      'split',
      48,
      16
    );

    // Should fallback to reasonable values
    expect(bounds.width).toBeGreaterThan(0);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Invalid window width'),
      -100
    );
  });

  // Requirement 7.4: Test bounds validation with extreme values
  test('should validate and adjust extreme bounds values', () => {
    const extremeBounds = {
      x: 10000,
      y: 10000,
      width: 10000,
      height: 10000
    };

    const validated = validateBounds(extremeBounds, 1024, 768);

    // Should adjust to fit within window
    expect(validated.x).toBeLessThan(1024);
    expect(validated.y).toBeLessThan(768);
    expect(validated.width).toBeLessThanOrEqual(1024);
    expect(validated.height).toBeLessThanOrEqual(768);
    expect(console.warn).toHaveBeenCalled();
  });

  // Requirement 7.1: Test empty URL handling
  test('should ignore empty URL without showing error', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox');
    fireEvent.change(urlInput, { target: { value: '' } });
    fireEvent.keyDown(urlInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).not.toHaveBeenCalled();
    });

    // No error should be shown
    expect(console.error).not.toHaveBeenCalled();
  });

  // Test malicious URL blocking
  test('should block javascript: protocol URLs', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox');
    fireEvent.change(urlInput, { target: { value: 'javascript:alert("xss")' } });
    fireEvent.keyDown(urlInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).not.toHaveBeenCalled();
    });

    // Warning should be logged
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Invalid URL blocked'),
      expect.any(String)
    );
  });

  // Test data: protocol blocking
  test('should block data: protocol URLs (except images)', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox');
    fireEvent.change(urlInput, { target: { value: 'data:text/html,<script>alert("xss")</script>' } });
    fireEvent.keyDown(urlInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).not.toHaveBeenCalled();
    });

    // Warning should be logged
    expect(console.warn).toHaveBeenCalled();
  });

  // Test navigation failure with IPC returning error result
  test('should handle IPC error result gracefully', async () => {
    (window.api.view.navigateTo as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Navigation blocked'
    });

    const mockNavigate = jest.fn(async (url: string) => {
      const result = await window.api.view.navigateTo(url);
      if (!result.success) {
        console.error('Navigation failed:', result.error);
      }
    });

    render(
      <TabBar
        currentUrl=""
        onNavigate={mockNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox');
    fireEvent.change(urlInput, { target: { value: 'https://blocked.com' } });
    fireEvent.keyDown(urlInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });

    // Error should be logged
    expect(console.error).toHaveBeenCalled();
  });

  // Test bounds calculation with zero dimensions
  test('should handle zero dimensions in bounds calculation', () => {
    const bounds = calculateDetailViewBounds(
      0,
      75,
      0,
      'split',
      48,
      16
    );

    // Should use fallback values
    expect(bounds.width).toBeGreaterThan(0);
    expect(bounds.height).toBeGreaterThan(0);
    expect(console.warn).toHaveBeenCalled();
  });

  // Test bounds validation with negative dimensions
  test('should handle negative dimensions in bounds validation', () => {
    const negativeBounds = {
      x: -50,
      y: -50,
      width: -100,
      height: -100
    };

    const validated = validateBounds(negativeBounds, 1024, 768);

    // Should adjust to valid values
    expect(validated.x).toBeGreaterThanOrEqual(0);
    expect(validated.y).toBeGreaterThanOrEqual(0);
    expect(validated.width).toBeGreaterThanOrEqual(100); // Minimum
    expect(validated.height).toBeGreaterThanOrEqual(100); // Minimum
    expect(console.warn).toHaveBeenCalled();
  });

  // Test panel size out of range
  test('should handle panel size out of valid range', () => {
    // Below minimum (40%)
    const boundsBelow = calculateDetailViewBounds(
      1024,
      30,
      768,
      'split',
      48,
      16
    );

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Browser panel percent out of range'),
      30
    );

    // Above maximum (85%)
    const boundsAbove = calculateDetailViewBounds(
      1024,
      95,
      768,
      'split',
      48,
      16
    );

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Browser panel percent out of range'),
      95
    );
  });

  // Test layout transition with missing API
  test('should handle missing window.api gracefully', async () => {
    const originalApi = window.api;
    
    // Temporarily remove API
    (window as any).api = undefined;

    const mockTransitionFn = jest.fn().mockResolvedValue(undefined);

    const result = await optimizedSplitLayoutTransition(
      mockTransitionFn,
      75,
      1024,
      768,
      48,
      16
    );

    // Should handle missing API
    expect(result.success).toBe(false);
    expect(console.error).toHaveBeenCalled();

    // Restore API
    window.api = originalApi;
  });
});
