import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: './', // GitHub Pages için relative path
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // Gemini ile ilgili tanımlar kaldırıldı
      define: {},
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'animation-vendor': ['framer-motion'],
              'icons-vendor': ['lucide-react']
            }
          }
        }
      }
    };
});
