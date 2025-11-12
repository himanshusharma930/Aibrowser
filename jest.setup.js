// Jest setup file for DOM testing
require('@testing-library/jest-dom');

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
