# Agent Invocation & Best Practices Guide

This document provides comprehensive guidance on invoking, configuring, and coordinating agents in the Manus Electron AI Browser project, aligned with 12-Factor Agent principles and strategic roadmap.

**See Also**: [CLAUDE.md](./CLAUDE.md) | [NEXT_STEPS.md](./NEXT_STEPS.md)

---

## 🎯 Core Principles

Before invoking agents, understand these foundational patterns:

1. **Micro-Agent Pattern**: 5-10 step workflows, not 50+ step monoliths
2. **Checkpoint System**: Save state between workflows for resumption
3. **Context Windows**: Optimize token usage via compression
4. **Error Recovery**: Implement resilience, not fragility
5. **State Isolation**: Each agent gets scoped context

---

## 🚀 Quick Start

### Invoke Agents via IPC (Main Process)

```typescript
// In electron/main/ipc/eko.ts
import { ipcMain } from 'electron';
import { ekoService } from '../services/eko-service';

// Simple direct invocation
ipcMain.handle('eko-run', async (event, prompt: string, config?: EkoConfig) => {
  const result = await ekoService.run(prompt, {
    agents: config?.agents,
    llms: config?.llms,
    callbacks: config?.callbacks,
    // NEW: Add checkpoint for resumption
    checkpointId: config?.checkpointId,
  });
  return result;
});

// With checkpointing (RECOMMENDED)
ipcMain.handle('eko-run-checkpoint', async (event, prompt: string, config?: CheckpointConfig) => {
  const checkpointManager = new TaskCheckpointManager();

  try {
    // Load previous state if resuming
    if (config?.resumeCheckpointId) {
      const savedState = await checkpointManager.load(config.resumeCheckpointId);
      if (savedState) {
        return await ekoService.resume(savedState, { ...config });
      }
    }

    // Run new task with checkpointing
    const result = await ekoService.run(prompt, {
      agents: config?.agents,
      callbacks: wrapCallbacksWithCheckpoint(config?.callbacks, checkpointManager),
    });

    // Save final state
    await checkpointManager.save(result.checkpointId, result);
    return result;
  } catch (error) {
    // Save error state for debugging
    await checkpointManager.saveError(config?.checkpointId, error);
    throw error;
  }
});
```

### Invoke Agents from UI (Renderer Process)

```typescript
// In React component with best practices
import { useCallback, useState } from 'react';

const MyComponent = () => {
  const [taskState, setTaskState] = useState({ status: 'idle', checkpointId: null });

  // RECOMMENDED: Checkpoint-aware invocation
  const runTaskWithCheckpoint = useCallback(async (prompt: string) => {
    try {
      // Start new task
      setTaskState({ status: 'running', checkpointId: null });

      const result = await window.api.ekoRunCheckpoint(prompt, {
        agents: ['Browser'],
        checkpointInterval: 5, // Save every 5 steps
      });

      // Stream messages with error handling
      result.onMessage((message) => {
        switch(message.type) {
          case 'tool_streaming':
            setTaskState(s => ({ ...s, currentTool: message.toolName }));
            break;
          case 'tool_result':
            console.log('Tool completed:', message.toolName, message.result);
            break;
          case 'error':
            setTaskState(s => ({ ...s, error: message.error.message }));
            break;
          case 'checkpoint_saved':
            // Enable pause/resume
            setTaskState(s => ({ ...s, checkpointId: message.checkpointId }));
            break;
        }
      });

      const result = await result.finish();
      setTaskState({ status: 'completed', checkpointId: null });
      return result;
    } catch (error) {
      setTaskState(s => ({
        ...s,
        status: 'failed',
        error: error.message,
        // Keep checkpointId to allow retry
      }));
      throw error;
    }
  }, []);

  // Resume from checkpoint (NEW BEST PRACTICE)
  const resumeTask = useCallback(async () => {
    if (!taskState.checkpointId) return;

    try {
      setTaskState(s => ({ ...s, status: 'resuming' }));
      const result = await window.api.ekoRunCheckpoint(null, {
        resumeCheckpointId: taskState.checkpointId,
      });

      // Continue from saved state
      const finalResult = await result.finish();
      setTaskState({ status: 'completed', checkpointId: null });
      return finalResult;
    } catch (error) {
      setTaskState(s => ({ ...s, status: 'failed', error: error.message }));
    }
  }, [taskState.checkpointId]);

  return (
    <div>
      <button onClick={() => runTaskWithCheckpoint('Search for latest news')}>
        Run Task
      </button>
      {taskState.checkpointId && (
        <button onClick={resumeTask} style={{ color: 'blue' }}>
          Resume (Checkpoint Available)
        </button>
      )}
      <p>Status: {taskState.status}</p>
    </div>
  );
};
```

---

## 🔧 Agent Configuration (Best Practices)

### 1. Default Agent Setup with Context Managers

```typescript
// electron/main/services/eko-service.ts
import { Eko, Agent, BrowserAgent, FileAgent } from '@eko-ai/eko';
import { TaskCheckpointManager } from './task-checkpoint';
import { AgentContextManager } from './agent-context-manager';

class EkoService {
  private checkpointManager = new TaskCheckpointManager();
  private contextManager = new AgentContextManager();

  async initialize() {
    // Create agents with proper context isolation
    const agents: Agent[] = [
      new BrowserAgent({
        name: 'Browser',
        description: 'Web automation and navigation',
        // NEW: Agent-scoped context
        context: this.contextManager.createAgentContext('browser'),
      }),
      new FileAgent({
        name: 'File',
        description: 'File operations and management',
        context: this.contextManager.createAgentContext('file'),
      }),
    ];

    this.eko = new Eko({
      agents,
      llms: this.configManager.getLLMConfig(),
      callbacks: this.setupCallbacks(),
    });
  }

  // BEST PRACTICE: Micro-workflow pattern
  async runMicroWorkflow(workflow: Workflow, options?: RunOptions) {
    const startTime = Date.now();
    const checkpointId = generateId();

    try {
      // Checkpoint before execution
      await this.checkpointManager.saveWorkflow(checkpointId, {
        workflow,
        startTime,
        status: 'started',
      });

      // Execute workflow (typically 5-10 steps)
      const result = await this.eko.execute(workflow, {
        callbacks: this.createCheckpointCallbacks(checkpointId),
        timeout: 300000, // 5 minutes per micro-workflow
      });

      // Save successful completion
      await this.checkpointManager.saveWorkflow(checkpointId, {
        workflow,
        result,
        duration: Date.now() - startTime,
        status: 'completed',
        tokenUsage: result.tokenUsage,
      });

      return result;
    } catch (error) {
      // Save error state for recovery
      await this.checkpointManager.saveWorkflow(checkpointId, {
        workflow,
        error: error.message,
        duration: Date.now() - startTime,
        status: 'failed',
      });
      throw error;
    }
  }

  // Support for sequential micro-workflows
  async runMicroWorkflowSequence(workflows: Workflow[], options?: RunOptions) {
    const results = [];
    const sequenceId = generateId();

    for (let i = 0; i < workflows.length; i++) {
      const checkpoint = await this.checkpointManager.loadWorkflow(`${sequenceId}-${i}`);

      // Skip completed workflows
      if (checkpoint?.status === 'completed') {
        results.push(checkpoint.result);
        continue;
      }

      try {
        const result = await this.runMicroWorkflow(workflows[i], {
          ...options,
          sequenceId,
          stepIndex: i,
        });
        results.push(result);
      } catch (error) {
        if (options?.stopOnError) {
          throw error;
        }
        // Continue on error if configured
        results.push({ error: error.message });
      }
    }

    return results;
  }

  private createCheckpointCallbacks(checkpointId: string) {
    return {
      onMessage: async (message) => {
        // Save intermediate state periodically
        if (message.type === 'tool_result') {
          await this.checkpointManager.saveIntermediate(checkpointId, message);
        }
      },
      onHumanConfirm: async (context, prompt) => {
        // Pause workflow, wait for user input
        return await this.showConfirmDialog(prompt);
      },
    };
  }
}
```

### 2. Custom Agent with MCP Tools (Recommended)

```typescript
import { Agent, SimpleSseMcpClient } from '@eko-ai/eko';
import { MCPClientManager } from './mcp-client-manager';

// NEW: Centralized MCP management
class AgentConfigWithMCP {
  private mcpManager = new MCPClientManager();

  async createAgentWithMCP(config: AgentConfig) {
    const mcpClient = await this.mcpManager.getClient(config.mcpProvider);

    const agent = new Agent({
      name: config.name,
      description: config.description,
      tools: config.staticTools || [], // Static tools + MCP tools
      mcpClient: mcpClient,
      llms: config.preferredLLMs || ['default'],
      // NEW: Error handling and retry
      errorHandler: (error) => this.handleAgentError(error),
    });

    // Validate MCP connection
    if (config.validateMCP) {
      const tools = await mcpClient.listTools();
      console.log(`Agent "${config.name}" loaded ${tools.length} MCP tools`);
    }

    return agent;
  }

  private handleAgentError(error: any) {
    // Implement retry logic, fallback strategies
    if (error.code === 'TOOL_TIMEOUT') {
      // Fallback to alternative tool
      return { retry: true, delay: 1000 };
    }
    if (error.code === 'AGENT_UNAVAILABLE') {
      // Try different LLM provider
      return { switchLLM: true };
    }
    return { retry: false };
  }
}
```

---

## 📋 Invocation Patterns (Ranked by Recommendation)

### Pattern 1: Micro-Workflow with Checkpointing ⭐⭐⭐ (RECOMMENDED)

**Best For**: Production tasks, long-running operations, resumable workflows

```typescript
// BEST PRACTICE: Follows 12-Factor patterns
const microWorkflow = `
<root>
  <name>Search Product Reviews</name>
  <thought>5-10 steps only, focused objective</thought>
  <agents>
    <agent name="Browser">
      <task>Find product reviews</task>
      <nodes>
        <node>Navigate to product page</node>
        <node>Scroll to reviews section</node>
        <node>Extract review text and ratings (max 20)</node>
        <node>Return results</node>
      </nodes>
    </agent>
  </agents>
</root>
`;

const result = await ekoService.runMicroWorkflow(
  { xml: microWorkflow },
  {
    checkpointInterval: 2, // Checkpoint every 2 steps
    timeout: 300000, // 5 minutes max
    enableResume: true,
  }
);
```

### Pattern 2: Sequential Micro-Workflows ⭐⭐⭐ (RECOMMENDED)

**Best For**: Complex tasks that need decomposition, batch operations

```typescript
// BEST PRACTICE: Context window management
const workflows = [
  { xml: workflowStep1 }, // Fetch products
  { xml: workflowStep2 }, // Extract reviews
  { xml: workflowStep3 }, // Analyze sentiment
  { xml: workflowStep4 }, // Generate report
];

const results = await ekoService.runMicroWorkflowSequence(workflows, {
  stopOnError: false, // Continue even if step fails
  saveIntermediateResults: true,
  compressContextEveryStep: true,
});
```

### Pattern 3: Stream-Based Long-Running Tasks ⭐⭐ (GOOD)

**Best For**: UI updates, real-time progress

```typescript
const streamCallback = {
  onMessage: async (message) => {
    switch(message.type) {
      case 'workflow':
        console.log('Workflow planned:', message.content);
        break;
      case 'tool_use':
        console.log(`Executing tool: ${message.toolName}`);
        // Send progress to UI
        event.sender.send('tool-executing', { toolName: message.toolName });
        break;
      case 'tool_result':
        console.log(`Tool result for ${message.toolName}`);
        event.sender.send('tool-completed', { result: message.content });
        break;
      case 'error':
        // Implement error recovery
        console.error('Error:', message.error);
        event.sender.send('task-error', { error: message.error });
        break;
    }
  },
};

await ekoService.eko.run(prompt, { callbacks: streamCallback });
```

### Pattern 4: Human-in-the-Loop (with Checkpoints) ⭐⭐

**Best For**: Tasks requiring approval, sensitive operations

```typescript
const humanCallback = {
  onHumanConfirm: async (context, prompt) => {
    // Pause and wait for user confirmation
    // Current checkpoint is saved automatically
    const confirmed = await windowManager.showConfirmDialog(prompt);
    if (!confirmed) {
      // Resume later from checkpoint
      event.sender.send('workflow-paused', {
        checkpointId: context.checkpointId,
        reason: 'awaiting-confirmation'
      });
    }
    return confirmed;
  },

  onHumanInput: async (context, prompt) => {
    return await windowManager.showInputDialog(prompt);
  },

  onHumanHelp: async (context, helpType) => {
    if (helpType === 'LOGIN') {
      return await windowManager.showLoginDialog();
    }
  },
};

await ekoService.eko.run(prompt, { callbacks: humanCallback });
```

### ❌ Pattern to AVOID: Monolithic Workflows

```typescript
// DO NOT DO THIS - Violates 12-Factor principles
const badWorkflow = `
<root>
  <name>Do Everything</name>
  <agents>
    <agent name="Browser">
      <nodes>
        <node>Step 1 of 50...</node>
        <node>Step 2...</node>
        <!-- ... 48 more steps ... -->
        <node>Step 50</node>
      </nodes>
    </agent>
  </agents>
</root>
`;
// This exhausts context, hard to debug, impossible to resume
```

---

## 🔄 Multi-Agent Coordination (Best Practices)

### Agent Handoff with State Sharing

```typescript
// BEST PRACTICE: Explicit state transfer between agents
async executeMultiAgentWorkflow() {
  // Create shared context for all agents
  const globalContext = {
    variables: {
      extractedData: [],
      processedCount: 0,
      errors: [],
      sessionToken: null,
    },
  };

  // Browser agent extracts data
  const browserContext = {
    ...globalContext,
    variables: { ...globalContext.variables, agent: 'browser' },
  };

  const extractionResult = await this.browserAgent.run(
    'Extract data from website',
    { context: browserContext }
  );

  // Update global context with results
  globalContext.variables.extractedData = browserContext.variables.extractedData;
  globalContext.variables.sessionToken = browserContext.variables.sessionToken;

  // File agent processes results using extracted data
  const fileContext = {
    ...globalContext,
    variables: { ...globalContext.variables, agent: 'file' },
  };

  const processingResult = await this.fileAgent.run(
    'Save and analyze extracted data',
    { context: fileContext }
  );

  return {
    extracted: extractionResult,
    processed: processingResult,
    finalData: globalContext.variables,
  };
}
```

### Conditional Agent Selection

```typescript
// BEST PRACTICE: Choose agents based on task requirements
async executeSmartTask(prompt: string) {
  // Analyze prompt to determine required agents
  const analysis = await this.analyzeTaskRequirements(prompt);

  const agents: Agent[] = [];

  if (analysis.needsBrowserAutomation) {
    agents.push(new BrowserAgent({ name: 'Browser' }));
  }
  if (analysis.needsFileOperations) {
    agents.push(new FileAgent({ name: 'File' }));
  }
  if (analysis.needsCommandExecution) {
    agents.push(new ShellAgent({ name: 'Shell' }));
  }

  // Only create Eko instance with required agents
  const eko = new Eko({
    agents,
    llms: this.configManager.getLLMConfig(),
  });

  return await eko.run(prompt);
}
```

---

## 💾 Checkpoint System Integration

### Checkpoint Manager API (To Be Implemented)

```typescript
interface TaskCheckpointManager {
  // Save workflow state
  saveWorkflow(id: string, state: WorkflowState): Promise<void>;

  // Load workflow state
  loadWorkflow(id: string): Promise<WorkflowState | null>;

  // Save intermediate progress
  saveIntermediate(id: string, data: any): Promise<void>;

  // Resume from checkpoint
  resume(checkpointId: string, newPrompt?: string): Promise<EkoResult>;

  // Clean up old checkpoints
  cleanup(maxAgeDays: number): Promise<number>;
}

// NEXT PRIORITY IMPLEMENTATION (see NEXT_STEPS.md)
// This enables all 12-Factor patterns
```

---

## 🛠️ Configuration Examples

### Development Mode (with Debugging)

```typescript
const devConfig = {
  agents: {
    browser: {
      headless: false,
      timeout: 120000,
      debugMode: true,
    },
    file: {
      sandbox: false,
      verbose: true,
    },
  },
  checkpointing: {
    enabled: true,
    saveInterval: 2, // Every 2 steps
    directory: '.checkpoints/dev',
  },
  llms: {
    default: {
      provider: 'anthropic',
      model: 'claude-3-5-sonnet-20241022',
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxTokens: 4096,
    },
  },
};
```

### Production Mode (with Resilience)

```typescript
const prodConfig = {
  agents: {
    browser: {
      headless: true,
      timeout: 300000, // 5 minutes
      maxRetries: 3,
      retryDelay: 2000,
    },
    file: {
      sandbox: true,
      maxConcurrent: 5,
    },
  },
  checkpointing: {
    enabled: true,
    saveInterval: 5,
    directory: '/var/checkpoints/prod',
    compression: true,
    ttl: 604800, // 7 days
  },
  llms: {
    default: {
      provider: process.env.LLM_PROVIDER || 'anthropic',
      model: process.env.LLM_MODEL || 'claude-3-sonnet',
      apiKey: process.env.LLM_API_KEY,
      retryAttempts: 3,
      fallback: 'openai', // Secondary LLM
    },
  },
  errorHandling: {
    strategy: 'recover', // or 'fail-fast'
    logAllErrors: true,
    alertThreshold: 5, // Alert after 5 consecutive errors
  },
};
```

---

## ⚠️ Error Recovery Strategies

```typescript
// BEST PRACTICE: Comprehensive error handling
class ResilientAgentInvoker {
  async invokeWithRecovery(
    prompt: string,
    config: InvokeConfig,
    maxRetries: number = 3
  ) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Try with current checkpoint state
        const checkpoint = await this.checkpointManager.load(config.checkpointId);

        if (checkpoint?.status === 'failed' && attempt > 1) {
          // Retry with modified parameters
          console.log(`Retry attempt ${attempt}: Modifying parameters`);
          config = this.modifyParametersForRetry(config, attempt);
        }

        const result = await ekoService.runMicroWorkflow(
          config.workflow,
          { ...config, attempt }
        );

        return result;
      } catch (error) {
        if (attempt === maxRetries) {
          // Last attempt failed, save for manual review
          await this.checkpointManager.saveForManualReview(
            config.checkpointId,
            error
          );
          throw error;
        }

        // Exponential backoff before retry
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        await this.sleep(delay);
      }
    }
  }

  private modifyParametersForRetry(config: InvokeConfig, attempt: number) {
    return {
      ...config,
      // Try different LLM on retry
      llm: attempt === 2 ? 'openai' : 'default',
      // More verbose output
      debug: true,
      // Longer timeouts
      timeout: config.timeout * (1 + attempt * 0.5),
    };
  }
}
```

---

## 📊 Monitoring & Metrics

```typescript
// BEST PRACTICE: Track performance
class AgentMetrics {
  async trackInvocation(
    agentName: string,
    result: EkoResult
  ) {
    const metrics = {
      agent: agentName,
      duration: result.duration,
      tokensUsed: result.tokenUsage?.total || 0,
      success: result.status === 'completed',
      toolCount: result.toolsUsed?.length || 0,
      toolsUsed: result.toolsUsed || [],
      error: result.error?.message || null,
      timestamp: Date.now(),
    };

    // Save metrics for analysis
    await this.metricsStore.save(metrics);

    // Alert on anomalies
    if (metrics.duration > 300000) {
      console.warn(`⚠️ Long execution: ${agentName} took ${metrics.duration}ms`);
    }

    if (metrics.tokensUsed > 8000) {
      console.warn(`⚠️ High token usage: ${metrics.tokensUsed} tokens`);
    }

    return metrics;
  }
}
```

---

## 🚨 Troubleshooting

### Issue: "Context Window Exhausted"
**Solution**: Use micro-workflow pattern instead of monolithic workflow
```typescript
// ❌ Wrong
const result = await eko.run(hugePromptWith50Steps);

// ✅ Correct
const results = await ekoService.runMicroWorkflowSequence([
  microWorkflow1, // 5-7 steps
  microWorkflow2, // 5-7 steps
  microWorkflow3, // 5-7 steps
]);
```

### Issue: "Workflow Interrupted" / Want to Resume
**Solution**: Use checkpoint system
```typescript
// Save checkpoint ID when task pauses
const result = await ekoService.runMicroWorkflow(workflow, {
  enableCheckpoints: true,
});

// Resume later
const resumed = await ekoService.resume(result.checkpointId);
```

### Issue: "Tool Timeout"
**Solution**: Implement timeout handling with fallback
```typescript
const callback = {
  onMessage: async (message) => {
    if (message.type === 'tool_running' && message.elapsed > 30000) {
      console.warn(`Tool ${message.toolName} running long`);
      // Could cancel, modify, or let continue
    }
  },
};
```

---

## ✅ Best Practices Checklist

When invoking agents, ensure:

- [ ] **Micro-workflows**: 5-10 steps max per workflow
- [ ] **Checkpointing**: Save state at logical boundaries
- [ ] **Error handling**: Implement retry with exponential backoff
- [ ] **Context isolation**: Each agent gets scoped context
- [ ] **Monitoring**: Track token usage and execution time
- [ ] **Human-in-the-loop**: Pause for critical decisions
- [ ] **Testing**: Test multi-agent scenarios before production
- [ ] **Documentation**: Document workflow assumptions and side effects

---

## 📚 Related Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Project architecture and framework details
- **[NEXT_STEPS.md](./NEXT_STEPS.md)** - Implementation roadmap (checkpoint system is Priority 1)
- **[agent-invoke.md](./agent-invoke.md)** - This file

---

## 🔄 Implementation Priority

See [NEXT_STEPS.md](./NEXT_STEPS.md) for strategic roadmap:

**Phase 1 (IMMEDIATE)**:
1. ✅ Checkpoint System (enables all patterns in this guide)
2. ⏳ Agent Context Manager
3. ⏳ MCP Integration

**Phase 2 (Soon)**:
4. Callback system enhancements
5. Error recovery framework
6. Workflow analyzer

This guide's recommended patterns depend on Phase 1 implementation.

---

**Last Updated**: 2025-11-13
**Version**: 2.0 (Aligned with Best Practices)
**Status**: Ready for Implementation
