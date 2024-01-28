import { defineConfig } from 'vite';

export default defineConfig({
  // other configurations...
  build: {
    outDir: '..',
    rollupOptions: {
      external: ['/Code-Cuisine/assets/index-7lWHG-jy.js'],
    },
  },
  base: '/Code-Cuisine/',
});
