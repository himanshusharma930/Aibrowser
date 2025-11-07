# Browser View Migration Guide

**Date**: November 7, 2025  
**Change**: Browser view repositioned from right sidebar to LEFT-side (75% width)  
**Update**: Visibility behavior reverted to hidden by default (preserves original UX)

## Overview

The browser view (internally called `detailView`) has been fundamentally repositioned as part of the NO HEADER layout transformation. This guide helps developers understand the changes and update their code accordingly.

## What Changed

### Before (Old Architecture)

```typescript
// Browser view was a secondary detail panel on the RIGHT side
detailView.setBounds({
  x: 818,      // Fixed position on right side
  y: 264,      // Below 48px header
  width: 748,  // Fixed width
  height: 560, // Fixed height
});

// Hidden by default, shown only during browser automation
detailView.setVisible(false);
```

**Characteristics**:
- Secondary detail panel for browser automation
- Fixed position on right side
- Hidden by default
- Shown only when AI agent uses browser tools
- Fixed dimensions (748×560px)

### After (Current Architecture)

```typescript
// Browser view repositioned to LEFT side, preparing for future layout
const windowBounds = mainWindow.getBounds();
const browserWidth = Math.floor(windowBounds.width * 0.75); // 75% for browser panel

detailView.setBounds({
  x: 0,                      // Left edge of window
  y: 0,                      // Top edge of window (edge-to-edge)
  width: browserWidth,       // 75% of window width
  height: windowBounds.height, // Full window height
});

// Hidden by default - shows after first message (preserves original UX)
detailView.setVisible(false);
```

**Characteristics**:
- Browser automation area positioned on LEFT side
- LEFT side of window (x: 0)
- Hidden by default (original behavior preserved)
- Edge-to-edge (full height, no header offset)
- Dynamic width (75% of window, ready for future resizing)

## Impact on Frontend Code

### 1. Layout Assumptions

**Current Behavior** (Preserved):
```typescript
// Browser view is hidden by default, shown during automation
if (showBrowserAutomation) {
  await window.api.setDetailViewVisible(true);
}
```

**Key Points**:
- Visibility behavior unchanged (hidden by default)
- Positioning changed (LEFT side instead of right sidebar)
- IPC coordination works exactly as before

### 2. Positioning Calculations

**Old Calculation** (right sidebar):
```typescript
// Detail view was in AI sidebar on the right
const detailViewX = sidebarX + 16; // After sidebar starts
const detailViewWidth = sidebarWidth - 32; // Within sidebar
```

**New Calculation** (LEFT browser panel):
```typescript
// Browser view occupies LEFT side
const browserWidth = (windowWidth * browserPanelPercent) / 100;
const bounds = {
  x: 0,                    // LEFT edge
  y: 0,                    // TOP edge
  width: browserWidth,     // 75% of window
  height: windowHeight     // Full height
};
```

### 3. IPC Coordination

**Old Pattern**:
```typescript
// Show detail view when tool starts
useEffect(() => {
  if (currentTool && showDetailAgents.includes(currentTool.agentName)) {
    window.api.setDetailViewVisible(true);
  }
}, [currentTool]);
```

**New Pattern**:
```typescript
// Browser view is always visible
// No need to toggle visibility for tool execution
// Focus on coordinating bounds during resize instead

useEffect(() => {
  const handleResize = () => {
    const bounds = calculateBrowserViewBounds(
      window.innerWidth,
      browserPanelPercent
    );
    window.api.updateDetailViewBounds(bounds);
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [browserPanelPercent]);
```

## Migration Checklist

### For Frontend Developers

- [ ] **Remove Header component** from `src/pages/main.tsx` and `src/pages/home.tsx`
- [ ] **Update height calculations** from `calc(100% - 48px)` to `100%` or `100vh`
- [ ] **Implement ResizablePanel layout** with 75/25 split (Browser LEFT, AI Sidebar RIGHT)
- [ ] **Create AISidebarHeader component** to relocate header functionality
- [ ] **Update IPC coordination** to handle dynamic browser view resize
- [ ] **Remove visibility toggling** for browser view (it's always visible now)
- [ ] **Test responsive behavior** across different window sizes

### For Backend/IPC Developers

- [ ] **Verify IPC handlers** work with new browser view positioning
- [ ] **Update bounds validation** to accept full-height browser view
- [ ] **Test window resize** coordination with frontend ResizablePanel
- [ ] **Ensure URL change events** still propagate correctly
- [ ] **Validate screenshot capture** works with new positioning

## Code Examples

### Example 1: Implementing ResizablePanel Layout

```typescript
// src/pages/main.tsx
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

export default function Main() {
  const [browserPanelSize, setBrowserPanelSize] = useState(75);
  
  const handleResize = useCallback((sizes: number[]) => {
    const [browserSize, sidebarSize] = sizes;
    setBrowserPanelSize(browserSize);
    
    // Update browser view bounds
    const bounds = {
      x: 0,
      y: 0,
      width: (window.innerWidth * browserSize) / 100,
      height: window.innerHeight
    };
    
    window.api.updateDetailViewBounds(bounds).catch(console.error);
  }, []);
  
  return (
    <div className="h-full">
      <PanelGroup direction="horizontal" onLayout={handleResize}>
        {/* Browser Panel - LEFT side */}
        <Panel defaultSize={75} minSize={40} maxSize={85}>
          {/* Browser view is managed by Electron */}
        </Panel>
        
        {/* Resize Handle */}
        <PanelResizeHandle className="resize-handle" />
        
        {/* AI Sidebar - RIGHT side */}
        <Panel defaultSize={25} minSize={15} maxSize={60}>
          <AISidebarHeader />
          <ModelConfigBar />
          <MessageList />
          <InputBox />
        </Panel>
      </PanelGroup>
    </div>
  );
}
```

### Example 2: Calculating Browser View Bounds

```typescript
// src/utils/browser-view-bounds.ts
export interface BrowserViewBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function calculateBrowserViewBounds(
  windowWidth: number,
  windowHeight: number,
  browserPanelPercent: number
): BrowserViewBounds {
  // Browser view occupies LEFT side
  const browserWidth = Math.floor((windowWidth * browserPanelPercent) / 100);
  
  return {
    x: 0,                // LEFT edge
    y: 0,                // TOP edge (edge-to-edge)
    width: browserWidth, // Dynamic width based on panel size
    height: windowHeight // Full window height
  };
}
```

### Example 3: Removing Visibility Toggling

**Before**:
```typescript
// Old code that toggled visibility
useEffect(() => {
  if (showDetail) {
    window.api.setDetailViewVisible(true);
  } else {
    window.api.setDetailViewVisible(false);
  }
}, [showDetail]);
```

**After**:
```typescript
// Browser view is always visible - no toggling needed
// Remove this useEffect entirely

// If you need to hide browser content, consider:
// 1. Navigating to a blank page
// 2. Overlaying content in the frontend
// 3. Adjusting panel sizes (collapse browser panel)
```

## Testing Recommendations

### Manual Testing

1. **Launch Application**
   - Verify browser view appears on LEFT side
   - Verify browser view is visible immediately
   - Verify browser view takes ~75% of window width

2. **Resize Window**
   - Drag window edges to resize
   - Verify browser view maintains 75% width ratio
   - Verify no visual glitches or gaps

3. **Panel Resize** (once implemented)
   - Drag resize handle between browser and sidebar
   - Verify smooth 60fps performance
   - Verify browser view bounds update correctly

4. **URL Navigation**
   - Navigate to different URLs in browser view
   - Verify URL changes propagate to frontend
   - Verify browser view remains visible

### Automated Testing

```typescript
// Test browser view positioning
describe('Browser View Positioning', () => {
  it('should position browser view on LEFT side', async () => {
    const bounds = await getBrowserViewBounds();
    expect(bounds.x).toBe(0);
    expect(bounds.y).toBe(0);
  });
  
  it('should occupy 75% of window width by default', async () => {
    const windowWidth = await getWindowWidth();
    const bounds = await getBrowserViewBounds();
    const expectedWidth = Math.floor(windowWidth * 0.75);
    expect(bounds.width).toBe(expectedWidth);
  });
  
  it('should use full window height', async () => {
    const windowHeight = await getWindowHeight();
    const bounds = await getBrowserViewBounds();
    expect(bounds.height).toBe(windowHeight);
  });
  
  it('should be visible by default', async () => {
    const isVisible = await isBrowserViewVisible();
    expect(isVisible).toBe(true);
  });
});
```

## Common Issues and Solutions

### Issue 1: Browser view not visible

**Symptom**: Window shows only AI sidebar, no browser content

**Solution**:
```typescript
// Ensure browser view is visible
await window.api.setDetailViewVisible(true);

// Verify bounds are correct
const bounds = calculateBrowserViewBounds(
  window.innerWidth,
  window.innerHeight,
  75
);
await window.api.updateDetailViewBounds(bounds);
```

### Issue 2: Browser view overlaps AI sidebar

**Symptom**: Browser content extends into sidebar area

**Solution**:
```typescript
// Ensure browser width doesn't exceed panel size
const maxBrowserWidth = (window.innerWidth * 0.85); // Max 85%
const bounds = {
  x: 0,
  y: 0,
  width: Math.min(calculatedWidth, maxBrowserWidth),
  height: window.innerHeight
};
```

### Issue 3: Browser view doesn't resize with window

**Symptom**: Browser view stays fixed size when window resizes

**Solution**:
```typescript
// Add window resize listener
useEffect(() => {
  const handleWindowResize = () => {
    const bounds = calculateBrowserViewBounds(
      window.innerWidth,
      window.innerHeight,
      browserPanelPercent
    );
    window.api.updateDetailViewBounds(bounds);
  };
  
  window.addEventListener('resize', handleWindowResize);
  return () => window.removeEventListener('resize', handleWindowResize);
}, [browserPanelPercent]);
```

## Related Documentation

- [Architecture Changes Log](./ARCHITECTURE_CHANGES.md)
- [NO HEADER Layout Design](../.claude/specs/no-header-layout/design.md)
- [NO HEADER Layout Tasks](../.claude/specs/no-header-layout/tasks.md)
- [IPC System Architecture](./eko-docs/architecture/ipc-system.md)
- [API Documentation](./API.md)

## Questions or Issues?

If you encounter issues during migration:

1. Check the [Architecture Changes Log](./ARCHITECTURE_CHANGES.md) for latest updates
2. Review the [NO HEADER Layout Design](../.claude/specs/no-header-layout/design.md) for complete specification
3. Test with the examples provided in this guide
4. Verify IPC handlers are registered before window creation

---

**Last Updated**: November 7, 2025  
**Status**: Phase 1 Complete - Frontend implementation pending
