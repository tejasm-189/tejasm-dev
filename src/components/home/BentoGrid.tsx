import { createSignal, For, onMount, JSX } from "solid-js";
import { usePrefersReducedMotion } from "~/lib/usePrefersReducedMotion";

/**
 * BENTO GRID COMPONENT - Section 3 from HOME_PAGE_VISION.md
 * 
 * A modern bento-style grid layout inspired by award-winning design (Alche Studio).
 * Features asymmetric sizing, 3D tilt effects, and animated gradient borders.
 * 
 * LEARNING OBJECTIVES:
 * 1. CSS Grid with custom layout patterns (grid-template-areas, grid-row/col-span)
 * 2. 3D CSS Transforms (perspective, rotateX, rotateY)
 * 3. Mouse tracking for interactive 3D tilt effect
 * 4. CSS Custom Properties (CSS Variables) for dynamic values
 * 5. Animated gradient borders using pseudo-elements
 */

// Interface for each bento card item
interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon: string; // UnoCSS icon class
  color: string; // Color theme (blue, purple, green, pink, orange)
  size: "small" | "medium" | "large"; // Determines grid span
  tags: string[];
  metric?: string; // Achievement metric (e.g., "60fps", "100% Uptime")
}

export function BentoGrid() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = usePrefersReducedMotion();

  // Data for the bento cards
  const items: BentoItem[] = [
    {
      id: "dev",
      title: "Full-Stack Development",
      description: "Building modern web applications with cutting-edge technologies and best practices.",
      icon: "i-mdi-code-braces",
      color: "blue",
      size: "large",
      tags: ["React", "SolidJS", "TypeScript", "Node.js"],
      metric: "10+ Projects"
    },
    {
      id: "perf",
      title: "Performance Optimization",
      description: "Optimizing applications for speed and efficiency to deliver the best user experience.",
      icon: "i-mdi-speedometer",
      color: "purple",
      size: "medium",
      tags: ["SSR", "Caching", "Bundle Optimization"],
      metric: "60fps Smooth"
    },
    {
      id: "ai",
      title: "AI & Problem Solving",
      description: "Leveraging AI effectively to tackle complex challenges with creative solutions.",
      icon: "i-mdi-lightbulb-on",
      color: "green",
      size: "medium",
      tags: ["Algorithms", "Design", "Innovation"],
      metric: "100% Accuracy"
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      description: "Deploying and maintaining scalable infrastructure with CI/CD automation.",
      icon: "i-mdi-cloud-outline",
      color: "pink",
      size: "small",
      tags: ["AWS", "Docker", "GitHub Actions"],
      metric: "99.9% Uptime"
    },
    {
      id: "design",
      title: "UI/UX Design",
      description: "Crafting beautiful and intuitive user interfaces with modern design principles.",
      icon: "i-mdi-palette-outline",
      color: "orange",
      size: "small",
      tags: ["Figma", "Animation", "Accessibility"],
      metric: "Award-Worthy"
    }
  ];

  /**
   * 3D TILT EFFECT LOGIC
   * 
   * This creates a realistic 3D tilt effect based on mouse position.
   * The card rotates on both X and Y axes as if it's a physical object.
   * 
   * Accessibility: Respects prefers-reduced-motion by skipping the tilt effect.
   * Note: 3D tilt is considered user-initiated (requires hover), so it's generally
   * acceptable even with reduced motion, but we simplify it here to be extra cautious.
   * 
   * How it works:
   * 1. Track mouse position relative to card center
   * 2. Calculate rotation angles based on mouse offset
   * 3. Apply CSS transform with perspective
   * 4. Reset on mouse leave
   */
  const handleMouseMove = (e: MouseEvent, cardRef: HTMLDivElement) => {
    // Skip 3D tilt if user prefers reduced motion
    if (prefersReducedMotion()) return;

    const card = cardRef;
    const rect = card.getBoundingClientRect();
    
    // Get mouse position relative to card center
    const x = e.clientX - rect.left; // X position within the element
    const y = e.clientY - rect.top;  // Y position within the element
    
    // Calculate center point
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angles (limit to ±10 degrees for subtle effect)
    const rotateX = ((y - centerY) / centerY) * -10; // Negative for natural tilt
    const rotateY = ((x - centerX) / centerX) * 10;
    
    // Apply transform with perspective for 3D effect
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (cardRef: HTMLDivElement) => {
    // Skip reset if user prefers reduced motion (nothing to reset)
    if (prefersReducedMotion()) return;

    // Reset transform with smooth transition
    cardRef.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  /**
   * SIZE MAPPING
   * 
   * Bento grids use asymmetric sizing for visual interest.
   * This creates a more dynamic, magazine-style layout.
   */
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2"; // 2x2 on desktop
      case "medium":
        return "md:col-span-2 md:row-span-1"; // 2x1 on desktop
      case "small":
        return "md:col-span-1 md:row-span-1"; // 1x1 on desktop
      default:
        return "";
    }
  };

  /**
   * COLOR THEME MAPPING
   * 
   * Each card has a unique color theme that affects:
   * - Icon color
   * - Hover gradient
   * - Border gradient
   * - Tag colors
   */
  const getColorClasses = (color: string) => {
    const themes: Record<string, any> = {
      blue: {
        icon: "text-blue-600 dark:text-blue-400",
        gradient: "group-hover:from-blue-600/10 group-hover:to-purple-600/10",
        border: "before:bg-gradient-to-r before:from-blue-600 before:to-purple-600",
        tag: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
      },
      purple: {
        icon: "text-purple-600 dark:text-purple-400",
        gradient: "group-hover:from-purple-600/10 group-hover:to-pink-600/10",
        border: "before:bg-gradient-to-r before:from-purple-600 before:to-pink-600",
        tag: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
      },
      green: {
        icon: "text-green-600 dark:text-green-400",
        gradient: "group-hover:from-green-600/10 group-hover:to-teal-600/10",
        border: "before:bg-gradient-to-r before:from-green-600 before:to-teal-600",
        tag: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
      },
      pink: {
        icon: "text-pink-600 dark:text-pink-400",
        gradient: "group-hover:from-pink-600/10 group-hover:to-rose-600/10",
        border: "before:bg-gradient-to-r before:from-pink-600 before:to-rose-600",
        tag: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
      },
      orange: {
        icon: "text-orange-600 dark:text-orange-400",
        gradient: "group-hover:from-orange-600/10 group-hover:to-amber-600/10",
        border: "before:bg-gradient-to-r before:from-orange-600 before:to-amber-600",
        tag: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
      }
    };
    return themes[color] || themes.blue;
  };

  return (
    <section class="py-20">
      {/* Section Header with Section Marker (Alche Studio style) */}
      <div class="text-center mb-16 relative">
        <div class="text-xs font-mono text-gray-400 dark:text-gray-600 mb-4 tracking-widest">
          SERVICES_IN
        </div>
        <h2 class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          What I Do
        </h2>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Crafting digital experiences that move hearts and spark innovation.
        </p>
      </div>

      {/**
       * BENTO GRID LAYOUT
       * 
       * CSS Grid with automatic placement and responsive behavior.
       * - Mobile: Single column
       * - Desktop: 3-column grid with varying row/col spans
       * 
       * Key CSS properties:
       * - grid-auto-rows: minmax(200px, auto) - ensures minimum height
       * - gap: spacing between cards
       * - col-span and row-span: control card size
       */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
        <For each={items}>
          {(item) => {
            let cardRef: HTMLDivElement | undefined;
            const colorTheme = getColorClasses(item.color);

            return (
              <div
                ref={cardRef}
                class={`
                  group relative overflow-hidden
                  bg-white dark:bg-gray-800/50
                  backdrop-blur-sm
                  rounded-2xl
                  p-6 md:p-8
                  transition-all duration-500
                  cursor-pointer
                  ${getSizeClasses(item.size)}
                  ${colorTheme.gradient}
                  
                  // Animated gradient border using pseudo-element
                  before:absolute before:inset-0
                  before:rounded-2xl
                  before:p-[2px]
                  ${colorTheme.border}
                  before:opacity-0
                  before:transition-opacity
                  before:duration-500
                  group-hover:before:opacity-100
                  before:-z-10
                  before:animate-gradient
                  
                  // Glass effect
                  border border-gray-200/50 dark:border-gray-700/50
                  shadow-lg hover:shadow-2xl
                  
                  // Transform origin for 3D tilt
                  transform-gpu
                  will-change-transform
                `}
                onMouseMove={(e) => cardRef && handleMouseMove(e, cardRef)}
                onMouseLeave={() => cardRef && handleMouseLeave(cardRef)}
                style={{
                  transition: "transform 0.3s ease-out, box-shadow 0.3s ease"
                }}
              >
                {/* Content */}
                <div class="relative z-10 h-full flex flex-col">
                  {/* Achievement Metric Badge */}
                  {item.metric && (
                    <div class="absolute top-0 right-0 px-3 py-1 text-xs font-bold bg-gradient-to-r from-gray-900/80 to-gray-800/80 dark:from-gray-100/80 dark:to-gray-200/80 text-white dark:text-gray-900 rounded-full backdrop-blur-sm">
                      {item.metric}
                    </div>
                  )}

                  {/* Icon */}
                  <div class={`text-5xl md:text-6xl mb-4 md:mb-6 ${colorTheme.icon} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <div class={item.icon} />
                  </div>

                  {/* Title */}
                  <h3 class="text-xl md:text-2xl font-bold mb-3 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base mb-4 flex-grow">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div class="flex flex-wrap gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    <For each={item.tags}>
                      {(tag) => (
                        <span class={`px-3 py-1 text-xs font-medium rounded-full ${colorTheme.tag}`}>
                          {tag}
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            );
          }}
        </For>
      </div>

      {/* Bottom section marker */}
      <div class="text-xs font-mono text-gray-400 dark:text-gray-600 mt-16 text-center tracking-widest">
        SERVICES_OUT
      </div>
    </section>
  );
}
