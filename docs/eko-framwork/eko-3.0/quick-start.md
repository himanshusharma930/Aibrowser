---
created: 2025-11-11T10:00:58 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/getting-started/quickstart/
author: 
---

# Quickstart | Eko Docs

> ## Excerpt
> This guide will walk you through running your first Eko workflow.

---
Here are two quick ways to get started:

1.  [**Using a browser extension**](https://fellou.ai/eko/docs/getting-started/quickstart/#using-a-browser-extension): Suitable for those who just want to try it out or are not professionals.
2.  [**Running a Node.js script**](https://fellou.ai/eko/docs/getting-started/quickstart/#running-a-nodejs-script): Suitable for professionals who want to review or modify the code details.

## Using a browser extension

Let’s run an Eko workflow together in a browser extension to automate the task that `Open Twitter, search for "Fellou AI" and follow`.

### Load extension

-   Download the _[precompiled extension](https://github.com/FellouAI/eko-demos/raw/refs/heads/main/browser-extension-dist/dist.zip)_ (or you can also [build it](https://fellou.ai/eko/docs/getting-started/quickstart/installation#install) yourself). Unzip the ZIP file to a suitable location, and you should see a `dist` folder.
-   Open the [Chrome browser](https://www.google.com/chrome/) and navigate to `chrome://extensions/`.
-   Turn on `Developer mode` (toggle switch in the top right corner).
-   Click `Load unpacked` button (the blue text in the top-left corner) and select the `dist` folder in the first step.

### Configure LLM model API Key

-   If it’s inconvenient to obtain an API key from the OpenAI or Claude platform, consider using proxy sites or services (such as [OpenRouter](https://openrouter.ai/)), and then replace the _Base URL_ and _API key_ with the corresponding values.

### Let’s run it!

Open the side-bar of the extension, input your prompt, and click the Run button:

## Running a Node.js script

First we need to create a new project:

```
<div bis_skin_checked="1"><p><span>mkdir</span><span> </span><span>try-eko</span></p></div><div bis_skin_checked="1"><p><span>cd</span><span> </span><span>try-eko</span></p></div><div bis_skin_checked="1"><p><span>npm</span><span> </span><span>init</span></p></div>
```

And install dependencies:

```
<div bis_skin_checked="1"><p><span>npm</span><span> </span><span>add</span><span> </span><span>@eko-ai/eko</span><span> </span><span>@eko-ai/eko-nodejs</span><span> </span><span>ts-node</span></p></div>
```

Then write a script named `index.ts`:

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko, Agent, LLMs } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-nodejs</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>async</span><span> </span><span>function</span><span> </span><span>run</span><span>()</span><span> {</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>llms</span><span>:</span><span> </span><span>LLMs</span><span> = {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>model: </span><span>"</span><span>claude-3-5-sonnet-20241022</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>apiKey: </span><span>"</span><span>sk-xxx</span><span>"</span><span>,</span><span> </span><span>// replace it with your API KEY</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>config: {</span></p></div><div bis_skin_checked="1"><p><span><span>        </span></span><span>baseURL: </span><span>"</span><span>https://api.anthropic.com/v1</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>}</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>}</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>agents</span><span>:</span><span> </span><span>Agent</span><span>[]</span><span> =</span><span> [</span><span>new</span><span> </span><span>BrowserAgent</span><span>()];</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{ </span><span>llms</span><span>,</span><span> </span><span>agents</span><span> }</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>let </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>"</span><span>Search for the latest news about Musk</span><span>"</span><span>);</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>"</span><span>result: </span><span>"</span><span>,</span><span> result</span><span>.</span><span>result</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>}</span></p></div><div bis_skin_checked="1"><p><span>run</span><span>()</span><span>.</span><span>catch</span><span><span>(</span><span>e</span><span> </span></span><span>=&gt;</span><span> {</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>console</span><span>.</span><span>log</span><span>(e)</span></p></div><div bis_skin_checked="1"><p><span>});</span></p></div>
```

Remember to set the environment variables (one of OpenAI/Claude):

```
<div bis_skin_checked="1"><p><span>export</span><span> </span><span>OPENAI_BASE_URL</span><span>=</span><span>your_value</span></p></div><div bis_skin_checked="1"><p><span>export</span><span> </span><span>OPENAI_API_KEY</span><span>=</span><span>your_value</span></p></div><div bis_skin_checked="1"><p><span>export</span><span> </span><span>ANTHROPIC_BASE_URL</span><span>=</span><span>your_value</span></p></div><div bis_skin_checked="1"><p><span>export</span><span> </span><span>ANTHROPIC_API_KEY</span><span>=</span><span>your_value</span></p></div>
```

Finally run it:

## Next Steps

Now that you have run the first workflow, you can:

-   Understand the [Installation](https://fellou.ai/eko/docs/getting-started/installation) of Eko in different environments.
-   Try different [Configurations](https://fellou.ai/eko/docs/getting-started/configuration) of Eko.
-   Learn [Architecture](https://fellou.ai/eko/docs/getting-started/architecture) of Eko.
-   Check [References](https://fellou.ai/eko/docs/getting-started/reference/overview) to confirm the code details.
-   Join our [Discard](https://discord.gg/XpFfk2e5): ![](https://fellou.ai/eko/docs/_astro/discard.DZEwd05S_Z2jsIBU.webp)
