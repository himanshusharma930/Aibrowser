This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where line numbers have been added, security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
assets/
  entitlements.mac.plist
docs/
  CONFIGURATION.md
  CONFIGURATION.zh-CN.md
electron/
  main/
    ipc/
      agent-handlers.ts
      config-handlers.ts
      eko-handlers.ts
      history-handlers.ts
      index.ts
      view-handlers.ts
    services/
      eko-service.ts
      health-checker.ts
      server-manager.ts
      task-scheduler.ts
      task-window-manager.ts
      window-context-manager.ts
    ui/
      menu.ts
      tray.ts
      view.ts
      window.ts
    utils/
      auto-update.ts
      config-manager.ts
      constants.ts
      cookie.ts
      protocol.ts
      reload.ts
      store.ts
    windows/
      main-window.ts
      window-states.ts
    index.ts
    tsconfig.json
    vite.config.ts
  preload/
    index.ts
    tsconfig.json
    view.ts
    vite.config.ts
  renderer/
    loading/
      index.html
      script.js
      style.css
public/
  jsm/
    AmbientLightBg.module.js
src/
  common/
    utils.ts
  components/
    chat/
      ErrorComponents.tsx
      InputComponents.tsx
      MessageComponents.tsx
      ToolComponents.tsx
    fellou/
      AmbientLightBg.tsx
      ChromeBrowserBackground.tsx
      GradientTechBackground.tsx
      utils.ts
    scheduled-task/
      index.tsx
      ScheduleConfigEditor.tsx
      ScheduledTaskListModal.tsx
      ScheduledTaskListPanel.tsx
      ScheduledTaskModal.tsx
      TaskStepEditor.tsx
    AgentConfigModal.tsx
    Header.tsx
    HistoryPanel.tsx
    LanguageSwitcher.tsx
    ModelConfigBar.tsx
    ToolboxPanel.tsx
  config/
    themeConfig.ts
  hooks/
    useLanguage.ts
    useTaskManager.ts
  icons/
    deepfundai-icons.tsx
    scheduled-task-icons.tsx
    source-type-icons.tsx
    tools.tsx
    view-window-edge.tsx
  lib/
    douyin/
      downloader.ts
      index.ts
      parser.ts
      transcriber.ts
    xiaohongshu/
      index.ts
      parser.ts
    capture-feed.ts
    i18n.ts
    mcpTools.ts
    scheduled-task-storage.ts
    speechRecognition.ts
    taskStorage.ts
    ttsPlayer.ts
  locales/
    en-US/
      agent-config.json
      chat.json
      common.json
      fileView.json
      header.json
      history.json
      home.json
      main.json
      modelConfig.json
      scheduledTask.json
      toolbox.json
    zh-CN/
      agent-config.json
      chat.json
      common.json
      fileView.json
      header.json
      history.json
      home.json
      main.json
      modelConfig.json
      scheduledTask.json
      toolbox.json
  models/
    speech-recognition/
      speech-recognition-base.ts
      speech-recognition-microsoft.ts
      speech-recognition-vosk.ts
      speech-recognition-xunfei.ts
    tts-player/
      tts-player-base.ts
      tts-player-microsoft.ts
      tts-player-native.ts
    index.ts
    message.ts
    scheduled-task.ts
    task.ts
  pages/
    api/
      mcp/
        health.ts
        message.ts
        sse.ts
      test/
        test-douyin-real.ts
        test-xiaohongshu.ts
      task-templates.ts
    _app.tsx
    _document.tsx
    agent-config.tsx
    file-view.tsx
    home.tsx
    main.tsx
    toolbox.tsx
  stores/
    historyStore.ts
    languageStore.ts
    scheduled-task-store.ts
  styles/
    globals.css
    markdown.css
  utils/
    http.ts
    messageTransform.ts
    webglDetect.ts
  type.d.ts
.env.template
.gitignore
electron-builder.yml
electron-update.yml
eslint.config.mjs
next.config.js
nodemon.json
package.json
pnpm-workspace.yaml
postcss.config.mjs
README.md
README.zh-CN.md
server.js
server.ts
tsconfig.json
tsconfig.server.json
```

# Files

## File: assets/entitlements.mac.plist
````
 1: <?xml version="1.0" encoding="UTF-8"?>
 2: <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
 3: <plist version="1.0">
 4:   <dict>
 5:     <!-- Allows Just-In-Time compilation required by V8 JavaScript engine in Electron -->
 6:     <key>com.apple.security.cs.allow-jit</key>
 7:     <true/>
 8: 
 9:     <!-- This is needed for the V8 JavaScript engine to function properly -->
10:     <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
11:     <true/>
12: 
13:     <!-- Allows DYLD environment variables (required for some native modules) -->
14:     <key>com.apple.security.cs.allow-dyld-environment-variables</key>
15:     <true/>
16: 
17:     <!-- Disable library validation (allows loading third-party frameworks) -->
18:     <key>com.apple.security.cs.disable-library-validation</key>
19:     <true/>
20: 
21:     <!-- Allows network connections -->
22:     <key>com.apple.security.network.client</key>
23:     <true/>
24: 
25:     <!-- Allows outgoing network connections -->
26:     <key>com.apple.security.network.server</key>
27:     <true/>
28: 
29:     <!-- Allows access to microphone for speech recognition -->
30:     <key>com.apple.security.device.microphone</key>
31:     <true/>
32: 
33:     <!-- Allows access to camera -->
34:     <key>com.apple.security.device.camera</key>
35:     <true/>
36: 
37:     <!-- Allows read and write access to files explicitly selected by the user through system dialogs -->
38:     <key>com.apple.security.files.user-selected.read-write</key>
39:     <true/>
40: 
41:     <!-- Allows read and write access to the user's Downloads directory -->
42:     <key>com.apple.security.files.downloads.read-write</key>
43:     <true/>
44: 
45:     <!-- Allows automation of other apps (for accessibility features like nut.js) -->
46:     <key>com.apple.security.automation.apple-events</key>
47:     <true/>
48:   </dict>
49: </plist>
````

## File: docs/CONFIGURATION.md
````markdown
  1: # Configuration Guide
  2: 
  3: This guide explains how to configure AI models and API keys for the Manus Electron application.
  4: 
  5: ## Configuration Strategy
  6: 
  7: The application supports multiple configuration methods with the following priority:
  8: 
  9: **Priority Order**: User UI Configuration > Environment Variables > Default Values
 10: 
 11: ### Configuration Methods
 12: 
 13: 1. **UI Configuration (Recommended for End Users)**
 14:    - Configure directly in the application settings
 15:    - No need to edit files or restart the app
 16:    - Changes take effect immediately
 17: 
 18: 2. **Environment Variables (For Development)**
 19:    - Uses `.env.local` file in development
 20:    - Uses bundled `.env.production` file in production builds
 21:    - Suitable for developers and automated deployments
 22: 
 23: 3. **Default Values**
 24:    - Built-in fallback values
 25:    - Used when no other configuration is provided
 26: 
 27: ## Supported AI Providers
 28: 
 29: The application supports the following AI providers:
 30: 
 31: | Provider | Models | Get API Key |
 32: |----------|--------|-------------|
 33: | **DeepSeek** | deepseek-chat, deepseek-reasoner | [platform.deepseek.com](https://platform.deepseek.com/api_keys) |
 34: | **Qwen (Alibaba)** | qwen-max, qwen-plus, qwen-vl-max | [bailian.console.aliyun.com](https://bailian.console.aliyun.com/) |
 35: | **Google Gemini** | gemini-1.5-flash, gemini-2.0-flash, gemini-1.5-pro, etc. | [aistudio.google.com](https://aistudio.google.com/app/apikey) |
 36: | **Anthropic Claude** | claude-3.7-sonnet, claude-3.5-sonnet, claude-3-opus, etc. | [console.anthropic.com](https://console.anthropic.com/settings/keys) |
 37: | **OpenRouter** | Multiple providers (Claude, GPT, Gemini, etc.) | [openrouter.ai](https://openrouter.ai/keys) |
 38: 
 39: ## UI Configuration (Recommended)
 40: 
 41: ### Configure AI Provider in the Application
 42: 
 43: 1. **Launch the Application**
 44:    - Open the Manus Electron application
 45: 
 46: 2. **Access Model Settings**
 47:    - On the home page, you'll see the model configuration panel
 48:    - The panel is located above the input area
 49: 
 50: 3. **Select Provider**
 51:    - Click the provider dropdown
 52:    - Choose from: Deepseek, Qwen, Google Gemini, Anthropic, or OpenRouter
 53: 
 54: 4. **Select Model**
 55:    - After selecting a provider, choose your preferred model
 56:    - Different providers offer different models with varying capabilities
 57: 
 58: 5. **Configure API Key**
 59:    - Click "Edit API Key"
 60:    - Enter your API key for the selected provider
 61:    - Click the checkmark to save
 62:    - API key status indicator shows:
 63:      - 🟢 **Set by user**: You configured it in the UI
 64:      - 🟢 **Set via environment variable**: Configured in .env file
 65:      - 🟡 **Not configured**: No API key found
 66: 
 67: 6. **Get API Key**
 68:    - Click "Get API Key" link to open the provider's API key page
 69:    - Sign up or log in to get your API key
 70:    - Copy and paste it into the application
 71: 
 72: ### Configuration Takes Effect Immediately
 73: 
 74: - No need to restart the application
 75: - Changes apply to the next message you send
 76: - All running tasks are terminated when configuration changes
 77: 
 78: ## Environment Variables Setup (For Developers)
 79: 
 80: ### 1. Copy Configuration Template
 81: 
 82: Copy the template file to create your local environment configuration:
 83: 
 84: ```bash
 85: cp .env.template .env.local
 86: ```
 87: 
 88: ### 2. Configure API Keys
 89: 
 90: Edit `.env.local` and fill in your API keys:
 91: 
 92: ```bash
 93: # AI Service API Keys
 94: # ===================
 95: 
 96: # DeepSeek API Configuration
 97: # Get your API key from: https://platform.deepseek.com/api_keys
 98: DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here
 99: DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
100: 
101: # Alibaba Cloud Qwen API Configuration
102: # Get your API key from: https://bailian.console.aliyun.com/
103: QWEN_API_KEY=your_actual_qwen_api_key_here
104: 
105: # Google Gemini API Configuration
106: # Get your API key from: https://aistudio.google.com/app/apikey
107: GOOGLE_API_KEY=your_actual_google_api_key_here
108: 
109: # Anthropic Claude API Configuration
110: # Get your API key from: https://console.anthropic.com/settings/keys
111: ANTHROPIC_API_KEY=your_actual_anthropic_api_key_here
112: 
113: # OpenRouter API Configuration (supports multiple providers)
114: # Get your API key from: https://openrouter.ai/keys
115: OPENROUTER_API_KEY=your_actual_openrouter_api_key_here
116: 
117: # Text-to-Speech Configuration
118: TTS_REGION=eastasia
119: TTS_KEY=your_actual_tts_key_here
120: 
121: # Application Settings
122: # ===================
123: 
124: # Screenshot settings
125: EKO_SCREENSHOT_SCALE=0.5
126: # Alternative: use maximum width for proportional scaling
127: # EKO_SCREENSHOT_MAX_WIDTH=1280
128: 
129: # Development Settings
130: # ===================
131: 
132: # Next.js development settings
133: NEXT_PUBLIC_APP_ENV=development
134: 
135: # Electron settings
136: ELECTRON_IS_DEV=true
137: ```
138: 
139: ## Model Capabilities & Token Limits
140: 
141: Different models have different maximum token limits:
142: 
143: | Model | Provider | Max Tokens | Best For |
144: |-------|----------|------------|----------|
145: | deepseek-reasoner | DeepSeek | 65,536 | Complex reasoning tasks |
146: | claude-3-7-sonnet | Anthropic | 128,000 | Long-context tasks |
147: | gemini-2.0-flash-thinking | Google | 65,536 | Reasoning with multimodal |
148: | deepseek-chat | DeepSeek | 8,192 | General tasks |
149: | qwen-max | Qwen | 8,192 | Chinese language tasks |
150: | claude-3.5-sonnet | Anthropic | 8,000 | Balanced performance |
151: 
152: The application automatically configures the correct token limit based on your selected model.
153: 
154: ## Security Notes
155: 
156: - **Never commit actual API keys** to version control
157: - Use `.env.local` for local development (already in `.gitignore`)
158: - User-configured API keys are stored securely in electron-store (encrypted)
159: - All hardcoded API keys have been removed from source code
160: - Configuration template provides placeholder values for security
161: 
162: ## Configuration Priority Examples
163: 
164: ### Example 1: User Configuration Overrides Environment Variable
165: 
166: ```
167: User UI: DEEPSEEK_API_KEY = "sk-user-key"
168: .env.local: DEEPSEEK_API_KEY = "sk-env-key"
169: Result: Uses "sk-user-key"
170: ```
171: 
172: ### Example 2: Environment Variable as Fallback
173: 
174: ```
175: User UI: DEEPSEEK_API_KEY = (not set)
176: .env.local: DEEPSEEK_API_KEY = "sk-env-key"
177: Result: Uses "sk-env-key"
178: ```
179: 
180: ### Example 3: Default Values
181: 
182: ```
183: User UI: DEEPSEEK_API_KEY = (not set)
184: .env.local: DEEPSEEK_API_KEY = (not set)
185: Result: No API key, will show error when trying to use
186: ```
187: 
188: ## Development Workflow
189: 
190: ### For End Users
191: 1. Launch the application
192: 2. Click provider dropdown on home page
193: 3. Select your preferred AI provider
194: 4. Enter API key in the UI
195: 5. Start chatting!
196: 
197: ### For Developers
198: 1. Copy `.env.template` to `.env.local`
199: 2. Fill in your actual API keys in `.env.local`
200: 3. Restart the development server if it's running
201: 4. The application will automatically use the environment variables
202: 5. Can override specific keys in the UI if needed
203: 
204: ## Production Deployment
205: 
206: ### For Desktop Application Build
207: 
208: **Option 1: Bundle API Keys (Not Recommended for Distribution)**
209: 
210: Before building the desktop application, configure the `.env.production` file:
211: 
212: ```bash
213: # Edit production configuration file
214: # Replace all placeholder API keys with actual values
215: ```
216: 
217: Then build the application:
218: 
219: ```bash
220: npm run build
221: ```
222: 
223: The `.env.production` file will be bundled with the application.
224: 
225: **Option 2: User Configuration (Recommended)**
226: 
227: Build the application without API keys:
228: 
229: ```bash
230: npm run build
231: ```
232: 
233: End users will configure their own API keys in the UI after installation.
234: 
235: ## Troubleshooting
236: 
237: ### UI Configuration Issues
238: 
239: **Problem**: API key status shows "Not configured"
240: - **Solution**: Click "Edit API Key" and enter your API key
241: - Verify you clicked the checkmark to save
242: 
243: **Problem**: Changes not taking effect
244: - **Solution**: Configuration reloads automatically
245: - Check console for error messages
246: - Try selecting a different model and switching back
247: 
248: **Problem**: Can't find the configuration panel
249: - **Solution**: The model configuration panel is on the home page, above the input area
250: - Make sure you're on the home page, not in a chat session
251: 
252: ### API Key Errors
253: 
254: **Problem**: "API key is invalid" error
255: - **Solution**:
256:   - Verify you copied the complete API key
257:   - Check that the API key is active in the provider's dashboard
258:   - Ensure you have sufficient credits/quota
259: 
260: **Problem**: "Cannot connect to API" error
261: - **Solution**:
262:   - Check your internet connection
263:   - Verify the API provider's service is operational
264:   - Try a different provider to isolate the issue
265: 
266: ### Development Environment
267: 
268: If you encounter API key errors in development:
269: 1. Check that all required API keys are set in `.env.local`
270: 2. Verify API keys are valid and have sufficient quota
271: 3. Restart the development server after changing environment variables
272: 4. Check browser console and terminal for specific error messages
273: 
274: ### Common Issues
275: 
276: - **Configuration not saving**: Check electron-store permissions
277: - **API authentication errors**: Verify API keys are correct and have proper permissions
278: - **Model not available**: Some providers may have regional restrictions
279: - **Rate limiting**: You may have exceeded the API provider's rate limits
````

## File: docs/CONFIGURATION.zh-CN.md
````markdown
  1: # 配置指南
  2: 
  3: 本指南介绍如何为 Manus Electron 应用配置 AI 模型和 API 密钥。
  4: 
  5: ## 配置策略
  6: 
  7: 应用支持多种配置方式，优先级如下：
  8: 
  9: **优先级顺序**：用户 UI 配置 > 环境变量 > 默认值
 10: 
 11: ### 配置方式
 12: 
 13: 1. **UI 配置（推荐给终端用户）**
 14:    - 直接在应用设置中配置
 15:    - 无需编辑文件或重启应用
 16:    - 配置立即生效
 17: 
 18: 2. **环境变量（适合开发者）**
 19:    - 开发环境使用 `.env.local` 文件
 20:    - 生产构建使用打包的 `.env.production` 文件
 21:    - 适合开发者和自动化部署
 22: 
 23: 3. **默认值**
 24:    - 内置的后备值
 25:    - 在没有其他配置时使用
 26: 
 27: ## 支持的 AI 提供商
 28: 
 29: 应用支持以下 AI 提供商：
 30: 
 31: | 提供商 | 模型 | 获取 API 密钥 |
 32: |--------|------|--------------|
 33: | **DeepSeek** | deepseek-chat, deepseek-reasoner | [platform.deepseek.com](https://platform.deepseek.com/api_keys) |
 34: | **Qwen (阿里云)** | qwen-max, qwen-plus, qwen-vl-max | [bailian.console.aliyun.com](https://bailian.console.aliyun.com/) |
 35: | **Google Gemini** | gemini-1.5-flash, gemini-2.0-flash, gemini-1.5-pro 等 | [aistudio.google.com](https://aistudio.google.com/app/apikey) |
 36: | **Anthropic Claude** | claude-3.7-sonnet, claude-3.5-sonnet, claude-3-opus 等 | [console.anthropic.com](https://console.anthropic.com/settings/keys) |
 37: | **OpenRouter** | 多个提供商（Claude, GPT, Gemini 等） | [openrouter.ai](https://openrouter.ai/keys) |
 38: 
 39: ## UI 配置（推荐）
 40: 
 41: ### 在应用中配置 AI 提供商
 42: 
 43: 1. **启动应用**
 44:    - 打开 Manus Electron 应用
 45: 
 46: 2. **访问模型设置**
 47:    - 在首页，你会看到模型配置面板
 48:    - 面板位于输入框上方
 49: 
 50: 3. **选择提供商**
 51:    - 点击提供商下拉菜单
 52:    - 从以下选项中选择：Deepseek、Qwen、Google Gemini、Anthropic 或 OpenRouter
 53: 
 54: 4. **选择模型**
 55:    - 选择提供商后，选择你偏好的模型
 56:    - 不同提供商提供不同能力的模型
 57: 
 58: 5. **配置 API 密钥**
 59:    - 点击"编辑 API 密钥"
 60:    - 输入所选提供商的 API 密钥
 61:    - 点击对勾保存
 62:    - API 密钥状态指示器显示：
 63:      - 🟢 **用户设置**：你在 UI 中配置的
 64:      - 🟢 **环境变量设置**：在 .env 文件中配置的
 65:      - 🟡 **未配置**：未找到 API 密钥
 66: 
 67: 6. **获取 API 密钥**
 68:    - 点击"获取 API 密钥"链接打开提供商的 API 密钥页面
 69:    - 注册或登录以获取你的 API 密钥
 70:    - 复制并粘贴到应用中
 71: 
 72: ### 配置立即生效
 73: 
 74: - 无需重启应用
 75: - 更改将应用于你发送的下一条消息
 76: - 配置更改时所有运行中的任务将被终止
 77: 
 78: ## 环境变量配置（适合开发者）
 79: 
 80: ### 1. 复制配置模板
 81: 
 82: 复制模板文件以创建本地环境配置：
 83: 
 84: ```bash
 85: cp .env.template .env.local
 86: ```
 87: 
 88: ### 2. 配置 API 密钥
 89: 
 90: 编辑 `.env.local` 并填入你的 API 密钥：
 91: 
 92: ```bash
 93: # AI 服务 API 密钥
 94: # ===================
 95: 
 96: # DeepSeek API 配置
 97: # 从这里获取 API 密钥：https://platform.deepseek.com/api_keys
 98: DEEPSEEK_API_KEY=你的_deepseek_api_密钥
 99: DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
100: 
101: # 阿里云通义千问 API 配置
102: # 从这里获取 API 密钥：https://bailian.console.aliyun.com/
103: QWEN_API_KEY=你的_qwen_api_密钥
104: 
105: # Google Gemini API 配置
106: # 从这里获取 API 密钥：https://aistudio.google.com/app/apikey
107: GOOGLE_API_KEY=你的_google_api_密钥
108: 
109: # Anthropic Claude API 配置
110: # 从这里获取 API 密钥：https://console.anthropic.com/settings/keys
111: ANTHROPIC_API_KEY=你的_anthropic_api_密钥
112: 
113: # OpenRouter API 配置（支持多个提供商）
114: # 从这里获取 API 密钥：https://openrouter.ai/keys
115: OPENROUTER_API_KEY=你的_openrouter_api_密钥
116: 
117: # 语音转文字配置
118: TTS_REGION=eastasia
119: TTS_KEY=你的_tts_密钥
120: 
121: # 应用设置
122: # ===================
123: 
124: # 截图设置
125: EKO_SCREENSHOT_SCALE=0.5
126: # 或者使用最大宽度进行比例缩放
127: # EKO_SCREENSHOT_MAX_WIDTH=1280
128: 
129: # 开发设置
130: # ===================
131: 
132: # Next.js 开发设置
133: NEXT_PUBLIC_APP_ENV=development
134: 
135: # Electron 设置
136: ELECTRON_IS_DEV=true
137: ```
138: 
139: ## 模型能力与 Token 限制
140: 
141: 不同模型有不同的最大 token 限制：
142: 
143: | 模型 | 提供商 | 最大 Tokens | 最适合 |
144: |------|--------|-------------|--------|
145: | deepseek-reasoner | DeepSeek | 65,536 | 复杂推理任务 |
146: | claude-3-7-sonnet | Anthropic | 128,000 | 长文本任务 |
147: | gemini-2.0-flash-thinking | Google | 65,536 | 多模态推理 |
148: | deepseek-chat | DeepSeek | 8,192 | 通用任务 |
149: | qwen-max | Qwen | 8,192 | 中文任务 |
150: | claude-3.5-sonnet | Anthropic | 8,000 | 平衡性能 |
151: 
152: 应用会根据你选择的模型自动配置正确的 token 限制。
153: 
154: ## 安全注意事项
155: 
156: - **永远不要将实际的 API 密钥提交到版本控制**
157: - 本地开发使用 `.env.local`（已在 `.gitignore` 中）
158: - 用户配置的 API 密钥安全存储在 electron-store 中（已加密）
159: - 所有硬编码的 API 密钥已从源代码中删除
160: - 配置模板提供占位符值以确保安全
161: 
162: ## 配置优先级示例
163: 
164: ### 示例 1：用户配置覆盖环境变量
165: 
166: ```
167: 用户 UI：DEEPSEEK_API_KEY = "sk-user-key"
168: .env.local：DEEPSEEK_API_KEY = "sk-env-key"
169: 结果：使用 "sk-user-key"
170: ```
171: 
172: ### 示例 2：环境变量作为后备
173: 
174: ```
175: 用户 UI：DEEPSEEK_API_KEY =（未设置）
176: .env.local：DEEPSEEK_API_KEY = "sk-env-key"
177: 结果：使用 "sk-env-key"
178: ```
179: 
180: ### 示例 3：默认值
181: 
182: ```
183: 用户 UI：DEEPSEEK_API_KEY =（未设置）
184: .env.local：DEEPSEEK_API_KEY =（未设置）
185: 结果：没有 API 密钥，尝试使用时会显示错误
186: ```
187: 
188: ## 开发工作流程
189: 
190: ### 终端用户
191: 1. 启动应用
192: 2. 在首页点击提供商下拉菜单
193: 3. 选择你偏好的 AI 提供商
194: 4. 在 UI 中输入 API 密钥
195: 5. 开始聊天！
196: 
197: ### 开发者
198: 1. 复制 `.env.template` 到 `.env.local`
199: 2. 在 `.env.local` 中填入你的实际 API 密钥
200: 3. 如果开发服务器正在运行，重启它
201: 4. 应用将自动使用环境变量
202: 5. 如需要，可在 UI 中覆盖特定密钥
203: 
204: ## 生产部署
205: 
206: ### 桌面应用构建
207: 
208: **选项 1：打包 API 密钥（不推荐用于分发）**
209: 
210: 在构建桌面应用前，配置 `.env.production` 文件：
211: 
212: ```bash
213: # 编辑生产配置文件
214: # 将所有占位符 API 密钥替换为实际值
215: ```
216: 
217: 然后构建应用：
218: 
219: ```bash
220: npm run build
221: ```
222: 
223: `.env.production` 文件将被打包到应用中。
224: 
225: **选项 2：用户配置（推荐）**
226: 
227: 不带 API 密钥构建应用：
228: 
229: ```bash
230: npm run build
231: ```
232: 
233: 终端用户在安装后会在 UI 中配置自己的 API 密钥。
234: 
235: ## 故障排除
236: 
237: ### UI 配置问题
238: 
239: **问题**：API 密钥状态显示"未配置"
240: - **解决方案**：点击"编辑 API 密钥"并输入你的 API 密钥
241: - 确认你点击了对勾保存
242: 
243: **问题**：更改未生效
244: - **解决方案**：配置会自动重新加载
245: - 检查控制台是否有错误消息
246: - 尝试选择不同的模型然后切换回来
247: 
248: **问题**：找不到配置面板
249: - **解决方案**：模型配置面板在首页，输入框上方
250: - 确保你在首页，而不是在聊天会话中
251: 
252: ### API 密钥错误
253: 
254: **问题**："API 密钥无效"错误
255: - **解决方案**：
256:   - 确认你复制了完整的 API 密钥
257:   - 检查 API 密钥在提供商的控制台中是否激活
258:   - 确保你有足够的额度/配额
259: 
260: **问题**："无法连接到 API"错误
261: - **解决方案**：
262:   - 检查你的网络连接
263:   - 确认 API 提供商的服务正常运行
264:   - 尝试不同的提供商以隔离问题
265: 
266: ### 开发环境
267: 
268: 如果在开发中遇到 API 密钥错误：
269: 1. 检查所有必需的 API 密钥是否在 `.env.local` 中设置
270: 2. 确认 API 密钥有效且有足够的配额
271: 3. 更改环境变量后重启开发服务器
272: 4. 检查浏览器控制台和终端的具体错误消息
273: 
274: ### 常见问题
275: 
276: - **配置无法保存**：检查 electron-store 权限
277: - **API 认证错误**：确认 API 密钥正确且有适当权限
278: - **模型不可用**：某些提供商可能有地区限制
279: - **速率限制**：你可能超过了 API 提供商的速率限制
````

## File: electron/main/ipc/agent-handlers.ts
````typescript
  1: import { ipcMain } from 'electron';
  2: import { ConfigManager } from '../utils/config-manager';
  3: import { windowContextManager } from '../services/window-context-manager';
  4: import mcpToolManager from '../../../src/lib/mcpTools';
  5: 
  6: /**
  7:  * Register agent configuration related IPC handlers
  8:  */
  9: export function registerAgentHandlers() {
 10:   const configManager = ConfigManager.getInstance();
 11: 
 12:   /**
 13:    * Get agent configuration
 14:    */
 15:   ipcMain.handle('agent:get-config', async () => {
 16:     try {
 17:       const agentConfig = configManager.getAgentConfig();
 18:       return { success: true, data: agentConfig };
 19:     } catch (error: any) {
 20:       console.error('Failed to get agent config:', error);
 21:       return { success: false, error: error.message };
 22:     }
 23:   });
 24: 
 25:   /**
 26:    * Save agent configuration and reload all EkoServices
 27:    */
 28:   ipcMain.handle('agent:save-config', async (_, config) => {
 29:     try {
 30:       configManager.saveAgentConfig(config);
 31: 
 32:       // Reload all window contexts
 33:       const contexts = windowContextManager.getAllContexts();
 34:       contexts.forEach(context => {
 35:         if (context.ekoService) {
 36:           context.ekoService.reloadConfig();
 37:         }
 38:       });
 39: 
 40:       return { success: true };
 41:     } catch (error: any) {
 42:       console.error('Failed to save agent config:', error);
 43:       return { success: false, error: error.message };
 44:     }
 45:   });
 46: 
 47:   /**
 48:    * Get all available MCP tools with their status
 49:    */
 50:   ipcMain.handle('agent:get-mcp-tools', async () => {
 51:     try {
 52:       // Get all tools with their enabled status
 53:       const tools = mcpToolManager.getAllToolsWithStatus();
 54:       return { success: true, data: tools };
 55:     } catch (error: any) {
 56:       console.error('Failed to get MCP tools:', error);
 57:       return { success: false, error: error.message };
 58:     }
 59:   });
 60: 
 61:   /**
 62:    * Update MCP tool enabled status
 63:    */
 64:   ipcMain.handle('agent:set-mcp-tool-enabled', async (_, toolName: string, enabled: boolean) => {
 65:     try {
 66:       // Update tool status in McpToolManager
 67:       mcpToolManager.setToolEnabled(toolName, enabled);
 68: 
 69:       // Update config in ConfigManager
 70:       configManager.setMcpToolConfig(toolName, { enabled });
 71: 
 72:       return { success: true };
 73:     } catch (error: any) {
 74:       console.error('Failed to set MCP tool status:', error);
 75:       return { success: false, error: error.message };
 76:     }
 77:   });
 78: 
 79:   /**
 80:    * Reload agent configuration from storage
 81:    */
 82:   ipcMain.handle('agent:reload-config', async () => {
 83:     try {
 84:       // Get latest config
 85:       const agentConfig = configManager.getAgentConfig();
 86: 
 87:       // Update MCP tools status
 88:       const availableTools = mcpToolManager.getAllToolNames();
 89:       availableTools.forEach(toolName => {
 90:         const toolConfig = agentConfig.mcpTools[toolName];
 91:         if (toolConfig !== undefined) {
 92:           mcpToolManager.setToolEnabled(toolName, toolConfig.enabled);
 93:         }
 94:       });
 95: 
 96:       // Reload all EkoServices
 97:       const contexts = windowContextManager.getAllContexts();
 98:       contexts.forEach(context => {
 99:         if (context.ekoService) {
100:           context.ekoService.reloadConfig();
101:         }
102:       });
103: 
104:       return { success: true, data: agentConfig };
105:     } catch (error: any) {
106:       console.error('Failed to reload agent config:', error);
107:       return { success: false, error: error.message };
108:     }
109:   });
110: 
111:   console.log('[IPC] Agent configuration handlers registered');
112: }
````

## File: electron/main/ipc/config-handlers.ts
````typescript
  1: import { ipcMain } from "electron";
  2: import { ConfigManager, type UserModelConfigs, type ProviderType } from "../utils/config-manager";
  3: import { windowContextManager } from "../services/window-context-manager";
  4: import { store } from "../utils/store";
  5: 
  6: /**
  7:  * Register all configuration-related IPC handlers
  8:  */
  9: export function registerConfigHandlers() {
 10:   // Get user model configurations
 11:   ipcMain.handle('config:get-user-configs', async () => {
 12:     try {
 13:       const configManager = ConfigManager.getInstance();
 14:       return configManager.getUserModelConfigs();
 15:     } catch (error: any) {
 16:       console.error('IPC config:get-user-configs error:', error);
 17:       throw error;
 18:     }
 19:   });
 20: 
 21:   // Save user model configurations
 22:   ipcMain.handle('config:save-user-configs', async (_event, configs: UserModelConfigs) => {
 23:     try {
 24:       const configManager = ConfigManager.getInstance();
 25:       configManager.saveUserModelConfigs(configs);
 26: 
 27:       // Reload EkoService configuration for all windows
 28:       const contexts = windowContextManager.getAllContexts();
 29:       contexts.forEach(context => {
 30:         if (context.ekoService) {
 31:           context.ekoService.reloadConfig();
 32:         }
 33:       });
 34: 
 35:       return { success: true };
 36:     } catch (error: any) {
 37:       console.error('IPC config:save-user-configs error:', error);
 38:       throw error;
 39:     }
 40:   });
 41: 
 42:   // Get model configuration for specific provider
 43:   ipcMain.handle('config:get-model-config', async (_event, provider: ProviderType) => {
 44:     try {
 45:       const configManager = ConfigManager.getInstance();
 46:       return configManager.getModelConfig(provider);
 47:     } catch (error: any) {
 48:       console.error('IPC config:get-model-config error:', error);
 49:       throw error;
 50:     }
 51:   });
 52: 
 53:   // Get API key source (user/env/none)
 54:   ipcMain.handle('config:get-api-key-source', async (_event, provider: ProviderType) => {
 55:     try {
 56:       const configManager = ConfigManager.getInstance();
 57:       return configManager.getApiKeySource(provider);
 58:     } catch (error: any) {
 59:       console.error('IPC config:get-api-key-source error:', error);
 60:       throw error;
 61:     }
 62:   });
 63: 
 64:   // Get selected provider
 65:   ipcMain.handle('config:get-selected-provider', async () => {
 66:     try {
 67:       const configManager = ConfigManager.getInstance();
 68:       return configManager.getSelectedProvider();
 69:     } catch (error: any) {
 70:       console.error('IPC config:get-selected-provider error:', error);
 71:       throw error;
 72:     }
 73:   });
 74: 
 75:   // Set selected provider
 76:   ipcMain.handle('config:set-selected-provider', async (_event, provider: ProviderType) => {
 77:     try {
 78:       const configManager = ConfigManager.getInstance();
 79:       configManager.setSelectedProvider(provider);
 80: 
 81:       // Reload EkoService configuration for all windows
 82:       const contexts = windowContextManager.getAllContexts();
 83:       contexts.forEach(context => {
 84:         if (context.ekoService) {
 85:           context.ekoService.reloadConfig();
 86:         }
 87:       });
 88: 
 89:       return { success: true };
 90:     } catch (error: any) {
 91:       console.error('IPC config:set-selected-provider error:', error);
 92:       throw error;
 93:     }
 94:   });
 95: 
 96:   // Get saved language preference
 97:   ipcMain.handle('config:get-language', async () => {
 98:     try {
 99:       const language = store.get('app.language', 'en-US');
100:       return language;
101:     } catch (error: any) {
102:       console.error('IPC config:get-language error:', error);
103:       return 'en-US';
104:     }
105:   });
106: 
107:   // Handle language change notification from renderer
108:   ipcMain.handle('language-changed', async (_event, language: string) => {
109:     try {
110:       // Store language preference in electron-store
111:       store.set('app.language', language);
112:       console.log(`[IPC] Language changed to: ${language}`);
113:       return { success: true };
114:     } catch (error: any) {
115:       console.error('IPC language-changed error:', error);
116:       throw error;
117:     }
118:   });
119: 
120:   console.log('[IPC] Configuration handlers registered');
121: }
````

## File: electron/main/ipc/eko-handlers.ts
````typescript
 1: import { ipcMain } from "electron";
 2: import { windowContextManager } from "../services/window-context-manager";
 3: 
 4: /**
 5:  * Register all Eko service related IPC handlers
 6:  * All handlers support window isolation through windowContextManager
 7:  */
 8: export function registerEkoHandlers() {
 9:   // Run new task
10:   ipcMain.handle('eko:run', async (event, message: string) => {
11:     const context = windowContextManager.getContext(event.sender.id);
12:     if (!context || !context.ekoService) {
13:       throw new Error('EkoService not found for this window');
14:     }
15:     return await context.ekoService.run(message);
16:   });
17: 
18:   // Modify existing task
19:   ipcMain.handle('eko:modify', async (event, taskId: string, message: string) => {
20:     try {
21:       console.log('IPC eko:modify received:', taskId, message);
22:       const context = windowContextManager.getContext(event.sender.id);
23:       if (!context || !context.ekoService) {
24:         throw new Error('EkoService not found for this window');
25:       }
26:       return await context.ekoService.modify(taskId, message);
27:     } catch (error: any) {
28:       console.error('IPC eko:modify error:', error);
29:       throw error;
30:     }
31:   });
32: 
33:   // Execute task
34:   ipcMain.handle('eko:execute', async (event, taskId: string) => {
35:     try {
36:       console.log('IPC eko:execute received:', taskId);
37:       const context = windowContextManager.getContext(event.sender.id);
38:       if (!context || !context.ekoService) {
39:         throw new Error('EkoService not found for this window');
40:       }
41:       return await context.ekoService.execute(taskId);
42:     } catch (error: any) {
43:       console.error('IPC eko:execute error:', error);
44:       throw error;
45:     }
46:   });
47: 
48:   // Get task status
49:   ipcMain.handle('eko:getTaskStatus', async (event, taskId: string) => {
50:     try {
51:       console.log('IPC eko:getTaskStatus received:', taskId);
52:       const context = windowContextManager.getContext(event.sender.id);
53:       if (!context || !context.ekoService) {
54:         throw new Error('EkoService not found for this window');
55:       }
56:       return await context.ekoService.getTaskStatus(taskId);
57:     } catch (error: any) {
58:       console.error('IPC eko:getTaskStatus error:', error);
59:       throw error;
60:     }
61:   });
62: 
63:   // Cancel task
64:   ipcMain.handle('eko:cancel-task', async (event, taskId: string) => {
65:     try {
66:       console.log('IPC eko:cancel-task received:', taskId);
67:       const context = windowContextManager.getContext(event.sender.id);
68:       if (!context || !context.ekoService) {
69:         throw new Error('EkoService not found for this window');
70:       }
71:       const result = await context.ekoService.cancleTask(taskId);
72:       return { success: true, result };
73:     } catch (error: any) {
74:       console.error('IPC eko:cancel-task error:', error);
75:       throw error;
76:     }
77:   });
78: 
79:   console.log('[IPC] Eko service handlers registered');
80: }
````

## File: electron/main/ipc/history-handlers.ts
````typescript
  1: import { ipcMain, WebContentsView } from "electron";
  2: import { windowContextManager } from "../services/window-context-manager";
  3: import { taskWindowManager } from "../services/task-window-manager";
  4: 
  5: /**
  6:  * Register all history related IPC handlers
  7:  * Handles history view display and task history window management
  8:  * All handlers support window isolation through windowContextManager
  9:  */
 10: export function registerHistoryHandlers() {
 11:   // Show history view with screenshot
 12:   ipcMain.handle('show-history-view', async (event, screenshot: string) => {
 13:     try {
 14:       console.log('IPC show-history-view received');
 15:       const context = windowContextManager.getContext(event.sender.id);
 16:       if (!context) {
 17:         throw new Error('Window context not found');
 18:       }
 19: 
 20:       // Create history view
 21:       if (context.historyView) {
 22:         context.window.contentView.removeChildView(context.historyView);
 23:       }
 24: 
 25:       context.historyView = new WebContentsView();
 26: 
 27:       // Load screenshot content
 28:       const htmlContent = `
 29:         <html>
 30:           <head>
 31:             <style>
 32:               body { margin: 0; padding: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh; }
 33:               img { max-width: 100%; max-height: 100%; object-fit: contain; }
 34:             </style>
 35:           </head>
 36:           <body>
 37:             <img src="${screenshot}" alt="Historical screenshot" />
 38:           </body>
 39:         </html>
 40:       `;
 41: 
 42:       await context.historyView.webContents.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`);
 43: 
 44:       // Set history view position (overlay detail panel position)
 45:       context.window.contentView.addChildView(context.historyView);
 46:       context.historyView.setBounds({
 47:         x: 818,
 48:         y: 264,
 49:         width: 748,
 50:         height: 560,
 51:       });
 52: 
 53:       return { success: true };
 54:     } catch (error: any) {
 55:       console.error('IPC show-history-view error:', error);
 56:       throw error;
 57:     }
 58:   });
 59: 
 60:   // Hide history view
 61:   ipcMain.handle('hide-history-view', async (event) => {
 62:     try {
 63:       console.log('IPC hide-history-view received');
 64:       const context = windowContextManager.getContext(event.sender.id);
 65:       if (context && context.historyView) {
 66:         context.window.contentView.removeChildView(context.historyView);
 67:         context.historyView = null;
 68:       }
 69:       return { success: true };
 70:     } catch (error: any) {
 71:       console.error('IPC hide-history-view error:', error);
 72:       throw error;
 73:     }
 74:   });
 75: 
 76:   // Open task history window
 77:   ipcMain.handle('open-task-history', async (_event, taskId: string) => {
 78:     try {
 79:       console.log('[IPC] open-task-history received:', taskId);
 80: 
 81:       // Check if task window already exists
 82:       let taskWindow = taskWindowManager.getTaskWindow(taskId);
 83: 
 84:       if (taskWindow) {
 85:         // Window exists, activate it
 86:         console.log('[IPC] Task window exists, activating window');
 87:         taskWindow.window.show();
 88:         taskWindow.window.focus();
 89:       } else {
 90:         // Window doesn't exist, create new window
 91:         console.log('[IPC] Task window does not exist, creating new window');
 92: 
 93:         // Generate new executionId (for creating window, won't execute task immediately)
 94:         const executionId = `view_history_${Date.now()}`;
 95: 
 96:         // Create task window
 97:         taskWindow = await taskWindowManager.createTaskWindow(taskId, executionId);
 98:       }
 99: 
100:       // Wait for window content to load, then send open history panel event
101:       setTimeout(() => {
102:         taskWindow!.window.webContents.send('open-history-panel', { taskId });
103:         console.log('[IPC] Sent open-history-panel event to task window');
104:       }, 1000); // Delay 1 second to ensure page is loaded
105: 
106:       return { success: true };
107:     } catch (error: any) {
108:       console.error('[IPC] open-task-history error:', error);
109:       throw error;
110:     }
111:   });
112: 
113:   console.log('[IPC] History handlers registered');
114: }
````

## File: electron/main/ipc/index.ts
````typescript
 1: import { registerEkoHandlers } from "./eko-handlers";
 2: import { registerViewHandlers } from "./view-handlers";
 3: import { registerHistoryHandlers } from "./history-handlers";
 4: import { registerConfigHandlers } from "./config-handlers";
 5: import { registerAgentHandlers } from "./agent-handlers";
 6: 
 7: /**
 8:  * Register all IPC handlers
 9:  * Centralized registration point for all IPC communication handlers
10:  */
11: export function registerAllIpcHandlers() {
12:   registerEkoHandlers();
13:   registerViewHandlers();
14:   registerHistoryHandlers();
15:   registerConfigHandlers();
16:   registerAgentHandlers();
17: 
18:   console.log('[IPC] All IPC handlers registered successfully');
19: }
20: 
21: // Export individual registration functions for selective use if needed
22: export {
23:   registerEkoHandlers,
24:   registerViewHandlers,
25:   registerHistoryHandlers,
26:   registerConfigHandlers,
27:   registerAgentHandlers
28: };
````

## File: electron/main/ipc/view-handlers.ts
````typescript
 1: import { ipcMain } from "electron";
 2: import { windowContextManager } from "../services/window-context-manager";
 3: 
 4: /**
 5:  * Register all view control related IPC handlers
 6:  * Handles screenshot, visibility control, and URL operations
 7:  * All handlers support window isolation through windowContextManager
 8:  */
 9: export function registerViewHandlers() {
10:   // Get main view screenshot
11:   ipcMain.handle('get-main-view-screenshot', async (event) => {
12:     const context = windowContextManager.getContext(event.sender.id);
13:     if (!context || !context.detailView) {
14:       throw new Error('DetailView not found for this window');
15:     }
16: 
17:     const image = await context.detailView.webContents.capturePage();
18:     return {
19:       imageBase64: image.toDataURL(),
20:       imageType: "image/jpeg",
21:     };
22:   });
23: 
24:   // Set detail view visibility
25:   ipcMain.handle('set-detail-view-visible', async (event, visible: boolean) => {
26:     try {
27:       console.log('IPC set-detail-view-visible received:', visible);
28:       const context = windowContextManager.getContext(event.sender.id);
29:       if (!context || !context.detailView) {
30:         throw new Error('DetailView not found for this window');
31:       }
32: 
33:       context.detailView.setVisible(visible);
34: 
35:       return { success: true, visible };
36:     } catch (error: any) {
37:       console.error('IPC set-detail-view-visible error:', error);
38:       throw error;
39:     }
40:   });
41: 
42:   // Get current URL from detail view
43:   ipcMain.handle('get-current-url', async (event) => {
44:     try {
45:       console.log('IPC get-current-url received');
46:       const context = windowContextManager.getContext(event.sender.id);
47:       if (!context || !context.detailView) {
48:         return '';
49:       }
50:       return context.detailView.webContents.getURL();
51:     } catch (error: any) {
52:       console.error('IPC get-current-url error:', error);
53:       return '';
54:     }
55:   });
56: 
57:   console.log('[IPC] View control handlers registered');
58: }
````

## File: electron/main/services/eko-service.ts
````typescript
  1: import { Eko, Log, SimpleSseMcpClient, type LLMs, type StreamCallbackMessage } from "@jarvis-agent/core";
  2: import { BrowserAgent, FileAgent } from "@jarvis-agent/electron";
  3: import type { EkoResult } from "@jarvis-agent/core/types";
  4: import { BrowserWindow, WebContentsView, app } from "electron";
  5: import path from "node:path";
  6: import { ConfigManager } from "../utils/config-manager";
  7: 
  8: export class EkoService {
  9:   private eko: Eko | null = null;
 10:   private mainWindow: BrowserWindow;
 11:   private detailView: WebContentsView;
 12:   private mcpClient!: SimpleSseMcpClient;
 13:   private agents!: any[];
 14: 
 15:   constructor(mainWindow: BrowserWindow, detailView: WebContentsView) {
 16:     this.mainWindow = mainWindow;
 17:     this.detailView = detailView;
 18:     this.initializeEko();
 19:   }
 20: 
 21:   /**
 22:    * Create stream callback handler
 23:    */
 24:   private createCallback() {
 25:     return {
 26:       onMessage: (message: StreamCallbackMessage): Promise<void> => {
 27:         Log.info('EkoService stream callback:', message);
 28: 
 29:         // Window destroyed, return directly to avoid errors
 30:         if (!this.mainWindow || this.mainWindow.isDestroyed()) {
 31:           Log.warn('Main window destroyed, skipping message processing');
 32:           return Promise.resolve();
 33:         }
 34: 
 35:         return new Promise((resolve) => {
 36:            // Send stream message to renderer process via IPC
 37:         this.mainWindow.webContents.send('eko-stream-message', message);
 38: 
 39:         // When file is modified, main view window loads file content display page
 40:         if (message.type === 'tool_streaming' && message.toolName === 'file_write') {
 41: 
 42:           let args;
 43:           try {
 44:             args = JSON.parse(message.paramsText);
 45:           } catch (error) {
 46:             Log.error('File stream incomplete! Need to complete')
 47:           }
 48: 
 49:           try {
 50:             args = JSON.parse(`${message.paramsText}\"}`);
 51:           } catch (error) {
 52:             Log.error('File stream completion failed!');
 53:           }
 54: 
 55:           if (args && args.content) {
 56:             Log.info('File write detected, loading file-view in mainView', args.content);
 57:             const url = this.detailView.webContents.getURL();
 58:             Log.info('current URL', url, !url.includes('file-view'))
 59:             if (!url.includes('file-view')) {
 60:               this.detailView.webContents.loadURL(`http://localhost:5173/file-view`);
 61:               this.detailView.webContents.once('did-finish-load', () => {
 62:                 this.detailView.webContents.send('file-updated', 'code', args.content);
 63:                 resolve();
 64:               });
 65:             } else {
 66:               this.detailView.webContents.send('file-updated',  'code', args.content);
 67:               resolve();
 68:             }
 69:           } else {
 70:             resolve();
 71:           }
 72:         } else {
 73:           resolve();
 74:         }
 75:         })  
 76:       },
 77:       onHuman: (message: any) => {
 78:         console.log('EkoService human callback:', message);
 79:       }
 80:     };
 81:   }
 82: 
 83:   private initializeEko() {
 84:     // Get LLMs configuration from ConfigManager
 85:     // Priority: user config > env > default
 86:     const configManager = ConfigManager.getInstance();
 87:     const llms: LLMs = configManager.getLLMsConfig();
 88: 
 89:     // Get agent configuration
 90:     const agentConfig = configManager.getAgentConfig();
 91: 
 92:     // Get correct application path
 93:     const appPath = app.isPackaged
 94:       ? path.join(app.getPath('userData'), 'static')  // Packaged path
 95:       : path.join(process.cwd(), 'public', 'static');    // Development environment path
 96: 
 97:     Log.info(`FileAgent working path: ${appPath}`);
 98: 
 99:     // MCP client configuration - configure based on your MCP server address
100:     const sseUrl = "http://localhost:5173/api/mcp/sse";
101:     this.mcpClient = new SimpleSseMcpClient(sseUrl);
102: 
103:     // Create agents with custom prompts
104:     this.agents = [];
105: 
106:     if (agentConfig.browserAgent.enabled) {
107:       this.agents.push(
108:         new BrowserAgent(
109:           this.detailView,
110:           this.mcpClient,
111:           agentConfig.browserAgent.customPrompt
112:         )
113:       );
114:       Log.info('BrowserAgent enabled with custom prompt:', agentConfig.browserAgent.customPrompt ? 'Yes' : 'No');
115:     }
116: 
117:     if (agentConfig.fileAgent.enabled) {
118:       this.agents.push(
119:         new FileAgent(
120:           this.detailView,
121:           appPath,
122:           this.mcpClient,
123:           agentConfig.fileAgent.customPrompt
124:         )
125:       );
126:       Log.info('FileAgent enabled with custom prompt:', agentConfig.fileAgent.customPrompt ? 'Yes' : 'No');
127:     }
128: 
129:     // Create callback and initialize Eko instance
130:     const callback = this.createCallback();
131:     this.eko = new Eko({ llms, agents: this.agents, callback });
132:     Log.info('EkoService initialized with LLMs:', llms.default?.model);
133:   }
134: 
135:   /**
136:    * Reload LLM configuration and reinitialize Eko instance
137:    * Called when user changes model configuration in UI
138:    */
139:   public reloadConfig(): void {
140:     Log.info('Reloading EkoService configuration...');
141: 
142:     // Abort all running tasks before reloading
143:     if (this.eko) {
144:       const allTaskIds = this.eko.getAllTaskId();
145:       allTaskIds.forEach(taskId => {
146:         try {
147:           this.eko!.abortTask(taskId, 'config-reload');
148:         } catch (error) {
149:           Log.error(`Failed to abort task ${taskId}:`, error);
150:         }
151:       });
152:     }
153: 
154:     // Get new LLMs configuration
155:     const configManager = ConfigManager.getInstance();
156:     const llms: LLMs = configManager.getLLMsConfig();
157: 
158:     Log.info('New LLMs config:', llms.default?.model);
159: 
160:     // Create new Eko instance with updated config and fresh callback
161:     const callback = this.createCallback();
162:     this.eko = new Eko({ llms, agents: this.agents, callback });
163: 
164:     Log.info('EkoService configuration reloaded successfully');
165: 
166:     // Notify frontend about config reload
167:     if (!this.mainWindow || this.mainWindow.isDestroyed()) {
168:       return;
169:     }
170: 
171:     this.mainWindow.webContents.send('eko-config-reloaded', {
172:       model: llms.default?.model,
173:       provider: llms.default?.provider
174:     });
175:   }
176: 
177:   /**
178:    * Run new task
179:    */
180:   async run(message: string): Promise<EkoResult | null> {
181:     if (!this.eko) {
182:       const errorMsg = 'Eko service not initialized';
183:       Log.error(errorMsg);
184:       this.sendErrorToFrontend(errorMsg);
185:       return null;
186:     }
187: 
188:     console.log('EkoService running task:', message);
189:     let result = null;
190:     try {
191:       result = await this.eko.run(message);
192:     } catch (error: any) {
193:       Log.error('EkoService run error:', error);
194: 
195:       // Extract error message
196:       const errorMessage = error?.message || error?.toString() || 'Unknown error occurred';
197:       this.sendErrorToFrontend(errorMessage, error);
198:     }
199:     return result;
200:   }
201: 
202:   /**
203:    * Send error message to frontend
204:    */
205:   private sendErrorToFrontend(errorMessage: string, error?: any, taskId?: string): void {
206:     if (!this.mainWindow || this.mainWindow.isDestroyed()) {
207:       Log.warn('Main window destroyed, cannot send error message');
208:       return;
209:     }
210: 
211:     this.mainWindow.webContents.send('eko-stream-message', {
212:       type: 'error',
213:       error: errorMessage,
214:       detail: error?.stack || error?.toString() || errorMessage,
215:       taskId: taskId // Include taskId if available
216:     });
217:   }
218: 
219:   /**
220:    * Modify existing task
221:    */
222:   async modify(taskId: string, message: string): Promise<EkoResult | null> {
223:     if (!this.eko) {
224:       const errorMsg = 'Eko service not initialized';
225:       Log.error(errorMsg);
226:       this.sendErrorToFrontend(errorMsg, undefined, taskId);
227:       return null;
228:     }
229: 
230:     let result = null;
231:     try {
232:       await this.eko.modify(taskId, message);
233:       result = await this.eko.execute(taskId);
234:     } catch (error: any) {
235:       Log.error('EkoService modify error:', error);
236:       const errorMessage = error?.message || error?.toString() || 'Failed to modify task';
237:       this.sendErrorToFrontend(errorMessage, error, taskId);
238:     }
239:     return result;
240:   }
241: 
242:   /**
243:    * Execute task
244:    */
245:   async execute(taskId: string): Promise<EkoResult | null> {
246:     if (!this.eko) {
247:       const errorMsg = 'Eko service not initialized';
248:       Log.error(errorMsg);
249:       this.sendErrorToFrontend(errorMsg, undefined, taskId);
250:       return null;
251:     }
252: 
253:     console.log('EkoService executing task:', taskId);
254:     try {
255:       return await this.eko.execute(taskId);
256:     } catch (error: any) {
257:       Log.error('EkoService execute error:', error);
258:       const errorMessage = error?.message || error?.toString() || 'Failed to execute task';
259:       this.sendErrorToFrontend(errorMessage, error, taskId);
260:       return null;
261:     }
262:   }
263: 
264:   /**
265:    * Get task status
266:    */
267:   async getTaskStatus(taskId: string): Promise<any> {
268:     if (!this.eko) {
269:       throw new Error('Eko service not initialized');
270:     }
271: 
272:     // If Eko has a method to get task status, it can be called here
273:     // return await this.eko.getTaskStatus(taskId);
274:     console.log('EkoService getting task status:', taskId);
275:     return { taskId, status: 'unknown' };
276:   }
277: 
278:   /**
279:    * Cancel task
280:    */
281:   async cancleTask(taskId: string): Promise<any> {
282:     if (!this.eko) {
283:       throw new Error('Eko service not initialized');
284:     }
285: 
286:     const res = await this.eko.abortTask(taskId, 'cancle');
287:     return res;
288:   }
289: 
290:   /**
291:    * Check if any task is running
292:    */
293:   hasRunningTask(): boolean {
294:     if (!this.eko) {
295:       return false;
296:     }
297: 
298:     const allTaskIds = this.eko.getAllTaskId();
299: 
300:     // Iterate through all tasks, check if any task is not terminated
301:     for (const taskId of allTaskIds) {
302:       const context = this.eko.getTask(taskId);
303:       if (context && !context.controller.signal.aborted) {
304:         // Task exists and not terminated, meaning it may be running
305:         return true;
306:       }
307:     }
308: 
309:     return false;
310:   }
311: 
312:   /**
313:    * Abort all running tasks
314:    */
315:   async abortAllTasks(): Promise<void> {
316:     if (!this.eko) {
317:       return;
318:     }
319: 
320:     const allTaskIds = this.eko.getAllTaskId();
321:     const abortPromises = allTaskIds.map(taskId => this.eko!.abortTask(taskId, 'window-closing'));
322: 
323:     await Promise.all(abortPromises);
324:     Log.info('All tasks aborted');
325:   }
326: 
327:   /**
328:    * Destroy service
329:    */
330:   destroy() {
331:     console.log('EkoService destroyed');
332:     this.eko = null;
333:   }
334: }
````

## File: electron/main/services/health-checker.ts
````typescript
 1: /**
 2:  * Service health checker
 3:  * Responsible for detecting if Next.js service has started successfully
 4:  */
 5: 
 6: interface HealthCheckOptions {
 7:   maxRetries?: number;
 8:   retryInterval?: number;
 9:   timeout?: number;
10: }
11: 
12: export class HealthChecker {
13:   private readonly defaultOptions: Required<HealthCheckOptions> = {
14:     maxRetries: 30,
15:     retryInterval: 1000,
16:     timeout: 5000,
17:   };
18: 
19:   /**
20:    * Check health status of specified URL
21:    * @param url URL to check
22:    * @param timeout Timeout for single check
23:    * @returns Whether it's healthy
24:    */
25:   async checkHealth(url: string, timeout?: number): Promise<boolean> {
26:     const checkTimeout = timeout || this.defaultOptions.timeout;
27:     
28:     try {
29:       const controller = new AbortController();
30:       const timeoutId = setTimeout(() => controller.abort(), checkTimeout);
31: 
32:       const response = await fetch(url, {
33:         signal: controller.signal,
34:         method: 'GET',
35:       });
36: 
37:       clearTimeout(timeoutId);
38:       return response.ok;
39:     } catch (error) {
40:       console.log(`Health check failed for ${url}:`, error);
41:       return false;
42:     }
43:   }
44: 
45:   /**
46:    * Wait for service to become healthy
47:    * @param url URL to check
48:    * @param options Check options
49:    * @returns Whether it eventually becomes healthy
50:    */
51:   async waitUntilHealthy(url: string, options?: HealthCheckOptions): Promise<boolean> {
52:     const opts = { ...this.defaultOptions, ...options };
53:     let retryCount = 0;
54: 
55:     console.log(`Starting health check: ${url}, max retries: ${opts.maxRetries}`);
56: 
57:     while (retryCount < opts.maxRetries) {
58:       const isHealthy = await this.checkHealth(url, opts.timeout);
59: 
60:       if (isHealthy) {
61:         console.log(`Service health check succeeded (${retryCount + 1}/${opts.maxRetries})`);
62:         return true;
63:       }
64: 
65:       retryCount++;
66:       console.log(`Health check failed (${retryCount}/${opts.maxRetries}), retrying after ${opts.retryInterval}ms...`);
67: 
68:       if (retryCount < opts.maxRetries) {
69:         await this.sleep(opts.retryInterval);
70:       }
71:     }
72: 
73:     console.log(`Service health check timeout, retried ${opts.maxRetries} times`);
74:     return false;
75:   }
76: 
77:   /**
78:    * Sleep function
79:    */
80:   private sleep(ms: number): Promise<void> {
81:     return new Promise(resolve => setTimeout(resolve, ms));
82:   }
83: }
````

## File: electron/main/services/server-manager.ts
````typescript
 1: /**
 2:  * Next.js server manager
 3:  * Responsible for managing Next.js development server startup and status detection
 4:  */
 5: 
 6: import { app } from 'electron';
 7: import path from 'node:path';
 8: import { pathToFileURL } from 'node:url';
 9: import { HealthChecker } from './health-checker';
10: import { isDev, DEFAULT_PORT } from '../utils/constants';
11: 
12: export class ServerManager {
13:   private healthChecker: HealthChecker;
14:   private serverStarted: boolean = false;
15: 
16:   constructor() {
17:     this.healthChecker = new HealthChecker();
18:   }
19: 
20:   /**
21:    * Start Next.js server (production environment only)
22:    */
23:   async startServer(): Promise<void> {
24:     if (isDev || this.serverStarted) {
25:       console.log('Skipping server startup: development environment or server already started');
26:       return;
27:     }
28: 
29:     try {
30:       const serverPath = path.join(app.getAppPath(), "server.js");
31:       // Convert file path to correct file:// URL format, compatible with all operating systems
32:       const fileUrl = pathToFileURL(serverPath).href;
33:       console.log(`Starting Next.js server: ${serverPath}`);
34:       console.log(`File URL: ${fileUrl}`);
35: 
36:       await import(fileUrl);
37:       this.serverStarted = true;
38: 
39:       console.log('Next.js server started successfully');
40:     } catch (error) {
41:       console.error('Failed to start Next.js server:', error);
42:       throw new Error(`Failed to start Next.js server: ${error}`);
43:     }
44:   }
45: 
46:   /**
47:    * Wait for server to be ready
48:    * @param timeout Maximum wait time
49:    */
50:   async waitForServer(timeout: number = 30000): Promise<boolean> {
51:     const url = `http://localhost:${DEFAULT_PORT}/home`;
52:     const maxRetries = Math.floor(timeout / 1000); // Check once per second
53: 
54:     console.log(`Waiting for Next.js server to be ready: ${url}`);
55: 
56:     const isHealthy = await this.healthChecker.waitUntilHealthy(url, {
57:       maxRetries,
58:       retryInterval: 1000,
59:       timeout: 3000,
60:     });
61: 
62:     if (isHealthy) {
63:       console.log('Next.js server is ready');
64:     } else {
65:       console.error('Next.js server startup timeout');
66:     }
67: 
68:     return isHealthy;
69:   }
70: 
71:   /**
72:    * Check if server is running
73:    */
74:   async isServerRunning(): Promise<boolean> {
75:     const url = `http://localhost:${DEFAULT_PORT}`;
76:     return await this.healthChecker.checkHealth(url);
77:   }
78: 
79:   /**
80:    * Get server URL
81:    */
82:   getServerURL(): string {
83:     return `http://localhost:${DEFAULT_PORT}/home`;
84:   }
85: 
86:   /**
87:    * Stop server (reserved interface)
88:    */
89:   async stopServer(): Promise<void> {
90:     // In current architecture, server is managed externally, this just marks it
91:     this.serverStarted = false;
92:     console.log('Server manager has been reset');
93:   }
94: }
````

## File: electron/main/services/task-scheduler.ts
````typescript
  1: import { taskWindowManager } from "./task-window-manager";
  2: import { ipcMain } from "electron";
  3: 
  4: /**
  5:  * Scheduled task queue item
  6:  */
  7: interface QueuedTask {
  8:   taskId: string;
  9:   taskName: string;
 10:   steps: Array<{ id: string; name: string; content: string; order: number }>;
 11:   scheduledTime: Date;
 12: }
 13: 
 14: /**
 15:  * Running task
 16:  */
 17: interface RunningTask {
 18:   taskId: string;
 19:   executionId: string;
 20:   startTime: Date;
 21: }
 22: 
 23: /**
 24:  * Task scheduler
 25:  * Responsible for scheduling and execution management of scheduled tasks
 26:  * Runs in Electron main process
 27:  */
 28: export class TaskScheduler {
 29:   private taskQueue: QueuedTask[] = []; // Task queue waiting for execution
 30:   private runningTasks: Map<string, RunningTask> = new Map(); // Running tasks
 31:   private scheduledTimers: Map<string, NodeJS.Timeout> = new Map(); // Timer mapping
 32:   private isRunning: boolean = false;
 33:   private isInitialized: boolean = false; // Flag if initialized from storage
 34: 
 35:   constructor() {
 36:     this.setupIpcHandlers();
 37:   }
 38: 
 39:   /**
 40:    * Setup IPC handlers
 41:    */
 42:   private setupIpcHandlers(): void {
 43:     // Start scheduler
 44:     ipcMain.handle('scheduler:start', async () => {
 45:       return this.start();
 46:     });
 47: 
 48:     // Stop scheduler
 49:     ipcMain.handle('scheduler:stop', async () => {
 50:       return this.stop();
 51:     });
 52: 
 53:     // Add scheduled task
 54:     ipcMain.handle('scheduler:add-task', async (event, task: any) => {
 55:       return this.scheduleTask(task);
 56:     });
 57: 
 58:     // Remove scheduled task
 59:     ipcMain.handle('scheduler:remove-task', async (event, taskId: string) => {
 60:       return this.removeScheduledTask(taskId);
 61:     });
 62: 
 63:     // Execute task immediately
 64:     ipcMain.handle('scheduler:execute-now', async (event, task: any) => {
 65:       return this.executeTaskNow(task);
 66:     });
 67: 
 68:     // Get queue status
 69:     ipcMain.handle('scheduler:get-status', async () => {
 70:       return {
 71:         isRunning: this.isRunning,
 72:         queueLength: this.taskQueue.length,
 73:         runningCount: this.runningTasks.size,
 74:         scheduledCount: this.scheduledTimers.size
 75:       };
 76:     });
 77: 
 78:     // Check if initialized
 79:     ipcMain.handle('scheduler:is-initialized', async () => {
 80:       return this.isInitialized;
 81:     });
 82: 
 83:     // Mark as initialized
 84:     ipcMain.handle('scheduler:mark-initialized', async () => {
 85:       this.isInitialized = true;
 86:       console.log('[TaskScheduler] Marked as initialized');
 87:       return { success: true };
 88:     });
 89:   }
 90: 
 91:   /**
 92:    * Start scheduler
 93:    */
 94:   start(): { success: boolean; message: string } {
 95:     if (this.isRunning) {
 96:       return { success: false, message: 'Scheduler is already running' };
 97:     }
 98: 
 99:     this.isRunning = true;
100:     console.log('[TaskScheduler] Scheduler started');
101: 
102:     return { success: true, message: 'Scheduler started successfully' };
103:   }
104: 
105:   /**
106:    * Stop scheduler
107:    */
108:   stop(): { success: boolean; message: string } {
109:     if (!this.isRunning) {
110:       return { success: false, message: 'Scheduler is not running' };
111:     }
112: 
113:     // Clear all timers
114:     this.scheduledTimers.forEach((timer) => {
115:       clearTimeout(timer);
116:     });
117:     this.scheduledTimers.clear();
118: 
119:     // Clear queue
120:     this.taskQueue = [];
121: 
122:     this.isRunning = false;
123:     console.log('[TaskScheduler] Scheduler stopped');
124: 
125:     return { success: true, message: 'Scheduler stopped successfully' };
126:   }
127: 
128:   /**
129:    * Schedule a timed task
130:    * @param task Task configuration
131:    */
132:   scheduleTask(task: any): { success: boolean; message: string; nextExecuteAt?: Date } {
133:     if (!this.isRunning) {
134:       return { success: false, message: 'Scheduler not started' };
135:     }
136: 
137:     const { id, name, steps, schedule } = task;
138: 
139:     // Calculate next execution time
140:     const nextExecuteAt = this.calculateNextExecuteTime(schedule);
141: 
142:     if (!nextExecuteAt) {
143:       return { success: false, message: 'Invalid schedule configuration' };
144:     }
145: 
146:     // Calculate delay time
147:     const delay = nextExecuteAt.getTime() - Date.now();
148: 
149:     if (delay < 0) {
150:       return { success: false, message: 'Calculated execution time has expired' };
151:     }
152: 
153:     // Clear old timer (prevent duplicate registration)
154:     const existingTimer = this.scheduledTimers.get(id);
155:     if (existingTimer) {
156:       clearTimeout(existingTimer);
157:       console.log(`[TaskScheduler] Cleared old timer for task ${name} to avoid duplicate execution`);
158:     }
159: 
160:     // Create timer
161:     const timer = setTimeout(() => {
162:       this.executeTask(id, name, steps);
163:       this.scheduledTimers.delete(id);
164: 
165:       // If it's a periodic task, reschedule
166:       if (schedule.type === 'interval') {
167:         this.scheduleTask(task);
168:       }
169:     }, delay);
170: 
171:     // Save timer
172:     this.scheduledTimers.set(id, timer);
173: 
174:     console.log(`[TaskScheduler] Task ${name} scheduled, next execution time: ${nextExecuteAt.toLocaleString()}`);
175: 
176:     return { success: true, message: 'Task scheduled successfully', nextExecuteAt };
177:   }
178: 
179:   /**
180:    * Remove scheduled task
181:    * @param taskId Task ID
182:    */
183:   removeScheduledTask(taskId: string): { success: boolean; message: string } {
184:     const timer = this.scheduledTimers.get(taskId);
185: 
186:     if (!timer) {
187:       return { success: false, message: 'Task schedule not found' };
188:     }
189: 
190:     clearTimeout(timer);
191:     this.scheduledTimers.delete(taskId);
192: 
193:     console.log(`[TaskScheduler] Task ${taskId} schedule removed`);
194: 
195:     return { success: true, message: 'Task schedule removed' };
196:   }
197: 
198:   /**
199:    * Execute task immediately
200:    * @param task Task configuration
201:    */
202:   async executeTaskNow(task: any): Promise<{ success: boolean; message: string; executionId?: string }> {
203:     const { id, name, steps } = task;
204:     return this.executeTask(id, name, steps);
205:   }
206: 
207:   /**
208:    * Execute task
209:    * @param taskId Task ID
210:    * @param taskName Task name
211:    * @param steps Task steps
212:    */
213:   private async executeTask(
214:     taskId: string,
215:     taskName: string,
216:     steps: Array<{ id: string; name: string; content: string; order: number }>
217:   ): Promise<{ success: boolean; message: string; executionId?: string }> {
218:     try {
219:       // Check if new task can be executed
220:       if (!taskWindowManager.canRunNewTask()) {
221:         // Add to queue
222:         this.taskQueue.push({
223:           taskId,
224:           taskName,
225:           steps,
226:           scheduledTime: new Date()
227:         });
228: 
229:         console.log(`[TaskScheduler] Task ${taskName} added to queue, current running tasks: ${taskWindowManager.getRunningTaskCount()}`);
230: 
231:         return { success: true, message: 'Task added to queue' };
232:       }
233: 
234:       // Execute task
235:       const executionId = this.generateExecutionId();
236:       await this.runTaskInNewWindow(taskId, taskName, steps, executionId);
237: 
238:       return { success: true, message: 'Task execution started', executionId };
239:     } catch (error: any) {
240:       console.error('[TaskScheduler] Failed to execute task:', error);
241:       return { success: false, message: error.message };
242:     }
243:   }
244: 
245:   /**
246:    * Run task in new window
247:    */
248:   private async runTaskInNewWindow(
249:     taskId: string,
250:     taskName: string,
251:     steps: Array<{ id: string; name: string; content: string; order: number }>,
252:     executionId: string
253:   ): Promise<void> {
254:     try {
255:       console.log(`[TaskScheduler] Starting task execution: ${taskName} (${executionId})`);
256: 
257:       // Create task-dedicated window
258:       const { window, ekoService } = await taskWindowManager.createTaskWindow(taskId, executionId);
259: 
260:       // Record running task
261:       this.runningTasks.set(executionId, {
262:         taskId,
263:         executionId,
264:         startTime: new Date()
265:       });
266: 
267:       // Notify renderer process that task has started
268:       window.webContents.send('task-execution-start', {
269:         taskId,
270:         taskName,
271:         executionId,
272:         steps
273:       });
274: 
275:       // Combine steps into complete task description
276:       const taskPrompt = this.buildTaskPrompt(steps);
277: 
278:       // Execute task
279:       const result = await ekoService.run(taskPrompt);
280: 
281:       console.log(`[TaskScheduler] Task execution completed: ${taskName}`, result?.stopReason);
282: 
283:       // Notify renderer process task completion, save execution history
284:       window.webContents.send('task-execution-complete', {
285:         taskId,
286:         taskName,
287:         executionId,
288:         status: result?.stopReason || 'done',
289:         endTime: new Date()
290:       });
291: 
292:       // No longer auto-close window, let user view results and history
293:       // Remove from running tasks list
294:       this.runningTasks.delete(executionId);
295: 
296:       // Process next task in queue
297:       this.processQueue();
298: 
299:     } catch (error) {
300:       console.error('[TaskScheduler] Task execution failed:', error);
301: 
302:       // No longer auto-close window, let user view error info
303:       // Remove from running tasks list
304:       this.runningTasks.delete(executionId);
305: 
306:       // Process next task in queue
307:       this.processQueue();
308:     }
309:   }
310: 
311:   /**
312:    * Combine step list into task prompt
313:    */
314:   private buildTaskPrompt(steps: Array<{ id: string; name: string; content: string; order: number }>): string {
315:     const sortedSteps = [...steps].sort((a, b) => a.order - b.order);
316:     const stepTexts = sortedSteps.map((step, index) => `${index + 1}. ${step.content}`).join('\n');
317: 
318:     return `Please execute the task following these steps:\n${stepTexts}`;
319:   }
320: 
321:   /**
322:    * Process tasks in queue
323:    */
324:   private async processQueue(): Promise<void> {
325:     if (this.taskQueue.length > 0 && taskWindowManager.canRunNewTask()) {
326:       const nextTask = this.taskQueue.shift();
327:       if (nextTask) {
328:         console.log(`[TaskScheduler] Retrieving task from queue: ${nextTask.taskName}`);
329:         const executionId = this.generateExecutionId();
330:         await this.runTaskInNewWindow(nextTask.taskId, nextTask.taskName, nextTask.steps, executionId);
331:       }
332:     }
333:   }
334: 
335:   /**
336:    * Calculate next execution time
337:    */
338:   private calculateNextExecuteTime(schedule: any): Date | null {
339:     const now = new Date();
340: 
341:     if (schedule.type === 'interval') {
342:       const { intervalUnit, intervalValue } = schedule;
343: 
344:       if (!intervalUnit || !intervalValue) {
345:         return null;
346:       }
347: 
348:       let milliseconds = 0;
349: 
350:       switch (intervalUnit) {
351:         case 'minute':
352:           milliseconds = intervalValue * 60 * 1000;
353:           break;
354:         case 'hour':
355:           milliseconds = intervalValue * 60 * 60 * 1000;
356:           break;
357:         case 'day':
358:           milliseconds = intervalValue * 24 * 60 * 60 * 1000;
359:           break;
360:         default:
361:           return null;
362:       }
363: 
364:       return new Date(now.getTime() + milliseconds);
365:     }
366: 
367:     // TODO: Support cron expressions
368:     if (schedule.type === 'cron') {
369:       console.warn('[TaskScheduler] Cron expressions not yet supported');
370:       return null;
371:     }
372: 
373:     return null;
374:   }
375: 
376:   /**
377:    * Generate execution ID
378:    */
379:   private generateExecutionId(): string {
380:     return `exec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
381:   }
382: 
383:   /**
384:    * Get scheduler status (synchronous method, for tray use)
385:    */
386:   getStatus(): {
387:     isRunning: boolean;
388:     queueLength: number;
389:     runningCount: number;
390:     scheduledCount: number;
391:   } {
392:     return {
393:       isRunning: this.isRunning,
394:       queueLength: this.taskQueue.length,
395:       runningCount: this.runningTasks.size,
396:       scheduledCount: this.scheduledTimers.size
397:     };
398:   }
399: 
400:   /**
401:    * Destroy scheduler
402:    */
403:   destroy(): void {
404:     this.stop();
405:     this.runningTasks.clear();
406:     console.log('[TaskScheduler] Scheduler destroyed');
407:   }
408: }
409: 
410: // Singleton instance
411: export const taskScheduler = new TaskScheduler();
````

## File: electron/main/services/task-window-manager.ts
````typescript
  1: import { BrowserWindow, dialog, WebContentsView } from "electron";
  2: import { EkoService } from "./eko-service";
  3: import { windowContextManager, type WindowContext } from "./window-context-manager";
  4: import { createWindow } from '../ui/window';
  5: import { createView } from "../ui/view";
  6: 
  7: 
  8: /**
  9:  * Task execution context
 10:  */
 11: interface TaskWindowContext {
 12:   window: BrowserWindow;
 13:   view: WebContentsView;
 14:   ekoService: EkoService;
 15:   taskId: string;
 16:   executionId: string;
 17:   createdAt: Date;
 18: }
 19: 
 20: /**
 21:  * Task window manager
 22:  * Responsible for creating and managing independent execution windows for scheduled tasks
 23:  * Manages windows by taskId, supports window reuse
 24:  */
 25: export class TaskWindowManager {
 26:   private taskWindows: Map<string, TaskWindowContext> = new Map(); // Manage by taskId
 27:   private maxConcurrentTasks: number = 3; // Maximum concurrent tasks
 28: 
 29:   /**
 30:    * Create or reuse execution window for task
 31:    * @param taskId Task ID
 32:    * @param executionId Execution ID
 33:    * @returns Window context
 34:    */
 35:   async createTaskWindow(taskId: string, executionId: string): Promise<TaskWindowContext> {
 36:     // Check if window for this task already exists (window reuse)
 37:     const existingContext = this.taskWindows.get(taskId);
 38: 
 39:     if (existingContext) {
 40:       console.log(`[TaskWindowManager] Reusing existing window: taskId=${taskId}`);
 41: 
 42:       // Terminate currently executing task
 43:       if (existingContext.executionId) {
 44:         console.log(`[TaskWindowManager] Terminating old task: executionId=${existingContext.executionId}`);
 45:         try {
 46:           await existingContext.ekoService.cancleTask(existingContext.executionId);
 47:         } catch (error) {
 48:           console.error('[TaskWindowManager] Failed to terminate old task:', error);
 49:         }
 50:       }
 51: 
 52:       // Update execution ID
 53:       existingContext.executionId = executionId;
 54: 
 55:       // Reload page with new executionId (keep original loadURL format)
 56:       existingContext.window.loadURL(`http://localhost:5173/main?taskId=${taskId}&executionId=${executionId}`);
 57: 
 58:       // Focus window
 59:       existingContext.window.show();
 60:       existingContext.window.focus();
 61: 
 62:       return existingContext;
 63:     }
 64: 
 65:     // Check concurrency limit (only for new windows)
 66:     if (this.taskWindows.size >= this.maxConcurrentTasks) {
 67:       throw new Error(`Maximum concurrent tasks reached (${this.maxConcurrentTasks})`);
 68:     }
 69: 
 70:     console.log(`[TaskWindowManager] Creating new window: taskId=${taskId}, executionId=${executionId}`);
 71: 
 72:     // Create new window (keep original loadURL format)
 73:     const taskWindow = createWindow(`http://localhost:5173/main?taskId=${taskId}&executionId=${executionId}`)
 74: 
 75:     // Create detailView
 76:     const detailView = createView(`https://www.google.com`, "view", '2');
 77: 
 78:     // Set detailView position and size
 79:     taskWindow.contentView.addChildView(detailView);
 80:     detailView.setBounds({
 81:       x: 818,
 82:       y: 264,
 83:       width: 748,
 84:       height: 560,
 85:     });
 86: 
 87:     // Set detailView hidden by default
 88:     detailView.setVisible(false);
 89: 
 90:     detailView.webContents.setWindowOpenHandler(({url}) => {
 91:         detailView.webContents.loadURL(url);
 92:         return {
 93:           action: "deny",
 94:         }
 95:       })
 96: 
 97:     // Listen for detail view URL changes
 98:     detailView.webContents.on('did-navigate', (_event, url) => {
 99:       console.log('detail view did-navigate:', url);
100:       taskWindow?.webContents.send('url-changed', url);
101:     });
102: 
103:     detailView.webContents.on('did-navigate-in-page', (_event, url) => {
104:       console.log('detail view did-navigate-in-page:', url);
105:       taskWindow?.webContents.send('url-changed', url);
106:     });
107: 
108:     // Create independent EkoService instance for this window
109:     const ekoService = new EkoService(taskWindow, detailView);
110: 
111:     // Ensure window is visible
112:     taskWindow.show();
113:     taskWindow.focus();
114: 
115:     // Create context
116:     const context: TaskWindowContext = {
117:       window: taskWindow,
118:       view: detailView,
119:       ekoService,
120:       taskId,
121:       executionId,
122:       createdAt: new Date()
123:     };
124: 
125:     // Record window by taskId (instead of executionId)
126:     this.taskWindows.set(taskId, context);
127: 
128:     // Also register to windowContextManager
129:     const windowContext: WindowContext = {
130:       window: taskWindow,
131:       detailView,
132:       historyView: null,
133:       ekoService,
134:       webContentsId: taskWindow.webContents.id,
135:       windowType: 'scheduled-task',
136:       taskId,
137:       currentExecutionId: executionId
138:     };
139:     windowContextManager.registerWindow(windowContext);
140: 
141:     // Listen for window close event (close: triggered before closing, can be prevented)
142:     // Check task status, prompt user
143:     taskWindow.on('close', async (event) => {
144:       // Check if any task is running
145:       const hasRunningTask = ekoService.hasRunningTask();
146: 
147:       if (hasRunningTask) {
148:         // Prevent default close behavior
149:         event.preventDefault();
150: 
151:         // Show confirmation dialog
152:         const { response } = await dialog.showMessageBox(taskWindow, {
153:           type: 'warning',
154:           title: 'Scheduled Task Running',
155:           message: 'A scheduled task is currently executing. Closing the window will terminate the task',
156:           detail: 'Please choose an action:',
157:           buttons: ['Cancel', 'Stop Task and Close'],
158:           defaultId: 0,
159:           cancelId: 0
160:         });
161: 
162:         if (response === 1) {
163:           // Stop task and close
164:           console.log(`[TaskWindowManager] User chose to stop task: taskId=${taskId}`);
165: 
166:           // Get all task IDs
167:           const allTaskIds = ekoService['eko']?.getAllTaskId() || [];
168: 
169:           // Abort all tasks
170:           await ekoService.abortAllTasks();
171: 
172:           // Send abort event (frontend will listen and update IndexedDB)
173:           allTaskIds.forEach(tid => {
174:             taskWindow.webContents.send('task-aborted-by-system', {
175:               taskId: tid,
176:               reason: 'User closed scheduled task window, task terminated',
177:               timestamp: new Date().toISOString()
178:             });
179:           });
180: 
181:           // Delay to ensure message delivery and processing
182:           await new Promise(resolve => setTimeout(resolve, 1000));
183: 
184:           // Actually close window
185:           taskWindow.destroy();
186:         }
187:         // response === 0: cancel close, do nothing
188:       }
189:       // No task running, allow closing
190:     });
191: 
192:     // Clean up on window close
193:     taskWindow.on('closed', () => {
194:       console.log(`[TaskWindowManager] Window closed event triggered: taskId=${taskId}`);
195: 
196:       // Remove from taskWindows
197:       this.taskWindows.delete(taskId);
198: 
199:       // Safely unregister window context (check if webContents is destroyed)
200:       try {
201:         if (!taskWindow.isDestroyed() && taskWindow.webContents) {
202:           windowContextManager.unregisterWindow(taskWindow.webContents.id);
203:         }
204:       } catch (error) {
205:         console.error('[TaskWindowManager] Failed to unregister window context:', error);
206:       }
207: 
208:       console.log(`[TaskWindowManager] Window cleanup completed: taskId=${taskId}, remaining windows: ${this.taskWindows.size}`);
209:     });
210: 
211:     console.log(`[TaskWindowManager] Window created successfully: taskId=${taskId}, current windows: ${this.taskWindows.size}`);
212: 
213:     return context;
214:   }
215: 
216:   /**
217:    * Close task window (by taskId)
218:    * @param taskId Task ID
219:    */
220:   async closeTaskWindow(taskId: string): Promise<void> {
221:     const context = this.taskWindows.get(taskId);
222:     if (!context) {
223:       console.warn(`[TaskWindowManager] Task window not found: taskId=${taskId}`);
224:       return;
225:     }
226: 
227:     if (!context.window.isDestroyed()) {
228:       context.window.close();
229:     }
230: 
231:     console.log(`[TaskWindowManager] Task window closed: taskId=${taskId}`);
232:   }
233: 
234:   /**
235:    * Get task window context (by taskId)
236:    * @param taskId Task ID
237:    */
238:   getTaskWindow(taskId: string): TaskWindowContext | undefined {
239:     return this.taskWindows.get(taskId);
240:   }
241: 
242:   /**
243:    * Get current number of executing tasks
244:    */
245:   getRunningTaskCount(): number {
246:     return this.taskWindows.size;
247:   }
248: 
249:   /**
250:    * Check if new task can be executed
251:    */
252:   canRunNewTask(): boolean {
253:     return this.taskWindows.size < this.maxConcurrentTasks;
254:   }
255: 
256:   /**
257:    * Set maximum concurrent tasks
258:    * @param max Maximum concurrency (1-5)
259:    */
260:   setMaxConcurrentTasks(max: number): void {
261:     if (max < 1 || max > 5) {
262:       throw new Error('Maximum concurrent tasks must be between 1-5');
263:     }
264:     this.maxConcurrentTasks = max;
265:     console.log(`[TaskWindowManager] Max concurrent tasks set to ${max}`);
266:   }
267: 
268:   /**
269:    * Get all running tasks
270:    */
271:   getRunningTasks(): Array<{ taskId: string; executionId: string; createdAt: Date }> {
272:     return Array.from(this.taskWindows.values()).map(ctx => ({
273:       taskId: ctx.taskId,
274:       executionId: ctx.executionId,
275:       createdAt: ctx.createdAt
276:     }));
277:   }
278: 
279:   /**
280:    * Close all task windows
281:    */
282:   closeAllTaskWindows(): void {
283:     console.log(`[TaskWindowManager] Closing all task windows (${this.taskWindows.size})`);
284: 
285:     Array.from(this.taskWindows.values()).forEach((context) => {
286:       if (!context.window.isDestroyed()) {
287:         context.window.close();
288:       }
289:     });
290: 
291:     this.taskWindows.clear();
292:   }
293: 
294:   /**
295:    * Destroy manager
296:    */
297:   destroy(): void {
298:     this.closeAllTaskWindows();
299:   }
300: }
301: 
302: // Singleton instance
303: export const taskWindowManager = new TaskWindowManager();
````

## File: electron/main/services/window-context-manager.ts
````typescript
  1: import { BrowserWindow, WebContentsView } from "electron";
  2: import { EkoService } from "./eko-service";
  3: 
  4: /**
  5:  * Window context
  6:  * Each window has its own independent EkoService and detailView
  7:  */
  8: export interface WindowContext {
  9:   window: BrowserWindow;
 10:   detailView: WebContentsView;
 11:   historyView?: WebContentsView | null;
 12:   ekoService: EkoService;
 13:   webContentsId: number;
 14:   windowType: 'main' | 'scheduled-task'; // Window type
 15:   taskId?: string; // Scheduled task ID (if it's a scheduled task window)
 16:   currentExecutionId?: string; // Current execution ID
 17: }
 18: 
 19: /**
 20:  * Window context manager
 21:  * Responsible for managing all window contexts, implementing window isolation
 22:  */
 23: export class WindowContextManager {
 24:   private contexts: Map<number, WindowContext> = new Map(); // key: webContents.id
 25:   private taskWindows: Map<string, WindowContext> = new Map(); // key: taskId, for finding windows by task ID
 26: 
 27:   /**
 28:    * Register window context
 29:    */
 30:   registerWindow(context: WindowContext): void {
 31:     this.contexts.set(context.webContentsId, context);
 32: 
 33:     // If it's a scheduled task window, also register to taskWindows
 34:     if (context.windowType === 'scheduled-task' && context.taskId) {
 35:       this.taskWindows.set(context.taskId, context);
 36:     }
 37: 
 38:     console.log(`[WindowContextManager] Window registered: ${context.windowType}, webContentsId: ${context.webContentsId}`);
 39:   }
 40: 
 41:   /**
 42:    * Get window context by webContentsId
 43:    */
 44:   getContext(webContentsId: number): WindowContext | undefined {
 45:     return this.contexts.get(webContentsId);
 46:   }
 47: 
 48:   /**
 49:    * Get scheduled task window context by taskId
 50:    */
 51:   getTaskWindowContext(taskId: string): WindowContext | undefined {
 52:     return this.taskWindows.get(taskId);
 53:   }
 54: 
 55:   /**
 56:    * Check if a task already has a window
 57:    */
 58:   hasTaskWindow(taskId: string): boolean {
 59:     return this.taskWindows.has(taskId);
 60:   }
 61: 
 62:   /**
 63:    * Update scheduled task window execution ID (when window is reused)
 64:    */
 65:   updateTaskWindowExecution(taskId: string, executionId: string): void {
 66:     const context = this.taskWindows.get(taskId);
 67:     if (context) {
 68:       context.currentExecutionId = executionId;
 69:       console.log(`[WindowContextManager] Task window execution ID updated: taskId=${taskId}, executionId=${executionId}`);
 70:     }
 71:   }
 72: 
 73:   /**
 74:    * Unregister window context
 75:    */
 76:   unregisterWindow(webContentsId: number): void {
 77:     const context = this.contexts.get(webContentsId);
 78: 
 79:     if (context) {
 80:       // If it's a scheduled task window, also remove from taskWindows
 81:       if (context.windowType === 'scheduled-task' && context.taskId) {
 82:         this.taskWindows.delete(context.taskId);
 83:       }
 84: 
 85:       this.contexts.delete(webContentsId);
 86:       console.log(`[WindowContextManager] Window unregistered: ${context.windowType}, webContentsId: ${webContentsId}`);
 87:     }
 88:   }
 89: 
 90:   /**
 91:    * Get all window contexts
 92:    */
 93:   getAllContexts(): WindowContext[] {
 94:     return Array.from(this.contexts.values());
 95:   }
 96: 
 97:   /**
 98:    * Get main window context
 99:    */
100:   getMainWindowContext(): WindowContext | undefined {
101:     return Array.from(this.contexts.values()).find(ctx => ctx.windowType === 'main');
102:   }
103: 
104:   /**
105:    * Clean up all window contexts
106:    */
107:   clear(): void {
108:     this.contexts.clear();
109:     this.taskWindows.clear();
110:     console.log('[WindowContextManager] All window contexts cleaned up');
111:   }
112: }
113: 
114: // Singleton instance
115: export const windowContextManager = new WindowContextManager();
````

## File: electron/main/ui/menu.ts
````typescript
 1: import { BrowserWindow, Menu } from 'electron';
 2: 
 3: export function setupMenu(win: BrowserWindow): void {
 4:   const app = Menu.getApplicationMenu();
 5:   Menu.setApplicationMenu(
 6:     Menu.buildFromTemplate([
 7:       ...(app ? app.items : []),
 8:       {
 9:         label: 'Go',
10:         submenu: [
11:           {
12:             label: 'Back',
13:             accelerator: 'CmdOrCtrl+[',
14:             click: () => {
15:               win?.webContents.navigationHistory.goBack();
16:             },
17:           },
18:           {
19:             label: 'Forward',
20:             accelerator: 'CmdOrCtrl+]',
21:             click: () => {
22:               win?.webContents.navigationHistory.goForward();
23:             },
24:           },
25:         ],
26:       }
27:     ]),
28:   );
29: }
````

## File: electron/main/ui/tray.ts
````typescript
  1: /**
  2:  * System tray manager
  3:  * Responsible for creating and managing system tray icon and menu
  4:  */
  5: 
  6: import { app, BrowserWindow, Menu, Tray, nativeImage } from 'electron';
  7: import path from 'node:path';
  8: import { isDev } from '../utils/constants';
  9: import { taskScheduler } from '../services/task-scheduler';
 10: 
 11: let tray: Tray | null = null;
 12: let updateInterval: NodeJS.Timeout | null = null;
 13: 
 14: /**
 15:  * Create system tray
 16:  * @param mainWindow Main window instance
 17:  */
 18: export function createTray(mainWindow: BrowserWindow): Tray {
 19:   // Get tray icon path
 20:   const iconPath = getTrayIconPath();
 21:   console.log('[Tray] Tray icon path:', iconPath);
 22: 
 23:   // Create tray icon
 24:   const icon = nativeImage.createFromPath(iconPath);
 25:   tray = new Tray(icon.resize({ width: 16, height: 16 }));
 26: 
 27:   // Set tray tooltip text
 28:   tray.setToolTip('DeepFundAI Browser');
 29: 
 30:   // Create tray menu
 31:   updateTrayMenu(mainWindow);
 32: 
 33:   // Tray icon click event (Windows/Linux: single click shows window, Mac: no action, use right-click menu)
 34:   tray.on('click', () => {
 35:     if (process.platform !== 'darwin') {
 36:       showMainWindow(mainWindow);
 37:     }
 38:   });
 39: 
 40:   // Start periodic tray menu updates (update every 5 seconds)
 41:   if (updateInterval) {
 42:     clearInterval(updateInterval);
 43:   }
 44:   updateInterval = setInterval(() => {
 45:     updateTrayMenu(mainWindow);
 46:   }, 5000);
 47: 
 48:   console.log('[Tray] System tray created successfully');
 49:   return tray;
 50: }
 51: 
 52: /**
 53:  * Update tray menu
 54:  * @param mainWindow Main window instance
 55:  */
 56: export function updateTrayMenu(mainWindow: BrowserWindow): void {
 57:   if (!tray) return;
 58: 
 59:   // Get task scheduler status
 60:   const schedulerStatus = getSchedulerStatus();
 61: 
 62:   const contextMenu = Menu.buildFromTemplate([
 63:     {
 64:       label: 'DeepFundAI Browser',
 65:       enabled: false,
 66:     },
 67:     {
 68:       type: 'separator',
 69:     },
 70:     {
 71:       label: 'Show Main Window',
 72:       click: () => showMainWindow(mainWindow),
 73:     },
 74:     {
 75:       type: 'separator',
 76:     },
 77:     {
 78:       label: `Scheduler Status: ${schedulerStatus.isRunning ? 'Running' : 'Stopped'}`,
 79:       enabled: false,
 80:     },
 81:     {
 82:       label: `Scheduled: ${schedulerStatus.scheduledCount}`,
 83:       enabled: false,
 84:     },
 85:     {
 86:       label: `Running: ${schedulerStatus.runningCount}`,
 87:       enabled: false,
 88:     },
 89:     {
 90:       type: 'separator',
 91:     },
 92:     {
 93:       label: 'Quit Application',
 94:       click: () => quitApplication(),
 95:     },
 96:   ]);
 97: 
 98:   tray.setContextMenu(contextMenu);
 99: }
100: 
101: /**
102:  * Show main window
103:  * @param mainWindow Main window instance
104:  */
105: function showMainWindow(mainWindow: BrowserWindow): void {
106:   if (mainWindow.isDestroyed()) {
107:     console.warn('[Tray] Main window destroyed, cannot show');
108:     return;
109:   }
110: 
111:   if (mainWindow.isMinimized()) {
112:     mainWindow.restore();
113:   }
114: 
115:   mainWindow.show();
116:   mainWindow.focus();
117: 
118:   console.log('[Tray] Main window shown');
119: }
120: 
121: /**
122:  * Quit application
123:  */
124: function quitApplication(): void {
125:   console.log('[Tray] Preparing to quit application...');
126: 
127:   // Stop task scheduler
128:   try {
129:     taskScheduler.stop();
130:     console.log('[Tray] Task scheduler stopped');
131:   } catch (error) {
132:     console.error('[Tray] Failed to stop task scheduler:', error);
133:   }
134: 
135:   // Destroy tray
136:   if (tray) {
137:     tray.destroy();
138:     tray = null;
139:     console.log('[Tray] Tray destroyed');
140:   }
141: 
142:   // Quit application
143:   app.quit();
144: }
145: 
146: /**
147:  * Get task scheduler status
148:  */
149: function getSchedulerStatus(): {
150:   isRunning: boolean;
151:   runningCount: number;
152:   queueLength: number;
153:   scheduledCount: number;
154: } {
155:   try {
156:     // Read real-time status directly from taskScheduler
157:     return taskScheduler.getStatus();
158:   } catch (error) {
159:     console.error('[Tray] Failed to get scheduler status:', error);
160:     // Return default values on error
161:     return {
162:       isRunning: false,
163:       runningCount: 0,
164:       queueLength: 0,
165:       scheduledCount: 0,
166:     };
167:   }
168: }
169: 
170: /**
171:  * Get tray icon path
172:  */
173: function getTrayIconPath(): string {
174:   if (isDev) {
175:     // Development environment: use icon from project root
176:     return path.join(process.cwd(), 'assets/icons/icon.png');
177:   } else {
178:     // Production environment: use packaged icon
179:     if (process.platform === 'win32') {
180:       return path.join(process.resourcesPath, 'assets/icons/icon.ico');
181:     } else if (process.platform === 'darwin') {
182:       return path.join(process.resourcesPath, 'assets/icons/icon.icns');
183:     } else {
184:       return path.join(process.resourcesPath, 'assets/icons/icon.png');
185:     }
186:   }
187: }
188: 
189: /**
190:  * Destroy tray
191:  */
192: export function destroyTray(): void {
193:   // Clear periodic updates
194:   if (updateInterval) {
195:     clearInterval(updateInterval);
196:     updateInterval = null;
197:   }
198: 
199:   if (tray) {
200:     tray.destroy();
201:     tray = null;
202:     console.log('[Tray] Tray destroyed');
203:   }
204: }
205: 
206: /**
207:  * Get tray instance
208:  */
209: export function getTray(): Tray | null {
210:   return tray;
211: }
````

## File: electron/main/ui/view.ts
````typescript
  1: import { app, BrowserWindow, clipboard, Menu, shell, WebContentsView } from 'electron';
  2: import path from 'node:path';
  3: import { isDev } from '../utils/constants';
  4: import { store } from '../utils/store';
  5: import { registerClientProtocol } from '../utils/protocol';
  6: 
  7: interface VideoUrlInfo {
  8:   videoUrl: string;
  9:   timestamp: number;
 10:   platform: string;
 11: }
 12: 
 13: export function createView(rendererURL: string, preloadFileName: string, id?: string) {
 14:   console.log('Creating window with URL:', rendererURL);
 15: 
 16:   const bounds = store.get('bounds');
 17:   console.log('restored bounds:', bounds);
 18: 
 19:   const preloadPath = isDev ? path.join(app.getAppPath(), '..', 'preload', `${preloadFileName}.cjs`) : path.join(app.getAppPath(),'dist', 'electron', 'preload', `${preloadFileName}.cjs`);
 20: 
 21:   console.log('preload path:', preloadPath);
 22:   const mainView = new WebContentsView({
 23:     webPreferences: {
 24:       preload: preloadPath,
 25:       contextIsolation: false,
 26:       partition: `persist:detail-view-${id}`, // Key
 27:       webSecurity: true, // Allow custom protocols
 28:     },
 29:   });
 30: 
 31:   // Register client protocol for current view's session (check if already registered to avoid duplicates)
 32:   try {
 33:     // Check if protocol is already registered
 34:     const session = mainView.webContents.session;
 35:     const isRegistered = session.protocol.isProtocolHandled('client');
 36: 
 37:     if (!isRegistered) {
 38:       registerClientProtocol(session.protocol);
 39:       console.log('[View] Client protocol registered for partition:', id);
 40:     } else {
 41:       console.log('[View] Client protocol already registered for partition:', id);
 42:     }
 43:   } catch (error) {
 44:     console.error('[View] Failed to register protocol:', error);
 45:   }
 46: 
 47:   mainView.webContents.on("did-finish-load", () => {
 48:     console.log(`${preloadFileName} did-finish-load`);
 49:     mainView.webContents.setZoomFactor(0.5)
 50:   });
 51: 
 52:   // Listen for network requests to capture real Xiaohongshu video URLs
 53:   mainView.webContents.session.webRequest.onBeforeRequest({ urls: ['*://*/*'] }, (details, callback) => {
 54:     const url = details.url;
 55:     const currentPageUrl = mainView.webContents.getURL();
 56: 
 57:     // Detect Xiaohongshu video requests - based on actual CDN domain observed
 58:     if (url.includes('xhscdn.com') && url.includes('/stream/') && url.includes('.mp4')) {
 59:       console.log('🎥 Detected Xiaohongshu video request:', url);
 60: 
 61:       // Get existing video URL mapping
 62:       const videoUrlMap = store.get('videoUrlMap', {}) as Record<string, VideoUrlInfo>;
 63: 
 64:       // Store mapping between page URL and video URL
 65:       videoUrlMap[currentPageUrl] = {
 66:         videoUrl: url,
 67:         timestamp: Date.now(),
 68:         platform: 'xiaohongshu'
 69:       };
 70: 
 71:       // Save to store
 72:       store.set('videoUrlMap', videoUrlMap);
 73: 
 74:       console.log('Video URL saved to store:', currentPageUrl, '->', url);
 75:     }
 76: 
 77:     callback({});
 78:   });
 79: 
 80:   
 81:   mainView.webContents.loadURL(rendererURL)
 82: 
 83:   mainView.webContents.on('did-fail-load', (_, errorCode, errorDescription) => {
 84:     console.log(`${preloadFileName} Failed to load:`, errorCode, errorDescription);
 85:   });
 86: 
 87:   mainView.webContents.on("context-menu", (event, params) => {
 88:     const menuTemplate: Electron.MenuItemConstructorOptions[] = [];
 89: 
 90:     // 📎 Links
 91:     if (params.linkURL) {
 92:       menuTemplate.push(
 93:         {
 94:           label: "Open Link in New Window",
 95:           click: () => shell.openExternal(params.linkURL),
 96:         },
 97:         {
 98:           label: "Copy Link Address",
 99:           click: () => clipboard.writeText(params.linkURL),
100:         },
101:         { type: "separator" }
102:       );
103:     }
104: 
105:     // 🖼️ Images
106:     if (params.mediaType === "image" && params.srcURL) {
107:       menuTemplate.push(
108:         {
109:           label: "Copy Image Address",
110:           click: () => clipboard.writeText(params.srcURL),
111:         },
112:         {
113:           label: "Open Image in New Window",
114:           click: () => shell.openExternal(params.srcURL),
115:         },
116:         { type: "separator" }
117:       );
118:     }
119: 
120:     // 📝 Text selection
121:     if (params.selectionText) {
122:       menuTemplate.push({ label: "Copy", role: "copy" }, { type: "separator" });
123:     }
124: 
125:     // ⌨️ Input fields (text box/input area)
126:     if (params.isEditable) {
127:       menuTemplate.push(
128:         { label: "Cut", role: "cut" },
129:         { label: "Copy", role: "copy" },
130:         { label: "Paste", role: "paste" },
131:         { type: "separator" }
132:       );
133:     }
134: 
135:     // 🧪 Finally provide "Inspect Element" uniformly
136:     menuTemplate.push({
137:       label: "Inspect Element",
138:       click: () => mainView.webContents.inspectElement(params.x, params.y),
139:     }, {
140:       label: "Refresh",
141:       click: () => mainView.webContents.reload(),
142:     });
143: 
144:     const menu = Menu.buildFromTemplate(menuTemplate);
145: 
146:     menu.popup({
147:       window: BrowserWindow.fromWebContents(mainView.webContents) || undefined,
148:     });
149:   });
150: 
151:   return mainView;
152: }
````

## File: electron/main/ui/window.ts
````typescript
 1: import { app, BrowserWindow } from 'electron';
 2: import path from 'node:path';
 3: import { isDev } from '../utils/constants';
 4: import { store } from '../utils/store';
 5: 
 6: export function createWindow(rendererURL: string) {
 7:   console.log('Creating window with URL:', rendererURL);
 8: 
 9:   const bounds = store.get('bounds');
10:   console.log('restored bounds:', bounds);
11: 
12:   const preloadPath = isDev ? path.join(app.getAppPath(), '..', 'preload', 'index.cjs') : path.join(app.getAppPath(),'dist', 'electron', 'preload', 'index.cjs');
13: 
14:   console.log('preload path:', preloadPath);
15:   const win = new BrowserWindow({
16:     ...{
17:       width: 1600,
18:       height: 900,
19:       // ...bounds,
20:       useContentSize: true,
21:     },
22:     frame: process.platform !== 'darwin',
23:     titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
24:     resizable: false,
25:     webPreferences: {
26:       preload: preloadPath,
27:       contextIsolation: false,
28:       webSecurity: true, // Allow access to media devices like microphone
29:       zoomFactor: 1.0,
30:     },
31:   });
32:   console.log('Window created, loading URL...');
33:   win.loadURL(rendererURL).catch((err) => {
34:     console.log('Failed to load URL:', err);
35:   });
36: 
37:   win.webContents.on('did-fail-load', (_, errorCode, errorDescription) => {
38:     console.log('Failed to load:', errorCode, errorDescription);
39:   });
40: 
41:   win.webContents.on('did-finish-load', () => {
42:     console.log('Window finished loading');
43:   });
44: 
45:   const boundsListener = () => {
46:     const bounds = win.getBounds();
47:     store.set('bounds', bounds);
48:   };
49:   win.on('moved', boundsListener);
50:   win.on('resized', boundsListener);
51: 
52:   return win;
53: }
````

## File: electron/main/utils/auto-update.ts
````typescript
  1: import logger from 'electron-log';
  2: import type { MessageBoxOptions } from 'electron';
  3: import { app, dialog } from 'electron';
  4: import type { AppUpdater, UpdateDownloadedEvent, UpdateInfo } from 'electron-updater';
  5: import path from 'node:path';
  6: 
  7: // NOTE: workaround to use electron-updater.
  8: import * as electronUpdater from 'electron-updater';
  9: import { isDev } from './constants';
 10: 
 11: const autoUpdater: AppUpdater = (electronUpdater as any).default.autoUpdater;
 12: 
 13: export async function setupAutoUpdater() {
 14:   // Configure logger
 15:   logger.transports.file.level = 'debug';
 16:   autoUpdater.logger = logger;
 17: 
 18:   // Configure custom update config file
 19:   const resourcePath = isDev
 20:     ? path.join(process.cwd(), 'electron-update.yml')
 21:     : path.join(app.getAppPath(), 'electron-update.yml');
 22:   logger.info('Update config path:', resourcePath);
 23:   autoUpdater.updateConfigPath = resourcePath;
 24: 
 25:   // Disable auto download - we want to ask user first
 26:   autoUpdater.autoDownload = false;
 27:   autoUpdater.autoInstallOnAppQuit = true;
 28: 
 29:   autoUpdater.on('checking-for-update', () => {
 30:     logger.info('checking-for-update...');
 31:   });
 32: 
 33:   autoUpdater.on('update-available', async (info: UpdateInfo) => {
 34:     logger.info('Update available.', info);
 35: 
 36:     const dialogOpts: MessageBoxOptions = {
 37:       type: 'info' as const,
 38:       buttons: ['Update', 'Later'],
 39:       title: 'Application Update',
 40:       message: `Version ${info.version} is available.`,
 41:       detail: 'A new version is available. Would you like to update now?',
 42:     };
 43: 
 44:     const response = await dialog.showMessageBox(dialogOpts);
 45: 
 46:     if (response.response === 0) {
 47:       autoUpdater.downloadUpdate();
 48:     }
 49:   });
 50: 
 51:   autoUpdater.on('update-not-available', () => {
 52:     logger.info('Update not available.');
 53:   });
 54: 
 55:   /*
 56:    * Uncomment this before we have any published updates on github releases.
 57:    * autoUpdater.on('error', (err) => {
 58:    *   logger.error('Error in auto-updater:', err);
 59:    *   dialog.showErrorBox('Error: ', err.message);
 60:    * });
 61:    */
 62: 
 63:   autoUpdater.on('download-progress', (progressObj) => {
 64:     logger.info('Download progress:', progressObj);
 65:   });
 66: 
 67:   autoUpdater.on('update-downloaded', async (event: UpdateDownloadedEvent) => {
 68:     logger.info('Update downloaded:', formatUpdateDownloadedEvent(event));
 69: 
 70:     const dialogOpts: MessageBoxOptions = {
 71:       type: 'info' as const,
 72:       buttons: ['Restart', 'Later'],
 73:       title: 'Application Update',
 74:       message: 'Update Downloaded',
 75:       detail: 'A new version has been downloaded. Restart the application to apply the updates.',
 76:     };
 77: 
 78:     const response = await dialog.showMessageBox(dialogOpts);
 79: 
 80:     if (response.response === 0) {
 81:       autoUpdater.quitAndInstall(false);
 82:     }
 83:   });
 84: 
 85:   // Check for updates
 86:   try {
 87:     logger.info('Checking for updates. Current version:', app.getVersion());
 88:     await autoUpdater.checkForUpdates();
 89:   } catch (err) {
 90:     logger.error('Failed to check for updates:', err);
 91:   }
 92: 
 93:   // Set up periodic update checks (every 4 hours)
 94:   setInterval(
 95:     () => {
 96:       autoUpdater.checkForUpdates().catch((err) => {
 97:         logger.error('Periodic update check failed:', err);
 98:       });
 99:     },
100:     4 * 60 * 60 * 1000,
101:   );
102: }
103: 
104: function formatUpdateDownloadedEvent(event: UpdateDownloadedEvent): string {
105:   return JSON.stringify({
106:     version: event.version,
107:     downloadedFile: event.downloadedFile,
108:     files: event.files.map((e) => ({ files: { url: e.url, size: e.size } })),
109:   });
110: }
````

## File: electron/main/utils/config-manager.ts
````typescript
  1: import { config } from "dotenv";
  2: import path from "node:path";
  3: import { app } from "electron";
  4: import fs from "fs";
  5: import { store } from "./store";
  6: 
  7: /**
  8:  * Supported providers
  9:  */
 10: export type ProviderType = 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter';
 11: 
 12: /**
 13:  * Model configuration interface
 14:  */
 15: export interface ModelConfig {
 16:   provider: string;
 17:   model: string;
 18:   apiKey?: string;
 19:   baseURL?: string;
 20: }
 21: 
 22: /**
 23:  * User model configurations stored in electron-store
 24:  */
 25: export interface UserModelConfigs {
 26:   deepseek?: {
 27:     apiKey?: string;
 28:     baseURL?: string;
 29:     model?: string;
 30:   };
 31:   qwen?: {
 32:     apiKey?: string;
 33:     model?: string;
 34:   };
 35:   google?: {
 36:     apiKey?: string;
 37:     model?: string;
 38:   };
 39:   anthropic?: {
 40:     apiKey?: string;
 41:     model?: string;
 42:   };
 43:   openrouter?: {
 44:     apiKey?: string;
 45:     model?: string;
 46:   };
 47:   selectedProvider?: ProviderType;
 48: }
 49: 
 50: /**
 51:  * Agent configuration interface
 52:  */
 53: export interface AgentConfig {
 54:   browserAgent: {
 55:     enabled: boolean;
 56:     customPrompt: string;
 57:   };
 58:   fileAgent: {
 59:     enabled: boolean;
 60:     customPrompt: string;
 61:   };
 62:   // MCP Tools configuration - dynamically managed
 63:   mcpTools: {
 64:     [toolName: string]: {
 65:       enabled: boolean;
 66:       config?: Record<string, any>;
 67:     };
 68:   };
 69: }
 70: 
 71: /**
 72:  * Configuration Manager for handling environment variables in both development and production
 73:  */
 74: export class ConfigManager {
 75:   private static instance: ConfigManager;
 76:   private initialized = false;
 77: 
 78:   private constructor() {}
 79: 
 80:   public static getInstance(): ConfigManager {
 81:     if (!ConfigManager.instance) {
 82:       ConfigManager.instance = new ConfigManager();
 83:     }
 84:     return ConfigManager.instance;
 85:   }
 86: 
 87:   /**
 88:    * Initialize configuration with bundled configuration support
 89:    * Priority: Bundled .env.production > System env > Default values
 90:    */
 91:   public initialize(): void {
 92:     if (this.initialized) {
 93:       return;
 94:     }
 95: 
 96:     const isDev = !app.isPackaged;
 97: 
 98:     // Development: load from .env.local
 99:     if (isDev) {
100:       const envLocalPath = path.join(process.cwd(), '.env.local');
101:       if (fs.existsSync(envLocalPath)) {
102:         config({ path: envLocalPath });
103:         console.log('[ConfigManager] Loaded environment variables from .env.local');
104:         this.initialized = true;
105:         return;
106:       }
107:     }
108: 
109:     // Production: try to load bundled .env.production
110:     const bundledConfigPath = path.join(app.getAppPath(), '../../.env.production');
111: 
112:     if (fs.existsSync(bundledConfigPath)) {
113:       config({ path: bundledConfigPath });
114:       console.log('[ConfigManager] Loaded environment variables from bundled .env.production');
115:     } else {
116:       console.log('[ConfigManager] No bundled config found, using system environment variables');
117:     }
118: 
119:     this.logAvailableKeys();
120:     this.initialized = true;
121:   }
122: 
123:   /**
124:    * Get API key with fallback
125:    */
126:   public getApiKey(key: string, defaultValue: string = ''): string {
127:     return process.env[key] || defaultValue;
128:   }
129: 
130:   /**
131:    * Check if required API keys are configured
132:    */
133:   public validateApiKeys(): { isValid: boolean; missingKeys: string[] } {
134:     const requiredKeys = ['DEEPSEEK_API_KEY', 'BAILIAN_API_KEY'];
135:     const missingKeys = requiredKeys.filter(key => !this.getApiKey(key));
136: 
137:     return {
138:       isValid: missingKeys.length === 0,
139:       missingKeys
140:     };
141:   }
142: 
143:   /**
144:    * Log available API keys for debugging (masked)
145:    */
146:   private logAvailableKeys(): void {
147:     const availableKeys = ['DEEPSEEK_API_KEY', 'BAILIAN_API_KEY', 'OPENROUTER_API_KEY']
148:       .filter(key => process.env[key])
149:       .map(key => `${key.substring(0, 8)}...`);
150: 
151:     if (availableKeys.length > 0) {
152:       console.log('[ConfigManager] Available API keys:', availableKeys);
153:     } else {
154:       console.warn('[ConfigManager] No API keys found! Please configure your API keys in .env.production before building.');
155:     }
156: 
157:     // Validate required keys
158:     const validation = this.validateApiKeys();
159:     if (!validation.isValid) {
160:       console.warn('[ConfigManager] Missing required API keys:', validation.missingKeys);
161:     }
162:   }
163: 
164:   /**
165:    * Get user model configurations from electron-store
166:    */
167:   public getUserModelConfigs(): UserModelConfigs {
168:     return store.get('modelConfigs', {}) as UserModelConfigs;
169:   }
170: 
171:   /**
172:    * Save user model configurations to electron-store
173:    */
174:   public saveUserModelConfigs(configs: UserModelConfigs): void {
175:     store.set('modelConfigs', configs);
176:     console.log('[ConfigManager] User model configurations saved');
177:   }
178: 
179:   /**
180:    * Get final model configuration with priority: user config > env > default
181:    */
182:   public getModelConfig(provider: ProviderType): ModelConfig | null {
183:     const userConfigs = this.getUserModelConfigs();
184: 
185:     switch (provider) {
186:       case 'deepseek':
187:         return {
188:           provider: 'deepseek',
189:           model: userConfigs.deepseek?.model || 'deepseek-chat',
190:           apiKey: userConfigs.deepseek?.apiKey || process.env.DEEPSEEK_API_KEY || '',
191:           baseURL: userConfigs.deepseek?.baseURL || process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'
192:         };
193: 
194:       case 'qwen':
195:         return {
196:           provider: 'openai',
197:           model: userConfigs.qwen?.model || 'qwen-max',
198:           apiKey: userConfigs.qwen?.apiKey || process.env.QWEN_API_KEY || '',
199:           baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
200:         };
201: 
202:       case 'google':
203:         return {
204:           provider: 'google',
205:           model: userConfigs.google?.model || 'gemini-1.5-flash-latest',
206:           apiKey: userConfigs.google?.apiKey || process.env.GOOGLE_API_KEY || ''
207:         };
208: 
209:       case 'anthropic':
210:         return {
211:           provider: 'anthropic',
212:           model: userConfigs.anthropic?.model || 'claude-3-5-sonnet-latest',
213:           apiKey: userConfigs.anthropic?.apiKey || process.env.ANTHROPIC_API_KEY || ''
214:         };
215: 
216:       case 'openrouter':
217:         return {
218:           provider: 'openrouter',
219:           model: userConfigs.openrouter?.model || 'anthropic/claude-3.5-sonnet',
220:           apiKey: userConfigs.openrouter?.apiKey || process.env.OPENROUTER_API_KEY || ''
221:         };
222: 
223:       default:
224:         return null;
225:     }
226:   }
227: 
228:   /**
229:    * Get API key source info (for UI display)
230:    */
231:   public getApiKeySource(provider: ProviderType): 'user' | 'env' | 'none' {
232:     const userConfigs = this.getUserModelConfigs();
233: 
234:     // Check user config first (highest priority)
235:     if (userConfigs[provider]?.apiKey) {
236:       return 'user';
237:     }
238: 
239:     // Then check environment variables
240:     const envKeys: Record<ProviderType, string> = {
241:       deepseek: 'DEEPSEEK_API_KEY',
242:       qwen: 'QWEN_API_KEY',
243:       google: 'GOOGLE_API_KEY',
244:       anthropic: 'ANTHROPIC_API_KEY',
245:       openrouter: 'OPENROUTER_API_KEY'
246:     };
247: 
248:     const envKey = envKeys[provider];
249:     if (process.env[envKey]) {
250:       return 'env';
251:     }
252: 
253:     return 'none';
254:   }
255: 
256:   /**
257:    * Get selected provider (with fallback)
258:    */
259:   public getSelectedProvider(): ProviderType {
260:     const userConfigs = this.getUserModelConfigs();
261:     return userConfigs.selectedProvider || 'deepseek';
262:   }
263: 
264:   /**
265:    * Set selected provider
266:    */
267:   public setSelectedProvider(provider: ProviderType): void {
268:     const userConfigs = this.getUserModelConfigs();
269:     userConfigs.selectedProvider = provider;
270:     this.saveUserModelConfigs(userConfigs);
271:   }
272: 
273:   /**
274:    * Get maxTokens for specific model
275:    */
276:   private getMaxTokensForModel(provider: ProviderType, model: string): number {
277:     // Define maxTokens for different models
278:     const tokenLimits: Record<string, number> = {
279:       // Deepseek
280:       'deepseek-chat': 8192,
281:       'deepseek-reasoner': 65536,
282: 
283:       // Google
284:       'gemini-2.0-flash-thinking-exp-01-21': 65536,
285:       'gemini-1.5-flash-latest': 8192,
286:       'gemini-2.0-flash-exp': 8192,
287:       'gemini-1.5-flash-002': 8192,
288:       'gemini-1.5-flash-8b': 8192,
289:       'gemini-1.5-pro-latest': 8192,
290:       'gemini-1.5-pro-002': 8192,
291:       'gemini-exp-1206': 8192,
292: 
293:       // Anthropic
294:       'claude-3-7-sonnet-20250219': 128000,
295:       'claude-3-5-sonnet-latest': 8000,
296:       'claude-3-5-sonnet-20240620': 8000,
297:       'claude-3-5-haiku-latest': 8000,
298:       'claude-3-opus-latest': 8000,
299:       'claude-3-sonnet-20240229': 8000,
300:       'claude-3-haiku-20240307': 8000,
301: 
302:       // Qwen
303:       'qwen-max': 8192,
304:       'qwen-plus': 8192,
305:       'qwen-vl-max': 8192,
306:     };
307: 
308:     // Return specific token limit or default based on provider
309:     return tokenLimits[model] || (provider === 'openrouter' ? 8000 : 8192);
310:   }
311: 
312:   /**
313:    * Get LLMs configuration for Eko framework
314:    * Returns configured LLMs object based on selected provider
315:    */
316:   public getLLMsConfig(): any {
317:     const selectedProvider = this.getSelectedProvider();
318:     const providerConfig = this.getModelConfig(selectedProvider);
319: 
320:     if (!providerConfig) {
321:       console.error(`[ConfigManager] No config found for provider: ${selectedProvider}`);
322:       return { default: null };
323:     }
324: 
325:     const logInfo = (msg: string, ...args: any[]) => console.log(`[ConfigManager] ${msg}`, ...args);
326:     const maxTokens = this.getMaxTokensForModel(selectedProvider, providerConfig.model);
327: 
328:     // Build default LLM based on selected provider
329:     let defaultLLM: any;
330: 
331:     switch (selectedProvider) {
332:       case 'deepseek':
333:         defaultLLM = {
334:           provider: providerConfig.provider,
335:           model: providerConfig.model,
336:           apiKey: providerConfig.apiKey || "",
337:           config: {
338:             baseURL: providerConfig.baseURL || "https://api.deepseek.com/v1",
339:             maxTokens,
340:             mode: 'regular',
341:           },
342:           fetch: (url: string, options?: any) => {
343:             // Intercept request and add thinking parameter for deepseek
344:             const body = JSON.parse((options?.body as string) || '{}');
345:             body.thinking = { type: "disabled" };
346:             logInfo('Deepseek request:', providerConfig.model);
347:             return fetch(url, {
348:               ...options,
349:               body: JSON.stringify(body)
350:             });
351:           }
352:         };
353:         break;
354: 
355:       case 'qwen':
356:         defaultLLM = {
357:           provider: providerConfig.provider,
358:           model: providerConfig.model,
359:           apiKey: providerConfig.apiKey || "",
360:           config: {
361:             baseURL: providerConfig.baseURL || "https://dashscope.aliyuncs.com/compatible-mode/v1",
362:             maxTokens,
363:             timeout: 60000,
364:             temperature: 0.7
365:           },
366:           fetch: (url: string, options?: any) => {
367:             logInfo('Qwen request:', providerConfig.model);
368:             return fetch(url, options);
369:           }
370:         };
371:         break;
372: 
373:       case 'google':
374:         defaultLLM = {
375:           provider: providerConfig.provider,
376:           model: providerConfig.model,
377:           apiKey: providerConfig.apiKey || "",
378:           config: {
379:             maxTokens,
380:             temperature: 0.7
381:           }
382:         };
383:         break;
384: 
385:       case 'anthropic':
386:         defaultLLM = {
387:           provider: providerConfig.provider,
388:           model: providerConfig.model,
389:           apiKey: providerConfig.apiKey || "",
390:           config: {
391:             maxTokens,
392:             temperature: 0.7
393:           }
394:         };
395:         break;
396: 
397:       case 'openrouter':
398:         defaultLLM = {
399:           provider: providerConfig.provider,
400:           model: providerConfig.model,
401:           apiKey: providerConfig.apiKey || "",
402:           config: {
403:             maxTokens
404:           }
405:         };
406:         break;
407: 
408:       default:
409:         console.error(`[ConfigManager] Unsupported provider: ${selectedProvider}`);
410:         return { default: null };
411:     }
412: 
413:     logInfo(`Using provider: ${selectedProvider}, model: ${providerConfig.model}, maxTokens: ${maxTokens}`);
414: 
415:     // Return LLMs configuration
416:     return {
417:       default: defaultLLM,
418:     };
419:   }
420: 
421:   /**
422:    * Get agent configurations from electron-store
423:    * Note: mcpTools will be merged with available tools dynamically
424:    */
425:   public getAgentConfig(): AgentConfig {
426:     const defaultConfig: AgentConfig = {
427:       browserAgent: {
428:         enabled: true,
429:         customPrompt: ''
430:       },
431:       fileAgent: {
432:         enabled: true,
433:         customPrompt: ''
434:       },
435:       mcpTools: {}  // Will be populated dynamically
436:     };
437: 
438:     return store.get('agentConfig', defaultConfig) as AgentConfig;
439:   }
440: 
441:   /**
442:    * Save agent configurations to electron-store
443:    */
444:   public saveAgentConfig(config: AgentConfig): void {
445:     store.set('agentConfig', config);
446:     console.log('[ConfigManager] Agent configurations saved');
447:   }
448: 
449:   /**
450:    * Get MCP tool configuration for a specific tool
451:    * If not configured, returns enabled by default
452:    */
453:   public getMcpToolConfig(toolName: string): { enabled: boolean; config?: Record<string, any> } {
454:     const agentConfig = this.getAgentConfig();
455:     return agentConfig.mcpTools[toolName] || { enabled: true };  // Default to enabled
456:   }
457: 
458:   /**
459:    * Set MCP tool configuration
460:    */
461:   public setMcpToolConfig(toolName: string, config: { enabled: boolean; config?: Record<string, any> }): void {
462:     const agentConfig = this.getAgentConfig();
463:     agentConfig.mcpTools[toolName] = config;
464:     this.saveAgentConfig(agentConfig);
465:   }
466: 
467:   /**
468:    * Get all MCP tools configuration
469:    * Merges with available tools from McpToolManager
470:    */
471:   public getAllMcpToolsConfig(availableTools: string[]): Record<string, { enabled: boolean; config?: Record<string, any> }> {
472:     const agentConfig = this.getAgentConfig();
473:     const result: Record<string, { enabled: boolean; config?: Record<string, any> }> = {};
474: 
475:     // For each available tool, get its config (default to enabled if not configured)
476:     availableTools.forEach(toolName => {
477:       result[toolName] = agentConfig.mcpTools[toolName] || { enabled: true };
478:     });
479: 
480:     return result;
481:   }
482: 
483:   /**
484:    * Get enabled MCP tools list
485:    */
486:   public getEnabledMcpTools(availableTools: string[]): string[] {
487:     const allConfigs = this.getAllMcpToolsConfig(availableTools);
488:     return Object.entries(allConfigs)
489:       .filter(([_, config]) => config.enabled)
490:       .map(([name, _]) => name);
491:   }
492: }
````

## File: electron/main/utils/constants.ts
````typescript
1: import { app } from 'electron';
2: 
3: export const isDev = !(global.process.env.NODE_ENV === 'production' || app.isPackaged);
4: export const DEFAULT_PORT = 5173;
````

## File: electron/main/utils/cookie.ts
````typescript
 1: import { session } from 'electron';
 2: import { DEFAULT_PORT } from './constants';
 3: import { store } from './store';
 4: 
 5: /**
 6:  * On app startup: read any existing cookies from store and set it as a cookie.
 7:  */
 8: export async function initCookies() {
 9:   await loadStoredCookies();
10: }
11: 
12: // Function to store all cookies
13: export async function storeCookies(cookies: Electron.Cookie[]) {
14:   for (const cookie of cookies) {
15:     store.set(`cookie:${cookie.name}`, cookie);
16:   }
17: }
18: 
19: // Function to load stored cookies
20: async function loadStoredCookies() {
21:   // Get all keys that start with 'cookie:'
22:   const cookieKeys = store.store ? Object.keys(store.store).filter((key) => key.startsWith('cookie:')) : [];
23: 
24:   for (const key of cookieKeys) {
25:     const cookie = store.get(key);
26: 
27:     if (cookie) {
28:       try {
29:         // Add default URL if not present
30:         const cookieWithUrl = {
31:           ...cookie,
32:           url: cookie.url || `http://localhost:${DEFAULT_PORT}`,
33:         };
34:         await session.defaultSession.cookies.set(cookieWithUrl);
35:       } catch (error) {
36:         console.error(`Failed to set cookie ${key}:`, error);
37:       }
38:     }
39:   }
40: }
````

## File: electron/main/utils/protocol.ts
````typescript
 1: import { app, net } from 'electron';
 2: import path from 'node:path';
 3: 
 4: /**
 5:  * Register client custom protocol handler
 6:  * @param protocolHandler - Protocol handler object (global protocol or session.protocol)
 7:  */
 8: export function registerClientProtocol(protocolHandler: any) {
 9:   protocolHandler.handle('client', async (request: any) => {
10:     const fileName = request.url.substring(9).replace(/\/$/, ''); // Remove 'client://' prefix and trailing slash
11:     const filePath = path.join(app.getPath('userData'), 'static', fileName);
12:     console.log(`Client protocol accessing: ${filePath}`);
13: 
14:     try {
15:       const response = await net.fetch(`file://${filePath}`);
16:       const buffer = await response.arrayBuffer();
17:       const content = new TextDecoder('utf-8').decode(buffer);
18: 
19:       // Set Content-Type based on file extension
20:       const ext = path.extname(filePath).toLowerCase();
21:       const contentType = ext === '.html' ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8';
22: 
23:       return new Response(content, {
24:         headers: { 'Content-Type': contentType }
25:       });
26:     } catch (error) {
27:       console.error('Error accessing client file:', error);
28:       return new Response('File not found', { status: 404 });
29:     }
30:   });
31: }
````

## File: electron/main/utils/reload.ts
````typescript
 1: import { app } from 'electron';
 2: import path from 'node:path';
 3: import { promises as fs } from 'node:fs';
 4: 
 5: // Reload on change.
 6: let isQuited = false;
 7: 
 8: const abort = new AbortController();
 9: const { signal } = abort;
10: 
11: export async function reloadOnChange() {
12:   const dir = path.join(app.getAppPath(), 'electron');
13: 
14:   try {
15:     const watcher = fs.watch(dir, { signal, recursive: true });
16: 
17:     // eslint-disable-next-line @typescript-eslint/no-unused-vars
18:     for await (const _event of watcher) {
19:       if (!isQuited) {
20:         isQuited = true;
21:         app.relaunch();
22:         app.quit();
23:       }
24:     }
25:   } catch (err) {
26:     if (!(err instanceof Error)) {
27:       throw err;
28:     }
29: 
30:     if (err.name === 'AbortError') {
31:       console.log('abort watching:', dir);
32:       return;
33:     }
34:   }
35: }
````

## File: electron/main/utils/store.ts
````typescript
1: import ElectronStore from 'electron-store';
2: 
3: export const store = new ElectronStore<any>({ encryptionKey: 'something' });
````

## File: electron/main/windows/main-window.ts
````typescript
  1: /**
  2:  * Main window manager
  3:  * Responsible for managing main window creation, loading state and transitions
  4:  */
  5: 
  6: import { app, BrowserWindow } from 'electron';
  7: import path from 'node:path';
  8: import { WindowState, type WindowStateInfo } from './window-states';
  9: import { ServerManager } from '../services/server-manager';
 10: import { createWindow } from '../ui/window';
 11: import { isDev } from '../utils/constants';
 12: 
 13: export class MainWindowManager {
 14:   private window?: BrowserWindow;
 15:   private serverManager: ServerManager;
 16:   private currentState: WindowStateInfo;
 17:   private readonly loadingTimeout = 30000; // 30 second timeout
 18: 
 19:   constructor(serverManager: ServerManager) {
 20:     this.serverManager = serverManager;
 21:     this.currentState = {
 22:       state: WindowState.LOADING,
 23:       timestamp: Date.now()
 24:     };
 25:   }
 26: 
 27:   /**
 28:    * Create and initialize main window
 29:    */
 30:   async createMainWindow(): Promise<BrowserWindow> {
 31:     console.log('Creating main window...');
 32: 
 33:     // Show loading page first
 34:     await this.showLoading();
 35: 
 36:     // Wait for service to be ready in background
 37:     this.waitForServerAndLoad();
 38: 
 39:     return this.window!;
 40:   }
 41: 
 42:   /**
 43:    * Show loading page
 44:    */
 45:   private async showLoading(): Promise<void> {
 46:     const loadingPath = isDev
 47:       ? path.join(process.cwd(), 'electron/renderer/loading/index.html')
 48:       : path.join(app.getAppPath(), 'renderer/loading/index.html');
 49: 
 50:     const loadingURL = `file://${loadingPath}`;
 51:     console.log('Loading transition page:', loadingURL);
 52: 
 53:     this.window = await createWindow(loadingURL);
 54:     this.updateState(WindowState.LOADING, 'Starting service...');
 55: 
 56:     console.log('Transition page loaded');
 57:   }
 58: 
 59:   /**
 60:    * Wait for service to be ready and load application
 61:    */
 62:   private async waitForServerAndLoad(): Promise<void> {
 63:     try {
 64:       console.log('Waiting for Next.js service...');
 65: 
 66:       // Set timeout timer
 67:       const timeoutPromise = new Promise<boolean>((_, reject) => {
 68:         setTimeout(() => reject(new Error('Service startup timeout')), this.loadingTimeout);
 69:       });
 70: 
 71:       // Wait for service to be ready
 72:       const serverPromise = this.serverManager.waitForServer(this.loadingTimeout);
 73: 
 74:       const isServerReady = await Promise.race([serverPromise, timeoutPromise]);
 75: 
 76:       if (isServerReady) {
 77:         await this.loadApplication();
 78:       } else {
 79:         throw new Error('Service startup failed');
 80:       }
 81:     } catch (error) {
 82:       console.error('Service startup failed:', error);
 83:       await this.handleLoadingError(error as Error);
 84:     }
 85:   }
 86: 
 87:   /**
 88:    * Load main application
 89:    */
 90:   private async loadApplication(): Promise<void> {
 91:     if (!this.window) {
 92:       throw new Error('Window not initialized');
 93:     }
 94: 
 95:     try {
 96:       const appURL = this.serverManager.getServerURL();
 97:       console.log('Loading application:', appURL);
 98: 
 99:       this.updateState(WindowState.READY, 'Service ready, loading application...');
100: 
101:       await this.window.loadURL(appURL);
102: 
103:       console.log('Application loaded');
104:     } catch (error) {
105:       console.error('Application loading failed:', error);
106:       throw error;
107:     }
108:   }
109: 
110:   /**
111:    * Handle loading error
112:    */
113:   private async handleLoadingError(error: Error): Promise<void> {
114:     console.error('Handling loading error:', error);
115: 
116:     this.updateState(WindowState.ERROR, `Loading failed: ${error.message}`);
117: 
118:     if (!this.window) return;
119: 
120:     // Try to show error page or keep loading page but display error state
121:     try {
122:       // Can create an error page here, or update loading page state via JavaScript execution
123:       await this.window.webContents.executeJavaScript(`
124:         const mainText = document.querySelector('.main-text');
125:         const subText = document.querySelector('.sub-text');
126:         const progressFill = document.querySelector('.progress-fill');
127: 
128:         if (mainText) mainText.textContent = 'Service startup failed';
129:         if (subText) subText.textContent = 'Please check network connection or restart application';
130:         if (progressFill) {
131:           progressFill.style.background = '#ef4444';
132:           progressFill.style.width = '100%';
133:         }
134:       `);
135:     } catch (jsError) {
136:       console.error('Failed to update loading page error state:', jsError);
137:     }
138:   }
139: 
140:   /**
141:    * Update window state
142:    */
143:   private updateState(state: WindowState, message?: string): void {
144:     this.currentState = {
145:       state,
146:       message,
147:       timestamp: Date.now()
148:     };
149: 
150:     console.log(`Window state updated: ${state} - ${message || ''}`);
151:   }
152: 
153:   /**
154:    * Get current window state
155:    */
156:   getCurrentState(): WindowStateInfo {
157:     return { ...this.currentState };
158:   }
159: 
160:   /**
161:    * Get main window instance
162:    */
163:   getWindow(): BrowserWindow | undefined {
164:     return this.window;
165:   }
166: 
167:   /**
168:    * Reload application (for error recovery)
169:    */
170:   async reload(): Promise<void> {
171:     if (!this.window) return;
172: 
173:     console.log('Reloading application...');
174: 
175:     // Show loading page again
176:     await this.showLoading();
177: 
178:     // Wait for service again
179:     this.waitForServerAndLoad();
180:   }
181: }
````

## File: electron/main/windows/window-states.ts
````typescript
 1: /**
 2:  * Window state enumeration
 3:  */
 4: 
 5: export enum WindowState {
 6:   LOADING = 'loading',
 7:   READY = 'ready',
 8:   ERROR = 'error'
 9: }
10: 
11: export interface WindowStateInfo {
12:   state: WindowState;
13:   message?: string;
14:   timestamp: number;
15: }
````

## File: electron/main/index.ts
````typescript
  1: /// <reference types="vite/client" />
  2: import {
  3:   app,
  4:   BrowserWindow,
  5:   dialog,
  6:   WebContentsView,
  7:   protocol,
  8: } from "electron";
  9: import log from "electron-log";
 10: import path from "node:path";
 11: import * as pkg from "../../package.json";
 12: // import { setupAutoUpdater } from './utils/auto-update';
 13: import { isDev } from "./utils/constants";
 14: import { setupMenu } from "./ui/menu";
 15: import { createTray } from "./ui/tray";
 16: import { initCookies } from "./utils/cookie";
 17: import { reloadOnChange } from "./utils/reload";
 18: import { registerClientProtocol } from "./utils/protocol";
 19: import { ConfigManager } from "./utils/config-manager";
 20: 
 21: // Initialize configuration manager
 22: ConfigManager.getInstance().initialize();
 23: 
 24: import { createView } from "./ui/view";
 25: import { EkoService } from "./services/eko-service";
 26: import { ServerManager } from "./services/server-manager";
 27: import { MainWindowManager } from "./windows/main-window";
 28: import { taskScheduler } from "./services/task-scheduler";
 29: import { windowContextManager, type WindowContext } from "./services/window-context-manager";
 30: import { cwd } from "node:process";
 31: import { registerAllIpcHandlers } from "./ipc";
 32: 
 33: Object.assign(console, log.functions);
 34: 
 35: console.debug("main: import.meta.env:", import.meta.env);
 36: console.log("main: isDev:", isDev);
 37: console.log("NODE_ENV:", global.process.env.NODE_ENV);
 38: console.log("isPackaged:", app.isPackaged);
 39: 
 40: // Log unhandled errors
 41: process.on("uncaughtException", async (error) => {
 42:   console.log("Uncaught Exception:", error);
 43: });
 44: 
 45: process.on("unhandledRejection", async (error) => {
 46:   console.log("Unhandled Rejection:", error);
 47: });
 48: 
 49: (() => {
 50:   const root =
 51:     global.process.env.APP_PATH_ROOT ?? import.meta.env.VITE_APP_PATH_ROOT;
 52: 
 53:   if (root === undefined) {
 54:     console.log(
 55:       "no given APP_PATH_ROOT or VITE_APP_PATH_ROOT. default path is used."
 56:     );
 57:     return;
 58:   }
 59: 
 60:   if (!path.isAbsolute(root)) {
 61:     console.log("APP_PATH_ROOT must be absolute path.");
 62:     global.process.exit(1);
 63:   }
 64: 
 65:   console.log(`APP_PATH_ROOT: ${root}`);
 66: 
 67:   const subdirName = pkg.name;
 68: 
 69:   for (const [key, val] of [
 70:     ["appData", ""],
 71:     ["userData", subdirName],
 72:     ["sessionData", subdirName],
 73:   ] as const) {
 74:     app.setPath(key, path.join(root, val));
 75:   }
 76: 
 77:   app.setAppLogsPath(path.join(root, subdirName, "Logs"));
 78: })();
 79: 
 80: console.log("appPath:", app.getAppPath());
 81: 
 82: // Register custom protocol scheme before app ready
 83: protocol.registerSchemesAsPrivileged([
 84:   {
 85:     scheme: 'client',
 86:     privileges: {
 87:       standard: true,
 88:       secure: true,
 89:       supportFetchAPI: true,
 90:       corsEnabled: true,
 91:       bypassCSP: true
 92:     }
 93:   }
 94: ]);
 95: 
 96: const keys: Parameters<typeof app.getPath>[number][] = [
 97:   "home",
 98:   "appData",
 99:   "userData",
100:   "sessionData",
101:   "logs",
102:   "temp",
103: ];
104: keys.forEach((key) => console.log(`${key}:`, app.getPath(key)));
105: 
106: // Initialize server manager
107: const serverManager = new ServerManager();
108: 
109: // Start Next.js server in production environment
110: if (!isDev) {
111:   try {
112:     serverManager.startServer();
113:     console.log('Next.js server started successfully');
114:   } catch (error) {
115:     console.error('Failed to start Next.js server:', error);
116:   }
117: }
118: 
119: let mainWindow: BrowserWindow;
120: let detailView: WebContentsView;
121: let historyView: WebContentsView | null = null;
122: let ekoService: EkoService;
123: let mainWindowManager: MainWindowManager;
124: 
125: /**
126:  * Initialize main window and all related components
127:  * Including: detailView, ekoService, windowContext registration
128:  */
129: async function initializeMainWindow(): Promise<BrowserWindow> {
130:   console.log('[Main] Starting main window initialization...');
131: 
132:   // Create main window (includes transition page and service waiting logic)
133:   mainWindow = await mainWindowManager.createMainWindow();
134: 
135:   mainWindow.contentView.setBounds({
136:     x: 0,
137:     y: 0,
138:     width: mainWindow.getBounds().width,
139:     height: mainWindow.getBounds().height,
140:   });
141: 
142:   // Create detail panel area
143:   detailView = createView(`https://www.google.com`, "view", '1');
144:   mainWindow.contentView.addChildView(detailView);
145:   detailView.setBounds({
146:     x: 818,
147:     y: 264,
148:     width: 748,
149:     height: 560,
150:   });
151: 
152:   // Set detail view hidden by default
153:   detailView.setVisible(false);
154: 
155:   detailView.webContents.setWindowOpenHandler(({url}) => {
156:     detailView.webContents.loadURL(url);
157:     return {
158:       action: "deny",
159:     }
160:   })
161: 
162:   // Listen for detail view URL changes
163:   detailView.webContents.on('did-navigate', (_event, url) => {
164:     console.log('detail view did-navigate:', url);
165:     mainWindow?.webContents.send('url-changed', url);
166:   });
167: 
168:   detailView.webContents.on('did-navigate-in-page', (_event, url) => {
169:     console.log('detail view did-navigate-in-page:', url);
170:     mainWindow?.webContents.send('url-changed', url);
171:   });
172: 
173:   // Initialize EkoService
174:   ekoService = new EkoService(mainWindow, detailView);
175: 
176:   // Register main window to windowContextManager
177:   const mainWindowContext: WindowContext = {
178:     window: mainWindow,
179:     detailView,
180:     historyView,
181:     ekoService,
182:     webContentsId: mainWindow.webContents.id,
183:     windowType: 'main'
184:   };
185:   windowContextManager.registerWindow(mainWindowContext);
186:   console.log('[Main] Main window registered to WindowContextManager');
187: 
188:   // Listen for window close event (close: triggered before closing, can be prevented)
189:   // Unified handling for Mac and Windows: check task status, prompt user
190:   mainWindow.on('close', async (event) => {
191:     // Check if any task is running
192:     const hasRunningTask = ekoService.hasRunningTask();
193: 
194:     if (hasRunningTask) {
195:       // Prevent default close behavior
196:       event.preventDefault();
197: 
198:       // Show confirmation dialog
199:       const { response } = await dialog.showMessageBox(mainWindow, {
200:         type: 'warning',
201:         title: 'Task Running',
202:         message: 'A task is currently running. Closing the window will cause the task to fail',
203:         detail: 'Please choose an action:',
204:         buttons: process.platform === 'darwin'
205:           ? ['Cancel', 'Stop Task and Close']
206:           : ['Cancel', 'Stop Task and Minimize'],
207:         defaultId: 0,
208:         cancelId: 0
209:       });
210: 
211:       if (response === 1) {
212:         // Stop task
213:         console.log('[Main] User chose to stop task');
214: 
215:         // Get all task IDs
216:         const allTaskIds = ekoService['eko']?.getAllTaskId() || [];
217: 
218:         // Abort all tasks
219:         await ekoService.abortAllTasks();
220: 
221:         // Send abort event (frontend will listen and update IndexedDB)
222:         allTaskIds.forEach(taskId => {
223:           mainWindow.webContents.send('task-aborted-by-system', {
224:             taskId,
225:             reason: 'User closed window, task terminated',
226:             timestamp: new Date().toISOString()
227:           });
228:         });
229: 
230:         // Delay to ensure message delivery and processing
231:         await new Promise(resolve => setTimeout(resolve, 1000));
232: 
233:         if (process.platform === 'darwin') {
234:           // Mac: actually close window
235:           mainWindow.destroy();
236:         } else {
237:           // Windows/Linux: hide window
238:           mainWindow.hide();
239:         }
240:       }
241:       // response === 0: cancel close, do nothing
242:     } else {
243:       // No task running
244:       if (process.platform !== 'darwin') {
245:         // Windows/Linux: hide to tray
246:         event.preventDefault();
247:         mainWindow.hide();
248:         console.log('[Main] Main window hidden to tray');
249:       }
250:       // Mac: use default behavior (close window but keep app running)
251:     }
252:   });
253: 
254:   // Listen for window closed event (closed: triggered after window is closed)
255:   // Clean up context
256:   mainWindow.on('closed', () => {
257:     console.log('[Main] Main window closed, cleaning up context');
258:     try {
259:       if (mainWindow && !mainWindow.isDestroyed() && mainWindow.webContents) {
260:         windowContextManager.unregisterWindow(mainWindow.webContents.id);
261:       }
262:     } catch (error) {
263:       console.error('[Main] Failed to clean up main window context:', error);
264:     }
265:   });
266: 
267:   console.log('[Main] Main window initialization completed');
268:   return mainWindow;
269: }
270: 
271: (async () => {
272:   await app.whenReady();
273:   console.log("App is ready");
274: 
275:   // Register global client protocol
276:   registerClientProtocol(protocol);
277: 
278:   if (isDev) {
279:     const iconPath = path.join(cwd(), "assets/icons/logo.png");
280:     console.log("Setting app icon:", iconPath);
281:     app.dock?.setIcon(iconPath);
282:   }
283: 
284:   // Load any existing cookies from ElectronStore, set as cookie
285:   await initCookies();
286: 
287:   // Initialize main window manager
288:   mainWindowManager = new MainWindowManager(serverManager);
289: 
290:   // Initialize main window and all related components
291:   mainWindow = await initializeMainWindow();
292: 
293:   // Create system tray
294:   createTray(mainWindow);
295:   console.log('[Main] System tray created');
296: 
297:   // Start task scheduler
298:   taskScheduler.start();
299:   console.log('[Main] TaskScheduler started');
300: 
301:   // macOS activate event handler
302:   app.on("activate", async () => {
303:     // Check if main window exists (regardless of task windows)
304:     const hasMainWindow = mainWindow && !mainWindow.isDestroyed();
305: 
306:     if (!hasMainWindow) {
307:       // Create main window if it doesn't exist (even if task windows exist)
308:       console.log('[Main] App activated, main window does not exist, creating main window');
309:       mainWindow = await initializeMainWindow();
310:       setupMenu(mainWindow);
311:     } else {
312:       // Main window exists, show and focus
313:       console.log('[Main] App activated, main window exists, showing and focusing');
314:       mainWindow.show();
315:       mainWindow.focus();
316:     }
317:   });
318: 
319:   return mainWindow;
320: })().then((win) => setupMenu(win));
321: 
322: // Don't quit app when all windows are closed, keep running in background (for scheduled tasks)
323: // User needs to use "Quit" option in tray menu to actually quit the app
324: app.on("window-all-closed", () => {
325:   console.log('[Main] All windows closed, app continues running in background');
326:   // Don't call app.quit(), let app continue running
327:   // Scheduled tasks will continue executing in background
328: });
329: 
330: // Register all IPC handlers
331: registerAllIpcHandlers();
332: 
333: reloadOnChange();
334: // setupAutoUpdater();
````

## File: electron/main/tsconfig.json
````json
 1: {
 2:   "include": ["."],
 3:   "compilerOptions": {
 4:     "baseUrl": "../../",
 5:     "lib": ["ESNext"],
 6:     "jsx": "preserve",
 7:     "target": "ESNext",
 8:     "noEmit": true,
 9:     "skipLibCheck": true,
10:     "useDefineForClassFields": true,
11:     "types": ["vite/client"],
12: 
13:     /* modules */
14:     "moduleResolution": "Bundler",
15:     "allowImportingTsExtensions": true,
16:     "resolveJsonModule": true,
17:     "module": "ESNext",
18:     "isolatedModules": true,
19:     "emitDeclarationOnly": true,
20:     "declaration": true,
21:     "declarationDir": "./dist",
22: 
23:     /* type checking */
24:     "strict": true,
25:     "noUnusedLocals": true,
26:     "noUnusedParameters": true,
27:     "noFallthroughCasesInSwitch": true,
28:     "noImplicitReturns": true,
29:     "verbatimModuleSyntax": true,
30:     "forceConsistentCasingInFileNames": true
31:   }
32: }
````

## File: electron/main/vite.config.ts
````typescript
 1: import { resolve } from 'path';
 2: import { defineConfig } from 'vite';
 3: 
 4: export default defineConfig({
 5:   build: {
 6:     lib: {
 7:       entry: resolve('electron/main/index.ts'),
 8:       formats: ['es'],
 9:     },
10:     rollupOptions: {
11:       external: [
12:         'vite',
13:         'electron',
14:         ...[
15:           'electron-log',
16: 
17:           // electron-log uses fs internally
18:           'fs',
19:           'util',
20:         ],
21:         'node:module',
22:         /\.node$/,
23:         // Add all Node.js built-in modules as external
24:         'node:fs',
25:         'node:path',
26:         'node:url',
27:         'node:util',
28:         'node:stream',
29:         'node:events',
30:         'node:child_process',
31:         'node:process',
32:         'node:buffer',
33:         'fs',
34:         'fs/promises',
35:         'path',
36:         'child_process',
37:         'glob',
38:         'electron-store',
39:         '@remix-run/node',
40:         '@nut-tree/nut-js',
41: 
42:         // "mime", // NOTE: don't enable. not working if it's external.
43:         'electron-updater',
44:       ],
45:       output: {
46:         dir: 'dist/electron',
47:         entryFileNames: 'main/[name].mjs',
48:         format: 'esm',
49:       },
50:     },
51:     minify: false,
52:     emptyOutDir: false,
53:   },
54: });
````

## File: electron/preload/index.ts
````typescript
  1: import { contextBridge, ipcRenderer } from 'electron'
  2: import { electronAPI } from '@electron-toolkit/preload'
  3: 
  4: // Custom APIs for renderer
  5: const api = {
  6:   // App information
  7:   getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  8:   getPlatform: () => ipcRenderer.invoke('get-platform'),
  9: 
 10:   // Window controls
 11:   onNewTab: (callback: () => void) => ipcRenderer.on('new-tab', callback),
 12:   onCloseTab: (callback: () => void) => ipcRenderer.on('close-tab', callback),
 13:   onNavigateBack: (callback: () => void) => ipcRenderer.on('navigate-back', callback),
 14:   onNavigateForward: (callback: () => void) => ipcRenderer.on('navigate-forward', callback),
 15:   onReloadPage: (callback: () => void) => ipcRenderer.on('reload-page', callback),
 16:   onShowAbout: (callback: () => void) => ipcRenderer.on('show-about', callback),
 17: 
 18:   // Remove listeners
 19:   removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel),
 20: 
 21:   getHiddenWindowSourceId: () => ipcRenderer.invoke('get-hidden-window-source-id'),
 22:   
 23:   // Voice text transmission related APIs
 24:   sendVoiceTextToChat: (text: string) => ipcRenderer.invoke('send-voice-text-to-chat', text),
 25:   onVoiceTextReceived: (callback: (text: string) => void) => ipcRenderer.on('voice-text-received', (_, text) => callback(text)),
 26:   
 27:   // TTS subtitle related APIs
 28:   sendTTSSubtitle: (text: string, isStart: boolean) => ipcRenderer.invoke('send-tts-subtitle', text, isStart),
 29:   onTTSSubtitleReceived: (callback: (text: string, isStart: boolean) => void) => 
 30:     ipcRenderer.on('tts-subtitle-received', (_, text, isStart) => callback(text, isStart)),
 31:   
 32:   // View window controls
 33:   showViewWindow: () => ipcRenderer.invoke('show-view-window'),
 34:   
 35:   // EkoService related APIs
 36:   ekoRun: (message: string) => ipcRenderer.invoke('eko:run', message),
 37:   ekoModify: (taskId: string, message: string) => ipcRenderer.invoke('eko:modify', taskId, message),
 38:   ekoExecute: (taskId: string) => ipcRenderer.invoke('eko:execute', taskId),
 39:   ekoGetTaskStatus: (taskId: string) => ipcRenderer.invoke('eko:getTaskStatus', taskId),
 40:   ekoCancelTask: (taskId: string) => ipcRenderer.invoke('eko:cancel-task', taskId),
 41:   onEkoStreamMessage: (callback: (message: any) => void) => ipcRenderer.on('eko-stream-message', (_, message) => callback(message)),
 42: 
 43:   // Model configuration APIs
 44:   getUserModelConfigs: () => ipcRenderer.invoke('config:get-user-configs'),
 45:   saveUserModelConfigs: (configs: any) => ipcRenderer.invoke('config:save-user-configs', configs),
 46:   getModelConfig: (provider: 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter') => ipcRenderer.invoke('config:get-model-config', provider),
 47:   getApiKeySource: (provider: 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter') => ipcRenderer.invoke('config:get-api-key-source', provider),
 48:   getSelectedProvider: () => ipcRenderer.invoke('config:get-selected-provider'),
 49:   setSelectedProvider: (provider: 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter') => ipcRenderer.invoke('config:set-selected-provider', provider),
 50: 
 51:   // Agent configuration APIs
 52:   getAgentConfig: () => ipcRenderer.invoke('agent:get-config'),
 53:   saveAgentConfig: (config: any) => ipcRenderer.invoke('agent:save-config', config),
 54:   getMcpTools: () => ipcRenderer.invoke('agent:get-mcp-tools'),
 55:   setMcpToolEnabled: (toolName: string, enabled: boolean) => ipcRenderer.invoke('agent:set-mcp-tool-enabled', toolName, enabled),
 56:   reloadAgentConfig: () => ipcRenderer.invoke('agent:reload-config'),
 57: 
 58:   // Detail view control APIs
 59:   setDetailViewVisible: (visible: boolean) => ipcRenderer.invoke('set-detail-view-visible', visible),
 60:   // URL retrieval and monitoring APIs
 61:   getCurrentUrl: () => ipcRenderer.invoke('get-current-url'),
 62:   onUrlChange: (callback: (url: string) => void) => {
 63:     ipcRenderer.on('url-changed', (event, url) => callback(url));
 64:   },
 65:   // Screenshot related APIs
 66:   getMainViewScreenshot: () => ipcRenderer.invoke('get-main-view-screenshot'),
 67:   // History view management APIs
 68:   showHistoryView: (screenshot: string) => ipcRenderer.invoke('show-history-view', screenshot),
 69:   hideHistoryView: () => ipcRenderer.invoke('hide-history-view'),
 70: 
 71:   // Generic invoke method (for scheduler and other new features)
 72:   invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
 73: 
 74:   // Scheduled task execution completion listener
 75:   onTaskExecutionComplete: (callback: (event: any) => void) =>
 76:     ipcRenderer.on('task-execution-complete', (_, event) => callback(event)),
 77: 
 78:   // Open history panel listener
 79:   onOpenHistoryPanel: (callback: (event: any) => void) =>
 80:     ipcRenderer.on('open-history-panel', (_, event) => callback(event)),
 81: 
 82:   // Task aborted by system listener
 83:   onTaskAbortedBySystem: (callback: (event: any) => void) =>
 84:     ipcRenderer.on('task-aborted-by-system', (_, event) => callback(event)),
 85: 
 86: }
 87: 
 88: // Use `contextBridge` APIs to expose Electron APIs to
 89: // renderer only if context isolation is enabled, otherwise
 90: // just add to the DOM global.
 91: if (process.contextIsolated) {
 92:   try {
 93:     contextBridge.exposeInMainWorld('electron', electronAPI)
 94:     contextBridge.exposeInMainWorld('api', api)
 95:   } catch (error) {
 96:     console.error(error)
 97:   }
 98: } else {
 99:   // @ts-ignore (define in dts)
100:   window.electron = electronAPI
101:   // @ts-ignore (define in dts)
102:   window.api = api
103: }
````

## File: electron/preload/tsconfig.json
````json
1: {
2:   "extends": "../main/tsconfig.json",
3:   "include": ["./**/*.ts"],
4:   "compilerOptions": {
5:     "rootDir": "."
6:   }
7: }
````

## File: electron/preload/view.ts
````typescript
  1: import { contextBridge, ipcRenderer } from "electron";
  2: import { electronAPI } from "@electron-toolkit/preload";
  3: 
  4: console.log("view preload");
  5: 
  6: (function () {
  7:   'use strict';
  8: 
  9:   // Save original methods before overriding them
 10:   (globalThis as any).Element.prototype._addEventListener = (globalThis as any).Element.prototype.addEventListener;
 11:   (globalThis as any).Element.prototype._removeEventListener = (globalThis as any).Element.prototype.removeEventListener;
 12: 
 13:   /**
 14:    * Add event listener
 15:    * @param {[type]}  type       [Event type, e.g.: click]
 16:    * @param {[type]}  listener   [Execution function]
 17:    * @param {Boolean} useCapture [Trigger type, true=event executes in capture phase, false=bubbling phase]
 18:    * @param {string} notes Optional, note text for event description, useful for distinguishing same events/functions for different features
 19:    */
 20:   (globalThis as any).Element.prototype.addEventListener = function (type: any, listener: any, useCapture = false, notes?: any) {
 21:       // Declare event listener
 22:       this._addEventListener(type, listener, useCapture);
 23: 
 24:       if (!this.eventListenerList) this.eventListenerList = {};
 25:       if (!this.eventListenerList[type]) this.eventListenerList[type] = [];
 26: 
 27:       // Add listener to event tracking list
 28:       this.eventListenerList[type].push({ type, listener, useCapture, notes });
 29:   };
 30: 
 31:   /**
 32:    * Remove event listener
 33:    * @param  {[type]}  type       [Event type, e.g.: click]
 34:    * @param  {[type]}  listener   [Execution function]
 35:    * @param  {Boolean} useCapture [Trigger type]
 36:    * @return {[type]}             [description]
 37:    */
 38:   (globalThis as any).Element.prototype.removeEventListener = function (type: any, listener: any, useCapture = false) {
 39:       // Remove listener
 40: 
 41:       this._removeEventListener(type, listener, useCapture);
 42: 
 43:       if (!this.eventListenerList) this.eventListenerList = {};
 44:       if (!this.eventListenerList[type]) this.eventListenerList[type] = [];
 45: 
 46:       // Find event in the list, if listener registered twice (with and without capture), remove each one separately.
 47: 
 48:       for (let i = 0; i < this.eventListenerList[type].length; i++) {
 49:           if (this.eventListenerList[type][i].listener === listener && this.eventListenerList[type][i].useCapture === useCapture) {
 50:               this.eventListenerList[type].splice(i, 1);
 51:               break;
 52:           }
 53:       }
 54:       // If no more events of deleted event type remain, delete the group
 55:       if (this.eventListenerList[type].length == 0) delete this.eventListenerList[type];
 56:   };
 57: 
 58: 
 59:   /**
 60:    * [Get event listeners]
 61:    * @param  {[type]} type [Event type]
 62:    * @return {[type]}      [Return all events of target]
 63:    */
 64:   (globalThis as any).Element.prototype.getEventListeners = function (type?: any) {
 65:       if (!this.eventListenerList) this.eventListenerList = {};
 66: 
 67:       // Return required listener type or all listeners
 68:       if (type === undefined) return this.eventListenerList;
 69:       return this.eventListenerList[type];
 70:   };
 71: 
 72: })();
 73: 
 74: 
 75: // Custom APIs for renderer
 76: const api = {
 77:   // App information
 78:   getAppVersion: () => ipcRenderer.invoke("get-app-version"),
 79:   getPlatform: () => ipcRenderer.invoke("get-platform"),
 80: 
 81:   // Window controls
 82:   onNewTab: (callback: () => void) => ipcRenderer.on("new-tab", callback),
 83:   onCloseTab: (callback: () => void) => ipcRenderer.on("close-tab", callback),
 84:   onNavigateBack: (callback: () => void) =>
 85:     ipcRenderer.on("navigate-back", callback),
 86:   onNavigateForward: (callback: () => void) =>
 87:     ipcRenderer.on("navigate-forward", callback),
 88:   onReloadPage: (callback: () => void) =>
 89:     ipcRenderer.on("reload-page", callback),
 90:   onShowAbout: (callback: () => void) => ipcRenderer.on("show-about", callback),
 91: 
 92:   // Remove listeners
 93:   removeAllListeners: (channel: string) =>
 94:     ipcRenderer.removeAllListeners(channel),
 95:   getHiddenWindowSourceId: () => ipcRenderer.invoke('get-hidden-window-source-id'),
 96:   showViewWindow: () => ipcRenderer.invoke('show-view-window'),
 97:   hideViewWindow: () => ipcRenderer.invoke('hide-view-window'),
 98: 
 99:     // Voice text transmission related APIs
100:     sendVoiceTextToChat: (text: string) => ipcRenderer.invoke('send-voice-text-to-chat', text),
101:     onVoiceTextReceived: (callback: (text: string) => void) => ipcRenderer.on('voice-text-received', (_, text) => callback(text)),
102: 
103:       // TTS subtitle related APIs
104:   sendTTSSubtitle: (text: string, isStart: boolean) => ipcRenderer.invoke('send-tts-subtitle', text, isStart),
105:   onTTSSubtitleReceived: (callback: (text: string, isStart: boolean) => void) => 
106:     ipcRenderer.on('tts-subtitle-received', (_, text, isStart) => callback(text, isStart)),
107:   getMainViewWindowNumber: () => ipcRenderer.invoke('get-main-view-window-number'),
108:   captureWindow: (winNo: number, scale = 1) => ipcRenderer.invoke('native:captureWindow', winNo, scale),
109:   captureWindowSync: (winNo: number, scale = 1) => ipcRenderer.sendSync('native:captureWindow:sync', winNo, scale),
110:   requestCapturePermission: () => ipcRenderer.invoke('native:requestCapturePermission'),
111:   onFileUpdated: (callback: (status: string, content: string) => void) => ipcRenderer.on('file-updated', (_, status, content) => callback(status, content)),
112: };
113: 
114: // Use `contextBridge` APIs to expose Electron APIs to
115: // renderer only if context isolation is enabled, otherwise
116: // just add to the DOM global.
117: if (process.contextIsolated) {
118:   try {
119:     contextBridge.exposeInMainWorld("electron", electronAPI);
120:     contextBridge.exposeInMainWorld("api", api);
121:   } catch (error) {
122:     console.error(error);
123:   }
124: } else {
125:   // @ts-ignore (define in dts)
126:   window.electron = electronAPI;
127:   // @ts-ignore (define in dts)
128:   window.api = api;
129: }
130: 
131: ipcRenderer.on("call-view-func", async (event, { payload, replyChannel }) => {
132:   let func;
133:   try {
134:     // @ts-ignore (define in dts) Use eval to maintain execution context
135:     func = window.eval(`(${payload.func})`);
136:   } catch (e: any) {
137:     console.error("Failed to deserialize function:", e);
138:     ipcRenderer.send(replyChannel, { error: e.message });
139:     return;
140:   }
141: 
142:   let result;
143:   try {
144:     // @ts-ignore (define in dts)
145:     result = await func(...payload.args);
146:   } catch (e: any) {
147:     result = { error: e.message };
148:   }
149: 
150:   console.log("call-view-func result", result);
151: 
152:   ipcRenderer.send(replyChannel, result);
153: });
````

## File: electron/preload/vite.config.ts
````typescript
 1: import { resolve } from 'path';
 2: import { defineConfig } from 'vite';
 3: 
 4: const entryFile = process.env.ENTRY;
 5: 
 6: if (!entryFile) throw new Error('ENTRY env variable is required');
 7: 
 8: 
 9: export default defineConfig({
10:   build: {
11:     lib: {
12:       entry: resolve(`electron/preload/${entryFile}.ts`),
13:       formats: ['cjs'],
14:     },
15:     rollupOptions: {
16:       external: ['electron'],
17:       output: {
18:         dir: 'dist/electron',
19:         /*
20:          * preload must be cjs format.
21:          * if mjs, it will be error:
22:          *   - Unable to load preload script.
23:          *   - SyntaxError: Cannot use import statement outside a module.
24:          */
25:         // Output filename configuration for multiple entries
26:         entryFileNames: `preload/${entryFile}.cjs`,
27:         format: 'cjs',
28:         manualChunks: undefined, // 👈 Disable chunk splitting
29:       },
30:     },
31:     minify: false,
32:     emptyOutDir: false,
33:   },
34:   esbuild: {
35:     platform: 'node',
36:   },
37: });
````

## File: electron/renderer/loading/index.html
````html
 1: <!DOCTYPE html>
 2: <html lang="en">
 3: <head>
 4:   <meta charset="UTF-8">
 5:   <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6:   <title>DeepFundAI Browser - Loading</title>
 7:   <link rel="stylesheet" href="./style.css">
 8: </head>
 9: <body>
10:   <div class="loading-container">
11:     <div class="logo-section">
12:       <div class="logo">
13:         <div class="logo-text">
14:           <span class="logo-ai">Deep</span><span class="logo-f">Fund</span><span class="logo-number">AI</span>
15:         </div>
16:         <div class="subtitle">Your Intelligent Investment Browser</div>
17:       </div>
18:     </div>
19:     
20:     <div class="loading-section">
21:       <div class="loading-spinner">
22:         <div class="spinner-ring"></div>
23:         <div class="spinner-ring"></div>
24:         <div class="spinner-ring"></div>
25:       </div>
26:       
27:       <div class="loading-text">
28:         <div class="main-text">Starting services...</div>
29:         <div class="sub-text">Please wait, first startup may take longer</div>
30:       </div>
31:     </div>
32:     
33:     <div class="progress-section">
34:       <div class="progress-bar">
35:         <div class="progress-fill"></div>
36:       </div>
37:     </div>
38:   </div>
39:   
40:   <script src="./script.js"></script>
41: </body>
42: </html>
````

## File: electron/renderer/loading/script.js
````javascript
 1: // Loading Page Interactive Script
 2: 
 3: class LoadingManager {
 4:   constructor() {
 5:     this.startTime = Date.now();
 6:     this.messages = [
 7:       'Starting service...',
 8:       'Initializing components...',
 9:       'Loading resources...',
10:       'Almost ready...'
11:     ];
12:     this.currentMessageIndex = 0;
13:     this.init();
14:   }
15: 
16:   init() {
17:     this.updateLoadingText();
18:     this.simulateProgress();
19: 
20:     // Update loading text every 3 seconds
21:     setInterval(() => {
22:       this.updateLoadingText();
23:     }, 3000);
24:   }
25: 
26:   updateLoadingText() {
27:     const mainTextElement = document.querySelector('.main-text');
28:     if (mainTextElement) {
29:       mainTextElement.textContent = this.messages[this.currentMessageIndex];
30:       this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
31:     }
32:   }
33: 
34:   simulateProgress() {
35:     const progressFill = document.querySelector('.progress-fill');
36:     const subText = document.querySelector('.sub-text');
37: 
38:     if (!progressFill || !subText) return;
39: 
40:     let progress = 0;
41:     const updateProgress = () => {
42:       const elapsed = Date.now() - this.startTime;
43: 
44:       // Simulate progress, faster in first 10 seconds, then slower
45:       if (elapsed < 10000) {
46:         progress = Math.min(70, (elapsed / 10000) * 70);
47:       } else {
48:         progress = Math.min(95, 70 + ((elapsed - 10000) / 20000) * 25);
49:       }
50: 
51:       progressFill.style.width = `${progress}%`;
52: 
53:       // Update hint text
54:       if (elapsed > 15000) {
55:         subText.textContent = 'Service startup is taking longer, please be patient...';
56:       } else if (elapsed > 8000) {
57:         subText.textContent = 'Almost there...';
58:       }
59: 
60:       // If exceeds 30 seconds, show error message
61:       if (elapsed > 30000) {
62:         this.showError();
63:         return;
64:       }
65: 
66:       requestAnimationFrame(updateProgress);
67:     };
68: 
69:     requestAnimationFrame(updateProgress);
70:   }
71: 
72:   showError() {
73:     const mainText = document.querySelector('.main-text');
74:     const subText = document.querySelector('.sub-text');
75:     const progressFill = document.querySelector('.progress-fill');
76: 
77:     if (mainText) mainText.textContent = 'Service startup failed';
78:     if (subText) subText.textContent = 'Please check network connection or restart application';
79:     if (progressFill) {
80:       progressFill.style.background = '#ef4444';
81:       progressFill.style.width = '100%';
82:     }
83: 
84:     // Stop animation
85:     const spinner = document.querySelector('.loading-spinner');
86:     if (spinner) {
87:       spinner.style.animation = 'none';
88:     }
89:   }
90: }
91: 
92: // Initialize loading manager
93: document.addEventListener('DOMContentLoaded', () => {
94:   new LoadingManager();
95: });
````

## File: electron/renderer/loading/style.css
````css
  1: /* Loading Page Styles */
  2: * {
  3:   margin: 0;
  4:   padding: 0;
  5:   box-sizing: border-box;
  6: }
  7: 
  8: body {
  9:   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
 10:   background: linear-gradient(135deg, #0c1426 0%, #020617 100%);
 11:   color: #f8fafc;
 12:   height: 100vh;
 13:   overflow: hidden;
 14:   display: flex;
 15:   align-items: center;
 16:   justify-content: center;
 17:   position: relative;
 18: }
 19: 
 20: body::before {
 21:   content: '';
 22:   position: absolute;
 23:   top: 0;
 24:   left: 0;
 25:   right: 0;
 26:   bottom: 0;
 27:   background:
 28:     radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
 29:     radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
 30:     radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.02) 0%, transparent 50%);
 31:   pointer-events: none;
 32: }
 33: 
 34: .loading-container {
 35:   display: flex;
 36:   flex-direction: column;
 37:   align-items: center;
 38:   justify-content: center;
 39:   text-align: center;
 40:   padding: 2rem;
 41:   max-width: 500px;
 42:   width: 100%;
 43:   position: relative;
 44:   z-index: 1;
 45: }
 46: 
 47: /* Logo Section */
 48: .logo-section {
 49:   margin-bottom: 3rem;
 50: }
 51: 
 52: .logo {
 53:   display: flex;
 54:   flex-direction: column;
 55:   align-items: center;
 56:   gap: 0.5rem;
 57: }
 58: 
 59: .logo-text {
 60:   font-size: 3.5rem;
 61:   font-weight: 700;
 62:   letter-spacing: -0.02em;
 63:   display: flex;
 64:   align-items: baseline;
 65:   gap: 0.1em;
 66:   animation: logoGlow 2s ease-in-out infinite alternate;
 67: }
 68: 
 69: .logo-ai {
 70:   background: linear-gradient(135deg, #3b82f6, #1d4ed8);
 71:   -webkit-background-clip: text;
 72:   -webkit-text-fill-color: transparent;
 73:   background-clip: text;
 74:   font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
 75:   font-weight: 800;
 76:   text-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
 77:   animation: aiPulse 3s ease-in-out infinite;
 78: }
 79: 
 80: .logo-f {
 81:   background: linear-gradient(135deg, #64748b, #334155);
 82:   -webkit-background-clip: text;
 83:   -webkit-text-fill-color: transparent;
 84:   background-clip: text;
 85:   font-family: 'Menlo', 'Monaco', 'Cascadia Code', monospace;
 86:   font-weight: 900;
 87:   font-style: italic;
 88:   transform: rotate(-3deg);
 89:   text-shadow: 0 0 25px rgba(100, 116, 139, 0.5);
 90:   animation: fBounce 2.5s ease-in-out infinite;
 91: }
 92: 
 93: .logo-number {
 94:   background: linear-gradient(135deg, #06b6d4, #0891b2);
 95:   -webkit-background-clip: text;
 96:   -webkit-text-fill-color: transparent;
 97:   background-clip: text;
 98:   font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
 99:   font-weight: 900;
100:   font-variant-numeric: lining-nums;
101:   text-shadow: 0 0 25px rgba(6, 182, 212, 0.4);
102:   animation: numberGlow 2s ease-in-out infinite alternate;
103: }
104: 
105: .subtitle {
106:   font-size: 1.2rem;
107:   font-weight: 400;
108:   color: #64748b;
109:   letter-spacing: 0.15em;
110:   text-shadow: 0 0 10px rgba(100, 116, 139, 0.3);
111: }
112: 
113: /* Loading Section */
114: .loading-section {
115:   display: flex;
116:   flex-direction: column;
117:   align-items: center;
118:   gap: 2rem;
119:   margin-bottom: 3rem;
120: }
121: 
122: /* Spinner */
123: .loading-spinner {
124:   position: relative;
125:   width: 80px;
126:   height: 80px;
127: }
128: 
129: .spinner-ring {
130:   position: absolute;
131:   width: 100%;
132:   height: 100%;
133:   border: 3px solid transparent;
134:   border-radius: 50%;
135:   animation: spin 2s linear infinite;
136: }
137: 
138: .spinner-ring:nth-child(1) {
139:   border-top-color: #1d4ed8;
140:   border-right-color: rgba(29, 78, 216, 0.3);
141:   animation-delay: 0s;
142: }
143: 
144: .spinner-ring:nth-child(2) {
145:   border-top-color: #0891b2;
146:   border-right-color: rgba(8, 145, 178, 0.3);
147:   animation-delay: -0.4s;
148:   width: 70%;
149:   height: 70%;
150:   top: 15%;
151:   left: 15%;
152: }
153: 
154: .spinner-ring:nth-child(3) {
155:   border-top-color: #334155;
156:   border-right-color: rgba(51, 65, 85, 0.3);
157:   animation-delay: -0.8s;
158:   width: 40%;
159:   height: 40%;
160:   top: 30%;
161:   left: 30%;
162: }
163: 
164: /* Loading Text */
165: .loading-text {
166:   display: flex;
167:   flex-direction: column;
168:   gap: 0.5rem;
169: }
170: 
171: .main-text {
172:   font-size: 1.25rem;
173:   font-weight: 500;
174:   color: #f1f5f9;
175:   animation: textPulse 2s ease-in-out infinite;
176: }
177: 
178: .sub-text {
179:   font-size: 0.9rem;
180:   color: #64748b;
181:   font-weight: 300;
182: }
183: 
184: /* Progress Section */
185: .progress-section {
186:   width: 100%;
187:   max-width: 300px;
188: }
189: 
190: .progress-bar {
191:   width: 100%;
192:   height: 4px;
193:   background-color: #334155;
194:   border-radius: 2px;
195:   overflow: hidden;
196: }
197: 
198: .progress-fill {
199:   height: 100%;
200:   background: linear-gradient(90deg, #1d4ed8, #0891b2);
201:   border-radius: 2px;
202:   animation: progressMove 3s ease-in-out infinite;
203:   width: 0%;
204:   box-shadow: 0 0 10px rgba(29, 78, 216, 0.3);
205: }
206: 
207: /* Animations */
208: @keyframes logoGlow {
209:   0% {
210:     filter: brightness(1);
211:   }
212:   100% {
213:     filter: brightness(1.2);
214:   }
215: }
216: 
217: @keyframes aiPulse {
218:   0%, 100% {
219:     transform: scale(1);
220:     filter: brightness(1);
221:   }
222:   50% {
223:     transform: scale(1.05);
224:     filter: brightness(1.3) saturate(1.2);
225:   }
226: }
227: 
228: @keyframes fBounce {
229:   0%, 100% {
230:     transform: rotate(-5deg) translateY(0);
231:   }
232:   25% {
233:     transform: rotate(-3deg) translateY(-3px);
234:   }
235:   75% {
236:     transform: rotate(-7deg) translateY(2px);
237:   }
238: }
239: 
240: @keyframes numberGlow {
241:   0% {
242:     transform: scale(1);
243:     filter: brightness(1) hue-rotate(0deg);
244:   }
245:   50% {
246:     transform: scale(1.02);
247:     filter: brightness(1.2) hue-rotate(10deg);
248:   }
249:   100% {
250:     transform: scale(1);
251:     filter: brightness(1.1) hue-rotate(-5deg);
252:   }
253: }
254: 
255: @keyframes spin {
256:   0% {
257:     transform: rotate(0deg);
258:   }
259:   100% {
260:     transform: rotate(360deg);
261:   }
262: }
263: 
264: @keyframes textPulse {
265:   0%, 100% {
266:     opacity: 1;
267:   }
268:   50% {
269:     opacity: 0.7;
270:   }
271: }
272: 
273: @keyframes progressMove {
274:   0% {
275:     width: 0%;
276:     transform: translateX(-100%);
277:   }
278:   50% {
279:     width: 70%;
280:     transform: translateX(0%);
281:   }
282:   100% {
283:     width: 100%;
284:     transform: translateX(0%);
285:   }
286: }
287: 
288: /* Responsive adjustments */
289: @media (max-width: 480px) {
290:   .logo-text {
291:     font-size: 2.5rem;
292:     gap: 0.05em;
293:   }
294: 
295:   .logo-ai, .logo-f, .logo-number {
296:     text-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
297:   }
298: 
299:   .loading-container {
300:     padding: 1rem;
301:   }
302: 
303:   .loading-spinner {
304:     width: 60px;
305:     height: 60px;
306:   }
307: }
````

## File: public/jsm/AmbientLightBg.module.js
````javascript
1: function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=Array(e);i<e;i++)r[i]=t[i];return r}function e(t,e,i){return e=a(e),u(t,h()?Reflect.construct(e,i||[],a(t).constructor):e.apply(t,i))}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,f(r.key),r)}}function n(t,e,i){return e&&r(t.prototype,e),i&&r(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,i){var r=function(t,e){for(;!{}.hasOwnProperty.call(t,e)&&null!==(t=a(t)););return t}(t,e);if(r){var n=Object.getOwnPropertyDescriptor(r,e);return n.get?n.get.call(arguments.length<3?t:i):n.value}},s.apply(null,arguments)}function a(t){return a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},a(t)}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&l(t,e)}function h(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(h=function(){return!!t})()}function u(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function l(t,e){return l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},l(t,e)}function c(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||v(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,e);if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t,"string");return"symbol"==typeof e?e:e+""}function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function v(e,i){if(e){if("string"==typeof e)return t(e,i);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,i):void 0}}function g(t){var e="function"==typeof Map?new Map:void 0;return g=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,i)}function i(){return function(t,e,i){if(h())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,e);var n=new(t.bind.apply(t,r));return i&&l(n,i.prototype),n}(t,arguments,a(this).constructor)}return i.prototype=Object.create(t.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),l(i,t)},g(t)}function p(t){var e=t[0],i=t[1],r=t[2];return Math.sqrt(e*e+i*i+r*r)}function m(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function y(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t}function x(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t}function _(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t}function b(t){var e=t[0],i=t[1],r=t[2];return e*e+i*i+r*r}function E(t,e){var i=e[0],r=e[1],n=e[2],s=i*i+r*r+n*n;return s>0&&(s=1/Math.sqrt(s)),t[0]=e[0]*s,t[1]=e[1]*s,t[2]=e[2]*s,t}function w(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function k(t,e,i){var r=e[0],n=e[1],s=e[2],a=i[0],o=i[1],h=i[2];return t[0]=n*h-s*o,t[1]=s*a-r*h,t[2]=r*o-n*a,t}var M,A,T=(M=[0,0,0],A=[0,0,0],function(t,e){m(M,t),m(A,e),E(M,M),E(A,A);var i=w(M,A);return i>1?0:i<-1?Math.PI:Math.acos(i)});var R=function(t){function r(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;return i(this,r),u(t=e(this,r,[n,s,a]),t)}return o(r,g(Array)),n(r,[{key:"x",get:function(){return this[0]},set:function(t){this[0]=t}},{key:"y",get:function(){return this[1]},set:function(t){this[1]=t}},{key:"z",get:function(){return this[2]},set:function(t){this[2]=t}},{key:"set",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t;return t.length?this.copy(t):(function(t,e,i,r){t[0]=e,t[1]=i,t[2]=r}(this,t,e,i),this)}},{key:"copy",value:function(t){return m(this,t),this}},{key:"add",value:function(t,e){return e?y(this,t,e):y(this,this,t),this}},{key:"sub",value:function(t,e){return e?x(this,t,e):x(this,this,t),this}},{key:"multiply",value:function(t){var e,i,r;return t.length?(i=this,r=t,(e=this)[0]=i[0]*r[0],e[1]=i[1]*r[1],e[2]=i[2]*r[2]):_(this,this,t),this}},{key:"divide",value:function(t){var e,i,r;return t.length?(i=this,r=t,(e=this)[0]=i[0]/r[0],e[1]=i[1]/r[1],e[2]=i[2]/r[2]):_(this,this,1/t),this}},{key:"inverse",value:function(){var t,e;return e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this,(t=this)[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],this}},{key:"len",value:function(){return p(this)}},{key:"distance",value:function(t){return t?(e=this,r=(i=t)[0]-e[0],n=i[1]-e[1],s=i[2]-e[2],Math.sqrt(r*r+n*n+s*s)):p(this);var e,i,r,n,s}},{key:"squaredLen",value:function(){return b(this)}},{key:"squaredDistance",value:function(t){return t?(e=this,r=(i=t)[0]-e[0],n=i[1]-e[1],s=i[2]-e[2],r*r+n*n+s*s):b(this);var e,i,r,n,s}},{key:"negate",value:function(){var t,e;return e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this,(t=this)[0]=-e[0],t[1]=-e[1],t[2]=-e[2],this}},{key:"cross",value:function(t,e){return e?k(this,t,e):k(this,this,t),this}},{key:"scale",value:function(t){return _(this,this,t),this}},{key:"normalize",value:function(){return E(this,this),this}},{key:"dot",value:function(t){return w(this,t)}},{key:"equals",value:function(t){return i=t,(e=this)[0]===i[0]&&e[1]===i[1]&&e[2]===i[2];var e,i}},{key:"applyMatrix3",value:function(t){var e,i,r,n,s,a;return e=this,r=t,n=(i=this)[0],s=i[1],a=i[2],e[0]=n*r[0]+s*r[3]+a*r[6],e[1]=n*r[1]+s*r[4]+a*r[7],e[2]=n*r[2]+s*r[5]+a*r[8],this}},{key:"applyMatrix4",value:function(t){var e,i,r,n,s,a,o;return e=this,r=t,n=(i=this)[0],s=i[1],a=i[2],o=(o=r[3]*n+r[7]*s+r[11]*a+r[15])||1,e[0]=(r[0]*n+r[4]*s+r[8]*a+r[12])/o,e[1]=(r[1]*n+r[5]*s+r[9]*a+r[13])/o,e[2]=(r[2]*n+r[6]*s+r[10]*a+r[14])/o,this}},{key:"scaleRotateMatrix4",value:function(t){var e,i,r,n,s,a,o;return e=this,r=t,n=(i=this)[0],s=i[1],a=i[2],o=(o=r[3]*n+r[7]*s+r[11]*a+r[15])||1,e[0]=(r[0]*n+r[4]*s+r[8]*a)/o,e[1]=(r[1]*n+r[5]*s+r[9]*a)/o,e[2]=(r[2]*n+r[6]*s+r[10]*a)/o,this}},{key:"applyQuaternion",value:function(t){return function(t,e,i){var r=e[0],n=e[1],s=e[2],a=i[0],o=i[1],h=i[2],u=o*s-h*n,l=h*r-a*s,c=a*n-o*r,f=o*c-h*l,d=h*u-a*c,v=a*l-o*u,g=2*i[3];u*=g,l*=g,c*=g,f*=2,d*=2,v*=2,t[0]=r+u+f,t[1]=n+l+d,t[2]=s+c+v}(this,this,t),this}},{key:"angle",value:function(t){return T(this,t)}},{key:"lerp",value:function(t,e){return function(t,e,i,r){var n=e[0],s=e[1],a=e[2];t[0]=n+r*(i[0]-n),t[1]=s+r*(i[1]-s),t[2]=a+r*(i[2]-a)}(this,this,t,e),this}},{key:"clone",value:function(){return new r(this[0],this[1],this[2])}},{key:"fromArray",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this[0]=t[e],this[1]=t[e+1],this[2]=t[e+2],this}},{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t}},{key:"transformDirection",value:function(t){var e=this[0],i=this[1],r=this[2];return this[0]=t[0]*e+t[4]*i+t[8]*r,this[1]=t[1]*e+t[5]*i+t[9]*r,this[2]=t[2]*e+t[6]*i+t[10]*r,this.normalize()}}])}(),F=new R,S=1,C=1,P=!1,N=function(){return n((function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};for(var n in i(this,t),e.canvas,this.gl=e,this.attributes=r,this.id=S++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state,r)this.addAttribute(n,r[n])}),[{key:"addAttribute",value:function(t,e){this.attributes[t]=e;var i=this;if(e.id=C++,e.size=e.size||1,e.type=e.type||(e.data.constructor===Float32Array?this.gl.FLOAT:e.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),e.target="index"===t?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,e.normalized=e.normalized||!1,e.stride=e.stride||0,e.offset=e.offset||0,e.count=e.count||(e.stride?e.data.byteLength/e.stride:e.data.length/e.size),e.divisor=e.instanced||0,e.needsUpdate=!1,e.usage=e.usage||this.gl.STATIC_DRAW,e.getX=function(t){return this.data[t*this.size]},e.getY=function(t){return this.data[t*this.size+1]},e.getZ=function(t){return this.data[t*this.size+2]},e.setXYZ=function(t,r,n,s){t*=this.size,this.data[t+0]=r,this.data[t+1]=n,this.data[t+2]=s,i.updateAttribute(e)},e.buffer||this.updateAttribute(e),e.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==e.count*e.divisor)return this.instancedCount=Math.min(this.instancedCount,e.count*e.divisor);this.instancedCount=e.count*e.divisor}else"index"===t?this.drawRange.count=e.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,e.count))}},{key:"updateAttribute",value:function(t){var e=!t.buffer;e&&(t.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==t.buffer&&(this.gl.bindBuffer(t.target,t.buffer),this.glState.boundBuffer=t.buffer),e?this.gl.bufferData(t.target,t.data,t.usage):this.gl.bufferSubData(t.target,0,t.data),t.needsUpdate=!1}},{key:"setIndex",value:function(t){this.addAttribute("index",t)}},{key:"setDrawRange",value:function(t,e){this.drawRange.start=t,this.drawRange.count=e}},{key:"setInstancedCount",value:function(t){this.instancedCount=t}},{key:"createVAO",value:function(t){this.VAOs[t.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.bindAttributes(t)}},{key:"bindAttributes",value:function(t){var e=this;t.attributeLocations.forEach((function(t,i){var r=i.name,n=i.type;if(e.attributes[r]){var s=e.attributes[r];e.gl.bindBuffer(s.target,s.buffer),e.glState.boundBuffer=s.buffer;var a=1;35674===n&&(a=2),35675===n&&(a=3),35676===n&&(a=4);for(var o=s.size/a,h=1===a?0:a*a*4,u=1===a?0:4*a,l=0;l<a;l++)e.gl.vertexAttribPointer(t+l,o,s.type,s.normalized,s.stride+h,s.offset+l*u),e.gl.enableVertexAttribArray(t+l),e.gl.renderer.vertexAttribDivisor(t+l,s.divisor)}})),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}},{key:"draw",value:function(t){var e,i=this,r=t.program,n=t.mode,s=void 0===n?this.gl.TRIANGLES:n;this.gl.renderer.currentGeometry!=="".concat(this.id,"_").concat(r.attributeOrder)&&(this.VAOs[r.attributeOrder]||this.createVAO(r),this.gl.renderer.bindVertexArray(this.VAOs[r.attributeOrder]),this.gl.renderer.currentGeometry="".concat(this.id,"_").concat(r.attributeOrder)),r.attributeLocations.forEach((function(t,e){var r=e.name,n=i.attributes[r];n.needsUpdate&&i.updateAttribute(n)}));var a=2;(null===(e=this.attributes.index)||void 0===e?void 0:e.type)===this.gl.UNSIGNED_INT&&(a=4),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(s,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*a,this.instancedCount):this.gl.renderer.drawArraysInstanced(s,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(s,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*a):this.gl.drawArrays(s,this.drawRange.start,this.drawRange.count)}},{key:"getPosition",value:function(){var t=this.attributes.position;return t.data?t:P?void 0:P=!0}},{key:"computeBoundingBox",value:function(t){t||(t=this.getPosition());var e=t.data,i=t.size;this.bounds||(this.bounds={min:new R,max:new R,center:new R,scale:new R,radius:1/0});var r=this.bounds.min,n=this.bounds.max,s=this.bounds.center,a=this.bounds.scale;r.set(1/0),n.set(-1/0);for(var o=0,h=e.length;o<h;o+=i){var u=e[o],l=e[o+1],c=e[o+2];r.x=Math.min(u,r.x),r.y=Math.min(l,r.y),r.z=Math.min(c,r.z),n.x=Math.max(u,n.x),n.y=Math.max(l,n.y),n.z=Math.max(c,n.z)}a.sub(n,r),s.add(r,n).divide(2)}},{key:"computeBoundingSphere",value:function(t){t||(t=this.getPosition());var e=t.data,i=t.size;this.bounds||this.computeBoundingBox(t);for(var r=0,n=0,s=e.length;n<s;n+=i)F.fromArray(e,n),r=Math.max(r,this.bounds.center.squaredDistance(F));this.bounds.radius=Math.sqrt(r)}},{key:"remove",value:function(){for(var t in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[t]),delete this.VAOs[t];for(var e in this.attributes)this.gl.deleteBuffer(this.attributes[e].buffer),delete this.attributes[e]}}])}(),O=1,D={},B=function(){return n((function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.vertex,s=r.fragment,a=r.uniforms,o=void 0===a?{}:a,h=r.transparent,u=void 0!==h&&h,l=r.cullFace,c=void 0===l?e.BACK:l,f=r.frontFace,d=void 0===f?e.CCW:f,v=r.depthTest,g=void 0===v||v,p=r.depthWrite,m=void 0===p||p,y=r.depthFunc,x=void 0===y?e.LEQUAL:y;i(this,t),e.canvas,this.gl=e,this.uniforms=o,this.id=O++,this.transparent=u,this.cullFace=c,this.frontFace=d,this.depthTest=g,this.depthWrite=m,this.depthFunc=x,this.blendFunc={},this.blendEquation={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)),this.vertexShader=e.createShader(e.VERTEX_SHADER),this.fragmentShader=e.createShader(e.FRAGMENT_SHADER),this.program=e.createProgram(),e.attachShader(this.program,this.vertexShader),e.attachShader(this.program,this.fragmentShader),this.setShaders({vertex:n,fragment:s})}),[{key:"setShaders",value:function(t){var e=t.vertex,i=t.fragment;if(e&&(this.gl.shaderSource(this.vertexShader,e),this.gl.compileShader(this.vertexShader),this.gl.getShaderInfoLog(this.vertexShader)),i&&(this.gl.shaderSource(this.fragmentShader,i),this.gl.compileShader(this.fragmentShader),this.gl.getShaderInfoLog(this.fragmentShader)),this.gl.linkProgram(this.program),this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)){this.uniformLocations=new Map;for(var r=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_UNIFORMS),n=0;n<r;n++){var s=this.gl.getActiveUniform(this.program,n);this.uniformLocations.set(s,this.gl.getUniformLocation(this.program,s.name));var a=s.name.match(/(\w+)/g);s.uniformName=a[0],s.nameComponents=a.slice(1)}this.attributeLocations=new Map;for(var o=[],h=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_ATTRIBUTES),u=0;u<h;u++){var l=this.gl.getActiveAttrib(this.program,u),c=this.gl.getAttribLocation(this.program,l.name);-1!==c&&(o[c]=l.name,this.attributeLocations.set(l,c))}this.attributeOrder=o.join("")}}},{key:"setBlendFunc",value:function(t,e,i,r){this.blendFunc.src=t,this.blendFunc.dst=e,this.blendFunc.srcAlpha=i,this.blendFunc.dstAlpha=r,t&&(this.transparent=!0)}},{key:"setBlendEquation",value:function(t,e){this.blendEquation.modeRGB=t,this.blendEquation.modeAlpha=e}},{key:"applyState",value:function(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha)}},{key:"use",value:function(){var t=this,e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).flipFaces,i=void 0!==e&&e,r=-1;this.gl.renderer.state.currentProgram===this.id||(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((function(e,i){var n,s=t.uniforms[i.uniformName],a=function(t,e){var i="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!i){if(Array.isArray(t)||(i=v(t))||e){i&&(t=i);var r=0,n=function(){};return{s:n,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,o=!1;return{s:function(){i=i.call(t)},n:function(){var t=i.next();return a=t.done,t},e:function(t){o=!0,s=t},f:function(){try{a||null==i.return||i.return()}finally{if(o)throw s}}}}(i.nameComponents);try{for(a.s();!(n=a.n()).done;){var o=n.value;if(!s)break;if(!(o in s)){if(Array.isArray(s.value))break;s=void 0;break}s=s[o]}}catch(t){a.e(t)}finally{a.f()}if(!s)return I("Active uniform ".concat(i.name," has not been supplied"));if(s&&void 0===s.value)return I("".concat(i.name," uniform is missing a value parameter"));if(s.value.texture)return r+=1,s.value.update(r),z(t.gl,i.type,e,r);if(s.value.length&&s.value[0].texture){var h=[];return s.value.forEach((function(t){r+=1,t.update(r),h.push(r)})),z(t.gl,i.type,e,h)}z(t.gl,i.type,e,s.value)})),this.applyState(),i&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}},{key:"remove",value:function(){this.gl.deleteProgram(this.program)}}])}();function z(t,e,i,r){r=r.length?function(t){var e=t.length,i=t[0].length;if(void 0===i)return t;var r=e*i,n=D[r];n||(D[r]=n=new Float32Array(r));for(var s=0;s<e;s++)n.set(t[s],s*i);return n}(r):r;var n=t.renderer.state.uniformLocations.get(i);if(r.length)if(void 0===n||n.length!==r.length)t.renderer.state.uniformLocations.set(i,r.slice(0));else{if(function(t,e){if(t.length!==e.length)return!1;for(var i=0,r=t.length;i<r;i++)if(t[i]!==e[i])return!1;return!0}(n,r))return;n.set?n.set(r):function(t,e){for(var i=0,r=t.length;i<r;i++)t[i]=e[i]}(n,r),t.renderer.state.uniformLocations.set(i,n)}else{if(n===r)return;t.renderer.state.uniformLocations.set(i,r)}switch(e){case 5126:return r.length?t.uniform1fv(i,r):t.uniform1f(i,r);case 35664:return t.uniform2fv(i,r);case 35665:return t.uniform3fv(i,r);case 35666:return t.uniform4fv(i,r);case 35670:case 5124:case 35678:case 35680:return r.length?t.uniform1iv(i,r):t.uniform1i(i,r);case 35671:case 35667:return t.uniform2iv(i,r);case 35672:case 35668:return t.uniform3iv(i,r);case 35673:case 35669:return t.uniform4iv(i,r);case 35674:return t.uniformMatrix2fv(i,!1,r);case 35675:return t.uniformMatrix3fv(i,!1,r);case 35676:return t.uniformMatrix4fv(i,!1,r)}}var U=0;function I(t){U>100||U++}var L=new R,j=1,q=function(){return n((function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.canvas,n=void 0===r?document.createElement("canvas"):r,s=e.width,a=void 0===s?300:s,o=e.height,h=void 0===o?150:o,u=e.dpr,l=void 0===u?1:u,c=e.alpha,f=void 0!==c&&c,d=e.depth,v=void 0===d||d,g=e.stencil,p=void 0!==g&&g,m=e.antialias,y=void 0===m||m,x=e.premultipliedAlpha,_=void 0!==x&&x,b=e.preserveDrawingBuffer,E=void 0===b||b,w=e.powerPreference,k=void 0===w?"default":w,M=e.autoClear,A=void 0===M||M,T=e.webgl,R=void 0===T?2:T;i(this,t);var F={alpha:f,depth:v,stencil:p,antialias:y,premultipliedAlpha:_,preserveDrawingBuffer:E,powerPreference:k};this.dpr=l,this.alpha=f,this.color=!0,this.depth=v,this.stencil=p,this.premultipliedAlpha=_,this.autoClear=A,this.id=j++,2===R&&(this.gl=n.getContext("webgl2",F)),this.isWebgl2=!!this.gl,this.gl||(this.gl=n.getContext("webgl",F)),this.gl,this.gl.renderer=this,this.setSize(a,h),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=!1,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LEQUAL,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}),[{key:"setSize",value:function(t,e){this.width=t,this.height=e,this.gl.canvas.width=t*this.dpr,this.gl.canvas.height=e*this.dpr,this.gl.canvas.style&&Object.assign(this.gl.canvas.style,{width:t+"px",height:e+"px"})}},{key:"setViewport",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;this.state.viewport.width===t&&this.state.viewport.height===e||(this.state.viewport.width=t,this.state.viewport.height=e,this.state.viewport.x=i,this.state.viewport.y=r,this.gl.viewport(i,r,t,e))}},{key:"setScissor",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;this.gl.scissor(i,r,t,e)}},{key:"enable",value:function(t){!0!==this.state[t]&&(this.gl.enable(t),this.state[t]=!0)}},{key:"disable",value:function(t){!1!==this.state[t]&&(this.gl.disable(t),this.state[t]=!1)}},{key:"setBlendFunc",value:function(t,e,i,r){this.state.blendFunc.src===t&&this.state.blendFunc.dst===e&&this.state.blendFunc.srcAlpha===i&&this.state.blendFunc.dstAlpha===r||(this.state.blendFunc.src=t,this.state.blendFunc.dst=e,this.state.blendFunc.srcAlpha=i,this.state.blendFunc.dstAlpha=r,void 0!==i?this.gl.blendFuncSeparate(t,e,i,r):this.gl.blendFunc(t,e))}},{key:"setBlendEquation",value:function(t,e){t=t||this.gl.FUNC_ADD,this.state.blendEquation.modeRGB===t&&this.state.blendEquation.modeAlpha===e||(this.state.blendEquation.modeRGB=t,this.state.blendEquation.modeAlpha=e,void 0!==e?this.gl.blendEquationSeparate(t,e):this.gl.blendEquation(t))}},{key:"setCullFace",value:function(t){this.state.cullFace!==t&&(this.state.cullFace=t,this.gl.cullFace(t))}},{key:"setFrontFace",value:function(t){this.state.frontFace!==t&&(this.state.frontFace=t,this.gl.frontFace(t))}},{key:"setDepthMask",value:function(t){this.state.depthMask!==t&&(this.state.depthMask=t,this.gl.depthMask(t))}},{key:"setDepthFunc",value:function(t){this.state.depthFunc!==t&&(this.state.depthFunc=t,this.gl.depthFunc(t))}},{key:"activeTexture",value:function(t){this.state.activeTextureUnit!==t&&(this.state.activeTextureUnit=t,this.gl.activeTexture(this.gl.TEXTURE0+t))}},{key:"bindFramebuffer",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.target,i=void 0===e?this.gl.FRAMEBUFFER:e,r=t.buffer,n=void 0===r?null:r;this.state.framebuffer!==n&&(this.state.framebuffer=n,this.gl.bindFramebuffer(i,n))}},{key:"getExtension",value:function(t,e,i){return e&&this.gl[e]?this.gl[e].bind(this.gl):(this.extensions[t]||(this.extensions[t]=this.gl.getExtension(t)),e?this.extensions[t]?this.extensions[t][i].bind(this.extensions[t]):null:this.extensions[t])}},{key:"sortOpaque",value:function(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.program.id!==e.program.id?t.program.id-e.program.id:t.zDepth!==e.zDepth?t.zDepth-e.zDepth:e.id-t.id}},{key:"sortTransparent",value:function(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.zDepth!==e.zDepth?e.zDepth-t.zDepth:e.id-t.id}},{key:"sortUI",value:function(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.program.id!==e.program.id?t.program.id-e.program.id:e.id-t.id}},{key:"getRenderList",value:function(t){var e=t.scene,i=t.camera,r=t.frustumCull,n=t.sort,s=[];if(i&&r&&i.updateFrustum(),e.traverse((function(t){if(!t.visible)return!0;t.draw&&(r&&t.frustumCulled&&i&&!i.frustumIntersectsMesh(t)||s.push(t))})),n){var a=[],o=[],h=[];s.forEach((function(t){t.program.transparent?t.program.depthTest?o.push(t):h.push(t):a.push(t),t.zDepth=0,0===t.renderOrder&&t.program.depthTest&&i&&(t.worldMatrix.getTranslation(L),L.applyMatrix4(i.projectionViewMatrix),t.zDepth=L.z)})),a.sort(this.sortOpaque),o.sort(this.sortTransparent),h.sort(this.sortUI),s=a.concat(o,h)}return s}},{key:"render",value:function(t){var e=t.scene,i=t.camera,r=t.target,n=void 0===r?null:r,s=t.update,a=void 0===s||s,o=t.sort,h=void 0===o||o,u=t.frustumCull,l=void 0===u||u,c=t.clear;null===n?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(n),this.setViewport(n.width,n.height)),(c||this.autoClear&&!1!==c)&&(!this.depth||n&&!n.depth||(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),a&&e.updateMatrixWorld(),i&&i.updateMatrixWorld(),this.getRenderList({scene:e,camera:i,frustumCull:l,sort:h}).forEach((function(t){t.draw({camera:i})}))}}])}();function G(t,e,i){var r=e[0],n=e[1],s=e[2],a=e[3],o=i[0],h=i[1],u=i[2],l=i[3];return t[0]=r*l+a*o+n*u-s*h,t[1]=n*l+a*h+s*o-r*u,t[2]=s*l+a*u+r*h-n*o,t[3]=a*l-r*o-n*h-s*u,t}var W=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t},X=function(t,e,i,r,n){return t[0]=e,t[1]=i,t[2]=r,t[3]=n,t},V=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]},H=function(t,e){var i=e[0],r=e[1],n=e[2],s=e[3],a=i*i+r*r+n*n+s*s;return a>0&&(a=1/Math.sqrt(a)),t[0]=i*a,t[1]=r*a,t[2]=n*a,t[3]=s*a,t},Y=function(t){function r(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;i(this,r),(t=e(this,r,[n,s,a,o])).onChange=function(){},t._target=t;var h=["0","1","2","3"];return u(t,new Proxy(t,{set:function(t,e){var i=Reflect.set.apply(Reflect,arguments);return i&&h.includes(e)&&t.onChange(),i}}))}return o(r,g(Array)),n(r,[{key:"x",get:function(){return this[0]},set:function(t){this._target[0]=t,this.onChange()}},{key:"y",get:function(){return this[1]},set:function(t){this._target[1]=t,this.onChange()}},{key:"z",get:function(){return this[2]},set:function(t){this._target[2]=t,this.onChange()}},{key:"w",get:function(){return this[3]},set:function(t){this._target[3]=t,this.onChange()}},{key:"identity",value:function(){var t;return(t=this._target)[0]=0,t[1]=0,t[2]=0,t[3]=1,this.onChange(),this}},{key:"set",value:function(t,e,i,r){return t.length?this.copy(t):(X(this._target,t,e,i,r),this.onChange(),this)}},{key:"rotateX",value:function(t){return function(t,e,i){i*=.5;var r=e[0],n=e[1],s=e[2],a=e[3],o=Math.sin(i),h=Math.cos(i);t[0]=r*h+a*o,t[1]=n*h+s*o,t[2]=s*h-n*o,t[3]=a*h-r*o}(this._target,this._target,t),this.onChange(),this}},{key:"rotateY",value:function(t){return function(t,e,i){i*=.5;var r=e[0],n=e[1],s=e[2],a=e[3],o=Math.sin(i),h=Math.cos(i);t[0]=r*h-s*o,t[1]=n*h+a*o,t[2]=s*h+r*o,t[3]=a*h-n*o}(this._target,this._target,t),this.onChange(),this}},{key:"rotateZ",value:function(t){return function(t,e,i){i*=.5;var r=e[0],n=e[1],s=e[2],a=e[3],o=Math.sin(i),h=Math.cos(i);t[0]=r*h+n*o,t[1]=n*h-r*o,t[2]=s*h+a*o,t[3]=a*h-s*o}(this._target,this._target,t),this.onChange(),this}},{key:"inverse",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._target;return function(t,e){var i=e[0],r=e[1],n=e[2],s=e[3],a=i*i+r*r+n*n+s*s,o=a?1/a:0;t[0]=-i*o,t[1]=-r*o,t[2]=-n*o,t[3]=s*o}(this._target,t),this.onChange(),this}},{key:"conjugate",value:function(){var t,e,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._target;return t=this._target,e=i,t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=e[3],this.onChange(),this}},{key:"copy",value:function(t){return W(this._target,t),this.onChange(),this}},{key:"normalize",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._target;return H(this._target,t),this.onChange(),this}},{key:"multiply",value:function(t,e){return e?G(this._target,t,e):G(this._target,this._target,t),this.onChange(),this}},{key:"dot",value:function(t){return V(this._target,t)}},{key:"fromMatrix3",value:function(t){return function(t,e){var i,r=e[0]+e[4]+e[8];if(r>0)i=Math.sqrt(r+1),t[3]=.5*i,i=.5/i,t[0]=(e[5]-e[7])*i,t[1]=(e[6]-e[2])*i,t[2]=(e[1]-e[3])*i;else{var n=0;e[4]>e[0]&&(n=1),e[8]>e[3*n+n]&&(n=2);var s=(n+1)%3,a=(n+2)%3;i=Math.sqrt(e[3*n+n]-e[3*s+s]-e[3*a+a]+1),t[n]=.5*i,i=.5/i,t[3]=(e[3*s+a]-e[3*a+s])*i,t[s]=(e[3*s+n]+e[3*n+s])*i,t[a]=(e[3*a+n]+e[3*n+a])*i}}(this._target,t),this.onChange(),this}},{key:"fromEuler",value:function(t,e){return function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"YXZ",r=Math.sin(.5*e[0]),n=Math.cos(.5*e[0]),s=Math.sin(.5*e[1]),a=Math.cos(.5*e[1]),o=Math.sin(.5*e[2]),h=Math.cos(.5*e[2]);"XYZ"===i?(t[0]=r*a*h+n*s*o,t[1]=n*s*h-r*a*o,t[2]=n*a*o+r*s*h,t[3]=n*a*h-r*s*o):"YXZ"===i?(t[0]=r*a*h+n*s*o,t[1]=n*s*h-r*a*o,t[2]=n*a*o-r*s*h,t[3]=n*a*h+r*s*o):"ZXY"===i?(t[0]=r*a*h-n*s*o,t[1]=n*s*h+r*a*o,t[2]=n*a*o+r*s*h,t[3]=n*a*h-r*s*o):"ZYX"===i?(t[0]=r*a*h-n*s*o,t[1]=n*s*h+r*a*o,t[2]=n*a*o-r*s*h,t[3]=n*a*h+r*s*o):"YZX"===i?(t[0]=r*a*h+n*s*o,t[1]=n*s*h+r*a*o,t[2]=n*a*o-r*s*h,t[3]=n*a*h-r*s*o):"XZY"===i&&(t[0]=r*a*h-n*s*o,t[1]=n*s*h-r*a*o,t[2]=n*a*o+r*s*h,t[3]=n*a*h+r*s*o)}(this._target,t,t.order),e||this.onChange(),this}},{key:"fromAxisAngle",value:function(t,e){return function(t,e,i){i*=.5;var r=Math.sin(i);t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=Math.cos(i)}(this._target,t,e),this.onChange(),this}},{key:"slerp",value:function(t,e){return function(t,e,i,r){var n,s,a,o,h,u=e[0],l=e[1],c=e[2],f=e[3],d=i[0],v=i[1],g=i[2],p=i[3];(s=u*d+l*v+c*g+f*p)<0&&(s=-s,d=-d,v=-v,g=-g,p=-p),1-s>1e-6?(n=Math.acos(s),a=Math.sin(n),o=Math.sin((1-r)*n)/a,h=Math.sin(r*n)/a):(o=1-r,h=r),t[0]=o*u+h*d,t[1]=o*l+h*v,t[2]=o*c+h*g,t[3]=o*f+h*p}(this._target,this._target,t,e),this.onChange(),this}},{key:"fromArray",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this._target[0]=t[e],this._target[1]=t[e+1],this._target[2]=t[e+2],this._target[3]=t[e+3],this.onChange(),this}},{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t[e+3]=this[3],t}}])}();function Z(t){var e=t[0],i=t[1],r=t[2],n=t[3],s=t[4],a=t[5],o=t[6],h=t[7],u=t[8],l=t[9],c=t[10],f=t[11],d=t[12],v=t[13],g=t[14],p=t[15];return(e*a-i*s)*(c*p-f*g)-(e*o-r*s)*(l*p-f*v)+(e*h-n*s)*(l*g-c*v)+(i*o-r*a)*(u*p-f*d)-(i*h-n*a)*(u*g-c*d)+(r*h-n*o)*(u*v-l*d)}function Q(t,e,i){var r=e[0],n=e[1],s=e[2],a=e[3],o=e[4],h=e[5],u=e[6],l=e[7],c=e[8],f=e[9],d=e[10],v=e[11],g=e[12],p=e[13],m=e[14],y=e[15],x=i[0],_=i[1],b=i[2],E=i[3];return t[0]=x*r+_*o+b*c+E*g,t[1]=x*n+_*h+b*f+E*p,t[2]=x*s+_*u+b*d+E*m,t[3]=x*a+_*l+b*v+E*y,x=i[4],_=i[5],b=i[6],E=i[7],t[4]=x*r+_*o+b*c+E*g,t[5]=x*n+_*h+b*f+E*p,t[6]=x*s+_*u+b*d+E*m,t[7]=x*a+_*l+b*v+E*y,x=i[8],_=i[9],b=i[10],E=i[11],t[8]=x*r+_*o+b*c+E*g,t[9]=x*n+_*h+b*f+E*p,t[10]=x*s+_*u+b*d+E*m,t[11]=x*a+_*l+b*v+E*y,x=i[12],_=i[13],b=i[14],E=i[15],t[12]=x*r+_*o+b*c+E*g,t[13]=x*n+_*h+b*f+E*p,t[14]=x*s+_*u+b*d+E*m,t[15]=x*a+_*l+b*v+E*y,t}function K(t,e){var i=e[0],r=e[1],n=e[2],s=e[4],a=e[5],o=e[6],h=e[8],u=e[9],l=e[10];return t[0]=Math.hypot(i,r,n),t[1]=Math.hypot(s,a,o),t[2]=Math.hypot(h,u,l),t}var $,J=($=[1,1,1],function(t,e){var i=$;K(i,e);var r=1/i[0],n=1/i[1],s=1/i[2],a=e[0]*r,o=e[1]*n,h=e[2]*s,u=e[4]*r,l=e[5]*n,c=e[6]*s,f=e[8]*r,d=e[9]*n,v=e[10]*s,g=a+l+v,p=0;return g>0?(p=2*Math.sqrt(g+1),t[3]=.25*p,t[0]=(c-d)/p,t[1]=(f-h)/p,t[2]=(o-u)/p):a>l&&a>v?(p=2*Math.sqrt(1+a-l-v),t[3]=(c-d)/p,t[0]=.25*p,t[1]=(o+u)/p,t[2]=(f+h)/p):l>v?(p=2*Math.sqrt(1+l-a-v),t[3]=(f-h)/p,t[0]=(o+u)/p,t[1]=.25*p,t[2]=(c+d)/p):(p=2*Math.sqrt(1+v-a-l),t[3]=(o-u)/p,t[0]=(f+h)/p,t[1]=(c+d)/p,t[2]=.25*p),t});function tt(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t[3]=e[3]+i[3],t[4]=e[4]+i[4],t[5]=e[5]+i[5],t[6]=e[6]+i[6],t[7]=e[7]+i[7],t[8]=e[8]+i[8],t[9]=e[9]+i[9],t[10]=e[10]+i[10],t[11]=e[11]+i[11],t[12]=e[12]+i[12],t[13]=e[13]+i[13],t[14]=e[14]+i[14],t[15]=e[15]+i[15],t}function et(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t[3]=e[3]-i[3],t[4]=e[4]-i[4],t[5]=e[5]-i[5],t[6]=e[6]-i[6],t[7]=e[7]-i[7],t[8]=e[8]-i[8],t[9]=e[9]-i[9],t[10]=e[10]-i[10],t[11]=e[11]-i[11],t[12]=e[12]-i[12],t[13]=e[13]-i[13],t[14]=e[14]-i[14],t[15]=e[15]-i[15],t}var it=function(t){function r(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,h=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,f=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,d=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0,v=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,g=arguments.length>10&&void 0!==arguments[10]?arguments[10]:1,p=arguments.length>11&&void 0!==arguments[11]?arguments[11]:0,m=arguments.length>12&&void 0!==arguments[12]?arguments[12]:0,y=arguments.length>13&&void 0!==arguments[13]?arguments[13]:0,x=arguments.length>14&&void 0!==arguments[14]?arguments[14]:0,_=arguments.length>15&&void 0!==arguments[15]?arguments[15]:1;return i(this,r),u(t=e(this,r,[n,s,a,o,h,l,c,f,d,v,g,p,m,y,x,_]),t)}return o(r,g(Array)),n(r,[{key:"x",get:function(){return this[12]},set:function(t){this[12]=t}},{key:"y",get:function(){return this[13]},set:function(t){this[13]=t}},{key:"z",get:function(){return this[14]},set:function(t){this[14]=t}},{key:"w",get:function(){return this[15]},set:function(t){this[15]=t}},{key:"set",value:function(t,e,i,r,n,s,a,o,h,u,l,c,f,d,v,g){return t.length?this.copy(t):(function(t,e,i,r,n,s,a,o,h,u,l,c,f,d,v,g,p){t[0]=e,t[1]=i,t[2]=r,t[3]=n,t[4]=s,t[5]=a,t[6]=o,t[7]=h,t[8]=u,t[9]=l,t[10]=c,t[11]=f,t[12]=d,t[13]=v,t[14]=g,t[15]=p}(this,t,e,i,r,n,s,a,o,h,u,l,c,f,d,v,g),this)}},{key:"translate",value:function(t){return function(t,e,i){var r,n,s,a,o,h,u,l,c,f,d,v,g=i[0],p=i[1],m=i[2];e===t?(t[12]=e[0]*g+e[4]*p+e[8]*m+e[12],t[13]=e[1]*g+e[5]*p+e[9]*m+e[13],t[14]=e[2]*g+e[6]*p+e[10]*m+e[14],t[15]=e[3]*g+e[7]*p+e[11]*m+e[15]):(r=e[0],n=e[1],s=e[2],a=e[3],o=e[4],h=e[5],u=e[6],l=e[7],c=e[8],f=e[9],d=e[10],v=e[11],t[0]=r,t[1]=n,t[2]=s,t[3]=a,t[4]=o,t[5]=h,t[6]=u,t[7]=l,t[8]=c,t[9]=f,t[10]=d,t[11]=v,t[12]=r*g+o*p+c*m+e[12],t[13]=n*g+h*p+f*m+e[13],t[14]=s*g+u*p+d*m+e[14],t[15]=a*g+l*p+v*m+e[15])}(this,arguments.length>1&&void 0!==arguments[1]?arguments[1]:this,t),this}},{key:"rotate",value:function(t,e){return function(t,e,i,r){var n,s,a,o,h,u,l,c,f,d,v,g,p,m,y,x,_,b,E,w,k,M,A,T,R=r[0],F=r[1],S=r[2],C=Math.hypot(R,F,S);Math.abs(C)<1e-6||(R*=C=1/C,F*=C,S*=C,n=Math.sin(i),a=1-(s=Math.cos(i)),o=e[0],h=e[1],u=e[2],l=e[3],c=e[4],f=e[5],d=e[6],v=e[7],g=e[8],p=e[9],m=e[10],y=e[11],x=R*R*a+s,_=F*R*a+S*n,b=S*R*a-F*n,E=R*F*a-S*n,w=F*F*a+s,k=S*F*a+R*n,M=R*S*a+F*n,A=F*S*a-R*n,T=S*S*a+s,t[0]=o*x+c*_+g*b,t[1]=h*x+f*_+p*b,t[2]=u*x+d*_+m*b,t[3]=l*x+v*_+y*b,t[4]=o*E+c*w+g*k,t[5]=h*E+f*w+p*k,t[6]=u*E+d*w+m*k,t[7]=l*E+v*w+y*k,t[8]=o*M+c*A+g*T,t[9]=h*M+f*A+p*T,t[10]=u*M+d*A+m*T,t[11]=l*M+v*A+y*T,e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]))}(this,arguments.length>2&&void 0!==arguments[2]?arguments[2]:this,t,e),this}},{key:"scale",value:function(t){return function(t,e,i){var r=i[0],n=i[1],s=i[2];t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t[4]=e[4]*n,t[5]=e[5]*n,t[6]=e[6]*n,t[7]=e[7]*n,t[8]=e[8]*s,t[9]=e[9]*s,t[10]=e[10]*s,t[11]=e[11]*s,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]}(this,arguments.length>1&&void 0!==arguments[1]?arguments[1]:this,"number"==typeof t?[t,t,t]:t),this}},{key:"add",value:function(t,e){return e?tt(this,t,e):tt(this,this,t),this}},{key:"sub",value:function(t,e){return e?et(this,t,e):et(this,this,t),this}},{key:"multiply",value:function(t,e){var i,r,n;return t.length?e?Q(this,t,e):Q(this,this,t):(r=this,n=t,(i=this)[0]=r[0]*n,i[1]=r[1]*n,i[2]=r[2]*n,i[3]=r[3]*n,i[4]=r[4]*n,i[5]=r[5]*n,i[6]=r[6]*n,i[7]=r[7]*n,i[8]=r[8]*n,i[9]=r[9]*n,i[10]=r[10]*n,i[11]=r[11]*n,i[12]=r[12]*n,i[13]=r[13]*n,i[14]=r[14]*n,i[15]=r[15]*n),this}},{key:"identity",value:function(){var t;return(t=this)[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}},{key:"copy",value:function(t){var e,i;return i=t,(e=this)[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}},{key:"fromPerspective",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t,e,i,r,n){var s=1/Math.tan(e/2),a=1/(r-n);t[0]=s/i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(n+r)*a,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*n*r*a,t[15]=0}(this,t.fov,t.aspect,t.near,t.far),this}},{key:"fromOrthogonal",value:function(t){return function(t,e,i,r,n,s,a){var o=1/(e-i),h=1/(r-n),u=1/(s-a);t[0]=-2*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*h,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*u,t[11]=0,t[12]=(e+i)*o,t[13]=(n+r)*h,t[14]=(a+s)*u,t[15]=1}(this,t.left,t.right,t.bottom,t.top,t.near,t.far),this}},{key:"fromQuaternion",value:function(t){return function(t,e){var i=e[0],r=e[1],n=e[2],s=e[3],a=i+i,o=r+r,h=n+n,u=i*a,l=r*a,c=r*o,f=n*a,d=n*o,v=n*h,g=s*a,p=s*o,m=s*h;t[0]=1-c-v,t[1]=l+m,t[2]=f-p,t[3]=0,t[4]=l-m,t[5]=1-u-v,t[6]=d+g,t[7]=0,t[8]=f+p,t[9]=d-g,t[10]=1-u-c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(this,t),this}},{key:"setPosition",value:function(t){return this.x=t[0],this.y=t[1],this.z=t[2],this}},{key:"inverse",value:function(){var t,e,i,r,n,s,a,o,h,u,l,c,f,d,v,g,p,m,y,x,_,b,E,w,k,M,A,T,R,F,S;return t=this,i=(e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this)[0],r=e[1],n=e[2],s=e[3],a=e[4],o=e[5],h=e[6],u=e[7],l=e[8],c=e[9],f=e[10],d=e[11],v=e[12],g=e[13],p=e[14],m=e[15],(S=(y=i*o-r*a)*(F=f*m-d*p)-(x=i*h-n*a)*(R=c*m-d*g)+(_=i*u-s*a)*(T=c*p-f*g)+(b=r*h-n*o)*(A=l*m-d*v)-(E=r*u-s*o)*(M=l*p-f*v)+(w=n*u-s*h)*(k=l*g-c*v))&&(S=1/S,t[0]=(o*F-h*R+u*T)*S,t[1]=(n*R-r*F-s*T)*S,t[2]=(g*w-p*E+m*b)*S,t[3]=(f*E-c*w-d*b)*S,t[4]=(h*A-a*F-u*M)*S,t[5]=(i*F-n*A+s*M)*S,t[6]=(p*_-v*w-m*x)*S,t[7]=(l*w-f*_+d*x)*S,t[8]=(a*R-o*A+u*k)*S,t[9]=(r*A-i*R-s*k)*S,t[10]=(v*E-g*_+m*y)*S,t[11]=(c*_-l*E-d*y)*S,t[12]=(o*M-a*T-h*k)*S,t[13]=(i*T-r*M+n*k)*S,t[14]=(g*x-v*b-p*y)*S,t[15]=(l*b-c*x+f*y)*S),this}},{key:"compose",value:function(t,e,i){var r,n,s,a,o,h,u,l,c,f,d,v,g,p,m,y,x,_,b,E,w,k,M;return n=e,s=i,a=this,o=(r=t)[0],h=r[1],u=r[2],l=r[3],v=o*(c=o+o),g=o*(f=h+h),p=o*(d=u+u),m=h*f,y=h*d,x=u*d,_=l*c,b=l*f,E=l*d,w=s[0],k=s[1],M=s[2],a[0]=(1-(m+x))*w,a[1]=(g+E)*w,a[2]=(p-b)*w,a[3]=0,a[4]=(g-E)*k,a[5]=(1-(v+x))*k,a[6]=(y+_)*k,a[7]=0,a[8]=(p+b)*M,a[9]=(y-_)*M,a[10]=(1-(v+m))*M,a[11]=0,a[12]=n[0],a[13]=n[1],a[14]=n[2],a[15]=1,this}},{key:"decompose",value:function(t,e,i){return function(t,e,i,r){var n=p([t[0],t[1],t[2]]),s=p([t[4],t[5],t[6]]),a=p([t[8],t[9],t[10]]);Z(t)<0&&(n=-n),i[0]=t[12],i[1]=t[13],i[2]=t[14];var o=t.slice(),h=1/n,u=1/s,l=1/a;o[0]*=h,o[1]*=h,o[2]*=h,o[4]*=u,o[5]*=u,o[6]*=u,o[8]*=l,o[9]*=l,o[10]*=l,J(e,o),r[0]=n,r[1]=s,r[2]=a}(this,t,e,i),this}},{key:"getRotation",value:function(t){return J(t,this),this}},{key:"getTranslation",value:function(t){var e,i;return i=this,(e=t)[0]=i[12],e[1]=i[13],e[2]=i[14],this}},{key:"getScaling",value:function(t){return K(t,this),this}},{key:"getMaxScaleOnAxis",value:function(){return e=(t=this)[0],i=t[1],r=t[2],n=t[4],s=t[5],a=t[6],o=t[8],h=t[9],u=t[10],l=e*e+i*i+r*r,c=n*n+s*s+a*a,f=o*o+h*h+u*u,Math.sqrt(Math.max(l,c,f));var t,e,i,r,n,s,a,o,h,u,l,c,f}},{key:"lookAt",value:function(t,e,i){return function(t,e,i,r){var n=e[0],s=e[1],a=e[2],o=r[0],h=r[1],u=r[2],l=n-i[0],c=s-i[1],f=a-i[2],d=l*l+c*c+f*f;0===d?f=1:(l*=d=1/Math.sqrt(d),c*=d,f*=d);var v=h*f-u*c,g=u*l-o*f,p=o*c-h*l;0==(d=v*v+g*g+p*p)&&(u?o+=1e-6:h?u+=1e-6:h+=1e-6,d=(v=h*f-u*c)*v+(g=u*l-o*f)*g+(p=o*c-h*l)*p),v*=d=1/Math.sqrt(d),g*=d,p*=d,t[0]=v,t[1]=g,t[2]=p,t[3]=0,t[4]=c*p-f*g,t[5]=f*v-l*p,t[6]=l*g-c*v,t[7]=0,t[8]=l,t[9]=c,t[10]=f,t[11]=0,t[12]=n,t[13]=s,t[14]=a,t[15]=1}(this,t,e,i),this}},{key:"determinant",value:function(){return Z(this)}},{key:"fromArray",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this[0]=t[e],this[1]=t[e+1],this[2]=t[e+2],this[3]=t[e+3],this[4]=t[e+4],this[5]=t[e+5],this[6]=t[e+6],this[7]=t[e+7],this[8]=t[e+8],this[9]=t[e+9],this[10]=t[e+10],this[11]=t[e+11],this[12]=t[e+12],this[13]=t[e+13],this[14]=t[e+14],this[15]=t[e+15],this}},{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t[e+3]=this[3],t[e+4]=this[4],t[e+5]=this[5],t[e+6]=this[6],t[e+7]=this[7],t[e+8]=this[8],t[e+9]=this[9],t[e+10]=this[10],t[e+11]=this[11],t[e+12]=this[12],t[e+13]=this[13],t[e+14]=this[14],t[e+15]=this[15],t}}])}();var rt=new it,nt=function(t){function r(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"YXZ";i(this,r),(t=e(this,r,[n,s,a])).order=o,t.onChange=function(){},t._target=t;var h=["0","1","2"];return u(t,new Proxy(t,{set:function(t,e){var i=Reflect.set.apply(Reflect,arguments);return i&&h.includes(e)&&t.onChange(),i}}))}return o(r,g(Array)),n(r,[{key:"x",get:function(){return this[0]},set:function(t){this._target[0]=t,this.onChange()}},{key:"y",get:function(){return this[1]},set:function(t){this._target[1]=t,this.onChange()}},{key:"z",get:function(){return this[2]},set:function(t){this._target[2]=t,this.onChange()}},{key:"set",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t;return t.length?this.copy(t):(this._target[0]=t,this._target[1]=e,this._target[2]=i,this.onChange(),this)}},{key:"copy",value:function(t){return this._target[0]=t[0],this._target[1]=t[1],this._target[2]=t[2],this.onChange(),this}},{key:"reorder",value:function(t){return this._target.order=t,this.onChange(),this}},{key:"fromRotationMatrix",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.order;return function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"YXZ";"XYZ"===i?(t[1]=Math.asin(Math.min(Math.max(e[8],-1),1)),Math.abs(e[8])<.99999?(t[0]=Math.atan2(-e[9],e[10]),t[2]=Math.atan2(-e[4],e[0])):(t[0]=Math.atan2(e[6],e[5]),t[2]=0)):"YXZ"===i?(t[0]=Math.asin(-Math.min(Math.max(e[9],-1),1)),Math.abs(e[9])<.99999?(t[1]=Math.atan2(e[8],e[10]),t[2]=Math.atan2(e[1],e[5])):(t[1]=Math.atan2(-e[2],e[0]),t[2]=0)):"ZXY"===i?(t[0]=Math.asin(Math.min(Math.max(e[6],-1),1)),Math.abs(e[6])<.99999?(t[1]=Math.atan2(-e[2],e[10]),t[2]=Math.atan2(-e[4],e[5])):(t[1]=0,t[2]=Math.atan2(e[1],e[0]))):"ZYX"===i?(t[1]=Math.asin(-Math.min(Math.max(e[2],-1),1)),Math.abs(e[2])<.99999?(t[0]=Math.atan2(e[6],e[10]),t[2]=Math.atan2(e[1],e[0])):(t[0]=0,t[2]=Math.atan2(-e[4],e[5]))):"YZX"===i?(t[2]=Math.asin(Math.min(Math.max(e[1],-1),1)),Math.abs(e[1])<.99999?(t[0]=Math.atan2(-e[9],e[5]),t[1]=Math.atan2(-e[2],e[0])):(t[0]=0,t[1]=Math.atan2(e[8],e[10]))):"XZY"===i&&(t[2]=Math.asin(-Math.min(Math.max(e[4],-1),1)),Math.abs(e[4])<.99999?(t[0]=Math.atan2(e[6],e[5]),t[1]=Math.atan2(e[8],e[0])):(t[0]=Math.atan2(-e[9],e[10]),t[1]=0))}(this._target,t,e),this.onChange(),this}},{key:"fromQuaternion",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.order,i=arguments.length>2?arguments[2]:void 0;return rt.fromQuaternion(t),this._target.fromRotationMatrix(rt,e),i||this.onChange(),this}},{key:"fromArray",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this._target[0]=t[e],this._target[1]=t[e+1],this._target[2]=t[e+2],this}},{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t}}])}(),st=function(){return n((function t(){var e=this;i(this,t),this.parent=null,this.children=[],this.visible=!0,this.matrix=new it,this.worldMatrix=new it,this.matrixAutoUpdate=!0,this.worldMatrixNeedsUpdate=!1,this.position=new R,this.quaternion=new Y,this.scale=new R(1),this.rotation=new nt,this.up=new R(0,1,0),this.rotation._target.onChange=function(){return e.quaternion.fromEuler(e.rotation,!0)},this.quaternion._target.onChange=function(){return e.rotation.fromQuaternion(e.quaternion,void 0,!0)}}),[{key:"setParent",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.parent&&t!==this.parent&&this.parent.removeChild(this,!1),this.parent=t,e&&t&&t.addChild(this,!1)}},{key:"addChild",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];~this.children.indexOf(t)||this.children.push(t),e&&t.setParent(this,!1)}},{key:"removeChild",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];~this.children.indexOf(t)&&this.children.splice(this.children.indexOf(t),1),e&&t.setParent(null,!1)}},{key:"updateMatrixWorld",value:function(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||t)&&(null===this.parent?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,t=!0);for(var e=0,i=this.children.length;e<i;e++)this.children[e].updateMatrixWorld(t)}},{key:"updateMatrix",value:function(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}},{key:"traverse",value:function(t){if(!t(this))for(var e=0,i=this.children.length;e<i;e++)this.children[e].traverse(t)}},{key:"decompose",value:function(){this.matrix.decompose(this.quaternion._target,this.position,this.scale),this.rotation.fromQuaternion(this.quaternion)}},{key:"lookAt",value:function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1]?this.matrix.lookAt(this.position,t,this.up):this.matrix.lookAt(t,this.position,this.up),this.matrix.getRotation(this.quaternion._target),this.rotation.fromQuaternion(this.quaternion)}}])}(),at=new it,ot=new R,ht=new R,ut=function(t){function r(t){var n,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=s.near,o=void 0===a?.1:a,h=s.far,u=void 0===h?100:h,l=s.fov,c=void 0===l?45:l,f=s.aspect,d=void 0===f?1:f,v=s.left,g=s.right,p=s.bottom,m=s.top,y=s.zoom,x=void 0===y?1:y;return i(this,r),n=e(this,r),Object.assign(n,{near:o,far:u,fov:c,aspect:d,left:v,right:g,bottom:p,top:m,zoom:x}),n.projectionMatrix=new it,n.viewMatrix=new it,n.projectionViewMatrix=new it,n.worldPosition=new R,n.type=v||g?"orthographic":"perspective","orthographic"===n.type?n.orthographic():n.perspective(),n}return o(r,st),n(r,[{key:"perspective",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.near,i=void 0===e?this.near:e,r=t.far,n=void 0===r?this.far:r,s=t.fov,a=void 0===s?this.fov:s,o=t.aspect,h=void 0===o?this.aspect:o;return Object.assign(this,{near:i,far:n,fov:a,aspect:h}),this.projectionMatrix.fromPerspective({fov:a*(Math.PI/180),aspect:h,near:i,far:n}),this.type="perspective",this}},{key:"orthographic",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.near,i=void 0===e?this.near:e,r=t.far,n=void 0===r?this.far:r,s=t.left,a=void 0===s?this.left||-1:s,o=t.right,h=void 0===o?this.right||1:o,u=t.bottom,l=void 0===u?this.bottom||-1:u,c=t.top,f=void 0===c?this.top||1:c,d=t.zoom,v=void 0===d?this.zoom:d;return Object.assign(this,{near:i,far:n,left:a,right:h,bottom:l,top:f,zoom:v}),a/=v,h/=v,l/=v,f/=v,this.projectionMatrix.fromOrthogonal({left:a,right:h,bottom:l,top:f,near:i,far:n}),this.type="orthographic",this}},{key:"updateMatrixWorld",value:function(){return s(a(r.prototype),"updateMatrixWorld",this).call(this),this.viewMatrix.inverse(this.worldMatrix),this.worldMatrix.getTranslation(this.worldPosition),this.projectionViewMatrix.multiply(this.projectionMatrix,this.viewMatrix),this}},{key:"lookAt",value:function(t){return s(a(r.prototype),"lookAt",this).call(this,t,!0),this}},{key:"project",value:function(t){return t.applyMatrix4(this.viewMatrix),t.applyMatrix4(this.projectionMatrix),this}},{key:"unproject",value:function(t){return t.applyMatrix4(at.inverse(this.projectionMatrix)),t.applyMatrix4(this.worldMatrix),this}},{key:"updateFrustum",value:function(){this.frustum||(this.frustum=[new R,new R,new R,new R,new R,new R]);var t=this.projectionViewMatrix;this.frustum[0].set(t[3]-t[0],t[7]-t[4],t[11]-t[8]).constant=t[15]-t[12],this.frustum[1].set(t[3]+t[0],t[7]+t[4],t[11]+t[8]).constant=t[15]+t[12],this.frustum[2].set(t[3]+t[1],t[7]+t[5],t[11]+t[9]).constant=t[15]+t[13],this.frustum[3].set(t[3]-t[1],t[7]-t[5],t[11]-t[9]).constant=t[15]-t[13],this.frustum[4].set(t[3]-t[2],t[7]-t[6],t[11]-t[10]).constant=t[15]-t[14],this.frustum[5].set(t[3]+t[2],t[7]+t[6],t[11]+t[10]).constant=t[15]+t[14];for(var e=0;e<6;e++){var i=1/this.frustum[e].distance();this.frustum[e].multiply(i),this.frustum[e].constant*=i}}},{key:"frustumIntersectsMesh",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t.worldMatrix;if(!t.geometry.attributes.position)return!0;if(t.geometry.bounds&&t.geometry.bounds.radius!==1/0||t.geometry.computeBoundingSphere(),!t.geometry.bounds)return!0;var i=ot;i.copy(t.geometry.bounds.center),i.applyMatrix4(e);var r=t.geometry.bounds.radius*e.getMaxScaleOnAxis();return this.frustumIntersectsSphere(i,r)}},{key:"frustumIntersectsSphere",value:function(t,e){for(var i=ht,r=0;r<6;r++){var n=this.frustum[r];if(i.copy(n).dot(t)+n.constant<-e)return!1}return!0}}])}();function lt(t,e,i){var r=e[0],n=e[1],s=e[2],a=e[3],o=e[4],h=e[5],u=e[6],l=e[7],c=e[8],f=i[0],d=i[1],v=i[2],g=i[3],p=i[4],m=i[5],y=i[6],x=i[7],_=i[8];return t[0]=f*r+d*a+v*u,t[1]=f*n+d*o+v*l,t[2]=f*s+d*h+v*c,t[3]=g*r+p*a+m*u,t[4]=g*n+p*o+m*l,t[5]=g*s+p*h+m*c,t[6]=y*r+x*a+_*u,t[7]=y*n+x*o+_*l,t[8]=y*s+x*h+_*c,t}var ct=function(t){function r(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,h=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,f=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,d=arguments.length>8&&void 0!==arguments[8]?arguments[8]:1;return i(this,r),u(t=e(this,r,[n,s,a,o,h,l,c,f,d]),t)}return o(r,g(Array)),n(r,[{key:"set",value:function(t,e,i,r,n,s,a,o,h){return t.length?this.copy(t):(function(t,e,i,r,n,s,a,o,h,u){t[0]=e,t[1]=i,t[2]=r,t[3]=n,t[4]=s,t[5]=a,t[6]=o,t[7]=h,t[8]=u}(this,t,e,i,r,n,s,a,o,h),this)}},{key:"translate",value:function(t){return function(t,e,i){var r=e[0],n=e[1],s=e[2],a=e[3],o=e[4],h=e[5],u=e[6],l=e[7],c=e[8],f=i[0],d=i[1];t[0]=r,t[1]=n,t[2]=s,t[3]=a,t[4]=o,t[5]=h,t[6]=f*r+d*a+u,t[7]=f*n+d*o+l,t[8]=f*s+d*h+c}(this,arguments.length>1&&void 0!==arguments[1]?arguments[1]:this,t),this}},{key:"rotate",value:function(t){var e,i,r,n,s,a,o,h,u,l,c,f,d,v;return e=this,r=t,n=(i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this)[0],s=i[1],a=i[2],o=i[3],h=i[4],u=i[5],l=i[6],c=i[7],f=i[8],d=Math.sin(r),v=Math.cos(r),e[0]=v*n+d*o,e[1]=v*s+d*h,e[2]=v*a+d*u,e[3]=v*o-d*n,e[4]=v*h-d*s,e[5]=v*u-d*a,e[6]=l,e[7]=c,e[8]=f,this}},{key:"scale",value:function(t){return function(t,e,i){var r=i[0],n=i[1];t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=n*e[3],t[4]=n*e[4],t[5]=n*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8]}(this,arguments.length>1&&void 0!==arguments[1]?arguments[1]:this,t),this}},{key:"multiply",value:function(t,e){return e?lt(this,t,e):lt(this,this,t),this}},{key:"identity",value:function(){var t;return(t=this)[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,this}},{key:"copy",value:function(t){var e,i;return i=t,(e=this)[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}},{key:"fromMatrix4",value:function(t){var e,i;return i=t,(e=this)[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[4],e[4]=i[5],e[5]=i[6],e[6]=i[8],e[7]=i[9],e[8]=i[10],this}},{key:"fromQuaternion",value:function(t){return function(t,e){var i=e[0],r=e[1],n=e[2],s=e[3],a=i+i,o=r+r,h=n+n,u=i*a,l=r*a,c=r*o,f=n*a,d=n*o,v=n*h,g=s*a,p=s*o,m=s*h;t[0]=1-c-v,t[3]=l-m,t[6]=f+p,t[1]=l+m,t[4]=1-u-v,t[7]=d-g,t[2]=f-p,t[5]=d+g,t[8]=1-u-c}(this,t),this}},{key:"fromBasis",value:function(t,e,i){return this.set(t[0],t[1],t[2],e[0],e[1],e[2],i[0],i[1],i[2]),this}},{key:"inverse",value:function(){var t,e,i,r,n,s,a,o,h,u,l,c,f,d,v;return t=this,i=(e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this)[0],r=e[1],n=e[2],s=e[3],a=e[4],o=e[5],h=e[6],u=e[7],l=e[8],(v=i*(c=l*a-o*u)+r*(f=-l*s+o*h)+n*(d=u*s-a*h))&&(v=1/v,t[0]=c*v,t[1]=(-l*r+n*u)*v,t[2]=(o*r-n*a)*v,t[3]=f*v,t[4]=(l*i-n*h)*v,t[5]=(-o*i+n*s)*v,t[6]=d*v,t[7]=(-u*i+r*h)*v,t[8]=(a*i-r*s)*v),this}},{key:"getNormalMatrix",value:function(t){var e,i,r,n,s,a,o,h,u,l,c,f,d,v,g,p,m,y,x,_,b,E,w,k,M,A,T,R,F,S,C;return e=this,r=(i=t)[0],n=i[1],s=i[2],a=i[3],o=i[4],h=i[5],u=i[6],l=i[7],c=i[8],f=i[9],d=i[10],v=i[11],g=i[12],p=i[13],m=i[14],y=i[15],(C=(x=r*h-n*o)*(S=d*y-v*m)-(_=r*u-s*o)*(F=f*y-v*p)+(b=r*l-a*o)*(R=f*m-d*p)+(E=n*u-s*h)*(T=c*y-v*g)-(w=n*l-a*h)*(A=c*m-d*g)+(k=s*l-a*u)*(M=c*p-f*g))&&(C=1/C,e[0]=(h*S-u*F+l*R)*C,e[1]=(u*T-o*S-l*A)*C,e[2]=(o*F-h*T+l*M)*C,e[3]=(s*F-n*S-a*R)*C,e[4]=(r*S-s*T+a*A)*C,e[5]=(n*T-r*F-a*M)*C,e[6]=(p*k-m*w+y*E)*C,e[7]=(m*b-g*k-y*_)*C,e[8]=(g*w-p*b+y*x)*C),this}}])}(),ft=0,dt=function(t){function r(t){var n,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=s.geometry,o=s.program,h=s.mode,u=void 0===h?t.TRIANGLES:h,l=s.frustumCulled,c=void 0===l||l,f=s.renderOrder,d=void 0===f?0:f;return i(this,r),n=e(this,r),t.canvas,n.gl=t,n.id=ft++,n.geometry=a,n.program=o,n.mode=u,n.frustumCulled=c,n.renderOrder=d,n.modelViewMatrix=new it,n.normalMatrix=new ct,n.beforeRenderCallbacks=[],n.afterRenderCallbacks=[],n}return o(r,st),n(r,[{key:"onBeforeRender",value:function(t){return this.beforeRenderCallbacks.push(t),this}},{key:"onAfterRender",value:function(t){return this.afterRenderCallbacks.push(t),this}},{key:"draw",value:function(){var t=this,e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).camera;e&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=e.projectionMatrix,this.program.uniforms.cameraPosition.value=e.worldPosition,this.program.uniforms.viewMatrix.value=e.viewMatrix,this.modelViewMatrix.multiply(e.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix),this.beforeRenderCallbacks.forEach((function(i){return i&&i({mesh:t,camera:e})}));var i=this.program.cullFace&&this.worldMatrix.determinant()<0;this.program.use({flipFaces:i}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach((function(i){return i&&i({mesh:t,camera:e})}))}}])}(),vt=new Uint8Array(4);function gt(t){return!(t&t-1)}var pt=1,mt=function(){return n((function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.image,s=r.target,a=void 0===s?e.TEXTURE_2D:s,o=r.type,h=void 0===o?e.UNSIGNED_BYTE:o,u=r.format,l=void 0===u?e.RGBA:u,c=r.internalFormat,f=void 0===c?l:c,d=r.wrapS,v=void 0===d?e.CLAMP_TO_EDGE:d,g=r.wrapT,p=void 0===g?e.CLAMP_TO_EDGE:g,m=r.generateMipmaps,y=void 0===m||m,x=r.minFilter,_=void 0===x?y?e.NEAREST_MIPMAP_LINEAR:e.LINEAR:x,b=r.magFilter,E=void 0===b?e.LINEAR:b,w=r.premultiplyAlpha,k=void 0!==w&&w,M=r.unpackAlignment,A=void 0===M?4:M,T=r.flipY,R=void 0===T?a==e.TEXTURE_2D:T,F=r.anisotropy,S=void 0===F?0:F,C=r.level,P=void 0===C?0:C,N=r.width,O=r.height,D=void 0===O?N:O;i(this,t),this.gl=e,this.id=pt++,this.image=n,this.target=a,this.type=h,this.format=l,this.internalFormat=f,this.minFilter=_,this.magFilter=E,this.wrapS=v,this.wrapT=p,this.generateMipmaps=y,this.premultiplyAlpha=k,this.unpackAlignment=A,this.flipY=R,this.anisotropy=Math.min(S,this.gl.renderer.parameters.maxAnisotropy),this.level=P,this.width=N,this.height=D,this.texture=this.gl.createTexture(),this.store={image:null},this.glState=this.gl.renderer.state,this.state={},this.state.minFilter=this.gl.NEAREST_MIPMAP_LINEAR,this.state.magFilter=this.gl.LINEAR,this.state.wrapS=this.gl.REPEAT,this.state.wrapT=this.gl.REPEAT,this.state.anisotropy=0}),[{key:"bind",value:function(){this.glState.textureUnits[this.glState.activeTextureUnit]!==this.id&&(this.gl.bindTexture(this.target,this.texture),this.glState.textureUnits[this.glState.activeTextureUnit]=this.id)}},{key:"update",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=!(this.image===this.store.image&&!this.needsUpdate);if((e||this.glState.textureUnits[t]!==this.id)&&(this.gl.renderer.activeTexture(t),this.bind()),e){if(this.needsUpdate=!1,this.flipY!==this.glState.flipY&&(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,this.flipY),this.glState.flipY=this.flipY),this.premultiplyAlpha!==this.glState.premultiplyAlpha&&(this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),this.glState.premultiplyAlpha=this.premultiplyAlpha),this.unpackAlignment!==this.glState.unpackAlignment&&(this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,this.unpackAlignment),this.glState.unpackAlignment=this.unpackAlignment),this.minFilter!==this.state.minFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MIN_FILTER,this.minFilter),this.state.minFilter=this.minFilter),this.magFilter!==this.state.magFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MAG_FILTER,this.magFilter),this.state.magFilter=this.magFilter),this.wrapS!==this.state.wrapS&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_S,this.wrapS),this.state.wrapS=this.wrapS),this.wrapT!==this.state.wrapT&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_T,this.wrapT),this.state.wrapT=this.wrapT),this.anisotropy&&this.anisotropy!==this.state.anisotropy&&(this.gl.texParameterf(this.target,this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropy),this.state.anisotropy=this.anisotropy),this.image){if(this.image.width&&(this.width=this.image.width,this.height=this.image.height),this.target===this.gl.TEXTURE_CUBE_MAP)for(var i=0;i<6;i++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+i,this.level,this.internalFormat,this.format,this.type,this.image[i]);else if(ArrayBuffer.isView(this.image))this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,this.image);else if(this.image.isCompressedTexture)for(var r=0;r<this.image.length;r++)this.gl.compressedTexImage2D(this.target,r,this.internalFormat,this.image[r].width,this.image[r].height,0,this.image[r].data);else this.gl.texImage2D(this.target,this.level,this.internalFormat,this.format,this.type,this.image);this.generateMipmaps&&(this.gl.renderer.isWebgl2||gt(this.image.width)&&gt(this.image.height)?this.gl.generateMipmap(this.target):(this.generateMipmaps=!1,this.wrapS=this.wrapT=this.gl.CLAMP_TO_EDGE,this.minFilter=this.gl.LINEAR)),this.onUpdate&&this.onUpdate()}else if(this.target===this.gl.TEXTURE_CUBE_MAP)for(var n=0;n<6;n++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,vt);else this.width?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,null):this.gl.texImage2D(this.target,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,vt);this.store.image=this.image}}}])}(),yt=function(){return n((function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.width,s=void 0===n?e.canvas.width:n,a=r.height,o=void 0===a?e.canvas.height:a,h=r.target,u=void 0===h?e.FRAMEBUFFER:h,l=r.color,c=void 0===l?1:l,f=r.depth,d=void 0===f||f,v=r.stencil,g=void 0!==v&&v,p=r.depthTexture,m=void 0!==p&&p,y=r.wrapS,x=void 0===y?e.CLAMP_TO_EDGE:y,_=r.wrapT,b=void 0===_?e.CLAMP_TO_EDGE:_,E=r.minFilter,w=void 0===E?e.LINEAR:E,k=r.magFilter,M=void 0===k?w:k,A=r.type,T=void 0===A?e.UNSIGNED_BYTE:A,R=r.format,F=void 0===R?e.RGBA:R,S=r.internalFormat,C=void 0===S?F:S,P=r.unpackAlignment,N=r.premultiplyAlpha;i(this,t),this.gl=e,this.width=s,this.height=o,this.depth=d,this.buffer=this.gl.createFramebuffer(),this.target=u,this.gl.renderer.bindFramebuffer(this),this.textures=[];for(var O=[],D=0;D<c;D++)this.textures.push(new mt(e,{width:s,height:o,wrapS:x,wrapT:b,minFilter:w,magFilter:M,type:T,format:F,internalFormat:C,unpackAlignment:P,premultiplyAlpha:N,flipY:!1,generateMipmaps:!1})),this.textures[D].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+D,this.gl.TEXTURE_2D,this.textures[D].texture,0),O.push(this.gl.COLOR_ATTACHMENT0+D);O.length>1&&this.gl.renderer.drawBuffers(O),this.texture=this.textures[0],m&&(this.gl.renderer.isWebgl2||this.gl.renderer.getExtension("WEBGL_depth_texture"))?(this.depthTexture=new mt(e,{width:s,height:o,minFilter:this.gl.NEAREST,magFilter:this.gl.NEAREST,format:this.gl.DEPTH_COMPONENT,internalFormat:e.renderer.isWebgl2?this.gl.DEPTH_COMPONENT16:this.gl.DEPTH_COMPONENT,type:this.gl.UNSIGNED_INT}),this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(d&&!g&&(this.depthBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,s,o),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,this.depthBuffer)),g&&!d&&(this.stencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,s,o),this.gl.framebufferRenderbuffer(this.target,this.gl.STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.stencilBuffer)),d&&g&&(this.depthStencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,s,o),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.depthStencilBuffer))),this.gl.renderer.bindFramebuffer({target:this.target})}),[{key:"setSize",value:function(t,e){if(this.width!==t||this.height!==e){this.width=t,this.height=e,this.gl.renderer.bindFramebuffer(this);for(var i=0;i<this.textures.length;i++)this.textures[i].width=t,this.textures[i].height=e,this.textures[i].needsUpdate=!0,this.textures[i].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+i,this.gl.TEXTURE_2D,this.textures[i].texture,0);this.depthTexture?(this.depthTexture.width=t,this.depthTexture.height=e,this.depthTexture.needsUpdate=!0,this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(this.depthBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,t,e)),this.stencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,t,e)),this.depthStencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,t,e))),this.gl.renderer.bindFramebuffer({target:this.target})}}}])}(),xt={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#00ff00",blue:"#0000ff",fuchsia:"#ff00ff",cyan:"#00ffff",yellow:"#ffff00",orange:"#ff8000"};function _t(t){4===t.length&&(t=t[0]+t[1]+t[1]+t[2]+t[2]+t[3]+t[3]);var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255]}function bt(t){return[((t=parseInt(t))>>16&255)/255,(t>>8&255)/255,(255&t)/255]}function Et(t){return void 0===t?[0,0,0]:3===arguments.length?arguments:isNaN(t)?"#"===t[0]?_t(t):xt[t.toLowerCase()]?_t(xt[t.toLowerCase()]):[0,0,0]:bt(t)}var wt=Object.freeze({__proto__:null,hexToRGB:_t,numberToRGB:bt,parseColor:Et}),kt=function(t){function r(t){var n;return i(this,r),Array.isArray(t)?u(n,n=e(this,r,c(t))):u(n,n=e(this,r,c(Et.apply(wt,arguments))))}return o(r,g(Array)),n(r,[{key:"r",get:function(){return this[0]},set:function(t){this[0]=t}},{key:"g",get:function(){return this[1]},set:function(t){this[1]=t}},{key:"b",get:function(){return this[2]},set:function(t){this[2]=t}},{key:"set",value:function(t){return Array.isArray(t)?this.copy(t):this.copy(Et.apply(wt,arguments))}},{key:"copy",value:function(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this}}])}();function Mt(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t}function At(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t}function Tt(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t}function Rt(t){var e=t[0],i=t[1];return Math.sqrt(e*e+i*i)}function Ft(t,e){return t[0]*e[1]-t[1]*e[0]}var St=function(t){function r(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n;return i(this,r),u(t=e(this,r,[n,s]),t)}return o(r,g(Array)),n(r,[{key:"x",get:function(){return this[0]},set:function(t){this[0]=t}},{key:"y",get:function(){return this[1]},set:function(t){this[1]=t}},{key:"set",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t;return t.length?this.copy(t):(function(t,e,i){t[0]=e,t[1]=i}(this,t,e),this)}},{key:"copy",value:function(t){var e,i;return i=t,(e=this)[0]=i[0],e[1]=i[1],this}},{key:"add",value:function(t,e){return e?Mt(this,t,e):Mt(this,this,t),this}},{key:"sub",value:function(t,e){return e?At(this,t,e):At(this,this,t),this}},{key:"multiply",value:function(t){var e,i,r;return t.length?(i=this,r=t,(e=this)[0]=i[0]*r[0],e[1]=i[1]*r[1]):Tt(this,this,t),this}},{key:"divide",value:function(t){var e,i,r;return t.length?(i=this,r=t,(e=this)[0]=i[0]/r[0],e[1]=i[1]/r[1]):Tt(this,this,1/t),this}},{key:"inverse",value:function(){var t,e;return e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this,(t=this)[0]=1/e[0],t[1]=1/e[1],this}},{key:"len",value:function(){return Rt(this)}},{key:"distance",value:function(t){return t?(e=this,r=(i=t)[0]-e[0],n=i[1]-e[1],Math.sqrt(r*r+n*n)):Rt(this);var e,i,r,n}},{key:"squaredLen",value:function(){return this.squaredDistance()}},{key:"squaredDistance",value:function(t){return t?(e=this,r=(i=t)[0]-e[0],n=i[1]-e[1],r*r+n*n):function(t){var e=t[0],i=t[1];return e*e+i*i}(this);var e,i,r,n}},{key:"negate",value:function(){var t,e;return e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this,(t=this)[0]=-e[0],t[1]=-e[1],this}},{key:"cross",value:function(t,e){return e?Ft(t,e):Ft(this,t)}},{key:"scale",value:function(t){return Tt(this,this,t),this}},{key:"normalize",value:function(){var t,e,i,r,n;return t=this,i=(e=this)[0],r=e[1],(n=i*i+r*r)>0&&(n=1/Math.sqrt(n)),t[0]=e[0]*n,t[1]=e[1]*n,this}},{key:"dot",value:function(t){return i=t,(e=this)[0]*i[0]+e[1]*i[1];var e,i}},{key:"equals",value:function(t){return i=t,(e=this)[0]===i[0]&&e[1]===i[1];var e,i}},{key:"applyMatrix3",value:function(t){var e,i,r,n,s;return e=this,r=t,n=(i=this)[0],s=i[1],e[0]=r[0]*n+r[3]*s+r[6],e[1]=r[1]*n+r[4]*s+r[7],this}},{key:"applyMatrix4",value:function(t){var e,i,r,n,s;return e=this,r=t,n=(i=this)[0],s=i[1],e[0]=r[0]*n+r[4]*s+r[12],e[1]=r[1]*n+r[5]*s+r[13],this}},{key:"lerp",value:function(t,e){return function(t,e,i,r){var n=e[0],s=e[1];t[0]=n+r*(i[0]-n),t[1]=s+r*(i[1]-s)}(this,this,t,e),this}},{key:"clone",value:function(){return new r(this[0],this[1])}},{key:"fromArray",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this[0]=t[e],this[1]=t[e+1],this}},{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t[e]=this[0],t[e+1]=this[1],t}}])}(),Ct=function(t){function r(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=n.width,a=void 0===s?1:s,o=n.height,h=void 0===o?1:o,u=n.widthSegments,l=void 0===u?1:u,c=n.heightSegments,f=void 0===c?1:c,d=n.attributes,v=void 0===d?{}:d;i(this,r);var g=l,p=f,m=(g+1)*(p+1),y=g*p*6,x=new Float32Array(3*m),_=new Float32Array(3*m),b=new Float32Array(2*m),E=y>65536?new Uint32Array(y):new Uint16Array(y);return r.buildPlane(x,_,b,E,a,h,0,g,p),Object.assign(v,{position:{size:3,data:x},normal:{size:3,data:_},uv:{size:2,data:b},index:{data:E}}),e(this,r,[t,v])}return o(r,N),n(r,null,[{key:"buildPlane",value:function(t,e,i,r,n,s,a,o,h){for(var u=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,l=arguments.length>10&&void 0!==arguments[10]?arguments[10]:1,c=arguments.length>11&&void 0!==arguments[11]?arguments[11]:2,f=arguments.length>12&&void 0!==arguments[12]?arguments[12]:1,d=arguments.length>13&&void 0!==arguments[13]?arguments[13]:-1,v=arguments.length>14&&void 0!==arguments[14]?arguments[14]:0,g=arguments.length>15&&void 0!==arguments[15]?arguments[15]:0,p=v,m=n/o,y=s/h,x=0;x<=h;x++)for(var _=x*y-s/2,b=0;b<=o;b++,v++){var E=b*m-n/2;if(t[3*v+u]=E*f,t[3*v+l]=_*d,t[3*v+c]=a/2,e[3*v+u]=0,e[3*v+l]=0,e[3*v+c]=a>=0?1:-1,i[2*v]=b/o,i[2*v+1]=1-x/h,x!==h&&b!==o){var w=p+b+x*(o+1),k=p+b+(x+1)*(o+1),M=p+b+(x+1)*(o+1)+1,A=p+b+x*(o+1)+1;r[6*g]=w,r[6*g+1]=k,r[6*g+2]=A,r[6*g+3]=k,r[6*g+4]=M,r[6*g+5]=A,g++}}}}])}();!function(){!function(t,e,i){var r,n=256,s="random",a=i.pow(n,6),o=i.pow(2,52),h=2*o,u=n-1;function l(u,l,d){var m=[],y=g(v((l=1==l?{entropy:!0}:l||{}).entropy?[u,p(e)]:null==u?function(){try{var i;return r&&(i=r.randomBytes)?i=i(n):(i=new Uint8Array(n),(t.crypto||t.msCrypto).getRandomValues(i)),p(i)}catch(i){var s=t.navigator,a=s&&s.plugins;return[+new Date,t,a,t.screen,p(e)]}}():u,3),m),x=new c(m),_=function(){for(var t=x.g(6),e=a,i=0;t<o;)t=(t+i)*n,e*=n,i=x.g(1);for(;t>=h;)t/=2,e/=2,i>>>=1;return(t+i)/e};return _.int32=function(){return 0|x.g(4)},_.quick=function(){return x.g(4)/4294967296},_.double=_,g(p(x.S),e),(l.pass||d||function(t,e,r,n){return n&&(n.S&&f(n,x),t.state=function(){return f(x,{})}),r?(i[s]=t,e):t})(_,y,"global"in l?l.global:this==i,l.state)}function c(t){var e,i=t.length,r=this,s=0,a=r.i=r.j=0,o=r.S=[];for(i||(t=[i++]);s<n;)o[s]=s++;for(s=0;s<n;s++)o[s]=o[a=u&a+t[s%i]+(e=o[s])],o[a]=e;(r.g=function(t){for(var e,i=0,s=r.i,a=r.j,o=r.S;t--;)e=o[s=u&s+1],i=i*n+o[u&(o[s]=o[a=u&a+e])+(o[a]=e)];return r.i=s,r.j=a,i})(n)}function f(t,e){return e.i=t.i,e.j=t.j,e.S=t.S.slice(),e}function v(t,e){var i,r=[],n=d(t);if(e&&"object"==n)for(i in t)try{r.push(v(t[i],e-1))}catch(t){}return r.length?r:"string"==n?t:t+"\0"}function g(t,e){for(var i,r=t+"",n=0;n<r.length;)e[u&n]=u&(i^=19*e[u&n])+r.charCodeAt(n++);return p(e)}function p(t){return String.fromCharCode.apply(0,t)}if(g(i.random(),e),"object"==("undefined"==typeof module?"undefined":d(module))&&module.exports){module.exports=l;try{r=require("crypto")}catch(t){}}else"function"==typeof define&&define.amd?define((function(){return l})):i["seed"+s]=l}("undefined"!=typeof self?self:this,[],Math)}();var Pt=function(){return n((function t(){var e,r,n,s=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1?arguments[1]:void 0;i(this,t),e=this,n=function(){requestAnimationFrame(s._update),s.loop&&(s.frame++,s._animate()),s.gl.clearColor(0,0,0,1),s.renderer.render({scene:s.scene,camera:s.camera}),s.isRenderTarget&&(s.gl.clearColor(0,0,0,1),s.renderer.render({scene:s.rttPlane,camera:s.rttCamera,target:s.rtt}))},(r=f(r="_update"))in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,this.params=a,this.options={},this.loop=a.loop||!1,this.colors_num=o,this.colors_init=a.colors||[],this.palette=[],this.colors(this.colors_init),this.seed=a.seed||1e3,this.rng=new Math.seedrandom(this.seed),this.frame=0,this.parentDom=a.dom?document.getElementById(a.dom):document.body,"static"===window.getComputedStyle(this.parentDom).position&&(this.parentDom.style.position="relative");var h=this._getParentRect(this.parentDom);this.canvasW=this.originW=h.w,this.canvasH=this.originH=h.h,this.originRatio=this.originW/this.originH,this.resize_mode=a.resize_mode,this.renderer=new q,this.renderer.setSize(this.canvasW,this.canvasH),this.gl=this.renderer.gl,this.gl.canvas.id="colorbgcanvas",this.gl.canvas.style.position="absolute",this.gl.canvas.style.top=0,this.gl.canvas.style.left=0,this.gl.canvas.style.zIndex=0,this.parentDom.appendChild(this.gl.canvas),this.camera=new ut(this.gl,{near:.1,far:10001,left:-this.canvasW/2,right:this.canvasW/2,bottom:-this.canvasH/2,top:this.canvasH/2,zoom:1}),this.camera.position.z=8e3,this.isRenderTarget=!1,this.scene=new st,window.addEventListener("resize",(function(){s.resize()}))}),[{key:"_getParentRect",value:function(t){var e=t;return{w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}}},{key:"colors",value:function(t){var e=!!this.palette.length;if(this.palette=[],0==t.length)this.palette=["#F00911","#F3AA00","#F6EE0B","#39E90D","#195ED2","#F00911"];else if(t.length<this.colors_num){for(var i=c(t),r=i.length;r<6;r++){var n=r%i.length;t.push(i[n])}this.palette=t}else for(var s=0;s<this.colors_num;s++)this.palette.push(t[s]);e&&this._resetColors()}},{key:"start",value:function(){this._size(),this._initRtt(),this._resetSeed(),this._makeMaterial(),this._make(),requestAnimationFrame(this._update)}},{key:"resize",value:function(){var t=this._getParentRect(this.parentDom);this.canvasW=t.w,this.canvasH=t.h,this.canvasRatio=this.canvasW/this.canvasH,this.renderer.setSize(this.canvasW,this.canvasH);var e=1,i=this.canvasW/this.canvasH;i>this.originRatio?this.canvasW>this.originW&&(e=this.canvasW/this.originW):i<this.originRatio&&this.canvasH>this.originH&&(e=this.canvasH/this.originH),this.camera.orthographic({near:.1,far:10001,left:-this.canvasW/2,right:this.canvasW/2,bottom:-this.canvasH/2,top:this.canvasH/2,zoom:e})}},{key:"reset",value:function(t){this.seed=t||this.seed,this.rng=new Math.seedrandom(this.seed),this._delete(),this._resetSeed(),this._make()}},{key:"_delete",value:function(){for(var t=this.scene.children.length-1;t>=0;t--)this.scene.removeChild(this.scene.children[t])}},{key:"_size",value:function(){}},{key:"_initRtt",value:function(){}},{key:"_resetSeed",value:function(){}},{key:"_animate",value:function(){}},{key:"destroy",value:function(){this._delete(),this.parentDom.removeChild(this.gl.canvas)}}])}(),Nt={"ambient-light":{st_scale:1,curl_scale:5,brightness:.2,darkness:0},"abstract-floating-colors":{st_scale:5,curl_scale:.5,brightness:1.2,darkness:0},test:{st_scale:1.2,curl_scale:.5,brightness:1.2,darkness:0}},Ot=function(t){function r(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i(this,r),(t=e(this,r,[n,6])).name="ambient-light",t.typedata=Nt["ambient-light"],t.speed=500,t.start(),t}return o(r,Pt),n(r,[{key:"_initRtt",value:function(){this.rtt=new yt(this.gl,{width:512,height:512}),this.rttCamera=new ut(this.gl,{left:-.5,right:.5,bottom:-.5,top:.5,zoom:1}),this.rttCamera.position.z=1,this.rttPlaneGeo=new Ct(this.gl,{}),this.rttProgram=new B(this.gl,{vertex:"\n                attribute vec3 position;\n                attribute vec2 uv;\n                uniform mat4 modelViewMatrix;\n                uniform mat4 projectionMatrix;\n                varying vec2 vUv;\n                void main() {\n                    vUv = uv;\n                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n                }\n            ",fragment:"\n                #ifdef GL_ES\n                precision mediump float;\n                #endif\n        \n                uniform float u_time;\n                uniform vec2 u_resolution;\n                uniform float u_expand;\n\n                uniform vec3 u_color_0;\n                uniform vec3 u_color_1;\n                uniform vec3 u_color_2;\n                uniform vec3 u_color_3;\n                uniform vec3 u_color_4;\n                uniform vec3 u_color_5;\n\n                varying vec2 vUv;\n\n                const float x1 = 0.0;\n                const float x2 = 0.167;\n                const float x3 = 0.334;\n                const float x4 = 0.500;\n                const float x5 = 0.667;\n                const float x6 = 0.833;\n                const float x7 = 1.0;\n\n                float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }\n                vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }\n                vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }\n                vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\n                \n\n                float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }\n                vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }\n                vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }\n                vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }\n\n                float permute(const in float v) { return mod289(((v * 34.0) + 1.0) * v); }\n                vec2 permute(const in vec2 v) { return mod289(((v * 34.0) + 1.0) * v); }\n                vec3 permute(const in vec3 v) { return mod289(((v * 34.0) + 1.0) * v); }\n                vec4 permute(const in vec4 v) { return mod289(((v * 34.0) + 1.0) * v); }\n\n                vec4 grad4(float j, vec4 ip) {\n                    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n                    vec4 p,s;\n                    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n                    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n                    s = vec4(lessThan(p, vec4(0.0)));\n                    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n                    return p;\n                }\n\n                \n                float snoise(in vec3 v) {\n                    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n                    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n                    // First corner\n                    vec3 i  = floor(v + dot(v, C.yyy) );\n                    vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n                    // Other corners\n                    vec3 g = step(x0.yzx, x0.xyz);\n                    vec3 l = 1.0 - g;\n                    vec3 i1 = min( g.xyz, l.zxy );\n                    vec3 i2 = max( g.xyz, l.zxy );\n\n                    //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n                    //   x1 = x0 - i1  + 1.0 * C.xxx;\n                    //   x2 = x0 - i2  + 2.0 * C.xxx;\n                    //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n                    vec3 x1 = x0 - i1 + C.xxx;\n                    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n                    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n                    // Permutations\n                    i = mod289(i);\n                    vec4 p = permute( permute( permute(\n                                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n                            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n                            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n                    // Gradients: 7x7 points over a square, mapped onto an octahedron.\n                    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n                    float n_ = 0.142857142857; // 1.0/7.0\n                    vec3  ns = n_ * D.wyz - D.xzx;\n\n                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n                    vec4 x_ = floor(j * ns.z);\n                    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n                    vec4 x = x_ *ns.x + ns.yyyy;\n                    vec4 y = y_ *ns.x + ns.yyyy;\n                    vec4 h = 1.0 - abs(x) - abs(y);\n\n                    vec4 b0 = vec4( x.xy, y.xy );\n                    vec4 b1 = vec4( x.zw, y.zw );\n\n                    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n                    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n                    vec4 s0 = floor(b0)*2.0 + 1.0;\n                    vec4 s1 = floor(b1)*2.0 + 1.0;\n                    vec4 sh = -step(h, vec4(0.0));\n\n                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n                    vec3 p0 = vec3(a0.xy,h.x);\n                    vec3 p1 = vec3(a0.zw,h.y);\n                    vec3 p2 = vec3(a1.xy,h.z);\n                    vec3 p3 = vec3(a1.zw,h.w);\n\n                    //Normalise gradients\n                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n                    p0 *= norm.x;\n                    p1 *= norm.y;\n                    p2 *= norm.z;\n                    p3 *= norm.w;\n\n                    // Mix final noise value\n                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n                    m = m * m;\n                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                                dot(p2,x2), dot(p3,x3) ) );\n                }\n\n                vec3 snoise3( vec3 x ){\n                    float s  = snoise(vec3( x ));\n                    float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\n                    float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\n                    return vec3( s , s1 , s2 );\n                }\n\n                vec3 curl( vec3 p ){\n                    const float e = .1;\n                    vec3 dx = vec3( e   , 0.0 , 0.0 );\n                    vec3 dy = vec3( 0.0 , e   , 0.0 );\n                    vec3 dz = vec3( 0.0 , 0.0 , e   );\n\n                    vec3 p_x0 = snoise3( p - dx );\n                    vec3 p_x1 = snoise3( p + dx );\n                    vec3 p_y0 = snoise3( p - dy );\n                    vec3 p_y1 = snoise3( p + dy );\n                    vec3 p_z0 = snoise3( p - dz );\n                    vec3 p_z1 = snoise3( p + dz );\n\n                    float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\n                    float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\n                    float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\n\n                    const float divisor = 1.0 / ( 2.0 * e );\n                    #ifndef CURL_UNNORMALIZED\n                    return normalize( vec3( x , y , z ) * divisor );\n                    #else\n                    return vec3( x , y , z ) * divisor;\n                    #endif\n                }\n                    \n                vec3 blendColor ( vec3 color_0, vec3 color_1, float alpha ) {\n            \n                    vec3 color = color_0 * ( 1.05 - alpha ) + color_1 * alpha;\n            \n                    return color;\n            \n                }\n\n                uniform float u_st_scale;\n                uniform float u_curl_scale;\n                uniform float u_brightness;\n                uniform float u_darkness;\n        \n                void main()\n                {\n                    vec2 pixel = 1.0/u_resolution.xy;\n                    vec2 st = gl_FragCoord.xy * pixel;\n\n                    vec3 d3 = curl( vec3( st * u_st_scale, u_time ) ) * u_curl_scale + 0.5;\n\n                    vec4 color_0 = vec4( u_color_0, d3.r * u_brightness );\n                    vec4 color_1 = vec4( u_color_1, d3.g * u_brightness );\n                    vec4 color_2 = vec4( u_color_2, d3.b * u_brightness );\n                    vec4 color_3 = vec4( u_color_3, d3.r * u_brightness );\n                    vec4 color_4 = vec4( u_color_4, d3.g * u_brightness );\n                    vec4 color_5 = vec4( u_color_5, d3.b * u_brightness );\n\n                    vec3 color = vec3( u_darkness );\n                    \n                    color = blendColor( color, color_0.rgb, color_0.a );\n                    color = blendColor( color, color_1.rgb, color_1.a );\n                    color = blendColor( color, color_2.rgb, color_2.a );\n                    color = blendColor( color, color_3.rgb, color_3.a );\n                    color = blendColor( color, color_4.rgb, color_4.a );\n                    color = blendColor( color, color_5.rgb, color_5.a );\n\n                    // vec3 finalColor = color_0 + color_1 + color_2 + color_3 + color_4 + color_5;\n                    \n                    // color = vec3(d3.r);\n                    gl_FragColor = vec4( color, 1.0);\n                }\n            ",uniforms:{u_time:{value:0},u_resolution:{value:new St(2*this.canvasW,2*this.canvasH)},u_expand:{value:6},u_color_0:{value:new kt(this.palette[0])},u_color_1:{value:new kt(this.palette[1])},u_color_2:{value:new kt(this.palette[2])},u_color_3:{value:new kt(this.palette[3])},u_color_4:{value:new kt(this.palette[4])},u_color_5:{value:new kt(this.palette[5])},u_st_scale:{value:this.typedata.st_scale},u_curl_scale:{value:this.typedata.curl_scale},u_brightness:{value:this.typedata.brightness},u_darkness:{value:this.typedata.darkness}}}),this.rttPlane=new dt(this.gl,{geometry:this.rttPlaneGeo,program:this.rttProgram}),this.isRenderTarget=!0}},{key:"_resetSeed",value:function(){}},{key:"_makeMaterial",value:function(){this._planeShader=new B(this.gl,{vertex:"\n                attribute vec3 position;\n                attribute vec2 uv;\n                uniform mat4 modelViewMatrix;\n                uniform mat4 projectionMatrix;\n                varying vec2 vUv;\n                void main() {\n                    vUv = uv;\n                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n                }\n            ",fragment:"\n                precision highp float;\n                uniform sampler2D tMap;\n                uniform float uNoiseFactor;\n                uniform float uTime;\n\n                float random(vec2 co) {\n                    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n                }\n\n                varying vec2 vUv;\n                \n                void main() {\n                    vec4 color = texture2D(tMap, vUv);\n\n                    float noise = (random(vUv) - 0.5) * uNoiseFactor;\n                    color.rgb = color.rgb + color.rgb * noise;\n\n                    gl_FragColor = color;\n                }\n            ",uniforms:{tMap:{value:this.rtt.texture},uNoiseFactor:{value:.1},uTime:{value:0}}})}},{key:"_make",value:function(){var t=new Ct(this.gl,{width:this.canvasW,height:this.canvasH});new dt(this.gl,{geometry:t,program:this._planeShader}).setParent(this.scene)}},{key:"_resetColors",value:function(){this.rttProgram.uniforms.u_color_0.value=new kt(this.palette[0]),this.rttProgram.uniforms.u_color_1.value=new kt(this.palette[1]),this.rttProgram.uniforms.u_color_2.value=new kt(this.palette[2]),this.rttProgram.uniforms.u_color_3.value=new kt(this.palette[3]),this.rttProgram.uniforms.u_color_4.value=new kt(this.palette[4]),this.rttProgram.uniforms.u_color_5.value=new kt(this.palette[5])}},{key:"_animate",value:function(){this.rttProgram.uniforms.u_time.value=this.frame/this.speed}},{key:"update",value:function(t,e){switch(t){case"noise":this._planeShader.uniforms.uNoiseFactor.value=parseFloat(e);break;case"speed":var i=parseInt(e);this.speed=-400*i/9+4900/9;break;case"pattern scale":var r=parseFloat(e);this.rttProgram.uniforms.u_st_scale.value=-19*r+20;break;case"edge blur":var n=parseFloat(e);this.rttProgram.uniforms.u_curl_scale.value=-4*n+5;break;case"brightness":var s=parseFloat(e);this.rttProgram.uniforms.u_brightness.value=s;break;case"darkness":var a=parseFloat(e);this.rttProgram.uniforms.u_darkness.value=a}}}])}();export{Ot as AmbientLightBg};
````

## File: src/common/utils.ts
````typescript
1: export function uuidv4(): string {
2:   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
3:     const r = (Math.random() * 16) | 0;
4:     const v = c === "x" ? r : (r & 0x3) | 0x8;
5:     return v.toString(16);
6:   });
7: }
````

## File: src/components/chat/ErrorComponents.tsx
````typescript
 1: import React from 'react';
 2: import {
 3:   Alert,
 4:   Button,
 5:   Typography
 6: } from "antd";
 7: import { useTranslation } from 'react-i18next';
 8: 
 9: const { Text } = Typography;
10: 
11: interface ErrorAlertProps {
12:   hasError: boolean;
13:   errorInfo: string;
14:   onClose: () => void;
15:   onContinue: () => void;
16: }
17: 
18: export const ErrorAlert = ({
19:   hasError,
20:   errorInfo,
21:   onClose,
22:   onContinue
23: }: ErrorAlertProps) => {
24:   const { t } = useTranslation('chat');
25: 
26:   if (!hasError) return null;
27: 
28:   return (
29:     <Alert
30:       message={t('error_title')}
31:       description={
32:         <div>
33:           <div>{errorInfo}</div>
34:           <div style={{ marginTop: 8 }}>
35:             <Text type="secondary" style={{ fontSize: '12px' }}>
36:               {t('error_tip')}
37:             </Text>
38:           </div>
39:         </div>
40:       }
41:       type="error"
42:       showIcon
43:       closable
44:       onClose={onClose}
45:       style={{ marginBottom: 16 }}
46:       action={
47:         <Button
48:           size="small"
49:           type="primary"
50:           onClick={onContinue}
51:         >
52:           {t('continue')}
53:         </Button>
54:       }
55:     />
56:   );
57: };
````

## File: src/components/chat/InputComponents.tsx
````typescript
 1: import React from 'react';
 2: import {
 3:   Input,
 4:   Card,
 5:   Button,
 6:   Space,
 7:   Spin
 8: } from "antd";
 9: import {
10:   SendOutlined
11: } from '@ant-design/icons';
12: import { useTranslation } from 'react-i18next';
13: 
14: const { TextArea } = Input;
15: 
16: interface ChatInputProps {
17:   inputMessage: string;
18:   setInputMessage: (value: string) => void;
19:   sendMessage: () => void;
20:   isLoading: boolean;
21:   onKeyPress: (e: React.KeyboardEvent) => void;
22: }
23: 
24: export const ChatInput = ({
25:   inputMessage,
26:   setInputMessage,
27:   sendMessage,
28:   isLoading,
29:   onKeyPress
30: }: ChatInputProps) => {
31:   const { t } = useTranslation('chat');
32: 
33:   return (
34:     <Card>
35:       <Space.Compact style={{ width: '100%' }}>
36:         <TextArea
37:           placeholder={t('input_placeholder')}
38:           value={inputMessage}
39:           onChange={(e) => setInputMessage(e.target.value)}
40:           onKeyDown={onKeyPress}
41:           disabled={isLoading}
42:           autoSize={{ minRows: 1, maxRows: 4 }}
43:           style={{ resize: 'none' }}
44:         />
45:         <Button
46:           type="primary"
47:           icon={<SendOutlined />}
48:           loading={isLoading}
49:           onClick={sendMessage}
50:           disabled={!inputMessage.trim() || isLoading}
51:           style={{ height: 'auto', minHeight: '32px' }}
52:         >
53:           {t('send')}
54:         </Button>
55:       </Space.Compact>
56: 
57:       {isLoading && (
58:         <div style={{ marginTop: 8, textAlign: 'center' }}>
59:           <Space>
60:             <Spin size="small" />
61:             <span style={{ color: '#999', fontSize: '14px' }}>{t('ai_thinking')}</span>
62:           </Space>
63:         </div>
64:       )}
65:     </Card>
66:   );
67: };
````

## File: src/components/chat/MessageComponents.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Typography, Button } from "antd";
  3: import ReactMarkdown from "react-markdown";
  4: import { Executing, Browser, Search, DataAnalysis, ExpandCollapse, DeepThinking, FinishStatus, RuningStatus, Atlas } from '../../icons/deepfundai-icons';
  5: import { DisplayMessage, AgentGroupMessage, ToolAction, AgentMessage } from '../../models';
  6: import { useTranslation } from 'react-i18next';
  7: 
  8: const { Text } = Typography;
  9: 
 10: interface MessageDisplayProps {
 11:   message: DisplayMessage;
 12:   onToolClick?: (message: ToolAction) => void;
 13: }
 14: 
 15: // Workflow display component
 16: const WorkflowDisplay = ({ workflow }: { workflow: any }) => {
 17:   if (!workflow) return null;
 18: 
 19:   // Check if thought is completed by whether agents field exists and has content
 20:   const isThoughtCompleted = workflow.agents && workflow.agents.length > 0;
 21: 
 22:   return (
 23:     <div className="workflow-display space-y-4">
 24:       <div className='flex items-center gap-2'>
 25:         <Atlas />
 26:         <span className="text-lg font-bold">Atlas</span>
 27:       </div>
 28: 
 29:       {/* Thinking process - dark theme style */}
 30:       {workflow.thought && (
 31:         <ThinkingDisplay content={workflow.thought} isCompleted={isThoughtCompleted} />
 32:       )}
 33: 
 34:       {/* Agent list - STEP format */}
 35:       {workflow.agents && workflow.agents.length > 0 && (
 36:         <div className="space-y-3">
 37:           {workflow.agents.map((agent: any, index: number) => (
 38:             <StepAgentDisplay key={agent.id || index} agent={agent} stepNumber={index + 1} />
 39:           ))}
 40:         </div>
 41:       )}
 42:     </div>
 43:   );
 44: };
 45: 
 46: // Safely render node text
 47: const renderNodeText = (node: any, t: any): string => {
 48:   if (typeof node === 'string') {
 49:     return node;
 50:   }
 51:   if (typeof node === 'object' && node !== null) {
 52:     if (node.text && typeof node.text === 'string') {
 53:       return node.text;
 54:     }
 55:     // If no text property or empty, return default text
 56:     return t('step_description');
 57:   }
 58:   return String(node || t('step_description'));
 59: };
 60: 
 61: // Thinking display component
 62: const ThinkingDisplay = ({ content, isCompleted = false }: { content: string; isCompleted?: boolean }) => {
 63:   const { t } = useTranslation('chat');
 64:   const [collapsed, setCollapsed] = useState(false);
 65: 
 66:   return (
 67:     <div className="bg-thinking rounded-lg p-4">
 68:       {/* Header */}
 69:       <div
 70:         className="flex items-center justify-start gap-1 cursor-pointer mb-3"
 71:         onClick={() => setCollapsed(!collapsed)}
 72:       >
 73:         <div className="flex items-center space-x-2">
 74:           {isCompleted ? (
 75:             <FinishStatus />
 76:           ) : (
 77:             <DeepThinking />
 78:           )}
 79:           <span className="text-white font-medium text-sm">{t('thinking')}</span>
 80:         </div>
 81:         <Button
 82:           type="text"
 83:           size="small"
 84:           icon={collapsed ? <ExpandCollapse className=' rotate-180' /> : <ExpandCollapse />}
 85:           className="!text-gray-400 hover:!text-white"
 86:         />
 87:       </div>
 88: 
 89:       {/* Content */}
 90:       {!collapsed && (
 91:         <div className="text-sm text-text-12-dark leading-relaxed">
 92:           {content}
 93:         </div>
 94:       )}
 95:     </div>
 96:   );
 97: };
 98: 
 99: // STEP format Agent display component
100: const StepAgentDisplay = ({ agent, stepNumber }: { agent: any; stepNumber: number }) => {
101:   const { t } = useTranslation('chat');
102: 
103:   return (
104:     <div className="step-agent-display text-base">
105:       {/* Agent information - status display removed */}
106:       <div className="px-2 border-l-2 border-text-05-dark mb-3">
107:         <div className="flex items-center gap-1 text-text-05-dark font-semibold ">
108:           <DeepThinking />
109:           {agent.name} {t('agent')}
110:         </div>
111:         <div className="mt-1">
112:           {agent.task}
113:         </div>
114:       </div>
115: 
116:       {/* Execution steps - STEP format */}
117:       {agent.nodes && agent.nodes.length > 0 && (
118:         <div className="space-y-2">
119:           {agent.nodes.map((node: any, nodeIndex: number) => (
120:             <div key={nodeIndex} className="step-item flex items-center justify-start gap-2 mt-3">
121:               <span className="font-semibold w-5 h-5 bg-step rounded-full flex items-center justify-center">
122:                 {nodeIndex + 1}
123:               </span>
124:               <span className='line-clamp-1 flex-1'>
125:                 {renderNodeText(node, t)}
126:               </span>
127:             </div>
128:           ))}
129:         </div>
130:       )}
131:     </div>
132:   );
133: };
134: 
135: // Tool related components
136: const ToolDisplay = ({
137:   message,
138:   onToolClick
139: }: {
140:   message: ToolAction;
141:   onToolClick: (message: ToolAction) => void;
142: }) => {
143:   const { t } = useTranslation('chat');
144: 
145:   // Tool icon mapping (can do approximate matching based on common tool names)
146:   const getToolIcon = (toolName?: string) => {
147:     const name = (toolName || '').toLowerCase();
148:     if (name.includes('navigate') || name.includes('extract') || name.includes('browser')) return <Browser />;
149:     if (name.includes('search')) return <Search />;
150:     if (name.includes('analy') || name.includes('data')) return <DataAnalysis />;
151:     return <Executing />;
152:   };
153: 
154:   return (
155:     <div
156:       className="inline-flex items-center gap-2 px-3 py-2 bg-tool-call rounded-md border text-xs border-border-message text-text-12-dark cursor-pointer hover:bg-opacity-80 transition-colors"
157:       onClick={() => onToolClick(message)}
158:     >
159:       {getToolIcon(message.toolName)}
160:       <span>{t('executing_tool', { toolName: message.toolName || 'tool' })}</span>
161:     </div>
162:   );
163: };
164: 
165: // Message content component
166: const MessageContent = ({ message, onToolClick }: { message: DisplayMessage, onToolClick }) => {
167:   // User message
168:   if (message.type === 'user') {
169:     return (
170:       <div className="px-4 py-3 rounded-lg bg-message border border-border-message">
171:         <span className="text-base">{message.content}</span>
172:       </div>
173:     );
174:   }
175: 
176: 
177:   if (message.type === 'workflow') {
178:     return <WorkflowDisplay workflow={message.workflow} />;
179:   }
180: 
181:   if (message.type === 'agent_group') {
182:     return <AgentGroupDisplay agentMessage={message} onToolClick={onToolClick} />
183:   }
184: 
185:   return null;
186: };
187: 
188: // Message content component
189: const AgentMessageContent = ({ message, onToolClick }: { message: AgentMessage, onToolClick }) => {
190: 
191:   if (message.type === 'tool') {
192:     return <ToolDisplay message={message} onToolClick={onToolClick} />;
193:   }
194: 
195:   if (message.type === 'text') {
196:     const content = message.content || '';
197:     if (!content.trim()) {
198:       return null; // Don't display empty content messages
199:     }
200:     return (
201:       <div className="message-text text-text-12-dark markdown-container">
202:         <ReactMarkdown>{content}</ReactMarkdown>
203:       </div>
204:     );
205:   }
206: 
207:   return null;
208: };
209: 
210: 
211: // Single message component
212: const MessageItem = ({ message, onToolClick }: MessageDisplayProps) => {
213:   const isUser = message.type === 'user';
214: 
215:   // Get message content
216:   const messageContent = <MessageContent message={message} onToolClick={onToolClick} />;
217: 
218:   // If message content is empty, don't display the entire message item
219:   if (!messageContent) {
220:     return null;
221:   }
222: 
223:   return (
224:     <div className='message-item mb-4'>
225:       {/* Outer container for left/right alignment */}
226:       <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
227:         <div className='text-text-01-dark w-full'>
228:           {messageContent}
229:         </div>
230:       </div>
231:     </div>
232:   );
233: };
234: 
235: // Agent grouped message display component
236: const AgentGroupDisplay = ({
237:   agentMessage,
238:   onToolClick
239: }: {
240:   agentMessage: AgentGroupMessage;
241:   onToolClick?: (message: ToolAction) => void;
242: }) => {
243:   const [isCollapsed, setIsCollapsed] = useState(false);
244: 
245:   return (
246:     <div className="agent-group mb-4 mt-10">
247:       {/* Agent task title */}
248:       <div
249:         className="flex items-center cursor-pointer transition-colors mb-4"
250:         onClick={() => setIsCollapsed(!isCollapsed)}
251:       >
252:         <div className="flex items-center gap-2">
253:           {agentMessage.status === 'completed' ? (
254:             <FinishStatus />
255:           ) : agentMessage.status === 'error' ? (
256:             <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
257:               <span className="text-white text-xs">✕</span>
258:             </div>
259:           ) : (
260:             <RuningStatus />
261:           )}
262:           <span className="font-semibold">
263:             {agentMessage.agentNode?.task || agentMessage.agentName}
264:           </span>
265:         </div>
266:         <Button
267:           type="text"
268:           size="small"
269:           icon={isCollapsed ? <ExpandCollapse className=' rotate-180' /> : <ExpandCollapse />}
270:         />
271:       </div>
272: 
273:       {/* Agent execution steps */}
274:       {!isCollapsed && (
275:         <div className="agent-steps">
276:           {agentMessage.messages.map((message) => {
277:             return (
278:               <div key={message.id} className="agent-step">
279:                 <div className="pl-6 mb-3 text-sm">
280:                   <AgentMessageContent message={message} onToolClick={onToolClick} />
281:                 </div>
282:               </div>
283:             );
284:           })}
285:         </div>
286:       )}
287:     </div>
288:   );
289: };
290: 
291: // Message list component
292: const MessageListComponent = ({
293:   messages,
294:   onToolClick
295: }: {
296:   messages: DisplayMessage[];
297:   onToolClick?: (message: ToolAction) => void;
298: }) => {
299: 
300:   return (
301:     <div className="message-list space-y-2">
302:       {messages.map((message) => <MessageItem message={message} key={message.id} onToolClick={onToolClick} />)}
303:     </div>
304:   );
305: };
306: 
307: 
308: // Export components
309: export { MessageListComponent as MessageList, MessageItem };
310: export default MessageListComponent;
````

## File: src/components/chat/ToolComponents.tsx
````typescript
  1: import React from 'react';
  2: import {
  3:   Card,
  4:   Typography,
  5:   Space,
  6:   Tag,
  7:   Spin,
  8:   Alert,
  9:   Descriptions,
 10:   Timeline,
 11:   Collapse,
 12:   Button
 13: } from "antd";
 14: import {
 15:   ToolOutlined,
 16:   PlayCircleOutlined,
 17:   CheckCircleOutlined,
 18:   LoadingOutlined,
 19:   CodeOutlined,
 20:   FileTextOutlined,
 21:   EyeOutlined,
 22:   EyeInvisibleOutlined
 23: } from '@ant-design/icons';
 24: import { useTranslation } from 'react-i18next';
 25: 
 26: const { Text, Paragraph } = Typography;
 27: const { Panel } = Collapse;
 28: 
 29: // Tool usage component
 30: export const ToolUseDisplay = ({ toolName, params }: { toolName: string; params: any }) => {
 31:   const { t } = useTranslation('chat');
 32:   const [showParams, setShowParams] = React.useState(false);
 33: 
 34:   const getToolIcon = (name: string) => {
 35:     if (name.includes('current_page') || name.includes('browser')) return <FileTextOutlined />;
 36:     if (name.includes('click') || name.includes('type')) return <PlayCircleOutlined />;
 37:     return <ToolOutlined />;
 38:   };
 39: 
 40:      const getToolDescription = (name: string) => {
 41:      const descriptions: Record<string, string> = {
 42:        'current_page': t('tool_current_page'),
 43:        'click': t('tool_click'),
 44:        'type': t('tool_type'),
 45:        'scroll': t('tool_scroll'),
 46:        'navigate': t('tool_navigate'),
 47:        'wait': t('tool_wait'),
 48:        'screenshot': t('tool_screenshot')
 49:      };
 50:      return descriptions[name] || t('tool_execute');
 51:    };
 52: 
 53:   const formatParams = (params: any) => {
 54:     if (!params || typeof params !== 'object' || Object.keys(params).length === 0) {
 55:       return [{ key: 'empty', label: t('parameters'), children: t('no_parameters') }];
 56:     }
 57: 
 58:     const items = Object.entries(params).map(([key, value]) => ({
 59:       key,
 60:       label: key,
 61:       children: typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)
 62:     }));
 63: 
 64:     return items;
 65:   };
 66: 
 67:   return (
 68:     <Card 
 69:       size="small" 
 70:       style={{ 
 71:         backgroundColor: '#f0f9ff', 
 72:         border: '1px solid #bae6fd',
 73:         borderRadius: '8px'
 74:       }}
 75:       title={
 76:         <Space>
 77:           {getToolIcon(toolName)}
 78:           <Text strong style={{ color: '#0369a1' }}>{toolName}</Text>
 79:         </Space>
 80:       }
 81:       extra={
 82:         <Button
 83:           type="text"
 84:           size="small"
 85:           icon={showParams ? <EyeInvisibleOutlined /> : <EyeOutlined />}
 86:           onClick={() => setShowParams(!showParams)}
 87:         >
 88:           {showParams ? t('hide') : t('view')} {t('parameters')}
 89:         </Button>
 90:       }
 91:     >
 92:       <Space direction="vertical" style={{ width: '100%' }}>
 93:         {/* Tag row */}
 94:         <div>
 95:           <Tag color="blue" style={{ fontSize: '11px' }}>{t('tool_call')}</Tag>
 96:         </div>
 97: 
 98:         {/* Tool description */}
 99:         <Text type="secondary" style={{ fontSize: '13px' }}>
100:           {getToolDescription(toolName)}
101:         </Text>
102: 
103:         {/* Parameter display */}
104:         {showParams && (
105:           <Collapse size="small" ghost>
106:             <Panel header={t('call_parameters')} key="params">
107:               <Descriptions
108:                 size="small"
109:                 column={1}
110:                 items={formatParams(params)}
111:                 labelStyle={{ fontWeight: 'bold', width: '100px' }}
112:               />
113:             </Panel>
114:           </Collapse>
115:         )}
116:       </Space>
117:     </Card>
118:   );
119: };
120: 
121: // Tool running component
122: export const ToolRunningDisplay = ({ toolName, text }: { toolName: string; text: string }) => {
123:   const { t } = useTranslation('chat');
124: 
125:   return (
126:     <Card
127:       size="small"
128:       style={{
129:         backgroundColor: '#fefce8',
130:         border: '1px solid #fde047',
131:         borderRadius: '8px'
132:       }}
133:       title={
134:         <Space>
135:           <Spin size="small" indicator={<LoadingOutlined style={{ color: '#ca8a04' }} />} />
136:           <Text strong style={{ color: '#a16207' }}>{toolName}</Text>
137:         </Space>
138:       }
139:     >
140:       <Space direction="vertical" style={{ width: '100%' }}>
141:         {/* Status tag */}
142:         <div>
143:           <Tag color="warning" style={{ fontSize: '11px' }}>{t('executing')}</Tag>
144:         </div>
145: 
146:         {/* Execution information */}
147:         {text && (
148:           <div style={{ padding: '6px 10px', backgroundColor: '#fffbeb', borderRadius: '4px' }}>
149:             <Text style={{ fontSize: '12px', color: '#92400e' }}>{text}</Text>
150:           </div>
151:         )}
152:       </Space>
153:     </Card>
154:   );
155: };
156: 
157: // Tool result display component
158: export const ToolResultDisplay = ({ toolName, params, result }: {
159:   toolName: string;
160:   params: any;
161:   result: any;
162: }) => {
163:   const { t } = useTranslation('chat');
164:   const [showDetails, setShowDetails] = React.useState(false);
165: 
166:   const formatResult = (result: any) => {
167:     if (!result) return t('no_result');
168: 
169:     if (typeof result.content === 'string') {
170:       return result.content;
171:     }
172: 
173:     if (typeof result.content === 'object') {
174:       // Handle special result types
175:       if (result.content.url) {
176:         return `${t('page_url')}: ${result.content.url}`;
177:       }
178:       if (result.content.title) {
179:         return `${t('page_title')}: ${result.content.title}`;
180:       }
181:       return JSON.stringify(result.content, null, 2);
182:     }
183: 
184:     return String(result.content || result);
185:   };
186: 
187:   const isError = result?.isError || false;
188:   const isSuccess = !isError && result;
189: 
190:   return (
191:     <Card 
192:       size="small" 
193:       style={{ 
194:         backgroundColor: isError ? '#fef2f2' : '#f0fdf4', 
195:         border: isError ? '1px solid #fecaca' : '1px solid #bbf7d0',
196:         borderRadius: '8px'
197:       }}
198:       title={
199:         <Space>
200:           {isError ? (
201:             <Text style={{ color: '#dc2626' }}>❌</Text>
202:           ) : (
203:             <CheckCircleOutlined style={{ color: '#16a34a' }} />
204:           )}
205:           <Text strong style={{ color: isError ? '#dc2626' : '#15803d' }}>
206:             {toolName}
207:           </Text>
208:         </Space>
209:       }
210:       extra={
211:         <Button
212:           type="text"
213:           size="small"
214:           icon={<CodeOutlined />}
215:           onClick={() => setShowDetails(!showDetails)}
216:         >
217:           {showDetails ? t('hide') : t('view')} {t('details')}
218:         </Button>
219:       }
220:     >
221:       <Space direction="vertical" style={{ width: '100%' }}>
222:         {/* Status tag */}
223:         <div>
224:           <Tag color={isError ? 'error' : 'success'} style={{ fontSize: '11px' }}>
225:             {isError ? t('execution_failed') : t('execution_successful')}
226:           </Tag>
227:         </div>
228: 
229:         {/* Result content */}
230:         <div style={{ 
231:           padding: '8px 12px', 
232:           backgroundColor: isError ? '#fef7f7' : '#f7fef7', 
233:           borderRadius: '4px',
234:           border: `1px solid ${isError ? '#f3e8e8' : '#e8f5e8'}`
235:         }}>
236:           <Paragraph 
237:             ellipsis={{ rows: 3, expandable: true }}
238:             style={{ 
239:               margin: 0, 
240:               fontSize: '13px',
241:               color: isError ? '#991b1b' : '#166534'
242:             }}
243:           >
244:             {formatResult(result)}
245:           </Paragraph>
246:         </div>
247: 
248:         {/* Details display */}
249:         {showDetails && (
250:           <Collapse size="small" ghost>
251:             <Panel header={t('execution_details')} key="details">
252:               <Space direction="vertical" style={{ width: '100%' }}>
253:                 <Descriptions
254:                   size="small"
255:                   column={1}
256:                   title={t('call_parameters')}
257:                   items={params && typeof params === 'object' ?
258:                     Object.entries(params).map(([key, value]) => ({
259:                       key,
260:                       label: key,
261:                       children: typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)
262:                     })) :
263:                     [{ key: 'empty', label: t('parameters'), children: t('no_parameters') }]
264:                   }
265:                 />
266: 
267:                 {result && (
268:                   <div style={{ marginTop: 12 }}>
269:                     <Text strong>{t('return_result')}:</Text>
270:                     <pre style={{
271:                       marginTop: 4,
272:                       padding: '8px',
273:                       backgroundColor: '#f8f9fa',
274:                       borderRadius: '4px',
275:                       fontSize: '12px',
276:                       overflow: 'auto',
277:                       maxHeight: '200px'
278:                     }}>
279:                       {JSON.stringify(result, null, 2)}
280:                     </pre>
281:                   </div>
282:                 )}
283:               </Space>
284:             </Panel>
285:           </Collapse>
286:         )}
287:       </Space>
288:     </Card>
289:   );
290: };
291: 
292: // Tool process timeline component
293: export const ToolTimelineDisplay = ({
294:   toolName,
295:   status,
296:   params,
297:   result,
298:   streamText
299: }: {
300:   toolName: string;
301:   status: 'use' | 'running' | 'result';
302:   params?: any;
303:   result?: any;
304:   streamText?: string;
305: }) => {
306:   const { t } = useTranslation('chat');
307: 
308:   const items = [
309:     {
310:       dot: <ToolOutlined style={{ color: '#1890ff' }} />,
311:       children: (
312:         <div>
313:           <Text strong>{t('call_tool')}: {toolName}</Text>
314:           {params && typeof params === 'object' && Object.keys(params).length > 0 && (
315:             <div style={{ marginTop: 4 }}>
316:               <Tag color="blue">{t('parameters_count', { count: Object.keys(params).length })}</Tag>
317:             </div>
318:           )}
319:         </div>
320:       )
321:     }
322:   ];
323: 
324:   if (status === 'running' || status === 'result') {
325:     items.push({
326:       dot: status === 'running' ?
327:         <LoadingOutlined style={{ color: '#faad14' }} /> :
328:         <CheckCircleOutlined style={{ color: '#52c41a' }} />,
329:       children: (
330:         <div>
331:           <Text>{status === 'running' ? t('executing_ellipsis') : t('execution_completed')}</Text>
332:           {streamText && (
333:             <div style={{ marginTop: 4, fontSize: '12px', color: '#666' }}>
334:               {streamText}
335:             </div>
336:           )}
337:         </div>
338:       )
339:     });
340:   }
341: 
342:   if (status === 'result' && result) {
343:     items.push({
344:       dot: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
345:       children: (
346:         <div>
347:           <Text strong>{t('return_result')}</Text>
348:           <div style={{
349:             marginTop: 4,
350:             padding: '6px 8px',
351:             backgroundColor: '#f6ffed',
352:             borderRadius: '4px',
353:             fontSize: '12px'
354:           }}>
355:             {typeof result.content === 'string' ? result.content : JSON.stringify(result.content)}
356:           </div>
357:         </div>
358:       )
359:     });
360:   }
361: 
362:   return (
363:     <Timeline style={{ marginLeft: 8 }}>
364:       {items.map((item, index) => (
365:         <Timeline.Item key={index} dot={item.dot}>
366:           {item.children}
367:         </Timeline.Item>
368:       ))}
369:     </Timeline>
370:   );
371: };
````

## File: src/components/fellou/AmbientLightBg.tsx
````typescript
  1: "use client";
  2: 
  3: import React, { useEffect, useRef } from "react";
  4: import { cn } from "./utils";
  5: 
  6: interface AnimatedBackgroundProps {
  7:   className?: string;
  8:   scale?: number;
  9:   blur?: number;
 10:   noise?: number;
 11:   opacity?: number;
 12:   speed?: number;
 13: }
 14: 
 15: export function AnimatedBackground({
 16:   className,
 17:   scale = 0.9,
 18:   blur = 0.06,
 19:   noise = 0.08,
 20:   opacity = 0.0,
 21:   speed = 0.25,
 22: }: AnimatedBackgroundProps) {
 23:   const containerRef = useRef<HTMLDivElement>(null);
 24:   // eslint-disable-next-line @typescript-eslint/no-explicit-any
 25:   const colorBgRef = useRef<any>(null);
 26: 
 27:   useEffect(() => {
 28:     if (!containerRef.current) return;
 29: 
 30:     let isDestroyed = false;
 31: 
 32:     // 动态创建并加载脚本
 33:     const script = document.createElement("script");
 34:     script.type = "module";
 35: 
 36:     // 内联脚本来导入和初始化 AmbientLightBg
 37:     script.textContent = `
 38:       import { AmbientLightBg } from '/jsm/AmbientLightBg.module.js';
 39: 
 40:       // 将 AmbientLightBg 暴露到全局，以便我们可以使用它
 41:       window.AmbientLightBg = AmbientLightBg;
 42: 
 43:       // 触发自定义事件通知加载完成
 44:       window.dispatchEvent(new Event('ambientBgLoaded'));
 45:     `;
 46: 
 47:     // 监听加载完成事件
 48:     const handleLoaded = () => {
 49:       if (isDestroyed || !containerRef.current || !window.AmbientLightBg) return;
 50: 
 51:       try {
 52:         // 创建 AmbientLightBg 实例
 53:         colorBgRef.current = new window.AmbientLightBg({
 54:           dom: containerRef.current.id,
 55:           colors: ["#004880", "#CDCFCF", "#3390C0", "#2B71A1", "#005A92", "#004880"],
 56:           //["#007FFE","#3099FE","#60B2FE","#90CCFE","#a8d3f0","#b7e1df"],
 57:           loop: true,
 58:           speed: speed,
 59:         });
 60: 
 61:         // 应用自定义参数
 62:         if (colorBgRef.current && colorBgRef.current.update) {
 63:           // Scale 参数对应 pattern scale
 64:           colorBgRef.current.update("pattern scale", scale);
 65: 
 66:           // Blur 参数对应 edge blur
 67:           colorBgRef.current.update("edge blur", blur);
 68: 
 69:           // Noise 参数
 70:           colorBgRef.current.update("noise", noise);
 71:         }
 72:       } catch (error) {
 73:         // Handle initialization error (likely WebGL not supported)
 74:         console.error('AmbientLightBg initialization failed:', error);
 75: 
 76:         // Trigger fallback event to notify parent component
 77:         window.dispatchEvent(new CustomEvent('ambientBgError', {
 78:           detail: { error }
 79:         }));
 80:       }
 81:     };
 82: 
 83:     window.addEventListener("ambientBgLoaded", handleLoaded);
 84:     document.body.appendChild(script);
 85: 
 86:     // 清理函数
 87:     return () => {
 88:       isDestroyed = true;
 89:       window.removeEventListener("ambientBgLoaded", handleLoaded);
 90: 
 91:       if (colorBgRef.current && colorBgRef.current.destroy) {
 92:         colorBgRef.current.destroy();
 93:       }
 94: 
 95:       // 移除脚本
 96:       if (script.parentNode) {
 97:         script.parentNode.removeChild(script);
 98:       }
 99: 
100:       // 清理全局变量
101:       if (window.AmbientLightBg) {
102:         delete window.AmbientLightBg;
103:       }
104:     };
105:   }, [scale, blur, noise, speed]);
106: 
107:   return (
108:     <div className={cn("absolute inset-0", className)}>
109:       <div ref={containerRef} id="ambient-bg-container" className="absolute inset-0" />
110:       <div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity }} />
111:     </div>
112:   );
113: }
114: 
115: // 添加全局类型声明
116: declare global {
117:   interface Window {
118:     // eslint-disable-next-line @typescript-eslint/no-explicit-any
119:     AmbientLightBg?: any;
120:   }
121: }
````

## File: src/components/fellou/ChromeBrowserBackground.tsx
````typescript
 1: "use client";
 2: 
 3: import { motion } from "framer-motion";
 4: import { useState, useEffect } from "react";
 5: import { AnimatedBackground } from "./AmbientLightBg";
 6: import { GradientTechBackground } from "./GradientTechBackground";
 7: import { isWebGLSupported } from "@/utils/webglDetect";
 8: 
 9: export function ChromeBrowserBackground() {
10:   const [backgroundReady, setBackgroundReady] = useState(false);
11:   const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
12:   const [useFallback, setUseFallback] = useState(false);
13: 
14:   // Detect WebGL support on mount
15:   useEffect(() => {
16:     const supported = isWebGLSupported();
17:     setWebglSupported(supported);
18: 
19:     if (!supported) {
20:       console.warn('WebGL not supported, using fallback gradient background');
21:       setUseFallback(true);
22:       setBackgroundReady(true);
23:     }
24:   }, []);
25: 
26:   // Listen for background animation ready state
27:   useEffect(() => {
28:     const handleBackgroundReady = () => {
29:       setBackgroundReady(true);
30:     };
31: 
32:     const handleBackgroundError = (event: Event) => {
33:       const customEvent = event as CustomEvent;
34:       console.error('AnimatedBackground failed, falling back to gradient:', customEvent.detail?.error);
35:       setUseFallback(true);
36:       setBackgroundReady(true);
37:     };
38: 
39:     // Listen for ambient background loaded event
40:     window.addEventListener("ambientBgLoaded", handleBackgroundReady);
41:     window.addEventListener("ambientBgError", handleBackgroundError);
42: 
43:     return () => {
44:       window.removeEventListener("ambientBgLoaded", handleBackgroundReady);
45:       window.removeEventListener("ambientBgError", handleBackgroundError);
46:     };
47:   }, []);
48: 
49:   return (
50:     <>
51:       {/* Black background - always visible as fallback */}
52:       <div className="fixed inset-0 bg-black z-0" />
53: 
54:       {/* Render background based on WebGL support and fallback state */}
55:       {useFallback ? (
56:         /* Fallback: Gradient Tech Background (no WebGL required) */
57:         <motion.div
58:           className="fixed inset-0 z-0 overflow-hidden"
59:           initial={{ opacity: 0 }}
60:           animate={{ opacity: 1 }}
61:           transition={{ duration: 0.8, ease: "easeInOut" }}
62:         >
63:           <GradientTechBackground />
64:           {/* Black overlay with 40% opacity */}
65:           <div className="absolute inset-0 bg-black/40" />
66:         </motion.div>
67:       ) : webglSupported !== false ? (
68:         /* WebGL supported: AnimatedBackground with loading-based opacity control */
69:         <motion.div
70:           className="fixed inset-0 z-0 overflow-hidden"
71:           initial={{ opacity: 0 }}
72:           animate={{ opacity: backgroundReady ? 1 : 0 }}
73:           transition={{ duration: 0.8, ease: "easeInOut" }}
74:           style={{
75:             opacity: backgroundReady ? 1 : 0,
76:           }}
77:         >
78:           {/* Animated background - render at desktop size for mobile consistency */}
79:           <div
80:             className="absolute"
81:             style={{
82:               width: "100vw",
83:               height: "100vh",
84:               minWidth: "1440px", // Desktop width for consistent appearance
85:               minHeight: "900px",  // Desktop height for consistent appearance
86:               left: "50%",
87:               top: "50%",
88:               transform: "translate(-50%, -50%)"
89:             }}
90:           >
91:             <AnimatedBackground speed={0.25} />
92:           </div>
93:           {/* Black overlay with 40% opacity */}
94:           <div className="absolute inset-0 bg-black/40" />
95:         </motion.div>
96:       ) : null}
97:     </>
98:   );
99: }
````

## File: src/components/fellou/GradientTechBackground.tsx
````typescript
 1: "use client";
 2: 
 3: import React from "react";
 4: import { cn } from "./utils";
 5: 
 6: interface GradientTechBackgroundProps {
 7:   className?: string;
 8: }
 9: 
10: /**
11:  * Gradient Tech Background Component
12:  * A fallback background for devices without WebGL support
13:  * Uses CSS gradients and animations for a tech-inspired look
14:  */
15: export function GradientTechBackground({ className }: GradientTechBackgroundProps) {
16:   return (
17:     <div className={cn("absolute inset-0 overflow-hidden", className)}>
18:       {/* Main gradient background with animation */}
19:       <div className="absolute inset-0 bg-gradient-tech animate-gradient-shift" />
20: 
21:       {/* Overlay gradients for depth effect */}
22:       <div className="absolute inset-0 bg-gradient-radial opacity-60" />
23: 
24:       {/* Animated glow spots */}
25:       <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
26:       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
27: 
28:       {/* Subtle grid overlay for tech feel */}
29:       <div className="absolute inset-0 opacity-10">
30:         <div
31:           className="w-full h-full"
32:           style={{
33:             backgroundImage: `
34:               linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
35:               linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
36:             `,
37:             backgroundSize: '50px 50px'
38:           }}
39:         />
40:       </div>
41: 
42:       {/* Add styles for custom animations */}
43:       <style jsx>{`
44:         @keyframes gradient-shift {
45:           0%, 100% {
46:             background-position: 0% 50%;
47:           }
48:           50% {
49:             background-position: 100% 50%;
50:           }
51:         }
52: 
53:         @keyframes pulse-slow {
54:           0%, 100% {
55:             opacity: 0.6;
56:             transform: scale(1);
57:           }
58:           50% {
59:             opacity: 0.8;
60:             transform: scale(1.1);
61:           }
62:         }
63: 
64:         .bg-gradient-tech {
65:           background: linear-gradient(
66:             135deg,
67:             #001a33 0%,
68:             #003366 25%,
69:             #004d7a 50%,
70:             #003d5c 75%,
71:             #001a33 100%
72:           );
73:           background-size: 400% 400%;
74:         }
75: 
76:         .bg-gradient-radial {
77:           background: radial-gradient(
78:             circle at 50% 50%,
79:             transparent 0%,
80:             rgba(0, 26, 51, 0.8) 100%
81:           );
82:         }
83: 
84:         .animate-gradient-shift {
85:           animation: gradient-shift 15s ease infinite;
86:         }
87: 
88:         .animate-pulse-slow {
89:           animation: pulse-slow 8s ease-in-out infinite;
90:         }
91: 
92:         .animation-delay-2000 {
93:           animation-delay: 2s;
94:         }
95:       `}</style>
96:     </div>
97:   );
98: }
````

## File: src/components/fellou/utils.ts
````typescript
1: import { clsx, type ClassValue } from "clsx"
2: import { twMerge } from "tailwind-merge"
3: 
4: export function cn(...inputs: ClassValue[]) {
5:   return twMerge(clsx(inputs))
6: }
````

## File: src/components/scheduled-task/index.tsx
````typescript
1: /**
2:  * Scheduled task component exports
3:  */
4: export { ScheduledTaskModal } from './ScheduledTaskModal';
5: export { ScheduledTaskListPanel } from './ScheduledTaskListPanel';
6: export { TaskStepEditor } from './TaskStepEditor';
7: export { ScheduleConfigEditor } from './ScheduleConfigEditor';
````

## File: src/components/scheduled-task/ScheduleConfigEditor.tsx
````typescript
  1: import React from 'react';
  2: import { Form, Radio, InputNumber, Select, Space } from 'antd';
  3: import { ScheduleConfig } from '@/models';
  4: import { useTranslation } from 'react-i18next';
  5: 
  6: interface ScheduleConfigEditorProps {
  7:   value?: ScheduleConfig;
  8:   onChange?: (value: ScheduleConfig) => void;
  9: }
 10: 
 11: /**
 12:  * Schedule configuration editor
 13:  * Supports interval time and Cron expression two methods
 14:  */
 15: export const ScheduleConfigEditor: React.FC<ScheduleConfigEditorProps> = ({ value, onChange }) => {
 16:   const { t } = useTranslation('scheduledTask');
 17:   const [scheduleType, setScheduleType] = React.useState<'interval' | 'cron'>(value?.type || 'interval');
 18:   const [intervalUnit, setIntervalUnit] = React.useState<'minute' | 'hour' | 'day'>(
 19:     value?.intervalUnit || 'minute'
 20:   );
 21:   const [intervalValue, setIntervalValue] = React.useState<number>(value?.intervalValue || 1);
 22:   const [cronExpression, setCronExpression] = React.useState<string>(value?.cronExpression || '');
 23: 
 24:   const handleChange = () => {
 25:     const config: ScheduleConfig = {
 26:       type: scheduleType,
 27:       ...(scheduleType === 'interval'
 28:         ? { intervalUnit, intervalValue }
 29:         : { cronExpression }),
 30:     };
 31: 
 32:     onChange?.(config);
 33:   };
 34: 
 35:   React.useEffect(() => {
 36:     handleChange();
 37:   }, [scheduleType, intervalUnit, intervalValue, cronExpression]);
 38: 
 39:   const getIntervalText = () => {
 40:     const unitText = {
 41:       minute: t('minutes'),
 42:       hour: t('hours'),
 43:       day: t('days'),
 44:     };
 45:     return t('execute_every_interval', { interval: intervalValue, unit: unitText[intervalUnit] });
 46:   };
 47: 
 48:   return (
 49:     <div className="schedule-config-editor">
 50:       <Form.Item label={t('schedule_type')}>
 51:         <Radio.Group
 52:           value={scheduleType}
 53:           onChange={(e) => setScheduleType(e.target.value)}
 54:         >
 55:           <Radio value="interval">{t('interval_time')}</Radio>
 56:           <Radio value="cron" disabled>
 57:             {t('cron_expression')}
 58:           </Radio>
 59:         </Radio.Group>
 60:       </Form.Item>
 61: 
 62:       {scheduleType === 'interval' && (
 63:         <Form.Item label={t('execution_interval')}>
 64:           <Space>
 65:             <span>{t('every')}</span>
 66:             <InputNumber
 67:               min={1}
 68:               max={999}
 69:               value={intervalValue}
 70:               onChange={(val) => setIntervalValue(val || 1)}
 71:               className="!w-20"
 72:             />
 73:             <Select
 74:               value={intervalUnit}
 75:               onChange={(val) => setIntervalUnit(val)}
 76:               className="!w-24"
 77:             >
 78:               <Select.Option value="minute">{t('minutes')}</Select.Option>
 79:               <Select.Option value="hour">{t('hours')}</Select.Option>
 80:               <Select.Option value="day">{t('days')}</Select.Option>
 81:             </Select>
 82:             <span>{t('execute_once')}</span>
 83:           </Space>
 84:         </Form.Item>
 85:       )}
 86: 
 87:       {scheduleType === 'cron' && (
 88:         <Form.Item label={t('cron_expression_label')}>
 89:           <input
 90:             type="text"
 91:             value={cronExpression}
 92:             onChange={(e) => setCronExpression(e.target.value)}
 93:             placeholder={t('cron_example')}
 94:             className="ant-input"
 95:             disabled
 96:           />
 97:           <div className="mt-2 text-sm text-gray-400">
 98:             {t('cron_not_supported')}
 99:           </div>
100:         </Form.Item>
101:       )}
102: 
103:       <div className="mt-4 p-3 bg-tool-call rounded border border-border-message">
104:         <div className="text-sm text-text-12-dark">
105:           <strong>{t('execution_rule')}</strong>
106:           {scheduleType === 'interval' ? getIntervalText() : t('execute_by_cron')}
107:         </div>
108:       </div>
109:     </div>
110:   );
111: };
````

## File: src/components/scheduled-task/ScheduledTaskListModal.tsx
````typescript
  1: import React, { useEffect } from 'react';
  2: import { Modal, List, Button, Switch, Popconfirm, Tag, Empty, App } from 'antd';
  3: import { PlusOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
  4: import { useScheduledTaskStore } from '@/stores/scheduled-task-store';
  5: import { ScheduledTask } from '@/models';
  6: import { formatDistanceToNow } from 'date-fns';
  7: import { zhCN, enUS } from 'date-fns/locale';
  8: import { ScheduledTaskModal } from './ScheduledTaskModal';
  9: import { useTranslation } from 'react-i18next';
 10: import { useLanguageStore } from '@/stores/languageStore';
 11: 
 12: interface ScheduledTaskListModalProps {
 13:   visible: boolean;
 14:   onClose: () => void;
 15: }
 16: 
 17: /**
 18:  * Scheduled task list modal (for Toolbox page)
 19:  */
 20: export const ScheduledTaskListModal: React.FC<ScheduledTaskListModalProps> = ({ visible, onClose }) => {
 21:   const { t } = useTranslation('scheduledTask');
 22:   const { language } = useLanguageStore();
 23:   const { message } = App.useApp();
 24:   const {
 25:     scheduledTasks,
 26:     loadScheduledTasks,
 27:     toggleTaskEnabled,
 28:     deleteTask,
 29:     selectTask,
 30:     setShowCreateModal,
 31:     setIsEditMode,
 32:     executeTaskNow,
 33:   } = useScheduledTaskStore();
 34: 
 35:   useEffect(() => {
 36:     if (visible) {
 37:       loadScheduledTasks();
 38:     }
 39:   }, [visible]);
 40: 
 41:   // Edit task
 42:   const handleEdit = (task: ScheduledTask) => {
 43:     selectTask(task);
 44:     setIsEditMode(true);
 45:     setShowCreateModal(true);
 46:   };
 47: 
 48:   // Delete task
 49:   const handleDelete = async (taskId: string) => {
 50:     try {
 51:       await deleteTask(taskId);
 52:       message.success(t('task_deleted_success'));
 53:     } catch (error) {
 54:       message.error(t('delete_failed'));
 55:     }
 56:   };
 57: 
 58:   // Execute immediately
 59:   const handleExecuteNow = async (task: ScheduledTask) => {
 60:     try {
 61:       await executeTaskNow(task);
 62:       message.success(t('task_started'));
 63:     } catch (error) {
 64:       message.error(t('execution_failed'));
 65:     }
 66:   };
 67: 
 68:   // View execution history
 69:   const handleViewHistory = async (task: ScheduledTask) => {
 70:     try {
 71:       // Call main process to open task window history panel
 72:       if (typeof window !== 'undefined' && (window as any).api) {
 73:         await (window as any).api.invoke('open-task-history', task.id);
 74:         message.success(t('opening_history'));
 75:         // Close modal
 76:         onClose();
 77:       }
 78:     } catch (error) {
 79:       console.error('Failed to open execution history:', error);
 80:       message.error(t('open_history_failed'));
 81:     }
 82:   };
 83: 
 84:   // Get interval description
 85:   const getIntervalText = (task: ScheduledTask) => {
 86:     const { schedule } = task;
 87:     if (schedule.type === 'interval') {
 88:       const unitMap = {
 89:         minute: 'every_minutes',
 90:         hour: 'every_hours',
 91:         day: 'every_days',
 92:       };
 93:       return t(unitMap[schedule.intervalUnit!], { count: schedule.intervalValue });
 94:     }
 95:     return t('cron');
 96:   };
 97: 
 98:   // Get last execution time description
 99:   const getLastExecutedText = (task: ScheduledTask) => {
100:     if (!task.lastExecutedAt) {
101:       return t('never_executed');
102:     }
103: 
104:     try {
105:       const locale = language === 'zh-CN' ? zhCN : enUS;
106:       return formatDistanceToNow(new Date(task.lastExecutedAt), {
107:         addSuffix: true,
108:         locale,
109:       });
110:     } catch {
111:       return t('unknown');
112:     }
113:   };
114: 
115:   return (
116:     <>
117:       <Modal
118:         title={t('scheduled_tasks')}
119:         open={visible}
120:         onCancel={onClose}
121:         width="90%"
122:         footer={null}
123:         style={{ minHeight: '60vh' }}
124:         styles={{
125:           body: { minHeight: '50vh', maxHeight: '75vh', overflowY: 'auto', padding: '24px' }
126:         }}
127:       >
128:       <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
129:         <Button
130:           type="primary"
131:           icon={<PlusOutlined />}
132:           onClick={() => {
133:             setIsEditMode(false);
134:             selectTask(null);
135:             setShowCreateModal(true);
136:           }}
137:         >
138:           {t('new_task')}
139:         </Button>
140:       </div>
141: 
142:       {scheduledTasks.length === 0 ? (
143:         <Empty
144:           description={t('no_tasks')}
145:           image={Empty.PRESENTED_IMAGE_SIMPLE}
146:         >
147:           <Button
148:             type="primary"
149:             onClick={() => {
150:               setIsEditMode(false);
151:               selectTask(null);
152:               setShowCreateModal(true);
153:             }}
154:           >
155:             {t('create_first_task')}
156:           </Button>
157:         </Empty>
158:       ) : (
159:         <List
160:           dataSource={scheduledTasks}
161:           renderItem={(task) => (
162:             <List.Item
163:               style={{
164:                 background: 'rgba(0, 0, 0, 0.02)',
165:                 border: '1px solid #f0f0f0',
166:                 borderRadius: '8px',
167:                 padding: '16px',
168:                 marginBottom: '12px'
169:               }}
170:               key={task.id}
171:             >
172:               <div style={{ width: '100%' }}>
173:                 {/* Task header */}
174:                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
175:                   <div style={{ flex: 1 }}>
176:                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
177:                       <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
178:                         {task.name}
179:                       </h4>
180:                       <Tag color={task.enabled ? 'success' : 'default'}>
181:                         {task.enabled ? t('enabled') : t('disabled')}
182:                       </Tag>
183:                     </div>
184:                     {task.description && (
185:                       <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
186:                         {task.description}
187:                       </p>
188:                     )}
189:                   </div>
190: 
191:                   {/* Enable switch */}
192:                   <Switch
193:                     checked={task.enabled}
194:                     onChange={() => toggleTaskEnabled(task.id)}
195:                     checkedChildren={t('enable')}
196:                     unCheckedChildren={t('disable')}
197:                   />
198:                 </div>
199: 
200:                 {/* Task information */}
201:                 <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#666', marginBottom: '12px' }}>
202:                   <span>
203:                     <ClockCircleOutlined style={{ marginRight: '4px' }} />
204:                     {getIntervalText(task)}
205:                   </span>
206:                   <span>{t('last', { time: getLastExecutedText(task) })}</span>
207:                   <span>{t('steps_count', { count: task.steps.length })}</span>
208:                 </div>
209: 
210:                 {/* Action buttons */}
211:                 <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
212:                   <Button
213:                     size="small"
214:                     icon={<PlayCircleOutlined />}
215:                     onClick={() => handleExecuteNow(task)}
216:                     disabled={!task.enabled}
217:                   >
218:                     {t('execute_now')}
219:                   </Button>
220:                   <Button
221:                     size="small"
222:                     onClick={() => handleViewHistory(task)}
223:                   >
224:                     {t('history')}
225:                   </Button>
226:                   <Button
227:                     size="small"
228:                     icon={<EditOutlined />}
229:                     onClick={() => handleEdit(task)}
230:                   >
231:                     {t('edit')}
232:                   </Button>
233:                   <Popconfirm
234:                     title={t('confirm_deletion')}
235:                     description={t('confirm_deletion_message')}
236:                     onConfirm={() => handleDelete(task.id)}
237:                     okText={t('delete')}
238:                     cancelText={t('cancel')}
239:                     okButtonProps={{ danger: true }}
240:                   >
241:                     <Button
242:                       size="small"
243:                       danger
244:                       icon={<DeleteOutlined />}
245:                     >
246:                       {t('delete')}
247:                     </Button>
248:                   </Popconfirm>
249:                 </div>
250:               </div>
251:             </List.Item>
252:           )}
253:         />
254:       )}
255:       </Modal>
256: 
257:       {/* Create/Edit task modal */}
258:       <ScheduledTaskModal />
259:     </>
260:   );
261: };
````

## File: src/components/scheduled-task/ScheduledTaskListPanel.tsx
````typescript
  1: import React, { useEffect } from 'react';
  2: import { Drawer, List, Button, Switch, Popconfirm, Tag, Empty, App } from 'antd';
  3: import { PlusOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
  4: import { useScheduledTaskStore } from '@/stores/scheduled-task-store';
  5: import { ScheduledTask } from '@/models';
  6: import { formatDistanceToNow } from 'date-fns';
  7: import { zhCN, enUS } from 'date-fns/locale';
  8: import { useTranslation } from 'react-i18next';
  9: import { useLanguageStore } from '@/stores/languageStore';
 10: 
 11: /**
 12:  * Scheduled task list panel
 13:  */
 14: export const ScheduledTaskListPanel: React.FC = () => {
 15:   const { t } = useTranslation('scheduledTask');
 16:   const { language } = useLanguageStore();
 17:   const { message } = App.useApp();
 18:   const {
 19:     showListPanel,
 20:     setShowListPanel,
 21:     scheduledTasks,
 22:     loadScheduledTasks,
 23:     toggleTaskEnabled,
 24:     deleteTask,
 25:     selectTask,
 26:     setShowCreateModal,
 27:     setIsEditMode,
 28:     executeTaskNow,
 29:   } = useScheduledTaskStore();
 30: 
 31:   useEffect(() => {
 32:     if (showListPanel) {
 33:       loadScheduledTasks();
 34:     }
 35:   }, [showListPanel]);
 36: 
 37:   // Edit task
 38:   const handleEdit = (task: ScheduledTask) => {
 39:     selectTask(task);
 40:     setIsEditMode(true);
 41:     setShowCreateModal(true);
 42:   };
 43: 
 44:   // Delete task
 45:   const handleDelete = async (taskId: string) => {
 46:     try {
 47:       await deleteTask(taskId);
 48:       message.success(t('task_deleted_success'));
 49:     } catch (error) {
 50:       message.error(t('delete_failed'));
 51:     }
 52:   };
 53: 
 54:   // Execute immediately
 55:   const handleExecuteNow = async (task: ScheduledTask) => {
 56:     try {
 57:       await executeTaskNow(task);
 58:       message.success(t('task_started'));
 59:     } catch (error) {
 60:       message.error(t('execution_failed'));
 61:     }
 62:   };
 63: 
 64:   // View execution history
 65:   const handleViewHistory = async (task: ScheduledTask) => {
 66:     try {
 67:       // Call main process to open task window history panel
 68:       if (typeof window !== 'undefined' && (window as any).api) {
 69:         await (window as any).api.invoke('open-task-history', task.id);
 70:         message.success(t('opening_history'));
 71:         // Close task list panel
 72:         setShowListPanel(false);
 73:       }
 74:     } catch (error) {
 75:       console.error('Failed to open execution history:', error);
 76:       message.error(t('open_history_failed'));
 77:     }
 78:   };
 79: 
 80:   // Get interval description
 81:   const getIntervalText = (task: ScheduledTask) => {
 82:     const { schedule } = task;
 83:     if (schedule.type === 'interval') {
 84:       const unitMap = {
 85:         minute: 'every_minutes',
 86:         hour: 'every_hours',
 87:         day: 'every_days',
 88:       };
 89:       return t(unitMap[schedule.intervalUnit!], { count: schedule.intervalValue });
 90:     }
 91:     return t('cron');
 92:   };
 93: 
 94:   // Get last execution time description
 95:   const getLastExecutedText = (task: ScheduledTask) => {
 96:     if (!task.lastExecutedAt) {
 97:       return t('never_executed');
 98:     }
 99: 
100:     try {
101:       const locale = language === 'zh-CN' ? zhCN : enUS;
102:       return formatDistanceToNow(new Date(task.lastExecutedAt), {
103:         addSuffix: true,
104:         locale,
105:       });
106:     } catch {
107:       return t('unknown');
108:     }
109:   };
110: 
111:   return (
112:     <>
113:       <Drawer
114:         title={
115:           <div className="flex items-center justify-between">
116:             <span>{t('task_list')}</span>
117:             <Button
118:               type="primary"
119:               icon={<PlusOutlined />}
120:               onClick={() => {
121:                 setIsEditMode(false);
122:                 selectTask(null);
123:                 setShowCreateModal(true);
124:               }}
125:             >
126:               {t('new_task')}
127:             </Button>
128:           </div>
129:         }
130:         open={showListPanel}
131:         onClose={() => setShowListPanel(false)}
132:         width={400}
133:         className="scheduled-task-list-panel"
134:         styles={{
135:         wrapper: {
136:           marginTop: '48px', // header height
137:           height: 'calc(100vh - 48px)', // subtract header height
138:           borderLeft: '1px solid rgba(94, 49, 216, 0.2)', // Subtle purple border
139:         },
140:         body: {
141:           padding: '16px',
142:           height: '100%',
143:           // Fellou.ai inspired elegant gradient background
144:           background: 'linear-gradient(180deg, #1e1c23 0%, #281c39 100%)',
145:           backdropFilter: 'blur(16px)',
146:         }
147:       }}
148:       >
149:         {scheduledTasks.length === 0 ? (
150:           <Empty
151:             description={t('no_tasks')}
152:             image={Empty.PRESENTED_IMAGE_SIMPLE}
153:           >
154:             <Button
155:               type="primary"
156:               onClick={() => {
157:                 setIsEditMode(false);
158:                 selectTask(null);
159:                 setShowCreateModal(true);
160:               }}
161:             >
162:               {t('create_first_task')}
163:             </Button>
164:           </Empty>
165:         ) : (
166:           <List
167:             dataSource={scheduledTasks}
168:             renderItem={(task) => (
169:               <List.Item
170:                 className="!bg-tool-call !border !border-border-message rounded-lg px-4 mb-3"
171:                 key={task.id}
172:               >
173:                 <div className="w-full px-2">
174:                   {/* Task header */}
175:                   <div className="flex items-start justify-between mb-2">
176:                     <div className="flex-1">
177:                       <div className="flex items-center gap-2 mb-1">
178:                         <h4 className="text-base font-semibold text-text-01-dark m-0">
179:                           {task.name}
180:                         </h4>
181:                         <Tag color={task.enabled ? 'success' : 'default'}>
182:                           {task.enabled ? t('enabled') : t('disabled')}
183:                         </Tag>
184:                       </div>
185:                       {task.description && (
186:                         <p className="text-sm text-text-12-dark m-0 mb-2">
187:                           {task.description}
188:                         </p>
189:                       )}
190:                     </div>
191: 
192:                     {/* Enable switch */}
193:                     <Switch
194:                       checked={task.enabled}
195:                       onChange={() => toggleTaskEnabled(task.id)}
196:                       checkedChildren={t('enable')}
197:                       unCheckedChildren={t('disable')}
198:                     />
199:                   </div>
200: 
201:                   {/* Task information */}
202:                   <div className="flex items-center gap-4 text-sm text-text-12-dark mb-3">
203:                     <span>
204:                       <ClockCircleOutlined className="mr-1" />
205:                       {getIntervalText(task)}
206:                     </span>
207:                     <span>{t('last_executed', { time: getLastExecutedText(task) })}</span>
208:                     <span>{t('steps_count', { count: task.steps.length })}</span>
209:                   </div>
210: 
211:                   {/* Action buttons */}
212:                   <div className="flex gap-2">
213:                     <Button
214:                       size="small"
215:                       icon={<PlayCircleOutlined />}
216:                       onClick={() => handleExecuteNow(task)}
217:                       disabled={!task.enabled}
218:                     >
219:                       {t('execute_now')}
220:                     </Button>
221:                     <Button
222:                       size="small"
223:                       onClick={() => handleViewHistory(task)}
224:                     >
225:                       {t('execution_history')}
226:                     </Button>
227:                     <Button
228:                       size="small"
229:                       icon={<EditOutlined />}
230:                       onClick={() => handleEdit(task)}
231:                     >
232:                       {t('edit')}
233:                     </Button>
234:                     <Popconfirm
235:                       title={t('confirm_deletion')}
236:                       description={t('confirm_deletion_message')}
237:                       onConfirm={() => handleDelete(task.id)}
238:                       okText={t('delete')}
239:                       cancelText={t('cancel')}
240:                       okButtonProps={{ danger: true }}
241:                     >
242:                       <Button
243:                         size="small"
244:                         danger
245:                         icon={<DeleteOutlined />}
246:                       >
247:                         {t('delete')}
248:                       </Button>
249:                     </Popconfirm>
250:                   </div>
251:                 </div>
252:               </List.Item>
253:             )}
254:           />
255:         )}
256:       </Drawer>
257:     </>
258:   );
259: };
````

## File: src/components/scheduled-task/ScheduledTaskModal.tsx
````typescript
  1: import React, { useEffect } from 'react';
  2: import { Modal, Form, Input, Switch, App } from 'antd';
  3: import { TaskStepEditor } from './TaskStepEditor';
  4: import { ScheduleConfigEditor } from './ScheduleConfigEditor';
  5: import { useScheduledTaskStore } from '@/stores/scheduled-task-store';
  6: import { TaskStep, ScheduleConfig } from '@/models';
  7: import { useTranslation } from 'react-i18next';
  8: 
  9: /**
 10:  * Scheduled task create/edit modal
 11:  */
 12: export const ScheduledTaskModal: React.FC = () => {
 13:   const { t } = useTranslation('scheduledTask');
 14:   const { message } = App.useApp();
 15:   const [form] = Form.useForm();
 16: 
 17:   const {
 18:     showCreateModal,
 19:     setShowCreateModal,
 20:     isEditMode,
 21:     selectedTask,
 22:     createTask,
 23:     updateTask,
 24:   } = useScheduledTaskStore();
 25: 
 26:   // Initialize form
 27:   useEffect(() => {
 28:     if (showCreateModal) {
 29:       if (isEditMode && selectedTask) {
 30:         // Edit mode: populate existing data
 31:         form.setFieldsValue({
 32:           name: selectedTask.name,
 33:           description: selectedTask.description,
 34:           steps: selectedTask.steps,
 35:           schedule: selectedTask.schedule,
 36:           enabled: selectedTask.enabled,
 37:         });
 38:       } else {
 39:         // Create mode: reset form
 40:         form.resetFields();
 41:         form.setFieldsValue({
 42:           enabled: true,
 43:           schedule: {
 44:             type: 'interval',
 45:             intervalUnit: 'minute',
 46:             intervalValue: 1,
 47:           },
 48:           steps: [],
 49:         });
 50:       }
 51:     }
 52:   }, [showCreateModal, isEditMode, selectedTask, form]);
 53: 
 54:   // Submit form
 55:   const handleSubmit = async () => {
 56:     try {
 57:       const values = await form.validateFields();
 58: 
 59:       // Validate steps
 60:       if (!values.steps || values.steps.length === 0) {
 61:         message.error(t('add_step_required'));
 62:         return;
 63:       }
 64: 
 65:       // Validate step content
 66:       const hasEmptyStep = values.steps.some(
 67:         (step: TaskStep) => !step.name || !step.content
 68:       );
 69: 
 70:       if (hasEmptyStep) {
 71:         message.error(t('complete_step_info'));
 72:         return;
 73:       }
 74: 
 75:       if (isEditMode && selectedTask) {
 76:         // Update task
 77:         await updateTask(selectedTask.id, {
 78:           name: values.name,
 79:           description: values.description,
 80:           steps: values.steps,
 81:           schedule: values.schedule,
 82:           enabled: values.enabled,
 83:           source: 'manual', // Manually created task
 84:         });
 85: 
 86:         message.success(t('task_updated'));
 87:       } else {
 88:         // Create task
 89:         await createTask({
 90:           name: values.name,
 91:           description: values.description,
 92:           steps: values.steps,
 93:           schedule: values.schedule,
 94:           enabled: values.enabled,
 95:           source: 'manual',
 96:         });
 97: 
 98:         message.success(t('task_created'));
 99:       }
100: 
101:       handleCancel();
102:     } catch (error: any) {
103:       console.error('Submit failed:', error);
104:       message.error(error.message || t('operation_failed'));
105:     }
106:   };
107: 
108:   // Cancel
109:   const handleCancel = () => {
110:     form.resetFields();
111:     setShowCreateModal(false);
112:   };
113: 
114:   return (
115:     <Modal
116:       open={showCreateModal}
117:       onCancel={handleCancel}
118:       onOk={handleSubmit}
119:       title={isEditMode ? t('edit_task') : t('create_task')}
120:       width="85%"
121:       style={{ minHeight: '60vh' }}
122:       styles={{
123:         body: { minHeight: '50vh', maxHeight: '75vh', overflowY: 'auto' }
124:       }}
125:       okText={isEditMode ? t('save') : t('create_and_enable')}
126:       cancelText={t('cancel')}
127:       destroyOnClose
128:     >
129:       <Form
130:         form={form}
131:         layout="vertical"
132:         className="mt-4"
133:       >
134:         {/* Task name */}
135:         <Form.Item
136:           name="name"
137:           label={t('task_name')}
138:           rules={[{ required: true, message: t('enter_task_name') }]}
139:         >
140:           <Input
141:             placeholder={t('enter_task_name')}
142:             className="!bg-main-view !border-border-message !text-text-01-dark"
143:           />
144:         </Form.Item>
145: 
146:         {/* Task description */}
147:         <Form.Item
148:           name="description"
149:           label={t('task_description')}
150:         >
151:           <Input.TextArea
152:             placeholder={t('enter_task_description')}
153:             rows={2}
154:             className="!bg-main-view !border-border-message !text-text-01-dark"
155:           />
156:         </Form.Item>
157: 
158:         {/* Task steps */}
159:         <Form.Item
160:           name="steps"
161:           label={t('task_steps')}
162:           rules={[
163:             {
164:               validator: async (_, value) => {
165:                 if (!value || value.length === 0) {
166:                   throw new Error(t('add_step_required'));
167:                 }
168:               },
169:             },
170:           ]}
171:         >
172:           <TaskStepEditor />
173:         </Form.Item>
174: 
175:         {/* Schedule configuration */}
176:         <Form.Item
177:           name="schedule"
178:           label={t('schedule_config')}
179:           rules={[{ required: true, message: t('configure_interval') }]}
180:         >
181:           <ScheduleConfigEditor />
182:         </Form.Item>
183: 
184:         {/* Whether to enable */}
185:         <Form.Item
186:           name="enabled"
187:           label={t('enable_on_create')}
188:           valuePropName="checked"
189:         >
190:           <Switch />
191:         </Form.Item>
192:       </Form>
193:     </Modal>
194:   );
195: };
````

## File: src/components/scheduled-task/TaskStepEditor.tsx
````typescript
  1: import React, { useState, useEffect } from 'react';
  2: import { Button, Input, Modal, List, Space, Card } from 'antd';
  3: import { DeleteOutlined, HolderOutlined, PlusOutlined } from '@ant-design/icons';
  4: import { TaskStep, TaskTemplate } from '@/models';
  5: import { useScheduledTaskStore } from '@/stores/scheduled-task-store';
  6: import { useTranslation } from 'react-i18next';
  7: 
  8: interface TaskStepEditorProps {
  9:   value?: TaskStep[];
 10:   onChange?: (steps: TaskStep[]) => void;
 11: }
 12: 
 13: /**
 14:  * Task step editor
 15:  * Supports manual step addition and API template import
 16:  */
 17: export const TaskStepEditor: React.FC<TaskStepEditorProps> = ({ value = [], onChange }) => {
 18:   const { t } = useTranslation('scheduledTask');
 19:   const [steps, setSteps] = useState<TaskStep[]>(value);
 20:   const [showTemplateModal, setShowTemplateModal] = useState(false);
 21: 
 22:   const { templates, loadTemplates } = useScheduledTaskStore();
 23: 
 24:   useEffect(() => {
 25:     loadTemplates();
 26:   }, []);
 27: 
 28:   useEffect(() => {
 29:     setSteps(value);
 30:   }, [value]);
 31: 
 32:   // Add new step
 33:   const handleAddStep = () => {
 34:     const newStep: TaskStep = {
 35:       id: `step_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
 36:       name: '',
 37:       content: '',
 38:       order: steps.length + 1,
 39:     };
 40: 
 41:     const newSteps = [...steps, newStep];
 42:     setSteps(newSteps);
 43:     onChange?.(newSteps);
 44:   };
 45: 
 46:   // Update step
 47:   const handleUpdateStep = (id: string, updates: Partial<TaskStep>) => {
 48:     const newSteps = steps.map((step) =>
 49:       step.id === id ? { ...step, ...updates } : step
 50:     );
 51:     setSteps(newSteps);
 52:     onChange?.(newSteps);
 53:   };
 54: 
 55:   // Delete step
 56:   const handleRemoveStep = (id: string) => {
 57:     const newSteps = steps.filter((step) => step.id !== id);
 58:     // Reorder
 59:     const reorderedSteps = newSteps.map((step, index) => ({
 60:       ...step,
 61:       order: index + 1,
 62:     }));
 63:     setSteps(reorderedSteps);
 64:     onChange?.(reorderedSteps);
 65:   };
 66: 
 67:   // Import steps from API
 68:   const handleImportFromTemplate = (template: TaskTemplate) => {
 69:     const importedSteps: TaskStep[] = template.steps.map((step) => ({
 70:       ...step,
 71:       id: `step_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
 72:     }));
 73: 
 74:     setSteps(importedSteps);
 75:     onChange?.(importedSteps);
 76:     setShowTemplateModal(false);
 77:   };
 78: 
 79:   // Move step up
 80:   const handleMoveUp = (index: number) => {
 81:     if (index === 0) return;
 82: 
 83:     const newSteps = [...steps];
 84:     [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
 85: 
 86:     // Reorder
 87:     const reorderedSteps = newSteps.map((step, idx) => ({
 88:       ...step,
 89:       order: idx + 1,
 90:     }));
 91: 
 92:     setSteps(reorderedSteps);
 93:     onChange?.(reorderedSteps);
 94:   };
 95: 
 96:   // Move step down
 97:   const handleMoveDown = (index: number) => {
 98:     if (index === steps.length - 1) return;
 99: 
100:     const newSteps = [...steps];
101:     [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
102: 
103:     // Reorder
104:     const reorderedSteps = newSteps.map((step, idx) => ({
105:       ...step,
106:       order: idx + 1,
107:     }));
108: 
109:     setSteps(reorderedSteps);
110:     onChange?.(reorderedSteps);
111:   };
112: 
113:   return (
114:     <div className="task-step-editor">
115:       {/* Action buttons */}
116:       <div className="mb-4 flex gap-2">
117:         <Button
118:           type="primary"
119:           icon={<PlusOutlined />}
120:           onClick={handleAddStep}
121:         >
122:           {t('manual_add_step')}
123:         </Button>
124:         <Button onClick={() => setShowTemplateModal(true)}>
125:           {t('import_from_template')}
126:         </Button>
127:       </div>
128: 
129:       {/* Step list */}
130:       {steps.length === 0 ? (
131:         <div className="text-center py-8 text-text-12-dark bg-tool-call rounded border border-border-message">
132:           {t('no_steps')}
133:         </div>
134:       ) : (
135:         <div className="space-y-3">
136:           {steps.map((step, index) => (
137:             <Card
138:               key={step.id}
139:               className="!bg-tool-call !border-border-message"
140:               size="small"
141:             >
142:               <div className="flex items-start gap-3">
143:                 {/* Step number and drag icon */}
144:                 <div className="flex flex-col items-center gap-1 pt-1">
145:                   <HolderOutlined className="text-text-12-dark cursor-move" />
146:                   <span className="text-sm font-bold text-text-01-dark">
147:                     {index + 1}
148:                   </span>
149:                 </div>
150: 
151:                 {/* Step content */}
152:                 <div className="flex-1 space-y-2">
153:                   <Input
154:                     placeholder={t('step_name')}
155:                     value={step.name}
156:                     onChange={(e) =>
157:                       handleUpdateStep(step.id, { name: e.target.value })
158:                     }
159:                     className="!bg-main-view !border-border-message !text-text-01-dark"
160:                   />
161:                   <Input.TextArea
162:                     placeholder={t('step_description')}
163:                     value={step.content}
164:                     onChange={(e) =>
165:                       handleUpdateStep(step.id, { content: e.target.value })
166:                     }
167:                     rows={2}
168:                     className="!bg-main-view !border-border-message !text-text-01-dark"
169:                   />
170:                 </div>
171: 
172:                 {/* Action buttons */}
173:                 <div className="flex flex-col gap-1">
174:                   <Button
175:                     size="small"
176:                     onClick={() => handleMoveUp(index)}
177:                     disabled={index === 0}
178:                   >
179:                     ↑
180:                   </Button>
181:                   <Button
182:                     size="small"
183:                     onClick={() => handleMoveDown(index)}
184:                     disabled={index === steps.length - 1}
185:                   >
186:                     ↓
187:                   </Button>
188:                   <Button
189:                     size="small"
190:                     danger
191:                     icon={<DeleteOutlined />}
192:                     onClick={() => handleRemoveStep(step.id)}
193:                   />
194:                 </div>
195:               </div>
196:             </Card>
197:           ))}
198:         </div>
199:       )}
200: 
201:       {/* Template selection modal */}
202:       <Modal
203:         open={showTemplateModal}
204:         onCancel={() => setShowTemplateModal(false)}
205:         title={t('select_template')}
206:         footer={null}
207:         width={600}
208:       >
209:         <List
210:           dataSource={templates}
211:           renderItem={(template) => (
212:             <List.Item
213:               className="cursor-pointer hover:bg-tool-call px-4 rounded"
214:               onClick={() => handleImportFromTemplate(template)}
215:             >
216:               <List.Item.Meta
217:                 title={<span className="text-text-01-dark">{template.name}</span>}
218:                 description={
219:                   <div className="text-text-12-dark">
220:                     <div>{template.description}</div>
221:                     <div className="mt-1 text-xs">
222:                       {t('contains_steps', { count: template.steps.length })}
223:                       {template.category && ` · ${template.category}`}
224:                     </div>
225:                   </div>
226:                 }
227:               />
228:               <Button type="primary" size="small">
229:                 {t('select')}
230:               </Button>
231:             </List.Item>
232:           )}
233:         />
234:       </Modal>
235:     </div>
236:   );
237: };
````

## File: src/components/AgentConfigModal.tsx
````typescript
  1: import React, { useState, useEffect } from 'react';
  2: import { Modal, Tabs, Switch, Input, Button, Card, message, Spin, Divider, Space, Typography } from 'antd';
  3: import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
  4: import { useTranslation } from 'react-i18next';
  5: import type { AgentConfig, McpToolSchema } from '../type';
  6: 
  7: const { TabPane } = Tabs;
  8: const { TextArea } = Input;
  9: const { Text, Paragraph } = Typography;
 10: 
 11: interface AgentConfigModalProps {
 12:   visible: boolean;
 13:   onClose: () => void;
 14: }
 15: 
 16: /**
 17:  * Agent Configuration Modal Component
 18:  * Modal version of agent configuration page
 19:  */
 20: export default function AgentConfigModal({ visible, onClose }: AgentConfigModalProps) {
 21:   const { t } = useTranslation('agentConfig');
 22:   const [loading, setLoading] = useState(false);
 23:   const [saving, setSaving] = useState(false);
 24:   const [config, setConfig] = useState<AgentConfig>({
 25:     browserAgent: { enabled: true, customPrompt: '' },
 26:     fileAgent: { enabled: true, customPrompt: '' },
 27:     mcpTools: {}
 28:   });
 29:   const [mcpTools, setMcpTools] = useState<McpToolSchema[]>([]);
 30: 
 31:   // Load configuration when modal opens
 32:   useEffect(() => {
 33:     if (visible) {
 34:       loadConfiguration();
 35:     }
 36:   }, [visible]);
 37: 
 38:   const loadConfiguration = async () => {
 39:     setLoading(true);
 40:     try {
 41:       // Load agent config
 42:       const agentResult = await window.api.getAgentConfig();
 43:       if (agentResult.success) {
 44:         setConfig(agentResult.data);
 45:       }
 46: 
 47:       // Load MCP tools
 48:       const toolsResult = await window.api.getMcpTools();
 49:       if (toolsResult.success) {
 50:         setMcpTools(toolsResult.data);
 51:       }
 52:     } catch (error: any) {
 53:       message.error(t('load_error') + error.message);
 54:     } finally {
 55:       setLoading(false);
 56:     }
 57:   };
 58: 
 59:   const handleSave = async () => {
 60:     setSaving(true);
 61:     try {
 62:       const result = await window.api.saveAgentConfig(config);
 63:       if (result.success) {
 64:         message.success(t('save_success'));
 65:         onClose();
 66:       } else {
 67:         message.error(t('save_error'));
 68:       }
 69:     } catch (error: any) {
 70:       message.error(t('save_error') + ': ' + error.message);
 71:     } finally {
 72:       setSaving(false);
 73:     }
 74:   };
 75: 
 76:   const handleReload = async () => {
 77:     await loadConfiguration();
 78:     message.success(t('reload_success'));
 79:   };
 80: 
 81:   const handleToolToggle = async (toolName: string, enabled: boolean) => {
 82:     try {
 83:       // Update local state
 84:       setConfig(prev => ({
 85:         ...prev,
 86:         mcpTools: {
 87:           ...prev.mcpTools,
 88:           [toolName]: { ...prev.mcpTools[toolName], enabled }
 89:         }
 90:       }));
 91: 
 92:       // Update MCP tools list
 93:       setMcpTools(prev =>
 94:         prev.map(tool =>
 95:           tool.name === toolName ? { ...tool, enabled } : tool
 96:         )
 97:       );
 98: 
 99:       // Save to backend
100:       await window.api.setMcpToolEnabled(toolName, enabled);
101:     } catch (error: any) {
102:       message.error(t('tool_update_error') + error.message);
103:     }
104:   };
105: 
106:   return (
107:     <Modal
108:       title={t('title')}
109:       open={visible}
110:       onCancel={onClose}
111:       width="90%"
112:       footer={[
113:         <Button key="reload" icon={<ReloadOutlined />} onClick={handleReload}>
114:           {t('reload')}
115:         </Button>,
116:         <Button key="cancel" onClick={onClose}>
117:           {t('cancel', { ns: 'common' })}
118:         </Button>,
119:         <Button
120:           key="save"
121:           type="primary"
122:           icon={<SaveOutlined />}
123:           loading={saving}
124:           onClick={handleSave}
125:         >
126:           {t('save_configuration')}
127:         </Button>,
128:       ]}
129:       style={{ minHeight: '60vh' }}
130:       styles={{
131:         body: { minHeight: '50vh', maxHeight: '75vh', overflowY: 'auto' }
132:       }}
133:     >
134:       {loading ? (
135:         <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
136:           <Spin size="large" tip={t('loading')} />
137:         </div>
138:       ) : (
139:         <Tabs defaultActiveKey="browser" type="card">
140:           {/* Browser Agent Tab */}
141:           <TabPane tab={t('browser_agent')} key="browser">
142:             <Space direction="vertical" size={16} style={{ width: '100%' }}>
143:               <div>
144:                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
145:                   <Text strong>{t('enable_browser_agent')}</Text>
146:                   <Switch
147:                     checked={config.browserAgent.enabled}
148:                     onChange={(enabled) =>
149:                       setConfig(prev => ({
150:                         ...prev,
151:                         browserAgent: { ...prev.browserAgent, enabled }
152:                       }))
153:                     }
154:                   />
155:                 </div>
156:                 <Paragraph type="secondary" style={{ margin: 0, fontSize: '13px' }}>
157:                   {t('browser_agent_desc')}
158:                 </Paragraph>
159:               </div>
160: 
161:               <Divider style={{ margin: '12px 0' }} />
162: 
163:               <div>
164:                 <div style={{ marginBottom: '12px' }}>
165:                   <Text strong style={{ display: 'block', marginBottom: '6px' }}>{t('custom_system_prompt')}</Text>
166:                   <Text type="secondary" style={{ fontSize: '13px' }}>
167:                     {t('custom_prompt_desc')}
168:                   </Text>
169:                 </div>
170: 
171:                 <div style={{
172:                   fontSize: '12px',
173:                   marginBottom: '10px',
174:                   padding: '10px 12px',
175:                   background: 'rgba(255,255,255,0.08)',
176:                   border: '1px solid rgba(255,255,255,0.1)',
177:                   borderRadius: '4px',
178:                   lineHeight: '1.8'
179:                 }}>
180:                   <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: 'rgba(255,255,255,0.85)' }}>
181:                     {t('default_behaviors')}
182:                   </div>
183:                   <div style={{ color: 'rgba(255,255,255,0.75)' }}>
184:                     • Analyze webpages by taking screenshots and page element structures<br/>
185:                     • Use structured commands to interact with the browser<br/>
186:                     • Handle popups/cookies by accepting or closing them<br/>
187:                     • Request user help for login, verification codes, payments, etc.<br/>
188:                     • Use scroll to find elements, extract content with extract_page_content
189:                   </div>
190:                 </div>
191: 
192:                 <TextArea
193:                   value={config.browserAgent.customPrompt}
194:                   onChange={(e) =>
195:                     setConfig(prev => ({
196:                       ...prev,
197:                       browserAgent: { ...prev.browserAgent, customPrompt: e.target.value }
198:                     }))
199:                   }
200:                   placeholder={t('browser_prompt_placeholder')}
201:                   rows={6}
202:                   disabled={!config.browserAgent.enabled}
203:                 />
204:               </div>
205:             </Space>
206:           </TabPane>
207: 
208:           {/* File Agent Tab */}
209:           <TabPane tab={t('file_agent')} key="file">
210:             <Space direction="vertical" size={16} style={{ width: '100%' }}>
211:               <div>
212:                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
213:                   <Text strong>{t('enable_file_agent')}</Text>
214:                   <Switch
215:                     checked={config.fileAgent.enabled}
216:                     onChange={(enabled) =>
217:                       setConfig(prev => ({
218:                         ...prev,
219:                         fileAgent: { ...prev.fileAgent, enabled }
220:                       }))
221:                     }
222:                   />
223:                 </div>
224:                 <Paragraph type="secondary" style={{ margin: 0, fontSize: '13px' }}>
225:                   {t('file_agent_desc')}
226:                 </Paragraph>
227:               </div>
228: 
229:               <Divider style={{ margin: '12px 0' }} />
230: 
231:               <div>
232:                 <div style={{ marginBottom: '12px' }}>
233:                   <Text strong style={{ display: 'block', marginBottom: '6px' }}>Custom System Prompt</Text>
234:                   <Text type="secondary" style={{ fontSize: '13px' }}>
235:                     Add custom instructions to extend the File Agent's capabilities.
236:                   </Text>
237:                 </div>
238: 
239:                 <div style={{
240:                   fontSize: '12px',
241:                   marginBottom: '10px',
242:                   padding: '10px 12px',
243:                   background: 'rgba(255,255,255,0.08)',
244:                   border: '1px solid rgba(255,255,255,0.1)',
245:                   borderRadius: '4px',
246:                   lineHeight: '1.8'
247:                 }}>
248:                   <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '6px', color: 'rgba(255,255,255,0.85)' }}>
249:                     {t('default_behaviors')}
250:                   </div>
251:                   <div style={{ color: 'rgba(255,255,255,0.75)' }}>
252:                     • Handle file-related tasks: creating, finding, reading, modifying files<br/>
253:                     • Always include working directory when outputting file paths<br/>
254:                     • Output file names must be in English<br/>
255:                     • For data content, combine with visualization tools for display<br/>
256:                     • Generate charts first before page generation to minimize work
257:                   </div>
258:                 </div>
259: 
260:                 <TextArea
261:                   value={config.fileAgent.customPrompt}
262:                   onChange={(e) =>
263:                     setConfig(prev => ({
264:                       ...prev,
265:                       fileAgent: { ...prev.fileAgent, customPrompt: e.target.value }
266:                     }))
267:                   }
268:                   placeholder={t('file_prompt_placeholder')}
269:                   rows={6}
270:                   disabled={!config.fileAgent.enabled}
271:                 />
272:               </div>
273:             </Space>
274:           </TabPane>
275: 
276:           {/* MCP Tools Tab */}
277:           <TabPane tab={t('mcp_tools')} key="tools">
278:             <Space direction="vertical" size={12} style={{ width: '100%' }}>
279:               <Paragraph type="secondary" style={{ margin: '0 0 8px 0', fontSize: '13px' }}>
280:                 {t('available_tools_desc')}
281:               </Paragraph>
282: 
283:               {mcpTools.length === 0 ? (
284:                 <div style={{ textAlign: 'center', padding: '40px 0' }}>
285:                   <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{t('no_tools')}</Text>
286:                 </div>
287:               ) : (
288:                 mcpTools.map((tool) => (
289:                   <Card
290:                     key={tool.name}
291:                     size="small"
292:                     style={{
293:                       border: tool.enabled ? '1px solid rgba(24, 144, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.15)',
294:                       backgroundColor: tool.enabled ? 'rgba(24, 144, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)'
295:                     }}
296:                   >
297:                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
298:                       <div style={{ flex: 1 }}>
299:                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
300:                           <Text strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{tool.name}</Text>
301:                           <Switch
302:                             size="small"
303:                             checked={tool.enabled}
304:                             onChange={(enabled) => handleToolToggle(tool.name, enabled)}
305:                           />
306:                         </div>
307:                         <Paragraph style={{ margin: 0, fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)' }}>
308:                           {tool.description}
309:                         </Paragraph>
310:                       </div>
311:                     </div>
312:                   </Card>
313:                 ))
314:               )}
315:             </Space>
316:           </TabPane>
317:         </Tabs>
318:       )}
319:     </Modal>
320:   );
321: }
````

## File: src/components/Header.tsx
````typescript
  1: import React from 'react'
  2: import { Button } from 'antd'
  3: import { HistoryOutlined, ToolOutlined } from '@ant-design/icons'
  4: import { useRouter } from 'next/router'
  5: import { HistoryPanel } from '@/components/HistoryPanel'
  6: import { useHistoryStore } from '@/stores/historyStore'
  7: import { LanguageSwitcher } from '@/components/LanguageSwitcher'
  8: import { useTranslation } from 'react-i18next'
  9: 
 10: export default function Header() {
 11:   const router = useRouter()
 12:   const { taskId, executionId } = router.query
 13:   const { t } = useTranslation('header')
 14: 
 15:   // Check if in scheduled task detail mode
 16:   const isTaskDetailMode = !!taskId && !!executionId
 17: 
 18:   // Using Zustand store, as simple as Pinia!
 19:   const { showHistoryPanel, setShowHistoryPanel, selectHistoryTask } = useHistoryStore()
 20: 
 21:   const goback = async () => {
 22:     router.push('/home')
 23:   }
 24: 
 25:   const onSelectTask = (task: any) => {
 26:     // Use store to select history task
 27:     selectHistoryTask(task);
 28: 
 29:     // If not on main page, navigate to it
 30:     if (router.pathname !== '/main') {
 31:       router.push('/main');
 32:     }
 33:   }
 34: 
 35:   return (
 36:     <div className=' flex justify-between items-center h-12 w-full px-7 bg-header text-text-01-dark' style={{
 37:             WebkitAppRegion: 'drag'
 38:           } as React.CSSProperties}>
 39:       {/* Don't show back button in scheduled task mode */}
 40:       {!isTaskDetailMode && (
 41:         <div
 42:           style={{
 43:             WebkitAppRegion: 'no-drag'
 44:           } as React.CSSProperties}
 45:           onClick={() => goback()}
 46:           className='cursor-pointer ml-8 flex items-center'
 47:         >
 48:           <span className='text-3xl font-bold  tracking-normal hover:scale-105 transition-all duration-300 drop-shadow-2xl relative font-["Berkshire_Swash",_cursive]'>
 49:             DeepFundAI
 50:             <span className='absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-cyan-500/20 blur-sm -z-10'></span>
 51:           </span>
 52:         </div>
 53:       )}
 54:       {isTaskDetailMode && (
 55:         <div className='flex items-center gap-2 ml-8 px-3 py-1 bg-blue-500/20 rounded-md border border-blue-500/50'>
 56:           <span className='text-blue-400 text-xs font-medium'>{t('scheduled_task')}</span>
 57:           {taskId && (
 58:             <span className='text-blue-300 text-xs opacity-70'>#{String(taskId).slice(-6)}</span>
 59:           )}
 60:         </div>
 61:       )}
 62:       <div className='flex justify-center items-center gap-4'>
 63:         {/* Toolbox button - only show in home page */}
 64:         {!isTaskDetailMode && (router.pathname === '/home' || router.pathname === '/') && (
 65:           <Button
 66:             type="text"
 67:             icon={<ToolOutlined />}
 68:             size="small"
 69:             onClick={() => router.push('/toolbox')}
 70:             className='!text-text-01-dark hover:!bg-blue-500/10'
 71:             style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
 72:           >
 73:             {t('toolbox')}
 74:           </Button>
 75:         )}
 76:         <Button
 77:           type="text"
 78:           icon={<HistoryOutlined />}
 79:           size="small"
 80:           onClick={() => setShowHistoryPanel(true)}
 81:           className='!text-text-01-dark'
 82:           style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
 83:         >
 84:           {isTaskDetailMode ? t('execution_history') : t('history')}
 85:         </Button>
 86: 
 87:         {/* Language Switcher */}
 88:         <div style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
 89:           <LanguageSwitcher />
 90:         </div>
 91:       </div>
 92: 
 93:       {/* Global history task panel - passing scheduled task info */}
 94:       <HistoryPanel
 95:         visible={showHistoryPanel}
 96:         onClose={() => setShowHistoryPanel(false)}
 97:         onSelectTask={onSelectTask}
 98:         currentTaskId=""
 99:         isTaskDetailMode={isTaskDetailMode}
100:         scheduledTaskId={taskId as string}
101:       />
102:     </div>
103:   )
104: }
````

## File: src/components/HistoryPanel.tsx
````typescript
  1: import React, { useState, useEffect } from 'react';
  2: import { Button, Input, List, Modal, Drawer, Tooltip, Space, Tag, Popconfirm, App } from 'antd';
  3: import { SearchOutlined, DeleteOutlined, EyeOutlined, ClearOutlined, ClockCircleOutlined } from '@ant-design/icons';
  4: import { Task, TaskStatus, TaskType } from '@/models';
  5: import { taskStorage } from '@/lib/taskStorage';
  6: import { useTranslation } from 'react-i18next';
  7: 
  8: const { Search } = Input;
  9: 
 10: /**
 11:  * History panel display item (unified for normal tasks and scheduled tasks)
 12:  */
 13: interface HistoryItem {
 14:   id: string; // task.id for normal tasks, scheduledTaskId for scheduled tasks
 15:   name: string;
 16:   taskType: TaskType;
 17:   status?: TaskStatus;
 18:   createdAt: Date;
 19:   updatedAt: Date;
 20:   scheduledTaskId?: string; // Scheduled task configuration ID
 21:   latestExecution?: Task; // Latest execution record for scheduled tasks
 22:   executionCount?: number; // Execution count for scheduled tasks
 23:   originalTask?: Task; // Original data for normal tasks
 24: }
 25: 
 26: interface HistoryPanelProps {
 27:   visible: boolean;
 28:   onClose: () => void;
 29:   onSelectTask: (task: Task) => void;
 30:   currentTaskId?: string;
 31:   isTaskDetailMode?: boolean;
 32:   scheduledTaskId?: string;
 33: }
 34: 
 35: export const HistoryPanel: React.FC<HistoryPanelProps> = ({
 36:   visible,
 37:   onClose,
 38:   onSelectTask,
 39:   currentTaskId,
 40:   isTaskDetailMode = false,
 41:   scheduledTaskId
 42: }) => {
 43:   const { t } = useTranslation('history');
 44:   const { message } = App.useApp();
 45:   const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
 46:   const [loading, setLoading] = useState(false);
 47:   const [searchKeyword, setSearchKeyword] = useState('');
 48:   const [filteredItems, setFilteredItems] = useState<HistoryItem[]>([]);
 49:   const [stats, setStats] = useState({
 50:     total: 0,
 51:     completed: 0,
 52:     running: 0,
 53:     error: 0
 54:   });
 55: 
 56:   /**
 57:    * Load and process historical data
 58:    * If in scheduled task detail mode, only show execution history for that scheduled task
 59:    * Otherwise, merge normal tasks and scheduled task execution history
 60:    */
 61:   const loadTasks = async () => {
 62:     setLoading(true);
 63:     try {
 64:       if (isTaskDetailMode && scheduledTaskId) {
 65:         // Scheduled task detail mode: only show all execution history for this scheduled task
 66:         const executions = await taskStorage.getExecutionsByScheduledTaskId(scheduledTaskId);
 67: 
 68:         const items: HistoryItem[] = executions.map(task => ({
 69:           id: task.id,
 70:           name: task.name,
 71:           taskType: 'scheduled',
 72:           status: task.status,
 73:           createdAt: task.createdAt,
 74:           updatedAt: task.updatedAt,
 75:           scheduledTaskId: task.scheduledTaskId,
 76:           originalTask: task,
 77:         }));
 78: 
 79:         setHistoryItems(items);
 80:         setFilteredItems(items);
 81: 
 82:         // Statistics
 83:         setStats({
 84:           total: items.length,
 85:           completed: items.filter(item => item.status === 'done').length,
 86:           running: items.filter(item => item.status === 'running').length,
 87:           error: items.filter(item => item.status === 'error' || item.status === 'abort').length
 88:         });
 89:       } else {
 90:         // Main history panel mode: merge normal tasks and scheduled tasks
 91:         const allTasks = await taskStorage.getAllTasks();
 92: 
 93:         // Separate normal tasks and scheduled task execution history
 94:         const normalTasks = allTasks.filter(t => t.taskType === 'normal');
 95:         const scheduledExecutions = allTasks.filter(t => t.taskType === 'scheduled');
 96: 
 97:         // Group scheduled task execution history by scheduledTaskId
 98:         const scheduledGroups = new Map<string, Task[]>();
 99:         scheduledExecutions.forEach(task => {
100:           if (task.scheduledTaskId) {
101:             if (!scheduledGroups.has(task.scheduledTaskId)) {
102:               scheduledGroups.set(task.scheduledTaskId, []);
103:             }
104:             scheduledGroups.get(task.scheduledTaskId)!.push(task);
105:           }
106:         });
107: 
108:         // Build history item list
109:         const items: HistoryItem[] = [];
110: 
111:         // Add normal tasks
112:         normalTasks.forEach(task => {
113:           items.push({
114:             id: task.id,
115:             name: task.name,
116:             taskType: 'normal',
117:             status: task.status,
118:             createdAt: task.createdAt,
119:             updatedAt: task.updatedAt,
120:             originalTask: task,
121:           });
122:         });
123: 
124:         // Add scheduled tasks (each scheduled task only shows the latest execution)
125:         scheduledGroups.forEach((executions, scheduledTaskId) => {
126:           // Sort by updatedAt, take the latest one
127:           const sortedExecutions = executions.sort((a, b) =>
128:             b.updatedAt.getTime() - a.updatedAt.getTime()
129:           );
130:           const latestExecution = sortedExecutions[0];
131: 
132:           items.push({
133:             id: scheduledTaskId, // Use scheduledTaskId as unique identifier
134:             name: latestExecution.name,
135:             taskType: 'scheduled',
136:             status: latestExecution.status,
137:             createdAt: latestExecution.createdAt,
138:             updatedAt: latestExecution.updatedAt,
139:             scheduledTaskId,
140:             latestExecution,
141:             executionCount: executions.length,
142:           });
143:         });
144: 
145:         // Sort by updatedAt in descending order (newest first)
146:         items.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
147: 
148:         setHistoryItems(items);
149:         setFilteredItems(items);
150: 
151:         // Statistics
152:         setStats({
153:           total: items.length,
154:           completed: items.filter(item => item.status === 'done').length,
155:           running: items.filter(item => item.status === 'running').length,
156:           error: items.filter(item => item.status === 'error' || item.status === 'abort').length
157:         });
158:       }
159:     } catch (error) {
160:       console.error('Failed to load history tasks:', error);
161:       message.error(t('load_failed'));
162:     } finally {
163:       setLoading(false);
164:     }
165:   };
166: 
167:   // Search history items
168:   const handleSearch = (value: string) => {
169:     setSearchKeyword(value);
170:     if (!value.trim()) {
171:       setFilteredItems(historyItems);
172:       return;
173:     }
174: 
175:     const keyword = value.trim().toLowerCase();
176:     const filtered = historyItems.filter(item =>
177:       item.name.toLowerCase().includes(keyword) ||
178:       item.id.toLowerCase().includes(keyword)
179:     );
180:     setFilteredItems(filtered);
181:   };
182: 
183:   // Delete single history item
184:   const handleDeleteTask = async (item: HistoryItem) => {
185:     console.log('Attempting to delete:', item);
186:     try {
187:       if (item.taskType === 'scheduled' && !isTaskDetailMode) {
188:         // Scheduled task in main panel: delete all execution history for this scheduled task
189:         const executions = await taskStorage.getExecutionsByScheduledTaskId(item.scheduledTaskId!);
190:         await Promise.all(executions.map(task => taskStorage.deleteTask(task.id)));
191:         message.success(t('deleted_executions', { count: executions.length }));
192:       } else {
193:         // Normal task or single execution history in scheduled task detail mode
194:         await taskStorage.deleteTask(item.id);
195:         message.success(t('task_deleted'));
196:       }
197:       await loadTasks();
198:     } catch (error) {
199:       console.error('Delete failed:', error);
200:       message.error(t('delete_failed'));
201:     }
202:   };
203: 
204:   // Clear all history
205:   const handleClearAll = async () => {
206:     console.log('Attempting to clear all history');
207:     try {
208:       if (isTaskDetailMode && scheduledTaskId) {
209:         // Scheduled task detail mode: clear all execution history for this task
210:         const executions = await taskStorage.getExecutionsByScheduledTaskId(scheduledTaskId);
211:         await Promise.all(executions.map(task => taskStorage.deleteTask(task.id)));
212:         message.success(t('history_cleared'));
213:       } else {
214:         // Main panel mode: clear all tasks
215:         await taskStorage.clearAllTasks();
216:         message.success(t('tasks_cleared'));
217:       }
218:       await loadTasks();
219:     } catch (error) {
220:       console.error('Clear failed:', error);
221:       message.error(t('clear_failed'));
222:     }
223:   };
224: 
225:   /**
226:    * Handle history item click
227:    * - Normal task: display directly
228:    * - Scheduled task (main panel): open scheduled task window
229:    * - Scheduled task (detail mode): show specific execution record
230:    */
231:   const handleSelectItem = async (item: HistoryItem) => {
232:     console.log('Selecting history item:', item);
233: 
234:     if (item.taskType === 'scheduled' && !isTaskDetailMode) {
235:       // Scheduled task in main panel: call main process to open scheduled task window
236:       try {
237:         if (typeof window !== 'undefined' && (window as any).api) {
238:           await (window as any).api.invoke('open-task-history', item.scheduledTaskId);
239:           message.success(t('opening_task_window'));
240:           onClose(); // Close history panel
241:         }
242:       } catch (error) {
243:         console.error('Failed to open scheduled task window:', error);
244:         message.error(t('open_window_failed'));
245:       }
246:     } else {
247:       // Normal task or scheduled task detail mode: display directly
248:       const task = item.originalTask || item.latestExecution;
249:       if (task) {
250:         onSelectTask(task);
251:         message.info(t('switched_to_history'));
252:       }
253:     }
254:   };
255: 
256:   // Format time
257:   const formatTime = (date: Date) => {
258:     const now = new Date();
259:     const diff = now.getTime() - date.getTime();
260:     const minutes = Math.floor(diff / (1000 * 60));
261:     const hours = Math.floor(diff / (1000 * 60 * 60));
262:     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
263: 
264:     if (minutes < 1) return t('just_now');
265:     if (minutes < 60) return t('minutes_ago', { minutes });
266:     if (hours < 24) return t('hours_ago', { hours });
267:     if (days < 7) return t('days_ago', { days });
268: 
269:     return date.toLocaleDateString('zh-CN', {
270:       year: 'numeric',
271:       month: 'short',
272:       day: 'numeric'
273:     });
274:   };
275: 
276:   // Get status tag
277:   const getStatusTag = (status?: TaskStatus) => {
278:     switch (status) {
279:       case 'done':
280:         return <Tag color="green">{t('status_completed')}</Tag>;
281:       case 'running':
282:         return <Tag color="blue">{t('status_running')}</Tag>;
283:       case 'error':
284:         return <Tag color="red">{t('status_error')}</Tag>;
285:       case 'abort':
286:         return  <Tag color="red">{t('status_aborted')}</Tag>;
287:       default:
288:         return <Tag color="default">{t('status_unknown')}</Tag>;
289:     }
290:   };
291: 
292:   // Load tasks when component mounts
293:   useEffect(() => {
294:     if (visible) {
295:       loadTasks();
296:     }
297:   }, [visible]);
298: 
299:   return (
300:     <Drawer
301:       title={isTaskDetailMode ? t('execution_history') : t('history')}
302:       placement="left"
303:       size="large"
304:       open={visible}
305:       onClose={onClose}
306:       width={480}
307:       className="history-panel-drawer"
308:       styles={{
309:         wrapper: {
310:           marginTop: '48px', // header height
311:           height: 'calc(100vh - 48px)' // subtract header height
312:         },
313:         body: {
314:           padding: '16px',
315:           height: '100%',
316:           // Fellou.ai inspired elegant gradient background
317:           background: 'linear-gradient(180deg, #1e1c23 0%, #281c39 100%)',
318:           backdropFilter: 'blur(16px)',
319:         }
320:       }}
321:       extra={
322:         <Space>
323:           <Popconfirm
324:             title={t('confirm_clear')}
325:             description={isTaskDetailMode ? t('confirm_clear_execution_history') : t('confirm_clear_message')}
326:             okText={t('confirm')}
327:             cancelText={t('cancel')}
328:             okType="danger"
329:             onConfirm={handleClearAll}
330:             overlayInnerStyle={{
331:               backgroundColor: 'rgba(30, 28, 35, 0.98)',
332:               backdropFilter: 'blur(20px)',
333:               border: '1px solid rgba(94, 49, 216, 0.3)'
334:             }}
335:           >
336:             <Button danger icon={<ClearOutlined />}>
337:               {t('clear_history')}
338:             </Button>
339:           </Popconfirm>
340:         </Space>
341:       }
342:     >
343:       <div className="space-y-4 flex flex-col h-full">
344:         {/* Search box */}
345:         <Search
346:           placeholder={t('search_placeholder')}
347:           allowClear
348:           enterButton={<SearchOutlined />}
349:           onSearch={handleSearch}
350:           onChange={(e) => !e.target.value && handleSearch('')}
351:         />
352: 
353:         {/* Unified history item list */}
354:         <List
355:           loading={loading}
356:           dataSource={filteredItems}
357:           rowKey="id"
358:           size="small"
359:           className="overflow-y-auto flex-1"
360:           locale={{ emptyText: isTaskDetailMode ? t('no_execution_history') : t('no_history_tasks') }}
361:           renderItem={(item) => (
362:             <List.Item
363:               key={item.id}
364:               className={`cursor-pointer transition-colors ${
365:                 currentTaskId === item.id ? 'opacity-80' : 'hover:opacity-70'
366:               }`}
367:               style={{
368:                 backgroundColor: currentTaskId === item.id ? 'rgba(59, 130, 246, 0.1)' : undefined,
369:                 borderLeft: currentTaskId === item.id ? '3px solid #3B82F6' : undefined
370:               }}
371:               onClick={() => handleSelectItem(item)}
372:               actions={[
373:                 item.taskType === 'normal' && (
374:                   <Tooltip key="view" title={t('view_details')}>
375:                     <Button
376:                       type="text"
377:                       icon={<EyeOutlined />}
378:                       size="small"
379:                       onClick={(e) => {
380:                         e.stopPropagation();
381:                         handleSelectItem(item);
382:                       }}
383:                     />
384:                   </Tooltip>
385:                 ),
386:                 <Popconfirm
387:                   key="delete"
388:                   title={t('confirm')}
389:                   description={
390:                     item.taskType === 'scheduled' && !isTaskDetailMode
391:                       ? t('confirm_delete_scheduled_executions', { count: item.executionCount || 0 })
392:                       : t('confirm_delete_task')
393:                   }
394:                   okText={t('confirm')}
395:                   cancelText={t('cancel')}
396:                   okType="danger"
397:                   onConfirm={(e) => {
398:                     e?.stopPropagation();
399:                     handleDeleteTask(item);
400:                   }}
401:                   overlayInnerStyle={{
402:                     backgroundColor: 'rgba(30, 28, 35, 0.98)',
403:                     backdropFilter: 'blur(20px)',
404:                     border: '1px solid rgba(94, 49, 216, 0.3)'
405:                   }}
406:                 >
407:                   <Tooltip title={item.taskType === 'scheduled' && !isTaskDetailMode ? t('delete_all_executions') : t('delete_task')}>
408:                     <Button
409:                       type="text"
410:                       danger
411:                       icon={<DeleteOutlined />}
412:                       size="small"
413:                       onClick={(e) => e.stopPropagation()}
414:                     />
415:                   </Tooltip>
416:                 </Popconfirm>
417:               ].filter(Boolean)}
418:             >
419:               <List.Item.Meta
420:                 title={
421:                   <div className="flex items-center justify-between">
422:                     <div className="flex items-center gap-2 flex-1 mr-2">
423:                       {item.taskType === 'scheduled' && (
424:                         <ClockCircleOutlined className="text-blue-500" />
425:                       )}
426:                       <span className="text-sm font-medium truncate">
427:                         {item.name}
428:                       </span>
429:                     </div>
430:                     {getStatusTag(item.status)}
431:                   </div>
432:                 }
433:                 description={
434:                   <div className="text-xs opacity-70">
435:                     <div className="flex items-center justify-between">
436:                       <span>{t('id_short')}: {item.id.slice(0, 16)}...</span>
437:                       {item.taskType === 'scheduled' && item.executionCount && !isTaskDetailMode && (
438:                         <Tag color="blue">
439:                           {t('executions_count', { count: item.executionCount })}
440:                         </Tag>
441:                       )}
442:                     </div>
443:                     <div className="flex items-center justify-between mt-1">
444:                       <span>{t('created')}: {formatTime(item.createdAt)}</span>
445:                       <span>{t('updated')}: {formatTime(item.updatedAt)}</span>
446:                     </div>
447:                     {item.originalTask?.messages && item.originalTask.messages.length > 0 && (
448:                       <div className="mt-1 opacity-90">
449:                         {t('messages_count', { count: item.originalTask.messages.length })}
450:                       </div>
451:                     )}
452:                     {item.latestExecution?.messages && item.latestExecution.messages.length > 0 && (
453:                       <div className="mt-1 opacity-90">
454:                         {t('messages_count', { count: item.latestExecution.messages.length })}
455:                       </div>
456:                     )}
457:                   </div>
458:                 }
459:               />
460:             </List.Item>
461:           )}
462:         />
463: 
464:         {/* Information message */}
465:         {!isTaskDetailMode && (
466:           <div className="text-center text-sm p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 149, 0, 0.1)' }}>
467:             <div className="font-medium mb-1" style={{ color: '#FF9500' }}>
468:               📋 {t('readonly_mode_title')}
469:             </div>
470:             <div className="opacity-80">
471:               {t('readonly_mode_description')}
472:             </div>
473:           </div>
474:         )}
475:       </div>
476:     </Drawer>
477:   );
478: };
479: 
480: export default HistoryPanel;
````

## File: src/components/LanguageSwitcher.tsx
````typescript
 1: import React from 'react';
 2: import { Select } from 'antd';
 3: import { useLanguage } from '@/hooks/useLanguage';
 4: import { GlobalOutlined } from '@ant-design/icons';
 5: 
 6: const languages = [
 7:   { value: 'zh-CN', label: '简体中文' },
 8:   { value: 'en-US', label: 'English' },
 9: ];
10: 
11: export const LanguageSwitcher: React.FC = () => {
12:   const { language, changeLanguage } = useLanguage();
13: 
14:   return (
15:     <Select
16:       value={language}
17:       onChange={changeLanguage}
18:       style={{ width: 100 }}
19:       suffixIcon={<GlobalOutlined />}
20:       options={languages}
21:       size="small"
22:       className='!text-text-01-dark'
23:       popupClassName='language-switcher-dropdown'
24:     />
25:   );
26: };
````

## File: src/components/ModelConfigBar.tsx
````typescript
  1: import React, { useState, useEffect } from 'react';
  2: import { Select, Button, Input, App } from 'antd';
  3: import { EditOutlined, CheckOutlined, CloseOutlined, LinkOutlined } from '@ant-design/icons';
  4: import type { UserModelConfigs } from '@/type';
  5: import { useTranslation } from 'react-i18next';
  6: 
  7: const { Option } = Select;
  8: 
  9: // Provider options
 10: const PROVIDERS = [
 11:   { value: 'deepseek', label: 'Deepseek', getKeyUrl: 'https://platform.deepseek.com/api_keys' },
 12:   { value: 'qwen', label: 'Qwen (Alibaba)', getKeyUrl: 'https://bailian.console.aliyun.com/' },
 13:   { value: 'google', label: 'Google Gemini', getKeyUrl: 'https://aistudio.google.com/app/apikey' },
 14:   { value: 'anthropic', label: 'Anthropic', getKeyUrl: 'https://console.anthropic.com/settings/keys' },
 15:   { value: 'openrouter', label: 'OpenRouter', getKeyUrl: 'https://openrouter.ai/keys' },
 16: ];
 17: 
 18: // Model options for each provider
 19: const MODELS: Record<string, string[]> = {
 20:   deepseek: [
 21:     'deepseek-chat',
 22:     'deepseek-reasoner',
 23:   ],
 24:   google: [
 25:     'gemini-1.5-flash-latest',
 26:     'gemini-2.0-flash-thinking-exp-01-21',
 27:     'gemini-2.0-flash-exp',
 28:     'gemini-1.5-flash-002',
 29:     'gemini-1.5-flash-8b',
 30:     'gemini-1.5-pro-latest',
 31:     'gemini-1.5-pro-002',
 32:     'gemini-exp-1206',
 33:   ],
 34:   openrouter: [
 35:     'anthropic/claude-3.5-sonnet',
 36:     'anthropic/claude-3-haiku',
 37:     'deepseek/deepseek-coder',
 38:     'google/gemini-flash-1.5',
 39:     'google/gemini-pro-1.5',
 40:     'x-ai/grok-beta',
 41:     'mistralai/mistral-nemo',
 42:     'qwen/qwen-110b-chat',
 43:     'cohere/command',
 44:   ],
 45:   anthropic: [
 46:     'claude-3-7-sonnet-20250219',
 47:     'claude-3-5-sonnet-latest',
 48:     'claude-3-5-sonnet-20240620',
 49:     'claude-3-5-haiku-latest',
 50:     'claude-3-opus-latest',
 51:     'claude-3-sonnet-20240229',
 52:     'claude-3-haiku-20240307',
 53:   ],
 54:   qwen: [
 55:     'qwen-max',
 56:     'qwen-plus',
 57:     'qwen-vl-max',
 58:   ],
 59: };
 60: 
 61: type ProviderType = 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter';
 62: 
 63: export const ModelConfigBar: React.FC = () => {
 64:   const { t } = useTranslation('modelConfig');
 65:   const message = App.useApp().message;
 66: 
 67:   const [selectedProvider, setSelectedProvider] = useState<ProviderType>('deepseek');
 68:   const [selectedModel, setSelectedModel] = useState<string>('deepseek-chat');
 69:   const [apiKeySource, setApiKeySource] = useState<'user' | 'env' | 'none'>('none');
 70:   const [configs, setConfigs] = useState<UserModelConfigs>({});
 71:   const [isEditingApiKey, setIsEditingApiKey] = useState(false);
 72:   const [tempApiKey, setTempApiKey] = useState('');
 73: 
 74:   // Load initial configurations
 75:   useEffect(() => {
 76:     loadConfigs();
 77:   }, []);
 78: 
 79:   // Update model when provider changes
 80:   useEffect(() => {
 81:     const models = MODELS[selectedProvider];
 82:     if (models && models.length > 0) {
 83:       const currentModel = configs[selectedProvider]?.model || models[0];
 84:       setSelectedModel(currentModel);
 85:     }
 86:   }, [selectedProvider, configs]);
 87: 
 88:   const loadConfigs = async () => {
 89:     try {
 90:       const userConfigs = await window.api.getUserModelConfigs();
 91:       const provider = await window.api.getSelectedProvider();
 92:       const source = await window.api.getApiKeySource(provider);
 93: 
 94:       setConfigs(userConfigs);
 95:       setSelectedProvider(provider);
 96:       setApiKeySource(source);
 97:     } catch (error) {
 98:       console.error('Failed to load model configs:', error);
 99:     }
100:   };
101: 
102:   const handleProviderChange = async (value: ProviderType) => {
103:     try {
104:       setSelectedProvider(value);
105:       await window.api.setSelectedProvider(value);
106:       const source = await window.api.getApiKeySource(value);
107:       setApiKeySource(source);
108:     } catch (error) {
109:       console.error('Failed to change provider:', error);
110:       message.error(t('provider_change_failed'));
111:     }
112:   };
113: 
114:   const handleModelChange = async (value: string) => {
115:     try {
116:       setSelectedModel(value);
117:       const updatedConfigs = {
118:         ...configs,
119:         [selectedProvider]: {
120:           ...configs[selectedProvider],
121:           model: value,
122:         },
123:       };
124:       await window.api.saveUserModelConfigs(updatedConfigs);
125:       setConfigs(updatedConfigs);
126:       message.success(t('model_updated'));
127:     } catch (error) {
128:       console.error('Failed to update model:', error);
129:       message.error(t('model_update_failed'));
130:     }
131:   };
132: 
133:   const handleEditApiKey = () => {
134:     setIsEditingApiKey(true);
135:     setTempApiKey(configs[selectedProvider]?.apiKey || '');
136:   };
137: 
138:   const handleCancelEdit = () => {
139:     setIsEditingApiKey(false);
140:     setTempApiKey('');
141:   };
142: 
143:   const handleSaveApiKey = async () => {
144:     // Validate API Key is not empty
145:     if (!tempApiKey || tempApiKey.trim() === '') {
146:       message.warning(t('api_key_empty_warning'));
147:       return;
148:     }
149: 
150:     try {
151:       const updatedConfigs = {
152:         ...configs,
153:         [selectedProvider]: {
154:           ...configs[selectedProvider],
155:           apiKey: tempApiKey.trim(),
156:         },
157:       };
158:       await window.api.saveUserModelConfigs(updatedConfigs);
159:       setConfigs(updatedConfigs);
160:       setIsEditingApiKey(false);
161:       setApiKeySource('user');
162:       message.success(t('api_key_saved'));
163:     } catch (error) {
164:       console.error('Failed to save API key:', error);
165:       message.error(t('api_key_save_failed'));
166:     }
167:   };
168: 
169:   const currentProvider = PROVIDERS.find(p => p.value === selectedProvider);
170: 
171:   return (
172:     <div className="w-full px-4 pt-3 pb-3" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
173:       {/* Provider and Model Selection */}
174:       <div className="flex gap-3 mb-3">
175:         <Select
176:           value={selectedProvider}
177:           onChange={handleProviderChange}
178:           className="flex-1 custom-select"
179:           size="middle"
180:           style={{ minWidth: '160px' }}
181:           dropdownStyle={{
182:             background: 'rgba(8, 12, 16, 0.96)',
183:             backdropFilter: 'blur(20px)',
184:             border: '1px solid rgba(145, 75, 241, 0.3)',
185:             borderRadius: '12px',
186:             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(145, 75, 241, 0.2)',
187:           }}
188:         >
189:           {PROVIDERS.map(p => (
190:             <Option key={p.value} value={p.value}>{p.label}</Option>
191:           ))}
192:         </Select>
193: 
194:         <Select
195:           value={selectedModel}
196:           onChange={handleModelChange}
197:           className="flex-1 custom-select"
198:           size="middle"
199:           style={{ minWidth: '200px' }}
200:           dropdownStyle={{
201:             background: 'rgba(8, 12, 16, 0.96)',
202:             backdropFilter: 'blur(20px)',
203:             border: '1px solid rgba(145, 75, 241, 0.3)',
204:             borderRadius: '12px',
205:             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(145, 75, 241, 0.2)',
206:           }}
207:         >
208:           {MODELS[selectedProvider]?.map(model => (
209:             <Option key={model} value={model}>{model}</Option>
210:           ))}
211:         </Select>
212:       </div>
213: 
214:       {/* API Key Section */}
215:       <div className="flex items-center justify-between text-sm">
216:         <div className="flex items-center gap-2 flex-1">
217:           <span className="text-gray-400 whitespace-nowrap">
218:             {selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)} API Key:
219:           </span>
220: 
221:           {apiKeySource === 'env' && !isEditingApiKey && (
222:             <span className="flex items-center gap-1 text-green-400">
223:               <CheckOutlined />
224:               {t('api_key_env')}
225:             </span>
226:           )}
227: 
228:           {apiKeySource === 'user' && !isEditingApiKey && (
229:             <span className="flex items-center gap-1 text-blue-400">
230:               <CheckOutlined />
231:               {t('api_key_user')}
232:             </span>
233:           )}
234: 
235:           {apiKeySource === 'none' && !isEditingApiKey && (
236:             <span className="text-yellow-400">{t('api_key_not_configured')}</span>
237:           )}
238: 
239:           {isEditingApiKey && (
240:             <Input
241:               type="password"
242:               value={tempApiKey}
243:               onChange={(e) => setTempApiKey(e.target.value)}
244:               placeholder={t('api_key_placeholder')}
245:               className="flex-1 max-w-sm"
246:               size="small"
247:               onPressEnter={handleSaveApiKey}
248:             />
249:           )}
250:         </div>
251: 
252:         <div className="flex items-center gap-2">
253:           {!isEditingApiKey ? (
254:             <>
255:               <Button
256:                 icon={<EditOutlined />}
257:                 onClick={handleEditApiKey}
258:                 size="small"
259:                 type="text"
260:                 className="text-gray-300 hover:text-white"
261:               >
262:                 {t('edit_api_key')}
263:               </Button>
264:               <a
265:                 href={currentProvider?.getKeyUrl}
266:                 target="_blank"
267:                 rel="noopener noreferrer"
268:                 className="flex items-center gap-1 text-blue-400 hover:text-blue-300 whitespace-nowrap"
269:               >
270:                 <LinkOutlined />
271:                 {t('get_api_key')}
272:               </a>
273:             </>
274:           ) : (
275:             <>
276:               <CheckOutlined
277:                 onClick={handleSaveApiKey}
278:                 className="!text-green-400 hover:!text-green-300 cursor-pointer text-xs"
279:               />
280:               <CloseOutlined
281:                 onClick={handleCancelEdit}
282:                 className="!text-red-400 hover:!text-red-300 cursor-pointer text-xs"
283:               />
284:             </>
285:           )}
286:         </div>
287:       </div>
288:     </div>
289:   );
290: };
````

## File: src/components/ToolboxPanel.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Drawer, Card, Typography, Space, Modal } from 'antd';
  3: import {
  4:   SettingOutlined,
  5:   ClockCircleOutlined,
  6:   ToolOutlined,
  7:   RobotOutlined,
  8:   ThunderboltOutlined
  9: } from '@ant-design/icons';
 10: import AgentConfigModal from './AgentConfigModal';
 11: import { useScheduledTaskStore } from '@/stores/scheduled-task-store';
 12: 
 13: const { Title, Text, Paragraph } = Typography;
 14: 
 15: interface ToolItem {
 16:   id: string;
 17:   title: string;
 18:   description: string;
 19:   icon: React.ReactNode;
 20:   color: string;
 21:   onClick: () => void;
 22: }
 23: 
 24: interface ToolboxPanelProps {
 25:   visible: boolean;
 26:   onClose: () => void;
 27: }
 28: 
 29: /**
 30:  * Toolbox Panel Component
 31:  * Central hub for all system configuration and management features
 32:  */
 33: export default function ToolboxPanel({ visible, onClose }: ToolboxPanelProps) {
 34:   const [agentConfigVisible, setAgentConfigVisible] = useState(false);
 35:   const { setShowListPanel } = useScheduledTaskStore();
 36: 
 37:   const tools: ToolItem[] = [
 38:     {
 39:       id: 'agent-config',
 40:       title: 'Agent Configuration',
 41:       description: 'Configure AI agents and MCP tools for task execution',
 42:       icon: <RobotOutlined style={{ fontSize: '32px' }} />,
 43:       color: '#1890ff',
 44:       onClick: () => {
 45:         setAgentConfigVisible(true);
 46:         onClose();
 47:       }
 48:     },
 49:     {
 50:       id: 'scheduled-tasks',
 51:       title: 'Scheduled Tasks',
 52:       description: 'Create and manage automated recurring tasks',
 53:       icon: <ClockCircleOutlined style={{ fontSize: '32px' }} />,
 54:       color: '#52c41a',
 55:       onClick: () => {
 56:         setShowListPanel(true);
 57:         onClose();
 58:       }
 59:     },
 60:     {
 61:       id: 'system-settings',
 62:       title: 'System Settings',
 63:       description: 'Configure application preferences and behavior',
 64:       icon: <SettingOutlined style={{ fontSize: '32px' }} />,
 65:       color: '#722ed1',
 66:       onClick: () => {
 67:         Modal.info({
 68:           title: 'Coming Soon',
 69:           content: 'System settings feature is under development.',
 70:         });
 71:       }
 72:     },
 73:     {
 74:       id: 'tools-marketplace',
 75:       title: 'Tools Marketplace',
 76:       description: 'Browse and install additional MCP tools and plugins',
 77:       icon: <ToolOutlined style={{ fontSize: '32px' }} />,
 78:       color: '#fa8c16',
 79:       onClick: () => {
 80:         Modal.info({
 81:           title: 'Coming Soon',
 82:           content: 'Tools marketplace is under development.',
 83:         });
 84:       }
 85:     },
 86:     {
 87:       id: 'workflow-templates',
 88:       title: 'Workflow Templates',
 89:       description: 'Pre-built automation workflows for common tasks',
 90:       icon: <ThunderboltOutlined style={{ fontSize: '32px' }} />,
 91:       color: '#eb2f96',
 92:       onClick: () => {
 93:         Modal.info({
 94:           title: 'Coming Soon',
 95:           content: 'Workflow templates feature is under development.',
 96:         });
 97:       }
 98:     }
 99:   ];
100: 
101:   return (
102:     <>
103:       <Drawer
104:         title={
105:           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
106:             <ToolOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
107:             <span>Toolbox</span>
108:           </div>
109:         }
110:         placement="right"
111:         width={480}
112:         onClose={onClose}
113:         open={visible}
114:         styles={{
115:           body: { padding: '24px' }
116:         }}
117:       >
118:         <div style={{ marginBottom: '16px' }}>
119:           <Paragraph type="secondary">
120:             Access all system features and configuration options from here. Click on any card to open the corresponding tool.
121:           </Paragraph>
122:         </div>
123: 
124:         <Space direction="vertical" size="large" style={{ width: '100%' }}>
125:           {tools.map((tool) => (
126:             <Card
127:               key={tool.id}
128:               hoverable
129:               onClick={tool.onClick}
130:               style={{
131:                 cursor: 'pointer',
132:                 border: `1px solid ${tool.color}20`,
133:                 transition: 'all 0.3s ease',
134:               }}
135:               styles={{
136:                 body: { padding: '20px' }
137:               }}
138:               className="toolbox-card"
139:             >
140:               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
141:                 <div
142:                   style={{
143:                     color: tool.color,
144:                     backgroundColor: `${tool.color}10`,
145:                     padding: '12px',
146:                     borderRadius: '8px',
147:                     display: 'flex',
148:                     alignItems: 'center',
149:                     justifyContent: 'center',
150:                   }}
151:                 >
152:                   {tool.icon}
153:                 </div>
154:                 <div style={{ flex: 1 }}>
155:                   <Title level={5} style={{ margin: '0 0 8px 0', color: tool.color }}>
156:                     {tool.title}
157:                   </Title>
158:                   <Text type="secondary" style={{ fontSize: '14px' }}>
159:                     {tool.description}
160:                   </Text>
161:                 </div>
162:               </div>
163:             </Card>
164:           ))}
165:         </Space>
166: 
167:         <style jsx>{`
168:           .toolbox-card:hover {
169:             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
170:             transform: translateY(-2px);
171:           }
172:         `}</style>
173:       </Drawer>
174: 
175:       {/* Agent Configuration Modal */}
176:       <AgentConfigModal
177:         visible={agentConfigVisible}
178:         onClose={() => setAgentConfigVisible(false)}
179:       />
180:     </>
181:   );
182: }
````

## File: src/config/themeConfig.ts
````typescript
  1: // theme/themeConfig.ts - Fellou.ai inspired glass morphism theme
  2: import type { ThemeConfig } from 'antd';
  3: import { theme as antdDarkTheme } from 'antd';
  4: 
  5: // Create Ant Design theme configuration with glass morphism style
  6: const theme: ThemeConfig = {
  7:   algorithm: antdDarkTheme.darkAlgorithm, // Use dark algorithm
  8:   token: {
  9:     // Base colors - purple accent theme (Fellou.ai Eko style)
 10:     colorPrimary: '#5e31d8',      // Purple primary color (Fellou.ai)
 11:     colorPrimaryHover: '#914bf1',  // Lighter purple on hover
 12:     colorSuccess: '#10B981',       // Green success color
 13:     colorWarning: '#F59E0B',       // Amber warning color
 14:     colorError: '#EF4444',         // Red error color
 15:     colorInfo: '#914bf1',          // Purple info color
 16: 
 17:     // Text colors - high contrast white (Fellou.ai style)
 18:     colorText: '#ffffff',                             // Primary text - pure white
 19:     colorTextSecondary: '#d9d9d9',                    // Secondary text - light gray
 20:     colorTextTertiary: 'rgba(255, 255, 255, 0.5)',    // Tertiary text
 21:     colorTextQuaternary: 'rgba(255, 255, 255, 0.6)',  // Message text
 22: 
 23:     // Background colors - glass morphism (Fellou.ai #ffffff0f style)
 24:     colorBgContainer: 'rgba(255, 255, 255, 0.06)',     // Container background (~10% opacity)
 25:     colorBgElevated: 'rgba(255, 255, 255, 0.06)',      // Elevated background
 26:     colorBgLayout: 'rgba(255, 255, 255, 0.04)',        // Layout background
 27:     colorBgSpotlight: 'rgba(255, 255, 255, 0.08)',     // Spotlight background
 28: 
 29:     // Border colors - subtle borders (Fellou.ai rgba(255,255,255,.17))
 30:     colorBorder: 'rgba(255, 255, 255, 0.17)', // Border color - 17% opacity
 31:     colorBorderSecondary: 'rgba(255, 255, 255, 0.1)', // Secondary border
 32: 
 33:     // Others - Fellou.ai inspired
 34:     borderRadius: 12,              // Base border radius
 35:     borderRadiusLG: 20,            // Large components (cards, modals)
 36:     borderRadiusXS: 8,             // Small components (buttons)
 37:     fontSize: 14,
 38:     fontSizeHeading1: 48,          // Large headings
 39:     fontSizeHeading2: 32,          // Medium headings
 40:     fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
 41: 
 42:     // Shadows - deeper shadows for glass effect
 43:     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
 44:     boxShadowSecondary: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
 45:   },
 46:   components: {
 47:     // Drawer component - Fellou.ai inspired glass morphism
 48:     Drawer: {
 49:       colorBgElevated: '#1e1c23',                          // Fellou.ai gradient start color
 50:       colorText: '#ffffff',                                // Pure white text
 51:       colorIcon: '#d9d9d9',                                // Light gray icons
 52:       colorIconHover: '#914bf1',                           // Purple hover (Fellou.ai)
 53:       colorBorder: 'rgba(255, 255, 255, 0.17)',            // Fellou.ai border style
 54:       paddingLG: 24,                                       // Larger padding like Fellou.ai
 55:       borderRadiusLG: 20,                                  // Rounded corners
 56:     },
 57: 
 58:     // Button - Fellou.ai style
 59:     Button: {
 60:       colorPrimary: '#5e31d8',                             // Purple primary (Fellou.ai)
 61:       colorPrimaryHover: '#914bf1',                        // Lighter purple on hover
 62:       borderRadius: 8,                                     // 8px border radius
 63:       paddingContentHorizontal: 16,                        // 16px horizontal padding
 64:       paddingContentVertical: 8,                           // 8px vertical padding
 65:       fontWeight: 500,                                     // Medium weight
 66:     },
 67: 
 68:     // Card - Fellou.ai glass morphism
 69:     Card: {
 70:       colorBgContainer: 'rgba(255, 255, 255, 0.06)',       // Semi-transparent background
 71:       colorBorder: 'rgba(255, 255, 255, 0.17)',            // Subtle border
 72:       borderRadiusLG: 24,                                  // Large rounded corners (20-24px)
 73:       paddingLG: 32,                                       // Generous padding
 74:     },
 75: 
 76:     // List component
 77:     List: {
 78:       colorBgContainer: 'transparent',                     // Transparent background
 79:       colorText: '#ffffff',                                // Pure white text
 80:       colorTextSecondary: '#d9d9d9',                       // Light gray secondary
 81:       paddingLG: 16,
 82:     },
 83: 
 84:     // Input - Fellou.ai style
 85:     Input: {
 86:       colorBgContainer: 'rgba(255, 255, 255, 0.06)',       // Glass background
 87:       colorText: '#ffffff',                                // White text
 88:       colorTextPlaceholder: 'rgba(255, 255, 255, 0.5)',    // 50% opacity placeholder
 89:       colorBorder: 'rgba(255, 255, 255, 0.17)',            // Fellou.ai border
 90:       activeBg: 'rgba(255, 255, 255, 0.08)',               // Active background
 91:       hoverBg: 'rgba(255, 255, 255, 0.06)',                // Hover background
 92:       activeShadow: '0 0 0 2px rgba(145, 75, 241, 0.2)',   // Focus shadow with light purple
 93:       borderRadius: 12,                                    // 12px border radius
 94:       paddingBlock: 8,                                     // Vertical padding (reduced for better alignment)
 95:       paddingInline: 12,                                   // Horizontal padding
 96:       controlHeight: 40,                                   // Fixed height for alignment
 97:     },
 98: 
 99:     // Tag component
100:     Tag: {
101:       borderRadiusSM: 6,
102:       colorBgContainer: 'rgba(255, 255, 255, 0.06)',
103:     },
104: 
105:     // Tooltip component
106:     Tooltip: {
107:       colorBgSpotlight: 'rgba(255, 255, 255, 0.08)',
108:       colorTextLightSolid: '#ffffff',
109:       borderRadius: 8,
110:     },
111: 
112:     // Popconfirm component
113:     Popconfirm: {
114:       colorBgElevated: 'rgba(255, 255, 255, 0.08)',        // Glass background
115:       colorText: '#ffffff',                                // White text
116:       colorWarning: '#F59E0B',                             // Amber warning
117:       borderRadius: 10,
118:     },
119: 
120:     // Message component
121:     Message: {
122:       colorSuccess: '#10B981',
123:       colorError: '#EF4444',
124:       colorWarning: '#F59E0B',
125:       colorInfo: '#5e31d8',                              // Purple info (Fellou.ai)
126:       colorBgElevated: 'rgba(255, 255, 255, 0.08)',
127:       borderRadius: 10,
128:     },
129: 
130:     // Modal - Fellou.ai inspired
131:     Modal: {
132:       contentBg: '#1e1c23',                              // Fellou.ai gradient start
133:       headerBg: '#1e1c23',                               // Consistent header
134:       footerBg: '#1e1c23',                               // Consistent footer
135:       colorText: '#ffffff',                              // Pure white text
136:       colorBorder: 'rgba(255, 255, 255, 0.17)',          // Fellou.ai border
137:       borderRadiusLG: 20,                                // Large rounded corners
138:       paddingContentHorizontal: 32,                      // Generous padding
139:       paddingContentVertical: 24,
140:     },
141: 
142:     // Select component
143:     Select: {
144:       colorBgContainer: 'rgba(255, 255, 255, 0.06)',       // Select background
145:       colorBgElevated: 'rgba(8, 12, 16, 0.96)',            // Dropdown background
146:       colorText: '#ffffff',                                 // Text color
147:       colorBorder: 'rgba(255, 255, 255, 0.17)',            // Border color
148:       colorPrimaryBorder: 'rgba(145, 75, 241, 0.4)',       // Light purple border on focus
149:       activeBorderColor: 'rgba(145, 75, 241, 0.4)',        // Active border
150:       hoverBorderColor: 'rgba(145, 75, 241, 0.3)',         // Hover border
151:       borderRadius: 12,
152:       optionSelectedBg: 'rgba(94, 49, 216, 0.2)',          // Selected option background
153:       optionActiveBg: 'rgba(94, 49, 216, 0.1)',            // Active option background
154:     },
155: 
156:     // Switch component
157:     Switch: {
158:       colorPrimary: '#5e31d8',                           // Purple primary (Fellou.ai)
159:       colorPrimaryHover: '#914bf1',                      // Lighter purple on hover
160:     }
161:   }
162: };
163: 
164: export default theme;
````

## File: src/hooks/useLanguage.ts
````typescript
 1: import { useEffect } from 'react';
 2: import { useTranslation } from 'react-i18next';
 3: import { useLanguageStore } from '@/stores/languageStore';
 4: import zhCN from 'antd/locale/zh_CN';
 5: import enUS from 'antd/locale/en_US';
 6: 
 7: const antdLocales = {
 8:   'zh-CN': zhCN,
 9:   'en-US': enUS,
10: };
11: 
12: export const useLanguage = () => {
13:   const { i18n } = useTranslation();
14:   const { language, setLanguage } = useLanguageStore();
15: 
16:   // Sync i18n with store on mount
17:   useEffect(() => {
18:     if (i18n.language !== language) {
19:       i18n.changeLanguage(language);
20:     }
21:   }, [i18n, language]);
22: 
23:   const changeLanguage = async (lang: string) => {
24:     // Update both i18n and store
25:     await i18n.changeLanguage(lang);
26:     setLanguage(lang);
27: 
28:     // Notify Electron main process (if needed for menu, etc.)
29:     if (typeof window !== 'undefined' && (window as any).api) {
30:       try {
31:         await (window as any).api.invoke('language-changed', lang);
32:       } catch (error) {
33:         console.error('[useLanguage] Failed to notify main process:', error);
34:       }
35:     }
36:   };
37: 
38:   return {
39:     language,
40:     changeLanguage,
41:     antdLocale: antdLocales[language as keyof typeof antdLocales] || enUS,
42:     t: i18n.t,
43:   };
44: };
````

## File: src/hooks/useTaskManager.ts
````typescript
  1: import { useState, useCallback } from 'react';
  2: import { Task, DisplayMessage } from '@/models';
  3: import { taskStorage } from '@/lib/taskStorage';
  4: 
  5: interface UseTaskManagerReturn {
  6:   tasks: Task[];
  7:   currentTask: Task | undefined;
  8:   messages: DisplayMessage[];
  9:   currentTaskId: string;
 10:   isHistoryMode: boolean;
 11: 
 12:   // Task operations
 13:   setCurrentTaskId: (taskId: string) => void;
 14:   updateTask: (taskId: string, updates: Partial<Task>) => void;
 15:   createTask: (taskId: string, initialData: Partial<Task>) => void;
 16:   updateMessages: (taskId: string, messages: DisplayMessage[]) => void;
 17:   addToolHistory: (taskId: string, toolData: any) => void;
 18:   replaceTaskId: (oldTaskId: string, newTaskId: string) => void;
 19: 
 20:   // History mode
 21:   enterHistoryMode: (task: Task) => void;
 22:   exitHistoryMode: () => void;
 23: 
 24:   // Reset
 25:   reset: () => void;
 26: }
 27: 
 28: export const useTaskManager = (): UseTaskManagerReturn => {
 29:   const [tasks, setTasks] = useState<Task[]>([]);
 30:   const [currentTaskId, setCurrentTaskId] = useState<string>('');
 31:   const [isHistoryMode, setIsHistoryMode] = useState<boolean>(false);
 32: 
 33:   // Computed properties
 34:   const currentTask = tasks.find(task => task.id === currentTaskId);
 35:   const messages = currentTask?.messages || [];
 36: 
 37:   // Automatically save tasks to IndexedDB
 38:   const saveTask = useCallback(async (task: Task) => {
 39:     try {
 40:       await taskStorage.saveTask(task);
 41:     } catch (error) {
 42:       console.error('Failed to save task:', error);
 43:     }
 44:   }, []);
 45: 
 46:   // Update task
 47:   const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
 48:     if (!taskId || isHistoryMode) return;
 49: 
 50:     setTasks(prevTasks => {
 51:       const existingTaskIndex = prevTasks.findIndex(task => task.id === taskId);
 52:       if (existingTaskIndex >= 0) {
 53:         const updatedTasks = [...prevTasks];
 54:         const updatedTask = {
 55:           ...updatedTasks[existingTaskIndex],
 56:           ...updates,
 57:           updatedAt: new Date()
 58:         };
 59:         updatedTasks[existingTaskIndex] = updatedTask;
 60: 
 61:         // Asynchronous save
 62:         saveTask(updatedTask);
 63: 
 64:         return updatedTasks;
 65:       }
 66:       return prevTasks;
 67:     });
 68:   }, [isHistoryMode, saveTask]);
 69: 
 70:   // Create new task
 71:   const createTask = useCallback((taskId: string, initialData: Partial<Task>) => {
 72:     if (isHistoryMode) return;
 73: 
 74:     const newTask: Task = {
 75:       id: taskId,
 76:       name: `Task ${taskId.slice(0, 8)}`,
 77:       messages: [],
 78:       taskType: 'normal', // Default to normal task
 79:       createdAt: new Date(),
 80:       updatedAt: new Date(),
 81:       ...initialData
 82:     };
 83: 
 84:     setTasks(prevTasks => {
 85:       // Check if already exists
 86:       const exists = prevTasks.some(task => task.id === taskId);
 87:       if (exists) return prevTasks;
 88: 
 89:       // Asynchronous save
 90:       saveTask(newTask);
 91: 
 92:       return [...prevTasks, newTask];
 93:     });
 94:   }, [isHistoryMode, saveTask]);
 95: 
 96:   // Update messages
 97:   const updateMessages = useCallback((taskId: string, messages: DisplayMessage[]) => {
 98:     updateTask(taskId, { messages });
 99:   }, [updateTask]);
100: 
101:   // Add tool history
102:   const addToolHistory = useCallback((taskId: string, toolData: any) => {
103:     setTasks(prevTasks => {
104:       const existingTaskIndex = prevTasks.findIndex(task => task.id === taskId);
105:       if (existingTaskIndex >= 0) {
106:         const updatedTasks = [...prevTasks];
107:         const currentToolHistory = updatedTasks[existingTaskIndex].toolHistory || [];
108:         const updatedTask = {
109:           ...updatedTasks[existingTaskIndex],
110:           toolHistory: [...currentToolHistory, toolData],
111:           updatedAt: new Date()
112:         };
113:         updatedTasks[existingTaskIndex] = updatedTask;
114: 
115:         // Asynchronous save
116:         saveTask(updatedTask);
117: 
118:         return updatedTasks;
119:       }
120:       return prevTasks;
121:     });
122:   }, [saveTask]);
123: 
124:   // Replace task ID (for temporary task -> real task transition)
125:   const replaceTaskId = useCallback((oldTaskId: string, newTaskId: string) => {
126:     if (isHistoryMode) return;
127: 
128:     setTasks(prevTasks => {
129:       const existingTaskIndex = prevTasks.findIndex(task => task.id === oldTaskId);
130:       if (existingTaskIndex >= 0) {
131:         const updatedTasks = [...prevTasks];
132:         // Create new task object with new ID, keep all other data
133:         const newTask = {
134:           ...updatedTasks[existingTaskIndex],
135:           id: newTaskId,
136:           updatedAt: new Date()
137:         };
138: 
139:         // Replace old task with new task
140:         updatedTasks[existingTaskIndex] = newTask;
141: 
142:         // Save new task to IndexedDB
143:         saveTask(newTask);
144: 
145:         // Delete old temporary task from IndexedDB
146:         taskStorage.deleteTask(oldTaskId).catch(error => {
147:           console.error('Failed to delete temporary task:', error);
148:         });
149: 
150:         return updatedTasks;
151:       }
152:       return prevTasks;
153:     });
154: 
155:     // Update currentTaskId if it matches the old ID
156:     if (currentTaskId === oldTaskId) {
157:       setCurrentTaskId(newTaskId);
158:     }
159:   }, [isHistoryMode, saveTask, currentTaskId]);
160: 
161:   // Enter history mode
162:   const enterHistoryMode = useCallback((task: Task) => {
163:     setIsHistoryMode(true);
164:     setCurrentTaskId(task.id);
165:     setTasks([task]);
166:   }, []);
167: 
168:   // Exit history mode
169:   const exitHistoryMode = useCallback(() => {
170:     setIsHistoryMode(false);
171:     setCurrentTaskId('');
172:     setTasks([]);
173:   }, []);
174: 
175:   // Reset all state
176:   const reset = useCallback(() => {
177:     setTasks([]);
178:     setCurrentTaskId('');
179:     setIsHistoryMode(false);
180:   }, []);
181: 
182:   return {
183:     tasks,
184:     currentTask,
185:     messages,
186:     currentTaskId,
187:     isHistoryMode,
188: 
189:     setCurrentTaskId,
190:     updateTask,
191:     createTask,
192:     updateMessages,
193:     addToolHistory,
194:     replaceTaskId,
195: 
196:     enterHistoryMode,
197:     exitHistoryMode,
198: 
199:     reset
200:   };
201: };
````

## File: src/icons/deepfundai-icons.tsx
````typescript
  1: import React from 'react';
  2: import Icon from '@ant-design/icons';
  3: import type { GetProps } from 'antd';
  4: 
  5: type CustomIconComponentProps = GetProps<typeof Icon>;
  6: 
  7: // Deep thinking icon
  8: const DeepThinkingSvg = () => (
  9:   <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
 10:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
 11:         <g id="generate-page" transform="translate(-85.000000, -382.000000)">
 12:             <g id="group-16" transform="translate(40.000000, 68.000000)">
 13:                 <g id="group-9" transform="translate(36.000000, 314.000000)">
 14:                     <g id="AI-48px" transform="translate(9.000000, 0.000000)">
 15:                         <rect id="rectangle" fill="#D8D8D8" opacity="0" x="0" y="0" width="20" height="20"/>
 16:                         <path d="M8.94946984,3.14169235 C9.33933388,4.84819529 9.99091756,6.95957789 10.9645308,7.93965282 C11.9601973,8.94192728 13.6492698,9.66305449 14.9403574,10.1030344 C15.3235598,10.2336132 15.3096021,10.9489797 14.9222123,11.0661851 C13.6335356,11.4560947 11.9555405,12.1178146 10.9645308,13.1154013 C9.99238946,14.0939818 9.34130065,16.2556902 8.95123359,18.0107051 C8.85751395,18.4324707 8.04895687,18.4442219 7.94421064,18.0252663 C7.50482213,16.2675691 6.79773755,14.0966641 5.82291884,13.1154013 C4.82895269,12.1148384 3.20123066,11.4521479 1.96138053,11.0627108 C1.57883033,10.9425549 1.56461758,10.2412003 1.94267721,10.1074156 C3.18481133,9.66784437 4.8239406,8.94524827 5.82291884,7.93965282 C6.79934903,6.95674227 7.50716956,4.83595873 7.94638043,3.12687563 C8.05339795,2.71044916 8.85369462,2.72250691 8.94946984,3.14169235 Z M15.7370885,1.85793597 C15.9209495,2.56371254 16.1960431,3.33119309 16.5796262,3.71733469 C16.9776745,4.11810142 17.6166836,4.42125662 18.1672516,4.62677474 C18.3947621,4.71172819 18.3861337,5.15794138 18.1560854,5.23562697 C17.6080552,5.42060606 16.9750099,5.70253248 16.5796262,6.10059132 C16.1970582,6.48569831 15.9224721,7.26871086 15.7386111,7.99268646 C15.6747863,8.24388095 15.1635537,8.25125099 15.0936383,8.00171699 C14.8901096,7.27523789 14.5962365,6.48730771 14.212019,6.10059132 C13.8146051,5.70053988 13.1972051,5.41779599 12.6677133,5.23285523 C12.440558,5.15352191 12.4318027,4.71683741 12.656268,4.63009573 C13.1882849,4.42451374 13.8118136,4.12026006 14.212019,3.71733469 C14.5972516,3.32950705 14.8917592,2.55698115 15.0954148,1.84866019 C15.1667259,1.60075475 15.6721217,1.60829978 15.7370885,1.85793597 Z" id="shape-combined" fill="#60A5FA" fill-rule="nonzero"/>
 17:                     </g>
 18:                 </g>
 19:             </g>
 20:         </g>
 21:     </g>
 22: </svg>
 23: );
 24: 
 25: // Executing icon
 26: const ExecutingSvg = () => (
 27:   <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
 28:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
 29:         <g id="06.in-progress" transform="translate(-82.000000, -1511.000000)">
 30:             <g id="group-35backup" transform="translate(73.000000, 1503.000000)">
 31:                 <g id="group-8" transform="translate(9.000000, 8.000000)">
 32:                     <rect id="rectangle" x="0" y="0" width="20" height="20"/>
 33:                     <g id="group" transform="translate(1.300000, 2.800000)" fill="#FFFFFF" fill-rule="nonzero">
 34:                         <path d="M15.9,-3.62376795e-13 C16.7284271,-3.62376795e-13 17.4,0.671572875 17.4,1.5 L17.4,1.5 L17.4,12.9 C17.4,13.7284271 16.7284271,14.4 15.9,14.4 L15.9,14.4 L1.5,14.4 C0.671572875,14.4 1.45661261e-12,13.7284271 1.45661261e-12,12.9 L1.45661261e-12,12.9 L1.45661261e-12,1.5 C1.45661261e-12,0.671572875 0.671572875,-3.62376795e-13 1.5,-3.62376795e-13 L1.5,-3.62376795e-13 Z M15.9,1.4 L1.5,1.4 C1.44477153,1.4 1.4,1.44477153 1.4,1.5 L1.4,1.5 L1.4,12.9 C1.4,12.9552285 1.44477153,13 1.5,13 L1.5,13 L15.9,13 C15.9552285,13 16,12.9552285 16,12.9 L16,12.9 L16,1.5 C16,1.44477153 15.9552285,1.4 15.9,1.4 L15.9,1.4 Z M13.5,9.75 C13.8865993,9.75 14.2,10.0634007 14.2,10.45 C14.2,10.8043827 13.9366564,11.0972582 13.5949859,11.1436098 L13.5,11.15 L8.3,11.15 C7.91340068,11.15 7.6,10.8365993 7.6,10.45 C7.6,10.0956173 7.86334362,9.80274177 8.20501415,9.75639017 L8.3,9.75 L13.5,9.75 Z M4.26796171,4.16688793 L4.3596168,4.23452993 L7.1596168,6.67202993 C7.45341849,6.92779479 7.47790196,7.36748932 7.23306722,7.65390912 L7.1596168,7.72797007 L4.3596168,10.1654701 C4.06802698,10.4193094 3.62586928,10.3887066 3.37202993,10.0971168 C3.14357451,9.83468597 3.14551724,9.45029514 3.36075932,9.1909924 L3.4403832,9.10952993 L5.634,7.2 L3.4403832,5.29047007 C3.17795236,5.06201465 3.12692101,4.68102137 3.30438793,4.39453829 L3.37202993,4.3028832 C3.60048535,4.04045236 3.98147863,3.98942101 4.26796171,4.16688793 Z" id="shape-combined"/>
 35:                     </g>
 36:                 </g>
 37:             </g>
 38:         </g>
 39:     </g>
 40: </svg>
 41: );
 42: 
 43: // Browser icon
 44: const BrowserSvg = () => (
 45:   <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
 46:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
 47:         <g id="02.create-task-steps" transform="translate(-1151.000000, -242.000000)">
 48:             <g id="group-3backup-3" transform="translate(970.000000, 120.000000)">
 49:                 <g id="group-11" transform="translate(28.000000, 104.000000)">
 50:                     <g id="group-35" transform="translate(149.000000, 14.000000)">
 51:                         <g id="group-7" transform="translate(4.000000, 4.000000)">
 52:                             <rect id="rectangle" x="0" y="0" width="16" height="16"/>
 53:                             <g id="group" transform="translate(2.400000, 2.400000)" stroke="#828FA1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
 54:                                 <path d="M5.6,3.08 C6.991768,3.08 8.12,4.208232 8.12,5.6 C8.12,6.991768 6.991768,8.12 5.6,8.12 C4.208232,8.12 3.08,6.991768 3.08,5.6 C3.08,4.208232 4.208232,3.08 5.6,3.08 Z M5.6,3.08 L10.602312,3.08 M3.64,10.847424 L7.180292,7.56 M0.56,3.156076 L3.605028,7.15456 M5.6,11.2 C8.692796,11.2 11.2,8.692796 11.2,5.6 C11.2,2.507204 8.692796,0 5.6,0 C2.507204,0 0,2.507204 0,5.6 C0,8.692796 2.507204,11.2 5.6,11.2 Z" id="shape"/>
 55:                             </g>
 56:                         </g>
 57:                     </g>
 58:                 </g>
 59:             </g>
 60:         </g>
 61:     </g>
 62: </svg>
 63: );
 64: 
 65: // Voice icon
 66: const VoiceSvg = () => (
 67:   <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
 68:     <g id="8-26version" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.4">
 69:         <g id="04.generate-page" transform="translate(-673.000000, -996.000000)">
 70:             <g id="group-39" transform="translate(40.000000, 920.000000)">
 71:                 <g id="group-81backup" transform="translate(0.000000, -0.000000)">
 72:                     <g id="group-8" transform="translate(589.000000, 74.000000)">
 73:                         <g id="group-50backup-5" transform="translate(42.000000, 0.000000)">
 74:                             <g id="group-15" transform="translate(2.000000, 2.000000)">
 75:                                 <rect id="rectangle" x="0" y="0" width="24" height="24"/>
 76:                                 <g id="group" transform="translate(5.000000, 2.375000)" fill="#B9C8EC" fill-rule="nonzero">
 77:                                     <path d="M13.182243,8.43208332 C13.6338777,8.43208332 14,8.80123316 14,9.25660256 C13.9888607,12.8688803 11.2917247,15.8421727 7.81764626,16.2546373 L7.817,17.6 L10.7398754,17.6009615 C11.1915101,17.6009615 11.5576324,17.9701114 11.5576324,18.4254808 C11.5576324,18.8808502 11.1915101,19.25 10.7398754,19.25 L3.2601246,19.25 C2.80848988,19.25 2.44236759,18.8808502 2.44236759,18.4254808 C2.44236759,17.9701114 2.80848988,17.6009615 3.2601246,17.6009615 L6.182,17.6 L6.18235374,16.2546373 C2.70827534,15.8421727 0.0111392956,12.8688803 0,9.25660256 C0,8.80123316 0.366122284,8.43208332 0.817757009,8.43208332 C1.26939173,8.43208332 1.63551402,8.80123316 1.63551402,9.25660256 C1.63551402,12.2040231 3.973699,14.6008154 6.88187447,14.6641633 C6.92066106,14.6573515 6.95999506,14.6544551 7,14.6544551 C7.04000494,14.6544551 7.07933894,14.6573515 7.11780699,14.6629476 L7,14.6654487 C9.9627238,14.6654487 12.364486,12.2438258 12.364486,9.25660256 C12.364486,8.80123316 12.7306083,8.43208332 13.182243,8.43208332 Z M7,8.81072992e-13 C9.1256941,8.81072992e-13 10.8489096,1.73746521 10.8489096,3.88073717 L10.8489096,9.31157052 C10.8489096,11.4548425 9.1256941,13.1923077 7,13.1923077 C4.8743059,13.1923077 3.15109035,11.4548425 3.15109035,9.31157052 L3.15109035,3.88073717 C3.15109035,1.73746521 4.8743059,8.81072992e-13 7,8.81072992e-13 Z M7,1.649 C5.79564074,1.64903846 4.81931465,2.63343801 4.81931465,3.8477564 L4.81931465,9.27858975 C4.81931465,10.5111229 5.81028565,11.5102884 7.03271028,11.5102884 C8.25513491,11.5102884 9.24610587,10.5111229 9.24610591,9.27858975 L9.24610591,3.88073717 C9.25531004,3.2802896 9.02053322,2.70217401 8.59630684,2.28066875 C8.2145031,1.90131401 7.70914996,1.67852656 7.1779062,1.65094826 L7,1.649 Z" id="shape-combined"/>
 78:                                 </g>
 79:                             </g>
 80:                         </g>
 81:                     </g>
 82:                 </g>
 83:             </g>
 84:         </g>
 85:     </g>
 86: </svg>
 87: );
 88: 
 89: // Data analysis icon
 90: const DataAnalysisSvg = () => (
 91:   <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
 92:     <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
 93:       <g transform="translate(2.150000, 2.150000)" fill="#828FA1" fillRule="nonzero">
 94:         <path d="M11.1,7 C11.3982338,7 11.6456468,7.21758961 11.692147,7.50267688 L11.7,7.6 L11.7,10.225 C11.7,10.9917137 11.1150385,11.621776 10.3670544,11.693248 L10.225,11.7 L1.475,11.7 C0.708296699,11.7 0.0782252172,11.1150354 0.0067521131,10.3670539 L7.28306304e-13,10.225 L7.28306304e-13,7.6 C7.28306304e-13,7.26862915 0.26862915,7 0.6,7 C0.898233765,7 1.14564675,7.21758961 1.19214701,7.50267688 L1.2,7.6 L1.2,10.225 C1.2,10.3551872 1.29045283,10.4642372 1.41194334,10.4927374 L1.475,10.5 L10.225,10.5 C10.3551928,10.5 10.4642388,10.409553 10.4927378,10.2880592 L10.5,10.225 L10.5,7.6 C10.5,7.26862915 10.7686292,7 11.1,7 Z M8.18333333,5.25 C8.4815671,5.25 8.72898009,5.46758961 8.77548035,5.75267688 L8.78333333,5.85 L8.78333333,7.89166667 C8.78333333,8.22303752 8.51470418,8.49166667 8.18333333,8.49166667 C7.88509957,8.49166667 7.63768658,8.27407706 7.59118632,7.98898978 L7.58333333,7.89166667 L7.58333333,5.85 C7.58333333,5.51862915 7.85196248,5.25 8.18333333,5.25 Z M5.85,2.625 C6.14823376,2.625 6.39564675,2.84258961 6.44214701,3.12767688 L6.45,3.225 L6.45,7.89166667 C6.45,8.22303752 6.18137085,8.49166667 5.85,8.49166667 C5.55176624,8.49166667 5.30435325,8.27407706 5.25785299,7.98898978 L5.25,7.89166667 L5.25,3.225 C5.25,2.89362915 5.51862915,2.625 5.85,2.625 Z M3.51666667,3.79166667 C3.81490043,3.79166667 4.06231342,4.00925628 4.10881368,4.29434355 L4.11666667,4.39166667 L4.11666667,7.89166667 C4.11666667,8.22303752 3.84803752,8.49166667 3.51666667,8.49166667 C3.2184329,8.49166667 2.97101991,8.27407706 2.92451965,7.98898978 L2.91666667,7.89166667 L2.91666667,4.39166667 C2.91666667,4.06029582 3.18529582,3.79166667 3.51666667,3.79166667 Z M10.225,7.28306304e-13 C10.9917105,7.28306304e-13 11.6217756,0.584971288 11.693248,1.3329473 L11.7,1.475 L11.7,4.1 C11.7,4.43137085 11.4313708,4.7 11.1,4.7 C10.8017662,4.7 10.5543532,4.48241039 10.507853,4.19732312 L10.5,4.1 L10.5,1.475 C10.5,1.34481401 10.4095482,1.23576319 10.2880571,1.20726267 L10.225,1.2 L1.475,1.2 C1.34481966,1.2 1.2357648,1.29045767 1.20726301,1.41194541 L1.2,1.475 L1.2,4.1 C1.2,4.43137085 0.93137085,4.7 0.6,4.7 C0.301766235,4.7 0.054353247,4.48241039 0.00785298705,4.19732312 L7.28306304e-13,4.1 L7.28306304e-13,1.475 C7.28306304e-13,0.708299984 0.58497438,0.0782256037 1.33294785,0.0067521472 L1.475,7.28306304e-13 L10.225,7.28306304e-13 Z" />
 95:       </g>
 96:     </g>
 97:   </svg>
 98: );
 99: 
100: // Search icon
101: const SearchSvg = () => (
102:   <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
103:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
104:         <g id="06.in-progress" transform="translate(-83.000000, -1855.000000)">
105:             <g id="group-35backup-5" transform="translate(73.000000, 1847.000000)">
106:                 <g id="group-16" transform="translate(10.000000, 8.000000)">
107:                     <rect id="rectangle" x="0" y="0" width="20" height="20"/>
108:                     <g id="group" transform="translate(3.300000, 2.633333)" fill="#FFFFFF" fill-rule="nonzero">
109:                         <path d="M6.36666667,2.45137244e-13 C9.88286599,2.45137244e-13 12.7333333,2.85046734 12.7333333,6.36666667 C12.7333333,7.87288563 12.2102808,9.25694469 11.3359043,10.3471152 L13.7639414,12.7740253 C14.0373084,13.0473923 14.0373084,13.4906077 13.7639414,13.7639747 C13.5179111,14.0100051 13.1343035,14.0346081 12.8607578,13.8377838 L12.7739919,13.7639747 L10.3461153,11.3367062 C9.25609842,12.2106006 7.87242515,12.7333333 6.36666667,12.7333333 C2.85046734,12.7333333 2.45137244e-13,9.88286599 2.45137244e-13,6.36666667 C2.45137244e-13,2.85046734 2.85046734,2.45137244e-13 6.36666667,2.45137244e-13 Z M6.36666667,1.4 C3.62366599,1.4 1.4,3.62366599 1.4,6.36666667 C1.4,9.10966734 3.62366599,11.3333333 6.36666667,11.3333333 C9.10966734,11.3333333 11.3333333,9.10966734 11.3333333,6.36666667 C11.3333333,3.62366599 9.10966734,1.4 6.36666667,1.4 Z" id="shape-combined"/>
110:                     </g>
111:                 </g>
112:             </g>
113:         </g>
114:     </g>
115: </svg>
116: );
117: 
118: // Deep mode icon
119: const DeepModeSvg = () => (
120:   <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
121:     <g id="8-26version" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.4">
122:         <g id="04.generate-page" transform="translate(-72.000000, -999.000000)">
123:             <g id="group-39" transform="translate(40.000000, 920.000000)">
124:                 <g id="group-81backup" transform="translate(0.000000, -0.000000)">
125:                     <g id="group-50backup-6" transform="translate(20.000000, 72.000000)">
126:                         <g id="group-31" transform="translate(12.000000, 7.000000)">
127:                             <rect id="rectangle" x="0" y="0" width="18" height="18"/>
128:                             <g id="group" transform="translate(0.888501, 0.165000)" fill="#FFFFFF" fill-rule="nonzero">
129:                                 <path d="M7.90704578,0 C9.20601782,0 10.3116577,1.01048038 11.0019437,2.97020261 C13.251473,2.45922597 14.8298547,2.87325743 15.5004134,4.04435115 C16.1738937,5.22054719 15.7696662,6.77836642 14.2238838,8.4715477 C15.7453084,10.1581033 16.1623955,11.7195432 15.5003759,12.8757238 C14.8197311,14.0644324 13.2565566,14.4886171 10.9968859,13.9657423 C10.3056982,15.9149576 9.20251783,16.92 7.90704578,16.92 C6.63099947,16.92 5.52987647,15.8992669 4.83444948,13.9616792 C2.56521872,14.4906847 0.996041154,14.067335 0.313731259,12.8757184 C-0.348273052,11.7195357 0.0688216601,10.1580973 1.59109127,8.47169434 C0.0444626544,6.77837974 -0.359771021,5.22056139 0.313697509,4.04435659 L0.313697509,4.04435659 L0.385322935,3.92740018 C1.0942273,2.84349123 2.64680317,2.47478812 4.8279836,2.97315654 C5.52371956,1.0264523 6.62743167,0 7.90704578,0 Z M7.90730844,12.8458164 L7.76134579,12.9140373 C7.11982162,13.2118813 6.51168246,13.4552616 5.93923042,13.6464364 C6.45095918,15.0560264 7.1754743,15.75 7.90704578,15.75 C8.65712357,15.75 9.38440809,15.0699418 9.89287086,13.6526526 C9.27209358,13.4460135 8.60927676,13.1781167 7.90730844,12.8458164 Z M2.40646256,9.28125427 L2.39455208,9.29403458 C1.25491361,10.5595453 0.946080279,11.6254647 1.32906968,12.2943512 C1.72589137,12.9873783 2.80516807,13.2573774 4.50803377,12.8612678 C4.34867861,12.2040313 4.22714786,11.4692891 4.14935617,10.6605643 C3.48836795,10.197017 2.90765181,9.73580202 2.40646256,9.28125427 Z M13.4079766,9.2811788 L13.2407875,9.43026618 C12.7801266,9.83531293 12.2566054,10.2452366 11.6694117,10.6569042 C11.5928104,11.4702811 11.474168,12.2063493 11.3178365,12.8643497 C13.0139234,13.2561326 14.089132,12.9857836 14.4850406,12.2943512 C14.8693356,11.6232012 14.5571139,10.552326 13.4079766,9.2811788 Z M10.4011854,11.4867288 L10.1509248,11.6386037 L10.1509248,11.6386037 L9.8377929,11.823481 C9.6338767,11.942193 9.43253718,12.0561892 9.23382944,12.1655237 C9.57512719,12.3101204 9.90053005,12.4350264 10.2104734,12.5418734 C10.283144,12.2161176 10.3473029,11.8644286 10.4011854,11.4867288 Z M5.42092048,11.4918415 L5.42814794,11.5371545 C5.48189664,11.8934831 5.54504426,12.2268874 5.61643501,12.5374888 C5.92252574,12.4316127 6.24388064,12.308081 6.58006247,12.1660086 C6.38162984,12.0561895 6.18029042,11.9421933 5.97637424,11.8234813 C5.78659839,11.7130016 5.60145235,11.6024348 5.42092048,11.4918415 Z M7.90769063,5.37602277 C7.66375055,5.49946636 7.41388196,5.63134643 7.15820156,5.77192444 L7.15820156,5.77192444 L6.56505785,6.10772956 C6.36391735,6.22482462 6.16884394,6.34161143 5.97976529,6.45798723 L5.97976529,6.45798723 L5.43044129,6.80577883 C5.37508895,6.84185036 5.32031475,6.87787174 5.26611648,6.91383983 C5.23586274,7.39742426 5.21930828,7.91303965 5.21930828,8.46 C5.21930828,9.00770968 5.23590807,9.52398839 5.26728811,10.0090274 C5.66658136,10.2728728 6.0993774,10.5412671 6.5650179,10.812344 C6.86429514,10.9865715 7.15580914,11.1494989 7.43946885,11.3015025 L7.43946885,11.3015025 L7.90722503,11.5458062 C8.33545991,11.3277991 8.78288211,11.0837861 9.2491472,10.8123449 C9.71504268,10.541117 10.1480575,10.2725746 10.5492288,10.0077321 C10.5789757,9.5248809 10.5948208,9.0086399 10.5948208,8.46 C10.5948208,7.91248436 10.5790406,7.39723497 10.5491124,6.91377581 L10.3836887,6.80577905 L9.83436431,6.45798734 C9.6452855,6.34161151 9.45021191,6.22482467 9.24907121,6.10772956 L9.24907121,6.10772956 L8.65592738,5.77192441 C8.36436804,5.61161949 8.08036601,5.46262491 7.80409435,5.32455296 Z M11.7575702,7.77937756 L11.7624933,8.10243128 L11.7624933,8.10243128 L11.7648208,8.46 C11.7648208,8.69500765 11.7618522,8.92530123 11.7559983,9.15085778 C12.0579274,8.91875169 12.3341024,8.69111394 12.5858217,8.46818623 C12.3342756,8.24267154 12.0584065,8.01278705 11.7575702,7.77937756 Z M4.05824353,7.77793038 L3.89112844,7.90936883 C3.65390465,8.09818306 3.4331275,8.28454819 3.22844138,8.46795901 C3.34879801,8.57488359 3.47466596,8.68247993 3.60620187,8.79106917 L3.60620187,8.79106917 L4.01328373,9.11616574 C4.02788702,9.12746059 4.04255043,9.13876497 4.05727405,9.15007879 L4.05166735,8.81297188 L4.05166735,8.81297188 L4.04930828,8.46 C4.04930828,8.22818381 4.05231617,8.000814 4.05824353,7.77793038 Z M14.4850781,4.62572385 C14.0989741,3.95141447 13.0107421,3.69094359 11.3225043,4.07309044 C11.4764081,4.72719624 11.5937556,5.45856059 11.6687188,6.26539099 C12.3304281,6.73314231 12.9117454,7.1991699 13.4135392,7.65943208 C14.5804623,6.38292066 14.8798968,5.31525286 14.4850781,4.62572385 Z M4.50361289,4.07581353 C2.80853203,3.6897134 1.71605565,3.94981949 1.32903515,4.62572521 C0.934339282,5.31505686 1.23348617,6.38229953 2.39962866,7.65810289 C2.9032154,7.19840783 3.48562344,6.73160201 4.1483204,6.26441822 C4.22232859,5.49917569 4.3347308,4.80094674 4.48134032,4.1709224 Z M10.2126709,4.39000563 L9.95947761,4.47868335 C9.72818236,4.56217802 9.48903774,4.65522319 9.24220676,4.75818403 C9.43773225,4.86699442 9.63655692,4.97948469 9.83771582,5.09659281 C10.0305713,5.20886462 10.2187024,5.32137854 10.4021163,5.43405799 C10.3479723,5.06026328 10.2847364,4.71262405 10.2126709,4.39000563 Z M5.6132858,4.39403339 L5.56330014,4.62528706 C5.51052478,4.87876367 5.4630317,5.14636598 5.42138328,5.42815308 L5.66071321,5.28311251 L5.66071321,5.28311251 L5.97641309,5.09659289 L6.28142462,4.92154061 C6.37912937,4.86627746 6.47626137,4.81212395 6.57281219,4.75907409 C6.23819037,4.61897478 5.91851108,4.49789212 5.6132858,4.39403339 Z M7.90704578,1.17 C7.17390466,1.17 6.44784915,1.86695812 5.93553147,3.28258871 C6.5538166,3.4874084 7.21240108,3.7512123 7.90733711,4.0779432 C8.60907155,3.74780391 9.27333032,3.48221985 9.8966812,3.27798036 C9.38781525,1.853248 8.65888061,1.17 7.90704578,1.17 Z" id="shape-combined"/>
130:                             </g>
131:                         </g>
132:                     </g>
133:                 </g>
134:             </g>
135:         </g>
136:     </g>
137: </svg>
138: );
139: 
140: const RuningStatusSvg = () => (
141:     <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
142:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
143:         <g id="07" transform="translate(-45.000000, -1629.000000)" fill-rule="nonzero" stroke="#7364F5" stroke-width="2">
144:             <g id="group-42" transform="translate(45.000000, 1627.000000)">
145:                 <g id="group-6" transform="translate(0.000000, 2.000000)">
146:                     <circle id="ellipse" cx="10" cy="10" r="9"/>
147:                 </g>
148:             </g>
149:         </g>
150:     </g>
151: </svg>
152: );
153: 
154: // Finish
155: const FinishStatusSvg = () => (
156:   <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
157:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
158:         <g id="04.generate-page" transform="translate(-88.000000, -247.000000)" fill-rule="nonzero">
159:             <g id="group-16" transform="translate(40.000000, 68.000000)">
160:                 <g id="group-5" transform="translate(36.000000, 164.000000)">
161:                     <g id="group-2" transform="translate(12.000000, 12.000000)">
162:                         <g id="groupbackup-15" transform="translate(0.000000, 3.000000)">
163:                             <path d="M8,0 C5.85004263,0 3.83330534,0.85300768 2.34314842,2.3431399 C0.85300768,3.83330534 0,5.85004263 0,8 C0,10.1499602 0.853010083,12.166699 2.34314274,13.6568399 C3.83330501,15.1469857 5.85004305,16 8,16 C10.1499598,16 12.1666993,15.1469833 13.6568413,13.6568413 C15.1469833,12.1666993 16,10.1499598 16,8 C16,5.85004305 15.1469857,3.83330501 13.6568441,2.343147 C12.166699,0.853010083 10.1499602,0 8,0 Z" id="path" fill="#3B82F6"/>
164:                             <path d="M10.7584678,5.21966991 C11.0424855,4.9267767 11.5029691,4.9267767 11.7869867,5.21966991 C12.0491569,5.49003289 12.0693238,5.91545618 11.8474876,6.20967458 L11.7869867,6.28033009 L7.42335039,10.7803301 C7.16118023,11.0506931 6.74864856,11.0714902 6.46334586,10.8427215 L6.39483143,10.7803301 L4.21301325,8.53033009 C3.92899558,8.23743687 3.92899558,7.76256313 4.21301325,7.46966991 C4.4751834,7.19930694 4.88771508,7.17850979 5.17301778,7.40727846 L5.2415322,7.46966991 L6.90909091,9.18875 L10.7584678,5.21966991 Z" id="path" fill="#FFFFFF"/>
165:                         </g>
166:                     </g>
167:                 </g>
168:             </g>
169:         </g>
170:     </g>
171: </svg>
172: );
173: 
174: // Expand collapse
175: const ExpandCollapseSvg = () => (
176:     <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 14 14" version="1.1">
177:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
178:         <g id="04.generate-page" transform="translate(-158.000000, -248.000000)">
179:             <g id="group-16" transform="translate(40.000000, 68.000000)">
180:                 <g id="group-5" transform="translate(36.000000, 164.000000)">
181:                     <g id="group-2" transform="translate(12.000000, 12.000000)">
182:                         <g id="group-40" transform="translate(77.000000, 11.000000) scale(1, -1) translate(-77.000000, -11.000000) translate(70.000000, 4.000000)">
183:                             <rect id="rectangle" x="0" y="0" width="14" height="14"/>
184:                             <g id="group" transform="translate(2.800000, 4.900000)" fill="#828FA1" fill-rule="nonzero">
185:                                 <path d="M7.90502525,-0.494974747 C8.17839226,-0.768341751 8.62160774,-0.768341751 8.89497475,-0.494974747 C9.14100505,-0.248944443 9.16560808,0.13466313 8.96878384,0.408208888 L8.89497475,0.494974747 L4.69497475,4.69497475 C4.44894444,4.94100505 4.06533687,4.96560808 3.79179111,4.76878384 L3.70502525,4.69497475 L-0.494974747,0.494974747 C-0.768341751,0.221607743 -0.768341751,-0.221607743 -0.494974747,-0.494974747 C-0.248944443,-0.741005051 0.13466313,-0.765608081 0.408208888,-0.568783838 L0.494974747,-0.494974747 L4.2,3.211 L7.90502525,-0.494974747 Z" id="path"/>
186:                             </g>
187:                         </g>
188:                     </g>
189:                 </g>
190:             </g>
191:         </g>
192:     </g>
193: </svg>
194: );
195: 
196: // Step up down
197: const StepUpDownSvg = () => (
198:     <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
199:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
200:         <g id="04.generate-page" transform="translate(-828.000000, -991.000000)">
201:             <g id="group-81backup" transform="translate(796.000000, 68.000000)">
202:                 <g id="group-38" transform="translate(20.000000, 911.000000)">
203:                     <g id="group-36" transform="translate(20.000000, 20.000000) scale(-1, 1) translate(-20.000000, -20.000000) translate(12.000000, 12.000000)">
204:                         <rect id="rectangle" x="0" y="0" width="16" height="16"/>
205:                         <g id="group" transform="translate(2.400000, 0.800000)" fill="#B9C8EC" fill-rule="nonzero">
206:                             <path d="M0,11.8141115 C0,12.6807703 0.683786631,13.3833422 1.52727273,13.3833422 C1.93233107,13.3833422 2.32079969,13.218015 2.60721975,12.9237274 L7.48726406,7.9096159 C8.08368935,7.29677759 8.08368935,6.30322241 7.48726406,5.6903841 L2.60721975,0.676272628 C2.01076749,0.0634620217 1.04377796,0.0634620217 0.447325724,0.676272628 C0.160906778,0.970561372 0,1.36970221 0,1.78588853 L0,11.8141115 Z M2.03633666,10.5512999 L2.03633666,3.04870014 L5.68736136,6.8 L2.03633666,10.5512999 L2.03633666,10.5512999 Z M10.1818182,0 C9.61948512,0 9.16363635,0.468372084 9.16363635,1.04615383 L9.16363635,12.5538462 C9.16363635,13.1316279 9.61948512,13.6 10.1818182,13.6 C10.7441512,13.6 11.2,13.1316279 11.2,12.5538462 L11.2,1.04615383 C11.2,0.46837206 10.7441512,0 10.1818182,0 Z" id="shape"/>
207:                         </g>
208:                     </g>
209:                 </g>
210:             </g>
211:         </g>
212:     </g>
213: </svg>
214: );
215: 
216: // Send message
217: const SendMessageSvg = () => (
218: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
219:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
220:         <g id="group-50backup-4" transform="translate(-2.000000, -2.000000)">
221:             <g id="group-48" transform="translate(2.000000, 2.000000)">
222:                 <rect id="rectangle" x="0" y="0" width="24" height="24"/>
223:                 <g id="group" transform="translate(4.790000, 4.790000)" fill="#FFFFFF" fill-rule="nonzero">
224:                     <path d="M13.51,2.14939178e-12 L13.5685333,0.00188235154 C13.5992997,0.00385835865 13.6299848,0.00739010778 13.6604608,0.0124775997 C13.6870333,0.0168259005 13.7124359,0.0222202554 13.7374232,0.0286492089 C13.7940248,0.0435440144 13.8463405,0.0623895205 13.8969202,0.0861499211 C13.9164224,0.0953087037 13.9349452,0.104837417 13.9530855,0.114968986 C13.9633501,0.120690704 13.9741605,0.127009816 13.9848646,0.133570621 C14.0082566,0.14794342 14.0301674,0.16276131 14.051371,0.178479185 C14.0624761,0.186729017 14.074326,0.195960683 14.0859937,0.20552625 C14.1041989,0.220394288 14.1210033,0.235250602 14.1372377,0.250700328 C14.1424367,0.255784663 14.1479014,0.261115619 14.1533149,0.266529037 L14.1727633,0.28642194 C14.1891381,0.303819126 14.2048356,0.321861052 14.2198136,0.34050559 L14.1533149,0.266529037 C14.1899088,0.303122522 14.2227346,0.34205723 14.2517924,0.382851008 C14.2641589,0.400125684 14.2760399,0.418115471 14.2872844,0.436536193 C14.2952554,0.44969886 14.3028148,0.462831303 14.3100198,0.476105131 C14.3218416,0.497716 14.3327714,0.519930294 14.3428002,0.542631774 C14.3491239,0.557288427 14.3550466,0.57174794 14.3605816,0.586321038 C14.367805,0.60481777 14.3744135,0.624065604 14.3803829,0.643592492 C14.3855728,0.661324771 14.3903201,0.678766711 14.3945398,0.696309674 C14.4042194,0.735569396 14.411128,0.775859345 14.4153018,0.816957786 L14.42,0.91 L14.42,9.81952589 C14.42,10.322105 14.0125791,10.7295259 13.51,10.7295259 C13.0388321,10.7295259 12.6512993,10.3714411 12.6046982,9.9125681 L12.6,9.81952589 L12.599,3.107 L1.55347096,14.1534634 C1.19809595,14.5088426 0.62191582,14.508846 0.266536621,14.153471 C-0.0651506321,13.8217876 -0.0872660732,13.2977585 0.200192413,12.9404256 L0.266529037,12.8665366 L11.312,1.82 L4.60054411,1.82 C4.12937619,1.82 3.74184343,1.46191524 3.69524234,1.00304221 L3.69054411,0.91 C3.69054411,0.438832073 4.04862887,0.0512993216 4.5075019,0.00469822742 L4.60054411,2.14939178e-12 L13.51,2.14939178e-12 Z" id="shape-combined"/>
225:                 </g>
226:             </g>
227:         </g>
228:     </g>
229: </svg>
230: )
231: 
232: // Cancel task
233: const CancleTaskSvg = () => (
234: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
235:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
236:         <g id="04.generate-page" transform="translate(-730.000000, -996.000000)">
237:             <g id="group-39" transform="translate(40.000000, 920.000000)">
238:                 <g id="group-81backup" transform="translate(0.000000, -0.000000)">
239:                     <g id="group-8" transform="translate(589.000000, 74.000000)">
240:                         <g id="group-50backup-4" transform="translate(99.000000, 0.000000)">
241:                             <g id="group-19" transform="translate(2.000000, 2.000000)">
242:                                 <rect id="rectangle" x="0" y="0" width="24" height="24"/>
243:                                 <rect id="rectangle" fill="#FFFFFF" x="7" y="7" width="10" height="10" rx="2"/>
244:                             </g>
245:                         </g>
246:                     </g>
247:                 </g>
248:             </g>
249:         </g>
250:     </g>
251: </svg>
252: )
253: 
254: 
255: // Exported icon components
256: export const DeepThinking = (props: Partial<CustomIconComponentProps>) => (
257:   <Icon component={DeepThinkingSvg} {...props} />
258: );
259: 
260: export const Executing = (props: Partial<CustomIconComponentProps>) => (
261:   <Icon component={ExecutingSvg} {...props} />
262: );
263: 
264: export const Browser = (props: Partial<CustomIconComponentProps>) => (
265:   <Icon component={BrowserSvg} {...props} />
266: );
267: 
268: export const Voice = (props: Partial<CustomIconComponentProps>) => (
269:   <Icon component={VoiceSvg} {...props} />
270: );
271: 
272: export const DataAnalysis = (props: Partial<CustomIconComponentProps>) => (
273:   <Icon component={DataAnalysisSvg} {...props} />
274: );
275: 
276: export const Search = (props: Partial<CustomIconComponentProps>) => (
277:   <Icon component={SearchSvg} {...props} />
278: );
279: 
280: export const DeepMode = (props: Partial<CustomIconComponentProps>) => (
281:   <Icon component={DeepModeSvg} {...props} />
282: );
283: 
284: export const RuningStatus = (props: Partial<CustomIconComponentProps>) => (
285:   <Icon component={RuningStatusSvg} {...props} />
286: );
287: 
288: export const FinishStatus = (props: Partial<CustomIconComponentProps>) => (
289:   <Icon component={FinishStatusSvg} {...props} />
290: );
291: 
292: export const ExpandCollapse = (props: Partial<CustomIconComponentProps>) => (
293:   <Icon component={ExpandCollapseSvg} {...props} />
294: );
295: 
296: export const StepUpDown = (props: Partial<CustomIconComponentProps>) => (
297:   <Icon component={StepUpDownSvg} {...props} />
298: );
299: 
300: export const SendMessage = (props: Partial<CustomIconComponentProps>) => (
301:   <Icon component={SendMessageSvg} {...props} />
302: );
303: 
304: export const CancleTask = (props: Partial<CustomIconComponentProps>) => (
305:     <Icon component={CancleTaskSvg} {...props} />
306: )
307: 
308: // Atlas icon
309: const AtlasSvg = () => (
310:   <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
311:     <circle cx="12" cy="12" r="10" fill="url(#atlasGradient)" opacity="0.2"/>
312:     <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
313:           fill="url(#atlasGradient)"/>
314:     <defs>
315:       <linearGradient id="atlasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
316:         <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
317:         <stop offset="100%" style={{stopColor: '#60A5FA', stopOpacity: 1}} />
318:       </linearGradient>
319:     </defs>
320:   </svg>
321: );
322: 
323: export const Atlas = (props: Partial<CustomIconComponentProps>) => (
324:   <Icon component={AtlasSvg} {...props} />
325: );
````

## File: src/icons/scheduled-task-icons.tsx
````typescript
 1: import React from 'react';
 2: import Icon from '@ant-design/icons';
 3: import type { GetProps } from 'antd';
 4: 
 5: type CustomIconComponentProps = GetProps<typeof Icon>;
 6: 
 7: /**
 8:  * Scheduled task icon - calendar + clock
 9:  */
10: const ScheduledTaskSvg = () => (
11:   <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
12:     <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.85">
13:       <g transform="translate(1.5, 1.5)" fill="#FFFFFF" fillRule="nonzero">
14:         <path d="M12,0 C13.6568542,0 15,1.34314575 15,3 L15,12 C15,13.6568542 13.6568542,15 12,15 L3,15 C1.34314575,15 0,13.6568542 0,12 L0,3 C0,1.34314575 1.34314575,0 3,0 L12,0 Z M12,1.2 L3,1.2 C2.00588745,1.2 1.2,2.00588745 1.2,3 L1.2,12 C1.2,12.9941125 2.00588745,13.8 3,13.8 L12,13.8 C12.9941125,13.8 13.8,12.9941125 13.8,12 L13.8,3 C13.8,2.00588745 12.9941125,1.2 12,1.2 Z M10.5,6 C11.3284271,6 12,6.67157288 12,7.5 C12,8.32842712 11.3284271,9 10.5,9 C9.67157288,9 9,8.32842712 9,7.5 C9,6.67157288 9.67157288,6 10.5,6 Z M10.5,7 C10.2238576,7 10,7.22385763 10,7.5 C10,7.77614237 10.2238576,8 10.5,8 C10.7761424,8 11,7.77614237 11,7.5 C11,7.22385763 10.7761424,7 10.5,7 Z M7.5,7 L7.5,8 L4.5,8 L4.5,7 L7.5,7 Z M10.5,10 L10.5,11 L4.5,11 L4.5,10 L10.5,10 Z M10.5,3.5 L10.5,5 L4.5,5 L4.5,3.5 L10.5,3.5 Z"/>
15:       </g>
16:     </g>
17:   </svg>
18: );
19: 
20: /**
21:  * Create task icon (with plus sign)
22:  */
23: const CreateTaskSvg = () => (
24:   <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
25:     <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.85">
26:       <g transform="translate(2, 2)" fill="#FFFFFF">
27:         <path d="M7,0 C10.8659932,0 14,3.13400675 14,7 C14,10.8659932 10.8659932,14 7,14 C3.13400675,14 0,10.8659932 0,7 C0,3.13400675 3.13400675,0 7,0 Z M7,1.16666667 C3.77834064,1.16666667 1.16666667,3.77834064 1.16666667,7 C1.16666667,10.2216594 3.77834064,12.8333333 7,12.8333333 C10.2216594,12.8333333 12.8333333,10.2216594 12.8333333,7 C12.8333333,3.77834064 10.2216594,1.16666667 7,1.16666667 Z M7,3.5 C7.32217184,3.5 7.58333333,3.76116149 7.58333333,4.08333333 L7.58333333,6.41666667 L9.91666667,6.41666667 C10.2388385,6.41666667 10.5,6.67782816 10.5,7 C10.5,7.32217184 10.2388385,7.58333333 9.91666667,7.58333333 L7.58333333,7.58333333 L7.58333333,9.91666667 C7.58333333,10.2388385 7.32217184,10.5 7,10.5 C6.67782816,10.5 6.41666667,10.2388385 6.41666667,9.91666667 L6.41666667,7.58333333 L4.08333333,7.58333333 C3.76116149,7.58333333 3.5,7.32217184 3.5,7 C3.5,6.67782816 3.76116149,6.41666667 4.08333333,6.41666667 L6.41666667,6.41666667 L6.41666667,4.08333333 C6.41666667,3.76116149 6.67782816,3.5 7,3.5 Z"/>
28:       </g>
29:     </g>
30:   </svg>
31: );
32: 
33: // Export icon components
34: export const ScheduledTaskIcon = (props: Partial<CustomIconComponentProps>) => (
35:   <Icon component={ScheduledTaskSvg} {...props} />
36: );
37: 
38: export const CreateTaskIcon = (props: Partial<CustomIconComponentProps>) => (
39:   <Icon component={CreateTaskSvg} {...props} />
40: );
````

## File: src/icons/source-type-icons.tsx
````typescript
  1: import React from 'react';
  2: import Icon from '@ant-design/icons';
  3: import type { GetProps } from 'antd';
  4: 
  5: type CustomIconComponentProps = GetProps<typeof Icon>;
  6: 
  7: // Image material icon
  8: const ImageTypeSvg = () => (
  9:   <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
 10:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.85">
 11:         <g id="01-home" transform="translate(-618.000000, -574.000000)">
 12:             <g id="group-39" transform="translate(535.000000, 278.000000)">
 13:                 <g id="group-37" transform="translate(71.000000, 289.000000)">
 14:                     <g id="group-34" transform="translate(12.000000, 7.000000)">
 15:                         <rect id="rectangle" x="0" y="0" width="18" height="18"/>
 16:                         <g id="group" transform="translate(1.290000, 2.040000)" fill="#FFFFFF" fill-rule="nonzero">
 17:                             <path d="M14.085,7.10542736e-14 C14.8223091,7.10542736e-14 15.42,0.597697143 15.42,1.335 L15.42,1.335 L15.42,11.835 C15.42,12.5723116 14.8223116,13.17 14.085,13.17 L14.085,13.17 L1.335,13.17 C0.597697143,13.17 7.10542736e-14,12.5723091 7.10542736e-14,11.835 L7.10542736e-14,11.835 L7.10542736e-14,1.335 C7.10542736e-14,0.597699671 0.597699671,7.10542736e-14 1.335,7.10542736e-14 L1.335,7.10542736e-14 Z M8.544,6.26 L6.65416511,8.46571295 C6.44892365,8.70516133 6.09081766,8.73881966 5.8445534,8.54180825 L5.8445534,8.54180825 L4.378,7.368 L1.17,10.576 L1.17,11.835 C1.17,11.9079065 1.21727526,11.9697626 1.28284515,11.9915888 L1.28284515,11.9915888 L1.335,12 L14.085,12 C14.1761384,12 14.25,11.9261384 14.25,11.835 L14.25,11.835 L14.25,10.624 L8.544,6.26 Z M14.085,1.17 L1.335,1.17 C1.24387283,1.17 1.17,1.24387283 1.17,1.335 L1.17,1.335 L1.17,8.922 L3.92134253,6.17134253 C4.1087015,5.98398357 4.39465216,5.94848147 4.61936288,6.07368856 L4.7004466,6.12819175 L6.133,7.275 L8.01583489,5.07928705 C8.21785076,4.84360187 8.56877716,4.80673861 8.81535831,4.99530067 L8.81535831,4.99530067 L14.25,9.151 L14.25,1.335 C14.25,1.26209407 14.2027252,1.20023763 14.1371551,1.17841129 L14.085,1.17 Z M4.1475,2.2875 C4.96762658,2.2875 5.6325,2.95237342 5.6325,3.7725 C5.6325,4.59262658 4.96762658,5.2575 4.1475,5.2575 C3.32737342,5.2575 2.6625,4.59262658 2.6625,3.7725 C2.6625,2.95237342 3.32737342,2.2875 4.1475,2.2875 Z M4.1475,3.4575 C3.97354658,3.4575 3.8325,3.59854658 3.8325,3.7725 C3.8325,3.94645342 3.97354658,4.0875 4.1475,4.0875 C4.32145342,4.0875 4.4625,3.94645342 4.4625,3.7725 C4.4625,3.59854658 4.32145342,3.4575 4.1475,3.4575 Z" id="shape-combined"/>
 18:                         </g>
 19:                     </g>
 20:                 </g>
 21:             </g>
 22:         </g>
 23:     </g>
 24: </svg>
 25: );
 26: 
 27: // Report type icon
 28: const ReportTypeSvg = () => (
 29: <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
 30:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.85">
 31:         <g id="01-home" transform="translate(-714.000000, -574.000000)">
 32:             <g id="group-39" transform="translate(535.000000, 278.000000)">
 33:                 <g id="group-37" transform="translate(71.000000, 289.000000)">
 34:                     <g id="group-50-backup-6" transform="translate(96.000000, 0.000000)">
 35:                         <g id="group-34" transform="translate(12.000000, 7.000000)">
 36:                             <rect id="rectangle" x="0" y="0" width="18" height="18"/>
 37:                             <g id="group" transform="translate(2.415000, 0.915000)" fill="#FFFFFF" fill-rule="nonzero">
 38:                                 <path d="M8.835,7.10542736e-14 C8.99015165,7.10542736e-14 9.13894869,0.0616337516 9.24865747,0.171342533 L9.24865747,0.171342533 L12.9986575,3.92134253 C13.1083662,4.03105131 13.17,4.17984835 13.17,4.335 L13.17,4.335 L13.17,14.835 C13.17,15.5723116 12.5723116,16.17 11.835,16.17 L11.835,16.17 L1.335,16.17 C0.597697143,16.17 7.10542736e-14,15.5723091 7.10542736e-14,14.835 L7.10542736e-14,14.835 L7.10542736e-14,1.335 C7.10542736e-14,0.597699671 0.597699671,7.10542736e-14 1.335,7.10542736e-14 L1.335,7.10542736e-14 Z M8.593,1.17 L1.335,1.17 C1.24387283,1.17 1.17,1.24387283 1.17,1.335 L1.17,1.335 L1.17,14.835 C1.17,14.9261332 1.24386759,15 1.335,15 L1.335,15 L11.835,15 C11.9261384,15 12,14.9261384 12,14.835 L12,14.835 L12,4.577 L8.593,1.17 Z M9.61629901,6.00059007 L9.71068702,6.01298559 C9.99501037,6.07391202 10.1864318,6.33189689 10.1725224,6.61318651 L10.1601269,6.70757452 L9.03512691,11.9575745 C8.92650165,12.4644924 8.27627947,12.5778603 7.99165422,12.1825076 L7.93987259,12.09662 L6.588,9.393 L5.23635241,12.09662 C5.00450538,12.560314 4.34658185,12.5076093 4.16977563,12.0536766 L4.14109809,11.9575745 L3.01609809,6.70757452 C2.94840205,6.39165968 3.14962315,6.08068162 3.46553798,6.01298559 C3.74986134,5.95205915 4.0301859,6.1089556 4.13275799,6.37124607 L4.16012691,6.46242548 L4.935,10.08 L6.06487259,7.82338005 C6.26506024,7.42300475 6.80990418,7.39440652 7.05932844,7.73758534 L7.11135241,7.82338005 L8.24,10.082 L9.01609809,6.46242548 C9.07025492,6.20969361 9.28011224,6.03036574 9.52363729,6.00340423 L9.61629901,6.00059007 Z" id="shape-combined"/>
 39:                             </g>
 40:                         </g>
 41:                     </g>
 42:                 </g>
 43:             </g>
 44:         </g>
 45:     </g>
 46: </svg>
 47: );
 48: 
 49: // Slide type icon
 50: const SlideTypeSvg = () => (
 51: <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
 52:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.85">
 53:         <g id="01-home" transform="translate(-810.000000, -574.000000)">
 54:             <g id="group-39" transform="translate(535.000000, 278.000000)">
 55:                 <g id="group-37" transform="translate(71.000000, 289.000000)">
 56:                     <g id="group-50-backup-7" transform="translate(192.000000, 0.000000)">
 57:                         <g id="group-34" transform="translate(12.000000, 7.000000)">
 58:                             <rect id="rectangle" x="0" y="0" width="18" height="18"/>
 59:                             <g id="group" transform="translate(0.915000, 1.852500)" fill="#FFFFFF" fill-rule="nonzero">
 60:                                 <path d="M15.585,7.28306304e-14 C15.9080866,7.28306304e-14 16.17,0.261913421 16.17,0.585 C16.17,0.875777921 15.9578501,1.11700558 15.67989,1.16234334 L15.585,1.17 L14.67,1.17 L14.67,10.335 C14.67,10.6257779 14.4578501,10.8670056 14.17989,10.9123433 L14.085,10.92 L9.497,10.92 L11.4986575,12.9213425 C11.7271142,13.1497992 11.7271142,13.5202008 11.4986575,13.7486575 C11.2955848,13.9517301 10.9803583,13.9742937 10.7523626,13.8163483 L10.6713425,13.7486575 L8.085,11.1625 L5.49865747,13.7486575 C5.29558484,13.9517301 4.98035829,13.9742937 4.75236256,13.8163483 L4.67134253,13.7486575 C4.4682699,13.5455848 4.44570628,13.2303583 4.60365166,13.0023626 L4.67134253,12.9213425 L6.672,10.92 L2.085,10.92 C1.79422208,10.92 1.55299442,10.7078501 1.50765666,10.42989 L1.5,10.335 L1.5,1.17 L0.585,1.17 C0.261913421,1.17 7.10542736e-14,0.908086579 7.10542736e-14,0.585 C7.10542736e-14,0.294222079 0.212149871,0.0529944158 0.490109961,0.00765666238 L0.585,7.28306304e-14 L15.585,7.28306304e-14 Z M13.5,1.17 L2.67,1.17 L2.67,9.7495 L13.5,9.7495 L13.5,1.17 Z M7.66763744,3.10365166 L7.74865747,3.17134253 L9.62365747,5.04634253 C9.8267301,5.24941516 9.84929372,5.56464171 9.69134834,5.79263744 L9.62365747,5.87365747 L7.74865747,7.74865747 C7.52020076,7.97711418 7.14979924,7.97711418 6.92134253,7.74865747 C6.7182699,7.54558484 6.69570628,7.23035829 6.85365166,7.00236256 L6.92134253,6.92134253 L8.382,5.4595 L6.92134253,3.99865747 C6.7182699,3.79558484 6.69570628,3.48035829 6.85365166,3.25236256 L6.92134253,3.17134253 C7.12441516,2.9682699 7.43964171,2.94570628 7.66763744,3.10365166 Z" id="shape-combined"/>
 61:                             </g>
 62:                         </g>
 63:                     </g>
 64:                 </g>
 65:             </g>
 66:         </g>
 67:     </g>
 68: </svg>
 69: );
 70: 
 71: // Web type icon
 72: const WebTypeSvg = () => (
 73: <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
 74:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.85">
 75:         <g id="01-home" transform="translate(-920.000000, -574.000000)">
 76:             <g id="group-39" transform="translate(535.000000, 278.000000)">
 77:                 <g id="group-37" transform="translate(71.000000, 289.000000)">
 78:                     <g id="group-50-backup-8" transform="translate(302.000000, 0.000000)">
 79:                         <g id="group-34" transform="translate(12.000000, 7.000000)">
 80:                             <rect id="rectangle" x="0" y="0" width="18" height="18"/>
 81:                             <g id="group" transform="translate(0.915000, 2.415000)" fill="#FFFFFF" fill-rule="nonzero">
 82:                                 <path d="M14.46,7.10542736e-14 C15.4044069,7.10542736e-14 16.17,0.765593078 16.17,1.71 L16.17,1.71 L16.17,11.46 C16.17,12.4044069 15.4044069,13.17 14.46,13.17 L14.46,13.17 L1.71,13.17 C0.765593078,13.17 7.10542736e-14,12.4044069 7.10542736e-14,11.46 L7.10542736e-14,11.46 L7.10542736e-14,1.71 C7.10542736e-14,0.765593078 0.765593078,7.10542736e-14 1.71,7.10542736e-14 L1.71,7.10542736e-14 Z M15,5.67 L1.17,5.67 L1.17,11.46 C1.17,11.7284104 1.36583065,11.9510821 1.6224092,11.9929323 L1.71,12 L14.46,12 C14.7582338,12 15,11.7582338 15,11.46 L15,11.46 L15,5.67 Z M14.46,1.17 L1.71,1.17 C1.41176783,1.17 1.17,1.41176783 1.17,1.71 L1.17,1.71 L1.17,4.5 L15,4.5 L15,1.71 C15,1.41176624 14.7582338,1.17 14.46,1.17 L14.46,1.17 Z M2.8349999,2.085 C3.24921346,2.08499995 3.58499995,2.42078634 3.585,2.8349999 C3.58500005,3.24921346 3.24921366,3.58499995 2.8350001,3.585 C2.42078654,3.58500005 2.08500005,3.24921366 2.085,2.8350001 C2.08499995,2.42078654 2.42078634,2.08500005 2.8349999,2.085 Z M5.0849999,2.085 C5.49921346,2.08499995 5.83499995,2.42078634 5.835,2.8349999 C5.83500005,3.24921346 5.49921366,3.58499995 5.0850001,3.585 C4.67078654,3.58500005 4.33500005,3.24921366 4.335,2.8350001 C4.33499995,2.42078654 4.67078634,2.08500005 5.0849999,2.085 Z" id="shape-combined"/>
 83:                             </g>
 84:                         </g>
 85:                     </g>
 86:                 </g>
 87:             </g>
 88:         </g>
 89:     </g>
 90: </svg>
 91: );
 92: 
 93: // Spreadsheet type icon
 94: const SpreadsheetTypeSvg = () => (
 95: <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
 96:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.85">
 97:         <g id="01-home" transform="translate(-1016.000000, -574.000000)">
 98:             <g id="group-39" transform="translate(535.000000, 278.000000)">
 99:                 <g id="group-37" transform="translate(71.000000, 289.000000)">
100:                     <g id="group-50-backup-8" transform="translate(398.000000, 0.000000)">
101:                         <g id="group-34" transform="translate(12.000000, 7.000000)">
102:                             <rect id="rectangle" x="0" y="0" width="18" height="18"/>
103:                             <g id="group" transform="translate(1.102500, 2.415000)">
104:                                 <path d="M1.335,13.17 C0.597699859,13.17 7.46069873e-14,12.5723001 7.46069873e-14,11.835 L7.46069873e-14,11.835 L7.46069873e-14,1.335 C7.46069873e-14,0.597699859 0.597699859,7.10542736e-14 1.335,7.10542736e-14 L1.335,7.10542736e-14 L14.835,7.10542736e-14 C15.5723001,7.10542736e-14 16.17,0.597699859 16.17,1.335 L16.17,1.335 L16.17,11.835 C16.17,12.5723001 15.5723001,13.17 14.835,13.17 L14.835,13.17 Z M4.874,9.045 L1.17,9.045 L1.17,11.835 C1.17,11.9079016 1.21727873,11.9697606 1.28284724,11.9915882 L1.335,12 L4.874,12 L4.874,9.045 Z M10.124,9.045 L6.044,9.045 L6.044,12 L10.124,12 L10.124,9.045 Z M15,9.045 L11.294,9.045 L11.294,12 L14.835,12 C14.9079016,12 14.9697606,11.9527213 14.9915882,11.8871528 L15,11.835 L15,9.045 Z M4.874,5.295 L1.17,5.295 L1.17,7.875 L4.874,7.875 L4.874,5.295 Z M10.124,5.295 L6.044,5.295 L6.044,7.875 L10.124,7.875 L10.124,5.295 Z M15,5.295 L11.294,5.295 L11.294,7.875 L15,7.875 L15,5.295 Z M14.835,1.17 L1.335,1.17 C1.24387302,1.17 1.17,1.24387302 1.17,1.335 L1.17,1.335 L1.17,4.125 L15,4.125 L15,1.335 C15,1.26209841 14.9527213,1.20023937 14.8871528,1.17841181 L14.835,1.17 Z" id="shape-combined" fill="#FFFFFF" fill-rule="nonzero"/>
105:                                 <path d="M0.585,8.46 L15.585,8.46 L0.585,8.46 Z" id="path"/>
106:                                 <path d="M0.585,4.71 L15.585,4.71 L0.585,4.71 Z" id="path"/>
107:                                 <path d="M5.46,12.585 L5.46,4.71 L5.46,12.585 Z" id="path"/>
108:                                 <path d="M0.585,11.835 L0.585,3.96 L0.585,11.835 Z" id="path"/>
109:                                 <path d="M15.585,11.835 L15.585,3.96 L15.585,11.835 Z" id="path"/>
110:                                 <path d="M10.71,12.585 L10.71,4.71 L10.71,12.585 Z" id="path"/>
111:                             </g>
112:                         </g>
113:                     </g>
114:                 </g>
115:             </g>
116:         </g>
117:     </g>
118: </svg>
119: );
120: 
121: // Visualization image icon component
122: const VisualizeTypeSvg = () => (
123: <svg xmlns="http://www.w3.org/2000/svg"  width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
124:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.85">
125:         <g id="01-home" transform="translate(-1140.000000, -574.000000)">
126:             <g id="group-39" transform="translate(535.000000, 278.000000)">
127:                 <g id="group-37" transform="translate(71.000000, 289.000000)">
128:                     <g id="group-50-backup-9" transform="translate(522.000000, 0.000000)">
129:                         <g id="group-34" transform="translate(12.000000, 7.000000)">
130:                             <rect id="rectangle" x="0" y="0" width="18" height="18"/>
131:                             <g id="group" transform="translate(1.665000, 1.665000)" fill="#FFFFFF" fill-rule="nonzero">
132:                                 <path d="M0.585,7.10542736e-14 C0.875777921,7.10542736e-14 1.11700558,0.212149871 1.16234334,0.490109961 L1.17,0.585 L1.17,13.5 L14.085,13.5 C14.3757779,13.5 14.6170056,13.7121499 14.6623433,13.99011 L14.67,14.085 C14.67,14.3757779 14.4578501,14.6170056 14.17989,14.6623433 L14.085,14.67 L0.585,14.67 C0.294222079,14.67 0.0529944158,14.4578501 0.00765666238,14.17989 L7.10542736e-14,14.085 L7.10542736e-14,0.585 C7.10542736e-14,0.261913421 0.261913421,7.10542736e-14 0.585,7.10542736e-14 Z M3.585,9 C3.87577792,9 4.11700558,9.21214987 4.16234334,9.49010996 L4.17,9.585 L4.17,11.085 C4.17,11.4080866 3.90808658,11.67 3.585,11.67 C3.29422208,11.67 3.05299442,11.4578501 3.00765666,11.17989 L3,11.085 L3,9.585 C3,9.26191342 3.26191342,9 3.585,9 Z M6.585,6 C6.87577792,6 7.11700558,6.21214987 7.16234334,6.49010996 L7.17,6.585 L7.17,11.085 C7.17,11.4080866 6.90808658,11.67 6.585,11.67 C6.29422208,11.67 6.05299442,11.4578501 6.00765666,11.17989 L6,11.085 L6,6.585 C6,6.26191342 6.26191342,6 6.585,6 Z M9.585,7.10542736e-14 C9.87577792,7.10542736e-14 10.1170056,0.212149871 10.1623433,0.490109961 L10.17,0.585 L10.17,11.085 C10.17,11.4080866 9.90808658,11.67 9.585,11.67 C9.29422208,11.67 9.05299442,11.4578501 9.00765666,11.17989 L9,11.085 L9,0.585 C9,0.261913421 9.26191342,7.10542736e-14 9.585,7.10542736e-14 Z M12.585,3 C12.8757779,3 13.1170056,3.21214987 13.1623433,3.49010996 L13.17,3.585 L13.17,11.085 C13.17,11.4080866 12.9080866,11.67 12.585,11.67 C12.2942221,11.67 12.0529944,11.4578501 12.0076567,11.17989 L12,11.085 L12,3.585 C12,3.26191342 12.2619134,3 12.585,3 Z" id="shape-combined"/>
133:                             </g>
134:                         </g>
135:                     </g>
136:                 </g>
137:             </g>
138:         </g>
139:     </g>
140: </svg>
141: );
142: 
143: // More
144: const MoreTypeSvg = () => (
145: <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
146:     <g id="version-8-26" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.85">
147:         <g id="01-home" transform="translate(-1250.000000, -574.000000)">
148:             <g id="group-39" transform="translate(535.000000, 278.000000)">
149:                 <g id="group-37" transform="translate(71.000000, 289.000000)">
150:                     <g id="group-50-backup-9" transform="translate(632.000000, 0.000000)">
151:                         <g id="group-34" transform="translate(12.000000, 7.000000)">
152:                             <rect id="rectangle" x="0" y="0" width="18" height="18"/>
153:                             <g id="group" transform="translate(1.665000, 1.665000)" fill="#FFFFFF" fill-rule="nonzero">
154:                                 <path d="M5.085,8.25 C5.82231158,8.25 6.42,8.84768842 6.42,9.585 L6.42,9.585 L6.42,13.335 C6.42,14.0723116 5.82231158,14.67 5.085,14.67 L5.085,14.67 L1.335,14.67 C0.597697143,14.67 7.14983628e-14,14.0723091 7.14983628e-14,13.335 L7.14983628e-14,13.335 L7.14983628e-14,9.585 C7.14983628e-14,8.84769095 0.597697143,8.25 1.335,8.25 L1.335,8.25 Z M13.335,8.25 C14.0723116,8.25 14.67,8.84768842 14.67,9.585 L14.67,9.585 L14.67,13.335 C14.67,14.0723116 14.0723116,14.67 13.335,14.67 L13.335,14.67 L9.585,14.67 C8.84768842,14.67 8.25,14.0723116 8.25,13.335 L8.25,13.335 L8.25,9.585 C8.25,8.84768842 8.84768842,8.25 9.585,8.25 L9.585,8.25 Z M5.085,9.42 L1.335,9.42 C1.24386759,9.42 1.17,9.49386682 1.17,9.585 L1.17,9.585 L1.17,13.335 C1.17,13.4261332 1.24386759,13.5 1.335,13.5 L1.335,13.5 L5.085,13.5 C5.17613842,13.5 5.25,13.4261384 5.25,13.335 L5.25,13.335 L5.25,9.585 C5.25,9.49386158 5.17613842,9.42 5.085,9.42 L5.085,9.42 Z M13.335,9.42 L9.585,9.42 C9.49386158,9.42 9.42,9.49386158 9.42,9.585 L9.42,9.585 L9.42,13.335 C9.42,13.4261384 9.49386158,13.5 9.585,13.5 L9.585,13.5 L13.335,13.5 C13.4261384,13.5 13.5,13.4261384 13.5,13.335 L13.5,13.335 L13.5,9.585 C13.5,9.49386158 13.4261384,9.42 13.335,9.42 L13.335,9.42 Z M5.085,7.14983628e-14 C5.82230905,7.14983628e-14 6.42,0.597697143 6.42,1.335 L6.42,1.335 L6.42,5.085 C6.42,5.82231158 5.82231158,6.42 5.085,6.42 L5.085,6.42 L1.335,6.42 C0.597697143,6.42 7.14983628e-14,5.82230905 7.14983628e-14,5.085 L7.14983628e-14,5.085 L7.14983628e-14,1.335 C7.14983628e-14,0.597699671 0.597699671,7.14983628e-14 1.335,7.14983628e-14 L1.335,7.14983628e-14 Z M13.335,7.14983628e-14 C14.0723091,7.14983628e-14 14.67,0.597697143 14.67,1.335 L14.67,1.335 L14.67,5.085 C14.67,5.82231158 14.0723116,6.42 13.335,6.42 L13.335,6.42 L9.585,6.42 C8.84768842,6.42 8.25,5.82231158 8.25,5.085 L8.25,5.085 L8.25,1.335 C8.25,0.597697143 8.84769095,7.14983628e-14 9.585,7.14983628e-14 L9.585,7.14983628e-14 Z M5.085,1.17 L1.335,1.17 C1.24387283,1.17 1.17,1.24387283 1.17,1.335 L1.17,1.335 L1.17,5.085 C1.17,5.17613318 1.24386759,5.25 1.335,5.25 L1.335,5.25 L5.085,5.25 C5.17613842,5.25 5.25,5.17613842 5.25,5.085 L5.25,5.085 L5.25,1.335 C5.25,1.24386759 5.17613318,1.17 5.085,1.17 L5.085,1.17 Z M13.335,1.17 L9.585,1.17 C9.49386682,1.17 9.42,1.24386759 9.42,1.335 L9.42,1.335 L9.42,5.085 C9.42,5.17613842 9.49386158,5.25 9.585,5.25 L9.585,5.25 L13.335,5.25 C13.4261384,5.25 13.5,5.17613842 13.5,5.085 L13.5,5.085 L13.5,1.335 C13.5,1.24386759 13.4261332,1.17 13.335,1.17 L13.335,1.17 Z" id="shape-combined"/>
155:                             </g>
156:                         </g>
157:                     </g>
158:                 </g>
159:             </g>
160:         </g>
161:     </g>
162: </svg>
163: );
164: 
165: // Export image material icon component
166: export const ImageType = (props: Partial<CustomIconComponentProps>) => (
167:   <Icon component={ImageTypeSvg} {...props} />
168: );
169: 
170: // Export report type icon component
171: export const ReportType = (props: Partial<CustomIconComponentProps>) => (
172:   <Icon component={ReportTypeSvg} {...props} />
173: );
174: 
175: // Export slide type icon component
176: export const SlideType = (props: Partial<CustomIconComponentProps>) => (
177:   <Icon component={SlideTypeSvg} {...props} />
178: );
179: 
180: // Export web type icon component
181: export const WebType = (props: Partial<CustomIconComponentProps>) => (
182:   <Icon component={WebTypeSvg} {...props} />
183: );
184: 
185: // Export spreadsheet type icon component
186: export const SpreadsheetType = (props: Partial<CustomIconComponentProps>) => (
187:   <Icon component={SpreadsheetTypeSvg} {...props} />
188: );
189: 
190: // Export visualization image icon component
191: export const VisualizeType = (props: Partial<CustomIconComponentProps>) => (
192:   <Icon component={VisualizeTypeSvg} {...props} />
193: );
194: 
195: // Export more icon component
196: export const MoreType = (props: Partial<CustomIconComponentProps>) => (
197:   <Icon component={MoreTypeSvg} {...props} />
198: );
````

## File: src/icons/tools.tsx
````typescript
  1: import React from 'react';
  2: import Icon from '@ant-design/icons';
  3: import type { GetProps } from 'antd';
  4: 
  5: type CustomIconComponentProps = GetProps<typeof Icon>;
  6: 
  7: const HangUpSvg = () => (
  8:     <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
  9:     <g id="version-8-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
 10:         <g id="14" transform="translate(-1329.000000, -958.000000)">
 11:             <g id="group-2backup-5" transform="translate(1069.000000, 914.000000)">
 12:                 <g id="group-50backup-6" transform="translate(256.000000, 40.000000)">
 13:                     <g id="group-7" transform="translate(2.500000, 3.581655)">
 14:                         <rect id="rectangle" x="1.5" y="0.418344852" width="24" height="24"/>
 15:                         <g id="group" opacity="0.8" transform="translate(13.458034, 12.918345) rotate(-236.000000) translate(-13.458034, -12.918345) translate(4.958034, 2.418345)" fill="#FFFFFF" fill-rule="nonzero">
 16:                             <path d="M2.27214244,0.83465016 L1.47791177,1.31991423 C-1.10509187,2.97131426 -0.150966734,8.53342766 3.16381418,13.5874023 L3.52795958,14.1299535 C6.8712034,18.9981884 11.5724617,22.0460045 14.1103018,20.6673808 L14.1732591,20.6299037 L14.2912233,20.574968 C14.4985162,20.4713588 14.7514679,20.3175309 14.9263664,20.1899945 L14.9534834,20.1675617 L14.9136251,20.1921323 C15.9053178,19.6156552 16.5228457,19.0223727 16.8261712,18.2509687 C17.2414861,17.0696982 16.9062284,15.8949727 15.8886778,14.6528559 C14.3920478,12.8132028 13.0300228,12.2216084 11.4624399,12.8235016 L11.2484803,12.9099777 L11.0623794,12.9979397 L10.624617,13.2314769 L10.5436026,13.2800277 L10.3524963,13.4169922 L10.2867388,13.3634058 C10.2020626,13.2910806 10.1043042,13.1988513 9.99682385,13.0880376 C9.49654179,12.57224 8.86481318,11.7411165 8.19002743,10.6977232 C7.49628039,9.71920322 6.98968746,8.8424217 6.70945743,8.17252009 L6.6558052,8.03948877 L6.57279069,7.80522418 L6.55042153,7.73141011 L6.60317013,7.69658113 L6.60274795,7.68056191 L6.742445,7.60208745 C8.61106906,6.3591884 8.88939754,4.85561988 7.71377535,2.46414749 L7.59930531,2.23732653 C6.98962578,0.99650856 6.09536938,0.205470868 5.02962538,0.0386798954 C4.14322293,-0.10004376 3.445137,0.127361297 2.27214244,0.83465016 Z M4.77151753,1.71354306 C5.19858607,1.78038011 5.63324292,2.14094883 6.0077114,2.82698287 L6.19731702,3.19637572 C7.00607705,4.81280042 6.92167011,5.4125927 5.9339213,6.10690036 L5.84121171,6.16924039 L5.7261852,6.23396147 L5.52889517,6.35334948 L5.37582236,6.45623451 C5.35263668,6.47292895 5.33058061,6.48946765 5.30960378,6.50595684 L5.23507341,6.56848317 L5.16530142,6.63729895 L5.12189398,6.68516016 C4.39339337,7.4390103 5.05739907,9.10160505 6.49359363,11.2109331 L6.80155201,11.6535685 L6.95798571,11.8937609 C7.11327252,12.1303279 7.26513388,12.3559583 7.4137071,12.5701057 L7.70651001,12.982928 C8.95667698,14.7040752 9.966742,15.5353642 10.8260745,15.1211461 L10.9764531,15.0417735 L11.0582172,14.9922648 L11.1881768,14.9020886 L11.4297945,14.7212498 C11.4314934,14.7194304 11.4303407,14.7195191 11.4258421,14.7218076 L11.8595954,14.4901225 C11.8743786,14.4827716 11.8848481,14.4778887 11.8895144,14.4763063 C12.8033983,14.0811316 13.4649414,14.346994 14.5898196,15.7296853 C15.2660609,16.5551759 15.4328617,17.1396372 15.2515447,17.6561218 C15.1353565,17.9501446 14.8249624,18.2635517 14.2397108,18.6243515 L13.9754343,18.7807918 L13.8959852,18.8616124 L13.8883869,18.8631236 L13.5609082,19.0512987 L13.3591804,19.1479378 C11.9176026,20.0537028 7.86394431,17.4566645 4.91260734,13.1675182 L4.73687962,12.9081534 C3.27339076,10.7403184 2.31977076,8.48622561 1.90172019,6.64015634 L1.81168415,6.20518684 C1.49277698,4.49866961 1.66934545,3.20462927 2.36412779,2.76037431 L3.27296301,2.20715309 C3.97508492,1.79382104 4.33852889,1.671339 4.69037844,1.70345048 L4.77151753,1.71354306 Z" id="path"/>
 17:                         </g>
 18:                     </g>
 19:                 </g>
 20:             </g>
 21:         </g>
 22:     </g>
 23: </svg>
 24: )
 25: 
 26: const HistorySvg = () => (
 27:     <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
 28:     <g id="version-8-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
 29:         <g id="14" transform="translate(-1279.000000, -280.000000)">
 30:             <g id="group-2" transform="translate(1259.000000, 180.000000)">
 31:                 <g id="group-50backup-11" transform="translate(16.000000, 96.000000)">
 32:                     <g id="group-5" transform="translate(4.000000, 4.000000)">
 33:                         <rect id="rectangle" x="0" y="0" width="24" height="24"/>
 34:                         <g id="group" transform="translate(1.100000, 1.100000)" fill="#B9C8EC" fill-rule="nonzero">
 35:                             <path d="M10.9,1.84741111e-13 C16.9199063,1.84741111e-13 21.8,4.88009373 21.8,10.9 C21.8,16.9199063 16.9199063,21.8 10.9,21.8 C4.88009373,21.8 2.91322522e-12,16.9199063 2.91322522e-12,10.9 C2.91322522e-12,10.4029437 0.402943725,10 0.9,10 C1.39705627,10 1.8,10.4029437 1.8,10.9 C1.8,15.9257937 5.87420627,20 10.9,20 C15.9257937,20 20,15.9257937 20,10.9 C20,5.87420627 15.9257937,1.8 10.9,1.8 C8.18080718,1.8 5.67170599,3.00215929 3.97096301,4.99942964 L5.44555,5 C5.90437118,5 6.28300178,5.34333667 6.33853772,5.78710591 L6.34555,5.9 C6.34555,6.35882118 6.00221333,6.73745178 5.55844409,6.79298772 L5.44555,6.8 L1.80918,6.8 C1.35035882,6.8 0.971728221,6.45666333 0.916192278,6.01289409 L0.90918,5.9 L0.90918,2.263645 C0.90918,1.76658873 1.31212373,1.363645 1.80918,1.363645 C2.26800118,1.363645 2.64663178,1.70698167 2.70216772,2.15075091 L2.70918,2.263645 L2.70818032,3.70791173 C4.74237901,1.39073503 7.70036422,1.84741111e-13 10.9,1.84741111e-13 Z M10.9026079,5.00000001 C11.3614291,5.00000001 11.7400185,5.34343708 11.7955013,5.78721298 L11.8025,5.90010791 L11.801,10.531 L14.7779961,13.5077039 C15.1001786,13.8298864 15.1270272,14.335566 14.8585417,14.6883314 L14.7779961,14.7804961 C14.4558136,15.1026786 13.950134,15.1295272 13.5973686,14.8610417 L13.5052039,14.7804961 L10.2655039,11.5407961 C10.1248296,11.4001218 10.0355343,11.2176743 10.0096934,11.0226108 L10.0019,10.9042921 L10.0025,5.89989209 C10.0025596,5.40283582 10.4055516,5.00000001 10.9026079,5.00000001 Z" id="shape-combined"/>
 36:                         </g>
 37:                     </g>
 38:                 </g>
 39:             </g>
 40:         </g>
 41:     </g>
 42: </svg>
 43: )
 44: 
 45: const InputSvg = () => (
 46: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
 47:     <g id="version-8-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
 48:         <g id="14" transform="translate(-1329.000000, -1126.000000)">
 49:             <g id="group-2backup-5" transform="translate(1069.000000, 914.000000)">
 50:                 <g id="group-50backup-4" transform="translate(256.000000, 208.000000)">
 51:                     <g id="group-8" transform="translate(4.000000, 4.000000)">
 52:                         <rect id="rectangle" x="0" y="0" width="24" height="24"/>
 53:                         <g id="group" transform="translate(3.760000, 3.760000)" fill="#FFFFFF" fill-rule="nonzero">
 54:                             <path d="M15.44,1.80744308e-12 L15.4573011,0.000145839548 C15.4847001,0.000603306422 15.5120844,0.00213700374 15.5393853,0.00474693191 L15.44,1.80744308e-12 C15.4926543,1.80744308e-12 15.5443946,0.00391299758 15.5949461,0.0114640619 C15.6104978,0.0138896451 15.6265242,0.016669316 15.6424908,0.0198259244 C15.6719899,0.0255406585 15.7004482,0.0324560657 15.7284225,0.0405141206 C15.7375818,0.0432700404 15.7476215,0.0463146364 15.7576224,0.0495143072 C15.7862877,0.0586040408 15.8136392,0.0686993183 15.8404231,0.0798826775 C15.8512092,0.0844431279 15.8622245,0.0892570683 15.8731708,0.0942710144 C15.8976426,0.105450756 15.9216623,0.117629941 15.9451238,0.130690788 C15.9582881,0.138021725 15.971196,0.145575497 15.9839709,0.153430908 C16.0093751,0.169044433 16.03427,0.185874867 16.0583666,0.203721994 C16.0664764,0.209761978 16.0750137,0.21629171 16.0834713,0.222971527 C16.1038452,0.238998011 16.1231226,0.255391451 16.1417759,0.27245586 C16.1527108,0.282595607 16.1640591,0.293446843 16.175217,0.304604614 C16.2165488,0.345935872 16.2536744,0.389880498 16.286594,0.435906598 C16.301981,0.457322818 16.3166659,0.479608576 16.3304952,0.502469739 C16.3376809,0.514457669 16.3447446,0.526700072 16.3515386,0.53905128 C16.3643395,0.562137099 16.3762869,0.585934184 16.387327,0.610230876 C16.3939967,0.62525607 16.4003557,0.640220807 16.4063481,0.655297391 C16.4153644,0.677455123 16.4235478,0.700266231 16.4309416,0.723430052 C16.4356729,0.739023292 16.4402484,0.754656466 16.4444497,0.770368871 C16.4513664,0.795230867 16.4571569,0.820614987 16.4620006,0.846333371 C16.4644114,0.860478386 16.4668114,0.874840393 16.4689092,0.889237955 C16.4712858,0.903927602 16.4731158,0.918750231 16.4746306,0.933666041 L16.4773936,0.968630441 C16.4781717,0.980009995 16.4787634,0.991399904 16.4791687,1.00279521 L16.48,1.04 L16.48,11.2223153 C16.48,11.7966914 16.0143761,12.2623153 15.44,12.2623153 C14.9015224,12.2623153 14.4586278,11.8530756 14.4053694,11.3286493 L14.4,11.2223153 L14.399,3.551 L1.77539539,16.1753867 C1.36925252,16.5815344 0.710760938,16.5815383 0.304613281,16.1753954 C-0.0744578653,15.7963287 -0.0997326551,15.1974383 0.228791329,14.7890579 L0.304604614,14.7046133 L12.928,2.08 L5.2577647,2.08 C4.71928707,2.08 4.2763925,1.67076028 4.2231341,1.14633396 L4.2177647,1.04 C4.2177647,0.501522369 4.62700442,0.0586277961 5.15143074,0.00536940276 L5.2577647,1.80744308e-12 L15.44,1.80744308e-12 Z" id="shape-combined"/>
 55:                         </g>
 56:                     </g>
 57:                 </g>
 58:             </g>
 59:         </g>
 60:     </g>
 61: </svg>
 62: )
 63: 
 64: const KeyBoardSvg = () => (
 65: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
 66:     <g id="version-8-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
 67:         <g id="14" transform="translate(-1279.000000, -392.000000)">
 68:             <g id="group-2" transform="translate(1259.000000, 180.000000)">
 69:                 <g id="group-50backup-12" transform="translate(16.000000, 208.000000)">
 70:                     <g id="group-3" transform="translate(4.000000, 4.000000)">
 71:                         <rect id="rectangle" x="0" y="0" width="24" height="24"/>
 72:                         <g id="group" transform="translate(2.100000, 3.600000)" fill="#B9C8EC" fill-rule="nonzero">
 73:                             <path d="M18,1.81188398e-13 C18.9955233,1.81188398e-13 19.8,0.810071736 19.8,1.80625 L19.8,1.80625 L19.8,14.49375 C19.8,15.4899392 18.9955259,16.3 18,16.3 L18,16.3 L1.8,16.3 C0.80448508,16.3 2.91322522e-12,15.4899366 2.91322522e-12,14.49375 L2.91322522e-12,14.49375 L2.91322522e-12,1.80625 C2.91322522e-12,0.810074359 0.80448764,1.81188398e-13 1.8,1.81188398e-13 L1.8,1.81188398e-13 Z M1.8,1.8 L1.8,14.5 L18,14.5 L17.9994778,1.80130712 L1.8,1.8 Z M15.3,9.515625 C15.7970563,9.515625 16.2,9.91856873 16.2,10.415625 C16.2,10.8744462 15.8566633,11.2530768 15.4128941,11.3086127 L15.3,11.315625 L4.5,11.315625 C4.00294373,11.315625 3.6,10.9126813 3.6,10.415625 C3.6,9.95680382 3.94333667,9.57817322 4.38710591,9.52263728 L4.5,9.515625 L15.3,9.515625 Z M5.4,5.4375 C5.89705627,5.4375 6.3,5.84044373 6.3,6.3375 C6.3,6.79632118 5.95666333,7.17495178 5.51289409,7.23048772 L5.4,7.2375 L4.5,7.2375 C4.00294373,7.2375 3.6,6.83455627 3.6,6.3375 C3.6,5.87867882 3.94333667,5.50004822 4.38710591,5.44451228 L4.5,5.4375 L5.4,5.4375 Z M9.45,5.4375 C9.94705627,5.4375 10.35,5.84044373 10.35,6.3375 C10.35,6.79632118 10.0066633,7.17495178 9.56289409,7.23048772 L9.45,7.2375 L8.55,7.2375 C8.05294373,7.2375 7.65,6.83455627 7.65,6.3375 C7.65,5.87867882 7.99333667,5.50004822 8.43710591,5.44451228 L8.55,5.4375 L9.45,5.4375 Z M15.3,5.4375 C15.7970563,5.4375 16.2,5.84044373 16.2,6.3375 C16.2,6.79632118 15.8566633,7.17495178 15.4128941,7.23048772 L15.3,7.2375 L12.15,7.2375 C11.6529437,7.2375 11.25,6.83455627 11.25,6.3375 C11.25,5.87867882 11.5933367,5.50004822 12.0371059,5.44451228 L12.15,5.4375 L15.3,5.4375 Z" id="shape-combined"/>
 74:                         </g>
 75:                     </g>
 76:                 </g>
 77:             </g>
 78:         </g>
 79:     </g>
 80: </svg>
 81: )
 82: 
 83: const ScreenTextOpenSvg = () => (
 84: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
 85:     <g id="version-8-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
 86:         <g id="14" transform="translate(-1279.000000, -336.000000)">
 87:             <g id="group-2" transform="translate(1259.000000, 180.000000)">
 88:                 <g id="group-50backup-11" transform="translate(16.000000, 152.000000)">
 89:                     <g id="group-4" transform="translate(4.000000, 4.000000)">
 90:                         <rect id="rectangle" x="0" y="0" width="24" height="24"/>
 91:                         <g id="group" transform="translate(2.500000, 4.000000)" fill="#B9C8EC" fill-rule="nonzero">
 92:                             <path d="M18.1363636,0 C18.6133368,0 19,0.38480836 19,0.859493528 L19,0.859493528 L19,13.9565378 C19,14.4312229 18.6133368,14.8160313 18.1363636,14.8160313 L18.1363636,14.8160313 L9.27497475,14.8157584 L5.14111108,16.9056847 C4.5870948,17.1857399 3.93481542,16.8094622 3.88893069,16.2072041 L3.88893069,16.2072041 L3.88636364,16.1393785 L3.88636364,14.8157584 L0.863636364,14.8160313 C0.41051183,14.8160313 0.0388920921,14.4687417 0.00286292964,14.0270296 L0.00286292964,14.0270296 L0,13.9565378 L0,0.859493528 C0,0.38480836 0.386663171,0 0.863636364,0 L0.863636364,0 Z M6.47128957,3.91944444 C5.25831233,3.91944444 4.275,4.92697309 4.275,6.16982266 C4.275,7.41267223 5.25831233,8.42020087 6.47128957,8.42020087 C6.55814377,8.42020087 6.64382044,8.41503512 6.7280429,8.40498711 L6.7280429,8.40498711 L6.71532174,8.42020087 L6.66787104,8.58342275 C6.46903001,9.16916934 5.99678256,9.6148461 5.2511287,9.92045302 L5.2511287,9.92045302 L5.264,9.92444444 L5.13399325,9.96823883 L5.13399325,10.5305556 L5.38254454,10.5069559 C5.79348267,10.4554555 6.18785072,10.3431166 6.56564868,10.1699394 C7.01900623,9.96212669 7.41469988,9.68504308 7.75272963,9.33868858 C8.09075938,8.99233407 8.36118319,8.58689556 8.56400104,8.12237304 C8.76681889,7.65785053 8.86822782,7.14850566 8.86822782,6.59433845 C8.86822782,6.24390918 8.81454074,5.91589109 8.70716658,5.61028417 C8.59979242,5.30467726 8.45066165,5.03574317 8.25977426,4.80348191 C8.1303499,4.64600548 7.98630029,4.51100721 7.82698814,4.39920781 C7.45364336,4.09867899 6.98289461,3.91944444 6.47128957,3.91944444 Z M12.3280618,3.91944444 C11.1150845,3.91944444 10.1317722,4.92697309 10.1317722,6.16982266 C10.1317722,7.41267223 11.1150845,8.42020087 12.3280618,8.42020087 C12.414916,8.42020087 12.5005926,8.41503512 12.5848151,8.40498711 L12.5848151,8.40498711 L12.5720939,8.42020087 L12.5246432,8.58342275 C12.3258022,9.16916934 11.8535547,9.6148461 11.1079009,9.92045302 L11.1079009,9.92045302 L11.1207722,9.92444444 L10.9907654,9.96823883 L10.9907654,10.5305556 L11.2393167,10.5069559 C11.6502549,10.4554555 12.0446229,10.3431166 12.4224209,10.1699394 C12.8757784,9.96212669 13.2714721,9.68504308 13.6095018,9.33868858 C13.9475316,8.99233407 14.2179554,8.58689556 14.4207732,8.12237304 C14.6235911,7.65785053 14.725,7.14850566 14.725,6.59433845 C14.725,6.24390918 14.6713129,5.91589109 14.5639388,5.61028417 C14.4565646,5.30467726 14.3074338,5.03574317 14.1165464,4.80348191 C13.9871221,4.64600548 13.8430725,4.51100721 13.6837603,4.39920781 C13.3104155,4.09867899 12.8396668,3.91944444 12.3280618,3.91944444 Z" id="shape-combined"/>
 93:                         </g>
 94:                     </g>
 95:                 </g>
 96:             </g>
 97:         </g>
 98:     </g>
 99: </svg>
100: )
101: 
102: const ScreenTextCloseSvg = () => (
103: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
104:     <g id="version-8-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
105:         <g id="14" transform="translate(-1329.000000, -1070.000000)">
106:             <g id="group-2backup-5" transform="translate(1069.000000, 914.000000)">
107:                 <g id="group-50backup-7" transform="translate(256.000000, 152.000000)">
108:                     <g id="group-6" transform="translate(4.000000, 4.000000)">
109:                         <rect id="rectangle" x="0" y="0" width="24" height="24"/>
110:                         <g id="group" transform="translate(2.499993, 2.249998)" fill="#B9C8EC" fill-rule="nonzero">
111:                             <path d="M0,2.80299497 L4.33229394,7.40698339 C4.29482135,7.57171616 4.27500718,7.74339958 4.27500718,7.91982481 C4.27500718,9.16267438 5.25831952,10.170203 6.47129675,10.170203 L6.60066032,10.1663642 L6.72805009,10.1549893 L6.71532893,10.170203 L6.66787823,10.3334249 C6.48711365,10.8659218 6.08039336,11.2826585 5.44771735,11.583635 L5.25113588,11.6704552 L5.26400718,11.6744466 L5.13400044,11.718241 L5.13400044,12.2805577 L5.38255173,12.2569581 C5.79348986,12.2054576 6.1878579,12.0931188 6.56565586,11.9199415 C7.01901341,11.7121288 7.41470706,11.4350452 7.75273681,11.0886907 L7.774,11.063995 L12.952,16.564995 L9.27498193,16.5657606 L5.14111826,18.6556869 C4.61969118,18.9192683 4.01122134,18.6014613 3.9031865,18.0610537 L3.88893787,17.9572063 L3.88637082,17.8893806 L3.88637082,16.5657606 L0.863643546,16.5660334 C0.448279391,16.5660334 0.101401903,16.2742138 0.0187218328,15.8853463 L0.00287011222,15.7770317 L7.18258525e-06,15.7065399 L0,2.80299497 Z M1.96427688,0.160845922 L2.04615718,0.235978631 L18.0461572,17.2359786 C18.3300445,17.5376089 18.315661,18.0122648 18.0140307,18.2961521 C17.7398213,18.5542316 17.3226156,18.5658061 17.0357375,18.3391584 L16.9538572,18.2640257 L0.953857188,1.26402568 C0.669969835,0.962395366 0.684353345,0.487739514 0.985983658,0.20385216 C1.26019303,-0.054227252 1.67739872,-0.0658018179 1.96427688,0.160845922 Z M5.874,1.74999497 L18.1363708,1.75000215 C18.5766538,1.75000215 18.9399862,2.0778862 18.9932782,2.50168264 L19.0000072,2.60949568 L19,15.695995 L14.0936936,10.4825227 C14.2173644,10.2919365 14.3263934,10.088554 14.4207804,9.8723752 C14.6235983,9.40785268 14.7250072,8.89850782 14.7250072,8.34434061 C14.7250072,7.99391134 14.6713201,7.66589325 14.5639459,7.36028633 C14.4565718,7.05467941 14.307441,6.78574532 14.1165536,6.55348407 C13.9871293,6.39600764 13.8430797,6.26100937 13.6837675,6.14920996 C13.3104227,5.84868115 12.839674,5.6694466 12.3280689,5.6694466 C11.567374,5.6694466 10.8970046,6.06570014 10.5028446,6.66774548 L5.874,1.74999497 Z" id="shape-combined"/>
112:                         </g>
113:                     </g>
114:                 </g>
115:             </g>
116:         </g>
117:     </g>
118: </svg>
119: )
120: 
121: const VoiceOpenSvg = () => (
122: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
123:     <g id="version-8-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
124:         <g id="14" transform="translate(-1279.000000, -448.000000)">
125:             <g id="group-2" transform="translate(1259.000000, 180.000000)">
126:                 <g id="group-46" transform="translate(16.000000, 264.000000)">
127:                     <g id="group-10" transform="translate(4.000000, 4.000000)">
128:                         <rect id="rectangle" x="0" y="0" width="24" height="24"/>
129:                         <g id="group" transform="translate(3.600000, 4.800000)" fill="#FFFFFF" fill-rule="nonzero">
130:                             <path d="M12,2.4 C12.6213203,2.4 13.1323525,2.87219968 13.1938045,3.47730697 L13.2,3.6 L13.2,10.8 C13.2,11.4627417 12.6627417,12 12,12 C11.3786797,12 10.8676475,11.5278003 10.8061955,10.922693 L10.8,10.8 L10.8,3.6 C10.8,2.9372583 11.3372583,2.4 12,2.4 Z" id="path" opacity="0.65"/>
131:                             <path d="M15.6,4.8 C16.2213203,4.8 16.7323525,5.27219968 16.7938045,5.87730697 L16.8,6 L16.8,8.4 C16.8,9.0627417 16.2627417,9.6 15.6,9.6 C14.9786797,9.6 14.4676475,9.12780032 14.4061955,8.52269303 L14.4,8.4 L14.4,6 C14.4,5.3372583 14.9372583,4.8 15.6,4.8 Z" id="path" opacity="0.35"/>
132:                             <path d="M4.8,2.4 C5.42132034,2.4 5.93235254,2.87219968 5.99380454,3.47730697 L6,3.6 L6,10.8 C6,11.4627417 5.4627417,12 4.8,12 C4.17867966,12 3.66764746,11.5278003 3.60619546,10.922693 L3.6,10.8 L3.6,3.6 C3.6,2.9372583 4.1372583,2.4 4.8,2.4 Z" id="path" opacity="0.65"/>
133:                             <path d="M1.2,4.8 C1.82132034,4.8 2.33235254,5.27219968 2.39380454,5.87730697 L2.4,6 L2.4,8.4 C2.4,9.0627417 1.8627417,9.6 1.2,9.6 C0.578679656,9.6 0.0676474571,9.12780032 0.00619546472,8.52269303 L0,8.4 L0,6 C0,5.3372583 0.5372583,4.8 1.2,4.8 Z" id="path" opacity="0.35"/>
134:                             <path d="M8.4,0 C9.02132034,0 9.53235254,0.472199678 9.59380454,1.07730697 L9.6,1.2 L9.6,13.2 C9.6,13.8627417 9.0627417,14.4 8.4,14.4 C7.77867966,14.4 7.26764746,13.9278003 7.20619546,13.322693 L7.2,13.2 L7.2,1.2 C7.2,0.5372583 7.7372583,0 8.4,0 Z" id="path"/>
135:                         </g>
136:                     </g>
137:                 </g>
138:             </g>
139:         </g>
140:     </g>
141: </svg>
142: )
143: 
144: export const VoiceCloseSvg = () => (
145: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
146:     <g id="version-8-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
147:         <g id="14" transform="translate(-1956.000000, -448.000000)">
148:             <g id="group-2backup-3" transform="translate(1936.000000, 180.000000)">
149:                 <g id="group-50backup-5" transform="translate(16.000000, 264.000000)">
150:                     <g id="group-9" transform="translate(4.000000, 4.000000)">
151:                         <rect id="rectangle" x="0" y="0" width="24" height="24"/>
152:                         <g id="group" transform="translate(4.000000, 1.000000)" fill="#B9C8EC" fill-rule="nonzero">
153:                             <path d="M15.0654206,9.63666666 C15.5815745,9.63666666 16,10.0585522 16,10.5789743 C15.9872693,14.7073058 12.9048071,18.1053635 8.93441215,18.5767332 L8.934,20.115 L12.2741433,20.1153846 C12.7902973,20.1153846 13.2087228,20.5372701 13.2087228,21.0576923 C13.2087228,21.5781145 12.7902973,22 12.2741433,22 L3.72585669,22 C3.20970272,22 2.79127725,21.5781145 2.79127725,21.0576923 C2.79127725,20.5372701 3.20970272,20.1153846 3.72585669,20.1153846 L7.065,20.115 L7.06558785,18.5767332 C3.09519289,18.1053635 0.0127306671,14.7073058 0,10.5789743 C0,10.0585522 0.418425467,9.63666666 0.934579439,9.63666666 C1.45073341,9.63666666 1.86915888,10.0585522 1.86915888,10.5789743 C1.86915888,13.9487729 4.54346166,16.6887895 7.86890071,16.7591275 C7.91168703,16.7510874 7.95547998,16.7479487 8,16.7479487 C8.04452002,16.7479487 8.08831297,16.7510874 8.13117307,16.7571573 L8,16.7605128 C11.3859701,16.7605128 14.1308411,13.9929438 14.1308411,10.5789743 C14.1308411,10.0585522 14.5492666,9.63666666 15.0654206,9.63666666 Z M8,-1.63424829e-13 C10.4293647,-1.63424829e-13 12.3987539,1.98567453 12.3987539,4.4351282 L12.3987539,10.6417949 C12.3987539,13.0912485 10.4293647,15.0769231 8,15.0769231 C5.57063531,15.0769231 3.60124612,13.0912485 3.60124612,10.6417949 L3.60124612,4.4351282 C3.60124612,1.98567453 5.57063531,-1.63424829e-13 8,-1.63424829e-13 Z M8,1.884 C6.62358941,1.88461538 5.50778817,3.00964344 5.50778817,4.39743589 L5.50778817,10.6041026 C5.50778817,12.0127119 6.64032646,13.1546153 8.03738318,13.1546153 C9.43443989,13.1546153 10.5669781,12.0127119 10.5669782,10.6041026 L10.5669782,4.4351282 C10.5774972,3.7489024 10.3091808,3.08819887 9.82435068,2.60647857 C9.38800355,2.1729303 8.8104571,1.91831607 8.20332137,1.88679801 L8,1.884 Z" id="shape-combined"/>
154:                         </g>
155:                     </g>
156:                 </g>
157:             </g>
158:         </g>
159:     </g>
160: </svg>
161: )
162: 
163: export const HangUp = (props: Partial<CustomIconComponentProps>) => (
164:     <Icon component={HangUpSvg} {...props} />
165: )
166: 
167: export const History = (props: Partial<CustomIconComponentProps>) => (
168:     <Icon component={HistorySvg} {...props} />
169: )
170: 
171: export const Input = (props: Partial<CustomIconComponentProps>) => (
172:     <Icon component={InputSvg} {...props} />
173: )
174: 
175: export const KeyBoard = (props: Partial<CustomIconComponentProps>) => (
176:     <Icon component={KeyBoardSvg} {...props} />
177: )
178: 
179: export const ScreenTextOpen = (props: Partial<CustomIconComponentProps>) => (
180:     <Icon component={ScreenTextOpenSvg} {...props} />
181: )
182: 
183: export const ScreenTextClose = (props: Partial<CustomIconComponentProps>) => (
184:     <Icon component={ScreenTextCloseSvg} {...props}/>
185: )
186: 
187: export const VoiceOpen =  (props: Partial<CustomIconComponentProps>) => (
188:     <Icon component={VoiceOpenSvg} {...props}/>
189: )
190: 
191: export const VoiceClose =  (props: Partial<CustomIconComponentProps>) => (
192:     <Icon component={VoiceCloseSvg} {...props}/>
193: )
````

## File: src/icons/view-window-edge.tsx
````typescript
 1: import React from 'react';
 2: import Icon from '@ant-design/icons';
 3: import type { GetProps } from 'antd';
 4: 
 5: type CustomIconComponentProps = GetProps<typeof Icon>;
 6: 
 7: const ViewWindowEdgeSvg = () => (
 8:     <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 10 10" version="1.1">
 9:     <g id="version-8-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
10:         <g id="group-14" transform="translate(-1364.000000, -914.000000)" fill="currentColor">
11:             <g id="group-2-backup-5" transform="translate(1069.000000, 914.000000)">
12:                 <g id="group-79" transform="translate(272.500000, 5.000000) scale(-1, 1) rotate(-90.000000) translate(-272.500000, -5.000000) translate(267.500000, -27.500000)">
13:                     <path d="M8,0 C9.0543618,-1.9368312e-16 9.91816512,0.815877791 9.99451426,1.85073766 L10,2 L10,2 L10,10 L8,10 L8,2 L0,2 L0,0 L8,0 Z" id="combined-shape"/>
14:                 </g>
15:             </g>
16:         </g>
17:     </g>
18: </svg>
19: )
20: 
21: const ViewWindowEdge = (props: Partial<CustomIconComponentProps>) => (
22:     <Icon component={ViewWindowEdgeSvg} {...props} />
23: )
24: 
25: export default ViewWindowEdge;
````

## File: src/lib/douyin/downloader.ts
````typescript
 1: import { parseDouyinUrl, VideoInfo } from './parser';
 2: import { httpClient } from '../../utils/http';
 3: 
 4: export interface DownloadResult {
 5:   videoUrl: string;
 6:   videoInfo: VideoInfo;
 7: }
 8: 
 9: export async function getDownloadLink(shareUrl: string): Promise<DownloadResult> {
10:   try {
11:     const videoInfo = await parseDouyinUrl(shareUrl);
12: 
13:     return {
14:       videoUrl: videoInfo.downloadUrl,
15:       videoInfo
16:     };
17:   } catch (error) {
18:     console.error('Failed to get download link:', error);
19:     throw new Error(`Failed to get download link: ${error instanceof Error ? error.message : 'Unknown error'}`);
20:   }
21: }
22: 
23: export async function downloadVideo(videoUrl: string): Promise<Buffer> {
24:   try {
25:     console.log('Starting video download:', videoUrl);
26:     const videoBuffer = await httpClient.download(videoUrl);
27:     console.log('Video download completed, size:', videoBuffer.length, 'bytes');
28:     return videoBuffer;
29:   } catch (error) {
30:     console.error('Failed to download video:', error);
31:     throw new Error(`Failed to download video: ${error instanceof Error ? error.message : 'Unknown error'}`);
32:   }
33: }
````

## File: src/lib/douyin/index.ts
````typescript
 1: import { parseDouyinUrl, VideoInfo } from './parser';
 2: import { getDownloadLink, DownloadResult } from './downloader';
 3: import { extractAudioText } from './transcriber';
 4: 
 5: export interface DouyinServiceOptions {
 6:   apiKey?: string;
 7: }
 8: 
 9: export class DouyinService {
10:   private apiKey?: string;
11: 
12:   constructor(options: DouyinServiceOptions = {}) {
13:     this.apiKey = options.apiKey;
14:   }
15: 
16:   /**
17:    * Get Douyin video's watermark-free download link
18:    */
19:   async getDownloadLink(shareUrl: string): Promise<DownloadResult> {
20:     try {
21:       return await getDownloadLink(shareUrl);
22:     } catch (error) {
23:       throw new Error(`Failed to get download link: ${error instanceof Error ? error.message : 'Unknown error'}`);
24:     }
25:   }
26: 
27:   /**
28:    * Extract text content from Douyin video (audio to text)
29:    */
30:   async extractText(shareUrl: string, model: string = 'sensevoice-v1'): Promise<string> {
31:     if (!this.apiKey) {
32:       throw new Error('Text extraction requires Alibaba Cloud Bailian API key');
33:     }
34: 
35:     try {
36:       // 1. Get video download link
37:       console.log('Starting to get video download link...');
38:       const { videoUrl } = await getDownloadLink(shareUrl);
39:       console.log('Got video download link:', videoUrl);
40: 
41:       // 2. Try to extract direct link
42:       let directUrl = videoUrl;
43:       if (videoUrl.includes('video_id=')) {
44:         const match = videoUrl.match(/video_id=([^&]+)/);
45:         if (match && match[1].startsWith('http')) {
46:           directUrl = decodeURIComponent(match[1]);
47:           console.log('Extracted direct link:', directUrl);
48:         }
49:       }
50: 
51:       // 3. Extract audio text
52:       const text = await extractAudioText(directUrl, this.apiKey, model);
53: 
54:       return text;
55:     } catch (error) {
56:       throw new Error(`Failed to extract text: ${error instanceof Error ? error.message : 'Unknown error'}`);
57:     }
58:   }
59: 
60:   /**
61:    * Parse Douyin video basic information (without downloading video file)
62:    */
63:   async getVideoInfo(shareUrl: string): Promise<VideoInfo> {
64:     try {
65:       return await parseDouyinUrl(shareUrl);
66:     } catch (error) {
67:       throw new Error(`Failed to parse video info: ${error instanceof Error ? error.message : 'Unknown error'}`);
68:     }
69:   }
70: }
71: 
72: // Export types and functions
73: export type { VideoInfo, DownloadResult };
74: export { parseDouyinUrl, getDownloadLink, extractAudioText };
````

## File: src/lib/douyin/parser.ts
````typescript
  1: import { httpClient } from '../../utils/http';
  2: 
  3: export interface VideoInfo {
  4:   videoId: string;
  5:   title: string;
  6:   author: string;
  7:   downloadUrl: string;
  8:   cover: string;
  9:   duration?: number;
 10: }
 11: 
 12: export async function parseDouyinUrl(shareText: string): Promise<VideoInfo> {
 13:   // Extract share link
 14:   const urlMatch = shareText.match(/http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/);
 15:   if (!urlMatch) {
 16:     throw new Error('No valid share link found');
 17:   }
 18: 
 19:   const shareUrl = urlMatch[0];
 20: 
 21:   try {
 22:     // Follow original Python logic: first visit share link to get redirected URL
 23:     const shareResponse = await httpClient.get(shareUrl);
 24: 
 25:     // Use fetch's response.url to get final redirected URL
 26:     const finalUrl = shareResponse.url || shareUrl;
 27:     // Follow original logic: share_response.url.split("?")[0].strip("/").split("/")[-1]
 28:     const urlWithoutParams = finalUrl.split("?")[0];
 29:     const urlWithoutTrailingSlash = urlWithoutParams.replace(/\/$/, ''); // JavaScript version of strip("/")
 30:     const urlParts = urlWithoutTrailingSlash.split("/");
 31:     const videoId = urlParts[urlParts.length - 1]; // JavaScript version of [-1]
 32: 
 33:     if (!videoId) {
 34:       throw new Error(`Unable to extract video ID from URL. Original URL: ${shareUrl}, Redirected URL: ${finalUrl}`);
 35:     }
 36: 
 37:     // Build detail URL following original logic
 38:     const detailUrl = `https://www.iesdouyin.com/share/video/${videoId}`;
 39: 
 40:     // Get video page content
 41:     const pageResponse = await httpClient.get(detailUrl);
 42:     const pageContent = pageResponse.data;
 43: 
 44:     // Parse using original regex
 45:     const pattern = new RegExp('window\\._ROUTER_DATA\\s*=\\s*(.*?)</script>', 'gs');
 46:     const dataMatch = pattern.exec(pageContent);
 47:     if (!dataMatch) {
 48:       throw new Error('Failed to parse video info from HTML');
 49:     }
 50: 
 51:     const jsonData = JSON.parse(dataMatch[1].trim());
 52: 
 53:     // Find video data following original logic
 54:     const loaderData = jsonData.loaderData;
 55:     const VIDEO_ID_PAGE_KEY = "video_(id)/page";
 56:     const NOTE_ID_PAGE_KEY = "note_(id)/page";
 57: 
 58:     let originalVideoInfo: any = null;
 59: 
 60:     if (VIDEO_ID_PAGE_KEY in loaderData) {
 61:       originalVideoInfo = loaderData[VIDEO_ID_PAGE_KEY].videoInfoRes;
 62:     } else if (NOTE_ID_PAGE_KEY in loaderData) {
 63:       originalVideoInfo = loaderData[NOTE_ID_PAGE_KEY].videoInfoRes;
 64:     } else {
 65:       throw new Error('Unable to parse video or album info from JSON');
 66:     }
 67: 
 68:     // Get data following original logic
 69:     const data = originalVideoInfo.item_list[0];
 70: 
 71:     // Debug: output video data structure
 72:     console.log('Video data structure:', JSON.stringify({
 73:       video: {
 74:         play_addr: data.video.play_addr,
 75:         download_addr: data.video.download_addr,
 76:         duration: data.video.duration
 77:       }
 78:     }, null, 2));
 79: 
 80:     // Get video info following original logic
 81:     const videoUrl = data.video.play_addr.url_list[0].replace('playwm', 'play');
 82:     const desc = data.desc?.trim() || `douyin_${videoId}`;
 83: 
 84:     // Replace illegal characters in filename (following original logic)
 85:     const title = desc.replace(/[\\/:*?"<>|]/g, '_');
 86:     const author = data.author?.nickname || 'Unknown author';
 87:     const cover = data.video.cover?.url_list?.[0] || '';
 88:     const duration = data.video?.duration || 0;
 89: 
 90:     return {
 91:       videoId,
 92:       title,
 93:       author,
 94:       downloadUrl: videoUrl,
 95:       cover,
 96:       duration: Math.floor(duration / 1000) // Convert to seconds
 97:     };
 98: 
 99:   } catch (error) {
100:     console.error('Failed to parse Douyin link:', error);
101:     throw new Error(`Failed to parse Douyin link: ${error instanceof Error ? error.message : 'Unknown error'}`);
102:   }
103: }
````

## File: src/lib/douyin/transcriber.ts
````typescript
  1: import { httpClient } from '../../utils/http';
  2: 
  3: export async function extractAudioText(
  4:   videoUrl: string,
  5:   apiKey: string,
  6:   model: string = 'paraformer-v2'
  7: ): Promise<string> {
  8:   try {
  9:     console.log('Starting audio text extraction, using video URL for direct transcription...');
 10: 
 11:     // Use async transcription API
 12:     const transcriptText = await callDashscopeAsyncAPI(videoUrl, apiKey, model);
 13: 
 14:     console.log('Audio text extraction completed');
 15:     return transcriptText;
 16: 
 17:   } catch (error) {
 18:     console.error('Failed to extract audio text:', error);
 19:     throw new Error(`Failed to extract audio text: ${error instanceof Error ? error.message : 'Unknown error'}`);
 20:   }
 21: }
 22: 
 23: async function callDashscopeAsyncAPI(
 24:   videoUrl: string,
 25:   apiKey: string,
 26:   model: string = 'sensevoice-v1'
 27: ): Promise<string> {
 28:   try {
 29:     // 1. Initiate async transcription task - Use correct SenseVoice API
 30:     console.log('Initiating SenseVoice async transcription task...');
 31:     const taskResponse = await httpClient.post(
 32:       'https://dashscope.aliyuncs.com/api/v1/services/audio/asr/transcription',
 33:       JSON.stringify({
 34:         model: 'sensevoice-v1',
 35:         input: {
 36:           file_urls: [videoUrl]
 37:         },
 38:         parameters: {
 39:           language_hints: ['zh', 'en']
 40:         }
 41:       }),
 42:       {
 43:         headers: {
 44:           'Authorization': `Bearer ${apiKey}`,
 45:           'Content-Type': 'application/json',
 46:           'X-DashScope-Async': 'enable'
 47:         }
 48:       }
 49:     );
 50: 
 51:     console.log('Task creation response:', taskResponse);
 52: 
 53:     if (!taskResponse.output || !taskResponse.output.task_id) {
 54:       throw new Error(`Failed to create transcription task: ${JSON.stringify(taskResponse)}`);
 55:     }
 56: 
 57:     const taskId = taskResponse.output.task_id;
 58:     console.log(`Task ID: ${taskId}, waiting for transcription to complete...`);
 59: 
 60:     // 2. Wait for transcription to complete
 61:     const result = await waitForTranscription(taskId, apiKey);
 62:     return result;
 63: 
 64:   } catch (error) {
 65:     console.error('Failed to call Alibaba Cloud async API:', error);
 66:     throw new Error(`Failed to call Alibaba Cloud API: ${error instanceof Error ? error.message : 'Unknown error'}`);
 67:   }
 68: }
 69: 
 70: async function waitForTranscription(
 71:   taskId: string,
 72:   apiKey: string,
 73:   maxRetries: number = 30,
 74:   retryDelay: number = 2000
 75: ): Promise<string> {
 76:   for (let i = 0; i < maxRetries; i++) {
 77:     try {
 78:       console.log(`Checking transcription status (${i + 1}/${maxRetries})...`);
 79: 
 80:       const statusResponse = await httpClient.get(
 81:         `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`,
 82:         {
 83:           headers: {
 84:             'Authorization': `Bearer ${apiKey}`
 85:           }
 86:         }
 87:       );
 88: 
 89:       console.log('Status check response:', statusResponse);
 90: 
 91:       const responseData = typeof statusResponse.data === 'string'
 92:         ? JSON.parse(statusResponse.data)
 93:         : statusResponse.data;
 94: 
 95:       if (responseData.output && responseData.output.task_status === 'SUCCEEDED') {
 96:         // Transcription completed, get results
 97:         const results = responseData.output.results;
 98:         console.log('Transcription successful, response structure:', JSON.stringify(responseData.output, null, 2));
 99: 
100:         if (results && results.length > 0) {
101:           const result = results[0];
102: 
103:           // Check different possible response structures
104:           if (result.transcription_url) {
105:             const transcriptionUrl = result.transcription_url;
106:             console.log('Get transcription result URL:', transcriptionUrl);
107: 
108:             // Download transcription result
109:             const transcriptionResult = await httpClient.get(transcriptionUrl);
110:             const transcriptionData = typeof transcriptionResult.data === 'string'
111:               ? JSON.parse(transcriptionResult.data)
112:               : transcriptionResult.data;
113: 
114:             console.log('Transcription result:', transcriptionData);
115: 
116:             if (transcriptionData.transcripts && transcriptionData.transcripts.length > 0) {
117:               return transcriptionData.transcripts[0].text;
118:             } else {
119:               return "No text content recognized";
120:             }
121:           } else if (result.text) {
122:             // Return text result directly
123:             console.log('Get text result directly:', result.text);
124:             return result.text;
125:           } else if (result.transcription) {
126:             // Another possible structure
127:             console.log('Get result from transcription field:', result.transcription);
128:             return result.transcription;
129:           } else {
130:             console.log('Unknown result structure:', JSON.stringify(result, null, 2));
131:             return "Transcription successful but unable to parse result";
132:           }
133:         }
134:       } else if (responseData.output && responseData.output.task_status === 'FAILED') {
135:         throw new Error(`Transcription task failed: ${responseData.output.message || 'Unknown error'}`);
136:       } else if (responseData.output && responseData.output.task_status === 'PENDING') {
137:         // Task still processing, continue waiting
138:         console.log('Task processing, waiting...');
139:         await new Promise(resolve => setTimeout(resolve, retryDelay));
140:         continue;
141:       } else {
142:         throw new Error(`Abnormal transcription status: ${JSON.stringify(responseData)}`);
143:       }
144: 
145:     } catch (error) {
146:       if (i === maxRetries - 1) {
147:         throw error;
148:       }
149:       console.log(`Status check failed, retrying... (${error})`);
150:       await new Promise(resolve => setTimeout(resolve, retryDelay));
151:     }
152:   }
153: 
154:   throw new Error('Transcription timeout, please try again later');
155: }
````

## File: src/lib/xiaohongshu/index.ts
````typescript
 1: import { extractXiaohongshuText } from './parser';
 2: 
 3: export interface XiaohongshuServiceOptions {
 4:   apiKey?: string;
 5: }
 6: 
 7: export class XiaohongshuService {
 8:   private apiKey?: string;
 9: 
10:   constructor(options: XiaohongshuServiceOptions = {}) {
11:     this.apiKey = options.apiKey;
12:   }
13: 
14:   /**
15:    * Extract text content from Xiaohongshu video (audio to text)
16:    */
17:   async extractText(videoUrl: string, model: string = 'sensevoice-v1'): Promise<string> {
18:     if (!this.apiKey) {
19:       throw new Error('Text extraction requires Alibaba Cloud Bailian API key');
20:     }
21: 
22:     try {
23:       console.log('Starting to extract Xiaohongshu video text:', videoUrl);
24:       const text = await extractXiaohongshuText(videoUrl, this.apiKey, model);
25:       return text;
26:     } catch (error) {
27:       console.error('Xiaohongshu text extraction failed:', error);
28:       throw error;
29:     }
30:   }
31: 
32:   /**
33:    * Validate if it's a Xiaohongshu link
34:    */
35:   static isXiaohongshuUrl(url: string): boolean {
36:     return url.includes('xiaohongshu.com') && url.includes('/explore/');
37:   }
38: 
39:   /**
40:    * Extract Xiaohongshu link from text
41:    */
42:   static extractUrlFromText(text: string): string | null {
43:     const urlPattern = /https?:\/\/[^/]*xiaohongshu\.com\/[^/]*\/explore\/[^\s?]*/i;
44:     const match = text.match(urlPattern);
45:     return match ? match[0] : null;
46:   }
47: }
48: 
49: export * from './parser';
````

## File: src/lib/xiaohongshu/parser.ts
````typescript
 1: import { extractAudioText } from '../douyin/transcriber';
 2: 
 3: /**
 4:  * Extract text content from Xiaohongshu video (audio to text)
 5:  * @param videoUrl Xiaohongshu video's real playback URL
 6:  * @param apiKey Alibaba Cloud Bailian API key
 7:  * @param model Speech recognition model
 8:  */
 9: export async function extractXiaohongshuText(
10:   videoUrl: string,
11:   apiKey: string,
12:   model: string = 'sensevoice-v1'
13: ): Promise<string> {
14:   try {
15:     console.log('Starting to extract Xiaohongshu video text, video URL:', videoUrl);
16: 
17:     // Directly use the provided real video URL to call audio to text function
18:     const text = await extractAudioText(videoUrl, apiKey, model);
19: 
20:     console.log('Xiaohongshu video text extraction completed');
21:     return text;
22: 
23:   } catch (error) {
24:     console.error('Failed to extract Xiaohongshu video text:', error);
25:     throw new Error(`Failed to extract Xiaohongshu video text: ${error instanceof Error ? error.message : 'Unknown error'}`);
26:   }
27: }
````

## File: src/lib/capture-feed.ts
````typescript
  1: // src/utils/window-capture.ts
  2: type CaptureFn = (windowNumber: number, scale?: number) => {
  3:   width: number;
  4:   height: number;
  5:   stride: number;   // Usually = width * 4
  6:   data: Uint8Array | Buffer; // RGBA or BGRA
  7: };
  8: 
  9: export interface CaptureOptions {
 10:   fps?: number;           // Default 30
 11:   scale?: number;         // Scale passed to native capture, default 1
 12:   pixelFormat?: 'rgba' | 'bgra'; // Native output pixel format, default 'rgba'
 13: }
 14: 
 15: /**
 16:  * Use native capture function to continuously capture frames, generate MediaStream, and feed directly to <video>.srcObject
 17:  * Won't use offscreen rendering/transparent/scaled window methods.
 18:  */
 19: export function createWindowCaptureStreamUsing(
 20:   captureFn: CaptureFn,
 21:   windowNumber: number,
 22:   options: CaptureOptions = {}
 23: ): MediaStream {
 24:   const fps = Math.max(1, options.fps ?? 30);
 25:   const scale = options.scale ?? 1;
 26:   const fmt = options.pixelFormat ?? 'rgba';
 27:   const interval = Math.max(5, Math.floor(1000 / fps));
 28: 
 29:   // Generate video track
 30:   // Electron(Chromium) supports MediaStreamTrackGenerator
 31:   const generator = new (window as any).MediaStreamTrackGenerator({ kind: 'video' });
 32:   const writer: WritableStreamDefaultWriter<any> = generator.writable.getWriter();
 33:   const stream = new MediaStream([generator]);
 34: 
 35:   // Reuse a canvas for copying, prefer OffscreenCanvas to avoid page reflow
 36:   const canvas: OffscreenCanvas | HTMLCanvasElement =
 37:     'OffscreenCanvas' in window ? new (window as any).OffscreenCanvas(2, 2) : (() => {
 38:       const c = document.createElement('canvas'); c.width = 2; c.height = 2; return c;
 39:     })();
 40: 
 41:   const ctx = (canvas as any).getContext('2d', { willReadFrequently: true }) as
 42:     CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
 43: 
 44:   let running = true;
 45:   let timer: any = null;
 46: 
 47:   function ensureCanvas(w: number, h: number) {
 48:     if ((canvas as any).width !== w) (canvas as any).width = w;
 49:     if ((canvas as any).height !== h) (canvas as any).height = h;
 50:   }
 51: 
 52:   // If native outputs BGRA, convert to RGBA here (ImageData requires RGBA)
 53:   function bgraToRgba(buf: Uint8ClampedArray) {
 54:     // Swap R/B: [B,G,R,A] -> [R,G,B,A]
 55:     for (let i = 0; i < buf.length; i += 4) {
 56:       const b = buf[i], r = buf[i + 2];
 57:       buf[i] = r;        // R
 58:       buf[i + 2] = b;    // B
 59:       // G, A unchanged
 60:     }
 61:     return buf;
 62:   }
 63: 
 64:   async function tick() {
 65:     if (!running) return;
 66: 
 67:     try {
 68:       const frame = await captureFn(windowNumber, scale);
 69:       const { width, height, stride } = frame;
 70:       if (!width || !height) throw new Error('empty frame');
 71: 
 72:       ensureCanvas(width, height);
 73: 
 74:       // Extract RGBA pixels
 75:       const raw = frame.data instanceof Uint8Array ? frame.data : new Uint8Array(frame.data as any);
 76:       // Usually stride = width*4; if not, underlying data has row alignment, need row-by-row copy
 77:       let rgba: Uint8ClampedArray;
 78: 
 79:       if (stride === width * 4) {
 80:         rgba = new Uint8ClampedArray(raw.buffer, raw.byteOffset, width * height * 4);
 81:       } else {
 82:         // Row alignment handling: copy valid pixels from each row to compact memory
 83:         rgba = new Uint8ClampedArray(width * height * 4);
 84:         let src = raw.byteOffset;
 85:         const srcView = new Uint8Array(raw.buffer);
 86:         let dst = 0;
 87:         for (let y = 0; y < height; y++) {
 88:           // Copy one row of valid pixels
 89:           rgba.set(srcView.subarray(src, src + width * 4), dst);
 90:           src += stride;
 91:           dst += width * 4;
 92:         }
 93:       }
 94: 
 95:       if (fmt === 'bgra') {
 96:         bgraToRgba(rgba); // Convert to RGBA
 97:       }
 98: 
 99:       // Draw to Canvas
100:       const imgData = new ImageData(rgba, width, height);
101:       (ctx as any).putImageData(imgData, 0, 0);
102: 
103:       // Use WebCodecs to generate VideoFrame and write to track
104:       // timestamp unit is microseconds (us)
105:       const vf = new (window as any).VideoFrame(canvas, { timestamp: Math.floor(performance.now() * 1000) });
106:       // Backpressure: yield when desiredSize<=0
107:       if ((writer as any).desiredSize !== undefined && (writer as any).desiredSize <= 0) {
108:         // Can drop frame or wait; here choose to drop frame to reduce latency
109:         // await new Promise(r => setTimeout(r, 0));
110:       }
111:       await writer.write(vf);
112:       vf.close();
113:     } catch (err) {
114:       console.error('[createWindowCaptureStreamUsing] capture error:', err);
115:       // Don't interrupt, continue to next frame
116:     } finally {
117:       if (running) timer = setTimeout(tick, interval);
118:     }
119:   }
120: 
121:   tick();
122: 
123:   // Provide close: attach to track.stop()
124:   const [videoTrack] = stream.getVideoTracks();
125:   const origStop = videoTrack.stop.bind(videoTrack);
126:   (videoTrack as any).stop = () => {
127:     running = false;
128:     clearTimeout(timer);
129:     try { writer.close(); } catch {}
130:     origStop();
131:   };
132: 
133:   return stream;
134: }
````

## File: src/lib/i18n.ts
````typescript
 1: import i18n from 'i18next';
 2: import { initReactI18next } from 'react-i18next';
 3: 
 4: // Import translation files
 5: import zhCN_common from '@/locales/zh-CN/common.json';
 6: import zhCN_header from '@/locales/zh-CN/header.json';
 7: import zhCN_home from '@/locales/zh-CN/home.json';
 8: import zhCN_toolbox from '@/locales/zh-CN/toolbox.json';
 9: import zhCN_agentConfig from '@/locales/zh-CN/agent-config.json';
10: import zhCN_main from '@/locales/zh-CN/main.json';
11: import zhCN_chat from '@/locales/zh-CN/chat.json';
12: import zhCN_fileView from '@/locales/zh-CN/fileView.json';
13: import zhCN_modelConfig from '@/locales/zh-CN/modelConfig.json';
14: import zhCN_history from '@/locales/zh-CN/history.json';
15: import zhCN_scheduledTask from '@/locales/zh-CN/scheduledTask.json';
16: 
17: import enUS_common from '@/locales/en-US/common.json';
18: import enUS_header from '@/locales/en-US/header.json';
19: import enUS_home from '@/locales/en-US/home.json';
20: import enUS_toolbox from '@/locales/en-US/toolbox.json';
21: import enUS_agentConfig from '@/locales/en-US/agent-config.json';
22: import enUS_main from '@/locales/en-US/main.json';
23: import enUS_chat from '@/locales/en-US/chat.json';
24: import enUS_fileView from '@/locales/en-US/fileView.json';
25: import enUS_modelConfig from '@/locales/en-US/modelConfig.json';
26: import enUS_history from '@/locales/en-US/history.json';
27: import enUS_scheduledTask from '@/locales/en-US/scheduledTask.json';
28: 
29: const resources = {
30:   'zh-CN': {
31:     common: zhCN_common,
32:     header: zhCN_header,
33:     home: zhCN_home,
34:     toolbox: zhCN_toolbox,
35:     agentConfig: zhCN_agentConfig,
36:     main: zhCN_main,
37:     chat: zhCN_chat,
38:     fileView: zhCN_fileView,
39:     modelConfig: zhCN_modelConfig,
40:     history: zhCN_history,
41:     scheduledTask: zhCN_scheduledTask,
42:   },
43:   'en-US': {
44:     common: enUS_common,
45:     header: enUS_header,
46:     home: enUS_home,
47:     toolbox: enUS_toolbox,
48:     agentConfig: enUS_agentConfig,
49:     main: enUS_main,
50:     chat: enUS_chat,
51:     fileView: enUS_fileView,
52:     modelConfig: enUS_modelConfig,
53:     history: enUS_history,
54:     scheduledTask: enUS_scheduledTask,
55:   },
56: };
57: 
58: i18n
59:   .use(initReactI18next)  // Pass i18n to react-i18next
60:   .init({
61:     resources,
62:     lng: 'en-US',           // Set initial language to English
63:     fallbackLng: 'en-US',   // Default language
64:     defaultNS: 'common',    // Default namespace
65:     interpolation: {
66:       escapeValue: false,   // React already escapes
67:     },
68:   });
69: 
70: export default i18n;
````

## File: src/lib/mcpTools.ts
````typescript
  1: interface ToolSchema {
  2:   name: string;
  3:   description: string;
  4:   inputSchema: {
  5:     type: string;
  6:     properties: Record<string, any>;
  7:     required: string[];
  8:   };
  9: }
 10: 
 11: interface ToolResult {
 12:   content: Array<{
 13:     type: string;
 14:     text?: string;
 15:     image?: string;
 16:     mimeType?: string;
 17:   }>;
 18:   extInfo?: Record<string, any>;
 19: }
 20: 
 21: type ToolHandler = (args: any, extInfo?: any) => Promise<ToolResult>;
 22: 
 23: class McpToolManager {
 24:   private tools: Map<string, ToolHandler> = new Map();
 25:   private enabledTools: Set<string> = new Set();
 26: 
 27:   constructor() {
 28:     this.registerDefaultTools();
 29:     // By default, all registered tools are enabled
 30:     this.tools.forEach((_, name) => this.enabledTools.add(name));
 31:   }
 32: 
 33:   public registerTool(name: string, handler: ToolHandler) {
 34:     this.tools.set(name, handler);
 35:     this.enabledTools.add(name); // Auto-enable new tools
 36:     console.log(`Registered tool: ${name}`);
 37:   }
 38: 
 39:   /**
 40:    * Get all registered tool names
 41:    */
 42:   public getAllToolNames(): string[] {
 43:     return Array.from(this.tools.keys());
 44:   }
 45: 
 46:   /**
 47:    * Enable a specific tool
 48:    */
 49:   public enableTool(name: string): boolean {
 50:     if (this.tools.has(name)) {
 51:       this.enabledTools.add(name);
 52:       console.log(`Enabled tool: ${name}`);
 53:       return true;
 54:     }
 55:     console.warn(`Tool not found: ${name}`);
 56:     return false;
 57:   }
 58: 
 59:   /**
 60:    * Disable a specific tool
 61:    */
 62:   public disableTool(name: string): boolean {
 63:     if (this.tools.has(name)) {
 64:       this.enabledTools.delete(name);
 65:       console.log(`Disabled tool: ${name}`);
 66:       return true;
 67:     }
 68:     console.warn(`Tool not found: ${name}`);
 69:     return false;
 70:   }
 71: 
 72:   /**
 73:    * Set tool enabled/disabled status
 74:    */
 75:   public setToolEnabled(name: string, enabled: boolean): boolean {
 76:     return enabled ? this.enableTool(name) : this.disableTool(name);
 77:   }
 78: 
 79:   /**
 80:    * Check if a tool is enabled
 81:    */
 82:   public isToolEnabled(name: string): boolean {
 83:     return this.enabledTools.has(name);
 84:   }
 85: 
 86:   /**
 87:    * Get only enabled tools
 88:    */
 89:   public getTools(): ToolSchema[] {
 90:     const toolSchemas: { [key: string]: ToolSchema } = {
 91:       get_douyin_download_link: {
 92:         name: 'get_douyin_download_link',
 93:         description: 'Get Douyin video watermark-free download link',
 94:         inputSchema: {
 95:           type: 'object',
 96:           properties: {
 97:             share_link: {
 98:               type: 'string',
 99:               description: 'Douyin share link or text containing the link'
100:             }
101:           },
102:           required: ['share_link']
103:         }
104:       },
105:       extract_xiaohongshu_text: {
106:         name: 'extract_xiaohongshu_text',
107:         description: 'Extract text content from Xiaohongshu video (audio to text). Note: Only works with video posts!',
108:         inputSchema: {
109:           type: 'object',
110:           properties: {
111:             video_url: {
112:               type: 'string',
113:               description: 'Xiaohongshu video URL'
114:             },
115:             model: {
116:               type: 'string',
117:               description: 'Speech recognition model, default is sensevoice-v1',
118:               default: 'sensevoice-v1'
119:             }
120:           },
121:           required: ['video_url']
122:         }
123:       },
124:       extract_douyin_text: {
125:         name: 'extract_douyin_text',
126:         description: 'Extract text content from Douyin video (audio to text)',
127:         inputSchema: {
128:           type: 'object',
129:           properties: {
130:             share_link: {
131:               type: 'string',
132:               description: 'Douyin share link or text containing the link'
133:             },
134:             model: {
135:               type: 'string',
136:               description: 'Speech recognition model, default is paraformer-v2',
137:               default: 'paraformer-v2'
138:             }
139:           },
140:           required: ['share_link']
141:         }
142:       },
143:       parse_douyin_video_info: {
144:         name: 'parse_douyin_video_info',
145:         description: 'Parse Douyin video basic information (without downloading video file)',
146:         inputSchema: {
147:           type: 'object',
148:           properties: {
149:             share_link: {
150:               type: 'string',
151:               description: 'Douyin share link'
152:             }
153:           },
154:           required: ['share_link']
155:         }
156:       }
157:     };
158: 
159:     const tools: ToolSchema[] = [];
160: 
161:     // Only return enabled tools
162:     this.tools.forEach((handler, name) => {
163:       if (!this.enabledTools.has(name)) {
164:         return; // Skip disabled tools
165:       }
166: 
167:       if (toolSchemas[name]) {
168:         tools.push(toolSchemas[name]);
169:       } else {
170:         // Default tool definition
171:         tools.push({
172:           name,
173:           description: `Tool: ${name}`,
174:           inputSchema: {
175:             type: 'object',
176:             properties: {},
177:             required: []
178:           }
179:         });
180:       }
181:     });
182: 
183:     return tools;
184:   }
185: 
186:   /**
187:    * Get all tools (including disabled ones) with their metadata
188:    */
189:   public getAllToolsWithStatus(): Array<ToolSchema & { enabled: boolean }> {
190:     const toolSchemas: { [key: string]: ToolSchema } = {
191:       get_douyin_download_link: {
192:         name: 'get_douyin_download_link',
193:         description: 'Get Douyin video watermark-free download link',
194:         inputSchema: {
195:           type: 'object',
196:           properties: {
197:             share_link: {
198:               type: 'string',
199:               description: 'Douyin share link or text containing the link'
200:             }
201:           },
202:           required: ['share_link']
203:         }
204:       },
205:       extract_xiaohongshu_text: {
206:         name: 'extract_xiaohongshu_text',
207:         description: 'Extract text content from Xiaohongshu video (audio to text). Note: Only works with video posts!',
208:         inputSchema: {
209:           type: 'object',
210:           properties: {
211:             video_url: {
212:               type: 'string',
213:               description: 'Xiaohongshu video URL'
214:             },
215:             model: {
216:               type: 'string',
217:               description: 'Speech recognition model, default is sensevoice-v1',
218:               default: 'sensevoice-v1'
219:             }
220:           },
221:           required: ['video_url']
222:         }
223:       },
224:       extract_douyin_text: {
225:         name: 'extract_douyin_text',
226:         description: 'Extract text content from Douyin video (audio to text)',
227:         inputSchema: {
228:           type: 'object',
229:           properties: {
230:             share_link: {
231:               type: 'string',
232:               description: 'Douyin share link or text containing the link'
233:             },
234:             model: {
235:               type: 'string',
236:               description: 'Speech recognition model, default is paraformer-v2',
237:               default: 'paraformer-v2'
238:             }
239:           },
240:           required: ['share_link']
241:         }
242:       },
243:       parse_douyin_video_info: {
244:         name: 'parse_douyin_video_info',
245:         description: 'Parse Douyin video basic information (without downloading video file)',
246:         inputSchema: {
247:           type: 'object',
248:           properties: {
249:             share_link: {
250:               type: 'string',
251:               description: 'Douyin share link'
252:             }
253:           },
254:           required: ['share_link']
255:         }
256:       }
257:     };
258: 
259:     const tools: Array<ToolSchema & { enabled: boolean }> = [];
260: 
261:     this.tools.forEach((handler, name) => {
262:       const schema = toolSchemas[name] || {
263:         name,
264:         description: `Tool: ${name}`,
265:         inputSchema: {
266:           type: 'object',
267:           properties: {},
268:           required: []
269:         }
270:       };
271: 
272:       tools.push({
273:         ...schema,
274:         enabled: this.enabledTools.has(name)
275:       });
276:     });
277: 
278:     return tools;
279:   }
280: 
281:   public async callTool(name: string, args: any, extInfo?: any): Promise<ToolResult> {
282:     const toolHandler = this.tools.get(name);
283:     if (!toolHandler) {
284:       throw new Error(`Tool not found: ${name}`);
285:     }
286: 
287:     try {
288:       const result = await toolHandler(args, extInfo);
289:       return result;
290:     } catch (error) {
291:       console.error(`Error executing tool ${name}:`, error);
292:       throw error;
293:     }
294:   }
295: 
296:   private registerDefaultTools() {
297:     // Douyin related tools
298:     this.registerTool('get_douyin_download_link', async (args: any) => {
299:       try {
300:         const response = await this.callDouyinMcp('get_douyin_download_link', args);
301:         return response;
302:       } catch (error) {
303:         return {
304:           content: [{
305:             type: 'text',
306:             text: `Failed to get Douyin download link: ${error}`
307:           }]
308:         };
309:       }
310:     });
311: 
312:     this.registerTool('extract_douyin_text', async (args: any) => {
313:       try {
314:         const response = await this.callDouyinMcp('extract_douyin_text', args);
315:         return response;
316:       } catch (error) {
317:         return {
318:           content: [{
319:             type: 'text',
320:             text: `Failed to extract Douyin text: ${error}`
321:           }]
322:         };
323:       }
324:     });
325: 
326:     this.registerTool('parse_douyin_video_info', async (args: any) => {
327:       try {
328:         const response = await this.callDouyinMcp('parse_douyin_video_info', args);
329:         return response;
330:       } catch (error) {
331:         return {
332:           content: [{
333:             type: 'text',
334:             text: `Failed to parse Douyin video info: ${error}`
335:           }]
336:         };
337:       }
338:     });
339: 
340:     // Xiaohongshu related tools
341:     this.registerTool('extract_xiaohongshu_text', async (args: any) => {
342:       try {
343:         const response = await this.callXiaohongshuMcp('extract_xiaohongshu_text', args);
344:         return response;
345:       } catch (error) {
346:         return {
347:           content: [{
348:             type: 'text',
349:             text: `Failed to extract Xiaohongshu video text: ${error}`
350:           }]
351:         };
352:       }
353:     });
354:   }
355: 
356:   // Call real douyin service
357:   private async callDouyinMcp(toolName: string, args: any): Promise<ToolResult> {
358:     const { DouyinService } = await import('./douyin');
359: 
360:     // Initialize service with Alibaba Cloud Bailian API key from environment
361:     const douyinService = new DouyinService({
362:       apiKey: process.env.BAILIAN_API_KEY || ''
363:     });
364: 
365:     console.log(`Calling real douyin service tool: ${toolName}`, args);
366: 
367:     try {
368:       if (toolName === 'get_douyin_download_link') {
369:         const result = await douyinService.getDownloadLink(args.share_link);
370:         return {
371:           content: [{
372:             type: 'text',
373:             text: `Douyin video parsed successfully!\n\nTitle: ${result.videoInfo.title}\nAuthor: ${result.videoInfo.author}\nDuration: ${result.videoInfo.duration} seconds\n\nWatermark-free download link: ${result.videoUrl}`
374:           }],
375:           extInfo: {
376:             videoInfo: result.videoInfo,
377:             downloadUrl: result.videoUrl
378:           }
379:         };
380:       }
381: 
382:       if (toolName === 'extract_douyin_text') {
383:         const text = await douyinService.extractText(args.share_link, args.model);
384:         return {
385:           content: [{
386:             type: 'text',
387:             text: `Douyin video text extraction successful!\n\nExtracted text content:\n${text}`
388:           }],
389:           extInfo: {
390:             extractedText: text,
391:             model: args.model || 'paraformer-v2'
392:           }
393:         };
394:       }
395: 
396:       if (toolName === 'parse_douyin_video_info') {
397:         const videoInfo = await douyinService.getVideoInfo(args.share_link);
398:         return {
399:           content: [{
400:             type: 'text',
401:             text: `Douyin video info parsed successfully!\n\nVideo ID: ${videoInfo.videoId}\nTitle: ${videoInfo.title}\nAuthor: ${videoInfo.author}\nDuration: ${videoInfo.duration} seconds\nCover: ${videoInfo.cover}`
402:           }],
403:           extInfo: {
404:             videoInfo
405:           }
406:         };
407:       }
408: 
409:       throw new Error(`Unknown douyin tool: ${toolName}`);
410: 
411:     } catch (error) {
412:       console.error(`Douyin service error for ${toolName}:`, error);
413:       throw error;
414:     }
415:   }
416: 
417:   // Call real xiaohongshu service
418:   private async callXiaohongshuMcp(toolName: string, args: any): Promise<ToolResult> {
419:     const { XiaohongshuService } = await import('./xiaohongshu');
420: 
421:     // Initialize service with Alibaba Cloud Bailian API key from environment
422:     const xiaohongshuService = new XiaohongshuService({
423:       apiKey: process.env.BAILIAN_API_KEY || ''
424:     });
425: 
426:     console.log(`Calling xiaohongshu service tool: ${toolName}`, args);
427: 
428:     try {
429:       if (toolName === 'extract_xiaohongshu_text') {
430:         const text = await xiaohongshuService.extractText(args.video_url, args.model);
431:         return {
432:           content: [{
433:             type: 'text',
434:             text: `Xiaohongshu video text extraction successful!\n\nExtracted text content:\n${text}`
435:           }],
436:           extInfo: {
437:             extractedText: text,
438:             model: args.model || 'sensevoice-v1'
439:           }
440:         };
441:       }
442: 
443:       throw new Error(`Unknown xiaohongshu tool: ${toolName}`);
444: 
445:     } catch (error) {
446:       console.error(`Xiaohongshu service error for ${toolName}:`, error);
447:       throw error;
448:     }
449:   }
450: }
451: 
452: // Create global instance
453: const mcpToolManager = new McpToolManager();
454: 
455: export default mcpToolManager;
456: export type { ToolSchema, ToolResult };
````

## File: src/lib/scheduled-task-storage.ts
````typescript
  1: import { ScheduledTask } from '@/models';
  2: 
  3: /**
  4:  * Scheduled task configuration storage utility class
  5:  * Based on IndexedDB for storing scheduled task configuration information
  6:  * Note: Execution history is uniformly stored in the Task table of aif10-agent database
  7:  */
  8: export class ScheduledTaskStorage {
  9:   private db: IDBDatabase | null = null;
 10:   private readonly DB_NAME = 'aif10-scheduled-tasks'; // Use independent database name
 11:   private readonly DB_VERSION = 1; // Use version 1
 12:   private readonly SCHEDULED_TASKS_STORE = 'scheduled_tasks';
 13:   private initPromise: Promise<void> | null = null; // Prevent concurrent initialization
 14: 
 15:   /**
 16:    * Initialize database connection
 17:    * Use singleton pattern to prevent conflicts from concurrent initialization
 18:    */
 19:   async init(): Promise<void> {
 20:     // If database is already open, return directly
 21:     if (this.db) {
 22:       return Promise.resolve();
 23:     }
 24: 
 25:     // If initializing, return existing Promise
 26:     if (this.initPromise) {
 27:       return this.initPromise;
 28:     }
 29: 
 30:     // Create new initialization Promise
 31:     this.initPromise = new Promise((resolve, reject) => {
 32:       const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
 33: 
 34:       request.onerror = () => {
 35:         this.initPromise = null; // Reset to allow retry
 36:         reject(new Error('Failed to open IndexedDB'));
 37:       };
 38: 
 39:       request.onsuccess = () => {
 40:         this.db = request.result;
 41: 
 42:         // Listen for unexpected close
 43:         this.db.onversionchange = () => {
 44:           console.warn('[ScheduledTaskStorage] Database version changed, closing connection');
 45:           this.db?.close();
 46:           this.db = null;
 47:           this.initPromise = null;
 48:         };
 49: 
 50:         // Listen for abnormal close
 51:         this.db.onclose = () => {
 52:           console.warn('[ScheduledTaskStorage] Database connection closed');
 53:           this.db = null;
 54:           this.initPromise = null;
 55:         };
 56: 
 57:         resolve();
 58:       };
 59: 
 60:       request.onupgradeneeded = (event) => {
 61:         const db = (event.target as IDBOpenDBRequest).result;
 62: 
 63:         // Create scheduled task configuration storage object
 64:         if (!db.objectStoreNames.contains(this.SCHEDULED_TASKS_STORE)) {
 65:           const scheduledTasksStore = db.createObjectStore(this.SCHEDULED_TASKS_STORE, { keyPath: 'id' });
 66:           scheduledTasksStore.createIndex('enabled', 'enabled', { unique: false });
 67:           scheduledTasksStore.createIndex('createdAt', 'createdAt', { unique: false });
 68:           scheduledTasksStore.createIndex('updatedAt', 'updatedAt', { unique: false });
 69:           scheduledTasksStore.createIndex('nextExecuteAt', 'nextExecuteAt', { unique: false });
 70:         }
 71:       };
 72:     });
 73: 
 74:     return this.initPromise;
 75:   }
 76: 
 77:   // ==================== Scheduled task operations ====================
 78: 
 79:   /**
 80:    * Save scheduled task
 81:    */
 82:   async saveScheduledTask(task: ScheduledTask): Promise<void> {
 83:     await this.init();
 84:     if (!this.db) throw new Error('Database not initialized');
 85: 
 86:     return new Promise((resolve, reject) => {
 87:       const transaction = this.db!.transaction([this.SCHEDULED_TASKS_STORE], 'readwrite');
 88:       const store = transaction.objectStore(this.SCHEDULED_TASKS_STORE);
 89: 
 90:       const request = store.put({
 91:         ...task,
 92:         createdAt: task.createdAt instanceof Date ? task.createdAt : new Date(task.createdAt),
 93:         updatedAt: task.updatedAt instanceof Date ? task.updatedAt : new Date(task.updatedAt),
 94:         lastExecutedAt: task.lastExecutedAt ? (task.lastExecutedAt instanceof Date ? task.lastExecutedAt : new Date(task.lastExecutedAt)) : undefined,
 95:         nextExecuteAt: task.nextExecuteAt ? (task.nextExecuteAt instanceof Date ? task.nextExecuteAt : new Date(task.nextExecuteAt)) : undefined,
 96:       });
 97: 
 98:       request.onsuccess = () => resolve();
 99:       request.onerror = () => reject(request.error);
100:     });
101:   }
102: 
103:   /**
104:    * Get single scheduled task
105:    */
106:   async getScheduledTask(taskId: string): Promise<ScheduledTask | null> {
107:     await this.init();
108:     if (!this.db) throw new Error('Database not initialized');
109: 
110:     return new Promise((resolve, reject) => {
111:       const transaction = this.db!.transaction([this.SCHEDULED_TASKS_STORE], 'readonly');
112:       const store = transaction.objectStore(this.SCHEDULED_TASKS_STORE);
113:       const request = store.get(taskId);
114: 
115:       request.onsuccess = () => {
116:         const result = request.result;
117:         if (result) {
118:           result.createdAt = new Date(result.createdAt);
119:           result.updatedAt = new Date(result.updatedAt);
120:           if (result.lastExecutedAt) result.lastExecutedAt = new Date(result.lastExecutedAt);
121:           if (result.nextExecuteAt) result.nextExecuteAt = new Date(result.nextExecuteAt);
122:         }
123:         resolve(result || null);
124:       };
125:       request.onerror = () => reject(request.error);
126:     });
127:   }
128: 
129:   /**
130:    * Get all scheduled tasks
131:    * Optimization: Use getAll() instead of cursor traversal to improve performance
132:    */
133:   async getAllScheduledTasks(): Promise<ScheduledTask[]> {
134:     await this.init();
135:     if (!this.db) throw new Error('Database not initialized');
136: 
137:     return new Promise((resolve, reject) => {
138:       const transaction = this.db!.transaction([this.SCHEDULED_TASKS_STORE], 'readonly');
139:       const store = transaction.objectStore(this.SCHEDULED_TASKS_STORE);
140: 
141:       // Use getAll() instead of cursor, faster
142:       const request = store.getAll();
143: 
144:       request.onsuccess = () => {
145:         const tasks = request.result.map((task: any) => ({
146:           ...task,
147:           createdAt: new Date(task.createdAt),
148:           updatedAt: new Date(task.updatedAt),
149:           lastExecutedAt: task.lastExecutedAt ? new Date(task.lastExecutedAt) : undefined,
150:           nextExecuteAt: task.nextExecuteAt ? new Date(task.nextExecuteAt) : undefined,
151:         }));
152: 
153:         // Sort by updatedAt in descending order
154:         tasks.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
155: 
156:         resolve(tasks);
157:       };
158:       request.onerror = () => reject(request.error);
159:     });
160:   }
161: 
162:   /**
163:    * Get all enabled scheduled tasks
164:    */
165:   async getEnabledScheduledTasks(): Promise<ScheduledTask[]> {
166:     const allTasks = await this.getAllScheduledTasks();
167:     return allTasks.filter(task => task.enabled);
168:   }
169: 
170:   /**
171:    * Delete scheduled task
172:    */
173:   async deleteScheduledTask(taskId: string): Promise<void> {
174:     await this.init();
175:     if (!this.db) throw new Error('Database not initialized');
176: 
177:     return new Promise((resolve, reject) => {
178:       const transaction = this.db!.transaction([this.SCHEDULED_TASKS_STORE], 'readwrite');
179:       const store = transaction.objectStore(this.SCHEDULED_TASKS_STORE);
180:       const request = store.delete(taskId);
181: 
182:       request.onsuccess = () => resolve();
183:       request.onerror = () => reject(request.error);
184:     });
185:   }
186: 
187:   /**
188:    * Update scheduled task
189:    */
190:   async updateScheduledTask(taskId: string, updates: Partial<ScheduledTask>): Promise<void> {
191:     const task = await this.getScheduledTask(taskId);
192:     if (!task) throw new Error(`Task ${taskId} not found`);
193: 
194:     const updatedTask: ScheduledTask = {
195:       ...task,
196:       ...updates,
197:       updatedAt: new Date(),
198:     };
199: 
200:     await this.saveScheduledTask(updatedTask);
201:   }
202: 
203:   /**
204:    * Close database connection
205:    * Note: It is not recommended to call this method manually unless you are sure the database is no longer needed
206:    * Database connection will be automatically re-established when needed
207:    */
208:   close(): void {
209:     if (this.db) {
210:       console.log('[ScheduledTaskStorage] Closing database connection');
211:       this.db.close();
212:       this.db = null;
213:       this.initPromise = null;
214:     }
215:   }
216: 
217:   /**
218:    * Check database connection status
219:    */
220:   isConnected(): boolean {
221:     return this.db !== null;
222:   }
223: }
224: 
225: // Singleton instance
226: export const scheduledTaskStorage = new ScheduledTaskStorage();
227: 
228: // Close connection on page unload (optional, IndexedDB will auto-manage)
229: if (typeof window !== 'undefined') {
230:   window.addEventListener('beforeunload', () => {
231:     scheduledTaskStorage.close();
232:   });
233: }
````

## File: src/lib/speechRecognition.ts
````typescript
 1: import { SpeechRecognitionBase, SpeechRecognitionConfig } from "@/models/speech-recognition/speech-recognition-base";
 2: import { SpeechRecognitionMicrosoft } from "@/models/speech-recognition/speech-recognition-microsoft";
 3: import { SpeechRecognitionVosk } from "@/models/speech-recognition/speech-recognition-vosk";
 4: import { SpeechRecognitionXunfei } from "@/models/speech-recognition/speech-recognition-xunfei";
 5: 
 6: 
 7: let speechRecognition: SpeechRecognitionBase | null = null;
 8: 
 9: // New initialization function, supports multiple providers
10: export function initSpeechRecognitionWithProvider(config: SpeechRecognitionConfig, onRecognized?: (text: string) => void) {
11:   const {provider} = config;
12:   switch (provider) {
13:     case 'microsoft':
14:       speechRecognition = new SpeechRecognitionMicrosoft(config, onRecognized);
15:       break;
16:     case 'xunfei':
17:       speechRecognition = new SpeechRecognitionXunfei(config, onRecognized);
18:       break;
19:     case 'vosk':
20:       speechRecognition = new SpeechRecognitionVosk(config, onRecognized);
21:       break;
22:     default:
23:       throw new Error(`Unsupported speech recognition provider: ${provider}`);
24:   }
25: }
26: 
27: // Start speech recognition
28: export async function startSpeechRecognition() {
29:   if (speechRecognition?.isRecognizing) {
30:     console.log("Speech recognition already in progress");
31:     return;
32:   }
33: 
34:   console.log(`Starting speech recognition... [${speechRecognition?.config.provider}]`);
35: 
36:   await speechRecognition?.start();
37: }
38: 
39: // Stop speech recognition
40: export async function stopSpeechRecognition() {
41:   if (!speechRecognition?.isRecognizing) {
42:     console.log("Speech recognition not in progress");
43:     return;
44:   }
45:   console.log(`Stopping speech recognition... [${speechRecognition?.config.provider}]`);
46:   await speechRecognition?.stop();
47: }
48: 
49: // Cleanup resources
50: export async function cleanupSpeechRecognition() {
51:   await speechRecognition?.cleanup();
52: }
````

## File: src/lib/taskStorage.ts
````typescript
  1: import { Task } from '@/models';
  2: 
  3: /**
  4:  * IndexedDB task storage utility class
  5:  * Database name: aif10-agent
  6:  */
  7: export class TaskStorage {
  8:   private db: IDBDatabase | null = null;
  9:   private readonly DB_NAME = 'aif10-agent';
 10:   private readonly DB_VERSION = 3; // Upgrade version to support scheduled task execution history
 11:   private readonly STORE_NAME = 'tasks';
 12: 
 13:   /**
 14:    * Initialize database connection
 15:    */
 16:   async init(): Promise<void> {
 17:     return new Promise((resolve, reject) => {
 18:       if (this.db) {
 19:         resolve();
 20:         return;
 21:       }
 22: 
 23:       const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
 24: 
 25:       request.onerror = () => {
 26:         reject(new Error('Failed to open IndexedDB'));
 27:       };
 28: 
 29:       request.onsuccess = () => {
 30:         this.db = request.result;
 31:         resolve();
 32:       };
 33: 
 34:       request.onupgradeneeded = (event) => {
 35:         const db = (event.target as IDBOpenDBRequest).result;
 36:         const oldVersion = event.oldVersion;
 37: 
 38:         // Create task storage object
 39:         if (!db.objectStoreNames.contains(this.STORE_NAME)) {
 40:           const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
 41: 
 42:           // Create basic indexes
 43:           store.createIndex('createdAt', 'createdAt', { unique: false });
 44:           store.createIndex('updatedAt', 'updatedAt', { unique: false });
 45:           store.createIndex('status', 'status', { unique: false });
 46:           store.createIndex('name', 'name', { unique: false });
 47: 
 48:           // New: indexes for scheduled task execution history
 49:           store.createIndex('taskType', 'taskType', { unique: false });
 50:           store.createIndex('scheduledTaskId', 'scheduledTaskId', { unique: false });
 51:           store.createIndex('startTime', 'startTime', { unique: false });
 52:         } else if (oldVersion < 3) {
 53:           // Version upgrade: add scheduled task related indexes
 54:           const transaction = (event.target as IDBOpenDBRequest).transaction;
 55:           const store = transaction?.objectStore(this.STORE_NAME);
 56: 
 57:           if (store && !store.indexNames.contains('taskType')) {
 58:             store.createIndex('taskType', 'taskType', { unique: false });
 59:           }
 60:           if (store && !store.indexNames.contains('scheduledTaskId')) {
 61:             store.createIndex('scheduledTaskId', 'scheduledTaskId', { unique: false });
 62:           }
 63:           if (store && !store.indexNames.contains('startTime')) {
 64:             store.createIndex('startTime', 'startTime', { unique: false });
 65:           }
 66:         }
 67:       };
 68:     });
 69:   }
 70: 
 71:   /**
 72:    * Save task
 73:    */
 74:   async saveTask(task: Task): Promise<void> {
 75:     try {
 76:       await this.init();
 77:       if (!this.db) {
 78:         throw new Error('Database not properly initialized');
 79:       }
 80: 
 81:       return new Promise((resolve, reject) => {
 82:         try {
 83:           const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
 84:           const store = transaction.objectStore(this.STORE_NAME);
 85: 
 86:           const request = store.put({
 87:             ...task,
 88:             createdAt: task.createdAt instanceof Date ? task.createdAt : new Date(task.createdAt),
 89:             updatedAt: task.updatedAt instanceof Date ? task.updatedAt : new Date(task.updatedAt),
 90:           });
 91: 
 92:           request.onsuccess = () => resolve();
 93:           request.onerror = () => reject(request.error);
 94:           transaction.onerror = () => reject(transaction.error);
 95:         } catch (error) {
 96:           reject(error);
 97:         }
 98:       });
 99:     } catch (error) {
100:       console.error('saveTask error:', error);
101:       throw error;
102:     }
103:   }
104: 
105:   /**
106:    * Get single task
107:    */
108:   async getTask(taskId: string): Promise<Task | null> {
109:     await this.init();
110:     if (!this.db) throw new Error('Database not initialized');
111: 
112:     return new Promise((resolve, reject) => {
113:       const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
114:       const store = transaction.objectStore(this.STORE_NAME);
115:       const request = store.get(taskId);
116: 
117:       request.onsuccess = () => {
118:         const result = request.result;
119:         if (result) {
120:           // Ensure date fields are properly converted
121:           result.createdAt = new Date(result.createdAt);
122:           result.updatedAt = new Date(result.updatedAt);
123:         }
124:         resolve(result || null);
125:       };
126:       request.onerror = () => reject(request.error);
127:     });
128:   }
129: 
130:   /**
131:    * Get all tasks list, sorted by update time in descending order
132:    * Optimization: Use getAll() instead of cursor traversal to improve performance and reduce transaction lock time
133:    */
134:   async getAllTasks(): Promise<Task[]> {
135:     try {
136:       await this.init();
137:       if (!this.db) {
138:         throw new Error('Database not properly initialized');
139:       }
140: 
141:       // Add timeout mechanism to prevent permanent hang
142:       return Promise.race([
143:         this._getAllTasksInternal(),
144:         this._timeout(10000, 'Get task list timeout') // 10 second timeout
145:       ]);
146:     } catch (error) {
147:       console.error('getAllTasks error:', error);
148:       // If database has issues, return empty array instead of throwing error
149:       return [];
150:     }
151:   }
152: 
153:   /**
154:    * Internal method: actually get all tasks
155:    */
156:   private _getAllTasksInternal(): Promise<Task[]> {
157:     return new Promise((resolve, reject) => {
158:       try {
159:         const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
160:         const store = transaction.objectStore(this.STORE_NAME);
161: 
162:         // Use getAll() instead of cursor, faster and shorter transaction time
163:         const request = store.getAll();
164: 
165:         request.onsuccess = () => {
166:           const tasks = request.result.map((task: any) => ({
167:             ...task,
168:             createdAt: new Date(task.createdAt),
169:             updatedAt: new Date(task.updatedAt),
170:             startTime: task.startTime ? new Date(task.startTime) : undefined,
171:             endTime: task.endTime ? new Date(task.endTime) : undefined,
172:           }));
173: 
174:           // Sort by updatedAt in descending order
175:           tasks.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
176: 
177:           resolve(tasks);
178:         };
179: 
180:         request.onerror = () => reject(request.error);
181:         transaction.onerror = () => reject(transaction.error);
182:       } catch (error) {
183:         reject(error);
184:       }
185:     });
186:   }
187: 
188:   /**
189:    * Timeout helper function
190:    */
191:   private _timeout(ms: number, message: string): Promise<never> {
192:     return new Promise((resolve, reject) => {
193:       setTimeout(() => {
194:         console.error(message);
195:         resolve([] as never);
196:       }, ms);
197:     });
198:   }
199: 
200:   /**
201:    * Get paginated task list
202:    */
203:   async getTasksPaginated(limit: number = 20, offset: number = 0): Promise<{
204:     tasks: Task[];
205:     total: number;
206:     hasMore: boolean;
207:   }> {
208:     await this.init();
209:     if (!this.db) throw new Error('Database not initialized');
210: 
211:     const [tasks, total] = await Promise.all([
212:       this.getTasksWithPagination(limit, offset),
213:       this.getTotalTasksCount()
214:     ]);
215: 
216:     return {
217:       tasks,
218:       total,
219:       hasMore: offset + limit < total
220:     };
221:   }
222: 
223:   /**
224:    * Search tasks
225:    */
226:   async searchTasks(keyword: string): Promise<Task[]> {
227:     const allTasks = await this.getAllTasks();
228:     const searchTerm = keyword.toLowerCase();
229: 
230:     return allTasks.filter(task =>
231:       task.name.toLowerCase().includes(searchTerm) ||
232:       task.id.toLowerCase().includes(searchTerm)
233:     );
234:   }
235: 
236:   /**
237:    * Delete task
238:    */
239:   async deleteTask(taskId: string): Promise<void> {
240:     await this.init();
241:     if (!this.db) throw new Error('Database not initialized');
242: 
243:     return new Promise((resolve, reject) => {
244:       const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
245:       const store = transaction.objectStore(this.STORE_NAME);
246:       const request = store.delete(taskId);
247: 
248:       request.onsuccess = () => resolve();
249:       request.onerror = () => reject(request.error);
250:     });
251:   }
252: 
253:   /**
254:    * Batch delete tasks
255:    */
256:   async deleteTasks(taskIds: string[]): Promise<void> {
257:     await this.init();
258:     if (!this.db) throw new Error('Database not initialized');
259: 
260:     return new Promise((resolve, reject) => {
261:       const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
262:       const store = transaction.objectStore(this.STORE_NAME);
263: 
264:       let completed = 0;
265:       let errors: any[] = [];
266: 
267:       taskIds.forEach(taskId => {
268:         const request = store.delete(taskId);
269:         request.onsuccess = () => {
270:           completed++;
271:           if (completed === taskIds.length) {
272:             errors.length > 0 ? reject(errors) : resolve();
273:           }
274:         };
275:         request.onerror = () => {
276:           errors.push(request.error);
277:           completed++;
278:           if (completed === taskIds.length) {
279:             reject(errors);
280:           }
281:         };
282:       });
283:     });
284:   }
285: 
286:   /**
287:    * Clear all tasks
288:    */
289:   async clearAllTasks(): Promise<void> {
290:     await this.init();
291:     if (!this.db) throw new Error('Database not initialized');
292: 
293:     return new Promise((resolve, reject) => {
294:       const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
295:       const store = transaction.objectStore(this.STORE_NAME);
296:       const request = store.clear();
297: 
298:       request.onsuccess = () => resolve();
299:       request.onerror = () => reject(request.error);
300:     });
301:   }
302: 
303:   /**
304:    * Get task statistics
305:    */
306:   async getTaskStats(): Promise<{
307:     total: number;
308:     completed: number;
309:     running: number;
310:     error: number;
311:   }> {
312:     const tasks = await this.getAllTasks();
313:     const stats = {
314:       total: tasks.length,
315:       completed: 0,
316:       running: 0,
317:       error: 0
318:     };
319: 
320:     tasks.forEach(task => {
321:       if (task.status) {
322:         stats[task.status]++;
323:       }
324:     });
325: 
326:     return stats;
327:   }
328: 
329:   /**
330:    * Private method: Get tasks with pagination
331:    */
332:   private async getTasksWithPagination(limit: number, offset: number): Promise<Task[]> {
333:     return new Promise((resolve, reject) => {
334:       const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
335:       const store = transaction.objectStore(this.STORE_NAME);
336:       const index = store.index('updatedAt');
337:       const request = index.openCursor(null, 'prev');
338: 
339:       const tasks: Task[] = [];
340:       let currentOffset = 0;
341: 
342:       request.onsuccess = () => {
343:         const cursor = request.result;
344:         if (cursor && tasks.length < limit) {
345:           if (currentOffset >= offset) {
346:             const task = cursor.value;
347:             task.createdAt = new Date(task.createdAt);
348:             task.updatedAt = new Date(task.updatedAt);
349:             tasks.push(task);
350:           }
351:           currentOffset++;
352:           cursor.continue();
353:         } else {
354:           resolve(tasks);
355:         }
356:       };
357:       request.onerror = () => reject(request.error);
358:     });
359:   }
360: 
361:   /**
362:    * Private method: Get total tasks count
363:    */
364:   private async getTotalTasksCount(): Promise<number> {
365:     return new Promise((resolve, reject) => {
366:       const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
367:       const store = transaction.objectStore(this.STORE_NAME);
368:       const request = store.count();
369: 
370:       request.onsuccess = () => resolve(request.result);
371:       request.onerror = () => reject(request.error);
372:     });
373:   }
374: 
375:   /**
376:    * Get task list by task type
377:    * Optimization: Add timeout mechanism
378:    */
379:   async getTasksByType(taskType: 'normal' | 'scheduled'): Promise<Task[]> {
380:     await this.init();
381:     if (!this.db) throw new Error('Database not initialized');
382: 
383:     return Promise.race([
384:       this._getTasksByTypeInternal(taskType),
385:       this._timeout(10000, 'Get tasks by type timeout')
386:     ]).catch((error) => {
387:       console.error('getTasksByType error:', error);
388:       return [];
389:     });
390:   }
391: 
392:   /**
393:    * Internal method: Get tasks by type
394:    */
395:   private _getTasksByTypeInternal(taskType: 'normal' | 'scheduled'): Promise<Task[]> {
396:     return new Promise((resolve, reject) => {
397:       const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
398:       const store = transaction.objectStore(this.STORE_NAME);
399:       const index = store.index('taskType');
400:       const request = index.getAll(taskType);
401: 
402:       request.onsuccess = () => {
403:         const tasks = request.result.map((task: any) => ({
404:           ...task,
405:           createdAt: new Date(task.createdAt),
406:           updatedAt: new Date(task.updatedAt),
407:           startTime: task.startTime ? new Date(task.startTime) : undefined,
408:           endTime: task.endTime ? new Date(task.endTime) : undefined,
409:         }));
410:         // Sort by updatedAt in descending order
411:         tasks.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
412:         resolve(tasks);
413:       };
414:       request.onerror = () => reject(request.error);
415:       transaction.onerror = () => reject(transaction.error);
416:     });
417:   }
418: 
419:   /**
420:    * Get all execution history of specified scheduled task
421:    * Optimization: Add timeout mechanism
422:    */
423:   async getExecutionsByScheduledTaskId(scheduledTaskId: string): Promise<Task[]> {
424:     await this.init();
425:     if (!this.db) throw new Error('Database not initialized');
426: 
427:     return Promise.race([
428:       this._getExecutionsByScheduledTaskIdInternal(scheduledTaskId),
429:       this._timeout(10000, 'Get execution history timeout')
430:     ]).catch((error) => {
431:       console.error('getExecutionsByScheduledTaskId error:', error);
432:       return [];
433:     });
434:   }
435: 
436:   /**
437:    * Internal method: Get execution history
438:    */
439:   private _getExecutionsByScheduledTaskIdInternal(scheduledTaskId: string): Promise<Task[]> {
440:     return new Promise((resolve, reject) => {
441:       const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
442:       const store = transaction.objectStore(this.STORE_NAME);
443:       const index = store.index('scheduledTaskId');
444:       const request = index.getAll(scheduledTaskId);
445: 
446:       request.onsuccess = () => {
447:         const tasks = request.result.map((task: any) => ({
448:           ...task,
449:           createdAt: new Date(task.createdAt),
450:           updatedAt: new Date(task.updatedAt),
451:           startTime: task.startTime ? new Date(task.startTime) : undefined,
452:           endTime: task.endTime ? new Date(task.endTime) : undefined,
453:         }));
454:         // Sort by startTime in descending order
455:         tasks.sort((a, b) => {
456:           const timeA = a.startTime?.getTime() || 0;
457:           const timeB = b.startTime?.getTime() || 0;
458:           return timeB - timeA;
459:         });
460:         resolve(tasks);
461:       };
462:       request.onerror = () => reject(request.error);
463:       transaction.onerror = () => reject(transaction.error);
464:     });
465:   }
466: 
467:   /**
468:    * Close database connection
469:    */
470:   close(): void {
471:     if (this.db) {
472:       this.db.close();
473:       this.db = null;
474:     }
475:   }
476: }
477: 
478: // Singleton instance
479: export const taskStorage = new TaskStorage();
````

## File: src/lib/ttsPlayer.ts
````typescript
 1: import { TTSConfig, TTSPlayerBase } from "@/models/tts-player/tts-player-base";
 2: import { TTSPlayerNative } from "@/models/tts-player/tts-player-native";
 3: import { TTSPlayerMicrosoft } from "@/models/tts-player/tts-player-microsoft";
 4: 
 5: let ttsPlayer: TTSPlayerBase | null = null;
 6: 
 7: // Initialize TTS
 8: export function initTTS(config: TTSConfig) {
 9:   switch (config.provider) {
10:     case 'native':
11:       ttsPlayer = new TTSPlayerNative(config);
12:       break;
13:     case 'microsoft':
14:       ttsPlayer = new TTSPlayerMicrosoft(config);
15:       break;
16:     default:
17:       throw new Error(`Unsupported TTS provider: ${config.provider}`);
18:   }
19: }
20: 
21: // Add error handling to main function
22: export async function queueSpeakTextOptimized(part: string, isDirect: boolean) {
23:   if (!ttsPlayer) return;
24:   return await ttsPlayer.speak(part, isDirect ? 'direct' : 'buffer');
25: }
26: 
27: // Stop playing
28: export function stopSpeaking() {
29:   if (ttsPlayer) {
30:     ttsPlayer.stop();
31:   }
32: }
````

## File: src/locales/en-US/agent-config.json
````json
 1: {
 2:   "loading": "Loading configuration...",
 3:   "back": "Back",
 4:   "reload": "Reload",
 5:   "save_configuration": "Save Configuration",
 6:   "title": "Agent Configuration",
 7:   "subtitle": "Configure AI agents and MCP tools for task execution",
 8:   "browser_agent": "Browser Agent",
 9:   "file_agent": "File Agent",
10:   "mcp_tools": "MCP Tools",
11:   "enable_browser_agent": "Enable Browser Agent",
12:   "browser_agent_desc": "Browser Agent handles web automation tasks like navigation, clicking, form filling, and content extraction.",
13:   "enable_file_agent": "Enable File Agent",
14:   "file_agent_desc": "File Agent handles file system operations like reading, writing, searching, and organizing files.",
15:   "custom_system_prompt": "Custom System Prompt",
16:   "custom_prompt_desc": "Add custom instructions to extend the Agent's capabilities. This prompt will be appended to the agent's system prompt.",
17:   "browser_prompt_placeholder": "Example: When extracting data from tables, always format the output as JSON arrays and save to file...",
18:   "file_prompt_placeholder": "Example: When creating new files, always add a header comment with creation date and author information...",
19:   "available_tools": "Available Tools",
20:   "available_tools_desc": "Enable or disable specific MCP (Model Context Protocol) tools that agents can use during task execution.",
21:   "no_tools": "No MCP tools found",
22:   "default_behaviors": "Default behaviors:",
23:   "load_error": "Failed to load configuration: ",
24:   "save_success": "Configuration saved and agents reloaded successfully!",
25:   "save_error": "Failed to save configuration",
26:   "reload_success": "Configuration reloaded",
27:   "tool_update_error": "Failed to update tool status: "
28: }
````

## File: src/locales/en-US/chat.json
````json
 1: {
 2:   "thinking": "Thinking",
 3:   "agent": "Agent",
 4:   "step_description": "Step description",
 5:   "executing_call": "Executing {{name}} call",
 6:   "input_placeholder": "Please enter your question... (Shift+Enter for new line, Enter to send)",
 7:   "send": "Send",
 8:   "ai_thinking": "AI is thinking...",
 9:   "api_error": "API Request Error",
10:   "api_error_tip": "Tip: The system will automatically retry and compress context...",
11:   "continue": "Continue",
12:   "tool_call": "Tool Call",
13:   "executing": "Executing",
14:   "execution_failed": "Execution Failed",
15:   "execution_success": "Execution Successful",
16:   "no_parameters": "No parameters",
17:   "parameters": "Parameters",
18:   "hide": "Hide",
19:   "view": "View",
20:   "call_parameters": "Call Parameters",
21:   "execution_details": "Execution Details",
22:   "return_result": "Return Result",
23:   "execute_every": "Execute every {{interval}} {{unit}}",
24:   "execution_completed": "Execution Completed",
25:   "executing_status": "Executing...",
26:   "get_page_info": "Get current page information",
27:   "click_element": "Click page element",
28:   "input_text": "Input text",
29:   "scroll_page": "Scroll page",
30:   "navigate_to": "Navigate to page",
31:   "wait_page_load": "Wait for page load",
32:   "capture_screenshot": "Capture page screenshot",
33:   "execute_tool": "Execute tool operation",
34:   "executing_tool": "Executing {{toolName}}"
35: }
````

## File: src/locales/en-US/common.json
````json
 1: {
 2:   "app_name": "DeepFundAI",
 3:   "save": "Save",
 4:   "cancel": "Cancel",
 5:   "confirm": "Confirm",
 6:   "delete": "Delete",
 7:   "edit": "Edit",
 8:   "loading": "Loading...",
 9:   "error": "Error",
10:   "success": "Success",
11:   "close": "Close",
12:   "search": "Search",
13:   "submit": "Submit",
14:   "back": "Back",
15:   "next": "Next",
16:   "previous": "Previous",
17:   "finish": "Finish"
18: }
````

## File: src/locales/en-US/fileView.json
````json
 1: {
 2:   "title": "AI Generated File Preview",
 3:   "last_updated": "Last updated: {{time}}",
 4:   "waiting_generation": "Waiting for content generation...",
 5:   "lines_words": "Lines: {{lines}} | Words: {{words}}",
 6:   "code": "Code",
 7:   "preview": "Preview",
 8:   "copy": "Copy",
 9:   "download": "Download",
10:   "copy_success": "Content copied to clipboard",
11:   "copy_failed": "Copy failed",
12:   "download_success": "File downloaded successfully",
13:   "waiting_ai": "Waiting for AI to generate content...",
14:   "no_content": "No content yet",
15:   "no_content_tip": "When AI starts generating or modifying files, content will be displayed here in real-time"
16: }
````

## File: src/locales/en-US/header.json
````json
1: {
2:   "toolbox": "Toolbox",
3:   "history": "History",
4:   "execution_history": "Execution History",
5:   "scheduled_task": "Scheduled Task"
6: }
````

## File: src/locales/en-US/history.json
````json
 1: {
 2:   "execution_history": "Execution History",
 3:   "history": "History",
 4:   "clear_history": "Clear History",
 5:   "search_placeholder": "Search task name or ID...",
 6:   "confirm_clear": "Confirm Clear",
 7:   "confirm_clear_message": "Are you sure you want to clear all history tasks? This action cannot be undone.",
 8:   "load_failed": "Failed to load history tasks",
 9:   "deleted_executions": "Deleted {{count}} execution history records for scheduled task",
10:   "task_deleted": "Task deleted",
11:   "delete_failed": "Delete failed",
12:   "history_cleared": "Execution history cleared",
13:   "tasks_cleared": "History tasks cleared",
14:   "clear_failed": "Clear failed",
15:   "opening_task_window": "Opening scheduled task window",
16:   "open_window_failed": "Failed to open scheduled task window",
17:   "switched_to_history": "Switched to history task view mode",
18:   "status_completed": "Completed",
19:   "status_running": "Running",
20:   "status_error": "Error",
21:   "status_aborted": "Aborted",
22:   "status_unknown": "Unknown",
23:   "just_now": "Just now",
24:   "minutes_ago": "{{minutes}} minutes ago",
25:   "hours_ago": "{{hours}} hours ago",
26:   "days_ago": "{{days}} days ago",
27:   "no_execution_history": "No execution history yet",
28:   "no_history_tasks": "No history tasks yet",
29:   "view_details": "View details",
30:   "delete_all_executions": "Delete all execution history",
31:   "delete_task": "Delete task",
32:   "executions_count": "{{count}} executions",
33:   "messages_count": "{{count}} messages",
34:   "readonly_mode_title": "History Session is Read-Only Mode",
35:   "readonly_mode_message": "Selecting history will enter view mode and you cannot continue the conversation temporarily...",
36:   "confirm_delete_scheduled_executions": "Are you sure you want to delete all {{count}} execution history records for this scheduled task? This action cannot be undone.",
37:   "confirm_delete_task": "Are you sure you want to delete this history task? This action cannot be undone.",
38:   "confirm_clear_execution_history": "Are you sure you want to clear all execution history for this task? This action cannot be undone.",
39:   "confirm": "Confirm",
40:   "cancel": "Cancel",
41:   "id_short": "ID",
42:   "created": "Created",
43:   "updated": "Updated",
44:   "readonly_mode_description": "Selecting history will enter view mode and you cannot continue the conversation temporarily. To continue similar tasks, click the DeepFundAI icon to create a new session."
45: }
````

## File: src/locales/en-US/home.json
````json
1: {
2:   "greeting_name": "Hi, DavidSmith",
3:   "greeting_intro": "I am Altas, a robot powered by llm. What can I do for you?",
4:   "input_placeholder": "Please enter your task"
5: }
````

## File: src/locales/en-US/main.json
````json
 1: {
 2:   "enter_question": "Please enter your question!",
 3:   "history_readonly": "History tasks are read-only mode, cannot send messages",
 4:   "task_terminated": "Task terminated",
 5:   "task_terminated_with_reason": "Task terminated: {{reason}}",
 6:   "terminate_failed": "Failed to terminate task",
 7:   "switched_to_history": "Switched to history task view mode",
 8:   "load_history_failed": "Failed to load history task",
 9:   "history_task_readonly": "(History Task - Read Only)",
10:   "input_placeholder": "Enter your question...",
11:   "history_readonly_input": "History tasks are read-only mode, cannot input new messages",
12:   "atlas_computer": "Atlas's Computer",
13:   "atlas_using_tool": "Atlas is using tool",
14:   "running": "Running",
15:   "completed": "Completed",
16:   "execution_error": "Execution Error",
17:   "realtime": "Real-time",
18:   "task_execution_completed": "Task execution completed",
19:   "failed_update_task_status": "Failed to update task status",
20:   "no_task_running": "No task currently running",
21:   "failed_send_message": "Failed to send message",
22:   "tool_operations": {
23:     "browsing_web_page": "Browsing web page",
24:     "writing_file": "Writing file",
25:     "reading_file": "Reading file",
26:     "searching": "Searching",
27:     "executing": "Executing {{toolName}}"
28:   }
29: }
````

## File: src/locales/en-US/modelConfig.json
````json
 1: {
 2:   "api_key": "{{provider}} API Key:",
 3:   "set_via_env": "Set via environment variable",
 4:   "set_by_user": "Set by user",
 5:   "not_configured": "Not configured",
 6:   "enter_api_key": "Enter your API Key",
 7:   "edit_api_key": "Edit API Key",
 8:   "get_api_key": "Get API Key",
 9:   "model_updated": "Model updated",
10:   "update_failed": "Failed to update model",
11:   "api_key_empty": "API Key cannot be empty",
12:   "api_key_saved": "API Key saved",
13:   "save_failed": "Failed to save API Key",
14:   "provider_change_failed": "Failed to change provider"
15: }
````

## File: src/locales/en-US/scheduledTask.json
````json
 1: {
 2:   "add_step_required": "Please add at least one task step",
 3:   "complete_step_info": "Please fill in complete step information",
 4:   "task_updated": "Task updated successfully",
 5:   "task_created": "Task created successfully",
 6:   "operation_failed": "Operation failed",
 7:   "edit_task": "Edit scheduled task",
 8:   "create_task": "Create scheduled task",
 9:   "task_name": "Task name",
10:   "enter_task_name": "Please enter task name",
11:   "task_description": "Task description (optional)",
12:   "enter_task_description": "Please enter task description",
13:   "task_steps": "Task steps",
14:   "schedule_config": "Schedule configuration",
15:   "configure_interval": "Please configure execution interval",
16:   "enable_on_create": "Enable immediately after creation",
17:   "task_list": "Scheduled task list",
18:   "new_task": "New task",
19:   "no_tasks": "No scheduled tasks yet",
20:   "create_first_task": "Create first task",
21:   "task_deleted_success": "Task deleted successfully",
22:   "task_started": "Task has started executing",
23:   "execution_failed": "Execution failed",
24:   "opening_history": "Opening execution history",
25:   "open_history_failed": "Failed to open execution history",
26:   "enabled": "Enabled",
27:   "disabled": "Disabled",
28:   "enable": "Enable",
29:   "disable": "Disable",
30:   "last_executed": "Last executed: {{time}}",
31:   "never_executed": "Never executed",
32:   "steps_count": "Steps: {{count}}",
33:   "every_minutes": "Every {{count}} minutes",
34:   "every_hours": "Every {{count}} hours",
35:   "every_days": "Every {{count}} days",
36:   "cron": "Cron",
37:   "execute_now": "Execute now",
38:   "execution_history": "Execution history",
39:   "edit": "Edit",
40:   "delete": "Delete",
41:   "confirm_deletion": "Confirm deletion",
42:   "confirm_deletion_message": "Once deleted, it cannot be recovered. Are you sure you want to delete this task?",
43:   "manual_add_step": "Manual add step",
44:   "import_from_template": "Import from API template",
45:   "no_steps": "No steps yet, please add task steps",
46:   "step_name": "Step name",
47:   "step_description": "Step description (will be part of the prompt)",
48:   "select_template": "Select task template",
49:   "contains_steps": "Contains {{count}} steps",
50:   "select": "Select",
51:   "schedule_type": "Schedule type",
52:   "interval_time": "Interval time",
53:   "cron_expression": "Cron expression (not supported yet)",
54:   "execution_interval": "Execution interval",
55:   "every": "Every",
56:   "execute_once": "execute once",
57:   "cron_expression_label": "Cron expression",
58:   "cron_example": "Example: 0 0 * * * (every day at 0:00)",
59:   "cron_not_supported": "Cron expression not supported yet, stay tuned",
60:   "minutes": "minutes",
61:   "hours": "hours",
62:   "days": "days",
63:   "execution_rule": "Execution rule:",
64:   "execute_every_interval": "Execute every {{interval}} {{unit}}",
65:   "execute_by_cron": "Execute based on Cron expression",
66:   "scheduled_tasks": "Scheduled Tasks",
67:   "last": "Last: {{time}}",
68:   "history": "History",
69:   "save": "Save",
70:   "create_and_enable": "Create and enable",
71:   "cancel": "Cancel",
72:   "delete_failed": "Delete failed",
73:   "unknown": "Unknown"
74: }
````

## File: src/locales/en-US/toolbox.json
````json
 1: {
 2:   "back_to_home": "Back to Home",
 3:   "title": "🔧 Toolbox",
 4:   "subtitle": "Access all system features and configuration options. Click on any card to open the corresponding tool.",
 5:   "coming_soon": "Coming Soon",
 6:   "coming_soon_title": "Coming Soon",
 7:   "agent_config_title": "Agent Configuration",
 8:   "agent_config_desc": "Configure AI agents and MCP tools for task execution. Customize agent behavior and enable/disable specific tools.",
 9:   "scheduled_tasks_title": "Scheduled Tasks",
10:   "scheduled_tasks_desc": "Create and manage automated recurring tasks. Set up schedules, monitor execution status, and view task history.",
11:   "system_settings_title": "System Settings",
12:   "system_settings_desc": "Configure application preferences, appearance, performance options, and other system-level settings.",
13:   "system_settings_coming_soon": "System settings feature is under development. Stay tuned for updates!",
14:   "tools_marketplace_title": "Tools Marketplace",
15:   "tools_marketplace_desc": "Browse and install additional MCP tools and plugins. Extend your agent capabilities with community tools.",
16:   "tools_marketplace_coming_soon": "Tools marketplace is under development. We will launch it soon with amazing tools!",
17:   "workflow_templates_title": "Workflow Templates",
18:   "workflow_templates_desc": "Pre-built automation workflows for common tasks. Save time with ready-to-use task templates.",
19:   "workflow_templates_coming_soon": "Workflow templates feature is under development. Coming soon with powerful automation!"
20: }
````

## File: src/locales/zh-CN/agent-config.json
````json
 1: {
 2:   "loading": "加载配置中...",
 3:   "back": "返回",
 4:   "reload": "重新加载",
 5:   "save_configuration": "保存配置",
 6:   "title": "Agent 配置",
 7:   "subtitle": "配置 AI 代理和 MCP 工具以执行任务",
 8:   "browser_agent": "浏览器 Agent",
 9:   "file_agent": "文件 Agent",
10:   "mcp_tools": "MCP 工具",
11:   "enable_browser_agent": "启用浏览器 Agent",
12:   "browser_agent_desc": "浏览器 Agent 处理网页自动化任务，如导航、点击、表单填充和内容提取。",
13:   "enable_file_agent": "启用文件 Agent",
14:   "file_agent_desc": "文件 Agent 处理文件系统操作，如读取、写入、搜索和组织文件。",
15:   "custom_system_prompt": "自定义系统提示词",
16:   "custom_prompt_desc": "添加自定义指令以扩展 Agent 的功能。此提示词将附加到 Agent 的系统提示词中。",
17:   "browser_prompt_placeholder": "示例：从表格提取数据时，始终将输出格式化为 JSON 数组并保存到文件...",
18:   "file_prompt_placeholder": "示例：创建新文件时，始终添加包含创建日期和作者信息的标题注释...",
19:   "available_tools": "可用工具",
20:   "available_tools_desc": "启用或禁用代理在任务执行期间可以使用的特定 MCP（模型上下文协议）工具。",
21:   "no_tools": "未找到 MCP 工具",
22:   "default_behaviors": "默认行为：",
23:   "load_error": "加载配置失败：",
24:   "save_success": "配置已保存并成功重新加载 Agent！",
25:   "save_error": "保存配置失败",
26:   "reload_success": "配置已重新加载",
27:   "tool_update_error": "更新工具状态失败："
28: }
````

## File: src/locales/zh-CN/chat.json
````json
 1: {
 2:   "thinking": "思考中",
 3:   "agent": "Agent",
 4:   "step_description": "步骤描述",
 5:   "executing_call": "执行 {{name}} 调用",
 6:   "input_placeholder": "请输入您的问题...（Shift+Enter 换行，Enter 发送）",
 7:   "send": "发送",
 8:   "ai_thinking": "AI 正在思考...",
 9:   "api_error": "API 请求错误",
10:   "api_error_tip": "提示：系统将自动重试并压缩上下文...",
11:   "continue": "继续",
12:   "tool_call": "工具调用",
13:   "executing": "执行中",
14:   "execution_failed": "执行失败",
15:   "execution_success": "执行成功",
16:   "no_parameters": "无参数",
17:   "parameters": "参数",
18:   "hide": "隐藏",
19:   "view": "查看",
20:   "call_parameters": "调用参数",
21:   "execution_details": "执行详情",
22:   "return_result": "返回结果",
23:   "execute_every": "每 {{interval}} {{unit}} 执行一次",
24:   "execution_completed": "执行完成",
25:   "executing_status": "执行中...",
26:   "get_page_info": "获取当前页面信息",
27:   "click_element": "点击页面元素",
28:   "input_text": "输入文本",
29:   "scroll_page": "滚动页面",
30:   "navigate_to": "导航到页面",
31:   "wait_page_load": "等待页面加载",
32:   "capture_screenshot": "捕获页面截图",
33:   "execute_tool": "执行工具操作",
34:   "executing_tool": "正在执行 {{toolName}}"
35: }
````

## File: src/locales/zh-CN/common.json
````json
 1: {
 2:   "app_name": "DeepFundAI",
 3:   "save": "保存",
 4:   "cancel": "取消",
 5:   "confirm": "确认",
 6:   "delete": "删除",
 7:   "edit": "编辑",
 8:   "loading": "加载中...",
 9:   "error": "错误",
10:   "success": "成功",
11:   "close": "关闭",
12:   "search": "搜索",
13:   "submit": "提交",
14:   "back": "返回",
15:   "next": "下一步",
16:   "previous": "上一步",
17:   "finish": "完成",
18:   "reload": "重新加载"
19: }
````

## File: src/locales/zh-CN/fileView.json
````json
 1: {
 2:   "title": "AI 生成文件预览",
 3:   "last_updated": "最后更新：{{time}}",
 4:   "waiting_generation": "等待内容生成...",
 5:   "lines_words": "行数：{{lines}} | 字数：{{words}}",
 6:   "code": "代码",
 7:   "preview": "预览",
 8:   "copy": "复制",
 9:   "download": "下载",
10:   "copy_success": "内容已复制到剪贴板",
11:   "copy_failed": "复制失败",
12:   "download_success": "文件下载成功",
13:   "waiting_ai": "等待 AI 生成内容...",
14:   "no_content": "暂无内容",
15:   "no_content_tip": "当 AI 开始生成或修改文件时，内容将实时显示在这里"
16: }
````

## File: src/locales/zh-CN/header.json
````json
1: {
2:   "toolbox": "工具箱",
3:   "history": "历史记录",
4:   "execution_history": "执行历史",
5:   "scheduled_task": "定时任务"
6: }
````

## File: src/locales/zh-CN/history.json
````json
 1: {
 2:   "execution_history": "执行历史",
 3:   "history": "历史记录",
 4:   "clear_history": "清空历史",
 5:   "search_placeholder": "搜索任务名称或 ID...",
 6:   "confirm_clear": "确认清空",
 7:   "confirm_clear_message": "确定要清空所有历史任务吗？此操作无法撤销。",
 8:   "load_failed": "加载历史任务失败",
 9:   "deleted_executions": "已删除定时任务的 {{count}} 条执行历史记录",
10:   "task_deleted": "任务已删除",
11:   "delete_failed": "删除失败",
12:   "history_cleared": "执行历史已清空",
13:   "tasks_cleared": "历史任务已清空",
14:   "clear_failed": "清空失败",
15:   "opening_task_window": "正在打开定时任务窗口",
16:   "open_window_failed": "打开定时任务窗口失败",
17:   "switched_to_history": "已切换到历史任务查看模式",
18:   "status_completed": "已完成",
19:   "status_running": "运行中",
20:   "status_error": "错误",
21:   "status_aborted": "已中止",
22:   "status_unknown": "未知",
23:   "just_now": "刚刚",
24:   "minutes_ago": "{{minutes}} 分钟前",
25:   "hours_ago": "{{hours}} 小时前",
26:   "days_ago": "{{days}} 天前",
27:   "no_execution_history": "暂无执行历史",
28:   "no_history_tasks": "暂无历史任务",
29:   "view_details": "查看详情",
30:   "delete_all_executions": "删除所有执行历史",
31:   "delete_task": "删除任务",
32:   "executions_count": "{{count}} 次执行",
33:   "messages_count": "{{count}} 条消息",
34:   "readonly_mode_title": "历史会话为只读模式",
35:   "readonly_mode_message": "选择历史记录将进入查看模式，暂时无法继续对话...",
36:   "confirm_delete_scheduled_executions": "确定要删除此定时任务的所有 {{count}} 条执行历史记录吗？此操作无法撤销。",
37:   "confirm_delete_task": "确定要删除这条历史任务吗？此操作无法撤销。",
38:   "confirm_clear_execution_history": "确定要清空此任务的所有执行历史吗？此操作无法撤销。",
39:   "confirm": "确认",
40:   "cancel": "取消",
41:   "id_short": "ID",
42:   "created": "创建",
43:   "updated": "更新",
44:   "readonly_mode_description": "选择历史记录将进入查看模式，暂时无法继续对话。要继续类似任务，请点击 DeepFundAI 图标创建新会话。"
45: }
````

## File: src/locales/zh-CN/home.json
````json
1: {
2:   "greeting_name": "Hi, DavidSmith",
3:   "greeting_intro": "我是 Altas，一个由大语言模型驱动的机器人。我能为您做什么？",
4:   "input_placeholder": "请输入您的任务"
5: }
````

## File: src/locales/zh-CN/main.json
````json
 1: {
 2:   "enter_question": "请输入您的问题！",
 3:   "history_readonly": "历史任务为只读模式，无法发送消息",
 4:   "task_terminated": "任务已终止",
 5:   "task_terminated_with_reason": "任务已终止：{{reason}}",
 6:   "terminate_failed": "终止任务失败",
 7:   "switched_to_history": "已切换到历史任务查看模式",
 8:   "load_history_failed": "加载历史任务失败",
 9:   "history_task_readonly": "（历史任务 - 只读）",
10:   "input_placeholder": "输入您的问题...",
11:   "history_readonly_input": "历史任务为只读模式，无法输入新消息",
12:   "atlas_computer": "Atlas 的计算机",
13:   "atlas_using_tool": "Atlas 正在使用工具",
14:   "running": "运行中",
15:   "completed": "已完成",
16:   "execution_error": "执行错误",
17:   "realtime": "实时",
18:   "task_execution_completed": "任务执行完成",
19:   "failed_update_task_status": "更新任务状态失败",
20:   "no_task_running": "当前没有正在运行的任务",
21:   "failed_send_message": "发送消息失败",
22:   "tool_operations": {
23:     "browsing_web_page": "浏览网页",
24:     "writing_file": "写入文件",
25:     "reading_file": "读取文件",
26:     "searching": "搜索中",
27:     "executing": "正在执行 {{toolName}}"
28:   }
29: }
````

## File: src/locales/zh-CN/modelConfig.json
````json
 1: {
 2:   "api_key": "{{provider}} API Key：",
 3:   "set_via_env": "通过环境变量设置",
 4:   "set_by_user": "由用户设置",
 5:   "not_configured": "未配置",
 6:   "enter_api_key": "输入您的 API Key",
 7:   "edit_api_key": "编辑 API Key",
 8:   "get_api_key": "获取 API Key",
 9:   "model_updated": "模型已更新",
10:   "update_failed": "更新模型失败",
11:   "api_key_empty": "API Key 不能为空",
12:   "api_key_saved": "API Key 已保存",
13:   "save_failed": "保存 API Key 失败",
14:   "provider_change_failed": "切换提供商失败"
15: }
````

## File: src/locales/zh-CN/scheduledTask.json
````json
 1: {
 2:   "add_step_required": "请至少添加一个任务步骤",
 3:   "complete_step_info": "请填写完整的步骤信息",
 4:   "task_updated": "任务更新成功",
 5:   "task_created": "任务创建成功",
 6:   "operation_failed": "操作失败",
 7:   "edit_task": "编辑定时任务",
 8:   "create_task": "创建定时任务",
 9:   "task_name": "任务名称",
10:   "enter_task_name": "请输入任务名称",
11:   "task_description": "任务描述（可选）",
12:   "enter_task_description": "请输入任务描述",
13:   "task_steps": "任务步骤",
14:   "schedule_config": "定时配置",
15:   "configure_interval": "请配置执行间隔",
16:   "enable_on_create": "创建后立即启用",
17:   "task_list": "定时任务列表",
18:   "new_task": "新建任务",
19:   "no_tasks": "暂无定时任务",
20:   "create_first_task": "创建第一个任务",
21:   "task_deleted_success": "任务删除成功",
22:   "task_started": "任务已开始执行",
23:   "execution_failed": "执行失败",
24:   "opening_history": "正在打开执行历史",
25:   "open_history_failed": "打开执行历史失败",
26:   "enabled": "已启用",
27:   "disabled": "已禁用",
28:   "enable": "启用",
29:   "disable": "禁用",
30:   "last_executed": "上次执行：{{time}}",
31:   "never_executed": "从未执行",
32:   "steps_count": "步骤：{{count}}",
33:   "every_minutes": "每 {{count}} 分钟",
34:   "every_hours": "每 {{count}} 小时",
35:   "every_days": "每 {{count}} 天",
36:   "cron": "Cron",
37:   "execute_now": "立即执行",
38:   "execution_history": "执行历史",
39:   "edit": "编辑",
40:   "delete": "删除",
41:   "confirm_deletion": "确认删除",
42:   "confirm_deletion_message": "删除后将无法恢复，确定要删除此任务吗？",
43:   "manual_add_step": "手动添加步骤",
44:   "import_from_template": "从 API 模板导入",
45:   "no_steps": "暂无步骤，请添加任务步骤",
46:   "step_name": "步骤名称",
47:   "step_description": "步骤描述（将作为 prompt 的一部分）",
48:   "select_template": "选择任务模板",
49:   "contains_steps": "包含 {{count}} 个步骤",
50:   "select": "选择",
51:   "schedule_type": "定时类型",
52:   "interval_time": "间隔时间",
53:   "cron_expression": "Cron 表达式（暂不支持）",
54:   "execution_interval": "执行间隔",
55:   "every": "每",
56:   "execute_once": "执行一次",
57:   "cron_expression_label": "Cron 表达式",
58:   "cron_example": "示例：0 0 * * *（每天 0 点执行）",
59:   "cron_not_supported": "暂不支持 Cron 表达式，敬请期待",
60:   "minutes": "分钟",
61:   "hours": "小时",
62:   "days": "天",
63:   "execution_rule": "执行规则：",
64:   "execute_every_interval": "每 {{interval}} {{unit}} 执行一次",
65:   "execute_by_cron": "根据 Cron 表达式执行",
66:   "scheduled_tasks": "定时任务",
67:   "last": "上次：{{time}}",
68:   "history": "历史",
69:   "save": "保存",
70:   "create_and_enable": "创建并启用",
71:   "cancel": "取消",
72:   "delete_failed": "删除失败",
73:   "unknown": "未知"
74: }
````

## File: src/locales/zh-CN/toolbox.json
````json
 1: {
 2:   "back_to_home": "返回首页",
 3:   "title": "🔧 工具箱",
 4:   "subtitle": "访问所有系统功能和配置选项。点击任意卡片打开相应的工具。",
 5:   "coming_soon": "即将推出",
 6:   "coming_soon_title": "即将推出",
 7:   "agent_config_title": "Agent 配置",
 8:   "agent_config_desc": "配置 AI 代理和 MCP 工具以执行任务。自定义代理行为并启用/禁用特定工具。",
 9:   "scheduled_tasks_title": "定时任务",
10:   "scheduled_tasks_desc": "创建和管理自动化的定期任务。设置计划、监控执行状态并查看任务历史记录。",
11:   "system_settings_title": "系统设置",
12:   "system_settings_desc": "配置应用程序首选项、外观、性能选项和其他系统级设置。",
13:   "system_settings_coming_soon": "系统设置功能正在开发中。敬请期待更新！",
14:   "tools_marketplace_title": "工具市场",
15:   "tools_marketplace_desc": "浏览和安装额外的 MCP 工具和插件。使用社区工具扩展您的代理功能。",
16:   "tools_marketplace_coming_soon": "工具市场正在开发中。我们即将推出令人惊叹的工具！",
17:   "workflow_templates_title": "工作流模板",
18:   "workflow_templates_desc": "适用于常见任务的预建自动化工作流。使用即用型任务模板节省时间。",
19:   "workflow_templates_coming_soon": "工作流模板功能正在开发中。即将推出强大的自动化功能！"
20: }
````

## File: src/models/speech-recognition/speech-recognition-base.ts
````typescript
 1: // Speech recognition provider type
 2: export type SpeechProvider = 'microsoft' | 'xunfei' | 'vosk';
 3: 
 4: // Configuration interface
 5: export interface SpeechRecognitionConfig {
 6:     provider: SpeechProvider;
 7:     apiKey?: string;
 8:     region?: string;
 9:     appId?: string;
10:     apiSecret?: string;
11:     xfApiKey?: string;
12:     modelType?: 'small-cn' | 'standard-cn';
13: }
14: 
15: export interface SpeechRecognitionError {
16:     message: string;
17:     code: number;
18: }
19: 
20: export interface SpeechRecognitionBase {
21:     config: SpeechRecognitionConfig;
22:     isRecognizing: boolean;
23:     start(): Promise<void>;
24:     stop(): Promise<void>;
25:     cleanup(): Promise<void>;
26: }
````

## File: src/models/speech-recognition/speech-recognition-microsoft.ts
````typescript
 1: import { SpeechRecognitionBase, SpeechRecognitionConfig } from "./speech-recognition-base";
 2: import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
 3: 
 4: export class SpeechRecognitionMicrosoft implements SpeechRecognitionBase {
 5:     config: SpeechRecognitionConfig;
 6:     private recognizer: SpeechSDK.SpeechRecognizer;
 7:     isRecognizing: boolean = false;
 8:     constructor(config: SpeechRecognitionConfig, onRecognizedCallback?: (text: string) => void) {
 9:         this.config = config;
10:         const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(config.apiKey!, config.region!);
11:         speechConfig.speechRecognitionLanguage = "zh-CN";
12: 
13:         const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
14:         this.recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
15: 
16:         // Set event handlers
17:         this.recognizer.recognizing = (s, e) => {
18:             console.log(`[Microsoft] Speech recognizing: ${e.result.text}`);
19:         };
20: 
21:         this.recognizer.recognized = (s, e) => {
22:             if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
23:                 console.log(`[Microsoft] Speech recognition result: ${e.result.text}`);
24:                 if (onRecognizedCallback && e.result.text.trim()) {
25:                     onRecognizedCallback(e.result.text);
26:                 }
27:             } else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
28:                 console.log("[Microsoft] No speech content recognized");
29:             }
30:         };
31: 
32:         this.recognizer.canceled = (s, e) => {
33:             console.log(`[Microsoft] Speech recognition canceled: ${e.reason}`);
34:             if (e.reason === SpeechSDK.CancellationReason.Error) {
35:                 console.error(`[Microsoft] Speech recognition error: ${e.errorDetails}`);
36:             }
37:             this.isRecognizing = false;
38:         };
39: 
40:         this.recognizer.sessionStopped = (s, e) => {
41:             console.log("[Microsoft] Speech recognition session stopped");
42:             this.isRecognizing = false;
43:         };
44:     }
45: 
46:     async start(): Promise<void> {
47:         return new Promise((resolve, reject) => {
48:         if (!this.recognizer) {
49:             console.error("[Microsoft] Speech recognizer not initialized");
50:             this.isRecognizing = false;
51:             reject(new Error("[Microsoft] Speech recognizer not initialized"));
52:         }
53: 
54:         this.recognizer.startContinuousRecognitionAsync(
55:             () => {
56:                 console.log("[Microsoft] Speech recognition started");
57:                 resolve();
58:             },
59:             (error) => {
60:                 console.error("[Microsoft] Failed to start speech recognition:", error);
61:                 this.isRecognizing = false;
62:                 reject(error);
63:             }
64:         );
65:     });
66:     }
67: 
68:     async stop(): Promise<void> {
69:      return new Promise((resolve, reject) => {
70:         if (!this.recognizer) {
71:             console.error("[Microsoft] Speech recognizer not initialized");
72:             reject(new Error("[Microsoft] Speech recognizer not initialized"));
73:           }
74: 
75:           this.recognizer.stopContinuousRecognitionAsync(
76:             () => {
77:               console.log("[Microsoft] Speech recognition stopped");
78:               this.isRecognizing = false;
79:               resolve();
80:             },
81:             (error) => {
82:               console.error("[Microsoft] Failed to stop speech recognition:", error);
83:               this.isRecognizing = false;
84:               reject(error);
85:             }
86:           );
87:         });
88:     }
89: 
90:     async cleanup(): Promise<void> {
91:         if (this.isRecognizing) {
92:             await this.stop();
93:         }
94:         this.recognizer.close();
95:     }
96: }
````

## File: src/models/speech-recognition/speech-recognition-vosk.ts
````typescript
  1: import { SpeechRecognitionBase, SpeechRecognitionConfig } from "./speech-recognition-base";
  2: 
  3: // Model configuration
  4: const MODEL_CONFIG = {
  5:     'small-cn': '/models/vosk-model-small-cn-0.22.tar.gz',
  6:     'standard-cn': '/models/vosk-model-cn-0.22.tar.gz'
  7: } as const;
  8: 
  9: // Audio configuration
 10: const AUDIO_CONFIG = {
 11:     sampleRate: 16000, // Vosk recommended sample rate
 12:     channelCount: 1,
 13:     bufferSize: 4096
 14: } as const;
 15: 
 16: export class SpeechRecognitionVosk implements SpeechRecognitionBase {
 17:     config: SpeechRecognitionConfig;
 18:     isRecognizing: boolean = false;
 19:     private onRecognizedCallback?: (text: string) => void;
 20:     private model: any;
 21:     private recognizer: any;
 22:     private audioContext: AudioContext;
 23:     private scriptProcessor: ScriptProcessorNode;
 24:     private mediaStream: MediaStream;
 25: 
 26:     constructor(config: SpeechRecognitionConfig, onRecognizedCallback?: (text: string) => void) {
 27:         this.onRecognizedCallback = onRecognizedCallback;
 28:         this.config = config;
 29:         this.init();
 30:     }
 31: 
 32:     async init(): Promise<void> {
 33:         try {
 34:             console.log('🎤 Initializing frontend offline speech recognition...');
 35: 
 36:             // 1. Load vosk-browser library
 37:             const libraryLoaded = await this.loadVoskLibrary();
 38:             if (!libraryLoaded) {
 39:                 console.error('❌ vosk-browser library loading failed');
 40:                 return;
 41:             }
 42: 
 43:             // 2. Check browser support
 44:             if (!('AudioContext' in window) && !('webkitAudioContext' in window)) {
 45:                 console.error('❌ Browser does not support AudioContext');
 46:                 return;
 47:             }
 48: 
 49:             if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
 50:                 console.error('❌ Browser does not support getUserMedia');
 51:                 return;
 52:             }
 53: 
 54:             // 3. Load model
 55:             const modelPath = MODEL_CONFIG[this.config.modelType || 'small-cn'];
 56:             console.log(`🎤 Loading speech model: ${modelPath}`);
 57: 
 58:             // Ensure Vosk is globally available
 59:             const Vosk = (window as any).Vosk;
 60:             if (!Vosk) {
 61:                 console.error('❌ Vosk object not available');
 62:                 return;
 63:             }
 64: 
 65:             this.model = await Vosk.createModel(modelPath);
 66: 
 67:             if (!this.model) {
 68:                 console.error('❌ Speech model loading failed');
 69:                 return;
 70:             }
 71: 
 72:             // Wait for model to fully load
 73:             await new Promise<void>((resolve, reject) => {
 74:                 const timeout = setTimeout(() => {
 75:                     reject(new Error('Model loading timeout'));
 76:                 }, 60000); // 60 second timeout
 77: 
 78:                 this.model.on('load', (message: any) => {
 79:                     clearTimeout(timeout);
 80:                     if (message.result) {
 81:                         console.log('✅ Speech model loaded successfully');
 82:                         resolve();
 83:                     } else {
 84:                         console.error('❌ Speech model loading failed');
 85:                         reject(new Error('Model loading failed'));
 86:                     }
 87:                 });
 88: 
 89:                 this.model.on('error', (message: any) => {
 90:                     clearTimeout(timeout);
 91:                     console.error('❌ Model loading error:', message.error);
 92:                     reject(new Error(message.error));
 93:                 });
 94: 
 95:                 // If model is already ready
 96:                 if (this.model.ready) {
 97:                     clearTimeout(timeout);
 98:                     console.log('✅ Speech model is ready');
 99:                     resolve();
100:                 }
101:             });
102: 
103:             // 4. Create recognizer (need to pass sample rate parameter)
104:             console.log('🎤 Creating recognizer...');
105:             try {
106:                 // vosk-browser KaldiRecognizer constructor requires sample rate parameter
107:                 console.log('🎤 Using sample rate:', AUDIO_CONFIG.sampleRate);
108:                 this.recognizer = new this.model.KaldiRecognizer(AUDIO_CONFIG.sampleRate);
109:                 console.log('✅ Recognizer created successfully, ID:', this.recognizer.id);
110:             } catch (error) {
111:                 console.error('❌ Failed to create recognizer:', error);
112:                 console.error('❌ Error details:', error);
113:                 return;
114:             }
115: 
116:             if (!this.recognizer) {
117:                 console.error('❌ Recognizer creation failed - object is null');
118:                 return;
119:             }
120: 
121:             // Set recognition result callback
122:             try {
123:                 this.recognizer.on('result', (message: any) => {
124:                     console.log('🎤 Received recognition result event:', message);
125:                     const text = message.result?.text;
126:                     if (text && text.trim()) {
127:                         console.log('🎤 Speech recognition result:', text);
128:                         if (this.onRecognizedCallback) {
129:                             this.onRecognizedCallback(text.trim());
130:                         }
131:                     }
132:                 });
133: 
134:                 this.recognizer.on('partialresult', (message: any) => {
135:                     const partial = message.result?.partial;
136:                     if (partial && partial.trim()) {
137:                         console.log('🎤 Partial recognition result:', partial);
138:                     }
139:                 });
140: 
141:                 console.log('✅ Recognizer callback setup successful');
142:             } catch (error) {
143:                 console.error('❌ Failed to set recognizer callback:', error);
144:                 return;
145:             }
146: 
147:             console.log('✅ Frontend offline speech recognition initialized successfully');
148:             return;
149: 
150:         } catch (error) {
151:             console.error('❌ Frontend offline speech recognition initialization failed:', error);
152:             return;
153:         }
154:     }
155: 
156:     async start(): Promise<void> {
157:         try {
158:             console.log('🎤 Checking speech recognition status...');
159:             console.log('🎤 Model:', !!this.model, 'Recognizer:', !!this.recognizer);
160: 
161:             if (!this.model || !this.recognizer) {
162:                 console.error('❌ Speech recognition not initialized - Model:', !!this.model, 'Recognizer:', !!this.recognizer);
163:                 return;
164:             }
165: 
166:             if (this.isRecognizing) {
167:                 console.warn('⚠️ Speech recognition already running');
168:                 return;
169:             }
170: 
171:             console.log('🎤 Starting speech recognition...');
172:             console.log('🎤 Recognizer ID:', this.recognizer.id);
173: 
174:             // Get microphone permission
175:             const mediaStream = await navigator.mediaDevices.getUserMedia({
176:                 audio: {
177:                     echoCancellation: true,
178:                     noiseSuppression: true,
179:                     channelCount: AUDIO_CONFIG.channelCount,
180:                     sampleRate: AUDIO_CONFIG.sampleRate
181:                 }
182:             });
183: 
184:             // Create audio context (ensure sample rate matches recognizer)
185:             this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
186:                 sampleRate: AUDIO_CONFIG.sampleRate
187:             });
188: 
189:             console.log('🎤 Audio context sample rate:', this.audioContext.sampleRate);
190:             console.log('🎤 Configured sample rate:', AUDIO_CONFIG.sampleRate);
191: 
192:             // Create audio source
193:             const source = this.audioContext.createMediaStreamSource(mediaStream);
194: 
195:             // Create script processor node
196:             this.scriptProcessor = this.audioContext.createScriptProcessor(
197:                 AUDIO_CONFIG.bufferSize,
198:                 AUDIO_CONFIG.channelCount,
199:                 AUDIO_CONFIG.channelCount
200:             );
201: 
202:             console.log('🎤 Script processor buffer size:', AUDIO_CONFIG.bufferSize);
203: 
204:             // Process audio data
205:             this.scriptProcessor.onaudioprocess = (event) => {
206:                 if (!this.recognizer) {
207:                     console.warn('⚠️ Recognizer not available');
208:                     return;
209:                 }
210: 
211:                 if (!this.isRecognizing) {
212:                     return;
213:                 }
214: 
215:                 try {
216:                     // Check recognizer status
217:                     if (!this.recognizer.id) {
218:                         console.error('❌ Recognizer ID invalid');
219:                         return;
220:                     }
221: 
222:                     const inputBuffer = event.inputBuffer;
223:                     if (!inputBuffer) {
224:                         console.warn('⚠️ Input buffer is empty');
225:                         return;
226:                     }
227: 
228:                     this.recognizer.acceptWaveform(inputBuffer);
229:                 } catch (error) {
230:                     console.error('❌ acceptWaveform failed:', error);
231:                     console.error('❌ Recognizer status:', {
232:                         id: this.recognizer?.id,
233:                         isRecognizing: this.isRecognizing,
234:                         bufferLength: event.inputBuffer?.length
235:                     });
236:                 }
237:             };
238: 
239:             // Connect audio nodes
240:             source.connect(this.scriptProcessor);
241:             this.scriptProcessor.connect(this.audioContext.destination);
242: 
243:             this.isRecognizing = true;
244:             console.log('✅ Speech recognition started');
245:             return;
246: 
247:         } catch (error) {
248:             console.error('❌ Failed to start speech recognition:', error);
249: 
250:             // Check if it's a permission issue
251:             if (error instanceof Error) {
252:                 if (error.name === 'NotAllowedError') {
253:                     console.error('❌ Microphone permission denied');
254:                 } else if (error.name === 'NotFoundError') {
255:                     console.error('❌ No microphone device found');
256:                 }
257:             }
258: 
259:             return;
260:         }
261:     }
262: 
263:     async stop(): Promise<void> {
264:         try {
265:             console.log('🎤 Stopping speech recognition...');
266: 
267:             this.isRecognizing = false;
268: 
269:             // Disconnect audio nodes
270:             if (this.scriptProcessor) {
271:                 this.scriptProcessor.disconnect();
272:             }
273: 
274:             // Stop media stream
275:             if (this.mediaStream) {
276:                 this.mediaStream.getTracks().forEach(track => track.stop());
277:             }
278: 
279:             // Close audio context
280:             if (this.audioContext && this.audioContext.state !== 'closed') {
281:                 this.audioContext.close();
282:             }
283: 
284:             console.log('✅ Speech recognition stopped');
285:         } catch (error) {
286:             console.error('❌ Failed to stop speech recognition:', error);
287:         }
288:     }
289:     async cleanup(): Promise<void> {
290:         try {
291:             console.log('🎤 Cleaning up speech recognition resources...');
292: 
293:             if (this.isRecognizing) {
294:                 this.stop();
295:             }
296: 
297:             // Clean up recognizer
298:             if (this.recognizer) {
299:                 try {
300:                     this.recognizer.remove();
301:                 } catch (error) {
302:                     console.warn('Error cleaning up recognizer:', error);
303:                 }
304:                 this.recognizer = null;
305:             }
306: 
307:             // Clean up model
308:             if (this.model) {
309:                 try {
310:                     this.model.terminate();
311:                 } catch (error) {
312:                     console.warn('Error cleaning up model:', error);
313:                 }
314:                 this.model = null;
315:             }
316:             console.log('✅ Speech recognition resources cleaned up');
317:         } catch (error) {
318:             console.error('❌ Failed to clean up speech recognition resources:', error);
319:         }
320:     }
321: 
322:     /**
323:  * Load vosk-browser library
324:  * @returns Promise<boolean> Whether loading was successful
325:  */
326:     async loadVoskLibrary(): Promise<boolean> {
327:         try {
328:             // If already loaded, return directly
329:             if (typeof window !== 'undefined' && (window as any).Vosk) {
330:                 return true;
331:             }
332: 
333:             // Dynamically load vosk-browser
334:             const script = document.createElement('script');
335:             script.src = 'https://cdn.jsdelivr.net/npm/vosk-browser@0.0.8/dist/vosk.js';
336: 
337:             const loadPromise = new Promise<boolean>((resolve) => {
338:                 script.onload = () => {
339:                     console.log('✅ vosk-browser library loaded successfully');
340:                     resolve(true);
341:                 };
342:                 script.onerror = () => {
343:                     console.error('❌ vosk-browser library loading failed');
344:                     resolve(false);
345:                 };
346:             });
347: 
348:             document.head.appendChild(script);
349:             return await loadPromise;
350:         } catch (error) {
351:             console.error('❌ Failed to load vosk-browser library:', error);
352:             return false;
353:         }
354:     }
355: }
````

## File: src/models/speech-recognition/speech-recognition-xunfei.ts
````typescript
  1: import { SpeechRecognitionBase, SpeechRecognitionConfig } from "./speech-recognition-base";
  2: 
  3: export class SpeechRecognitionXunfei implements SpeechRecognitionBase {
  4:     config: SpeechRecognitionConfig;
  5:     isRecognizing: boolean = false;
  6:     private audioContext: AudioContext;
  7:     private xfWebSocket: WebSocket;
  8:     private onRecognizedCallback?: (text: string) => void;
  9: 
 10:     constructor(config: SpeechRecognitionConfig, onRecognizedCallback?: (text: string) => void) {
 11:         this.config = config;
 12:         this.onRecognizedCallback = onRecognizedCallback;
 13:     }
 14: 
 15:     async start(): Promise<void> {
 16:         try {
 17:             // Get microphone permission
 18:             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
 19: 
 20:             // Initialize AudioContext
 21:             this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
 22:             const source = this.audioContext.createMediaStreamSource(stream);
 23: 
 24:             // Create ScriptProcessor (for getting audio data)
 25:             const processor = this.audioContext.createScriptProcessor(4096, 1, 1);
 26:             source.connect(processor);
 27:             processor.connect(this.audioContext.destination);
 28: 
 29:             const wsUrl = await this.generateXunfeiWebSocketUrl(this.config);
 30: 
 31:             this.xfWebSocket = new WebSocket(wsUrl);
 32: 
 33:             this.xfWebSocket.onopen = () => {
 34:                 console.log("[Xunfei] WebSocket connection established");
 35: 
 36:                 // Send first frame (contains configuration information)
 37:                 const firstFrame = {
 38:                     common: {
 39:                         app_id: this.config.appId
 40:                     },
 41:                     business: {
 42:                         language: "zh_cn",
 43:                         domain: "iat",
 44:                         accent: "mandarin",
 45:                         vad_eos: 30000,    // Silence detection time extended to 30 seconds
 46:                         dwa: "wpgs"        // Dynamic correction
 47:                     },
 48:                     data: {
 49:                         status: 0,
 50:                         format: "audio/L16;rate=16000",
 51:                         encoding: "raw",
 52:                         audio: ""
 53:                     }
 54:                 };
 55: 
 56:                 this.xfWebSocket!.send(JSON.stringify(firstFrame));
 57:             };
 58: 
 59:             this.xfWebSocket.onmessage = (event) => {
 60:                 this.handleXunfeiMessage(event.data);
 61:             };
 62: 
 63:             this.xfWebSocket.onerror = (error) => {
 64:                 console.error("[Xunfei] WebSocket error:", error);
 65:                 // Don't immediately set isRecognizing = false, let user stop manually
 66:             };
 67: 
 68:             this.xfWebSocket.onclose = (event) => {
 69:                 console.log(`[Xunfei] WebSocket connection closed, code: ${event.code}, reason: ${event.reason}`);
 70:                 // Only set to false when closed abnormally
 71:                 if (event.code !== 1000) {
 72:                     console.warn("[Xunfei] WebSocket abnormal closure");
 73:                     this.isRecognizing = false;
 74:                 }
 75:             };
 76: 
 77:             // Process audio data
 78:             let frameCount = 0;
 79:             processor.onaudioprocess = (event) => {
 80:                 if (this.xfWebSocket && this.xfWebSocket.readyState === WebSocket.OPEN) {
 81:                     const inputData = event.inputBuffer.getChannelData(0);
 82: 
 83:                     // Check if audio data is valid (not all silence)
 84:                     let hasAudio = false;
 85:                     for (let i = 0; i < inputData.length; i++) {
 86:                         if (Math.abs(inputData[i]) > 0.01) {
 87:                             hasAudio = true;
 88:                             break;
 89:                         }
 90:                     }
 91: 
 92:                     // Send even if silent to keep connection active
 93:                     const audioData = this.convertFloat32ToInt16(inputData);
 94:                     const base64Audio = this.arrayBufferToBase64(audioData);
 95: 
 96:                     const audioFrame = {
 97:                         data: {
 98:                             status: 1,
 99:                             format: "audio/L16;rate=16000",
100:                             encoding: "raw",
101:                             audio: base64Audio
102:                         }
103:                     };
104: 
105:                     try {
106:                         this.xfWebSocket.send(JSON.stringify(audioFrame));
107:                         frameCount++;
108: 
109:                         // Output debug info every 100 frames
110:                         if (frameCount % 100 === 0) {
111:                             console.log(`[Xunfei] Sent ${frameCount} audio frames, current status: ${hasAudio ? 'has sound' : 'silent'}`);
112:                         }
113:                     } catch (error) {
114:                         console.error("[Xunfei] Failed to send audio data:", error);
115:                     }
116:                 }
117:             };
118: 
119:         } catch (error) {
120:             console.error("[Xunfei] Failed to start speech recognition:", error);
121:             this.isRecognizing = false;
122:         }
123:     }
124: 
125:     async stop(): Promise<void> {
126:         // Send end frame
127:         if (this.xfWebSocket && this.xfWebSocket.readyState === WebSocket.OPEN) {
128:             const endFrame = {
129:                 data: {
130:                     status: 2,
131:                     format: "audio/L16;rate=16000",
132:                     encoding: "raw",
133:                     audio: ""
134:                 }
135:             };
136:             this.xfWebSocket.send(JSON.stringify(endFrame));
137:         }
138: 
139:         // Close WebSocket
140:         if (this.xfWebSocket) {
141:             this.xfWebSocket.close();
142:         }
143: 
144:         // Close audio context
145:         if (this.audioContext) {
146:             this.audioContext.close();
147:         }
148: 
149:         this.isRecognizing = false;
150:         console.log("[Xunfei] Speech recognition stopped");
151:     }
152: 
153:     async cleanup(): Promise<void> {
154:         if (this.isRecognizing) {
155:             await this.stop();
156:         }
157:         if (this.xfWebSocket) {
158:             this.xfWebSocket.close();
159:         }
160:         if (this.audioContext) {
161:             this.audioContext.close();
162:         }
163:     }
164: 
165: 
166:     // Xunfei speech recognition WebSocket URL generation
167:     async generateXunfeiWebSocketUrl(config: SpeechRecognitionConfig): Promise<string> {
168:         const { appId, apiSecret, xfApiKey } = config;
169: 
170:         // Generate timestamp
171:         const date = new Date().toUTCString();
172: 
173:         // Generate signature
174:         const host = "iat-api.xfyun.cn";
175:         const path = "/v2/iat";
176:         const algorithm = "hmac-sha256";
177: 
178:         const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${path} HTTP/1.1`;
179: 
180:         // Use Web Crypto API to generate HMAC-SHA256 signature
181:         const encoder = new TextEncoder();
182:         const keyData = encoder.encode(apiSecret!);
183:         const messageData = encoder.encode(signatureOrigin);
184: 
185:         const cryptoKey = await crypto.subtle.importKey(
186:             'raw',
187:             keyData,
188:             { name: 'HMAC', hash: 'SHA-256' },
189:             false,
190:             ['sign']
191:         );
192: 
193:         const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
194:         const signature = btoa(String.fromCharCode(...Array.from(new Uint8Array(signatureBuffer))));
195: 
196:         // Generate authorization
197:         const authorization = `api_key="${xfApiKey}", algorithm="${algorithm}", headers="host date request-line", signature="${signature}"`;
198:         const authorizationBase64 = btoa(authorization);
199: 
200:         // Build URL
201:         const params = new URLSearchParams({
202:             authorization: authorizationBase64,
203:             date: date,
204:             host: host
205:         });
206: 
207:         return `wss://${host}${path}?${params.toString()}`;
208:     }
209: 
210: 
211:     // Process Xunfei WebSocket message
212:     handleXunfeiMessage(message: string) {
213:         try {
214:             const response = JSON.parse(message);
215: 
216:             if (response.code !== 0) {
217:                 console.error("[Xunfei] Recognition error:", response.message);
218:                 return;
219:             }
220: 
221:             if (response.data && response.data.result) {
222:                 const results = response.data.result;
223:                 let recognizedText = "";
224: 
225:                 // Parse recognition results
226:                 if (results.ws) {
227:                     for (const ws of results.ws) {
228:                         if (ws.cw) {
229:                             for (const cw of ws.cw) {
230:                                 recognizedText += cw.w;
231:                             }
232:                         }
233:                     }
234:                 }
235: 
236:                 if (recognizedText) {
237:                     console.log(`[Xunfei] Speech recognition result: ${recognizedText}`);
238:                     if (this.onRecognizedCallback) {
239:                         this.onRecognizedCallback(recognizedText);
240:                     }
241:                 }
242:             }
243: 
244:             // Note: Don't automatically stop when status=2, status=2 only means current speech segment ended
245:             // Let speech recognition continue running until user manually stops
246:             if (response.data && response.data.status === 2) {
247:                 console.log("[Xunfei] Current speech segment recognition completed, continuing to listen...");
248:             }
249: 
250:         } catch (error) {
251:             console.error("[Xunfei] Failed to parse message:", error);
252:         }
253:     }
254: 
255:     // Convert Float32 array to Int16 array
256:     convertFloat32ToInt16(float32Array: Float32Array): ArrayBuffer {
257:         const int16Array = new Int16Array(float32Array.length);
258:         for (let i = 0; i < float32Array.length; i++) {
259:             int16Array[i] = Math.max(-32768, Math.min(32767, Math.floor(float32Array[i] * 32768)));
260:         }
261:         return int16Array.buffer;
262:     }
263: 
264:     // ArrayBuffer to Base64
265:     arrayBufferToBase64(buffer: ArrayBuffer): string {
266:         const bytes = new Uint8Array(buffer);
267:         let binary = '';
268:         for (let i = 0; i < bytes.byteLength; i++) {
269:             binary += String.fromCharCode(bytes[i]);
270:         }
271:         return btoa(binary);
272:     }
273: 
274: }
````

## File: src/models/tts-player/tts-player-base.ts
````typescript
 1: // TTS provider type
 2: export type TTSProvider = 'microsoft' | 'native';
 3: 
 4: // Configuration interface
 5: export interface TTSConfig {
 6:     provider: TTSProvider;
 7:     // Microsoft TTS configuration
 8:     apiKey?: string;
 9:     region?: string;
10:     voiceName?: string;
11:     // Native TTS configuration
12:     lang?: string;
13:     rate?: number;
14:     pitch?: number;
15:     volume?: number;
16:     maxChunkLength?: number;
17: }
18: 
19: export interface SpeakResult {
20:     sentenceCompleted: boolean;
21:     sentence: string;
22:     id: string;
23: }
24: 
25: // Reading mode
26: export type SpeakMode = 'buffer' | 'direct';
27: 
28: export interface TTSError {
29:     message: string;
30:     code: number;
31: }
32: 
33: export interface TTSPlayerBase {
34:     config: TTSConfig;
35:     isPlaying: boolean;
36: 
37:     /**
38:      * Read text
39:      * @param text Text to read
40:      * @param mode Reading mode: 'buffer' buffer mode (streaming input), 'direct' direct mode (complete sentences)
41:      * @returns Promise resolves when the input text is actually read
42:      */
43:     speak(text: string, mode: SpeakMode): Promise<SpeakResult>;
44: 
45:     /**
46:      * Stop voice reading, clear buffer
47:      */
48:     stop(): void;
49: 
50:     /**
51:      * Pause voice reading, keep queue and buffer
52:      */
53:     pause(): void;
54: 
55:     /**
56:      * Resume voice reading
57:      */
58:     resume(): void;
59: }
````

## File: src/models/tts-player/tts-player-microsoft.ts
````typescript
  1: import { TTSPlayerBase, TTSConfig, SpeakMode, SpeakResult } from "./tts-player-base";
  2: import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
  3: import { uuidv4 } from "@jarvis-agent/core";
  4: 
  5: interface PendingSpeak {
  6:     id: string;
  7:     text: string;
  8:     resolve: (value: SpeakResult) => void;
  9:     reject: (error: any) => void;
 10: }
 11: 
 12: export class TTSPlayerMicrosoft implements TTSPlayerBase {
 13:     config: TTSConfig;
 14:     private synthesizer: SpeechSDK.SpeechSynthesizer | null = null;
 15:     isPlaying: boolean = false;
 16:     
 17:     // Streaming playback related state
 18:     private lastSpeakTime = Date.now();
 19:     private lastLength = 0;
 20:     private speakBuffer = "";
 21:     private speakTimer: NodeJS.Timeout | null = null;
 22:     private xmlBuffer = "";
 23:     private isInXMLMode = false;
 24:     
 25:     // Promise management - track pending speak calls to resolve
 26:     private pendingSpeaks: PendingSpeak[] = [];
 27:     
 28:     // Subtitle management
 29:     private subtitleText = "";
 30:     private isSubtitleShowing = false;
 31:     private subtitleTimer: NodeJS.Timeout | null = null;
 32:     
 33:     constructor(config: TTSConfig, onSpeechStart?: (text: string) => void, onSpeechEnd?: () => void) {
 34:         this.config = config;
 35:         
 36:         if (!config.apiKey || !config.region) {
 37:             throw new Error('Microsoft TTS requires apiKey and region configuration');
 38:         }
 39:         
 40:         // Complete initialization in constructor
 41:         const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(config.apiKey, config.region);
 42:         speechConfig.speechSynthesisVoiceName = config.voiceName || "zh-CN-XiaoxiaoNeural";
 43: 
 44:         const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
 45:         this.synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
 46:         
 47:         console.log('[Microsoft TTS] Initialization successful');
 48:     }
 49: 
 50:     /**
 51:      * Read text
 52:      * @param text Text to read
 53:      * @param mode Reading mode: 'buffer' buffer mode (streaming input), 'direct' direct mode (complete sentences)
 54:      * @returns Promise resolves when the input text is actually read
 55:      */
 56:     async speak(text: string, mode: SpeakMode): Promise<SpeakResult> {
 57:         return new Promise((resolve, reject) => {
 58:             if (!this.synthesizer) {
 59:                 reject(new Error('TTS not initialized'));
 60:                 return;
 61:             }
 62: 
 63:             const id = uuidv4();
 64: 
 65:             // Add to pending queue
 66:             this.pendingSpeaks.push({ id, text, resolve, reject });
 67: 
 68:             if (mode === 'direct') {
 69:                 // Direct mode: read immediately
 70:                 this.flushSpeakBuffer(id, text);
 71:             } else {
 72:                 // Buffer mode: add to buffer, wait for sentence completion
 73:                 this.processBufferMode({ id, text });
 74:             }
 75:         });
 76:     }
 77: 
 78:     /**
 79:      * Stop voice reading, clear buffer
 80:      */
 81:     stop(): void {
 82:         console.log('[Microsoft TTS] Stop playback and clear buffer');
 83:         this.isPlaying = false;
 84:         this.hideSubtitle();
 85: 
 86:         // Clear all buffers
 87:         this.speakBuffer = "";
 88:         this.xmlBuffer = "";
 89:         this.isInXMLMode = false;
 90:         if (this.speakTimer) {
 91:             clearTimeout(this.speakTimer);
 92:             this.speakTimer = null;
 93:         }
 94: 
 95:         // Reject all pending speak calls
 96:         this.pendingSpeaks.forEach(pending => {
 97:             pending.reject(new Error('TTS stopped'));
 98:         });
 99:         this.pendingSpeaks = [];
100: 
101:         // Stop current playback
102:         if (this.synthesizer) {
103:             this.synthesizer.close();
104:             // Recreate synthesizer
105:             if (this.config.apiKey && this.config.region) {
106:                 const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(this.config.apiKey, this.config.region);
107:                 speechConfig.speechSynthesisVoiceName = this.config.voiceName || "zh-CN-XiaoxiaoNeural";
108:                 const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
109:                 this.synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
110:             }
111:         }
112:     }
113: 
114:     /**
115:      * Pause voice reading, keep queue and buffer
116:      */
117:     pause(): void {
118:         console.log('[Microsoft TTS] Pause playback (keep queue)');
119:         // Microsoft TTS doesn't have direct pause function, only mark status here
120:         // Actual pause needs to be handled at playback level
121:         this.isPlaying = false;
122:         if (this.speakTimer) {
123:             clearTimeout(this.speakTimer);
124:             this.speakTimer = null;
125:         }
126:     }
127: 
128:     /**
129:      * Resume voice reading
130:      */
131:     resume(): void {
132:         console.log('[Microsoft TTS] Resume playback');
133:         // If there's buffered content, continue processing
134:         if (this.speakBuffer.trim()) {
135:             this.scheduleBufferFlush(this.pendingSpeaks[0].id);
136:         }
137:     }
138: 
139:     // Process buffer mode
140:     private processBufferMode(part: { id: string, text: string }): void {
141:         console.log('📄 [Microsoft TTS] Buffer mode processing:', part.text.substring(0, 30));
142: 
143:         // Clean text
144:         const cleanText = this.cleanStreamText(part.text);
145:         if (!cleanText) {
146:             this.resolvePendingSpeaks(part.id, part.text, false);
147:             return;
148:         };
149: 
150:         this.speakBuffer += cleanText;
151: 
152:         // If sentence is complete or buffer length exceeds 50, flush buffer
153:         if (this.isSentenceComplete(this.speakBuffer) || this.speakBuffer.length > 50) {
154:             this.flushSpeakBuffer(part.id);
155:             if (this.speakTimer) {
156:                 clearTimeout(this.speakTimer);
157:             }
158:             return;
159:         }
160: 
161:         this.resolvePendingSpeaks(part.id, part.text, false);
162:         this.scheduleBufferFlush(part.id);
163:     }
164: 
165:     // Schedule buffer flush
166:     private scheduleBufferFlush(id: string): void {
167:         if (this.speakTimer) clearTimeout(this.speakTimer);
168:         this.speakTimer = setTimeout(() => {
169:             this.flushSpeakBuffer(id);
170:         }, 1500);
171:     }
172: 
173:     // Flush and play buffer content
174:     private flushSpeakBuffer(id: string, directText?: string): void {
175:         const textToSpeak = directText || this.speakBuffer.trim();
176:         if (!textToSpeak) {
177:             this.resolvePendingSpeaks(id, textToSpeak, true);
178:             return;
179:         }
180: 
181:         console.log('flushSpeakBuffer:', textToSpeak);
182: 
183:         // If it's a new conversation start, reset subtitle state
184:         if (!this.isSubtitleShowing) {
185:             this.resetSubtitleState();
186:         }
187: 
188:         this.speakText(id, textToSpeak);
189: 
190:         // Clear buffer (if playing from buffer)
191:         if (!directText) {
192:             this.speakBuffer = "";
193:         }
194:     }
195: 
196:     // Actual text playback method
197:     private speakText(id: string, text: string): void {
198:         const cleanText = this.stripXmlLikeTags(text);
199:         if (!this.synthesizer) return;
200: 
201:         console.log('speakText:', cleanText);
202:         this.isPlaying = true;
203: 
204:         this.showSubtitle(cleanText);
205: 
206: 
207:         const rate = this.getRateBasedOnSpeed(text);
208: 
209:         const ssml = this.wrapSSML(cleanText, rate);
210: 
211:         this.synthesizer.speakSsmlAsync(
212:             ssml,
213:             result => {
214:                 if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
215:                     console.log('TTS playback completed:', text);
216:                     // Resolve related pending speaks when playback completes
217:                     this.resolvePendingSpeaks(id, text, true);
218:                     this.updateSubtitleTimer();
219:                 } else {
220:                     console.error("TTS failed:", result.errorDetails);
221:                     // Reject related pending speaks when failed
222:                     this.rejectPendingSpeaks(id, text, new Error(result.errorDetails));
223:                     this.updateSubtitleTimer();
224:                 }
225:                 this.isPlaying = false;
226:             },
227:             error => {
228:                 console.error("TTS error:", error);
229:                 // Reject related pending speaks when error occurs
230:                 this.rejectPendingSpeaks(id, text, error);
231:                 this.updateSubtitleTimer();
232:                 this.isPlaying = false;
233:             }
234:         );
235:     }
236: 
237:     // Resolve related pending speaks
238:     private resolvePendingSpeaks(id: string, spokenText: string, sentenceCompleted: boolean): void {
239:         // Find pending speaks contained in the played text and resolve them
240:         const toResolve = this.pendingSpeaks.filter(pending =>
241:             pending.id === id
242:         );
243: 
244:         toResolve.forEach(pending => {
245:             pending.resolve({
246:                 sentenceCompleted,
247:                 sentence: this.speakBuffer,
248:                 id,
249:             });
250:         });
251: 
252:         // Remove resolved ones from pending queue
253:         this.pendingSpeaks = this.pendingSpeaks.filter(pending =>
254:             pending.id !== id
255:         );
256:     }
257: 
258:     // Reject related pending speaks
259:     private rejectPendingSpeaks(id: string, spokenText: string, error: any): void {
260:         // Find pending speaks contained in the played text and reject them
261:         const toReject = this.pendingSpeaks.filter(pending =>
262:             pending.id === id
263:         );
264: 
265:         toReject.forEach(pending => {
266:             pending.reject(error);
267:         });
268: 
269:         // Remove rejected ones from pending queue
270:         this.pendingSpeaks = this.pendingSpeaks.filter(pending =>
271:             pending.id !== id
272:         );
273:     }
274: 
275: 
276: 
277:     // Private methods
278:     private showSubtitle(text: string): void {
279:         this.hideSubtitle();
280:         this.subtitleText = text;
281:         if (!this.isSubtitleShowing) {
282:             this.isSubtitleShowing = true;
283:             if (typeof window !== 'undefined' && window.api && window.api.sendTTSSubtitle) {
284:                 window.api.sendTTSSubtitle(text, true);
285:             }
286:         }
287:     }
288: 
289:     private updateSubtitleTimer(): void {
290:         if (this.subtitleTimer) {
291:             clearTimeout(this.subtitleTimer);
292:         }
293:         // Hide subtitle after 2 seconds (if no new playback)
294:         this.subtitleTimer = setTimeout(() => {
295:             this.hideSubtitle();
296:         }, 2000);
297:     }
298: 
299:     private hideSubtitle(): void {
300:         if (this.isSubtitleShowing) {
301:             this.isSubtitleShowing = false;
302:             this.subtitleText = "";
303:             if (typeof window !== 'undefined' && window.api && window.api.sendTTSSubtitle) {
304:                 window.api.sendTTSSubtitle("", false);
305:             }
306:         }
307:         if (this.subtitleTimer) {
308:             clearTimeout(this.subtitleTimer);
309:             this.subtitleTimer = null;
310:         }
311:     }
312: 
313:     private resetSubtitleState(): void {
314:         this.subtitleText = "";
315:         this.hideSubtitle();
316:     }
317: 
318:     private wrapSSML(text: string, rate: string): string {
319:         return `
320: <speak version="1.0" xml:lang="zh-CN">
321:   <voice name="zh-CN-XiaoxiaoNeural">
322:     <prosody rate="${rate}">${text}</prosody>
323:   </voice>
324: </speak>`.trim();
325:     }
326: 
327:     private getRateBasedOnSpeed(text: string): string {
328:         const now = Date.now();
329:         const deltaSeconds = (now - this.lastSpeakTime) / 1000;
330:         const charsPerSecond = text.length / (deltaSeconds || 0.1);
331: 
332:         this.lastSpeakTime = now;
333:         this.lastLength = text.length;
334: 
335:         if (charsPerSecond > 12) return "140%";
336:         if (charsPerSecond > 9) return "125%";
337:         return "120%";
338:     }
339: 
340:     private isSentenceComplete(text: string): boolean {
341:         return /[。！？!?]$/.test(text.trim());
342:     }
343: 
344: 
345: 
346:     private detectXMLStart(text: string): boolean {
347:         return text.includes('<root>') || 
348:                text.includes('<n>') || 
349:                text.includes('<thought>') ||
350:                text.includes('<agents>') ||
351:                text.includes('<task>') || 
352:                text.includes('<node>') ||
353:                text.startsWith('<') ||
354:                text.includes('<');
355:     }
356: 
357:     private detectXMLEnd(xmlBuffer: string): boolean {
358:         return xmlBuffer.includes('</root>');
359:     }
360: 
361:     private isValidXMLContent(text: string): boolean {
362:         return text.includes('<root>') || 
363:                text.includes('<n>') || 
364:                text.includes('<task>') ||
365:                text.includes('<node>') ||
366:                text.includes('<agents>');
367:     }
368: 
369:     private extractKeyContentFromCompleteXML(xmlText: string): string {
370:         console.log('Processing XML content:', xmlText.substring(0, 200) + '...');
371: 
372:         let result = '';
373: 
374:         // Fix plan name extraction
375:         const nameMatch = xmlText.match(/<n>([\s\S]*?)<\/n>/);
376:         if (nameMatch && nameMatch[1]) {
377:             result += `Plan: ${nameMatch[1].trim()}.`;
378:         }
379: 
380:         // Fix task description extraction
381:         const taskMatches = xmlText.match(/<task>([\s\S]*?)<\/task>/g);
382:         if (taskMatches && taskMatches.length > 0) {
383:             const tasks = taskMatches.map(task => {
384:                 const taskContent = task.replace(/<\/?task>/g, '').trim();
385:                 return taskContent;
386:             }).filter(task => task.length > 0);
387: 
388:             if (tasks.length > 0) {
389:                 result += `Tasks: ${tasks.join(', ')}.`;
390:             }
391:         }
392: 
393:         // If no valid content extracted, return simplified text
394:         if (!result.trim()) {
395:             result = xmlText
396:                 .replace(/<[^>]*>/g, ' ')  // Remove all XML tags
397:                 .replace(/\s+/g, ' ')      // Merge multiple spaces
398:                 .trim();
399: 
400:             // Take first 80 characters
401:             if (result.length > 80) {
402:                 result = result.substring(0, 80) + '...';
403:             }
404:         }
405: 
406:         console.log('Extracted content:', result);
407:         return result;
408:     }
409: 
410:     private cleanStreamText(text: string): string {
411:         return text
412:             .replace(/[\n\r\*\#\_]/g, ' ')  // Remove formatting characters, but keep < > for XML detection
413:             .replace(/\s+/g, ' ')
414:             .trim();
415:     }
416: 
417:     /**
418:  * Remove XML tags from stream output (including incomplete tags)
419:  * @param input Any string
420:  * @returns Clean text after removing tags
421:  */
422:     private stripXmlLikeTags(input: string): string {
423:         return input
424:           // Delete all tags starting with < and closing (including attributes)
425:           .replace(/<[^>]*>/g, '')
426:           // Delete all incomplete tags starting with < at line end
427:           .replace(/<[^>\n]{0,200}$/gm, '')
428:           // Delete all "word+>" incomplete tag fragments
429:           .replace(/\b\w+>/g, '')
430:           // Delete independently appearing attribute strings without context
431:           .replace(/\b\w+="[^"]*"/g, '')
432:           // Delete isolated < or >
433:           .replace(/[<>]/g, '')
434:           // Merge extra whitespace characters
435:           .replace(/\s+/g, ' ')
436:           .trim();
437:       }
438: }
````

## File: src/models/tts-player/tts-player-native.ts
````typescript
  1: import { uuidv4 } from "@jarvis-agent/core";
  2: import { TTSPlayerBase, TTSConfig, SpeakMode, SpeakResult } from "./tts-player-base";
  3: 
  4: interface PendingSpeak {
  5:     text: string;
  6:     resolve: (value: SpeakResult) => void;
  7:     reject: (error: any) => void;
  8:     id: string;
  9: }
 10: 
 11: export class TTSPlayerNative implements TTSPlayerBase {
 12:     config: TTSConfig;
 13:     isPlaying: boolean = false;
 14:     
 15:     // Speech synthesis state
 16:     private currentUtterance: SpeechSynthesisUtterance | null = null;
 17:     private utteranceQueue: SpeechSynthesisUtterance[] = [];
 18:     private onSpeechStartCallback: ((text: string) => void) | null = null;
 19:     private onSpeechEndCallback: (() => void) | null = null;
 20:     
 21:     // Buffer mode related
 22:     private speakBuffer = "";
 23:     private speakTimer: NodeJS.Timeout | null = null;
 24:     private pendingSpeaks: PendingSpeak[] = [];
 25: 
 26:     // Subtitle management
 27:     private subtitleText = "";
 28:     private isSubtitleShowing = false;
 29:     private subtitleTimer: NodeJS.Timeout | null = null;
 30: 
 31:     constructor(config: TTSConfig, onSpeechStart?: (text: string) => void, onSpeechEnd?: () => void) {
 32:         this.config = {
 33:             lang: config.lang || 'zh-CN',
 34:             rate: config.rate || 1.2,
 35:             pitch: config.pitch || 1.0,
 36:             volume: config.volume || 0.9,
 37:             maxChunkLength: config.maxChunkLength || 200,
 38:             ...config
 39:         };
 40:         
 41:         this.onSpeechStartCallback = onSpeechStart || null;
 42:         this.onSpeechEndCallback = onSpeechEnd || null;
 43:         
 44:         // Complete initialization in constructor
 45:         this.initialize();
 46:     }
 47:     
 48:     private initialize(): void {
 49:         console.log('🔊 Initializing native TTS...');
 50: 
 51:         // Check browser support
 52:         if (!('speechSynthesis' in window)) {
 53:             throw new Error('Browser does not support Speech Synthesis API');
 54:         }
 55: 
 56:         // Preload voice list
 57:         this.loadVoices();
 58: 
 59:         console.log('✅ Native TTS initialization successful');
 60:         console.log('🔊 TTS configuration:', this.config);
 61:     }
 62: 
 63:     /**
 64:      * Read text
 65:      * @param text Text to read
 66:      * @param mode Reading mode: 'buffer' buffer mode (streaming input), 'direct' direct mode (complete sentences)
 67:      * @returns Promise resolves when the input text is actually read
 68:      */
 69:     async speak(text: string, mode: SpeakMode): Promise<SpeakResult> {
 70:         return new Promise((resolve, reject) => {
 71:             if (!('speechSynthesis' in window)) {
 72:                 reject(new Error('Browser does not support Speech Synthesis API'));
 73:                 return;
 74:             }
 75: 
 76:             const id = uuidv4();
 77: 
 78:             // Add to pending queue
 79:             this.pendingSpeaks.push({ id, text, resolve, reject });
 80: 
 81:             if (mode === 'direct') {
 82:                 // Direct mode: read immediately
 83:                 this.flushSpeakBuffer(id, this.speakBuffer + text);
 84:             } else {
 85:                 // Buffer mode: add to buffer, wait for complete sentence
 86:                 this.processBufferMode({ id, text });
 87:             }
 88:         });
 89:     }
 90: 
 91:     /**
 92:      * Stop voice reading, clear buffer
 93:      */
 94:     stop(): void {
 95:         console.log('🔊 [Native TTS] Stop playback and clear buffer');
 96: 
 97:         // Hide subtitle
 98:         this.hideSubtitle();
 99: 
100:         // Cancel all queued speech
101:         speechSynthesis.cancel();
102: 
103:         // Clean up state
104:         this.isPlaying = false;
105:         this.currentUtterance = null;
106:         this.utteranceQueue = [];
107: 
108:         // Clear buffer
109:         this.speakBuffer = "";
110:         if (this.speakTimer) {
111:             clearTimeout(this.speakTimer);
112:             this.speakTimer = null;
113:         }
114: 
115:         // Reject all pending speak calls
116:         this.pendingSpeaks.forEach(pending => {
117:             pending.reject(new Error('TTS stopped'));
118:         });
119:         this.pendingSpeaks = [];
120: 
121:         // Trigger end callback
122:         if (this.onSpeechEndCallback) {
123:             this.onSpeechEndCallback();
124:         }
125:     }
126: 
127:     /**
128:      * Pause voice reading, keep queue and buffer
129:      */
130:     pause(): void {
131:         console.log('🔊 [Native TTS] Pause playback (keep queue)');
132: 
133:         if (speechSynthesis.speaking && !speechSynthesis.paused) {
134:             speechSynthesis.pause();
135:         }
136: 
137:         if (this.speakTimer) {
138:             clearTimeout(this.speakTimer);
139:             this.speakTimer = null;
140:         }
141: 
142:         // Keep subtitle displayed when paused
143:     }
144: 
145:     /**
146:      * Resume voice reading
147:      */
148:     resume(): void {
149:         console.log('🔊 [Native TTS] Resume playback');
150: 
151:         if (speechSynthesis.paused) {
152:             speechSynthesis.resume();
153:         }
154: 
155:         // Reset subtitle timer when resuming
156:         this.updateSubtitleTimer();
157: 
158:         // If there's buffered content, continue processing
159:         if (this.speakBuffer.trim()) {
160:             this.scheduleBufferFlush(this.pendingSpeaks[0].id);
161:         }
162:     }
163: 
164:     // Process buffer mode
165:     private processBufferMode(part: { id: string, text: string }): void {
166:         console.log('📄 [Native TTS] Buffer mode processing:', part.text.substring(0, 30));
167: 
168:         // Clean text
169:         const cleanText = this.cleanStreamText(part.text);
170:         if (!cleanText) {
171:             this.resolvePendingSpeaks(part.id, part.text, false);
172:             return;
173:         };
174: 
175:         this.speakBuffer += cleanText;
176: 
177:         // If sentence is complete or buffer length exceeds 50, flush buffer
178:         if (this.isSentenceComplete(this.speakBuffer) || this.speakBuffer.length > 50) {
179:             this.flushSpeakBuffer(part.id);
180:             if (this.speakTimer) {
181:                 clearTimeout(this.speakTimer);
182:             }
183:             return;
184:         }
185: 
186:         this.resolvePendingSpeaks(part.id, part.text, false);
187:         this.scheduleBufferFlush(part.id);
188:     }
189: 
190:     // Schedule buffer flush
191:     private scheduleBufferFlush(id: string): void {
192:         if (this.speakTimer) clearTimeout(this.speakTimer);
193:         this.speakTimer = setTimeout(() => {
194:             this.flushSpeakBuffer(id);
195:         }, 1500);
196:     }
197: 
198:     // Flush and play buffer content
199:     private flushSpeakBuffer(id: string, directText?: string): void {
200:         const textToSpeak = directText || this.speakBuffer.trim();
201:         if (!textToSpeak) return;
202: 
203:         console.log('flushSpeakBuffer:', textToSpeak);
204:         
205:         // If it's a new conversation start, reset subtitle state
206:         if (!this.isSubtitleShowing) {
207:             this.resetSubtitleState();
208:         }
209:         
210:         // Check text length, split long text into chunks
211:         if (textToSpeak.length > (this.config.maxChunkLength || 200)) {
212:             this.speakLongText(id, textToSpeak);
213:         } else {
214:             this.speakSingleText(id, textToSpeak, true);
215:         }
216:         
217:         this.speakBuffer = "";
218:     }
219: 
220:     // Play single text block
221:     private speakSingleText(id: string, text: string, isFirst: boolean = false, isLast: boolean = true): void {
222: 
223:         const cleanText = this.stripXmlLikeTags(text);
224:         console.log('🔊 [Native TTS] Cleaned text:', cleanText);
225:         const utterance = new SpeechSynthesisUtterance(cleanText);
226: 
227:         // Set voice parameters
228:         utterance.lang = this.config.lang || 'zh-CN';
229:         utterance.rate = this.config.rate || 1.2;
230:         utterance.pitch = this.config.pitch || 1.0;
231:         utterance.volume = this.config.volume || 0.9;
232: 
233:         // Set voice
234:         if (this.config.voiceName) {
235:             const voices = speechSynthesis.getVoices();
236:             const selectedVoice = voices.find(voice => voice.name === this.config.voiceName);
237:             if (selectedVoice) {
238:                 utterance.voice = selectedVoice;
239:             }
240:         }
241: 
242:         // Event handling
243:         utterance.onstart = () => {
244:             this.isPlaying = true;
245:             this.currentUtterance = utterance;
246: 
247:             if (isFirst) {
248:                 console.log('🔊 [Native TTS] Playback started');
249: 
250:                 this.showSubtitle(cleanText);
251: 
252:                 if (this.onSpeechStartCallback) {
253:                     this.onSpeechStartCallback(text);
254:                 }
255:             }
256:         };
257: 
258:         utterance.onend = () => {
259:             // Resolve related pending speaks when playback completes
260:             if (isLast) {
261:                 this.resolvePendingSpeaks(id, text, true);
262:             }
263:             console.log('🔊 [Native TTS] Current block playback completed:', text);
264: 
265:             // Remove completed utterance from queue
266:             const index = this.utteranceQueue.indexOf(utterance);
267:             if (index > -1) {
268:                 this.utteranceQueue.splice(index, 1);
269:             }
270: 
271:             // Check if there's still content to play
272:             if (this.utteranceQueue.length === 0) {
273:                 this.isPlaying = false;
274:                 this.currentUtterance = null;
275:                 console.log('🔊 [Native TTS] All playback completed');
276: 
277:                 // Reset hide timer when playback completes
278:                 this.updateSubtitleTimer();
279: 
280:                 if (this.onSpeechEndCallback) {
281:                     this.onSpeechEndCallback();
282:                 }
283:             }
284:         };
285: 
286:         utterance.onerror = (event) => {
287:             console.error('🔊 [Native TTS] Playback error:', event.error);
288:             this.isPlaying = false;
289:             this.currentUtterance = null;
290: 
291:             // Remove errored utterance from queue
292:             const index = this.utteranceQueue.indexOf(utterance);
293:             if (index > -1) {
294:                 this.utteranceQueue.splice(index, 1);
295:             }
296: 
297:             // Reject related pending speaks when error occurs
298:             this.rejectPendingSpeaks(id, text, new Error(event.error));
299: 
300:             // Reset timer when error occurs
301:             this.updateSubtitleTimer();
302: 
303:             if (this.onSpeechEndCallback) {
304:                 this.onSpeechEndCallback();
305:             }
306:         };
307: 
308:         // Add to queue and play
309:         this.utteranceQueue.push(utterance);
310:         speechSynthesis.speak(utterance);
311:     }
312: 
313:     // Resolve related pending speaks
314:     private resolvePendingSpeaks(id: string, spokenText: string, sentenceCompleted: boolean): void {
315:         // Find pending speaks included in the spoken text and resolve them
316:         const toResolve = this.pendingSpeaks.filter(pending => 
317:             pending.id === id
318:         );
319:         
320:         toResolve.forEach(pending => {
321:             pending.resolve({
322:                 sentenceCompleted,
323:                 sentence: this.speakBuffer,
324:                 id,
325:             });
326:         });
327:         
328:         // Remove resolved ones from pending queue
329:         this.pendingSpeaks = this.pendingSpeaks.filter(pending => 
330:             pending.id !== id
331:         );
332:     }
333: 
334:     // Reject related pending speaks
335:     private rejectPendingSpeaks(id:string, spokenText: string, error: any): void {
336:         // Find pending speaks included in the spoken text and reject them
337:         const toReject = this.pendingSpeaks.filter(pending => 
338:             pending.id === id
339:         );
340:         
341:         toReject.forEach(pending => {
342:             pending.reject(error);
343:         });
344:         
345:         // Remove rejected ones from pending queue
346:         this.pendingSpeaks = this.pendingSpeaks.filter(pending => 
347:             pending.id !== id
348:         );
349:     }
350: 
351:     // Check if it's a complete sentence
352:     private isSentenceComplete(text: string): boolean {
353:         return /[。！？!?]$/.test(text.trim());
354:     }
355: 
356:     // Clean streaming text
357:     private cleanStreamText(text: string): string {
358:         return text
359:             .replace(/[\n\r\*\#\_]/g, ' ')  // Remove formatting characters
360:             .replace(/\s+/g, ' ')
361:             .trim();
362:     }
363: 
364:     // Subtitle management methods
365:     private showSubtitle(text: string): void {
366:         this.hideSubtitle();
367:         this.subtitleText = text;
368:         if (!this.isSubtitleShowing) {
369:             this.isSubtitleShowing = true;
370:             if (typeof window !== 'undefined' && window.api && window.api.sendTTSSubtitle) {
371:                 window.api.sendTTSSubtitle(text, true);
372:             }
373:         }
374:     }
375: 
376:     private updateSubtitleTimer(): void {
377:         if (this.subtitleTimer) {
378:             clearTimeout(this.subtitleTimer);
379:         }
380:         // Hide subtitle after 2 seconds (if no new playback)
381:         this.subtitleTimer = setTimeout(() => {
382:             this.hideSubtitle();
383:         }, 2000);
384:     }
385: 
386:     private hideSubtitle(): void {
387:         if (this.isSubtitleShowing) {
388:             this.isSubtitleShowing = false;
389:             this.subtitleText = "";
390:             if (typeof window !== 'undefined' && window.api && window.api.sendTTSSubtitle) {
391:                 window.api.sendTTSSubtitle("", false);
392:             }
393:         }
394:         if (this.subtitleTimer) {
395:             clearTimeout(this.subtitleTimer);
396:             this.subtitleTimer = null;
397:         }
398:     }
399: 
400:     private resetSubtitleState(): void {
401:         this.subtitleText = "";
402:         this.hideSubtitle();
403:     }
404: 
405:     // Private methods
406:     private loadVoices(): void {
407:         const voices = speechSynthesis.getVoices();
408:         
409:         if (voices.length === 0) {
410:             // Some browsers require async loading
411:             speechSynthesis.addEventListener('voiceschanged', () => {
412:                 const loadedVoices = speechSynthesis.getVoices();
413:                 this.selectBestVoice(loadedVoices);
414:             });
415:         } else {
416:             this.selectBestVoice(voices);
417:         }
418:     }
419: 
420:     private selectBestVoice(voices: SpeechSynthesisVoice[]): void {
421:         console.log('🔊 Available voice list:');
422:         voices.forEach((voice, index) => {
423:             console.log(`  ${index}: ${voice.name} (${voice.lang}) ${voice.localService ? '[Local]' : '[Online]'}`);
424:         });
425: 
426:         // Prefer local Chinese voices
427:         const chineseVoices = voices.filter(voice =>
428:             voice.lang.includes('zh') ||
429:             voice.lang.includes('Chinese') ||
430:             voice.name.includes('Chinese')
431:         );
432: 
433:         if (chineseVoices.length > 0) {
434:             // Prefer local voices
435:             const localChineseVoice = chineseVoices.find(voice => voice.localService);
436:             const selectedVoice = localChineseVoice || chineseVoices[0];
437: 
438:             this.config.voiceName = selectedVoice.name;
439:             console.log(`🔊 Selected voice: ${selectedVoice.name} (${selectedVoice.lang}) ${selectedVoice.localService ? '[Local]' : '[Online]'}`);
440:         } else {
441:             console.warn('⚠️ No Chinese voice found, will use default voice');
442:         }
443:     }
444: 
445: 
446: 
447:     private speakLongText(id: string, text: string): void {
448:         console.log('🔊 [Native TTS] Long text chunking playback, length:', text.length);
449:         
450:         const chunks = this.splitTextIntoChunks(text, this.config.maxChunkLength || 200);
451:         console.log(`🔊 [Native TTS] Split into ${chunks.length} chunks`);
452:         
453:         // Clear queue
454:         this.utteranceQueue = [];
455:         
456:         // Create utterance for each chunk
457:         chunks.forEach((chunk, index) => {
458:             if (chunk.trim()) {
459:                 this.speakSingleText(id, chunk, index === 0, index === chunks.length - 1);
460:             }
461:         });
462:     }
463: 
464:     private splitTextIntoChunks(text: string, maxLength: number): string[] {
465:         if (text.length <= maxLength) {
466:             return [text];
467:         }
468:         
469:         // Split by sentences
470:         const sentences = text.split(/([。！？!?；;])/);
471:         const chunks: string[] = [];
472:         let currentChunk = '';
473:         
474:         for (let i = 0; i < sentences.length; i += 2) {
475:             const sentence = sentences[i] + (sentences[i + 1] || '');
476:             
477:             if ((currentChunk + sentence).length <= maxLength) {
478:                 currentChunk += sentence;
479:             } else {
480:                 if (currentChunk) {
481:                     chunks.push(currentChunk.trim());
482:                 }
483:                 
484:                 // If a single sentence is too long, force split by characters
485:                 if (sentence.length > maxLength) {
486:                     const forceSplit = this.splitByLength(sentence, maxLength);
487:                     chunks.push(...forceSplit);
488:                     currentChunk = '';
489:                 } else {
490:                     currentChunk = sentence;
491:                 }
492:             }
493:         }
494:         
495:         if (currentChunk.trim()) {
496:             chunks.push(currentChunk.trim());
497:         }
498:         
499:         return chunks.filter(chunk => chunk.length > 0);
500:     }
501: 
502:     private splitByLength(text: string, maxLength: number): string[] {
503:         const chunks: string[] = [];
504:         for (let i = 0; i < text.length; i += maxLength) {
505:             chunks.push(text.substring(i, i + maxLength));
506:         }
507:         return chunks;
508:     }
509: 
510:     /**
511:  * Remove XML-like tags from streaming output (including incomplete tags)
512:  * @param input Any string
513:  * @returns Clean text after removing tags
514:  */
515:     private stripXmlLikeTags(input: string): string {
516:         return input
517:           // Remove all tags starting with < and closing (including attributes)
518:           .replace(/<[^>]*>/g, '')
519:           // Remove all incomplete tags starting with < at line ends
520:           .replace(/<[^>\n]{0,200}$/gm, '')
521:           // Remove all "word+>" incomplete tag fragments
522:           .replace(/\b\w+>/g, '')
523:           // Remove standalone attribute strings without context
524:           .replace(/\b\w+="[^"]*"/g, '')
525:           // Remove isolated < or >
526:           .replace(/[<>]/g, '')
527:           // Merge excess whitespace
528:           .replace(/\s+/g, ' ')
529:           .trim();
530:       }
531:       
532:   
533: }
````

## File: src/models/index.ts
````typescript
1: export * from './message';
2: export * from './task';
3: export * from './scheduled-task';
````

## File: src/models/message.ts
````typescript
 1: import { WorkflowAgent } from "@jarvis-agent/core";
 2: 
 3: // Tool execution action
 4: export interface ToolAction {
 5:   id: string;
 6:   toolName: string;
 7:   type: 'tool';
 8:   params?: any;
 9:   status: 'streaming' | 'use' | 'running' | 'completed';
10:   result?: any;
11:   timestamp: Date;
12:   agentName: string;
13: }
14: 
15: // Text output in workflow
16: export interface TextMessage {
17:   type: 'text';
18:   id: string;
19:   content: string;
20: }
21: 
22: export type AgentMessage = ToolAction | TextMessage;
23: 
24: // Workflow message - contains planning and thinking process
25: export interface WorkflowMessage {
26:   id: string;
27:   type: 'workflow';
28:   taskId: string;
29:   workflow?: any; // Workflow type
30:   thinking?: {
31:     text: string;
32:     completed: boolean;
33:   };
34:   timestamp: Date;
35: }
36: 
37: // Agent group message - contains complete execution process of an agent
38: export interface AgentGroupMessage {
39:   id: string;
40:   type: 'agent_group';
41:   taskId: string;
42:   agentName: string;
43:   agentNode?: WorkflowAgent; // WorkflowAgent type
44:   messages: AgentMessage[];  // Tool execution sequence
45:   result?: string;
46:   status: 'running' | 'completed' | 'error';
47:   timestamp: Date;
48: }
49: 
50: // User message type
51: export interface UserMessage {
52:   id: string;
53:   type: 'user';
54:   content: string;
55:   timestamp: Date;
56: }
57: 
58: // Display layer message union type
59: export type DisplayMessage = WorkflowMessage | AgentGroupMessage | UserMessage;
````

## File: src/models/scheduled-task.ts
````typescript
 1: /**
 2:  * Task step
 3:  */
 4: export interface TaskStep {
 5:   id: string;           // Step unique ID
 6:   name: string;         // Step name
 7:   content: string;      // Step content description
 8:   order: number;        // Execution order
 9: }
10: 
11: /**
12:  * Schedule configuration
13:  */
14: export interface ScheduleConfig {
15:   type: 'interval' | 'cron';                    // Schedule type: interval or cron expression
16:   intervalUnit?: 'minute' | 'hour' | 'day';     // Interval unit
17:   intervalValue?: number;                       // Interval value
18:   cronExpression?: string;                      // Cron expression
19: }
20: 
21: /**
22:  * Scheduled task
23:  */
24: export interface ScheduledTask {
25:   id: string;               // Task unique ID
26:   name: string;             // Task name
27:   description?: string;     // Task description
28:   steps: TaskStep[];        // Task steps list
29:   schedule: ScheduleConfig; // Schedule configuration
30:   enabled: boolean;         // Whether enabled
31:   source: 'manual' | 'api'; // Step source: manual input or API import
32:   templateId?: string;      // If from API, record template ID
33:   createdAt: Date;          // Creation time
34:   updatedAt: Date;          // Update time
35:   lastExecutedAt?: Date;    // Last execution time
36:   nextExecuteAt?: Date;     // Next execution time
37: }
38: 
39: /**
40:  * Task template (obtained from API)
41:  */
42: export interface TaskTemplate {
43:   id: string;               // Template ID
44:   name: string;             // Template name
45:   description: string;      // Template description
46:   steps: TaskStep[];        // Steps list
47:   category?: string;        // Category
48: }
49: 
50: /**
51:  * Note: Scheduled task execution history is now unified in the Task table
52:  * Associated via Task.taskType === 'scheduled' and Task.scheduledTaskId
53:  * No longer using independent ExecutionHistory table
54:  */
````

## File: src/models/task.ts
````typescript
 1: import { DisplayMessage } from './message';
 2: 
 3: // Task status enum - consistent with eko-core
 4: export type TaskStatus = 'running' | 'done' | 'error' | 'abort';
 5: 
 6: // Task type enum
 7: export type TaskType = 'normal' | 'scheduled';
 8: 
 9: // Task object (unified for normal tasks and scheduled task execution history)
10: export interface Task {
11:   id: string;
12:   name: string;
13:   workflow?: any; // Workflow type
14:   messages: DisplayMessage[]; // Use specific message types
15:   executionId?: string; // Execution ID, used to associate specific execution records
16:   status?: TaskStatus; // Task status
17:   createdAt: Date; // Creation time
18:   updatedAt: Date; // Update time
19: 
20:   // Tool call history (includes screenshots)
21:   toolHistory?: Array<{
22:     id: string;
23:     toolName: string;
24:     type: 'tool';
25:     status: 'streaming' | 'use' | 'running' | 'completed';
26:     timestamp: Date;
27:     screenshot?: string;
28:     toolSequence?: number;
29:     agentName: string;
30:   }>;
31: 
32:   // === Task type identifier (key fields for unified storage) ===
33:   taskType: TaskType; // Task type: normal=normal task, scheduled=scheduled task execution history
34: 
35:   // === Scheduled task execution history related fields ===
36:   scheduledTaskId?: string; // Associated scheduled task configuration ID (only used when taskType=scheduled)
37:   startTime?: Date; // Execution start time
38:   endTime?: Date; // Execution end time
39:   duration?: number; // Execution duration (milliseconds)
40:   error?: string; // Error message
41:   windowId?: string; // Execution window ID
42: 
43:   // Whether it's a historical task (read-only)
44:   isHistorical?: boolean;
45: }
````

## File: src/pages/api/mcp/health.ts
````typescript
 1: import { NextApiRequest, NextApiResponse } from 'next';
 2: import mcpToolManager from '../../../lib/mcpTools';
 3: import { getClientCount } from './sse';
 4: 
 5: export default function handler(req: NextApiRequest, res: NextApiResponse) {
 6:   if (req.method !== 'GET') {
 7:     return res.status(405).json({ error: 'Method not allowed' });
 8:   }
 9: 
10:   const tools = mcpToolManager.getTools();
11:   
12:   res.json({
13:     status: 'ok',
14:     tools: tools.map(t => t.name),
15:     connectedClients: getClientCount(),
16:     timestamp: new Date().toISOString(),
17:     serverInfo: {
18:       name: 'EkoMcpServer (Next.js)',
19:       version: '1.0.0',
20:       totalTools: tools.length
21:     }
22:   });
23: }
````

## File: src/pages/api/mcp/message.ts
````typescript
  1: import { NextApiRequest, NextApiResponse } from 'next';
  2: import mcpToolManager from '../../../lib/mcpTools';
  3: import { sendSseMessage, getClientCount } from './sse';
  4: 
  5: interface McpListToolParam {
  6:   taskId: string;
  7:   nodeId: string;
  8:   environment: string;
  9:   agent_name: string;
 10:   prompt: string;
 11:   browser_url?: string;
 12:   params: Record<string, any>;
 13: }
 14: 
 15: interface McpCallToolParam {
 16:   name: string;
 17:   arguments: Record<string, any>;
 18:   extInfo?: Record<string, any>;
 19: }
 20: 
 21: export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 22:   if (req.method !== 'POST') {
 23:     return res.status(405).json({ error: 'Method not allowed' });
 24:   }
 25: 
 26:   try {
 27:     const { jsonrpc, id, method, params } = req.body;
 28:     
 29:     console.log(`Received ${method} request:`, { id, params });
 30: 
 31:     let result: any;
 32:     
 33:     switch (method) {
 34:       case 'initialize':
 35:         result = {
 36:           protocolVersion: '2024-11-05',
 37:           capabilities: {
 38:             tools: {
 39:               listChanged: true,
 40:             },
 41:             sampling: {},
 42:           },
 43:           serverInfo: {
 44:             name: 'EkoMcpServer',
 45:             version: '1.0.0',
 46:           },
 47:         };
 48:         break;
 49: 
 50:       case 'tools/list':
 51:         result = await handleListTools(params);
 52:         break;
 53: 
 54:       case 'tools/call':
 55:         result = await handleCallTool(params);
 56:         break;
 57: 
 58:       case 'ping':
 59:         result = {};
 60:         break;
 61: 
 62:       default:
 63:         throw new Error(`Unknown method: ${method}`);
 64:     }
 65: 
 66:     // Send response
 67:     res.status(200).send('Accepted');
 68: 
 69:     // Check if there are active SSE connections
 70:     if (getClientCount() === 0) {
 71:       console.warn(`No SSE clients connected for message ${id}`);
 72:       return;
 73:     }
 74: 
 75:     // Send result via SSE, add brief delay to ensure SSE connection is ready
 76:     setTimeout(() => {
 77:       try {
 78:         sendSseMessage(id, { jsonrpc, id, result });
 79:       } catch (error) {
 80:         console.error(`Failed to send SSE message for ${id}:`, error);
 81:       }
 82:     }, 50);
 83: 
 84:   } catch (error) {
 85:     console.error('Error handling request:', error);
 86:     res.status(500).json({
 87:       jsonrpc: '2.0',
 88:       id: req.body.id,
 89:       error: {
 90:         code: -32603,
 91:         message: error instanceof Error ? error.message : 'Internal error'
 92:       }
 93:     });
 94:   }
 95: }
 96: 
 97: async function handleListTools(params: McpListToolParam): Promise<{ tools: any[] }> {
 98:   console.log('Listing tools for:', params);
 99:   
100:   const tools = mcpToolManager.getTools();
101:   return { tools };
102: }
103: 
104: async function handleCallTool(params: McpCallToolParam): Promise<any> {
105:   const { name, arguments: args, extInfo } = params;
106:   console.log(`Calling tool: ${name}`, { args, extInfo });
107: 
108:   try {
109:     const result = await mcpToolManager.callTool(name, args, extInfo);
110:     return result;
111:   } catch (error) {
112:     console.error(`Error executing tool ${name}:`, error);
113:     throw error;
114:   }
115: }
````

## File: src/pages/api/mcp/sse.ts
````typescript
 1: import { NextApiRequest, NextApiResponse } from 'next';
 2: 
 3: // Store all SSE connected clients - use global variable to avoid hot reload reset
 4: declare global {
 5:   var __sseClients: Set<NextApiResponse> | undefined;
 6: }
 7: 
 8: const clients = globalThis.__sseClients ?? (globalThis.__sseClients = new Set<NextApiResponse>());
 9: 
10: export default function handler(req: NextApiRequest, res: NextApiResponse) {
11:   if (req.method !== 'GET') {
12:     return res.status(405).json({ error: 'Method not allowed' });
13:   }
14: 
15:   // Set SSE headers
16:   res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
17:   res.setHeader('Cache-Control', 'no-cache, no-transform');
18:   res.setHeader('Connection', 'keep-alive');
19:   res.setHeader('Access-Control-Allow-Origin', '*');
20:   res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');
21:   res.setHeader('X-Accel-Buffering', 'no');
22: 
23:   // Write initial state to ensure response starts
24:   res.write('data: connected\n\n');
25:   res.status(200);
26: 
27:   // Add to client list
28:   clients.add(res);
29: 
30:   console.log(`SSE client connected, total clients: ${clients.size}, sending endpoint info...`);
31: 
32:   // Ensure connection is stable before sending endpoint info
33:   setTimeout(() => {
34:     try {
35:       res.write(`event: endpoint\ndata: /api/mcp/message\n\n`);
36:       console.log('Sent endpoint info to client');
37:     } catch (error) {
38:       console.error('Error sending endpoint info:', error);
39:       clients.delete(res);
40:     }
41:   }, 100);
42: 
43:   // Handle client disconnection
44:   req.on('close', () => {
45:     clients.delete(res);
46:     console.log(`Client disconnected from SSE, remaining clients: ${clients.size}`);
47:   });
48: 
49:   // Handle connection errors
50:   req.on('error', (error) => {
51:     console.error('SSE connection error:', error);
52:     clients.delete(res);
53:     console.log(`Client error, remaining clients: ${clients.size}`);
54:   });
55: }
56: 
57: // Export a function for other APIs to use, for sending messages to all clients
58: export function sendSseMessage(id: string, data: any) {
59:   console.log(`sendSseMessage ${id}, active clients: ${clients.size}`, data);
60:   const message = `event: message\ndata: ${JSON.stringify(data)}\n\n`;
61: 
62:   if (clients.size === 0) {
63:     console.warn(`No SSE clients available for message ${id}`);
64:     return;
65:   }
66: 
67:   // Send message to all connected clients
68:   const failedClients: NextApiResponse[] = [];
69:   clients.forEach(client => {
70:     try {
71:       // Check if connection is still valid
72:       if (client.writable && !client.destroyed) {
73:         client.write(message);
74:         console.log('Successfully sent SSE message to client');
75:       } else {
76:         console.warn('Client connection is not writable, removing from clients');
77:         failedClients.push(client);
78:       }
79:     } catch (error) {
80:       console.error('Error sending SSE message to client:', error);
81:       failedClients.push(client);
82:     }
83:   });
84: 
85:   // Clean up invalid client connections
86:   failedClients.forEach(client => clients.delete(client));
87: }
88: 
89: // Export client count for health check use
90: export function getClientCount() {
91:   return clients.size;
92: }
93: 
94: // Next.js API configuration
95: export const config = {
96:   api: {
97:     bodyParser: false,
98:   },
99: };
````

## File: src/pages/api/test/test-douyin-real.ts
````typescript
 1: import { NextApiRequest, NextApiResponse } from 'next';
 2: import { DouyinService } from '../../../lib/douyin';
 3: 
 4: export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 5:   if (req.method !== 'GET') {
 6:     return res.status(405).json({ error: 'Method not allowed' });
 7:   }
 8: 
 9:   const { tool, share_link } = req.query;
10: 
11:   if (!tool || !share_link) {
12:     return res.status(400).json({
13:       error: 'Missing parameters',
14:       usage: '/api/test-douyin-real?tool=parse_douyin_video_info&share_link=Douyin_share_link'
15:     });
16:   }
17: 
18:   try {
19:     const douyinService = new DouyinService({
20:       apiKey: process.env.BAILIAN_API_KEY || ''
21:     });
22: 
23:     let result;
24: 
25:     switch (tool) {
26:       case 'parse_douyin_video_info':
27:         result = await douyinService.getVideoInfo(share_link as string);
28:         break;
29:       case 'get_douyin_download_link':
30:         result = await douyinService.getDownloadLink(share_link as string);
31:         break;
32:       case 'extract_douyin_text':
33:         result = await douyinService.extractText(share_link as string);
34:         break;
35:       default:
36:         return res.status(400).json({ error: 'Invalid tool' });
37:     }
38: 
39:     res.json({
40:       success: true,
41:       tool,
42:       share_link,
43:       result,
44:       timestamp: new Date().toISOString()
45:     });
46: 
47:   } catch (error) {
48:     console.error('Douyin real test error:', error);
49:     res.status(500).json({
50:       success: false,
51:       error: error instanceof Error ? error.message : 'Unknown error',
52:       tool,
53:       share_link
54:     });
55:   }
56: }
````

## File: src/pages/api/test/test-xiaohongshu.ts
````typescript
 1: import { NextApiRequest, NextApiResponse } from 'next';
 2: import { XiaohongshuService } from '../../../lib/xiaohongshu';
 3: 
 4: export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 5:   if (req.method !== 'GET') {
 6:     return res.status(405).json({ error: 'Method not allowed' });
 7:   }
 8: 
 9:   const { tool, share_link } = req.query;
10: 
11:   if (!tool || !share_link) {
12:     return res.status(400).json({
13:       error: 'Missing parameters',
14:       usage: '/api/test/test-xiaohongshu?tool=extract_xiaohongshu_text&share_link=Xiaohongshu_video_link&model=sensevoice-v1'
15:     });
16:   }
17: 
18:   try {
19:     const xiaohongshuService = new XiaohongshuService({
20:       apiKey: process.env.BAILIAN_API_KEY || ''
21:     });
22: 
23:     let result;
24: 
25:     switch (tool) {
26:       case 'extract_xiaohongshu_text':
27:         const { model } = req.query;
28:         result = await xiaohongshuService.extractText(share_link as string, model as string);
29:         break;
30:       default:
31:         return res.status(400).json({
32:           error: 'Invalid tool',
33:           availableTools: ['extract_xiaohongshu_text']
34:         });
35:     }
36: 
37:     res.json({
38:       success: true,
39:       tool,
40:       share_link,
41:       result,
42:       timestamp: new Date().toISOString()
43:     });
44: 
45:   } catch (error) {
46:     console.error('Xiaohongshu test error:', error);
47:     res.status(500).json({
48:       success: false,
49:       error: error instanceof Error ? error.message : 'Unknown error',
50:       tool,
51:       share_link,
52:       timestamp: new Date().toISOString()
53:     });
54:   }
55: }
````

## File: src/pages/api/task-templates.ts
````typescript
  1: import { NextApiRequest, NextApiResponse } from 'next';
  2: import { TaskTemplate } from '@/models';
  3: 
  4: /**
  5:  * Task Templates API
  6:  * GET /api/task-templates - Get all task templates
  7:  */
  8: export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  9:   if (req.method === 'GET') {
 10:     try {
 11:       // Here we can get templates from configuration files, database, or remote services
 12:       // Temporarily return hardcoded template list
 13:       const templates: TaskTemplate[] = [
 14:         {
 15:           id: 'stock-analysis',
 16:           name: 'Stock Analysis',
 17:           description: 'Analyze market data and technical indicators for specified stocks',
 18:           category: 'Finance',
 19:           steps: [
 20:             {
 21:               id: 'step-1',
 22:               name: 'Open Trading Software',
 23:               content: 'Open trading software',
 24:               order: 1
 25:             },
 26:             {
 27:               id: 'step-2',
 28:               name: 'Search Stock',
 29:               content: 'Enter stock code or name in search box',
 30:               order: 2
 31:             },
 32:             {
 33:               id: 'step-3',
 34:               name: 'View K-line Chart',
 35:               content: 'Switch to daily K-line chart view',
 36:               order: 3
 37:             },
 38:             {
 39:               id: 'step-4',
 40:               name: 'Screenshot and Save',
 41:               content: 'Take screenshot and save K-line chart',
 42:               order: 4
 43:             },
 44:             {
 45:               id: 'step-5',
 46:               name: 'Analyze Financial Data',
 47:               content: 'View and analyze financial statement data',
 48:               order: 5
 49:             }
 50:           ]
 51:         },
 52:         {
 53:           id: 'news-collection',
 54:           name: 'Financial News Collection',
 55:           description: 'Collect and organize daily financial news',
 56:           category: 'Information Collection',
 57:           steps: [
 58:             {
 59:               id: 'step-1',
 60:               name: 'Open Financial Website',
 61:               content: 'Open financial websites like East Money or Sina Finance',
 62:               order: 1
 63:             },
 64:             {
 65:               id: 'step-2',
 66:               name: 'Get News List',
 67:               content: 'Extract today\'s headline news title list',
 68:               order: 2
 69:             },
 70:             {
 71:               id: 'step-3',
 72:               name: 'Filter Important News',
 73:               content: 'Filter out important market news',
 74:               order: 3
 75:             },
 76:             {
 77:               id: 'step-4',
 78:               name: 'Save Data',
 79:               content: 'Save news information to file',
 80:               order: 4
 81:             }
 82:           ]
 83:         },
 84:         {
 85:           id: 'market-monitor',
 86:           name: 'Market Monitoring',
 87:           description: 'Monitor market indices and key stock fluctuations',
 88:           category: 'Finance',
 89:           steps: [
 90:             {
 91:               id: 'step-1',
 92:               name: 'Open Market Software',
 93:               content: 'Open market software like Tonghuashun or East Money',
 94:               order: 1
 95:             },
 96:             {
 97:               id: 'step-2',
 98:               name: 'View Market Indices',
 99:               content: 'View Shanghai Composite Index, Shenzhen Component Index, ChiNext Index',
100:               order: 2
101:             },
102:             {
103:               id: 'step-3',
104:               name: 'View Watchlist',
105:               content: 'Open watchlist and view price changes',
106:               order: 3
107:             },
108:             {
109:               id: 'step-4',
110:               name: 'Generate Report',
111:               content: 'Generate market monitoring report and save',
112:               order: 4
113:             }
114:           ]
115:         },
116:         {
117:           id: 'data-backup',
118:           name: 'Data Backup',
119:           description: 'Regularly backup important files and data',
120:           category: 'System',
121:           steps: [
122:             {
123:               id: 'step-1',
124:               name: 'Check Backup Directory',
125:               content: 'Check if backup directory exists',
126:               order: 1
127:             },
128:             {
129:               id: 'step-2',
130:               name: 'Copy Files',
131:               content: 'Copy specified folders to backup directory',
132:               order: 2
133:             },
134:             {
135:               id: 'step-3',
136:               name: 'Compress Backup',
137:               content: 'Compress backup files into archive',
138:               order: 3
139:             },
140:             {
141:               id: 'step-4',
142:               name: 'Verify Backup',
143:               content: 'Verify backup file integrity',
144:               order: 4
145:             }
146:           ]
147:         },
148:         {
149:           id: 'xiaohongshu-post',
150:           name: 'Xiaohongshu Content Collection',
151:           description: 'Collect Xiaohongshu trending content and topics',
152:           category: 'Information Collection',
153:           steps: [
154:             {
155:               id: 'step-1',
156:               name: 'Open Xiaohongshu',
157:               content: 'Open Xiaohongshu web version',
158:               order: 1
159:             },
160:             {
161:               id: 'step-2',
162:               name: 'Search Topics',
163:               content: 'Search specified topics or keywords',
164:               order: 2
165:             },
166:             {
167:               id: 'step-3',
168:               name: 'Collect Content',
169:               content: 'Collect trending notes titles and content',
170:               order: 3
171:             },
172:             {
173:               id: 'step-4',
174:               name: 'Save Data',
175:               content: 'Save collected data to file',
176:               order: 4
177:             }
178:           ]
179:         }
180:       ];
181: 
182:       res.status(200).json(templates);
183:     } catch (error: any) {
184:       console.error('Failed to get task templates:', error);
185:       res.status(500).json({ error: 'Failed to get task templates', message: error.message });
186:     }
187:   } else {
188:     res.status(405).json({ error: 'Method not allowed' });
189:   }
190: }
````

## File: src/pages/_app.tsx
````typescript
 1: import "@/styles/globals.css";
 2: import type { AppProps } from "next/app";
 3: import { ConfigProvider, App } from 'antd';
 4: import theme from '@/config/themeConfig';
 5: import '@/lib/i18n';  // Initialize i18n
 6: import { useLanguage } from '@/hooks/useLanguage';
 7: import { useEffect } from 'react';
 8: import { useLanguageStore } from '@/stores/languageStore';
 9: import i18n from '@/lib/i18n';
10: 
11: export default function MyApp({ Component, pageProps }: AppProps) {
12:   const { antdLocale } = useLanguage();
13:   const { setLanguage } = useLanguageStore();
14: 
15:   // Load saved language from Electron store on mount
16:   useEffect(() => {
17:     const loadSavedLanguage = async () => {
18:       if (typeof window !== 'undefined' && (window as any).api) {
19:         try {
20:           const savedLanguage = await (window as any).api.invoke('config:get-language');
21:           if (savedLanguage) {
22:             await i18n.changeLanguage(savedLanguage);
23:             setLanguage(savedLanguage);
24:             console.log(`[App] Loaded saved language: ${savedLanguage}`);
25:           }
26:         } catch (error) {
27:           console.error('[App] Failed to load saved language:', error);
28:         }
29:       }
30:     };
31: 
32:     loadSavedLanguage();
33:   }, [setLanguage]);
34: 
35:   return (
36:     <ConfigProvider theme={theme} locale={antdLocale}>
37:       <App className="h-full">
38:         <Component {...pageProps} />
39:       </App>
40:     </ConfigProvider>
41:   );
42: }
````

## File: src/pages/_document.tsx
````typescript
 1: import React from 'react';
 2: import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
 3: import Document, { Head, Html, Main, NextScript } from 'next/document';
 4: import type { DocumentContext } from 'next/document';
 5: 
 6: const MyDocument = () => (
 7:   <Html lang="en">
 8:     <Head />
 9:     <body>
10:       <Main />
11:       <NextScript />
12:     </body>
13:   </Html>
14: );
15: 
16: MyDocument.getInitialProps = async (ctx: DocumentContext) => {
17:   const cache = createCache();
18:   const originalRenderPage = ctx.renderPage;
19:   ctx.renderPage = () =>
20:     originalRenderPage({
21:       enhanceApp: (App) => (props) => (
22:         <StyleProvider cache={cache}>
23:           <App {...props} />
24:         </StyleProvider>
25:       ),
26:     });
27: 
28:   const initialProps = await Document.getInitialProps(ctx);
29:   const style = extractStyle(cache, true);
30:   return {
31:     ...initialProps,
32:     styles: (
33:       <>
34:         {initialProps.styles}
35:         <style dangerouslySetInnerHTML={{ __html: style }} />
36:       </>
37:     ),
38:   };
39: };
40: 
41: export default MyDocument;
````

## File: src/pages/agent-config.tsx
````typescript
  1: import React, { useState, useEffect } from 'react';
  2: import { Tabs, Switch, Input, Button, Card, App, Spin, Divider, Space, Typography } from 'antd';
  3: import { SaveOutlined, ReloadOutlined, SettingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
  4: import { useRouter } from 'next/router';
  5: import type { AgentConfig, McpToolSchema } from '../type';
  6: import { useTranslation } from 'react-i18next';
  7: 
  8: const { TabPane } = Tabs;
  9: const { TextArea } = Input;
 10: const { Title, Text, Paragraph } = Typography;
 11: 
 12: /**
 13:  * Agent Configuration Page Component
 14:  * Allows users to configure agents and MCP tools
 15:  */
 16: export default function AgentConfigPage() {
 17:   const { t } = useTranslation('agentConfig');
 18:   const { message } = App.useApp();
 19:   const router = useRouter();
 20:   const [loading, setLoading] = useState(true);
 21:   const [saving, setSaving] = useState(false);
 22:   const [config, setConfig] = useState<AgentConfig>({
 23:     browserAgent: { enabled: true, customPrompt: '' },
 24:     fileAgent: { enabled: true, customPrompt: '' },
 25:     mcpTools: {}
 26:   });
 27:   const [mcpTools, setMcpTools] = useState<McpToolSchema[]>([]);
 28: 
 29:   // Load configuration on mount
 30:   useEffect(() => {
 31:     loadConfiguration();
 32:   }, []);
 33: 
 34:   const loadConfiguration = async () => {
 35:     setLoading(true);
 36:     try {
 37:       // Load agent config
 38:       const agentResult = await window.api.getAgentConfig();
 39:       if (agentResult.success) {
 40:         setConfig(agentResult.data);
 41:       }
 42: 
 43:       // Load MCP tools
 44:       const toolsResult = await window.api.getMcpTools();
 45:       if (toolsResult.success) {
 46:         setMcpTools(toolsResult.data);
 47:       }
 48:     } catch (error: any) {
 49:       message.error(t('load_config_failed') + error.message);
 50:     } finally {
 51:       setLoading(false);
 52:     }
 53:   };
 54: 
 55:   const handleSave = async () => {
 56:     setSaving(true);
 57:     try {
 58:       const result = await window.api.saveAgentConfig(config);
 59:       if (result.success) {
 60:         message.success(t('save_success'));
 61:       } else {
 62:         message.error(t('save_failed'));
 63:       }
 64:     } catch (error: any) {
 65:       message.error(t('save_failed') + ': ' + error.message);
 66:     } finally {
 67:       setSaving(false);
 68:     }
 69:   };
 70: 
 71:   const handleReload = async () => {
 72:     await loadConfiguration();
 73:     message.success(t('reload_success'));
 74:   };
 75: 
 76:   const handleToolToggle = async (toolName: string, enabled: boolean) => {
 77:     try {
 78:       // Update local state
 79:       setConfig(prev => ({
 80:         ...prev,
 81:         mcpTools: {
 82:           ...prev.mcpTools,
 83:           [toolName]: { ...prev.mcpTools[toolName], enabled }
 84:         }
 85:       }));
 86: 
 87:       // Update MCP tools list
 88:       setMcpTools(prev =>
 89:         prev.map(tool =>
 90:           tool.name === toolName ? { ...tool, enabled } : tool
 91:         )
 92:       );
 93: 
 94:       // Save to backend
 95:       await window.api.setMcpToolEnabled(toolName, enabled);
 96:     } catch (error: any) {
 97:       message.error(t('tool_update_failed') + ': ' + error.message);
 98:     }
 99:   };
100: 
101:   if (loading) {
102:     return (
103:       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
104:         <Spin size="large" tip={t('loading')} />
105:       </div>
106:     );
107:   }
108: 
109:   return (
110:     <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
111:       {/* Header */}
112:       <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
113:         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
114:           <Button
115:             type="text"
116:             icon={<ArrowLeftOutlined />}
117:             onClick={() => router.push('/home')}
118:             style={{ padding: '4px 8px' }}
119:           >
120:             {t('back')}
121:           </Button>
122:           <div>
123:             <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
124:               <SettingOutlined />
125:               {t('title')}
126:             </Title>
127:             <Text type="secondary">{t('subtitle')}</Text>
128:           </div>
129:         </div>
130:         <Space>
131:           <Button icon={<ReloadOutlined />} onClick={handleReload}>
132:             {t('reload')}
133:           </Button>
134:           <Button
135:             type="primary"
136:             icon={<SaveOutlined />}
137:             onClick={handleSave}
138:             loading={saving}
139:           >
140:             {t('save')}
141:           </Button>
142:         </Space>
143:       </div>
144: 
145:       {/* Configuration Tabs */}
146:       <Tabs defaultActiveKey="browser" type="card">
147:         {/* Browser Agent Tab */}
148:         <TabPane tab={t('browser_agent')} key="browser">
149:           <Card>
150:             <Space direction="vertical" size="large" style={{ width: '100%' }}>
151:               <div>
152:                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
153:                   <Text strong>{t('enable_browser_agent')}</Text>
154:                   <Switch
155:                     checked={config.browserAgent.enabled}
156:                     onChange={(enabled) =>
157:                       setConfig(prev => ({
158:                         ...prev,
159:                         browserAgent: { ...prev.browserAgent, enabled }
160:                       }))
161:                     }
162:                   />
163:                 </div>
164:                 <Paragraph type="secondary" style={{ margin: 0 }}>
165:                   {t('browser_agent_desc')}
166:                 </Paragraph>
167:               </div>
168: 
169:               <Divider />
170: 
171:               <div>
172:                 <Text strong>{t('custom_prompt')}</Text>
173:                 <Paragraph type="secondary">
174:                   {t('custom_prompt_desc')}
175:                 </Paragraph>
176:                 <TextArea
177:                   value={config.browserAgent.customPrompt}
178:                   onChange={(e) =>
179:                     setConfig(prev => ({
180:                       ...prev,
181:                       browserAgent: { ...prev.browserAgent, customPrompt: e.target.value }
182:                     }))
183:                   }
184:                   placeholder={t('browser_prompt_placeholder')}
185:                   rows={6}
186:                   disabled={!config.browserAgent.enabled}
187:                 />
188:               </div>
189:             </Space>
190:           </Card>
191:         </TabPane>
192: 
193:         {/* File Agent Tab */}
194:         <TabPane tab={t('file_agent')} key="file">
195:           <Card>
196:             <Space direction="vertical" size="large" style={{ width: '100%' }}>
197:               <div>
198:                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
199:                   <Text strong>{t('enable_file_agent')}</Text>
200:                   <Switch
201:                     checked={config.fileAgent.enabled}
202:                     onChange={(enabled) =>
203:                       setConfig(prev => ({
204:                         ...prev,
205:                         fileAgent: { ...prev.fileAgent, enabled }
206:                       }))
207:                     }
208:                   />
209:                 </div>
210:                 <Paragraph type="secondary" style={{ margin: 0 }}>
211:                   {t('file_agent_desc')}
212:                 </Paragraph>
213:               </div>
214: 
215:               <Divider />
216: 
217:               <div>
218:                 <Text strong>{t('custom_prompt')}</Text>
219:                 <Paragraph type="secondary">
220:                   {t('custom_prompt_desc')}
221:                 </Paragraph>
222:                 <TextArea
223:                   value={config.fileAgent.customPrompt}
224:                   onChange={(e) =>
225:                     setConfig(prev => ({
226:                       ...prev,
227:                       fileAgent: { ...prev.fileAgent, customPrompt: e.target.value }
228:                     }))
229:                   }
230:                   placeholder={t('file_prompt_placeholder')}
231:                   rows={6}
232:                   disabled={!config.fileAgent.enabled}
233:                 />
234:               </div>
235:             </Space>
236:           </Card>
237:         </TabPane>
238: 
239:         {/* MCP Tools Tab */}
240:         <TabPane tab={t('mcp_tools')} key="tools">
241:           <Card>
242:             <Space direction="vertical" size="large" style={{ width: '100%' }}>
243:               <div>
244:                 <Title level={4} style={{ margin: 0 }}>{t('available_tools')}</Title>
245:                 <Paragraph type="secondary">
246:                   {t('mcp_tools_desc')}
247:                 </Paragraph>
248:               </div>
249: 
250:               <Divider />
251: 
252:               {mcpTools.length === 0 ? (
253:                 <div style={{ textAlign: 'center', padding: '40px 0' }}>
254:                   <Text type="secondary">{t('no_tools')}</Text>
255:                 </div>
256:               ) : (
257:                 <Space direction="vertical" size="middle" style={{ width: '100%' }}>
258:                   {mcpTools.map((tool) => (
259:                     <Card
260:                       key={tool.name}
261:                       size="small"
262:                       style={{
263:                         border: tool.enabled ? '1px solid #1890ff' : '1px solid #d9d9d9',
264:                         backgroundColor: tool.enabled ? '#f0f5ff' : '#ffffff'
265:                       }}
266:                     >
267:                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
268:                         <div style={{ flex: 1 }}>
269:                           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
270:                             <Text strong style={{ fontSize: '16px' }}>{tool.name}</Text>
271:                             <Switch
272:                               checked={tool.enabled}
273:                               onChange={(enabled) => handleToolToggle(tool.name, enabled)}
274:                             />
275:                           </div>
276:                           <Paragraph
277:                             type="secondary"
278:                             style={{ margin: 0, fontSize: '14px' }}
279:                           >
280:                             {tool.description}
281:                           </Paragraph>
282:                           {tool.inputSchema.required.length > 0 && (
283:                             <div style={{ marginTop: '8px' }}>
284:                               <Text type="secondary" style={{ fontSize: '12px' }}>
285:                                 {t('required_params')}: {tool.inputSchema.required.join(', ')}
286:                               </Text>
287:                             </div>
288:                           )}
289:                         </div>
290:                       </div>
291:                     </Card>
292:                   ))}
293:                 </Space>
294:               )}
295:             </Space>
296:           </Card>
297:         </TabPane>
298:       </Tabs>
299:     </div>
300:   );
301: }
````

## File: src/pages/file-view.tsx
````typescript
  1: import { useState, useEffect, useRef } from 'react';
  2: import { Layout, Typography, Card, Button, Space, Spin, App } from 'antd';
  3: import {
  4:   FileTextOutlined,
  5:   DownloadOutlined,
  6:   CopyOutlined,
  7:   CodeOutlined,
  8:   FileOutlined
  9: } from '@ant-design/icons';
 10: import { useTranslation } from 'react-i18next';
 11: 
 12: const { Content } = Layout;
 13: const { Title, Text } = Typography;
 14: 
 15: interface FileViewState {
 16:   content: string;
 17:   isLoading: boolean;
 18:   fileName: string;
 19:   lastUpdated: Date | null;
 20:   wordCount: number;
 21:   lineCount: number;
 22:   url: string;
 23: }
 24: 
 25: export default function FileView() {
 26:   const { t } = useTranslation('fileView');
 27:   const { message } = App.useApp();
 28:   const [fileState, setFileState] = useState<FileViewState>({
 29:     content: '',
 30:     isLoading: true,
 31:     fileName: 'filename',
 32:     lastUpdated: null,
 33:     wordCount: 0,
 34:     lineCount: 0,
 35:     url: ''
 36:   });
 37: 
 38:   const contentRef = useRef<HTMLDivElement>(null);
 39: 
 40:   type ShowTypeOption = 'code' | 'preview';
 41: 
 42:   const [showType, setShowType] = useState<ShowTypeOption>('code')
 43:   const [url, setUrl] = useState<string>('')
 44: 
 45:   // Calculate file statistics
 46:   const calculateStats = (content: string) => {
 47:     const lineCount = content.split('\n').length;
 48:     const wordCount = content.replace(/\s+/g, ' ').trim().split(' ').filter(word => word.length > 0).length;
 49:     return { wordCount, lineCount };
 50:   };
 51: 
 52:   // Listen for file update events
 53:   useEffect(() => {
 54:     const handleFileUpdated = (status: ShowTypeOption, content: string) => {
 55:       console.log('File content updated:', content.length, 'characters');
 56: 
 57:       setShowType(status)
 58:       if (status === 'preview') {
 59:         setFileState(pre => ({
 60:           ...pre,
 61:           url: content,
 62:           isLoading: false,
 63:           lastUpdated: new Date(),
 64:         }))
 65:         return;
 66:       }
 67: 
 68:       const stats = calculateStats(content);
 69:       
 70:       setFileState(prev => ({
 71:         ...prev,
 72:         content,
 73:         isLoading: false,
 74:         lastUpdated: new Date(),
 75:         wordCount: stats.wordCount,
 76:         lineCount: stats.lineCount
 77:       }));
 78: 
 79:       // Scroll to bottom to show latest content
 80:       setTimeout(() => {
 81:         if (contentRef.current) {
 82:           contentRef.current.scrollTop = contentRef.current.scrollHeight;
 83:         }
 84:       }, 100);
 85:     };
 86: 
 87:     // Listen for file update events from main thread
 88:     if (window.api?.onFileUpdated) {
 89:       window.api.onFileUpdated(handleFileUpdated);
 90:     }
 91: 
 92:     // Set loading state on initialization
 93:     setTimeout(() => {
 94:       if (fileState.content === '') {
 95:         setFileState(prev => ({ ...prev, isLoading: false }));
 96:       }
 97:     }, 3000);
 98: 
 99:     // Clean up listeners
100:     return () => {
101:       if (window.api?.removeAllListeners) {
102:         window.api.removeAllListeners('file-updated');
103:       }
104:     };
105:   }, []);
106: 
107:   // Copy content to clipboard
108:   const handleCopy = async () => {
109:     try {
110:       await navigator.clipboard.writeText(fileState.content);
111:       message.success(t('copy_success'));
112:     } catch (error) {
113:       console.error('Copy failed:', error);
114:       message.error(t('copy_failed'));
115:     }
116:   };
117: 
118:   // Download file
119:   const handleDownload = () => {
120:     const blob = new Blob([fileState.content], { type: 'text/plain;charset=utf-8' });
121:     const url = URL.createObjectURL(blob);
122:     const a = document.createElement('a');
123:     a.href = url;
124:     a.download = `${fileState.fileName}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
125:     document.body.appendChild(a);
126:     a.click();
127:     document.body.removeChild(a);
128:     URL.revokeObjectURL(url);
129:     message.success(t('download_success'));
130:   };
131: 
132:   // Format time
133:   const formatTime = (date: Date) => {
134:     return date.toLocaleString('zh-CN', {
135:       year: 'numeric',
136:       month: '2-digit',
137:       day: '2-digit',
138:       hour: '2-digit',
139:       minute: '2-digit',
140:       second: '2-digit'
141:     });
142:   };
143: 
144:   return (
145:     <Layout style={{ height: '100vh' }}>
146:       <Content className='p-4 flex flex-col' style={{ padding: '16px' }}>
147:         {/* Header information bar */}
148:         <Card>
149:           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
150:             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
151:               <FileTextOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
152:               <div>
153:                 <Title level={4} style={{ margin: 0 }}>
154:                   {t('title')}
155:                 </Title>
156:                 <Text type="secondary" style={{ fontSize: '12px' }}>
157:                   {fileState.lastUpdated ? t('last_updated', { time: formatTime(fileState.lastUpdated) }) : t('waiting_content')}
158:                 </Text>
159:               </div>
160:             </div>
161: 
162:             <Space>
163:               <Text type="secondary" style={{ fontSize: '12px' }}>
164:                 {t('stats', { lines: fileState.lineCount, words: fileState.wordCount })}
165:               </Text>
166:               <Button
167:                 icon={<CodeOutlined />}
168:                 size="small"
169:                 onClick={() => setShowType('code')}
170:                 type={showType === 'code' ? 'primary' : 'default'}
171:               >
172:                 {t('code')}
173:               </Button>
174:               <Button
175:                 icon={<FileOutlined />}
176:                 size="small"
177:                 onClick={() => setShowType('preview')}
178:                 disabled={!fileState.url}
179:                 type={showType === 'preview' ? 'primary' : 'default'}
180:               >
181:                 {t('preview')}
182:               </Button>
183:               <Button
184:                 icon={<CopyOutlined />}
185:                 size="small"
186:                 onClick={handleCopy}
187:                 disabled={!fileState.content}
188:               >
189:                 {t('copy')}
190:               </Button>
191:               <Button
192:                 icon={<DownloadOutlined />}
193:                 size="small"
194:                 onClick={handleDownload}
195:                 disabled={!fileState.content}
196:               >
197:                 {t('download')}
198:               </Button>
199:             </Space>
200:           </div>
201:         </Card>
202: 
203:         {/* File content area */}
204:         {showType === 'code' ? (<Card className='flex-1 overflow-auto' ref={contentRef}>
205:           {fileState.isLoading ? (
206:             <div style={{
207:               display: 'flex',
208:               justifyContent: 'center',
209:               alignItems: 'center',
210:               height: '100%',
211:               flexDirection: 'column',
212:               gap: '16px'
213:             }}>
214:               <Spin size="large" />
215:               <Text type="secondary">{t('waiting_ai')}</Text>
216:             </div>
217:           ) : fileState.content ? (
218:             <div
219:               style={{
220:                 height: '100%',
221:                 overflow: 'auto',
222:                 fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
223:                 fontSize: '14px',
224:                 lineHeight: '1.6',
225:                 whiteSpace: 'pre-wrap',
226:                 wordBreak: 'break-word',
227:                 padding: '16px',
228:                 borderRadius: '6px'
229:               }}
230:             >
231:               {fileState.content}
232:             </div>
233:           ) : (
234:             <div style={{
235:               display: 'flex',
236:               justifyContent: 'center',
237:               alignItems: 'center',
238:               height: '100%',
239:               flexDirection: 'column',
240:               gap: '16px'
241:             }}>
242:               <FileTextOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />
243:               <div style={{ textAlign: 'center' }}>
244:                 <Title level={4} type="secondary">{t('no_content')}</Title>
245:                 <Text type="secondary">
246:                   {t('no_content_hint')}
247:                 </Text>
248:               </div>
249:             </div>
250:           )}
251:         </Card>) : (<>
252:         <iframe src={fileState.url} className='h-full bg-white' frameborder="0"></iframe>
253:         </>)}
254:         
255:       </Content>
256:     </Layout>
257:   );
258: }
````

## File: src/pages/home.tsx
````typescript
  1: import React, { useState, useEffect } from 'react'
  2: import { useRouter } from 'next/router'
  3: import Header from '@/components/Header'
  4: import { Input } from 'antd'
  5: import { ScheduledTaskModal, ScheduledTaskListPanel } from '@/components/scheduled-task'
  6: import { useScheduledTaskStore } from '@/stores/scheduled-task-store'
  7: import { ModelConfigBar } from '@/components/ModelConfigBar'
  8: import { ChromeBrowserBackground } from '@/components/fellou/ChromeBrowserBackground'
  9: import { useTranslation } from 'react-i18next'
 10: 
 11: export default function Home() {
 12:     const [query, setQuery] = useState('')
 13:     const router = useRouter()
 14:     const { t } = useTranslation('home')
 15: 
 16:     // Initialize scheduled task scheduler
 17:     // Note: Use main process state flag to prevent duplicate initialization due to route switching
 18:     useEffect(() => {
 19:         const initScheduler = async () => {
 20:             try {
 21:                 // Check if main process is already initialized
 22:                 if (typeof window !== 'undefined' && (window as any).api) {
 23:                     const isInitialized = await (window as any).api.invoke('scheduler:is-initialized')
 24: 
 25:                     if (isInitialized) {
 26:                         return
 27:                     }
 28: 
 29:                     // Load and register all enabled tasks from storage
 30:                     const { initializeScheduler } = useScheduledTaskStore.getState()
 31:                     await initializeScheduler()
 32: 
 33:                     // Mark main process as initialized
 34:                     await (window as any).api.invoke('scheduler:mark-initialized')
 35:                 }
 36:             } catch (error) {
 37:                 console.error('[Home] Failed to initialize scheduler:', error)
 38:             }
 39:         }
 40: 
 41:         initScheduler()
 42:     }, [])
 43: 
 44:     // Handle sending message
 45:     const handleSendMessage = () => {
 46:         if (query.trim()) {
 47:             // Use sessionStorage to implicitly pass message
 48:             if (typeof window !== 'undefined') {
 49:                 sessionStorage.setItem('pendingMessage', query.trim())
 50:             }
 51:             // Directly navigate to main page without URL parameters
 52:             router.push('/main')
 53:         }
 54:     }
 55: 
 56:     // Handle Enter key
 57:     const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
 58:         if (e.key === 'Enter' && !e.shiftKey) {
 59:             e.preventDefault()
 60:             handleSendMessage()
 61:         }
 62:     }
 63: 
 64:     return (
 65:         <>
 66:             <ChromeBrowserBackground/>
 67:             <Header />
 68:             <div className='bg-main-view bg-origin-padding bg-no-repeat bg-cover h-[calc(100%_-_48px)] overflow-y-auto text-text-01-dark flex flex-col'>
 69:                 <div className='flex flex-col items-center pt-[130px] w-full h-full overflow-y-auto z-10'>
 70:                     {/* Greeting */}
 71:                     <div className='text-left leading-10 text-text-01-dark text-[28px] font-bold'>
 72:                         <div>{t('greeting_name')}</div>
 73:                         <p>{t('greeting_intro')}</p>
 74:                     </div>
 75: 
 76:                     {/* Unified Input Area: Model Config + Query Input */}
 77:                     <div className='gradient-border w-[740px] mt-[30px]' style={{ height: 'auto' }}>
 78:                         <div className='bg-tool-call rounded-xl w-full h-full'>
 79:                             {/* Model Configuration Bar */}
 80:                             <ModelConfigBar />
 81: 
 82:                             {/* Query input box */}
 83:                             <div className='h-[160px] p-4'>
 84:                                 <Input.TextArea
 85:                                     value={query}
 86:                                     onChange={(e) => setQuery(e.target.value)}
 87:                                     onKeyDown={handleKeyDown}
 88:                                     className='!h-full !bg-transparent !text-text-01-dark !placeholder-text-12-dark !py-3 !px-4 !border !border-solid'
 89:                                     placeholder={t('input_placeholder')}
 90:                                     autoSize={false}
 91:                                     style={{
 92:                                         borderColor: 'rgba(255, 255, 255, 0.2)',
 93:                                         borderWidth: '1px',
 94:                                     }}
 95:                                 />
 96:                             </div>
 97:                         </div>
 98:                     </div>
 99: 
100:                 </div>
101: 
102:                 {/* Bottom background decoration */}
103:                 <div className='absolute bottom-0 w-full h-[212px] bg-main-view-footer bg-cover bg-no-repeat bg-center'></div>
104:             </div>
105: 
106:             {/* Scheduled task related components */}
107:             <ScheduledTaskModal />
108:             <ScheduledTaskListPanel />
109:         </>
110:     )
111: }
````

## File: src/pages/main.tsx
````typescript
  1: import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
  2: import { useRouter } from 'next/router'
  3: import Header from '@/components/Header'
  4: import { Input, Slider, Button, App } from 'antd'
  5: import { EkoResult, StreamCallbackMessage } from '@jarvis-agent/core/dist/types';
  6: import { MessageList } from '@/components/chat/MessageComponents';
  7: import { uuidv4 } from '@/common/utils';
  8: import { StepUpDown, SendMessage, CancleTask } from '@/icons/deepfundai-icons';
  9: import { Task, ToolAction } from '@/models';
 10: import { MessageProcessor } from '@/utils/messageTransform';
 11: import { useTaskManager } from '@/hooks/useTaskManager';
 12: import { useHistoryStore } from '@/stores/historyStore';
 13: import { scheduledTaskStorage } from '@/lib/scheduled-task-storage';
 14: import { useTranslation } from 'react-i18next';
 15: 
 16: 
 17: export default function main() {
 18:     const { t } = useTranslation('main');
 19:     const { message: antdMessage } = App.useApp();
 20:     const router = useRouter();
 21:     const { taskId: urlTaskId, executionId: urlExecutionId } = router.query;
 22: 
 23:     // Check if in task detail mode (opened from scheduled task window)
 24:     const isTaskDetailMode = !!urlTaskId && !!urlExecutionId;
 25: 
 26:     // Scheduled task's scheduledTaskId (from URL)
 27:     const scheduledTaskIdFromUrl = typeof urlTaskId === 'string' ? urlTaskId : undefined;
 28: 
 29:     // Use task management Hook
 30:     const {
 31:         tasks,
 32:         messages,
 33:         currentTaskId,
 34:         isHistoryMode,
 35:         setCurrentTaskId,
 36:         updateTask,
 37:         createTask,
 38:         updateMessages,
 39:         addToolHistory,
 40:         replaceTaskId,
 41:         enterHistoryMode,
 42:     } = useTaskManager();
 43: 
 44:     // Use Zustand history state management
 45:     const { selectedHistoryTask, clearSelectedHistoryTask, setTerminateCurrentTaskFn } = useHistoryStore();
 46: 
 47:     const [showDetail, setShowDetail] = useState(false);
 48:     const [query, setQuery] = useState('');
 49:     const [currentUrl, setCurrentUrl] = useState<string>('');
 50:     // Current tool information state
 51:     const [currentTool, setCurrentTool] = useState<{
 52:         toolName: string;
 53:         operation: string;
 54:         status: 'running' | 'completed' | 'error';
 55:     } | null>(null);
 56:     // Tool call history
 57:     const [toolHistory, setToolHistory] = useState<(ToolAction & { screenshot?: string, toolSequence?: number })[]>([]);
 58:     // Current displayed history tool index, -1 means showing the latest detail panel
 59:     const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(-1);
 60: 
 61:     const showDetailAgents = ['Browser', 'File'];
 62: 
 63:     const [ekoRequest, setEkoRequest] = useState<Promise<any> | null>(null)
 64: 
 65:     // Check if current task is running
 66:     const isCurrentTaskRunning = useMemo(() => {
 67:         if (!currentTaskId || isHistoryMode) return false;
 68: 
 69:         const currentTask = tasks.find(task => task.id === currentTaskId);
 70:         return currentTask?.status === 'running';
 71:     }, [currentTaskId, isHistoryMode, tasks]);
 72: 
 73:     // Task ID reference
 74:     const taskIdRef = useRef<string>(currentTaskId);
 75:     // Message processor
 76:     const messageProcessorRef = useRef(new MessageProcessor());
 77:     // Execution ID reference, generate new unique identifier for each task execution
 78:     const executionIdRef = useRef<string>('');
 79:     // Scroll related state and references
 80:     const scrollContainerRef = useRef<HTMLDivElement>(null);
 81:     const [isAtBottom, setIsAtBottom] = useState(true);
 82:     const [isUserScrolling, setIsUserScrolling] = useState(false);
 83:     const scrollTimeoutRef = useRef<NodeJS.Timeout>(null);
 84: 
 85:     // Synchronize taskIdRef
 86:     useEffect(() => {
 87:         taskIdRef.current = currentTaskId;
 88:     }, [currentTaskId]);
 89: 
 90:     // Monitor detail panel display status changes, synchronize control of detail view
 91:     useEffect(() => {
 92:         if (window.api && (window.api as any).setDetailViewVisible) {
 93:             const showDetailView = isHistoryMode ? false : showDetail;
 94:             (window.api as any).setDetailViewVisible(showDetailView);
 95:         }
 96: 
 97:         // When detail panel is hidden, also close history screenshot preview view
 98:         if (!showDetail && window.api && (window.api as any).hideHistoryView) {
 99:             (window.api as any).hideHistoryView();
100:         }
101:     }, [showDetail]);
102: 
103:     // Cleanup logic when page is destroyed
104:     useEffect(() => {
105:         return () => {
106:             console.log('Main page unloaded, performing cleanup');
107:             if (window.api) {
108:                 // Close detail view
109:                 if ((window.api as any).setDetailViewVisible) {
110:                     (window.api as any).setDetailViewVisible(false);
111:                 }
112:                 // Close history screenshot preview view
113:                 if ((window.api as any).hideHistoryView) {
114:                     (window.api as any).hideHistoryView();
115:                 }
116:                 // Terminate current task
117:                 if ((window.api as any).ekoCancelTask && taskIdRef.current) {
118:                     window.api.ekoCancelTask(taskIdRef.current);
119:                 }
120:             }
121:         };
122:     }, []); // Empty dependency array, only executes on component mount/unmount
123: 
124:     // Get current URL and monitor URL changes on initialization
125:     useEffect(() => {
126:         const initUrl = async () => {
127:             if (window.api && (window.api as any).getCurrentUrl) {
128:                 const url = await (window.api as any).getCurrentUrl();
129:                 setCurrentUrl(url);
130:             }
131:         };
132: 
133:         // Monitor URL changes
134:         if (window.api && (window.api as any).onUrlChange) {
135:             (window.api as any).onUrlChange((url: string) => {
136:                 setCurrentUrl(url);
137:                 console.log('URL changed:', url);
138:             });
139:         }
140: 
141:         initUrl();
142:     }, []);
143: 
144:     // Handle implicit message passing from home page
145:     useEffect(() => {
146:         if (typeof window !== 'undefined') {
147:             const pendingMessage = sessionStorage.getItem('pendingMessage');
148:             if (pendingMessage) {
149:                 console.log('Detected pending message:', pendingMessage);
150:                 setQuery(pendingMessage);
151:                 // Clear message to avoid duplicate sending
152:                 sessionStorage.removeItem('pendingMessage');
153:                 // Automatically send message
154:                 setTimeout(() => {
155:                     sendMessage(pendingMessage);
156:                 }, 100);
157:             }
158:         }
159:     }, []);
160: 
161:     // Monitor history task selection from Zustand store (as elegant as Pinia's watch!)
162:     useEffect(() => {
163:         if (selectedHistoryTask) {
164:             handleSelectHistoryTask(selectedHistoryTask);
165:             // Clear selection after processing
166:             clearSelectedHistoryTask();
167:         }
168:     }, [selectedHistoryTask]);
169: 
170:     // Monitor open history panel event (click "Execution History" from scheduled task list)
171:     useEffect(() => {
172:         if (!isTaskDetailMode || !window.api) return;
173: 
174:         const handleOpenHistoryPanel = (event: any) => {
175:             console.log('[Main] Received open history panel event:', event);
176: 
177:             // Use Zustand to open history panel
178:             const { setShowHistoryPanel } = useHistoryStore.getState();
179:             setShowHistoryPanel(true);
180:         };
181: 
182:         // Monitor open history panel event
183:         if ((window.api as any).onOpenHistoryPanel) {
184:             (window.api as any).onOpenHistoryPanel(handleOpenHistoryPanel);
185:         }
186: 
187:         return () => {
188:             if (window.api && (window.api as any).removeAllListeners) {
189:                 (window.api as any).removeAllListeners('open-history-panel');
190:             }
191:         };
192:     }, [isTaskDetailMode]);
193: 
194:     // Monitor task aborted by system event, update task status to IndexedDB
195:     useEffect(() => {
196:         if (!window.api) return;
197: 
198:         const handleTaskAbortedBySystem = async (event: any) => {
199:             const { taskId, reason, timestamp } = event;
200: 
201:             console.log(`[Main] Task aborted by system: ${taskId}, reason: ${reason}`);
202: 
203:             try {
204:                 // Update task status to abort
205:                 updateTask(taskId, {
206:                     status: 'abort',
207:                     endTime: new Date(timestamp),
208:                 });
209: 
210:                 antdMessage.warning(t('task_terminated_with_reason', { reason }));
211:             } catch (error) {
212:                 console.error('[Main] Failed to update aborted task status:', error);
213:             }
214:         };
215: 
216:         // Monitor task aborted by system event
217:         if ((window.api as any).onTaskAbortedBySystem) {
218:             (window.api as any).onTaskAbortedBySystem(handleTaskAbortedBySystem);
219:         }
220: 
221:         return () => {
222:             if (window.api && (window.api as any).removeAllListeners) {
223:                 (window.api as any).removeAllListeners('task-aborted-by-system');
224:             }
225:         };
226:     }, [updateTask]);
227: 
228:     // Monitor scheduled task execution completion event, update task end time and scheduled task configuration
229:     useEffect(() => {
230:         if (!isTaskDetailMode || !window.api) return;
231: 
232:         const handleTaskExecutionComplete = async (event: any) => {
233:             const { taskId, executionId, status, endTime } = event;
234: 
235:             try {
236:                 const endTimeDate = endTime ? new Date(endTime) : new Date();
237: 
238:                 // Update current task's end time and duration (automatically saved via useTaskManager)
239:                 if (taskIdRef.current) {
240:                     const currentTask = tasks.find(t => t.id === taskIdRef.current);
241:                     const startTime = currentTask?.startTime || currentTask?.createdAt;
242: 
243:                     updateTask(taskIdRef.current, {
244:                         endTime: endTimeDate,
245:                         duration: startTime ? endTimeDate.getTime() - startTime.getTime() : undefined,
246:                         status: status as any,
247:                     });
248:                 }
249: 
250:                 // Update scheduled task configuration's lastExecutedAt field
251:                 const scheduledTaskId = scheduledTaskIdFromUrl || taskId;
252:                 if (scheduledTaskId) {
253:                     await scheduledTaskStorage.updateScheduledTask(scheduledTaskId, {
254:                         lastExecutedAt: endTimeDate
255:                     });
256:                     console.log(`[Main] Scheduled task configuration updated lastExecutedAt: ${scheduledTaskId}`);
257:                 }
258: 
259:                 antdMessage.success(t('task_execution_completed'));
260:             } catch (error) {
261:                 console.error('[Main] Failed to update task completion status:', error);
262:                 antdMessage.error(t('failed_update_task_status'));
263:             }
264:         };
265: 
266:         // Monitor task execution completion event
267:         if ((window.api as any).onTaskExecutionComplete) {
268:             (window.api as any).onTaskExecutionComplete(handleTaskExecutionComplete);
269:         }
270: 
271:         return () => {
272:             if (window.api && (window.api as any).removeAllListeners) {
273:                 (window.api as any).removeAllListeners('task-execution-complete');
274:             }
275:         };
276:     }, [isTaskDetailMode, tasks, updateTask, scheduledTaskIdFromUrl]);
277: 
278:     // Generic function to terminate current task
279:     const terminateCurrentTask = useCallback(async (reason: string = 'User manually terminated') => {
280:         console.log(taskIdRef.current)
281:         if (!currentTaskId || !isCurrentTaskRunning) {
282:             return false; // No task to terminate
283:         }
284: 
285:         try {
286:             const result = await window.api.ekoCancelTask(currentTaskId);
287:             updateTask(currentTaskId, { status: 'abort' });
288:             console.log(`Task terminated, reason: ${reason}`, result);
289:             return true; // Termination successful
290:         } catch (error) {
291:             console.error('Failed to terminate task:', error);
292:             return false; // Termination failed
293:         }
294:     }, [currentTaskId, isCurrentTaskRunning, updateTask]);
295: 
296:     // Register termination function in store for use by other components
297:     useEffect(() => {
298:         setTerminateCurrentTaskFn(terminateCurrentTask);
299:     }, [terminateCurrentTask]);
300: 
301:     // Scroll to bottom function
302:     const scrollToBottom = () => {
303:         if (scrollContainerRef.current) {
304:             scrollContainerRef.current.scrollTo({
305:                 top: scrollContainerRef.current.scrollHeight,
306:                 behavior: 'smooth'
307:             });
308:         }
309:     };
310: 
311:     // Handle scroll events
312:     const handleScroll = () => {
313:         if (!scrollContainerRef.current) return;
314: 
315:         const container = scrollContainerRef.current;
316:         const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
317:         setIsAtBottom(isBottom);
318: 
319:         // User active scrolling marker
320:         setIsUserScrolling(true);
321:         if (scrollTimeoutRef.current) {
322:             clearTimeout(scrollTimeoutRef.current);
323:         }
324:         scrollTimeoutRef.current = setTimeout(() => {
325:             setIsUserScrolling(false);
326:         }, 150);
327:     };
328: 
329:     // Monitor message changes, auto scroll to bottom
330:     useEffect(() => {
331:         if (isAtBottom && !isUserScrolling) {
332:             setTimeout(() => scrollToBottom(), 50); // Slight delay to ensure DOM updates
333:         }
334:     }, [messages, isAtBottom, isUserScrolling]);
335: 
336:     const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
337:         if (e.key === 'Enter' && !e.shiftKey) {
338:             e.preventDefault();
339:             // Handle sending message logic
340:             console.log('Sending message');
341:             sendMessage(query);
342:         }
343:     };
344: 
345:     const callback = {
346:         onMessage: (message: StreamCallbackMessage) => {
347:             console.log('Processing stream message:', message);
348: 
349:             // Do not process new messages in history mode
350:             if (isHistoryMode) return;
351: 
352:             // Use message processor to handle stream messages
353:             const updatedMessages = messageProcessorRef.current.processStreamMessage(message);
354:             console.log('Updated message list:', updatedMessages);
355: 
356:             // Handle task ID replacement: temporary task -> real task
357:             const isCurrentTaskTemporary = taskIdRef.current?.startsWith('temp-');
358:             const hasRealTaskId = message.taskId && !message.taskId.startsWith('temp-');
359: 
360:             if (isCurrentTaskTemporary && hasRealTaskId) {
361:                 const tempTaskId = taskIdRef.current;
362:                 const realTaskId = message.taskId;
363: 
364:                 console.log(`Replacing temporary task ${tempTaskId} with real task ${realTaskId}`);
365: 
366:                 // Replace task ID
367:                 replaceTaskId(tempTaskId, realTaskId);
368: 
369:                 // Update taskIdRef
370:                 taskIdRef.current = realTaskId;
371: 
372:                 // Update task with new workflow info if available
373:                 if (message.type === 'workflow' && message.workflow?.name) {
374:                     updateTask(realTaskId, {
375:                         name: message.workflow.name,
376:                         workflow: message.workflow,
377:                         messages: updatedMessages
378:                     });
379:                 } else {
380:                     updateTask(realTaskId, { messages: updatedMessages });
381:                 }
382: 
383:                 return; // Exit early, task ID has been replaced
384:             }
385: 
386:             // Set task ID (if not already set and not temporary)
387:             if (message.taskId && !currentTaskId && !message.taskId.startsWith('temp-')) {
388:                 setCurrentTaskId(message.taskId);
389:             }
390: 
391:             // Update or create task
392:             const taskIdToUpdate = message.taskId || taskIdRef.current;
393:             if (taskIdToUpdate) {
394:                 const updates: Partial<Task> = {
395:                     messages: updatedMessages
396:                 };
397: 
398:                 if (message.type === 'workflow' && message.workflow?.name) {
399:                     updates.name = message.workflow.name;
400:                     updates.workflow = message.workflow;
401:                 }
402: 
403:                 // For error messages, also update task status
404:                 if (message.type === 'error') {
405:                     updates.status = 'error';
406:                 }
407: 
408:                 // Always update task (will only work if task exists)
409:                 updateTask(taskIdToUpdate, updates);
410:             }
411: 
412:             // Detect tool call messages, automatically show detail panel
413:             if (message.type.includes('tool')) {
414:                 const toolName = (message as any).toolName || 'Unknown tool';
415:                 const operation = getToolOperation(message);
416:                 const status = getToolStatus(message.type);
417: 
418:                 setCurrentTool({
419:                     toolName,
420:                     operation,
421:                     status
422:                 });
423:                 // Show detail panel
424:                 if (showDetailAgents.includes(message.agentName)) {
425:                     setShowDetail(true);
426:                 }
427: 
428:                 // Take screenshot when tool call completes
429:                 if (message.type === 'tool_result') {
430:                     handleToolComplete({
431:                         type: 'tool',
432:                         id: message.toolId,
433:                         toolName: message.toolName,
434:                         status: 'completed',
435:                         timestamp: new Date(),
436:                         agentName: message.agentName
437:                     });
438:                 }
439:             }
440:         },
441:     }
442: 
443:     // Get tool operation description
444:     const getToolOperation = (message: StreamCallbackMessage): string => {
445:         const toolName = (message as any).toolName || '';
446:         switch (toolName.toLowerCase()) {
447:             case 'browser':
448:             case 'browser_navigate':
449:                 return t('tool_operations.browsing_web_page');
450:             case 'file_write':
451:             case 'file':
452:                 return t('tool_operations.writing_file');
453:             case 'file_read':
454:                 return t('tool_operations.reading_file');
455:             case 'search':
456:                 return t('tool_operations.searching');
457:             default:
458:                 return t('tool_operations.executing', { toolName });
459:         }
460:     };
461: 
462:     // Get tool status
463:     const getToolStatus = (messageType: string): 'running' | 'completed' | 'error' => {
464:         switch (messageType) {
465:             case 'tool_use':
466:             case 'tool_streaming':
467:             case 'tool_running':
468:                 return 'running';
469:             case 'tool_result':
470:                 return 'completed';
471:             case 'error':
472:                 return 'error';
473:             default:
474:                 return 'running';
475:         }
476:     };
477: 
478:     // Handle screenshot when tool call completes
479:     const handleToolComplete = async (message: ToolAction) => {
480:         try {
481:             if (window.api && (window.api as any).getMainViewScreenshot) {
482:                 let result: any = null;
483:                 if (showDetailAgents.includes(message.agentName)) {
484:                     result = await (window.api as any).getMainViewScreenshot();
485:                 }
486:                 const toolMessage = {
487:                     ...message,
488:                     screenshot: result?.imageBase64,
489:                     toolSequence: toolHistory.length + 1
490:                 };
491: 
492:                 // Update local toolHistory state
493:                 setToolHistory(prev => [...prev, toolMessage]);
494: 
495:                 // Also save to current task's toolHistory
496:                 if (taskIdRef.current) {
497:                     addToolHistory(taskIdRef.current, toolMessage);
498:                 }
499: 
500:                 console.log('Tool call screenshot saved:', message.type, toolMessage.toolSequence);
501:             }
502:         } catch (error) {
503:             console.error('Screenshot failed:', error);
504:         }
505:     };
506: 
507:     // Handle tool call click, show historical screenshot
508:     const handleToolClick = async (message: ToolAction) => {
509:         console.log('Tool call clicked:', message);
510:         // Set current tool information
511:         setCurrentTool({
512:             toolName: message.toolName,
513:             operation: getToolOperation({ toolName: message.toolName } as any),
514:             status: getToolStatus(message.status === 'completed' ? 'tool_result' :
515:                 message.status === 'running' ? 'tool_running' : 'error')
516:         });
517: 
518:         // Find corresponding historical tool call
519:         const historyTool = toolHistory.find(tool =>
520:             (tool as any).toolId === (message as any).toolId && tool.id === message.id
521:         );
522:         if (historyTool && historyTool.toolSequence && historyTool.screenshot) {
523:             setCurrentHistoryIndex(historyTool.toolSequence - 1);
524:             // Show detail panel
525:             setShowDetail(true);
526:             await switchToHistoryIndex(historyTool.toolSequence - 1);
527:         }
528:     };
529: 
530:     // Switch to specified history index
531:     const switchToHistoryIndex = async (newIndex: number) => {
532:         // If switching to the last tool, set to -1 to indicate latest state
533:         if ((newIndex >= toolHistory.length - 1) && !isHistoryMode) {
534:             setCurrentHistoryIndex(-1);
535:             try {
536:                 if (window.api && (window.api as any).hideHistoryView) {
537:                     await (window.api as any).hideHistoryView();
538:                     console.log('Switched to real-time view');
539:                 }
540:             } catch (error) {
541:                 console.error('Failed to hide history view:', error);
542:             }
543:         } else {
544:             setCurrentHistoryIndex(newIndex);
545:             // Show corresponding historical screenshot
546:             const historyTool = toolHistory[newIndex];
547:             if (historyTool && historyTool.screenshot) {
548:                 try {
549:                     if (window.api && (window.api as any).showHistoryView) {
550:                         await (window.api as any).showHistoryView(historyTool.screenshot);
551:                         console.log('Switched to history tool:', newIndex + 1);
552:                     }
553:                 } catch (error) {
554:                     console.error('Failed to show history view:', error);
555:                 }
556:             }
557:         }
558:     };
559: 
560:     // Handle history task selection
561:     const handleSelectHistoryTask = async (task: Task) => {
562:         try {
563:             // If there's a currently running task, terminate it first
564:             if (currentTaskId && isCurrentTaskRunning) {
565:                 const terminated = await terminateCurrentTask('Switching to history task view mode');
566:                 if (terminated) {
567:                     console.log('Switched to history task, current task terminated');
568:                 }
569:             }
570: 
571:             // Use Hook to enter history mode
572:             enterHistoryMode(task);
573:             setToolHistory(task.toolHistory || []);
574: 
575:             // Clear current tool state
576:             setShowDetail(false);
577:             setCurrentTool(null);
578:             setCurrentHistoryIndex(toolHistory.length - 1);
579: 
580:             // Note: message notification is shown in HistoryPanel.tsx to avoid duplication
581:         } catch (error) {
582:             console.error('Failed to load history task:', error);
583:             antdMessage.error(t('load_history_failed'));
584:         }
585:     };
586: 
587:     // EkoService stream message monitoring
588:     useEffect(() => {
589:         const handleEkoStreamMessage = (message: StreamCallbackMessage) => {
590:             console.log('Received EkoService stream message:', message);
591:             // Directly process stream messages
592:             callback.onMessage(message);
593:         };
594: 
595:         // Monitor stream messages from main thread
596:         window.api.onEkoStreamMessage(handleEkoStreamMessage);
597: 
598:         return () => {
599:             window.api.removeAllListeners('eko-stream-message');
600:         };
601:     }, [callback]);
602: 
603:     const sendMessage = async (message: string) => {
604:         if (!message) {
605:             antdMessage.warning(t('enter_question'));
606:             return;
607:         }
608:         // Prohibit sending messages in history mode
609:         if (isHistoryMode) {
610:             antdMessage.warning(t('history_readonly'));
611:             return;
612:         }
613: 
614:         console.log('Sending message', message);
615: 
616:         // Generate new execution ID for each task execution
617:         const newExecutionId = uuidv4();
618:         executionIdRef.current = newExecutionId;
619:         messageProcessorRef.current.setExecutionId(newExecutionId);
620: 
621:         // Add user message to message processor
622:         const updatedMessages = messageProcessorRef.current.addUserMessage(message.trim());
623: 
624:         // If no current task, create temporary task immediately to display user message
625:         if (!taskIdRef.current) {
626:             const tempTaskId = `temp-${newExecutionId}`;
627:             taskIdRef.current = tempTaskId;
628:             setCurrentTaskId(tempTaskId);
629: 
630:             // Create temporary task with user message
631:             createTask(tempTaskId, {
632:                 name: 'Processing...',
633:                 messages: updatedMessages,
634:                 status: 'running',
635:                 taskType: isTaskDetailMode ? 'scheduled' : 'normal',
636:                 scheduledTaskId: isTaskDetailMode ? scheduledTaskIdFromUrl : undefined,
637:                 startTime: new Date(),
638:             });
639:         } else {
640:             // Update existing task's messages
641:             updateMessages(taskIdRef.current, updatedMessages);
642:             // Set existing task to running state
643:             updateTask(taskIdRef.current, { status: 'running' });
644:         }
645: 
646:         // Clear input field
647:         setQuery('');
648: 
649:         let result: EkoResult | null = null;
650: 
651:         if (ekoRequest) {
652:             console.log('Waiting for current request to finish, avoiding conflicts');
653:             await window.api.ekoCancelTask(taskIdRef.current);
654:             await ekoRequest;
655:         }
656: 
657:         try {
658:             // Check if current task is temporary
659:             const isTemporaryTask = taskIdRef.current.startsWith('temp-');
660: 
661:             if (isTemporaryTask) {
662:                 // Use IPC to call main thread's EkoService to run new task
663:                 const req = window.api.ekoRun(message.trim());
664:                 setEkoRequest(req);
665:                 result = await req;
666:                 // Note: real taskId will be set via stream callback's replaceTaskId
667:             } else {
668:                 // Modify existing task
669:                 const req = window.api.ekoModify(taskIdRef.current, message.trim());
670:                 setEkoRequest(req);
671:                 result = await req;
672:             }
673: 
674:             // Update task status based on result (directly using eko-core status)
675:             if (result && taskIdRef.current) {
676:                 updateTask(taskIdRef.current, {
677:                     status: result.stopReason
678:                 });
679:             }
680: 
681:         } catch (error) {
682:             // Set task to error state when sending fails
683:             if (taskIdRef.current) {
684:                 updateTask(taskIdRef.current, { status: 'error' });
685:             }
686:             console.error('Failed to send message:', error);
687:             antdMessage.error(t('failed_send_message'));
688:         }
689:     }
690: 
691: 
692:     // Task termination handling (manual click cancel button)
693:     const handleCancelTask = async () => {
694:         if (!currentTaskId) {
695:             antdMessage.error(t('no_task_running'));
696:             return;
697:         }
698: 
699:         const success = await terminateCurrentTask('User manually terminated');
700:         if (success) {
701:             antdMessage.success(t('task_terminated'));
702:         } else {
703:             antdMessage.error(t('terminate_failed'));
704:         }
705:     };
706: 
707:     return (
708:         <>
709:             <Header />
710:             <div className='bg-main-view bg-origin-padding bg-no-repeat bg-cover h-[calc(100%_-_48px)] overflow-y-auto text-text-01-dark flex'>
711:                 <div className='flex-1 h-full transition-all duration-300'>
712:                     <div className='w-[636px] mx-auto flex flex-col gap-2 pt-7 pb-4 h-full relative'>
713:                         {/* Task title and history button */}
714:                         <div className='absolute top-0 left-0 w-full flex items-center justify-between'>
715:                             <div className='line-clamp-1 text-xl font-semibold flex-1'>
716:                                 {currentTaskId && tasks.find(task => task.id === currentTaskId)?.name}
717:                                 {isHistoryMode && (
718:                                     <span className='ml-2 text-sm text-gray-500'>{t('history_task_readonly')}</span>
719:                                 )}
720:                             </div>
721:                         </div>
722:                         {/* Message list */}
723:                         <div
724:                             ref={scrollContainerRef}
725:                             className='flex-1 h-full overflow-x-hidden overflow-y-auto px-4 pt-5'
726:                             onScroll={handleScroll}
727:                         >
728:                             <MessageList messages={messages} onToolClick={handleToolClick} />
729:                         </div>
730:                         {/* Question input box */}
731:                         <div className='h-30 gradient-border relative'>
732:                             <Input.TextArea
733:                                 value={query}
734:                                 onKeyDown={handleKeyDown}
735:                                 onChange={(e) => setQuery(e.target.value)}
736:                                 className="!h-full !bg-tool-call !text-text-01-dark !placeholder-text-12-dark !py-2"
737:                                 placeholder={isHistoryMode ? t('history_readonly_input') : t('input_placeholder')}
738:                                 disabled={isHistoryMode}
739:                             />
740: 
741:                             {/* Send/Cancel button - only shown in non-history mode */}
742:                             {!isHistoryMode && (
743:                                 <div className="absolute right-3 bottom-3">
744:                                     {isCurrentTaskRunning ? (
745:                                         <span 
746:                                         className='bg-ask-status rounded-md flex justify-center items-center w-7 h-7 cursor-pointer'
747:                                         onClick={handleCancelTask}>
748:                                             <CancleTask className="w-5 h-5" />
749:                                         </span>
750:                                     ) : (
751:                                         <span
752:                                         className={`bg-ask-status rounded-md flex justify-center items-center w-7 h-7 cursor-pointer ${
753:                                            query ? '' : '!cursor-not-allowed opacity-60' 
754:                                         }`}
755:                                         onClick={() => sendMessage(query)}>
756:                                             <SendMessage className="w-5 h-5" />
757:                                         </span>
758:                                     )}
759:                                 </div>
760:                             )}
761:                         </div>
762:                     </div>
763: 
764:                 </div>
765:                 <div className='h-full transition-all pt-5 pb-4 pr-4 duration-300 text-text-01-dark' style={{ width: showDetail ? '800px' : '0px' }}>
766:                     {showDetail && (
767:                         <div className='h-full border-border-message border flex flex-col rounded-xl'>
768:                             {/* Detail panel title */}
769:                             <div className='p-4'>
770:                                 <h3 className='text-xl font-semibold'>{t('atlas_computer')}</h3>
771:                                 <div className='flex flex-col items-start justify-centerce px-5 py-3 gap-3 border-border-message border rounded-md h-[80px] bg-tool-call mt-3'>
772:                                     {currentTool && (
773:                                         <>
774:                                             <div className='border-b w-full border-dashed border-border-message flex items-center'>
775:                                                 {t('atlas_using_tool')}
776:                                                 <div className={`w-2 h-2 ml-2 rounded-full ${currentTool.status === 'running' ? 'bg-blue-500 animate-pulse' :
777:                                                         currentTool.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
778:                                                     }`}></div>
779:                                                 <span className='ml-1 text-xs text-text-12-dark'>
780:                                                     {currentTool.status === 'running' ? t('running') :
781:                                                         currentTool.status === 'completed' ? t('completed') : t('execution_error')}
782:                                                 </span>
783: 
784:                                             </div>
785:                                             <h3 className='text-sm text-text-12-dark'>
786:                                                 {currentTool.toolName} - {currentTool.operation}
787:                                             </h3>
788:                                         </>
789:                                     )}
790:                                 </div>
791:                             </div>
792: 
793:                             {/* Detail panel content area - reserved space */}
794:                             <div className='p-4 pt-0 flex-1 '>
795:                                 <div className='border-border-message border rounded-md h-full flex flex-col'>
796:                                     <div className='h-[42px] bg-tool-call rounded-md flex items-center justify-center p-2'>
797:                                         {currentUrl && (
798:                                             <div className='text-xs text-text-12-dark line-clamp-1'>
799:                                                 {currentUrl}
800:                                             </div>
801:                                         )}
802:                                     </div>
803:                                     <div className='flex-1'></div>
804:                                     <div className='h-[42px] bg-tool-call rounded-md flex items-center px-3'>
805:                                         {/* Tool call progress bar */}
806:                                         {toolHistory.length > 0 && (
807:                                             <div className='flex-1 flex items-center gap-2'>
808:                                                 {/* Forward/Backward button group */}
809:                                                 <div className='flex items-center border border-border-message rounded'>
810:                                                     <Button
811:                                                         type="text"
812:                                                         size="small"
813:                                                         disabled={toolHistory.length === 0 || (currentHistoryIndex === 0)}
814:                                                         onClick={() => {
815:                                                             const newIndex = currentHistoryIndex === -1 ? toolHistory.length - 2 : currentHistoryIndex - 1;
816:                                                             switchToHistoryIndex(Math.max(0, newIndex));
817:                                                         }}
818:                                                         className='!border-0 !rounded-r-none'
819:                                                     >
820:                                                         <StepUpDown className='w-3 h-3' />
821:                                                     </Button>
822:                                                     <Button
823:                                                         type="text"
824:                                                         size="small"
825:                                                         disabled={currentHistoryIndex === -1}
826:                                                         onClick={() => switchToHistoryIndex(currentHistoryIndex + 1)}
827:                                                         className='!border-0 !rounded-l-none border-l border-border-message'
828:                                                     >
829:                                                         <StepUpDown className='rotate-180 w-3 h-3' />
830:                                                     </Button>
831:                                                 </div>
832: 
833:                                                 <Slider
834:                                                     className='flex-1'
835:                                                     min={0}
836:                                                     max={toolHistory.length}
837:                                                     value={currentHistoryIndex === -1 ? toolHistory.length : currentHistoryIndex + 1}
838:                                                     onChange={(value) => switchToHistoryIndex(value - 1)}
839:                                                     step={1}
840:                                                     marks={toolHistory.reduce((marks, _, index) => {
841:                                                         marks[index + 1] = '';
842:                                                         return marks;
843:                                                     }, {} as Record<number, string>)}
844:                                                 />
845: 
846:                                                 <span className='text-xs text-text-12-dark'>
847:                                                     {t('realtime')}
848:                                                 </span>
849:                                             </div>
850:                                         )}
851:                                     </div>
852:                                 </div>
853:                             </div>
854:                         </div>
855:                     )}
856:                 </div>
857:             </div>
858: 
859:         </>
860:     )
861: }
````

## File: src/pages/toolbox.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Card, Typography, Modal, Button, Tag } from 'antd';
  3: import {
  4:   ClockCircleOutlined,
  5:   RobotOutlined,
  6:   ToolOutlined,
  7:   SettingOutlined,
  8:   ThunderboltOutlined,
  9:   ArrowLeftOutlined
 10: } from '@ant-design/icons';
 11: import { useRouter } from 'next/router';
 12: import { useTranslation } from 'react-i18next';
 13: import AgentConfigModal from '@/components/AgentConfigModal';
 14: import { ScheduledTaskListModal } from '@/components/scheduled-task/ScheduledTaskListModal';
 15: 
 16: const { Title, Paragraph } = Typography;
 17: 
 18: interface ToolItem {
 19:   id: string;
 20:   title: string;
 21:   description: string;
 22:   icon: React.ReactNode;
 23:   color: string;
 24:   gradient: string;
 25:   implemented: boolean;  // Whether the tool is implemented
 26:   onClick: () => void;
 27: }
 28: 
 29: /**
 30:  * Toolbox Page Component
 31:  * Central hub for all system configuration and management features
 32:  */
 33: export default function ToolboxPage() {
 34:   const router = useRouter();
 35:   const { t } = useTranslation('toolbox');
 36:   const [agentConfigVisible, setAgentConfigVisible] = useState(false);
 37:   const [scheduledTaskVisible, setScheduledTaskVisible] = useState(false);
 38: 
 39:   const tools: ToolItem[] = [
 40:     {
 41:       id: 'agent-config',
 42:       title: t('agent_config_title'),
 43:       description: t('agent_config_desc'),
 44:       icon: <RobotOutlined style={{ fontSize: '36px' }} />,
 45:       color: '#1890ff',
 46:       gradient: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
 47:       implemented: true,
 48:       onClick: () => {
 49:         setAgentConfigVisible(true);
 50:       }
 51:     },
 52:     {
 53:       id: 'scheduled-tasks',
 54:       title: t('scheduled_tasks_title'),
 55:       description: t('scheduled_tasks_desc'),
 56:       icon: <ClockCircleOutlined style={{ fontSize: '36px' }} />,
 57:       color: '#52c41a',
 58:       gradient: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
 59:       implemented: true,
 60:       onClick: () => {
 61:         setScheduledTaskVisible(true);
 62:       }
 63:     },
 64:     {
 65:       id: 'system-settings',
 66:       title: t('system_settings_title'),
 67:       description: t('system_settings_desc'),
 68:       icon: <SettingOutlined style={{ fontSize: '36px' }} />,
 69:       color: '#8c8c8c',
 70:       gradient: 'linear-gradient(135deg, #8c8c8c 0%, #595959 100%)',
 71:       implemented: false,
 72:       onClick: () => {
 73:         Modal.info({
 74:           title: t('coming_soon_title'),
 75:           content: t('system_settings_coming_soon'),
 76:         });
 77:       }
 78:     },
 79:     {
 80:       id: 'tools-marketplace',
 81:       title: t('tools_marketplace_title'),
 82:       description: t('tools_marketplace_desc'),
 83:       icon: <ToolOutlined style={{ fontSize: '36px' }} />,
 84:       color: '#8c8c8c',
 85:       gradient: 'linear-gradient(135deg, #8c8c8c 0%, #595959 100%)',
 86:       implemented: false,
 87:       onClick: () => {
 88:         Modal.info({
 89:           title: t('coming_soon_title'),
 90:           content: t('tools_marketplace_coming_soon'),
 91:         });
 92:       }
 93:     },
 94:     {
 95:       id: 'workflow-templates',
 96:       title: t('workflow_templates_title'),
 97:       description: t('workflow_templates_desc'),
 98:       icon: <ThunderboltOutlined style={{ fontSize: '36px' }} />,
 99:       color: '#8c8c8c',
100:       gradient: 'linear-gradient(135deg, #8c8c8c 0%, #595959 100%)',
101:       implemented: false,
102:       onClick: () => {
103:         Modal.info({
104:           title: t('coming_soon_title'),
105:           content: t('workflow_templates_coming_soon'),
106:         });
107:       }
108:     }
109:   ];
110: 
111:   return (
112:     <div style={{
113:       minHeight: '100vh',
114:       background: 'linear-gradient(180deg, #0a1929 0%, #1a2332 100%)',
115:     }}>
116:       {/* Draggable Top Navigation Bar */}
117:       <div style={{
118:         height: '56px',
119:         display: 'flex',
120:         alignItems: 'center',
121:         padding: '0 24px',
122:         borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
123:         WebkitAppRegion: 'drag',
124:       } as React.CSSProperties}>
125:         <Button
126:           type="text"
127:           icon={<ArrowLeftOutlined />}
128:           onClick={() => router.push('/home')}
129:           style={{
130:             color: '#fff',
131:             fontSize: '14px',
132:             padding: '6px 12px',
133:             height: 'auto',
134:             WebkitAppRegion: 'no-drag',
135:           } as React.CSSProperties}
136:         >
137:           {t('back_to_home')}
138:         </Button>
139:       </div>
140: 
141:       {/* Main Content */}
142:       <div style={{ padding: '32px 48px' }}>
143:         {/* Header */}
144:         <div style={{ marginBottom: '40px' }}>
145:           <Title level={1} style={{
146:             margin: 0,
147:             color: '#fff',
148:             fontSize: '36px',
149:             fontWeight: 700,
150:             letterSpacing: '-0.5px'
151:           }}>
152:             {t('title')}
153:           </Title>
154:           <Paragraph style={{
155:             color: 'rgba(255, 255, 255, 0.65)',
156:             fontSize: '15px',
157:             margin: '10px 0 0 0',
158:             maxWidth: '600px'
159:           }}>
160:             {t('subtitle')}
161:           </Paragraph>
162:         </div>
163: 
164:         {/* Tools Grid */}
165:         <div style={{
166:           display: 'grid',
167:           gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
168:           gap: '20px',
169:           maxWidth: '1400px'
170:         }}>
171:           {tools.map((tool) => (
172:             <Card
173:               key={tool.id}
174:               hoverable={tool.implemented}
175:               onClick={tool.onClick}
176:               style={{
177:                 cursor: tool.implemented ? 'pointer' : 'not-allowed',
178:                 background: 'rgba(255, 255, 255, 0.05)',
179:                 border: '1px solid rgba(255, 255, 255, 0.1)',
180:                 borderRadius: '12px',
181:                 transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
182:                 overflow: 'hidden',
183:                 position: 'relative',
184:                 opacity: tool.implemented ? 1 : 0.5,
185:               }}
186:               styles={{
187:                 body: {
188:                   padding: '24px',
189:                   position: 'relative',
190:                   zIndex: 1
191:                 }
192:               }}
193:               className={tool.implemented ? 'toolbox-card' : 'toolbox-card-disabled'}
194:             >
195:               {/* Gradient Background */}
196:               <div style={{
197:                 position: 'absolute',
198:                 top: 0,
199:                 left: 0,
200:                 right: 0,
201:                 height: '3px',
202:                 background: tool.gradient,
203:               }} />
204: 
205:               {/* Coming Soon Badge */}
206:               {!tool.implemented && (
207:                 <Tag
208:                   color="default"
209:                   style={{
210:                     position: 'absolute',
211:                     top: '12px',
212:                     right: '12px',
213:                     margin: 0,
214:                     fontSize: '11px',
215:                     padding: '2px 8px',
216:                     zIndex: 2
217:                   }}
218:                 >
219:                   {t('coming_soon')}
220:                 </Tag>
221:               )}
222: 
223:               {/* Icon Circle */}
224:               <div style={{
225:                 width: '60px',
226:                 height: '60px',
227:                 borderRadius: '14px',
228:                 background: tool.gradient,
229:                 display: 'flex',
230:                 alignItems: 'center',
231:                 justifyContent: 'center',
232:                 marginBottom: '16px',
233:                 color: '#fff',
234:                 boxShadow: `0 6px 16px ${tool.color}40`
235:               }}>
236:                 {tool.icon}
237:               </div>
238: 
239:               {/* Content */}
240:               <div>
241:                 <Title level={4} style={{
242:                   margin: '0 0 8px 0',
243:                   color: '#fff',
244:                   fontSize: '18px',
245:                   fontWeight: 600
246:                 }}>
247:                   {tool.title}
248:                 </Title>
249:                 <Paragraph style={{
250:                   color: 'rgba(255, 255, 255, 0.65)',
251:                   fontSize: '13px',
252:                   lineHeight: '1.5',
253:                   margin: 0,
254:                   display: '-webkit-box',
255:                   WebkitLineClamp: 2,
256:                   WebkitBoxOrient: 'vertical',
257:                   overflow: 'hidden'
258:                 }}>
259:                   {tool.description}
260:                 </Paragraph>
261:               </div>
262: 
263:               {/* Arrow Indicator */}
264:               {tool.implemented && (
265:                 <div style={{
266:                   position: 'absolute',
267:                   bottom: '16px',
268:                   right: '16px',
269:                   width: '28px',
270:                   height: '28px',
271:                   borderRadius: '50%',
272:                   background: 'rgba(255, 255, 255, 0.1)',
273:                   display: 'flex',
274:                   alignItems: 'center',
275:                   justifyContent: 'center',
276:                   color: '#fff',
277:                   fontSize: '12px',
278:                   transition: 'all 0.3s ease'
279:                 }} className="card-arrow">
280:                   →
281:                 </div>
282:               )}
283:             </Card>
284:           ))}
285:         </div>
286:       </div>
287: 
288:       {/* Agent Configuration Modal */}
289:       <AgentConfigModal
290:         visible={agentConfigVisible}
291:         onClose={() => setAgentConfigVisible(false)}
292:       />
293: 
294:       {/* Scheduled Task List Modal */}
295:       <ScheduledTaskListModal
296:         visible={scheduledTaskVisible}
297:         onClose={() => setScheduledTaskVisible(false)}
298:       />
299: 
300:       <style jsx>{`
301:         .toolbox-card:hover {
302:           transform: translateY(-6px);
303:           box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
304:           border-color: rgba(255, 255, 255, 0.2);
305:           background: rgba(255, 255, 255, 0.08);
306:         }
307: 
308:         .toolbox-card:hover .card-arrow {
309:           background: rgba(255, 255, 255, 0.2);
310:           transform: translateX(4px);
311:         }
312: 
313:         .toolbox-card:active {
314:           transform: translateY(-3px);
315:         }
316: 
317:         .toolbox-card-disabled:hover {
318:           transform: none;
319:           box-shadow: none;
320:         }
321:       `}</style>
322:     </div>
323:   );
324: }
````

## File: src/stores/historyStore.ts
````typescript
 1: import { create } from 'zustand';
 2: import { Task } from '@/models';
 3: 
 4: interface HistoryState {
 5:   // State
 6:   showHistoryPanel: boolean;
 7:   selectedHistoryTask: Task | null;
 8: 
 9:   // Function to terminate current task (set by main.tsx)
10:   terminateCurrentTaskFn: ((reason: string) => Promise<boolean>) | null;
11: 
12:   // Actions
13:   setShowHistoryPanel: (show: boolean) => void;
14:   selectHistoryTask: (task: Task) => void;
15:   clearSelectedHistoryTask: () => void;
16:   setTerminateCurrentTaskFn: (fn: (reason: string) => Promise<boolean>) => void;
17: }
18: 
19: export const useHistoryStore = create<HistoryState>((set) => ({
20:   // Initial state
21:   showHistoryPanel: false,
22:   selectedHistoryTask: null,
23:   terminateCurrentTaskFn: null,
24: 
25:   // Actions
26:   setShowHistoryPanel: (show) => set({ showHistoryPanel: show }),
27: 
28:   selectHistoryTask: (task) => set((state) => ({
29:     selectedHistoryTask: task,
30:     showHistoryPanel: false
31:   })),
32: 
33:   clearSelectedHistoryTask: () => set({ selectedHistoryTask: null }),
34: 
35:   setTerminateCurrentTaskFn: (fn) => set({ terminateCurrentTaskFn: fn }),
36: }));
````

## File: src/stores/languageStore.ts
````typescript
 1: import { create } from 'zustand';
 2: 
 3: interface LanguageStore {
 4:   language: string;
 5:   setLanguage: (lang: string) => void;
 6: }
 7: 
 8: export const useLanguageStore = create<LanguageStore>((set) => ({
 9:   language: 'en-US',  // Default to English
10:   setLanguage: (lang) => set({ language: lang }),
11: }));
````

## File: src/stores/scheduled-task-store.ts
````typescript
  1: import { create } from 'zustand';
  2: import { ScheduledTask, TaskTemplate } from '@/models';
  3: import { scheduledTaskStorage } from '@/lib/scheduled-task-storage';
  4: 
  5: /**
  6:  * Scheduled task state management
  7:  */
  8: interface ScheduledTaskState {
  9:   // ==================== State ====================
 10: 
 11:   // Scheduled task list
 12:   scheduledTasks: ScheduledTask[];
 13: 
 14:   // Currently selected scheduled task
 15:   selectedTask: ScheduledTask | null;
 16: 
 17:   // Task template list
 18:   templates: TaskTemplate[];
 19: 
 20:   // UI state
 21:   showCreateModal: boolean;
 22:   showListPanel: boolean;
 23:   showHistoryPanel: boolean;
 24:   showDetailPanel: boolean;
 25:   isEditMode: boolean;
 26: 
 27:   // Loading state
 28:   isLoading: boolean;
 29: 
 30:   // ==================== Actions ====================
 31: 
 32:   // Load scheduled task list
 33:   loadScheduledTasks: () => Promise<void>;
 34: 
 35:   // Create task
 36:   createTask: (task: Omit<ScheduledTask, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
 37: 
 38:   // Update task
 39:   updateTask: (id: string, updates: Partial<ScheduledTask>) => Promise<void>;
 40: 
 41:   // Delete task
 42:   deleteTask: (id: string) => Promise<void>;
 43: 
 44:   // Toggle task enabled status
 45:   toggleTaskEnabled: (id: string) => Promise<void>;
 46: 
 47:   // Select task
 48:   selectTask: (task: ScheduledTask | null) => void;
 49: 
 50:   // Load templates
 51:   loadTemplates: () => Promise<void>;
 52: 
 53:   // UI control
 54:   setShowCreateModal: (show: boolean) => void;
 55:   setShowListPanel: (show: boolean) => void;
 56:   setShowHistoryPanel: (show: boolean) => void;
 57:   setShowDetailPanel: (show: boolean) => void;
 58:   setIsEditMode: (isEdit: boolean) => void;
 59: 
 60:   // Execute task immediately
 61:   executeTaskNow: (task: ScheduledTask) => Promise<void>;
 62: 
 63:   // Initialize scheduler (load all enabled tasks)
 64:   initializeScheduler: () => Promise<void>;
 65: }
 66: 
 67: export const useScheduledTaskStore = create<ScheduledTaskState>((set, get) => ({
 68:   // ==================== Initial State ====================
 69:   scheduledTasks: [],
 70:   selectedTask: null,
 71:   executionHistory: [],
 72:   selectedExecution: null,
 73:   templates: [],
 74:   showCreateModal: false,
 75:   showListPanel: false,
 76:   showHistoryPanel: false,
 77:   showDetailPanel: false,
 78:   isEditMode: false,
 79:   isLoading: false,
 80: 
 81:   // ==================== Actions Implementation ====================
 82: 
 83:   /**
 84:    * Load scheduled task list
 85:    */
 86:   loadScheduledTasks: async () => {
 87:     set({ isLoading: true });
 88:     try {
 89:       const tasks = await scheduledTaskStorage.getAllScheduledTasks();
 90:       set({ scheduledTasks: tasks });
 91:     } catch (error) {
 92:       console.error('Failed to load scheduled tasks:', error);
 93:     } finally {
 94:       set({ isLoading: false });
 95:     }
 96:   },
 97: 
 98:   /**
 99:    * Create task
100:    */
101:   createTask: async (taskData) => {
102:     set({ isLoading: true });
103:     try {
104:       const newTask: ScheduledTask = {
105:         ...taskData,
106:         id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
107:         createdAt: new Date(),
108:         updatedAt: new Date(),
109:       };
110: 
111:       await scheduledTaskStorage.saveScheduledTask(newTask);
112: 
113:       // Reload task list
114:       await get().loadScheduledTasks();
115: 
116:       // If task is enabled, notify scheduler
117:       if (newTask.enabled && typeof window !== 'undefined' && (window as any).api) {
118:         await (window as any).api.invoke('scheduler:add-task', newTask);
119:       }
120: 
121:       set({ showCreateModal: false });
122:     } catch (error) {
123:       console.error('Failed to create task:', error);
124:       throw error;
125:     } finally {
126:       set({ isLoading: false });
127:     }
128:   },
129: 
130:   /**
131:    * Update task
132:    */
133:   updateTask: async (id, updates) => {
134:     set({ isLoading: true });
135:     try {
136:       await scheduledTaskStorage.updateScheduledTask(id, updates);
137: 
138:       // Reload task list
139:       await get().loadScheduledTasks();
140: 
141:       // If task enabled status or schedule configuration changes, update scheduler
142:       if (typeof window !== 'undefined' && (window as any).api) {
143:         const task = get().scheduledTasks.find(t => t.id === id);
144:         if (task) {
145:           if (task.enabled) {
146:             await (window as any).api.invoke('scheduler:add-task', task);
147:           } else {
148:             await (window as any).api.invoke('scheduler:remove-task', id);
149:           }
150:         }
151:       }
152: 
153:       set({ showCreateModal: false, isEditMode: false });
154:     } catch (error) {
155:       console.error('Failed to update task:', error);
156:       throw error;
157:     } finally {
158:       set({ isLoading: false });
159:     }
160:   },
161: 
162:   /**
163:    * Delete task
164:    */
165:   deleteTask: async (id) => {
166:     set({ isLoading: true });
167:     try {
168:       // First remove from scheduler
169:       if (typeof window !== 'undefined' && (window as any).api) {
170:         await (window as any).api.invoke('scheduler:remove-task', id);
171:       }
172: 
173:       // Delete task
174:       await scheduledTaskStorage.deleteScheduledTask(id);
175: 
176:       // Reload task list
177:       await get().loadScheduledTasks();
178: 
179:       // If deleting the currently selected task, clear selection
180:       if (get().selectedTask?.id === id) {
181:         set({ selectedTask: null });
182:       }
183:     } catch (error) {
184:       console.error('Failed to delete task:', error);
185:       throw error;
186:     } finally {
187:       set({ isLoading: false });
188:     }
189:   },
190: 
191:   /**
192:    * Toggle task enabled status
193:    */
194:   toggleTaskEnabled: async (id) => {
195:     const task = get().scheduledTasks.find(t => t.id === id);
196:     if (!task) return;
197: 
198:     await get().updateTask(id, { enabled: !task.enabled });
199:   },
200: 
201:   /**
202:    * Select task
203:    */
204:   selectTask: (task) => {
205:     set({ selectedTask: task });
206:   },
207: 
208:   /**
209:    * Load templates
210:    */
211:   loadTemplates: async () => {
212:     set({ isLoading: true });
213:     try {
214:       const response = await fetch('/api/task-templates');
215:       const templates = await response.json();
216:       set({ templates });
217:     } catch (error) {
218:       console.error('Failed to load templates:', error);
219:     } finally {
220:       set({ isLoading: false });
221:     }
222:   },
223: 
224:   /**
225:    * Execute task immediately
226:    */
227:   executeTaskNow: async (task) => {
228:     try {
229:       if (typeof window !== 'undefined' && (window as any).api) {
230:         const result = await (window as any).api.invoke('scheduler:execute-now', task);
231:         console.log('Task execution result:', result);
232:       }
233:     } catch (error) {
234:       console.error('Failed to execute task:', error);
235:       throw error;
236:     }
237:   },
238: 
239:   /**
240:    * Initialize scheduler
241:    * Called when App starts, loads all enabled scheduled tasks and registers them to the scheduler
242:    */
243:   initializeScheduler: async () => {
244:     try {
245:       console.log('[ScheduledTaskStore] Starting scheduler initialization...');
246: 
247:       // Load all scheduled tasks
248:       await scheduledTaskStorage.init();
249:       const allTasks = await scheduledTaskStorage.getAllScheduledTasks();
250:       const enabledTasks = allTasks.filter(task => task.enabled);
251: 
252:       console.log(`[ScheduledTaskStore] Found ${allTasks.length} scheduled tasks, ${enabledTasks.length} enabled`);
253: 
254:       // Register to scheduler
255:       if (typeof window !== 'undefined' && (window as any).api) {
256:         for (const task of enabledTasks) {
257:           try {
258:             const result = await (window as any).api.invoke('scheduler:add-task', task);
259:             if (result.success) {
260:               console.log(`[ScheduledTaskStore] ✓ Registered task: ${task.name}`, result.nextExecuteAt);
261:             } else {
262:               console.warn(`[ScheduledTaskStore] ✗ Failed to register task: ${task.name}`, result.message);
263:             }
264:           } catch (error) {
265:             console.error(`[ScheduledTaskStore] Exception registering task: ${task.name}`, error);
266:           }
267:         }
268: 
269:         console.log('[ScheduledTaskStore] Scheduler initialization completed');
270:       } else {
271:         console.warn('[ScheduledTaskStore] Window API not available, cannot initialize scheduler');
272:       }
273:     } catch (error) {
274:       console.error('[ScheduledTaskStore] Failed to initialize scheduler:', error);
275:     }
276:   },
277: 
278:   // ==================== UI Control ====================
279: 
280:   setShowCreateModal: (show) => set({ showCreateModal: show }),
281: 
282:   setShowListPanel: (show) => set({ showListPanel: show }),
283: 
284:   setShowHistoryPanel: (show) => set({ showHistoryPanel: show }),
285: 
286:   setShowDetailPanel: (show) => set({ showDetailPanel: show }),
287: 
288:   setIsEditMode: (isEdit) => set({ isEditMode: isEdit }),
289: }));
````

## File: src/styles/globals.css
````css
  1: @import "tailwindcss";
  2: @import "./markdown.css";
  3: @import url('https://fonts.googleapis.com/css2?family=Berkshire+Swash&display=swap');
  4: 
  5: :root {
  6:   --background: #ffffff;
  7:   --foreground: #171717;
  8: }
  9: 
 10: @theme {
 11:   /* Vibrant tech-inspired gradient background with rich colors */
 12:   --background-image-main-view:
 13:     radial-gradient(ellipse at 15% 15%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
 14:     radial-gradient(ellipse at 85% 20%, rgba(147, 51, 234, 0.12) 0%, transparent 45%),
 15:     radial-gradient(ellipse at 20% 85%, rgba(16, 185, 129, 0.10) 0%, transparent 40%),
 16:     radial-gradient(ellipse at 80% 80%, rgba(96, 165, 250, 0.08) 0%, transparent 50%),
 17:     linear-gradient(135deg, #0a0e17 0%, #0d1117 30%, #050810 60%, #0a0e17 100%);
 18:   --background-image-main-view-header: rgba(255, 255, 255, 0.05);
 19:   --background-image-main-view-footer: rgba(0, 0, 0, 0.3);
 20: 
 21:   --background-image-icon-bg-common: rgba(255, 255, 255, 0.08);
 22:   --background-image-icon-bg-voice-open: rgba(59, 130, 246, 0.3);
 23: 
 24: 
 25:   --shadow-tool-hover: 0 0 20px rgba(59, 130, 246, 0.3);
 26:   --color-bg-tool-hover: rgba(59, 130, 246, 0.15);
 27:   --color-border-tool-hover: rgba(255, 255, 255, 0.2);
 28: 
 29: 
 30:   --color-border-view-window-edge: rgba(255, 255, 255, 0.1);
 31:   --color-icon-bg-hangup: #991B1B;
 32:   --color-view-window-edge: rgba(255, 255, 255, 0.9);
 33:   --color-main-view-hover: rgba(0, 0, 0, 0.7);
 34: 
 35:   --my-font: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
 36: 
 37:   /* Background colors - Fellou.ai inspired glass morphism */
 38:   /* Header */
 39:   --background-image-header: rgba(255, 255, 255, 0.03);
 40:   /* Message */
 41:   --background-image-message: rgba(255, 255, 255, 0.05);
 42:   /* Atlas AI assistant */
 43:   --background-image-atlas: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
 44:   /* Task execution button background */
 45:   --background-image-ask-status: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
 46:   /* Deep thinking */
 47:   --background-color-thinking: rgba(255, 255, 255, 0.04);
 48:   /* Steps */
 49:   --background-color-step: #3B82F6;
 50:   /* Tool call background */
 51:   --background-color-tool-call: rgba(255, 255, 255, 0.03);
 52: 
 53: 
 54:   /* Border colors - Glass morphism style */
 55:   --color-border-message: rgba(255, 255, 255, 0.1);
 56: 
 57: 
 58:   /* Text colors (Light theme) */
 59:   /* Primary text */
 60:   --color-text-01: #131C30;
 61:   /* Secondary text */
 62:   --color-text-02-01: #2A354E;
 63:   /* Tertiary text */
 64:   --color-text-03: #545E71;
 65:   /* Quaternary text */
 66:   --color-text-04: #A9B2BE;
 67:   /* Theme color */
 68:   --color-text-05: #3B82F6;
 69:   /* Special colors */
 70:   --color-text-06: #EF4444;
 71:   --color-text-07: #F97316;
 72:   --color-text-08: #F59E0B;
 73:   --color-text-09: #10B981;
 74:   --color-text-10: #DC2626;
 75:   --color-text-11: #2A354E;
 76:   --color-text-12: #EF4444;
 77:   --color-text-13: #10B981;
 78: 
 79:   /* Text colors (Dark theme) - Fellou.ai inspired */
 80:   /* Primary text */
 81:   --color-text-01-dark: rgba(255, 255, 255, 0.95);
 82:   /* Secondary text */
 83:   --color-text-02-01-dark: rgba(255, 255, 255, 0.9);
 84:   --color-text-02-02-dark: rgba(255, 217, 147, 0.9);
 85:   /* Tertiary text */
 86:   --color-text-03-dark: rgba(255, 255, 255, 0.7);
 87:   /* Quaternary text */
 88:   --color-text-04-dark: rgba(255, 255, 255, 0.5);
 89:   /* Theme color - blue accent */
 90:   --color-text-05-dark: #60A5FA;
 91:   /* Special colors */
 92:   --color-text-06-dark: #F87171;
 93:   --color-text-07-dark: #FB923C;
 94:   --color-text-08-dark: #FBBF24;
 95:   --color-text-09-dark: #34D399;
 96:   --color-text-10-dark: #EF4444;
 97:   --color-text-11-dark: rgba(255, 255, 255, 0.9);
 98:   --color-text-12-dark: rgba(255, 255, 255, 0.6);
 99: 
100: 
101: 
102: }
103: 
104: .gradient-border {
105:   position: relative;
106:   display: inline-block;
107:   padding: 2px; /* Border width */
108:   border-radius: 12px;
109:   /* Fellou.ai purple gradient border - subtle */
110:   background: linear-gradient(135deg, rgba(94, 49, 216, 0.3), rgba(145, 75, 241, 0.2), rgba(94, 49, 216, 0.3));
111:   backdrop-filter: blur(12px);
112:   transition: all 0.3s ease;
113: }
114: 
115: /* Remove the container-level focus effect - we'll handle it at textarea level */
116: .gradient-border textarea {
117:   border: none;
118:   outline: none;
119:   border-radius: 12px;
120:   font-size: 14px;
121:   resize: none !important;
122:   transition: all 0.3s ease;
123: }
124: 
125: /* Add focus effect directly to textarea with a glowing border */
126: .gradient-border textarea:focus {
127:   box-shadow: 0 0 0 2px rgba(145, 75, 241, 0.4) inset;
128: }
129: 
130: /* Ant Design Select dropdown customization - Fellou.ai purple theme */
131: /* Dropdown items styling - global since dropdownStyle only handles container */
132: .ant-select-item {
133:   color: rgba(255, 255, 255, 0.9) !important;
134:   border-radius: 8px !important;
135:   margin: 2px 4px !important;
136:   transition: all 0.2s ease !important;
137: }
138: 
139: /* Hover state for dropdown items */
140: .ant-select-item-option-active:not(.ant-select-item-option-selected) {
141:   background: rgba(94, 49, 216, 0.15) !important;
142: }
143: 
144: /* Selected state */
145: .ant-select-item-option-selected {
146:   background: rgba(94, 49, 216, 0.25) !important;
147:   font-weight: 500 !important;
148: }
149: 
150: /* Selected state hover */
151: .ant-select-item-option-selected.ant-select-item-option-active {
152:   background: rgba(94, 49, 216, 0.35) !important;
153: }
154: 
155: /* Select box focus state */
156: .custom-select.ant-select-focused .ant-select-selector {
157:   border-color: rgba(145, 75, 241, 0.4) !important;
158:   box-shadow: 0 0 0 2px rgba(145, 75, 241, 0.15) !important;
159: }
160: 
161: /* Select box hover state */
162: .custom-select:not(.ant-select-disabled):hover .ant-select-selector {
163:   border-color: rgba(145, 75, 241, 0.3) !important;
164: }
165: 
166: @theme inline {
167:   --color-background: var(--background);
168:   --color-foreground: var(--foreground);
169:   --font-sans: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
170:   --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
171: }
172: 
173: @media (prefers-color-scheme: dark) {
174:   :root {
175:     --background: #0a0a0a;
176:     --foreground: #ededed;
177:   }
178: }
179: 
180: body {
181:   background: var(--background);
182:   color: var(--foreground);
183:   font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
184: }
185: 
186: html,
187: body,
188: #__next {
189:   margin: 0;
190:   padding: 0;
191:   width: 100%;
192:   height: 100%;
193:   /* Subtle tech-inspired background with minimal distraction */
194:   background:
195:     radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
196:     radial-gradient(ellipse at 0% 100%, rgba(59, 130, 246, 0.02) 0%, transparent 40%),
197:     radial-gradient(ellipse at 100% 100%, rgba(96, 165, 250, 0.02) 0%, transparent 40%),
198:     #000000;
199:   background-color: #000000;
200:   background-attachment: fixed;
201: }
202: 
203: /* Scrollbar track */
204: ::-webkit-scrollbar {
205:   width: 6px;
206:   height: 6px;
207:   display: none;
208: }
209: 
210: ::-webkit-scrollbar-track {
211:   border-radius: 6px;
212:   /* background: rgba(255, 255, 255, 0.5); */
213: }
214: 
215: /* Scrollbar thumb */
216: ::-webkit-scrollbar-thumb {
217:   border-radius: 6px;
218:   background: rgba(0, 0, 0, 0.01);
219:   -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
220: }
221: 
222: /* Scrollbar corner */
223: ::-webkit-scrollbar-corner {
224:   background: transparent;
225: }
````

## File: src/styles/markdown.css
````css
  1: .markdown-container {
  2:   h1,
  3:   h2,
  4:   h3 {
  5:     font-size: 16px;
  6:     font-weight: 600;
  7:     line-height: 24px;
  8:     margin-bottom: 16px;
  9:   }
 10: 
 11:   h4 {
 12:     font-size: 14px;
 13:     font-weight: 600;
 14:     margin-bottom: 8px;
 15:   }
 16: 
 17:   h5 {
 18:     font-size: 14px;
 19:     font-weight: 600;
 20:     margin-bottom: 8px;
 21:   }
 22: 
 23:   h6 {
 24:     font-size: 12px;
 25:     font-weight: 600;
 26:     margin-bottom: 8px;
 27:   }
 28: 
 29:   sup {
 30:     color: #3B82F6;
 31:     background: rgba(59, 130, 246, 0.15);
 32:     border-radius: 8px;
 33:     height: 16px;
 34:     font-weight: 600;
 35:     width: 16px;
 36:     display: inline-flex;
 37:     vertical-align: text-top;
 38:     justify-content: center;
 39:     align-items: center;
 40:     text-align: center;
 41:     -webkit-box-align: center;
 42:     text-indent: 0;
 43:     margin-left: 2px;
 44:     top: 2px;
 45:   }
 46: 
 47:   /* Markdown paragraphs */
 48:   p {
 49:     margin-bottom: 8px;
 50:     font-size: 14px;
 51:     line-height: 22px;
 52:     font-weight: 400;
 53:     word-wrap: break-word;
 54:   }
 55: 
 56:   /* Markdown lists */
 57:   ul,
 58:   ol {
 59:     margin-bottom: 8px;
 60:     padding-left: 30px;
 61:     line-height: 22px;
 62:   }
 63: 
 64:   ul {
 65:     list-style-type: disc;
 66:   }
 67: 
 68:   ol {
 69:     list-style-type: decimal;
 70:   }
 71: 
 72:   li {
 73:     margin-bottom: 8px;
 74:     /* text-indent: 0px; */
 75:   }
 76: 
 77:   /* Markdown links */
 78:   a {
 79:     color: #007bff;
 80:     text-decoration: none;
 81:   }
 82: 
 83:   a:hover {
 84:     text-decoration: underline;
 85:   }
 86: 
 87:   /* Markdown code blocks */
 88:   pre {
 89:     padding: 12px;
 90:     border-radius: 6px;
 91:     overflow: hidden;
 92:     width: 100%;
 93:     box-sizing: border-box; /* Include padding and border */
 94:     white-space: pre-wrap;   /* Allow line wrapping */
 95:     word-wrap: break-word;   /* Prevent long words from overflowing */
 96:     font-size: 12px;
 97:     line-height: 20px;
 98:     margin-bottom: 10px;
 99:   }
100: 
101:   code {
102:     font-size: 14px;
103:     padding: 2px 4px;
104:     border-radius: 4px;
105:     font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
106:   }
107: 
108:   /* Markdown blockquotes */
109:   blockquote {
110:     margin-left: 20px;
111:     padding-left: 10px;
112:     border-left: 2px solid #ccc;
113:     color: #777;
114:   }
115: 
116:   /* Markdown horizontal rule */
117:   hr {
118:     border: none;
119:     border-top: 1px solid #ccc;
120:     margin: 20px 0;
121:   }
122: 
123:   /* Markdown images */
124:   img {
125:     max-width: 100%;
126:     height: auto;
127:   }
128: 
129:   /* Markdown table */
130:   table {
131:     width: 100%;
132:     border-collapse: collapse;
133:     margin-bottom: 8px;
134:   }
135: 
136:   th,
137:   td {
138:     padding: 3px 8px;
139:     border: 1px solid rgba(200, 203, 208, 1);
140:   }
141: 
142:   th {
143:     background-color: #f7f8fa;
144:     color: #92989f;
145:     font-size: 12px;
146:     font-weight: 400;
147:   }
148: }
149: 
150: .dark {
151:   .markdown-container {
152:     a {
153:       color: #007bff;
154:     }
155: 
156:     a:hover {
157:       color: #66b3ff;
158:     }
159: 
160:     pre,
161:     code {
162:       background-color: #1D273F;
163:       color: #C4CAD5;
164:     }
165: 
166:     blockquote {
167:       border-left: 2px solid #777;
168:       color: #ccc;
169:     }
170: 
171:     hr {
172:       border-top: 1px solid #777;
173:     }
174: 
175:     th,
176:     td {
177:       border: 1px solid #777;
178:     }
179: 
180:     th {
181:       background-color: #222;
182:     }
183: 
184:     sup {
185:       color: #60A5FA;
186:       background: rgba(59, 130, 246, 0.2);
187:     }
188:   }
189: }
````

## File: src/utils/http.ts
````typescript
  1: export class HttpClient {
  2:   private headers: Record<string, string>;
  3:   private timeout: number;
  4: 
  5:   constructor(baseURL?: string, timeout = 30000) {
  6:     this.timeout = timeout;
  7:     this.headers = {
  8:       'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/121.0.2277.107 Version/17.0 Mobile/15E148 Safari/604.1'
  9:     };
 10:   }
 11: 
 12:   async get(url: string, config?: any) {
 13:     const controller = new AbortController();
 14:     const timeoutId = setTimeout(() => controller.abort(), this.timeout);
 15: 
 16:     try {
 17:       const response = await fetch(url, {
 18:         method: 'GET',
 19:         headers: {
 20:           ...this.headers,
 21:           ...config?.headers
 22:         },
 23:         signal: controller.signal,
 24:         redirect: 'follow' // Automatically follow redirects
 25:       });
 26: 
 27:       clearTimeout(timeoutId);
 28: 
 29:       if (!response.ok && response.status >= 500) {
 30:         throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
 31:       }
 32: 
 33:       const data = await response.text();
 34: 
 35:       // Return axios-like response object
 36:       return {
 37:         data,
 38:         status: response.status,
 39:         statusText: response.statusText,
 40:         headers: Object.fromEntries(response.headers.entries()),
 41:         url: response.url, // This is the final URL after redirects
 42:         request: {
 43:           responseURL: response.url
 44:         },
 45:         config: { url }
 46:       };
 47: 
 48:     } catch (error) {
 49:       clearTimeout(timeoutId);
 50:       throw error;
 51:     }
 52:   }
 53: 
 54:   async post(url: string, data?: any, config?: any) {
 55:     const controller = new AbortController();
 56:     const timeoutId = setTimeout(() => controller.abort(), this.timeout);
 57: 
 58:     try {
 59:       const response = await fetch(url, {
 60:         method: 'POST',
 61:         headers: {
 62:           ...this.headers,
 63:           ...config?.headers
 64:         },
 65:         body: data,
 66:         signal: controller.signal
 67:       });
 68: 
 69:       clearTimeout(timeoutId);
 70: 
 71:       if (!response.ok && response.status >= 500) {
 72:         throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
 73:       }
 74: 
 75:       return await response.json();
 76: 
 77:     } catch (error) {
 78:       clearTimeout(timeoutId);
 79:       throw error;
 80:     }
 81:   }
 82: 
 83:   async download(url: string): Promise<Buffer> {
 84:     const controller = new AbortController();
 85:     const timeoutId = setTimeout(() => controller.abort(), this.timeout);
 86: 
 87:     try {
 88:       const response = await fetch(url, {
 89:         headers: this.headers,
 90:         signal: controller.signal
 91:       });
 92: 
 93:       clearTimeout(timeoutId);
 94: 
 95:       if (!response.ok) {
 96:         throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
 97:       }
 98: 
 99:       const arrayBuffer = await response.arrayBuffer();
100:       return Buffer.from(arrayBuffer);
101: 
102:     } catch (error) {
103:       clearTimeout(timeoutId);
104:       throw error;
105:     }
106:   }
107: 
108:   setHeaders(headers: Record<string, string>) {
109:     Object.assign(this.headers, headers);
110:   }
111: }
112: 
113: export const httpClient = new HttpClient();
````

## File: src/utils/messageTransform.ts
````typescript
  1: import { StreamCallbackMessage } from '@jarvis-agent/core';
  2: import { uuidv4 } from '@/common/utils';
  3: import { DisplayMessage, WorkflowMessage, AgentGroupMessage, UserMessage, ToolAction } from '@/models';
  4: 
  5: // Message transformation and processing class
  6: export class MessageProcessor {
  7:   private messages: DisplayMessage[] = [];
  8:   private workflowMessages = new Map<string, WorkflowMessage>();
  9:   private agentGroups = new Map<string, AgentGroupMessage>();
 10:   private executionId: string = '';
 11: 
 12:   // Set execution ID
 13:   public setExecutionId(id: string) {
 14:     this.executionId = id;
 15:   }
 16: 
 17:   // Process streaming messages and convert to structured display messages
 18:   public processStreamMessage(message: StreamCallbackMessage): DisplayMessage[] {
 19:     console.log('MessageProcessor processing message:', message.type, message);
 20: 
 21:     switch (message.type) {
 22:       case 'workflow':
 23:         this.handleWorkflowMessage(message);
 24:         break;
 25:       // case 'thinking':
 26:       //   this.handleThinkingMessage(message);
 27:       //   break;
 28:       case 'agent_start':
 29:         this.handleAgentStartMessage(message);
 30:         break;
 31:       case 'text':
 32:       case 'thinking':
 33:         this.handleTextMessage(message);
 34:         break;
 35:       case 'tool_streaming':
 36:       case 'tool_use':
 37:       case 'tool_running':
 38:       case 'tool_result':
 39:         this.handleToolMessage(message);
 40:         break;
 41:       case 'agent_result':
 42:         this.handleAgentResultMessage(message);
 43:         break;
 44:       case 'error':
 45:         this.handleErrorMessage(message);
 46:         break;
 47:     }
 48: 
 49:     console.log('MessageProcessor current message count:', this.messages.length);
 50:     return [...this.messages];
 51:   }
 52: 
 53:   // Handle workflow message
 54:   private handleWorkflowMessage(message: any) {
 55:     const key = `${message.taskId}-${this.executionId}`;
 56:     let workflowMsg = this.workflowMessages.get(key);
 57:     
 58:     if (!workflowMsg) {
 59:       workflowMsg = {
 60:         id: uuidv4(),
 61:         type: 'workflow',
 62:         taskId: message.taskId,
 63:         workflow: message.workflow,
 64:         timestamp: new Date()
 65:       };
 66:       this.workflowMessages.set(key, workflowMsg);
 67:       // Add directly to message list in order
 68:       this.messages.push(workflowMsg);
 69:     } else {
 70:       // Update workflow information
 71:       workflowMsg.workflow = message.workflow;
 72:     }
 73:   }
 74: 
 75:   // Handle thinking message
 76:   private handleThinkingMessage(message: any) {
 77:     const key = `${message.taskId}-${this.executionId}`;
 78:     let workflowMsg = this.workflowMessages.get(key);
 79:     
 80:     if (!workflowMsg) {
 81:       workflowMsg = {
 82:         id: uuidv4(),
 83:         type: 'workflow',
 84:         taskId: message.taskId,
 85:         thinking: {
 86:           text: message.text || '',
 87:           completed: message.streamDone || false
 88:         },
 89:         timestamp: new Date()
 90:       };
 91:       this.workflowMessages.set(key, workflowMsg);
 92:     } else {
 93:       // Update thinking information
 94:       if (!workflowMsg.thinking) {
 95:         workflowMsg.thinking = { text: '', completed: false };
 96:       }
 97:       if (message.text) {
 98:         workflowMsg.thinking.text = message.text;
 99:       }
100:       if (message.streamDone !== undefined) {
101:         workflowMsg.thinking.completed = message.streamDone;
102:       }
103:     }
104:   }
105: 
106:   // Handle agent_start message
107:   private handleAgentStartMessage(message: any) {
108:     const agentKey = `${message.taskId}-${message.nodeId}-${this.executionId}`;
109:     
110:     if (!this.agentGroups.has(agentKey)) {
111:       const agentGroup: AgentGroupMessage = {
112:         id: uuidv4(),
113:         type: 'agent_group',
114:         taskId: message.taskId,
115:         agentName: message.agentName,
116:         agentNode: message.agentNode || message.workflow || null,
117:         messages: [],
118:         status: 'running',
119:         timestamp: new Date()
120:       };
121:       this.agentGroups.set(agentKey, agentGroup);
122:       // Add directly to message list in order
123:       this.messages.push(agentGroup);
124:     }
125: 
126:   }
127: 
128:   // Handle text message
129:   private handleTextMessage(message: any) {
130:     const agentKey = `${message.taskId}-${message.nodeId}-${this.executionId}`;
131:     let agentGroup = this.agentGroups.get(agentKey);
132:     
133:     if (!agentGroup) {
134:       // If no corresponding agent group, create one
135:       agentGroup = {
136:         id: uuidv4(),
137:         type: 'agent_group',
138:         taskId: message.taskId,
139:         agentName: message.agentName,
140:         messages: [],
141:         status: 'running',
142:         timestamp: new Date()
143:       };
144:       this.agentGroups.set(agentKey, agentGroup);
145:       // Add directly to message list in order
146:       this.messages.push(agentGroup);
147:     }
148: 
149:     // Find or create corresponding text message
150:     let textMessage = agentGroup.messages.find(msg => 
151:       msg.type === 'text' && msg.id === (message.streamId || message.id)
152:     );
153:     
154:     if (!textMessage) {
155:       textMessage = {
156:         type: 'text',
157:         id: message.streamId || message.id || uuidv4(),
158:         content: message.text || ''
159:       };
160:       agentGroup.messages.push(textMessage);
161:     } else {
162:       // Update text content (support streaming updates)
163:       if (message.text) {
164:         (textMessage as any).content = message.text;
165:       }
166:     }
167:   }
168: 
169:   // Handle tool-related messages
170:   private handleToolMessage(message: any) {
171:     const agentKey = `${message.taskId}-${message.nodeId}-${this.executionId}`;
172:     let agentGroup = this.agentGroups.get(agentKey);
173:     
174:     if (!agentGroup) {
175:       // If no corresponding agent group, create one
176:       agentGroup = {
177:         id: uuidv4(),
178:         type: 'agent_group',
179:         taskId: message.taskId,
180:         agentName: message.agentName,
181:         messages: [],
182:         status: 'running',
183:         timestamp: new Date()
184:       };
185:       this.agentGroups.set(agentKey, agentGroup);
186:       // Add directly to message list in order
187:       this.messages.push(agentGroup);
188:     }
189: 
190:     // Find or create corresponding tool action
191:     let toolAction = agentGroup.messages.find(tool => tool.id === message.toolId);
192:     if (!toolAction) {
193:       toolAction = {
194:         type: 'tool',
195:         id: message.toolId,
196:         toolName: message.toolName || message.type,
197:         params: message.params,
198:         status: this.mapToolStatus(message.type),
199:         timestamp: new Date(),
200:         agentName: message.agentName,
201:       };
202:       agentGroup.messages.push(toolAction);
203:     } else {
204:       if (toolAction.type === 'tool') {
205:         // Update tool status
206:       toolAction.status = this.mapToolStatus(message.type);
207:       if (message.params) {
208:         toolAction.params = message.params;
209:       }
210:       if (message.type === 'tool_result') {
211:         toolAction.result = message.result;
212:         toolAction.status = 'completed';
213:       }
214:       }
215:       
216:     }
217:   }
218: 
219:   // Handle agent_result message
220:   private handleAgentResultMessage(message: any) {
221:     const agentKey = `${message.taskId}-${message.nodeId}-${this.executionId}`;
222:     let agentGroup = this.agentGroups.get(agentKey);
223:     
224:     if (agentGroup) {
225:       agentGroup.result = message.result;
226:       agentGroup.status = 'completed';
227:     }
228:   }
229: 
230:   // Map tool status
231:   private mapToolStatus(messageType: string): 'streaming' | 'use' | 'running' | 'completed' {
232:     switch (messageType) {
233:       case 'tool_streaming': return 'streaming';
234:       case 'tool_use': return 'use';
235:       case 'tool_running': return 'running';
236:       case 'tool_result': return 'completed';
237:       default: return 'use';
238:     }
239:   }
240: 
241: 
242:   // Add user message
243:   public addUserMessage(content: string): DisplayMessage[] {
244:     const userMsg: UserMessage = {
245:       id: uuidv4(),
246:       type: 'user',
247:       content,
248:       timestamp: new Date()
249:     };
250:     
251:     this.messages.push(userMsg);
252:     return [...this.messages];
253:   }
254: 
255:   // Handle error message
256:   private handleErrorMessage(message: any) {
257:     console.error('Error message received:', message);
258: 
259:     // Create error message as AgentGroupMessage with error status
260:     const errorMsg: AgentGroupMessage = {
261:       id: uuidv4(),
262:       type: 'agent_group',
263:       taskId: message.taskId || 'unknown',
264:       agentName: 'System',
265:       messages: [
266:         {
267:           type: 'text',
268:           id: uuidv4(),
269:           content: `❌ Error: ${message.error || 'Unknown error occurred'}\n\n${message.detail || ''}`
270:         }
271:       ],
272:       status: 'error',
273:       timestamp: new Date()
274:     };
275: 
276:     this.messages.push(errorMsg);
277:   }
278: 
279:   // Get current message list
280:   public getMessages(): DisplayMessage[] {
281:     return [...this.messages];
282:   }
283: 
284:   // Clear messages
285:   public clearMessages(): void {
286:     this.messages = [];
287:     this.workflowMessages.clear();
288:     this.agentGroups.clear();
289:   }
290: }
````

## File: src/utils/webglDetect.ts
````typescript
 1: /**
 2:  * WebGL Detection Utility
 3:  * Detects if the browser supports WebGL 1.0 or WebGL 2.0
 4:  */
 5: 
 6: /**
 7:  * Check if WebGL is supported in the current browser
 8:  * @returns {boolean} true if WebGL is available, false otherwise
 9:  */
10: export function isWebGLSupported(): boolean {
11:   try {
12:     // Create a temporary canvas element
13:     const canvas = document.createElement('canvas');
14: 
15:     // Try to get WebGL context (WebGL 2.0 or 1.0)
16:     const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
17: 
18:     // If we got a context, WebGL is supported
19:     if (gl) {
20:       return true;
21:     }
22: 
23:     return false;
24:   } catch (e) {
25:     // If any error occurs during detection, assume WebGL is not supported
26:     console.warn('WebGL detection failed:', e);
27:     return false;
28:   }
29: }
30: 
31: /**
32:  * Get WebGL version info
33:  * @returns {string} WebGL version or 'Not supported'
34:  */
35: export function getWebGLVersion(): string {
36:   try {
37:     const canvas = document.createElement('canvas');
38:     const gl2 = canvas.getContext('webgl2');
39: 
40:     if (gl2) {
41:       return 'WebGL 2.0';
42:     }
43: 
44:     const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
45:     if (gl) {
46:       return 'WebGL 1.0';
47:     }
48: 
49:     return 'Not supported';
50:   } catch (e) {
51:     return 'Not supported';
52:   }
53: }
````

## File: src/type.d.ts
````typescript
  1: // Supported providers
  2: export type ProviderType = 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter';
  3: 
  4: // Model configuration types
  5: export interface UserModelConfigs {
  6:   deepseek?: {
  7:     apiKey?: string
  8:     baseURL?: string
  9:     model?: string
 10:   }
 11:   qwen?: {
 12:     apiKey?: string
 13:     model?: string
 14:   }
 15:   google?: {
 16:     apiKey?: string
 17:     model?: string
 18:   }
 19:   anthropic?: {
 20:     apiKey?: string
 21:     model?: string
 22:   }
 23:   openrouter?: {
 24:     apiKey?: string
 25:     model?: string
 26:   }
 27:   selectedProvider?: ProviderType
 28: }
 29: 
 30: // Agent configuration types
 31: export interface AgentConfig {
 32:   browserAgent: {
 33:     enabled: boolean
 34:     customPrompt: string
 35:   }
 36:   fileAgent: {
 37:     enabled: boolean
 38:     customPrompt: string
 39:   }
 40:   mcpTools: {
 41:     [toolName: string]: {
 42:       enabled: boolean
 43:       config?: Record<string, any>
 44:     }
 45:   }
 46: }
 47: 
 48: // MCP Tool types
 49: export interface McpToolSchema {
 50:   name: string
 51:   description: string
 52:   enabled: boolean
 53:   inputSchema: {
 54:     type: string
 55:     properties: Record<string, any>
 56:     required: string[]
 57:   }
 58: }
 59: 
 60: declare global {
 61:   interface Window {
 62:     api: {
 63:       sendToMainViewExecuteCode: (func: string, args: any[]) => Promise<any>
 64:       navigateTo: (url: string) => Promise<{ url: string; title: string }>
 65:       getMainViewSize: () => Promise<{ width: number; height: number }>
 66:       getMainViewScreenshot: () => Promise<{ imageBase64: string; imageType: "image/jpeg" | "image/png" }>
 67:       getMainViewUrlAndTitle: () => Promise<{ url: string; title: string }>
 68:       getHiddenWindowSourceId: () => Promise<string>
 69:       showViewWindow: () => Promise<void>
 70:       hideViewWindow: () => Promise<void>
 71:       sendVoiceTextToChat: (text: string) => Promise<void>
 72:       onVoiceTextReceived: (callback: (text: string) => void) => void
 73:       sendTTSSubtitle: (text: string, isStart: boolean) => Promise<boolean>
 74:       onTTSSubtitleReceived: (callback: (text: string, isStart: boolean) => void) => void
 75:       removeAllListeners: (channel: string) => void,
 76:       getMainViewWindowNumber: () => Promise<number>
 77:       captureWindow: (winNo: number, scale?: number) => Promise<{ width: number; height: number; stride: number; data: Buffer; error?: string }>
 78:       captureWindowSync: (winNo: number, scale?: number) => { width: number; height: number; stride: number; data: Buffer; error?: string }
 79:       requestCapturePermission: () => Promise<boolean>
 80:       ekoRun: (prompt: string) => Promise<any>
 81:       ekoModify: (taskId: string, prompt: string) => Promise<any>
 82:       ekoExecute: (taskId: string) => Promise<any>
 83:       onEkoStreamMessage: (callback: (message: any) => void) => void
 84:       ekoGetTaskStatus: (taskId: string) => Promise<any>
 85:       ekoCancelTask: (taskId: string) => Promise<any>
 86: 
 87:       // Model configuration APIs
 88:       getUserModelConfigs: () => Promise<UserModelConfigs>
 89:       saveUserModelConfigs: (configs: UserModelConfigs) => Promise<{ success: boolean }>
 90:       getModelConfig: (provider: ProviderType) => Promise<any>
 91:       getApiKeySource: (provider: ProviderType) => Promise<'user' | 'env' | 'none'>
 92:       getSelectedProvider: () => Promise<ProviderType>
 93:       setSelectedProvider: (provider: ProviderType) => Promise<{ success: boolean }>
 94: 
 95:       // Agent configuration APIs
 96:       getAgentConfig: () => Promise<{ success: boolean; data: AgentConfig }>
 97:       saveAgentConfig: (config: AgentConfig) => Promise<{ success: boolean }>
 98:       getMcpTools: () => Promise<{ success: boolean; data: McpToolSchema[] }>
 99:       setMcpToolEnabled: (toolName: string, enabled: boolean) => Promise<{ success: boolean }>
100:       reloadAgentConfig: () => Promise<{ success: boolean; data: AgentConfig }>
101:     }
102:     // PDF.js type declarations
103:     pdfjsLib?: {
104:       GlobalWorkerOptions: {
105:         workerSrc: string;
106:       };
107:       getDocument: (params: any) => {
108:         promise: Promise<{
109:           numPages: number;
110:           getPage: (pageNum: number) => Promise<{
111:             getTextContent: () => Promise<{
112:               items: Array<{ str: string; [key: string]: any }>;
113:             }>;
114:           }>;
115:         }>;
116:       };
117:     };
118:   }
119: }
120: 
121: export {}
````

## File: .env.template
````
 1: # AI Service API Keys
 2: # ===================
 3: 
 4: # DeepSeek API Configuration
 5: # Get your API key from: https://platform.deepseek.com/api_keys
 6: DEEPSEEK_API_KEY=
 7: DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
 8: 
 9: # Alibaba Cloud Qwen API Configuration
10: # Get your API key from: https://bailian.console.aliyun.com/
11: QWEN_API_KEY=
12: 
13: # Google Gemini API Configuration
14: # Get your API key from: https://aistudio.google.com/app/apikey
15: GOOGLE_API_KEY=
16: 
17: # Anthropic Claude API Configuration
18: # Get your API key from: https://console.anthropic.com/settings/keys
19: ANTHROPIC_API_KEY=
20: 
21: # OpenRouter API Configuration (supports multiple providers)
22: # Get your API key from: https://openrouter.ai/keys
23: OPENROUTER_API_KEY=
24: 
25: # Text-to-Speech Configuration
26: TTS_REGION=eastasia
27: TTS_KEY=your_tts_key_here
28: 
29: # Application Settings
30: # ===================
31: 
32: # Screenshot settings
33: EKO_SCREENSHOT_SCALE=0.5
34: # Alternative: use maximum width for proportional scaling
35: # EKO_SCREENSHOT_MAX_WIDTH=1280
36: 
37: # Development Settings
38: # ===================
39: 
40: # Next.js development settings
41: NEXT_PUBLIC_APP_ENV=development
42: 
43: # Electron settings
44: ELECTRON_IS_DEV=true
````

## File: .gitignore
````
 1: # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
 2: 
 3: # dependencies
 4: /node_modules
 5: /.pnp
 6: .pnp.*
 7: .yarn/*
 8: !.yarn/patches
 9: !.yarn/plugins
10: !.yarn/releases
11: !.yarn/versions
12: 
13: # project config
14: /.claude
15: .npmrc
16: CLAUDE.md
17: /license
18: .env.local
19: .env.production
20: package-mac-signed.sh
21: 
22: # testing
23: /coverage
24: 
25: # electron
26: /release
27: 
28: # next.js
29: /.next/
30: /out/
31: 
32: # production
33: /dist
34: 
35: # misc
36: .DS_Store
37: *.pem
38: 
39: # debug
40: npm-debug.log*
41: yarn-debug.log*
42: yarn-error.log*
43: .pnpm-debug.log*
44: 
45: # env files (can opt-in for committing if needed)
46: # .env*
47: 
48: # vercel
49: .vercel
50: 
51: # typescript
52: *.tsbuildinfo
53: next-env.d.ts
54: 
55: # promotion posts
56: /promotion-posts
````

## File: electron-builder.yml
````yaml
 1: appId: deepfundai.browser
 2: productName: DeepFundAIBrowser
 3: directories:
 4:   buildResources: dist
 5:   output: release
 6: files:
 7:   - .next/**/*
 8:   - package.json
 9:   - node_modules/**/*
10:   - assets/**/*
11:   - dist/**/*
12:   - public/**/*
13:   - server.js
14:   - electron-update.yml
15:   - next.config.js
16:   - .env.production
17:   - from: electron/renderer
18:     to: renderer
19:     filter: ["**/*"]
20: 
21: extraMetadata:
22:   main: dist/electron/main/index.mjs
23: asarUnpack:
24:   - electron-update.yml
25: 
26: mac:
27:   icon: assets/icons/logo.png
28:   target:
29:     - target: dmg
30:       arch: universal
31:   # identity:  Shuai Liu (ZHP9ZM5YMB)
32:   category: "public.app-category.developer-tools"
33:   type: "distribution"
34:   hardenedRuntime: true
35:   entitlements: "assets/entitlements.mac.plist"
36:   entitlementsInherit: "assets/entitlements.mac.plist"
37:   gatekeeperAssess: false
38:   # notarize: true
39: 
40: win:
41:   icon: assets/icons/logo.png
42:   target:
43:     - nsis
44:     - zip
45:   signDlls: false
46:   artifactName: ${name}-${version}-${os}-${arch}.${ext}
47: 
48: linux:
49:   icon: assets/icons/icon.png
50:   target:
51:     - AppImage
52:     - deb
53:   artifactName: ${name}-${version}-${os}-${arch}.${ext}
54:   category: Development
55: 
56: nsis:
57:   oneClick: false
58:   allowToChangeInstallationDirectory: true
59:   createDesktopShortcut: true
60:   createStartMenuShortcut: true
61:   shortcutName: ${productName}
62:   artifactName: ${name}-${version}-${os}-${arch}-setup.${ext}
63: 
64: npmRebuild: false
65: 
66: publish:
67:   provider: github
68:   owner: deepfundai
69:   repo: browser
70:   private: false
71:   releaseType: release
72: 
73: electronDownload:
74:   mirror: https://npmmirror.com/mirrors/electron/
````

## File: electron-update.yml
````yaml
1: owner: deepfundai
2: repo: browser
3: provider: github
4: private: true
````

## File: eslint.config.mjs
````
 1: import { dirname } from "path";
 2: import { fileURLToPath } from "url";
 3: import { FlatCompat } from "@eslint/eslintrc";
 4: 
 5: const __filename = fileURLToPath(import.meta.url);
 6: const __dirname = dirname(__filename);
 7: 
 8: const compat = new FlatCompat({
 9:   baseDirectory: __dirname,
10: });
11: 
12: const eslintConfig = [
13:   ...compat.extends("next/core-web-vitals", "next/typescript"),
14:   {
15:     rules: {
16:       "@typescript-eslint/no-unused-vars": "off",
17:       "@typescript-eslint/no-explicit-any": "off", 
18:       "react/jsx-key": "off",
19:       "@next/next/no-img-element": "off",
20:       "prefer-const": "off",
21:       "@typescript-eslint/no-empty-function": "off",
22:       "@typescript-eslint/ban-ts-comment": "off",
23:       "react-hooks/exhaustive-deps": "off",
24:     }
25:   }
26: ];
27: 
28: export default eslintConfig;
````

## File: next.config.js
````javascript
 1: // @ts-check
 2: 
 3: /** @type {import('next').NextConfig} */
 4: const nextConfig = {
 5:   /* config options here */
 6:   reactStrictMode: true,
 7:   devIndicators: false,
 8:   
 9:   // Disable ESLint checks during build
10:   eslint: {
11:     ignoreDuringBuilds: true,
12:   },
13:   
14:   // Disable TypeScript type checking during build
15:   typescript: {
16:     ignoreBuildErrors: true,
17:   },
18:   env: {
19:     TTS_KEY: process.env.TTS_KEY,
20:     TTS_REGION: process.env.TTS_REGION,
21:   },
22:   
23:   // API route configuration
24:   async headers() {
25:     return [
26:       {
27:         source: '/api/mcp/(.*)',
28:         headers: [
29:           {
30:             key: 'Access-Control-Allow-Origin',
31:             value: '*',
32:           },
33:           {
34:             key: 'Access-Control-Allow-Methods',
35:             value: 'GET, POST, PUT, DELETE, OPTIONS',
36:           },
37:           {
38:             key: 'Access-Control-Allow-Headers',
39:             value: 'Content-Type, Authorization',
40:           },
41:         ],
42:       },
43:     ];
44:   },
45: }
46:  
47: module.exports = nextConfig
````

## File: nodemon.json
````json
1: {
2:     "watch": ["server.ts"],
3:     "exec": "ts-node --project tsconfig.server.json server.ts",
4:     "ext": "js ts"
5:   }
````

## File: package.json
````json
 1: {
 2:   "name": "ai-browser",
 3:   "version": "0.0.7",
 4:   "description": "DeepFundAI Browser - AI-Powered Intelligent Browser",
 5:   "author": "Shuai Liu <lsustc@mail.ustc.edu.cn>",
 6:   "private": true,
 7:   "scripts": {
 8:     "postinstall": "electron-builder install-app-deps",
 9:     "dev": "concurrently \"next dev -p 5173\" \"npm run build:deps:watch\" \"nodemon --exec electron ./dist/electron/main/index.mjs --watch electron\"",
10:     "lint": "next lint",
11:     "next": "next dev -p 5173",
12:     "electron": "electron ./dist/electron/main/index.mjs",
13:     "build:next": "next build && tsc --project tsconfig.server.json --outDir ./",
14:     "start": "next start",
15:     "build:electron": "electron-builder",
16:     "build:deps": "concurrently \"ENTRY=index vite build --config electron/preload/vite.config.ts\" \"ENTRY=view vite build --config electron/preload/vite.config.ts\" \"vite build --config electron/main/vite.config.ts\"",
17:     "build:deps:win": "concurrently \"set ENTRY=index&& vite build --config electron/preload/vite.config.ts\" \"set ENTRY=view&& vite build --config electron/preload/vite.config.ts\" \"vite build --config electron/main/vite.config.ts\"",
18:     "build": "npm run build:next && npm run build:deps && npm run build:electron",
19:     "build:win": "npm run build:next && npm run build:deps:win && npm run build:electron",
20:     "build:next-only": "next build",
21:     "build:deps:watch": "concurrently \"vite build --config electron/preload/vite.config.ts --watch\" \"vite build --config electron/main/vite.config.ts --watch\"",
22:     "build:deps:watch:win": "concurrently \"set ENTRY=index&& vite build --config electron/preload/vite.config.ts --watch\" \"set ENTRY=view&& vite build --config electron/preload/vite.config.ts --watch\" \"vite build --config electron/main/vite.config.ts --watch\"",
23:     "dev:win": "concurrently \"next dev -p 5173\" \"npm run build:deps:watch:win\" \"nodemon --exec electron ./dist/electron/main/index.mjs --watch electron\"",
24:     "test": "jest",
25:     "test:speech": "node test-speech.js",
26:     "test:speech:install": "chmod +x install-vosk.sh && ./install-vosk.sh",
27:     "test:speech:download-model": "mkdir -p public/models && wget https://alphacephei.com/vosk/models/vosk-model-small-cn-0.22.zip && unzip vosk-model-small-cn-0.22.zip -d public/models/"
28:   },
29:   "dependencies": {
30:     "@ant-design/cssinjs": "^1.23.0",
31:     "@ant-design/icons": "5.x",
32:     "@jarvis-agent/core": "^0.1.3",
33:     "@jarvis-agent/electron": "^0.1.7",
34:     "@jest/globals": "^30.1.2",
35:     "@react-spring/web": "^10.0.1",
36:     "antd": "^5.26.5",
37:     "clsx": "^2.1.1",
38:     "date-fns": "^4.1.0",
39:     "dotenv": "^16.4.7",
40:     "electron-log": "^5.2.3",
41:     "electron-store": "^10.0.0",
42:     "electron-updater": "^6.3.9",
43:     "framer-motion": "^12.23.18",
44:     "glob": "11.0.2",
45:     "html2canvas": "^1.4.1",
46:     "i18next": "^25.6.0",
47:     "i18next-browser-languagedetector": "^8.2.0",
48:     "json-schema": "^0.4.0",
49:     "microsoft-cognitiveservices-speech-sdk": "^1.45.0",
50:     "next": "15.4.1",
51:     "react": "19.1.0",
52:     "react-dom": "19.1.0",
53:     "react-i18next": "^16.2.3",
54:     "react-icons": "^5.5.0",
55:     "react-markdown": "^10.1.0",
56:     "tailwind-merge": "^3.3.1",
57:     "vosk-browser": "0.0.7",
58:     "xmldom": "^0.6.0",
59:     "zhipu-ai-provider": "^0.1.1",
60:     "zustand": "^5.0.8"
61:   },
62:   "devDependencies": {
63:     "@electron-toolkit/preload": "^3.0.2",
64:     "@eslint/eslintrc": "^3",
65:     "@tailwindcss/postcss": "^4",
66:     "@types/jest": "29.5.14",
67:     "@types/node": "^20",
68:     "@types/react": "^19",
69:     "@types/react-dom": "^19",
70:     "concurrently": "^8.2.2",
71:     "electron": "^33.2.0",
72:     "electron-builder": "^25.1.8",
73:     "electron-reload": "2.0.0-alpha.1",
74:     "eslint": "^9",
75:     "eslint-config-next": "15.4.1",
76:     "nodemon": "^3.1.10",
77:     "tailwindcss": "^4",
78:     "ts-jest": "29.3.2",
79:     "typescript": "^5",
80:     "vite": "^7.0.4"
81:   },
82:   "packageManager": "pnpm@10.18.2+sha512.9fb969fa749b3ade6035e0f109f0b8a60b5d08a1a87fdf72e337da90dcc93336e2280ca4e44f2358a649b83c17959e9993e777c2080879f3801e6f0d999ad3dd"
83: }
````

## File: pnpm-workspace.yaml
````yaml
1: packages:
2:   - '*/*'
3: 
4: onlyBuiltDependencies:
5:   - electron
````

## File: postcss.config.mjs
````
1: const config = {
2:   plugins: ["@tailwindcss/postcss"],
3: };
4: 
5: export default config;
````

## File: README.md
````markdown
  1: # Manus Electron
  2: 
  3: [English](./README.md) | [简体中文](./README.zh-CN.md)
  4: 
  5: An AI-powered intelligent browser built with Next.js and Electron. Features multi-modal AI task execution, scheduled tasks, social media integration, and advanced file management capabilities with support for multiple AI providers.
  6: 
  7: Built with [Next.js](https://nextjs.org) and [Electron](https://electronjs.org).
  8: 
  9: ## Tech Stack
 10: 
 11: - **Frontend**: Next.js 15 + React 19
 12: - **Desktop**: Electron 33
 13: - **UI**: Ant Design + Tailwind CSS
 14: - **State Management**: Zustand
 15: - **Storage**: IndexedDB (via electron-store)
 16: - **AI Agent**: @jarvis-agent (based on [Eko](https://github.com/FellouAI/eko) - production-ready agent framework)
 17: - **Build Tools**: Vite + TypeScript
 18: 
 19: ## Development Environment Configuration
 20: Node version: 20.19.3
 21: 
 22: ## Getting Started
 23: 
 24: ### 1. Configure API Keys
 25: 
 26: Before running the application, you need to configure API keys:
 27: 
 28: ```bash
 29: # Copy configuration template
 30: cp .env.template .env.local
 31: 
 32: # Edit .env.local and fill in your API keys
 33: # Supported: DEEPSEEK_API_KEY, QWEN_API_KEY, GOOGLE_API_KEY, ANTHROPIC_API_KEY, OPENROUTER_API_KEY
 34: ```
 35: 
 36: For detailed configuration instructions, see [CONFIGURATION.md](./docs/CONFIGURATION.md).
 37: 
 38: ### 2. Development Setup
 39: 
 40: First, run the development server:
 41: 
 42: ```bash
 43: # Install dependencies
 44: pnpm install
 45: 
 46: # Build desktop application client for mac
 47: pnpm run build:deps
 48: 
 49: # Build desktop application client for windows
 50: pnpm run build:deps:win
 51: 
 52: # Start web development server
 53: pnpm run next
 54: 
 55: # Start desktop application
 56: pnpm run electron
 57: ```
 58: 
 59: ### 3. Building Desktop Application
 60: 
 61: To build the desktop application for distribution:
 62: 
 63: ```bash
 64: # Configure production API keys
 65: # Edit .env.production file with your actual API keys
 66: 
 67: # Build the application for mac
 68: pnpm run build
 69: 
 70: # Build the application for windows
 71: pnpm run build:win
 72: ```
 73: 
 74: The built application will include your API configuration, so end users don't need to configure anything.
 75: 
 76: ## Features
 77: 
 78: - **Multiple AI Providers**: Support for DeepSeek, Qwen, Google Gemini, Anthropic Claude, and OpenRouter
 79: - **UI Configuration**: Configure AI models and API keys directly in the app, no file editing required
 80: - **Agent Configuration**: Customize AI agent behavior with custom prompts and manage MCP tools
 81: - **Toolbox**: Centralized hub for system features including agent configuration, scheduled tasks, and more
 82: - **AI-Powered Browser**: Intelligent browser with automated task execution
 83: - **Multi-Modal AI**: Vision and text processing capabilities
 84: - **Scheduled Tasks**: Create and manage automated recurring tasks
 85: - **Speech & TTS**: Voice recognition and text-to-speech integration
 86: - **File Management**: Advanced file operations and management
 87: 
 88: ## Screenshots
 89: 
 90: ### Start
 91: 
 92: ![Start](./docs/shotscreen/start-loading.png)
 93: 
 94: ### Home
 95: Input tasks and let AI execute automatically.
 96: 
 97: ![Home](./docs/shotscreen/home.png)
 98: 
 99: ### Main
100: Left: AI thinking and execution steps. Right: Real-time browser operation preview.
101: 
102: ![Main](./docs/shotscreen/main.png)
103: 
104: ### Scheduled Tasks
105: Create scheduled tasks with custom intervals and execution steps.
106: 
107: ![Scheduled Tasks](./docs/shotscreen/schedule.png)
108: 
109: ### History
110: View past tasks with search and playback capabilities.
111: 
112: ![History](./docs/shotscreen/history.png)
113: 
114: ### Toolbox
115: Centralized hub for accessing all system features and configurations.
116: 
117: ![Toolbox](./docs/shotscreen/toolbox.png)
118: 
119: ### Agent Configuration
120: Customize AI agent behavior with custom prompts and manage MCP tools for enhanced capabilities.
121: 
122: ![Agent Configuration](./docs/shotscreen/agent-configuration.png)
123: 
124: ## Supported AI Providers
125: 
126: - **DeepSeek**: deepseek-chat, deepseek-reasoner
127: - **Qwen (Alibaba Cloud)**: qwen-max, qwen-plus, qwen-vl-max
128: - **Google Gemini**: gemini-1.5-flash, gemini-2.0-flash, gemini-1.5-pro, and more
129: - **Anthropic Claude**: claude-3.7-sonnet, claude-3.5-sonnet, claude-3-opus, and more
130: - **OpenRouter**: Multiple providers (Claude, GPT, Gemini, Mistral, Cohere, etc.)
131: 
132: ## Documentation
133: 
134: - [Configuration Guide](./docs/CONFIGURATION.md) - Detailed API key setup instructions
135: 
136: ## Acknowledgements
137: 
138: Special thanks to [Eko](https://github.com/FellouAI/eko) - A production-ready agent framework that powers the AI capabilities of this project.
139: 
140: ## Contributing
141: 
142: Please ensure all API keys are properly configured in development environment files only. Never commit actual API keys to the repository.
````

## File: README.zh-CN.md
````markdown
  1: # Manus Electron
  2: 
  3: [English](./README.md) | [简体中文](./README.zh-CN.md)
  4: 
  5: 一个基于 Next.js 和 Electron 构建的 AI 智能浏览器。支持多模态 AI 任务执行、定时任务、社交媒体集成以及高级文件管理功能，并支持多个 AI 提供商。
  6: 
  7: 基于 [Next.js](https://nextjs.org) 和 [Electron](https://electronjs.org) 构建。
  8: 
  9: ## 技术栈
 10: 
 11: - **前端**: Next.js 15 + React 19
 12: - **桌面应用**: Electron 33
 13: - **UI**: Ant Design + Tailwind CSS
 14: - **状态管理**: Zustand
 15: - **存储**: IndexedDB (via electron-store)
 16: - **AI Agent**: @jarvis-agent (基于 [Eko](https://github.com/FellouAI/eko) - 生产就绪的 Agent 框架)
 17: - **构建工具**: Vite + TypeScript
 18: 
 19: ## 开发环境配置
 20: Node 版本: 20.19.3
 21: 
 22: ## 快速开始
 23: 
 24: ### 1. 配置 API 密钥
 25: 
 26: 运行应用前，需要配置 API 密钥：
 27: 
 28: ```bash
 29: # 复制配置模板
 30: cp .env.template .env.local
 31: 
 32: # 编辑 .env.local 并填入你的 API 密钥
 33: # 支持: DEEPSEEK_API_KEY, QWEN_API_KEY, GOOGLE_API_KEY, ANTHROPIC_API_KEY, OPENROUTER_API_KEY
 34: ```
 35: 
 36: 详细配置说明请参见 [CONFIGURATION.zh-CN.md](./docs/CONFIGURATION.zh-CN.md)。
 37: 
 38: ### 2. 开发环境设置
 39: 
 40: 首先，运行开发服务器：
 41: 
 42: ```bash
 43: # 安装依赖
 44: pnpm install
 45: 
 46: # 构建桌面应用客户端
 47: pnpm run build:deps
 48: 
 49: # 启动 Web 开发服务器
 50: pnpm run next
 51: 
 52: # 启动桌面应用
 53: pnpm run electron
 54: ```
 55: 
 56: ### 3. 构建桌面应用
 57: 
 58: 构建用于分发的桌面应用：
 59: 
 60: ```bash
 61: # 配置生产环境 API 密钥
 62: # 编辑 .env.production 文件并填入实际的 API 密钥
 63: 
 64: # 构建应用
 65: pnpm run build
 66: ```
 67: 
 68: 构建的应用将包含你的 API 配置，终端用户无需额外配置。
 69: 
 70: ## 功能特性
 71: 
 72: - **多 AI 提供商支持**: 支持 DeepSeek、Qwen、Google Gemini、Anthropic Claude 和 OpenRouter
 73: - **UI 配置**: 直接在应用中配置 AI 模型和 API 密钥，无需编辑文件
 74: - **Agent 配置**: 使用自定义提示词定制 AI Agent 行为，管理 MCP 工具
 75: - **工具箱**: 系统功能的集中访问中心，包括 Agent 配置、定时任务等
 76: - **AI 智能浏览器**: 具有自动化任务执行的智能浏览器
 77: - **多模态 AI**: 视觉和文本处理能力
 78: - **定时任务**: 创建和管理自动化定期任务
 79: - **语音识别与 TTS**: 语音识别和文字转语音集成
 80: - **文件管理**: 高级文件操作和管理
 81: 
 82: ## 截图
 83: 
 84: ### 启动动画
 85: 
 86: ![启动动画](./docs/shotscreen/start-loading.png)
 87: 
 88: ### 首页
 89: 输入任务，让 AI 自动执行。
 90: 
 91: ![首页](./docs/shotscreen/home.png)
 92: 
 93: ### 主界面
 94: 左侧：AI 思考和执行步骤。右侧：实时浏览器操作预览。
 95: 
 96: ![主界面](./docs/shotscreen/main.png)
 97: 
 98: ### 定时任务
 99: 创建具有自定义间隔和执行步骤的定时任务。
100: 
101: ![定时任务](./docs/shotscreen/schedule.png)
102: 
103: ### 历史记录
104: 查看过去的任务，支持搜索和回放功能。
105: 
106: ![历史记录](./docs/shotscreen/history.png)
107: 
108: ### 工具箱
109: 集中访问所有系统功能和配置的中心枢纽。
110: 
111: ![工具箱](./docs/shotscreen/toolbox.png)
112: 
113: ### Agent 配置
114: 使用自定义提示词定制 AI Agent 行为，管理 MCP 工具以增强能力。
115: 
116: ![Agent 配置](./docs/shotscreen/agent-configuration.png)
117: 
118: ## 支持的 AI 提供商
119: 
120: - **DeepSeek**: deepseek-chat, deepseek-reasoner
121: - **Qwen (阿里云)**: qwen-max, qwen-plus, qwen-vl-max
122: - **Google Gemini**: gemini-1.5-flash, gemini-2.0-flash, gemini-1.5-pro 等
123: - **Anthropic Claude**: claude-3.7-sonnet, claude-3.5-sonnet, claude-3-opus 等
124: - **OpenRouter**: 多个提供商（Claude、GPT、Gemini、Mistral、Cohere 等）
125: 
126: ## 文档
127: 
128: - [配置指南](./docs/CONFIGURATION.zh-CN.md) - 详细的 API 密钥设置说明
129: 
130: ## 致谢
131: 
132: 特别感谢 [Eko](https://github.com/FellouAI/eko) - 一个生产就绪的 Agent 框架，为本项目提供了 AI 能力支持。
133: 
134: ## 贡献
135: 
136: 请确保所有 API 密钥仅在开发环境文件中配置。永远不要将实际的 API 密钥提交到仓库中。
````

## File: server.js
````javascript
 1: "use strict";
 2: var __importDefault = (this && this.__importDefault) || function (mod) {
 3:     return (mod && mod.__esModule) ? mod : { "default": mod };
 4: };
 5: Object.defineProperty(exports, "__esModule", { value: true });
 6: const http_1 = require("http");
 7: const url_1 = require("url");
 8: const next_1 = __importDefault(require("next"));
 9: const path_1 = __importDefault(require("path"));
10: const port = process.env.PORT || 5173;
11: const app = (0, next_1.default)({ dev: false, dir: path_1.default.join(__dirname) });
12: const handle = app.getRequestHandler();
13: app.prepare().then(() => {
14:     (0, http_1.createServer)((req, res) => {
15:         const parsedUrl = (0, url_1.parse)(req.url, true);
16:         handle(req, res, parsedUrl);
17:     }).listen(port);
18:     console.log(`> Server listening at http://localhost:${port} as production`);
19: });
````

## File: server.ts
````typescript
 1: import { createServer } from 'http'
 2: import { parse } from 'url'
 3: import next from 'next'
 4: import path from 'path'
 5: 
 6: const port = process.env.PORT || 5173
 7: 
 8: const app = next({ dev: false, dir: path.join(__dirname) })
 9: const handle = app.getRequestHandler()
10:  
11: app.prepare().then(() => {
12:   createServer((req, res) => {
13:     const parsedUrl = parse(req.url!, true)
14:     handle(req, res, parsedUrl)
15:   }).listen(port)
16:  
17:   console.log(
18:       `> Server listening at http://localhost:${port} as production`
19:   )
20: })
````

## File: tsconfig.json
````json
 1: {
 2:   "compilerOptions": {
 3:     "baseUrl": ".",
 4:     "paths": {
 5:       "@/*": ["./src/*"]
 6:     },
 7:     "target": "es5",
 8:     "lib": [
 9:       "dom",
10:       "dom.iterable",
11:       "esnext"
12:     ],
13:     "allowJs": true,
14:     "skipLibCheck": true,
15:     "strict": false,
16:     "forceConsistentCasingInFileNames": true,
17:     "noEmit": true,
18:     "esModuleInterop": true,
19:     "module": "esnext",
20:     "moduleResolution": "node",
21:     "resolveJsonModule": true,
22:     "isolatedModules": true,
23:     "jsx": "preserve",
24:     "incremental": true,
25:     "plugins": [
26:       {
27:         "name": "next"
28:       }
29:     ],
30:     "strictNullChecks": true
31:   },
32:   "include": [
33:     "**/*.ts",
34:     "**/*.tsx",
35:     ".next/types/**/*.ts",
36:     "next-env.d.ts",
37:     "/Volumes/work/proj/next-test/types/**/*.ts"
38:   ],
39:   "exclude": [
40:     "node_modules",
41:     "electron"
42:   ]
43: }
````

## File: tsconfig.server.json
````json
 1: {
 2:     "compilerOptions": {
 3:       "module": "commonjs",
 4:       "outDir": "dist",
 5:       "lib": ["es2019"],
 6:       "target": "es2019",
 7:       "isolatedModules": false,
 8:       "noEmit": false,
 9:       "skipLibCheck": true,
10:       "noImplicitAny": false,
11:       "suppressImplicitAnyIndexErrors": false,
12:       "moduleResolution": "node",
13:       "esModuleInterop": true,
14:       "noEmitOnError": false
15:     },
16:     "include": ["server.ts"],
17:     "exclude": ["electron", "node_modules"]
18:   }
````
