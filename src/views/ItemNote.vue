<template>
  <div class="body">
    <div class="note__header">
      <router-link to="/">
        <img src="/public/image/arrow.svg" class="note__arrow" alt="#"
      /></router-link>
      <div class="note__buttons-history">
        <button class="button__history" @click="undo">undo</button>
        <button class="button__history" @click="redo">redo</button>
      </div>
    </div>
    <div class="note__title-wrapper">
      <h2 class="note__title" :class="{ open: isOpen }">
        {{ note.name }}
      </h2>
      <button class="note__modify" @click="isOpen = !isOpen">
        modify note
      </button>
    </div>
    <input
      v-model="note.name"
      class="note__title-input"
      :class="{ isOpen: isOpen }"
      type="text"
    />
    <ModifyTask :tasks="note.tasks"></ModifyTask>

    <div class="note__buttons-wrapper">
      <button class="note__changes" @click="warning = !warning">
        add changes
      </button>
      <button class="add__task-button" @click="isActive = !isActive">
        add task
      </button>
      <AddTaskModal v-if="isActive" @close="newTask"></AddTaskModal>
    </div>
  </div>
  <WindowWarning v-if="warning" @changes="addChanges"
    >Do you really want to make changes to the memo?
  </WindowWarning>
</template>
<script setup lang="ts">
  import ModifyTask from '../components/ModifyTask.vue'
  import AddTaskModal from '../components/AddTaskModal.vue'
  import WindowWarning from '../components/ui/WindowWarning.vue'
  import { useRouter } from 'vue-router'
  import { useNotesStore } from '../store'
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'
  import { ref, computed } from 'vue'
  import { useRefHistory } from '@vueuse/core'

  const router = useRouter()
  const store = useNotesStore()
  const route = useRoute()
  const { notesList } = storeToRefs(store)
  const routeNumber = Number(route.params.id)
  const isActive = ref<boolean>(false)
  const isOpen = ref<boolean>(false)
  const warning = ref<boolean>(false)

  const note = computed({
    get() {
      return notesList.value[routeNumber]
    },
    set(newValue) {
      notesList.value[routeNumber] = newValue
    },
  })
  const { undo, redo } = useRefHistory(notesList, {
    deep: true,
  })
  const addChanges = (result?: boolean) => {
    if (result) {
      const result = notesList.value[routeNumber].tasks.find(
        (item) => !item.checked,
      )
      store.notesList[routeNumber].checked = !result
      store.setLocalStorage()
      router.push('/')
    } else {
      router.push('/')
    }
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
  .note__header {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .note__arrow {
    max-width: 40px;
    max-height: 20px;
  }
  .note__buttons-history {
    display: flex;
    gap: 20px;
  }

  .button__history {
    padding: 8px;
    background: #9395d3;
    color: #ffffff;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 600;
  }

  .note__title-wrapper {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .note__title {
    text-align: center;
    font-weight: 600;
    max-width: 400px;
    word-break: break-word;
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
    gap: 40px;
    width: 100%;
    justify-content: space-between;
  }

  .note__modify {
    cursor: pointer;
    padding: 5px;
    margin: 10px auto 0 auto;
    background: gold;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
  }

  .add__task-button {
    cursor: pointer;
    margin: 0 auto;
    background: #9395d3;
    color: #ffffff;
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 24px;
    font-weight: 500;
  }

  .note__changes {
    cursor: pointer;
    margin: 0 auto;
    background: #9395d3;
    color: #ffffff;
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 24px;
    font-weight: 500;
  }

  .isOpen {
    display: block;
  }
</style>