import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'url-extractor': resolve(__dirname, 'projects/url-extractor/index.html'),
        'blog-url-extractor': resolve(__dirname, 'blog/why-i-built-url-extractor/index.html'),
      },
    },
  },
})
