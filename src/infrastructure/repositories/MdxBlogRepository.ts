import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostFrontmatter } from '@/domain/entities/BlogPost';
import { IBlogRepository } from '@/domain/interfaces/IBlogRepository';
import { calculateReadingTime } from '@/lib/utils/string';

/**
 * MDX Blog Repository Implementation
 * Reads blog posts from MDX files in the file system
 * Implements IBlogRepository interface
 */
export class MdxBlogRepository implements IBlogRepository {
  private readonly postsDirectory: string;

  constructor() {
    // Path to blog posts directory
    this.postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');
  }

  /**
   * Get all published blog posts sorted by date (newest first)
   */
  async getAll(): Promise<BlogPost[]> {
    // Check if directory exists
    if (!fs.existsSync(this.postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(this.postsDirectory);
    const posts: BlogPost[] = [];

    for (const fileName of fileNames) {
      if (!fileName.endsWith('.mdx')) continue;

      const post = await this.getBySlug(fileName.replace(/\.mdx$/, ''));
      if (post && post.published) {
        posts.push(post);
      }
    }

    // Sort by date descending (newest first)
    return posts.sort((a, b) => 
      b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  /**
   * Get a single blog post by slug
   */
  async getBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const fullPath = path.join(this.postsDirectory, `${slug}.mdx`);
      
      if (!fs.existsSync(fullPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const frontmatter = data as BlogPostFrontmatter;

      // Calculate reading time
      const readingTime = calculateReadingTime(content);

      const post: BlogPost = {
        id: slug,
        slug,
        title: frontmatter.title,
        description: frontmatter.description,
        content,
        publishedAt: new Date(frontmatter.date),
        tags: frontmatter.tags || [],
        readingTime,
        author: frontmatter.author || 'Tejas M',
        image: frontmatter.image,
        published: frontmatter.published !== false, // Default to true
      };

      return post;
    } catch (error) {
      console.error(`Error reading post ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get blog posts by tag
   */
  async getByTag(tag: string): Promise<BlogPost[]> {
    const allPosts = await this.getAll();
    return allPosts.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  /**
   * Get all unique tags from all posts
   */
  async getAllTags(): Promise<string[]> {
    const allPosts = await this.getAll();
    const tagsSet = new Set<string>();

    allPosts.forEach(post => {
      post.tags.forEach(tag => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
  }
}
