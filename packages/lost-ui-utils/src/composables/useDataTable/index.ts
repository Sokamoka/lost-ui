import { computed, unref } from 'vue'
import type { ComputedRef, MaybeRef, MaybeRefOrGetter } from 'vue'
import { isEmpty } from 'lodash-es'
import { SortDirection, useSort } from '../useSort'
import { usePagination, type usePaginationOptions, type usePaginationReturn } from '../usePagination'
import type { SortObject, SortOrders } from '../useSort'

export interface UseDataTableOptions<T = any> extends usePaginationOptions {
  data: MaybeRef<T[]>
  columns: MaybeRef<ColumnsModel>
  initialSort?: SortObject
  locale?: string
  total?: MaybeRefOrGetter<number>
  externalSort?: boolean
  externalPagination?: boolean
}

export interface UseDataTableReturn extends usePaginationReturn<Pick<UseDataTableOptions, 'data'>> {
  columnModel: ComputedRef<ConvertedColumnModel[]>
  sort: SortObject | undefined
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
  const {
    columns,
    data,
    initialSort,
    locale = 'en',
    itemsPerPage = 0,
    defaultPage = 1,
    siblingCount = 2,
    total = 0,
    externalSort = false,
    externalPagination = false,
  } = options

  const { state, sort, change } = useSort<Pick<UseDataTableOptions, 'data'>>(data, { initialSort, locale, external: externalSort })

  const pagination = usePagination<Pick<UseDataTableOptions, 'data'>>(state, {
    total,
    defaultPage,
    itemsPerPage,
    siblingCount,
    external: externalPagination,
  })

  const columnModel = computed(() => {
    const rawColumns = unref(columns)
    return Object.keys(rawColumns).map((key, index) => {
      const { title, headerClass, headerData, sortOrders, rowClass, ...attrs }
        = rawColumns[key] as ColumnModel

      const orders = sort.orders?.[0] ?? []
      const isActive = orders.target === key
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
          isSortAsc: isActive && orders.direction === SortDirection.ASCEND,
          isSortDesc: isActive && orders.direction === SortDirection.DESCEND,
          isSortOrigi: isActive && orders.direction === SortDirection.ORIGINAL,
          direction: orders.direction || null,
          event: { click: isSortable ? () => change({ sortTarget: key, orders: sortOrders } as SortObject) : undefined },
        },
        row: { rowClass },
        cell: { isActive, ...attrs },
      } as ConvertedColumnModel
    })
  })

  return {
    ...pagination,
    sort,
    columnModel,
  }
}
