import { toValue } from 'vue'
import { SortDirection } from '../useSort'
import type { OrdersObject } from '../useSort'

export function useSortBy<T extends OrdersObject>(targets: T[], data: any[]) {
  const collator = new Intl.Collator('en')

  return toValue(data).slice().sort((a, b) => {
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
