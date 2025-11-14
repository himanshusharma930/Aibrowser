---
created: 2025-11-11T10:05:54 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/agents/mcp-tools/
author: 
---

# MCP Tools | Eko Docs

> ## Excerpt
> This guide introduces how to dynamically expand the proxy tool using the mcp protocol in Eko.

---
## What is a MCP?

[Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

## How to use MCP in Eko?

In Eko, MCP interface extension is provided, the `IMcpClient` interface is defined as follows:

```
<div bis_skin_checked="1"><p><span>export</span><span> </span><span>interface</span><span> IMcpClient {</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>connect</span><span>()</span><span>:</span><span> </span><span>Promise</span><span>&lt;</span><span>void</span><span>&gt;;</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>listTools</span><span>(</span><span>param</span><span>:</span><span> </span><span><span>McpListToolParam</span><span>)</span></span><span>:</span><span> </span><span>Promise</span><span>&lt;</span><span>McpListToolResult</span><span>&gt;;</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>callTool</span><span>(</span><span>param</span><span>:</span><span> </span><span><span>McpCallToolParam</span><span>)</span></span><span>:</span><span> </span><span>Promise</span><span>&lt;</span><span>ToolResult</span><span>&gt;;</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>isConnected</span><span>()</span><span>:</span><span> </span><span>boolean</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>close</span><span>()</span><span>:</span><span> </span><span>Promise</span><span>&lt;</span><span>void</span><span>&gt;;</span></p></div><div bis_skin_checked="1"><p><span>}</span></p></div>
```

Currently, the MCP interface based on the Server-Sent Events (SSE) request protocol has been implemented in the Eko framework, to use, initialize the `SimpleSseMcpClient` class.

Usage Example:

```
<div bis_skin_checked="1"><p><span>import</span><span> { SimpleSseMcpClient } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>sseUrl</span><span> = </span><span>"</span><span>http://localhost:8080/sse</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>mcpClient</span><span> = </span><span>new</span><span> </span><span>SimpleSseMcpClient</span><span>(sseUrl);</span></p></div>
```

### Through MCP dynamically expand agent tool

Agent supports dynamic loading of tools through MCP, Assuming you already have an MCP service, The complete example is as follows:

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko, Agent, LLMs, SimpleSseMcpClient } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>const </span><span>llms</span><span>:</span><span> </span><span>LLMs</span><span> = {</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>model: </span><span>"</span><span>claude-3-5-sonnet-20241022</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>openai: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>provider: </span><span>"</span><span>openai</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>model: </span><span>"</span><span>gpt-4o-mini</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>// your mcp server</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>sseUrl</span><span> = </span><span>"</span><span>http://localhost:8080/sse</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>mcpClient</span><span> = </span><span>new</span><span> </span><span>SimpleSseMcpClient</span><span>(sseUrl);</span></p></div><div bis_skin_checked="1"><p><span>// Custom SmartMall agent</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>agents</span><span>:</span><span> </span><span>Agent</span><span>[]</span><span> =</span><span> [</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>new</span><span> </span><span>Agent</span><span>({</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>name: </span><span>"</span><span>SmartMall</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>description: </span><span>"</span><span>Provide product query and order placement</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>tools: [],</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>mcpClient: mcpClient,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>llms: Object</span><span>.</span><span>keys</span><span>(llms),</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}),</span></p></div><div bis_skin_checked="1"><p><span>];</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{ </span><span>llms</span><span>, </span><span>agents</span><span> }</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>"</span><span>I have $300, please help me buy a set of summer clothes, pants, and shoes.</span><span>"</span><span>);</span></p></div>
```
