import path from 'path';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    {
      name: 'emit-social-preview',
      apply: 'build',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'docs/portfolio-home.png',
          source: readFileSync(path.resolve(__dirname, 'docs/portfolio-home.png')),
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
