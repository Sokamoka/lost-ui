<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollToPromise } from '@lostui/utils'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const scrollTo = useScrollToPromise()

async function goTo() {
  await scrollTo('#second', 30)
  await scrollTo('#first', 20)
}

onMounted(() => goTo())

const accordionItems = [
  { value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  { value: 'item-2', title: 'Is it unstyled?', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
  { value: 'item-3', title: 'Can it be animated?', content: 'Yes! You can use the transition prop to configure the animation.' },
]
</script>

<template>
  <Button class="fixed top-2 left-2" @click="goTo">
    GO
  </Button>
  <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
    <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
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
