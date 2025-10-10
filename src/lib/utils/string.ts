/**
 * Convert a string to URL-friendly slug
 * Similar to C#'s string manipulation methods
 * 
 * @example
 * slugify('Hello World!') // => 'hello-world'
 * slugify('TypeScript for C# Developers') // => 'typescript-for-csharp-developers'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Truncate text to specified length
 * 
 * @example
 * truncate('Lorem ipsum dolor sit amet', 10) // => 'Lorem ipsu...'
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Calculate reading time based on word count
 * Assumes average reading speed of 200 words per minute
 * 
 * @example
 * calculateReadingTime('Hello world this is a test') // => 1 (minute)
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
