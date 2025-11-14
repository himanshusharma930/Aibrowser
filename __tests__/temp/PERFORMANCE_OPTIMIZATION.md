# Production Performance Optimization Guide

**Document Version**: 1.0.0
**Phase**: Phase 4 Task 5
**Date**: Production Deployment Preparation

---

## Executive Summary

Performance optimization roadmap for AI Browser Electron application covering UI rendering, memory management, and task execution efficiency.

**Baseline Performance Targets**:
- Initial render: < 2 seconds
- Task execution startup: < 1 second
- Memory footprint: < 500MB (idle), < 1.2GB (active)
- IPC latency: < 50ms (p99)

---

## 1. Frontend Performance (React/Next.js)

### 1.1 Code Splitting Strategy

**Current State**: ✅ Next.js handles automatic code splitting

**Optimization**:
```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const AgentContextTransfer = dynamic(
  () => import('@/components/chat/AgentContextTransfer'),
  { loading: () => <Skeleton /> }
);

const MCPToolSelector = dynamic(
  () => import('@/components/MCPToolSelector'),
  { loading: () => <Skeleton /> }
);
```

**Measurement**:
```bash
# Analyze bundle size
npm run build && npm run analyze

# Expected output:
# - Main bundle: ~250KB (gzipped)
# - Chat component: ~45KB
# - Agent components: ~35KB
```

### 1.2 Rendering Optimization

**Memoization Strategy**:
```typescript
// Prevent unnecessary re-renders of message list
import { memo } from 'react';

export const MessageItem = memo(({ message }) => {
  return <div>{message.content}</div>;
}, (prev, next) => {
  // Custom comparison - only re-render if message ID changes
  return prev.message.id === next.message.id;
});

// Use in list rendering
const MessageList = ({ messages }) => (
  <div>
    {messages.map(msg => (
      <MessageItem key={msg.id} message={msg} />
    ))}
  </div>
);
```

**Virtualization for Long Lists**:
```typescript
// For 100+ messages, use react-window
import { FixedSizeList } from 'react-window';

const VirtualizedMessageList = ({ messages }) => (
  <FixedSizeList
    height={600}
    itemCount={messages.length}
    itemSize={80}
  >
    {({ index, style }) => (
      <div style={style}>
        <MessageItem message={messages[index]} />
      </div>
    )}
  </FixedSizeList>
);
```

### 1.3 React Query/SWR Optimization

**Current**: ⚠️ Manual fetch management

**Recommendation**: Implement React Query
```typescript
import { useQuery } from '@tanstack/react-query';

// API call with automatic caching and deduplication
const useTaskHistory = (taskId: string) => {
  return useQuery(
    ['task', taskId],
    () => fetchTask(taskId),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      retryDelay: 1000,
    }
  );
};
```

### 1.4 CSS-in-JS Performance

**Current**: ✅ Ant Design with CSS-in-JS

**Optimization**:
```typescript
// Use atomic CSS to reduce bundle size
import { createStyles, makeStyles } from 'antd/es/theme/useToken';

// Pre-defined styles instead of inline
const useStyles = createStyles({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});

export const Component = () => {
  const { styles } = useStyles();
  return <div className={styles.container} />;
};
```

---

## 2. Electron Main Process Performance

### 2.1 IPC Channel Optimization

**Current State**: Individual IPC handlers

**Optimization Strategy**:
```typescript
// Batch IPC calls to reduce context switches
interface BatchedIpcRequest {
  id: string;
  channel: string;
  args: any[];
}

// Send multiple requests in single IPC call
const batchedIpcCall = async (requests: BatchedIpcRequest[]) => {
  const results = await window.api.batch(requests);
  return results; // Map of id -> result
};

// Usage
const results = await batchedIpcCall([
  { id: '1', channel: 'config:get', args: ['api_key'] },
  { id: '2', channel: 'tools:list', args: [] },
  { id: '3', channel: 'tasks:status', args: [] },
]);
```

### 2.2 Memory Management

**Current**: Electron garbage collection

**Optimization**:
```typescript
// Monitor memory usage
setInterval(() => {
  const memUsage = process.memoryUsage();
  console.log('Memory:', {
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
    external: Math.round(memUsage.external / 1024 / 1024),
  });

  // Trigger garbage collection if over threshold
  if (memUsage.heapUsed > 800 * 1024 * 1024) {
    if (global.gc) {
      global.gc();
      console.log('Forced garbage collection');
    }
  }
}, 30000); // Every 30 seconds
```

### 2.3 Window Creation Optimization

**Lazy Window Initialization**:
```typescript
// Create windows only when needed
let detailView: WebContentsView | null = null;

const getDetailView = () => {
  if (!detailView) {
    detailView = createView('https://about:blank', 'view', '1');
    mainWindow.contentView.addChildView(detailView);
  }
  return detailView;
};

// Destroy unused windows after 5 minutes idle
const scheduleWindowCleanup = () => {
  setTimeout(() => {
    if (detailView && !hasActiveTask()) {
      detailView.webContents.close();
      detailView = null;
    }
  }, 5 * 60 * 1000);
};
```

---

## 3. Task Execution Performance

### 3.1 Eko Service Optimization

**Current**: Single task queue

**Optimization - Concurrent Task Management**:
```typescript
class OptimizedEkoService extends EkoService {
  private taskQueue: Map<string, TaskContext> = new Map();
  private activeTaskLimit = 3; // Max concurrent tasks

  async queueTask(taskConfig: any): Promise<string> {
    const taskId = this.generateTaskId();

    if (this.taskQueue.size >= this.activeTaskLimit) {
      // Queue task, wait for slot
      await this.waitForTaskSlot();
    }

    const context = { taskId, config: taskConfig };
    this.taskQueue.set(taskId, context);
    this.executeTask(taskId);

    return taskId;
  }

  private async waitForTaskSlot(): Promise<void> {
    return new Promise(resolve => {
      const checkInterval = setInterval(() => {
        if (this.taskQueue.size < this.activeTaskLimit) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }
}
```

### 3.2 Memory Checkpointing

**Checkpoint Optimization**:
```typescript
interface CheckpointMetrics {
  timestamp: number;
  memoryUsed: number;
  taskProgress: number;
  contextSize: number;
}

class CheckpointOptimizer {
  analyzeCheckpoint(checkpoint: CheckpointMetrics): {
    compressionRatio: number;
    estimatedRestoreTime: number;
  } {
    // Estimate compression (typically 60-70% reduction)
    const compressedSize = checkpoint.contextSize * 0.35;
    const compressionRatio = (1 - compressedSize / checkpoint.contextSize) * 100;

    // Estimate restore time (typically 100-200ms)
    const estimatedRestoreTime = (compressedSize / 1024 / 1024) * 50;

    return { compressionRatio, estimatedRestoreTime };
  }

  shouldCreateCheckpoint(context: any): boolean {
    // Create checkpoints every 10 task nodes or 5MB context
    return context.nodeCount % 10 === 0 || context.contextSize > 5 * 1024 * 1024;
  }
}
```

### 3.3 Tool Execution Caching

**MCP Tool Response Caching**:
```typescript
class CachedMcpClient {
  private cache: Map<string, { result: any; timestamp: number }> = new Map();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes

  async executeTool(toolName: string, args: any[]): Promise<any> {
    const cacheKey = `${toolName}:${JSON.stringify(args)}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      console.log(`Cache hit: ${cacheKey}`);
      return cached.result;
    }

    const result = await super.executeTool(toolName, args);
    this.cache.set(cacheKey, { result, timestamp: Date.now() });
    return result;
  }

  clearCache(toolName?: string): void {
    if (toolName) {
      // Clear specific tool cache
      for (const key of this.cache.keys()) {
        if (key.startsWith(`${toolName}:`)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }
}
```

---

## 4. Browser View Performance

### 4.1 Screenshot Optimization

**Current Configuration**: `EKO_SCREENSHOT_SCALE=0.5`

**Advanced Optimization**:
```typescript
class OptimizedScreenshotManager {
  // Adaptive scaling based on content
  getOptimalScale(viewportWidth: number): number {
    // For large screens, use lower scale
    if (viewportWidth > 1920) return 0.3;
    if (viewportWidth > 1440) return 0.4;
    return 0.5;
  }

  // Lazy screenshot - only capture visible viewport
  async captureVisibleArea(bounds: any): Promise<Buffer> {
    const visibleBounds = this.calculateVisibleArea(bounds);
    return await this.captureArea(visibleBounds, this.getOptimalScale(bounds.width));
  }

  private calculateVisibleArea(bounds: any): any {
    // Exclude off-screen areas
    return {
      x: Math.max(0, bounds.x),
      y: Math.max(0, bounds.y),
      width: Math.min(bounds.width, 1920),
      height: Math.min(bounds.height, 1080),
    };
  }
}
```

### 4.2 HTML Content Caching

**Cache Strategy**:
```typescript
class ContentCache {
  private cache: Map<string, { html: string; timestamp: number }> = new Map();
  private cacheTTL = 2 * 60 * 1000; // 2 minutes

  async getPageContent(url: string): Promise<string> {
    const cached = this.cache.get(url);

    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.html;
    }

    const html = await this.fetchContent(url);
    this.cache.set(url, { html, timestamp: Date.now() });
    return html;
  }

  // Preload content for likely next pages
  preloadCommonPages(baseUrl: string): void {
    const commonPaths = ['/login', '/dashboard', '/settings'];
    commonPaths.forEach(path => {
      this.getPageContent(`${baseUrl}${path}`);
    });
  }
}
```

---

## 5. Startup Performance

### 5.1 App Initialization Optimization

**Lazy Loading Strategy**:
```typescript
// main/index.ts - Defer non-critical initialization
async function initializeMainWindow(): Promise<BrowserWindow> {
  // Critical path: Create main window fast
  const mainWindow = await mainWindowManager.createMainWindow();
  console.time('MainWindow');

  // Non-critical: Initialize in background
  setImmediate(() => {
    ekoService.initialize();
    taskScheduler.start();
    setupAutoUpdater();
  });

  return mainWindow;
}

// Measure startup time
console.timeEnd('MainWindow'); // Should be < 1000ms
```

### 5.2 Module Loading Optimization

**Tree-Shaking Configuration** (package.json):
```json
{
  "sideEffects": [
    "src/lib/i18n.ts",
    "src/lib/init-ipc.ts"
  ],
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js"
    }
  }
}
```

---

## 6. Network Performance

### 6.1 API Call Optimization

**Batching Pattern**:
```typescript
class ApiBatcher {
  private queue: Array<{ channel: string; args: any; resolve: Function }> = [];
  private batchTimeout: NodeJS.Timeout | null = null;

  async call(channel: string, ...args: any[]): Promise<any> {
    return new Promise(resolve => {
      this.queue.push({ channel, args, resolve });

      if (!this.batchTimeout) {
        this.batchTimeout = setTimeout(() => this.flush(), 16); // 16ms batch window
      }
    });
  }

  private async flush(): Promise<void> {
    const batch = this.queue.splice(0);
    this.batchTimeout = null;

    if (batch.length === 0) return;

    // Send all in single IPC call
    const results = await window.api.batch(batch);
    batch.forEach((item, index) => {
      item.resolve(results[index]);
    });
  }
}
```

### 6.2 Request Deduplication

**Deduplication Service**:
```typescript
class RequestDeduplicator {
  private pendingRequests: Map<string, Promise<any>> = new Map();

  async execute<T>(key: string, fn: () => Promise<T>): Promise<T> {
    // If same request already in-flight, reuse result
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!;
    }

    const promise = fn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

// Usage
const dedup = new RequestDeduplicator();

const tasksA = await dedup.execute('tasks-list', () =>
  window.api.eko.getTaskHistory()
);

// Same request deduped
const tasksB = await dedup.execute('tasks-list', () =>
  window.api.eko.getTaskHistory()
);

// tasksA === tasksB (same Promise)
```

---

## 7. Monitoring & Metrics

### 7.1 Performance Monitoring Setup

**Configuration**:
```typescript
// electron/main/utils/metrics.ts
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  record(metric: string, value: number): void {
    if (!this.metrics.has(metric)) {
      this.metrics.set(metric, []);
    }
    this.metrics.get(metric)!.push(value);

    // Keep last 1000 samples
    const samples = this.metrics.get(metric)!;
    if (samples.length > 1000) {
      samples.shift();
    }
  }

  getStats(metric: string): { avg: number; p50: number; p99: number } {
    const samples = this.metrics.get(metric) || [];
    if (samples.length === 0) return { avg: 0, p50: 0, p99: 0 };

    const sorted = [...samples].sort((a, b) => a - b);
    return {
      avg: samples.reduce((a, b) => a + b) / samples.length,
      p50: sorted[Math.floor(samples.length * 0.5)],
      p99: sorted[Math.floor(samples.length * 0.99)],
    };
  }

  report(): void {
    console.log('=== Performance Metrics ===');
    for (const [metric, samples] of this.metrics) {
      const stats = this.getStats(metric);
      console.log(`${metric}: avg=${stats.avg.toFixed(2)}ms, p50=${stats.p50.toFixed(2)}ms, p99=${stats.p99.toFixed(2)}ms`);
    }
  }
}

export const monitor = new PerformanceMonitor();
```

### 7.2 Frontend Performance Metrics

**React Performance Profiling**:
```typescript
import { Profiler } from 'react';

export const ProfiledComponent = ({ children }) => (
  <Profiler
    id="main-app"
    onRender={(id, phase, actualDuration) => {
      console.log(`${id} (${phase}) took ${actualDuration}ms`);

      // Log to backend if over threshold
      if (actualDuration > 100) {
        logSlowRender({
          component: id,
          phase,
          duration: actualDuration,
          timestamp: new Date(),
        });
      }
    }}
  >
    {children}
  </Profiler>
);
```

---

## 8. Production Performance Targets

| Metric | Target | Priority |
|--------|--------|----------|
| App startup time | < 2s | Critical |
| Task execution startup | < 1s | Critical |
| IPC call latency (p99) | < 50ms | High |
| Screenshot capture time | < 500ms | High |
| Message render time | < 100ms | Medium |
| Task context switch overhead | < 5% | Medium |
| Memory footprint (idle) | < 500MB | Medium |
| Memory footprint (active) | < 1.2GB | High |

---

## 9. Load Testing Scenarios

### 9.1 Concurrent Task Execution

**Test Case**:
```typescript
// Simulate 10 concurrent tasks
async function testConcurrentTasks() {
  const start = Date.now();
  const taskPromises = Array.from({ length: 10 }, async (_, i) => {
    return ekoService.executeTask({
      workflow: `task-${i}`,
      agents: ['BrowserAgent'],
      tools: ['navigate', 'click'],
    });
  });

  const results = await Promise.all(taskPromises);
  const duration = Date.now() - start;

  console.log(`10 concurrent tasks completed in ${duration}ms`);
  console.log(`Average per task: ${duration / 10}ms`);
}
```

### 9.2 Message Stream Performance

**Test Case**:
```typescript
// Simulate 1000 stream messages
async function testStreamPerformance() {
  const messages = Array.from({ length: 1000 }, (_, i) => ({
    type: 'text_streaming',
    content: `Message ${i}`,
    timestamp: Date.now() + i,
  }));

  const start = Date.now();
  for (const msg of messages) {
    await processStreamMessage(msg);
  }
  const duration = Date.now() - start;

  console.log(`1000 messages processed in ${duration}ms`);
  console.log(`Throughput: ${(1000 / (duration / 1000)).toFixed(0)} msg/sec`);
}
```

---

## 10. Production Checklist

- [ ] Frontend bundle size < 300KB gzipped
- [ ] App startup time < 2 seconds
- [ ] IPC call latency p99 < 50ms
- [ ] Memory monitoring implemented
- [ ] Performance metrics dashboard ready
- [ ] Load testing completed successfully
- [ ] Production build tested on target hardware
- [ ] Monitoring and alerting configured
- [ ] Performance regression tests in CI/CD
- [ ] Baseline metrics established

---

**Next Phase**: Deploy with monitoring enabled and collect baseline metrics for continuous optimization.

