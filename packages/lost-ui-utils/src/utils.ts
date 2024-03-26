import { SortDirection } from './composables/useSort'
import type { SortOrders } from './composables/useSort'

export interface SortByOptions {
  locale?: string
}

export function sortBy<T>(data: T[], targets: SortOrders[], options: SortByOptions = {}): T[] {
  const { locale = 'en' } = options
  const collator = new Intl.Collator(locale)

  return data.slice().sort((a: T, b: T) => {
    let comparison = 0
    for (const target of targets) {
      const aValue = a[target.target as keyof T] as string
      const bValue = b[target.target as keyof T] as string

      comparison = collator.compare(aValue, bValue)
      if (comparison !== 0)
        return target.direction === SortDirection.ASCEND ? comparison : -comparison
    }
    return comparison
  })
}
