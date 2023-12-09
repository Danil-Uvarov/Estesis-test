<template>
  <main class="todos-wrapper">
    <div class="todos__quantity">10</div>
    <div class="todos__line" />
    <div
      v-for="(note, index) in notesList"
      :key="index"
      class="todos__note note"
    >
      <label class="note__label-checkbox">
        <input
          v-model="note.checked"
          class="note__checkbox"
          type="checkbox"
          @update:model-value="noteInput(index)"
        />
        <span class="note__checkbox-custom" />
      </label>
      <button class="note__name" @click="router.push(`/item/${index}`)">
        {{ note.name }}
      </button>
      <div class="note__tasks-wrapper">
        <ul
          v-for="(task, indexTask) in note.tasks"
          :key="indexTask"
          class="note__tasks-list"
        >
          <li class="note__task">
            <label class="task__label-checkbox">
              <input
                v-model="task.checked"
                class="task__checkbox"
                type="checkbox"
                @update:model-value="tasksAccomplished(index)"
              />
              <span class="task__checked-custom" />
              <span class="task__name">{{ task.nameTask }}</span>
            </label>
          </li>
        </ul>
      </div>
      <red-cross @flick="window(index)"></red-cross>
    </div>
    <warning-window v-if="showWindow" @changes="deleteNote"
      >to delete the note?</warning-window
    >
  </main>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useNotesStore } from '../store/modalNote'
  import { useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import WarningWindow from './ui/warningWindow.vue'
  import RedCross from './ui/redCross.vue'

  const router = useRouter()
  const store = useNotesStore()

  const { notesList } = storeToRefs(store)
  const showWindow = ref<boolean>(false)
  const deleteID = ref<number>(0)
  const window = (id: number) => {
    showWindow.value = !showWindow.value
    deleteID.value = id
  }
  const deleteNote = (yes?: string) => {
    showWindow.value = !showWindow.value
    if (yes) {
      store.notesList.splice(deleteID, 1)
      store.setLocalStorage()
    }
  }
  const noteInput = (i: number) => {
    store.notesList[i].tasks.forEach((task) => {
      task.checked = store.notesList[i].checked
    })
    store.setLocalStorage()
  }
  const tasksAccomplished = (i: number) => {
    const result = notesList.value[i].tasks.find((item) => !item.checked)
    store.notesList[i].checked = !result
    store.setLocalStorage()
  }

  onMounted(() => {
    const data = localStorage.getItem('todos')
    if (data) {
      store.notesList = JSON.parse(data)
    }
  })
</script>

<style scoped>
  .todos-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .todos__quantity {
    margin-top: 18px;
    width: 100%;
    text-align: center;
  }

  .todos__line {
    margin-top: 15px;
    width: 100%;
    height: 2px;
    background-color: black;
  }

  .todos__note {
    position: relative;
    border-radius: 10px;
    border: 2px solid black;
    padding: 12px 8px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .note__label-checkbox {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
  }

  .note__checkbox {
    display: none;
  }

  .note__checkbox-custom {
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 5px;
  }

  .note__checkbox-custom:before {
    content: '';
    position: absolute;
    border-radius: 5px;
    top: 3px;
    left: 3px;
    bottom: 3px;
    right: 3px;
    background-color: green;
    transform: scale(0);
    transition: 0.5s;
  }

  .note__checkbox:checked + .note__checkbox-custom:before {
    transform: scale(1);
  }

  .note__name {
    font-weight: 700;
    font-size: 18px;
  }

  .note__tasks-wrapper {
    display: flex;
    flex-direction: column;
  }

  .note__tasks-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .note__task {
    list-style: none;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .task__label-checkbox {
    display: flex;
    align-items: center;
    gap: 16px;
    background-color: #ffffff;
  }

  .task__checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .task__checked-custom {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid #d3d3d3;
  }

  .task__checked-custom:before {
    content: '';
    position: absolute;
    top: 40%;
    left: 20%;
    height: 8px;
    width: 2px;
    transform: rotate(-40deg) scale(0);
    background-color: green;
  }

  .task__checked-custom:after {
    content: '';
    position: absolute;
    top: 10%;
    right: 5px;
    height: 12px;
    width: 2px;
    transform: rotate(40deg) scale(0);
    background-color: green;
  }

  .task__checkbox:checked + .task__checked-custom:before {
    transform: rotate(-40deg) scale(1);
  }

  .task__checkbox:checked + .task__checked-custom:after {
    transform: rotate(40deg) scale(1);
  }

  .task__name {
    max-width: 270px;
  }

  .note__clear {
    display: inline-block;
    width: 12px;
    height: 12px;
    position: absolute;
    right: -3px;
    top: -3px;
    background-color: red;
  }

  .clear__line-1 {
    display: inline-block;
    margin-bottom: 5px;
    width: 2px;
    height: 8px;
    transform: rotate(40deg);
    background-color: #ffffff;
  }

  .clear__line-2 {
    display: inline-block;
    margin-bottom: 5px;
    width: 2px;
    height: 8px;
    transform: rotate(98deg);
    background-color: #ffffff;
  }
</style>
