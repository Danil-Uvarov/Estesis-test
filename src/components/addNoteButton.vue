<template>
  <router-link to="/addNote">
    <div class="add-note-button-wrapper">
      <button class="add-button" />
    </div>
  </router-link>
</template>

<script setup lang="ts"></script>

<style scoped>
  .add-note-button-wrapper {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .add-button {
    position: relative;
    padding: 40px;
    border-radius: 100%;
    border: none;
    background-color: aqua;
  }
  .add-button:after {
    content: '';
    position: absolute;
    top: 10%;
    left: 50%;
    width: 4px;
    height: 80%;
    background-color: #ffffff;
  }
  .add-button:before {
    content: '';
    position: absolute;
    top: 10%;
    left: 50%;
    width: 4px;
    height: 80%;
    transform: rotate(90deg);
    background-color: #ffffff;
  }
</style>
