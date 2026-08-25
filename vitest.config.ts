import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

const here = import.meta.dirname

// Separate from vite.config.ts on purpose: the tests exercise the pure geometry
// and data layers, so they should not pay for the declaration-bundling plugin.
export default defineConfig({
  resolve: {
    alias: { 'computer-tree': resolve(here, 'src/index.ts') },
  },
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'node',
    reporters: ['default'],
  },
})
