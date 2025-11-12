/**
 * TabBar Component
 * 
 * Minimal tab bar with navigation controls and URL/search input
 * Positioned at the top of the browser area
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button, Input, Tooltip } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons';
import styles from './TabBar.module.css';

export interface TabBarProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  isLoading?: boolean;
  className?: string;
}

/**
 * Determine if input is a URL or search query
 */
function isValidUrl(input: string): boolean {
  try {
    new URL(input);
    return true;
  } catch {
    // Check for domain pattern without protocol
    const domainRegex = /^[a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+/;
    return domainRegex.test(input);
  }
}

/**
 * Sanitize URL to prevent XSS attacks
 */
function sanitizeUrl(url: string): string {
  const lower = url.toLowerCase();
  
  // Remove javascript: protocol
  if (lower.startsWith('javascript:')) {
    return '';
  }
  
  // Remove data: protocol (except for images)
  if (lower.startsWith('data:') && !lower.startsWith('data:image/')) {
    return '';
  }
  
  return url;
}

export const TabBar: React.FC<TabBarProps> = ({
  currentUrl,
  onNavigate,
  onBack,
  onForward,
  onReload,
  canGoBack = false,
  canGoForward = false,
  isLoading = false,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState(currentUrl);
  const inputRef = useRef<any>(null);

  // Update input value when currentUrl changes
  useEffect(() => {
    setInputValue(currentUrl);
  }, [currentUrl]);

  /**
   * Handle navigation from input field
   * Requirement 3.1: Ignore empty input when Enter is pressed
   */
  const handleNavigate = useCallback(() => {
    const trimmed = inputValue.trim();
    
    // Requirement 3.1: Don't navigate or show error for empty input
    if (!trimmed) {
      return; // Ignore empty input
    }
    
    // Sanitize input
    const sanitized = sanitizeUrl(trimmed);
    if (!sanitized) {
      console.warn('[TabBar] Invalid URL blocked:', trimmed);
      return;
    }
    
    let targetUrl: string;
    
    if (isValidUrl(sanitized)) {
      // Add protocol if missing
      targetUrl = sanitized.startsWith('http://') || sanitized.startsWith('https://')
        ? sanitized
        : `https://${sanitized}`;
    } else {
      // Treat as search query
      targetUrl = `https://www.google.com/search?q=${encodeURIComponent(sanitized)}`;
    }
    
    onNavigate(targetUrl);
  }, [inputValue, onNavigate]);

  /**
   * Handle input change
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  /**
   * Handle key down (replaces deprecated onKeyPress)
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  }, [handleNavigate]);

  /**
   * Handle input focus - select all text
   */
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  /**
   * Focus input field (for keyboard shortcut)
   */
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Cmd+L (Mac) or Ctrl+L (Windows/Linux) - Focus URL bar
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        focusInput();
      }
      
      // Cmd+R (Mac) or Ctrl+R (Windows/Linux) - Reload page
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault();
        onReload();
      }
      
      // Cmd+[ (Mac) or Alt+Left (Windows/Linux) - Navigate back
      if ((e.metaKey && e.key === '[') || (e.altKey && e.key === 'ArrowLeft')) {
        e.preventDefault();
        if (canGoBack) {
          onBack();
        }
      }
      
      // Cmd+] (Mac) or Alt+Right (Windows/Linux) - Navigate forward
      if ((e.metaKey && e.key === ']') || (e.altKey && e.key === 'ArrowRight')) {
        e.preventDefault();
        if (canGoForward) {
          onForward();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [focusInput, onReload, onBack, onForward, canGoBack, canGoForward]);

  return (
    <div className={`${styles.tabBar} ${className}`} role="navigation" aria-label="Browser navigation">
      {/* Left section: Navigation controls */}
      <div className={styles.leftSection}>
        <Tooltip title="Back (Cmd+[)" mouseEnterDelay={0.5}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            disabled={!canGoBack}
            className={styles.navButton}
            aria-label="Navigate back"
            tabIndex={canGoBack ? 0 : -1}
          />
        </Tooltip>

        <Tooltip title="Forward (Cmd+])" mouseEnterDelay={0.5}>
          <Button
            type="text"
            icon={<ArrowRightOutlined />}
            onClick={onForward}
            disabled={!canGoForward}
            className={styles.navButton}
            aria-label="Navigate forward"
            tabIndex={canGoForward ? 0 : -1}
          />
        </Tooltip>

        <Tooltip title="Reload (Cmd+R)" mouseEnterDelay={0.5}>
          <Button
            type="text"
            icon={<ReloadOutlined spin={isLoading} />}
            onClick={onReload}
            className={styles.navButton}
            aria-label="Reload page"
            aria-busy={isLoading}
            tabIndex={0}
          />
        </Tooltip>
      </div>

      {/* Center section: URL/Search input */}
      <div className={styles.centerSection}>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onPressEnter={handleNavigate}
          placeholder="Search or type URL..."
          className={styles.urlInput}
          aria-label="Address bar. Press Cmd+L to focus"
          role="searchbox"
          tabIndex={0}
        />
      </div>
    </div>
  );
};

export default TabBar;
