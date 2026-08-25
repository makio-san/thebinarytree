import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const here = import.meta.dirname

// Library build. `npm run dev` also uses this config and serves ./index.html (the demo).
export default defineConfig({
  resolve: {
    alias: { 'the-binary-tree': resolve(here, 'src/index.ts') },
  },
  build: {
    target: 'es2020',
    sourcemap: true,
    lib: {
      entry: resolve(here, 'src/index.ts'),
      name: 'BinaryTree',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'the-binary-tree.js' : 'the-binary-tree.umd.cjs'),
      cssFileName: 'the-binary-tree',
    },
    rollupOptions: {
      external: ['three'],
      output: { globals: { three: 'THREE' } },
    },
  },
  plugins: [
    // Per-file declarations rather than a single bundled .d.ts: bundling needs
    // @microsoft/api-extractor, and `dist/index.d.ts` re-exports everything
    // anyway, which is what package.json points at.
    dts({ include: ['src'], tsconfigPath: './tsconfig.json' }),
  ],
})
