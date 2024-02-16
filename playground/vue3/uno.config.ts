// uno.config.ts
import { defineConfig, presetIcons, presetUno, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
  ],
})
