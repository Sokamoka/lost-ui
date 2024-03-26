import { shallowRef, toValue, watch } from 'vue'
import { SortDirection } from '../useSort'
import type { SortOrders } from '../useSort'

export function useSortBy<T extends SortOrders>(data: any[], targets: T[]) {
  const _data = shallowRef([])
  const collator = new Intl.Collator('en')

  function sort() {
    return toValue(_data).slice().sort((a, b) => {
      let comparison = 0
      for (const { target, direction } of targets) {
        const aValue = a[target]
        const bValue = b[target]

        comparison = collator.compare(aValue, bValue)
        if (comparison !== 0)
          return direction === SortDirection.ASCEND ? comparison : -comparison
      }
      return comparison
    })
  }

  watch(data, (data) => {
    _data.value = data
  })

  watch(targets, sort)

  return _data
}
