<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useFetchMore } from 'lost-ui-utils'
import { FetchMoreObserver } from 'lost-ui-utils/components'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const skip = ref(0)

const { state, execute } = useAsyncState(() =>
  fetch(`https://dummyjson.com/products?limit=10&skip=${skip.value}&select=title,price,id`)
    .then(t => t.json()), {}, { resetOnExecute: false })

const { state: list, isActive, fetchMore } = useFetchMore(computed(() => state.value.products), {
  skip,
  total: computed(() => state.value.total),
  onUpdate: () => execute(),
})
</script>

<template>
  <div class="max-w-4xl p-5 mx-auto">
    <button @click="fetchMore">
      + {{ skip }}
    </button>
    <Card>
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
      More
    </FetchMoreObserver>
  </div>
</template>
