<template>
  <div class="mainVuews">
    <app-bar />
    <todo-list />
    <add-note-button />
  </div>
</template>

<script setup lang='ts'>

import AddNoteButton from '../components/addNoteButton.vue'
import AppBar from '../components/appBar.vue'
import TodoList from '../components/todoList.vue'

</script>

<style scoped>

</style>