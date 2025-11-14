# EXECUTION CHECKLIST - Manus Electron Refactor

**Quick Reference for 2-Developer Team**
**Timeline: 8-12 days**

---

## PRE-PROJECT (Before Day 1)

- [ ] Both devs read CLAUDE.md and REFACTOR_COORDINATION_PLAN.md
- [ ] Create feature branches: `refactor/phase-1`, `refactor/phase-4`, etc.
- [ ] Setup daily standup meeting (9 AM, 15 mins)
- [ ] Setup code review process (4-hour turnaround)
- [ ] Create GitHub milestone for each phase
- [ ] Configure branch protection rules (require code review)
- [ ] Verify build pipeline working: `pnpm install && pnpm build`

---

## PHASE 1: CRITICAL FIXES (Day 1-2, 4 hours)

**Owner**: Dev A

**Tasks** (8 subtasks):
- [ ] P0.1: Add UUID dependency (5 min)
  - Edit `package.json`, add `"uuid": "^9.0.0"`
  - Run `pnpm install`
  - PR: #1-uuid

- [ ] P0.2-0.4: Fix cancelTask typos (17 min total)
  - `eko-service.ts` line 417, 422
  - `eko-handlers.ts` line 101, 145
  - `task-window-manager.ts` line 46
  - PR: #2-cancel-task-typo

- [ ] P0.5-0.7: Environment config + hardcoded URLs (75 min)
  - Create env config system in config-manager.ts
  - Update .env.template with URL variables
  - Replace localhost:5173 in eko-service.ts lines 116, 156
  - Replace localhost:5173 in task-window-manager.ts lines 56, 73
  - PR: #3-env-urls

- [ ] P0.8: Implement getTaskStatus() (2 hours)
  - `eko-service.ts` lines 403-412
  - Add proper task tracking with status, progress, timestamps
  - Unit test for verification
  - PR: #4-get-task-status

**Gate Check (EOD Day 2)**:
- [ ] `pnpm build` succeeds
- [ ] `pnpm test` passes
- [ ] App launches: `pnpm run dev` starts without crashes
- [ ] TypeScript compilation: `tsc` passes
- [ ] All 4 PRs merged to main

**Gate Status**: ⬜ PENDING → ✅ PASS or ❌ FAIL (no partial)

---

## PHASE 2: ARCHITECTURE (Day 3-6, 42 hours)

**Owner**: Dev A
**Parallel**: Dev B on Phase 4

### Track A: Error Handling & Logging (12 hours)

- [ ] P1.5: Analyze current error patterns (2h)
  - Audit all `console.error()` and `Log.error()` calls
  - Document inconsistencies
  - Report in PR #5

- [ ] P1.1: Centralized error handler (4h)
  - Create `electron/main/utils/error-handler.ts`
  - Replace mixed error handling with unified pattern
  - Add error telemetry layer
  - PR: #6-error-handler

- [ ] P1.6: Logging system (4h)
  - Create `electron/main/utils/logger.ts`
  - Add log levels (DEBUG, INFO, WARN, ERROR)
  - Implement log rotation
  - Replace all `console.log` with logger
  - PR: #7-logging

- [ ] Integration tests for error paths (2h)
  - Test error handler recovery
  - Test logger output
  - PR: #8-error-tests

### Track B: Type Safety & Architecture (30 hours)

- [ ] P1.2a: Audit all `any` types (3h)
  - `grep -r "any" --include="*.ts"` electron/ src/`
  - Document all instances with context
  - Categorize by complexity
  - Report in PR #9

- [ ] P1.2b: Remove all `any` types (9h)
  - Export proper interfaces
  - Define type aliases for complex types
  - Update function signatures
  - PR: #10-remove-any

- [ ] P1.5: Fix duplicate WindowContext (2h)
  - Merge definitions from window-context-manager.ts and agent-context-manager.ts
  - Use single definition in both places
  - PR: #11-duplicate-fix

- [ ] P1.3: Extract IPC handlers to services (8h)
  - Create service layer abstraction
  - Move business logic out of IPC handlers
  - Create testable service interfaces
  - PR: #12-service-layer

- [ ] P1.4: Dependency injection container (6h)
  - Create `electron/main/services/service-registry.ts`
  - Implement DI container for EkoService, ConfigManager, etc.
  - Add mock implementations for testing
  - PR: #13-di-container

- [ ] Enable strict TypeScript mode (2h)
  - Update `next.config.js` to enable strict
  - Fix all strict mode violations
  - Verify `tsc --strict` passes
  - PR: #14-strict-mode

**Gate Check (EOD Day 6)**:
- [ ] Zero `any` types: `grep -r "any" electron/ src/ | wc -l == 0`
- [ ] TypeScript strict passes: `tsc --strict` ✅
- [ ] Error handling centralized: All errors use new handler
- [ ] DI container working: Services instantiate via registry
- [ ] Coverage >80%: `pnpm test -- --coverage`
- [ ] All 6 PRs merged

**Gate Status**: ⬜ PENDING → ✅ PASS or ❌ FAIL

---

## PHASE 3: PERFORMANCE (Day 6-8, 29 hours)

**Owner**: Dev A
**Parallel**: Dev B on Phase 4

- [ ] P2.1: Task history pagination (8h)
  - Implement virtualized list for history
  - Load 50 tasks at a time
  - Add infinite scroll
  - Test with 10,000 tasks
  - PR: #15-pagination

- [ ] P2.2: Screenshot caching (4h)
  - Add screenshot cache with TTL
  - Compress images before storage
  - Auto-cleanup old screenshots
  - Verify <500ms load time
  - PR: #16-screenshot-cache

- [ ] P2.3: Context size management (6h)
  - Enforce MAX_CONTEXT_SIZE (50MB)
  - Implement context compression
  - Add checkpoint system
  - Monitor context growth
  - PR: #17-context-management

- [ ] P2.5: Fix task scheduler race conditions (6h)
  - Add task queue with synchronization
  - Prevent overlapping task execution
  - Test with 5 concurrent tasks
  - PR: #18-scheduler-sync

- [ ] P2.4: Bundle size optimization (5h)
  - Analyze bundle with `next build --debug`
  - Identify large dependencies
  - Implement tree-shaking
  - Enable code splitting
  - Verify <500KB gzipped
  - PR: #19-bundle-optimization

**Gate Check (EOD Day 8)**:
- [ ] Pagination: Smooth scroll with 10K items
- [ ] Caching: First load <500ms, cached <100ms
- [ ] Context: 50MB limit enforced, growth monitored
- [ ] Scheduler: No race conditions in concurrent tests
- [ ] Bundle: <500KB gzipped
- [ ] All 5 PRs merged

**Gate Status**: ⬜ PENDING → ✅ PASS or ❌ FAIL

---

## PHASE 4: UI/UX MODERNIZATION (Day 3-9, 90 hours)

**Owner**: Dev B
**Parallel**: Dev A on Phases 2-3

- [ ] P3.1: Design System Foundation (16h)
  - Create `src/design-system/` directory
  - Define color palette with light/dark themes
  - Typography system (font sizes, weights, line heights)
  - Spacing/sizing system (8px grid)
  - Setup Storybook with 20+ components
  - PR: #20-design-system

- [ ] P3.2: Main Interface Redesign (20h)
  - Redesign chat interface
  - Improve task visualization
  - Integrate browser view better
  - Add context-aware toolbars
  - Test responsive layout
  - PR: #21-main-ui

- [ ] P3.3: Task Management UX (12h)
  - Add visual progress indicators
  - Implement drag-and-drop reordering
  - Add quick actions menu
  - Improve error state display
  - PR: #22-task-management

- [ ] P3.4: Agent Configuration UI (18h)
  - Create drag-and-drop workflow builder
  - Add real-time preview
  - Visual tool configuration
  - Better streaming response display
  - PR: #23-agent-config

- [ ] P3.5: Scheduled Tasks Interface (14h)
  - Add calendar/timeline view
  - Visual cron builder
  - Task templates
  - Status indicators
  - PR: #24-scheduled-tasks

- [ ] P3.6: Accessibility & Responsive (10h)
  - WCAG 2.1 AA compliance audit
  - Keyboard navigation
  - Screen reader support
  - Mobile responsive testing (375px, 1024px, 1920px)
  - PR: #25-accessibility

**Gate Check (EOD Day 9)**:
- [ ] Storybook deployed with 20+ components
- [ ] Main UI design approved
- [ ] WCAG 2.1 AA: axe-core audit = 0 violations
- [ ] Responsive: Tested at 3 breakpoints
- [ ] All 6 PRs merged

**Gate Status**: ⬜ PENDING → ✅ PASS or ❌ FAIL

---

## PHASE 5: TESTING & QUALITY (Day 10-12, 33 hours)

**Owners**: Dev A (unit/integration) + Dev B (E2E/accessibility)

### Dev A Track: Backend Testing (20h)

- [ ] Service unit tests (8h)
  - EkoService: `__tests__/unit/services/eko-service.test.ts`
  - ConfigManager: `__tests__/unit/services/config-manager.test.ts`
  - WindowContextManager: `__tests__/unit/services/window-context-manager.test.ts`
  - Target: 80%+ coverage
  - PR: #26-unit-tests

- [ ] IPC integration tests (8h)
  - Mock main process setup
  - Test all handlers with real/mock contexts
  - Error scenarios
  - Target: 75%+ coverage
  - PR: #27-ipc-tests

- [ ] Error path testing (4h)
  - Test error handler recovery
  - Logger output verification
  - Telemetry capture
  - PR: #28-error-tests

### Dev B Track: Frontend Testing (13h)

- [ ] Component unit tests (6h)
  - UI components: `__tests__/unit/components/`
  - Custom hooks: `__tests__/unit/hooks/`
  - Target: 75%+ coverage
  - PR: #29-component-tests

- [ ] E2E critical flows (5h)
  - Agent task execution
  - Browser automation
  - Scheduled task execution
  - PR: #30-e2e-tests

- [ ] Accessibility verification (2h)
  - Screen reader testing
  - Keyboard navigation
  - PR: #31-a11y-verify

**Gate Check (EOD Day 12)**:
- [ ] Backend coverage >80%: `pnpm test -- --coverage src/`
- [ ] Frontend coverage >75%: `pnpm test -- --coverage components/`
- [ ] E2E tests: 100% critical flows pass
- [ ] TypeScript strict: `tsc --strict` ✅
- [ ] All tests green: `pnpm test` ✅
- [ ] All 5 PRs merged

**Gate Status**: ⬜ PENDING → ✅ PASS or ❌ FAIL

---

## PHASE 6: DOCUMENTATION (Day 13-14, 11 hours)

**Owners**: Both devs (2-3 hours each)

- [ ] Update CLAUDE.md (2h)
  - Reflect new architecture patterns
  - Document DI container usage
  - Add error handling examples
  - PR: #32-claude-md

- [ ] API Documentation (4h)
  - Document all IPC channels
  - Document service interfaces
  - Add integration examples
  - File: `docs/API.md`
  - PR: #33-api-docs

- [ ] Architecture Diagrams (3h)
  - System component diagram
  - Data flow diagram
  - Window management diagram
  - File: `docs/ARCHITECTURE.md`
  - PR: #34-architecture

- [ ] Contributing Guidelines (2h)
  - Setup instructions
  - Development standards
  - Testing requirements
  - File: `CONTRIBUTING.md`
  - PR: #35-contributing

**Gate Check (EOD Day 14)**:
- [ ] All documentation merged
- [ ] Links verified
- [ ] Examples tested
- [ ] Onboarding materials ready

**Gate Status**: ⬜ PENDING → ✅ PASS or ❌ FAIL

---

## PROJECT COMPLETION VERIFICATION

**Final Checklist (Day 14-15)**:

### Build Verification
- [ ] `pnpm install` succeeds
- [ ] `pnpm run build` succeeds
- [ ] `pnpm run build:deps` succeeds
- [ ] Bundle size <500KB (gzipped): `pnpm analyze-bundle`

### Test Verification
- [ ] `pnpm test` - all tests pass (0 failures)
- [ ] Coverage backend >80%
- [ ] Coverage frontend >75%
- [ ] E2E tests: all pass
- [ ] No console errors/warnings in dev mode

### Type Verification
- [ ] `tsc --strict` passes
- [ ] No `any` types: `grep -r "any" --include="*.ts" electron/ src/ | wc -l == 0`
- [ ] All interfaces exported

### Quality Verification
- [ ] `pnpm run lint` passes
- [ ] `pnpm test:speech` passes (or skipped if N/A)
- [ ] WCAG 2.1 AA: axe-core audit = 0 violations
- [ ] Responsive tested: 375px, 1024px, 1920px

### Deployment Readiness
- [ ] Production build tested
- [ ] All 35 PRs merged to main
- [ ] Main branch builds cleanly
- [ ] Release notes ready
- [ ] Documentation complete

### Final Status
- [ ] Project Status: ⬜ PENDING → ✅ COMPLETE or ❌ FAILED
- [ ] Quality Score: _____/100
- [ ] Timeline Variance: ±____%
- [ ] Blockers Encountered: ___
- [ ] Issues Resolved: ___

---

## DAILY STANDUP TEMPLATE

**Time**: 9:00 AM (15 minutes)
**Participants**: Dev A, Dev B
**Format**: Video call or Slack thread

```
Dev A Update:
├─ Yesterday: [What completed]
├─ Today: [What planned]
├─ Blockers: [Any issues]
└─ PR: [Link to review]

Dev B Update:
├─ Yesterday: [What completed]
├─ Today: [What planned]
├─ Blockers: [Any issues]
└─ Design: [Screenshot/Figma link]

Sync Items:
├─ Code review turnaround: <4 hours?
├─ Any merge conflicts?
├─ Dependency updates needed?
└─ Adjustments to plan?
```

---

## BLOCKERS & ESCALATION

**If Blocked** (stuck >2 hours):

1. **Document**: What are you stuck on? What have you tried?
2. **Notify**: Message the other dev immediately
3. **Investigate**: 30-min pair programming session
4. **Fallback**: Switch to different task, escalate async
5. **Track**: Log blocker time for retrospective

**Escalation Path**:
- Dev A stuck → Dev B pairing (30 min)
- Still stuck → Switch tasks, document for async review
- Critical blocker → Notify stakeholder, adjust timeline

---

## SUCCESS METRICS

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Timeline | 8-12 days | TBD | ⬜ |
| Code Coverage (Backend) | >80% | TBD | ⬜ |
| Code Coverage (Frontend) | >75% | TBD | ⬜ |
| Test Pass Rate | 100% | TBD | ⬜ |
| Bundle Size | <500KB | TBD | ⬜ |
| WCAG 2.1 AA | 0 violations | TBD | ⬜ |
| Performance | <500ms screenshots | TBD | ⬜ |
| Pagination | 10K items smooth | TBD | ⬜ |

---

**Document Version**: 1.0
**Last Updated**: 2025-11-14
**Print this checklist and keep it visible during execution**
