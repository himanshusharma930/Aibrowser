# AI Agent Team Strategy & Invocation Guide

This document defines the optimal AI agent team composition and invocation patterns for the Manus Electron AI Browser project.

**Related**: [CLAUDE.md](./CLAUDE.md) | [NEXT_STEPS.md](./NEXT_STEPS.md) | [agent-invoke.md](./agent-invoke.md)

---

## 🎯 Project Context

**Manus Electron AI Browser** combines:
- **Next.js 15** - React frontend (port 5173)
- **Electron 33** - Desktop application framework
- **Eko 3.0** - AI agent orchestration framework
- **IPC Communication** - Inter-process communication between renderer and main
- **Multi-Agent Workflows** - Browser automation, file operations, task scheduling

**Complexity**: High (hybrid architecture + AI integration + multiple layers)
**Team Size**: Solo to small team
**Recommended Approach**: Specialized agent team with clear responsibilities

---

## 🏗️ Architecture Layers & Agent Ownership

### Layer 1: Strategic Planning (ORCHESTRATION)
```
Role: Decompose features, validate approach, identify risks
Agents:
  🥇 tech-lead-orchestrator - Feature decomposition & strategy
  🥈 architect-reviewer - Architecture validation

Use When: Starting new feature, major refactoring, strategic decisions
```

### Layer 2: Frontend (UI/UX)
```
Role: React components, state management, styling
Agents:
  react-specialist - Component architecture, hooks
  nextjs-developer - Pages, routing, SSR
  typescript-pro - Type definitions & safety
  tailwind-frontend-expert - Styling & responsive design

Files: src/components/, src/pages/, src/stores/, src/type.d.ts
```

### Layer 3: Electron (Desktop Integration)
```
Role: Main process, windows, IPC, native features
Agents:
  🥇 electron-pro - Main/preload processes, window management
  nodejs-specialist - Service layer, utilities
  backend-developer - Business logic, data management

Files: electron/main/, electron/preload/
Critical: Main process errors crash entire app
```

### Layer 4: AI/Agent System (Core Intelligence)
```
Role: Eko orchestration, LLM integration, workflow management
Agents:
  🥇 ai-engineer - EkoService, agent initialization
  multi-agent-coordinator - Workflow design, agent coordination
  prompt-engineer - Agent prompts, tool descriptions

Files: electron/main/services/eko-service.ts
Critical: Core differentiator of your AI browser
```

### Layer 5: Quality & Security (GATEKEEPERS)
```
Role: Code review, security validation, testing
Agents:
  security-engineer - IPC validation, key handling, input sanitization
  code-reviewer - Quality, patterns, technical debt
  test-automator - Test creation, regression prevention
  debugger - Complex issue root cause analysis

Use: BEFORE merging, after major changes
```

---

## 📊 Agent Directory & Responsibilities

### Strategic & Planning

#### 1. tech-lead-orchestrator ⭐⭐⭐ (HIGHEST PRIORITY)
**Responsibility**: Multi-step task orchestration, feature decomposition
**Use For**:
- Breaking down complex features into subtasks
- Creating implementation plans with step ordering
- Identifying dependencies and risks
- Coordinating between multiple specialist agents

**Files to Analyze**:
- Project architecture (CLAUDE.md)
- Feature requirements
- Current codebase structure

**When to Invoke**:
```
At START of:
  • New feature development
  • Major refactoring
  • Complex bug investigation
  • Architecture changes
```

**Example Usage**:
```
@tech-lead-orchestrator
Analyze the checkpoint system implementation:
- Break into subtasks (TaskCheckpointManager, IPC handlers, UI integration)
- Identify dependencies (storage, serialization, error handling)
- Order for optimal parallel execution
- Recommend specialist agents for each subtask
```

---

#### 2. project-analyst
**Responsibility**: Codebase understanding, architecture discovery
**Use For**:
- Understanding new/unfamiliar codebases
- Identifying tech stack and frameworks
- Mapping integration points
- Dependency analysis

**When to Invoke**:
```
Before: Major refactoring, integration work
When: Understanding unfamiliar code sections
```

---

#### 3. architect-reviewer ⭐
**Responsibility**: Architecture validation, design assessment
**Use For**:
- Validating new feature architecture
- Evaluating technology choices
- Identifying scalability issues
- Ensuring pattern consistency

**When to Invoke**:
```
After: Feature architecture designed (before implementation)
When: Evaluating new approaches or frameworks
```

---

### Frontend Development

#### 4. react-specialist ⭐
**Responsibility**: React components, hooks, state management
**Use For**:
- Building React components
- Implementing custom hooks
- Zustand store design
- Component composition patterns

**Files**: `src/components/`, `src/stores/`, `src/hooks/`
**When to Invoke**: Any UI development work

---

#### 5. nextjs-developer
**Responsibility**: Next.js pages, routing, SSR/SSG
**Use For**:
- Creating new pages
- API routes if needed
- Next.js configuration
- Performance optimization

**Files**: `src/pages/`, `next.config.js`

---

#### 6. typescript-pro
**Responsibility**: Type safety, type definitions
**Use For**:
- Defining TypeScript interfaces
- Type validation
- Generic type design
- Type-safe patterns

**Files**: `src/type.d.ts` (main types file)

---

#### 7. tailwind-frontend-expert
**Responsibility**: Styling with Tailwind CSS
**Use For**:
- Component styling
- Responsive design
- Design system consistency
- Animation implementation

**When to Invoke**: After component skeleton created

---

### Electron (Desktop Layer)

#### 8. electron-pro ⭐⭐⭐ (CRITICAL)
**Responsibility**: Electron main process, window management, native integration
**Use For**:
- Main process logic
- Window creation/management
- Preload script security
- Native feature integration
- App lifecycle management

**Files**:
- `electron/main/` (main process)
- `electron/preload/` (preload scripts)
- `electron/main/windows/` (window management)

**Why Critical**:
- Main process errors crash entire app
- Security-sensitive code (IPC)
- Performance impacts all features
- Window state critical for UX

**When to Invoke**: ANY Electron-specific work
**Warning**: Test thoroughly - bugs are visible to users

---

#### 9. nodejs-specialist (or backend-developer)
**Responsibility**: Service layer, business logic, utilities
**Use For**:
- Implementing services
- Utility functions
- File operations
- System integration

**Files**:
- `electron/main/services/`
- `electron/main/utils/`

---

### AI/Agent System

#### 10. ai-engineer ⭐⭐⭐ (CRITICAL)
**Responsibility**: Eko framework integration, LLM integration, agent orchestration
**Use For**:
- EkoService implementation
- Agent configuration
- LLM provider integration
- Workflow execution logic
- Stream handling

**Files**: `electron/main/services/eko-service.ts` (PRIMARY)

**Why Critical**:
- Core differentiator (it's an AI browser!)
- Complex framework (Eko 3.0)
- Affects performance
- Token usage optimization

**Dependencies**: Understand Eko 3.0 architecture (see CLAUDE.md)

---

#### 11. multi-agent-coordinator
**Responsibility**: Multi-agent workflow design, agent handoff, task decomposition
**Use For**:
- Designing multi-agent workflows
- Agent state sharing
- Workflow XML creation
- Task decomposition using 12-Factor pattern

**Related**:
- [agent-invoke.md](./agent-invoke.md) - Invocation patterns
- [CLAUDE.md](./CLAUDE.md) - 12-Factor Agent pattern

---

#### 12. prompt-engineer
**Responsibility**: Agent prompts, tool descriptions, context optimization
**Use For**:
- Writing agent system prompts
- Tool descriptions for agents
- Context optimization
- Prompt optimization for token usage

**When to Invoke**: When optimizing agent behavior or adding new tools

---

### Quality & Security

#### 13. security-engineer ⭐ (PROACTIVE USE)
**Responsibility**: Security validation, input sanitization, compliance
**Use For**:
- IPC handler validation
- API key handling security
- Input validation
- OWASP compliance check
- Electron security best practices

**Critical Areas**:
- `electron/main/ipc/` (IPC handlers - security sensitive!)
- API key management
- Window preload scripts
- External API integrations

**⚠️ INVOKE PROACTIVELY**:
```
BEFORE: Committing any IPC changes
BEFORE: Handling user input
BEFORE: Working with API keys
BEFORE: External integrations
```

---

#### 14. code-reviewer ⭐
**Responsibility**: Code quality, pattern validation, technical debt
**Use For**:
- Code quality assessment
- Pattern consistency
- Technical debt identification
- Refactoring recommendations

**When to Invoke**: Before merging significant changes

---

#### 15. test-automator
**Responsibility**: Test creation, test automation, CI/CD
**Use For**:
- Creating test cases
- Building test automation
- Ensuring regression prevention
- Coverage improvement

**Files**: `test/`, `jest.config.js`

---

#### 16. debugger
**Responsibility**: Complex issue root cause analysis
**Use For**:
- Mysterious bugs
- IPC communication issues
- State management problems
- Performance anomalies

**When to Invoke**: When standard debugging fails

---

### Supporting Roles

#### 17. database-administrator
**Responsibility**: IndexedDB, electron-store, data schemas
**Use For**:
- Database schema design
- Migration planning
- Data storage optimization

**Files**:
- `src/lib/taskStorage.ts`
- `electron/main/utils/config-manager.ts`

---

#### 18. devops-engineer
**Responsibility**: Build system, CI/CD, deployment
**Use For**:
- Build optimization
- CI/CD pipeline setup
- Deployment automation
- Release management

**Files**:
- `package.json`
- Build scripts
- `.github/workflows/`

---

#### 19. accessibility-tester
**Responsibility**: WCAG compliance, screen reader support
**Use For**:
- Accessibility audits
- WCAG compliance checks
- Screen reader testing

**When to Invoke**: UI components targeting general audience

---

## 🔄 Recommended Agent Invocation Patterns

### Pattern 1: New Feature Development (MOST COMMON)

```
START
  ↓
[1] tech-lead-orchestrator
    - Decompose feature into tasks
    - Identify dependencies
    - Create execution order
  ↓
[2] architect-reviewer
    - Validate architecture
    - Ensure scalability
    - Check pattern consistency
  ↓
[3] PARALLEL EXECUTION
    ├─ react-specialist (UI components)
    ├─ electron-pro (IPC handlers if needed)
    └─ ai-engineer (Agent integration if needed)
  ↓
[4] typescript-pro
    - Add/update type definitions
  ↓
[5] security-engineer ⭐
    - Validate security implications
    - Check input validation
  ↓
[6] test-automator
    - Create tests
    - Ensure coverage
  ↓
[7] code-reviewer
    - Final quality check
  ↓
END (Ready to merge)
```

**Time**: ~2-3 days for medium feature
**Success Rate**: Very high (structured approach)

---

### Pattern 2: Bug Investigation & Fix

```
START (Bug Reported)
  ↓
[1] debugger
    - Root cause analysis
    - Reproduce issue
    - Identify location
  ↓
[2] Specialist agent (based on bug location)
    ├─ electron-pro (if Electron bug)
    ├─ react-specialist (if UI bug)
    ├─ ai-engineer (if agent bug)
    └─ backend-developer (if service bug)
  ↓
[3] security-engineer (if security-related) ⭐
  ↓
[4] test-automator
    - Create regression test
  ↓
[5] code-reviewer
    - Validate fix quality
  ↓
END (Bug fixed & tested)
```

**Time**: Variable (depends on bug complexity)
**Pro Tip**: Always create regression test to prevent recurrence

---

### Pattern 3: Agent/Workflow Implementation

```
START (New feature using agents)
  ↓
[1] multi-agent-coordinator
    - Design workflow decomposition
    - Plan agent handoffs
    - Create workflow XML templates
  ↓
[2] prompt-engineer
    - Write agent system prompts
    - Describe tools
    - Optimize for token usage
  ↓
[3] ai-engineer
    - Implement EkoService integration
    - Configure agents
    - Setup callbacks
  ↓
[4] typescript-pro
    - Add types for workflow results
  ↓
[5] test-automator
    - Test multi-agent scenarios
  ↓
END
```

**Reference**: See [agent-invoke.md](./agent-invoke.md) for practical examples

---

### Pattern 4: Performance Optimization

```
START (Performance issue detected)
  ↓
[1] performance-engineer
    - Profile application
    - Identify bottlenecks
    - Prioritize fixes
  ↓
[2] Specialist agent (based on bottleneck)
    ├─ react-specialist (re-render, component perf)
    ├─ electron-pro (main process CPU)
    └─ ai-engineer (token usage, inference time)
  ↓
[3] test-automator
    - Create performance benchmarks
  ↓
END
```

---

### Pattern 5: Refactoring & Technical Debt

```
START (Refactoring needed)
  ↓
[1] tech-lead-orchestrator
    - Plan refactoring strategy
    - Identify affected areas
    - Create task list
  ↓
[2] project-analyst
    - Current state analysis
  ↓
[3] architect-reviewer
    - Design new architecture
  ↓
[4] Sequential specialist execution
    (Follow feature development pattern)
  ↓
[5] code-reviewer
    - Ensure consistency
  ↓
END
```

---

## 🎯 When to Invoke Each Agent

### Immediate (Always Start With)
- **tech-lead-orchestrator** - New multi-step feature or complex task
- **security-engineer** - IPC changes, API integration, user input handling
- **debugger** - When you can't figure out a bug

### High Priority (Early in Development)
- **architect-reviewer** - After feature architecture designed
- **project-analyst** - When understanding new code area
- **ai-engineer** - Any Eko/agent framework work
- **electron-pro** - Any Electron-specific changes

### Mid Development
- **react-specialist** - UI component work
- **nextjs-developer** - Page/routing changes
- **typescript-pro** - Type definition work
- **multi-agent-coordinator** - Agent workflow design

### Before Merge
- **code-reviewer** - All significant changes
- **test-automator** - Create tests for new code
- **security-engineer** - Final security check (PROACTIVE!)

### Optional
- **accessibility-tester** - UI targeting general users
- **performance-engineer** - Performance concerns
- **devops-engineer** - Build/deployment issues

---

## 💡 Best Practices for Agent Invocation

### 1. **ALWAYS Start with Orchestration**
```typescript
// ✅ GOOD
@tech-lead-orchestrator
Decompose the checkpoint system:
  1. Identify subtasks
  2. Order for parallel execution
  3. Recommend agent team

// ❌ BAD
@typescript-pro
Add checkpoint types to type.d.ts
(Missing context - what's the purpose?)
```

### 2. **Provide Clear Context**
```typescript
// ✅ GOOD
@react-specialist
Build TaskProgressComponent:
- Display current step (5 items, currently on step 2)
- Show elapsed time
- Allow pause/resume buttons
- Update on 'checkpoint_saved' message
Reference: agent-invoke.md Pattern 1

// ❌ BAD
@react-specialist
Build a progress component
(Ambiguous - what should it display?)
```

### 3. **Stack Specialists Appropriately**
```typescript
// ✅ GOOD - Right order
tech-lead-orchestrator (plan)
  → architect-reviewer (validate)
  → react-specialist (build UI)
  → typescript-pro (add types)
  → security-engineer (validate)

// ❌ BAD - Wrong order
react-specialist (implement)
  → tech-lead-orchestrator (then plan?)
  → rework needed!
```

### 4. **Use Parallel Execution**
```typescript
// ✅ GOOD - Parallel
[Parallel] react-specialist, electron-pro, ai-engineer
  (All work simultaneously if independent)

// ❌ BAD - Sequential
react-specialist (finishes)
  → electron-pro (starts)
  → ai-engineer (starts)
  (Slower)
```

### 5. **Document Agent Decisions**
```typescript
// When invoking agent, explain WHY
@multi-agent-coordinator
Design workflow for: "Search and save product reviews"
Requirements:
  - Micro-workflow pattern (5-10 steps max per workflow)
  - Browser + File agents
  - Handle login, search, extraction, save
Constraints:
  - Max 5 minute timeout per workflow
  - Support checkpoint resumption
  - Track token usage
```

---

## 🚨 Critical Safety Guidelines

### SECURITY-SENSITIVE Areas (Always invoke security-engineer)
```
electron/main/ipc/*.ts       ⚠️ IPC handlers - SECURITY CRITICAL
electron/main/utils/config-manager.ts  ⚠️ Key storage
electron/preload/*.ts        ⚠️ Preload scripts
Any API key handling         ⚠️ Credential storage
User input processing        ⚠️ Injection attacks
```

### STABILITY-CRITICAL Areas (Always test)
```
electron/main/services/eko-service.ts  ⚠️ App core functionality
IPC communication                       ⚠️ UI-Main process bridge
Window management                       ⚠️ Crashes affect all features
Main process errors                     ⚠️ Crash = app crash
```

### PERFORMANCE-CRITICAL Areas (Profile before change)
```
Component render paths        ⚠️ UI responsiveness
IPC call frequency           ⚠️ Inter-process overhead
Token usage in agents        ⚠️ Cost + latency
Memory management            ⚠️ Long-running tasks
```

---

## 📋 Agent Team Quick Reference

| Agent | Specialty | Files | Invoke When |
|-------|-----------|-------|-------------|
| tech-lead-orchestrator | Orchestration | Any | START of complex work |
| electron-pro | Desktop app | electron/ | Electron changes |
| ai-engineer | AI/Eko | eko-service | Agent/LLM work |
| react-specialist | Components | src/components | UI development |
| security-engineer | Security | IPC handlers | ANY security-related |
| code-reviewer | Quality | All | Before merge |
| architect-reviewer | Design | All | After architecture |
| typescript-pro | Types | src/type.d.ts | Type definitions |
| multi-agent-coordinator | Workflows | Agent config | Workflow design |
| debugger | Root cause | Any | Complex bugs |

---

## 🎓 Learning Path for Developers

**If you're new to this project, invoke agents in this order:**

1. **project-analyst** - Understand the codebase
2. **tech-lead-orchestrator** - Learn decomposition strategy
3. **architect-reviewer** - Understand architecture decisions
4. **Specialists** (as needed) - Deep dive into specific areas

**Example Sequence**:
```
Day 1:
  @project-analyst - Analyze Manus codebase

Day 2:
  @tech-lead-orchestrator - Break down first feature

Day 3:
  @architect-reviewer - Validate approach

Days 4+:
  @specialists - Implementation
```

---

## 🔗 Integration with Documentation

| Document | Purpose | Agent Reference |
|----------|---------|-----------------|
| [CLAUDE.md](./CLAUDE.md) | Project overview & architecture | For tech-lead-orchestrator, project-analyst |
| [NEXT_STEPS.md](./NEXT_STEPS.md) | Strategic roadmap | For tech-lead-orchestrator, architect-reviewer |
| [agent-invoke.md](./agent-invoke.md) | Agent invocation patterns | For ai-engineer, multi-agent-coordinator |
| [AGENTS.md](./AGENTS.md) | This file - Agent team strategy | For all agents |

---

## ✅ Agent Invocation Checklist

Before invoking an agent, ensure:

- [ ] Clear problem statement
- [ ] Relevant context provided
- [ ] File paths or code references included
- [ ] Success criteria defined
- [ ] Related documentation referenced
- [ ] Security review planned if needed
- [ ] Testing strategy identified

---

## 📞 Emergency Agent Contacts

**If the app crashes**: `@electron-pro` (main process issue)
**If UI is broken**: `@react-specialist` + `@debugger`
**If agents aren't working**: `@ai-engineer` + `@debugger`
**If performance degrades**: `@performance-engineer`
**If unsure**: `@tech-lead-orchestrator` (ask for guidance)

---

## 🎯 Recommended First Action

**Immediately invoke**:
```
@tech-lead-orchestrator

Analyze the Manus Electron AI Browser codebase and provide:
1. Agent team recommendation for common development patterns
2. Task breakdown for implementing the checkpoint system
   (from NEXT_STEPS.md Phase 1)
3. Security review areas requiring security-engineer involvement
4. Estimated timeline for first implementation phase
5. Recommended agent coordination strategy
```

---

**Last Updated**: 2025-11-13
**Version**: 1.0
**Status**: Ready for Use
**Maintenance**: Update as new agent types are added or project evolves
