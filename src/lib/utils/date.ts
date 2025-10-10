import { format, formatDistanceToNow } from 'date-fns';

/**
 * Format a date to a readable string
 * 
 * @example
 * formatDate(new Date()) // => "October 10, 2025"
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMMM dd, yyyy');
}

/**
 * Get relative time from now
 * 
 * @example
 * getRelativeTime(new Date()) // => "just now"
 * getRelativeTime(new Date('2025-01-01')) // => "9 months ago"
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Format date for datetime attribute
 * 
 * @example
 * formatDateISO(new Date()) // => "2025-10-10"
 */
export function formatDateISO(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
}
