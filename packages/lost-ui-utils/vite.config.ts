import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// const projectRootDir = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: 'tsconfig.build.json',
    cleanVueFileName: true,
    exclude: ['src/test/**'],
  }), viteStaticCopy({
    targets: [
      {
        src: resolve(__dirname, '../../README.md'),
        dest: resolve(__dirname, './dist'),
      },
    ],
  })],
  build: {
    lib: {
      name: 'lost-ui-utils',
      entry: [resolve(__dirname, 'src/index.ts'), resolve(__dirname, 'src/components.ts')],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library (Vue)
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
