# IPC Quick Reference Guide

Quick reference for working with IPC communication in Manus Electron.

## Initialization Order (Critical!)

```
1. app.whenReady()
2. registerAllIpcHandlers() ← ALL HANDLERS REGISTERED HERE
3. registerClientProtocol()
4. initCookies()
5. serverManager.startServer()
6. createMainWindow() ← Windows created AFTER handlers ready
```

**Key Point**: All IPC handlers are registered **before** any windows are created.

## Adding a New IPC Handler

### Step 1: Create Handler in Main Process

```typescript
// electron/main/ipc/my-handlers.ts
import { ipcMain } from "electron";

export function registerMyHandlers() {
  ipcMain.handle('my-new-handler', async (event, params) => {
    try {
      // Your logic here
      const result = await doSomething(params);
      return { success: true, data: result };
    } catch (error: any) {
      console.error('[IPC] my-new-handler error:', error);
      return { success: false, error: error.message };
    }
  });

  console.log('[IPC] My handlers registered');
}
```

### Step 2: Register in Central Registry

```typescript
// electron/main/ipc/index.ts
import { registerMyHandlers } from "./my-handlers";

export function registerAllIpcHandlers() {
  registerEkoHandlers();
  registerViewHandlers();
  registerHistoryHandlers();
  registerConfigHandlers();
  registerAgentHandlers();
  registerMyHandlers(); // ← Add your handler registration

  console.log('[IPC] All IPC handlers registered successfully');
}
```

### Step 3: Expose in Preload Script

```typescript
// electron/preload/index.ts
contextBridge.exposeInMainWorld('api', {
  // ... existing methods
  myNewHandler: (params: MyParams): Promise<MyResult> => {
    return ipcRenderer.invoke('my-new-handler', params);
  },
});
```

### Step 4: Add TypeScript Types

```typescript
// src/type.d.ts
interface MyParams {
  // Your parameter types
}

interface MyResult {
  success: boolean;
  data?: any;
  error?: string;
}

declare global {
  interface Window {
    api: {
      // ... existing methods
      myNewHandler: (params: MyParams) => Promise<MyResult>;
    }
  }
}
```

### Step 5: Use in Renderer

```typescript
// src/pages/my-page.tsx
const handleAction = async () => {
  try {
    const result = await window.api.myNewHandler({ foo: 'bar' });
    
    if (!result.success) {
      message.error(result.error || 'Operation failed');
      return;
    }

    console.log('Success:', result.data);
  } catch (error) {
    console.error('IPC call failed:', error);
    message.error('Failed to communicate with main process');
  }
};
```

## Available Handler Categories

### Eko Handlers
```typescript
window.api.ekoRun(prompt: string)
window.api.ekoModify(taskId: string, prompt: string)
window.api.ekoCancelTask(taskId: string)
window.api.onEkoStreamMessage(callback: (message: any) => void)
```

### View Handlers
```typescript
window.api.setDetailViewVisible(visible: boolean)
window.api.updateDetailViewBounds(bounds: DetailViewBounds)
window.api.getMainViewScreenshot()
window.api.showHistoryView(screenshotBase64: string)
window.api.hideHistoryView()
window.api.getCurrentUrl()
```

### History Handlers
```typescript
window.api.getTaskHistory()
window.api.deleteTaskHistory(taskId: string)
window.api.clearTaskHistory()
```

### Config Handlers
```typescript
window.api.getUserModelConfigs()
window.api.saveUserModelConfigs(configs: UserModelConfigs)
window.api.getSelectedProvider()
window.api.setSelectedProvider(provider: ProviderType)
```

### Agent Handlers
```typescript
window.api.getAgentConfig()
window.api.saveAgentConfig(config: AgentConfig)
window.api.getMcpTools()
window.api.setMcpToolEnabled(toolName: string, enabled: boolean)
```

## Common Patterns

### Debouncing Frequent Calls

```typescript
const debouncedUpdate = useMemo(
  () => debounce((data: any) => {
    window.api.updateData(data).catch(console.error);
  }, 500),
  []
);
```

### Throttling High-Frequency Events

```typescript
const throttledUpdate = useMemo(
  () => throttle((data: any) => {
    window.api.updateData(data).catch(console.error);
  }, 16), // 60fps
  []
);
```

### Cleanup Event Listeners

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

### Error Handling

```typescript
// Main process - return error object
return { success: false, error: error.message };

// Renderer - check success flag
if (!result.success) {
  message.error(result.error || 'Operation failed');
  return;
}
```

## Debugging

### Enable IPC Logging (Development)

```typescript
// electron/main/index.ts
if (isDev) {
  ipcMain.on('*', (event, ...args) => {
    console.log('[IPC Debug]', event.type, args);
  });
}
```

### Test in DevTools Console

```javascript
// Check available methods
console.log('API methods:', Object.keys(window.api));

// Test a call
await window.api.setDetailViewVisible(true);
```

### View Main Process Logs

Terminal where you ran `pnpm run dev` shows main process logs:
```
[IPC] All IPC handlers registered
[IPC] set-detail-view-visible received: true
```

## Common Pitfalls

❌ **Don't**: Register handlers after window creation
```typescript
createMainWindow();
registerAllIpcHandlers(); // Too late!
```

✅ **Do**: Register handlers before window creation
```typescript
registerAllIpcHandlers();
createMainWindow(); // Handlers ready!
```

---

❌ **Don't**: Forget error handling
```typescript
await window.api.myHandler(params); // Unhandled rejection!
```

✅ **Do**: Always handle errors
```typescript
try {
  await window.api.myHandler(params);
} catch (error) {
  console.error('Failed:', error);
}
```

---

❌ **Don't**: Use synchronous IPC
```typescript
ipcRenderer.sendSync('my-handler'); // Blocks renderer!
```

✅ **Do**: Use async IPC
```typescript
await ipcRenderer.invoke('my-handler'); // Non-blocking
```

---

❌ **Don't**: Forget to clean up listeners
```typescript
window.api.onEkoStreamMessage(handler); // Memory leak!
```

✅ **Do**: Remove listeners on unmount
```typescript
useEffect(() => {
  window.api.onEkoStreamMessage(handler);
  return () => window.api.removeAllListeners('eko-stream-message');
}, []);
```

## Performance Tips

1. **Debounce** frequent calls (resize, input changes)
2. **Throttle** continuous events (scroll, mousemove)
3. **Batch** multiple related operations into single call
4. **Cache** results when appropriate
5. **Validate** input in renderer before IPC call

## Security Notes

- Never expose Node.js APIs directly to renderer
- Always use `contextBridge` in preload scripts
- Validate all input in main process handlers
- Use TypeScript for type safety
- Log security-sensitive operations

## Further Reading

- [IPC System Architecture](./eko-docs/architecture/ipc-system.md)
- [API Documentation](./API.md)
- [Layout Transformation Architecture](./eko-docs/architecture/layout-transformation.md)
