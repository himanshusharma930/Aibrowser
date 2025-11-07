---
title: Tools Hook
description: This guide introduces tools hook handling and how to modify input and output parameters.
---

## What is Eko Tools Hook?

Eko is a flexible framework that supports calling tools through workflows to achieve data orchestration and processing. To enhance the flexibility and customizability of this process, Eko provides a hook mechanism. Hooks allow users to intercept and process inputs and outputs before and after tool execution, thus optimizing workflow execution.

## Why Tools Hooks?

In practical applications, we may need to make specific modifications or validations to the inputs or outputs of the tools. For example:

1. **Input Validation**: Before tool execution, we can check if input parameters meet the expected format or range.
2. **Result Processing**: After tool execution, we can format or transform the results to fit subsequent processes.
3. **Logging**: We can log the tool execution process to facilitate workflow tracking.
4. **Conditional Processing**: Modify inputs or decide whether to execute a tool based on specific conditions.

By using hooks, you can implement these functionalities without modifying the tools themselves, thus improving code reusability and the maintainability of workflows.

## How to Use Hooks?

Implement the `beforeToolUse` and `afterToolUse` hook functions. These functions will be called before and after tool execution.

### beforeToolUse

```typescript
beforeToolUse?: (
  tool: Tool<any, any>,  // The tool currently being executed
  context: ExecutionContext,  // Execution context
  input: any  // Input parameters
) => Promise<any>  // Returns the modified input parameters
```

### afterToolUse  

```typescript
afterToolUse?: (
  tool: Tool<any, any>,  // The tool currently being executed
  context: ExecutionContext,  // Execution context 
  result: any  // Execution result
) => Promise<any>  // Returns the modified result
```

## Usage Examples

### Basic Usage

```typescript
await eko.execute(workflow, {
  hooks: {
    beforeToolUse: async (tool, context, input) => {
      console.log(`Executing tool ${tool.name}, Input:`, input);
      return input;
    },
    afterToolUse: async (tool, context, result) => {
      console.log(`Tool ${tool.name} execution completed, Result:`, result);
      return result;
    }
  }
});
```

### Practical Application Scenarios

#### Scenario 1: Parameter Validation and Conversion

```typescript
await eko.execute(workflow, {
  hooks: {
    beforeToolUse: async (tool, context, input) => {
      // Validate numerical parameters
      if (input.amount && typeof input.amount !== 'number') {
        input.amount = Number(input.amount);
      }
      
      // Ensure date format is correct
      if (input.date && !(input.date instanceof Date)) {
        input.date = new Date(input.date);
      }
      
      return input;
    }
  }
});
```

#### Scenario 2: Error Handling and Retries

```typescript
const MAX_RETRIES = 3;

await eko.execute(workflow, {
  hooks: {
    beforeToolUse: async (tool, context, input) => {
      context.retryCount = 0;
      return input;
    },
    
    afterToolUse: async (tool, context, result) => {
      if (result.error && context.retryCount < MAX_RETRIES) {
        context.retryCount++;
        console.log(`Retrying ${context.retryCount} time(s)`);
        return await tool.execute(context, input);
      }
      return result;
    }
  }
});
```

#### Scenario 3: Performance Monitoring

```typescript
await eko.execute(workflow, {
  hooks: {
    beforeToolUse: async (tool, context, input) => {
      context.startTime = Date.now();
      return input;
    },
    
    afterToolUse: async (tool, context, result) => {
      const duration = Date.now() - context.startTime;
      console.log(`Tool ${tool.name} execution time: ${duration}ms`);
      
      // Send performance data to monitoring system
      await metrics.record({
        tool: tool.name,
        duration,
        success: !result.error
      });
      
      return result;
    }
  }
});
```

#### Scenario 4: Data Encryption for Sensitive Information

```typescript
await eko.execute(workflow, {
  hooks: {
    beforeToolUse: async (tool, context, input) => {
      // Encrypt sensitive data
      if (input.phoneNumber) {
        input.phoneNumber = encrypt(input.phoneNumber);
      }
      if (input.password) {
        input.password = encrypt(input.password);
      }
      return input;
    },
    
    afterToolUse: async (tool, context, result) => {
      // Clean up sensitive information from the returned result
      if (result.userInfo) {
        delete result.userInfo.token;
        delete result.userInfo.bankAccount;
      }
      return result;
    }
  }
});
```

#### Scenario 5: Before using the browser_use, check if the website is logged in.

```typescript
import { tools } from "@eko-ai/eko/extension";

await eko.execute(workflow, {
  hooks: {
    beforeToolUse: async (tool, context, input) => {
      if (tool.name == 'browser_use') {
        // check login status
        let request_login = new tools.RequestLogin();
        await request_login.execute(context, {});
      }
      return input;
    }
  }
});
```

## Next Steps

Now that you understand the concept of tool hooks, let's explore the more powerful hook system in Eko to learn how to implement human-in-the-loop with LLMs:

- Eko [Architecture Overview](/docs/architecture)
- Learn how Eko infers workflows: [Hierarchical Planning](/docs/architecture/execution-model)
- Learn the complete [hook system](/docs/architecture/hook-system)