/**
 *
 * @param delay
 * @returns Promise
 */

export function delay(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(() => resolve(), delay))
}
