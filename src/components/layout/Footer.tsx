import { Container } from "./Container";
import { siteConfig } from "~/lib/config";

export function Footer() {
  return (
    <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-20">
      <Container>
        <div class="py-12 grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 class="text-lg font-semibold mb-4">About</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Personal website and blog where I share my experiences and insights on software development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <div class="flex flex-col gap-2">
              <a href="/" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Home</a>
              <a href="/blog" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Blog</a>
              <a href="/about" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">About</a>
              <a href="/projects" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Projects</a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 class="text-lg font-semibold mb-4">Connect</h3>
            <div class="flex gap-4">
              <a 
                href={siteConfig.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                aria-label="Visit my GitHub profile"
              >
                <div class="i-mdi-github" />
              </a>
              <a 
                href={siteConfig.links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                aria-label="Connect with me on LinkedIn"
              >
                <div class="i-mdi-linkedin" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div class="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Built with SolidJS + UnoCSS</p>
        </div>
      </Container>
    </footer>
  );
}
