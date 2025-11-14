// Test configuration for IPC batching
import { IPCBatchManager } from '../services/ipc-batch-manager';
import { PerformanceMonitor } from '../services/performance-monitor';

// Test configuration
const testConfig = {
  maxBatchSize: 10, // Smaller batches for testing
  maxWaitTime: 50,  // Faster flushing for testing
  enabled: true,
};

// Test scenario: Simulate 200 messages
const simulateMessages = (batchManager: IPCBatchManager, webContents: any) => {
  console.log('Starting IPC batching test...');

  const startTime = Date.now();
  const messageCount = 200;

  // Simulate rapid message sending
  for (let i = 0; i < messageCount; i++) {
    batchManager.addMessage('test-channel', { message: `test-${i}`, timestamp: Date.now() }, webContents);
  }

  // Force flush remaining messages
  setTimeout(() => {
    batchManager.flushAll(webContents);

    const endTime = Date.now();
    const metrics = batchManager.getMetrics();

    console.log(`\n🎯 IPC Batching Test Results:`);
    console.log(`- Messages processed: ${metrics.messagesBatched}`);
    console.log(`- Batches created: ${metrics.batchesCreated}`);
    console.log(`- Average batch size: ${metrics.averageBatchSize.toFixed(2)}`);
    console.log(`- Efficiency improvement: ${(200 / metrics.batchesCreated).toFixed(1)}x`);
    console.log(`- Test duration: ${endTime - startTime}ms`);

    // Expected: ~200 messages > ~20 batches (10x improvement)
    const expectedBatches = Math.ceil(messageCount / testConfig.maxBatchSize);
    console.log(`\n✅ Expected: ${expectedBatches} batches`);
    console.log(`✅ Actual: ${metrics.batchesCreated} batches`);

  }, 200);
};

// Test suite
export const runIPCBatchingTests = () => {
  console.log('🧪 Running IPC Batching Tests...');

  const performanceMonitor = new PerformanceMonitor();
  const batchManager = new IPCBatchManager(testConfig, performanceMonitor);

  // Mock WebContents for testing
  const mockWebContents = {
    send: (channel: string, data: any) => {
      console.log(`[MOCK SEND] ${channel}:`, data.type || 'single');
    }
  };

  // Run tests
  simulateMessages(batchManager, mockWebContents);

  // Performance monitoring
  performanceMonitor.on('metricsUpdate', (metrics) => {
    console.log('📊 Performance Update:', metrics);
  });

  return {
    batchManager,
    performanceMonitor,
    mockWebContents,
  };
};

// Export test utilities
export const testUtils = {
  runIPCBatchingTests,
  simulateMessages,
  testConfig,
};