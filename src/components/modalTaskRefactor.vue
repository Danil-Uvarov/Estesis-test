<template>
  <div class="modal__task-body">
    <button class="modal__close" @click="$emit('close')">
      <span class="close__line-1"> <span class="close__line-2" /> </span>
    </button>
    <div class="modal__task-name">{{ name }}</div>
    <input v-model="name" type="text" class="task__modify-input" />
    <button class="modal__button-changes" @click="show = !show">
      make changes
    </button>
    <warning-window v-if="show" @changes="getChanges"></warning-window>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import WarningWindow from './ui/warningWindow.vue'

  interface props {
    nameTask: string
  }

  const props = defineProps<props>()
  const emit = defineEmits<{ close: [task?: string] }>()

  const name = ref<string>(props.nameTask)
  const show = ref<boolean>(false)

  const getChanges = (yes: string) => {
    show.value = !show.value
    if (yes) {
      emit('close', name.value)
    }
    emit('close')
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
    background-color: #008000;
    font-weight: 700;
    font-size: 32px;
    border-radius: 10px;
  }
  .modal__close {
    display: inline-block;
    width: 12px;
    height: 12px;
    position: absolute;
    right: -3px;
    top: -3px;
    background-color: red;
  }

  .close__line-1 {
    display: inline-block;
    margin-bottom: 5px;
    width: 2px;
    height: 8px;
    transform: rotate(40deg);
    background-color: #ffffff;
  }
  .close__line-2 {
    display: inline-block;
    margin-bottom: 5px;
    width: 2px;
    height: 8px;
    transform: rotate(98deg);
    background-color: #ffffff;
  }
  .open {
    display: none;
  }
</style>
