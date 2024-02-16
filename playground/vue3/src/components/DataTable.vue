<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'lost-ui'
import type { ConvertedColumnModel } from 'lost-ui'

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
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader
          v-for="column in props.columnModel"
          :key="column.key"
          class="text-gray-900 border-b border-gray-200 border-b-solid text-xs font-bold" :class="[
            column.header.headerClass,
            { 'bg-indigo-50': column.header.isActive },
          ]"
          :title="column.header.headerData.tooltip"
          v-on="column.header.event"
        >
          <slot :name="`header-${column.prop}`" :column="column">
            {{ column.title }}
          </slot>
          <span v-if="column.header.isSortAsc" class="i-mdi-sort-ascending inline-block" />
          <span v-if="column.header.isSortDesc" class="i-mdi-sort-descending inline-block" />
          <span v-if="column.header.isSortOrigi" class="i-mdi-sort inline-block" />
          <span v-if="column.header.isSortable && !column.header.isActive" class="i-mdi-sort inline-block opacity-50" />
        </TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow v-for="row in props.rowModel" :key="row.id">
        <TableCell
          v-for="column in props.columnModel"
          :key="column.key"
          class="text-indigo-700" :class="[column.cell.cellClass, { 'bg-indigo-50': column.cell.isActive }]"
        >
          <slot :name="`cell-${column.prop}`" :column="column" :row="row">
            {{ row[column.prop] }}
          </slot>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
