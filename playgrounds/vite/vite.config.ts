import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const projectRootDir = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },

  plugins: [VueRouter(), vue()],

  resolve: {
    alias: {
      'lost-ui-utils/components': resolve(projectRootDir, '../../packages/lost-ui-utils/src/components.ts'),
      'lost-ui-utils/utils': resolve(projectRootDir, '../../packages/lost-ui-utils/src/utils.ts'),
      'lost-ui-utils': resolve(projectRootDir, '../../packages/lost-ui-utils/src/index.ts'),
      '@': resolve(__dirname, './src'),
    },
  },
})
