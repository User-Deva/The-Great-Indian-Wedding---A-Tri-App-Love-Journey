import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@great-indian-wedding/theme-engine': path.resolve(__dirname, '../../packages/theme-engine/src'),
      '@great-indian-wedding/auth': path.resolve(__dirname, '../../packages/auth/src'),
      '@great-indian-wedding/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@great-indian-wedding/our-story': path.resolve(__dirname, '../../packages/our-story/src'),
      '@great-indian-wedding/mock-backend': path.resolve(__dirname, '../../packages/mock-backend/src'),
    },
  },
});
