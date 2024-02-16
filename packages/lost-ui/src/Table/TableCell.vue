<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cm } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <td :class="cm('p-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5', props.class)">
    <slot />
  </td>
</template>
