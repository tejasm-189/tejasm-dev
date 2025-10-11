import { siteConfig } from "~/lib/config";

export function Hero() {
  return (
    <section class="py-20 md:py-32">
      <div class="text-center space-y-6">
        {/* Title */}
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight">
          Hi, I'm{" "}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {siteConfig.name}
          </span>
        </h1>

        {/* Subtitle */}
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Software Developer passionate about building fast, elegant, and user-friendly applications.
        </p>

        {/* Description */}
        <p class="text-lg text-gray-500 dark:text-gray-500 max-w-3xl mx-auto">
          Welcome to my personal space on the web where I share my experiences, insights, and learnings
          from the world of software development.
        </p>

        {/* CTA Buttons */}
        <div class="flex gap-4 justify-center pt-8">
          <a href="/blog" class="btn-primary">
            Read My Blog
          </a>
          <a href="/about" class="btn-secondary">
            About Me
          </a>
        </div>

        {/* Social Links */}
        <div class="flex gap-6 justify-center pt-8">
          <a 
            href={siteConfig.links.github} 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="GitHub"
          >
            <div class="i-mdi-github" />
          </a>
          <a 
            href={siteConfig.links.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <div class="i-mdi-linkedin" />
          </a>
        </div>
      </div>
    </section>
  );
}
