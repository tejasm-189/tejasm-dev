import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Container } from "~/components/layout/Container";
import { siteConfig } from "~/lib/config";
import { BackgroundEffects } from "~/components/effects/BackgroundEffects";
import { Reveal } from "~/components/effects/Reveal";
import { GlassCard } from "~/components/effects/GlassCard";

export default function About() {
  return (
    <>
      <BackgroundEffects enableGradient enableDots />
      <Header />
      <main class="min-h-screen py-16 relative">
        <Container>
          {/* Hero Section with Profile Image */}
          <div class="max-w-4xl mx-auto">
            <div class="flex flex-col md:flex-row items-center gap-12 mb-16">
              {/* Profile Image */}
              <Reveal>
                <div class="relative group">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div class="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/images/tejas.jpg"
                      alt="Tejas M"
                      width="809"
                      height="1037"
                      class="w-full h-full object-cover"
                      decoding="async"
                    />
                  </div>
                </div>
              </Reveal>

              {/* Bio Section */}
              <div class="flex-1 text-center md:text-left">
                <Reveal delay={100}>
                  <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                    About Me
                  </h1>
                </Reveal>
                <Reveal delay={150}>
                  <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    Full-stack developer passionate about building secure applications and exploring cryptography.
                  </p>
                </Reveal>

                {/* Social Links */}
                <Reveal delay={200}>
                  <div class="flex gap-3 justify-center md:justify-start mb-6 flex-wrap">
                    <a 
                      href={siteConfig.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-800 dark:hover:border-white"
                      aria-label="GitHub"
                    >
                      <div class="i-simple-icons-github text-lg text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-300" />
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                    </a>
                    <a 
                      href={siteConfig.links.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-600 dark:hover:border-blue-500"
                      aria-label="LinkedIn"
                    >
                      <div class="i-simple-icons-linkedin text-lg text-blue-600 dark:text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</span>
                    </a>
                    <a 
                      href={siteConfig.links.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-900 dark:hover:border-gray-100"
                      aria-label="X (Twitter)"
                    >
                      <div class="i-simple-icons-x text-lg text-gray-900 dark:text-gray-100 group-hover:rotate-12 transition-transform duration-300" />
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">X</span>
                    </a>
                    <a 
                      href={siteConfig.links.threads} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-900 dark:hover:border-gray-100"
                      aria-label="Threads"
                    >
                      <div class="i-simple-icons-threads text-lg text-gray-900 dark:text-gray-100 group-hover:rotate-12 transition-transform duration-300" />
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Threads</span>
                    </a>
                  </div>
                </Reveal>

                {/* Schedule a Call CTA */}
                {siteConfig.calendar.display && (
                  <Reveal delay={250}>
                    <a
                      href={siteConfig.calendar.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group inline-flex items-center gap-2 border border-gray-300/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 rounded-full px-3 py-2 text-sm transition-all duration-300 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:bg-blue-500/5 dark:hover:bg-blue-400/5 hover:shadow-md"
                      style={{ "backdrop-filter": "blur(8px)" }}
                    >
                      <div class="w-6 h-6 rounded-full bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
                        <div class="i-mdi-calendar text-sm text-blue-600 dark:text-blue-400" />
                      </div>
                      <span class="font-medium text-gray-700 dark:text-gray-300">
                        Schedule a call
                      </span>
                      <div class="i-mdi-chevron-right text-sm text-gray-500 dark:text-gray-500 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </a>
                  </Reveal>
                )}
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div class="max-w-3xl mx-auto">

            {/* Content Sections */}
            <div class="space-y-12">
              <Reveal delay={200}>
                <GlassCard class="p-8">
                  <h2 class="text-2xl font-bold mb-4">Background</h2>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  I'm a software developer with a deep interest in cybersecurity and cryptography. My journey in tech
                  has been driven by curiosity about how systems work and how to make them more secure. I love exploring
                  the intersection of technology and security, from building secure web applications to understanding
                  cryptographic algorithms.
                </p>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                  This website serves as my digital space where I share insights on software development, cybersecurity
                  concepts, cryptography, and the latest trends in secure application development.
                </p>
                </GlassCard>
              </Reveal>

              <Reveal delay={300}>
                <GlassCard class="p-8">
                  <h2 class="text-2xl font-bold mb-4">What I Do</h2>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    I specialize in building secure web applications and exploring cryptographic concepts. My work focuses on
                    implementing security best practices, understanding encryption algorithms, and developing applications
                    that prioritize both functionality and security. I believe in using modern web technologies while
                    maintaining a strong focus on security principles.
                  </p>
                </GlassCard>
              </Reveal>

              <Reveal delay={400}>
                <GlassCard class="p-8">
                  <h2 class="text-2xl font-bold mb-4">Tech Stack</h2>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  This website is built with cutting-edge technologies:
                </p>
                <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                  <li class="flex items-center gap-2">
                    <div class="i-mdi-check text-green-600" />
                    <strong>SolidJS</strong> - Ultra-fast reactive UI framework
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="i-mdi-check text-green-600" />
                    <strong>SolidStart</strong> - Meta-framework for SolidJS
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="i-mdi-check text-green-600" />
                    <strong>UnoCSS</strong> - Instant atomic CSS engine
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="i-mdi-check text-green-600" />
                    <strong>Vite</strong> - Lightning-fast build tool
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="i-mdi-check text-green-600" />
                    <strong>TypeScript</strong> - Type-safe JavaScript
                  </li>
                </ul>
                </GlassCard>
              </Reveal>

              <Reveal delay={500}>
                <GlassCard class="p-8">
                  <h2 class="text-2xl font-bold mb-4">Get in Touch</h2>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Feel free to reach out if you want to collaborate on a project, have questions, or just want to say hi!
                </p>
                <div class="flex gap-4">
                  <a 
                    href={siteConfig.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="btn-primary"
                  >
                    <div class="i-mdi-github inline-block mr-2" />
                    GitHub
                  </a>
                  <a 
                    href={siteConfig.links.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="btn-secondary"
                  >
                    <div class="i-mdi-linkedin inline-block mr-2" />
                    LinkedIn
                  </a>
                </div>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
