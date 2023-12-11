<template>
  <div class="mainVuews">
    <app-bar />
    <todo-list />
    <add-note-button />
  </div>
</template>

<script setup lang="ts">
  import AddNoteButton from '../components/AddNoteButton.vue'
  import AppBar from '../components/AppBar.vue'
  import TodoList from '../components/TodoList.vue'
</script>

<style scoped></style>
