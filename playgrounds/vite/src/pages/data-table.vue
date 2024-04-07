<script setup lang="ts">
import { ref } from 'vue'
import { SortDirection, useDataTable } from '@lostui/utils'
import type { ColumnsModel } from '@lostui/utils'
import DataTable from '../components/DataTable.vue'
import Pagination from '../components/Pagination.vue'
import { PAYMENT_DATA } from '../mocks/data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = PAYMENT_DATA

const columns: ColumnsModel = {
  status: {
    title: 'Status',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'User Type',
    },
    sortOrders: [],
  },
  name: {
    title: 'Name',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'Name',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'name', direction: SortDirection.ASCEND }],
  },
  email: {
    title: 'E-mail',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'E-mail',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'email', direction: SortDirection.DESCEND }],
  },
  amount: {
    title: 'Amount',
    headerClass: 'text-right text-orange-500',
    headerData: {
      tooltip: 'Unique User Name',
    },
    cellClass: 'text-right font-bold',
    sortOrders: [{ target: 'amount', direction: SortDirection.DESCEND }],
  },
}

const itemsPerPage = ref(4)

const initialSort = {
  sortTarget: 'amount',
  orders: SortDirection.DESCEND,
}

const { columnModel, state, page } = useDataTable(columns, data, { itemsPerPage, initialSort })
</script>

<template>
  <Card class="max-w-4xl p-5 mx-auto">
    <CardHeader>
      <CardTitle>Registerd Users</CardTitle>
      <CardDescription>Registerd user list</CardDescription>
    </CardHeader>
    <CardContent>
      <DataTable :column-model="columnModel" :row-model="state">
        <template #cell-email="{ row }">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
      </DataTable>

      <Pagination v-model:page="page" :total="data.length" :items-per-page="itemsPerPage" />
    </CardContent>
  </Card>
</template>
