<script setup lang="ts">
import { SortDirection, useSort } from '@lostui/utils'
import { useAsyncState } from '@vueuse/core'
import type { UserColumns } from '../columns.ts'
import Code from '../components/Code.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const { state: items } = useAsyncState(() => fetch('http://localhost:3456/users?_start=0&_end=30').then(t => t.json()), [])

const { state, sort, change } = useSort<UserColumns>(items)
</script>

<template>
  <div class="max-w-4xl p-5 mx-auto">
    <Card>
      <CardHeader>
        <CardTitle>Registerd Users</CardTitle>
        <CardDescription>Registerd user</CardDescription>
      </CardHeader>
      <CardContent class="space-y-5">
        <Code>{{ sort }}</Code>
        <div class="flex items-center">
          <p class="text-sm font-bold">
            Sort:
          </p>
          <Button
            variant="link"
            :class="[sort.sortTarget === 'id' ? 'text-indigo-500' : 'text-gray-400']"
            @click="() => change({ sortTarget: 'id' })"
          >
            Id
          </Button>
          <Button
            variant="link"
            :class="[sort.sortTarget === 'firstName' ? 'text-indigo-500' : 'text-gray-400']"
            @click="() => change({ sortTarget: 'firstName', orders: [{ target: 'firstName', direction: SortDirection.ASCEND }, { target: 'lastName', direction: SortDirection.ASCEND }] })"
          >
            First Name
          </Button>
          <Button
            variant="link"
            :class="[sort.sortTarget === 'email' ? 'text-indigo-500' : 'text-gray-400']"
            @click="() => change({ sortTarget: 'email', orders: { target: 'email', direction: SortDirection.ASCEND } })"
          >
            E-mail
          </Button>
          <Button
            variant="link"
            :class="[sort.sortTarget === 'gender' ? 'text-indigo-500' : 'text-gray-400']"
            @click="() => change({ sortTarget: 'gender', orders: SortDirection.ASCEND })"
          >
            Gender
          </Button>
        </div>

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
  </div>
</template>
