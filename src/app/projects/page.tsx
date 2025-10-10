import { Container } from '@/components/layout/Container';

/**
 * Projects page
 */
export default function ProjectsPage() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Here are some of the projects I&apos;ve been working on
        </p>

        <div className="grid gap-6">
          {/* Project 1 */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              tejasm.dev
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              My personal website and blog built with Next.js 14, TypeScript, and Tailwind CSS.
              Features a clean architecture approach with domain-driven design principles.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                Next.js
              </span>
              <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                TypeScript
              </span>
              <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                MDX
              </span>
            </div>
          </div>

          {/* Placeholder for more projects */}
          <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              More projects coming soon! Stay tuned.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
