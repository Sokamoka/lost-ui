<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { computed } from 'vue'
import { useFetchMore } from 'lost-ui-utils'
import { FetchMoreObserver } from 'lost-ui-utils/components'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Products {
  title: string
  price: number
  id: number
}

const startLimit = 20

const { state, isLoading, execute } = useAsyncState((args = {}) => {
  const skip = args.skip || 0
  const limit = args.limit || startLimit
  return fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,id`)
    .then(t => t.json())
}, { products: [] }, { resetOnExecute: false })

const { state: list, isActive, fetchMore } = useFetchMore<Products>(computed(() => state.value.products), {
  total: computed(() => state.value.total),
  limit: 10,
  onUpdate: (skip, limit) => execute(0, { skip, limit }),
})
</script>

<template>
  <div class="max-w-4xl p-5 mx-auto">
    <Card class="mb-5">
      <CardHeader>
        <CardTitle>Registerd Users</CardTitle>
        <CardDescription>Registerd user list</CardDescription>
      </CardHeader>
      <CardContent class="space-y-5">
        <div v-for="item in list" :key="item.id" class="border border-slate-200 p-3 rounded-sm">
          <h1>{{ item.id }} {{ item.title }}</h1>
        </div>
      </CardContent>
    </Card>

    <FetchMoreObserver v-if="isActive" @intersect="fetchMore">
      <Button type="button" variant="outline" :disabled="isLoading" @click="fetchMore">
        More
      </Button>
    </FetchMoreObserver>
  </div>
</template>
