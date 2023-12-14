<template>
  <div class="form__input-wrapper">
    <input
      id="text"
      v-model="valueInput"
      class="form__input"
      placeholder=" "
      @update:model-value="changeInput"
    />
    <label for="text" class="form__label"><slot /></label>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const emit = defineEmits<{ changeValue: [valueInput: string] }>()
  const valueInput = ref<string>('')

  const changeInput = () => {
    emit('changeValue', valueInput.value)
  }
</script>
<style scoped>
  .form__input-wrapper {
    position: relative;
  }
  .form__input {
    color: #000000;
    background: #ecf0f3;
    border: 1px solid #9aa8ba;
    border-radius: 50px;
    outline: none;
    padding: 20px 60px 20px 60px;
    transition: all 0.8s;
    width: 100%;
    box-shadow:
      inset 6px 6px 6px #cbced1,
      inset -6px -6px 6px white;
  }
  .form__input:not(:placeholder-shown) {
    box-shadow: 8px 8px 20px 5px #000000;
  }
  .form__input:focus {
    box-shadow: 8px 8px 20px 5px #000000;
  }
  .form__input:focus + .form__label {
    top: -50px;
    left: 60px;
    font-weight: 600;
    font-size: 32px;
    color: #ffffff;
  }

  .form__input:not(:placeholder-shown) + .form__label {
    top: -50px;
    left: 60px;
    font-weight: 600;
    font-size: 32px;
    color: #ffffff;
  }
  .form__label {
    padding: 0 10px;
    color: #808080;
    position: absolute;
    transition-duration: 0.8s;
    left: 10px;
    top: 17px;
  }
</style>
