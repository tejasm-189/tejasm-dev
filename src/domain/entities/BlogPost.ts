/**
 * BlogPost Entity
 * Represents a blog post in the domain model
 * Similar to C# POCO (Plain Old CLR Object)
 */

export interface BlogPost {
  /** Unique identifier for the post */
  id: string;
  
  /** Post title */
  title: string;
  
  /** Short description/excerpt */
  description: string;
  
  /** Full content in MDX format */
  content: string;
  
  /** URL-friendly slug */
  slug: string;
  
  /** Publication date */
  publishedAt: Date;
  
  /** Last updated date (optional) */
  updatedAt?: Date;
  
  /** Tags/categories */
  tags: string[];
  
  /** Estimated reading time in minutes */
  readingTime: number;
  
  /** Author name */
  author: string;
  
  /** Featured image URL (optional) */
  image?: string;
  
  /** Whether the post is published */
  published: boolean;
}

/**
 * BlogPost metadata (frontmatter from MDX)
 * Used when parsing MDX files
 */
export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author?: string;
  image?: string;
  published?: boolean;
}
