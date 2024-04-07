<script setup lang="ts">
import { computed } from 'vue'
import { SortDirection, useDataTable } from '@lostui/utils'
import type { SortObject, SortOrders } from '@lostui/utils'
import { useFetch } from '@vueuse/core'
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

const { columnModel, page, sort } = useDataTable(columns)

const { data } = useFetch(
  computed(() => `http://localhost:3456/users?_page=${page.value}&_per_page=${itemsPerPage}&_sort=${createSortString(sort)}`),
  { refetch: true },
).get().json()

const totalItem = computed(() => data.value?.items ?? 0)

function createSortString(sort: SortObject | undefined) {
  const sortOrders = sort?.orders[0] ?? {} as SortOrders
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
      <DataTable :column-model="columnModel" :row-model="data?.data ?? []">
        <template #cell-email="{ row }">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
      </DataTable>

      <Pagination v-model:page="page" :total="totalItem" :items-per-page="itemsPerPage" />
    </CardContent>
  </Card>
</template>
