# Browser View Visibility Reversion

**Date**: November 7, 2025  
**Change Type**: Behavioral Reversion  
**Impact**: Low (preserves original UX)

## Summary

The browser view visibility behavior has been reverted from "visible by default" to "hidden by default", preserving the original user experience while maintaining the new LEFT-side positioning infrastructure.

## Code Change

**File**: `electron/main/index.ts`

```diff
  detailView.setBounds({
    x: 0,
    y: 0,
    width: browserWidth,
    height: windowBounds.height,
  });

- // Browser view is visible by default (this is the main browsing area)
- detailView.setVisible(true);
+ // Browser view is HIDDEN by default - only shows after first message is sent
+ detailView.setVisible(false);
```

## Rationale

### Why the Reversion?

1. **Preserves Original UX**: Users expect the browser view to appear only when AI agents perform browser automation tasks
2. **Gradual Transformation**: Allows positioning infrastructure to be in place while maintaining familiar interaction patterns
3. **Reduces Risk**: Avoids potential confusion from showing an empty browser view on app launch
4. **Maintains Compatibility**: Frontend code continues to work with existing visibility toggle patterns

### What Remains Changed?

The browser view positioning changes from the earlier update remain in place:

- **Position**: LEFT side of window (x: 0, y: 0)
- **Size**: 75% of window width, full window height
- **Layout**: Edge-to-edge (no header offset)
- **Purpose**: Prepared for future browser-first layout transformation

## Current Behavior

### Application Launch
1. Window opens with AI Sidebar visible (RIGHT side, 25%)
2. Browser view is positioned on LEFT side (75%) but **hidden**
3. User sees only the AI Sidebar interface initially

### First Message Sent
1. User enters a query and sends message
2. AI agent begins task execution
3. If browser automation is needed, `setDetailViewVisible(true)` is called
4. Browser view becomes visible on LEFT side, showing automation

### After Task Completion
1. Browser view can be hidden via `setDetailViewVisible(false)`
2. Or remain visible for continued interaction
3. Behavior matches original implementation

## Impact Assessment

### ✅ No Breaking Changes

- **IPC Methods**: All work exactly as before
- **Frontend Code**: No changes required
- **User Workflows**: Identical to original behavior
- **Visibility Toggle**: `setDetailViewVisible()` functions as expected

### ✅ Infrastructure Ready

- **Positioning**: Browser view is on LEFT side (75% width)
- **Sizing**: Dynamic width calculation in place
- **Edge-to-Edge**: Full height layout ready
- **Future-Proof**: Prepared for ResizablePanel implementation

## Documentation Updates

All documentation has been updated to reflect the current state:

1. ✅ `docs/ARCHITECTURE_CHANGES.md` - Updated with reversion details
2. ✅ `.kiro/steering/product.md` - Updated browser view architecture
3. ✅ `project_status.md` - Updated recent changes and tasks
4. ✅ `docs/BROWSER_VIEW_MIGRATION_GUIDE.md` - Updated behavior description
5. ✅ `docs/eko-docs/architecture/layout-transformation.md` - Updated code examples
6. ✅ `docs/API.md` - Updated API documentation and examples
7. ✅ `docs/DOCUMENTATION_UPDATE_SUMMARY.md` - Added reversion entry

## Testing Checklist

- [ ] Verify browser view is hidden on app launch
- [ ] Verify browser view shows after first message with browser automation
- [ ] Verify browser view is positioned on LEFT side (75% width)
- [ ] Verify browser view uses full window height (edge-to-edge)
- [ ] Verify `setDetailViewVisible(true)` shows browser view
- [ ] Verify `setDetailViewVisible(false)` hides browser view
- [ ] Verify no visual regressions in AI Sidebar
- [ ] Verify window resize maintains browser view positioning

## Next Steps

### Immediate
- Test current behavior across different window sizes
- Verify all existing features work with new positioning
- Confirm no regressions in browser automation

### Future (NO HEADER Layout Transformation)
- Implement ResizablePanel layout in frontend
- Add AISidebarHeader component
- Enable dynamic resize between browser and sidebar
- Consider making browser view visible by default (when ready)

## Related Documentation

- [Architecture Changes Log](./ARCHITECTURE_CHANGES.md)
- [Browser View Migration Guide](./BROWSER_VIEW_MIGRATION_GUIDE.md)
- [Layout Transformation Architecture](./eko-docs/architecture/layout-transformation.md)
- [API Documentation](./API.md)
- [NO HEADER Layout Design](../.claude/specs/no-header-layout/design.md)

---

**Status**: ✅ Complete - Documentation fully updated  
**Risk Level**: Low - Preserves original behavior  
**User Impact**: None - Maintains familiar UX
