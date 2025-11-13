---
created: 2025-11-11T10:03:19 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/agents/
author: 
---

# Multi-Agent Overview | Eko Docs

> ## Excerpt
> This guide introduces the built-in Multi-Agent in Eko and its method definitions.

---
## What are Agent?

In the Eko framework, Agents are core drivers. Typically, an Agent is composed of multiple tools, and each agent has its independent function, for example:

-   Browser Agent
-   Computer Agent
-   File Agent
-   Shell Agent
-   Custom Agent

## Why Use Agent

### 1\. Modular Design

Agents are independent modules, with each Agent responsible for completing a specific function. This design allows developers to break down complex processes into simple, manageable steps. Through this modular approach, developers can reuse these Agents across different projects, reducing code duplication and improving development efficiency.

### 2\. Clear Interface Definition

Each Agent follows a unified interface structure, including `name`, `description`, `tools`, and supports mcp extensions and the specification of different LLM models.

```
<div bis_skin_checked="1"><p><span>class</span><span> </span><span>Agent</span><span> {</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>name</span><span>:</span><span> </span><span>string</span><span>;</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>description</span><span>:</span><span> </span><span>string</span><span>;</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>tools</span><span>:</span><span> </span><span>Tool</span><span>[] </span><span>=</span><span> [];</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>llms</span><span>?:</span><span> </span><span>string</span><span>[];</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>mcpClient</span><span>?:</span><span> </span><span>IMcpClient</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>}</span></p></div>
```

• name: A unique identifier for the agent (e.g. `Browser`)

• description: Function Description, Explanation of the Role and Usage Scenarios of the Agent

• tools: Specific execution tools, all operations are completed by tools

• llms: Specify the use of the model, support fallback calls, default model

• mcpClient: Support dynamic expansion of tools through the MCP interface

## Using in Eko

The Eko framework provides various built-in Agents for different environments that can be used directly, and you can also customize Agents to complete workflow tasks.

### Built-in agents

Here is a demonstration of the node.js environment

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent, FileAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-nodejs</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>llms: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>agents:</span><span> [</span></p></div><div bis_skin_checked="1"><p><span>    </span><span>new</span><span> </span><span>BrowserAgent</span><span>(),</span></p></div><div bis_skin_checked="1"><p><span>    </span><span>new</span><span> </span><span>FileAgent</span><span>()</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>]</span><span>,</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>`</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>Search for the latest news about Musk, summarize it, and save it as musk_news.md file to the desktop.</span></p></div><div bis_skin_checked="1"><p><span>`</span><span>);</span></p></div>
```

Learn more: [Available Agent](https://fellou.ai/eko/docs/agents/available-agent).

### Custom agent

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko, Agent, AgentContext } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { ToolResult } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko/types</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>weather_agent</span><span> = </span><span>new</span><span> </span><span>Agent</span><span>(</span><span>{</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>name: </span><span>"</span><span>Weather</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>description: </span><span>"</span><span>Provide weather inquiry service</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>tools:</span><span> [</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>{</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>name: </span><span>"</span><span>get_weather</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>description: </span><span>"</span><span>weather query</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>parameters: {</span></p></div><div bis_skin_checked="1"><p><span><span>        </span></span><span>type: </span><span>"</span><span>object</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>        </span></span><span>properties: {</span></p></div><div bis_skin_checked="1"><p><span><span>          </span></span><span>city: {</span></p></div><div bis_skin_checked="1"><p><span><span>            </span></span><span>type: </span><span>"</span><span>string</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>          </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>        </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span>      </span><span>execute</span><span>: </span><span>async</span><span> </span><span>(</span><span>args</span><span>:</span><span> </span><span>Record</span><span>&lt;</span><span>string</span><span>, </span><span>unknown</span><span><span>&gt;, </span><span>agentContext</span></span><span>:</span><span> </span><span><span>AgentContext</span><span>)</span></span><span>:</span><span> </span><span>Promise</span><span>&lt;</span><span>ToolResult</span><span>&gt; </span><span>=&gt;</span><span> {</span></p></div><div bis_skin_checked="1"><p><span>        </span><span>return</span><span> {</span></p></div><div bis_skin_checked="1"><p><span><span>          </span></span><span>content: [</span></p></div><div bis_skin_checked="1"><p><span><span>            </span></span><span>{</span></p></div><div bis_skin_checked="1"><p><span><span>              </span></span><span>type: </span><span>"</span><span>text</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>              </span></span><span>text: </span><span>`</span><span>Today, the weather in </span><span>${</span><span>args</span><span>.</span><span>city</span><span>}</span><span> is cloudy, 25-30° (Celsius), suitable for going out for a walk.</span><span>`</span></p></div><div bis_skin_checked="1"><p><span><span>            </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span><span>          </span></span><span>]</span></p></div><div bis_skin_checked="1"><p><span><span>        </span></span><span>};</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>]</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>llms: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>agents:</span><span> [weather_agent]</span><span>,</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>`</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>How is the weather in Beijing today?</span></p></div><div bis_skin_checked="1"><p><span>`</span><span>);</span></p></div>
```

Learn more: [Custom Agent](https://fellou.ai/eko/docs/agents/custom-agent).

## Next Steps

Now that you have understood the concept of an agent, let’s take a look at the built-in agents and how to customize agents:

-   Built-in [Available Agent](https://fellou.ai/eko/docs/agents/available-agent) of the framework in different environments
-   Learn how to [Custom Agent](https://fellou.ai/eko/docs/agents/custom-agent)
-   Learn how to [Agent Tools](https://fellou.ai/eko/docs/agents/agent-tools)
