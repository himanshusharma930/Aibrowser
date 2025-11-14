---
created: 2025-11-11T10:01:46 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/getting-started/installation/
author: 
---

# Installation | Eko Docs

> ## Excerpt
> Eko is a JavaScript library that can be used in browser extension, web pages, and node.js. This guide covers installation and setup for different environments.

---
Eko is a JavaScript library that can be used in [Browser Extension](https://fellou.ai/eko/docs/getting-started/installation/#browser-extension), [Node.js Enviroment](https://fellou.ai/eko/docs/getting-started/installation/#nodejs-environment), and [Web Enviroment](https://fellou.ai/eko/docs/getting-started/installation/#web-environment). This guide covers installation and setup for different environments.

## Browser Extension

In the quickstart, we have seen how to use the browser extension. Now let’s build one.

### Install

There are two ways to build a browser extension using Eko.

1.  Install eko dependency in the existing plugin project
    
    ```
    <div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span><span> </span><span>@eko-ai/eko</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span><span> </span><span>@eko-ai/eko-extension</span></p></div>
    ```
    
2.  By initializing the plugin project template installation
    
    ```
    <div bis_skin_checked="1"><p><span># install cli (used to initialize browser extension projects)</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span><span> </span><span>@eko-ai/eko-cli</span><span> </span><span>-g</span></p></div><div bis_skin_checked="1"><p><span># initialize project</span></p></div><div bis_skin_checked="1"><p><span>eko-cli</span><span> </span><span>init</span><span> </span><span>my-extension-demo</span></p></div><div bis_skin_checked="1"><p><span>cd</span><span> </span><span>my-extension-demo</span></p></div><div bis_skin_checked="1"><p><span># install dependencies</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span></p></div><div bis_skin_checked="1"><p><span># build</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>run</span><span> </span><span>build</span></p></div>
    ```
    

### Usage Example

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko, LLMs } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-extension</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>export</span><span> </span><span>async</span><span> </span><span>function</span><span> </span><span>main</span><span>(</span><span>prompt</span><span>:</span><span> </span><span>string</span><span>)</span><span> {</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>const </span><span>llms</span><span>:</span><span> </span><span>LLMs</span><span> = {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>agents</span><span> =</span><span> [</span><span>new</span><span> </span><span>BrowserAgent</span><span>()];</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{ </span><span>llms</span><span>,</span><span> </span><span>agents</span><span> }</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>await</span><span> eko</span><span>.</span><span>run</span><span>(prompt);</span></p></div><div bis_skin_checked="1"><p><span>}</span></p></div>
```

### Initialize extension template

```
<div bis_skin_checked="1"><p><span># install cli (used to initialize browser extension projects)</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span><span> </span><span>@eko-ai/eko-cli</span><span> </span><span>-g</span></p></div><div bis_skin_checked="1"><p><span># initialize project</span></p></div><div bis_skin_checked="1"><p><span>eko-cli</span><span> </span><span>init</span><span> </span><span>my-extension-demo</span></p></div><div bis_skin_checked="1"><p><span>cd</span><span> </span><span>my-extension-demo</span></p></div><div bis_skin_checked="1"><p><span># install dependencies</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span></p></div><div bis_skin_checked="1"><p><span># build</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>run</span><span> </span><span>build</span></p></div>
```

## Node.js Environment

Eko can also be run in a Node.js environment, where it can use agents such as browsers, computers, and files. The following is an example of a browser usage:

### Install

1.  Install eko dependencies
    
    ```
    <div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span><span> </span><span>@eko-ai/eko</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span><span> </span><span>@eko-ai/eko-nodejs</span></p></div>
    ```
    
2.  Install playwright dependencies (browser automation)
    
    ```
    <div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span><span> </span><span>playwright</span></p></div><div bis_skin_checked="1"><p><span>npx</span><span> </span><span>playwright</span><span> </span><span>install</span></p></div>
    ```
    

### Usage Example

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko, Agent, LLMs } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent, FileAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-nodejs</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>const </span><span>llms</span><span>:</span><span> </span><span>LLMs</span><span> = {</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>async</span><span> </span><span>function</span><span> </span><span>run</span><span>()</span><span> {</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>agents</span><span>:</span><span> </span><span>Agent</span><span>[]</span><span> =</span><span> [</span><span>new</span><span> </span><span>BrowserAgent</span><span>()</span><span>,</span><span> </span><span>new</span><span> </span><span>FileAgent</span><span>()];</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{ </span><span>llms</span><span>,</span><span> </span><span>agents</span><span> }</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>"</span><span>Search for the latest news about Musk, summarize and save to the desktop as news.md</span><span>"</span><span>);</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>"</span><span>result: </span><span>"</span><span>,</span><span> result</span><span>.</span><span>result</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>}</span></p></div><div bis_skin_checked="1"><p><span>run</span><span>()</span><span>.</span><span>catch</span><span><span>(</span><span>e</span><span> </span></span><span>=&gt;</span><span> {</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>console</span><span>.</span><span>log</span><span>(e)</span></p></div><div bis_skin_checked="1"><p><span>});</span></p></div>
```

## Web Environment

Eko can also be directly embedded into a web page environment. In this example, Eko will automate a web page test.

### Install

```
<div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span><span> </span><span>@eko-ai/eko</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span><span> </span><span>@eko-ai/eko-web</span></p></div>
```

### Usage Example

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko, LLMs } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-web</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>export</span><span> </span><span>async</span><span> </span><span>function</span><span> </span><span>auto_test_case</span><span>()</span><span> {</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>const </span><span>llms</span><span>:</span><span> </span><span>LLMs</span><span> = {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>agents</span><span> =</span><span> [</span><span>new</span><span> </span><span>BrowserAgent</span><span>()];</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{ </span><span>llms</span><span>,</span><span> </span><span>agents</span><span> }</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>const </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>"</span><span>Browser automation testing with steps: 1. ...</span><span>"</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>alert</span><span>(result</span><span>.</span><span>result</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>}</span></p></div>
```

## Build from eko source code

### Clone & Build

```
<div bis_skin_checked="1"><p><span># clone eko project</span></p></div><div bis_skin_checked="1"><p><span>git</span><span> </span><span>clone</span><span> </span><span>https://github.com/FellouAI/eko.git</span></p></div><div bis_skin_checked="1"><p><span>cd</span><span> </span><span>eko</span></p></div><div bis_skin_checked="1"><p><span># install dependencies</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>run</span><span> </span><span>build</span></p></div>
```

### Run examples in different environments

-   Browser extension example
    
    ```
    <div bis_skin_checked="1"><p><span>cd</span><span> </span><span>example/extension</span></p></div><div bis_skin_checked="1"><p><span># Install dependencies</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>run</span><span> </span><span>build</span></p></div><div bis_skin_checked="1"><p><span># load unpacked extensions in developer mode</span></p></div><div bis_skin_checked="1"><p><span># 1. Open the Chrome browser's extension page.</span></p></div><div bis_skin_checked="1"><p><span># 2. Load the built `dist` directory.</span></p></div>
    ```
    
-   Node.js environment example
    
    ```
    <div bis_skin_checked="1"><p><span>cd</span><span> </span><span>example/nodejs</span></p></div><div bis_skin_checked="1"><p><span># Install dependencies</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>run</span><span> </span><span>build</span></p></div><div bis_skin_checked="1"><p><span># Run</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>run</span><span> </span><span>dev</span></p></div>
    ```
    
-   Web environment example
    
    ```
    <div bis_skin_checked="1"><p><span>cd</span><span> </span><span>example/web</span></p></div><div bis_skin_checked="1"><p><span># Install dependencies</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>install</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>run</span><span> </span><span>build</span></p></div><div bis_skin_checked="1"><p><span># Run</span></p></div><div bis_skin_checked="1"><p><span>pnpm</span><span> </span><span>run</span><span> </span><span>dev</span></p></div>
    ```
