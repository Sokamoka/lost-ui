<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cm } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <th :class="cm('p-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5', props.class)">
    <slot />
  </th>
</template>
