import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export default defineConfig({
  define: {
    __CARD_VERSION__: JSON.stringify(pkg.version)
  },
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.ts',
      name: 'HaGithubCard',
      fileName: () => 'ha-github-card.js',
      formats: ['es']
    },
    rollupOptions: {
      external: [],
      output: {
        format: 'es',
        entryFileNames: 'ha-github-card.js',
        dir: '.',
        inlineDynamicImports: true
      }
    },
    sourcemap: true,
    minify: true
  },
  esbuild: {
    target: 'esnext',
    format: 'esm'
  }
});
