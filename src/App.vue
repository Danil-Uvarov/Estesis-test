<template>
  <div class="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import layoutDefault from './layouts/layouDefault.vue'
  import { useNotesStore } from './store'

  const route = useRoute()
  const store = useNotesStore()

  const layout = computed(() => {
    if (route.meta.layout === 'defaultLayout') {
      return layoutDefault
    }
    return layoutDefault
  })

  onMounted(() => {
    const data = localStorage.getItem('todos')
    if (data) {
      store.notesList = JSON.parse(data)
    }
  })
</script>
<style scoped>
  .app {
    margin: 40px auto;
    padding: 20px 30px;
    max-width: 600px;
    height: 100%;
    background-color: #b0c4de;
    border-radius: 20px;
  }
</style>
