# Project Structure

## Root Level Organization

```
├── src/                    # Next.js frontend application
├── electron/               # Electron main/preload/renderer processes
├── docs/                   # Documentation and screenshots
├── assets/                 # Static assets (icons, entitlements)
├── public/                 # Public web assets
├── .claude/                # Claude AI configuration and specs
├── .kiro/                  # Kiro steering rules (this folder)
└── dist/                   # Build output directory
```

## Frontend Structure (`src/`)

### Core Directories
- **`components/`** - Reusable React components
  - `chat/` - Chat and messaging components
  - `fellou/` - Fellou AI-specific components
  - `scheduled-task/` - Task scheduling components
- **`pages/`** - Next.js pages and API routes
  - `api/` - Backend API endpoints
  - `mcp-management/` - MCP (Model Context Protocol) management
- **`hooks/`** - Custom React hooks
- **`stores/`** - Zustand state management stores
- **`lib/`** - Utility libraries and services
- **`models/`** - TypeScript type definitions
- **`locales/`** - Internationalization files (en-US, zh-CN)
- **`styles/`** - Global CSS and styling

### Key Files
- **`pages/_app.tsx`** - Next.js app wrapper with theme and i18n
- **`pages/main.tsx`** - Main application interface
- **`lib/i18n.ts`** - Internationalization configuration
- **`config/themeConfig.ts`** - Ant Design theme configuration

## Electron Structure (`electron/`)

### Process Organization
- **`main/`** - Main Electron process
  - `services/` - Core services (EkoService, ServerManager, etc.)
  - `windows/` - Window management
  - `ipc/` - Inter-process communication handlers
  - `utils/` - Utilities and helpers
- **`preload/`** - Preload scripts for renderer security
- **`renderer/`** - Renderer-specific assets

### Key Services
- **`services/eko-service.ts`** - AI agent task execution
- **`services/server-manager.ts`** - Next.js server management
- **`services/task-scheduler.ts`** - Scheduled task execution
- **`services/window-context-manager.ts`** - Multi-window state management

## Configuration Files

### Build & Development
- **`package.json`** - Dependencies and scripts
- **`electron-builder.yml`** - Desktop app packaging config
- **`next.config.js`** - Next.js configuration
- **`tsconfig.json`** - TypeScript configuration
- **`pnpm-workspace.yaml`** - Monorepo workspace config

### Environment & Styling
- **`.env.template`** - Environment variable template
- **`postcss.config.mjs`** - PostCSS with Tailwind CSS
- **`src/styles/globals.css`** - Global styles with CSS variables

## Documentation (`docs/`)

- **`eko-docs/`** - Eko framework documentation
- **`shotscreen/`** - Application screenshots
- Language-specific README files

## Asset Organization

### Icons & Images (`assets/`)
- **`icons/`** - Application icons for different platforms
- **`entitlements.mac.plist`** - macOS security entitlements

### Public Assets (`public/`)
- **`models/`** - Speech recognition models
- **`videos/`** - Demo videos
- **`static/`** - Static text files

## AI Configuration (`.claude/`)

- **`agents/`** - AI agent specifications
- **`specs/`** - Feature specifications and designs
- **`system-prompts/`** - AI system prompts
- **`zen-mcp-server/`** - MCP server implementation

## Naming Conventions

### Files
- **Components**: PascalCase (`Header.tsx`, `MessageList.tsx`)
- **Pages**: kebab-case (`agent-config.tsx`, `file-view.tsx`)
- **Utilities**: camelCase (`messageTransform.ts`, `taskStorage.ts`)
- **Types**: camelCase with `.ts` extension (`task.ts`, `message.ts`)

### Directories
- **Components**: kebab-case (`scheduled-task/`, `chat/`)
- **Services**: kebab-case (`task-scheduler.ts`)
- **Utilities**: camelCase (`utils/`, `lib/`)

## Import Patterns

### Path Aliases
- **`@/*`** - Maps to `src/*` for clean imports
- **Absolute imports** preferred over relative imports
- **Barrel exports** used in model directories (`src/models/index.ts`)

### Component Organization
- **One component per file** with default export
- **Related components** grouped in subdirectories
- **Shared utilities** in `lib/` directory
- **Type definitions** co-located with related code