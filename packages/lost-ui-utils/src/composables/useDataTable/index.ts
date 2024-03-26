import { computed, unref } from 'vue'
import type { ComputedRef, MaybeRef } from 'vue'
import { isEmpty } from 'lodash-es'
import { sortBy } from 'lost-ui-utils/utils'
import { SortDirection, useSort } from '../useSort'
import { usePagination, type usePaginationOptions, type usePaginationReturn } from '../usePagination'
import type { OrdersObject, SortObject } from '../useSort'

export interface UseDataTableOptions<T = any> extends usePaginationOptions {
  data: MaybeRef<T[]>
  columns: MaybeRef<ColumnsModel>
  initialSort?: SortObject
}

export interface UseDataTableReturn extends usePaginationReturn<Pick<UseDataTableOptions, 'data'>> {
  columnModel: ComputedRef<ConvertedColumnModel[]>
}

export interface ColumnModel {
  title: string
  headerClass?: string
  headerData: { [key: string]: any }
  cellClass?: string
  rowClass?: string
  sortOrders?: OrdersObject[]
}

export interface ColumnsModel {
  [key: string]: ColumnModel
}

export interface ConvertedColumnModel {
  title: ColumnModel['title']
  key: number
  prop: string
  header: {
    headerClass: string
    headerData: ColumnModel['headerData']
    isActive: boolean
    isSortAsc: boolean
    isSortDesc: boolean
    isSortOrigi: boolean
    isSortable: boolean
    direction: SortDirection
    event: { click: () => void }
  }
  row: { rowClass: ColumnModel['rowClass'] }
  cell: { isActive: boolean, cellClass: ColumnModel['cellClass'] }
}

export function useDataTable(options: UseDataTableOptions): UseDataTableReturn {
  const { columns, data, initialSort, itemsPerPage = 0, defaultPage = 1, siblingCount = 2 } = options

  const { sort, change } = useSort(initialSort)

  const columnModel = computed(() => {
    const rawColumns = unref(columns)
    return Object.keys(rawColumns).map((key, index) => {
      const { title, headerClass, headerData, sortOrders, rowClass, ...attrs }
        = rawColumns[key] as ColumnModel

      const isActive = sort.orders[0]?.target === key
      const isSortable = !isEmpty(sortOrders)

      return {
        title,
        key: index,
        prop: key,
        header: {
          headerClass,
          headerData,
          isActive,
          isSortable,
          isSortAsc: isActive && sort.orders[0]?.direction === SortDirection.ASCEND,
          isSortDesc: isActive && sort.orders[0]?.direction === SortDirection.DESCEND,
          isSortOrigi: isActive && sort.orders[0]?.direction === SortDirection.ORIGINAL,
          direction: sort.orders[0]?.direction ?? null,
          event: { click: isSortable ? () => change({ sortTarget: key, orders: sortOrders } as SortObject) : undefined },
        },
        row: { rowClass },
        cell: { isActive, ...attrs },
      } as ConvertedColumnModel
    })
  })

  const sortedModel = computed(() => {
    if (!sort.sortTarget)
      return unref(data)
    if (sort.orders[0].direction === SortDirection.ORIGINAL)
      return unref(data)
    return sortBy(sort.orders, unref(data))
  })

  const pagination = usePagination<Pick<UseDataTableOptions, 'data'>>(sortedModel, {
    itemsPerPage,
    defaultPage,
    siblingCount,
  })

  return {
    ...pagination,
    columnModel,
  }
}
