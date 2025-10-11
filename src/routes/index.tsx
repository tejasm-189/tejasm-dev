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
          
          {/* Featured Section with Reveal Animations */}
          <section class="py-16">
            <Reveal>
              <h2 class="text-3xl font-bold mb-8 text-center">What I Do</h2>
            </Reveal>
            <div class="grid md:grid-cols-3 gap-6">
              <Reveal delay={100}>
                <GlassCard hover class="p-6">
                  <div class="text-4xl mb-4 text-blue-600 dark:text-blue-400">
                    <div class="i-mdi-code-braces" />
                  </div>
                  <h3 class="text-xl font-semibold mb-2">Development</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Building modern web applications with cutting-edge technologies and best practices.
                  </p>
                </GlassCard>
              </Reveal>

              <Reveal delay={200}>
                <GlassCard hover class="p-6">
                  <div class="text-4xl mb-4 text-purple-600 dark:text-purple-400">
                    <div class="i-mdi-speedometer" />
                  </div>
                  <h3 class="text-xl font-semibold mb-2">Performance</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Optimizing applications for speed and efficiency to deliver the best user experience.
                  </p>
                </GlassCard>
              </Reveal>

              <Reveal delay={300}>
                <GlassCard hover class="p-6">
                  <div class="text-4xl mb-4 text-green-600 dark:text-green-400">
                    <div class="i-mdi-lightbulb-on" />
                  </div>
                  <h3 class="text-xl font-semibold mb-2">Problem Solving</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Tackling complex challenges with creative solutions and innovative approaches.
                  </p>
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
