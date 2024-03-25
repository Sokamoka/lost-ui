<script setup lang="ts">
import { ref } from 'vue'
import { SortDirection, useDataTable } from 'lost-ui-utils'
import type { ColumnsModel, SortObject } from 'lost-ui-utils'
import DataTable from '../components/DataTable.vue'
import Pagination from '../components/Pagination.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  {
    id: 'm5gr84i9',
    name: 'Ákos Stégner',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    name: 'András Kovács',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    name: 'Endre Tóth',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    name: 'Éva Kovács',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    name: 'dr. Nagy István',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
]

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
    headerClass: 'text-right text-indigo-300',
    headerData: {
      tooltip: 'Unique User Name',
    },
    cellClass: 'text-right font-bold',
    sortOrders: [{ target: 'amount', direction: SortDirection.DESCEND }],
  },
}

const itemPerPage = ref(2)

const initialSort: SortObject = {
  sortTarget: 'amount',
  orders: [{ target: 'amount', direction: SortDirection.DESCEND }],
}

const { columnModel, rowModel, page } = useDataTable({ columns, data, limit: itemPerPage, initialSort })
</script>

<template>
  <Card class="max-w-4xl p-5 mx-auto">
    <CardHeader>
      <CardTitle>Registerd Users</CardTitle>
      <CardDescription>Registerd user list</CardDescription>
    </CardHeader>
    <CardContent>
      <DataTable :column-model="columnModel" :row-model="rowModel">
        <template #cell-email="{ row }">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
      </DataTable>

      <Pagination v-model:page="page" :total="data.length" :items-per-page="itemPerPage" />
    </CardContent>
  </Card>
</template>
