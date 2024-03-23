<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cm } from 'lost-ui/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <thead :class="cm('[&_tr]:border-b', props.class)">
    <slot />
  </thead>
</template>
