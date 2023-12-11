<template>
  <div class="body">
    <ul class="task__list">
      <li
        v-for="(task, indexTask) in notesList[routeNumber].tasks"
        :key="indexTask"
        class="task__link"
      >
        <h3
          class="task__link-title"
          :class="{ active: openId == indexTask }"
        ></h3>
        <red-cross></red-cross>
        <input
          v-model="task.nameTask"
          class="task__change-input"
          :class="{ open: openId == indexTask }"
          type="text"
        />
        <button class="task__modify" @click="isOpen(indexTask)">modify</button>
        <button class="note__clear" @click="deleteTask(indexTask)">
          clear-task
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useNotesStore } from '../store'
  import { storeToRefs } from 'pinia'
  import { ITasks } from '../models/entyties/ITasks.ts'
  import { useRoute } from 'vue-router'
  import RedCross from './ui/RedCross.vue'

  const route = useRoute()
  const store = useNotesStore()
  const { notesList } = storeToRefs(store)
  const openId = ref<number | null>(null)

  const isOpen = (i: number) => {
    if (i == openId.value) {
      openId.value = null
      return
    }
    openId.value = i
  }
  const deleteTask = (i: number) => {
    notesList.value[routeNumber].tasks.splice(i, 1)
  }

  defineProps<{ item: ITasks }>()
  const routeNumber = Number(route.params.id)
</script>

<style scoped>
  .task__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .task__link {
    position: relative;
    width: 100%;
  }

  .task__link-title {
    font-size: 24px;
    font-weight: 400;
  }

  .task__change-input {
    display: none;
  }

  .active {
    display: none;
  }

  .open {
    display: block;
  }

  .task__modify {
    position: absolute;
    top: -15px;
    left: 0;
    background: gold;
    border-radius: 10px;
    font-size: 8px;
    font-weight: 400;
  }

  .note__clear {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    border-radius: 8px;
    font-size: 8px;
    font-weight: 400;
  }
</style>
