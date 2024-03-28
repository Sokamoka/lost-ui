<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { SortDirection, useDataTable } from 'lost-ui-utils'
import type { ColumnsModel, SortObject } from 'lost-ui-utils'
import { useAsyncState } from '@vueuse/core'
import DataTable from '../components/DataTable.vue'
import Pagination from '../components/Pagination.vue'

// import { PAYMENT_DATA } from '../mocks/data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// const data = PAYMENT_DATA

const columns: ColumnsModel = {
  title: {
    title: 'Product',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'Product',
    },
    sortOrders: [],
  },
  price: {
    title: 'Price',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'Price',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'price', direction: SortDirection.ASCEND }],
  },
  id: {
    title: 'Id',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'E-mail',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'email', direction: SortDirection.DESCEND }],
  },
  // amount: {
  //   title: 'Amount',
  //   headerClass: 'text-right text-indigo-300',
  //   headerData: {
  //     tooltip: 'Unique User Name',
  //   },
  //   cellClass: 'text-right font-bold',
  //   sortOrders: [{ target: 'amount', direction: SortDirection.DESCEND }],
  // },
}

const startLimit = 10
const itemsPerPage = ref(10)

const { state: data, execute } = useAsyncState((args = {}) => {
  const skip = args.skip || 1
  const limit = args.limit || startLimit
  return fetch(`https://6605db50d92166b2e3c2e822.mockapi.io/api/v1/products?limit=${limit}&page=${skip}`)
    .then(t => t.json())
}, { products: [] }, { resetOnExecute: false })

const initialSort: SortObject = {
  sortTarget: 'amount',
  orders: [{ target: 'amount', direction: SortDirection.DESCEND }],
}

const totalItem = computed(() => data.value.total || 0)

const { columnModel, state, page, sort } = useDataTable({
  columns,
  data: computed(() => data.value.products),
  itemsPerPage,
  initialSort,
  total: totalItem,
  externalSort: true,
  externalPagination: true,
})

watch(page, (p) => {
  execute(0, { skip: p, itemsPerPage })
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
