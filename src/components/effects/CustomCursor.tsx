import { createSignal, onMount, onCleanup, For } from "solid-js";

/**
 * CUSTOM CURSOR COMPONENT - Section 11 from HOME_PAGE_VISION.md
 * 
 * A custom cursor with smooth following trail effect that replaces the default cursor.
 * Creates a premium, award-worthy feel by adding subtle interactivity.
 * 
 * LEARNING OBJECTIVES:
 * 1. Mouse Event Tracking - Capturing and using mouse position
 * 2. Smooth Following Animation - Delayed position updates for organic movement
 * 3. CSS Cursor Control - Hiding default cursor and showing custom
 * 4. Trail Effect - Multiple cursor dots that follow with increasing delay
 * 5. Performance Optimization - Using requestAnimationFrame efficiently
 * 6. Accessibility - Respecting user's motion preferences
 * 
 * KEY CONCEPTS:
 * 
 * Smooth Following (Easing):
 * - Instead of instantly moving to mouse position, we interpolate
 * - newPos = currentPos + (targetPos - currentPos) * easingFactor
 * - Lower easingFactor (0.1-0.2) = smoother, more delayed
 * - Higher easingFactor (0.5-1.0) = snappier, immediate
 * 
 * Trail Effect:
 * - Multiple cursor elements following the same path
 * - Each has a slightly higher delay than the previous
 * - Creates organic, flowing motion
 * 
 * RequestAnimationFrame:
 * - Syncs with browser repaint cycle (60fps)
 * - More efficient than setInterval
 * - Automatically pauses when tab is hidden
 */

interface TrailDot {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export function CustomCursor() {
  // Current mouse position (target for cursor to follow)
  const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });
  
  // Actual cursor position (smoothly follows mouse)
  const [cursorPos, setCursorPos] = createSignal({ x: 0, y: 0 });
  
  // Trail dots that follow the main cursor
  const [trail, setTrail] = createSignal<TrailDot[]>([]);
  
  // Hover state (makes cursor larger on interactive elements)
  const [isHovering, setIsHovering] = createSignal(false);
  
  // Visibility (hide cursor when not moving or outside window)
  const [isVisible, setIsVisible] = createSignal(true);

  /**
   * Number of trail dots (fewer = better performance, more = smoother trail)
   * 5-8 is a good balance for visual effect vs. performance
   */
  const TRAIL_LENGTH = 6;

  /**
   * Easing factor for smooth following
   * Lower = smoother but more laggy (0.05-0.15 recommended)
   * Higher = snappier but less smooth (0.2-0.5)
   */
  const EASE_FACTOR = 0.15;

  /**
   * Initialize trail dots at center of screen
   */
  const initializeTrail = () => {
    const initialTrail: TrailDot[] = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      initialTrail.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        scale: 1 - (i * 0.15), // Each dot slightly smaller
        opacity: 1 - (i * 0.15) // Each dot slightly more transparent
      });
    }
    setTrail(initialTrail);
  };

  onMount(() => {
    // Check if user prefers reduced motion (accessibility)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Don't show custom cursor if user prefers reduced motion
      return;
    }

    // Initialize trail
    initializeTrail();

    let animationFrameId: number;

    /**
     * MOUSE MOVE HANDLER
     * 
     * Updates target position when mouse moves.
     * The actual cursor position will smoothly interpolate to this.
     */
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    /**
     * MOUSE LEAVE HANDLER
     * 
     * Hide cursor when mouse leaves window
     */
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    /**
     * MOUSE OVER HANDLER
     * 
     * Detect when hovering over interactive elements (links, buttons)
     * Makes cursor larger to indicate interactivity
     */
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    /**
     * ANIMATION LOOP
     * 
     * Runs every frame (60fps) to smoothly update cursor position.
     * Uses easing for organic, delayed following effect.
     * 
     * How it works:
     * 1. Calculate difference between current and target position
     * 2. Move a fraction (EASE_FACTOR) of that distance
     * 3. Update trail dots to follow previous positions
     * 4. Repeat next frame
     */
    const animate = () => {
      const mouse = mousePos();
      const current = cursorPos();

      // Calculate new position with easing
      const newX = current.x + (mouse.x - current.x) * EASE_FACTOR;
      const newY = current.y + (mouse.y - current.y) * EASE_FACTOR;

      setCursorPos({ x: newX, y: newY });

      // Update trail: each dot follows the one in front of it
      setTrail(prevTrail => {
        const newTrail = [...prevTrail];
        
        // First dot follows main cursor
        newTrail[0] = {
          ...newTrail[0],
          x: newTrail[0].x + (newX - newTrail[0].x) * (EASE_FACTOR * 0.7),
          y: newTrail[0].y + (newY - newTrail[0].y) * (EASE_FACTOR * 0.7)
        };

        // Subsequent dots follow previous dot
        for (let i = 1; i < newTrail.length; i++) {
          newTrail[i] = {
            ...newTrail[i],
            x: newTrail[i].x + (newTrail[i - 1].x - newTrail[i].x) * (EASE_FACTOR * 0.6),
            y: newTrail[i].y + (newTrail[i - 1].y - newTrail[i].y) * (EASE_FACTOR * 0.6)
          };
        }

        return newTrail;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrameId = requestAnimationFrame(animate);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    /**
     * CLEANUP
     * 
     * Remove event listeners and cancel animation frame.
     * Critical for preventing memory leaks!
     */
    onCleanup(() => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    });
  });

  return (
    <>
      {/**
       * CUSTOM CURSOR STYLES
       * 
       * Hide default cursor and show custom cursor
       * Uses CSS to hide system cursor on body
       */}
      <style>
        {`
          body {
            cursor: none !important;
          }
          
          * {
            cursor: none !important;
          }

          /* Show default cursor on mobile/touch devices */
          @media (hover: none) and (pointer: coarse) {
            body, * {
              cursor: auto !important;
            }
          }

          /* Respect reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            body, * {
              cursor: auto !important;
            }
          }
        `}
      </style>

      {/**
       * CURSOR ELEMENTS
       * 
       * Rendered in a fixed position container that follows mouse.
       * Uses transform for GPU-accelerated performance.
       */}
      <div
        class={`
          fixed top-0 left-0 pointer-events-none z-9999
          transition-opacity duration-300
          ${isVisible() ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          // Hide on mobile/touch devices
          display: window.matchMedia('(hover: none) and (pointer: coarse)').matches ? 'none' : 'block'
        }}
      >
        {/* Trail dots (render behind main cursor) */}
        <For each={trail()}>
          {(dot, index) => (
            <div
              class="absolute rounded-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 backdrop-blur-sm"
              style={{
                left: `${dot.x}px`,
                top: `${dot.y}px`,
                width: `${12 * dot.scale}px`,
                height: `${12 * dot.scale}px`,
                transform: 'translate(-50%, -50%)',
                opacity: dot.opacity * 0.6,
                transition: 'width 0.3s ease, height 0.3s ease'
              }}
            />
          )}
        </For>

        {/* Main cursor dot */}
        <div
          class={`
            absolute rounded-full
            bg-gradient-to-br from-blue-500 to-purple-600
            shadow-lg shadow-purple-500/50
            transition-all duration-300 ease-out
            ${isHovering() ? 'scale-150' : 'scale-100'}
          `}
          style={{
            left: `${cursorPos().x}px`,
            top: `${cursorPos().y}px`,
            width: '16px',
            height: '16px',
            transform: 'translate(-50%, -50%)',
            'mix-blend-mode': 'screen' // Blend mode for glow effect
          }}
        >
          {/* Inner white dot for contrast */}
          <div class="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full opacity-80" />
        </div>

        {/* Outer ring (appears on hover) */}
        {isHovering() && (
          <div
            class="absolute rounded-full border-2 border-blue-500/50 animate-ping"
            style={{
              left: `${cursorPos().x}px`,
              top: `${cursorPos().y}px`,
              width: '40px',
              height: '40px',
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </div>
    </>
  );
}

/**
 * EDUCATIONAL NOTES:
 * 
 * Smooth Following Math:
 * - Linear interpolation (lerp): newPos = current + (target - current) * factor
 * - factor = 0.15 means we move 15% of the distance each frame
 * - At 60fps, this creates smooth organic motion
 * - Lower factor = more delay/smoothness
 * - Higher factor = less delay/snappier
 * 
 * Trail Implementation:
 * - Array of positions, each following the previous
 * - First dot follows cursor
 * - Second dot follows first dot
 * - Third dot follows second dot, etc.
 * - Each with slightly more delay (lower ease factor)
 * - Creates cascading "snake-like" motion
 * 
 * Performance Considerations:
 * 1. Use transform instead of left/top (GPU accelerated)
 * 2. RequestAnimationFrame syncs with display refresh
 * 3. Pointer-events: none prevents cursor from blocking clicks
 * 4. Fixed position keeps cursor in viewport
 * 5. Hide on mobile (touch devices don't need custom cursor)
 * 
 * Accessibility:
 * 1. Respect prefers-reduced-motion
 * 2. Hide on touch devices (no mouse)
 * 3. Scale up on hover for visual feedback
 * 4. High contrast for visibility
 * 
 * Browser Compatibility:
 * - Works in all modern browsers
 * - CSS `cursor: none` supported everywhere
 * - RequestAnimationFrame widely supported
 * - Gracefully falls back on older browsers
 * 
 * Customization Ideas:
 * - Change colors based on page section
 * - Add particles that spawn from cursor
 * - Make cursor pulse on click
 * - Add text labels on hover
 * - Distort elements near cursor (magnetic effect)
 */
