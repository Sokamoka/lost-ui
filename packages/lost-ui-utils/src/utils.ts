import { SortDirection } from './composables/useSort'
import type { OrdersObject } from './composables/useSort'

export function sortBy(targets: OrdersObject[], array: any[]) {
  const collator = new Intl.Collator('en')

  return array.slice().sort((a, b) => {
    let comparison = 0
    for (const target of targets) {
      const aValue = a[target.target]
      const bValue = b[target.target]

      comparison = collator.compare(aValue, bValue)
      if (comparison !== 0)
        return target.direction === SortDirection.ASCEND ? comparison : -comparison
    }
    return comparison
  })
}
