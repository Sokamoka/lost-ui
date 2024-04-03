import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, reactive, toValue } from 'vue'
import { createMachine } from '@xstate/fsm'
import { noop } from '@vueuse/core'
import { sortBy } from '../../utils'

export enum SortDirection {
  ASCEND = 'ascend',
  DESCEND = 'descend',
  ORIGINAL = 'original',
}

export interface SortOrders {
  target: string
  direction: SortDirection
}

export interface SortObject {
  sortTarget: string | null
  orders: SortOrders[]
}

export interface useSortOptions {
  locale?: string
  initialSort?: SortObject
  external?: boolean
  onUpdated?: (params: SortObject) => void
}

export interface useSortReturn<T> {
  state: ComputedRef<T[]>
  sort: SortObject
  change: (params: SortObject) => void
}

const sortMachine = createMachine({
  id: 'sort',
  initial: SortDirection.ORIGINAL,
  states: {
    [SortDirection.ORIGINAL]: {
      on: {
        DIRECTION1: SortDirection.DESCEND,
        DIRECTION2: SortDirection.ASCEND,
      },
    },
    [SortDirection.DESCEND]: {
      on: {
        DIRECTION1: SortDirection.ASCEND,
        DIRECTION2: SortDirection.ORIGINAL,
      },
    },
    [SortDirection.ASCEND]: {
      on: {
        DIRECTION1: SortDirection.ORIGINAL,
        DIRECTION2: SortDirection.DESCEND,
      },
    },
  },
})

export function useSort<T>(data: MaybeRefOrGetter<T[]>, options: useSortOptions = {}): useSortReturn<T> {
  const { initialSort = {}, locale, external = false, onUpdated = noop } = options
  const { sortTarget = null, orders = [] } = initialSort as SortObject

  const sort = reactive({ sortTarget, orders })

  const change = ({ sortTarget = null, orders = [] }: SortObject) => {
    if (sort.sortTarget !== sortTarget) {
      sort.sortTarget = sortTarget
      sort.orders = orders
      onUpdated(sort)
      return
    }
    const nextOrders = orders.map((order, index) => ({
      ...order,
      direction: transitionOrderState(
        sort.orders[index].direction,
        order.direction,
      ),
    })) as SortOrders[]

    sort.sortTarget = sortTarget
    sort.orders = nextOrders
    onUpdated(sort)
  }

  const state = computed(() => {
    const _data = toValue(data)
    if (external)
      return _data
    if (!sort.sortTarget)
      return _data
    if (sort.orders[0].direction === SortDirection.ORIGINAL)
      return _data
    return sortBy(_data, sort.orders, { locale })
  })

  return {
    state,
    sort,
    change,
  }
}

function transitionOrderState(originalSortState: string, sortState: string) {
  const direction
    = sortState === SortDirection.ASCEND ? 'DIRECTION2' : 'DIRECTION1'
  return sortMachine.transition(originalSortState, direction).value
}
