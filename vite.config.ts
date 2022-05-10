import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

import manifest from './manifest.config';

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    assetsDir: '',
  },
});
