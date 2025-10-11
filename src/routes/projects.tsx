import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Container } from "~/components/layout/Container";

export default function Projects() {
  return (
    <>
      <Header />
      <main class="min-h-screen py-16">
        <Container>
          {/* Header */}
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
            <p class="text-xl text-gray-600 dark:text-gray-400">
              Showcase of my work and side projects.
            </p>
          </div>

          {/* Projects Grid - Placeholder */}
          <div class="card">
            <div class="text-center py-20">
              <div class="text-6xl text-gray-300 dark:text-gray-700 mb-4">
                <div class="i-mdi-folder-multiple-outline inline-block" />
              </div>
              <h2 class="text-2xl font-semibold mb-2">Projects Coming Soon</h2>
              <p class="text-gray-600 dark:text-gray-400">
                I'm currently working on adding my projects. Stay tuned!
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
