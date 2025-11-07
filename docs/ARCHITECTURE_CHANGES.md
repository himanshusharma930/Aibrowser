# Architecture Changes Log

This document tracks significant architectural changes to Manus Electron.

## November 7, 2025 - Browser View Repositioning for NO HEADER Layout

### Change Summary

Repositioned the browser view (detailView) from a right-side detail panel to a full-height LEFT-side main browsing area, implementing the first phase of the NO HEADER layout transformation. The browser view now occupies 75% of the window width on the left side.

**UPDATE (Same Day)**: Visibility behavior reverted to hidden by default. Browser view now only shows after first message is sent, maintaining the original interaction pattern while keeping the new LEFT-side positioning.

### Files Modified

- `electron/main/index.ts` - Updated detailView positioning and visibility in `initializeMainWindow()`

### Previous Behavior

```typescript
// Create detail panel area (right sidebar)
detailView = createView(`https://www.google.com`, "view", '1');
mainWindow.contentView.addChildView(detailView);
detailView.setBounds({
  x: 818,      // Fixed position on right side
  y: 264,      // Below header area
  width: 748,  // Fixed width
  height: 560, // Fixed height
});

// Set detail view hidden by default
detailView.setVisible(false);
```

**Behavior**: Browser view was a secondary detail panel on the right side, hidden by default, shown only during browser automation tasks.

### New Behavior

```typescript
// Create browser view (main browsing area on the LEFT side)
detailView = createView(`https://www.google.com`, "view", '1');
mainWindow.contentView.addChildView(detailView);

// Position browser view on the LEFT side (75% of window width by default)
const windowBounds = mainWindow.getBounds();
const browserWidth = Math.floor(windowBounds.width * 0.75); // 75% for browser panel

detailView.setBounds({
  x: 0,                      // Left edge of window
  y: 0,                      // Top edge of window
  width: browserWidth,       // 75% of window width
  height: windowBounds.height, // Full window height
});

// Browser view is HIDDEN by default - only shows after first message is sent
detailView.setVisible(false);
```

**Behavior**: Browser view is positioned on the LEFT side (75% width, full height) but hidden by default. It becomes visible only after the first AI message is sent, maintaining the original interaction pattern.

### Architectural Impact

This change implements **Phase 1** of the NO HEADER layout transformation:

1. **LEFT-Side Positioning**: Browser view repositioned from right sidebar to LEFT side (75% width)
2. **75/25 Split Layout**: Browser takes 75% (LEFT), leaving 25% for AI Sidebar (RIGHT)
3. **Edge-to-Edge**: Full window height (y: 0 to windowBounds.height) with no header offset
4. **Visibility Pattern**: Hidden by default, shows on first message (preserves original UX)

### Benefits

1. **Maximizes Browser Content**: Full viewport height utilization (no 48px header)
2. **Browser-First UX**: Primary browsing experience, not hidden automation panel
3. **Prepares for Resizable Panels**: 75/25 split aligns with ResizablePanel implementation
4. **Consistent with Spec**: Matches `.claude/specs/no-header-layout/design.md` architecture

### Breaking Changes

⚠️ **UPDATE**: Visibility behavior reverted to maintain original UX:

- **Positioning**: Browser view is on LEFT side (75% width, full height) - **NEW**
- **Visibility**: Hidden by default, shows on first message - **PRESERVED**
- **IPC Impact**: `setDetailViewVisible()` works as before, controlling browser automation visibility
- **Coordination**: Frontend can continue using existing visibility toggle patterns

### Next Steps

1. **Frontend Adaptation**: Update `src/pages/main.tsx` to implement ResizablePanel layout
2. **IPC Coordination**: Update `updateDetailViewBounds` to handle dynamic resize
3. **AI Sidebar**: Implement 25% RIGHT sidebar with AISidebarHeader component
4. **Testing**: Verify browser view positioning across window sizes

### Related Documentation

- [NO HEADER Layout Design](../.claude/specs/no-header-layout/design.md)
- [NO HEADER Layout Tasks](../.claude/specs/no-header-layout/tasks.md)
- [IPC System Architecture](./eko-docs/architecture/ipc-system.md)

---

## November 7, 2025 - IPC Handler Early Registration

### Change Summary

Moved IPC handler registration to occur **before** window creation in the Electron main process initialization sequence.

### Files Modified

- `electron/main/index.ts` - Added `registerAllIpcHandlers()` call before window creation

### Previous Behavior

```typescript
(async () => {
  await app.whenReady();
  
  // Register protocol
  registerClientProtocol(protocol);
  
  // Create windows
  const mainWindow = await createMainWindow();
  
  // IPC handlers registered somewhere during/after window creation
})();
```

**Problem**: Potential race condition where renderer processes might attempt IPC calls before handlers are registered, resulting in "handler not found" errors.

### New Behavior

```typescript
(async () => {
  await app.whenReady();
  console.log("App is ready");

  // Register all IPC handlers FIRST (before creating windows)
  registerAllIpcHandlers();
  console.log('[IPC] All IPC handlers registered');

  // Register global client protocol
  registerClientProtocol(protocol);

  // Initialize cookies
  await initCookies();

  // Start Next.js server
  await serverManager.startServer();

  // Create windows (handlers already ready)
  const mainWindow = await createMainWindow();
})();
```

**Solution**: All IPC handlers are guaranteed to be registered before any renderer process is created, eliminating race conditions.

### Handler Categories Registered

The `registerAllIpcHandlers()` function registers five categories:

1. **Eko Handlers** - AI agent task execution
   - `eko-run`, `eko-modify`, `eko-cancel-task`, `eko-stream-message`

2. **View Handlers** - WebContentsView coordination
   - `set-detail-view-visible`, `update-detail-view-bounds`, `get-main-view-screenshot`
   - `show-history-view`, `hide-history-view`, `get-current-url`

3. **History Handlers** - Task history management
   - `get-task-history`, `delete-task-history`, `clear-task-history`

4. **Config Handlers** - User configuration
   - `get-user-model-configs`, `save-user-model-configs`
   - `get-selected-provider`, `set-selected-provider`

5. **Agent Handlers** - Agent configuration
   - `get-agent-config`, `save-agent-config`
   - `get-mcp-tools`, `set-mcp-tool-enabled`

### Benefits

1. **Eliminates Race Conditions**: Renderer processes can safely call IPC methods immediately after window creation
2. **Improved Reliability**: No "handler not found" errors during initialization
3. **Better Multi-Window Support**: All windows have consistent handler availability
4. **Clearer Architecture**: Explicit initialization order makes the system easier to understand
5. **Easier Debugging**: Handlers are logged as registered before any window operations

### Impact on Existing Code

**No breaking changes** - This is a pure architectural improvement. All existing IPC calls continue to work identically, but with improved reliability.

### Testing Recommendations

1. Verify all IPC methods work immediately after window creation
2. Test multi-window scenarios (main window + task detail windows)
3. Verify no "handler not found" errors in console during startup
4. Test rapid window creation/destruction cycles

### Documentation Updates

- Created `docs/eko-docs/architecture/ipc-system.md` - Comprehensive IPC architecture guide
- Updated `docs/API.md` - Added architecture overview section
- Updated `docs/eko-docs/architecture/layout-transformation.md` - IPC registration order
- Updated `.kiro/steering/product.md` - Initialization sequence
- Updated `project_status.md` - Recent changes tracking

### Related Issues

This change prevents potential issues related to:
- Timing-dependent IPC failures
- Inconsistent handler availability across windows
- Difficult-to-reproduce initialization bugs

### Future Considerations

- Consider adding IPC handler health checks during development
- Add automated tests for IPC handler registration order
- Document any new IPC handlers in the centralized registration function

---

## Template for Future Changes

When making architectural changes, document them here with:

1. **Change Summary** - Brief description
2. **Files Modified** - List of changed files
3. **Previous Behavior** - What it was before
4. **New Behavior** - What it is now
5. **Benefits** - Why the change was made
6. **Impact** - Breaking changes or compatibility notes
7. **Documentation Updates** - What docs were updated
8. **Testing Recommendations** - How to verify the change
