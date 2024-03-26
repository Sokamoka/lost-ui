import { defineComponent, h, onUnmounted, ref } from 'vue'
import type { RenderableComponent, UseIntersectionObserverOptions } from '@vueuse/core'
import { useIntersectionObserver } from '@vueuse/core'

export interface FetchMoreObserverProps extends RenderableComponent {
  options?: UseIntersectionObserverOptions
}

export const FetchMoreObserver = defineComponent<FetchMoreObserverProps>({
  name: 'FetchMoreObserver',

  props: ['as', 'options'] as unknown as undefined,

  emits: ['intersect'],

  setup(props, { slots, emit }) {
    const target = ref(null)

    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting)
          emit('intersect')
      },
      props.options,
    )

    onUnmounted(stop)

    return () => {
      if (slots.default)
        return h(props.as || 'div', { ref: target }, slots.default())
    }
  },
})
