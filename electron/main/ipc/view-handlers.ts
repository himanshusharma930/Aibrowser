import { ipcMain } from "electron";
import { windowContextManager } from "../services/window-context-manager";

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
      if (!context || !context.detailView) {
        console.warn('DetailView not found for bounds update');
        return { success: false, error: 'DetailView not found' };
      }

      // Validate bounds to prevent negative values
      const validatedBounds = {
        x: Math.max(0, bounds.x),
        y: Math.max(0, bounds.y),
        width: Math.max(100, bounds.width), // Minimum 100px width
        height: Math.max(100, bounds.height) // Minimum 100px height
      };

      context.detailView.setBounds(validatedBounds);
      console.log('DetailView bounds updated:', validatedBounds);

      return { success: true, bounds: validatedBounds };
    } catch (error: any) {
      console.error('IPC update-detail-view-bounds error:', error);
      return { success: false, error: error.message };
    }
  });

  console.log('[IPC] View control handlers registered (including layout transformation handlers)');
}
