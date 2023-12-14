<template>
  <button @click="$emit('edit')">edit</button>
</template>

<script setup lang="ts">
  defineEmits(['edit'])
</script>
<style scoped>
  button {
    text-align: center;
    padding: 10px 60px;
    outline: none;
    color: #fff;
    background: #9395d3;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    transition: all 0.8s;
  }
  button:hover {
    background-color: #000000;
    transition: all 0.8s;
  }
</style>
