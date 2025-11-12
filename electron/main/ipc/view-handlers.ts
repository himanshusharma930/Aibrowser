import { ipcMain } from "electron";
import { windowContextManager } from "../services/window-context-manager";

/**
 * Validate and adjust detail view bounds to ensure they're within window constraints
 * Requirements 4.1, 4.2, 8.3, 8.4, 8.5: Validate bounds before applying to WebContentsView
 * @param bounds - Bounds to validate
 * @param windowWidth - Current window width for validation
 * @param windowHeight - Current window height for validation
 * @returns Validated and adjusted bounds
 */
function validateBoundsInMain(
  bounds: { x: number; y: number; width: number; height: number },
  windowWidth: number,
  windowHeight: number
): { x: number; y: number; width: number; height: number } {
  const originalBounds = { ...bounds };
  let adjusted = false;

  // Ensure non-negative values
  if (bounds.x < 0) {
    bounds.x = 0;
    adjusted = true;
  }
  if (bounds.y < 0) {
    bounds.y = 0;
    adjusted = true;
  }
  if (bounds.width < 0) {
    bounds.width = 100;
    adjusted = true;
  }
  if (bounds.height < 0) {
    bounds.height = 100;
    adjusted = true;
  }

  // Requirement 8.3, 8.4: Ensure minimum dimensions (100px width/height)
  if (bounds.width < 100) {
    bounds.width = 100;
    adjusted = true;
  }
  if (bounds.height < 100) {
    bounds.height = 100;
    adjusted = true;
  }

  // Requirement 8.5: Ensure bounds don't exceed window dimensions
  if (bounds.x + bounds.width > windowWidth) {
    bounds.width = Math.max(100, windowWidth - bounds.x);
    adjusted = true;
  }
  if (bounds.y + bounds.height > windowHeight) {
    bounds.height = Math.max(100, windowHeight - bounds.y);
    adjusted = true;
  }

  // Ensure bounds fit within window
  if (bounds.x >= windowWidth) {
    bounds.x = Math.max(0, windowWidth - bounds.width);
    adjusted = true;
  }
  if (bounds.y >= windowHeight) {
    bounds.y = Math.max(0, windowHeight - bounds.height);
    adjusted = true;
  }

  // Requirement 8.5: Log warnings for adjusted bounds
  if (adjusted) {
    console.warn('[BrowserViewBounds] Bounds adjusted to fit within window:', {
      original: originalBounds,
      adjusted: bounds,
      window: { width: windowWidth, height: windowHeight }
    });
  }

  return bounds;
}

/**
 * Register all view control related IPC handlers
 * Handles screenshot, visibility control, and URL operations
 * All handlers support window isolation through windowContextManager
 */
export function registerViewHandlers() {
  // Get main view screenshot
  ipcMain.handle('get-main-view-screenshot', async (event) => {
    const context = windowContextManager.getContext(event.sender.id);
    if (!context || !context.detailView) {
      throw new Error('DetailView not found for this window');
    }

    const image = await context.detailView.webContents.capturePage();
    return {
      imageBase64: image.toDataURL(),
      imageType: "image/jpeg",
    };
  });

  // Set detail view visibility
  ipcMain.handle('set-detail-view-visible', async (event, visible: boolean) => {
    try {
      console.log('IPC set-detail-view-visible received:', visible);
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.detailView) {
        throw new Error('DetailView not found for this window');
      }

      context.detailView.setVisible(visible);

      return { success: true, visible };
    } catch (error: any) {
      console.error('IPC set-detail-view-visible error:', error);
      throw error;
    }
  });

  // Get current URL from detail view
  ipcMain.handle('get-current-url', async (event) => {
    try {
      console.log('IPC get-current-url received');
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.detailView) {
        return '';
      }
      return context.detailView.webContents.getURL();
    } catch (error: any) {
      console.error('IPC get-current-url error:', error);
      return '';
    }
  });

  // Update detail view bounds for resizable panel coordination
  ipcMain.handle('update-detail-view-bounds', async (event, bounds: { x: number; y: number; width: number; height: number }) => {
    try {
      console.log('IPC update-detail-view-bounds received:', bounds);
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.detailView || !context.window) {
        console.warn('DetailView not found for bounds update');
        return { success: false, error: 'DetailView not found' };
      }

      // Get window dimensions for validation
      const windowBounds = context.window.getBounds();
      
      // Validate bounds comprehensively (Requirements 4.1, 4.2, 8.3, 8.4, 8.5)
      // This ensures:
      // - Minimum dimensions (100px width/height)
      // - Bounds don't exceed window dimensions
      // - Non-negative values
      // - Logs warnings for adjusted bounds
      const validatedBounds = validateBoundsInMain(bounds, windowBounds.width, windowBounds.height);

      context.detailView.setBounds(validatedBounds);
      console.log('DetailView bounds updated:', validatedBounds);

      return { success: true, bounds: validatedBounds };
    } catch (error: any) {
      console.error('IPC update-detail-view-bounds error:', error);
      return { success: false, error: error.message };
    }
  });

  // Navigate to URL
  ipcMain.handle('navigate-to', async (event, url: string) => {
    try {
      console.log('IPC navigate-to received:', url);
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.detailView) {
        throw new Error('DetailView not found for this window');
      }

      await context.detailView.webContents.loadURL(url);
      return { success: true };
    } catch (error: any) {
      console.error('IPC navigate-to error:', error);
      // Return error object instead of throwing to allow graceful handling in renderer
      return { success: false, error: error.message || 'Navigation failed' };
    }
  });

  // Go back
  ipcMain.handle('view:go-back', async (event) => {
    try {
      console.log('IPC view:go-back received');
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.detailView) {
        throw new Error('DetailView not found for this window');
      }

      if (context.detailView.webContents.canGoBack()) {
        context.detailView.webContents.goBack();
        return { success: true };
      }
      return { success: false, error: 'Cannot go back' };
    } catch (error: any) {
      console.error('IPC view:go-back error:', error);
      throw error;
    }
  });

  // Go forward
  ipcMain.handle('view:go-forward', async (event) => {
    try {
      console.log('IPC view:go-forward received');
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.detailView) {
        throw new Error('DetailView not found for this window');
      }

      if (context.detailView.webContents.canGoForward()) {
        context.detailView.webContents.goForward();
        return { success: true };
      }
      return { success: false, error: 'Cannot go forward' };
    } catch (error: any) {
      console.error('IPC view:go-forward error:', error);
      throw error;
    }
  });

  // Reload page
  ipcMain.handle('view:reload', async (event) => {
    try {
      console.log('IPC view:reload received');
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.detailView) {
        throw new Error('DetailView not found for this window');
      }

      context.detailView.webContents.reload();
      return { success: true };
    } catch (error: any) {
      console.error('IPC view:reload error:', error);
      // Return error object instead of throwing to allow graceful handling in renderer
      return { success: false, error: error.message || 'Reload failed' };
    }
  });

  // Get navigation state (canGoBack, canGoForward)
  ipcMain.handle('view:get-navigation-state', async (event) => {
    try {
      const context = windowContextManager.getContext(event.sender.id);
      if (!context || !context.detailView) {
        return { canGoBack: false, canGoForward: false };
      }

      return {
        canGoBack: context.detailView.webContents.canGoBack(),
        canGoForward: context.detailView.webContents.canGoForward()
      };
    } catch (error: any) {
      console.error('IPC view:get-navigation-state error:', error);
      return { canGoBack: false, canGoForward: false };
    }
  });

  console.log('[IPC] View control handlers registered (including layout transformation handlers)');
}
