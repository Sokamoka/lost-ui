<script setup lang="ts">
import type { ConvertedColumnModel } from 'lost-ui-utils'
import { LucideChevronDown, LucideChevronUp, LucideChevronsUpDown } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface Props {
  columnModel: ConvertedColumnModel[]
  rowModel: any[]
}

const props = withDefaults(defineProps<Props>(), {
  columnModel: () => [],
  rowModel: () => [],
})
</script>

<template>
  <Table class="mb-10">
    <TableHeader>
      <TableRow>
        <TableHead
          v-for="column in props.columnModel"
          :key="column.key"
          class="align-middle text-gray-900 border-b border-gray-200 border-b-solid text-xs font-bold" :class="[
            column.header.headerClass,
            { 'bg-gray-200': column.header.isActive },
          ]"
          :title="column.header.headerData.tooltip"
          v-on="column.header.event"
        >
          <slot :name="`header-${column.prop}`" :column="column">
            {{ column.title }}
          </slot>
          <span v-if="column.header.isSortAsc">
            <LucideChevronUp class="w-4 inline-block ml-1" />
          </span>
          <span v-if="column.header.isSortDesc">
            <LucideChevronDown class="w-4 inline-block ml-1" />
          </span>
          <span v-if="column.header.isSortOrigi">
            <LucideChevronsUpDown class="w-4 inline-block ml-1" />
          </span>
          <span v-if="column.header.isSortable && !column.header.isActive">
            <LucideChevronsUpDown class="w-4 inline-block ml-1" />
          </span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in props.rowModel" :key="row.id">
        <TableCell
          v-for="column in props.columnModel"
          :key="column.key"
          :class="[column.cell.cellClass, { 'bg-gray-100': column.cell.isActive }]"
        >
          <slot :name="`cell-${column.prop}`" :column="column" :row="row">
            {{ row[column.prop] }}
          </slot>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
