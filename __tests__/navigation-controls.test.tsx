/**
 * Test Suite: Navigation Controls (Task 10.2)
 * Requirements: 1.2, 9.2, 9.3, 9.4, 10.3, 10.4
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TabBar } from '@/components/TabBar';

describe('Navigation Controls Tests (Task 10.2)', () => {
  const mockOnNavigate = jest.fn();
  const mockOnBack = jest.fn();
  const mockOnForward = jest.fn();
  const mockOnReload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Requirement 1.2, 9.2: Test back button enabled state
  test('should enable back button when canGoBack is true', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoBack={true}
      />
    );

    const backButton = screen.getByLabelText('Navigate back');
    expect(backButton).not.toBeDisabled();
    
    fireEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  // Requirement 1.2, 9.2: Test back button disabled state
  test('should disable back button when canGoBack is false', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoBack={false}
      />
    );

    const backButton = screen.getByLabelText('Navigate back');
    expect(backButton).toBeDisabled();
    
    fireEvent.click(backButton);
    expect(mockOnBack).not.toHaveBeenCalled();
  });

  // Requirement 1.2, 9.3: Test forward button enabled state
  test('should enable forward button when canGoForward is true', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoForward={true}
      />
    );

    const forwardButton = screen.getByLabelText('Navigate forward');
    expect(forwardButton).not.toBeDisabled();
    
    fireEvent.click(forwardButton);
    expect(mockOnForward).toHaveBeenCalledTimes(1);
  });

  // Requirement 1.2, 9.3: Test forward button disabled state
  test('should disable forward button when canGoForward is false', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoForward={false}
      />
    );

    const forwardButton = screen.getByLabelText('Navigate forward');
    expect(forwardButton).toBeDisabled();
    
    fireEvent.click(forwardButton);
    expect(mockOnForward).not.toHaveBeenCalled();
  });

  // Requirement 1.2, 9.4: Test reload button
  test('should call onReload when reload button is clicked', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const reloadButton = screen.getByLabelText('Reload page');
    fireEvent.click(reloadButton);
    
    expect(mockOnReload).toHaveBeenCalledTimes(1);
  });

  // Requirement 9.4: Test reload button with loading indicator
  test('should show loading spinner when isLoading is true', () => {
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

  // Requirement 10.3: Test Cmd+[ keyboard shortcut for back navigation
  test('should navigate back when Cmd+[ is pressed', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoBack={true}
      />
    );

    fireEvent.keyDown(window, { key: '[', metaKey: true });

    await waitFor(() => {
      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });
  });

  // Requirement 10.3: Test Alt+Left keyboard shortcut for back navigation (Windows/Linux)
  test('should navigate back when Alt+Left is pressed', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoBack={true}
      />
    );

    fireEvent.keyDown(window, { key: 'ArrowLeft', altKey: true });

    await waitFor(() => {
      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });
  });

  // Requirement 10.4: Test Cmd+] keyboard shortcut for forward navigation
  test('should navigate forward when Cmd+] is pressed', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoForward={true}
      />
    );

    fireEvent.keyDown(window, { key: ']', metaKey: true });

    await waitFor(() => {
      expect(mockOnForward).toHaveBeenCalledTimes(1);
    });
  });

  // Requirement 10.4: Test Alt+Right keyboard shortcut for forward navigation (Windows/Linux)
  test('should navigate forward when Alt+Right is pressed', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoForward={true}
      />
    );

    fireEvent.keyDown(window, { key: 'ArrowRight', altKey: true });

    await waitFor(() => {
      expect(mockOnForward).toHaveBeenCalledTimes(1);
    });
  });

  // Requirement 10.3: Test Cmd+R keyboard shortcut for reload
  test('should reload when Cmd+R is pressed', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    fireEvent.keyDown(window, { key: 'r', metaKey: true });

    await waitFor(() => {
      expect(mockOnReload).toHaveBeenCalledTimes(1);
    });
  });

  // Requirement 10.3: Test Ctrl+R keyboard shortcut for reload (Windows/Linux)
  test('should reload when Ctrl+R is pressed', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    fireEvent.keyDown(window, { key: 'r', ctrlKey: true });

    await waitFor(() => {
      expect(mockOnReload).toHaveBeenCalledTimes(1);
    });
  });

  // Test that keyboard shortcuts don't trigger when buttons are disabled
  test('should not navigate back via keyboard when canGoBack is false', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoBack={false}
      />
    );

    fireEvent.keyDown(window, { key: '[', metaKey: true });

    await waitFor(() => {
      expect(mockOnBack).not.toHaveBeenCalled();
    });
  });

  // Test that keyboard shortcuts don't trigger when buttons are disabled
  test('should not navigate forward via keyboard when canGoForward is false', async () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
        canGoForward={false}
      />
    );

    fireEvent.keyDown(window, { key: ']', metaKey: true });

    await waitFor(() => {
      expect(mockOnForward).not.toHaveBeenCalled();
    });
  });
});
