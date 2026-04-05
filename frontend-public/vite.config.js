import { defineConfig } from 'vite'

export default defineConfig({
  base: '/public',
  server: {
    proxy: {
      '/apiv1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/apiv1/teachers/lessons': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxInject: `import { h } from '/src/core/h.js'`,
  },
})
