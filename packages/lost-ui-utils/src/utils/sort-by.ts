import { SortDirection } from '../composables/useSort'
import type { SortOrders } from '../composables/useSort'

export interface SortByOptions {
  locale?: string
}

export function sortBy<T>(data: T[], targets: SortOrders[], options: SortByOptions = {}): T[] {
  const { locale = 'en' } = options
  const collator = new Intl.Collator(locale, { numeric: true })

  return data.slice().sort((a: T, b: T) => {
    let comparison = 0
    for (const target of targets) {
      const aValue = a[target.target as keyof T] as string
      const bValue = b[target.target as keyof T] as string

      if (typeof aValue === 'number' && typeof bValue === 'number')
        comparison = aValue < bValue ? -1 : 1
      else
        comparison = collator.compare(aValue, bValue)

      if (comparison !== 0)
        return target.direction === SortDirection.ASCEND ? comparison : -comparison
    }
    return comparison
  })
}
