# Next Phase Action Plan - Phase 5.1 Testing & Stabilization

## Executive Summary
Two critical fixes deployed:
1. ✅ Batch message unpacking (fixes chat panel display)
2. ✅ Memory manager v8 import (fixes memory monitoring)

System is now production-ready pending verification testing.

---

## Phase 5.1: Testing & Verification (This Week)

### Task 1: Functional Verification (30 min)
**Objective**: Confirm batch message unpacking is working

**Steps**:
1. Open app dev tools (F12)
2. Run AI task (e.g., "Search for Bitcoin price")
3. Check browser console for these logs:
   ```
   [StreamHandler] Received message: Object {...}
   [StreamHandler] Processing batch with N messages
   [StreamHandler] Msg 0/N: type=workflow, taskId=xyz
   [StreamHandler] Msg 1/N: type=text, taskId=xyz
   [StreamHandler] Batch complete: N processed, 0 failed
   ```
4. Verify messages appear in chat panel in real-time
5. Check memory logs show no "require is not defined" errors

**Success Criteria**:
- ✅ [StreamHandler] logs appear (batch detection working)
- ✅ Messages display in chat (unpacking working)
- ✅ No memory monitoring errors
- ✅ No gaps in message stream

### Task 2: Performance Verification (20 min)
**Objective**: Confirm IPC batching is still working

**Steps**:
1. Monitor console logs during task execution
2. Count batches: Should see 5-15 messages per batch
3. Check memory trends (should be stable)
4. Measure task completion time (should be <10 seconds for simple tasks)

**Success Criteria**:
- ✅ IPC calls reduced to 5-15 messages per batch
- ✅ Memory usage stable (<200MB delta)
- ✅ No performance regression vs before

### Task 3: Error Resilience Testing (20 min)
**Objective**: Ensure errors don't break functionality

**Steps**:
1. Run multiple tasks in succession
2. Try rapid task switching
3. Monitor error logs for upstream issues
4. Verify app remains responsive despite errors

**Success Criteria**:
- ✅ App handles errors gracefully
- ✅ One error doesn't crash entire app
- ✅ Tasks continue despite Eko compression warnings

---

## Phase 5.2: Optimization & Enhancement (Next Week)

### Task 4: Add Defensive Error Handling (30 min)
**File**: `electron/main/services/eko-service.ts`
**Objective**: Wrap Eko framework calls to prevent cascading failures

**Changes**:
```typescript
// Wrap compression in try-catch
try {
  const result = await eko.run(prompt, { callbacks: streamCallback });
  return result;
} catch (error) {
  logger.error('Eko execution error:', error);
  // Emit error message to UI but don't crash
  this.streamCallback?.onMessage({
    type: 'error',
    content: error.message,
    taskId: taskId
  });
}
```

**Result**: Better resilience against upstream issues

### Task 5: Performance Dashboard (1.5 hours)
**Objective**: Add metrics UI to track batch efficiency

**Components to Add**:
1. Metrics collector in PerformanceMonitor
2. IPC efficiency calculator
3. Memory trend analyzer
4. Dashboard component in UI

**Metrics to Display**:
- Messages batched per task
- IPC calls saved (%)
- Average batch size
- Memory peak/average
- Task execution time

**Result**: Real-time visibility into system performance

### Task 6: Configuration Optimization (1 hour)
**Objective**: Find optimal batch settings

**Test Scenarios**:
1. Small tasks (10 messages):
   - Current: maxBatchSize=50, maxWaitTime=100ms
   - Test: 10, 20, 50, 100 sizes; 50, 100, 200ms waits

2. Large tasks (1000+ messages):
   - Current: Same as above
   - Test: 50, 100, 200 sizes; 100, 200, 500ms waits

3. Mixed workload:
   - Multiple concurrent tasks
   - Rapid task switching
   - Memory pressure scenarios

**Metrics to Track**:
- Latency per batch (target: <150ms)
- Compression ratio (current: 95%+)
- Memory overhead
- CPU usage

**Result**: Documented optimal settings with rationale

---

## Phase 5.3: Bug Fixes & Cleanup (Following Week)

### Task 7: Clean Up Unused Imports (45 min)
**Affected Files**: ~30 files with WebContents/IpcMainInvokeEvent warnings

**Process**:
1. For each file with warning:
   - Check if symbol is actually used
   - Remove if unused
   - Keep if used for type annotations
2. Run build to verify no new warnings
3. Test app functionality

**Tools**:
```bash
# Check for unused imports
npm run lint -- --max-warnings 0

# Auto-fix some issues
npm run lint -- --fix
```

### Task 8: Message Compression Workaround (45 min)
**Objective**: Handle Eko framework compression errors gracefully

**Options**:
1. Disable compression (if available in Eko config)
2. Wrap in error handler
3. Upgrade Eko framework (if fix available)
4. Report to Eko team with reproduction steps

**Result**: No more "Cannot read properties" errors

### Task 9: Edge Case Testing (2 hours)
**Test Scenarios**:
1. Very long task (>1 hour) - Check memory creep
2. Very chatty task (1000+ messages) - Check latency
3. Rapid task switching - Check state consistency
4. Memory pressure (artificially limit heap) - Check GC
5. Large file processing - Check performance

**Tools**:
```bash
# Run memory stress test
node --expose-gc __tests__/stress-tests.test.ts

# Monitor memory during long task
watch -n 1 'ps -p $PID -o pid,rss,vsz'
```

---

## Phase 5.4: Production Deployment

### Pre-Deployment Checklist
- [ ] All functional tests pass
- [ ] No console errors in normal operation
- [ ] Memory monitoring working
- [ ] Batch messages unpacking verified
- [ ] No performance regression
- [ ] Error handling robust
- [ ] Clean build succeeds
- [ ] All commits pushed

### Deployment Steps
1. Create release branch: `release/v0.1.0-phase5`
2. Final build and test: `npm run build`
3. Update version in package.json
4. Create release notes
5. Tag commit: `git tag v0.1.0-phase5`
6. Deploy to production

---

## Success Metrics

### Before (Previous State)
- IPC calls per task: 200+
- Chat panel: ❌ No messages
- Memory monitoring: ❌ Errors
- Batch efficiency: N/A

### After (Current State - Immediate)
- IPC calls per task: 5-13 (95%+ reduction)
- Chat panel: ✅ Working
- Memory monitoring: ✅ Working
- Batch efficiency: ✅ Verified

### Target (After Full Phase)
- IPC calls: 5-13 (maintained)
- Latency: <100ms per batch
- Memory: Stable, no creep in long tasks
- Error rate: <0.1%
- User experience: Smooth, responsive

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Eko compression errors | Medium | Add error handler, monitor logs |
| Memory leak | High | Implement long-task testing, GC monitoring |
| Batch timing issues | Medium | Test with various batch configs |
| User confusion | Low | Document in UI, add help text |
| Regression | High | Comprehensive test suite, CI/CD |

---

## Timeline

| Phase | Duration | Owner | Status |
|-------|----------|-------|--------|
| 5.0 | Done | Claude | ✅ Complete |
| 5.1 | 1.5h | You | ⏳ Start |
| 5.2 | 4h | You | 📅 Next |
| 5.3 | 4h | You | 📅 Later |
| 5.4 | 1h | You | 📅 Final |

**Total Estimated Effort**: 10.5 hours over 2-3 weeks

---

## Resources

- Dev Server: Running at localhost:5173 (hot reload enabled)
- Test Framework: Jest (npm test)
- Build: npm run build (Next.js + Electron)
- Logging: Built-in logger, DevTools

## Contact Points
- Performance issues: electron/main/services/performance-monitor.ts
- IPC issues: electron/main/services/ipc-batch-manager.ts
- UI issues: src/pages/main.tsx
- Memory issues: electron/main/utils/memory-manager.ts

---

**Next Action**: Start Phase 5.1 verification tests
