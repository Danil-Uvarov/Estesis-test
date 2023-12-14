<template>
  <div class="body">
    <div class="note__header">
      <router-link to="/">
        <img src="/public/image/arrow.svg" class="note__arrow" alt="#"
      /></router-link>
      <div class="note__buttons-history">
        <UiButton @edit="undo">undo</UiButton>
        <UiButton @edit="redo">redo</UiButton>
      </div>
    </div>
    <div class="note__title-wrapper">
      <h2 class="note__title" :class="{ open: isOpen }">
        {{ note.name }}
      </h2>
      <UiModifyButton @edit="isOpen = !isOpen" />
    </div>
    <input
      v-model="note.name"
      class="note__title-input"
      :class="{ isOpen: isOpen }"
      type="text"
    />
    <Task :tasks="note.tasks"></Task>

    <div class="note__buttons-wrapper">
      <UiButton @edit="warning = !warning">add changes</UiButton>
      <UiButton @edit="isActive = !isActive">add task</UiButton>
      <AddTaskModal v-if="isActive" @close="newTask"></AddTaskModal>
    </div>
  </div>
  <WindowWarning v-if="warning" @changes="addChanges"
    >Do you really want to make changes to the memo?
  </WindowWarning>
</template>
<script setup lang="ts">
  import Task from '@/components/Task.vue'
  import AddTaskModal from '@/components/AddTaskModal.vue'
  import WindowWarning from '@/components/ui/WindowWarning.vue'
  import UiModifyButton from '@/components/ui/ModifyButton.vue'
  import UiButton from '@/components/ui/UiButton.vue'
  import { ITasks } from '@/models/entyties/ITasks.ts'
  import { useRouter } from 'vue-router'
  import { useNotesStore } from '@/store/Index.ts'
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'
  import { ref, computed, watchEffect } from 'vue'
  import { useRefHistory, useMagicKeys } from '@vueuse/core'

  const router = useRouter()
  const store = useNotesStore()
  const route = useRoute()
  const { notesList } = storeToRefs(store)
  const routeNumber = Number(route.params.id)
  const isActive = ref<boolean>(false)
  const isOpen = ref<boolean>(false)
  const warning = ref<boolean>(false)
  const { z, я, м, control, v } = useMagicKeys()

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
  watchEffect(() => {
    if (control.value && (z.value || я.value)) {
      undo()
    } else if (control.value && (v.value || м.value)) {
      redo()
    }
  })

  const addChanges = (result?: boolean) => {
    if (result) {
      const data = notesList.value[routeNumber].tasks.find(
        (item: ITasks) => !item.checked,
      )
      store.notesList[routeNumber].checked = !data
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
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;
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
    padding-bottom: 10px;
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

  .isOpen {
    display: block;
  }
</style>
