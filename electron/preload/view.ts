import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

console.log("view preload");

(function () {
  'use strict';

  // Save original methods before overriding them
  (globalThis as any).Element.prototype._addEventListener = (globalThis as any).Element.prototype.addEventListener;
  (globalThis as any).Element.prototype._removeEventListener = (globalThis as any).Element.prototype.removeEventListener;

  /**
   * Add event listener
   * @param {[type]}  type       [Event type, e.g.: click]
   * @param {[type]}  listener   [Execution function]
   * @param {Boolean} useCapture [Trigger type, true=event executes in capture phase, false=bubbling phase]
   * @param {string} notes Optional, note text for event description, useful for distinguishing same events/functions for different features
   */
  (globalThis as any).Element.prototype.addEventListener = function (type: any, listener: any, useCapture = false, notes?: any) {
      // Declare event listener
      this._addEventListener(type, listener, useCapture);

      if (!this.eventListenerList) this.eventListenerList = {};
      if (!this.eventListenerList[type]) this.eventListenerList[type] = [];

      // Add listener to event tracking list
      this.eventListenerList[type].push({ type, listener, useCapture, notes });
  };

  /**
   * Remove event listener
   * @param  {[type]}  type       [Event type, e.g.: click]
   * @param  {[type]}  listener   [Execution function]
   * @param  {Boolean} useCapture [Trigger type]
   * @return {[type]}             [description]
   */
  (globalThis as any).Element.prototype.removeEventListener = function (type: any, listener: any, useCapture = false) {
      // Remove listener

      this._removeEventListener(type, listener, useCapture);

      if (!this.eventListenerList) this.eventListenerList = {};
      if (!this.eventListenerList[type]) this.eventListenerList[type] = [];

      // Find event in the list, if listener registered twice (with and without capture), remove each one separately.

      for (let i = 0; i < this.eventListenerList[type].length; i++) {
          if (this.eventListenerList[type][i].listener === listener && this.eventListenerList[type][i].useCapture === useCapture) {
              this.eventListenerList[type].splice(i, 1);
              break;
          }
      }
      // If no more events of deleted event type remain, delete the group
      if (this.eventListenerList[type].length == 0) delete this.eventListenerList[type];
  };


  /**
   * [Get event listeners]
   * @param  {[type]} type [Event type]
   * @return {[type]}      [Return all events of target]
   */
  (globalThis as any).Element.prototype.getEventListeners = function (type?: any) {
      if (!this.eventListenerList) this.eventListenerList = {};

      // Return required listener type or all listeners
      if (type === undefined) return this.eventListenerList;
      return this.eventListenerList[type];
  };

})();


// Custom APIs for renderer
const api = {
  // App information
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
  getPlatform: () => ipcRenderer.invoke("get-platform"),

  // Window controls
  onNewTab: (callback: () => void) => ipcRenderer.on("new-tab", callback),
  onCloseTab: (callback: () => void) => ipcRenderer.on("close-tab", callback),
  onNavigateBack: (callback: () => void) =>
    ipcRenderer.on("navigate-back", callback),
  onNavigateForward: (callback: () => void) =>
    ipcRenderer.on("navigate-forward", callback),
  onReloadPage: (callback: () => void) =>
    ipcRenderer.on("reload-page", callback),
  onShowAbout: (callback: () => void) => ipcRenderer.on("show-about", callback),

  // Remove listeners
  removeAllListeners: (channel: string) =>
    ipcRenderer.removeAllListeners(channel),
  getHiddenWindowSourceId: () => ipcRenderer.invoke('get-hidden-window-source-id'),
  showViewWindow: () => ipcRenderer.invoke('show-view-window'),
  hideViewWindow: () => ipcRenderer.invoke('hide-view-window'),

    // Voice text transmission related APIs
    sendVoiceTextToChat: (text: string) => ipcRenderer.invoke('send-voice-text-to-chat', text),
    onVoiceTextReceived: (callback: (text: string) => void) => ipcRenderer.on('voice-text-received', (_, text) => callback(text)),

      // TTS subtitle related APIs
  sendTTSSubtitle: (text: string, isStart: boolean) => ipcRenderer.invoke('send-tts-subtitle', text, isStart),
  onTTSSubtitleReceived: (callback: (text: string, isStart: boolean) => void) => 
    ipcRenderer.on('tts-subtitle-received', (_, text, isStart) => callback(text, isStart)),
  getMainViewWindowNumber: () => ipcRenderer.invoke('get-main-view-window-number'),
  captureWindow: (winNo: number, scale = 1) => ipcRenderer.invoke('native:captureWindow', winNo, scale),
  captureWindowSync: (winNo: number, scale = 1) => ipcRenderer.sendSync('native:captureWindow:sync', winNo, scale),
  requestCapturePermission: () => ipcRenderer.invoke('native:requestCapturePermission'),
  onFileUpdated: (callback: (status: string, content: string) => void) => ipcRenderer.on('file-updated', (_, status, content) => callback(status, content)),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}

// ✅ SECURITY FIX: Replaced eval() with explicit function whitelist
// Define allowed functions that can be executed via IPC (type-safe)
const allowedViewFunctions: Record<string, (...args: any[]) => any | Promise<any>> = {
  // Navigation functions
  navigateTo: (url: string) => {
    window.location.href = url;
    return { success: true };
  },

  // DOM manipulation functions
  querySelector: (selector: string) => {
    const element = document.querySelector(selector);
    return element ? {
      tagName: element.tagName,
      id: element.id,
      className: element.className,
      textContent: element.textContent
    } : null;
  },

  click: (selector: string) => {
    const element = document.querySelector(selector);
    if (element instanceof HTMLElement) {
      element.click();
      return { success: true };
    }
    return { error: 'Element not found or not clickable' };
  },

  scrollTo: (x: number, y: number) => {
    window.scrollTo(x, y);
    return { success: true, x, y };
  },

  // Page info functions
  getPageInfo: () => ({
    title: document.title,
    url: window.location.href,
    scrollY: window.scrollY,
    scrollHeight: document.documentElement.scrollHeight
  }),

  // Add more allowed functions as needed
  // IMPORTANT: Only add functions that are safe and necessary
};

ipcRenderer.on("call-view-func", async (event, { payload, replyChannel }) => {
  const { funcName, args } = payload;

  // ✅ SECURITY: Validate function name against whitelist
  if (!allowedViewFunctions[funcName]) {
    const error = `Function "${funcName}" is not allowed. Available functions: ${Object.keys(allowedViewFunctions).join(', ')}`;
    console.error(error);
    ipcRenderer.send(replyChannel, { error });
    return;
  }

  let result;
  try {
    const func = allowedViewFunctions[funcName];
    result = await func(...args);
  } catch (e: any) {
    result = { error: e.message };
    console.error(`Error executing ${funcName}:`, e);
  }

  console.log("call-view-func result", funcName, result);
  ipcRenderer.send(replyChannel, result);
});