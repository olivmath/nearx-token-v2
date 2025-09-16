import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8000,
    host: true
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      external: []
    }
  },
  define: {
    global: 'globalThis'
  }
});
