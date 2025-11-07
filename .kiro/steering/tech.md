# Technology Stack

## Core Technologies

- **Frontend Framework**: Next.js 15 + React 19
- **Desktop Framework**: Electron 33
- **Build System**: Vite + TypeScript 5
- **Package Manager**: pnpm (required - see packageManager field)
- **Node Version**: 20.19.3 (specified in docs)

## UI & Styling

- **UI Library**: Ant Design 5.x + Tailwind CSS 4
- **State Management**: Zustand
- **Internationalization**: i18next + react-i18next
- **Icons**: Ant Design Icons + React Icons
- **Animations**: Framer Motion + React Spring

## AI & Agent Framework

- **AI Agent Core**: @jarvis-agent/core + @jarvis-agent/electron
- **Supported Providers**: DeepSeek, Qwen, Google Gemini, Anthropic Claude, OpenRouter
- **Custom Provider**: zhipu-ai-provider

## Storage & Data

- **Desktop Storage**: electron-store (IndexedDB-like)
- **Task Storage**: Custom IndexedDB implementation
- **Configuration**: Electron store + environment variables

## Audio & Speech

- **Speech Recognition**: vosk-browser + Microsoft Cognitive Services
- **Text-to-Speech**: Microsoft Cognitive Services Speech SDK

## Development Tools

- **Linting**: ESLint 9 + Next.js ESLint config
- **Testing**: Jest + ts-jest
- **Process Management**: concurrently + nodemon
- **Development**: Hot reload with electron-reload

## Common Commands

### Development
```bash
# Install dependencies
pnpm install

# Start development (web + electron)
pnpm run dev

# Start development on Windows
pnpm run dev:win

# Start only web server
pnpm run next

# Start only electron (requires built deps)
pnpm run electron
```

### Building
```bash
# Build dependencies for macOS
pnpm run build:deps

# Build dependencies for Windows
pnpm run build:deps:win

# Build Next.js only
pnpm run build:next

# Full build for macOS
pnpm run build

# Full build for Windows
pnpm run build:win
```

### Testing
```bash
# Run tests
pnpm run test

# Test speech recognition
pnpm run test:speech
```

## Build Configuration

- **Electron Builder**: Cross-platform desktop app packaging
- **Target Platforms**: macOS (universal), Windows (NSIS), Linux (AppImage, deb)
- **Auto-updater**: GitHub releases integration
- **Code Signing**: Configured for macOS (requires certificates)

## Environment Configuration

- **Development**: Uses Next.js dev server on port 5173
- **Production**: Embedded Next.js server in Electron
- **API Keys**: Configured via .env.local (dev) and .env.production (build)
- **Protocols**: Custom 'client://' protocol for internal communication