<script setup lang="ts">
import { nextTick, ref, watchEffect } from 'vue'
import { animationEnd, useScrollToPromise } from '@lostui/utils'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const currentItem = ref(null)

const scrollTo = useScrollToPromise()

watchEffect(async () => {
  if (!currentItem.value)
    return
  await nextTick()
  await animationEnd()
  await scrollTo('#button', undefined, 5000)
})
</script>

<template>
  <div class="max-w-xl m-auto">
    <Accordion v-model="currentItem" type="single" class="w-full" collapsible>
      <AccordionItem value="information">
        <AccordionTrigger>Information</AccordionTrigger>
        <AccordionContent class="space-y-10">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt imperdiet ultrices. Maecenas dignissim, felis sit amet viverra imperdiet, mi ex scelerisque mauris, eu finibus arcu lacus quis mi. Duis ut blandit urna, vel dictum quam. Integer eget arcu ultrices velit vulputate condimentum. Ut urna mauris, finibus vel sem a, ultrices placerat lacus. Aenean tempor pharetra turpis at mollis. Cras pharetra ipsum eget erat elementum, sit amet bibendum sapien dignissim. Mauris ante ante, porttitor sed leo in, semper bibendum lorem. Maecenas enim elit, volutpat non odio sit amet, lobortis maximus felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ante ante, pellentesque molestie pharetra vel, molestie nec erat.</p>

          <p>Morbi sagittis dignissim odio vitae ultrices. Vestibulum aliquet, nisl at vulputate facilisis, ipsum ipsum consectetur risus, ac euismod enim ex eget neque. Aliquam lacus ipsum, scelerisque vitae ligula varius, bibendum pretium purus. Nullam vitae lorem ut ex lobortis molestie sed ac diam. Curabitur eget augue elit. Integer sit amet lorem quis lacus sodales blandit. Etiam non nisi ullamcorper, volutpat libero et, sagittis nulla. In tempus fringilla feugiat. Vivamus non urna id est bibendum vehicula. Nunc lobortis vel metus ut cursus.</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt imperdiet ultrices. Maecenas dignissim, felis sit amet viverra imperdiet, mi ex scelerisque mauris, eu finibus arcu lacus quis mi. Duis ut blandit urna, vel dictum quam. Integer eget arcu ultrices velit vulputate condimentum. Ut urna mauris, finibus vel sem a, ultrices placerat lacus. Aenean tempor pharetra turpis at mollis. Cras pharetra ipsum eget erat elementum, sit amet bibendum sapien dignissim. Mauris ante ante, porttitor sed leo in, semper bibendum lorem. Maecenas enim elit, volutpat non odio sit amet, lobortis maximus felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ante ante, pellentesque molestie pharetra vel, molestie nec erat.</p>

          <p>Morbi sagittis dignissim odio vitae ultrices. Vestibulum aliquet, nisl at vulputate facilisis, ipsum ipsum consectetur risus, ac euismod enim ex eget neque. Aliquam lacus ipsum, scelerisque vitae ligula varius, bibendum pretium purus. Nullam vitae lorem ut ex lobortis molestie sed ac diam. Curabitur eget augue elit. Integer sit amet lorem quis lacus sodales blandit. Etiam non nisi ullamcorper, volutpat libero et, sagittis nulla. In tempus fringilla feugiat. Vivamus non urna id est bibendum vehicula. Nunc lobortis vel metus ut cursus.</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt imperdiet ultrices. Maecenas dignissim, felis sit amet viverra imperdiet, mi ex scelerisque mauris, eu finibus arcu lacus quis mi. Duis ut blandit urna, vel dictum quam. Integer eget arcu ultrices velit vulputate condimentum. Ut urna mauris, finibus vel sem a, ultrices placerat lacus. Aenean tempor pharetra turpis at mollis. Cras pharetra ipsum eget erat elementum, sit amet bibendum sapien dignissim. Mauris ante ante, porttitor sed leo in, semper bibendum lorem. Maecenas enim elit, volutpat non odio sit amet, lobortis maximus felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer ante ante, pellentesque molestie pharetra vel, molestie nec erat.</p>

          <p>Morbi sagittis dignissim odio vitae ultrices. Vestibulum aliquet, nisl at vulputate facilisis, ipsum ipsum consectetur risus, ac euismod enim ex eget neque. Aliquam lacus ipsum, scelerisque vitae ligula varius, bibendum pretium purus. Nullam vitae lorem ut ex lobortis molestie sed ac diam. Curabitur eget augue elit. Integer sit amet lorem quis lacus sodales blandit. Etiam non nisi ullamcorper, volutpat libero et, sagittis nulla. In tempus fringilla feugiat. Vivamus non urna id est bibendum vehicula. Nunc lobortis vel metus ut cursus.</p>

          <Button id="button">
            Order
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
