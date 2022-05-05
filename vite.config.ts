import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
