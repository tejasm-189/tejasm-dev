import { describe, it, expect } from 'vitest';
import { formatDate, truncateText, calculateReadingTime } from '../../lib/utils';

/**
 * INTEGRATION TESTING EXAMPLE
 * 
 * Integration tests verify how multiple functions/components work together.
 * This example shows how utility functions might be used together in a real scenario.
 */

describe('Blog Post Utilities Integration', () => {
  // Simulating a blog post scenario where we use multiple utilities together
  
  it('should format a complete blog post preview', () => {
    // Arrange: Simulate blog post data
    const blogPost = {
      title: 'Understanding TypeScript Generics in Depth',
      content: 'TypeScript generics are a powerful feature that allows you to write reusable, type-safe code. In this comprehensive guide, we will explore how to use generics effectively in your TypeScript projects, covering basic usage, constraints, and advanced patterns.',
      publishDate: '2024-10-11T12:00:00Z',
      author: 'Tejas M',
    };
    
    // Act: Use multiple utilities to prepare the post for display
    const formattedDate = formatDate(blogPost.publishDate);
    const preview = truncateText(blogPost.content, 100);
    const readTime = calculateReadingTime(blogPost.content);
    
    // Assert: Verify all utilities work correctly together
    expect(formattedDate).toBe('Oct 11, 2024');
    expect(preview).toContain('...');
    expect(preview.length).toBeLessThanOrEqual(103); // 100 + '...'
    expect(readTime).toBe(1); // Short text = 1 minute
  });

  it('should handle a blog post list with multiple entries', () => {
    // Simulating processing multiple blog posts
    const posts = [
      {
        title: 'Post 1',
        content: 'word '.repeat(500), // 500 words
        date: '2024-01-15',
      },
      {
        title: 'Post 2',
        content: 'word '.repeat(1000), // 1000 words
        date: '2024-02-20',
      },
      {
        title: 'Post 3',
        content: 'Short post',
        date: '2024-03-10',
      },
    ];

    // Process all posts
    const processedPosts = posts.map(post => ({
      title: post.title,
      preview: truncateText(post.content, 50),
      formattedDate: formatDate(post.date),
      readTime: calculateReadingTime(post.content),
    }));

    // Verify processing
    expect(processedPosts).toHaveLength(3);
    
    // Post 1: Long content
    expect(processedPosts[0].readTime).toBe(3); // 500/200 = 2.5, rounds up to 3
    expect(processedPosts[0].formattedDate).toBe('Jan 15, 2024');
    
    // Post 2: Very long content
    expect(processedPosts[1].readTime).toBe(5); // 1000/200 = 5
    expect(processedPosts[1].formattedDate).toBe('Feb 20, 2024');
    
    // Post 3: Short content
    expect(processedPosts[2].readTime).toBe(1); // Minimum 1 minute
    expect(processedPosts[2].formattedDate).toBe('Mar 10, 2024');
  });

  it('should create a blog post metadata object', () => {
    // This pattern is common: combining multiple utilities to create a complete object
    const rawData = {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10),
      publishedAt: '2024-12-25',
    };

    // Create metadata using our utilities
    const metadata = {
      excerpt: truncateText(rawData.content, 150),
      publishedDate: formatDate(rawData.publishedAt),
      estimatedReadTime: `${calculateReadingTime(rawData.content)} min read`,
    };

    // Verify the complete metadata object
    expect(metadata.excerpt).toBeDefined();
    expect(metadata.excerpt.length).toBeLessThanOrEqual(153);
    expect(metadata.publishedDate).toBe('Dec 25, 2024');
    expect(metadata.estimatedReadTime).toMatch(/\d+ min read/);
  });

  it('should handle edge case where all utilities receive minimal input', () => {
    const minimalPost = {
      content: 'Hi',
      date: '2024-01-01',
    };

    const preview = truncateText(minimalPost.content, 50);
    const date = formatDate(minimalPost.date);
    const readTime = calculateReadingTime(minimalPost.content);

    // All utilities should handle minimal input gracefully
    expect(preview).toBe('Hi'); // No truncation needed
    expect(date).toBe('Jan 1, 2024');
    expect(readTime).toBe(1); // Minimum read time
  });
});

/**
 * KEY LESSONS FROM THIS INTEGRATION TEST:
 * 
 * 1. Integration tests verify multiple units working together
 * 2. They test realistic scenarios (e.g., processing blog posts)
 * 3. They ensure utilities compose well together
 * 4. They catch issues that unit tests might miss
 * 5. They document how code is meant to be used in practice
 * 
 * WHEN TO USE INTEGRATION TESTS:
 * - Testing workflows that use multiple functions
 * - Testing components that interact with services
 * - Testing data transformations that use multiple utilities
 * - Verifying that different parts of your code work together
 * 
 * BALANCE:
 * Write more unit tests (fast, focused) and fewer integration tests (slower, broader)
 * The "testing pyramid": Many unit tests, some integration tests, few E2E tests
 */
