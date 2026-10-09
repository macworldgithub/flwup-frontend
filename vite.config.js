import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          'data': ['./src/data/store.js'],
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
