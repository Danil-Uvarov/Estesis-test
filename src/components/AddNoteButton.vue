<template>
  <div class="add-note-button-wrapper">
    <router-link to="/addNote">
      <button class="add-button" />
    </router-link>
  </div>
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
    cursor: pointer;
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
