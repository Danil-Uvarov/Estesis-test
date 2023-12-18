<template>
  <div
    v-for="(task, index) in notesList[routeNumber].tasks"
    :key="index"
    class="task"
  >
    <UiModifyButton @edit="openModal(index)" />
    <CheckboxTask v-model:checked="task.checked"></CheckboxTask>
    <div class="task__name">
      {{ task.nameTask }}
    </div>
    <red-cross @click="saveNumber(index)"></red-cross>
  </div>
  <WindowWarning v-if="openWindow" @changes="deleteTask"
    >To delete the task?
  </WindowWarning>
  <modal-task-refactor v-if="open" :name-task="modifyTask.name" @close="close">
  </modal-task-refactor>
</template>

<script setup lang="ts">
  import { useNotesStore } from '@/store/Index.ts'
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import ModalTaskRefactor from '@/components/ModalTaskRefactor.vue'
  import WindowWarning from '@/components/ui/WindowWarning.vue'
  import RedCross from '@/components/ui/RedCross.vue'
  import UiModifyButton from '@/components/ui/ModifyButton.vue'
  import CheckboxTask from '@/components/ui/CheckboxTask.vue'

  const store = useNotesStore()
  const route = useRoute()
  const { notesList } = storeToRefs(store)
  const routeNumber = Number(route.params.id)
  const open = ref<boolean>(false)
  const openWindow = ref<boolean>(false)
  const taskIdDelete = ref<number>(0)
  const saveNumber = (index: number) => {
    openWindow.value = !openWindow.value
    taskIdDelete.value = index
  }
  const modifyTask = ref<{ name: string; index: number }>({
    name: '',
    index: 0,
  })

  const deleteTask = (result?: boolean) => {
    openWindow.value = !openWindow.value
    if (result) {
      notesList.value[routeNumber].tasks.splice(taskIdDelete.value, 1)
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
</script>
<style scoped>
  .task {
    position: relative;
    padding: 5px;
    margin: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 12px;
    border: 2px solid #000000;
    border-radius: 8px;
  }

  .task__name {
    max-width: 340px;
    height: 100%;
    font-weight: 500;
    font-size: 24px;
    margin: auto 0;
    text-align: center;
  }

  .task__checkbox {
    cursor: pointer;
    width: 40px;
    height: 40px;
    min-width: 40px;
    margin: auto 0;
  }
</style>
