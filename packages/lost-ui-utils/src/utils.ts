import { SortDirection } from './composables/useSort'
import type { SortOrders } from './composables/useSort'

export interface SortByOptions {
  locale?: string
}

export function sortBy(data: any[], targets: SortOrders[], options: SortByOptions = {}) {
  const { locale = 'en' } = options
  const collator = new Intl.Collator(locale)

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
