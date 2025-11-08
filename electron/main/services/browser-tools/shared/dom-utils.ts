/**
 * Reusable DOM utility functions for execute_script contexts
 *
 * NOTE: These functions are designed to be serialized and injected
 * into execute_script contexts. They must not reference external variables.
 */

/**
 * Check if element is visible (can be injected into execute_script)
 */
export const isElementVisibleFunction = `
(element) => {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  return rect.width > 0 &&
         rect.height > 0 &&
         style.visibility !== 'hidden' &&
         style.display !== 'none' &&
         style.opacity !== '0';
}
`;

/**
 * Wait for condition with timeout (can be injected into execute_script)
 */
export const waitForConditionFunction = `
(conditionFn, timeout, interval) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const check = () => {
      if (conditionFn()) {
        resolve(true);
      } else if (Date.now() - startTime >= timeout) {
        reject(new Error('TIMEOUT_EXCEEDED'));
      } else {
        setTimeout(check, interval);
      }
    };
    check();
  });
}
`;
