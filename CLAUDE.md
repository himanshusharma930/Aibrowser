# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Manus Electron is an AI-powered intelligent browser built with Next.js 15 and Electron 33. It features multi-modal AI task execution, scheduled tasks, and advanced browser automation capabilities powered by the @jarvis-agent framework (based on [Eko](https://github.com/FellouAI/eko)).

## Development Commands

### Development Setup
```bash
# Install dependencies (requires Node 20.19.3)
pnpm install

# Build Electron client dependencies (macOS)
pnpm run build:deps

# Build Electron client dependencies (Windows)
pnpm run build:deps:win

# Start full development environment (Next.js + Electron with hot reload)
pnpm run dev

# Start Next.js dev server only (port 5173)
pnpm run next

# Start Electron app only (requires Next.js dev server to be running)
pnpm run electron
```

### Production Build
```bash
# Complete build for macOS (includes automatic dependency cleanup)
pnpm run build

# Complete build for Windows
pnpm run build:win

# Build Next.js only
pnpm run build:next-only

# Build Electron dependencies only (macOS)
pnpm run build:deps

# Build Electron dependencies only (Windows)
pnpm run build:deps:win

# Verify production build (run after build completes)
node __tests__/temp/verify-build.js
```

**Build Pipeline Note**: The `pnpm run build` command automatically runs `scripts/clean-dependencies.js` before electron-builder to remove test dependencies (Jest, @testing-library, etc.) and ensure production-only dependencies are bundled. This is handled transparently via the `prebuild:electron` script hook.

### Testing
```bash
# Run tests
pnpm test

# Test speech recognition
pnpm run test:speech
```

### Other Commands
```bash
# Lint
pnpm run lint
```

## Configuration

### Environment Variables
Copy `.env.template` to `.env.local` for development. Key variables:

- **AI Provider API Keys**: `DEEPSEEK_API_KEY`, `QWEN_API_KEY`, `GOOGLE_API_KEY`, `ANTHROPIC_API_KEY`, `OPENROUTER_API_KEY`
- **Screenshot Settings**: `EKO_SCREENSHOT_SCALE` (default: 0.5) or `EKO_SCREENSHOT_MAX_WIDTH` (alternative)
- **TTS**: `TTS_REGION`, `TTS_KEY`

**Important**: API keys follow priority: User UI Configuration > Environment Variables > Default Values. Users can configure API keys directly in the UI without editing files.

## Architecture

### Hybrid Next.js + Electron Architecture

The application runs both as a web app (Next.js) and desktop app (Electron):

- **Next.js Frontend** (port 5173): React-based UI with pages in `src/pages/`
- **Electron Main Process**: `electron/main/` - manages windows, IPC, and native integrations
- **Electron Preload**: `electron/preload/` - bridges renderer and main processes securely
- **Electron Renderer**: Uses Next.js pages rendered in Electron windows

### Key Architectural Components

#### 1. AI Agent System (@jarvis-agent)
Located in `electron/main/services/eko-service.ts`:
- **EkoService**: Main orchestration service that initializes and manages Eko agent
- **Agents**: BrowserAgent (web automation) and FileAgent (file operations)
- **MCP Integration**: SimpleSseMcpClient for Model Context Protocol tools
- Stream-based communication with UI via IPC events (`eko-stream-message`)

#### 2. Window Management
Multiple windows/views managed via Electron:
- **Main Window**: Primary UI (MainWindowManager in `electron/main/windows/main-window.ts`)
- **Detail View**: WebContentsView showing browser automation or file content
- **Task Windows**: Managed by TaskWindowManager for background operations
- **Window Context**: windowContextManager tracks state across windows

#### 3. IPC Communication
`electron/main/ipc/` contains handlers for:
- **Model Config APIs**: getUserModelConfigs, saveUserModelConfigs, getApiKeySource
- **Agent Config APIs**: getAgentConfig, saveAgentConfig, getMcpTools, setMcpToolEnabled
- **Eko APIs**: ekoRun, ekoModify, ekoExecute, ekoCancelTask
- **Browser APIs**: navigateTo, sendToMainViewExecuteCode, getMainViewScreenshot
- **TTS/Voice**: sendVoiceTextToChat, sendTTSSubtitle

#### 4. Configuration Management
`electron/main/utils/config-manager.ts`:
- ConfigManager singleton manages all configuration
- Uses electron-store for persistent storage
- Merges user configs with environment variables
- Separate configs for models, agents, and MCP tools

#### 5. State Management
Zustand stores in `src/stores/`:
- **historyStore**: Task execution history
- **languageStore**: i18n language preferences
- **scheduled-task-store**: Scheduled task management

#### 6. Storage Layer
- **IndexedDB**: Browser-based storage via `src/lib/taskStorage.ts`, `src/lib/scheduled-task-storage.ts`
- **electron-store**: Native persistent storage for configs

#### 7. Task Scheduler
`electron/main/services/task-scheduler.ts`:
- Manages recurring scheduled tasks
- Integrates with TaskWindowManager for execution

### Directory Structure

```
src/
├── pages/           # Next.js pages (home, main, agent-config, toolbox)
├── components/      # React components (chat, fellou, scheduled-task)
├── lib/            # Core libraries (taskStorage, mcpTools, i18n, social media integrations)
├── stores/         # Zustand state management
├── models/         # Business logic (tts-player, speech-recognition)
├── hooks/          # React hooks
├── utils/          # Utilities
├── config/         # Configuration files
└── type.d.ts       # TypeScript type definitions

electron/
├── main/
│   ├── services/   # Core services (eko, server-manager, task-scheduler)
│   ├── windows/    # Window management
│   ├── ipc/        # IPC handlers
│   ├── ui/         # UI components (menu, tray, view)
│   └── utils/      # Utilities (config-manager, protocol, auto-update)
├── preload/        # Preload scripts (expose APIs to renderer)
└── renderer/       # Renderer process utilities
```

### Multi-Language Support (i18n)

The application supports English and Chinese via react-i18next:
- Locale files: `src/locales/en-US/` and `src/locales/zh-CN/`
- Initialization: `src/lib/i18n.ts`
- Language switching: languageStore in Zustand

### AI Provider Integration

Supports multiple LLM providers (DeepSeek, Qwen, Google Gemini, Anthropic Claude, OpenRouter):
- Configuration types defined in `src/type.d.ts`
- Provider selection and model configuration managed via UI
- Agent system uses configured provider for task execution

### Social Media Integrations

Platform-specific modules in `src/lib/`:
- **Xiaohongshu (小红书)**: `xiaohongshu/` - Chinese social media platform
- **Douyin (抖音)**: `douyin/` - TikTok's Chinese counterpart

---

# Eko 3.0 Framework Architecture

## Core Concepts

### Workflow-Based Execution Model

Eko uses a **dual-layer execution model** separating planning from execution:

1. **Planning Phase** (`Eko.generate`):
   - Planner agent converts natural language → XML-based Workflow
   - Workflow is a DSL that decomposes tasks into agent nodes
   - Each node contains subtasks and tool invocations
   - Workflows can be inspected, modified, or reused before execution

2. **Execution Phase** (`Eko.execute` or `Eko.run`):
   - Iteratively executes workflow nodes
   - Calls `Agent.run` for each agent with assigned tasks
   - Updates context with tool results
   - Continues until task completion or iteration limit

**Example Workflow XML**:
```xml
<root>
  <name>Follow Fellou AI on Twitter</name>
  <thought>Search and follow account using Browser agent</thought>
  <agents>
    <agent name="Browser">
      <task>Search and follow Fellou AI on Twitter</task>
      <nodes>
        <node>Navigate to https://twitter.com</node>
        <node>Click on the search box</node>
        <node>Input text "Fellou AI" into the search box</node>
        <node>Press Enter to perform the search</node>
        <node>Click the "Follow" button for the Fellou AI account</node>
      </nodes>
    </agent>
  </agents>
</root>
```

### Agent Architecture

**Agent Structure**:
```typescript
class Agent {
  name: string;           // Unique identifier (e.g., "Browser", "File")
  description: string;    // Agent's purpose and capabilities
  tools: Tool[];          // Available tools for this agent
  llms?: string[];        // Preferred LLMs (with fallback)
  mcpClient?: IMcpClient; // MCP for dynamic tool expansion
}
```

**Agent Hierarchy**:
- `Agent` (base class)
  - `BaseBrowserAgent` → Core browser interface
    - `BaseBrowserLabelsAgent` → Element-indexed automation
    - `BaseBrowserScreenAgent` → Coordinate-based automation
  - `BaseFileAgent` → File operations
  - `BaseShellAgent` → Command execution
  - `BaseChatAgent` → Conversational interactions
  - `BaseComputerAgent` → Desktop automation
  - `BaseTimerAgent` → Scheduled tasks

### Tool System

**Tool Interface**:
```typescript
interface Tool {
  name: string;              // Unique tool identifier
  description: string;       // What the tool does
  parameters: InputSchema;   // JSON schema for inputs
  execute: (args, agentContext, toolCall) => Promise<ToolResult>;
  destroy?: (context) => void; // Optional cleanup
}
```

**Tool Features**:
- **Session State**: Access `agentContext.variables` for cross-tool state
- **Global State**: Access `agentContext.context.variables` for cross-agent state
- **Streaming Events**: Emit `tool_running` events for long-running operations
- **Error Handling**: Return structured errors in ToolResult

**BrowserAgent Tools**:
- Navigation: `navigate_to`, `go_back`, `switch_tab`, `get_all_tabs`
- Interaction: `input_text`, `click_element`, `hover_to_element`, `scroll_to_element`, `select_option`
- Extraction: `extract_page_content`, `screenshot_and_html`
- Scrolling: `scroll_mouse_wheel`
- Utility: `wait`

### MCP (Model Context Protocol) Integration

**Purpose**: Dynamically expand agent capabilities at runtime

**SimpleSseMcpClient**:
```typescript
import { SimpleSseMcpClient } from "@eko-ai/eko";

let mcpClient = new SimpleSseMcpClient("http://localhost:8080/sse");

let agent = new Agent({
  name: "CustomAgent",
  description: "Agent with MCP tools",
  tools: [],
  mcpClient: mcpClient,  // Dynamically loads tools from MCP server
});
```

**Benefits**:
- Add external API integrations without code changes
- Load tools from third-party MCP servers
- Extend capabilities without redeployment

### Callback System

**Two Callback Domains**:

1. **Stream Callback** (monitoring):
   - `workflow`: Workflow generation/updates
   - `text`: LLM text streaming
   - `thinking`: Intermediate reasoning
   - `tool_streaming`: Tool call streaming
   - `tool_use`: Before tool execution (can modify params)
   - `tool_running`: During tool execution (progress updates)
   - `tool_result`: After tool execution (can modify result)
   - `file`: File output
   - `error`: Error events
   - `finish`: Workflow completion

2. **Human Callback** (interaction):
   - `onHumanConfirm`: Request user confirmation
   - `onHumanInput`: Request user input
   - `onHumanSelect`: Request user selection
   - `onHumanHelp`: Request user assistance (e.g., login, CAPTCHA)

**Example**:
```typescript
let callback: StreamCallback & HumanCallback = {
  onMessage: async (message: StreamCallbackMessage) => {
    if (message.type === "tool_use") {
      // Modify tool parameters before execution
      if (message.toolName === "navigate_to") {
        message.params.url = message.params.url.replace("twitter.com", "x.com");
      }
    }
    if (message.type === "tool_result") {
      // Filter sensitive data from results
      // message.toolResult.content = filterSensitiveData(...)
    }
  },
  onHumanConfirm: async (context, prompt) => {
    // Pause workflow for user confirmation
    return await showConfirmDialog(prompt);
  }
};
```

### Memory Mechanism

**Purpose**: Optimize context management and enable pause/resume

**Features**:
- Extracts actually-used tools (removes redundant calls)
- Compresses proxy messages
- Processes large context efficiently
- Creates task snapshots for interruption/resumption
- Maintains key information and node states

**Benefits**:
- Reduces token usage
- Prevents context overflow
- Enables long-running tasks
- Supports fault tolerance

## Important Development Notes

### Build System
- Next.js build uses custom config (`next.config.js`) with TypeScript/ESLint checks disabled during build
- Electron uses Vite for building main and preload processes
- Concurrent builds required for preload (index & view entries)

### Development Workflow
When developing features that involve both UI and Electron:
1. Changes to `src/` auto-reload via Next.js HMR
2. Changes to `electron/main/` trigger Electron restart via nodemon
3. Changes to `electron/preload/` rebuild via Vite watch mode

### IPC Best Practices
- All window.api methods are defined in preload scripts and typed in `src/type.d.ts`
- Use IPC for all communication between renderer and main processes
- Stream messages for long-running operations (e.g., AI responses)

### Security Considerations
- Never commit API keys to repository
- User-configured API keys stored encrypted in electron-store
- Use `.env.local` for development (in .gitignore)
- Use `.env.production` for production builds (not committed)
- **Important**: Never start or restart any development or production server automatically. Only execute server start commands if the user explicitly requests them.

## Key Technical Patterns

### Stream-Based AI Response Handling
The EkoService uses a stream-based architecture for AI responses:
- Long-running tasks stream messages via IPC events (`eko-stream-message`)
- UI components subscribe to these streams for real-time updates with message types: `text_streaming`, `tool_streaming`, `tool_result`, `error`
- Stream completion signaled by specific message types and state changes
- Task execution can be canceled via `ekoCancelTask` IPC handler
- See `project-docs/api.md` for complete streaming API reference

### Model Configuration Hierarchy
API key resolution follows this priority order:
1. User configuration set via UI (stored in electron-store)
2. Environment variables (.env.local or .env.production)
3. Default values embedded in the application

This allows flexible deployment: development uses .env.local, production builds include configured keys. ConfigManager in `electron/main/utils/config-manager.ts` implements this logic.

### Window Context Management
Windows maintain separate but synchronized state:
- MainWindowManager creates and manages the primary application window (loads Next.js on port 5173)
- TaskWindowManager handles background execution windows for scheduled tasks
- windowContextManager tracks state across windows to prevent conflicts
- Detail View (WebContentsView) positioned at (x:818, y:264, size:748x560) renders browser automation output
- Separate EkoService instance per window for isolated task execution

### Task Execution & Scheduling
- Manual tasks executed via `ekoRun()` API in main window
- Scheduled tasks managed by TaskScheduler in background windows
- Task history persisted to IndexedDB (`aif10-agent` database, `tasks` store)
- Each scheduled task can have multi-step workflows with custom intervals
- See `project-docs/backend.md` for complete task execution flow

### State Management Architecture
- **Global State**: Zustand stores (history, language, scheduled tasks) in `src/stores/`
- **Persistent State**: IndexedDB for task history, electron-store for configs
- **Event-Driven Updates**: IPC events for cross-process state synchronization
- **Server State**: Direct IPC calls with React hooks (no caching layer currently)
- See `project-docs/state-management.md` for detailed patterns and recommendations

### Testing Considerations
- Unit tests use Jest framework
- Speech recognition testing via `pnpm test:speech` uses Vosk model from `public/models/`
- Model download script available via `pnpm test:speech:download-model` for CI/CD setup
- Speech SDK (`microsoft-cognitiveservices-speech-sdk`) for TTS integration

## Development Tips

### Debugging Electron + Next.js Issues
- Check Next.js console output (port 5173) for frontend errors
- Check Electron console for main process errors
- Preload script errors appear in both contexts
- IPC errors typically manifest in Electron dev tools

### Hot Reload Behavior
- Next.js changes reload the renderer process (no app restart needed)
- `electron/main/` changes trigger Electron app restart via nodemon
- `electron/preload/` changes rebuild and require Electron restart
- When making preload changes, rebuild completes before Electron restarts

### Windows Development Notes
- Use `pnpm run dev:win` for full development with Windows-specific environment variables
- Use `build:deps:win` for building dependencies with Windows path separators
- Build process uses concurrent compilation for preload entries (required for both index & view)

## 12-Factor Agent Best Practices

### Micro-Agent Pattern (Recommended)

Eko 3.0 advocates for **micro-agents** following the 12-Factor principles:

**Philosophy**: 5-10 step workflows with focused objectives instead of monolithic 50+ step tasks

**Benefits**:
- Reduced token usage per workflow
- Easier to debug and modify individual steps
- Better context window management
- Improved resilience (can pause/resume at checkpoint)
- Reusable workflows across different tasks

**Example - Micro-Workflow**:
```xml
<root>
  <name>Search Product Reviews</name>
  <agents>
    <agent name="Browser">
      <task>Find product reviews on e-commerce site</task>
      <nodes>
        <node>Navigate to product page</node>
        <node>Scroll to reviews section</node>
        <node>Extract review text and ratings</node>
        <node>Return results</node>
      </nodes>
    </agent>
  </agents>
</root>
```

### Anti-Pattern: Monolithic Workflows

**DO NOT** create single workflows with 50+ nodes:
```xml
<!-- ❌ AVOID THIS -->
<root>
  <name>Complex Multi-Step Task</name>
  <agents>
    <agent name="Browser">
      <task>Do everything at once</task>
      <nodes>
        <node>Step 1 of 50...</node>
        <node>Step 2...</node>
        <!-- ... 48 more nodes -->
      </nodes>
    </agent>
  </agents>
</root>
```

Instead, break into sequential micro-workflows:
```typescript
const microWorkflows = [
  { name: 'FetchProducts', tasks: ['Get 25 products'] },
  { name: 'ExtractReviews', tasks: ['Parse reviews from batch'] },
  { name: 'AnalyzeSentiment', tasks: ['Analyze 100 reviews'] },
  { name: 'GenerateReport', tasks: ['Create summary'] },
];

for (const workflow of microWorkflows) {
  const result = await eko.run(workflow.name);
  await saveCheckpoint(result);
}
```

### Context Window Management

**Strategy**: Checkpoint intermediate results, compress context

**Implementation in EkoService**:
```typescript
async executeWithCheckpoints(microWorkflows: Workflow[]) {
  const checkpoint = await loadCheckpoint();
  const startIndex = checkpoint?.lastCompleted ?? 0;

  for (let i = startIndex; i < microWorkflows.length; i++) {
    try {
      const result = await eko.run(microWorkflows[i]);
      await saveCheckpoint({
        lastCompleted: i,
        result,
        timestamp: Date.now(),
      });
    } catch (error) {
      await saveCheckpoint({
        lastCompleted: i,
        error: error.message,
        failurePoint: 'step_' + i,
      });
      throw error;
    }
  }
}
```

### Error Recovery & Resilience

**Checkpointing Strategy**:
- Save state after each micro-workflow completes
- Enable resumption from last successful checkpoint
- Include task metadata (startTime, duration, tokenUsage)

**Implementation**:
```typescript
class ResilientTaskExecutor {
  private checkpointDir = '.checkpoints';

  async executeWithRecovery(workflows: Workflow[]) {
    for (let i = 0; i < workflows.length; i++) {
      const checkpoint = this.loadCheckpoint(i);

      if (checkpoint?.status === 'completed') {
        console.log(`Skipping completed workflow ${i}`);
        continue;
      }

      try {
        const result = await eko.run(workflows[i]);
        this.saveCheckpoint(i, { status: 'completed', result });
      } catch (error) {
        this.saveCheckpoint(i, { status: 'failed', error: error.message });

        // Decide: retry, skip, or throw
        if (this.isRetryable(error)) {
          i--; // Retry this workflow
        }
      }
    }
  }
}
```

### Tool-Level State Management

**Session Variables** (persist across tool calls within single workflow):
```typescript
const agentContext = {
  variables: {
    // Shared across all tools in this workflow execution
    sessionId: generateSessionId(),
    loginCookie: null,
    pageCache: new Map(),
    csrfToken: null,
  },
};

// BrowserAgent tools can read/write session state
const loginTool = {
  name: 'login_and_navigate',
  async execute(args, agentContext) {
    if (!agentContext.variables.loginCookie) {
      const cookie = await performLogin(args.username, args.password);
      agentContext.variables.loginCookie = cookie;
    }
    return navigate(args.url, agentContext.variables.loginCookie);
  },
};
```

**Global Context** (shared across all agents):
```typescript
const globalContext = {
  variables: {
    userId: 'user-123',
    apiToken: 'token-xyz',
    projectId: 'proj-abc',
    cachedData: {},
  },
};

// All agents can access global context
await agent1.run(task1, { ...agentContext, context: globalContext });
await agent2.run(task2, { ...agentContext, context: globalContext });
```

### Agent Handoff Pattern

**Cross-Agent State Transfer**:
```typescript
async executeMultiAgentTask() {
  const sharedState = { contacts: [], processedCount: 0 };

  // Browser agent extracts data
  const browserResult = await browserAgent.run(
    'Search and extract contact information',
    { variables: sharedState }
  );

  // File agent processes results
  const fileResult = await fileAgent.run(
    'Save contacts to CSV and create report',
    { variables: sharedState }
  );

  return { browserResult, fileResult, finalContacts: sharedState.contacts };
}
```

## Agent Invocation Patterns

### Pattern 1: Simple Direct Invocation

**Best For**: One-off tasks, simple queries

```typescript
const result = await ekoService.run('Search for latest tech news');
console.log(result.result);
```

### Pattern 2: Workflow Generation + Review + Execute

**Best For**: Complex tasks requiring approval or modification

```typescript
// Step 1: Generate workflow (planning phase)
const workflow = await eko.generate('Automate social media posting');

// Step 2: Inspect and modify if needed
console.log(workflow.xml);
if (needsModification) {
  workflow.xml = sanitizeWorkflow(workflow.xml);
}

// Step 3: Execute the workflow
const result = await eko.execute(workflow);
```

### Pattern 3: Stream-Based Long-Running Tasks

**Best For**: UI updates, progress tracking

```typescript
const streamCallback = {
  onMessage: async (message) => {
    switch(message.type) {
      case 'tool_use':
        updateUI(`Executing: ${message.toolName}`);
        break;
      case 'tool_result':
        updateUI(`Result: ${message.content}`);
        break;
      case 'error':
        updateUI(`Error: ${message.error}`);
        break;
    }
  },
};

await eko.run(prompt, { callbacks: streamCallback });
```

### Pattern 4: Human-in-the-Loop Workflow

**Best For**: Tasks requiring user confirmation, input, or assistance

```typescript
const humanCallback = {
  onHumanConfirm: async (context, prompt) => {
    return await windowManager.showConfirmDialog(prompt);
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

await eko.run(prompt, { callbacks: humanCallback });
```

## Agent Coordination Guidelines

### Multi-Agent Workflow

**Scenario**: Automate posting to multiple platforms

```xml
<root>
  <name>Cross-Platform Social Post</name>
  <agents>
    <agent name="Browser">
      <task>Post to Twitter and Instagram</task>
      <nodes>
        <node>Navigate to Twitter</node>
        <node>Create post with content</node>
        <node>Navigate to Instagram</node>
        <node>Create post with content</node>
      </nodes>
    </agent>
    <agent name="File">
      <task>Save post metadata</task>
      <nodes>
        <node>Create post_log.json</node>
        <node>Save screenshots</node>
      </nodes>
    </agent>
  </agents>
</root>
```

### Conditional Agent Selection

**Choose agents based on task requirements**:
```typescript
async executeSmartTask(prompt: string) {
  const requiredAgents = await analyzePrompt(prompt);

  const agents: Agent[] = [];
  if (requiredAgents.includes('browser')) agents.push(new BrowserAgent());
  if (requiredAgents.includes('file')) agents.push(new FileAgent());
  if (requiredAgents.includes('shell')) agents.push(new ShellAgent());

  const eko = new Eko({ agents, llms: config.llms });
  return await eko.run(prompt);
}
```

## Documentation Reference

Key documentation files in this repository:

- **[agent-invoke.md](./agent-invoke.md)** - Agent invocation patterns, callbacks, coordination, and advanced patterns
- **[README.md](./README.md)** - Project overview and setup instructions
- **[docs/](./docs/)** - Framework documentation and guides

**Note**: For future enhancement, consider creating `project-docs/` directory with:
- `api.md` - Complete IPC API reference, streaming patterns, integration examples
- `backend.md` - Electron main process architecture, services, task execution flows
- `state-management.md` - Zustand stores, persistence patterns, optimization techniques
- `database-schema.md` - IndexedDB schema, electron-store structure, migrations
- `frontend.md` - React components, Ant Design integration, styling approach

Reference existing documentation when:
- Adding new IPC handlers or APIs
- Working on state management changes
- Integrating new AI providers
- Working with the AI agent system
- Implementing multi-agent workflows
- Designing resilient long-running tasks

---

# Development Guidelines

---

## SOLID Principles

Five design principles that make software more maintainable, flexible, and scalable.

### Single Responsibility (SRP)
Each class should have only one reason to change, with one specific responsibility.
- Separate UI widgets from business logic
- Keep repositories focused on data operations only
- Isolate validation logic into dedicated validator classes
- Benefits: easier testing, clearer code purpose, simpler maintenance

### Open/Closed (OCP)
Software entities should be open for extension but closed for modification.
- Use abstract classes and interfaces to define contracts
- Extend functionality by creating new implementations, not modifying existing code
- Example: Create `PaymentMethod` interface, then extend with `CreditCard`, `PayPal`, etc.
- Benefits: reduces bugs in existing code, safer to add features

### Liskov Substitution (LSP)
Objects of a subclass must be substitutable for objects of their parent class.
- Subclasses should strengthen, not weaken, parent class behavior
- Don't throw exceptions in overridden methods that parent doesn't throw
- Example: If `Bird` has `move()`, all bird subclasses should implement valid movement
- Benefits: predictable behavior, safer inheritance hierarchies

### Interface Segregation (ISP)
Clients shouldn't be forced to depend on interfaces they don't use.
- Create small, focused interfaces instead of large, monolithic ones
- Split `Worker` interface into `Workable`, `Eatable`, `Sleepable`
- Classes implement only the interfaces they need
- Benefits: more flexible code, easier to implement and test

### Dependency Inversion (DIP)
Depend on abstractions, not concrete implementations.
- High-level modules shouldn't depend on low-level modules
- Use dependency injection to provide implementations
- Define abstract `DataSource`, inject `ApiClient` or `LocalDatabase`
- Benefits: easier testing with mocks, flexible architecture, decoupled code

---

## DRY Principle (Don't Repeat Yourself)

- Extract repeated UI patterns into reusable React components
- Use TypeScript interfaces and types to share definitions
- Separate business logic from UI components
- Create utility functions for common operations
- Use custom hooks for shared React logic
- Benefits: less code, easier maintenance, fewer bugs, better testing

---

## KISS Principle (Keep It Simple, Stupid)

- Use React and Ant Design built-in components instead of creating complex custom solutions
- Write self-explanatory code with clear variable/function names
- Avoid over-engineering simple problems
- Minimize external dependencies
- Break down complex components into smaller, manageable pieces
- Start simple, add complexity only when necessary

---

## YAGNI Principle (You Aren't Gonna Need It)

Don't implement functionality until it's actually needed.
- Resist the urge to build features "just in case" they might be useful later
- Focus on current requirements, not hypothetical future needs
- Don't create abstract layers for one implementation
- Avoid premature optimization before measuring performance
- Don't build configuration systems until you need configurability
- Wait for actual use cases before adding flexibility
- Benefits: less code to maintain, faster delivery, lower complexity, easier to change

---

## Summary

Following these principles results in:
- Maintainable, extendable code
- Fewer bugs and faster debugging
- Better team collaboration
- Professional quality standards
- **Remember: Good code is simple, clear, and purposeful.**
```
- Make sure that you do not remove any functionality in the process
- Do not waste tokens and time on creating useless docs and reports and summaries files
- ⚠️ MANDATORY POLICY — MARKDOWN & TEXT FILES ONLY

CREATION RULES

Produce only functional, essential files needed for system execution or AI agent operation.

Never generate documentation, summaries, analyses, or reports unless explicitly requested or required for setup.

✅ ALLOWED

Setup essentials: requirements.txt, README.md (only if critical for installation or runtime initialization)

Agent configurations: CLAUDE.md, AGENTS.md, KIRO_SPEC.md, KIRO_WORKFLOW.md (or their operational equivalents)

Test/validation assets: Only when explicitly requested

❌ STRICTLY FORBIDDEN

Any non-functional or descriptive markdown/text

Analytical, summary, or report-style documents

Background, narrative, or explanatory content with no direct execution value

Only output files that impact runtime behavior, agent control, or verifiable testing — everything else is strictly off-limits.
- # Project Rules

## Behavior
- Focus exclusively on writing, editing, and implementing code
- DO NOT generate summaries, reports, or documentation unless explicitly requested
- DO NOT create visual aids or diagrams automatically
- Work autonomously: propose solutions and implement them immediately
- Only ask for confirmation on destructive operations (deletes, major refactors)

## Output Style
- Concise communication
- Show code changes, not explanations
- Skip status updates unless errors occur
- No markdown formatting in responses unless showing code

## Workflow
- Read → Analyze → Implement → Test → Move to next task
- Use /clear between unrelated tasks to maintain focus
- Avoid compaction summaries - use /clear instead of /compact
- USE THE /Users/roshansharma/Desktop/Vscode/deepbrowser/ai-browser/__tests__/temp folder for every reports, summary or other tests
- Make sure to keep the root directory organised and clean as much as possible following the production best practises,

