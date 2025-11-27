// Jest setup file for DOM testing
require('@testing-library/jest-dom');

// Mock electron BEFORE any other imports
jest.mock('electron', () => ({
  app: {
    getPath: jest.fn((name) => {
      switch (name) {
        case 'userData':
          return '/tmp/test/userData';
        case 'temp':
          return '/tmp/test/temp';
        default:
          return `/tmp/test/${name}`;
      }
    }),
    isPackaged: false,
    getName: jest.fn().mockReturnValue('TestApp'),
    getVersion: jest.fn().mockReturnValue('1.0.0'),
  },
  ipcMain: {
    on: jest.fn(),
    handle: jest.fn(),
    removeHandler: jest.fn(),
    _events: {},
  },
  ipcRenderer: {
    invoke: jest.fn(),
    on: jest.fn(),
    removeAllListeners: jest.fn(),
  },
  BrowserWindow: {
    getAllWindows: jest.fn(() => [{
      webContents: {
        send: jest.fn(),
      },
    }]),
  },
  dialog: {
    showMessageBox: jest.fn(),
    showOpenDialog: jest.fn(),
    showSaveDialog: jest.fn(),
  },
  shell: {
    openExternal: jest.fn(),
  },
}));

// Mock window.api for Electron IPC
global.window = global.window || {};
global.window.api = {
  view: {
    navigateTo: jest.fn().mockResolvedValue({ success: true }),
    goBack: jest.fn().mockResolvedValue({ success: true }),
    goForward: jest.fn().mockResolvedValue({ success: true }),
    reload: jest.fn().mockResolvedValue({ success: true }),
    getCurrentUrl: jest.fn().mockResolvedValue('https://example.com'),
    getNavigationState: jest.fn().mockResolvedValue({ canGoBack: false, canGoForward: false }),
    setDetailViewVisible: jest.fn().mockResolvedValue({ success: true }),
  },
  updateDetailViewBounds: jest.fn().mockResolvedValue({ success: true }),
  setDetailViewVisible: jest.fn().mockResolvedValue({ success: true }),
  onUrlChange: jest.fn().mockReturnValue(() => {}),
  removeAllListeners: jest.fn(),
};

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb) => {
  return setTimeout(cb, 0);
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
