# IPC API Migration Guide

## Overview

The IPC API has been refactored from a flat structure with 60+ methods into a namespaced architecture for better organization, maintainability, and developer experience. This document guides you through the migration process.

## What Changed?

### Before (Flat Structure)
```typescript
window.api.ekoRun(prompt)
window.api.getUserModelConfigs()
window.api.setDetailViewVisible(true)
window.api.sendVoiceTextToChat(text)
```

### After (Namespaced Structure)
```typescript
window.api.eko.run(prompt)
window.api.config.getUserModelConfigs()
window.api.view.setDetailViewVisible(true)
window.api.voice.sendVoiceTextToChat(text)
```

## New API Namespaces

The API is now organized into 7 logical namespaces:

### 1. **`api.eko`** - AI Task Execution
Controls the Eko AI agent system for task execution.

```typescript
window.api.eko.run(prompt: string) => Promise<any>
window.api.eko.modify(taskId: string, prompt: string) => Promise<any>
window.api.eko.execute(taskId: string) => Promise<any>
window.api.eko.getTaskStatus(taskId: string) => Promise<any>
window.api.eko.cancelTask(taskId: string) => Promise<any>
window.api.eko.onStreamMessage(callback: (message: any) => void) => void
```

**Migration Examples:**
```typescript
// OLD
await window.api.ekoRun('Navigate to google.com')
window.api.onEkoStreamMessage((msg) => console.log(msg))
await window.api.ekoCancelTask(taskId)

// NEW
await window.api.eko.run('Navigate to google.com')
window.api.eko.onStreamMessage((msg) => console.log(msg))
await window.api.eko.cancelTask(taskId)
```

---

### 2. **`api.view`** - Browser View & WebContents Control
Manages browser view visibility, bounds, navigation, and screenshots.

```typescript
window.api.view.setDetailViewVisible(visible: boolean) => Promise<void>
window.api.view.updateDetailViewBounds(bounds: DetailViewBounds) => Promise<void>
window.api.view.showViewWindow() => Promise<void>
window.api.view.hideViewWindow() => Promise<void>
window.api.view.navigateTo(url: string) => Promise<{url: string; title: string}>
window.api.view.getCurrentUrl() => Promise<string>
window.api.view.onUrlChange(callback: (url: string) => void) => void
window.api.view.getMainViewScreenshot() => Promise<{imageBase64: string; imageType: string}>
window.api.view.captureWindow(winNo: number, scale?: number) => Promise<CaptureResult>
window.api.view.requestCapturePermission() => Promise<boolean>
```

**Migration Examples:**
```typescript
// OLD
await window.api.setDetailViewVisible(true)
await window.api.navigateTo('https://example.com')
const screenshot = await window.api.getMainViewScreenshot()
window.api.onUrlChange((url) => setCurrentUrl(url))

// NEW
await window.api.view.setDetailViewVisible(true)
await window.api.view.navigateTo('https://example.com')
const screenshot = await window.api.view.getMainViewScreenshot()
window.api.view.onUrlChange((url) => setCurrentUrl(url))
```

---

### 3. **`api.config`** - Model & Provider Configuration
Manages AI provider configurations and API keys.

```typescript
window.api.config.getUserModelConfigs() => Promise<UserModelConfigs>
window.api.config.saveUserModelConfigs(configs: UserModelConfigs) => Promise<{success: boolean}>
window.api.config.getModelConfig(provider: ProviderType) => Promise<any>
window.api.config.getApiKeySource(provider: ProviderType) => Promise<'user' | 'env' | 'none'>
window.api.config.getSelectedProvider() => Promise<ProviderType>
window.api.config.setSelectedProvider(provider: ProviderType) => Promise<{success: boolean}>
window.api.config.getEnvVar(key: string) => Promise<string>
```

**Migration Examples:**
```typescript
// OLD
const configs = await window.api.getUserModelConfigs()
await window.api.saveUserModelConfigs(newConfigs)
const provider = await window.api.getSelectedProvider()
await window.api.setSelectedProvider('anthropic')

// NEW
const configs = await window.api.config.getUserModelConfigs()
await window.api.config.saveUserModelConfigs(newConfigs)
const provider = await window.api.config.getSelectedProvider()
await window.api.config.setSelectedProvider('anthropic')
```

---

### 4. **`api.agent`** - Agent Configuration
Controls BrowserAgent, FileAgent, and MCP tool configurations.

```typescript
window.api.agent.getAgentConfig() => Promise<{success: boolean; data: AgentConfig}>
window.api.agent.saveAgentConfig(config: AgentConfig) => Promise<{success: boolean}>
window.api.agent.getMcpTools() => Promise<{success: boolean; data: McpToolSchema[]}>
window.api.agent.setMcpToolEnabled(toolName: string, enabled: boolean) => Promise<{success: boolean}>
window.api.agent.reloadAgentConfig() => Promise<{success: boolean; data: AgentConfig}>
```

**Migration Examples:**
```typescript
// OLD
const agentConfig = await window.api.getAgentConfig()
await window.api.saveAgentConfig(updatedConfig)
const mcpTools = await window.api.getMcpTools()
await window.api.setMcpToolEnabled('browserTool', true)

// NEW
const agentConfig = await window.api.agent.getAgentConfig()
await window.api.agent.saveAgentConfig(updatedConfig)
const mcpTools = await window.api.agent.getMcpTools()
await window.api.agent.setMcpToolEnabled('browserTool', true)
```

---

### 5. **`api.history`** - History View Management
Controls history screenshot preview views.

```typescript
window.api.history.showHistoryView(screenshotBase64: string) => Promise<void>
window.api.history.hideHistoryView() => Promise<void>
```

**Migration Examples:**
```typescript
// OLD
await window.api.showHistoryView(screenshot)
await window.api.hideHistoryView()

// NEW
await window.api.history.showHistoryView(screenshot)
await window.api.history.hideHistoryView()
```

---

### 6. **`api.voice`** - Voice & TTS
Manages voice input and text-to-speech subtitles.

```typescript
window.api.voice.sendVoiceTextToChat(text: string) => Promise<void>
window.api.voice.onVoiceTextReceived(callback: (text: string) => void) => void
window.api.voice.sendTTSSubtitle(text: string, isStart: boolean) => Promise<boolean>
window.api.voice.onTTSSubtitleReceived(callback: (text: string, isStart: boolean) => void) => void
```

**Migration Examples:**
```typescript
// OLD
await window.api.sendVoiceTextToChat('Hello world')
window.api.onVoiceTextReceived((text) => handleVoice(text))
await window.api.sendTTSSubtitle('Speaking...', true)

// NEW
await window.api.voice.sendVoiceTextToChat('Hello world')
window.api.voice.onVoiceTextReceived((text) => handleVoice(text))
await window.api.voice.sendTTSSubtitle('Speaking...', true)
```

---

### 7. **`api.util`** - Utility Functions
General-purpose utilities for event management and IPC.

```typescript
window.api.util.removeAllListeners(channel: string) => void
window.api.util.invoke(channel: string, ...args: any[]) => Promise<any>
window.api.util.onTaskExecutionComplete(callback: (event: any) => void) => void
window.api.util.onOpenHistoryPanel(callback: (event: any) => void) => void
window.api.util.onTaskAbortedBySystem(callback: (event: any) => void) => void
```

**Migration Examples:**
```typescript
// OLD
window.api.removeAllListeners('eko-stream-message')
await window.api.invoke('custom-channel', arg1, arg2)
window.api.onTaskExecutionComplete((event) => handleComplete(event))

// NEW
window.api.util.removeAllListeners('eko-stream-message')
await window.api.util.invoke('custom-channel', arg1, arg2)
window.api.util.onTaskExecutionComplete((event) => handleComplete(event))
```

---

## Backward Compatibility

**All old flat API methods remain available** with `@deprecated` warnings in TypeScript. This ensures existing code continues to work without immediate changes.

```typescript
// ✅ Still works (with deprecation warning)
await window.api.ekoRun(prompt)

// ✅ Recommended new approach
await window.api.eko.run(prompt)
```

### Deprecation Timeline

| Version | Status |
|---------|--------|
| 0.0.7   | **Current**: Namespaced APIs introduced, flat APIs deprecated with warnings |
| 0.0.8   | Flat APIs maintained with console warnings in development mode |
| 0.0.9   | Flat APIs maintained with stricter warnings |
| 1.0.0   | **Breaking**: Flat APIs removed |

---

## Migration Strategy

### Recommended Approach

**Incremental Migration (Recommended)**
1. Continue using old API in existing code
2. Use new namespaced API for all new code
3. Gradually migrate existing code file-by-file
4. Complete migration before v1.0.0 release

**Example Migration Process:**
```typescript
// Step 1: Identify old API usage
// Use TypeScript deprecation warnings or search:
// - window.api.ekoRun
// - window.api.getUserModelConfigs
// - window.api.setDetailViewVisible

// Step 2: Replace with namespaced equivalents
// Replace: window.api.ekoRun → window.api.eko.run
// Replace: window.api.getUserModelConfigs → window.api.config.getUserModelConfigs

// Step 3: Test thoroughly
// Ensure all IPC calls work correctly with new API

// Step 4: Remove old imports/references
```

---

## Migration Checklist

Use this checklist to track your migration progress:

- [ ] **Eko APIs**: Replace `ekoRun`, `ekoModify`, `ekoExecute`, `ekoCancelTask`, `onEkoStreamMessage`
- [ ] **View APIs**: Replace `setDetailViewVisible`, `navigateTo`, `getMainViewScreenshot`, `onUrlChange`
- [ ] **Config APIs**: Replace `getUserModelConfigs`, `saveUserModelConfigs`, `getSelectedProvider`, `setSelectedProvider`
- [ ] **Agent APIs**: Replace `getAgentConfig`, `saveAgentConfig`, `getMcpTools`, `setMcpToolEnabled`
- [ ] **History APIs**: Replace `showHistoryView`, `hideHistoryView`
- [ ] **Voice APIs**: Replace `sendVoiceTextToChat`, `sendTTSSubtitle`, `onVoiceTextReceived`
- [ ] **Utility APIs**: Replace `removeAllListeners`, `invoke`, `onTaskExecutionComplete`
- [ ] **Test all migrated code** in development environment
- [ ] **Update documentation** referencing old API

---

## Common Migration Patterns

### Pattern 1: Task Execution Workflow
```typescript
// OLD
async function runTask(prompt: string) {
  const result = await window.api.ekoRun(prompt)
  window.api.onEkoStreamMessage((msg) => handleStream(msg))
  return result
}

// NEW
async function runTask(prompt: string) {
  const result = await window.api.eko.run(prompt)
  window.api.eko.onStreamMessage((msg) => handleStream(msg))
  return result
}
```

### Pattern 2: Configuration Management
```typescript
// OLD
async function updateProviderConfig(provider: ProviderType, config: any) {
  const currentConfigs = await window.api.getUserModelConfigs()
  currentConfigs[provider] = config
  await window.api.saveUserModelConfigs(currentConfigs)
  await window.api.setSelectedProvider(provider)
}

// NEW
async function updateProviderConfig(provider: ProviderType, config: any) {
  const currentConfigs = await window.api.config.getUserModelConfigs()
  currentConfigs[provider] = config
  await window.api.config.saveUserModelConfigs(currentConfigs)
  await window.api.config.setSelectedProvider(provider)
}
```

### Pattern 3: View Management with Event Listeners
```typescript
// OLD
useEffect(() => {
  window.api.onUrlChange((url) => setCurrentUrl(url))
  return () => {
    window.api.removeAllListeners('url-changed')
  }
}, [])

// NEW
useEffect(() => {
  window.api.view.onUrlChange((url) => setCurrentUrl(url))
  return () => {
    window.api.util.removeAllListeners('url-changed')
  }
}, [])
```

---

## TypeScript Benefits

The new namespaced structure provides **better TypeScript IntelliSense**:

### Before
```typescript
// All 60+ methods appear in autocomplete
window.api.  // Shows: ekoRun, getUserModelConfigs, setDetailViewVisible, ...
```

### After
```typescript
// Organized autocomplete with logical grouping
window.api.        // Shows: eko, view, config, agent, history, voice, util
window.api.eko.    // Shows: run, modify, execute, cancelTask, onStreamMessage
window.api.config. // Shows: getUserModelConfigs, saveUserModelConfigs, ...
```

---

## Testing Your Migration

### Manual Testing Checklist
1. **Eko Operations**: Send a task and verify stream messages work
2. **View Management**: Toggle detail view visibility, navigate to URLs
3. **Config Management**: Update provider configs, switch providers
4. **Agent Operations**: Modify agent config, toggle MCP tools
5. **History Playback**: Show/hide history screenshots
6. **Voice Operations**: Test voice input and TTS subtitles
7. **Event Listeners**: Verify all event callbacks fire correctly

### Automated Testing
```typescript
// Example test for new API
describe('Namespaced IPC API', () => {
  test('eko.run executes task', async () => {
    const result = await window.api.eko.run('test prompt')
    expect(result).toBeDefined()
  })

  test('config APIs work correctly', async () => {
    const configs = await window.api.config.getUserModelConfigs()
    expect(configs).toHaveProperty('selectedProvider')
  })
})
```

---

## Getting Help

- **TypeScript Errors**: Check `src/type.d.ts` for updated type definitions
- **IPC Handler Issues**: Verify `electron/preload/index.ts` exposes namespaced APIs
- **Runtime Errors**: Ensure both new and old APIs are available during migration
- **Questions**: Check `docs/API.md` for complete IPC API reference

---

## Summary

The new namespaced API structure provides:

✅ **Better Organization**: 7 logical namespaces instead of flat 60+ methods
✅ **Improved TypeScript IntelliSense**: Autocomplete shows relevant methods only
✅ **Easier Maintenance**: Changes scoped to specific namespaces
✅ **Backward Compatible**: Old API works with deprecation warnings
✅ **Clear Migration Path**: Incremental migration supported

**Migrate at your own pace, complete before v1.0.0 release.**
