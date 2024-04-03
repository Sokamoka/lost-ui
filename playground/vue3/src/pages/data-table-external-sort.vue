<script setup lang="ts">
import { computed } from 'vue'
import { SortDirection, useDataTable } from 'lost-ui-utils'
import type { ColumnsModel, SortObject } from 'lost-ui-utils'
import { useAsyncState } from '@vueuse/core'
import DataTable from '../components/DataTable.vue'
import Pagination from '../components/Pagination.vue'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const columns: ColumnsModel = {
  id: {
    title: 'Id',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'E-mail',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'id', direction: SortDirection.DESCEND }],
  },
  firstName: {
    title: 'First Name',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'First Name',
    },
    sortOrders: [],
  },
  lastName: {
    title: 'Last Name',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'Last Name',
    },
    sortOrders: [],
  },
  email: {
    title: 'E-mail',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'E-mail',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'email', direction: SortDirection.ASCEND }],
  },
  gender: {
    title: 'Gender',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'Gender',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'gender', direction: SortDirection.ASCEND }],
  },
}

const itemsPerPage = 20

const { state: data, execute } = useAsyncState((args = {}) => {
  const page = args.page || 1
  const limit = args.limit || itemsPerPage
  return fetch(`http://localhost:3456/users?_page=${page}&_per_page=${limit}&_sort=${args.sort}`)
    .then(t => t.json())
}, { data: [] }, { resetOnExecute: false })

const initialSort: SortObject = {
  sortTarget: 'amount',
  orders: [{ target: 'amount', direction: SortDirection.DESCEND }],
}

const totalItem = computed(() => data.value.items || 0)

const { columnModel, state, page, sort } = useDataTable({
  columns,
  data: computed(() => data.value.data),
  itemsPerPage,
  initialSort,
  total: totalItem,
  externalSort: true,
  externalPagination: true,
  onChange: ({ page, sort }) => {
    const sortTarget = sort?.sortTarget
    const _sort = sort?.orders[0].direction === SortDirection.DESCEND
      ? `-${sortTarget}`
      : sort?.orders[0].direction === SortDirection.ORIGINAL
        ? undefined
        : sortTarget
    execute(0, { page, itemsPerPage, sort: _sort })
  },
})
</script>

<template>
  <Card class="max-w-4xl p-5 mx-auto">
    <CardHeader>
      <CardTitle>Registerd Users</CardTitle>
      <CardDescription>Registerd user list</CardDescription>
    </CardHeader>
    <CardContent>
      {{ sort }}
      <DataTable :column-model="columnModel" :row-model="state">
        <template #cell-email="{ row }">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
      </DataTable>

      <Pagination v-model:page="page" :total="totalItem" :items-per-page="itemsPerPage" />
    </CardContent>
  </Card>
</template>
