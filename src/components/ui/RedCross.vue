<template>
  <button class="note__clear" @click="$emit('close')">
    <span class="clear__line-1"> <span class="clear__line-2" /> </span>
  </button>
</template>

<script setup lang="ts">
  defineEmits<{ close: [] }>()
</script>
<style scoped>
  .note__clear {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 1px solid #000000;
    position: absolute;
    right: 2px;
    top: 2px;
    background-color: red;
    transition: all 0.3s;
    cursor: pointer;
  }

  .clear__line-1 {
    display: inline-block;
    margin-top: 2px;
    width: 3px;
    height: 14px;
    transform: rotate(45deg);
    background-color: #ffffff;
    border-radius: 10px;
  }

  .clear__line-2 {
    margin-top: 0;
    display: inline-block;
    width: 3px;
    height: 14px;
    transform: rotate(95deg);
    background-color: #ffffff;
    border-radius: 10px;
  }
  .note__clear:hover {
    width: 25px;
    height: 25px;
    transform: rotate(-180deg);
    transition: all 0.3s;
  }
</style>
