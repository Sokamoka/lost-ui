import { useTimeoutFn } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { ref, watch } from 'vue'

export interface UseLazyLoadingStateOptions {
  delay?: number
}

export function useLazyLoadingState(loadingState: MaybeRefOrGetter, options?: UseLazyLoadingStateOptions) {
  const { delay = 200 } = options || {}
  const isLazyLoading = ref(false)

  const { start, stop } = useTimeoutFn(() => {
    isLazyLoading.value = true
  }, delay, { immediate: false })

  watch(loadingState, (state) => {
    if (state)
      return start()
    stop()
    isLazyLoading.value = false
  })

  return isLazyLoading
}
