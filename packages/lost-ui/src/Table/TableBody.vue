<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cm } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tbody :class="cm('[&_tr:last-child]:border-0', props.class)">
    <slot />
  </tbody>
</template>
