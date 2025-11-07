// Supported providers
export type ProviderType = 'deepseek' | 'qwen' | 'google' | 'anthropic' | 'openrouter' | 'custom';

// Model configuration types
export interface UserModelConfigs {
  deepseek?: {
    apiKey?: string
    baseURL?: string
    model?: string
  }
  qwen?: {
    apiKey?: string
    model?: string
  }
  google?: {
    apiKey?: string
    model?: string
  }
  anthropic?: {
    apiKey?: string
    model?: string
  }
  openrouter?: {
    apiKey?: string
    model?: string
  }
  custom?: {
    apiKey?: string
    baseURL?: string
    model?: string
  }
  selectedProvider?: ProviderType
}

// Agent configuration types
export interface AgentConfig {
  browserAgent: {
    enabled: boolean
    customPrompt: string
  }
  fileAgent: {
    enabled: boolean
    customPrompt: string
  }
  mcpTools: {
    [toolName: string]: {
      enabled: boolean
      config?: Record<string, any>
    }
  }
}

// MCP Tool types
export interface McpToolSchema {
  name: string
  description: string
  enabled: boolean
  inputSchema: {
    type: string
    properties: Record<string, any>
    required: string[]
  }
}

// Layout transformation types
export interface DetailViewBounds {
  x: number      // Horizontal offset from window left edge
  y: number      // Vertical offset from window top
  width: number  // Calculated from AI sidebar width
  height: number // Fixed height
}

export interface PanelLayoutState {
  browserPanelSize: number     // Percentage (40-85)
  aiSidebarSize: number        // Percentage (15-60)
  isCollapsed: boolean         // Sidebar collapsed state
  lastModified: number         // Timestamp for cache invalidation
}

// Layout mode types for progressive disclosure
export type LayoutMode = 'full-width' | 'split';

export interface LayoutTransitionConfig {
  duration: number;          // Animation duration in ms
  easing: string;           // CSS easing function
  showBrowserView: boolean; // Whether to show browser view
}

// Default configuration for layout transitions
export const DEFAULT_LAYOUT_TRANSITION: LayoutTransitionConfig = {
  duration: 300,
  easing: 'ease-in-out',
  showBrowserView: true
};

// Standard response types for consistent API handling
export interface StandardResponse<T = void> {
  success: boolean
  data?: T
  error?: string
}

export type SuccessResponse = StandardResponse<void>;

// Eko API specific types
export interface EkoTaskResult {
  success: boolean
  taskId: string
  message?: string
  error?: string
}

export interface EkoTaskStatus {
  taskId: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  progress?: number
  result?: any
  error?: string
}

export interface EkoStreamMessage {
  type: 'status' | 'progress' | 'result' | 'error'
  taskId: string
  data: any
  timestamp: number
}

// Provider-specific model configuration types
export interface ProviderModelConfig {
  apiKey?: string
  baseURL?: string
  model?: string
  enabled: boolean
}

// Namespaced API interfaces for better organization and maintainability
interface EkoAPI {
  run: (prompt: string) => Promise<EkoTaskResult>
  modify: (taskId: string, prompt: string) => Promise<EkoTaskResult>
  execute: (taskId: string) => Promise<EkoTaskResult>
  getTaskStatus: (taskId: string) => Promise<EkoTaskStatus>
  cancelTask: (taskId: string) => Promise<EkoTaskResult>
  onStreamMessage: (callback: (message: EkoStreamMessage) => void) => void
}

interface ViewAPI {
  setDetailViewVisible: (visible: boolean) => Promise<void>
  updateDetailViewBounds: (bounds: DetailViewBounds) => Promise<void>
  showViewWindow: () => Promise<void>
  hideViewWindow: () => Promise<void>
  getMainViewSize: () => Promise<{ width: number; height: number }>
  getMainViewScreenshot: () => Promise<{ imageBase64: string; imageType: "image/jpeg" | "image/png" }>
  getMainViewUrlAndTitle: () => Promise<{ url: string; title: string }>
  sendToMainViewExecuteCode: (func: string, args: any[]) => Promise<unknown>
  navigateTo: (url: string) => Promise<{ url: string; title: string }>
  getCurrentUrl: () => Promise<string>
  onUrlChange: (callback: (url: string) => void) => void
  getMainViewWindowNumber: () => Promise<number>
  captureWindow: (winNo: number, scale?: number) => Promise<{ width: number; height: number; stride: number; data: Buffer; error?: string }>
  captureWindowSync: (winNo: number, scale?: number) => { width: number; height: number; stride: number; data: Buffer; error?: string }
  requestCapturePermission: () => Promise<boolean>
  getHiddenWindowSourceId: () => Promise<string>
}

interface ConfigAPI {
  getUserModelConfigs: () => Promise<UserModelConfigs>
  saveUserModelConfigs: (configs: UserModelConfigs) => Promise<SuccessResponse>
  getModelConfig: (provider: ProviderType) => Promise<ProviderModelConfig>
  getApiKeySource: (provider: ProviderType) => Promise<'user' | 'env' | 'none'>
  getSelectedProvider: () => Promise<ProviderType>
  setSelectedProvider: (provider: ProviderType) => Promise<SuccessResponse>
  getEnvVar: (key: string) => Promise<string>
}

interface AgentAPI {
  getAgentConfig: () => Promise<StandardResponse<AgentConfig>>
  saveAgentConfig: (config: AgentConfig) => Promise<SuccessResponse>
  getMcpTools: () => Promise<StandardResponse<McpToolSchema[]>>
  setMcpToolEnabled: (toolName: string, enabled: boolean) => Promise<SuccessResponse>
  reloadAgentConfig: () => Promise<StandardResponse<AgentConfig>>
}

interface HistoryAPI {
  showHistoryView: (screenshotBase64: string) => Promise<void>
  hideHistoryView: () => Promise<void>
}

interface VoiceAPI {
  sendVoiceTextToChat: (text: string) => Promise<void>
  onVoiceTextReceived: (callback: (text: string) => void) => void
  sendTTSSubtitle: (text: string, isStart: boolean) => Promise<boolean>
  onTTSSubtitleReceived: (callback: (text: string, isStart: boolean) => void) => void
}

interface UtilityAPI {
  removeAllListeners: (channel: string) => void
  invoke: (channel: string, ...args: any[]) => Promise<any>
  onTaskExecutionComplete: (callback: (event: any) => void) => void
  onOpenHistoryPanel: (callback: (event: any) => void) => void
  onTaskAbortedBySystem: (callback: (event: any) => void) => void
}

declare global {
  interface Window {
    // New namespaced API structure
    api: {
      eko: EkoAPI
      view: ViewAPI
      config: ConfigAPI
      agent: AgentAPI
      history: HistoryAPI
      voice: VoiceAPI
      util: UtilityAPI

      // DEPRECATED: Legacy flat API for backward compatibility
      // These will be removed in a future version
      /** @deprecated Use api.view.sendToMainViewExecuteCode instead */
      sendToMainViewExecuteCode: (func: string, args: any[]) => Promise<any>
      /** @deprecated Use api.view.navigateTo instead */
      navigateTo: (url: string) => Promise<{ url: string; title: string }>
      /** @deprecated Use api.view.getMainViewSize instead */
      getMainViewSize: () => Promise<{ width: number; height: number }>
      /** @deprecated Use api.view.getMainViewScreenshot instead */
      getMainViewScreenshot: () => Promise<{ imageBase64: string; imageType: "image/jpeg" | "image/png" }>
      /** @deprecated Use api.view.getMainViewUrlAndTitle instead */
      getMainViewUrlAndTitle: () => Promise<{ url: string; title: string }>
      /** @deprecated Use api.view.getHiddenWindowSourceId instead */
      getHiddenWindowSourceId: () => Promise<string>
      /** @deprecated Use api.view.showViewWindow instead */
      showViewWindow: () => Promise<void>
      /** @deprecated Use api.view.hideViewWindow instead */
      hideViewWindow: () => Promise<void>
      /** @deprecated Use api.voice.sendVoiceTextToChat instead */
      sendVoiceTextToChat: (text: string) => Promise<void>
      /** @deprecated Use api.voice.onVoiceTextReceived instead */
      onVoiceTextReceived: (callback: (text: string) => void) => void
      /** @deprecated Use api.voice.sendTTSSubtitle instead */
      sendTTSSubtitle: (text: string, isStart: boolean) => Promise<boolean>
      /** @deprecated Use api.voice.onTTSSubtitleReceived instead */
      onTTSSubtitleReceived: (callback: (text: string, isStart: boolean) => void) => void
      /** @deprecated Use api.util.removeAllListeners instead */
      removeAllListeners: (channel: string) => void
      /** @deprecated Use api.view.getMainViewWindowNumber instead */
      getMainViewWindowNumber: () => Promise<number>
      /** @deprecated Use api.view.captureWindow instead */
      captureWindow: (winNo: number, scale?: number) => Promise<{ width: number; height: number; stride: number; data: Buffer; error?: string }>
      /** @deprecated Use api.view.captureWindowSync instead */
      captureWindowSync: (winNo: number, scale?: number) => { width: number; height: number; stride: number; data: Buffer; error?: string }
      /** @deprecated Use api.view.requestCapturePermission instead */
      requestCapturePermission: () => Promise<boolean>
      /** @deprecated Use api.eko.run instead */
      ekoRun: (prompt: string) => Promise<any>
      /** @deprecated Use api.eko.modify instead */
      ekoModify: (taskId: string, prompt: string) => Promise<any>
      /** @deprecated Use api.eko.execute instead */
      ekoExecute: (taskId: string) => Promise<any>
      /** @deprecated Use api.eko.onStreamMessage instead */
      onEkoStreamMessage: (callback: (message: any) => void) => void
      /** @deprecated Use api.eko.getTaskStatus instead */
      ekoGetTaskStatus: (taskId: string) => Promise<any>
      /** @deprecated Use api.eko.cancelTask instead */
      ekoCancelTask: (taskId: string) => Promise<any>
      /** @deprecated Use api.config.getUserModelConfigs instead */
      getUserModelConfigs: () => Promise<UserModelConfigs>
      /** @deprecated Use api.config.saveUserModelConfigs instead */
      saveUserModelConfigs: (configs: UserModelConfigs) => Promise<{ success: boolean }>
      /** @deprecated Use api.config.getModelConfig instead */
      getModelConfig: (provider: ProviderType) => Promise<any>
      /** @deprecated Use api.config.getApiKeySource instead */
      getApiKeySource: (provider: ProviderType) => Promise<'user' | 'env' | 'none'>
      /** @deprecated Use api.config.getSelectedProvider instead */
      getSelectedProvider: () => Promise<ProviderType>
      /** @deprecated Use api.config.setSelectedProvider instead */
      setSelectedProvider: (provider: ProviderType) => Promise<{ success: boolean }>
      /** @deprecated Use api.config.getEnvVar instead */
      getEnvVar: (key: string) => Promise<string>
      /** @deprecated Use api.agent.getAgentConfig instead */
      getAgentConfig: () => Promise<{ success: boolean; data: AgentConfig }>
      /** @deprecated Use api.agent.saveAgentConfig instead */
      saveAgentConfig: (config: AgentConfig) => Promise<{ success: boolean }>
      /** @deprecated Use api.agent.getMcpTools instead */
      getMcpTools: () => Promise<{ success: boolean; data: McpToolSchema[] }>
      /** @deprecated Use api.agent.setMcpToolEnabled instead */
      setMcpToolEnabled: (toolName: string, enabled: boolean) => Promise<{ success: boolean }>
      /** @deprecated Use api.agent.reloadAgentConfig instead */
      reloadAgentConfig: () => Promise<{ success: boolean; data: AgentConfig }>
      /** @deprecated Use api.view.setDetailViewVisible instead */
      setDetailViewVisible: (visible: boolean) => Promise<void>
      /** @deprecated Use api.view.updateDetailViewBounds instead */
      updateDetailViewBounds: (bounds: DetailViewBounds) => Promise<void>
      /** @deprecated Use api.history.showHistoryView instead */
      showHistoryView: (screenshotBase64: string) => Promise<void>
      /** @deprecated Use api.history.hideHistoryView instead */
      hideHistoryView: () => Promise<void>
      /** @deprecated Use api.view.getCurrentUrl instead */
      getCurrentUrl: () => Promise<string>
      /** @deprecated Use api.view.onUrlChange instead */
      onUrlChange: (callback: (url: string) => void) => void
      /** @deprecated Use api.util.invoke instead */
      invoke: (channel: string, ...args: any[]) => Promise<any>
      /** @deprecated Use api.util.onTaskExecutionComplete instead */
      onTaskExecutionComplete: (callback: (event: any) => void) => void
      /** @deprecated Use api.util.onOpenHistoryPanel instead */
      onOpenHistoryPanel: (callback: (event: any) => void) => void
      /** @deprecated Use api.util.onTaskAbortedBySystem instead */
      onTaskAbortedBySystem: (callback: (event: any) => void) => void
    }
    // PDF.js type declarations
    pdfjsLib?: {
      GlobalWorkerOptions: {
        workerSrc: string;
      };
      getDocument: (params: any) => {
        promise: Promise<{
          numPages: number;
          getPage: (pageNum: number) => Promise<{
            getTextContent: () => Promise<{
              items: Array<{ str: string; [key: string]: any }>;
            }>;
          }>;
        }>;
      };
    };
  }
}

export {} 