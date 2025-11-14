---
title: Dive Deep into Eko
description: Take a deeper look at Eko's core concepts through a complete Node.js example that demonstrates workflows, tools, and hooks working together.
---

Traditional automation frameworks require detailed step-by-step instructions. Eko is fully automatic and intelligent - you simply describe your goal, and it autonomously determines the optimal execution path and provides the finial result end-to-end.

## Concepts

Traditional automation frameworks typically require you to specify exact steps to ensure stable execution: “click here,” “type there,” “wait for 2 seconds.” Eko, however, takes an entirely different approach. Instead of focusing on specific actions, it allows you to describe the goal you want to accomplish, and then Eko determines how to execute it efficiently.

Eko is built on three key principles:

### 1. Planning

Instead of writing detailed instructions, you describe your goal in plain language. For example:

```typescript
const workflow = await eko.generate(
  "List all PDF files modified in the last week, extract their titles, and create a summary spreadsheet"
);
```

Behind the scenes, Eko:

```
- Analyzes the task to identify required capabilities (File operations, PDF processing, spreadsheet creation)
- Breaks it down into logical subtasks
- Determines the correct order of operations
- Selects appropriate tools for each step
```

This planning happens before any actual execution, allowing Eko to create a complete, validated plan that you can inspect or modify if needed.

### 2. Hierarchical structure

Eko has a hierarchical structure:

- **Planning layer**: excels at breaking down complex tasks into actionable steps
- **Operation layer**: is proficient in using tools effectively to execute tasks

This layered structure, known as the "_[Hierarchical planning](/docs/architecture/execution-model)_," is crucial for the following reasons:
- It ensures automation reliability by validating plans before execution.
- It allows for flexibility in adapting to changing conditions during execution.
- It enables independent adjustments to either the planning or execution layers without affecting the other.

![ENVS](../assets/hierarchical_planning.png)

### 3. Tool Integration and Hooks

The real work in Eko happens through tools - discrete units of capability that know how to perform specific operations. But unlike traditional automation libraries, Eko's tools are self-describing. They tell the framework:

- What they can do
- What information they need
- What conditions they require

Meanwhile, hooks let you monitor and control the automation process at multiple levels, from high-level workflow progress to individual tool operations.

## Exploring through an Example

Let's see these concepts in action by building something real. We'll create a workflow that processes directory contents, but pay attention to how Eko's architectural principles manifest in the code.

### Environment

First, create a new project and install dependencies:

```bash
mkdir eko-demo
cd eko-demo
pnpm install @eko-ai/eko dotenv
```

You'll need an API key from Anthropic to use Claude, which powers Eko's language understanding. Create a `.env` file:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

### Building the Workflow

Here's our complete example, which we'll break down piece by piece:

```typescript
import { Eko } from "@eko-ai/eko";
import { loadTools } from "@eko-ai/eko/nodejs";
import { WorkflowParser } from "@eko-ai/eko";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

Eko.tools = loadTools();

async function main() {
  // Initialize Eko with specific LLM configuration
  const eko = new Eko({
    llm: "claude", // Explicitly choose Claude as our LLM
    apiKey: process.env.ANTHROPIC_API_KEY,
    modelName: "claude-3-5-sonnet-20241022", // Use Sonnet for balanced performance
    maxTokens: 4096, // Adjust token limit if needed
  });

  // Generate a workflow from natural language description
  const workflow = await eko.generate(
    "List the contents of the current directory and save them to a file called contents.txt"
  );

  // Save the generated workflow for inspection
  const workflowJson = WorkflowParser.serialize(workflow);
  await fs.writeFile("workflow.json", workflowJson);
  console.log("Generated workflow saved to workflow.json");

  // Execute with monitoring hooks
  const result = await eko.execute(workflow, {
    hooks: {
      // Monitor subtask progress
      beforeSubtask: async (subtask, context) => {
        console.log(`Starting subtask: ${subtask.name}`);
        console.log(
          `Available tools:`,
          subtask.action.tools.map((t) => t.name)
        );
        return true; // Return false to skip this subtask
      },
      // Monitor individual tool usage
      beforeToolUse: async (tool, context, input) => {
        console.log(`Using tool ${tool.name} with input:`, input);
        return input; // Can modify input before tool executes
      },
      afterSubtask: async (subtask, context, result) => {
        console.log(`Completed ${subtask.name} with result:`, result);
      },
    },
  });

  console.log("Workflow completed:", result);
}

main().catch(console.error);
```

Let's examine what's happening here:

1. **Framework Initialization**

   ```typescript
   const eko = new Eko({
     llm: "claude",
     apiKey: process.env.ANTHROPIC_API_KEY,
     modelName: "claude-3-5-sonnet-20241022",
   });
   ```

   We're setting up Eko with Claude 3.5 Sonnet, a balanced model good for most tasks. You might choose other models based on your needs:

   - `claude-3-opus-20240229` for complex tasks requiring deep understanding
   - `claude-3-5-haiku-20241022` for simpler tasks where speed is important

2. **Workflow Generation**

   ```typescript
   const workflow = await eko.generate(
     "List the contents of the current directory and save them to a file called contents.txt"
   );
   ```

   This is where Eko's natural language understanding shines. It analyzes the request and creates a structured plan. Let's look at the generated workflow:

   ```json
   {
     "id": "directory-contents",
     "name": "List and Save Directory Contents",
     "nodes": [
       {
         "id": "list-contents",
         "action": {
           "type": "prompt",
           "name": "getDirectoryContents",
           "tools": ["execute_command"]
         }
       },
       {
         "id": "save-file",
         "dependencies": ["list-contents"],
         "action": {
           "type": "prompt",
           "name": "saveToFile",
           "tools": ["file_operations"]
         }
       }
     ]
   }
   ```

   Notice how Eko has:

   - Identified two main tasks (listing contents and saving)
   - Established the correct dependency (can't save before listing)
   - Selected appropriate tools for each task

3. **Execution with Hooks**
   ```typescript
   const result = await eko.execute(workflow, {
     hooks: {
       beforeSubtask: async (subtask, context) => {
         console.log(`Starting subtask: ${subtask.name}`);
         return true;
       },
     },
   });
   ```
   Hooks provide visibility and control over execution. You can:
   - Monitor progress
   - Modify inputs and outputs
   - Skip tasks conditionally
   - Handle errors gracefully

### Extending with Custom Tools

One of Eko's most powerful features is its extensibility. The following example requires TypeScript to run. Here's how you can add custom capabilities:

```typescript
import { Tool, InputSchema } from "@eko-ai/eko/types";

class DirectoryFormatter implements Tool {
  name = "format_directory";
  description = "Format directory listing with size and date information";

  input_schema: InputSchema = {
    type: "object",
    properties: {
      entries: {
        type: "array",
        description: "Array of directory entries",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the file or directory",
            },
            size: {
              type: "integer",
              description: "Size of the file in bytes",
            },
            modifiedAt: {
              type: "string",
              description:
                "Last modification date in ISO 8601 format (e.g., '2024-01-08T15:30:00Z')",
            },
          },
          required: ["name", "size", "modifiedAt"],
        },
      },
      format: {
        type: "string",
        enum: ["simple", "detailed"],
        description:
          "Output format style - 'simple' shows only names, 'detailed' includes size and modification date",
        default: "simple",
      },
    },
    required: ["entries"],
  };

  async execute(context, params) {
    const { entries, format = "simple" } = params as any;

    if (format === "simple") {
      return entries.map((entry) => entry.name).join("\n");
    }

    return entries
      .map(
        (entry) => `${entry.name} - ${entry.size} bytes - ${entry.modifiedAt}`
      )
      .join("\n");
  }
}
```

This tool showcases several important principles:

1. **Self-Description**
   The tool describes its capabilities and requirements through its `name`, `description`, and `input_schema`. This enables Eko to:

   - Understand when to use the tool
   - Validate inputs before execution
   - Generate appropriate tool combinations

2. **Type Safety**
   Using TypeScript interfaces ensures the tool integrates properly with the framework:

   ```typescript
   import { Tool, InputSchema } from "@eko-ai/eko/types";
   ```

3. **Context Awareness**
   Tools receive an execution context that provides access to:
   - Shared state
   - Environment information
   - Other tools' results

After creating a tool, register it with Eko:

```typescript
eko.registerTool(new DirectoryFormatter());
```

Now you can use it in workflows:

```typescript
const workflow = await eko.generate(
  "List the directory contents in detailed format, including file sizes"
);
```

To see the full example in action, save [format-dir.ts](examples/format-dir.ts), set up the Typescript environment, and run:

```bash
tsx format-dir.ts
```


## The Built-in Tool Ecosystem

Eko comes with a rich set of built-in tools, organized by environment:

### Browser Extension Tools
Tools for browser automation including:
- Web search and content extraction
- Tab management and navigation
- Element interaction and form filling
- Screenshot capture
- File export

### Web Tools
A subset of browser automation tools that work in web environments:
- Element interaction
- Content extraction
- Screenshot capture
- File export

### Node.js Tools
Tools for system automation:
- File operations (read/write)
- Command execution

### Fellou Browser Tools
Tools for computer control in the Fellou browser environment:
- Mouse and keyboard control
- Screen capture
- System interaction

Each environment provides its own appropriate set of tools based on the available capabilities and security constraints. For complete details on available tools and their usage, see:

- [Available Tools](/docs/tools/available) for a comprehensive reference
- [Tool System Overview](/docs/tools/overview) for understanding tool concepts
- [Browser Use Guide](/docs/browseruse/browser-extension) for browser automation details
- [Computer Use Guide](/docs/computeruse/computer-fellou) for system automation details

## Moving Beyond the Basics

Now that you understand Eko's core concepts, you can explore more advanced topics:

### Advanced Workflow Control

- [Hook System](/docs/architecture/hook-system) for fine-grained execution control
- Error handling and recovery strategies
- State management between nodes
- Parallel execution of independent tasks

### Tool Development

- Creating environment-specific tools
- Tool composition and chaining
- Handling asynchronous operations
- Error handling best practices

### Environment Integration

- [Browser Extension Development](/docs/browseruse/browser-extension)
- [Web Application Integration](/docs/browseruse/browser-web)
- [Node.js Automation](/docs/computeruse/computer-node)

Each of these topics is covered in depth in our detailed guides. The concepts you've learned here provide the foundation for understanding these more advanced capabilities.

## Next Steps

Ready to dive deeper? Here's where to go next:

- Explore browser automation in the [Browser Extension Guide](/docs/browseruse/browser-extension)
- Study the [Tool System](/docs/tools/overview) in depth
- Learn about advanced patterns in the [Hook System](/docs/architecture/hook-system)
- Understand how Eko adapts to different environments in [Environment-Aware Architecture](/docs/core-concepts/env-architecture)
