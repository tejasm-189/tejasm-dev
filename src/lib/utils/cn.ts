import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function to merge class names
 * Similar to C#'s string.Join but for CSS classes
 * 
 * @example
 * cn('btn', isActive && 'btn-active', 'btn-primary')
 * // => 'btn btn-active btn-primary'
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
