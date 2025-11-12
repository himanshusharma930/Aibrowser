/**
 * Test Suite: URL Navigation (Task 10.1)
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TabBar } from '@/components/TabBar';

describe('URL Navigation Tests (Task 10.1)', () => {
  const mockOnNavigate = jest.fn();
  const mockOnBack = jest.fn();
  const mockOnForward = jest.fn();
  const mockOnReload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Requirement 3.2: Test direct URL navigation (https://example.com)
  test('should navigate to direct URL with protocol', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).toHaveBeenCalledWith('https://example.com');
    });
  });

  // Requirement 3.3: Test URL without protocol (example.com)
  test('should add https:// protocol to URL without protocol', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'example.com' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).toHaveBeenCalledWith('https://example.com');
    });
  });

  // Requirement 3.4: Test search queries (how to code)
  test('should convert search query to Google search URL', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'how to code' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).toHaveBeenCalledWith(
        'https://www.google.com/search?q=how%20to%20code'
      );
    });
  });

  // Requirement 3.4: Test special characters in search queries
  test('should properly encode special characters in search queries', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test & query?' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).toHaveBeenCalledWith(
        'https://www.google.com/search?q=test%20%26%20query%3F'
      );
    });
  });

  // Requirement 3.1: Test empty input handling
  test('should ignore empty input when Enter is pressed', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).not.toHaveBeenCalled();
    });
  });

  // Requirement 3.1: Test whitespace-only input handling
  test('should ignore whitespace-only input', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).not.toHaveBeenCalled();
    });
  });

  // Requirement 3.5: Test current URL display
  test('should display current URL when browser navigates', () => {
    const { rerender } = render(
      <TabBar
        currentUrl="https://example.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('https://example.com');

    // Update URL
    rerender(
      <TabBar
        currentUrl="https://newsite.com"
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    expect(input.value).toBe('https://newsite.com');
  });

  // Security test: Block javascript: protocol
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

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'javascript:alert("xss")' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).not.toHaveBeenCalled();
    });
  });

  // Security test: Block data: protocol (except images)
  test('should block data: protocol URLs', async () => {
    render(
      <TabBar
        currentUrl=""
        onNavigate={mockOnNavigate}
        onBack={mockOnBack}
        onForward={mockOnForward}
        onReload={mockOnReload}
      />
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'data:text/html,<script>alert("xss")</script>' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnNavigate).not.toHaveBeenCalled();
    });
  });
});
