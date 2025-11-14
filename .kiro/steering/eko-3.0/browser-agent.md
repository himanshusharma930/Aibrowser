---
created: 2025-11-11T10:04:34 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/agents/browser-agent/
author: 
---

# Browser Agent | Eko Docs

> ## Excerpt
> This guide explains the Browser Agent provided by the framework.

---
## Overview

The **Browser Agent** is a built-in Agent in Eko, designed to interact with web pages in a human-like way. It enables automated workflows to perform browser operations such as navigation, element interaction, content extraction, and more. The Browser Agent is available in multiple environments, including browser extensions, Node.js (via Playwright), and web (sandboxed DOM automation).

**Tools:**

-   Navigation: `navigate_to`, `go_back`, `switch_tab`, `get_all_tabs`
-   Element interaction: `input_text`, `click_element`, `hover_to_element`, `scroll_to_element`, `select_option`, `get_select_options`
-   Content extraction: `extract_page_content`, `screenshot_and_html`
-   Scrolling: `scroll_mouse_wheel`
-   Utility: `wait`

**Supported environments:**

-   Browser extension (Chrome)
-   Node.js (headless or visible browser via Playwright)
-   Web (sandboxed, limited to current page)

## Architecture

The Browser Agent is implemented as a set of extensible classes:

-   [`BaseBrowserAgent`](https://fellou.ai/eko/packages/eko-core/src/agent/browser/browser_base.ts):  
    Extends `Agent`, defining the core interface for browser agents, including screenshots, navigation, tag management and execution methods of js scripts.
    
-   [`BaseBrowserLabelsAgent`](https://fellou.ai/eko/packages/eko-core/src/agent/browser/browser_labels.ts):  
    Extends `BaseBrowserAgent` to provide element-level interaction using indexed elements, screenshot-and-HTML extraction, and tool-based operations. This is the main base for browser automation in extension/web/Node.js environments.
    
-   [`BaseBrowserScreenAgent`](https://fellou.ai/eko/packages/eko-core/src/agent/browser/browser_screen.ts):  
    Extends `BaseBrowserAgent` to provide a coordinate-based interface for mouse and keyboard automation, suitable for screen-based automation scenarios.
    

Each environment (extension, Node.js, web) implements its own `BrowserAgent` class by extending `BaseBrowserLabelsAgent` and providing environment-specific logic for navigation, script execution, and screenshotting.

## Features

-   **Screenshot and DOM Extraction:**  
    The agent combines page screenshots with a pseudo-HTML representation of interactive elements. Each actionable element is indexed and visually labeled in the screenshot, enabling robust element identification and interaction.
    
-   **Element Indexing and Interaction:**  
    All interactive elements (buttons, inputs, links, etc.) are assigned unique indexes. Tools such as `click_element`, `input_text`, and `hover_to_element` operate on these indexes, ensuring precise and reliable automation.
    
-   **Tool-Based Operation Model:**  
    All browser actions are exposed as tools (e.g., `navigate_to`, `input_text`, `extract_page_content`). The agent executes workflows by invoking these tools in sequence, allowing for modular, explainable, and extensible automation.
    
-   **Multi-Environment Support:**  
    The same high-level interface is available across browser extension, Node.js, and web environments, with environment-specific implementations for low-level operations.
    
-   **Error Handling and Robustness:**  
    The agent includes built-in error handling, fallback strategies, and support for waiting, retries, and alternative approaches when elements are not found or operations fail.
    

The Browser Agent exposes the following tools and methods for browser automation:

-   **Navigation**
    
    -   `navigate_to(url: string)`: Navigate to a specific URL.
    -   `go_back()`: Go back to the previous page in history.
    -   `switch_tab(index: number)`: Switch to a different browser tab by index.
    -   `get_all_tabs()`: Retrieve a list of all open tabs.
-   **Element Interaction**
    
    -   `input_text(index: number, text: string, enter?: boolean)`: Type text into an input element by its index. Optionally press Enter after typing.
    -   `click_element(index: number, num_clicks?: number, button?: "left" | "right" | "middle")`: Click an element by its index, with optional click count and mouse button.
    -   `hover_to_element(index: number)`: Move the mouse pointer over an element by its index.
    -   `scroll_to_element(index: number)`: Scroll the page to bring the specified element into view.
    -   `select_option(index: number, option_value: string)`: Select an option from a dropdown/select element by its index.
    -   `get_select_options(index: number)`: Retrieve available options for a select element by its index.
-   **Content Extraction**
    
    -   `extract_page_content(variable_name?: string)`: Extract the full HTML/text content of the current page.
    -   `screenshot_and_html()`: Capture a screenshot of the visible page and extract structured element information.
-   **Scrolling**
    
    -   `scroll_mouse_wheel(amount: number)`: Scroll the page vertically by a specified amount.
-   **Utility**
    
    -   `wait(milliseconds: number)`: Wait for a specified duration (useful for waiting for content to load).
-   **Error Handling**: The agent includes built-in error handling, retries, and fallback strategies for robust automation.
    

___

## Usage Examples

Although `BrowserAgent` is mainly used by Eko framework, you can also create a `BrowserAgent` separately and debug its methods. Below are example usage patterns for the Browser Agent in different environments.

### Node.js (with Playwright)

```
<div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>'</span><span>eko/agents/browser</span><span>'</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>import</span><span> { createPlaywrightEnv } </span><span>from</span><span> </span><span>'</span><span>eko/envs/playwright</span><span>'</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>const </span><span>env</span><span> = await </span><span>createPlaywrightEnv</span><span>();</span></p></div><div bis_skin_checked="1"><p><span>const </span><span>agent</span><span> = </span><span>new</span><span> </span><span>BrowserAgent</span><span>(</span><span>{ </span><span>env</span><span> }</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>await</span><span> agent</span><span>.</span><span>navigate_to</span><span>(</span><span>'</span><span>https://example.com</span><span>'</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>await</span><span> agent</span><span>.</span><span>input_text</span><span>(</span><span>2</span><span>, </span><span>'</span><span>hello world</span><span>'</span><span>, </span><span>true</span><span>); </span><span>// Type into input with index 2 and press Enter</span></p></div><div bis_skin_checked="1"><p><span>await</span><span> agent</span><span>.</span><span>click_element</span><span>(</span><span>3</span><span>); </span><span>// Click button with index 3</span></p></div><div bis_skin_checked="1"><p><span>const </span><span>content</span><span> = await </span><span>agent</span><span>.</span><span>extract_page_content</span><span>();</span></p></div><div bis_skin_checked="1"><p><span>console</span><span>.</span><span>log</span><span>(content);</span></p></div>
```

### Browser Extension

```
<div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>'</span><span>eko/agents/browser</span><span>'</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>const </span><span>agent</span><span> = </span><span>new</span><span> </span><span>BrowserAgent</span><span>();</span></p></div><div bis_skin_checked="1"><p><span>await</span><span> agent</span><span>.</span><span>navigate_to</span><span>(</span><span>'</span><span>https://example.com</span><span>'</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>await</span><span> agent</span><span>.</span><span>click_element</span><span>(</span><span>1</span><span>); </span><span>// Click element with index 1</span></p></div><div bis_skin_checked="1"><p><span>await</span><span> agent</span><span>.</span><span>wait</span><span>(</span><span>1000</span><span>); </span><span>// Wait for 1 second</span></p></div><div bis_skin_checked="1"><p><span>const </span><span>screenshot</span><span> = await </span><span>agent</span><span>.</span><span>screenshot_and_html</span><span>();</span></p></div><div bis_skin_checked="1"><p><span>console</span><span>.</span><span>log</span><span>(screenshot);</span></p></div>
```

### Web (Sandboxed DOM Automation)

```
<div bis_skin_checked="1"><p><span>import</span><span> { BrowserAgent } </span><span>from</span><span> </span><span>'</span><span>eko/agents/browser</span><span>'</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>const </span><span>agent</span><span> = </span><span>new</span><span> </span><span>BrowserAgent</span><span>();</span></p></div><div bis_skin_checked="1"><p><span>await</span><span> agent</span><span>.</span><span>input_text</span><span>(</span><span>0</span><span>, </span><span>'</span><span>search query</span><span>'</span><span>);</span></p></div><div bis_skin_checked="1"><p><span>await</span><span> agent</span><span>.</span><span>click_element</span><span>(</span><span>1</span><span>); </span><span>// Click search button</span></p></div><div bis_skin_checked="1"><p><span>await</span><span> agent</span><span>.</span><span>scroll_to_element</span><span>(</span><span>5</span><span>); </span><span>// Scroll to element with index 5</span></p></div>
```

**Note:**

-   Element indexes are determined by the agent’s DOM extraction and may vary per page load.
-   Always use the latest element list returned by `screenshot_and_html` or similar methods to determine valid indexes.
-   For advanced scenarios, extend `BaseBrowserLabelsAgent` or `BaseBrowserScreenAgent` for custom logic.

### Custom Browser

```
<div bis_skin_checked="1"><p><span>import</span><span> { AgentContext, BaseBrowserLabelsAgent } </span><span>from</span><span> </span><span>"</span><span>@eko-ai/eko</span><span>"</span><span>;</span></p></div><div bis_skin_checked="1"><p><span>export</span><span> </span><span>class</span><span> </span><span>E2bBrowser</span><span> </span><span>extends</span><span> </span><span>BaseBrowserLabelsAgent</span><span> {</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>protected</span><span> </span><span>screenshot</span><span>(</span><span>agentContext</span><span>:</span><span> </span><span><span>AgentContext</span><span>)</span></span><span>:</span><span> </span><span>Promise</span><span>&lt;{ imageBase64</span><span>:</span><span> </span><span>string</span><span>; imageType</span><span>:</span><span> </span><span>"</span><span>image/jpeg</span><span>"</span><span> </span><span>|</span><span> </span><span>"</span><span>image/png</span><span>"</span><span>; }&gt; {</span></p></div><div bis_skin_checked="1"><p><span>    </span><span>throw</span><span> </span><span>new</span><span> </span><span>Error</span><span>(</span><span>"</span><span>Method not implemented.</span><span>"</span><span>);</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>protected</span><span> </span><span>navigate_to</span><span>(</span><span>agentContext</span><span>:</span><span> </span><span>AgentContext</span><span><span>, </span><span>url</span></span><span>:</span><span> </span><span>string</span><span>)</span><span>:</span><span> </span><span>Promise</span><span>&lt;{ url</span><span>:</span><span> </span><span>string</span><span>; title</span><span>?:</span><span> </span><span>string</span><span>; }&gt; {</span></p></div><div bis_skin_checked="1"><p><span>    </span><span>throw</span><span> </span><span>new</span><span> </span><span>Error</span><span>(</span><span>"</span><span>Method not implemented.</span><span>"</span><span>);</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>protected</span><span> </span><span>get_all_tabs</span><span>(</span><span>agentContext</span><span>:</span><span> </span><span><span>AgentContext</span><span>)</span></span><span>:</span><span> </span><span>Promise</span><span>&lt;</span><span>Array</span><span>&lt;{ tabId</span><span>:</span><span> </span><span>number</span><span>; url</span><span>:</span><span> </span><span>string</span><span>; title</span><span>:</span><span> </span><span>string</span><span>; }&gt;&gt; {</span></p></div><div bis_skin_checked="1"><p><span>    </span><span>throw</span><span> </span><span>new</span><span> </span><span>Error</span><span>(</span><span>"</span><span>Method not implemented.</span><span>"</span><span>);</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>protected</span><span> </span><span>switch_tab</span><span>(</span><span>agentContext</span><span>:</span><span> </span><span>AgentContext</span><span><span>, </span><span>tabId</span></span><span>:</span><span> </span><span>number</span><span>)</span><span>:</span><span> </span><span>Promise</span><span>&lt;{ tabId</span><span>:</span><span> </span><span>number</span><span>; url</span><span>:</span><span> </span><span>string</span><span>; title</span><span>:</span><span> </span><span>string</span><span>; }&gt; {</span></p></div><div bis_skin_checked="1"><p><span>    </span><span>throw</span><span> </span><span>new</span><span> </span><span>Error</span><span>(</span><span>"</span><span>Method not implemented.</span><span>"</span><span>);</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span>  </span><span>protected</span><span> </span><span>execute_script</span><span>(</span><span>agentContext</span><span>:</span><span> </span><span>AgentContext</span><span>, </span><span>func</span><span>:</span><span> </span><span>(</span><span>...</span><span>args</span><span>:</span><span> </span><span>any</span><span>[]</span><span>)</span><span> </span><span>=&gt;</span><span> </span><span>void</span><span><span>, </span><span>args</span></span><span>:</span><span> </span><span>any</span><span>[]</span><span>)</span><span>:</span><span> </span><span>Promise</span><span>&lt;</span><span>any</span><span>&gt; {</span></p></div><div bis_skin_checked="1"><p><span>    </span><span>throw</span><span> </span><span>new</span><span> </span><span>Error</span><span>(</span><span>"</span><span>Method not implemented.</span><span>"</span><span>);</span></p></div><div bis_skin_checked="1"><p><span><span>  </span></span><span>}</span></p></div><div bis_skin_checked="1"><p><span>}</span></p></div>
```

## API Reference

-   Class and method summaries for:
    -   [BaseBrowserAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserAgent.html)
    -   [BaseBrowserLabelsAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserLabelsAgent.html)
    -   [BaseBrowserScreenAgent](https://fellou.ai/eko/docs/api/classes/BaseBrowserScreenAgent.html)

-   Available Tools
-   Multi-Agent Overview
-   API Documentation
