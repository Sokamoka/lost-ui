import type { MaybeRefOrGetter } from 'vue'
import { computed, reactive, toValue } from 'vue'
import { createMachine } from '@xstate/fsm'
import { sortBy } from '../../utils'

export enum SortDirection {
  ASCEND = 'ascend',
  DESCEND = 'descend',
  ORIGINAL = 'original',
}

export interface OrdersObject {
  target: string
  direction: SortDirection
}

export interface SortObject {
  sortTarget?: string | null
  orders?: OrdersObject[]
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

export function useSort<T>(data: MaybeRefOrGetter<T[]>, initialSort: SortObject = {}) {
  const { sortTarget = null, orders = [] } = initialSort
  const sort = reactive({ sortTarget, orders })

  const change = ({ sortTarget = null, orders = [] }: SortObject) => {
    if (sort.sortTarget !== sortTarget) {
      sort.sortTarget = sortTarget
      sort.orders = orders
      return
    }
    const nextOrders = orders.map((order, index) => ({
      ...order,
      direction: transitionOrderState(
        sort.orders[index].direction,
        order.direction,
      ),
    })) as OrdersObject[]

    sort.sortTarget = sortTarget
    sort.orders = nextOrders
  }

  const state = computed(() => {
    const _data = toValue(data)
    if (!sort.sortTarget)
      return _data
    if (sort.orders[0].direction === SortDirection.ORIGINAL)
      return _data
    return sortBy(_data, sort.orders)
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
