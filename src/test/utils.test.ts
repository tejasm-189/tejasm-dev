import { describe, it, expect } from 'vitest';
import { formatDate, truncateText, calculateReadingTime, isValidEmail } from '../lib/utils';

/**
 * UNIT TESTING TUTORIAL
 * 
 * This file demonstrates fundamental unit testing concepts:
 * 
 * 1. describe() - Groups related tests together
 * 2. it() - Defines a single test case
 * 3. expect() - Makes assertions about what should happen
 * 
 * Unit tests should be:
 * - Fast (run in milliseconds)
 * - Independent (not dependent on other tests)
 * - Repeatable (same result every time)
 * - Self-validating (pass or fail, no manual checking)
 * - Thorough (test edge cases, errors, and normal operation)
 */

describe('formatDate', () => {
  // Testing normal/happy path
  it('should format a valid ISO date string', () => {
    const result = formatDate('2024-01-15');
    expect(result).toBe('Jan 15, 2024');
  });

  it('should format dates with time information', () => {
    const result = formatDate('2024-12-25T10:30:00Z');
    expect(result).toContain('2024');
    expect(result).toContain('Dec');
  });

  // Testing edge cases and error handling
  it('should throw an error for invalid date strings', () => {
    expect(() => formatDate('not-a-date')).toThrow('Invalid date string');
  });

  it('should throw an error for empty strings', () => {
    expect(() => formatDate('')).toThrow('Invalid date string');
  });
});

describe('truncateText', () => {
  it('should return text as-is when shorter than maxLength', () => {
    const text = 'Short text';
    const result = truncateText(text, 50);
    expect(result).toBe('Short text');
  });

  it('should truncate text and add ellipsis when longer than maxLength', () => {
    const text = 'This is a very long text that should be truncated to a shorter length';
    const result = truncateText(text, 20);
    
    // The result is 19 chars (after trim) + '...' = 22 chars total
    expect(result.endsWith('...')).toBe(true);
    expect(result).toBe('This is a very long...');
  });

  it('should use default maxLength of 100 when not specified', () => {
    const text = 'a'.repeat(150);
    const result = truncateText(text);
    
    expect(result).toHaveLength(103); // 100 + '...'
  });

  it('should handle text exactly at maxLength', () => {
    const text = 'a'.repeat(50);
    const result = truncateText(text, 50);
    
    expect(result).toBe(text);
    expect(result).not.toContain('...');
  });
});

describe('calculateReadingTime', () => {
  it('should calculate reading time for normal text', () => {
    const text = 'word '.repeat(400); // 400 words
    const result = calculateReadingTime(text, 200);
    
    expect(result).toBe(2); // 400 words / 200 wpm = 2 minutes
  });

  it('should return at least 1 minute for short text', () => {
    const text = 'Just a few words';
    const result = calculateReadingTime(text);
    
    expect(result).toBe(1);
  });

  it('should round up partial minutes', () => {
    const text = 'word '.repeat(250); // 250 words
    const result = calculateReadingTime(text, 200);
    
    expect(result).toBe(2); // 1.25 rounds up to 2
  });

  it('should use default wordsPerMinute when not specified', () => {
    const text = 'word '.repeat(200);
    const result = calculateReadingTime(text);
    
    expect(result).toBe(1);
  });

  it('should handle empty text', () => {
    const result = calculateReadingTime('');
    expect(result).toBe(1); // Minimum 1 minute
  });
});

describe('isValidEmail', () => {
  // Testing valid emails
  it('should return true for valid email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    expect(isValidEmail('test+tag@example.org')).toBe(true);
  });

  // Testing invalid emails
  it('should return false for invalid email addresses', () => {
    expect(isValidEmail('notanemail')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
    expect(isValidEmail('spaces in@email.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  // Testing edge cases
  it('should handle emails with special characters', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('test..double@example.com')).toBe(true); // Technically allowed
  });
});
