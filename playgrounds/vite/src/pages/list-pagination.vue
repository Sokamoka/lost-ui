<script setup lang="ts">
import { usePagination } from '@lostui/utils'
import { useAsyncState } from '@vueuse/core'
import type { UserColumns } from '../columns.ts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const { state: items } = useAsyncState(() => fetch('http://localhost:3456/users').then(t => t.json()), [])

const { state, page, totalPage, pageStep } = usePagination<UserColumns>(items, { itemsPerPage: 10 })
</script>

<template>
  <div class="max-w-4xl p-5 mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>Registerd Users</CardTitle>
        <CardDescription>Registerd user list {{ page }} of {{ totalPage }}</CardDescription>
      </CardHeader>
      <CardContent class="space-y-5">
        <div v-for="item in state" :key="item.id" class="border border-slate-200 p-3 rounded-sm">
          <h1 class="font-bold">
            {{ item.id }} {{ item.firstName }} {{ item.lastName }}
          </h1>
          <p class="text-xs text-gray-500">
            {{ item.email }} / {{ item.gender }}
          </p>
        </div>
      </CardContent>
    </Card>

    <div class="flex gap-3 mt-5">
      <Button :class="{ 'opacity-20': page === 1 }" @click="pageStep(-1)">
        Prev
      </Button>
      <Button :class="{ 'opacity-20': page === totalPage }" @click="pageStep(1)">
        Next
      </Button>
    </div>
  </div>
</template>
