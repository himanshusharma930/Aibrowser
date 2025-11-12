interface ToolSchema {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
}

interface ToolResult {
  content: Array<{
    type: string;
    text?: string;
    image?: string;
    mimeType?: string;
  }>;
  extInfo?: Record<string, any>;
}

type ToolHandler = (args: any, extInfo?: any) => Promise<ToolResult>;

class McpToolManager {
  private tools: Map<string, ToolHandler> = new Map();
  private enabledTools: Set<string> = new Set();

  constructor() {
    this.registerDefaultTools();
    // By default, all registered tools are enabled
    this.tools.forEach((_, name) => this.enabledTools.add(name));
  }

  public registerTool(name: string, handler: ToolHandler) {
    this.tools.set(name, handler);
    this.enabledTools.add(name); // Auto-enable new tools
    console.log(`Registered tool: ${name}`);
  }

  /**
   * Get all registered tool names
   */
  public getAllToolNames(): string[] {
    return Array.from(this.tools.keys());
  }

  /**
   * Enable a specific tool
   */
  public enableTool(name: string): boolean {
    if (this.tools.has(name)) {
      this.enabledTools.add(name);
      console.log(`Enabled tool: ${name}`);
      return true;
    }
    console.warn(`Tool not found: ${name}`);
    return false;
  }

  /**
   * Disable a specific tool
   */
  public disableTool(name: string): boolean {
    if (this.tools.has(name)) {
      this.enabledTools.delete(name);
      console.log(`Disabled tool: ${name}`);
      return true;
    }
    console.warn(`Tool not found: ${name}`);
    return false;
  }

  /**
   * Set tool enabled/disabled status
   */
  public setToolEnabled(name: string, enabled: boolean): boolean {
    return enabled ? this.enableTool(name) : this.disableTool(name);
  }

  /**
   * Check if a tool is enabled
   */
  public isToolEnabled(name: string): boolean {
    return this.enabledTools.has(name);
  }

  /**
   * Get tool schemas for all tools (centralized to avoid duplication)
   */
  private getToolSchemas(): { [key: string]: ToolSchema } {
    return {
      // Phase 1: Advanced Browser Tools
      browser_get_markdown: {
        name: 'browser_get_markdown',
        description: 'Get the markdown content of the current page. Converts HTML to markdown format, useful for extracting readable text from web pages.',
        inputSchema: { type: 'object', properties: {}, required: [] }
      },
      browser_read_links: {
        name: 'browser_read_links',
        description: 'Read all links from the current page. Returns a list of all anchor tags with their href and text.',
        inputSchema: { type: 'object', properties: {}, required: [] }
      },
      browser_go_forward: {
        name: 'browser_go_forward',
        description: 'Navigate forward in browser history.',
        inputSchema: { type: 'object', properties: {}, required: [] }
      },
      browser_get_text: {
        name: 'browser_get_text',
        description: 'Get text content from a specific element by index.',
        inputSchema: {
          type: 'object',
          properties: {
            index: { type: 'number', description: 'Element index from the screenshot' }
          },
          required: ['index']
        }
      },
      browser_press_key: {
        name: 'browser_press_key',
        description: 'Simulate keyboard key press (e.g., Enter, Escape, Tab).',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string', description: 'Key to press (e.g., "Enter", "Escape", "Tab")' }
          },
          required: ['key']
        }
      },
      browser_scroll: {
        name: 'browser_scroll',
        description: 'Scroll the page vertically or horizontally.',
        inputSchema: {
          type: 'object',
          properties: {
            direction: { type: 'string', description: 'Scroll direction: up, down, left, right' },
            amount: { type: 'number', description: 'Amount to scroll in pixels (optional)' }
          },
          required: ['direction']
        }
      },

      // Phase 2: Tab Management Tools
      browser_new_tab: {
        name: 'browser_new_tab',
        description: 'Navigate to a new URL in the current tab.',
        inputSchema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'URL to navigate to' }
          },
          required: ['url']
        }
      },
      browser_close_tab: {
        name: 'browser_close_tab',
        description: 'Close the current browser tab.',
        inputSchema: { type: 'object', properties: {}, required: [] }
      },
      browser_switch_tab: {
        name: 'browser_switch_tab',
        description: 'Switch to a specific tab by ID.',
        inputSchema: {
          type: 'object',
          properties: {
            tabId: { type: 'string', description: 'Tab ID to switch to' }
          },
          required: ['tabId']
        }
      },

      // Phase 3: Core Interaction Tools
      browser_paste_text: {
        name: 'browser_paste_text',
        description: 'Instantly inject text into an input field without typing animation.',
        inputSchema: {
          type: 'object',
          properties: {
            index: { type: 'number', description: 'Input element index' },
            text: { type: 'string', description: 'Text to paste' }
          },
          required: ['index', 'text']
        }
      },
      browser_wait_for_element: {
        name: 'browser_wait_for_element',
        description: 'Wait for an element to appear on the page with timeout.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector to wait for' },
            timeout: { type: 'number', description: 'Timeout in milliseconds (default: 5000)' }
          },
          required: ['selector']
        }
      },

      // Phase 5: Gesture Tools
      browser_drag_and_drop: {
        name: 'browser_drag_and_drop',
        description: 'Perform drag and drop operation between elements.',
        inputSchema: {
          type: 'object',
          properties: {
            sourceIndex: { type: 'number', description: 'Source element index' },
            targetIndex: { type: 'number', description: 'Target element index' }
          },
          required: ['sourceIndex', 'targetIndex']
        }
      },
      browser_set_zoom: {
        name: 'browser_set_zoom',
        description: 'Set page zoom level.',
        inputSchema: {
          type: 'object',
          properties: {
            level: { type: 'number', description: 'Zoom level (e.g., 1.0 = 100%, 1.5 = 150%)' }
          },
          required: ['level']
        }
      },
      browser_pinch_zoom: {
        name: 'browser_pinch_zoom',
        description: 'Simulate pinch zoom gesture.',
        inputSchema: {
          type: 'object',
          properties: {
            scale: { type: 'number', description: 'Scale factor for zoom' }
          },
          required: ['scale']
        }
      },
      browser_keyboard_mouse_combo: {
        name: 'browser_keyboard_mouse_combo',
        description: 'Perform combined keyboard and mouse actions (e.g., Ctrl+Click).',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string', description: 'Keyboard modifier key' },
            index: { type: 'number', description: 'Element index to click' }
          },
          required: ['key', 'index']
        }
      },
      browser_scroll_horizontal: {
        name: 'browser_scroll_horizontal',
        description: 'Scroll the page horizontally.',
        inputSchema: {
          type: 'object',
          properties: {
            direction: { type: 'string', description: 'Direction: left or right' },
            amount: { type: 'number', description: 'Amount to scroll in pixels' }
          },
          required: ['direction']
        }
      },

      // Phase 4: Advanced Browser Tools (22 tools)
      // Element Extraction Tools (7 tools)
      extract_element_styles: {
        name: 'extract_element_styles',
        description: 'Extract complete CSS styling information from an element including computed styles, CSS rules, pseudo-element styles, and inheritance chain.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' },
            include_computed: { type: 'boolean', description: 'Include computed styles', default: true },
            include_css_rules: { type: 'boolean', description: 'Include CSS rules from stylesheets', default: true },
            include_pseudo: { type: 'boolean', description: 'Include pseudo-element styles', default: true },
            include_inheritance: { type: 'boolean', description: 'Include inheritance chain', default: false }
          },
          required: ['selector']
        }
      },
      extract_element_structure: {
        name: 'extract_element_structure',
        description: 'Extract complete HTML structure and attributes of an element including children and semantic information.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' },
            include_children: { type: 'boolean', description: 'Include child elements', default: true },
            max_depth: { type: 'number', description: 'Maximum depth for children extraction', default: 3 }
          },
          required: ['selector']
        }
      },
      extract_element_events: {
        name: 'extract_element_events',
        description: 'Extract all event listeners attached to an element (click, hover, input, etc.).',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' }
          },
          required: ['selector']
        }
      },
      extract_element_animations: {
        name: 'extract_element_animations',
        description: 'Extract all CSS animations and transitions applied to an element.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' }
          },
          required: ['selector']
        }
      },
      extract_element_assets: {
        name: 'extract_element_assets',
        description: 'Extract all assets (images, fonts, icons) referenced by an element.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' }
          },
          required: ['selector']
        }
      },
      extract_related_files: {
        name: 'extract_related_files',
        description: 'Extract related files (CSS, JS) that affect an element.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' }
          },
          required: ['selector']
        }
      },
      clone_element_complete: {
        name: 'clone_element_complete',
        description: 'Clone an element with all its styles, structure, events, and assets. Returns complete information for replication.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element to clone' },
            include_children: { type: 'boolean', description: 'Include child elements', default: true }
          },
          required: ['selector']
        }
      },

      // JavaScript Function Management Tools (9 tools)
      discover_global_functions: {
        name: 'discover_global_functions',
        description: 'Discover all global JavaScript functions available in the page context.',
        inputSchema: {
          type: 'object',
          properties: {
            filter: { type: 'string', description: 'Optional filter pattern for function names' }
          },
          required: []
        }
      },
      discover_object_methods: {
        name: 'discover_object_methods',
        description: 'Discover all methods available on a specific JavaScript object.',
        inputSchema: {
          type: 'object',
          properties: {
            object_path: { type: 'string', description: 'Object path (e.g., "window.myApp", "document")' }
          },
          required: ['object_path']
        }
      },
      call_javascript_function: {
        name: 'call_javascript_function',
        description: 'Call a JavaScript function in the page context with specified arguments.',
        inputSchema: {
          type: 'object',
          properties: {
            function_name: { type: 'string', description: 'Function name or path (e.g., "myFunc", "obj.method")' },
            arguments: { type: 'array', description: 'Array of arguments to pass to the function' }
          },
          required: ['function_name']
        }
      },
      inspect_function_signature: {
        name: 'inspect_function_signature',
        description: 'Inspect the signature and source code of a JavaScript function.',
        inputSchema: {
          type: 'object',
          properties: {
            function_name: { type: 'string', description: 'Function name or path' }
          },
          required: ['function_name']
        }
      },
      create_persistent_function: {
        name: 'create_persistent_function',
        description: 'Create a persistent JavaScript function in the page context that survives navigation.',
        inputSchema: {
          type: 'object',
          properties: {
            function_name: { type: 'string', description: 'Name for the function' },
            function_body: { type: 'string', description: 'JavaScript function body' }
          },
          required: ['function_name', 'function_body']
        }
      },
      inject_and_execute_script: {
        name: 'inject_and_execute_script',
        description: 'Inject and execute arbitrary JavaScript code in the page context.',
        inputSchema: {
          type: 'object',
          properties: {
            script: { type: 'string', description: 'JavaScript code to execute' },
            return_value: { type: 'boolean', description: 'Whether to return the execution result', default: true }
          },
          required: ['script']
        }
      },
      execute_function_sequence: {
        name: 'execute_function_sequence',
        description: 'Execute a sequence of JavaScript functions with dependencies between them.',
        inputSchema: {
          type: 'object',
          properties: {
            sequence: { type: 'array', description: 'Array of function calls with arguments' }
          },
          required: ['sequence']
        }
      },
      get_execution_contexts: {
        name: 'get_execution_contexts',
        description: 'Get all available JavaScript execution contexts (main frame, iframes, workers).',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      get_function_executor_info: {
        name: 'get_function_executor_info',
        description: 'Get information about the JavaScript execution environment and available APIs.',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },

      // CDP Command Tools (2 tools)
      execute_cdp_command: {
        name: 'execute_cdp_command',
        description: 'Execute any Chrome DevTools Protocol command for low-level browser control.',
        inputSchema: {
          type: 'object',
          properties: {
            command: { type: 'string', description: 'CDP command name (e.g., "Page.navigate", "DOM.getDocument")' },
            params: { type: 'object', description: 'Command parameters' }
          },
          required: ['command']
        }
      },
      list_cdp_commands: {
        name: 'list_cdp_commands',
        description: 'List all available Chrome DevTools Protocol commands.',
        inputSchema: {
          type: 'object',
          properties: {
            domain: { type: 'string', description: 'Optional CDP domain filter (e.g., "Page", "DOM", "Network")' }
          },
          required: []
        }
      },

      // CDP Extraction Tools (2 tools)
      extract_element_styles_cdp: {
        name: 'extract_element_styles_cdp',
        description: 'Extract element styles using Chrome DevTools Protocol for more detailed information.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' }
          },
          required: ['selector']
        }
      },
      extract_complete_element_cdp: {
        name: 'extract_complete_element_cdp',
        description: 'Extract complete element information using CDP including layout, computed styles, and box model.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' }
          },
          required: ['selector']
        }
      },

      // File Operations Tools (2 tools)
      clone_element_to_file: {
        name: 'clone_element_to_file',
        description: 'Clone an element and save all information to a file.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' },
            output_path: { type: 'string', description: 'Path to save the clone data' }
          },
          required: ['selector', 'output_path']
        }
      },
      extract_complete_element_to_file: {
        name: 'extract_complete_element_to_file',
        description: 'Extract complete element information and save to a structured file.',
        inputSchema: {
          type: 'object',
          properties: {
            selector: { type: 'string', description: 'CSS selector for the element' },
            output_path: { type: 'string', description: 'Path to save the extraction data' },
            format: { type: 'string', description: 'Output format (json, html, markdown)', default: 'json' }
          },
          required: ['selector', 'output_path']
        }
      },

      // Social Media Tools
      get_douyin_download_link: {
        name: 'get_douyin_download_link',
        description: 'Get Douyin video watermark-free download link',
        inputSchema: {
          type: 'object',
          properties: {
            share_link: {
              type: 'string',
              description: 'Douyin share link or text containing the link'
            }
          },
          required: ['share_link']
        }
      },
      extract_xiaohongshu_text: {
        name: 'extract_xiaohongshu_text',
        description: 'Extract text content from Xiaohongshu video (audio to text). Note: Only works with video posts!',
        inputSchema: {
          type: 'object',
          properties: {
            video_url: {
              type: 'string',
              description: 'Xiaohongshu video URL'
            },
            model: {
              type: 'string',
              description: 'Speech recognition model, default is sensevoice-v1',
              default: 'sensevoice-v1'
            }
          },
          required: ['video_url']
        }
      },
      extract_douyin_text: {
        name: 'extract_douyin_text',
        description: 'Extract text content from Douyin video (audio to text)',
        inputSchema: {
          type: 'object',
          properties: {
            share_link: {
              type: 'string',
              description: 'Douyin share link or text containing the link'
            },
            model: {
              type: 'string',
              description: 'Speech recognition model, default is paraformer-v2',
              default: 'paraformer-v2'
            }
          },
          required: ['share_link']
        }
      },
      parse_douyin_video_info: {
        name: 'parse_douyin_video_info',
        description: 'Parse Douyin video basic information (without downloading video file)',
        inputSchema: {
          type: 'object',
          properties: {
            share_link: {
              type: 'string',
              description: 'Douyin share link'
            }
          },
          required: ['share_link']
        }
      }
    };
  }

  /**
   * Get only enabled tools
   */
  public getTools(): ToolSchema[] {
    const toolSchemas = this.getToolSchemas();
    const tools: ToolSchema[] = [];

    // Only return enabled tools
    this.tools.forEach((handler, name) => {
      if (!this.enabledTools.has(name)) {
        return; // Skip disabled tools
      }

      if (toolSchemas[name]) {
        tools.push(toolSchemas[name]);
      } else {
        // Default tool definition
        tools.push({
          name,
          description: `Tool: ${name}`,
          inputSchema: {
            type: 'object',
            properties: {},
            required: []
          }
        });
      }
    });

    return tools;
  }

  /**
   * Get all tools (including disabled ones) with their metadata
   */
  public getAllToolsWithStatus(): Array<ToolSchema & { enabled: boolean }> {
    const toolSchemas = this.getToolSchemas();
    const tools: Array<ToolSchema & { enabled: boolean }> = [];

    this.tools.forEach((handler, name) => {
      const schema = toolSchemas[name] || {
        name,
        description: `Tool: ${name}`,
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      };

      tools.push({
        ...schema,
        enabled: this.enabledTools.has(name)
      });
    });

    return tools;
  }

  public async callTool(name: string, args: any, extInfo?: any): Promise<ToolResult> {
    const toolHandler = this.tools.get(name);
    if (!toolHandler) {
      throw new Error(`Tool not found: ${name}`);
    }

    try {
      const result = await toolHandler(args, extInfo);
      return result;
    } catch (error) {
      console.error(`Error executing tool ${name}:`, error);
      throw error;
    }
  }

  /**
   * Register all browser automation tools
   * These tools are executed via Electron IPC to the main process
   */
  private registerBrowserTools() {
    // Note: Browser tools are executed via window.api.view methods in the Electron main process
    // They don't need handlers here since they're called directly through the view API
    // We just need to register their schemas for MCP tools/list

    // Phase 1: Advanced Browser Tools (6 tools)
    this.tools.set('browser_get_markdown', this.createBrowserToolStub('browser_get_markdown'));
    this.tools.set('browser_read_links', this.createBrowserToolStub('browser_read_links'));
    this.tools.set('browser_go_forward', this.createBrowserToolStub('browser_go_forward'));
    this.tools.set('browser_get_text', this.createBrowserToolStub('browser_get_text'));
    this.tools.set('browser_press_key', this.createBrowserToolStub('browser_press_key'));
    this.tools.set('browser_scroll', this.createBrowserToolStub('browser_scroll'));

    // Phase 2: Tab Management Tools (3 tools)
    this.tools.set('browser_new_tab', this.createBrowserToolStub('browser_new_tab'));
    this.tools.set('browser_close_tab', this.createBrowserToolStub('browser_close_tab'));
    this.tools.set('browser_switch_tab', this.createBrowserToolStub('browser_switch_tab'));

    // Phase 3: Core Interaction Tools (2 tools)
    this.tools.set('browser_paste_text', this.createBrowserToolStub('browser_paste_text'));
    this.tools.set('browser_wait_for_element', this.createBrowserToolStub('browser_wait_for_element'));

    // Phase 5: Gesture Tools (5 tools)
    this.tools.set('browser_drag_and_drop', this.createBrowserToolStub('browser_drag_and_drop'));
    this.tools.set('browser_set_zoom', this.createBrowserToolStub('browser_set_zoom'));
    this.tools.set('browser_pinch_zoom', this.createBrowserToolStub('browser_pinch_zoom'));
    this.tools.set('browser_keyboard_mouse_combo', this.createBrowserToolStub('browser_keyboard_mouse_combo'));
    this.tools.set('browser_scroll_horizontal', this.createBrowserToolStub('browser_scroll_horizontal'));

    // Phase 4: Advanced Browser Tools (22 tools)
    // Element Extraction Tools (7 tools)
    this.tools.set('extract_element_styles', this.createBrowserToolStub('extract_element_styles'));
    this.tools.set('extract_element_structure', this.createBrowserToolStub('extract_element_structure'));
    this.tools.set('extract_element_events', this.createBrowserToolStub('extract_element_events'));
    this.tools.set('extract_element_animations', this.createBrowserToolStub('extract_element_animations'));
    this.tools.set('extract_element_assets', this.createBrowserToolStub('extract_element_assets'));
    this.tools.set('extract_related_files', this.createBrowserToolStub('extract_related_files'));
    this.tools.set('clone_element_complete', this.createBrowserToolStub('clone_element_complete'));

    // JavaScript Function Management Tools (9 tools)
    this.tools.set('discover_global_functions', this.createBrowserToolStub('discover_global_functions'));
    this.tools.set('discover_object_methods', this.createBrowserToolStub('discover_object_methods'));
    this.tools.set('call_javascript_function', this.createBrowserToolStub('call_javascript_function'));
    this.tools.set('inspect_function_signature', this.createBrowserToolStub('inspect_function_signature'));
    this.tools.set('create_persistent_function', this.createBrowserToolStub('create_persistent_function'));
    this.tools.set('inject_and_execute_script', this.createBrowserToolStub('inject_and_execute_script'));
    this.tools.set('execute_function_sequence', this.createBrowserToolStub('execute_function_sequence'));
    this.tools.set('get_execution_contexts', this.createBrowserToolStub('get_execution_contexts'));
    this.tools.set('get_function_executor_info', this.createBrowserToolStub('get_function_executor_info'));

    // CDP Command Tools (2 tools)
    this.tools.set('execute_cdp_command', this.createBrowserToolStub('execute_cdp_command'));
    this.tools.set('list_cdp_commands', this.createBrowserToolStub('list_cdp_commands'));

    // CDP Extraction Tools (2 tools)
    this.tools.set('extract_element_styles_cdp', this.createBrowserToolStub('extract_element_styles_cdp'));
    this.tools.set('extract_complete_element_cdp', this.createBrowserToolStub('extract_complete_element_cdp'));

    // File Operations Tools (2 tools)
    this.tools.set('clone_element_to_file', this.createBrowserToolStub('clone_element_to_file'));
    this.tools.set('extract_complete_element_to_file', this.createBrowserToolStub('extract_complete_element_to_file'));

    console.log('[MCP] Registered 38 browser tools (Phase 1: 6, Phase 2: 3, Phase 3: 2, Phase 4: 22, Phase 5: 5)');
  }

  /**
   * Create a stub handler for browser tools
   * These tools are actually executed by the Jarvis Agent in the main process
   */
  private createBrowserToolStub(toolName: string): ToolHandler {
    return async (args: any, extInfo?: any) => {
      return {
        content: [{
          type: 'text',
          text: `Browser tool ${toolName} is executed by Jarvis Agent. This stub should not be called directly.`
        }],
        extInfo: {
          toolName,
          args,
          note: 'Browser tools are handled by EkoService in electron/main/services/eko-service.ts'
        }
      };
    };
  }

  private registerDefaultTools() {
    // Register browser tools (Phase 1-5)
    this.registerBrowserTools();

    // Douyin related tools
    this.registerTool('get_douyin_download_link', async (args: any) => {
      try {
        const response = await this.callDouyinMcp('get_douyin_download_link', args);
        return response;
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Failed to get Douyin download link: ${error}`
          }]
        };
      }
    });

    this.registerTool('extract_douyin_text', async (args: any) => {
      try {
        const response = await this.callDouyinMcp('extract_douyin_text', args);
        return response;
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Failed to extract Douyin text: ${error}`
          }]
        };
      }
    });

    this.registerTool('parse_douyin_video_info', async (args: any) => {
      try {
        const response = await this.callDouyinMcp('parse_douyin_video_info', args);
        return response;
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Failed to parse Douyin video info: ${error}`
          }]
        };
      }
    });

    // Xiaohongshu related tools
    this.registerTool('extract_xiaohongshu_text', async (args: any) => {
      try {
        const response = await this.callXiaohongshuMcp('extract_xiaohongshu_text', args);
        return response;
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Failed to extract Xiaohongshu video text: ${error}`
          }]
        };
      }
    });
  }

  // Call real douyin service
  private async callDouyinMcp(toolName: string, args: any): Promise<ToolResult> {
    const { DouyinService } = await import('./douyin');

    // Initialize service with Alibaba Cloud Bailian API key from environment
    const douyinService = new DouyinService({
      apiKey: process.env.BAILIAN_API_KEY || ''
    });

    console.log(`Calling real douyin service tool: ${toolName}`, args);

    try {
      if (toolName === 'get_douyin_download_link') {
        const result = await douyinService.getDownloadLink(args.share_link);
        return {
          content: [{
            type: 'text',
            text: `Douyin video parsed successfully!\n\nTitle: ${result.videoInfo.title}\nAuthor: ${result.videoInfo.author}\nDuration: ${result.videoInfo.duration} seconds\n\nWatermark-free download link: ${result.videoUrl}`
          }],
          extInfo: {
            videoInfo: result.videoInfo,
            downloadUrl: result.videoUrl
          }
        };
      }

      if (toolName === 'extract_douyin_text') {
        const text = await douyinService.extractText(args.share_link, args.model);
        return {
          content: [{
            type: 'text',
            text: `Douyin video text extraction successful!\n\nExtracted text content:\n${text}`
          }],
          extInfo: {
            extractedText: text,
            model: args.model || 'paraformer-v2'
          }
        };
      }

      if (toolName === 'parse_douyin_video_info') {
        const videoInfo = await douyinService.getVideoInfo(args.share_link);
        return {
          content: [{
            type: 'text',
            text: `Douyin video info parsed successfully!\n\nVideo ID: ${videoInfo.videoId}\nTitle: ${videoInfo.title}\nAuthor: ${videoInfo.author}\nDuration: ${videoInfo.duration} seconds\nCover: ${videoInfo.cover}`
          }],
          extInfo: {
            videoInfo
          }
        };
      }

      throw new Error(`Unknown douyin tool: ${toolName}`);

    } catch (error) {
      console.error(`Douyin service error for ${toolName}:`, error);
      throw error;
    }
  }

  // Call real xiaohongshu service
  private async callXiaohongshuMcp(toolName: string, args: any): Promise<ToolResult> {
    const { XiaohongshuService } = await import('./xiaohongshu');

    // Initialize service with Alibaba Cloud Bailian API key from environment
    const xiaohongshuService = new XiaohongshuService({
      apiKey: process.env.BAILIAN_API_KEY || ''
    });

    console.log(`Calling xiaohongshu service tool: ${toolName}`, args);

    try {
      if (toolName === 'extract_xiaohongshu_text') {
        const text = await xiaohongshuService.extractText(args.video_url, args.model);
        return {
          content: [{
            type: 'text',
            text: `Xiaohongshu video text extraction successful!\n\nExtracted text content:\n${text}`
          }],
          extInfo: {
            extractedText: text,
            model: args.model || 'sensevoice-v1'
          }
        };
      }

      throw new Error(`Unknown xiaohongshu tool: ${toolName}`);

    } catch (error) {
      console.error(`Xiaohongshu service error for ${toolName}:`, error);
      throw error;
    }
  }
}

// Create global instance
const mcpToolManager = new McpToolManager();

export default mcpToolManager;
export type { ToolSchema, ToolResult }; 