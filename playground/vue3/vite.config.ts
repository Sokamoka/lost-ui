import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

const projectRootDir = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },

  plugins: [VueRouter(), vue(), UnoCSS()],

  resolve: {
    alias: {
      'lost-ui/utils': resolve(projectRootDir, '../../packages/lost-ui/src/utils.ts'),
      'lost-ui': resolve(projectRootDir, '../../packages/lost-ui/src/index.ts'),
      "@": resolve(__dirname, "./src"),
    },
  },
})
