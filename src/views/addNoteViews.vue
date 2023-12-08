<template>
  <div class="note">
    <div class="note__wrapper">
      <label class="note__name-label">
        note
        <input
          v-model="inputNote"
          class="note-input"
          type="text"
          :placeholder="placeholderNote"
        />
      </label>
      <button class="note__add-button" @click="addNote">add note</button>
      <ul class="note__name-list">
        <li v-if="note.name" class="note__name-link">
          заметка: {{ note.name }}
        </li>
      </ul>
    </div>
    <div class="task__wrapper">
      <label class="task__name-label">
        task
        <input
          v-model="inputTask"
          class="task-input"
          type="text"
          placeholder="enter a task"
        />
      </label>
      <button class="task__add-button" @click="addTask">add task</button>
      <ol class="task__name-list">
        <li
          v-for="(task, index) in note.tasks"
          :key="index"
          class="task__name-link"
        >
          задача - {{ task.nameTask }}
        </li>
      </ol>
    </div>
    <div class="buttons__wrapper">
      <RouterLink to="/">
        <button class="button__add" @click="pushNoteStore(note)">
          Добавить заметку
        </button>
      </RouterLink>
      <button class="button__clear" @click="clear">очистить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { INote } from '../models/entyties/INote'
  import { ref } from 'vue'
  import { useNotesStore } from '../store/modalNote'

  const notesStore = useNotesStore()
  const inputNote = ref('')
  const inputTask = ref('')
  const note = ref<INote>({
    name: '',
    checked: false,
    tasks: [],
  })

  const placeholderNote = ref('enter a note')

  function addNote() {
    if (note.value.name.length === 0) {
      note.value.name = inputNote.value
      inputNote.value = ''
    } else {
      inputNote.value = ''
      placeholderNote.value = '1 задача уже существует '
    }
  }

  const addTask = () => {
    note.value.tasks.push({ nameTask: inputTask.value, checked: false })
    inputTask.value = ''
  }

  const clear = () => {
    note.value.name = ''
    note.value.tasks = []
  }

  const pushNoteStore = (note: INote) => {
    notesStore.notesList.push(note)
    notesStore.setLocalStorage()
  }
</script>

<style scoped>
  .note {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }

  .note__wrapper {
  }

  .note__name-label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .note-input {
    border-radius: 5px;
    padding: 5px;
  }

  .note__name-list {
    margin-top: 18px;
  }

  .note__name-link {
    font-size: 24px;
    font-weight: 700;
  }

  .note__add-button {
    margin-top: 10px;
    border-radius: 4px;
    padding: 5px;
    border: none;
  }

  .task__wrapper {
  }

  .task__name-label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .task-input {
    border-radius: 5px;
    padding: 5px;
  }

  .task__add-button {
    margin-top: 10px;
    border-radius: 4px;
    padding: 5px;
    border: none;
  }

  .task__name-list {
    margin-top: 18px;
  }

  .task__name-link {
    margin-top: 8px;
    font-size: 18px;
  }

  .buttons__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .button__add {
    padding: 5px;
    border-radius: 4px;
    border: none;
  }

  .button__clear {
    padding: 5px;
    border-radius: 4px;
    border: none;
  }
</style>
../models/entyties/notesList
