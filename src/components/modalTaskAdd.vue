<template>
  <div class="add__task-frame">
    <div class="frame__wrapper">
      <h2 class="frame__wrapper-title">Add Task</h2>
      <div class="input__container">
        <input
          v-model="newName"
          class="frame__wrapper-input"
          type="text"
          name="name"
        />
        <button class="input__button" @click="$emit('close', newName)">
          add
        </button>
      </div>
    </div>
    <button class="note__clear" @click="$emit('close')">
      <span class="clear__line-1"> <span class="clear__line-2" /> </span>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  defineEmits<{ close: [newName?: string] }>()

  const newName = ref<string>('')
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

  .frame__wrapper-input {
    padding: 10px 30px;
    border-radius: 10px;
  }

  .input__button {
    margin-top: 40px;
    padding: 10px;
    background-color: #008000;
    font-weight: 700;
    font-size: 32px;
    border-radius: 10px;
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
