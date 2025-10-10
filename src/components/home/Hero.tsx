import Link from 'next/link';
import { Container } from '@/components/layout/Container';

/**
 * Hero section for the homepage
 */
export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hi, I&apos;m{' '}
            <span className="text-blue-600 dark:text-blue-400">
              Tejas M
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Software Developer & Tech Enthusiast
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
            Welcome to my personal space on the web. I write about software development,
            share my experiences, and document my journey in tech. Currently exploring
            TypeScript, Next.js, and building modern web applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Read My Blog
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
