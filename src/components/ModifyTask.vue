<template>
  <div v-for="(task, index) in tasks" :key="index" class="task">
    <button class="task__modify" @click="openModal(index)">
      modify name task
    </button>
    <input
      v-model="task.checked"
      type="checkbox"
      class="task__checkbox"
      @update:model-value="tasksAccomplished(index)"
    />

    <div class="task__name">
      {{ task.nameTask }}
      <red-cross
        style="position: absolute; top: 0; right: 0"
        @flick="deleteTask"
      ></red-cross>
    </div>
  </div>
  <WindowWarning v-if="openWindow" @changes="deleteTask"
    >To delete the task?
  </WindowWarning>
  <modal-task-refactor v-if="open" :name-task="modifyTask.name" @close="close">
  </modal-task-refactor>
</template>

<script setup lang="ts">
  import { useNotesStore } from '../store'
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'
  import { ITasks } from '../models/entyties/ITasks'
  import { ref } from 'vue'
  import ModalTaskRefactor from './ModalTaskRefactor.vue'
  import WindowWarning from './ui/WindowWarning.vue'
  import RedCross from './ui/RedCross.vue'

  const props = defineProps<{ tasks: ITasks[] }>()
  const store = useNotesStore()
  const route = useRoute()
  const { notesList } = storeToRefs(store)
  const routeNumber = Number(route.params.id)
  const open = ref<boolean>(false)
  const openWindow = ref<boolean>(false)
  const modifyTask = ref<{ name: string; index: number }>({
    name: '',
    index: 0,
  })
  const taskIdDelete = ref<number>(0)

  const deleteTask = (result?: boolean) => {
    openWindow.value = !openWindow.value
    if (result) {
      notesList.value[routeNumber].tasks.splice(taskIdDelete, 1)
    }
  }
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
  }
</script>
<style scoped>
  .task {
    padding: 0 20px;
    position: relative;
    margin: 20px;
    width: 100%;
    display: grid;
    grid-template-columns: 20% 20% 50%;
  }

  .task__name {
    position: relative;
    font-weight: 500;
    font-size: 24px;
    margin: auto 0;
    text-align: center;
  }

  .task__checkbox {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin: auto auto;
  }

  .task__modify {
    cursor: pointer;
    max-height: 50px;
    max-width: 60px;
    margin: auto 0;
    padding: 2px;
    background: gold;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
  }
</style>
