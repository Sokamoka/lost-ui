<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cm } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tfoot :class="cm('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', props.class)">
    <slot />
  </tfoot>
</template>
