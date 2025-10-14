import { onMount, onCleanup } from "solid-js";
import { usePrefersReducedMotion } from "~/lib/usePrefersReducedMotion";

/**
 * 🎨 PARTICLE ANIMATION COMPONENT
 * 
 * Learning Concepts:
 * 1. Canvas API - Drawing graphics in the browser
 * 2. requestAnimationFrame - Smooth 60fps animations
 * 3. Mouse tracking - Interactive experiences
 * 4. Particle systems - Creating organic movement
 * 5. Performance optimization - Efficient rendering
 * 6. Accessibility - Respecting prefers-reduced-motion
 */

interface Particle {
  x: number;
  y: number;
  vx: number;     // velocity X
  vy: number;     // velocity Y
  size: number;
  color: string;
  opacity: number;
}

export default function ParticleAnimation() {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  let canvasRef: HTMLCanvasElement | undefined;
  let particles: Particle[] = [];
  let mouseX = 0;
  let mouseY = 0;
  let animationFrameId: number;

  /**
   * 🎨 Color Palette
   * Using your brand colors: Blue → Purple → Pink
   */
  const colors = [
    'rgba(59, 130, 246, 0.8)',   // Blue
    'rgba(139, 92, 246, 0.8)',   // Purple  
    'rgba(236, 72, 153, 0.8)',   // Pink
  ];

  /**
   * 🎯 Initialize Particles
   * Creates random particles across the canvas
   */
  const createParticles = (width: number, height: number) => {
    particles = [];
    // Create ~100 particles (adjust for performance)
    const particleCount = Math.min(100, Math.floor((width * height) / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Slow, random velocity for organic movement
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
  };

  /**
   * 🎭 Animation Loop
   * This runs 60 times per second (60fps)
   */
  const animate = () => {
    const canvas = canvasRef;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas with fade effect for trails
    ctx.fillStyle = 'rgba(17, 24, 39, 0.1)'; // Dark with transparency
    ctx.fillRect(0, 0, width, height);

    // Update and draw each particle
    particles.forEach((particle, index) => {
      // 🎯 Mouse Interaction
      // Calculate distance from particle to mouse
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;

      // Repel particles when mouse is close
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        particle.vx -= (dx / distance) * force * 0.5;
        particle.vy -= (dy / distance) * force * 0.5;
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      // Add damping (slow down over time)
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Keep within bounds
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      // 🎨 Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();

      // 🔗 Draw connections between nearby particles
      particles.forEach((otherParticle, otherIndex) => {
        if (index < otherIndex) { // Avoid drawing twice
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only connect if close enough
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            // Line opacity based on distance (closer = more visible)
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - distance / 100) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
    });

    ctx.globalAlpha = 1; // Reset alpha

    // Continue animation loop
    animationFrameId = requestAnimationFrame(animate);
  };

  /**
   * 📏 Handle Canvas Resize
   * Ensures canvas always fits the container
   */
  const handleResize = () => {
    const canvas = canvasRef;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    // Set canvas size to match container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Recreate particles for new size
    createParticles(canvas.width, canvas.height);
  };

  /**
   * 🖱️ Track Mouse Position
   * Updates global mouse coordinates for particle interaction
   */
  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  };

  /**
   * 🎬 Initialization
   * Sets up canvas and starts animation when component mounts
   */
  onMount(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      // Show static particles instead
      handleResize();
      const canvas = canvasRef;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Draw static particles (no animation)
          ctx.fillStyle = 'rgba(17, 24, 39, 1)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
          });
        }
      }
      return; // Exit early, no animation
    }

    handleResize();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    onCleanup(() => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    });
  });

  return (
    <section class="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        class="absolute inset-0 w-full h-full"
      />
      
      {/* Content overlay */}
      <div class="relative z-10 flex items-center justify-center h-full">
        <div class="text-center px-4">
          <h2 class="text-5xl md:text-7xl font-bold text-white mb-6 animate-in fade-in duration-1000">
            Building the{" "}
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Future
            </span>
          </h2>
          <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Interactive experiences that captivate and inspire
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
