# Claude AI Development Todo List

## 🚀 Project: Manus Electron - Comprehensive Refactor & Modernization

**Status**: Planning Phase → Implementation Phase
**Started**: 2025-11-14
**Goal**: Fix critical bugs, refactor architecture, optimize performance, modernize UI/UX
**Timeline**: 7-12 days (Phase-based approach)

---

## 🔴 PHASE 1: Critical Fixes (1-2 days)
### Must fix immediately - blocking issues

- [ ] **P0.1: Add UUID Dependency**
  - **File**: `package.json`
  - **Action**: Add `"uuid": "^9.0.0"` to dependencies (line 65)
  - **Why**: Used in `agent-context-manager.ts` but missing - will crash app
  - **Effort**: 5 minutes
  - **Verify**: `pnpm install && pnpm build`

- [ ] **P0.2: Fix cancleTask → cancelTask Typo (eko-service.ts)**
  - **File**: `electron/main/services/eko-service.ts`
  - **Lines**: 417 (method definition), 422 (params string)
  - **Action**: Rename method from `cancleTask` to `cancelTask`
  - **Why**: Type mismatch with `src/type.d.ts:233` which defines `cancelTask()`
  - **Effort**: 10 minutes
  - **Verify**: TypeScript compilation succeeds

- [ ] **P0.3: Fix cancleTask → cancelTask Typo (eko-handlers.ts)**
  - **File**: `electron/main/ipc/eko-handlers.ts`
  - **Lines**: 101, 145
  - **Action**: Change all `this.eko.cancleTask()` to `this.eko.cancelTask()`
  - **Why**: Caller must match method name
  - **Effort**: 5 minutes
  - **Verify**: All references updated

- [ ] **P0.4: Fix cancleTask → cancelTask Typo (task-window-manager.ts)**
  - **File**: `electron/main/services/task-window-manager.ts`
  - **Line**: 46
  - **Action**: Change `this.eko.cancleTask()` to `this.eko.cancelTask()`
  - **Why**: Consistency across codebase
  - **Effort**: 2 minutes
  - **Verify**: All calls match definition

- [ ] **P0.5: Create Environment Config System for URLs**
  - **File**: `electron/main/utils/config-manager.ts` (extend) + `.env.template`
  - **Action**: Add URL configuration variables:
    - `NEXT_PUBLIC_DEV_PORT=5173`
    - `NEXT_PUBLIC_FILE_VIEW_URL=http://localhost:5173/file-view`
    - `NEXT_PUBLIC_MCP_SSE_URL=http://localhost:5173/api/mcp/sse`
    - `NEXT_PUBLIC_TASK_WINDOW_URL=http://localhost:5173/main`
  - **Why**: Hardcoded URLs break in production
  - **Effort**: 45 minutes
  - **Verify**: URLs can be changed via env vars

- [ ] **P0.6: Replace Hardcoded localhost:5173 in eko-service.ts**
  - **File**: `electron/main/services/eko-service.ts`
  - **Lines**: 116, 156
  - **Action**: Replace with config variables:
    - `const fileViewUrl = config.get('file_view_url')`
    - `const sseUrl = config.get('mcp_sse_url')`
  - **Why**: Deployment requirement for different environments
  - **Effort**: 15 minutes
  - **Verify**: App starts without hardcoded localhost

- [ ] **P0.7: Replace Hardcoded localhost:5173 in task-window-manager.ts**
  - **File**: `electron/main/services/task-window-manager.ts`
  - **Lines**: 56, 73
  - **Action**: Replace with config variables:
    - `const taskWindowUrl = config.get('task_window_url')`
  - **Why**: Consistency across all services
  - **Effort**: 15 minutes
  - **Verify**: Task windows open correctly

- [ ] **P0.8: Implement Complete getTaskStatus() Method**
  - **File**: `electron/main/services/eko-service.ts`
  - **Lines**: 403-412
  - **Action**: Replace stub with real implementation:
    ```typescript
    getTaskStatus(taskId: string) {
      const task = this.taskMap.get(taskId);
      return {
        taskId,
        status: task?.status || 'unknown',
        progress: task?.progress || 0,
        createdAt: task?.createdAt,
        completedAt: task?.completedAt,
        error: task?.error
      };
    }
    ```
  - **Why**: Task monitoring currently broken (always returns "unknown")
  - **Effort**: 2 hours
  - **Verify**: `getTaskStatus()` returns real task data

**Phase 1 Total Effort**: 3-4 hours
**Phase 1 Blocker Check**: ✅ Fixes all runtime crashes and API contract violations

---

## 🟠 PHASE 2: Architecture & Foundation (3-4 days)
### Clean up foundation, establish patterns

- [ ] **P1.1: Standardize Error Handling**
  - **Files**: All IPC handlers, services
  - **Action**: Create centralized error handler:
    - Replace mixed `Log.error()` + `console.error()` with unified pattern
    - Create error telemetry layer
    - Add structured logging
  - **Why**: Inconsistent error handling makes debugging difficult
  - **Effort**: 8 hours
  - **Verify**: All errors logged consistently, traceable

- [ ] **P1.2: Remove All `any` Types**
  - **Files**: 20+ files across codebase
  - **Action**: Replace `any` types with proper TypeScript types
    - Audit all service interfaces
    - Create proper type definitions
    - Enable TypeScript strict mode in build
  - **Why**: Loss of type safety, runtime errors go undetected
  - **Effort**: 12 hours
  - **Verify**: `tsc --strict` passes with no `any` types

- [ ] **P1.3: Extract Business Logic from IPC Handlers**
  - **Files**: `electron/main/ipc/eko-handlers.ts`, services
  - **Action**: Create service layer abstraction:
    - Separate concerns (IPC ↔ Business Logic)
    - Make services testable without IPC
    - Add proper interfaces
  - **Why**: Handlers currently mix transport layer with business logic
  - **Effort**: 10 hours
  - **Verify**: Services can be tested independently

- [ ] **P1.4: Implement Dependency Injection**
  - **File**: `electron/main/services/service-registry.ts` (new)
  - **Action**: Create DI container for services:
    - EkoService, ConfigManager, WindowContextManager
    - Mock implementations for testing
    - Singleton pattern enforcement
  - **Why**: Difficult to test, high coupling between services
  - **Effort**: 6 hours
  - **Verify**: Services instantiate via DI container

- [ ] **P1.5: Fix Duplicate WindowContext Definitions**
  - **Files**: `electron/main/services/window-context-manager.ts`, `agent-context-manager.ts`
  - **Action**: Merge duplicate interfaces into single definition
  - **Why**: Maintenance burden, potential sync issues
  - **Effort**: 2 hours
  - **Verify**: Single definition used everywhere

- [ ] **P1.6: Implement Proper Logging System**
  - **File**: `electron/main/utils/logger.ts` (enhance)
  - **Action**: Add log levels, rotation, telemetry:
    - Replace all `console.log` with logger
    - Add log rotation to prevent unbounded growth
    - Create debug mode for development
  - **Why**: Logs currently inconsistent and unbounded
  - **Effort**: 4 hours
  - **Verify**: Logs rotate correctly, levels respected

**Phase 2 Total Effort**: 42 hours (5-6 person-days)
**Phase 2 Outcome**: Clean, maintainable architecture foundation

---

## 🟡 PHASE 3: Performance & Optimization (2-3 days)
### Make it fast and efficient

- [ ] **P2.1: Implement Task History Pagination**
  - **Files**: `src/stores/historyStore.ts`, history components
  - **Action**: Add virtualized list, lazy loading:
    - Load 50 tasks at a time
    - Implement infinite scroll
    - Archive old tasks automatically
  - **Why**: Memory degradation with 1000+ tasks
  - **Effort**: 8 hours
  - **Verify**: Smooth scrolling with 10,000 tasks

- [ ] **P2.2: Implement Screenshot Caching**
  - **File**: `electron/main/services/eko-service.ts` (file callbacks)
  - **Action**: Add intelligent screenshot management:
    - Cache screenshots with TTL
    - Compress images before storage
    - Auto-cleanup old screenshots
  - **Why**: Reduces network overhead, speeds up UI
  - **Effort**: 4 hours
  - **Verify**: Screenshot load time <500ms

- [ ] **P2.3: Add Context Size Management**
  - **File**: `electron/main/services/agent-context-manager.ts`
  - **Action**: Implement enforcement of `MAX_CONTEXT_SIZE` and `MAX_CONTEXT_AGE`:
    - Currently has constants but no enforcement
    - Add automatic context compression
    - Checkpoint system for resumption
  - **Why**: Context can grow unbounded, causing memory exhaustion
  - **Effort**: 6 hours
  - **Verify**: Context size capped at 50MB, old context removed

- [ ] **P2.4: Optimize Bundle Size**
  - **File**: `next.config.js`, webpack config
  - **Action**: Analyze and reduce bundle:
    - Identify large dependencies
    - Implement code splitting
    - Enable tree-shaking
  - **Why**: Large initial load time
  - **Effort**: 5 hours
  - **Verify**: Main bundle <500KB (gzip)

- [ ] **P2.5: Fix Race Conditions in Task Scheduler**
  - **File**: `electron/main/services/task-scheduler.ts`
  - **Action**: Add task queue with synchronization:
    - Prevent overlapping task execution
    - Add priority levels
    - Implement resource limits
  - **Why**: Tasks can queue up and block each other
  - **Effort**: 6 hours
  - **Verify**: No concurrent overlapping tasks

**Phase 3 Total Effort**: 29 hours (3-4 person-days)
**Phase 3 Outcome**: Fast, efficient application with responsive UI

---

## 🟢 PHASE 4: UI/UX Modernization (5-7 days)
### Beautiful, intuitive interface

- [ ] **P3.1: Design System Foundation**
  - **File**: New `src/design-system/` directory
  - **Action**: Create modern design tokens:
    - Color palette with themes
    - Typography system
    - Spacing/sizing system
    - Component library (consider shadcn/ui + Tailwind)
  - **Why**: Current design is dated, inconsistent
  - **Effort**: 16 hours
  - **Verify**: Storybook with 20+ components

- [ ] **P3.2: Redesign Main Interface**
  - **Files**: `src/pages/main.tsx`, chat components
  - **Action**: Modern layout:
    - Streamlined chat interface
    - Better task visualization
    - Improved browser view integration
    - Context-aware toolbars
  - **Why**: Current UI is cluttered, unclear flow
  - **Effort**: 20 hours
  - **Verify**: Design approved, accessibility checked

- [ ] **P3.3: Task Management UX**
  - **Files**: History panel, task cards
  - **Action**: Improve task interaction:
    - Visual progress indicators
    - Drag-and-drop reordering
    - Quick actions menu
    - Better error states
  - **Why**: Task management is currently hidden, hard to find
  - **Effort**: 12 hours
  - **Verify**: Usability testing passes

- [ ] **P3.4: Agent Configuration UI**
  - **Files**: Agent config page, tool management
  - **Action**: Visual workflow builder:
    - Drag-and-drop workflow creation
    - Real-time preview of agent actions
    - Intuitive tool configuration
    - Better streaming response display
  - **Why**: Currently text-based, hard to understand
  - **Effort**: 18 hours
  - **Verify**: User can create workflows visually

- [ ] **P3.5: Scheduled Tasks Interface**
  - **Files**: Scheduled tasks components
  - **Action**: Modern scheduling UI:
    - Calendar/timeline view
    - Visual cron builder
    - Task templates
    - Status indicators
  - **Why**: Currently basic, hard to manage complex schedules
  - **Effort**: 14 hours
  - **Verify**: Can create recurring tasks intuitively

- [ ] **P3.6: Accessibility & Responsive Design**
  - **Files**: All components
  - **Action**: WCAG 2.1 AA compliance:
    - Keyboard navigation
    - Screen reader support
    - Focus management
    - Mobile responsive
  - **Why**: Application not accessible
  - **Effort**: 10 hours
  - **Verify**: axe-core audit passes

**Phase 4 Total Effort**: 90 hours (11-14 person-days)
**Phase 4 Outcome**: Modern, beautiful, accessible UI

---

## 🔵 PHASE 5: Testing & Quality (1-2 days)
### Ensure reliability

- [ ] **P4.1: Unit Tests for Services**
  - **Files**: `__tests__/unit/services/`
  - **Action**: 80%+ coverage:
    - EkoService tests
    - ConfigManager tests
    - WindowContextManager tests
  - **Why**: No service-level tests currently
  - **Effort**: 12 hours
  - **Verify**: Jest coverage report >80%

- [ ] **P4.2: Integration Tests for IPC**
  - **Files**: `__tests__/integration/ipc/`
  - **Action**: Test IPC handlers:
    - Mock main process
    - Test renderer communication
    - Error scenarios
  - **Why**: Critical communication layer untested
  - **Effort**: 8 hours
  - **Verify**: All handlers have integration tests

- [ ] **P4.3: E2E Tests for Critical Flows**
  - **Files**: `__tests__/e2e/`
  - **Action**: Test key user workflows:
    - Agent task execution
    - Browser automation
    - Scheduled tasks
  - **Why**: No end-to-end testing
  - **Effort**: 10 hours
  - **Verify**: Critical flows tested with real scenarios

- [ ] **P4.4: Enable TypeScript Strict Mode in Build**
  - **File**: `next.config.js`
  - **Action**: Enable strict type checking:
    - Fix all type errors
    - Enable strict checks
    - Remove type bypasses
  - **Why**: Currently disabled, allows type errors
  - **Effort**: 3 hours
  - **Verify**: Build succeeds with `strict: true`

**Phase 5 Total Effort**: 33 hours (4-5 person-days)
**Phase 5 Outcome**: Reliable, well-tested application

---

## 📚 PHASE 6: Documentation (1 day)
### Make it maintainable

- [ ] **P5.1: Update CLAUDE.md**
  - **File**: `CLAUDE.md`
  - **Action**: Reflect current architecture:
    - Remove outdated information
    - Add new patterns documented
    - Update command reference
  - **Effort**: 2 hours

- [ ] **P5.2: Create API Documentation**
  - **File**: `docs/API.md`
  - **Action**: Document all IPC channels, services, endpoints
  - **Effort**: 4 hours

- [ ] **P5.3: Add Architecture Diagrams**
  - **File**: `docs/ARCHITECTURE.md`
  - **Action**: Visual diagrams of system components
  - **Effort**: 3 hours

- [ ] **P5.4: Update Contributing Guidelines**
  - **File**: `CONTRIBUTING.md`
  - **Action**: Guidelines for future developers
  - **Effort**: 2 hours

**Phase 6 Total Effort**: 11 hours (1-2 person-days)
**Phase 6 Outcome**: Well-documented codebase

---

## 📊 SUMMARY

| Phase | Focus | Duration | Effort |
|-------|-------|----------|--------|
| Phase 1 | Critical Fixes | 1-2 days | 4 hours |
| Phase 2 | Architecture | 3-4 days | 42 hours |
| Phase 3 | Performance | 2-3 days | 29 hours |
| Phase 4 | UI/UX | 5-7 days | 90 hours |
| Phase 5 | Testing | 1-2 days | 33 hours |
| Phase 6 | Documentation | 1 day | 11 hours |
| **TOTAL** | **Full Refactor** | **13-19 days** | **209 hours** |

---

## 🎯 Recommended Execution Path

### Week 1: Foundation
1. ✅ Complete Phase 1 (Critical Fixes) - 1-2 days
2. ✅ Complete Phase 2 (Architecture) - 3-4 days
3. ✅ Complete Phase 3 (Performance) - 2-3 days

**Checkpoint**: App is fast, stable, well-architected

### Week 2-3: Polish
4. 🎨 Complete Phase 4 (UI/UX) - 5-7 days
5. ✅ Complete Phase 5 (Testing) - 1-2 days
6. 📚 Complete Phase 6 (Documentation) - 1 day

**Final**: Modern, beautiful, reliable application ready for users

---

## 🔧 Immediate Next Steps (Today)

1. **Fix UUID Dependency** (5 min)
   ```bash
   # Edit package.json, add "uuid": "^9.0.0"
   pnpm install
   ```

2. **Fix All cancleTask Typos** (30 min)
   - eko-service.ts: lines 417, 422
   - eko-handlers.ts: lines 101, 145
   - task-window-manager.ts: line 46

3. **Create Environment Config** (45 min)
   - Extend config-manager.ts
   - Update .env.template

4. **Replace Hardcoded URLs** (30 min)
   - eko-service.ts: lines 116, 156
   - task-window-manager.ts: lines 56, 73

5. **Implement getTaskStatus()** (2 hours)
   - eko-service.ts: lines 403-412

**Today's Total**: ~4 hours to fix all critical issues

---

## 📝 Notes

- All line numbers are as of 2025-11-14
- Effort estimates are for single developer
- Can be parallelized with multiple devs
- Each phase builds on previous
- Can stop after Phase 1 if critical fixes are all that's needed
- Consider hiring another dev for Phases 4-5 (UI/UX work)

---

**Last Updated**: 2025-11-14
**Created By**: Claude AI Code Assistant
**Status**: Ready for Implementation
