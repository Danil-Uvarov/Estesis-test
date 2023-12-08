<template>
  <div v-for="(task, index) in tasks" :key="index" class="task">
    <div class="task__name">{{ task.nameTask }}</div>
    <input
      v-model="task.checked"
      type="checkbox"
      class="task__checkbox"
      @update:model-value="tasksAccomplished(index)"
    />

    <button class="task__modify" @click="openModal(index)">
      modify name task
    </button>
  </div>
  <modal-task-refactor v-if="open" :name-task="modifyTask.name" @close="close">
  </modal-task-refactor>
</template>

<script setup lang="ts">
  import { useNotesStore } from '../store/modalNote'
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'
  import { ITasks } from '../models/entyties/ITasks'
  import { ref } from 'vue'
  import ModalTaskRefactor from './modalTaskRefactor.vue'

  const props = defineProps<{ tasks: ITasks[] }>()
  const store = useNotesStore()
  const route = useRoute()
  const { notesList } = storeToRefs(store)
  const routeNumber = Number(route.params.id)
  const open = ref<boolean>(false)
  const modifyTask = ref<{ name: string; index: number }>({
    name: '',
    index: 0,
  })

  const close = (newName?: string) => {
    open.value = !open.value
    if (newName) {
      notesList.value[routeNumber].tasks[modifyTask.value.index].nameTask =
        newName
    }
  }
  const openModal = (i: number) => {
    open.value = !open.value
    modifyTask.value.name = notesList.value[routeNumber].tasks[i].nameTask
    modifyTask.value.index = i
  }
  const tasksAccomplished = (i: number) => {
    const result = props.tasks.find((item) => !item.checked)
    store.notesList[i].checked = !result
    store.setLocalStorage()
  }
</script>
<style scoped>
  .task {
    margin: 20px auto;
    width: 100%;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .task__name {
    font-weight: 500;
    font-size: 24px;
  }

  .task__checkbox {
    width: 40px;
    height: 40px;
  }

  .task__modify {
    padding: 2px;
    background: gold;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
  }
  .note__clear {
    display: inline-block;
    width: 12px;
    height: 12px;
    position: absolute;
    right: 0;
    top: 0;
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
