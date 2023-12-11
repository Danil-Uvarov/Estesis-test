<template>
  <div class="modal__task-body">
    <red-cross @flick="$emit('close')"></red-cross>
    <div class="modal__task-name">{{ name }}</div>
    <input v-model="name" type="text" class="task__modify-input" />
    <button class="modal__button-changes" @click="show = !show">
      make changes
    </button>
    <warning-window v-if="show" @changes="getChanges"
      >Make changes to the task?</warning-window
    >
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import WarningWindow from './ui/warningWindow.vue'
  import RedCross from './ui/redCross.vue'

  interface props {
    nameTask: string
  }

  const props = defineProps<props>()
  const emit = defineEmits<{ close: [task?: string] }>()

  const name = ref<string>(props.nameTask)
  const show = ref<boolean>(false)

  const getChanges = (result?: boolean) => {
    if (result) {
      emit('close', name.value)
    } else {
      emit('close')
    }
  }
</script>
<style scoped>
  .modal__task-body {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    z-index: 50;
    background-color: #808080;
  }
  .modal__task-name {
    font-weight: 700;
    font-size: 32px;
  }
  .task__modify-input {
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
    padding: 10px 30px;
    border-radius: 20px;
    z-index: 60;
  }
  .modal__button-changes {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 150px;
    padding: 10px;
    background: #9395d3;
    color: #ffffff;
    font-weight: 700;
    font-size: 32px;
    border-radius: 10px;
  }
</style>
