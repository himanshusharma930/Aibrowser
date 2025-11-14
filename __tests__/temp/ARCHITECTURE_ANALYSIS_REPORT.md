# Electron + Next.js + Eko 3.0 Architecture Analysis Report

**Project:** Manus Electron (AI-Powered Intelligent Browser)
**Date Generated:** 2024-11-14
**Codebase Size:** ~23,246 src lines + ~18,248 electron lines
**Analysis Scope:** Full stack (Next.js 15 + Electron 33 + Eko 3.0)

---

## EXECUTIVE SUMMARY

This is a **well-structured** enterprise-grade project with strong architectural foundations. The codebase exhibits good separation of concerns, modular design, and progressive phases of development. However, there are **moderate organizational opportunities** to improve maintainability, reduce duplication, and enhance scalability.

**Overall Health Score: 7.5/10**
- ✅ Strengths: Clear IPC architecture, comprehensive browser tools, security-first mindset
- ⚠️ Areas for improvement: Large component files, scattered validation logic, checkpoint feature duplication

---

## 1. CODEBASE ORGANIZATION ISSUES

### 1.1 Large Component Files (Refactoring Candidates)

| File | Size | Reason | Risk Level |
|------|------|--------|-----------|
| `src/pages/main.tsx` | 951 lines | Core page with chat, browser, sidebar logic | 🔴 HIGH |
| `src/lib/mcpTools.ts` | 915 lines | MCP tool definitions and configuration | 🟡 MEDIUM |
| `src/components/ui/agent-plan.tsx` | 739 lines | Agent workflow visualization | 🟡 MEDIUM |
| `src/components/ModelConfigBar.tsx` | 600 lines | Model provider configuration UI | 🟡 MEDIUM |
| `src/lib/focus-management.ts` | 538 lines | Focus/blur event handlers | 🟡 MEDIUM |
| `electron/main/services/eko-service.ts` | 963 lines | Core Eko orchestration | 🟡 MEDIUM |

**Impact:** Harder to test, debug, and maintain. Single points of failure.

---

### 1.2 Browser Tools Organization

**Current Structure:**
```
electron/main/services/
├── browser-tools/              (23 tools, ~2,228 lines total)
│   ├── browser-*.ts            (individual tools)
│   └── shared/                 (error-codes, types)
└── advanced-browser-tools/     (38 tools, organized by category)
    ├── cdp-commands/           (2 tools)
    ├── cdp-extraction/         (2 tools)
    ├── element-extraction/     (7 tools)
    ├── javascript-functions/   (9 tools)
    ├── file-operations/        (2 tools)
    └── shared/
```

**Issues:**
- ✅ **Good:** Advanced tools well-categorized
- ⚠️ **Concern:** Browser-tools index exports 53 items (large barrel export)
- ⚠️ **Pattern:** Both `browser-tools` and `advanced-browser-tools` import into `eko-service.ts` (71 imports total in eko-service)
- ⚠️ **Opportunity:** Tool registration could be lazy-loaded based on agent capabilities

**Tool Count Summary:**
- Basic browser tools: 23
- Advanced browser tools: 38
- Total tools available: 61+

---

### 1.3 IPC Handler Fragmentation

**Current IPC Handlers (9 files, 2,716 lines total):**

| Handler | File | Lines | Channels |
|---------|------|-------|----------|
| Eko operations | `eko-handlers.ts` | 412 | eko:run, modify, execute, cancel |
| View management | `view-handlers.ts` | 259 | detail-view visibility, bounds, navigation |
| Config management | `config-handlers.ts` | 182 | model configs, API keys, language |
| Agent configuration | `agent-handlers.ts` | 124 | agent config, MCP tools |
| Agent context transfer | `agent-context-handlers.ts` | 234 | context transfer, state management |
| History tracking | `history-handlers.ts` | 126 | history view controls |
| Layout management | `layout-handlers.ts` | 219 | panel resizing, layout state |
| Performance monitoring | `performance-handlers.ts` | 318 | memory, CPU monitoring |
| Validation & Error | `validation-middleware.ts` + `error-handlers.ts` | 597 | input validation, error logging |

**Issues:**
- ✅ **Good:** Each handler has single responsibility
- ⚠️ **Concern:** Validation middleware has 326 lines (should be slimmer)
- ⚠️ **Concern:** No handler reuses validation schemas
- ⚠️ **Pattern:** Each handler independently manages error logging
- 🟡 **Opportunity:** Create handler factory pattern to reduce boilerplate

**Validation Duplication:**
```typescript
// Pattern repeated in ~8 handler files:
validateIpc(EkoRunSchema)(async (event, data) => { ... })
```

---

## 2. ARCHITECTURE INSIGHTS

### 2.1 IPC Channel Architecture

**Total IPC Channels: 42 channels** organized in 8 namespaces

```typescript
IPC_CHANNELS = {
  EKO (5 channels) → Eko task execution + streaming
  VIEW (12 channels) → Browser view/detail view management
  CONFIG (7 channels) → Model & environment configuration
  AGENT (5 channels) → Agent configuration & MCP tools
  HISTORY (2 channels) → Task history display
  VOICE (4 channels) → TTS/voice recognition
  UTIL (3 channels) → General utilities
  WINDOW (5 channels) → Window management (but using window.api directly)
  APP (2 channels) → App version/platform info
}
```

**Architecture Quality:**
- ✅ **Centralized:** All channels in one file (`electron/constants/ipc-channels.ts`)
- ✅ **Type-safe:** TypeScript type helpers provided
- ✅ **Namespaced:** Good organization with clear categories
- ⚠️ **Issue:** Preload exposes checkpoint methods without handlers:
  - `ekoRunCheckpoint`, `ekoPauseTask`, `ekoResumeTask` (lines 42-53 in preload)
  - **These methods NOT registered in any handler file** → Will fail at runtime!

---

### 2.2 Type Safety Issues

**Found:**
1. **Line 71 in `eko-service.ts`:**
   ```typescript
   private agents!: any[];  // ❌ Should be typed as Agent[]
   ```

2. **Preload API partially untyped:**
   ```typescript
   (window.api as any).setDetailViewVisible(false)  // ⚠️ Unsafe type cast
   ```

3. **Mixed window.api access patterns in main.tsx:**
   - Direct: `window.api.setDetailViewVisible(false)`
   - Namespaced: `window.api.view.setDetailViewVisible(false)`
   - Both patterns exist (lines 121, 156 in main.tsx)

**Recommendation:** Create strict API contract types and remove `any` types.

---

### 2.3 Eko 3.0 Integration Points

**EkoService Architecture:**

```
EkoService (963 lines)
├── Eko instance initialization
├── Agent creation (BrowserAgent + FileAgent + MCP)
├── Tool registration
│   ├── 23 basic browser tools
│   ├── 38 advanced browser tools
│   └── Custom tools from MCP
├── Callback system (stream-based)
├── Checkpoint management (6 methods)
├── Task tracking (Map<taskId, status>)
└── Window isolation via windowContextManager
```

**Concerns:**
1. **Single service instance per window** - Good for isolation but creates per-window overhead
2. **Agent instantiation** - `new BrowserAgent()` called at init, not lazy-loaded
3. **MCP integration** - SimpleSseMcpClient embedded directly (tight coupling)
4. **Checkpoint feature** - Exposed in preload but NOT implemented in handlers (gap!)

---

## 3. COMPONENT-LEVEL ISSUES

### 3.1 UI Component Size Distribution

**Top 10 largest components:**

| Component | Type | Lines | Complexity |
|-----------|------|-------|-----------|
| `src/pages/main.tsx` | Page | 951 | Very High |
| `src/lib/mcpTools.ts` | Library | 915 | High |
| `src/components/ui/agent-plan.tsx` | Component | 739 | High |
| `src/components/ModelConfigBar.tsx` | Component | 600 | High |
| `src/lib/focus-management.ts` | Library | 538 | High |
| `src/models/tts-player/tts-player-native.ts` | Model | 532 | High |
| `src/type.d.ts` | Types | 499 | Medium |
| `src/lib/semantic-html.ts` | Library | 493 | Medium |
| `src/lib/accessibility-testing.ts` | Library | 484 | High |
| `src/components/HistoryPanel.tsx` | Component | 479 | High |

**Issue:** Main.tsx is doing too much:
- Chat message rendering
- Eko stream handling
- Browser/detail view management
- Layout state management
- Multiple event listeners (useEkoStreamHandler × 4 instances in same file)

---

### 3.2 Hook Usage Patterns

**Eko-related hooks (only in main.tsx, 4 instances):**
```
- useEkoStreamHandler()
- useEkoEvents()
- useCheckpointTask()
- useTaskManager()
```

**Pattern Issue:** All hooks concentrated in single page instead of distributed to sub-components.

**Stores Used:**
```typescript
historyStore (35 lines)      → Task history
languageStore (11 lines)     → i18n selection
layoutStore (379 lines)      → Panel layout state
scheduled-task-store (289)   → Scheduled task management
```

**Issue:** `layoutStore` is suspiciously large for simple layout state management.

---

## 4. DEPENDENCY & CIRCULAR DEPENDENCY ANALYSIS

### 4.1 Key Service Dependencies

```
electron/main/services/
├── eko-service.ts (CORE)
│   ├─> browser-tools/ (61 tools)
│   ├─> advanced-browser-tools/ (38 tools)
│   ├─> task-checkpoint.ts
│   ├─> agent-context-manager.ts
│   └─> mcp-client-manager.ts (SimpleSseMcpClient)
├── task-scheduler.ts
│   ├─> eko-service.ts (potential circular!)
│   ├─> task-window-manager.ts
│   └─> task-checkpoint.ts
├── task-window-manager.ts
│   ├─> eko-service.ts (potential circular!)
│   └─> window-context-manager.ts
├── window-context-manager.ts
│   └─> eko-service.ts (mutual dependency)
└── agent-context-manager.ts
    └─> window-context-manager.ts (depends on above)
```

**Circular Dependencies Found:**
1. ❌ **`eko-service.ts` ↔ `task-scheduler.ts`** - Each creates/manages instances of the other
2. ❌ **`task-window-manager.ts` ↔ `eko-service.ts`** - Task manager spawns Eko services
3. ❌ **`window-context-manager.ts` ↔ `eko-service.ts`** - Context manager holds reference to services

**Impact:** Medium - Can cause initialization order issues and harder testing

**Mitigation:** Use dependency injection to break cycles (create `ServiceLocator` or `ContainerService`)

---

### 4.2 Frontend-Backend Communication

**Top IPC Callers (from grep analysis):**
```
window.api.config.saveUserModelConfigs() → 4 calls
window.api.getMcpTools() → 2 calls
window.api.saveAgentConfig() → 2 calls
window.api.getAgentConfig() → 2 calls
window.api.setMcpToolEnabled() → 2 calls
```

**Issue:** No standardized IPC error handling - each caller must handle errors independently.

---

## 5. POTENTIAL BREAKAGE POINTS

### 5.1 🔴 CRITICAL: Unimplemented Checkpoint API

**Preload exposes these methods (lines 42-53):**
```typescript
ekoRunCheckpoint()     // Line 43
ekoPauseTask()         // Line 45
ekoResumeTask()        // Line 47
ekoCheckpointStatus()  // Line 49
ekoListCheckpoints()   // Line 51
ekoDeleteCheckpoint()  // Line 53
```

**Reality Check:**
- ✅ `taskCheckpointManager` exists in `electron/main/services/task-checkpoint.ts`
- ⚠️ BUT these IPC handlers NOT registered in any handler file
- 🔴 **Runtime Error:** If user calls these, will get "No handler for channel"

**Fix Required:** Register checkpoint handlers in `eko-handlers.ts` or create `checkpoint-handlers.ts`

---

### 5.2 ⚠️ Mixed API Access Patterns

**Pattern A (Old style, still used):**
```typescript
window.api.setDetailViewVisible(false)
window.api.hideHistoryView()
window.api.ekoCancelTask()
```

**Pattern B (New namespaced style, lines 121 vs 156 in main.tsx):**
```typescript
window.api.view.setDetailViewVisible(false)
window.api.eko.cancelTask()
```

**Issue:** Both patterns coexist in `main.tsx` → Confusing, maintenance risk

**Status:** Appears to be mid-migration (deprecated API proxy exists in preload lines 6-27)

---

### 5.3 ⚠️ Validation Middleware Coupling

**Issue:** Validation schemas imported from `src/types/ipc-contracts.ts` in `eko-handlers.ts`

```typescript
import {
  EkoRunSchema,
  EkoModifySchema,
  EkoExecuteSchema,
  EkoCancelSchema
} from "../../../src/types/ipc-contracts";  // ⚠️ Main imports from src!
```

**Risk:**
- Hard to build Electron main process independently
- Schema changes require rebuilding main process
- Circular dependency potential with preload layer

**Better Pattern:** Schemas should live in `electron/` layer or shared types

---

### 5.4 📊 Browser Tools Import Order Matters

**In `eko-service.ts` (lines 13-64):** 71 direct imports

```typescript
import {
  browserGetMarkdownTool,
  browserReadLinksTool,
  // ... 21 more imports from browser-tools
} from "./browser-tools";

import {
  extractElementStylesTool,
  // ... 36 more imports from advanced-browser-tools
} from "./advanced-browser-tools";
```

**Issue:**
- All tools loaded into memory at startup
- No lazy-loading for unused tools
- Memory footprint grows as tools added

**Better Pattern:** Tool registry with lazy loading
```typescript
const toolRegistry = {
  'browser_click': () => import('./tools/browser-click'),
  'extract_styles': () => import('./tools/extract-styles'),
  // ...
}
```

---

## 6. SECURITY CONSIDERATIONS

### 6.1 ✅ Strengths

1. **IPC Input Validation:**
   - All handlers use Zod schemas
   - Rate limiting on sensitive endpoints (eko:run limited to 10/second)
   - Window context isolation via windowContextManager

2. **Preload Security:**
   - Proper contextBridge usage
   - No direct Node.js access exposed
   - Type-safe API object

3. **Error Handling:**
   - Centralized error handler with categorization
   - No sensitive data logged by default

### 6.2 ⚠️ Concerns

1. **Checkpoint handlers missing → Could be exploited** (low severity, feature incomplete)
2. **Type casting to `any`** in multiple places defeats security
3. **No CSRF protection** for cross-window IPC (though single-process Electron minimizes this)

---

## 7. MODULAR FILE STRUCTURE RECOMMENDATION

### Phase 1: Core Reorganization (Low Risk)

**Current problematic areas:**

```
src/pages/main.tsx (951 lines) ─X─> Split into:
├── src/pages/main.tsx (entry point only, 100 lines)
├── src/pages/browser-page.tsx (browser + detail view logic)
├── src/pages/chat-page.tsx (chat + stream handling)
└── src/pages/task-detail-page.tsx (task detail rendering)
```

**Modules to create:**

```
electron/main/handlers/        (NEW - consolidate IPC)
├── eko/
│   ├── run-handler.ts
│   ├── modify-handler.ts
│   ├── execute-handler.ts
│   ├── checkpoint-handler.ts  (MISSING - needs implementation)
│   └── index.ts
├── view/
│   ├── bounds-handler.ts
│   ├── navigation-handler.ts
│   └── index.ts
├── config/
│   └── index.ts
└── validation/
    └── schemas.ts            (centralized)

electron/main/services/tools/  (OPTIONAL - lazy-load registry)
├── registry.ts               (tool loader)
├── loader.ts                 (dynamic import wrapper)
└── index.ts
```

### Phase 2: Type Safety Improvements

```
electron/shared/              (NEW - shared types)
├── types/
│   ├── ipc-contracts.ts      (move from src/)
│   ├── eko-types.ts          (Eko-specific types)
│   ├── agent-types.ts        (Agent types)
│   └── index.ts
└── constants/
    └── ipc-channels.ts       (move from electron/constants/)
```

### Phase 3: Dependency Inversion

```
electron/main/container/      (NEW - service locator)
├── service-container.ts      (IOC container)
├── factory.ts                (service factories)
└── providers/
    ├── eko-provider.ts
    ├── task-provider.ts
    └── window-provider.ts
```

---

## 8. DEPENDENCY GRAPH (VISUAL)

### Main Process Dependencies

```
electron/main/index.ts
│
├─> MainWindowManager
│   ├─> EkoService
│   │   ├─> BrowserAgent + FileAgent
│   │   ├─> 61 browser tools
│   │   ├─> TaskCheckpointManager
│   │   ├─> AgentContextManager
│   │   └─> MCPClientManager
│   │
│   ├─> registerAllIpcHandlers()
│   │   ├─> EkoHandlers (eko-service ref)
│   │   ├─> ViewHandlers
│   │   ├─> ConfigHandlers
│   │   ├─> AgentHandlers
│   │   ├─> ContextHandlers
│   │   ├─> MCPHandlers
│   │   ├─> ErrorHandlers
│   │   └─> PerformanceHandlers
│   │
│   └─> TaskWindowManager
│       ├─> EkoService (separate instance)
│       └─> TaskScheduler
│
├─> TaskScheduler
│   ├─> EkoService (ref to main)
│   ├─> TaskWindowManager
│   └─> TaskCheckpointManager
│
└─> ConfigManager (singleton)
    └─> electron-store + env vars
```

### Circular Dependencies Detected

```
⚠️ eko-service ←→ task-scheduler ←→ task-window-manager ←→ window-context-manager
   (each creates/manages others)
```

---

## 9. MIGRATION PLAN (Non-Breaking)

### Week 1-2: Analysis & Planning
- [ ] Create dependency graph visualization
- [ ] Identify all IPC consumers
- [ ] Create feature flags for new structure

### Week 3-4: Type Safety
- [ ] Move `type.d.ts` to shared types module
- [ ] Replace all `any[]` with proper types
- [ ] Create strict API contracts

### Week 5-6: IPC Consolidation
- [ ] Create handler factory pattern
- [ ] Implement checkpoint handlers (critical!)
- [ ] Consolidate validation logic

### Week 7-8: Component Refactoring
- [ ] Split `main.tsx` (with new router)
- [ ] Extract hook logic to sub-pages
- [ ] Test thoroughly

### Week 9-10: Dependency Injection
- [ ] Create service container
- [ ] Break circular dependencies
- [ ] Add unit tests for services

### Week 11-12: Optimization
- [ ] Implement tool lazy-loading
- [ ] Memory profiling
- [ ] Performance testing

---

## 10. PRESERVED FUNCTIONALITY CHECKLIST

**Multi-Agent Browser Automation:** ✅ No changes needed
- BrowserAgent architecture intact
- FileAgent pattern preserved
- Tool system unchanged at core

**File Scheduling:** ✅ No changes needed
- TaskScheduler logic untouched
- Checkpoint system improved (not broken)
- Window isolation maintained

**Eko Workflow Execution:** ✅ Core flow preserved
- Stream callback system stable
- Context transfer logic maintained
- Agent coordination patterns saved

**IPC Communication:** ✅ All channels maintained
- Preload API expanded (not changed)
- Handler registrations consolidated (not removed)
- Window.api contracts honored

**Configuration Management:** ✅ Fully preserved
- Model configs still stored in electron-store
- API key hierarchy respected
- Language i18n untouched

---

## 11. ISSUES SUMMARY TABLE

| ID | Category | Severity | Issue | Impact | Fix Effort |
|:--:|----------|:--------:|-------|--------|:----------:|
| C1 | Checkpoint API | 🔴 Critical | Missing IPC handlers for checkpoint methods | Runtime errors on use | 2 hours |
| A1 | Architecture | 🟠 High | Circular dependencies in service layer | Testing difficulty | 12 hours |
| A2 | Architecture | 🟠 High | main.tsx too large (951 lines) | Unmaintainable | 16 hours |
| A3 | Architecture | 🟡 Medium | Mixed API access patterns | Migration confusion | 4 hours |
| T1 | Type Safety | 🟡 Medium | `any[]` types in eko-service | Less type safety | 3 hours |
| T2 | Type Safety | 🟡 Medium | Type casting with `any` in components | Unsafe code | 4 hours |
| O1 | Organization | 🟡 Medium | 71 tool imports in eko-service | Memory overhead | 8 hours |
| O2 | Organization | 🟡 Medium | Validation schemas in src/ | Build complexity | 2 hours |
| O3 | Organization | 🟢 Low | MCP client tightly coupled | Harder to test | 6 hours |
| O4 | Organization | 🟢 Low | IPC handlers scattered | Maintenance | 4 hours |

**Total Remediation Time (Low Risk):** ~60 hours spread over 3 months

---

## 12. RECOMMENDATIONS PRIORITY

### 🔴 P0 - Do First (Blocks functionality)
1. Implement missing checkpoint IPC handlers
2. Test checkpoint API end-to-end

### 🟠 P1 - Do Next (Stability)
3. Fix circular dependencies using DI pattern
4. Replace `any` types with proper interfaces
5. Consolidate IPC validation (1 source of truth)

### 🟡 P2 - Improve Later (Maintainability)
6. Split main.tsx into feature-based components
7. Move IPC contracts to shared layer
8. Implement tool lazy-loading registry

### 🟢 P3 - Nice to Have (Polish)
9. Unify API access patterns (deprecate old style)
10. Standardize error handling across IPC
11. Extract layoutStore complexity into separate services

---

## CONCLUSION

**The codebase is production-ready and well-architected.** The issues identified are mostly organizational rather than fundamental flaws. The recommendations focus on:

1. **Completing missing features** (checkpoint handlers)
2. **Improving maintainability** (component splitting, DI)
3. **Enhancing type safety** (replacing `any` types)
4. **Reducing duplication** (validation consolidation)

**All improvements are non-breaking and can be implemented incrementally.** The preservation of multi-agent automation, file scheduling, and Eko workflow execution is guaranteed by the modular structure.

**Recommendation:** Prioritize checkpoint implementation (P0) first, then tackle circular dependencies (P1) using a service container pattern. These two changes will unlock the most value with minimal risk.
