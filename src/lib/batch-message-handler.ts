import { ipcRenderer } from 'electron';

/**
 * Renderer process batch message handler
 * Processes both batched and single IPC messages
 */

export class BatchMessageHandler {
  private handlers = new Map<string, Array<(data: any) => void>>();
  private messageQueue: any[] = [];
  private isProcessing = false;

  constructor() {
    this.setupGlobalListeners();
  }

  /**
   * Register a handler for a specific channel
   */
  public on(channel: string, callback: (data: any) => void): void {
    if (!this.handlers.has(channel)) {
      this.handlers.set(channel, []);

      // Setup listener only once per channel
      ipcRenderer.on(channel, (event, data) => {
        this.handleMessage(channel, data);
      });
    }

    this.handlers.get(channel)!.push(callback);
  }

  /**
   * Unregister a handler
   */
  public off(channel: string, callback: (data: any) => void): void {
    const handlers = this.handlers.get(channel);
    if (handlers) {
      const index = handlers.indexOf(callback);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * Handle incoming messages (batch or single)
   */
  private handleMessage(channel: string, data: any): void {
    if (data?.type === 'batch') {
      this.processBatch(channel, data);
    } else {
      this.processSingle(channel, data);
    }
  }

  /**
   * Process batched messages
   */
  private processBatch(channel: string, batch: any): void {
    const callbacks = this.handlers.get(channel);
    if (!callbacks) return;

    // Queue messages for processing
    if (batch.messages && Array.isArray(batch.messages)) {
      for (const message of batch.messages) {
        this.messageQueue.push({
          channel: message.channel,
          data: message.data,
          timestamp: message.timestamp,
        });
      }
    }

    // Process queue
    this.processQueue();
  }

  /**
   * Process single messages
   */
  private processSingle(channel: string, data: any): void {
    this.messageQueue.push({
      channel,
      data,
      timestamp: Date.now(),
    });

    this.processQueue();
  }

  /**
   * Process message queue
   */
  private processQueue(): void {
    if (this.isProcessing || this.messageQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    // Process messages in batches using requestAnimationFrame for UI responsiveness
    const processBatch = () => {
      const batchSize = Math.min(10, this.messageQueue.length);

      for (let i = 0; i < batchSize; i++) {
        const item = this.messageQueue.shift();
        if (!item) break;

        const callbacks = this.handlers.get(item.channel);
        if (callbacks) {
          for (const callback of callbacks) {
            try {
              callback(item.data);
            } catch (error) {
              console.error(`Error in handler for channel "${item.channel}":`, error);
            }
          }
        }
      }

      if (this.messageQueue.length > 0) {
        requestAnimationFrame(processBatch);
      } else {
        this.isProcessing = false;
      }
    };

    requestAnimationFrame(processBatch);
  }

  /**
   * Global listeners for debugging
   */
  private setupGlobalListeners(): void {
    // Track message statistics
    const stats = {
      totalMessages: 0,
      totalBatches: 0,
      averageBatchSize: 0,
    };

    // Listen to all channels for stats (in production, disable this)
    if (process.env.NODE_ENV === 'development') {
      ipcRenderer.on('eko-stream-message', (event, data) => {
        if (data?.type === 'batch') {
          stats.totalBatches++;
          stats.totalMessages += data.messages?.length || 0;
          stats.averageBatchSize = stats.totalMessages / stats.totalBatches;

          console.log(
            `[Batch] Size: ${data.messages?.length || 0}, Total: ${stats.totalMessages}, Avg: ${stats.averageBatchSize.toFixed(1)}`
          );
        } else {
          stats.totalMessages++;
          console.log('[Single] Total messages:', stats.totalMessages);
        }
      });
    }
  }

  /**
   * Get statistics
   */
  public getStats() {
    return {
      queueLength: this.messageQueue.length,
      isProcessing: this.isProcessing,
      registeredChannels: Array.from(this.handlers.keys()),
    };
  }

  /**
   * Clear queue
   */
  public clearQueue(): void {
    this.messageQueue = [];
  }
}

// Singleton instance
let handlerInstance: BatchMessageHandler | null = null;

export function getBatchMessageHandler(): BatchMessageHandler {
  if (!handlerInstance) {
    handlerInstance = new BatchMessageHandler();
  }
  return handlerInstance;
}

// Example usage in React component:
// 
// import { useEffect } from 'react';
// import { getBatchMessageHandler } from './batch-message-handler';
// 
// export function ChatComponent() {
//   const handler = getBatchMessageHandler();
// 
//   useEffect(() => {
//     const handleStreamMessage = (data) => {
//       console.log('Received:', data);
//       // Update UI with message
//     };
// 
//     handler.on('eko-stream-message', handleStreamMessage);
// 
//     return () => {
//       handler.off('eko-stream-message', handleStreamMessage);
//     };
//   }, []);
// 
//   return null; // Your chat UI here
// }