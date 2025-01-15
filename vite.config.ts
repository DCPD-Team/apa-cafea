import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import eslint from '@nabla/vite-plugin-eslint';
import path from 'path';

export default defineConfig({
  plugins: [react(), checker({ typescript: true }), eslint()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: 'http://localhost:4000',
    port: 4000,
  },
});
