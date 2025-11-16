/**
 * Code Splitting Configuration
 *
 * Centralized configuration for dynamic imports to optimize bundle size
 * and improve initial page load performance
 *
 * Strategy:
 * 1. Modal components - lazy load on demand via dynamic/index.tsx
 * 2. Feature-specific components - lazy load when feature is accessed
 * 3. Heavy libraries (speech recognition) - on-demand import helpers
 * 4. Scheduled task components - lazy load in home page only
 */

// Re-export from dynamic/index.tsx for centralized component configuration
export {
  AgentConfigModal,
  SettingsDrawer,
  ScheduledTaskListModal,
  MCPToolSelector,
  RightAISidebar,
  HistoryPanel,
  BrowserPanel,
  AgentPlan,
  AgentPlanEmbedded,
  ModelConfigBar,
  NavigationBar,
  DualPanelLayout,
  TabBar,
  MessageComponents,
  ToolComponents,
  VirtualizedMessageList,
  AgentContextTransfer,
  TaskStepEditor,
  ScheduledTaskListPanel,
  LeftSidebar,
  AISidebarHeader,
  withSuspense,
} from './dynamic';

/**
 * Dynamic import helper for on-demand feature loading
 *
 * Usage:
 * ```typescript
 * const feature = await importFeatureModule('speech');
 * ```
 */
export async function importFeatureModule(featureName: string) {
  switch (featureName) {
    case 'speech':
      return import('@/lib/speechRecognition');
    case 'xiaohongshu':
      return import('@/lib/xiaohongshu');
    case 'douyin':
      return import('@/lib/douyin');
    case 'batch-messages':
      return import('@/lib/batch-message-handler');
    case 'capture':
      return import('@/lib/capture-feed');
    default:
      throw new Error(`Unknown feature module: ${featureName}`);
  }
}
