import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

const projectRootDir = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],

  resolve: {
    alias: {
      'lost-ui': resolve(projectRootDir, '../../packages/lost-ui/src/index.ts'),
    },
  },
})
