<template>
  <section class="body">
    <button class="note__clear" @click="$emit('flick')">
      <span class="clear__line-1"> <span class="clear__line-2" /> </span>
    </button>
  </section>
</template>

<script setup lang="ts">
  defineEmits<{ flick: [] }>()
</script>
<style scoped>
  .note__clear {
    display: inline-block;
    width: 12px;
    height: 12px;
    position: absolute;
    right: -15px;
    top: -8px;
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
