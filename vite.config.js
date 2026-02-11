import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/portfolio/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'url-extractor': resolve(__dirname, 'projects/url-extractor/index.html'),
        'docweb': resolve(__dirname, 'projects/docweb/index.html'),
        'blog-url-extractor': resolve(__dirname, 'blog/why-i-built-url-extractor/index.html'),
        'blog-parsing-sitemaps': resolve(__dirname, 'blog/parsing-sitemaps-at-scale/index.html'),
        'blog-developing-docweb': resolve(__dirname, 'blog/developing-docweb/index.html'),
        'blog-beyond-documentation': resolve(__dirname, 'blog/beyond-documentation/index.html'),
        'utm-shield': resolve(__dirname, 'projects/utm-shield/index.html'),
        'blog-utm-tracking': resolve(__dirname, 'blog/why-utm-tracking-breaks/index.html'),
      },
    },
  },
})
