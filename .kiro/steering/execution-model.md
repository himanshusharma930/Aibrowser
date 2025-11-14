---
title: Hierarchical Planning
description: Eko's two-layer execution model separates task planning from execution, enabling predictable automation and adaptive behavior. Learn how Eko decomposes and executes complex tasks through a whimsical example.
---

At the heart of Eko lies a unique two-layer execution model that fundamentally changes how agents interact with their environment. Unlike traditional tool-based agents that directly map user requests to tool calls, Eko introduces a deliberate separation between planning and execution. This separation enables both predictable automation and adaptive behavior.

## Understanding Through Example

![](../assets/hierarchical_planning.png)

To understand this model, let's explore a purposefully whimsical example: placing an elephant into a fridge. While this example uses fictitious tools for clarity, it perfectly illustrates how Eko decomposes and executes complex tasks.

## Key Concepts and Terminology

### Task Description

A task description is the natural language input that defines what needs to be accomplished. It focuses on the desired outcome rather than the specific steps or tools needed. In our example, "Place the elephant into the fridge" is a task description that anyone can understand, but achieving it requires careful planning and execution.

### Subtasks

When Eko receives a task description, it first breaks it down into logical subtasks during the planning phase. Each subtask represents a meaningful unit of work that contributes to the overall goal. In our elephant example, Eko identifies three subtasks: opening the fridge door, pushing the elephant in, and closing the door. This decomposition happens before any actual execution begins.

### Available Tools

Each subtask has an associated set of tools that could potentially help accomplish it. These are determined during the planning phase based on the subtask's requirements and the tools' capabilities. In our example, we use three fictitious tools - "Move hand" (🔴), "Door use" (🟢), and "Exert force" (🟡) - to illustrate this concept.

In real Eko applications, the actual tools are much more practical. The framework provides tools for browser automation ([Browser Extension Tools](/docs/tools/available#browser-extension)), web-to-local computer control ([Fellou Computer Use Tools](/docs/tools/available#fellou-browser)), local-computer control ([Node.js Tools](/docs/tools/available#fellou-browser)), and web interactions ([Web Tools](/docs/tools/available#web)). You can also create custom tools to extend Eko's capabilities ([Custom Tools](/docs/tools/custom)).

### Tool Calls

During execution, Eko dynamically generates a sequence of specific tool calls for each subtask. Unlike the static list of available tools, these tool calls represent the actual operations being performed.

For example, pushing the elephant requires:

- 🔴 Move hand (to position)
- 🟡 Exert force (to push)
- 🔴 Move hand (to complete)

## The Offline Planning Advantage

What sets Eko apart from standard tool-based agents is its offline planning phase. Traditional agents typically operate in a purely reactive manner, mapping user requests directly to tool calls. This can work for simple tasks but becomes unpredictable and difficult to manage for complex operations.

Eko's planning phase creates an inspectable, modifiable plan before any execution begins. This has several key benefits:

First, you can **review and understand** exactly how Eko intends to accomplish a task. The subtask decomposition and tool assignments are transparent and can be validated before execution begins. In our elephant example, you can verify that Eko hasn't forgotten crucial steps like opening the door first.

Second, the plan becomes a **reusable artifact**. Once Eko has figured out how to put an elephant in a fridge, that same task decomposition can be reused and adapted for similar situations. This leads to more efficient and reliable automation over time.

Third, the separation enables better **error handling**. When execution fails, Eko can attempt alternative tool sequences while keeping the overall plan intact. For instance, if one approach to pushing the elephant doesn't work, Eko can try different tool combinations without having to rethink the entire task.

## The Execution Flow

When you work with Eko, the process unfolds in two distinct phases:

During planning (`eko.generate`), Eko analyzes your task description and creates a structured workflow. This workflow includes the subtask decomposition and the tools available for each subtask. You can inspect this workflow, modify it if needed, or save it for later use.

```typescript
const workflow = await eko.generate("Place the elephant into the fridge");
// The workflow is inspectable and modifiable
console.log(workflow.subtasks);
```

During execution (`eko.execute`), Eko brings the plan to life. It works through each subtask, dynamically generating and executing the necessary tool sequences. The execution phase can adapt to changing conditions while staying true to the overall plan.

```typescript
const result = await eko.execute(workflow, {
  onSubtask: (subtask, context) => {
    // Monitor execution progress
    console.log(`Executing ${subtask.name}`);
    // Can modify execution based on context
    return context;
  },
});
```

This separation of planning and execution, combined with the ability to inspect and modify the plan, makes Eko particularly well-suited for complex automation tasks. Whether you're automating web interactions, controlling computer operations, or building custom workflows, the two-layer execution model ensures both reliability and flexibility.

## Next Steps

- Learn about Eko's [Tool System](/docs/tools/overview)
- dive into the [Hook System](/docs/architecture/hook-system) for execution control
- understand how Eko adapts to different environments in the [Environment-Aware Architecture](/docs/architecture/env-architecture)
