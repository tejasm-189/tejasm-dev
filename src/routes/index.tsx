import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Container } from "~/components/layout/Container";
import { Hero } from "~/components/home/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main class="min-h-screen">
        <Container>
          <Hero />
          
          {/* Featured Section */}
          <section class="py-16">
            <h2 class="text-3xl font-bold mb-8 text-center">What I Do</h2>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="card">
                <div class="text-4xl mb-4 text-blue-600">
                  <div class="i-mdi-code-braces" />
                </div>
                <h3 class="text-xl font-semibold mb-2">Development</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Building modern web applications with cutting-edge technologies and best practices.
                </p>
              </div>

              <div class="card">
                <div class="text-4xl mb-4 text-purple-600">
                  <div class="i-mdi-speedometer" />
                </div>
                <h3 class="text-xl font-semibold mb-2">Performance</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Optimizing applications for speed and efficiency to deliver the best user experience.
                </p>
              </div>

              <div class="card">
                <div class="text-4xl mb-4 text-green-600">
                  <div class="i-mdi-lightbulb-on" />
                </div>
                <h3 class="text-xl font-semibold mb-2">Problem Solving</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Tackling complex challenges with creative solutions and innovative approaches.
                </p>
              </div>
            </div>
          </section>

          {/* Recent Posts Preview */}
          <section class="py-16">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-3xl font-bold">Recent Posts</h2>
              <a href="/blog" class="text-blue-600 hover:text-blue-700 font-medium">
                View all →
              </a>
            </div>
            <div class="text-center text-gray-500 py-12">
              <p>Blog posts coming soon! Stay tuned for insights and experiences.</p>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
