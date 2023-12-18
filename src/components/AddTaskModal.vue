<template>
  <div class="add__task-frame">
    <div class="frame__wrapper">
      <h2 class="frame__wrapper-title"></h2>
      <div class="input__container">
        <UiInput v-model="newName">Add Task</UiInput>
        <UiButton @click="openWindow = !openWindow">Add</UiButton>
      </div>
    </div>
    <RedCross @close="close"></RedCross>
    <warning-window v-if="openWindow" @changes="close"
      >Put a new task on the list?</warning-window
    >
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import WarningWindow from '@/components/ui/WindowWarning.vue'
  import RedCross from '@/components/ui/RedCross.vue'
  import UiInput from '@/components/ui/UiInput.vue'
  import UiButton from '@/components/ui/ModalButton.vue'

  const emit = defineEmits<{ close: [newName?: string] }>()

  const newName = ref<string>('')
  const openWindow = ref<boolean>(false)

  const close = (result?: boolean) => {
    openWindow.value = !openWindow.value
    if (result) {
      emit('close', newName.value)
    } else {
      emit('close')
    }
  }
  onMounted(() => {
    return window.scrollTo(0, 0)
  })
</script>
<style scoped>
  .add__task-frame {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    z-index: 50;
    background-color: #808080;
  }

  .frame__wrapper {
    padding: 30px;
  }

  .frame__wrapper-title {
    text-align: center;
    font-weight: 700;
    font-size: 32px;
  }

  .input__container {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
</style>
