---
title: Environment-Aware Architecture
description: Eko's architecture is designed to provide consistent capabilities across different JavaScript environments while respecting each environment's unique constraints and opportunities. This environment-aware approach allows you to write workflows that can run everywhere while taking full advantage of environment-specific features when available.
---

Eko's architecture is designed to provide consistent capabilities across different JavaScript environments while respecting each environment's unique constraints and opportunities. This environment-aware approach allows you to write workflows that can run everywhere while taking full advantage of environment-specific features when available.

## Core Architecture

At its heart, Eko consists of three main layers:

### 1. Framework Core
The framework core provides the fundamental workflow management capabilities:

```typescript
import { Eko } from "@eko-ai/eko";

// Core remains consistent across environments
const eko = new Eko({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

This layer includes:
- Workflow generation and parsing
- Tool Registration management
- Execution engine
- Hook system

The core is environment-agnostic, focusing on orchestration rather than specific capabilities.

### 2. Environment Bridge

Between the core and environment-specific tools sits the environment bridge. This layer:
- Detects the current environment
- Manages capability access
- Handles cross-environment communication
- Ensures security boundaries

For example, in a browser extension environment:
```typescript
// The bridge automatically handles cross-context communication
const result = await eko.executeWorkflow(workflow, {
  context: {
    // Bridge provides environment-specific context
    tabId: chrome.tabs.TAB_ID_NONE,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  }
});
```

### 3. Environment-Specific Tools

Each environment provides its own set of tools optimized for that context:

```typescript
// Browser extension tools
import { tools } from "@eko-ai/eko/extension";
const { ComputerWeb, OpenUrl, TabManagement } = tools;

// Node.js tools
import { tools } from "@eko-ai/eko/nodejs";
const { FileSystem, ProcessControl, NetworkAccess } = tools;
```

## Environment-Specific Behaviors

### Browser Extension Environment

In a browser extension, Eko operates across multiple contexts:

1. Background Script
   - Manages workflow execution
   - Controls browser windows and tabs
   - Handles tool registration

2. Content Scripts
   - Interact with web pages
   - Execute DOM manipulations
   - Capture user interactions

3. Extension UI
   - Provides configuration interface
   - Shows execution progress
   - Manages API keys and settings

```typescript
// Background script
chrome.runtime.onMessage.addListener(async (request) => {
  if (request.type === "executeWorkflow") {
    const workflow = await eko.generateWorkflow(request.description);
    // Bridge handles context switching automatically
    return await eko.executeWorkflow(workflow);
  }
});
```

### Node.js Environment

In Node.js, Eko has direct access to system resources:

```typescript
// Node.js environment provides full system access
const workflow = await eko.generateWorkflow(
  "Process all PDFs in the docs folder"
);

// Tools can directly interact with the file system
await eko.executeWorkflow(workflow, {
  tools: [new FileSystemTool()],
  context: {
    workingDirectory: process.cwd()
  }
});
```

### Web Environment

In a web browser environment, Eko operates within browser security constraints:

```typescript
// Web environment respects browser sandbox
const workflow = await eko.generateWorkflow(
  "Extract data from this webpage"
);

// Tools limited to browser APIs
await eko.executeWorkflow(workflow, {
  tools: [new DOMTool()],
  context: {
    window,
    document
  }
});
```

## Security Considerations

Eko's environment awareness includes built-in security measures:

1. Capability Isolation
   - Tools can only access appropriate APIs
   - Cross-origin restrictions respected
   - Permissions handled per environment

2. Context Validation
   - Tool inputs sanitized
   - Environment capabilities checked
   - Security boundaries enforced

3. Permission Management
   ```typescript
   // Permissions handled appropriately per environment
   const workflow = await eko.generateWorkflow(description, {
     security: {
       allowedTools: ["browser", "dom"],
       allowedDomains: ["*.example.com"],
       requireUserGesture: true
     }
   });
   ```

## Next Steps

- Learn about Eko's [Tool System](tools.md) across environments
- Understand [Workflow Execution](execution-model.md) in different contexts
- Explore [Browser Extension Integration](../guides/environments/browser-extension.md)
