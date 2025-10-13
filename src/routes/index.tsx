import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Container } from "~/components/layout/Container";
import { Hero } from "~/components/home/Hero";
import { BackgroundEffects } from "~/components/effects/BackgroundEffects";
import { Reveal } from "~/components/effects/Reveal";
import { GlassCard } from "~/components/effects/GlassCard";

export default function Home() {
  return (
    <>
      <BackgroundEffects enableGradient enableDots />
      <Header />
      <main class="min-h-screen relative">
        <Container>
          <Hero />
          
          {/* Featured Section with Enhanced Cards */}
          <section class="py-20">
            <Reveal>
              <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  What I Do
                </h2>
                <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Crafting digital experiences with modern technologies and best practices
                </p>
              </div>
            </Reveal>
            <div class="grid md:grid-cols-3 gap-8">
              <Reveal delay={100}>
                <GlassCard hover gradient class="p-8 group">
                  <div class="text-5xl mb-6 text-blue-600 dark:text-blue-400 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <div class="i-mdi-code-braces" />
                  </div>
                  <h3 class="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    Development
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                    Building modern web applications with cutting-edge technologies and best practices.
                  </p>
                  <div class="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span class="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">React</span>
                    <span class="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">SolidJS</span>
                    <span class="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">TypeScript</span>
                  </div>
                </GlassCard>
              </Reveal>

              <Reveal delay={200}>
                <GlassCard hover gradient class="p-8 group">
                  <div class="text-5xl mb-6 text-purple-600 dark:text-purple-400 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <div class="i-mdi-speedometer" />
                  </div>
                  <h3 class="text-2xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    Performance
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                    Optimizing applications for speed and efficiency to deliver the best user experience.
                  </p>
                  <div class="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">Optimization</span>
                    <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">SSR</span>
                  </div>
                </GlassCard>
              </Reveal>

              <Reveal delay={300}>
                <GlassCard hover gradient class="p-8 group">
                  <div class="text-5xl mb-6 text-green-600 dark:text-green-400 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <div class="i-mdi-lightbulb-on" />
                  </div>
                  <h3 class="text-2xl font-bold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    Problem Solving
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                    Tackling complex challenges with creative solutions and innovative approaches using AI to the best.
                  </p>
                  <div class="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span class="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">Algorithms</span>
                    <span class="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">Design</span>
                  </div>
                </GlassCard>
              </Reveal>
            </div>
          </section>

          {/* Recent Posts Preview */}
          <section class="py-16">
            <Reveal>
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-3xl font-bold">Recent Posts</h2>
                <a href="/blog" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
                  View all →
                </a>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <GlassCard class="p-12">
                <div class="text-center text-gray-500 dark:text-gray-400">
                  <div class="text-6xl mb-4 text-gray-300 dark:text-gray-600">
                    <div class="i-mdi-post-outline inline-block" />
                  </div>
                  <p>Blog posts coming soon! Stay tuned for insights and experiences.</p>
                </div>
              </GlassCard>
            </Reveal>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
