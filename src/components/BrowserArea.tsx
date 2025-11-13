/**
 * BrowserArea Component
 *
 * Combines the tab bar and browser panel with rounded container
 * Manages the visual layout for the browser side of the split view
 */

import React from 'react';
import TabBar from './TabBar';
import RoundedContainer from './RoundedContainer';
import styles from './BrowserArea.module.css';

export interface BrowserAreaProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  isLoading?: boolean;
  isVisible: boolean;
  width?: string; // Width as percentage or pixels
}

export const BrowserArea: React.FC<BrowserAreaProps> = ({
  currentUrl,
  onNavigate,
  onBack,
  onForward,
  onReload,
  canGoBack = false,
  canGoForward = false,
  isLoading = false,
  isVisible,
  width = '75%'
}) => {
  // Requirement 6.5: Show browser area only when isVisible is true (layoutMode === 'split')
  // This ensures tab bar and browser area are hidden in full-width mode
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.browserArea} browser-area`}
      style={{ width }}
      role="region"
      aria-label="Browser automation area"
    >
      <RoundedContainer className={styles.browserContainer}>
        {/* Requirement 6.5: Tab bar is only rendered when browser area is visible (split mode) */}
        <TabBar
          currentUrl={currentUrl}
          onNavigate={onNavigate}
          onBack={onBack}
          onForward={onForward}
          onReload={onReload}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          isLoading={isLoading}
        />
        {/* WebContentsView will be positioned here by Electron */}
        {/* Requirement 6.5: Browser content area is only rendered when browser area is visible (split mode) */}
        <div
          className={styles.browserContent}
          role="main"
          aria-label="Browser content"
        >
          {/* This div serves as a visual placeholder */}
          {/* The actual browser content is rendered by Electron's WebContentsView */}
          {/* WebContentsView visibility is coordinated via IPC in main.tsx */}
        </div>
      </RoundedContainer>
    </div>
  );
};

export default BrowserArea;
