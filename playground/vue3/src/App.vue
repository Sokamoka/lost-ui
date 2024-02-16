<script setup lang="ts">
import { ref } from 'vue'
import { type ColumnsModel, useDataTable } from 'lost-ui'
import {
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from 'radix-vue'
import DataTable from './components/DataTable.vue'

const data = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
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
  email: {
    title: 'E-mail',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'E-mail',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'email', direction: 'descend' }],
  },
  amount: {
    title: 'Amount',
    headerClass: 'text-right text-indigo-300',
    headerData: {
      tooltip: 'Unique User Name',
    },
    cellClass: 'text-right font-bold',
    sortOrders: [{ target: 'amount', direction: 'descend' }],
  },
}

const itemPerPage = ref(0)

const initialSort = {
  sortTarget: 'amount',
  orders: [{ target: 'amount', direction: 'descend' }],
}

const { columnModel, rowModel, page } = useDataTable({ columns, data, limit: itemPerPage, initialSort })
</script>

<template>
  <DataTable :column-model="columnModel" :row-model="rowModel">
    <template #cell-email="{ row }">
      <a :href="`mailto:${row.email}`">{{ row.email }}</a>
    </template>
  </DataTable>

  <PaginationRoot
    v-model:page="page"
    :total="data.length"
    :sibling-count="1"
    show-edges
    :items-per-page="itemPerPage"
  >
    <PaginationList
      v-slot="{ items }"
      class="flex items-center gap-1 text-white"
    >
      <PaginationPrev
        class="w-9 h-9 flex items-center justify-center mr-4 disabled:opacity-50 focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded"
      >
        <div class="i-mdi-arrow-left-thick shrink-0" />
      </PaginationPrev>
      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="w-9 h-9 border rounded data-[selected]:bg-white data-[selected]:text-gray-500 hover:bg-white/10 transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1"
          :value="page.value"
        >
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="w-9 h-9 flex items-center justify-center"
        >
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext
        class="w-9 h-9 flex items-center justify-center ml-4 disabled:opacity-50 focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded border border-indigo-300 bg-indigo-700 text-white"
      >
        <div class="i-mdi-arrow-right-thick shrink-0" />
      </PaginationNext>
    </PaginationList>
  </PaginationRoot>
</template>
