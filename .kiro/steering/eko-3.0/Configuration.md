---
created: 2025-11-11T10:02:23 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/getting-started/configuration/
author: 
---

# Configuration | Eko Docs

> ## Excerpt
> This guide covers how to configure Eko in different environments.

---
As we have seen [before](https://fellou.ai/eko/docs/getting-started/configuration/installation), [`Eko`](https://fellou.ai/eko/docs/api/classes/Eko.html) accepts a parameter of type [`EkoConfig`](https://fellou.ai/eko/docs/api/classes/Eko.html), which is defined as follows:

```
<div bis_skin_checked="1"><p><span>type</span><span> EkoConfig </span><span>=</span><span> {</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>llms</span><span>:</span><span> </span><span>LLMs</span><span>;</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>agents</span><span>?:</span><span> </span><span>Agent</span><span>[];</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>planLlms</span><span>?:</span><span> </span><span>string</span><span>[];</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>callback</span><span>?:</span><span> </span><span>StreamCallback</span><span> </span><span>&amp;</span><span> </span><span>HumanCallback</span><span>;</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>defaultMcpClient</span><span>?:</span><span> </span><span>IMcpClient</span><span>;</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>a2aClient</span><span>?:</span><span> </span><span>IA2aClient</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>};</span></p></div>
```

This guide will walk you through configuring these parameters. You can also see [`EkoConfig`’s Reference](https://fellou.ai/eko/docs/api/types/EkoConfig.html) for code details.

## `EkoConfig.llms`

`EkoConfig.llms` stores the large models available to Eko in a key-value format, where you can set the following for each model:

-   Provider
-   Model name
-   API key
-   Base URL
-   TopK
-   TopP

The models defined here will be used by the Planner and Agents. You can configure models with different performance levels to meet the varying needs of different components.

Here is an example that configures two models, with Claude 3.5 as the default and another one being GPT-4o:

```
<div bis_skin_checked="1"><p><span>let </span><span>llms</span><span> = {</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>model: </span><span>"</span><span>claude-3-5-sonnet-20241022</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>apiKey: </span><span>"</span><span>sk-xxx</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>config: { topK: </span><span>5</span><span> },</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>openai: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>provider: </span><span>"</span><span>openai</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>model: </span><span>"</span><span>gpt-4o</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>apiKey: </span><span>"</span><span>sk-xxx</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>config: { baseURL: </span><span>"</span><span>https://example.com/v1</span><span>"</span><span>, topP: </span><span>0.7</span><span> },</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>;</span></p></div>
```

## `EkoConfig.agents`

`EkoConfig.agents` describes the Agents available in the Eko workflow. Each Agent has its own name, description, toolkit, and available models.

For more information about Agents, please refer to the [Agents](https://fellou.ai/eko/docs/getting-started/agents) section.

In this simple example, there is only one `BrowserAgent`:

```
<div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-extension</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>agents</span><span>:</span><span> </span><span>Agent</span><span>[]</span><span> =</span><span> [</span><span>new</span><span> </span><span>BrowserAgent</span><span>()];</span></p></div>
```

## `EkoConfig.planLlms`

`EkoConfig.planLlms` specifies the models that will be used by the Eko Planner. It is recommended to choose a high-performance model, as it will be responsible for planning the entire workflow. For example:

```
<div bis_skin_checked="1"><p><span>let </span><span>llms</span><span> = {</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>provider: </span><span>"</span><span>openai</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>model: </span><span>"</span><span>gpt-4o-mini</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>apiKey: </span><span>"</span><span>sk-xxx</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>powerful: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>apiKey: </span><span>"</span><span>sk-xxx</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{ </span><span>llms</span><span>, planLlms:</span><span> [</span><span>"</span><span>powerful</span><span>"</span><span>]</span><span> }</span><span>);</span></p></div>
```

## `EkoConfig.callback`

`EkoConfig.callback` accepts a set of user-defined callback functions, which can include `StreamCallback` and `HumanCallback`.

-   `StreamCallback` allows you to receive streaming updates on workflow progress, tool usage, and results.
-   `HumanCallback` enables you to handle cases where human input or confirmation is required (e.g., when a user selects an option, confirms an action, or provides input).

For more information, please refer to the [Callbacks](https://fellou.ai/eko/docs/getting-started/architecture/callback-system) section.

Example:

```
<div bis_skin_checked="1"><p><span>let </span><span>callback</span><span> = {</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>onMessage</span><span>: async </span><span>(</span><span>msg</span><span>)</span><span> =&gt; { </span><span>/* handle streaming updates */</span><span> },</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>onHumanInput</span><span>: async </span><span>(</span><span>ctx</span><span>, </span><span>prompt</span><span>)</span><span> =&gt; { </span><span>/* prompt user for input */</span><span> return </span><span>"</span><span>user input</span><span>"</span><span>; }</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>;</span></p></div>
```

## `EkoConfig.defaultMcpClient`

`EkoConfig.defaultMcpClient` is an instance of `IMcpClient` used to handle communication with an MCP (Multi-Component Platform) backend. Set this if your agents/tools require backend orchestration or state management.

## `EkoConfig.a2aClient`

`EkoConfig.a2aClient` is an instance of `IA2aClient` for agent-to-agent communication. Use this if your workflow involves coordination or messaging between multiple agents.
