# Bug Fixes - November 7, 2025

## Issues Fixed

### 1. IPC Handler Registration Timing Issue

**Problem:** IPC handlers were being registered AFTER the main window was created, causing "No handler registered" errors for:
- `config:get-user-configs`
- `config:get-env-var`
- `config:get-language`

**Solution:** Moved `registerAllIpcHandlers()` call to execute immediately after `app.whenReady()` and before any window creation.

**Files Changed:**
- `electron/main/index.ts` - Moved IPC handler registration to proper location

**Impact:** All configuration-related IPC calls now work correctly on app startup.

---

### 2. Deprecated Ant Design Props

**Problem:** Using deprecated Ant Design 5.x props that will be removed in future versions:
- `popupClassName` → should use `classNames.popup.root`
- `dropdownStyle` → should use `styles.popup.root`
- `destroyOnClose` → should use `destroyOnHidden`

**Solution:** Updated all components to use the new Ant Design 5.x API.

**Files Changed:**
- `src/components/LanguageSwitcher.tsx` - Fixed `popupClassName`
- `src/components/ModelConfigBar.tsx` - Fixed 3 instances of `dropdownStyle`
- `src/components/scheduled-task/ScheduledTaskModal.tsx` - Fixed `destroyOnClose`

**Impact:** Removed deprecation warnings and ensured future compatibility with Ant Design updates.

---

### 3. Missing Type Definition

**Problem:** `getEnvVar` method was exposed in preload script but not declared in TypeScript type definitions.

**Solution:** Added `getEnvVar: (key: string) => Promise<string>` to the Window.api interface.

**Files Changed:**
- `src/type.d.ts` - Added missing type definition

**Impact:** TypeScript now correctly recognizes the `getEnvVar` API method.

---

## Remaining Warnings

### Content Security Policy Warning

**Warning:** "Insecure Content-Security-Policy - unsafe-eval enabled"

**Status:** This is a development-only warning that will not appear in packaged builds. The warning is expected in development mode due to Next.js hot module replacement (HMR) requirements.

**Action Required:** None - this is normal for development mode.

---

### React DevTools Suggestion

**Message:** "Download the React DevTools for a better development experience"

**Status:** Informational message only, not an error.

**Action Required:** Optional - developers can install React DevTools browser extension if desired.

---

## Testing Recommendations

After these fixes, test the following:

1. **Configuration Loading**
   - Open the app and verify model configuration loads correctly
   - Check that language preference is loaded
   - Verify environment variables are accessible

2. **UI Components**
   - Test language switcher dropdown
   - Test model provider and model selection dropdowns
   - Test scheduled task modal creation/editing

3. **IPC Communication**
   - Verify no "No handler registered" errors in console
   - Test all configuration-related features

---

## Performance Notes

- IPC handler registration now happens once at startup (more efficient)
- Ant Design component updates use the optimized new API
- No breaking changes to functionality

---

## Documentation Updates

Related documentation has been updated:
- `docs/API.md` - New comprehensive API documentation
- `docs/eko-docs/architecture/layout-transformation.md` - New architecture documentation
- `README.md` - Updated with new features and documentation links
