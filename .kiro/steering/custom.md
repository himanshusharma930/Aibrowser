---
title: Custom Tools
description: This guide introduces how to customize tools in Eko.
---

## What is a Custom Tool?

In the Eko framework, Tools are core components that implement different functionalities. Built-in Tools provide some basic functions, such as WebSearch Tool for web searching. However, real-world application scenarios vary, and different applications may need specific functionalities to meet their requirements. This is where custom Tools come in.

Custom Tools allow developers to design and implement their own function modules based on specific business logic or application needs, without relying on built-in tools. Through custom Tools, developers can extend the capabilities of the Eko framework and enhance its flexibility and adaptability.

## Why Custom Tools?

Custom Tools help developers solve the following problems:

- When existing Tools cannot meet specific needs, custom Tools can be created to implement them.
- Developers can customize input and output structures to adapt to application requirements based on business logic complexity.
- Modularize repeated functionality for easier management and debugging.
- Call internal company services and integrate specific business logic.

## How to Custom Tools in Eko?

Each Tool needs to implement the following core elements:

- `name`: Unique identifier for the Tool
- `description`: Functional description of the Tool  
- `input_schema`: Input parameter structure definition
- `execute`: Specific execution logic

To create custom Tools in Eko, you need to follow these steps:

1. **Define input and output structures**: Clearly specify the Tool's input parameters and output results.
2. **Implement Tool interface**: Inherit or implement the `Tool` interface and define related properties and methods.
3. **Handle parameters**: Write implementation logic for specific functionality in the `execute` method.

```typescript
interface Tool<T, R> {
  name: string; // tool name
  description: string; // A functional description explaining the tool's purpose and usage scenarios
  input_schema: InputSchema; // A functional description explaining the tool's purpose and usage scenarios
  execute: (context: ExecutionContext, params: T) => Promise<R>; // Execute function
  destroy?: (context: ExecutionContext) => void; // destroy
}

interface InputSchema {
  type: 'object';
  properties?: Properties;
  required?: Array<string>;
}

interface Properties {
  [key: string]: Property;
}

interface Property {
  type: 'string' | 'integer' | 'boolean' | 'array' | 'object';
  description?: string;
  items?: InputSchema;
  enum?: Array<string | number>;
  properties?: Properties;
}
```

### Creating a Custom Tool

Let's explain how to create a custom Tool through a simple example.

Suppose we want to create an email sending Tool:

```typescript
// Define input parameter type
interface SendEmailParams {
  to: string;
  subject: string; 
  content: string;
}

// Define return result type
interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Implement SendEmail Tool
class SendEmail implements Tool<SendEmailParams, SendEmailResult> {
  name: string;
  description: string;
  input_schema: InputSchema;

  constructor() {
    this.name = 'send_email';
    this.description = 'Send email to specified recipient';
    this.input_schema = {
      type: 'object',
      properties: {
        to: {
          type: 'string',
          description: 'Email address of the recipient',
        },
        subject: {
          type: 'string',
          description: 'Email subject',
        },
        content: {
          type: 'string',
          description: 'Email content',
        }
      },
      required: ['to', 'subject', 'content'],
    };
  }

  async execute(
    context: ExecutionContext,
    params: SendEmailParams
  ): Promise<SendEmailResult> {
    try {
      // Implement specific email sending logic
      // This is just an example
      const result = await emailService.send({
        to: params.to,
        subject: params.subject,
        content: params.content,
      });

      return {
        success: true,
        messageId: result.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Optional destroy method
  destroy(context: ExecutionContext) {
    // Clean up resources
  }
}
```

### Register and Use Custom Tool
```typescript
import { Eko } from "@eko-ai/eko";

let eko = new Eko("apiKey");

// Register the tool
eko.registerTool(new SendEmail());

// workflow
const workflow = await eko.generate(`
  Search for today's NASDAQ stock market data and generate a report to send via email to example@email.com
`);

// execute workflow
await eko.execute(workflow);
```
