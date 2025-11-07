# Product Overview

**Manus Electron** (formerly AI Browser) is an AI-powered intelligent desktop browser built with Next.js and Electron. It enables multi-modal AI task execution with automated browser operations, scheduled tasks, and advanced file management capabilities.

## Core Features

- **AI-Powered Browser**: Intelligent browser with automated task execution using multiple AI providers
- **Multi-Modal AI**: Vision and text processing capabilities for complex tasks
- **Scheduled Tasks**: Create and manage automated recurring tasks with custom intervals
- **Agent Configuration**: Customize AI agent behavior with custom prompts and MCP tools
- **Speech & TTS**: Voice recognition and text-to-speech integration
- **File Management**: Advanced file operations and management
- **Multi-Provider Support**: DeepSeek, Qwen, Google Gemini, Anthropic Claude, OpenRouter

## Target Use Cases

- Automated web browsing and data extraction
- Scheduled content monitoring and processing
- AI-assisted file operations and management
- Voice-controlled task execution
- Multi-modal content analysis and processing

## Architecture

Hybrid desktop application combining:
- **Frontend**: Next.js web interface for user interaction
- **Desktop Shell**: Electron for native desktop integration and browser automation
- **AI Engine**: @jarvis-agent framework (based on Eko) for task execution
- **Task Management**: Built-in scheduler for automated recurring tasks

### Initialization Sequence
1. Electron app ready event
2. **IPC handlers registered** (before window creation)
3. Protocol registration
4. Window creation and Next.js server startup
5. **Browser view positioned** (LEFT side, 75% width, full height, visible by default)
6. Renderer process initialization

This early IPC registration ensures all communication channels are ready before any renderer process attempts to communicate with the main process.

### Browser View Architecture (Updated November 7, 2025)
- **Position**: LEFT side of window (x: 0, y: 0)
- **Size**: 75% of window width, full window height (edge-to-edge)
- **Visibility**: Hidden by default, shows after first message (preserves original UX)
- **Purpose**: Browser automation area positioned for future browser-first layout
- **Coordination**: AI Sidebar occupies remaining 25% on RIGHT side