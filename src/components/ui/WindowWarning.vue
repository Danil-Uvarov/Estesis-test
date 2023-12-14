<template>
  <section class="background"></section>
  <div class="modal">
    <h1 class="modal__title"><slot> </slot></h1>
    <div class="modal__buttons-wrapper">
      <button class="button-true" @click="$emit('changes', true)">yes</button>
      <button class="button__false" @click="$emit('changes')">no</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineEmits<{
    changes: [result?: boolean]
  }>()
</script>

<style scoped>
  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    background-color: grey;
    opacity: 0.8;
  }
  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    width: 450px;
    padding: 20px;
    min-height: 250px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff0000;
    border-radius: 15px;
    z-index: 100;
  }
  .modal__title {
    text-align: center;
    font-weight: 700;
    font-size: 32px;
  }
  .modal__buttons-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .button-true {
    font-weight: 500;
    font-size: 24px;
    background-color: #008000;
    padding: 15px;
    border-radius: 50px;
    border: none;
    transition: all 0.5s;
    cursor: pointer;
  }

  .button__false {
    font-weight: 500;
    font-size: 24px;
    background-color: #000000;
    padding: 15px;
    border-radius: 50px;
    color: #ffff;
    border: none;
    transition: all 0.5s;
    cursor: pointer;
  }
  .button-true:hover {
    box-shadow: 0 2px 12px 7px #808080;
  }
  .button__false:hover {
    box-shadow: 0 2px 12px 7px #808080;
  }
</style>
