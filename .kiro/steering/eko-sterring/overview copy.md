---
title: Overview
description: This guide introduces the built-in tools in Eko and how to customize tools.
---

## What are Tools?

In the Eko framework, Tools are reusable functional modules, just like various tools in a toolbox, each with specific functionality. For example:

- Tools for web search
- Tools for computer use
- Tools for calling APIs
- Tools for reading and writing files

## Why Use Tools

### 1. Modular Design
Tools are independent modules, with each Tool responsible for completing specific functionality. This design allows developers to break down complex workflows into simple, manageable steps. Through this modular approach, developers can reuse these tools across different projects, reduce code duplication, and improve development efficiency.

### 2. Clear Interface Definition
Each Tool follows a unified interface structure, including `name`, `description`, `input_schema` and `execute` methods. This consistency makes it easy for developers to understand and use different Tools without worrying about implementation details of each Tool. For example, aspects involving input data format and execution logic are standardized, reducing learning costs and error probability.

```typescript
interface Tool<T, R> {
  name: string;
  description: string;
  input_schema: InputSchema;
  execute: (context: ExecutionContext, params: T) => Promise<R>;
  destroy?: (context: ExecutionContext) => void;
}
```

• name: A unique identifier for the tool (e.g. `open_url`)

• description: A functional description explaining the tool's purpose and usage scenarios 

• input_schema: A JSON-structured definition of the parameter T

### 3. Extensibility
In the Eko framework, Tools can be easily extended and replaced. If you find a Tool is not performing ideally in specific use cases, you can design a new Tool to replace the old version without making major modifications to the entire workflow. This flexibility maintains system stability and efficiency under changing requirements.

## Role of Tools in Workflow

In the Eko framework, a Workflow is a process of sequential or parallel execution of multiple tasks combined from Tools. The main roles of Tools in Workflow are:

1. **Task Division**: By dividing large tasks into several smaller Tools, with each Tool responsible for specific functionality, users can better understand the task structure and quickly locate and modify specific steps when necessary.

2. **Parameter Management**: Each Tool defines its required input parameters (input_schema), ensuring correct data formats are passed during invocation, thus reducing runtime issues caused by parameter errors.

3. **Execution Context**: Tools can access the ExecutionContext during execution, allowing developers to pass runtime information as needed for intelligent task execution.

4. **Task Destruction**: For tools that need to clean up resources, Tools also provide an optional `destroy` method, allowing timely release of resources after task completion to maintain system cleanliness and efficiency.

## Using in Eko

Eko framework provides various built-in tools for different environments that can be used directly, and you can also customize tools to complete workflow tasks.

### Built-in tools

Here is a demonstration of the node.js environment

```typescript
import { Eko } from "@eko-ai/eko";
import { loadTools } from "@eko-ai/eko/nodejs";

// Register all tools for current environment
Eko.tools = loadTools();

let eko = new Eko("apiKey");

// Generate a workflow from natural language description
const workflow = await eko.generate(`
  Clean up log files larger than 1M on current directory
`);

// Execute the workflow
await eko.execute(workflow);
```

Learn more: [Available Tools](/docs/tools/available).

### Custom tools
```typescript
import { Eko } from "@eko-ai/eko";
import { loadTools } from "@eko-ai/eko/nodejs";

// Register all tools for current environment
Eko.tools = loadTools();

let eko = new Eko("apiKey");

// register tool
// Custom MyQueryOrderTool tool
eko.registerTool(new MyQueryOrderTool());

// Generate a workflow from natural language description
const workflow = await eko.generate(`
  Get the unshipped orders of user ID 1000 within the last 3 days
`);

// Execute the workflow
await eko.execute(workflow);
```

Learn more: [Custom Tools](/docs/tools/custom).

### Auto register tools

Automatically register all tools in the current environment.

* Browser Extension
  ```typescript
  import { Eko } from "@eko-ai/eko";
  import { loadTools } from "@eko-ai/eko/extension";

  Eko.tools = loadTools();
  ```

* Web
  ```typescript
  import { Eko } from "@eko-ai/eko";
  import { loadTools } from "@eko-ai/eko/web";

  Eko.tools = loadTools();
  ```

* Node.js
  ```typescript
  import { Eko } from "@eko-ai/eko";
  import { loadTools } from "@eko-ai/eko/nodejs";

  Eko.tools = loadTools();
  ```

After registering with `Eko.tools = loadTools()`, there's no need to explicitly register tools in Eko - they can be used directly.

```typescript
import { Eko } from "@eko-ai/eko";
import { loadTools } from "@eko-ai/eko/nodejs";

// Register all tools for current environment
Eko.tools = loadTools();

const workflow = await eko.generate(`
  Your workflow
`);

await eko.execute(workflow);
```

## Next Steps

Now that you understand the concept of tools, let's look at what built-in Tools are available and how to customize Tools:

- Built-in [Available Tools](/docs/tools/available) of the framework in different environments
- Learn how to [Custom Tools](/docs/tools/custom)
- Learn how to use [Tools Hook](/docs/tools/hook) to dynamically modify input and output parameters
