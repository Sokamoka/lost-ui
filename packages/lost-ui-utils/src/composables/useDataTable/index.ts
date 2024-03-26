import { computed, unref } from 'vue'
import type { ComputedRef, MaybeRef } from 'vue'
import { isEmpty } from 'lodash-es'
import { SortDirection, useSort } from '../useSort'
import { usePagination, type usePaginationOptions, type usePaginationReturn } from '../usePagination'
import type { SortObject, SortOrders } from '../useSort'

export interface UseDataTableOptions<T = any> extends usePaginationOptions {
  data: MaybeRef<T[]>
  columns: MaybeRef<ColumnsModel>
  initialSort?: SortObject
  locale?: string
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
  sortOrders?: SortOrders[]
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
  const { columns, data, initialSort, locale = 'en', itemsPerPage = 0, defaultPage = 1, siblingCount = 2 } = options

  const { state, sort, change } = useSort<Pick<UseDataTableOptions, 'data'>>(data, { initialSort, locale })

  const pagination = usePagination<Pick<UseDataTableOptions, 'data'>>(state, {
    itemsPerPage,
    defaultPage,
    siblingCount,
  })

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

  return {
    ...pagination,
    columnModel,
  }
}
