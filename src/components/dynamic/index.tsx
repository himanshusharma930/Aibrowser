/**
 * Dynamic Component Index
 *
 * This file exports dynamically loaded components with code splitting
 * to reduce initial bundle size and improve performance.
 *
 * All components here use React.lazy() and Suspense for optimal loading.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from 'antd';
import { dynamicComponent, dynamicComponentClient } from '../DynamicLoader';

// ========================================
// MODALS (Client-only, lazy load)
// ========================================

/**
 * Agent Configuration Modal
 * - Large component (321 lines)
 * - Only shown on demand
 * - No SSR needed
 */
export const AgentConfigModal = dynamicComponentClient(
  () => import('@/components/AgentConfigModal'),
  {
    loading: () => <Skeleton active paragraph={{ rows: 8 }} />
  }
);

/**
 * Settings Drawer
 * - Configuration UI
 * - Only shown on demand
 */
// @ts-ignore - Component type inference issue
// noinspection TypeScriptUnresolvedFunction
export const SettingsDrawer = dynamicComponentClient(
  () => import('@/components/SettingsDrawer'),
  {
    loading: () => <Skeleton active />
  }
);

/**
 * Scheduled Task List Modal
 * - Task management UI
 * - Heavy component
 */
// @ts-ignore - Component type inference issue
export const ScheduledTaskListModal = dynamicComponentClient(
  () => import('@/components/scheduled-task/ScheduledTaskListModal'),
  {
    loading: () => <Skeleton active paragraph={{ rows: 6 }} />
  }
);

/**
 * MCP Tool Selector
 * - Tool configuration
 * - On-demand loading
 */
export const MCPToolSelector = dynamicComponentClient(
  () => import('@/components/MCPToolSelector'),
  {
    loading: () => <Skeleton active />
  }
);

// ========================================
// SIDEBARS (Client-only, lazy load)
// ========================================

/**
 * Right AI Sidebar
 * - AI chat interface
 * - Conditionally rendered
 * - 291 lines
 */
export const RightAISidebar = dynamicComponentClient(
  () => import('@/components/RightAISidebar-enhanced'),
  {
    loading: () => <Skeleton active />
  }
);

/**
 * History Panel
 * - Task history display
 * - 479 lines
 * - Lazy load for performance
 */
export const HistoryPanel = dynamicComponentClient(
  () => import('@/components/HistoryPanel'),
  {
    loading: () => <Skeleton active paragraph={{ rows: 5 }} />
  }
);

/**
 * Browser Panel
 * - Main content area
 * - 207 lines
 */
// @ts-ignore - Component type inference issue
// noinspection TypeScriptUnresolvedFunction
export const BrowserPanel = dynamicComponentClient(
  () => import('@/components/BrowserPanel'),
  {
    loading: () => <Skeleton active style={{ height: '100%' }} />
  }
);

// ========================================
// LARGE COMPONENTS (Lazy load)
// ========================================

/**
 * Agent Plan Component
 * - Complex rendering logic
 * - 739 lines
 * - High priority for code splitting
 */
export const AgentPlan = dynamicComponent(
  () => import('@/components/ui/agent-plan'),
  {
    ssr: true,
    loading: () => <Skeleton active paragraph={{ rows: 8 }} />
  }
);

/**
 * Agent Plan Embedded
 * - Embedded version of plan display
 * - 282 lines
 */
export const AgentPlanEmbedded = dynamicComponent(
  () => import('@/components/ui/agent-plan-embedded'),
  {
    ssr: false,
    loading: () => <Skeleton active />
  }
);

/**
 * Model Configuration Bar
 * - Provider configuration
 * - 600 lines
 * - High priority for splitting
 */
// @ts-ignore - Component type inference issue
// noinspection TypeScriptUnresolvedFunction
export const ModelConfigBar = dynamicComponentClient(
  () => import('@/components/ModelConfigBar'),
  {
    loading: () => <Skeleton active paragraph={{ rows: 6 }} />
  }
);

/**
 * Navigation Bar
 * - Top navigation
 * - 298 lines
 */
export const NavigationBar = dynamicComponent(
  () => import('@/components/NavigationBar'),
  {
    ssr: true,
    loading: () => <div className="h-12 bg-gray-100" />
  }
);

/**
 * Dual Panel Layout
 * - Layout management
 * - 243 lines
 */
export const DualPanelLayout = dynamicComponent(
  () => import('@/components/DualPanelLayout'),
  {
    ssr: true,
    loading: () => <Skeleton active style={{ height: '100vh' }} />
  }
);

/**
 * Tab Bar
 * - Tab management UI
 * - 238 lines
 */
export const TabBar = dynamicComponent(
  () => import('@/components/TabBar'),
  {
    ssr: true,
    loading: () => <div className="h-10 bg-gray-100" />
  }
);

// ========================================
// CHAT COMPONENTS (Lazy load)
// ========================================

/**
 * Message Components
 * - Chat message rendering
 * - 399 lines
 * - Critical for performance
 */
export const MessageComponents = dynamicComponentClient(
  () => import('@/components/chat/MessageComponents'),
  {
    loading: () => <Skeleton active paragraph={{ rows: 4 }} />
  }
);

/**
 * Tool Components
 * - Tool call rendering
 * - 370 lines
 */
// @ts-ignore - Component type inference issue
// noinspection TypeScriptUnresolvedFunction
export const ToolComponents = dynamicComponentClient(
  () => import('@/components/chat/ToolComponents'),
  {
    loading: () => <Skeleton active />
  }
);

/**
 * Virtualized Message List
 * - Optimized message list
 * - 202 lines
 */
export const VirtualizedMessageList = dynamicComponentClient(
  () => import('@/components/chat/VirtualizedMessageList'),
  {
    loading: () => <Skeleton active paragraph={{ rows: 10 }} />
  }
);

/**
 * Agent Context Transfer
 * - Multi-agent coordination
 * - 244 lines
 */
export const AgentContextTransfer = dynamicComponentClient(
  () => import('@/components/chat/AgentContextTransfer'),
  {
    loading: () => <Skeleton active />
  }
);

// ========================================
// TASK COMPONENTS (Lazy load)
// ========================================

/**
 * Task Step Editor
 * - Step editing UI
 * - 237 lines
 */
// @ts-ignore - Component type inference issue
// noinspection TypeScriptUnresolvedFunction
export const TaskStepEditor = dynamicComponentClient(
  () => import('@/components/scheduled-task/TaskStepEditor'),
  {
    loading: () => <Skeleton active />
  }
);

/**
 * Task List Panel
 * - Scheduled tasks display
 * - 259 lines
 */
// @ts-ignore - Component type inference issue
// noinspection TypeScriptUnresolvedFunction
export const ScheduledTaskListPanel = dynamicComponentClient(
  () => import('@/components/scheduled-task/ScheduledTaskListPanel'),
  {
    loading: () => <Skeleton active paragraph={{ rows: 6 }} />
  }
);

// ========================================
// SIDEBAR COMPONENTS (Lazy load)
// ========================================

/**
 * Left Sidebar
 * - Navigation sidebar
 * - 346 lines
 * - High priority for splitting
 */
export const LeftSidebar = dynamicComponentClient(
  () => import('@/components/LeftSidebar-enhanced'),
  {
    loading: () => <Skeleton active paragraph={{ rows: 8 }} />
  }
);

/**
 * AI Sidebar Header
 * - Sidebar header
 * - 291 lines
 */
export const AISidebarHeader = dynamicComponentClient(
  () => import('@/components/AISidebarHeader'),
  {
    loading: () => <Skeleton active />
  }
);

// ========================================
// EXPORT HELPER FUNCTIONS
// ========================================

/**
 * Create a suspense wrapper for dynamic components
 *
 * @example
 * ```typescript
 * const WrappedModal = withSuspense(AgentConfigModal);
 * ```
 */
export function withSuspense<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <React.Suspense fallback={fallback || <Skeleton active />}>
        <Component {...(props as any)} />
      </React.Suspense>
    );
  };
}
