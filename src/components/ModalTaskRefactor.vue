<template>
  <div class="modal__task-body">
    <red-cross @close="$emit('close')"></red-cross>
    <div class="modal__task-name">{{ name }}</div>
    <ui-input @change-value="changeName"></ui-input>
    <modal-button @click="show = !show"> make changes </modal-button>
    <WindowWarning v-if="show" @changes="getChanges"
      >Make changes to the task?</WindowWarning
    >
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import WindowWarning from '@/components/ui//WindowWarning.vue'
  import RedCross from '@/components/ui/RedCross.vue'
  import UiInput from '@/components/ui/UiInput.vue'
  import ModalButton from '@/components/ui/ModalButton.vue'

  interface IProps {
    nameTask: string
  }

  const props = defineProps<IProps>()
  const emit = defineEmits<{ close: [task?: string] }>()

  const name = ref<string>(props.nameTask)
  const show = ref<boolean>(false)

  const changeName = (inputValue: string) => {
    name.value = inputValue
  }
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
    flex-direction: column;
    align-items: center;
    gap: 30px;
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
</style>
