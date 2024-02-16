<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cm } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <table :class="cm('w-full border-collapse caption-bottom text-sm', props.class)">
    <slot />
  </table>
</template>
