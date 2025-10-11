import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss';

/**
 * UnoCSS Configuration
 * 
 * UnoCSS is an instant on-demand atomic CSS engine.
 * It's like Tailwind CSS but faster and more flexible!
 * 
 * Benefits:
 * - 200x faster than Tailwind
 * - Built-in icon support
 * - Smaller bundle size
 * - Same utility-first approach
 */
export default defineConfig({
  // Presets - Pre-configured rule sets
  presets: [
    // Default preset with Tailwind-compatible utilities
    presetUno(),
    
    // Icon preset - Use any icon from Iconify
    // Usage: <div className="i-carbon-star" />
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    
    // Web fonts preset
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter',
        mono: 'Fira Code',
      },
    }),
  ],

  // Custom shortcuts (reusable class combinations)
  shortcuts: {
    // Layout shortcuts
    'container-custom': 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    
    // Button shortcuts
    'btn': 'px-4 py-2 rounded-lg font-medium transition-colors',
    'btn-primary': 'btn bg-blue-600 text-white hover:bg-blue-700',
    'btn-secondary': 'btn border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
    
    // Card shortcut
    'card': 'border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900',
  },

  // Theme customization
  theme: {
    colors: {
      // You can add custom colors here
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
    },
  },

  // Rules - Custom utility classes
  rules: [
    // Example: Custom utility
    // ['custom-class', { color: 'red' }],
  ],

  // Safelist - Always include these classes even if not used
  safelist: [
    // Add classes that are dynamically generated
    // 'text-blue-600',
  ],
});
