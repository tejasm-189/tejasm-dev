import { onMount } from "solid-js";

interface BackgroundEffectsProps {
  enableGradient?: boolean;
  enableDots?: boolean;
  enableGrid?: boolean;
}

export function BackgroundEffects(props: BackgroundEffectsProps) {
  const {
    enableGradient = true,
    enableDots = true,
    enableGrid = false,
  } = props;

  return (
    <>
      {/* Animated Gradient Background */}
      {enableGradient && (
        <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Primary gradient orb */}
          <div 
            class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"
          />
          
          {/* Secondary gradient orb */}
          <div 
            class="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse-medium"
          />
          
          {/* Tertiary gradient orb */}
          <div 
            class="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 dark:from-blue-600/15 dark:to-cyan-600/15 rounded-full blur-3xl animate-pulse-fast"
          />
        </div>
      )}

      {/* Dot Pattern */}
      {enableDots && (
        <div 
          class="fixed inset-0 -z-10 pointer-events-none opacity-30 dark:opacity-20 bg-dots"
        />
      )}

      {/* Grid Pattern */}
      {enableGrid && (
        <div 
          class="fixed inset-0 -z-10 pointer-events-none opacity-10 dark:opacity-5 bg-grid"
        />
      )}
    </>
  );
}
