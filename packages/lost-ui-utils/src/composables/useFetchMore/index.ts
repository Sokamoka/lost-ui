import { noop } from '@vueuse/core'
import { computed, ref, shallowRef, toValue, unref, watch } from 'vue'
import type { ComputedRef, MaybeRef, MaybeRefOrGetter, ShallowRef } from 'vue'

export interface UseFetchMoreOptions {
  initialSkip?: MaybeRef<number>
  limit?: MaybeRef<number>
  total: MaybeRef<number>
  onUpdated?: (skip: number, limit: number) => void
}

export interface UseFetchMoreReturn<T> {
  state: ShallowRef<T[]>
  isActive: ComputedRef<boolean>
  fetchMore: () => void
}

export function useFetchMore<T>(state: MaybeRefOrGetter<T[]>, options: UseFetchMoreOptions): UseFetchMoreReturn<T> {
  const { initialSkip = 0, limit = 10, total, onUpdated = noop } = options

  const skip = ref(unref(initialSkip) - unref(limit))
  const _state = shallowRef<T[]>([])

  watch(state, (state) => {
    _state.value = [..._state.value, ...toValue(state)]
  })

  const isActive = computed(() => _state.value.length > 0 && _state.value.length < toValue(total))

  function fetchMore() {
    if (!isActive.value)
      return
    skip.value = skip.value + toValue(limit)
    onUpdated?.(skip.value, toValue(limit))
  }

  return {
    state: _state,
    isActive,
    fetchMore,
  }
}
