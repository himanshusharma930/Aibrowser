# Detailed Dependencies Graph & Circular Dependencies

## 1. SERVICE LAYER DEPENDENCY MAP

### Core Services

```
CONFIG MANAGER (Singleton)
├── Initializes: electron-store
├── Loads: .env variables
├── Provides: Model configs, API keys, app settings
└── Used by: EkoService, IPC Handlers, UI

EKO SERVICE (Per-Window Instance)
├── Initializes with: mainWindow, detailView
├── Creates: BrowserAgent, FileAgent
├── Loads: 61 browser tools + MCP client
├── Manages: Task execution, streams, checkpoints
├── Depends on:
│   ├── ConfigManager (for model selection)
│   ├── TaskCheckpointManager (for pause/resume)
│   ├── AgentContextManager (for state transfer)
│   ├── MCPClientManager (for external tools)
│   ├── WindowContextManager (for context isolation)
│   └── 61 browser/advanced tools (direct imports)
└── Used by: IPC handlers (eko:run, modify, execute)

TASK CHECKPOINT MANAGER (Singleton)
├── Manages: Task snapshots, pause/resume
├── Stores: Checkpoints in memory + disk
├── Provides: Recovery points for long-running tasks
├── Methods: createCheckpoint, loadCheckpoint, deleteCheckpoint
└── Used by: EkoService, TaskScheduler

AGENT CONTEXT MANAGER (Singleton)
├── Tracks: Multi-agent state per window
├── Manages: Context transfers between agents
├── Maintains: Global variables, session state
├── Limits: 50MB per window, 24hr TTL, 1000 transfers max
└── Used by: EkoService, Agent handoff logic

MCP CLIENT MANAGER (Singleton)
├── Initializes: SimpleSseMcpClient
├── Manages: MCP server connection (port 5000)
├── Provides: Dynamic tool discovery
├── Handles: Tool registration, callback routing
└── Used by: EkoService agents

TASK SCHEDULER (Singleton)
├── Manages: Recurring scheduled tasks
├── Creates: Background task windows
├── Depends on:
│   ├── EkoService (spawned per task)
│   ├── TaskWindowManager (for window creation)
│   ├── TaskCheckpointManager (for recovery)
│   └── ConfigManager (for timing config)
└── Triggered by: App startup + user actions

TASK WINDOW MANAGER (Singleton)
├── Creates: Separate BrowserWindow for background tasks
├── Isolates: Task execution from main window
├── Depends on:
│   ├── EkoService (new instance per task)
│   ├── WindowContextManager (for state tracking)
│   └── ConfigManager (for window config)
└── Used by: TaskScheduler

WINDOW CONTEXT MANAGER (Singleton)
├── Tracks: Per-window contexts
├── Maps: windowId → EkoService instance
├── Manages: Window lifecycle
├── Prevents: Cross-window state leakage
└── Used by: All window-aware handlers
```

---

## 2. CIRCULAR DEPENDENCY ANALYSIS

### Detected Cycles

#### 🔴 CYCLE 1: Task Execution Pipeline

```
eko-service.ts (963 lines)
    ↓ creates tasks
task-scheduler.ts (499 lines)
    ↓ spawns windows
task-window-manager.ts (374 lines)
    ↓ requests context
window-context-manager.ts (part of index.ts)
    ↓ returns reference to
eko-service.ts ← CYCLE BACK
```

**Why It Forms:**
- EkoService manages task execution
- TaskScheduler orchestrates multiple tasks
- TaskWindowManager creates new windows
- WindowContextManager tracks which window has which EkoService
- To create a new task, we need the EkoService reference

**Current Implementation:**
```typescript
// In task-scheduler.ts
async executeScheduledTask(taskId) {
  const window = await taskWindowManager.createWindow();
  const context = windowContextManager.getContext(window.id);
  context.ekoService = new EkoService(window, detailView);
  await context.ekoService.run(task);
}

// In eko-service.ts constructor
constructor(mainWindow, detailView) {
  this.taskScheduler?.registerTask(this); // Circular reference!
}
```

**Impact:** Medium
- Hard to test in isolation
- Initialization order matters
- Can't easily mock services

**Breaking Risk:** Low (runtime works, but fragile)

---

#### 🔴 CYCLE 2: Context & Agent State

```
agent-context-manager.ts
    ↓ manages state for
eko-service.ts
    ↓ creates agents with
agent-context-manager.ts ← CYCLE
```

**Why It Forms:**
- AgentContextManager holds per-window state
- EkoService needs AgentContextManager to transfer context
- AgentContextManager calls back to EkoService for agent info

**Current Code Pattern:**
```typescript
// In eko-service.ts line 102
const agentContext = agentContextManager.getContext(windowId);
agentContext.onAgentTransfer = (context) => {
  this.handleContextTransfer(context); // Callback to self
}

// In agent-context-manager.ts
updateAgentState(windowId, agentName, state) {
  // ... updates state
  // Needs to know if transfer should trigger new Eko run
}
```

**Impact:** Low (not actual cycle in dependency order)
- More of a callback pattern than true cycle
- Works because callbacks are async

---

#### 🟡 CYCLE 3: IPC Handler Interdependencies

```
eko-handlers.ts
    ↓ calls
eko-service.ts
    ↓ emits events via IPC that go to
view-handlers.ts (potentially)
    ↓ which might call back to
eko-handlers.ts
```

**Why It Forms:**
- Eko handlers invoke EkoService
- EkoService streams results via IPC
- UI can trigger new IPC calls based on stream events

**Impact:** Low (async event-driven, not initialization)
- Only happens at runtime during user interaction
- Event loop naturally handles ordering

---

## 3. IMPORT ANALYSIS

### Heaviest Import Consumers

**EkoService (71 total imports):**
```typescript
// Browser tools (23 imports)
import {
  browserGetMarkdownTool,
  browserReadLinksTool,
  // ... 21 more tools at lines 14-32
} from "./browser-tools";

// Advanced tools (38 imports)
import {
  extractElementStylesTool,
  extractElementStructureTool,
  // ... 36 more tools at lines 36-64
} from "./advanced-browser-tools";

// Core dependencies (10 imports)
import { Eko, Log, SimpleSseMcpClient } from "@jarvis-agent/core";
import { BrowserAgent, FileAgent } from "@jarvis-agent/electron";
import { ConfigManager } from "../utils/config-manager";
import { taskCheckpointManager } from "./task-checkpoint";
import { agentContextManager } from "./agent-context-manager";
// etc.
```

**Issue:** All tools loaded at module load time
- Memory: ~61 tools × ~50KB average = ~3MB+ in memory
- Load time: ~200ms extra startup
- Unused tools if task only needs 5 tools

**Better Pattern (lazy loading):**
```typescript
// Tool registry - load on demand
const toolRegistry: Record<string, () => Promise<Tool>> = {
  'browser_markdown': () => import('./browser-tools/browser-get-markdown'),
  'browser_read_links': () => import('./browser-tools/browser-read-links'),
  // ... etc
}

async function loadTool(toolName: string): Promise<Tool> {
  const module = await toolRegistry[toolName]();
  return module.default;
}
```

---

### IPC Handler Imports (2,716 total lines)

**Pattern across all handlers:**

| Handler | Imports | Dependencies |
|---------|---------|--------------|
| eko-handlers.ts | 10 | EkoService, validation, logging |
| view-handlers.ts | 8 | windowContextManager, view creation |
| config-handlers.ts | 7 | ConfigManager, validation |
| agent-handlers.ts | 6 | ConfigManager, AgentContextManager |
| validation-middleware.ts | 5 | Zod, custom validators |

**Duplication:** Each handler independently:
```typescript
import { ipcMain } from "electron";
import { windowContextManager } from "...";
import { createLogger } from "../utils/logger";
```

**Could be centralized:**
```typescript
// handlers/base-handler.ts
export class BaseHandler {
  protected logger = createLogger(this.name);
  protected context = windowContextManager;

  protected validateInput(data, schema) { /* */ }
  protected sendError(event, error) { /* */ }
}

// handlers/eko-handler.ts
export class EkoHandler extends BaseHandler {
  @validate(EkoRunSchema)
  async handleRun(event, data) { /* */ }
}
```

---

## 4. SHARED STATE BOTTLENECKS

### ConfigManager (Shared Singleton)

```typescript
ConfigManager.getInstance()
├── Reads: .env files + electron-store
├── Serves: Model configs to EkoService
├── Serves: API keys to UI + IPC handlers
├── Serves: App settings globally
└── Potential Issue: Single point of failure
```

**Usage Pattern (6+ locations):**
```
1. electron/main/index.ts - Initial config load
2. electron/main/services/eko-service.ts - Model selection
3. electron/main/ipc/config-handlers.ts - Config API
4. electron/main/utils/auto-update.ts - Version checking
5. UI (via IPC) - Model/API key display
6. TaskScheduler - Task timing config
```

**Risk:** Config changes not immediately reflected in:
- Already-running EkoService instances
- UI that caches config locally

---

### WindowContextManager (Shared Singleton)

```typescript
windowContextManager
├── Tracks: All active window contexts
├── Maps: windowId → { ekoService, contextId, ... }
├── Used by: All IPC handlers + TaskScheduler
└── Potential Issue: Memory not cleaned on window close
```

**Cleanup Risk:**
```typescript
// When window closes:
BrowserWindow.on('closed', () => {
  // Need to call: windowContextManager.removeContext(windowId)
  // Is this being done? Check index.ts...
})
```

Check: Verify cleanup logic exists in main-window.ts

---

## 5. UNUSED CODE / DEAD IMPORTS

### Preload Exports Not Implemented

**In `electron/preload/index.ts` lines 42-53:**
```typescript
ekoRunCheckpoint: (prompt, options?) =>
  ipcRenderer.invoke('eko:run-checkpoint', { prompt, ...options }),
ekoPauseTask: (taskId) =>
  ipcRenderer.invoke('eko:pause-task', { taskId }),
ekoResumeTask: (taskId) =>
  ipcRenderer.invoke('eko:resume-task', { taskId }),
ekoCheckpointStatus: (taskId) =>
  ipcRenderer.invoke('eko:checkpoint-status', { taskId }),
ekoListCheckpoints: () =>
  ipcRenderer.invoke('eko:list-checkpoints'),
ekoDeleteCheckpoint: (taskId) =>
  ipcRenderer.invoke('eko:delete-checkpoint', { taskId }),
```

**Handler Status:**
- ❌ `eko:run-checkpoint` - NOT in eko-handlers.ts
- ❌ `eko:pause-task` - NOT in eko-handlers.ts
- ❌ `eko:resume-task` - NOT in eko-handlers.ts
- ❌ `eko:checkpoint-status` - NOT in eko-handlers.ts
- ❌ `eko:list-checkpoints` - NOT in eko-handlers.ts
- ❌ `eko:delete-checkpoint` - NOT in eko-handlers.ts

**Result:** Calling these from UI will throw "No handler for IPC message"

---

### Deprecated API Pattern

**In `electron/preload/index.ts` lines 6-27:**
```typescript
function createDeprecatedAPIProxy<T extends Record<string, any>>(
  api: any,
  mappings: Record<keyof T, { namespace: string; method: string }>
): T {
  // Creates backward-compatible wrappers
  // E.g., api.setDetailViewVisible → api.view.setDetailViewVisible
}
```

**Usage:** Creates mapping for old API style
- ✅ Good for backward compatibility
- ⚠️ But old style still used in main.tsx (line 121, 123, etc.)
- ⚠️ Indicates incomplete migration

---

## 6. MISSING HANDLER IMPLEMENTATION DETAIL

### What Checkpoint Handlers SHOULD Look Like

```typescript
// Should exist in electron/main/ipc/checkpoint-handlers.ts

export function registerCheckpointHandlers() {
  // Run with checkpoint support
  ipcMain.handle('eko:run-checkpoint',
    validateIpc(EkoRunCheckpointSchema)(
      async (event, data) => {
        const context = windowContextManager.getContext(event.sender.id);
        return await context.ekoService.runWithCheckpoint(
          data.prompt,
          data.checkpointInterval,
          data.agents
        );
      }
    )
  );

  // Pause task at next checkpoint
  ipcMain.handle('eko:pause-task',
    validateIpc(EkoPauseSchema)(
      async (event, data) => {
        const checkpoint = await taskCheckpointManager.pauseTask(data.taskId);
        return checkpoint;
      }
    )
  );

  // Resume from checkpoint
  ipcMain.handle('eko:resume-task',
    validateIpc(EkoResumeSchema)(
      async (event, data) => {
        const context = windowContextManager.getContext(event.sender.id);
        return await context.ekoService.resumeFromCheckpoint(data.taskId);
      }
    )
  );

  // Get checkpoint status
  ipcMain.handle('eko:checkpoint-status',
    validateIpc(EkoStatusSchema)(
      async (event, data) => {
        return await taskCheckpointManager.getCheckpointStatus(data.taskId);
      }
    )
  );

  // List all checkpoints
  ipcMain.handle('eko:list-checkpoints',
    async (event) => {
      return await taskCheckpointManager.listCheckpoints();
    }
  );

  // Delete checkpoint
  ipcMain.handle('eko:delete-checkpoint',
    validateIpc(EkoDeleteSchema)(
      async (event, data) => {
        await taskCheckpointManager.deleteCheckpoint(data.taskId);
        return { success: true };
      }
    )
  );
}
```

---

## 7. INTER-MODULE COMMUNICATION FLOW

### Happy Path: User Task Execution

```
1. UI (main.tsx)
   └─> window.api.eko.run("Search Google")

2. Preload (electron/preload/index.ts)
   └─> ipcRenderer.invoke('eko:run', { message: "..." })

3. Main Process (electron/main/ipc/eko-handlers.ts)
   └─> Gets windowContext from windowContextManager
   └─> Calls context.ekoService.run(message)

4. EkoService (electron/main/services/eko-service.ts)
   └─> Initializes Eko instance with agents
   └─> Registers 61 tools
   └─> Creates callback handler
   └─> Calls eko.run(message)

5. Eko Framework (from @jarvis-agent/core)
   └─> Generates workflow XML
   └─> Executes nodes
   └─> Calls tools via agent
   └─> Streams results via callback

6. EkoService Callback
   └─> Emits 'eko-stream-message' IPC event

7. UI Hook (useEkoStreamHandler)
   └─> Listens to stream via ipcRenderer.on()
   └─> Updates UI state
   └─> Renders messages/tool results

8. User sees task progress in real-time
```

### Error Path: Missing Handler

```
1. UI calls: window.api.eko.ekoRunCheckpoint(...)

2. Preload sends: ipcRenderer.invoke('eko:run-checkpoint', ...)

3. Main process looks for handler
   └─> Checks eko-handlers.ts ← NOT FOUND
   └─> Checks all registered handlers ← NOT FOUND
   └─> Returns error: "No handler for channel 'eko:run-checkpoint'"

4. UI Promise rejects with error

5. User sees "Error: No handler for IPC channel"
```

---

## 8. MEMORY & PERFORMANCE IMPLICATIONS

### Tool Loading Memory Cost

**Scenario: App starts, user opens 3 tabs**

```
Tab 1: EkoService instance 1
├─> Loads 61 tools (all into memory)
├─> Creates BrowserAgent
├─> Creates FileAgent
└─> Memory: ~10-15MB

Tab 2: EkoService instance 2
├─> Loads 61 tools again (separate module instances)
├─> Creates BrowserAgent
├─> Creates FileAgent
└─> Memory: ~10-15MB

Tab 3: EkoService instance 3
├─> Loads 61 tools again (separate module instances)
├─> Creates BrowserAgent
├─> Creates FileAgent
└─> Memory: ~10-15MB

TOTAL: ~30-45MB just for tool modules
```

**With Lazy Loading (hypothetical):**
```
Tab 1: EkoService + registry
├─> Loads only tools used (e.g., 5 tools)
├─> Memory: ~2-3MB

Tab 2: EkoService + registry
├─> Shared tool modules (already loaded)
├─> Memory: +2-3MB

Tab 3: EkoService + registry
├─> Shared tool modules (already loaded)
├─> Memory: +2-3MB

TOTAL: ~6-9MB (75% reduction!)
```

---

## 9. REFACTORING DEPENDENCY INJECTION PATTERN

### Current Service Creation

```typescript
// In electron/main/index.ts
const detailView = createView(...);
const ekoService = new EkoService(mainWindow, detailView);
const taskScheduler = new TaskScheduler(ekoService);
// Order matters! Can't instantiate scheduler before service
```

### Proposed DI Container

```typescript
// electron/main/container.ts
export class ServiceContainer {
  private services = new Map();

  register<T>(token: Token<T>, factory: () => T) {
    this.services.set(token.name, factory);
  }

  get<T>(token: Token<T>): T {
    const factory = this.services.get(token.name);
    if (!factory) throw new Error(`Service ${token.name} not registered`);
    return factory();
  }
}

// Tokens
export const tokens = {
  ConfigManager: { name: 'ConfigManager' },
  TaskCheckpointManager: { name: 'TaskCheckpointManager' },
  WindowContextManager: { name: 'WindowContextManager' },
  EkoService: { name: 'EkoService' },
  TaskScheduler: { name: 'TaskScheduler' },
} as const;

// Registration (in main/index.ts)
const container = new ServiceContainer();
container.register(tokens.ConfigManager, () => ConfigManager.getInstance());
container.register(tokens.TaskCheckpointManager, () => taskCheckpointManager);
container.register(tokens.WindowContextManager, () => windowContextManager);
container.register(tokens.EkoService, () =>
  new EkoService(mainWindow, detailView)
);
container.register(tokens.TaskScheduler, () =>
  new TaskScheduler(
    container.get(tokens.EkoService),
    container.get(tokens.TaskCheckpointManager)
  )
);

// Usage (breaks all circular dependencies)
const ekoService = container.get(tokens.EkoService);
const taskScheduler = container.get(tokens.TaskScheduler);
```

---

## SUMMARY TABLE

| Issue | Type | Files | Severity | Fix Time |
|-------|------|-------|----------|----------|
| Circular: eko ↔ scheduler ↔ window | Arch | 3 | 🟠 High | 4h |
| Missing checkpoint handlers | Bug | 1 | 🔴 Critical | 2h |
| 71 tool imports at once | Perf | 1 | 🟡 Medium | 8h |
| Mixed API access patterns | Maint | 2 | 🟡 Medium | 2h |
| Validation duplication | Code | 8 | 🟢 Low | 4h |
| `any[]` type issues | Type | 2 | 🟡 Medium | 2h |
| Preload/main schema imports | Build | 2 | 🟡 Medium | 2h |
| Main.tsx too large | Maint | 1 | 🟡 Medium | 8h |

**Total: ~32 hours of engineering work across 3 phases**
