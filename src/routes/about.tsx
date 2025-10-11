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
          {/* Hero Section */}
          <div class="max-w-3xl mx-auto">
            <Reveal>
              <h1 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                About Me
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p class="text-xl text-gray-600 dark:text-gray-400 mb-12">
                Full-stack developer passionate about building secure applications and exploring cryptography.
              </p>
            </Reveal>

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
