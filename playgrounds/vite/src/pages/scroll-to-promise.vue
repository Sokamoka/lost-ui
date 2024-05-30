<script setup lang="ts">
import { ref } from 'vue'
import { delay, useScrollToPromise } from '@lostui/utils'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const accordionItems = [
  { value: 'item-0', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  { value: 'item-1', title: 'Is it unstyled?', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
  { value: 'item-2', title: 'Can it be animated?', content: 'Yes! You can use the transition prop to configure the animation.' },
]

const currentItem = ref('item-0')

const scrollTo = useScrollToPromise()

async function nextItem() {
  const current: number = Number(currentItem.value?.replace(/\D/g, '') ?? 0)
  const next: number = (current + 1) % accordionItems.length
  await scrollTo(`#item-${current}`)
  currentItem.value = `item-${next}`

  await delay(250)

  await scrollTo(`#item-${next}`)
}
</script>

<template>
  <Accordion v-model="currentItem" type="single" class="w-full" collapsible>
    <AccordionItem v-for="item in accordionItems" :id="item.value" :key="item.value" :value="item.value">
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        <div class="h-[800px] bg-slate-100">
          {{ item.content }}
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  <Button @click="nextItem">
    Next
  </Button>
</template>
