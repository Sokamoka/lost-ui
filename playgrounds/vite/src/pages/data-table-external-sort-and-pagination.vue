<script setup lang="ts">
import { computed } from 'vue'
import { SortDirection, useDataTable } from '@lostui/utils'
import type { SortObject } from '@lostui/utils'
import { useAsyncState } from '@vueuse/core'
import DataTable from '../components/DataTable.vue'
import Pagination from '../components/Pagination.vue'
import Code from '../components/Code.vue'
import { USER_COLUMNS } from '../columns'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const columns = USER_COLUMNS

const itemsPerPage = 20

const { state: data, execute } = useAsyncState((args = {}) => {
  const page = args.page || 1
  const limit = args.limit || itemsPerPage
  const sort = args.sort
  return fetch(`http://localhost:3456/users?_page=${page}&_per_page=${limit}&_sort=${sort}`)
    .then(t => t.json())
}, { data: [] }, { resetOnExecute: false })

const totalItem = computed(() => data.value.items || 0)

const { columnModel, state, page, sort } = useDataTable(
  columns,
  computed(() => data.value.data),
  {
    itemsPerPage,
    total: totalItem,
    externalSort: true,
    externalPagination: true,
    onChanged: ({ page, sort }) => {
      const _sort = createSortString(sort)
      execute(0, { page, itemsPerPage, sort: _sort })
    },
  },
)

function createSortString(sort: SortObject) {
  const sortOrders = sort?.orders[0] ?? {}
  return sortOrders.direction === SortDirection.DESCEND
    ? `-${sortOrders.target}`
    : sortOrders.direction === SortDirection.ORIGINAL
      ? undefined
      : sortOrders.target
}
</script>

<template>
  <Card class="max-w-4xl p-5 mx-auto">
    <CardHeader>
      <CardTitle>Registerd Users</CardTitle>
      <CardDescription>Registerd user list</CardDescription>
    </CardHeader>
    <CardContent>
      <Code>{{ sort }}</Code>
      <DataTable :column-model="columnModel" :row-model="state">
        <template #cell-email="{ row }">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
      </DataTable>

      <Pagination v-model:page="page" :total="totalItem" :items-per-page="itemsPerPage" />
    </CardContent>
  </Card>
</template>
