import { computed, unref } from 'vue'
import type { ComputedRef, MaybeRef, MaybeRefOrGetter } from 'vue'
import { isEmpty } from 'lodash-es'
import { noop } from '@vueuse/core'
import { SortDirection, useSort } from '../useSort'
import { usePagination, type usePaginationOptions, type usePaginationReturn } from '../usePagination'
import type { SortObject, SortObjectPayload, SortOrders } from '../useSort'

export interface UseDataTableOptions extends usePaginationOptions {
  initialSort?: SortObjectPayload
  /**
   * Locale settings for Intl.Collator sorting
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
   *
   *  @default en
   */
  locale?: string
  /**
   * Total count of all element
   *
   * @default 0
   */
  total?: MaybeRefOrGetter<number>
  /**
   * External data sorting
   *
   * @default false
   */
  externalSort?: boolean
  /**
   * External pagination
   *
   * @default false
   */
  externalPagination?: boolean
  /**
   * Trigger it when the tasks changed.
   *
   */
  onChanged?: (payload: { page: number, sort: SortObject }) => void
}

export interface UseDataTableReturn<Rows> extends usePaginationReturn<Rows> {
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

/**
 * Data Table with sorting and paginating
 *
 * @param columns   Table columns model
 * @param rows      Table rows data
 * @param options
 */
export function useDataTable<Rows extends any[] = []>(columns: MaybeRef<ColumnsModel>, rows: MaybeRefOrGetter<Rows>, options: UseDataTableOptions): UseDataTableReturn<Rows> {
  const {
    // columns,
    // rows,
    initialSort,
    locale = 'en',
    itemsPerPage = 0,
    defaultPage = 1,
    siblingCount = 2,
    total = 0,
    externalSort = false,
    externalPagination = false,
    onChanged = noop,
  } = options

  const { state, sort, change } = useSort<Rows>(rows, {
    initialSort,
    locale,
    external: externalSort,
    onUpdated: _onChanged,
  })

  const pagination = usePagination<Rows>(state, {
    total,
    defaultPage,
    itemsPerPage,
    siblingCount,
    external: externalPagination,
    onUpdated: _onChanged,
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

  function _onChanged() {
    const payload = {
      page: pagination.page.value,
      sort,
    }
    onChanged(payload)
  }

  return {
    ...pagination,
    sort,
    columnModel,
  }
}
