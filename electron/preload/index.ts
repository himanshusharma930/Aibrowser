import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IPC_CHANNELS } from '../constants/ipc-channels'
import type { UserModelConfigs, AgentConfig } from '../../src/type'

// Helper function to create deprecated API proxy with runtime warnings
function createDeprecatedAPIProxy<T extends Record<string, any>>(
  api: any,
  mappings: Record<keyof T, { namespace: string; method: string }>
): T {
  const proxy = {} as T;
  const isDevelopment = process.env.NODE_ENV === 'development';

  for (const [deprecatedKey, config] of Object.entries(mappings)) {
    const { namespace, method } = config as { namespace: string; method: string };

    proxy[deprecatedKey as keyof T] = ((...args: any[]) => {
      if (isDevelopment) {
        console.warn(
          `[DEPRECATED] api.${deprecatedKey} is deprecated. Use api.${namespace}.${method} instead.`
        );
      }
      return api[namespace][method](...args);
    }) as any;
  }

  return proxy;
}

// Custom APIs for renderer - now with namespaced structure
const api = {
  // Namespaced APIs for better organization
  eko: {
    run: (message: string) => ipcRenderer.invoke(IPC_CHANNELS.EKO.RUN, message),
    modify: (taskId: string, message: string) => ipcRenderer.invoke(IPC_CHANNELS.EKO.MODIFY, taskId, message),
    execute: (taskId: string) => ipcRenderer.invoke(IPC_CHANNELS.EKO.EXECUTE, taskId),
    getTaskStatus: (taskId: string) => ipcRenderer.invoke(IPC_CHANNELS.EKO.GET_TASK_STATUS, taskId),
    cancelTask: (taskId: string) => ipcRenderer.invoke(IPC_CHANNELS.EKO.CANCEL_TASK, taskId),
    onStreamMessage: (callback: (message: any) => void) => ipcRenderer.on(IPC_CHANNELS.EKO.STREAM_MESSAGE, (_, message) => callback(message)),
  },

  view: {
    setDetailViewVisible: (visible: boolean) => ipcRenderer.invoke(IPC_CHANNELS.VIEW.SET_DETAIL_VIEW_VISIBLE, visible),
    updateDetailViewBounds: (bounds: { x: number; y: number; width: number; height: number }) =>
      ipcRenderer.invoke(IPC_CHANNELS.VIEW.UPDATE_DETAIL_VIEW_BOUNDS, bounds),
    showViewWindow: () => ipcRenderer.invoke(IPC_CHANNELS.VIEW.SHOW_VIEW_WINDOW),
    hideViewWindow: () => ipcRenderer.invoke(IPC_CHANNELS.VIEW.HIDE_VIEW_WINDOW),
    getMainViewSize: () => ipcRenderer.invoke(IPC_CHANNELS.VIEW.GET_MAIN_VIEW_SIZE),
    getMainViewScreenshot: () => ipcRenderer.invoke(IPC_CHANNELS.VIEW.GET_MAIN_VIEW_SCREENSHOT),
    getMainViewUrlAndTitle: () => ipcRenderer.invoke(IPC_CHANNELS.VIEW.GET_MAIN_VIEW_URL_AND_TITLE),
    sendToMainViewExecuteCode: (func: string, args: any[]) => ipcRenderer.invoke(IPC_CHANNELS.VIEW.SEND_TO_MAIN_VIEW_EXECUTE_CODE, func, args),
    navigateTo: (url: string) => ipcRenderer.invoke(IPC_CHANNELS.VIEW.NAVIGATE_TO, url),
    getCurrentUrl: () => ipcRenderer.invoke(IPC_CHANNELS.VIEW.GET_CURRENT_URL),
    onUrlChange: (callback: (url: string) => void) => ipcRenderer.on(IPC_CHANNELS.VIEW.URL_CHANGED, (_, url) => callback(url)),
    getMainViewWindowNumber: () => ipcRenderer.invoke(IPC_CHANNELS.VIEW.GET_MAIN_VIEW_WINDOW_NUMBER),
    captureWindow: (winNo: number, scale?: number) => ipcRenderer.invoke(IPC_CHANNELS.VIEW.CAPTURE_WINDOW, winNo, scale),
    captureWindowSync: (winNo: number, scale?: number) => ipcRenderer.sendSync(IPC_CHANNELS.VIEW.CAPTURE_WINDOW_SYNC, winNo, scale),
    requestCapturePermission: () => ipcRenderer.invoke(IPC_CHANNELS.VIEW.REQUEST_CAPTURE_PERMISSION),
    getHiddenWindowSourceId: () => ipcRenderer.invoke(IPC_CHANNELS.VIEW.GET_HIDDEN_WINDOW_SOURCE_ID),
  },

  config: {
    getUserModelConfigs: () => ipcRenderer.invoke(IPC_CHANNELS.CONFIG.GET_USER_CONFIGS),
    saveUserModelConfigs: (configs: UserModelConfigs) => ipcRenderer.invoke(IPC_CHANNELS.CONFIG.SAVE_USER_CONFIGS, configs),
    getModelConfig: (provider: 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter' | 'custom') => ipcRenderer.invoke(IPC_CHANNELS.CONFIG.GET_MODEL_CONFIG, provider),
    getApiKeySource: (provider: 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter' | 'custom') => ipcRenderer.invoke(IPC_CHANNELS.CONFIG.GET_API_KEY_SOURCE, provider),
    getSelectedProvider: () => ipcRenderer.invoke(IPC_CHANNELS.CONFIG.GET_SELECTED_PROVIDER),
    setSelectedProvider: (provider: 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter' | 'custom') => ipcRenderer.invoke(IPC_CHANNELS.CONFIG.SET_SELECTED_PROVIDER, provider),
    getEnvVar: (key: string) => ipcRenderer.invoke(IPC_CHANNELS.CONFIG.GET_ENV_VAR, key),
  },

  agent: {
    getAgentConfig: () => ipcRenderer.invoke(IPC_CHANNELS.AGENT.GET_CONFIG),
    saveAgentConfig: (config: AgentConfig) => ipcRenderer.invoke(IPC_CHANNELS.AGENT.SAVE_CONFIG, config),
    getMcpTools: () => ipcRenderer.invoke(IPC_CHANNELS.AGENT.GET_MCP_TOOLS),
    setMcpToolEnabled: (toolName: string, enabled: boolean) => ipcRenderer.invoke(IPC_CHANNELS.AGENT.SET_MCP_TOOL_ENABLED, toolName, enabled),
    reloadAgentConfig: () => ipcRenderer.invoke(IPC_CHANNELS.AGENT.RELOAD_CONFIG),
  },

  history: {
    showHistoryView: (screenshot: string) => ipcRenderer.invoke(IPC_CHANNELS.HISTORY.SHOW_HISTORY_VIEW, screenshot),
    hideHistoryView: () => ipcRenderer.invoke(IPC_CHANNELS.HISTORY.HIDE_HISTORY_VIEW),
  },

  voice: {
    sendVoiceTextToChat: (text: string) => ipcRenderer.invoke(IPC_CHANNELS.VOICE.SEND_VOICE_TEXT_TO_CHAT, text),
    onVoiceTextReceived: (callback: (text: string) => void) => ipcRenderer.on(IPC_CHANNELS.VOICE.VOICE_TEXT_RECEIVED, (_, text) => callback(text)),
    sendTTSSubtitle: (text: string, isStart: boolean) => ipcRenderer.invoke(IPC_CHANNELS.VOICE.SEND_TTS_SUBTITLE, text, isStart),
    onTTSSubtitleReceived: (callback: (text: string, isStart: boolean) => void) =>
      ipcRenderer.on(IPC_CHANNELS.VOICE.TTS_SUBTITLE_RECEIVED, (_, text, isStart) => callback(text, isStart)),
  },

  util: {
    removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel),
    invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
    onTaskExecutionComplete: (callback: (event: any) => void) =>
      ipcRenderer.on(IPC_CHANNELS.UTIL.TASK_EXECUTION_COMPLETE, (_, event) => callback(event)),
    onOpenHistoryPanel: (callback: (event: any) => void) =>
      ipcRenderer.on(IPC_CHANNELS.UTIL.OPEN_HISTORY_PANEL, (_, event) => callback(event)),
    onTaskAbortedBySystem: (callback: (event: any) => void) =>
      ipcRenderer.on(IPC_CHANNELS.UTIL.TASK_ABORTED_BY_SYSTEM, (_, event) => callback(event)),
  },

  // App information (not part of namespaces)
  getAppVersion: () => ipcRenderer.invoke(IPC_CHANNELS.APP.GET_APP_VERSION),
  getPlatform: () => ipcRenderer.invoke(IPC_CHANNELS.APP.GET_PLATFORM),

  // Window controls (not part of namespaces)
  onNewTab: (callback: () => void) => ipcRenderer.on(IPC_CHANNELS.WINDOW.NEW_TAB, callback),
  onCloseTab: (callback: () => void) => ipcRenderer.on(IPC_CHANNELS.WINDOW.CLOSE_TAB, callback),
  onNavigateBack: (callback: () => void) => ipcRenderer.on(IPC_CHANNELS.WINDOW.NAVIGATE_BACK, callback),
  onNavigateForward: (callback: () => void) => ipcRenderer.on(IPC_CHANNELS.WINDOW.NAVIGATE_FORWARD, callback),
  onReloadPage: (callback: () => void) => ipcRenderer.on(IPC_CHANNELS.WINDOW.RELOAD_PAGE, callback),
  onShowAbout: (callback: () => void) => ipcRenderer.on(IPC_CHANNELS.WINDOW.SHOW_ABOUT, callback),
}

// DEPRECATED: Legacy flat API for backward compatibility (will be removed in v1.0.0)
// Generated dynamically from namespaced API with runtime deprecation warnings
const deprecatedApiMappings = {
  sendToMainViewExecuteCode: { namespace: 'view', method: 'sendToMainViewExecuteCode' },
  navigateTo: { namespace: 'view', method: 'navigateTo' },
  getMainViewSize: { namespace: 'view', method: 'getMainViewSize' },
  getMainViewScreenshot: { namespace: 'view', method: 'getMainViewScreenshot' },
  getMainViewUrlAndTitle: { namespace: 'view', method: 'getMainViewUrlAndTitle' },
  getHiddenWindowSourceId: { namespace: 'view', method: 'getHiddenWindowSourceId' },
  showViewWindow: { namespace: 'view', method: 'showViewWindow' },
  hideViewWindow: { namespace: 'view', method: 'hideViewWindow' },
  sendVoiceTextToChat: { namespace: 'voice', method: 'sendVoiceTextToChat' },
  onVoiceTextReceived: { namespace: 'voice', method: 'onVoiceTextReceived' },
  sendTTSSubtitle: { namespace: 'voice', method: 'sendTTSSubtitle' },
  onTTSSubtitleReceived: { namespace: 'voice', method: 'onTTSSubtitleReceived' },
  removeAllListeners: { namespace: 'util', method: 'removeAllListeners' },
  getMainViewWindowNumber: { namespace: 'view', method: 'getMainViewWindowNumber' },
  captureWindow: { namespace: 'view', method: 'captureWindow' },
  captureWindowSync: { namespace: 'view', method: 'captureWindowSync' },
  requestCapturePermission: { namespace: 'view', method: 'requestCapturePermission' },
  ekoRun: { namespace: 'eko', method: 'run' },
  ekoModify: { namespace: 'eko', method: 'modify' },
  ekoExecute: { namespace: 'eko', method: 'execute' },
  onEkoStreamMessage: { namespace: 'eko', method: 'onStreamMessage' },
  ekoGetTaskStatus: { namespace: 'eko', method: 'getTaskStatus' },
  ekoCancelTask: { namespace: 'eko', method: 'cancelTask' },
  getUserModelConfigs: { namespace: 'config', method: 'getUserModelConfigs' },
  saveUserModelConfigs: { namespace: 'config', method: 'saveUserModelConfigs' },
  getModelConfig: { namespace: 'config', method: 'getModelConfig' },
  getApiKeySource: { namespace: 'config', method: 'getApiKeySource' },
  getSelectedProvider: { namespace: 'config', method: 'getSelectedProvider' },
  setSelectedProvider: { namespace: 'config', method: 'setSelectedProvider' },
  getEnvVar: { namespace: 'config', method: 'getEnvVar' },
  getAgentConfig: { namespace: 'agent', method: 'getAgentConfig' },
  saveAgentConfig: { namespace: 'agent', method: 'saveAgentConfig' },
  getMcpTools: { namespace: 'agent', method: 'getMcpTools' },
  setMcpToolEnabled: { namespace: 'agent', method: 'setMcpToolEnabled' },
  reloadAgentConfig: { namespace: 'agent', method: 'reloadAgentConfig' },
  setDetailViewVisible: { namespace: 'view', method: 'setDetailViewVisible' },
  updateDetailViewBounds: { namespace: 'view', method: 'updateDetailViewBounds' },
  showHistoryView: { namespace: 'history', method: 'showHistoryView' },
  hideHistoryView: { namespace: 'history', method: 'hideHistoryView' },
  getCurrentUrl: { namespace: 'view', method: 'getCurrentUrl' },
  onUrlChange: { namespace: 'view', method: 'onUrlChange' },
  invoke: { namespace: 'util', method: 'invoke' },
  onTaskExecutionComplete: { namespace: 'util', method: 'onTaskExecutionComplete' },
  onOpenHistoryPanel: { namespace: 'util', method: 'onOpenHistoryPanel' },
  onTaskAbortedBySystem: { namespace: 'util', method: 'onTaskAbortedBySystem' },
}

// Extend api object with deprecated methods using factory pattern
Object.assign(api, createDeprecatedAPIProxy(api, deprecatedApiMappings))

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
} 
