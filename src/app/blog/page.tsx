import { Container } from '@/components/layout/Container';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { MdxBlogRepository } from '@/infrastructure/repositories/MdxBlogRepository';

/**
 * Blog listing page
 * Displays all published blog posts
 */
export default async function BlogPage() {
  const repository = new MdxBlogRepository();
  const posts = await repository.getAll();

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Thoughts, tutorials, and insights about software development
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
