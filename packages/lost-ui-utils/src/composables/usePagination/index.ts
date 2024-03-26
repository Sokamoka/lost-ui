import { computed, ref, toValue } from 'vue'
import type { ComputedRef, MaybeRef, MaybeRefOrGetter, Ref } from 'vue'
import { noop } from '@vueuse/core'

export interface usePaginationOptions {
  itemsPerPage?: MaybeRef<number>
  defaultPage?: MaybeRef<number>
  siblingCount?: number
  update?: (page: number) => void
}

export interface usePaginationReturn<T> {
  state: ComputedRef<T[]>
  page: Ref<number>
  range: ComputedRef<number[]>
  totalPage: ComputedRef<number>
  goTo: (page: number) => void
  pageStep: (page: number) => void
}

export function usePagination<T>(
  items: MaybeRefOrGetter<T[]>,
  {
    defaultPage,
    siblingCount = 5,
    itemsPerPage = 10,
    update = noop,
  }: usePaginationOptions,
): usePaginationReturn<T> {
  const page = ref(defaultPage || 1)

  const totalItems = computed(() => {
    return toValue(items).length
  })

  const totalPage = computed(() =>
    Math.ceil(totalItems.value / toValue(itemsPerPage)),
  )

  const range = computed(() => {
    const rangeLength = toValue(siblingCount) * 2 + 1
    const range = Array.from({ length: totalPage.value }, (_, i) => i + 1)
    const minus = Math.floor(rangeLength / 2)

    let startIndex = Math.max(page.value - minus, 0)
    if (startIndex + rangeLength >= totalPage.value)
      startIndex = Math.max(totalPage.value - rangeLength, 0)

    return range.slice(startIndex, startIndex + rangeLength)
  })

  const pageStep = (v: number) => {
    const _page = page.value + v
    if (validPage(_page)) {
      page.value = _page
      update(_page)
    }
  }

  const goTo = (_page: number) => {
    if (validPage(_page)) {
      update(_page)
      page.value = _page
    }
  }

  function validPage(page: number) {
    return page <= totalPage.value && page > 0
  }

  const state = computed<T[]>(() => {
    if (!toValue(itemsPerPage))
      return toValue(items)
    const startIndex = (page.value - 1) * toValue(itemsPerPage)
    const endIndex = startIndex + toValue(itemsPerPage)
    return toValue(items).slice(startIndex, endIndex)
  })

  return {
    state,
    page,
    range,
    totalPage,
    goTo,
    pageStep,
  }
}