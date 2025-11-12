/**
 * Browser Get Download List Tool
 *
 * Retrieves the list of files downloaded during the current browser session.
 * Tracks download progress and completion status.
 *
 * @phase 5
 * @priority LOW
 * @complexity LOW
 * @risk LOW
 */

import type { Tool, ToolResult } from '@jarvis-agent/core/types';
import type { AgentContext } from '@jarvis-agent/core';

interface DownloadInfo {
  guid: string;
  url: string;
  suggestedFilename: string;
  resourceUri: string;
  createdAt: string;
  progress: number;
  state: 'inProgress' | 'completed' | 'canceled';
}

// Global download tracking (in real implementation, this would be managed by the browser manager)
const downloadStore: DownloadInfo[] = [];

export const browserGetDownloadListTool: Tool = {
  name: 'browser_get_download_list',
  description: 'Get the list of files downloaded during the current browser session with their status and progress.',
  parameters: {
    type: 'object',
    properties: {},
    required: []
  },
  execute: async (
    _args: Record<string, unknown>,
    _agentContext: AgentContext
  ): Promise<ToolResult> => {
    try {
      // In a real implementation, this would query the browser's download manager
      // For now, we return the tracked downloads

      const summary = downloadStore.length === 0
        ? 'No downloads in current session'
        : `Found ${downloadStore.length} download(s):\n` +
          downloadStore.map((d, i) =>
            `${i + 1}. ${d.suggestedFilename} - ${d.state} (${d.progress}%)`
          ).join('\n');

      return {
        content: [{
          type: 'text',
          text: `${summary}\n\n${JSON.stringify({ list: downloadStore }, null, 2)}`
        }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Error getting download list: ${error.message}`
        }],
        isError: true
      };
    }
  }
};

// Helper function to track downloads (would be called by browser manager)
export function trackDownload(download: DownloadInfo) {
  const existing = downloadStore.findIndex(d => d.guid === download.guid);
  if (existing >= 0) {
    downloadStore[existing] = download;
  } else {
    downloadStore.push(download);
  }
}

// Helper function to clear download history
export function clearDownloadHistory() {
  downloadStore.length = 0;
}