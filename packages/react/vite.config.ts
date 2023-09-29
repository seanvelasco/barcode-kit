import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react()
    , dts({ include: ['src'] })],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      name: 'react-barcode-kit',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@zxing/library'],
      output: {
        entryFileNames: '[name].js',
      }
    },
  },
})
