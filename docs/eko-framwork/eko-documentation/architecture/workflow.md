---
title: Workflow Structure
description: Eko represents automation tasks as directed acyclic graphs (DAGs), bridging natural language descriptions and executable automation. A workflow consists of subtasks (nodes) connected by dependencies (edges), with each node representing a discrete operation using specified tools.
---

Eko represents automation tasks as directed acyclic graphs (DAGs), bridging natural language descriptions and executable automation. A workflow consists of subtasks (nodes) connected by dependencies (edges), with each node representing a discrete operation using specified tools.

## Core Components

A workflow consists of subtask nodes connected by dependencies. Each subtask node has:

1. Core properties: ID, name, description
2. Input/output specifications: Data schemas for the subtask
3. Action definition: How the subtask should be executed using tools
4. Dependencies: IDs of nodes that must complete before this node

Here's a simplified workflow structure:

```json
{
  "id": "task-123",
  "name": "Web Search Task",
  "nodes": [
    {
      "id": "node-1",
      "name": "Search Operation",
      "input": {
        "type": "object",
        "schema": {
          "query": { "type": "string" }
        }
      },
      "output": {
        "type": "array",
        "schema": {
          "items": { "type": "string", "format": "url" }
        }
      },
      "action": {
        "type": "prompt",
        "name": "performSearch",
        "tools": ["web_search", "content_extractor"]
      }
    },
    {
      "id": "node-2",
      "name": "Content Extraction",
      "dependencies": ["node-1"],
      "action": {
        "type": "prompt",
        "name": "extractContent",
        "tools": ["content_extractor"]
      }
    }
  ]
}
```

## Actions

The action definition in each node specifies how the subtask should be executed. In Eko, actions are prompt-driven - the LLM determines how to use the available tools to accomplish the subtask. Each action specifies which tools it needs access to, but the precise sequence of tool usage is determined during execution based on the context and requirements.

For example, when executing a "Search GitHub" subtask, the LLM might be given access to web navigation and content extraction tools. During execution, it decides the exact sequence of operations - when to scroll, what elements to interact with, how to extract required information - based on its understanding of the task and the current page state.

## Runtime Behavior

During execution, Eko first validates the workflow structure, checking for dependency cycles and tool availability. It then determines an execution order that respects dependencies. Nodes without mutual dependencies can execute in parallel.

Data flows through the workflow following dependency edges. Each node's output must match its declared schema, and inputs must satisfy the requirements of dependent nodes. For example, a search node producing URLs must output them in a format that the subsequent content extraction node can process.

The workflow maintains execution state, tracking completed nodes and managing shared variables. When a node completes, Eko validates its output and makes it available to dependent nodes. Error handling occurs at both the node and workflow levels, with configurable retry and recovery strategies.

## Validation System

Validation occurs at three levels. Schema validation ensures the workflow structure is well-formed and tools are properly referenced. DAG validation verifies dependency relationships and detects cycles. Runtime validation checks tool availability and data compatibility during execution.

Invalid workflows are rejected early, with specific error messages identifying structural problems, missing tools, or data incompatibilities. This multi-level validation ensures workflows are both structurally sound and executable.

## Workflow Modification

Workflows support both static and dynamic modification. Before execution, nodes and dependencies can be added or modified programmatically. During execution, the [hook system](/docs/architecture/hook-system) enables dynamic adjustments to node behavior and data flow while maintaining DAG properties.

Changes must preserve the workflow's structural integrity - particularly its acyclic nature and schema compatibility between connected nodes. The validation system ensures modifications don't introduce cycles or break data flow contracts.

## Next Steps

The [hook system](/docs/architecture/hook-system) provides fine-grained execution control, while the tool system enables workflow capabilities to be extended, let's delve into the complete hook system in Eko to learn how to implement human-in-the-loop with LLMs.
