import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(), // Tailwind-compatible utilities
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
    presetAttributify(),
  ],
  
  transformers: [
    transformerDirectives(),
  ],

  shortcuts: {
    // Button shortcuts
    'btn': 'px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer',
    'btn-primary': 'btn bg-blue-600 text-white hover:bg-blue-700',
    'btn-secondary': 'btn border border-gray-300 hover:bg-gray-50',
    
    // Layout shortcuts
    'card': 'border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900',
    'container-custom': 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
  },

  theme: {
    colors: {
      primary: '#3b82f6',
    },
  },
});
