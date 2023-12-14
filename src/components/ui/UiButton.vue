<template>
  <button @click="$emit('edit')"><slot /></button>
</template>

<script setup lang="ts">
  defineEmits(['edit'])
</script>
<style scoped>
  button {
    background-color: #0a0a23;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 15px;
    min-height: 30px;
    min-width: 120px;
    cursor: pointer;
    transition: all 0.4s;
  }
  button:hover {
    box-shadow: 2px 1px 12px 6px;
  }
</style>
