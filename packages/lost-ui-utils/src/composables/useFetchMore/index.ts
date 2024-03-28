import { noop } from '@vueuse/core'
import { computed, ref, shallowRef, toValue, watch } from 'vue'
import type { ComputedRef, MaybeRef, ShallowRef } from 'vue'

export interface UseFetchMoreOptions {
  limit?: MaybeRef<number>
  total: MaybeRef<number>
  onUpdate?: (skip: number, limit: number) => void
}

export interface UseFetchMoreReturn<T> {
  state: ShallowRef<T[]>
  isActive: ComputedRef<boolean>
  fetchMore: () => void
}

export function useFetchMore<T>(state: MaybeRef<T[]>, options: UseFetchMoreOptions): UseFetchMoreReturn<T> {
  const { limit = 10, total, onUpdate = noop } = options

  const skip = ref(0)
  const _state = shallowRef<T[]>([])

  watch(state, (state) => {
    _state.value = [..._state.value, ...toValue(state)]
  })

  const isActive = computed(() => _state.value.length <= toValue(total))

  function fetchMore() {
    if (!isActive.value)
      return
    skip.value = skip.value + toValue(limit)
    onUpdate?.(skip.value, toValue(limit))
  }

  return {
    state: _state,
    isActive,
    fetchMore,
  }
}
