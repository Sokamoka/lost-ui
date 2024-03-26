<script setup lang="ts">
import { usePagination } from 'lost-ui-utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PAYMENT_DATA } from '@/mocks/data'
import type { PaymentData } from '@/mocks/data'

const items = PAYMENT_DATA

const { state, page, totalPage, pageStep } = usePagination<PaymentData>(items, { itemsPerPage: 3 })
</script>

<template>
  <div class="max-w-4xl p-5 mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>Registerd Users</CardTitle>
        <CardDescription>Registerd user list</CardDescription>
      </CardHeader>
      <CardContent class="space-y-5">
        <div v-for="item in state" :key="item.id" class="border border-slate-200 p-3 rounded-sm">
          <h1>{{ item.id }} {{ item.name }}</h1>
        </div>
      </CardContent>
    </Card>

    <div class="flex gap-3">
      {{ page }}
      {{ totalPage }}
      <button :class="{ 'opacity-50': page === 1 }" @click="pageStep(-1)">
        Prev
      </button>
      <button :class="{ 'opacity-50': page === totalPage }" @click="pageStep(1)">
        Next
      </button>
    </div>
  </div>
</template>
