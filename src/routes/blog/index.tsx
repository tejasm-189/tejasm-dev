import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Container } from "~/components/layout/Container";

export default function Blog() {
  return (
    <>
      <Header />
      <main class="min-h-screen py-16">
        <Container>
          {/* Header */}
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p class="text-xl text-gray-600 dark:text-gray-400">
              Thoughts, experiences, and insights on software development.
            </p>
          </div>

          {/* Blog Posts - Placeholder */}
          <div class="space-y-8">
            <div class="card">
              <div class="text-center py-20">
                <div class="text-6xl text-gray-300 dark:text-gray-700 mb-4">
                  <div class="i-mdi-post-outline inline-block" />
                </div>
                <h2 class="text-2xl font-semibold mb-2">No posts yet</h2>
                <p class="text-gray-600 dark:text-gray-400">
                  Blog posts are coming soon! Check back later for insights and experiences.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
