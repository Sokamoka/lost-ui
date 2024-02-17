import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SortDirection } from './shared/useSort'
import type { OrdersObject } from './shared/useSort'

export function cm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
