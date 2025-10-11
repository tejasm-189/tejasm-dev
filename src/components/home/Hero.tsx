import { siteConfig } from "~/lib/config";
import { Reveal } from "~/components/effects/Reveal";

export function Hero() {
  return (
    <section class="py-20 md:py-32">
      <div class="text-center space-y-6">
        {/* Title with Reveal Animation */}
        <Reveal>
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in duration-1000">
            Hi, I'm{" "}
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient">
              {siteConfig.name}
            </span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={100}>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Software Developer passionate about building fast, elegant, and user-friendly applications.
          </p>
        </Reveal>

        {/* Description */}
        <Reveal delay={200}>
          <p class="text-lg text-gray-500 dark:text-gray-500 max-w-3xl mx-auto">
            Welcome to my personal space on the web where I share my experiences, insights, and learnings
            from the world of software development.
          </p>
        </Reveal>

        {/* CTA Buttons with Hover Effects */}
        <Reveal delay={300}>
          <div class="flex gap-4 justify-center pt-8">
            <a 
              href="/blog" 
              class="btn-primary transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Read My Blog
            </a>
            <a 
              href="/about" 
              class="btn-secondary transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              About Me
            </a>
          </div>
        </Reveal>

        {/* Social Links with Bounce Animation */}
        <Reveal delay={400}>
          <div class="flex gap-6 justify-center pt-8">
            <a 
              href={siteConfig.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              aria-label="GitHub"
            >
              <div class="i-mdi-github" />
            </a>
            <a 
              href={siteConfig.links.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-3xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <div class="i-mdi-linkedin" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
