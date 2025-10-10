import { BlogPost } from '@/domain/entities/BlogPost';

/**
 * Blog Repository Interface
 * Defines contract for blog data access
 * Similar to C# Repository Pattern interface
 */
export interface IBlogRepository {
  /**
   * Get all published blog posts
   * @returns Promise<BlogPost[]> - Array of all blog posts sorted by date (newest first)
   */
  getAll(): Promise<BlogPost[]>;
  
  /**
   * Get a single blog post by slug
   * @param slug - URL-friendly slug
   * @returns Promise<BlogPost | null> - Blog post or null if not found
   */
  getBySlug(slug: string): Promise<BlogPost | null>;
  
  /**
   * Get blog posts by tag
   * @param tag - Tag name
   * @returns Promise<BlogPost[]> - Array of blog posts with the specified tag
   */
  getByTag(tag: string): Promise<BlogPost[]>;
  
  /**
   * Get all unique tags used in blog posts
   * @returns Promise<string[]> - Array of unique tag names
   */
  getAllTags(): Promise<string[]>;
}
