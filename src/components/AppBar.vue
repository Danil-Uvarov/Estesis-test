<template>
  <header class="appBar-header">
    <h1 class="appBar__title">Todo list</h1>
    <div class="todos__quantity">10</div>
    <div class="todos__line" />
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
  .appBar-header {
    width: 100%;
    text-align: center;
  }

  .todos__quantity {
    margin-top: 18px;
    width: 100%;
    text-align: center;
  }

  .todos__line {
    margin-top: 15px;
    width: 100%;
    height: 2px;
    background-color: black;
  }
</style>
