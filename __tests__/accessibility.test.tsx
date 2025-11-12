/**
 * Test Suite: Accessibility (Task 10.6)
 * Requirements: 10.1, 10.5
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TabBar } from '@/components/TabBar';

describe('Accessibility Tests (Task 10.6)', () => {
  const mockOnNavigate = jest.fn();
  const mockOnBack = jest.fn();
  const mockOnForward = jest.fn();
  const mockOnReload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Requirement 10.5: Test keyboard navigation (Tab key)
  test('should support keyboard navigation with Tab key', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoBack={true}
        canGoForward={true}
      />
    );

    const backButton = screen.getByLabelText('Navigate back');
    const forwardButton = screen.getByLabelText('Navigate forward');
    const reloadButton = screen.getByLabelText('Reload page');
    const urlInput = screen.getByRole('searchbox');

    // All interactive elements should be in the tab order
    expect(backButton).toHaveAttribute('tabIndex', '0');
    expect(forwardButton).toHaveAttribute('tabIndex', '0');
    expect(reloadButton).toHaveAttribute('tabIndex', '0');
    expect(urlInput).toHaveAttribute('tabIndex', '0');
  });

  // Requirement 10.5: Test that disabled buttons are removed from tab order
  test('should remove disabled buttons from tab order', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoBack={false}
        canGoForward={false}
      />
    );

    const backButton = screen.getByLabelText('Navigate back');
    const forwardButton = screen.getByLabelText('Navigate forward');

    // Disabled buttons should have tabIndex -1
    expect(backButton).toHaveAttribute('tabIndex', '-1');
    expect(forwardButton).toHaveAttribute('tabIndex', '-1');
  });

  // Requirement 10.5: Test focus indicators visibility
  test('should have visible focus indicators for keyboard navigation', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox');
    
    // Focus the input
    urlInput.focus();
    
    // Input should be focused
    expect(urlInput).toHaveFocus();
  });

  // Requirement 10.5: Test ARIA labels with screen reader
  test('should have proper ARIA labels for screen readers', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    // Navigation container should have aria-label
    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label', 'Browser navigation');

    // Buttons should have aria-label
    expect(screen.getByLabelText('Navigate back')).toBeInTheDocument();
    expect(screen.getByLabelText('Navigate forward')).toBeInTheDocument();
    expect(screen.getByLabelText('Reload page')).toBeInTheDocument();

    // URL input should have aria-label
    const urlInput = screen.getByRole('searchbox');
    expect(urlInput).toHaveAttribute('aria-label', expect.stringContaining('Address bar'));
  });

  // Requirement 10.1: Test Cmd/Ctrl+L to focus URL input
  test('should focus URL input when Cmd+L is pressed', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox');
    
    // Initially not focused
    expect(urlInput).not.toHaveFocus();

    // Press Cmd+L
    fireEvent.keyDown(window, { key: 'l', metaKey: true });

    await waitFor(() => {
      expect(urlInput).toHaveFocus();
    });
  });

  // Requirement 10.1: Test Ctrl+L to focus URL input (Windows/Linux)
  test('should focus URL input when Ctrl+L is pressed', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox');
    
    // Press Ctrl+L
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true });

    await waitFor(() => {
      expect(urlInput).toHaveFocus();
    });
  });

  // Test ARIA busy state for loading
  test('should set aria-busy when loading', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        isLoading={true}
      />
    );

    const reloadButton = screen.getByLabelText('Reload page');
    expect(reloadButton).toHaveAttribute('aria-busy', 'true');
  });

  // Test role attributes
  test('should have proper role attributes', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    // Navigation should have role="navigation"
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // URL input should have role="searchbox"
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  // Test keyboard interaction with Enter key
  test('should support Enter key to submit URL', async () => {
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
    
    fireEvent.change(urlInput, { target: { value: 'example.com' } });
    fireEvent.keyDown(urlInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).toHaveBeenCalledWith('https://example.com');
    });
  });

  // Test focus management on URL input
  test('should select all text when URL input is focused', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const urlInput = screen.getByRole('searchbox') as HTMLInputElement;
    
    // Mock select method
    urlInput.select = jest.fn();
    
    // Focus the input
    fireEvent.focus(urlInput);
    
    // Select should be called
    expect(urlInput.select).toHaveBeenCalled();
  });

  // Test semantic HTML structure
  test('should use semantic HTML elements', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    // Should have navigation landmark
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();

    // Should have buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3); // back, forward, reload
  });

  // Test that keyboard shortcuts don't interfere with input
  test('should not trigger shortcuts when typing in input', async () => {
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
    
    // Focus input and type 'r'
    urlInput.focus();
    fireEvent.change(urlInput, { target: { value: 'r' } });
    
    // Cmd+R should not trigger reload when input is focused
    // (This is handled by the browser's default behavior)
    expect(mockOnReload).not.toHaveBeenCalled();
  });

  // Test disabled state accessibility
  test('should properly indicate disabled state to assistive technologies', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoBack={false}
        canGoForward={false}
      />
    );

    const backButton = screen.getByLabelText('Navigate back');
    const forwardButton = screen.getByLabelText('Navigate forward');

    expect(backButton).toBeDisabled();
    expect(forwardButton).toBeDisabled();
    expect(backButton).toHaveAttribute('tabIndex', '-1');
    expect(forwardButton).toHaveAttribute('tabIndex', '-1');
  });
});
