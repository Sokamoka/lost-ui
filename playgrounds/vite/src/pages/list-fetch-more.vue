<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { useFetchMore } from 'lost-ui-utils'
import { FetchMoreObserver } from 'lost-ui-utils/components'
import type { UserColumns } from '../columns.ts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const startLimit = 30
const totalItems = 100

const { state, isLoading, execute } = useAsyncState((args = {}) => {
  const skip = args.skip || 0
  const limit = args.limit || startLimit
  return fetch(`http://localhost:3456/users?_limit=${limit}&_start=${skip}`)
    .then(t => t.json())
}, [], { resetOnExecute: false })

const { state: list, isActive, fetchMore } = useFetchMore<UserColumns>(state, {
  initialSkip: startLimit,
  total: totalItems, // computed(() => state.value.items)
  limit: 15,
  onUpdated: (skip, limit) => execute(0, { skip, limit }),
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
          <h1 class="text-xl font-bold">
            {{ item.id }} - {{ item.firstName }} {{ item.lastName }} ({{ item.type }})
          </h1>
          <p class="text-base text-gray-500">
            {{ item.email }} / {{ item.gender }}
          </p>
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
