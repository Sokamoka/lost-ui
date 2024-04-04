<script setup lang="ts">
import { ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { useLazyLoadingState } from 'lost-ui-utils'
import { useTimeoutFn } from '@vueuse/core'
import { Button } from '@/components/ui/button'

const isLoading = ref(false)

const lazyLoadingState = useLazyLoadingState(isLoading, { delay: 500 })

const { start } = useTimeoutFn(() => {
  isLoading.value = false
}, 3000)

function onClick() {
  start()
  isLoading.value = true
}
</script>

<template>
  <ul class="mb-5">
    <li>isLoading: {{ isLoading }}</li>
    <li>lazyLoadingState: {{ lazyLoadingState }}</li>
  </ul>
  <Button :disabled="lazyLoadingState" @click="onClick">
    <Loader2 v-if="lazyLoadingState" class="w-4 h-4 mr-2 animate-spin" />
    <template v-if="!lazyLoadingState">
      Continue
    </template>
    <template v-else>
      Please wait
    </template>
  </Button>
</template>
