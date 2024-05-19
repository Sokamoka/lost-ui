<script setup lang="ts">
import { ref } from 'vue'
import { unrefElement } from '@vueuse/core'
import { scrollTo } from '@lostui/utils'
import { Button } from '@/components/ui/button'

const scrollTopContainer = ref(null)
const scrollHorizontalContainer = ref(null)

function goTo() {
  scrollTo(document.querySelector('#document-top') as HTMLElement, { offset: -40, duration: 5000 })
}

function goToTop() {
  scrollTo(document.querySelector('#child-top') as HTMLElement, { offset: -20, rootElement: unrefElement(scrollTopContainer) })
}
function goToTopStart() {
  scrollTo(document.querySelector('#h-first') as HTMLElement, { rootElement: unrefElement(scrollHorizontalContainer) })
}
</script>

<template>
  <Button class="fixed bottom-2 right-2" @click="goTo">
    GO to Document top
  </Button>
  <div id="document-top" class="bg-indigo-200">
    Top
  </div>
  <div class="max-w-4xl p-5 mx-auto space-y-14">
    <div ref="scrollTopContainer" class="h-96 overflow-auto space-y-14 bg-slate-100 p-5">
      <div id="child-top" class="h-[800px] bg-slate-200 flex justify-center items-center font-bold text-5xl">
        A
      </div>
      <div class="h-[900px] bg-slate-300 flex justify-center items-center font-bold text-5xl">
        B
      </div>
      <Button @click="goToTop">
        GO to Top
      </Button>
    </div>

    <div ref="scrollHorizontalContainer" class="flex overflow-auto h-[500px] space-x-5">
      <div id="h-first" class="w-full flex justify-center items-center font-bold text-5xl bg-indigo-100 flex-grow-0 flex-shrink-0 basis-auto">
        A
      </div>
      <div class="w-full flex justify-center items-center font-bold text-5xl bg-indigo-100 flex-grow-0 flex-shrink-0 basis-auto">
        B
      </div>
      <Button @click="goToTopStart">
        GO to Start
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>
