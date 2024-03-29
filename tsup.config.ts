
import { defineConfig } from 'tsup'

export default defineConfig({
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  entryPoints: ['src/server.ts'],
})