// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      // HLS.js es una librería grande (~500KB), ajustamos el límite
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Separar librerías grandes en sus propios chunks
          manualChunks: {
            'hls': ['hls.js'],
          },
        },
      },
    },
  },
});
