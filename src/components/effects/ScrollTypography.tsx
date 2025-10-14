import { onMount, onCleanup, createSignal } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "~/lib/usePrefersReducedMotion";

/**
 * SCROLL-TRIGGERED TYPOGRAPHY ANIMATION - Section 4 from HOME_PAGE_VISION.md
 * 
 * This component creates cinematic text reveal animations triggered by scroll position.
 * Characters appear one by one with staggered timing as the user scrolls.
 * 
 * LEARNING OBJECTIVES:
 * 1. GSAP ScrollTrigger - Trigger animations based on scroll position
 * 2. Text splitting - Break text into individual characters for animation
 * 3. Stagger animations - Delay each character's animation for sequential effect
 * 4. Timeline control - Orchestrate multiple animations together
 * 5. Scroll-linked progress - Sync animation progress with scroll position
 * 
 * KEY CONCEPTS:
 * 
 * GSAP (GreenSock Animation Platform):
 * - Industry-standard animation library used by award-winning sites
 * - Performant, works with CSS transforms (GPU-accelerated)
 * - Better than CSS transitions for complex sequences
 * 
 * ScrollTrigger Plugin:
 * - Triggers animations when elements enter/leave viewport
 * - Can scrub animations (tie progress to scroll position)
 * - Handles all scroll calculations and performance optimization
 * 
 * Text Splitting:
 * - Break text into <span> elements for each character
 * - Allows independent animation of each character
 * - Creates the "typewriter" or "wave" reveal effect
 */

// Register ScrollTrigger plugin with GSAP
// This must be done before using ScrollTrigger features
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTypographyProps {
  text: string;
  subtitle?: string;
  animationType?: "fade" | "slide" | "scale" | "rotate";
}

export function ScrollTypography(props: ScrollTypographyProps) {
  let containerRef: HTMLDivElement | undefined;
  let textRef: HTMLHeadingElement | undefined;
  let subtitleRef: HTMLParagraphElement | undefined;

  // Check if user prefers reduced motion
  const prefersReducedMotion = usePrefersReducedMotion();

  /**
   * TEXT SPLITTING FUNCTION
   * 
   * Converts a string into individual <span> elements for each character.
   * Each span gets an inline style for the animation initial state.
   * 
   * Why wrap in spans?
   * - HTML treats text as a single block by default
   * - We need individual elements to animate separately
   * - Each span becomes an animation target
   */
  const splitTextIntoChars = (element: HTMLElement) => {
    const text = element.textContent || "";
    element.innerHTML = ""; // Clear original text
    
    // Split text into characters and create span for each
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char; // Preserve spaces with non-breaking space
      span.style.display = "inline-block"; // Needed for transforms to work
      
      // Initial state based on animation type
      const animType = props.animationType || "fade";
      switch (animType) {
        case "fade":
          span.style.opacity = "0";
          break;
        case "slide":
          span.style.opacity = "0";
          span.style.transform = "translateY(50px)";
          break;
        case "scale":
          span.style.opacity = "0";
          span.style.transform = "scale(0)";
          break;
        case "rotate":
          span.style.opacity = "0";
          span.style.transform = "rotateX(90deg)";
          break;
      }
      
      element.appendChild(span);
    });
    
    return element.children; // Return all span elements
  };

  onMount(() => {
    if (!textRef) return;

    // If user prefers reduced motion, skip all animations and show text immediately
    if (prefersReducedMotion()) {
      // Make text visible without animation
      if (textRef) textRef.style.opacity = "1";
      if (subtitleRef && props.subtitle) subtitleRef.style.opacity = "1";
      return;
    }

    // Split text into animatable characters
    const chars = splitTextIntoChars(textRef);

    /**
     * GSAP ANIMATION WITH SCROLLTRIGGER
     * 
     * gsap.to(targets, properties):
     * - targets: Elements to animate
     * - properties: CSS properties to animate to (end state)
     * 
     * scrollTrigger object:
     * - trigger: Element that triggers the animation when scrolled into view
     * - start: When to start ("top 80%" = when element's top hits 80% down the viewport)
     * - end: When to end
     * - scrub: Tie animation progress to scroll position (true = smooth)
     * - markers: Show visual debugging markers (remove in production)
     * 
     * stagger:
     * - Delay between each element's animation
     * - 0.03 = 30ms delay between each character
     * - Creates the sequential reveal effect
     */
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef,
        start: "top 80%", // Start when top of element hits 80% down viewport
        end: "top 20%",   // End when top of element hits 20% down viewport
        scrub: 1,         // Smooth scrubbing (1 second delay for smoothness)
        // markers: true, // Uncomment to see trigger points (debugging)
      }
    });

    // Animate characters based on type
    const animType = props.animationType || "fade";
    switch (animType) {
      case "fade":
        timeline.to(chars, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.03, // 30ms delay between each character
          ease: "power2.out"
        });
        break;
      case "slide":
        timeline.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "back.out(1.7)" // Slight overshoot effect
        });
        break;
      case "scale":
        timeline.to(chars, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "elastic.out(1, 0.5)" // Bouncy effect
        });
        break;
      case "rotate":
        timeline.to(chars, {
          opacity: 1,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power3.out"
        });
        break;
    }

    // Animate subtitle if provided
    if (subtitleRef && props.subtitle) {
      timeline.from(subtitleRef, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3"); // Start 0.3s before previous animation ends (overlap)
    }

    /**
     * CLEANUP
     * 
     * Important: Always clean up ScrollTrigger instances!
     * - Prevents memory leaks
     * - Removes scroll event listeners
     * - ScrollTrigger creates multiple listeners that need cleanup
     */
    onCleanup(() => {
      timeline.kill(); // Stop the timeline
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all triggers
    });
  });

  return (
    <section 
      ref={containerRef}
      class="py-32 relative overflow-hidden"
    >
      {/* Background gradient for visual interest */}
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-900/10" />
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-5xl mx-auto text-center">
          {/* Section marker (Alche Studio style) */}
          <div class="text-xs font-mono text-gray-400 dark:text-gray-600 mb-8 tracking-widest">
            MISSION_IN
          </div>

          {/* Main animated text */}
          <h2 
            ref={textRef}
            class="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            style={{
              perspective: "1000px", // Needed for 3D rotations
              "perspective-origin": "center"
            }}
          >
            {props.text}
          </h2>

          {/* Subtitle (optional) */}
          {props.subtitle && (
            <p 
              ref={subtitleRef}
              class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              {props.subtitle}
            </p>
          )}

          {/* Section marker */}
          <div class="text-xs font-mono text-gray-400 dark:text-gray-600 mt-16 tracking-widest">
            MISSION_OUT
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * USAGE EXAMPLES:
 * 
 * Basic fade-in:
 * <ScrollTypography 
 *   text="Building the Future" 
 *   animationType="fade"
 * />
 * 
 * With subtitle and slide effect:
 * <ScrollTypography 
 *   text="Innovation Through Code" 
 *   subtitle="Creating digital experiences that inspire and delight"
 *   animationType="slide"
 * />
 * 
 * Bouncy scale effect:
 * <ScrollTypography 
 *   text="Transform Ideas Into Reality" 
 *   animationType="scale"
 * />
 * 
 * 3D rotate effect:
 * <ScrollTypography 
 *   text="Award-Worthy Design" 
 *   animationType="rotate"
 * />
 * 
 * PERFORMANCE TIPS:
 * 
 * 1. Use transform/opacity - GPU accelerated
 * 2. Keep stagger values small (0.02-0.05s optimal)
 * 3. Use scrub for scroll-linked animations (smoother)
 * 4. Always cleanup ScrollTrigger instances
 * 5. Consider reducing motion for accessibility:
 *    @media (prefers-reduced-motion: reduce) { ... }
 */
