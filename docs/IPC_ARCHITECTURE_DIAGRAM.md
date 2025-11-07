# IPC Architecture Visual Guide

This document provides visual diagrams to understand the IPC communication architecture in Manus Electron.

## Initialization Sequence

```mermaid
sequenceDiagram
    participant App as Electron App
    participant IPC as IPC Handlers
    participant Protocol as Protocol Registry
    participant Server as Next.js Server
    participant Window as Main Window
    participant Renderer as Renderer Process

    App->>App: app.whenReady()
    Note over App: App ready event fired
    
    App->>IPC: registerAllIpcHandlers()
    Note over IPC: Register 5 handler categories
    IPC->>IPC: registerEkoHandlers()
    IPC->>IPC: registerViewHandlers()
    IPC->>IPC: registerHistoryHandlers()
    IPC->>IPC: registerConfigHandlers()
    IPC->>IPC: registerAgentHandlers()
    IPC-->>App: All handlers registered ✓
    
    App->>Protocol: registerClientProtocol()
    Protocol-->>App: Protocol registered ✓
    
    App->>Server: serverManager.startServer()
    Server-->>App: Next.js server ready ✓
    
    App->>Window: createMainWindow()
    Note over Window: Window created with handlers ready
    
    Window->>Renderer: Load Next.js app
    Renderer->>IPC: window.api.ekoRun() ✓
    Note over Renderer,IPC: IPC calls work immediately
```

## IPC Communication Flow

```mermaid
graph TB
    subgraph "Renderer Process (Chromium)"
        A[React Component] --> B[window.api.method]
        B --> C[Preload Script]
    end
    
    subgraph "IPC Bridge"
        C --> D[contextBridge]
        D --> E[ipcRenderer.invoke]
    end
    
    subgraph "Main Process (Node.js)"
        E --> F[ipcMain.handle]
        F --> G{Handler Category}
        
        G -->|Eko| H[EkoService]
        G -->|View| I[WebContentsView]
        G -->|History| J[Task Storage]
        G -->|Config| K[Electron Store]
        G -->|Agent| L[Agent Config]
        
        H --> M[Return Result]
        I --> M
        J --> M
        K --> M
        L --> M
    end
    
    M --> E
    E --> D
    D --> B
    B --> A
    
    style A fill:#e1f5fe
    style B fill:#b3e5fc
    style C fill:#81d4fa
    style D fill:#4fc3f7
    style E fill:#29b6f6
    style F fill:#03a9f4
    style G fill:#039be5
    style M fill:#0288d1
```

## Handler Categories Architecture

```mermaid
graph LR
    subgraph "IPC Handler Registry"
        A[registerAllIpcHandlers] --> B[Eko Handlers]
        A --> C[View Handlers]
        A --> D[History Handlers]
        A --> E[Config Handlers]
        A --> F[Agent Handlers]
    end
    
    subgraph "Eko Handlers"
        B --> B1[eko-run]
        B --> B2[eko-modify]
        B --> B3[eko-cancel-task]
        B --> B4[eko-stream-message]
    end
    
    subgraph "View Handlers"
        C --> C1[set-detail-view-visible]
        C --> C2[update-detail-view-bounds]
        C --> C3[get-main-view-screenshot]
        C --> C4[show-history-view]
        C --> C5[hide-history-view]
        C --> C6[get-current-url]
    end
    
    subgraph "History Handlers"
        D --> D1[get-task-history]
        D --> D2[delete-task-history]
        D --> D3[clear-task-history]
    end
    
    subgraph "Config Handlers"
        E --> E1[get-user-model-configs]
        E --> E2[save-user-model-configs]
        E --> E3[get-selected-provider]
        E --> E4[set-selected-provider]
    end
    
    subgraph "Agent Handlers"
        F --> F1[get-agent-config]
        F --> F2[save-agent-config]
        F --> F3[get-mcp-tools]
        F --> F4[set-mcp-tool-enabled]
    end
    
    style A fill:#4caf50
    style B fill:#81c784
    style C fill:#64b5f6
    style D fill:#ffb74d
    style E fill:#ba68c8
    style F fill:#f06292
```

## Window Context Isolation

```mermaid
graph TB
    subgraph "Window Context Manager"
        A[windowContextManager]
    end
    
    subgraph "Main Window Context"
        B[Main Window]
        C[Detail View]
        D[History View]
        E[Window State]
    end
    
    subgraph "Task Window Context 1"
        F[Task Window 1]
        G[Detail View 1]
        H[History View 1]
        I[Window State 1]
    end
    
    subgraph "Task Window Context 2"
        J[Task Window 2]
        K[Detail View 2]
        L[History View 2]
        M[Window State 2]
    end
    
    A --> B
    A --> F
    A --> J
    
    B --> C
    B --> D
    B --> E
    
    F --> G
    F --> H
    F --> I
    
    J --> K
    J --> L
    J --> M
    
    style A fill:#4caf50
    style B fill:#2196f3
    style F fill:#2196f3
    style J fill:#2196f3
```

## Error Handling Flow

```mermaid
graph TB
    A[Renderer: window.api.method] --> B{IPC Call}
    
    B -->|Success| C[Main Process Handler]
    B -->|Network Error| D[Catch in Renderer]
    
    C --> E{Handler Logic}
    
    E -->|Success| F[Return success: true]
    E -->|Error| G[Return success: false]
    
    F --> H[Renderer: Check result.success]
    G --> H
    
    H -->|success: true| I[Process Data]
    H -->|success: false| J[Display Error Message]
    
    D --> K[Log Error]
    K --> L[Display Connection Error]
    
    style A fill:#e1f5fe
    style C fill:#81c784
    style D fill:#ef5350
    style E fill:#ffb74d
    style F fill:#66bb6a
    style G fill:#ef5350
    style I fill:#66bb6a
    style J fill:#ef5350
    style K fill:#ef5350
    style L fill:#ef5350
```

## Performance Optimization Pattern

```mermaid
graph LR
    subgraph "Renderer Process"
        A[User Action] --> B{Action Type}
        
        B -->|Frequent| C[Debounce 500ms]
        B -->|Continuous| D[Throttle 16ms]
        B -->|Batch| E[Collect Multiple]
        B -->|Single| F[Direct Call]
        
        C --> G[IPC Call]
        D --> G
        E --> G
        F --> G
    end
    
    subgraph "Main Process"
        G --> H[Handler]
        H --> I[Validate]
        I --> J[Execute]
        J --> K[Return]
    end
    
    K --> L[Update UI]
    
    style C fill:#ffb74d
    style D fill:#ba68c8
    style E fill:#64b5f6
    style F fill:#81c784
```

## Security Model

```mermaid
graph TB
    subgraph "Renderer Process (Untrusted)"
        A[Web Content]
        B[React Components]
    end
    
    subgraph "Preload Script (Bridge)"
        C[contextBridge]
        D[Exposed API]
    end
    
    subgraph "Main Process (Trusted)"
        E[IPC Handlers]
        F[Node.js APIs]
        G[File System]
        H[System Access]
    end
    
    A -.->|No Direct Access| F
    A -.->|No Direct Access| G
    A -.->|No Direct Access| H
    
    B --> D
    D --> C
    C --> E
    E --> F
    E --> G
    E --> H
    
    style A fill:#ef5350
    style B fill:#ffb74d
    style C fill:#66bb6a
    style D fill:#66bb6a
    style E fill:#2196f3
    style F fill:#2196f3
    style G fill:#2196f3
    style H fill:#2196f3
```

## Type Safety Flow

```mermaid
graph LR
    subgraph "Type Definitions"
        A[src/type.d.ts]
    end
    
    subgraph "Renderer"
        B[Component]
        C[window.api.method]
    end
    
    subgraph "Preload"
        D[contextBridge]
        E[ipcRenderer.invoke]
    end
    
    subgraph "Main"
        F[ipcMain.handle]
        G[Handler Logic]
    end
    
    A -->|Types| B
    A -->|Types| C
    A -->|Types| D
    A -->|Types| F
    
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    
    style A fill:#ba68c8
    style B fill:#64b5f6
    style C fill:#64b5f6
    style D fill:#81c784
    style E fill:#81c784
    style F fill:#ffb74d
    style G fill:#ffb74d
```

## Multi-Window Communication

```mermaid
sequenceDiagram
    participant W1 as Window 1
    participant IPC as IPC Handlers
    participant WCM as Window Context Manager
    participant W2 as Window 2

    W1->>IPC: window.api.method()
    IPC->>WCM: getContext(sender.id)
    WCM-->>IPC: Window 1 Context
    IPC->>IPC: Operate on Window 1 resources
    IPC-->>W1: Result
    
    Note over W1,W2: Isolated contexts
    
    W2->>IPC: window.api.method()
    IPC->>WCM: getContext(sender.id)
    WCM-->>IPC: Window 2 Context
    IPC->>IPC: Operate on Window 2 resources
    IPC-->>W2: Result
    
    Note over W1,W2: No cross-window interference
```

## Best Practices Summary

```mermaid
mindmap
  root((IPC Best Practices))
    Initialization
      Register handlers first
      Before window creation
      Log registration
    Error Handling
      Try-catch in handlers
      Return error objects
      Check success flag
      User-friendly messages
    Performance
      Debounce frequent calls
      Throttle continuous events
      Batch operations
      Cache results
    Security
      Use contextBridge
      Validate input
      Never expose Node.js
      Type safety
    Testing
      Unit test handlers
      Integration tests
      Mock IPC calls
      Test error cases
    Debugging
      Enable IPC logging
      Use DevTools
      Check main process logs
      Verify handler registration
```

## Quick Reference: Common Patterns

### Pattern 1: Simple IPC Call
```typescript
// Renderer
const result = await window.api.myMethod(params);
```

### Pattern 2: Error Handling
```typescript
// Renderer
try {
  const result = await window.api.myMethod(params);
  if (!result.success) {
    message.error(result.error);
    return;
  }
  // Process result.data
} catch (error) {
  console.error('IPC failed:', error);
}
```

### Pattern 3: Debounced Call
```typescript
// Renderer
const debouncedCall = useMemo(
  () => debounce((data) => {
    window.api.myMethod(data).catch(console.error);
  }, 500),
  []
);
```

### Pattern 4: Event Listener Cleanup
```typescript
// Renderer
useEffect(() => {
  const handler = (data) => console.log(data);
  window.api.onEvent(handler);
  return () => window.api.removeAllListeners('event');
}, []);
```

## Related Documentation

- [IPC System Architecture](./eko-docs/architecture/ipc-system.md) - Comprehensive guide
- [IPC Quick Reference](./IPC_QUICK_REFERENCE.md) - Quick reference for developers
- [API Documentation](./API.md) - Complete API reference
- [Architecture Changes](./ARCHITECTURE_CHANGES.md) - Change log

---

**Note**: These diagrams use Mermaid syntax and will render properly in GitHub, GitLab, and most modern markdown viewers.
