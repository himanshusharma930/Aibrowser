# Implementation Plan

- [x] 1. Rebrand application from "DeepFundAI" to "Manus"
  - Update Header component branding text from "DeepFundAI" to "Manus"
  - Update AISidebarHeader component logo from "x.GURI AI" to "Manus"
  - Update greeting text in home page to reference "Manus"
  - Update all translation files (en-US, zh-CN) to replace "DeepFundAI" with "Manus"
  - Verify visual consistency of branding across all pages
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 2. Create layout state management infrastructure
  - Create new hook `src/hooks/useLayoutMode.ts` with layout state logic
  - Define TypeScript types for LayoutMode and LayoutState in `src/type.d.ts`
  - Implement session storage tracking for first message flag
  - Add layout transition functions (transitionToSplitLayout, resetToFullWidth)
  - _Requirements: 2.5, 3.1, 7.1, 7.2_

- [x] 3. Implement full-width initial layout for home page
  - Modify `src/pages/home.tsx` to use full-width layout (100% width)
  - Remove left-side empty space div (75% browser area placeholder)
  - Center greeting message and input area with max-width constraint
  - Update CSS classes for centered content layout
  - Ensure browser view remains hidden on home page
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4. Implement layout transition logic in main page
- [x] 4.1 Add layout mode state to main page component
  - Import and use `useLayoutMode` hook in `src/pages/main.tsx`
  - Initialize layout mode based on session storage
  - Add state variable for tracking browser view visibility
  - _Requirements: 3.1, 4.1, 7.3_

- [x] 4.2 Implement first message detection and transition
  - Modify `sendMessage` function to detect first message event
  - Call `transitionToSplitLayout` on first message
  - Trigger browser view visibility via `window.api.setDetailViewVisible(true)`
  - Set session storage flag after successful transition
  - Add error handling for transition failures
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 7.5_

- [x] 4.3 Update main page layout rendering
  - Add conditional rendering for browser area based on layout mode
  - Implement dynamic width calculation for AI sidebar (100% or 25%)
  - Add CSS transition for smooth width animation (300ms ease-in-out)
  - Ensure layout persists across component re-renders
  - _Requirements: 3.2, 3.3, 3.4, 4.1, 4.2_

- [x] 5. Update browser view bounds calculation
  - Enhance `calculateDetailViewBounds` function in `src/utils/detail-view-bounds.ts`
  - Add layoutMode parameter to bounds calculation
  - Return off-screen bounds when in full-width mode
  - Calculate normal bounds when in split mode
  - Update all callers to pass layoutMode parameter
  - _Requirements: 2.5, 3.5, 7.4_

- [x] 6. Implement navigation reset behavior
  - Add layout reset logic when navigating from main to home page
  - Clear session storage first message flag on home page mount
  - Ensure browser view is hidden when returning to home
  - Update header navigation click handler to trigger reset
  - _Requirements: 4.4, 7.1_

- [x] 7. Handle edge cases and special scenarios
  - Preserve split layout in scheduled task detail mode regardless of message count
  - Handle pending message from sessionStorage with automatic transition
  - Add error logging for failed layout transitions
  - Implement fallback behavior if browser view APIs fail
  - Ensure layout state is maintained during window resize
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 7.3, 7.4, 7.5_

- [x] 8. Update IPC handlers for layout coordination
  - Enhance `view-handlers.ts` to track layout state per window
  - Add validation to only update bounds when browser view is visible
  - Update window context manager to store layout mode
  - Ensure browser view visibility changes are properly synchronized
  - _Requirements: 3.5, 5.2, 7.4_

- [x] 9. Add CSS animations and transitions
  - Add transition property to AI sidebar width changes
  - Implement GPU-accelerated transforms for smooth animations
  - Add will-change hints for performance optimization
  - Ensure animations work across different screen sizes
  - _Requirements: 3.4, 6.5_

- [x] 10. Update translation files with new branding
  - Update `src/locales/en-US/header.json` with "Manus" branding
  - Update `src/locales/zh-CN/header.json` with "Manus" branding
  - Update `src/locales/en-US/home.json` greeting messages
  - Update `src/locales/zh-CN/home.json` greeting messages
  - Add any new translation keys for layout-related messages
  - _Requirements: 1.4, 6.2_

- [x] 11. Verify functionality preservation
  - Test message history persistence during layout transitions
  - Verify browser automation capabilities work in split layout
  - Test chat, history panel, and toolbox features in both layouts
  - Verify routing and state management behavior is unchanged
  - Test keyboard shortcuts and interactions in both layouts
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 12. Integration testing and validation
  - Test complete flow: launch → home → first message → split layout
  - Verify layout persists across multiple messages
  - Test navigation back to home resets layout
  - Verify scheduled task mode maintains split layout
  - Test window resize behavior in both layout modes
  - Validate browser view bounds are correct in all scenarios
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 7.1, 7.2, 7.3, 7.4, 7.5_
