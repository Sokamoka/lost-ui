import { computed, ref, unref } from 'vue'
import type { ComputedRef, MaybeRef, Ref } from 'vue'
import { isEmpty } from 'lodash-es'
import { sortBy } from 'lost-ui-utils/utils'
import { SortDirection, useSort } from '../useSort'
import { usePagination } from '../usePagination'
import type { OrdersObject, SortObject } from '../useSort'

export interface UseDataTableOptions {
  columns: MaybeRef<ColumnsModel>
  data: any[]
  limit?: MaybeRef<number>
  initialSort?: SortObject
}

export interface UseDataTable {
  columnModel: ComputedRef<ConvertedColumnModel[]>
  rowModel: ComputedRef<any[]>
  page: Ref<number>
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

export function useDataTable(options: UseDataTableOptions): UseDataTable {
  const { columns, data, limit = 0, initialSort } = options

  const page = ref(1)

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

  const pagination = usePagination({
    currentPage: page,
    totalItems: unref(data).length,
    update: p => (page.value = p),
  })

  const sortedModel = computed(() => {
    if (!sort.sortTarget)
      return unref(data)
    if (sort.orders[0].direction === SortDirection.ORIGINAL)
      return unref(data)
    return sortBy(sort.orders, unref(data))
  })

  const rowModel = computed(() => {
    if (!unref(limit))
      return sortedModel.value
    const startIndex = (page.value - 1) * unref(limit)
    const endIndex = startIndex + unref(limit)
    return sortedModel.value.slice(startIndex, endIndex)
  })

  return {
    ...pagination,
    columnModel,
    rowModel,
  }
}
