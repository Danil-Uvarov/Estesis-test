<template>
  <div class="btn">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
  .btn {
    font-weight: 500;
    font-size: 18px;
    margin-top: 40px;
    padding: 10px;
    color: #fff;
    transition: all 0.5s;
    position: relative;
    text-align: center;
    cursor: pointer;
  }
  .btn:hover {
    font-weight: 700;
    font-size: 42px;
    color: #008000;
  }
  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s;
    border: 1px solid #008000;
    transform: scale(1.2, 1.2);
  }
  .btn:hover::before {
    opacity: 1;
    transform: scale(1, 1);
  }
  .btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
  }
  .btn:hover::after {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
</style>
