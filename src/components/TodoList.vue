<template>
  <main class="todos-wrapper">
    <div
      v-for="(note, index) in notesList"
      :key="index"
      class="todos__note note"
    >
      <checkbox-note v-model:checked="note.checked" />
      <div class="note__name-wrapper">
        <router-link
          class="note__name"
          :to="{ name: 'item', params: { id: index } }"
        >
          {{ note.name }}
        </router-link>
      </div>
      <div class="note__tasks-wrapper">
        <ul
          v-for="(task, indexTask) in note.tasks"
          :key="indexTask"
          class="note__tasks-list"
        >
          <li class="note__task">
            <checkbox-task
              v-model:checked="task.checked"
              :disable="true"
            ></checkbox-task>
            <span class="task__name">{{ task.nameTask }}</span>
          </li>
        </ul>
      </div>
      <red-cross @close="window(index)"></red-cross>
    </div>
    <WindowWarning v-if="showWindow" @changes="deleteNote"
      >To delete the note?
    </WindowWarning>
  </main>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useNotesStore } from '@/store/Index.ts'
  import { ref } from 'vue'
  import WindowWarning from '@/components/ui/WindowWarning.vue'
  import RedCross from '@/components//ui/RedCross.vue'
  import CheckboxTask from '@/components/ui/CheckboxTask.vue'
  import CheckboxNote from '@/components/ui/CheckboxNote.vue'

  const store = useNotesStore()
  const { notesList } = storeToRefs(store)
  const showWindow = ref<boolean>(false)
  const deleteID = ref<number>(0)
  const window = (i: number) => {
    showWindow.value = !showWindow.value
    deleteID.value = i
  }
  const deleteNote = (result?: boolean) => {
    showWindow.value = !showWindow.value
    if (result) {
      store.notesList.splice(deleteID.value, 1)
      store.setLocalStorage()
    }
  }
</script>

<style scoped>
  .todos-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 40px;
  }

  .todos__note {
    position: relative;
    border-radius: 10px;
    border: 2px solid black;
    padding: 12px 8px;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 10% 25% 65%;
    gap: 20px;
    align-items: center;
  }

  .note__name-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .note__name {
    text-align: center;
    color: #000000;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    word-break: break-word;
  }

  .note__tasks-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .note__tasks-list {
    display: flex;
    flex-direction: column;
  }

  .note__task {
    list-style: none;
    font-size: 24px;
    display: flex;

    gap: 8px;
    word-break: break-word;
  }

  .task__name {
    max-width: 270px;
  }
</style>
