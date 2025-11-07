---
title: IPC Communication System
description: Understanding the Inter-Process Communication architecture in Manus Electron, including handler registration, security, and best practices.
---

# IPC Communication System

Manus Electron uses Electron's IPC (Inter-Process Communication) system to enable secure communication between the main process and renderer processes. This document describes the architecture, initialization sequence, and best practices.

## Architecture Overview

### Process Separation

Manus Electron follows Electron's multi-process architecture:

- **Main Process** (`electron/main/`) - Node.js environment with full system access
- **Renderer Process** (`src/pages/`) - Chromium browser environment with restricted access
- **Preload Scripts** (`electron/preload/`) - Bridge between main and renderer with controlled API exposure

### Security Model

All IPC communication uses Electron's `contextBridge` API to expose a limited, secure API surface to renderer processes. Direct access to Node.js APIs or Electron modules is never available in the renderer.

```typescript
// electron/preload/index.ts
contextBridge.exposeInMainWorld('api', {
  // Only explicitly exposed methods are available
  ekoRun: (prompt: string) => ipcRenderer.invoke('eko-run', prompt),
  setDetailViewVisible: (visible: boolean) => ipcRenderer.invoke('set-detail-view-visible', visible),
  // ... other methods
});
```

## Initialization Sequence

### Critical: Early Handler Registration

**All IPC handlers are registered BEFORE window creation.** This ensures that renderer processes can communicate with the main process immediately upon initialization, preventing race conditions and "handler not found" errors.

```typescript
// electron/main/index.ts
(async () => {
  await app.whenReady();
  console.log("App is ready");

  // Step 1: Register all IPC handlers FIRST
  registerAllIpcHandlers();
  console.log('[IPC] All IPC handlers registered');

  // Step 2: Register protocols
  registerClientProtocol(protocol);

  // Step 3: Initialize cookies
  await initCookies();

  // Step 4: Start Next.js server
  await serverManager.startServer();

  // Step 5: Create windows (handlers already ready)
  const mainWindow = await createMainWindow();
})();
```

### Handler Categories

The `registerAllIpcHandlers()` function in `electron/main/ipc/index.ts` registers five categories of handlers:

#### 1. Eko Handlers (`registerEkoHandlers`)
AI agent task execution and management:
- `eko-run` - Start new AI task
- `eko-modify` - Modify existing task
- `eko-cancel-task` - Cancel running task
- `eko-stream-message` - Stream task progress

#### 2. View Handlers (`registerViewHandlers`)
WebContentsView coordination for browser automation:
- `get-main-view-screenshot` - Capture browser view screenshot
- `set-detail-view-visible` - Show/hide detail view
- `get-current-url` - Get current browser URL
- `update-detail-view-bounds` - Resize detail view
- `show-history-view` - Display historical screenshot
- `hide-history-view` - Hide historical view

#### 3. History Handlers (`registerHistoryHandlers`)
Task execution history management:
- `get-task-history` - Retrieve task history
- `delete-task-history` - Remove task from history
- `clear-task-history` - Clear all history

#### 4. Config Handlers (`registerConfigHandlers`)
User configuration persistence:
- `get-user-model-configs` - Retrieve model configurations
- `save-user-model-configs` - Save model configurations
- `get-selected-provider` - Get active AI provider
- `set-selected-provider` - Set active AI provider

#### 5. Agent Handlers (`registerAgentHandlers`)
Agent configuration and MCP tools:
- `get-agent-config` - Retrieve agent configuration
- `save-agent-config` - Save agent configuration
- `get-mcp-tools` - List available MCP tools
- `set-mcp-tool-enabled` - Enable/disable MCP tool

## Handler Implementation Pattern

### Main Process Handler

```typescript
// electron/main/ipc/view-handlers.ts
import { ipcMain } from "electron";
import { windowContextManager } from "../services/window-context-manager";

export function registerViewHandlers() {
  // Handler registration
  ipcMain.handle('set-detail-view-visible', async (event, visible: boolean) => {
    try {
      console.log('IPC set-detail-view-visible received:', visible);
      
      // Get window context for isolation
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.detailView) {
        throw new Error('DetailView not found for this window');
      }

      // Perform operation
      context.detailView.setVisible(visible);

      return { success: true, visible };
    } catch (error: any) {
      console.error('IPC set-detail-view-visible error:', error);
      throw error;
    }
  });

  console.log('[IPC] View control handlers registered');
}
```

### Preload Script Exposure

```typescript
// electron/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  // Expose handler as Promise-based method
  setDetailViewVisible: (visible: boolean): Promise<void> => {
    return ipcRenderer.invoke('set-detail-view-visible', visible);
  },
});
```

### Renderer Process Usage

```typescript
// src/pages/main.tsx
useEffect(() => {
  const updateDetailView = async () => {
    try {
      await window.api.setDetailViewVisible(showDetail);
    } catch (error) {
      console.error('Failed to set detail view visibility:', error);
    }
  };

  updateDetailView();
}, [showDetail]);
```

## Window Context Isolation

Manus Electron supports multiple windows (main window, task detail windows). The `windowContextManager` service ensures IPC handlers operate on the correct window context:

```typescript
// Get context for the sender window
const context = windowContextManager.getContext(event.sender.id);

// Access window-specific resources
context.detailView.setVisible(true);
context.historyView.loadURL(screenshotUrl);
```

This prevents cross-window interference and enables proper multi-window support.

## Error Handling Best Practices

### Main Process

```typescript
ipcMain.handle('my-handler', async (event, params) => {
  try {
    // Validate input
    if (!params || typeof params !== 'object') {
      throw new Error('Invalid parameters');
    }

    // Perform operation
    const result = await performOperation(params);

    // Return success response
    return { success: true, data: result };
  } catch (error: any) {
    console.error('[IPC] my-handler error:', error);
    
    // Return error response (don't throw)
    return { success: false, error: error.message };
  }
});
```

### Renderer Process

```typescript
const handleAction = async () => {
  try {
    const result = await window.api.myHandler(params);
    
    if (!result.success) {
      // Handle error response
      message.error(result.error || 'Operation failed');
      return;
    }

    // Handle success
    console.log('Operation succeeded:', result.data);
  } catch (error) {
    // Handle IPC communication failure
    console.error('IPC call failed:', error);
    message.error('Failed to communicate with main process');
  }
};
```

## Performance Considerations

### Debouncing Frequent Calls

For handlers called frequently (e.g., resize events), debounce in the renderer:

```typescript
const debouncedUpdateBounds = useMemo(
  () => debounce((bounds: DetailViewBounds) => {
    window.api.updateDetailViewBounds(bounds).catch(console.error);
  }, 100),
  []
);
```

### Throttling High-Frequency Events

For continuous events (e.g., scroll, mousemove), throttle to avoid overwhelming IPC:

```typescript
const throttledUpdate = useMemo(
  () => throttle((data: any) => {
    window.api.updateData(data).catch(console.error);
  }, 16), // 60fps
  []
);
```

### Batching Multiple Operations

When multiple related operations occur together, batch them:

```typescript
// Instead of multiple IPC calls
await window.api.updatePanelSize(size);
await window.api.updateDetailBounds(bounds);
await window.api.persistLayout(layout);

// Batch into single call
await window.api.updateLayout({ size, bounds, layout });
```

## Type Safety

All IPC methods have TypeScript type definitions in `src/type.d.ts`:

```typescript
declare global {
  interface Window {
    api: {
      // Eko handlers
      ekoRun: (prompt: string) => Promise<EkoResult>;
      ekoModify: (taskId: string, prompt: string) => Promise<EkoResult>;
      ekoCancelTask: (taskId: string) => Promise<void>;
      
      // View handlers
      setDetailViewVisible: (visible: boolean) => Promise<void>;
      updateDetailViewBounds: (bounds: DetailViewBounds) => Promise<void>;
      
      // ... other methods
    }
  }
}
```

This ensures compile-time type checking and IDE autocomplete for all IPC methods.

## Testing IPC Handlers

### Unit Testing Main Process Handlers

```typescript
// electron/main/ipc/__tests__/view-handlers.test.ts
import { ipcMain } from 'electron';
import { registerViewHandlers } from '../view-handlers';

describe('View Handlers', () => {
  beforeAll(() => {
    registerViewHandlers();
  });

  it('should handle set-detail-view-visible', async () => {
    const mockEvent = { sender: { id: 1 } };
    const handler = ipcMain.listeners('set-detail-view-visible')[0];
    
    const result = await handler(mockEvent, true);
    expect(result.success).toBe(true);
  });
});
```

### Integration Testing Renderer-to-Main Communication

```typescript
// src/pages/__tests__/main-ipc.test.tsx
import { render, waitFor } from '@testing-library/react';
import MainPage from '../main';

describe('Main Page IPC Integration', () => {
  it('should call setDetailViewVisible when showDetail changes', async () => {
    const mockSetDetailViewVisible = jest.fn().mockResolvedValue(undefined);
    window.api.setDetailViewVisible = mockSetDetailViewVisible;

    const { rerender } = render(<MainPage />);
    
    // Trigger showDetail change
    // ... test logic
    
    await waitFor(() => {
      expect(mockSetDetailViewVisible).toHaveBeenCalledWith(true);
    });
  });
});
```

## Debugging IPC Communication

### Enable IPC Logging

```typescript
// electron/main/index.ts
if (isDev) {
  ipcMain.on('*', (event, ...args) => {
    console.log('[IPC Debug]', event.type, args);
  });
}
```

### Chrome DevTools

Open DevTools in the renderer process to inspect IPC calls:

```javascript
// In renderer console
console.log('Available API methods:', Object.keys(window.api));

// Test IPC call
await window.api.setDetailViewVisible(true);
```

### Main Process Console

View main process logs in the terminal where you ran `pnpm run dev`:

```
[IPC] All IPC handlers registered
[IPC] set-detail-view-visible received: true
[IPC] View control handlers registered
```

## Common Pitfalls

### 1. Handler Not Registered Before Window Creation

**Problem**: Renderer tries to call IPC method before handler is registered.

**Solution**: Ensure `registerAllIpcHandlers()` is called before `createMainWindow()`.

### 2. Missing Error Handling

**Problem**: Unhandled promise rejections in renderer when IPC calls fail.

**Solution**: Always wrap IPC calls in try-catch or use `.catch()`.

### 3. Memory Leaks from Event Listeners

**Problem**: IPC event listeners not cleaned up when components unmount.

**Solution**: Use cleanup functions in useEffect:

```typescript
useEffect(() => {
  const handler = (message: any) => {
    console.log('Received:', message);
  };

  window.api.onEkoStreamMessage(handler);

  return () => {
    window.api.removeAllListeners('eko-stream-message');
  };
}, []);
```

### 4. Synchronous IPC in Renderer

**Problem**: Using `ipcRenderer.sendSync()` blocks the renderer process.

**Solution**: Always use `ipcRenderer.invoke()` for async communication.

## Next Steps

- Review [Layout Transformation Architecture](/docs/architecture/layout-transformation) for WebContentsView coordination
- Learn about [Window Context Manager](/docs/architecture/window-context-manager) for multi-window support
- Explore [API Documentation](/docs/API) for complete method reference
