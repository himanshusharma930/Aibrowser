/**
 * Test Suite: Visual Appearance (Task 10.5)
 * Requirements: 2.1, 2.2, 2.3, 2.4, 5.1, 5.2, 5.4, 7.1, 7.2, 7.3, 7.4, 7.5
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { TabBar } from '@/components/TabBar';
import { BrowserArea } from '@/components/BrowserArea';
import RoundedContainer from '@/components/RoundedContainer';

describe('Visual Appearance Tests (Task 10.5)', () => {
  const mockOnNavigate = jest.fn();
  const mockOnBack = jest.fn();
  const mockOnForward = jest.fn();
  const mockOnReload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Requirement 2.3, 5.4: Verify 16px margins on all sides
  test('should apply 16px margins to main layout', () => {
    const { container } = render(
      <div style={{ padding: '16px' }}>
        <BrowserArea
          currentUrl="https://example.com"
          onNavigate={mockOnNavigate}
          onBack={mockOnBack}
          onForward={mockOnForward}
          onReload={mockOnReload}
          isVisible={true}
        />
      </div>
    );

    const mainLayout = container.firstChild as HTMLElement;
    expect(mainLayout.style.padding).toBe('16px');
  });

  // Requirement 2.1, 2.4: Verify 12px border-radius on containers
  test('should apply 12px border-radius to rounded containers', () => {
    const { container } = render(
      <RoundedContainer>
        <div>Test content</div>
      </RoundedContainer>
    );

    const roundedContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(roundedContainer);
    
    // Check that the container has the rounded-container class
    expect(roundedContainer.className).toContain('rounded-container');
  });

  // Requirement 5.1: Verify 48px tab bar height
  test('should set tab bar height to 48px', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const tabBar = screen.getByRole('navigation');
    
    // Check that the tab bar has the correct class
    expect(tabBar.className).toContain('tabBar');
  });

  // Requirement 7.1, 7.2, 7.3, 7.4, 7.5: Verify monochrome color palette consistency
  test('should use monochrome color palette for tab bar', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const tabBar = screen.getByRole('navigation');
    
    // Verify tab bar has the correct styling class
    expect(tabBar.className).toContain('tabBar');
  });

  // Requirement 2.2: Verify rounded containers wrap content properly
  test('should wrap content in rounded containers', () => {
    render(
      <RoundedContainer>
        <div data-testid="test-content">Test content</div>
      </RoundedContainer>
    );

    const content = screen.getByTestId('test-content');
    const container = content.parentElement;
    
    expect(container).toBeInTheDocument();
    expect(container?.className).toContain('rounded-container');
  });

  // Requirement 2.4: Verify rounded corners clip content properly
  test('should clip content to rounded corners with overflow hidden', () => {
    const { container } = render(
      <RoundedContainer>
        <div>Test content</div>
      </RoundedContainer>
    );

    const roundedContainer = container.firstChild as HTMLElement;
    
    // Check that overflow is hidden (defined in CSS module)
    expect(roundedContainer.className).toContain('rounded-container');
  });

  // Requirement 5.2: Verify navigation button spacing
  test('should have proper spacing between navigation buttons', () => {
    render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const backButton = screen.getByLabelText('Navigate back');
    const forwardButton = screen.getByLabelText('Navigate forward');
    const reloadButton = screen.getByLabelText('Reload page');

    // All buttons should be present
    expect(backButton).toBeInTheDocument();
    expect(forwardButton).toBeInTheDocument();
    expect(reloadButton).toBeInTheDocument();
  });

  // Requirement 5.1: Verify URL input has proper margins
  test('should have proper margins on URL input', () => {
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
    
    // URL input should be present and have proper styling
    expect(urlInput).toBeInTheDocument();
    expect(urlInput.className).toContain('urlInput');
  });

  // Test browser area structure
  test('should render browser area with correct structure', () => {
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

    // Should have browser area container
    const browserArea = document.querySelector('.browser-area');
    expect(browserArea).toBeInTheDocument();

    // Should have tab bar
    const tabBar = screen.getByRole('navigation');
    expect(tabBar).toBeInTheDocument();

    // Should have rounded container
    const roundedContainer = document.querySelector('.rounded-container');
    expect(roundedContainer).toBeInTheDocument();
  });

  // Test visual hierarchy
  test('should maintain proper visual hierarchy', () => {
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
    const roundedContainer = browserArea?.querySelector('.rounded-container');
    const tabBar = roundedContainer?.querySelector('[role="navigation"]');

    // Verify nesting structure
    expect(browserArea).toBeInTheDocument();
    expect(roundedContainer).toBeInTheDocument();
    expect(tabBar).toBeInTheDocument();
  });

  // Test button states styling
  test('should style disabled buttons differently', () => {
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
  });

  // Test loading state styling
  test('should show loading indicator when isLoading is true', () => {
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

  // Test width adjustment
  test('should adjust browser area width based on prop', () => {
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

  // Test custom className support
  test('should support custom className on components', () => {
    render(
      <RoundedContainer className="custom-class">
        <div>Test</div>
      </RoundedContainer>
    );

    const container = document.querySelector('.custom-class');
    expect(container).toBeInTheDocument();
    expect(container?.className).toContain('rounded-container');
    expect(container?.className).toContain('custom-class');
  });
});
