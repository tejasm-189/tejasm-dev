import { siteConfig } from "~/lib/config";
import { Reveal } from "~/components/effects/Reveal";

export function Hero() {
  return (
    <section class="py-20 md:py-32">
      <div class="text-center space-y-8">
        {/* Title with Reveal Animation and improved typography */}
        <Reveal>
          <div class="space-y-4">
            <p class="text-sm md:text-base font-medium tracking-wider uppercase text-blue-600 dark:text-blue-400 opacity-90">
              Welcome to my portfolio
            </p>
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none animate-in fade-in duration-1000">
              Hi, I'm{" "}
              <span class="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient drop-shadow-lg">
                {siteConfig.name}
              </span>
            </h1>
          </div>
        </Reveal>

        {/* Subtitle with better hierarchy */}
        <Reveal delay={100}>
          <p class="text-xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Full-stack developer passionate about building{" "}
            <span class="text-blue-600 dark:text-blue-400 font-bold">secure applications</span>
            {" "}and exploring{" "}
            <span class="text-purple-600 dark:text-purple-400 font-bold">cryptography</span>
          </p>
        </Reveal>

        {/* Description with improved readability */}
        <Reveal delay={200}>
          <p class="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Welcome to my digital space where I share insights on software development, cybersecurity,
            cryptography, and the intersection of technology with security. Let's build something amazing together.
          </p>
        </Reveal>

        {/* CTA Buttons with Enhanced Hover Effects */}
        <Reveal delay={300}>
          <div class="flex gap-4 justify-center pt-12 flex-wrap">
            <a 
              href="/blog" 
              class="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-500/30 transform hover:scale-105 hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div class="i-mdi-post inline-block mr-2 text-xl relative z-10" />
              <span class="relative z-10">Read My Blog</span>
            </a>
            <a 
              href={siteConfig.links.resume}
              download="Tejas_M_Resume.pdf"
              class="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-green-600 to-teal-600 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-green-500/50 dark:hover:shadow-green-500/30 transform hover:scale-105 hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div class="i-mdi-download inline-block mr-2 text-xl relative z-10 group-hover:animate-bounce" />
              <span class="relative z-10">Download Resume</span>
            </a>
            <a 
              href="/about" 
              class="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 transition-all duration-300 ease-out bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-lg hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
            >
              <div class="i-mdi-account inline-block mr-2 text-xl group-hover:rotate-12 transition-transform duration-300" />
              About Me
            </a>
          </div>
        </Reveal>

        {/* Social Links with Enhanced Animations */}
        <Reveal delay={400}>
          <div class="flex gap-6 justify-center pt-12">
            <a 
              href={siteConfig.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              class="group relative flex items-center justify-center w-14 h-14 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="GitHub"
            >
              <div class="i-mdi-github text-2xl group-hover:rotate-12 transition-transform duration-300" />
              <span class="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs font-medium transition-opacity duration-300">GitHub</span>
            </a>
            <a 
              href={siteConfig.links.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              class="group relative flex items-center justify-center w-14 h-14 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-500"
              aria-label="LinkedIn"
            >
              <div class="i-mdi-linkedin text-2xl group-hover:rotate-12 transition-transform duration-300" />
              <span class="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs font-medium transition-opacity duration-300">LinkedIn</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
