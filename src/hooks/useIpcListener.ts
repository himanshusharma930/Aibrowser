import { useEffect, useRef } from 'react';

/**
 * Custom hook for IPC listeners with automatic cleanup
 * Prevents memory leaks by cleaning up listeners on unmount
 * 
 * @example
 * useIpcListener('eko-stream-message', (data) => {
 *   console.log('Received:', data);
 * });
 */
export function useIpcListener<T = any>(
  channel: string,
  callback: (data: T) => void,
  deps: React.DependencyList = []
) {
  const callbackRef = useRef(callback);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (data: T) => {
      callbackRef.current(data);
    };

    // Register listener based on channel
    let cleanup: (() => void) | undefined;

    if (typeof window !== 'undefined' && (window as any).api) {
      const api = (window as any).api;

      // Map common channels to their API methods
      if (channel === 'eko-stream-message' && api.eko?.onStreamMessage) {
        cleanup = api.eko.onStreamMessage(handler);
      } else if (channel === 'url-changed' && api.view?.onUrlChange) {
        cleanup = api.view.onUrlChange(handler);
      } else if (channel === 'voice-text-received' && api.voice?.onVoiceTextReceived) {
        cleanup = api.voice.onVoiceTextReceived(handler);
      } else if (channel === 'tts-subtitle-received' && api.voice?.onTTSSubtitleReceived) {
        cleanup = api.voice.onTTSSubtitleReceived(handler);
      } else if (channel === 'task-execution-complete' && api.util?.onTaskExecutionComplete) {
        cleanup = api.util.onTaskExecutionComplete(handler);
      } else if (channel === 'open-history-panel' && api.util?.onOpenHistoryPanel) {
        cleanup = api.util.onOpenHistoryPanel(handler);
      } else if (channel === 'task-aborted-by-system' && api.util?.onTaskAbortedBySystem) {
        cleanup = api.util.onTaskAbortedBySystem(handler);
      }
    }

    // Cleanup on unmount
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [channel, ...deps]);
}

/**
 * Hook for multiple IPC listeners
 * 
 * @example
 * useIpcListeners({
 *   'eko-stream-message': (data) => console.log(data),
 *   'url-changed': (url) => setUrl(url),
 * });
 */
export function useIpcListeners(
  listeners: Record<string, (data: any) => void>,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    if (typeof window !== 'undefined' && (window as any).api) {
      const api = (window as any).api;

      Object.entries(listeners).forEach(([channel, callback]) => {
        let cleanup: (() => void) | undefined;

        if (channel === 'eko-stream-message' && api.eko?.onStreamMessage) {
          cleanup = api.eko.onStreamMessage(callback);
        } else if (channel === 'url-changed' && api.view?.onUrlChange) {
          cleanup = api.view.onUrlChange(callback);
        } else if (channel === 'voice-text-received' && api.voice?.onVoiceTextReceived) {
          cleanup = api.voice.onVoiceTextReceived(callback);
        } else if (channel === 'tts-subtitle-received' && api.voice?.onTTSSubtitleReceived) {
          cleanup = api.voice.onTTSSubtitleReceived(callback);
        } else if (channel === 'task-execution-complete' && api.util?.onTaskExecutionComplete) {
          cleanup = api.util.onTaskExecutionComplete(callback);
        } else if (channel === 'open-history-panel' && api.util?.onOpenHistoryPanel) {
          cleanup = api.util.onOpenHistoryPanel(callback);
        } else if (channel === 'task-aborted-by-system' && api.util?.onTaskAbortedBySystem) {
          cleanup = api.util.onTaskAbortedBySystem(callback);
        }

        if (cleanup) {
          cleanups.push(cleanup);
        }
      });
    }

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, [...deps]);
}
