import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content/main.js'),
      },
      output: {
        entryFileNames: '[name].js',
        // This is the crucial fix. It finds any CSS asset emitted by the build
        // and forces its name to be 'main.css', matching the manifest.
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'main.css';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
  publicDir: 'public',
});
