import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/layout/Container';
import { MdxBlogRepository } from '@/infrastructure/repositories/MdxBlogRepository';
import { formatDate } from '@/lib/utils/date';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all blog posts
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  const repository = new MdxBlogRepository();
  const posts = await repository.getAll();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata for each blog post
 */
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const repository = new MdxBlogRepository();
  const post = await repository.getBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

/**
 * Individual blog post page
 * Renders MDX content with custom styling
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const repository = new MdxBlogRepository();
  const post = await repository.getBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-12">
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* MDX Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-sm prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </Container>
  );
}
