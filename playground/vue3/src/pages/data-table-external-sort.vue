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
  id: {
    title: 'Id',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'E-mail',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'email', direction: SortDirection.DESCEND }],
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
    sortOrders: [{ target: 'price', direction: SortDirection.ASCEND }],
  },
}

const startLimit = 15
const itemsPerPage = ref(15)

const { state: data, execute } = useAsyncState((args = {}) => {
  const skip = args.skip || 1
  const limit = args.limit || startLimit
  return fetch(`http://localhost:3456/users?_page=${skip}&_per_page=${limit}`)
    .then(t => t.json())
}, { products: [] }, { resetOnExecute: false })

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
})

watch(page, (p) => {
  execute(0, { skip: p, itemsPerPage })
})

watch(() => sort, (s) => {
  console.log(s)
  // const sort = s.target
  // execute(0, { skip: p, itemsPerPage, sort })
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
