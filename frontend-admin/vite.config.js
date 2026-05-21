import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  base: '/admin',
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
    jsxInject: `import { h, Fragment } from '/src/core/h'`,
    jsxFragment: 'Fragment',
    jsx: 'transform',
    jsxDev: false,
  },
});
