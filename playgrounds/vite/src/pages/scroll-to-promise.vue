<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollToPromise } from '@lostui/utils'
import { Button } from '@/components/ui/button'

const scrollTo = useScrollToPromise()

async function goTo() {
  await scrollTo('#second', 30)
  await scrollTo('#first', 20)
}

onMounted(() => goTo())
</script>

<template>
  <Button class="fixed top-2 left-2" @click="goTo">
    GO
  </Button>
  <div class="max-w-4xl p-5 mx-auto space-y-5">
    <div id="first" class="h-screen bg-slate-200">
      A
    </div>
    <div id="second" class="h-screen bg-slate-200">
      B
    </div>
  </div>
</template>

<style scoped>

</style>
