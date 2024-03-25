import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const projectRootDir = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: 'tsconfig.build.json',
    cleanVueFileName: true,
    exclude: ['src/test/**'],
  })],
  resolve: {
    alias: {
      'lost-ui-utils/utils': resolve(projectRootDir, 'src/utils.ts'),
    },
  },
  build: {
    lib: {
      name: 'lost-ui-utils',
      entry: [resolve(__dirname, 'src/index.ts'), resolve(__dirname, 'src/utils.ts')],
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
