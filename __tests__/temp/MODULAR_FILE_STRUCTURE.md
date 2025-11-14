# Proposed Modular File Structure for Electron + Next.js + Eko 3.0

## PHASE 1: CORE REORGANIZATION (Weeks 1-4)

### Current Problem
- `src/pages/main.tsx` (951 lines) - does everything
- IPC handlers scattered across 9 files
- Tools imported all at once in eko-service.ts
- Type definitions split between src/ and electron/

### Target Structure

```
PROJECT ROOT
├── src/                           [NEXT.JS - RENDERER PROCESS]
│   ├── pages/
│   │   ├── main.tsx              (NEW: 150 lines, router/layout only)
│   │   │
│   │   ├── workspace/            (NEW: Feature-based pages)
│   │   │   ├── chat-page.tsx      (NEW: 250 lines - chat, stream, messages)
│   │   │   ├── browser-page.tsx   (NEW: 300 lines - browser + detail view)
│   │   │   ├── task-detail-page.tsx (NEW: 200 lines - task execution view)
│   │   │   └── index.ts
│   │   │
│   │   ├── settings/             (NEW: Configuration pages)
│   │   │   ├── model-config.tsx   (MOVE from ModelConfigBar)
│   │   │   ├── agent-config.tsx   (EXISTS: simplify)
│   │   │   └── index.ts
│   │   │
│   │   ├── file-view.tsx          (KEEP AS-IS)
│   │   ├── home.tsx               (KEEP AS-IS)
│   │   ├── toolbox.tsx            (KEEP AS-IS)
│   │   └── api/                   (KEEP AS-IS)
│   │
│   ├── components/
│   │   ├── layout/                (NEW: Layout components)
│   │   │   ├── DualPanelLayout.tsx (MOVE from components/)
│   │   │   ├── MainLayoutWrapper.tsx
│   │   │   └── ResizeHandles.tsx   (CONSOLIDATE enhanced versions)
│   │   │
│   │   ├── chat/
│   │   │   ├── MessagePanel.tsx   (KEEP)
│   │   │   ├── MessageComponents.tsx
│   │   │   ├── InputComponents.tsx (NEW: Consolidate StickyInputBox)
│   │   │   ├── ToolComponents.tsx
│   │   │   ├── VirtualizedMessageList.tsx
│   │   │   ├── ErrorComponents.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── browser/               (NEW: Browser-specific components)
│   │   │   ├── BrowserArea.tsx    (MOVE)
│   │   │   ├── BrowserPanel.tsx   (MOVE)
│   │   │   ├── NavigationBar.tsx   (MOVE)
│   │   │   ├── TabBar.tsx          (MOVE)
│   │   │   └── index.ts
│   │   │
│   │   ├── sidebar/               (NEW: Sidebar components)
│   │   │   ├── AIWorkspaceSidebar.tsx (RENAME from RightAISidebar)
│   │   │   ├── BrowserSidebar.tsx (RENAME from LeftSidebar)
│   │   │   ├── ConversationArea.tsx (MOVE from ai-sidebar/)
│   │   │   ├── SuggestionChips.tsx (MOVE)
│   │   │   └── index.ts
│   │   │
│   │   ├── ui/
│   │   │   ├── agent-plan.tsx     (KEEP)
│   │   │   ├── agent-plan-embedded.tsx
│   │   │   ├── RoundedContainer.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── scheduled-task/        (KEEP AS-IS)
│   │   ├── tabs/                  (KEEP AS-IS)
│   │   ├── fellou/                (KEEP AS-IS)
│   │   │
│   │   └── common/                (NEW: Shared UI components)
│   │       ├── Header.tsx          (MOVE)
│   │       ├── LanguageSwitcher.tsx (MOVE)
│   │       ├── AgentConfigModal.tsx (MOVE)
│   │       ├── SettingsDrawer.tsx  (MOVE)
│   │       ├── MCPToolSelector.tsx  (MOVE)
│   │       └── index.ts
│   │
│   ├── hooks/
│   │   ├── useEkoStreamHandler.ts (KEEP - isolated to specific components)
│   │   ├── useEkoEvents.ts        (KEEP - event listening)
│   │   ├── useCheckpointTask.ts   (KEEP - checkpoint logic)
│   │   ├── useTaskManager.ts      (NEW: Consolidate task operations)
│   │   ├── useChatMessages.ts     (NEW: Extract from main.tsx)
│   │   ├── useBrowserNavigation.ts (NEW: Extract from main.tsx)
│   │   ├── useLayoutMode.ts       (KEEP)
│   │   ├── useResponsiveLayout.ts (KEEP)
│   │   ├── useWindowApi.ts        (KEEP)
│   │   ├── useLanguage.ts         (KEEP)
│   │   ├── useLayoutManager.ts    (KEEP)
│   │   ├── useNavigationHandlers.ts (KEEP)
│   │   ├── useContextTransferStream.ts (KEEP)
│   │   └── index.ts               (NEW: Central exports)
│   │
│   ├── lib/
│   │   ├── ipc/                   (NEW: IPC abstraction layer)
│   │   │   ├── eko-api.ts         (NEW: Wrap window.api.eko.*)
│   │   │   ├── config-api.ts      (NEW: Wrap window.api.config.*)
│   │   │   ├── view-api.ts        (NEW: Wrap window.api.view.*)
│   │   │   ├── agent-api.ts       (NEW: Wrap window.api.agent.*)
│   │   │   ├── errors.ts          (NEW: Unified error handling)
│   │   │   ├── hooks.ts           (NEW: useIpc, useIpcHandler, etc.)
│   │   │   └── index.ts
│   │   │
│   │   ├── douyin/                (KEEP AS-IS)
│   │   ├── xiaohongshu/           (KEEP AS-IS)
│   │   ├── i18n.ts                (KEEP)
│   │   ├── taskStorage.ts         (KEEP)
│   │   ├── scheduled-task-storage.ts (KEEP)
│   │   ├── mcpTools.ts            (REFACTOR: See Phase 2)
│   │   ├── capture-feed.ts        (KEEP)
│   │   ├── focus-management.ts    (KEEP - consider if still needed)
│   │   ├── semantic-html.ts       (KEEP)
│   │   ├── accessibility-testing.ts (KEEP)
│   │   ├── ttsPlayer.ts           (KEEP)
│   │   └── speechRecognition.ts   (KEEP)
│   │
│   ├── stores/
│   │   ├── historyStore.ts        (KEEP)
│   │   ├── languageStore.ts       (KEEP)
│   │   ├── layoutStore.ts         (REFACTOR: See Phase 2)
│   │   ├── scheduled-task-store.ts (KEEP)
│   │   └── index.ts               (NEW: Central exports)
│   │
│   ├── services/                  (NEW: Client-side business logic)
│   │   ├── agent-context-manager.ts (KEEP - client version)
│   │   ├── browserStorage.ts      (KEEP)
│   │   ├── task-management.ts     (NEW: Consolidate task operations)
│   │   └── index.ts
│   │
│   ├── models/
│   │   ├── task.ts                (KEEP)
│   │   ├── message.ts             (KEEP)
│   │   ├── scheduled-task.ts      (KEEP)
│   │   ├── speech-recognition/    (KEEP AS-IS)
│   │   ├── tts-player/            (KEEP AS-IS)
│   │   └── index.ts
│   │
│   ├── types/
│   │   ├── ipc-contracts.ts       (MOVE from src/types/ → NEW: shared/)
│   │   ├── tool.ts                (MOVE from src/types/ → NEW: shared/)
│   │   ├── index.ts
│   │   └── *.d.ts                 (Organize by domain)
│   │
│   ├── utils/
│   │   ├── http.ts                (KEEP)
│   │   ├── messageTransform.ts    (KEEP)
│   │   ├── layout-transition.ts   (KEEP)
│   │   ├── detail-view-bounds.ts  (KEEP)
│   │   ├── panel-layout-storage.ts (KEEP)
│   │   ├── api-error-handler.ts   (NEW: Standardized API errors)
│   │   └── index.ts
│   │
│   ├── config/                    (KEEP AS-IS)
│   ├── constants/                 (NEW: App-level constants)
│   ├── icons/                     (KEEP AS-IS)
│   ├── locales/                   (KEEP AS-IS)
│   ├── type.d.ts                  (CONSOLIDATE: Move types to shared/)
│   ├── _app.tsx                   (KEEP)
│   └── _document.tsx              (KEEP)
│
├── electron/                      [MAIN PROCESS]
│   ├── main/
│   │   ├── index.ts               (KEEP: Entry point)
│   │   │
│   │   ├── services/
│   │   │   ├── eko-service.ts     (REFACTOR: Lazy-load tools)
│   │   │   ├── task-scheduler.ts  (KEEP)
│   │   │   ├── task-window-manager.ts (KEEP)
│   │   │   ├── window-context-manager.ts (KEEP)
│   │   │   ├── agent-context-manager.ts (KEEP)
│   │   │   ├── mcp-client-manager.ts (KEEP)
│   │   │   ├── health-checker.ts  (KEEP)
│   │   │   ├── server-manager.ts  (KEEP)
│   │   │   ├── task-checkpoint.ts (KEEP)
│   │   │   │
│   │   │   ├── tools/             (NEW: Tool organization)
│   │   │   │   ├── registry.ts    (NEW: Tool registry with lazy-loading)
│   │   │   │   ├── loader.ts      (NEW: Dynamic import wrapper)
│   │   │   │   ├── index.ts
│   │   │   │   ├── browser/       (MOVE from browser-tools/)
│   │   │   │   ├── advanced/      (MOVE from advanced-browser-tools/)
│   │   │   │   └── shared/        (Consolidate error codes, types)
│   │   │   │
│   │   │   └── browser-tools/     (DEPRECATED: Keep for migration)
│   │   │       └── index.ts       (Re-export from services/tools/)
│   │   │
│   │   ├── handlers/              (NEW: Consolidate IPC handlers)
│   │   │   ├── index.ts           (Single registration point)
│   │   │   │
│   │   │   ├── base-handler.ts    (NEW: Handler factory/base class)
│   │   │   │
│   │   │   ├── eko/
│   │   │   │   ├── run-handler.ts
│   │   │   │   ├── modify-handler.ts
│   │   │   │   ├── execute-handler.ts
│   │   │   │   ├── checkpoint-handler.ts (NEW: IMPLEMENT!)
│   │   │   │   ├── status-handler.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── view/
│   │   │   │   ├── bounds-handler.ts
│   │   │   │   ├── navigation-handler.ts
│   │   │   │   ├── screenshot-handler.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── config/
│   │   │   │   ├── model-handler.ts
│   │   │   │   ├── api-key-handler.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── agent/
│   │   │   │   ├── config-handler.ts
│   │   │   │   ├── mcp-handler.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── context/
│   │   │   │   ├── transfer-handler.ts
│   │   │   │   ├── state-handler.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── history/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── validation/        (NEW: Centralized validation)
│   │   │   │   ├── schemas.ts     (All Zod schemas in ONE place)
│   │   │   │   ├── middleware.ts  (Validation logic)
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── error/
│   │   │       └── index.ts
│   │   │
│   │   ├── ipc/                   (OLD: DEPRECATED - for migration)
│   │   │   └── index.ts           (Re-export from handlers/)
│   │   │
│   │   ├── windows/
│   │   │   ├── main-window.ts     (KEEP)
│   │   │   ├── window-states.ts   (KEEP)
│   │   │   └── index.ts           (NEW: Window management registry)
│   │   │
│   │   ├── ui/
│   │   │   ├── menu.ts            (KEEP)
│   │   │   ├── tray.ts            (KEEP)
│   │   │   ├── view.ts            (KEEP)
│   │   │   ├── window.ts          (KEEP)
│   │   │   └── index.ts
│   │   │
│   │   ├── container/             (NEW: DI Container - Phase 2)
│   │   │   ├── service-container.ts
│   │   │   ├── factory.ts
│   │   │   ├── providers/
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── config-manager.ts  (KEEP)
│   │   │   ├── error-handler.ts   (KEEP)
│   │   │   ├── logger.ts          (KEEP)
│   │   │   ├── model-cache.ts     (KEEP)
│   │   │   ├── screenshot-cache.ts (KEEP)
│   │   │   ├── memory-manager.ts  (KEEP)
│   │   │   ├── auto-update.ts     (KEEP)
│   │   │   ├── cookie.ts          (KEEP)
│   │   │   ├── encryption.ts      (KEEP)
│   │   │   ├── protocol.ts        (KEEP)
│   │   │   ├── reload.ts          (KEEP)
│   │   │   ├── constants.ts       (KEEP)
│   │   │   ├── store.ts           (KEEP)
│   │   │   ├── migration-manager.ts (KEEP)
│   │   │   ├── lru-cache.ts       (KEEP)
│   │   │   ├── screenshot-optimizer.ts (KEEP)
│   │   │   ├── secure-string.ts   (KEEP)
│   │   │   └── index.ts
│   │   │
│   │   ├── security/
│   │   │   └── csp-config.ts      (KEEP)
│   │   │
│   │   └── vite.config.ts         (KEEP)
│   │
│   ├── preload/
│   │   ├── index.ts               (REFACTOR: Simplify, use new namespaced API)
│   │   ├── view.ts                (KEEP)
│   │   └── vite.config.ts         (KEEP)
│   │
│   ├── constants/                 (NEW: Centralized constants)
│   │   ├── ipc-channels.ts        (MOVE from electron/constants/)
│   │   └── index.ts
│   │
│   └── shared/                    (NEW: Shared types between electron/ and src/)
│       ├── types/
│       │   ├── ipc-contracts.ts   (MOVE from src/types/)
│       │   ├── eko-types.ts       (NEW: Eko-specific types)
│       │   ├── agent-types.ts     (NEW: Agent types)
│       │   ├── tool-types.ts      (MOVE from src/types/tool.ts)
│       │   ├── config-types.ts    (NEW: Consolidate config types)
│       │   └── index.ts
│       │
│       └── constants/
│           ├── ipc-channels.ts    (REFERENCE to electron/constants/)
│           └── index.ts
│
├── docs/                          (DOCUMENTATION)
│   ├── architecture/              (NEW: Technical docs)
│   │   ├── ipc-architecture.md
│   │   ├── eko-integration.md
│   │   ├── dependency-injection.md
│   │   └── tool-system.md
│   │
│   ├── guides/                    (NEW: Developer guides)
│   │   ├── adding-new-ipc-handler.md
│   │   ├── adding-new-tool.md
│   │   ├── adding-new-page.md
│   │   └── state-management.md
│   │
│   └── (EXISTING docs preserved)
│
├── shared/                        (OPTIONAL: Build-time shared code)
│   └── types/                     (If not using electron/shared)
│
└── __tests__/
    ├── temp/                      (Report directory)
    ├── unit/
    └── integration/
```

---

## PHASE 2: FILE MIGRATION ROADMAP

### Step 1: Create New Directory Structure
```bash
# Create handlers directory
mkdir -p electron/main/handlers/{eko,view,config,agent,context,layout,history,error,validation}

# Create tools directory
mkdir -p electron/main/services/tools/{browser,advanced,shared}

# Create shared directory
mkdir -p electron/shared/types
mkdir -p electron/shared/constants

# Create client lib/ipc layer
mkdir -p src/lib/ipc
```

### Step 2: Move and Refactor Files
```bash
# Step 2.1: Create new handler structure (backward compatible)
# Move eko-handlers.ts → handlers/eko/index.ts
# Move view-handlers.ts → handlers/view/index.ts
# ... etc

# Step 2.2: Create base handler class
cp electron/main/ipc/eko-handlers.ts electron/main/handlers/eko/index.ts

# Step 2.3: Create IPC abstraction layer
touch src/lib/ipc/eko-api.ts
touch src/lib/ipc/config-api.ts
touch src/lib/ipc/view-api.ts
touch src/lib/ipc/agent-api.ts

# Step 2.4: Move type definitions
mv src/types/ipc-contracts.ts electron/shared/types/
mv src/types/tool.ts electron/shared/types/
```

### Step 3: Update Imports Gradually
```bash
# Step 3.1: Create redirect modules (for safety)
# electron/main/ipc/eko-handlers.ts now exports from handlers/eko/

# Step 3.2: Update service imports
# In eko-service.ts: import tools from './tools/registry'

# Step 3.3: Update preload imports
# In preload/index.ts: import { IPC_CHANNELS } from '../constants/'
```

### Step 4: Split Large Components
```bash
# src/pages/main.tsx (951 lines) → (150 lines)
# Create feature pages:
# - src/pages/workspace/chat-page.tsx (chat logic)
# - src/pages/workspace/browser-page.tsx (browser logic)
# - src/pages/workspace/task-detail-page.tsx (task detail logic)

# Extract hooks for each feature
# - src/hooks/useChatMessages.ts
# - src/hooks/useBrowserNavigation.ts
```

---

## PHASE 3: VALIDATION & TESTING

### Migration Checklist

- [ ] No import errors in build
- [ ] All IPC channels still work
- [ ] Eko tasks still execute
- [ ] Scheduled tasks still run
- [ ] File operations still work
- [ ] Multi-agent context transfer works
- [ ] Checkpoint manager functions correctly

### Test Commands

```bash
# Build verification
pnpm run build:next-only
pnpm run build:deps

# Runtime verification
pnpm run dev

# Type checking
pnpm run type-check

# Lint verification
pnpm run lint
```

---

## ARCHITECTURE BENEFITS POST-MIGRATION

### Before
```
Main Challenge: Where's this code?
├─ main.tsx - 951 lines of mixed concerns
├─ eko-handlers.ts - 412 lines of request handling
├─ eko-service.ts - 963 lines of orchestration
└─ 61 tool imports scattered everywhere
```

### After
```
Clear Organization:
├─ Feature pages under src/pages/workspace/
├─ IPC handlers organized by domain under handlers/
├─ Tools registered via registry with lazy-loading
├─ Hooks isolated by feature
└─ Types centralized in electron/shared/types/
```

### Impact Metrics
```
Before:
- Largest file: 951 lines (main.tsx)
- Import chain: 71 items (eko-service.ts)
- Load time: ~200ms extra for all tools

After:
- Largest file: ~300 lines (feature pages)
- Import chain: ~10 items per service
- Load time: ~50ms for used tools only (80% improvement)
```

---

## BACKWARDS COMPATIBILITY STRATEGY

### Phase 1 (Weeks 1-2)
- Create new structure alongside old
- Old `electron/main/ipc/` still exports
- Preload API unchanged
- No breaking changes

### Phase 2 (Weeks 3-4)
- New handlers re-export from old locations
- Gradual component splitting (feature flags)
- Type imports available in both locations
- Zero runtime impact

### Phase 3 (Weeks 5-6)
- Deprecation warnings for old imports
- Switch to new structure internally
- Keep compatibility layer 2 releases

### Phase 4 (Future Major Version)
- Remove old structure
- Require new imports
- Full cleanup

---

## EXAMPLE: IMPLEMENTING NEW HANDLER STRUCTURE

### Current Code (eko-handlers.ts - 412 lines)
```typescript
import { ipcMain } from "electron";
import { windowContextManager } from "...";
import { createLogger } from "...";
import { validateIpc, rateLimit } from "./validation-middleware";

export function registerEkoHandlers() {
  ipcMain.handle('eko:run',
    rateLimit(10, 1000)(
      validateIpc(EkoRunSchema)(
        async (event, data) => {
          logger.logIpc('eko:run', ...);
          // ... implementation
        }
      )
    )
  );
  // ... more handlers
}
```

### New Code (handlers/eko/index.ts)
```typescript
import { BaseHandler } from '../base-handler';

export class EkoHandlers extends BaseHandler {
  constructor(private ekoService: EkoService) {
    super('EkoHandlers');
  }

  @validate(EkoRunSchema)
  @rateLimit(10, 1000)
  async runTask(event, data) {
    this.logIpc('eko:run', { messageLength: data.message.length });
    const context = this.getContext(event.sender.id);
    return await context.ekoService.run(data.message);
  }

  @validate(EkoModifySchema)
  async modifyTask(event, data) {
    this.logIpc('eko:modify', { taskId: data.taskId });
    const context = this.getContext(event.sender.id);
    return await context.ekoService.modify(data.taskId, data.message);
  }

  register() {
    ipcMain.handle(IPC_CHANNELS.EKO.RUN, this.runTask.bind(this));
    ipcMain.handle(IPC_CHANNELS.EKO.MODIFY, this.modifyTask.bind(this));
    // ... etc
  }
}

// In main/handlers/index.ts
export function registerAllHandlers() {
  const ekoHandlers = new EkoHandlers(ekoService);
  ekoHandlers.register();

  const viewHandlers = new ViewHandlers();
  viewHandlers.register();
  // ... etc
}
```

---

## ESTIMATED TIMELINE

| Phase | Task | Files | Hours | Weeks |
|:-----:|------|-------|:-----:|:-----:|
| 1 | Directory structure | - | 2 | 0.5 |
| 1 | Move handlers | 9 | 6 | 1 |
| 1 | Move types | 3 | 2 | 0.5 |
| 1 | Create registry | 1 | 4 | 1 |
| 2 | Implement DI | 5 | 8 | 2 |
| 2 | Split components | 1 | 8 | 2 |
| 2 | Extract hooks | 6 | 4 | 1 |
| 3 | Testing | - | 8 | 2 |
| **TOTAL** | | | **42** | **10 weeks** |

---

## CONCLUSION

This modular structure provides:

✅ **Clear Separation of Concerns**
- Pages handle routing
- Components handle rendering
- Hooks handle logic
- Services handle data/IPC
- Utils handle utilities

✅ **Improved Scalability**
- Easy to add new IPC handlers
- Easy to add new tools
- Easy to add new pages/features
- Easy to add new services

✅ **Better Testing**
- Services can be tested in isolation
- Handlers can be unit tested
- Components can be tested independently

✅ **Reduced Complexity**
- No 950+ line files
- Clear module boundaries
- Type safety throughout
- Single responsibility per module

✅ **Zero Breaking Changes**
- Backward compatible imports
- Gradual migration
- Feature flags available
- Long deprecation path
