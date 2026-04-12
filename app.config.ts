import { defineConfig } from "@solidjs/start/config";
import UnoCSS from 'unocss/vite';

export default defineConfig({
  vite: {
    plugins: [
      UnoCSS() as any, // Type compatibility with Vite plugin system
    ],
    build: {
      chunkSizeWarningLimit: 500,
    },
    optimizeDeps: {
      // Pre-bundle common dependencies for faster cold starts
      include: ["solid-js", "@solidjs/router"],
    },
  },
});
