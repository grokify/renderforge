import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LitNavbar',
      fileName: () => 'lit-navbar.js',
      formats: ['iife'],
    },
    // Bundle everything for standalone CDN usage
    // Lit is included in the bundle
    minify: true,
    sourcemap: true,
  },
});
