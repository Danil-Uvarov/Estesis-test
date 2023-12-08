<template>
  <section class="modal hidden">
    <h1 class="modal__title">Уверены что хотете внести изменения?</h1>
    <div class="modal__buttons-wrapper">
      <button class="button-true" @click="$emit('changes', 'yes')">да</button>
      <button class="button__false" @click="$emit('changes')">нет</button>
    </div>
  </section>
</template>

<script setup lang="ts">
  defineEmits(['changes'])
</script>

<style scoped>
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
  }
  .modal__title {
    font-weight: 700;
    font-size: 32px;
  }
  .modal__buttons-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .button-true {
    background-color: #008000;
    padding: 10px;
  }

  .button__false {
    background-color: #000000;
    padding: 10px;
    color: #ffff;
  }
</style>
