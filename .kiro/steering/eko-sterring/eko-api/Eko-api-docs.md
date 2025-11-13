---
created: 2025-11-11T10:12:35 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/Agent.html
author: 
---

# Agent | EKO API

> ## Excerpt
> Documentation for EKO API

---
#### Hierarchy ([View Summary](https://fellou.ai/eko/docs/api/hierarchy.html#Agent), Expand)

-   Agent
    -   [BaseChatAgent](https://fellou.ai/eko/docs/api/classes/BaseChatAgent.html)
    -   [BaseFileAgent](https://fellou.ai/eko/docs/api/classes/BaseFileAgent.html)
    -   [BaseShellAgent](https://fellou.ai/eko/docs/api/classes/BaseShellAgent.html)
    -   [BaseTimerAgent](https://fellou.ai/eko/docs/api/classes/BaseTimerAgent.html)
    -   [BaseComputerAgent](https://fellou.ai/eko/docs/api/classes/BaseComputerAgent.html)
    -   [BaseBrowserAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html)

##### Index

### Constructors

### Accessors

### Methods

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/Agent.html#constructor)

## Accessors

### Description[](https://fellou.ai/eko/docs/api/classes/Agent.html#description)

-   get Description(): string
    
    #### Returns string
    

### McpClient[](https://fellou.ai/eko/docs/api/classes/Agent.html#mcpclient)

-   get McpClient(): undefined | IMcpClient
    
    #### Returns undefined | IMcpClient
    

### Name[](https://fellou.ai/eko/docs/api/classes/Agent.html#name)

-   get Name(): string
    
    #### Returns string
    

### PlanDescription[](https://fellou.ai/eko/docs/api/classes/Agent.html#plandescription)

-   get PlanDescription(): undefined | string
    
    #### Returns undefined | string
    

### Tools[](https://fellou.ai/eko/docs/api/classes/Agent.html#tools)

-   get Tools(): Tool\[\]
    
    #### Returns Tool\[\]
    

## Methods

### run[](https://fellou.ai/eko/docs/api/classes/Agent.html#run)

-   #### Returns Promise<string\>
    

### runWithContext[](https://fellou.ai/eko/docs/api/classes/Agent.html#runwithcontext)

-   runWithContext(  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
        mcpClient?: IMcpClient,  
        maxReactNum?: number,  
    ): Promise<string\>[](https://fellou.ai/eko/docs/api/classes/Agent.html#runwithcontext-1)
    
    #### Parameters
    
    -   agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)
    -   `Optional`mcpClient: IMcpClient
    -   maxReactNum: number = 100
    
    #### Returns Promise<string\>

---
created: 2025-11-11T10:14:12 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/AgentChain.html
author: 
---

# AgentChain | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html)

## Class AgentChain

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/AgentChain.html#constructor)

### Properties

[agent](https://fellou.ai/eko/docs/api/classes/AgentChain.html#agent) [agentRequest?](https://fellou.ai/eko/docs/api/classes/AgentChain.html#agentrequest) [agentResult?](https://fellou.ai/eko/docs/api/classes/AgentChain.html#agentresult) [onUpdate?](https://fellou.ai/eko/docs/api/classes/AgentChain.html#onupdate) [tools](https://fellou.ai/eko/docs/api/classes/AgentChain.html#tools)

### Methods

[push](https://fellou.ai/eko/docs/api/classes/AgentChain.html#push)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/AgentChain.html#constructor)

-   new AgentChain(agent: [WorkflowAgent](https://fellou.ai/eko/docs/api/types/WorkflowAgent.html)): [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html)[](https://fellou.ai/eko/docs/api/classes/AgentChain.html#constructoragentchain)
    
    #### Parameters
    
    -   agent: [WorkflowAgent](https://fellou.ai/eko/docs/api/types/WorkflowAgent.html)
    
    #### Returns [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html)
    

## Properties

### agent[](https://fellou.ai/eko/docs/api/classes/AgentChain.html#agent)

agent: [WorkflowAgent](https://fellou.ai/eko/docs/api/types/WorkflowAgent.html)

### `Optional`agentRequest[](https://fellou.ai/eko/docs/api/classes/AgentChain.html#agentrequest)

agentRequest?: [LLMRequest](https://fellou.ai/eko/docs/api/types/LLMRequest.html)

### `Optional`agentResult[](https://fellou.ai/eko/docs/api/classes/AgentChain.html#agentresult)

agentResult?: string

### `Optional`onUpdate[](https://fellou.ai/eko/docs/api/classes/AgentChain.html#onupdate)

onUpdate?: (event: ChainEvent) \=> void

### tools[](https://fellou.ai/eko/docs/api/classes/AgentChain.html#tools)

tools: ToolChain\[\] = \[\]

## Methods

### push[](https://fellou.ai/eko/docs/api/classes/AgentChain.html#push)

-   push(tool: ToolChain): void[](https://fellou.ai/eko/docs/api/classes/AgentChain.html#push-1)
    
    #### Parameters
    
    -   tool: ToolChain
    
    #### Returns void


---
created: 2025-11-11T10:14:24 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/AgentContext.html
author: 
---

# AgentContext | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)

## Class AgentContext

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/AgentContext.html#constructor)

### Properties

[agent](https://fellou.ai/eko/docs/api/classes/AgentContext.html#agent) [agentChain](https://fellou.ai/eko/docs/api/classes/AgentContext.html#agentchain) [consecutiveErrorNum](https://fellou.ai/eko/docs/api/classes/AgentContext.html#consecutiveerrornum) [context](https://fellou.ai/eko/docs/api/classes/AgentContext.html#context) [variables](https://fellou.ai/eko/docs/api/classes/AgentContext.html#variables)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/AgentContext.html#constructor)

-   new AgentContext(  
        context: [Context](https://fellou.ai/eko/docs/api/classes/Context.html),  
        agent: [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html),  
        agentChain: [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html),  
    ): [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)[](https://fellou.ai/eko/docs/api/classes/AgentContext.html#constructoragentcontext)
    
    #### Parameters
    
    -   context: [Context](https://fellou.ai/eko/docs/api/classes/Context.html)
    -   agent: [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)
    -   agentChain: [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html)
    
    #### Returns [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)
    

## Properties

### agent[](https://fellou.ai/eko/docs/api/classes/AgentContext.html#agent)

agent: [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)

### agentChain[](https://fellou.ai/eko/docs/api/classes/AgentContext.html#agentchain)

agentChain: [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html)

### consecutiveErrorNum[](https://fellou.ai/eko/docs/api/classes/AgentContext.html#consecutiveerrornum)

consecutiveErrorNum: number

### context[](https://fellou.ai/eko/docs/api/classes/AgentContext.html#context)

context: [Context](https://fellou.ai/eko/docs/api/classes/Context.html)

### variables[](https://fellou.ai/eko/docs/api/classes/AgentContext.html#variables)

variables: Map<string, any\>


---
created: 2025-11-11T10:14:36 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html
author: 
---

# BaseBrowserAgent | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [BaseBrowserAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html)

## Class BaseBrowserAgent`Abstract`

#### Hierarchy ([View Summary](https://fellou.ai/eko/docs/api/hierarchy.html#BaseBrowserAgent), Expand)

-   [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)
    -   BaseBrowserAgent
        -   [BaseBrowserLabelsAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html)
        -   [BaseBrowserScreenAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html)

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html#constructor)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html#constructor)

-   new BaseBrowserAgent(params: [AgentParams](https://fellou.ai/eko/docs/api/types/AgentParams.html)): [BaseBrowserAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html)[](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html#constructorbasebrowseragent)
    
    #### Parameters
    
    -   params: [AgentParams](https://fellou.ai/eko/docs/api/types/AgentParams.html)
    
    #### Returns [BaseBrowserAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html)
    

## Accessors

## Methods


---
created: 2025-11-11T10:14:46 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html
author: 
---

# BaseBrowserLabelsAgent | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [BaseBrowserLabelsAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html)

## Class BaseBrowserLabelsAgent`Abstract`

#### Hierarchy ([View Summary](https://fellou.ai/eko/docs/api/hierarchy.html#BaseBrowserLabelsAgent), Expand)

-   [BaseBrowserAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html)
    -   BaseBrowserLabelsAgent

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html#constructor)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html#constructor)

-   new BaseBrowserLabelsAgent(  
        llms?: string\[\],  
        ext\_tools?: Tool\[\],  
        mcpClient?: IMcpClient,  
    ): [BaseBrowserLabelsAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html)[](https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html#constructorbasebrowserlabelsagent)
    
    #### Parameters
    
    -   `Optional`llms: string\[\]
    -   `Optional`ext\_tools: Tool\[\]
    -   `Optional`mcpClient: IMcpClient
    
    #### Returns [BaseBrowserLabelsAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html)
    

## Accessors

## Methods


---
created: 2025-11-11T10:15:00 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html
author: 
---

# BaseBrowserScreenAgent | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [BaseBrowserScreenAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html)

## Class BaseBrowserScreenAgent`Abstract`

#### Hierarchy ([View Summary](https://fellou.ai/eko/docs/api/hierarchy.html#BaseBrowserScreenAgent), Expand)

-   [BaseBrowserAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html)
    -   BaseBrowserScreenAgent

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html#constructor)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html#constructor)

-   new BaseBrowserScreenAgent(  
        llms?: string\[\],  
        ext\_tools?: Tool\[\],  
        mcpClient?: IMcpClient,  
    ): [BaseBrowserScreenAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html)[](https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html#constructorbasebrowserscreenagent)
    
    #### Parameters
    
    -   `Optional`llms: string\[\]
    -   `Optional`ext\_tools: Tool\[\]
    -   `Optional`mcpClient: IMcpClient
    
    #### Returns [BaseBrowserScreenAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html)
    

## Accessors

## Methods

---
created: 2025-11-11T10:15:09 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/BaseChatAgent.html
author: 
---

# BaseChatAgent | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [BaseChatAgent](https://fellou.ai/eko/docs/api/classes/BaseChatAgent.html)

## Class BaseChatAgent`Abstract`

#### Hierarchy ([View Summary](https://fellou.ai/eko/docs/api/hierarchy.html#BaseChatAgent), Expand)

-   [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)
    -   BaseChatAgent

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/BaseChatAgent.html#constructor)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/BaseChatAgent.html#constructor)

-   new BaseChatAgent(  
        llms?: string\[\],  
        ext\_tools?: Tool\[\],  
        mcpClient?: IMcpClient,  
    ): [BaseChatAgent](https://fellou.ai/eko/docs/api/classes/BaseChatAgent.html)[](https://fellou.ai/eko/docs/api/classes/BaseChatAgent.html#constructorbasechatagent)
    
    #### Parameters
    
    -   `Optional`llms: string\[\]
    -   `Optional`ext\_tools: Tool\[\]
    -   `Optional`mcpClient: IMcpClient
    
    #### Returns [BaseChatAgent](https://fellou.ai/eko/docs/api/classes/BaseChatAgent.html)
    

## Accessors

## Methods

---
created: 2025-11-11T10:15:19 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/BaseComputerAgent.html
author: 
---

# BaseComputerAgent | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [BaseComputerAgent](https://fellou.ai/eko/docs/api/classes/BaseComputerAgent.html)

## Class BaseComputerAgent`Abstract`

#### Hierarchy ([View Summary](https://fellou.ai/eko/docs/api/hierarchy.html#BaseComputerAgent), Expand)

-   [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)
    -   BaseComputerAgent

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/BaseComputerAgent.html#constructor)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/BaseComputerAgent.html#constructor)

-   new BaseComputerAgent(  
        llms?: string\[\],  
        ext\_tools?: Tool\[\],  
        mcpClient?: IMcpClient,  
        keyboardKeys?: string\[\],  
    ): [BaseComputerAgent](https://fellou.ai/eko/docs/api/classes/BaseComputerAgent.html)[](https://fellou.ai/eko/docs/api/classes/BaseComputerAgent.html#constructorbasecomputeragent)
    
    #### Parameters
    
    -   `Optional`llms: string\[\]
    -   `Optional`ext\_tools: Tool\[\]
    -   `Optional`mcpClient: IMcpClient
    -   `Optional`keyboardKeys: string\[\]
    
    #### Returns [BaseComputerAgent](https://fellou.ai/eko/docs/api/classes/BaseComputerAgent.html)
    

## Accessors

## Methods

---
created: 2025-11-11T10:15:27 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/BaseFileAgent.html
author: 
---

# BaseFileAgent | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [BaseFileAgent](https://fellou.ai/eko/docs/api/classes/BaseFileAgent.html)

## Class BaseFileAgent`Abstract`

#### Hierarchy ([View Summary](https://fellou.ai/eko/docs/api/hierarchy.html#BaseFileAgent), Expand)

-   [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)
    -   BaseFileAgent

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/BaseFileAgent.html#constructor)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/BaseFileAgent.html#constructor)

-   new BaseFileAgent(  
        work\_path?: string,  
        llms?: string\[\],  
        ext\_tools?: Tool\[\],  
        mcpClient?: IMcpClient,  
        planDescription?: string,  
    ): [BaseFileAgent](https://fellou.ai/eko/docs/api/classes/BaseFileAgent.html)[](https://fellou.ai/eko/docs/api/classes/BaseFileAgent.html#constructorbasefileagent)
    
    #### Parameters
    
    -   `Optional`work\_path: string
    -   `Optional`llms: string\[\]
    -   `Optional`ext\_tools: Tool\[\]
    -   `Optional`mcpClient: IMcpClient
    -   `Optional`planDescription: string
    
    #### Returns [BaseFileAgent](https://fellou.ai/eko/docs/api/classes/BaseFileAgent.html)
    

## Accessors

## Methods

---
created: 2025-11-11T10:15:38 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/BaseShellAgent.html
author: 
---

# BaseShellAgent | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [BaseShellAgent](https://fellou.ai/eko/docs/api/classes/BaseShellAgent.html)

## Class BaseShellAgent`Abstract`

#### Hierarchy ([View Summary](https://fellou.ai/eko/docs/api/hierarchy.html#BaseShellAgent), Expand)

-   [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)
    -   BaseShellAgent

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/BaseShellAgent.html#constructor)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/BaseShellAgent.html#constructor)

-   new BaseShellAgent(  
        llms?: string\[\],  
        ext\_tools?: Tool\[\],  
        mcpClient?: IMcpClient,  
        planDescription?: string,  
    ): [BaseShellAgent](https://fellou.ai/eko/docs/api/classes/BaseShellAgent.html)[](https://fellou.ai/eko/docs/api/classes/BaseShellAgent.html#constructorbaseshellagent)
    
    #### Parameters
    
    -   `Optional`llms: string\[\]
    -   `Optional`ext\_tools: Tool\[\]
    -   `Optional`mcpClient: IMcpClient
    -   `Optional`planDescription: string
    
    #### Returns [BaseShellAgent](https://fellou.ai/eko/docs/api/classes/BaseShellAgent.html)
    

## Accessors

## Methods

---
created: 2025-11-11T10:15:48 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/BaseTimerAgent.html
author: 
---

# BaseTimerAgent | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [BaseTimerAgent](https://fellou.ai/eko/docs/api/classes/BaseTimerAgent.html)

## Class BaseTimerAgent`Abstract`

#### Hierarchy ([View Summary](https://fellou.ai/eko/docs/api/hierarchy.html#BaseTimerAgent), Expand)

-   [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)
    -   BaseTimerAgent

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/BaseTimerAgent.html#constructor)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/BaseTimerAgent.html#constructor)

-   new BaseTimerAgent(params: [AgentParams](https://fellou.ai/eko/docs/api/types/AgentParams.html)): [BaseTimerAgent](https://fellou.ai/eko/docs/api/classes/BaseTimerAgent.html)[](https://fellou.ai/eko/docs/api/classes/BaseTimerAgent.html#constructorbasetimeragent)
    
    #### Parameters
    
    -   params: [AgentParams](https://fellou.ai/eko/docs/api/types/AgentParams.html)
    
    #### Returns [BaseTimerAgent](https://fellou.ai/eko/docs/api/classes/BaseTimerAgent.html)
    

## Accessors

## Methods

---
created: 2025-11-11T10:16:00 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/Chain.html
author: 
---

# Chain | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [Chain](https://fellou.ai/eko/docs/api/classes/Chain.html)

## Class Chain

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/Chain.html#constructor)

### Properties

[agents](https://fellou.ai/eko/docs/api/classes/Chain.html#agents) [planRequest?](https://fellou.ai/eko/docs/api/classes/Chain.html#planrequest) [planResult?](https://fellou.ai/eko/docs/api/classes/Chain.html#planresult) [taskPrompt](https://fellou.ai/eko/docs/api/classes/Chain.html#taskprompt)

### Methods

[addListener](https://fellou.ai/eko/docs/api/classes/Chain.html#addlistener) [push](https://fellou.ai/eko/docs/api/classes/Chain.html#push) [removeListener](https://fellou.ai/eko/docs/api/classes/Chain.html#removelistener)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/Chain.html#constructor)

-   new Chain(taskPrompt: string): [Chain](https://fellou.ai/eko/docs/api/classes/Chain.html)[](https://fellou.ai/eko/docs/api/classes/Chain.html#constructorchain)
    
    #### Parameters
    
    -   taskPrompt: string
    
    #### Returns [Chain](https://fellou.ai/eko/docs/api/classes/Chain.html)
    

## Properties

### agents[](https://fellou.ai/eko/docs/api/classes/Chain.html#agents)

agents: [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html)\[\] = \[\]

### `Optional`planRequest[](https://fellou.ai/eko/docs/api/classes/Chain.html#planrequest)

planRequest?: [LLMRequest](https://fellou.ai/eko/docs/api/types/LLMRequest.html)

### `Optional`planResult[](https://fellou.ai/eko/docs/api/classes/Chain.html#planresult)

planResult?: string

### taskPrompt[](https://fellou.ai/eko/docs/api/classes/Chain.html#taskprompt)

taskPrompt: string

## Methods

### addListener[](https://fellou.ai/eko/docs/api/classes/Chain.html#addlistener)

-   addListener(callback: Callback): void[](https://fellou.ai/eko/docs/api/classes/Chain.html#addlistener-1)
    
    #### Parameters
    
    -   callback: Callback
    
    #### Returns void
    

### push[](https://fellou.ai/eko/docs/api/classes/Chain.html#push)

-   push(agent: [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html)): void[](https://fellou.ai/eko/docs/api/classes/Chain.html#push-1)
    
    #### Parameters
    
    -   agent: [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html)
    
    #### Returns void
    

### removeListener[](https://fellou.ai/eko/docs/api/classes/Chain.html#removelistener)

-   removeListener(callback: Callback): void[](https://fellou.ai/eko/docs/api/classes/Chain.html#removelistener-1)
    
    #### Parameters
    
    -   callback: Callback
    
    #### Returns void

---
created: 2025-11-11T10:16:07 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/Context.html
author: 
---

# Context | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [Context](https://fellou.ai/eko/docs/api/classes/Context.html)

## Class Context

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/Context.html#constructor)

### Properties

[agents](https://fellou.ai/eko/docs/api/classes/Context.html#agents) [chain](https://fellou.ai/eko/docs/api/classes/Context.html#chain) [config](https://fellou.ai/eko/docs/api/classes/Context.html#config) [controller](https://fellou.ai/eko/docs/api/classes/Context.html#controller) [taskId](https://fellou.ai/eko/docs/api/classes/Context.html#taskid) [variables](https://fellou.ai/eko/docs/api/classes/Context.html#variables) [workflow?](https://fellou.ai/eko/docs/api/classes/Context.html#workflow)

### Methods

[checkAborted](https://fellou.ai/eko/docs/api/classes/Context.html#checkaborted)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/Context.html#constructor)

-   new Context(  
        taskId: string,  
        config: [EkoConfig](https://fellou.ai/eko/docs/api/types/EkoConfig.html),  
        agents: [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)\[\],  
        chain: [Chain](https://fellou.ai/eko/docs/api/classes/Chain.html),  
    ): [Context](https://fellou.ai/eko/docs/api/classes/Context.html)[](https://fellou.ai/eko/docs/api/classes/Context.html#constructorcontext)
    
    #### Parameters
    
    -   taskId: string
    -   config: [EkoConfig](https://fellou.ai/eko/docs/api/types/EkoConfig.html)
    -   agents: [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)\[\]
    -   chain: [Chain](https://fellou.ai/eko/docs/api/classes/Chain.html)
    
    #### Returns [Context](https://fellou.ai/eko/docs/api/classes/Context.html)
    

## Properties

### agents[](https://fellou.ai/eko/docs/api/classes/Context.html#agents)

agents: [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)\[\]

### chain[](https://fellou.ai/eko/docs/api/classes/Context.html#chain)

chain: [Chain](https://fellou.ai/eko/docs/api/classes/Chain.html)

### config[](https://fellou.ai/eko/docs/api/classes/Context.html#config)

config: [EkoConfig](https://fellou.ai/eko/docs/api/types/EkoConfig.html)

### controller[](https://fellou.ai/eko/docs/api/classes/Context.html#controller)

controller: AbortController

### taskId[](https://fellou.ai/eko/docs/api/classes/Context.html#taskid)

taskId: string

### variables[](https://fellou.ai/eko/docs/api/classes/Context.html#variables)

variables: Map<string, any\>

### `Optional`workflow[](https://fellou.ai/eko/docs/api/classes/Context.html#workflow)

workflow?: [Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html)

## Methods

### checkAborted[](https://fellou.ai/eko/docs/api/classes/Context.html#checkaborted)

-   checkAborted(): void[](https://fellou.ai/eko/docs/api/classes/Context.html#checkaborted-1)
    
    #### Returns void

---
created: 2025-11-11T10:16:18 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/Eko.html
author: 
---

# Eko | EKO API

> ## Excerpt
> Documentation for EKO API

---
##### Index

### Constructors

### Methods

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/Eko.html#constructor)

## Methods

### abortTask[](https://fellou.ai/eko/docs/api/classes/Eko.html#aborttask)

-   abortTask(taskId: string): boolean[](https://fellou.ai/eko/docs/api/classes/Eko.html#aborttask-1)
    
    #### Returns boolean
    

### addAgent[](https://fellou.ai/eko/docs/api/classes/Eko.html#addagent)

-   addAgent(agent: [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)): void[](https://fellou.ai/eko/docs/api/classes/Eko.html#addagent-1)
    
    #### Returns void
    

### deleteTask[](https://fellou.ai/eko/docs/api/classes/Eko.html#deletetask)

-   deleteTask(taskId: string): boolean[](https://fellou.ai/eko/docs/api/classes/Eko.html#deletetask-1)
    
    #### Returns boolean
    

### execute[](https://fellou.ai/eko/docs/api/classes/Eko.html#execute)

-   execute(taskId: string): Promise<EkoResult\>[](https://fellou.ai/eko/docs/api/classes/Eko.html#execute-1)
    
    #### Returns Promise<EkoResult\>
    

### generate[](https://fellou.ai/eko/docs/api/classes/Eko.html#generate)

-   generate(  
        taskPrompt: string,  
        taskId?: string,  
        contextParams?: Record<string, any\>,  
    ): Promise<[Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html)\>[](https://fellou.ai/eko/docs/api/classes/Eko.html#generate-1)
    
    #### Parameters
    
    -   taskPrompt: string
    -   taskId: string = ...
    -   `Optional`contextParams: Record<string, any\>
    
    #### Returns Promise<[Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html)\>
    

### getAllTaskId[](https://fellou.ai/eko/docs/api/classes/Eko.html#getalltaskid)

-   getAllTaskId(): string\[\][](https://fellou.ai/eko/docs/api/classes/Eko.html#getalltaskid-1)
    
    #### Returns string\[\]
    

### getTask[](https://fellou.ai/eko/docs/api/classes/Eko.html#gettask)

-   getTask(taskId: string): undefined | [Context](https://fellou.ai/eko/docs/api/classes/Context.html)[](https://fellou.ai/eko/docs/api/classes/Eko.html#gettask-1)
    

### initContext[](https://fellou.ai/eko/docs/api/classes/Eko.html#initcontext)

-   initContext(  
        workflow: [Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html),  
        contextParams?: Record<string, any\>,  
    ): Promise<[Context](https://fellou.ai/eko/docs/api/classes/Context.html)\>[](https://fellou.ai/eko/docs/api/classes/Eko.html#initcontext-1)
    
    #### Parameters
    
    -   workflow: [Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html)
    -   `Optional`contextParams: Record<string, any\>
    
    #### Returns Promise<[Context](https://fellou.ai/eko/docs/api/classes/Context.html)\>
    

### modify[](https://fellou.ai/eko/docs/api/classes/Eko.html#modify)

-   modify(taskId: string, modifyTaskPrompt: string): Promise<[Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html)\>[](https://fellou.ai/eko/docs/api/classes/Eko.html#modify-1)
    
    #### Parameters
    
    -   taskId: string
    -   modifyTaskPrompt: string
    
    #### Returns Promise<[Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html)\>
    

### run[](https://fellou.ai/eko/docs/api/classes/Eko.html#run)

-   run(  
        taskPrompt: string,  
        taskId?: string,  
        contextParams?: Record<string, any\>,  
    ): Promise<EkoResult\>[](https://fellou.ai/eko/docs/api/classes/Eko.html#run-1)
    
    #### Parameters
    
    -   taskPrompt: string
    -   taskId: string = ...
    -   `Optional`contextParams: Record<string, any\>
    
    #### Returns Promise<EkoResult\>

---
created: 2025-11-11T10:16:25 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html
author: 
---

# ForeachTaskTool | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [ForeachTaskTool](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html)

#### Implements

-   Tool

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#constructor)

### Properties

[description](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#description) [name](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#name) [parameters](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#parameters)

### Methods

[execute](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#execute)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#constructor)

-   new ForeachTaskTool(): [ForeachTaskTool](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html)[](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#constructorforeachtasktool)
    
    #### Returns [ForeachTaskTool](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html)
    

## Properties

### `Readonly`description[](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#description)

description: string

### `Readonly`name[](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#name)

name: string = TOOL\_NAME

### `Readonly`parameters[](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#parameters)

parameters: JSONSchema7

## Methods

### execute[](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#execute)

-   execute(  
        args: Record<string, unknown\>,  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
    ): Promise<ToolResult\>[](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html#execute-1)
    
    #### Parameters
    
    -   args: Record<string, unknown\>
    -   agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)
    
    #### Returns Promise<ToolResult\>


---
created: 2025-11-11T10:16:33 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html
author: 
---

# HumanInteractTool | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [HumanInteractTool](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html)

#### Implements

-   Tool

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#constructor)

### Properties

[description](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#description) [name](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#name) [noPlan](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#noplan) [parameters](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#parameters)

### Methods

[execute](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#execute)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#constructor)

-   new HumanInteractTool(): [HumanInteractTool](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html)[](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#constructorhumaninteracttool)
    
    #### Returns [HumanInteractTool](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html)
    

## Properties

### `Readonly`description[](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#description)

description: string

### `Readonly`name[](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#name)

name: string = TOOL\_NAME

### `Readonly`noPlan[](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#noplan)

noPlan: boolean = true

### `Readonly`parameters[](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#parameters)

parameters: JSONSchema7

## Methods

### execute[](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#execute)

-   execute(  
        args: Record<string, unknown\>,  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
    ): Promise<ToolResult\>[](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html#execute-1)
    
    #### Parameters
    
    -   args: Record<string, unknown\>
    -   agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)
    
    #### Returns Promise<ToolResult\>

---
created: 2025-11-11T10:16:41 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html
author: 
---

# RetryLanguageModel | EKO API

> ## Excerpt
> Documentation for EKO API

---
##### Index

### Constructors

### Methods

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#constructor)

-   new RetryLanguageModel(  
        llms: [LLMs](https://fellou.ai/eko/docs/api/types/LLMs.html),  
        names?: string\[\],  
        stream\_first\_timeout?: number,  
    ): [RetryLanguageModel](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html)[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#constructorretrylanguagemodel)
    

## Methods

### call[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#call)

-   call(request: [LLMRequest](https://fellou.ai/eko/docs/api/types/LLMRequest.html)): Promise<GenerateResult\>[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#call-1)
    
    #### Returns Promise<GenerateResult\>
    

### callStream[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#callstream)

-   callStream(request: [LLMRequest](https://fellou.ai/eko/docs/api/types/LLMRequest.html)): Promise<StreamResult\>[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#callstream-1)
    
    #### Returns Promise<StreamResult\>
    

### doGenerate[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#dogenerate)

-   doGenerate(options: LanguageModelV1CallOptions): Promise<GenerateResult\>[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#dogenerate-1)
    
    #### Parameters
    
    -   options: LanguageModelV1CallOptions
    
    #### Returns Promise<GenerateResult\>
    

### doStream[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#dostream)

-   doStream(options: LanguageModelV1CallOptions): Promise<StreamResult\>[](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html#dostream-1)
    
    #### Parameters
    
    -   options: LanguageModelV1CallOptions
    
    #### Returns Promise<StreamResult\>

---
created: 2025-11-11T10:16:48 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html
author: 
---

# SimpleSseMcpClient | EKO API

> ## Excerpt
> Documentation for EKO API

---
#### Implements

-   IMcpClient

##### Index

### Constructors

### Methods

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#constructor)

-   new SimpleSseMcpClient(  
        sseServerUrl: string,  
        clientName?: string,  
    ): [SimpleSseMcpClient](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html)[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#constructorsimplessemcpclient)
    
    #### Parameters
    
    -   sseServerUrl: string
    -   clientName: string = "EkoMcpClient"
    
    #### Returns [SimpleSseMcpClient](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html)
    

## Methods

### callTool[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#calltool)

-   callTool(param: McpCallToolParam): Promise<ToolResult\>[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#calltool-1)
    
    #### Parameters
    
    -   param: McpCallToolParam
    
    #### Returns Promise<ToolResult\>
    

### close[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#close)

-   close(): Promise<void\>[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#close-1)
    
    #### Returns Promise<void\>
    

### connect[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#connect)

-   connect(): Promise<void\>[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#connect-1)
    
    #### Returns Promise<void\>
    

### isConnected[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#isconnected)

-   isConnected(): boolean[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#isconnected-1)
    
    #### Returns boolean
    

### listTools[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#listtools)

-   listTools(param: McpListToolParam): Promise<McpListToolResult\>[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#listtools-1)
    
    #### Parameters
    
    -   param: McpListToolParam
    
    #### Returns Promise<McpListToolResult\>
    

### onmessage[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#onmessage)

-   onmessage(data: SseEventData): void[](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html#onmessage-1)
    
    #### Parameters
    
    -   data: SseEventData
    
    #### Returns void

---
created: 2025-11-11T10:16:56 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html
author: 
---

# TaskNodeStatusTool | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [TaskNodeStatusTool](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html)

#### Implements

-   Tool

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#constructor)

### Properties

[description](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#description) [name](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#name) [parameters](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#parameters)

### Methods

[execute](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#execute)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#constructor)

-   new TaskNodeStatusTool(): [TaskNodeStatusTool](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html)[](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#constructortasknodestatustool)
    
    #### Returns [TaskNodeStatusTool](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html)
    

## Properties

### `Readonly`description[](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#description)

description: string

### `Readonly`name[](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#name)

name: string = TOOL\_NAME

### `Readonly`parameters[](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#parameters)

parameters: JSONSchema7

## Methods

### execute[](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#execute)

-   execute(  
        args: Record<string, unknown\>,  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
    ): Promise<ToolResult\>[](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html#execute-1)
    
    #### Parameters
    
    -   args: Record<string, unknown\>
    -   agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)
    
    #### Returns Promise<ToolResult\>

---
created: 2025-11-11T10:17:04 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html
author: 
---

# VariableStorageTool | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [VariableStorageTool](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html)

#### Implements

-   Tool

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#constructor)

### Properties

[description](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#description) [name](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#name) [parameters](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#parameters)

### Methods

[execute](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#execute)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#constructor)

-   new VariableStorageTool(): [VariableStorageTool](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html)[](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#constructorvariablestoragetool)
    
    #### Returns [VariableStorageTool](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html)
    

## Properties

### `Readonly`description[](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#description)

description: string

### `Readonly`name[](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#name)

name: string = TOOL\_NAME

### `Readonly`parameters[](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#parameters)

parameters: JSONSchema7

## Methods

### execute[](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#execute)

-   execute(  
        args: Record<string, unknown\>,  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
    ): Promise<ToolResult\>[](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html#execute-1)
    
    #### Parameters
    
    -   args: Record<string, unknown\>
    -   agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)
    
    #### Returns Promise<ToolResult\>

---
created: 2025-11-11T10:17:13 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html
author: 
---

# WatchTriggerTool | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [WatchTriggerTool](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html)

#### Implements

-   Tool

##### Index

### Constructors

[constructor](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#constructor)

### Properties

[description](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#description) [name](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#name) [parameters](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#parameters)

### Methods

[execute](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#execute)

## Constructors

### constructor[](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#constructor)

-   new WatchTriggerTool(): [WatchTriggerTool](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html)[](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#constructorwatchtriggertool)
    
    #### Returns [WatchTriggerTool](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html)
    

## Properties

### `Readonly`description[](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#description)

description: string

### `Readonly`name[](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#name)

name: string = TOOL\_NAME

### `Readonly`parameters[](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#parameters)

parameters: JSONSchema7

## Methods

### execute[](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#execute)

-   execute(  
        args: Record<string, unknown\>,  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
    ): Promise<ToolResult\>[](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html#execute-1)
    
    #### Parameters
    
    -   args: Record<string, unknown\>
    -   agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)
    
    #### Returns Promise<ToolResult\>


---
created: 2025-11-11T10:17:25 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html
author: 
---

# HumanCallback | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [HumanCallback](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html)

## Interface HumanCallback

interface HumanCallback {  
    [onHumanConfirm](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html#onhumanconfirm)?: (  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
        prompt: string,  
    ) \=> Promise<boolean\>;  
    [onHumanHelp](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html#onhumanhelp)?: (  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
        helpType: "request\_login" | "request\_assistance",  
        prompt: string,  
    ) \=> Promise<boolean\>;  
    [onHumanInput](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html#onhumaninput)?: (  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
        prompt: string,  
    ) \=> Promise<string\>;  
    [onHumanSelect](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html#onhumanselect)?: (  
        agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
        prompt: string,  
        options: string\[\],  
        multiple?: boolean,  
    ) \=> Promise<string\[\]\>;  
}

##### Index

### Properties

## Properties

### `Optional`onHumanConfirm[](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html#onhumanconfirm)

onHumanConfirm?: (  
    agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
    prompt: string,  
) \=> Promise<boolean\>

### `Optional`onHumanHelp[](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html#onhumanhelp)

onHumanHelp?: (  
    agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
    helpType: "request\_login" | "request\_assistance",  
    prompt: string,  
) \=> Promise<boolean\>

### `Optional`onHumanInput[](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html#onhumaninput)

onHumanInput?: (agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html), prompt: string) \=> Promise<string\>

### `Optional`onHumanSelect[](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html#onhumanselect)

onHumanSelect?: (  
    agentContext: [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html),  
    prompt: string,  
    options: string\[\],  
    multiple?: boolean,  
) \=> Promise<string\[\]\>


---
created: 2025-11-11T10:17:33 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/interfaces/StreamCallback.html
author: 
---

# StreamCallback | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [StreamCallback](https://fellou.ai/eko/docs/api/interfaces/StreamCallback.html)

## Interface StreamCallback

interface StreamCallback {  
    [onMessage](https://fellou.ai/eko/docs/api/interfaces/StreamCallback.html#onmessage): (message: [StreamCallbackMessage](https://fellou.ai/eko/docs/api/types/StreamCallbackMessage.html)) \=> Promise<void\>;  
}

##### Index

### Properties

[onMessage](https://fellou.ai/eko/docs/api/interfaces/StreamCallback.html#onmessage)

## Properties

### onMessage[](https://fellou.ai/eko/docs/api/interfaces/StreamCallback.html#onmessage)

onMessage: (message: [StreamCallbackMessage](https://fellou.ai/eko/docs/api/types/StreamCallbackMessage.html)) \=> Promise<void\>

---
created: 2025-11-11T10:17:42 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/types/AgentParams.html
author: 
---

# AgentParams | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [AgentParams](https://fellou.ai/eko/docs/api/types/AgentParams.html)

## Type Alias AgentParams

AgentParams: {  
    description: string;  
    llms?: string\[\];  
    mcpClient?: IMcpClient;  
    name: string;  
    planDescription?: string;  
    tools: Tool\[\];  
}

#### Type declaration

-   ##### description: string
    
-   ##### `Optional`llms?: string\[\]
    
-   ##### `Optional`mcpClient?: IMcpClient
    
-   ##### name: string
    
-   ##### `Optional`planDescription?: string
    
-   ##### tools: Tool\[\]

---
created: 2025-11-11T10:17:57 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/types/EkoConfig.html
author: 
---

# EkoConfig | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [EkoConfig](https://fellou.ai/eko/docs/api/types/EkoConfig.html)

## Type Alias EkoConfig

EkoConfig: {  
    a2aClient?: IA2aClient;  
    agents?: [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)\[\];  
    callback?: [StreamCallback](https://fellou.ai/eko/docs/api/interfaces/StreamCallback.html) & [HumanCallback](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html);  
    defaultMcpClient?: IMcpClient;  
    llms: [LLMs](https://fellou.ai/eko/docs/api/types/LLMs.html);  
    planLlms?: string\[\];  
}

#### Type declaration

-   ##### `Optional`a2aClient?: IA2aClient
    
-   ##### `Optional`agents?: [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)\[\]
    
-   ##### `Optional`callback?: [StreamCallback](https://fellou.ai/eko/docs/api/interfaces/StreamCallback.html) & [HumanCallback](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html)
    
-   ##### `Optional`defaultMcpClient?: IMcpClient
    
-   ##### llms: [LLMs](https://fellou.ai/eko/docs/api/types/LLMs.html)
    
-   ##### `Optional`planLlms?: string\[\]


---
created: 2025-11-11T10:18:06 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/types/LLMRequest.html
author: 
---

# LLMRequest | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [LLMRequest](https://fellou.ai/eko/docs/api/types/LLMRequest.html)

## Type Alias LLMRequest

LLMRequest: {  
    abortSignal?: AbortSignal;  
    maxTokens?: number;  
    messages: LanguageModelV1Prompt;  
    temperature?: number;  
    toolChoice?: LanguageModelV1ToolChoice;  
    tools?: LanguageModelV1FunctionTool\[\];  
    topK?: number;  
    topP?: number;  
}

#### Type declaration

-   ##### `Optional`abortSignal?: AbortSignal
    
-   ##### `Optional`maxTokens?: number
    
-   ##### messages: LanguageModelV1Prompt
    
-   ##### `Optional`temperature?: number
    
-   ##### `Optional`toolChoice?: LanguageModelV1ToolChoice
    
-   ##### `Optional`tools?: LanguageModelV1FunctionTool\[\]
    
-   ##### `Optional`topK?: number
    
-   ##### `Optional`topP?: number


---
created: 2025-11-11T10:18:16 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/types/LLMs.html
author: 
---

# LLMs | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [LLMs](https://fellou.ai/eko/docs/api/types/LLMs.html)

## Type Alias LLMs

LLMs: { default: LLMConfig; \[key: string\]: LLMConfig }

#### Type declaration

-   ##### \[key: string\]: LLMConfig
    
-   ##### default: LLMConfig


---
created: 2025-11-11T10:18:28 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/types/StreamCallbackMessage.html
author: 
---

# StreamCallbackMessage | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [StreamCallbackMessage](https://fellou.ai/eko/docs/api/types/StreamCallbackMessage.html)

## Type Alias StreamCallbackMessage

StreamCallbackMessage: {  
    agentName: string;  
    nodeId?: string | null;  
    taskId: string;  
} & (  
    | { streamDone: boolean; type: "workflow"; workflow: [Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html) }  
    | {  
        streamDone: boolean;  
        streamId: string;  
        text: string;  
        type: "text" | "thinking";  
    }  
    | { data: string; mimeType: string; type: "file" }  
    | {  
        paramsText: string;  
        toolId: string;  
        toolName: string;  
        type: "tool\_streaming";  
    }  
    | {  
        params: Record<string, any\>;  
        toolId: string;  
        toolName: string;  
        type: "tool\_use";  
    }  
    | {  
        streamDone: boolean;  
        streamId: string;  
        text: string;  
        toolId: string;  
        toolName: string;  
        type: "tool\_running";  
    }  
    | {  
        params: Record<string, any\>;  
        toolId: string;  
        toolName: string;  
        toolResult: ToolResult;  
        type: "tool\_result";  
    }  
    | { error: unknown; type: "error" }  
    | {  
        finishReason: LanguageModelV1FinishReason;  
        type: "finish";  
        usage: { completionTokens: number; promptTokens: number };  
    }  
)


---
created: 2025-11-11T10:18:38 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/types/Workflow.html
author: 
---

# Workflow | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html)

## Type Alias Workflow

Workflow: {  
    agents: [WorkflowAgent](https://fellou.ai/eko/docs/api/types/WorkflowAgent.html)\[\];  
    name: string;  
    taskId: string;  
    taskPrompt?: string;  
    thought: string;  
    xml: string;  
}

#### Type declaration

-   ##### agents: [WorkflowAgent](https://fellou.ai/eko/docs/api/types/WorkflowAgent.html)\[\]
    
-   ##### name: string
    
-   ##### taskId: string
    
-   ##### `Optional`taskPrompt?: string
    
-   ##### thought: string
    
-   ##### xml: string


---
created: 2025-11-11T10:18:49 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/types/WorkflowAgent.html
author: 
---

# WorkflowAgent | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [WorkflowAgent](https://fellou.ai/eko/docs/api/types/WorkflowAgent.html)

## Type Alias WorkflowAgent

WorkflowAgent: {  
    id: string;  
    name: string;  
    nodes: [WorkflowNode](https://fellou.ai/eko/docs/api/types/WorkflowNode.html)\[\];  
    task: string;  
    xml: string;  
}

#### Type declaration

-   ##### id: string
    
-   ##### name: string
    
-   ##### nodes: [WorkflowNode](https://fellou.ai/eko/docs/api/types/WorkflowNode.html)\[\]
    
-   ##### task: string
    
-   ##### xml: string


---
created: 2025-11-11T10:19:03 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/types/WorkflowNode.html
author: 
---

# WorkflowNode | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [WorkflowNode](https://fellou.ai/eko/docs/api/types/WorkflowNode.html)

## Type Alias WorkflowNode

WorkflowNode: WorkflowTextNode | WorkflowForEachNode | WorkflowWatchNode


---
created: 2025-11-11T10:19:14 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/variables/config.html
author: 
---

# config | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [config](https://fellou.ai/eko/docs/api/variables/config.html)

## Variable config`Const`

config: GlobalConfig = ...


---
created: 2025-11-11T10:19:26 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/variables/Log.html
author: 
---

# Log | EKO API

> ## Excerpt
> Documentation for EKO API

---
### Settings

Member Visibility

-   Inherited

Theme

[EKO API](https://fellou.ai/eko/docs/api/modules.html)

-   [Agent](https://fellou.ai/eko/docs/api/classes/Agent.html)
-   [AgentChain](https://fellou.ai/eko/docs/api/classes/AgentChain.html)
-   [AgentContext](https://fellou.ai/eko/docs/api/classes/AgentContext.html)
-   [BaseBrowserAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html)
-   [BaseBrowserLabelsAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html)
-   [BaseBrowserScreenAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html)
-   [BaseChatAgent](https://fellou.ai/eko/docs/api/classes/BaseChatAgent.html)
-   [BaseComputerAgent](https://fellou.ai/eko/docs/api/classes/BaseComputerAgent.html)
-   [BaseFileAgent](https://fellou.ai/eko/docs/api/classes/BaseFileAgent.html)
-   [BaseShellAgent](https://fellou.ai/eko/docs/api/classes/BaseShellAgent.html)
-   [BaseTimerAgent](https://fellou.ai/eko/docs/api/classes/BaseTimerAgent.html)
-   [Chain](https://fellou.ai/eko/docs/api/classes/Chain.html)
-   [Context](https://fellou.ai/eko/docs/api/classes/Context.html)
-   [Eko](https://fellou.ai/eko/docs/api/classes/Eko.html)
-   [ForeachTaskTool](https://fellou.ai/eko/docs/api/classes/ForeachTaskTool.html)
-   [HumanInteractTool](https://fellou.ai/eko/docs/api/classes/HumanInteractTool.html)
-   [RetryLanguageModel](https://fellou.ai/eko/docs/api/classes/RetryLanguageModel.html)
-   [SimpleSseMcpClient](https://fellou.ai/eko/docs/api/classes/SimpleSseMcpClient.html)
-   [TaskNodeStatusTool](https://fellou.ai/eko/docs/api/classes/TaskNodeStatusTool.html)
-   [VariableStorageTool](https://fellou.ai/eko/docs/api/classes/VariableStorageTool.html)
-   [WatchTriggerTool](https://fellou.ai/eko/docs/api/classes/WatchTriggerTool.html)
-   [HumanCallback](https://fellou.ai/eko/docs/api/interfaces/HumanCallback.html)
-   [StreamCallback](https://fellou.ai/eko/docs/api/interfaces/StreamCallback.html)
-   [AgentParams](https://fellou.ai/eko/docs/api/types/AgentParams.html)
-   [EkoConfig](https://fellou.ai/eko/docs/api/types/EkoConfig.html)
-   [LLMRequest](https://fellou.ai/eko/docs/api/types/LLMRequest.html)
-   [LLMs](https://fellou.ai/eko/docs/api/types/LLMs.html)
-   [StreamCallbackMessage](https://fellou.ai/eko/docs/api/types/StreamCallbackMessage.html)
-   [Workflow](https://fellou.ai/eko/docs/api/types/Workflow.html)
-   [WorkflowAgent](https://fellou.ai/eko/docs/api/types/WorkflowAgent.html)
-   [WorkflowNode](https://fellou.ai/eko/docs/api/types/WorkflowNode.html)
-   [config](https://fellou.ai/eko/docs/api/variables/config.html)
-   [Log](https://fellou.ai/eko/docs/api/variables/Log.html)
-   [convertToolSchema](https://fellou.ai/eko/docs/api/functions/convertToolSchema.html)
-   [mergeTools](https://fellou.ai/eko/docs/api/functions/mergeTools.html)
-   [toImage](https://fellou.ai/eko/docs/api/functions/toImage.html)
-   [default](https://fellou.ai/eko/docs/api/modules.html#default)


---
created: 2025-11-11T10:19:39 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/functions/convertToolSchema.html
author: 
---

# convertToolSchema | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [convertToolSchema](https://fellou.ai/eko/docs/api/functions/convertToolSchema.html)

## Function convertToolSchema

-   convertToolSchema(tool: ToolSchema): LanguageModelV1FunctionTool[](https://fellou.ai/eko/docs/api/functions/convertToolSchema.html#converttoolschema)
    
    #### Parameters
    
    -   tool: ToolSchema
    
    #### Returns LanguageModelV1FunctionTool


---
created: 2025-11-11T10:19:51 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/functions/mergeTools.html
author: 
---

# mergeTools | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [mergeTools](https://fellou.ai/eko/docs/api/functions/mergeTools.html)

## Function mergeTools

-   mergeTools<[T](https://fellou.ai/eko/docs/api/functions/mergeTools.html#mergetoolst) extends LanguageModelV1FunctionTool | Tool\>(  
        tools1: [T](https://fellou.ai/eko/docs/api/functions/mergeTools.html#mergetoolst)\[\],  
        tools2: [T](https://fellou.ai/eko/docs/api/functions/mergeTools.html#mergetoolst)\[\],  
    ): [T](https://fellou.ai/eko/docs/api/functions/mergeTools.html#mergetoolst)\[\][](https://fellou.ai/eko/docs/api/functions/mergeTools.html#mergetools)
    
    #### Type Parameters
    
    -   T extends LanguageModelV1FunctionTool | Tool
    
    #### Parameters
    
    -   tools1: [T](https://fellou.ai/eko/docs/api/functions/mergeTools.html#mergetoolst)\[\]
    -   tools2: [T](https://fellou.ai/eko/docs/api/functions/mergeTools.html#mergetoolst)\[\]
    
    #### Returns [T](https://fellou.ai/eko/docs/api/functions/mergeTools.html#mergetoolst)\[\]


---
created: 2025-11-11T10:20:06 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/functions/toImage.html
author: 
---

# toImage | EKO API

> ## Excerpt
> Documentation for EKO API

---
-   [EKO API](https://fellou.ai/eko/docs/api/modules.html)
-   [toImage](https://fellou.ai/eko/docs/api/functions/toImage.html)

## Function toImage

-   toImage(imageData: string): Uint8Array<ArrayBufferLike\> | URL[](https://fellou.ai/eko/docs/api/functions/toImage.html#toimage)
    
    #### Parameters
    
    -   imageData: string
    
    #### Returns Uint8Array<ArrayBufferLike\> | URL


---
created: 2025-11-11T10:20:17 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/api/modules.html#default
author: 
---

# EKO API

> ## Excerpt
> Documentation for EKO API

---
Classes

[Agent](https://fellou.ai/eko/docs/api/modules.html#agent)[AgentChain](https://fellou.ai/eko/docs/api/modules.html#agentchain)[AgentContext](https://fellou.ai/eko/docs/api/modules.html#agentcontext)[BaseBrowserAgent](https://fellou.ai/eko/docs/api/modules.html#basebrowseragent)[BaseBrowserLabelsAgent](https://fellou.ai/eko/docs/api/modules.html#basebrowserlabelsagent)[BaseBrowserScreenAgent](https://fellou.ai/eko/docs/api/modules.html#basebrowserscreenagent)[BaseChatAgent](https://fellou.ai/eko/docs/api/modules.html#basechatagent)[BaseComputerAgent](https://fellou.ai/eko/docs/api/modules.html#basecomputeragent)[BaseFileAgent](https://fellou.ai/eko/docs/api/modules.html#basefileagent)[BaseShellAgent](https://fellou.ai/eko/docs/api/modules.html#baseshellagent)[BaseTimerAgent](https://fellou.ai/eko/docs/api/modules.html#basetimeragent)[Chain](https://fellou.ai/eko/docs/api/modules.html#chain)[Context](https://fellou.ai/eko/docs/api/modules.html#context)[Eko](https://fellou.ai/eko/docs/api/modules.html#eko)[ForeachTaskTool](https://fellou.ai/eko/docs/api/modules.html#foreachtasktool)[HumanInteractTool](https://fellou.ai/eko/docs/api/modules.html#humaninteracttool)[RetryLanguageModel](https://fellou.ai/eko/docs/api/modules.html#retrylanguagemodel)[SimpleSseMcpClient](https://fellou.ai/eko/docs/api/modules.html#simplessemcpclient)[TaskNodeStatusTool](https://fellou.ai/eko/docs/api/modules.html#tasknodestatustool)[VariableStorageTool](https://fellou.ai/eko/docs/api/modules.html#variablestoragetool)[WatchTriggerTool](https://fellou.ai/eko/docs/api/modules.html#watchtriggertool)

Interfaces

[HumanCallback](https://fellou.ai/eko/docs/api/modules.html#humancallback)[StreamCallback](https://fellou.ai/eko/docs/api/modules.html#streamcallback)

Type Aliases

[AgentParams](https://fellou.ai/eko/docs/api/modules.html#agentparams)[EkoConfig](https://fellou.ai/eko/docs/api/modules.html#ekoconfig)[LLMRequest](https://fellou.ai/eko/docs/api/modules.html#llmrequest)[LLMs](https://fellou.ai/eko/docs/api/modules.html#llms)[StreamCallbackMessage](https://fellou.ai/eko/docs/api/modules.html#streamcallbackmessage)[Workflow](https://fellou.ai/eko/docs/api/modules.html#workflow)[WorkflowAgent](https://fellou.ai/eko/docs/api/modules.html#workflowagent)[WorkflowNode](https://fellou.ai/eko/docs/api/modules.html#workflownode)

Variables

[config](https://fellou.ai/eko/docs/api/modules.html#config)[Log](https://fellou.ai/eko/docs/api/modules.html#log)

Functions

[convertToolSchema](https://fellou.ai/eko/docs/api/modules.html#converttoolschema)[mergeTools](https://fellou.ai/eko/docs/api/modules.html#mergetools)[toImage](https://fellou.ai/eko/docs/api/modules.html#toimage)

References

[default](https://fellou.ai/eko/docs/api/modules.html#default-1)
