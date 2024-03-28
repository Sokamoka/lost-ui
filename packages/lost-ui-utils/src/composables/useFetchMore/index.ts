import { noop } from '@vueuse/core'
import { computed, shallowRef, toValue, watch } from 'vue'
import type { MaybeRef, Ref } from 'vue'

export interface UseFetchMoreOptions {
  skip: Ref<number>
  limit?: MaybeRef<number>
  total: MaybeRef<number>
  onUpdate?: (skip: number) => void
}

export function useFetchMore<T>(state: MaybeRef<T[]>, options: UseFetchMoreOptions) {
  const { skip, limit = 10, total, onUpdate = noop } = options
  const _state = shallowRef<T[]>([])

  watch(state, (state) => {
    _state.value = [..._state.value, ...toValue(state)]
  })

  const isActive = computed(() => _state.value.length < toValue(total))

  function fetchMore() {
    if (!isActive.value)
      return
    skip.value = skip.value + toValue(limit)
    onUpdate?.(skip.value)
  }

  return {
    state: _state,
    isActive,
    fetchMore,
  }
}
