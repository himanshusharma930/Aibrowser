/**
 * Dynamic Import Manager
 *
 * Centralized management for all dynamic imports with:
 * - Error handling and fallbacks
 * - Loading state management
 * - Preloading hints
 * - Performance tracking
 */

import { useCallback, useRef, useState } from 'react';

/**
 * Hook for managing dynamic imports with state
 *
 * @example
 * ```typescript
 * const { Component, isLoading, error } = useDynamicImport(
 *   () => import('@/components/Modal')
 * );
 * ```
 */
export function useDynamicImport<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
  } = {}
) {
  const [state, setState] = useState<{
    Component: T | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    Component: null,
    isLoading: true,
    error: null,
  });

  const importedRef = useRef(false);

  // Load component on first use
  const loadComponent = useCallback(async () => {
    if (importedRef.current) return;

    importedRef.current = true;
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const loadedModule = await importFn();
      setState(prev => ({
        ...prev,
        Component: loadedModule.default,
        isLoading: false,
      }));
      options.onSuccess?.();
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState(prev => ({
        ...prev,
        error: err,
        isLoading: false,
      }));
      options.onError?.(err);
    }
  }, [importFn, options]);

  return {
    ...state,
    loadComponent,
    retry: loadComponent,
  };
}

/**
 * Preload a dynamic import before rendering
 *
 * Useful for prefetching components that user is likely to interact with
 *
 * @example
 * ```typescript
 * useEffect(() => {
 *   preloadDynamicImport(() => import('@/components/Modal'));
 * }, []);
 * ```
 */
export function preloadDynamicImport<T>(
  importFn: () => Promise<T>
): Promise<T> {
  return importFn();
}

/**
 * Track performance of dynamic imports
 *
 * Logs timing information for monitoring and optimization
 */
export function trackDynamicImportPerformance(
  moduleName: string,
  startTime: number,
  success: boolean
) {
  const duration = performance.now() - startTime;

  if (typeof window !== 'undefined' && window.performance?.mark) {
    window.performance.mark(`dynamic-import-${moduleName}-${success ? 'success' : 'error'}`);
    window.performance.measure(
      `dynamic-import-${moduleName}`,
      `navigationStart`,
      `dynamic-import-${moduleName}-${success ? 'success' : 'error'}`
    );
  }

  console.debug(
    `[DynamicImport] ${moduleName}: ${duration.toFixed(2)}ms (${success ? 'success' : 'failed'})`
  );

  return duration;
}

/**
 * Wrapper for dynamic imports with automatic performance tracking
 *
 * @example
 * ```typescript
 * const module = await trackedDynamicImport('Modal', () => import('@/components/Modal'));
 * ```
 */
export async function trackedDynamicImport<T>(
  moduleName: string,
  importFn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();

  try {
    const result = await importFn();
    trackDynamicImportPerformance(moduleName, startTime, true);
    return result;
  } catch (error) {
    trackDynamicImportPerformance(moduleName, startTime, false);
    throw error;
  }
}

/**
 * Batch preload multiple modules
 *
 * Useful for preloading a set of related components
 *
 * @example
 * ```typescript
 * await preloadModules([
 *   { name: 'Modal', import: () => import('@/components/Modal') },
 *   { name: 'Panel', import: () => import('@/components/Panel') },
 * ]);
 * ```
 */
export async function preloadModules(
  modules: Array<{
    name: string;
    import: () => Promise<any>;
  }>
) {
  const results = await Promise.allSettled(
    modules.map(({ name, import: importFn }) =>
      trackedDynamicImport(name, importFn)
    )
  );

  const failed = results.filter(r => r.status === 'rejected');
  if (failed.length > 0) {
    console.warn(
      `[DynamicImport] Failed to preload ${failed.length}/${modules.length} modules`
    );
  }

  return results;
}

/**
 * Create a cached dynamic import
 *
 * Subsequent calls return cached result without re-importing
 */
export function createCachedDynamicImport<T>(
  importFn: () => Promise<T>
): () => Promise<T> {
  let cached: T | null = null;
  let importing: Promise<T> | null = null;

  return async () => {
    if (cached) return cached;
    if (importing) return importing;

    importing = importFn().then(result => {
      cached = result;
      importing = null;
      return cached;
    });

    return importing;
  };
}

/**
 * Lazy import with timeout fallback
 *
 * If import takes too long, use fallback component
 */
export function createTimeoutDynamicImport<T>(
  importFn: () => Promise<T>,
  timeoutMs: number = 5000,
  fallback?: T
): () => Promise<T> {
  return async () => {
    const timeoutPromise = new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Import timeout')), timeoutMs)
    );

    try {
      return await Promise.race([importFn(), timeoutPromise]);
    } catch (error) {
      if (fallback) {
        console.warn(`[DynamicImport] Import timeout, using fallback`, error);
        return fallback;
      }
      throw error;
    }
  };
}
