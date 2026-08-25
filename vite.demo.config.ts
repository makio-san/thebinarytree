import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const here = import.meta.dirname

// Standalone build of the demo page (the "Computer Tree" explorer).
export default defineConfig({
  base: './',
  resolve: {
    alias: { 'computer-tree': resolve(here, 'src/index.ts') },
  },
  build: {
    target: 'es2020',
    outDir: 'dist-demo',
    emptyOutDir: true,
    sourcemap: false,
    // three.js is ~600 kB on its own and there is nothing to code split here:
    // the page needs the renderer before it can draw anything at all.
    chunkSizeWarningLimit: 800,
  },
})
