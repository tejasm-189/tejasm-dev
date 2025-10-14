import { createSignal, onMount } from "solid-js";

/**
 * REDUCED MOTION HOOK
 * 
 * Detects if user prefers reduced motion for accessibility.
 * Used to disable or simplify animations for users who:
 * - Have motion sensitivity
 * - Experience motion sickness
 * - Have vestibular disorders
 * - Are using older hardware
 * 
 * WCAG 2.1 Guideline 2.3.3 (AAA): Animation from Interactions
 * Users should be able to disable non-essential motion/animations.
 * 
 * How to use:
 * ```tsx
 * const prefersReducedMotion = usePrefersReducedMotion();
 * 
 * // Conditionally disable animations
 * if (!prefersReducedMotion()) {
 *   // Run animations
 * }
 * ```
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = createSignal(false);

  onMount(() => {
    // Check if browser supports prefers-reduced-motion
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes (user might toggle setting while page is open)
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange);
  });

  return prefersReducedMotion;
}

/**
 * EDUCATIONAL NOTES:
 * 
 * What is prefers-reduced-motion?
 * - CSS media query: @media (prefers-reduced-motion: reduce)
 * - JavaScript API: window.matchMedia("(prefers-reduced-motion: reduce)")
 * - User setting in OS accessibility preferences
 * 
 * When should you respect it?
 * - Large motion animations (parallax, scroll effects)
 * - Rapid blinking/flashing
 * - Auto-playing videos
 * - Continuous animations
 * - 3D transforms and rotations
 * 
 * What to keep:
 * - Hover effects (user-initiated)
 * - Page transitions (minimal)
 * - Loading indicators (essential feedback)
 * - Simple fades (less jarring)
 * 
 * Best Practices:
 * 1. Don't remove all motion - reduce it
 * 2. Keep user-initiated animations
 * 3. Replace motion with instant state changes
 * 4. Test with motion disabled in OS settings
 * 
 * Browser Support:
 * - Chrome 74+ (April 2019)
 * - Firefox 63+ (October 2018)
 * - Safari 10.1+ (March 2017)
 * - Edge 79+ (January 2020)
 * - Excellent coverage: ~95% of users
 */
