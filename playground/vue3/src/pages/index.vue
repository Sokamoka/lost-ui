<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router/auto'

const router = useRouter()
const routes = computed(() =>
  router.getRoutes().filter(route => route.path !== '/' && !route.path.includes(':') && !route.children.length),
)
</script>

<template>
  <div>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <RouterLink v-slot="{ href }" :to="route.path">
          {{
            href
          }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
