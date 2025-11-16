// Centralized IPC channel names for type safety and maintainability
// Single source of truth for all IPC communication channels

export const IPC_CHANNELS = {
  EKO: {
    RUN: 'eko:run',
    MODIFY: 'eko:modify',
    EXECUTE: 'eko:execute',
    GET_TASK_STATUS: 'eko:getTaskStatus',
    CANCEL_TASK: 'eko:cancel-task',
    STREAM_MESSAGE: 'eko-stream-message',
  },
  VIEW: {
    SET_DETAIL_VIEW_VISIBLE: 'set-detail-view-visible',
    UPDATE_DETAIL_VIEW_BOUNDS: 'update-detail-view-bounds',
    SHOW_VIEW_WINDOW: 'show-view-window',
    HIDE_VIEW_WINDOW: 'hide-view-window',
    GET_MAIN_VIEW_SIZE: 'get-main-view-size',
    GET_MAIN_VIEW_SCREENSHOT: 'get-main-view-screenshot',
    GET_MAIN_VIEW_URL_AND_TITLE: 'get-main-view-url-and-title',
    SEND_TO_MAIN_VIEW_EXECUTE_CODE: 'send-to-main-view-execute-code',
    NAVIGATE_TO: 'navigate-to',
    GET_CURRENT_URL: 'get-current-url',
    URL_CHANGED: 'url-changed',
    GET_MAIN_VIEW_WINDOW_NUMBER: 'get-main-view-window-number',
    CAPTURE_WINDOW: 'capture-window',
    CAPTURE_WINDOW_SYNC: 'capture-window-sync',
    REQUEST_CAPTURE_PERMISSION: 'request-capture-permission',
    GET_HIDDEN_WINDOW_SOURCE_ID: 'get-hidden-window-source-id',
    GO_BACK: 'view:go-back',
    GO_FORWARD: 'view:go-forward',
    RELOAD: 'view:reload',
    GET_NAVIGATION_STATE: 'view:get-navigation-state',
  },
  CONFIG: {
    GET_USER_CONFIGS: 'config:get-user-configs',
    SAVE_USER_CONFIGS: 'config:save-user-configs',
    GET_MODEL_CONFIG: 'config:get-model-config',
    GET_API_KEY_SOURCE: 'config:get-api-key-source',
    GET_SELECTED_PROVIDER: 'config:get-selected-provider',
    SET_SELECTED_PROVIDER: 'config:set-selected-provider',
    GET_ENV_VAR: 'config:get-env-var',
    GET_LANGUAGE: 'config:get-language',
    LANGUAGE_CHANGED: 'language-changed',
  },
  AGENT: {
    GET_CONFIG: 'agent:get-config',
    SAVE_CONFIG: 'agent:save-config',
    GET_MCP_TOOLS: 'agent:get-mcp-tools',
    SET_MCP_TOOL_ENABLED: 'agent:set-mcp-tool-enabled',
    RELOAD_CONFIG: 'agent:reload-config',
  },
  HISTORY: {
    SHOW_HISTORY_VIEW: 'show-history-view',
    HIDE_HISTORY_VIEW: 'hide-history-view',
  },
  VOICE: {
    SEND_VOICE_TEXT_TO_CHAT: 'send-voice-text-to-chat',
    VOICE_TEXT_RECEIVED: 'voice-text-received',
  },
  UTIL: {
    TASK_EXECUTION_COMPLETE: 'task-execution-complete',
    OPEN_HISTORY_PANEL: 'open-history-panel',
    TASK_ABORTED_BY_SYSTEM: 'task-aborted-by-system',
  },
  APP: {
    GET_APP_VERSION: 'get-app-version',
    GET_PLATFORM: 'get-platform',
  },
  WINDOW: {
    NEW_TAB: 'new-tab',
    CLOSE_TAB: 'close-tab',
    NAVIGATE_BACK: 'navigate-back',
    NAVIGATE_FORWARD: 'navigate-forward',
    RELOAD_PAGE: 'reload-page',
    SHOW_ABOUT: 'show-about',
  },
} as const;

// Type helper for channel names - provides compile-time validation
export type IpcChannelName = typeof IPC_CHANNELS[keyof typeof IPC_CHANNELS][keyof typeof IPC_CHANNELS[keyof typeof IPC_CHANNELS]];
