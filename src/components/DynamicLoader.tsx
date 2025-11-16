import dynamic, { DynamicOptions } from 'next/dynamic';
import { Skeleton } from 'antd';
import { ComponentType, ReactNode } from 'react';

/**
 * Generic loading fallback component
 */
const LoadingFallback = () => (
  <div className="p-4 w-full h-full">
    <Skeleton active paragraph={{ rows: 4 }} />
  </div>
);

/**
 * Options for dynamic component loading
 */
export interface DynamicComponentOptions {
  ssr?: boolean;
  loading?: (() => ReactNode) | ReactNode;
}

/**
 * Helper function to create dynamically imported components with sensible defaults
 *
 * @param importFn - Function that returns the component import promise
 * @param options - Configuration options for dynamic loading
 * @returns Dynamically loaded component
 *
 * @example
 * ```typescript
 * const AgentConfigModal = dynamicComponent(
 *   () => import('@/components/AgentConfigModal'),
 *   { ssr: false, loading: () => <CustomLoader /> }
 * );
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function dynamicComponent<P = {}>(
  importFn: () => Promise<any>,
  options: DynamicComponentOptions = {}
) {
  const LoadingComponent = typeof options.loading === 'function'
    ? options.loading as () => ReactNode
    : () => options.loading || <LoadingFallback />;

  return dynamic(importFn as any, {
    loading: LoadingComponent as any,
    ssr: options.ssr ?? false,
  });
}

/**
 * Helper for SSR-compatible dynamic imports (mainly for pages)
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function dynamicComponentSSR<P = {}>(
  importFn: () => Promise<any>,
  options: DynamicComponentOptions = {}
) {
  return dynamicComponent(importFn, {
    ...options,
    ssr: true,
  });
}

/**
 * Helper for client-only dynamic imports (modals, sidebars)
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function dynamicComponentClient<P = {}>(
  importFn: () => Promise<any>,
  options: DynamicComponentOptions = {}
) {
  return dynamicComponent(importFn, {
    ...options,
    ssr: false,
  });
}
