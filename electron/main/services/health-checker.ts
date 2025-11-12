/**
 * Service health checker
 * Responsible for detecting if Next.js service has started successfully
 */

import { net } from 'electron';

interface HealthCheckOptions {
  maxRetries?: number;
  retryInterval?: number;
  timeout?: number;
}

export class HealthChecker {
  private readonly defaultOptions: Required<HealthCheckOptions> = {
    maxRetries: 30,
    retryInterval: 1000,
    timeout: 5000,
  };

  /**
   * Check health status of specified URL
   * @param url URL to check
   * @param timeout Timeout for single check
   * @returns Whether it's healthy
   */
  async checkHealth(url: string, timeout?: number): Promise<boolean> {
    const checkTimeout = timeout || this.defaultOptions.timeout;
    
    return new Promise<boolean>((resolve) => {
      const timeoutId = setTimeout(() => {
        console.log(`[HealthChecker] Health check timeout for ${url} after ${checkTimeout}ms`);
        resolve(false);
      }, checkTimeout);

      try {
        const request = net.request({
          method: 'GET',
          url: url,
        });

        request.on('response', (response) => {
          clearTimeout(timeoutId);
          const isOk = response.statusCode >= 200 && response.statusCode < 300;
          console.log(`[HealthChecker] Health check for ${url}: ${isOk ? 'SUCCESS' : 'FAILED'} (status: ${response.statusCode})`);
          resolve(isOk);
        });

        request.on('error', (error) => {
          clearTimeout(timeoutId);
          console.error(`[HealthChecker] Health check failed for ${url}:`, error.message);
          resolve(false);
        });

        request.end();
      } catch (error) {
        clearTimeout(timeoutId);
        console.error(`[HealthChecker] Health check exception for ${url}:`, error);
        resolve(false);
      }
    });
  }

  /**
   * Wait for service to become healthy
   * @param url URL to check
   * @param options Check options
   * @returns Whether it eventually becomes healthy
   */
  async waitUntilHealthy(url: string, options?: HealthCheckOptions): Promise<boolean> {
    const opts = { ...this.defaultOptions, ...options };
    let retryCount = 0;

    console.log(`Starting health check: ${url}, max retries: ${opts.maxRetries}`);

    while (retryCount < opts.maxRetries) {
      const isHealthy = await this.checkHealth(url, opts.timeout);

      if (isHealthy) {
        console.log(`Service health check succeeded (${retryCount + 1}/${opts.maxRetries})`);
        return true;
      }

      retryCount++;
      console.log(`Health check failed (${retryCount}/${opts.maxRetries}), retrying after ${opts.retryInterval}ms...`);

      if (retryCount < opts.maxRetries) {
        await this.sleep(opts.retryInterval);
      }
    }

    console.log(`Service health check timeout, retried ${opts.maxRetries} times`);
    return false;
  }

  /**
   * Sleep function
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
