<template>
  <div class="body">
    <div class="note__title-wrapper">
      <h2 class="note__title" :class="{ open: isOpen }">
        {{ note.name }}
      </h2>
      <button class="note__modify" @click="modifyNote" @keydown="modifyNote">
        modify note
      </button>
    </div>
    <input
      v-model="note.name"
      class="note__title-input"
      :class="{ isOpen: isOpen }"
      type="text"
    />
    <task-modify :tasks="note.tasks"></task-modify>
    <modal-task-add v-if="isActive" @close="newTask"></modal-task-add>
    <div class="note__buttons-wrapper">
      <button class="add__task-button" @click="isActive = !isActive">
        add task
      </button>

      <router-link to="/" class="note__changes" @click="addChanges">
        add changes</router-link
      >
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useNotesStore } from '../store/modalNote'
  import { storeToRefs } from 'pinia'
  import { INote } from '../models/entyties/INote.ts'
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import TaskModify from '../components/taskModify.vue'
  import ModalTaskAdd from '../components/modalTaskAdd.vue'

  const store = useNotesStore()
  const route = useRoute()
  const { notesList } = storeToRefs(store)
  const routeNumber = Number(route.params.id)
  const isActive = ref<boolean>(false)
  const isOpen = ref<boolean>(false)

  const note: INote = notesList.value[routeNumber]
  const modifyNote = () => {
    isOpen.value = !isOpen.value
    if (note.name) {
      store.setLocalStorage()
    }
  }

  const addChanges = () => {
    const result = note.tasks.find((item) => !item.checked)
    store.notesList[routeNumber].checked = !result
    store.setLocalStorage()
  }
  const newTask = (task?: string) => {
    isActive.value = !isActive.value
    if (task) {
      store.notesList[routeNumber].tasks.push({
        nameTask: task,
        checked: false,
      })
      store.setLocalStorage()
    }
  }
</script>
<style scoped>
  .body {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .note__title-wrapper {
    position: relative;
    margin: 0 auto;
  }

  .note__title {
  }

  .note__title-input {
    display: none;
    text-align: center;
    font-size: 32px;
    font-weight: 500;
    margin: 0 auto;
    border-radius: 20px;
  }

  .note__buttons-wrapper {
    padding-top: 50px;
    display: flex;
    margin: 0 auto;
    width: 100%;
    max-width: 300px;
    justify-content: space-between;
  }

  .note__modify {
    position: absolute;
    padding: 2px;
    margin: 0 auto;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    background: gold;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
  }

  .add__task-button {
    margin: 0 auto;
    background-color: chocolate;
    border-radius: 10px;
    padding: 8px 12px;
  }

  .note__changes {
    margin: 0 auto;
    background: green;
    border-radius: 10px;
    font-size: 24px;
    font-weight: 500;
  }

  .open {
  }

  .isOpen {
    display: block;
  }
</style>
