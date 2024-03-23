import { computed, unref } from 'vue'
import type { MaybeRef, Ref } from 'vue'
import { noop } from '@vueuse/core'

export interface usePaginationOptions {
  totalItems: number
  currentPage: Ref<number>
  rangeLength?: number
  itemsPerPage?: MaybeRef<number>
  update: (page: number) => void
}

export function usePagination({
  totalItems,
  currentPage,
  rangeLength = 5,
  itemsPerPage = 20,
  update = noop,
}: usePaginationOptions) {
  const pageCount = computed(() =>
    Math.ceil(unref(totalItems) / unref(itemsPerPage)),
  )

  const range = computed(() => {
    const page = unref(currentPage) - 1
    const range = Array.from({ length: pageCount.value }, (_, i) => i + 1)
    const minus = Math.floor(rangeLength / 2)

    let startIndex = Math.max(page - minus, 0)
    if (startIndex + rangeLength >= pageCount.value)
      startIndex = Math.max(pageCount.value - rangeLength, 0)

    return range.slice(startIndex, startIndex + rangeLength)
  })

  const pageStep = (v: number) => {
    const page = unref(currentPage) + v
    if (validPage(page))
      update(page)
  }

  const goTo = (page: number) => {
    if (validPage(page))
      update(page)
  }

  function validPage(page: number) {
    return page <= pageCount.value && page > 0
  }

  return {
    page: currentPage,
    range,
    pageCount,
    goTo,
    pageStep,
  }
}
