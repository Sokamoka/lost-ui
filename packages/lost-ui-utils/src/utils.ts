import { SortDirection } from './composables/useSort'
import type { OrdersObject } from './composables/useSort'

export function sortBy(data: any[], targets: OrdersObject[]) {
  const collator = new Intl.Collator('en')

  return data.slice().sort((a, b) => {
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
