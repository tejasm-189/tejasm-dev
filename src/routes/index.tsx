import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Container } from "~/components/layout/Container";
import { Hero } from "~/components/home/Hero";
import { BackgroundEffects } from "~/components/effects/BackgroundEffects";
import { Reveal } from "~/components/effects/Reveal";
import { GlassCard } from "~/components/effects/GlassCard";
import { lazy, Suspense } from "solid-js";

// Lazy load heavy components
const BentoGrid = lazy(() => import("~/components/home/BentoGrid"));
const ParticleAnimation = lazy(() => import("~/components/effects/ParticleAnimation"));
const ScrollTypography = lazy(() => import("~/components/effects/ScrollTypography"));
const SkillsConstellation = lazy(() => import("~/components/effects/SkillsConstellation"));

export default function Home() {
  return (
    <>
      <BackgroundEffects enableGradient enableDots />
      <Header />
      <main class="min-h-screen relative">
        <Container>
          <Hero />
        </Container>
          
        {/* Interactive Particle Animation - Section 2 from HOME_PAGE_VISION.md */}
        <Suspense fallback={<div class="h-96 flex items-center justify-center"><div class="animate-pulse text-gray-400">Loading animation...</div></div>}>
          <ParticleAnimation />
        </Suspense>
        
        <Container>
          {/* Floating Bento Grid Showcase - Section 3 from HOME_PAGE_VISION.md */}
          <Suspense fallback={<div class="h-96 flex items-center justify-center"><div class="animate-pulse text-gray-400">Loading showcase...</div></div>}>
            <BentoGrid />
          </Suspense>
        </Container>

        {/* Scroll-Triggered Typography Animation - Section 4 from HOME_PAGE_VISION.md */}
        <Suspense fallback={<div class="h-32 flex items-center justify-center"><div class="animate-pulse text-gray-400">Loading typography...</div></div>}>
          <ScrollTypography 
            text="Building Digital Experiences That Inspire"
            subtitle="Combining cutting-edge technology with thoughtful design to create memorable user experiences that stand the test of time."
            animationType="slide"
          />
        </Suspense>

        {/* Animated Skills Constellation - Section 7 from HOME_PAGE_VISION.md */}
        <Suspense fallback={<div class="h-96 flex items-center justify-center"><div class="animate-pulse text-gray-400">Loading skills...</div></div>}>
          <SkillsConstellation />
        </Suspense>

        <Container>
          {/* Recent Posts Preview */}
          <section class="py-16">
            <Reveal>
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-3xl font-bold">Recent Posts</h2>
                <a href="/blog" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors" aria-label="View all blog posts">
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
