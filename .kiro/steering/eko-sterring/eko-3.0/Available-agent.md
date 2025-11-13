---
created: 2025-11-11T10:03:56 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/agents/available-agent/
author: 
---

# Available Agent | Eko Docs

> ## Excerpt
> This guide introduces the built-in agents provided by the framework in different environments.

---
Eko provides various built-in agents for different environments including:

-   [Browser extension](https://fellou.ai/eko/docs/agents/available-agent#browser-extension)
-   [Node.js](https://fellou.ai/eko/docs/agents/available-agent#nodejs)
-   [Web](https://fellou.ai/eko/docs/agents/available-agent#web)

## Browser extension

### BrowserAgent

`Browser`: Use browser agent to operate the browser.

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-extension</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>llms: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>agents:</span><span> [</span><span>new</span><span> </span><span>BrowserAgent</span><span>()]</span><span>,</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>`</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>Open Twitter, search for "Fellou AI" and follow</span></p></div><div bis_skin_checked="1"><p><span>`</span><span>);</span></p></div>
```

The agent is built-in with the following tools:

-   `navigate_to`: Navigate to a specific url
-   `current_page`: Get the information of the current webpage (url, title)
-   `go_back`: Navigate back in browser history
-   `input_text`: Input text into an element
-   `click_element`: Click on an element by index
-   `scroll_to_element`: Scroll to the element
-   `scroll_mouse_wheel`: Scroll the mouse wheel at current position
-   `hover_to_element`: Mouse hover over the element
-   `extract_page_content`: Extract the text content of the current webpage
-   `get_select_options`: Get all options from a native dropdown element
-   `select_option`: Select the native dropdown option
-   `get_all_tabs`: Get all tabs of the current browser
-   `switch_tab`: Switch to the specified tab page
-   `wait`: Wait for specified duration

## Node.js

### BrowserAgent

`Browser`: Use browser agent to operate the browser.

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-nodejs</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>llms: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>agents:</span><span> [</span><span>new</span><span> </span><span>BrowserAgent</span><span>()]</span><span>,</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>`</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>Open Twitter, search for "Fellou AI" and follow</span></p></div><div bis_skin_checked="1"><p><span>`</span><span>);</span></p></div>
```

### FileAgent

`File`: Use file agent to operate the local file.

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { FileAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-nodejs</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>llms: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>agents:</span><span> [</span><span>new</span><span> </span><span>FileAgent</span><span>()]</span><span>,</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>`</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>Create a test.txt on the desktop and write hello eko.</span></p></div><div bis_skin_checked="1"><p><span>`</span><span>);</span></p></div>
```

The agent is built-in with the following tools:

-   `file_list`: Getting a list of files in a specified directory.
-   `file_read`: Read file content. Use to read files or check file content.
-   `file_write`: Overwrite or append content to a file.
-   `file_str_replace`: Replace specified string in a file.
-   `file_find_by_name`: Find files by name pattern in specified directory.

## Web

### BrowserAgent

`Browser`: Use browser agent to operate the current page.

```
<div bis_skin_checked="1"><p><span>import</span><span> { Eko } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko-web</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>eko</span><span> = </span><span>new</span><span> </span><span>Eko</span><span>(</span><span>{</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>llms: {</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>default: {</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>provider: </span><span>"</span><span>anthropic</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>model: </span><span>"</span><span>claude-3-7-sonnet</span><span>"</span><span>,</span></p></div><div bis_skin_checked="1"><p><span><span>      </span></span><span>apiKey: </span><span>"</span><span>your_api_key</span><span>"</span></p></div><div bis_skin_checked="1"><p><span><span>    </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>},</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>agents:</span><span> [</span><span>new</span><span> </span><span>BrowserAgent</span><span>()]</span><span>,</span></p></div><div bis_skin_checked="1"><p><span>}</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>let </span><span>result</span><span> = await </span><span>eko</span><span>.</span><span>run</span><span>(</span><span>`</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>Find the text box and enter hello eko</span></p></div><div bis_skin_checked="1"><p><span>`</span><span>);</span></p></div>
```
