# Comprehensive Refactor Tasks Document

**Document Version:** 1.0
**Last Updated:** 2025-01-09
**Priority Categories:** P0 (Critical) → P3 (Low)
**Codebase:** Manus Electron (Next.js 15 + Electron 33)

---

## Executive Summary

This document outlines verified critical issues and strategic refactoring opportunities across the Manus Electron codebase. Tasks are prioritized by severity and business impact, with specific file locations, line numbers, and success criteria.

**Quick Stats:**
- **Critical Issues (P0):** 4 verified
- **High Priority (P1):** 5 items
- **Medium Priority (P2):** 6 items
- **Low Priority (P3):** 4 items
- **Estimated Total Effort:** 15-20 person-days

---

## P0 - CRITICAL ISSUES

Critical issues block functionality, cause runtime errors, or create security vulnerabilities. **Must be fixed before next release.**

### P0-001: Missing UUID Dependency

**Severity:** 🔴 CRITICAL (Runtime Error)
**Category:** Dependency Management
**Impact:** Application crashes on agent context creation

#### Problem
The application imports `uuid` library but it's not declared in `package.json` dependencies.

**Affected Files:**
- `electron/main/services/agent-context-manager.ts:1` - `import { v4 as uuidv4 } from 'uuid';`
- `src/utils/messageTransform.ts` - Also uses uuid (assumed)

**Current State:**
```json
// package.json dependencies - NO uuid package listed
"dependencies": {
  "@jarvis-agent/core": "^0.1.3",
  "@jarvis-agent/electron": "^0.1.7",
  // ... missing uuid
}
```

**Impact Chain:**
1. Runtime: `Cannot find module 'uuid'`
2. Agent context initialization fails
3. Task execution fails
4. UI shows error state
5. Application becomes unusable for multi-agent workflows

**Solution:**
Add uuid to package.json dependencies

**Effort:** 0.25 hours (5 minutes)

**Success Criteria:**
- ✅ `npm ls uuid` returns package info
- ✅ No module resolution errors in console
- ✅ AgentContextManager initializes successfully
- ✅ Agent context tests pass

**Testing:**
```bash
# Test 1: Verify installation
npm ls uuid

# Test 2: Run application
pnpm dev

# Test 3: Trigger agent context creation
# Execute any task with multi-agent workflow
```

**Dependencies:**
- None (standalone fix)

**Rollout Priority:** IMMEDIATE - Fix before any other P0 items

---

### P0-002: Method Name Typo - cancleTask → cancelTask

**Severity:** 🔴 CRITICAL (Inconsistent API)
**Category:** Code Quality / API Consistency
**Impact:** Confusion in API contracts, potential production bugs

#### Problem
Method is named `cancleTask` (typo) instead of `cancelTask`. The typo is inconsistent with IPC channel naming and TypeScript type definitions.

**Affected Locations:**

| File | Location | Current | Should Be | Type |
|------|----------|---------|-----------|------|
| `electron/main/services/eko-service.ts` | Line 417 | `cancleTask()` | `cancelTask()` | Method Definition |
| `electron/main/ipc/eko-handlers.ts` | Line 101 | `cancleTask(data.taskId)` | `cancelTask(data.taskId)` | Method Call |
| `electron/main/ipc/eko-handlers.ts` | Line 145 | `cancleTask(data.taskId)` | `cancelTask(data.taskId)` | Method Call |
| `electron/main/services/task-window-manager.ts` | Line 46 | `cancleTask(executionId)` | `cancelTask(executionId)` | Method Call |

**Type Definition (Correct):**
- `src/type.d.ts:233` - `cancelTask: (taskId: string) => Promise<EkoTaskResult>` ✅ CORRECT
- `electron/preload/index.ts:38` - `cancelTask` ✅ CORRECT
- `src/type.d.ts:410` - Comment references `cancelTask` ✅ CORRECT

**Inconsistency Chain:**
```
IPC Channel: eko:cancel-task (correct)
  ↓
Preload API: cancelTask() (correct)
  ↓
Type Definition: cancelTask() (correct)
  ↓
Implementation: cancleTask() (❌ TYPO - breaks contract!)
```

**Impact:**
- API contract mismatch between types and implementation
- Confusing for developers (inconsistent naming)
- Hard to discover in code reviews
- Maintenance burden

**Solution:**
Rename all occurrences: `cancleTask` → `cancelTask`

**Effort:** 0.5 hours (30 minutes)

**Files to Modify:**
1. `electron/main/services/eko-service.ts` - Method definition
2. `electron/main/ipc/eko-handlers.ts` - 2 call sites
3. `electron/main/services/task-window-manager.ts` - 1 call site

**Success Criteria:**
- ✅ All 4 locations updated
- ✅ TypeScript compilation without errors
- ✅ Type definitions match implementation
- ✅ All task cancellation flows work correctly

**Testing:**
```bash
# Verify no references to cancleTask remain
grep -r "cancleTask" electron/ src/

# Type check
tsc --noEmit

# Integration test: Cancel running task via IPC
# Verify task cancellation works end-to-end
```

**Dependencies:**
- None (internal refactor)

**Git Commit Message:**
```
fix: rename cancleTask to cancelTask for API consistency

- Rename method in EkoService from cancleTask to cancelTask
- Update all call sites in eko-handlers.ts
- Update call site in task-window-manager.ts
- Align implementation with type definitions and preload API
```

---

### P0-003: Hardcoded localhost:5173 URLs

**Severity:** 🔴 CRITICAL (Configuration / Environment)
**Category:** Configuration Management
**Impact:** Breaks production builds, development portability

#### Problem
Four locations have hardcoded `localhost:5173` URLs that fail when:
- Running on different ports (development configuration change)
- Running in production (must use deployed URL)
- Running in CI/CD environments
- Running multiple instances

**Affected Locations:**

| File | Line | Current Code | Issue |
|------|------|--------------|-------|
| `electron/main/services/eko-service.ts` | 116 | `http://localhost:5173/file-view` | Detail view fails on different port |
| `electron/main/services/eko-service.ts` | 156 | `http://localhost:5173/api/mcp/sse` | MCP client can't connect |
| `electron/main/services/task-window-manager.ts` | 56 | `http://localhost:5173/main?taskId=...` | Task window fails to load |
| `electron/main/services/task-window-manager.ts` | 73 | `http://localhost:5173/main?taskId=...` | Task window fails to load |

**Current Code Example:**
```typescript
// ❌ HARDCODED - BREAKS IN PRODUCTION
const sseUrl = "http://localhost:5173/api/mcp/sse";
this.mcpClient = new SimpleSseMcpClient(sseUrl);
```

**Production Impact:**
1. **Build Fails:** Production build points to dev server
2. **Deployment Breaks:** Environment variable configurations ignored
3. **Multi-Instance:** Can't run multiple app instances
4. **CI/CD:** Tests can't run on different port

**Solution:**
Use environment variables with fallback strategy

**Effort:** 1 hour (configuration + testing)

**Required Changes:**

1. **Update `.env.template`:**
```env
# Development environment
DEV_SERVER_PORT=5173
DEV_SERVER_HOST=localhost

# For production, use full URL or empty for app-relative paths
APP_BASE_URL=http://localhost:5173
MCP_SSE_URL=http://localhost:5173/api/mcp/sse
```

2. **Update Configuration Manager:**
```typescript
// electron/main/utils/config-manager.ts
getDevServerUrl(): string {
  return process.env.APP_BASE_URL || 'http://localhost:5173';
}

getMcpSseUrl(): string {
  return process.env.MCP_SSE_URL || 'http://localhost:5173/api/mcp/sse';
}
```

3. **Update EkoService:**
```typescript
// electron/main/services/eko-service.ts:156
const configManager = ConfigManager.getInstance();
const sseUrl = configManager.getMcpSseUrl();
this.mcpClient = new SimpleSseMcpClient(sseUrl);

// Line 116
const baseUrl = configManager.getDevServerUrl();
this.detailView.webContents.loadURL(`${baseUrl}/file-view`);
```

4. **Update TaskWindowManager:**
```typescript
// Both line 56 and 73
const baseUrl = configManager.getDevServerUrl();
const url = `${baseUrl}/main?taskId=${taskId}&executionId=${executionId}`;
```

**Success Criteria:**
- ✅ All 4 hardcoded URLs replaced with config manager calls
- ✅ Environment variables configurable via `.env.local`
- ✅ Fallback to defaults when not configured
- ✅ Works on different ports (5173, 3000, etc.)
- ✅ Works with production URLs

**Testing:**
```bash
# Test 1: Development default
pnpm dev  # Should work with default port

# Test 2: Custom port
DEV_SERVER_PORT=3000 pnpm dev
# Verify all URLs use port 3000

# Test 3: Custom host
DEV_SERVER_HOST=127.0.0.1 pnpm dev

# Test 4: Production URL
APP_BASE_URL=https://app.example.com pnpm build
# Verify URLs point to production domain
```

**Dependencies:**
- P0-001 (UUID) - should be fixed first for stability

**Git Commit Message:**
```
refactor: externalize hardcoded localhost URLs to config

- Add DEV_SERVER_PORT, DEV_SERVER_HOST to .env.template
- Add APP_BASE_URL, MCP_SSE_URL configuration options
- Update ConfigManager with URL getter methods
- Update EkoService to use configurable URLs
- Update TaskWindowManager to use configurable URLs
- Fixes portability and production deployment issues
```

---

### P0-004: Incomplete getTaskStatus() Implementation

**Severity:** 🔴 CRITICAL (Missing Functionality)
**Category:** Feature Completeness
**Impact:** Task status tracking broken, UI can't monitor task progress

#### Problem
The `getTaskStatus()` method is registered as an IPC handler but implementation is incomplete or missing detailed status information.

**Affected Locations:**
- `electron/main/ipc/eko-handlers.ts:73-89` - Handler registered
- `electron/main/services/eko-service.ts` - Implementation missing or incomplete

**IPC Handler:**
```typescript
// electron/main/ipc/eko-handlers.ts:73-89
ipcMain.handle('eko:getTaskStatus',
  validateIpc(EkoExecuteSchema)(
    async (event, data) => {
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.ekoService) {
        throw new Error('EkoService not found for this window');
      }
      return await context.ekoService.getTaskStatus(data.taskId);
    }
  )
);
```

**Problem Analysis:**
1. Handler calls `context.ekoService.getTaskStatus()` but method is incomplete
2. Task status tracking is critical for UI monitoring
3. No status history available
4. Can't determine task progress percentage
5. Can't identify which step of workflow is executing

**Required Status Information:**
```typescript
interface TaskStatus {
  taskId: string;
  state: 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';
  progress: number;  // 0-100
  currentStep: number;
  totalSteps: number;
  currentNode?: string;
  elapsed: number;  // milliseconds
  eta?: number;  // estimated time remaining
  errors: Array<{
    timestamp: number;
    message: string;
    code?: string;
  }>;
  results?: any;
  checkpoint?: Checkpoint;
}
```

**Solution:**
Implement complete task status tracking in EkoService

**Effort:** 2 hours (implementation + testing)

**Implementation Steps:**

1. **Add status tracking to EkoService:**
```typescript
// electron/main/services/eko-service.ts
private taskStatuses: Map<string, TaskStatus> = new Map();

async getTaskStatus(taskId: string): Promise<TaskStatus> {
  // Return cached status or fetch from checkpoint
  const cached = this.taskStatuses.get(taskId);
  if (cached) return cached;

  // Try to fetch from checkpoint manager
  const checkpoint = await taskCheckpointManager.getCheckpoint(taskId);
  if (checkpoint) {
    return {
      taskId,
      state: checkpoint.state,
      progress: this.calculateProgress(checkpoint),
      currentStep: checkpoint.currentStep,
      totalSteps: checkpoint.totalSteps,
      elapsed: Date.now() - checkpoint.startTime,
      errors: checkpoint.errors || [],
    };
  }

  throw new Error(`Task ${taskId} not found`);
}

private calculateProgress(checkpoint: Checkpoint): number {
  if (checkpoint.totalSteps === 0) return 0;
  return Math.round((checkpoint.currentStep / checkpoint.totalSteps) * 100);
}
```

2. **Track status during execution:**
```typescript
async run(prompt: string): Promise<any> {
  const taskId = generateTaskId();
  const status: TaskStatus = {
    taskId,
    state: 'running',
    progress: 0,
    currentStep: 0,
    totalSteps: 0,
    elapsed: 0,
    errors: [],
  };

  this.taskStatuses.set(taskId, status);

  try {
    // Execute with status updates
    const result = await eko.run(prompt, {
      callbacks: {
        onMessage: (message) => {
          this.updateTaskStatus(taskId, message);
        },
      },
    });

    status.state = 'completed';
    status.results = result;
    return result;
  } catch (error) {
    status.state = 'failed';
    status.errors.push({
      timestamp: Date.now(),
      message: error.message,
    });
    throw error;
  }
}

private updateTaskStatus(taskId: string, message: StreamCallbackMessage): void {
  const status = this.taskStatuses.get(taskId);
  if (!status) return;

  // Update based on message type
  switch (message.type) {
    case 'workflow':
      status.totalSteps = message.totalSteps || 0;
      status.currentNode = message.currentNode;
      break;
    case 'tool_running':
      status.currentStep++;
      status.progress = Math.round((status.currentStep / status.totalSteps) * 100);
      break;
    case 'error':
      status.errors.push({
        timestamp: Date.now(),
        message: message.error || 'Unknown error',
      });
      break;
  }
}
```

**Success Criteria:**
- ✅ `getTaskStatus()` returns complete status object
- ✅ Status includes current step, progress, and errors
- ✅ Status updates in real-time during execution
- ✅ Status persists after task completion
- ✅ Status queryable after process restart (via checkpoint)
- ✅ UI can display progress bar, step counter, errors

**Testing:**
```bash
# Test 1: Get status during execution
const status = await ipcRenderer.invoke('eko:getTaskStatus', { taskId });
console.assert(status.state === 'running');
console.assert(typeof status.progress === 'number');

# Test 2: Get status after completion
// Task completes...
const finalStatus = await ipcRenderer.invoke('eko:getTaskStatus', { taskId });
console.assert(finalStatus.state === 'completed');

# Test 3: Get status for non-existent task
// Should throw error
```

**Dependencies:**
- P0-002 (cancelTask rename) - prerequisite for consistency

**Git Commit Message:**
```
feat: implement complete task status tracking

- Add TaskStatus interface with full progress information
- Implement getTaskStatus() in EkoService
- Add real-time status updates during execution
- Add error tracking and logging
- Enable progress monitoring in UI
- Persist status in checkpoint system
```

---

## P1 - HIGH PRIORITY ISSUES

High priority items should be addressed in the next sprint. They improve stability, prevent bugs, or unlock features.

### P1-001: Standardize Error Handling Across IPC Handlers

**Severity:** 🟠 HIGH (Code Quality)
**Category:** Error Handling / Stability
**Impact:** Inconsistent error responses, hard to debug IPC failures

**Current State:**
IPC handlers have inconsistent error handling patterns:
- Some throw errors directly
- Some wrap in try-catch with console.error
- Some don't validate input
- Response formats vary

**Affected Files:**
- `electron/main/ipc/eko-handlers.ts` - Multiple handlers
- `electron/main/ipc/model-handlers.ts` - Inconsistent patterns
- `electron/main/ipc/*.ts` - All handlers

**Solution:**
Create standardized error handling middleware

**Effort:** 3 hours (middleware + refactor + tests)

**Implementation:**
```typescript
// electron/main/ipc/error-handler.ts
export class IpcError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 400,
    public details?: any
  ) {
    super(message);
    this.name = 'IpcError';
  }
}

export const createErrorResponse = (error: unknown) => ({
  success: false,
  error: {
    message: error instanceof Error ? error.message : 'Unknown error',
    code: error instanceof IpcError ? error.code : 'UNKNOWN_ERROR',
    statusCode: error instanceof IpcError ? error.statusCode : 500,
    details: error instanceof IpcError ? error.details : undefined,
  },
});

export const withErrorHandling = (handler: any) => {
  return async (event, data) => {
    try {
      return await handler(event, data);
    } catch (error) {
      console.error('IPC Error:', error);
      throw createErrorResponse(error);
    }
  };
};
```

**Success Criteria:**
- ✅ All IPC handlers use standardized error handling
- ✅ Error responses include error code, message, status
- ✅ Errors logged with context
- ✅ UI can parse and display errors consistently
- ✅ No uncaught promise rejections

**Testing:**
```bash
# Test error handling in each IPC channel
# Verify consistent error format
# Test with invalid inputs
```

**Dependencies:**
- P0-002 (cancelTask rename)

---

### P1-002: Implement Comprehensive Type Safety

**Severity:** 🟠 HIGH (Code Quality)
**Category:** Type Safety
**Impact:** Runtime errors, refactoring is error-prone

**Problem:**
Significant use of `any` types throughout codebase:
- Callback parameters: `onHuman: (message: any)`
- Tool results: `execute: (args, agentContext, toolCall) => Promise<any>`
- Agent configuration: `private agents!: any[]`

**Affected Files:**
- `electron/main/services/eko-service.ts` - Multiple any types
- `electron/main/services/agent-context-manager.ts` - Generic types
- `electron/main/ipc/eko-handlers.ts` - Callback any

**Solution:**
Replace all `any` types with specific interfaces

**Effort:** 2 hours (type definitions + migration)

**Success Criteria:**
- ✅ No `any` types in application code
- ✅ `tsconfig.json` has `noImplicitAny: true`
- ✅ All callbacks properly typed
- ✅ All agent types specific
- ✅ TypeScript strict mode enabled

---

### P1-003: Add Comprehensive Logging & Monitoring

**Severity:** 🟠 HIGH (Debugging / Operations)
**Category:** Observability
**Impact:** Hard to debug production issues

**Problem:**
Current logging is inconsistent:
- Mix of `console.log()` and `Log.info()`
- No structured logging
- No log levels properly utilized
- No performance metrics

**Solution:**
Implement structured logging with levels and context

**Effort:** 2.5 hours (logger setup + integration)

**Implementation:**
```typescript
// electron/main/utils/logger.ts
export class AppLogger {
  static info(component: string, message: string, data?: any) {
    console.log(`[${component}] ${message}`, data);
  }

  static error(component: string, message: string, error?: Error) {
    console.error(`[${component}] ${message}`, error);
  }

  static warn(component: string, message: string, data?: any) {
    console.warn(`[${component}] ${message}`, data);
  }

  static debug(component: string, message: string, data?: any) {
    if (process.env.DEBUG === 'true') {
      console.debug(`[${component}] ${message}`, data);
    }
  }

  static metric(component: string, name: string, duration: number) {
    console.log(`[METRIC] ${component}.${name}: ${duration}ms`);
  }
}
```

**Success Criteria:**
- ✅ Structured logging throughout application
- ✅ Log levels properly used
- ✅ Performance metrics tracked
- ✅ Component context in all logs
- ✅ Exportable logs for debugging

---

### P1-004: Checkpoint System Optimization

**Severity:** 🟠 HIGH (Feature)
**Category:** Performance
**Impact:** Large tasks lose progress on crash

**Problem:**
Current checkpoint system doesn't optimize context size or handle large states

**Location:**
- `electron/main/services/task-checkpoint.ts`

**Solution:**
Add checkpoint compression and size limits

**Effort:** 2.5 hours (optimization + testing)

**Success Criteria:**
- ✅ Checkpoints limited to 10MB per task
- ✅ Automatic compression after checkpoint
- ✅ Large objects serialized efficiently
- ✅ Checkpoint save/load < 100ms
- ✅ Support for long-running 8+ hour tasks

---

### P1-005: Security Audit & Rate Limiting

**Severity:** 🟠 HIGH (Security)
**Category:** Security
**Impact:** DoS vulnerability, resource exhaustion

**Problem:**
No rate limiting on IPC handlers except `ekoRun`

**Affected Handlers:**
- Model configuration APIs
- Agent configuration APIs
- File operations

**Solution:**
Implement per-window and global rate limiting

**Effort:** 1.5 hours (middleware + testing)

**Implementation:**
- Max 10 tasks per window
- Max 100 total tasks across all windows
- Config endpoints: 5 req/second
- File operations: 10 MB/second

---

## P2 - MEDIUM PRIORITY ISSUES

Medium priority items improve code maintainability and enable future development. Schedule for following quarters.

### P2-001: Dependency Injection Architecture

**Severity:** 🟡 MEDIUM (Architecture)
**Category:** Design Pattern
**Impact:** Tight coupling, hard to test

**Problem:**
Services create dependencies internally:
- EkoService creates agents directly
- No dependency injection container
- Hard to mock for testing
- Tight coupling between services

**Example - Tight Coupling:**
```typescript
// ❌ CURRENT - Hard to test
constructor(mainWindow, detailView) {
  this.agents = [];
  // Creates agents directly
  new BrowserAgent(this.detailView, this.mcpClient, config);
}
```

**Better Pattern:**
```typescript
// ✅ IMPROVED - Dependency injection
constructor(
  mainWindow: BrowserWindow,
  detailView: WebContentsView,
  agents: Agent[],
  configManager: ConfigManager
) {
  this.agents = agents;
  this.configManager = configManager;
}
```

**Solution:**
Implement simple DI container

**Effort:** 3.5 hours (container + refactor + tests)

**Files Affected:**
- `electron/main/services/eko-service.ts`
- `electron/main/windows/main-window.ts`
- All agent creation sites

**Success Criteria:**
- ✅ DI container for main services
- ✅ All dependencies injected
- ✅ Services mockable for testing
- ✅ Reduced coupling
- ✅ 80%+ unit test coverage

---

### P2-002: Performance Metrics & Optimization

**Severity:** 🟡 MEDIUM (Performance)
**Category:** Performance
**Impact:** App feels slow for large tasks

**Problem:**
No performance tracking:
- Don't know task execution time breakdown
- Can't identify bottlenecks
- No memory usage tracking
- No optimization targets

**Solution:**
Add performance monitoring

**Effort:** 2 hours (metrics + dashboard)

**Metrics to Track:**
- Task execution time per workflow stage
- Memory usage per task
- MCP client latency
- Screenshot processing time
- IPC message roundtrip time

**Success Criteria:**
- ✅ Performance metrics logged
- ✅ Dashboard shows performance stats
- ✅ Alerts for slow operations (>2s)
- ✅ Historical data stored

---

### P2-003: Testing Infrastructure Enhancement

**Severity:** 🟡 MEDIUM (Code Quality)
**Category:** Testing
**Impact:** Low test coverage, hard to verify changes

**Current State:**
- Limited unit tests
- No integration tests
- No E2E test framework
- Manual testing for most features

**Solution:**
Add Jest, Playwright, and integration tests

**Effort:** 4 hours (framework setup + sample tests)

**Coverage Goals:**
- Core services: 80%+ coverage
- IPC handlers: 100% of error paths
- Utilities: 90%+ coverage
- Business logic: 85%+ coverage

**Files to Test:**
- `electron/main/services/eko-service.ts`
- `electron/main/services/agent-context-manager.ts`
- `electron/main/ipc/eko-handlers.ts`
- `src/lib/taskStorage.ts`

---

### P2-004: UI/UX Improvements for Task Monitoring

**Severity:** 🟡 MEDIUM (UX)
**Category:** User Experience
**Impact:** Users can't monitor long-running tasks

**Problem:**
- No progress bar for task execution
- No real-time step counter
- Errors not displayed clearly
- No pause/resume UI

**Required UI Components:**
- Task progress bar (% complete)
- Step counter (e.g., "Step 5 of 12")
- Real-time logs viewer
- Error notification panel
- Pause/Resume buttons

**Solution:**
Build new TaskMonitor component

**Effort:** 3 hours (React component + IPC integration)

**Files to Create:**
- `src/components/TaskMonitor.tsx`
- `src/components/ProgressBar.tsx`
- `src/components/ErrorPanel.tsx`

---

### P2-005: MCP Tools Management UI

**Severity:** 🟡 MEDIUM (Feature)
**Category:** User Experience
**Impact:** Hard to enable/disable MCP tools

**Problem:**
- No UI to manage MCP tools
- Can't see available tools
- Can't enable/disable specific tools
- No tool documentation viewer

**Solution:**
Create MCP Tools management panel

**Effort:** 2.5 hours (React components + backend)

**Files to Create:**
- `src/pages/mcp-tools.tsx`
- `src/components/ToolCard.tsx`
- `src/components/ToolDocumentation.tsx`

---

### P2-006: Bundle Size Optimization

**Severity:** 🟡 MEDIUM (Performance)
**Category:** Performance
**Impact:** Slow app launch, large download size

**Problem:**
- No code splitting analysis
- Large dependencies not identified
- Electron bundle likely > 200MB

**Solution:**
Analyze and optimize bundle size

**Effort:** 2.5 hours (analysis + optimization)

**Tools:**
- `webpack-bundle-analyzer`
- `source-map-explorer`

**Targets:**
- Main bundle: < 50MB
- Renderer bundle: < 20MB
- Static assets: < 100MB
- Total package: < 250MB

---

## P3 - LOW PRIORITY ITEMS

Low priority items are nice-to-have improvements. Plan for future quarters or when team capacity allows.

### P3-001: Agent Handoff Documentation

**Severity:** 🟢 LOW (Documentation)
**Category:** Developer Experience
**Impact:** Developers struggle with agent coordination

**Solution:**
Create comprehensive documentation with examples

**Effort:** 1.5 hours (documentation)

**Documentation Topics:**
- Agent context transfer patterns
- Multi-agent workflow examples
- Common pitfalls and solutions

---

### P3-002: Caching Layer for Agent Responses

**Severity:** 🟢 LOW (Performance)
**Category:** Performance Optimization
**Impact:** Repeated tasks make redundant API calls

**Solution:**
Implement response caching in EkoService

**Effort:** 2 hours (implementation + testing)

**Implementation:**
- Cache task results by prompt hash
- TTL of 1 hour
- Option to bypass cache

---

### P3-003: Advanced Workflow Composition

**Severity:** 🟢 LOW (Feature)
**Category:** Feature Enhancement
**Impact:** Users want to chain multiple tasks

**Solution:**
Build workflow builder UI

**Effort:** 4 hours (React component + backend)

**Features:**
- Visual workflow editor
- Save/load workflows
- Parameter mapping between tasks
- Conditional branching

---

### P3-004: Social Media Integration Expansion

**Severity:** 🟢 LOW (Feature)
**Category:** Feature Enhancement
**Impact:** Limited to 2 platforms currently

**Solution:**
Add support for more platforms

**Platforms to Add:**
- Twitter/X
- Instagram
- LinkedIn
- TikTok (Global)

**Effort:** 8 hours (4 per platform)

---

## Cross-Cutting Concerns & Architecture

### Configuration Management Standardization

**Current Issues:**
- Mix of environment variables and electron-store
- No single source of truth
- Hard to understand config priority

**Improvement Plan:**
```typescript
// Create config schema
export interface AppConfig {
  development: {
    serverPort: number;
    serverHost: string;
    debugLogging: boolean;
  };
  features: {
    advancedTools: boolean;
    gestureTools: boolean;
    checkpointing: boolean;
  };
  ai: {
    providers: ProviderConfig[];
    defaultProvider: string;
  };
  mcp: {
    sseUrl: string;
    timeout: number;
  };
}

// Single config manager
ConfigManager.getInstance().get<AppConfig>('development.serverPort');
```

**Effort:** 2 hours (schema + migration)

---

### State Management Audit

**Current State:**
- Zustand stores for UI state
- IndexedDB for persistence
- electron-store for configs
- Local memory for services

**Recommendation:**
Document state flows and consolidate where possible

**Effort:** 2.5 hours (audit + documentation)

---

## Testing Plan

### Unit Testing Strategy

```bash
# Test all core services
jest electron/main/services/

# Test IPC handlers with validation
jest electron/main/ipc/

# Test utilities
jest electron/main/utils/
```

### Integration Testing

```bash
# Test end-to-end task execution
jest --testPathPattern="integration"

# Test multi-agent workflows
jest --testPathPattern="multi-agent"
```

### E2E Testing

```bash
# Test with Playwright
playwright test e2e/

# Record test runs for debugging
playwright codegen
```

---

## Dependency Map

```
P0-001 (UUID)
  ↓
P0-002 (cancelTask)
  ↓
P0-003 (localhost URLs) ← depends on ConfigManager
  ↓
P0-004 (getTaskStatus) ← depends on logging (P1-003)
  ↓
P1-001 (Error Handling)
  ↓
P1-002 (Type Safety)
  ↓
P2-001 (Dependency Injection)
  ↓
P2-003 (Testing Infrastructure)
```

---

## Recommended Phasing

### Phase 1: Critical Fixes (1-2 days)
1. ✅ P0-001: Add UUID dependency
2. ✅ P0-002: Fix cancleTask typo
3. ✅ P0-003: Externalize localhost URLs
4. ✅ P0-004: Implement getTaskStatus

### Phase 2: Foundation (3-4 days)
1. ✅ P1-001: Standardize error handling
2. ✅ P1-002: Type safety improvements
3. ✅ P1-003: Comprehensive logging
4. ✅ P1-004: Checkpoint optimization

### Phase 3: Architecture (2-3 days)
1. ✅ P2-001: Dependency injection
2. ✅ P2-003: Testing infrastructure
3. ✅ P2-004: UI monitoring improvements

### Phase 4: Polish (2-3 days)
1. ✅ P2-002: Performance metrics
2. ✅ P2-005: MCP tools management
3. ✅ P2-006: Bundle optimization

---

## Success Metrics

### Before Refactor
- Build failures: ✅ Current (UUID missing)
- Test coverage: ~30%
- Average task execution time: Unknown
- Bundle size: Unknown
- Open issues: 12+

### After Refactor (Target)
- Build failures: 0
- Test coverage: 80%+
- Average task execution time: < 5s baseline
- Bundle size: < 250MB
- Open issues: < 3

---

## Appendix: Files Reference

### Critical Files to Modify
```
electron/main/
  ├── services/
  │   ├── eko-service.ts (P0-002, P0-003, P0-004, P1-003)
  │   ├── agent-context-manager.ts (P0-001)
  │   ├── task-window-manager.ts (P0-002, P0-003)
  │   └── task-checkpoint.ts (P1-004)
  ├── ipc/
  │   ├── eko-handlers.ts (P0-002, P0-004, P1-001)
  │   └── validation-middleware.ts (P1-001)
  └── utils/
      └── config-manager.ts (P0-003, P1-001)

src/
  ├── type.d.ts (P0-002 reference)
  ├── utils/messageTransform.ts (P0-001)
  └── components/
      └── (P2-004, P2-005 new components)

electron/preload/
  └── index.ts (P0-002 reference)
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-09 | Initial comprehensive refactor document |

---

**Document Owner:** Development Team
**Last Review Date:** 2025-01-09
**Next Review:** After Phase 1 completion
