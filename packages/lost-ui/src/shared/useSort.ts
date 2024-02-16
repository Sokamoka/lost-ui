import { reactive } from 'vue'
import { createMachine } from '@xstate/fsm'

export enum SortOrders {
  SORT_STATE_ASCEND = 'ascend',
  SORT_STATE_DESCEND = 'descend',
  SORT_STATE_ORIGINAL = 'original',
}

export interface OrdersObject {
  target: string
  direction: SortOrders
}

export interface SortObject {
  sortTarget?: string | null
  orders?: OrdersObject[]
}

const sortMachine = createMachine({
  id: 'sort',
  initial: SortOrders.SORT_STATE_ORIGINAL,
  states: {
    [SortOrders.SORT_STATE_ORIGINAL]: {
      on: {
        DIRECTION1: SortOrders.SORT_STATE_DESCEND,
        DIRECTION2: SortOrders.SORT_STATE_ASCEND,
      },
    },
    [SortOrders.SORT_STATE_DESCEND]: {
      on: {
        DIRECTION1: SortOrders.SORT_STATE_ASCEND,
        DIRECTION2: SortOrders.SORT_STATE_ORIGINAL,
      },
    },
    [SortOrders.SORT_STATE_ASCEND]: {
      on: {
        DIRECTION1: SortOrders.SORT_STATE_ORIGINAL,
        DIRECTION2: SortOrders.SORT_STATE_DESCEND,
      },
    },
  },
})

export function useSort(sortParams: SortObject = {}) {
  const { sortTarget = null, orders = [] } = sortParams
  const sort = reactive({ sortTarget, orders })

  const change = ({ sortTarget = null, orders = [] }: SortObject) => {
    // console.log({ sortTarget, orders })
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

  return {
    sort,
    change,
  }
}

function transitionOrderState(originalSortState: string, sortState: string) {
  const direction
    = sortState === SortOrders.SORT_STATE_ASCEND ? 'DIRECTION2' : 'DIRECTION1'
  return sortMachine.transition(originalSortState, direction).value
}
