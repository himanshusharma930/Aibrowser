---
title: Environment-Aware Architecture
description: Eko provides consistent capabilities across different JavaScript environments while adapting to each environment's unique constraints and opportunities.
---

## Core Architecture

Eko's environment-aware architecture consists of three key layers:

1. Universal Core
2. Environment-Specific Tools
3. Environment Bridge

### 1. Universal Core

The framework's core layer provides environment-independent functionality:

- Workflow management and execution
- Tool Registration management
- LLM integration (Claude/OpenAI)
- Hook system

```typescript
// Browser Extension / Node.js environments
import { Eko } from "@eko-ai/eko";
const eko = new Eko({
  apiKey: "your_api_key", // API key can be provided directly
  modelName: "claude-3-5-sonnet-20241022", // Optional
});

// Web environment
import { Eko } from "@eko-ai/eko";
const eko = new Eko({
  llm: "claude",
  // IMPORTANT: In web environments, use a server-side endpoint that handles authentication
  baseURL: "https://your-api-endpoint.com",
  defaultHeaders: {
    // Add any necessary authentication headers
    Authorization: `Bearer ${getAuthToken()}`,
  },
});
```

### 2. Environment-Specific Tools

Each environment provides its own optimized set of tools:

#### Browser Extension Tools

```typescript
import { tools } from "@eko-ai/eko/extension";

// Browser automation tools
const {
  TabManagement, // Browser tab control
  OpenUrl, // URL navigation
  BrowserUse, // DOM interaction
  WebSearch, // Web search capabilities
  Screenshot, // Page capture
  ExtractContent, // Content extraction
} = tools;
```

#### Web Tools

```typescript
import { tools } from "@eko-ai/eko/web";

// Web-safe tools
const {
  BrowserUse, // DOM interaction
  ElementClick, // Element interaction
  ExtractContent, // Content extraction
  Screenshot, // Page capture
} = tools;
```

#### Node.js Tools

```typescript
import { tools } from "@eko-ai/eko/nodejs";

// System-level tools
const {
  FileRead, // File operations
  FileWrite, // File operations
  CommandExecute, // Shell command execution
} = tools;
```

Learn more: [Available Tools](/docs/tools/available);

### 3. Environment Bridge

The bridge layer handles:

- Environment detection
- Tool registration and access control
- Resource management
- Security boundaries

## Web Environment Security

When using Eko in a web environment, follow these security best practices:

1. **Never expose API keys in client-side code**

   ```typescript
   // ❌ WRONG - Never do this in web environments
   const eko = new Eko({
     apiKey: "sk-...", // Never expose API keys in client code
   });

   // ✅ CORRECT - Use server-side authentication
   const eko = new Eko({
     llm: "claude",
     baseURL: "https://your-api-endpoint.com/v1",
     defaultHeaders: {
       Authorization: `Bearer ${getAuthToken()}`,
     },
   });
   ```

2. **Implement server-side authentication**

   ```typescript
   // Server-side endpoint example (Node.js/Express)
   app.post("/v1/messages", async (req, res) => {
     // Validate user authentication
     const userToken = req.headers.authorization;
     if (!(await validateUserToken(userToken))) {
       return res.status(401).json({ error: "Unauthorized" });
     }

     // Forward request to Claude with your API key
     const response = await fetch("https://api.anthropic.com/v1/messages", {
       method: "POST",
       headers: {
         "x-api-key": process.env.CLAUDE_API_KEY,
         "Content-Type": "application/json",
       },
       body: JSON.stringify(req.body),
     });

     const data = await response.json();
     res.json(data);
   });
   ```

3. **Handle user authentication state**
   ```typescript
   // Client-side authentication handling
   async function getAuthToken() {
     // Implement your authentication logic
     const session = await getUserSession();
     return session?.token;
   }
   ```

## Automatic Tool Registration

Each environment provides a `loadTools()` helper for easy setup:

```typescript
import { Eko } from "@eko-ai/eko";
import { loadTools } from "@eko-ai/eko/extension"; // or /web or /nodejs

// Register all tools for current environment
Eko.tools = loadTools();
```

## Security and Access Control

Eko implements environment-appropriate security measures:

1. Browser Extension

   - Respects extension permissions
   - Manages tab and window access
   - Handles cross-origin interactions

2. Web Environment

   - Operates within browser sandbox
   - Limited to web-safe APIs
   - No direct system access
   - Server-side API key management
   - User authentication required

3. Node.js Environment
   - Full system access based on Node permissions
   - User-approved file operations
   - Command execution safeguards
   - Direct API key usage permitted

4. Fellou Browser Environment

   - User-approved computer use
   - Manages tab and window access
   - Server-side API key management


## Best Practices

1. **Environment Detection**

   ```typescript
   // Tools are automatically filtered based on environment
   const tools = loadTools();
   ```

2. **Tool Registration**

   ```typescript
   // Register specific tools
   eko.registerTool(new tools.TabManagement());

   // Or register all available tools
   Eko.tools = loadTools();
   ```

   Learn more: [Custom Tools](/docs/tools/custom).

3. **Error Handling**
   ```typescript
   try {
     await eko.execute(workflow);
   } catch (error) {
     // Environment-specific error handling
     console.error("Workflow execution failed:", error);
   }
   ```
   Learn more: [Hook System](/docs/architecture/hook-system).

## Next Steps

- Learn about [Tool System](/docs/tools/overview) capabilities
- Explore [Workflow Execution](/docs/architecture/workflow)
- Understand the [Hook System](/docs/architecture/hook-system)
