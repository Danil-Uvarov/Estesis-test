<template>
  <label class="note__label-checkbox">
    <input v-model="value" class="note__checkbox" type="checkbox" />
    <span class="note__checkbox-custom" />
  </label>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps<{ checked: boolean }>()
  const emit = defineEmits(['update:checked'])

  const value = computed({
    get() {
      return props.checked
    },
    set(value) {
      emit('update:checked', value)
    },
  })
</script>
<style scoped>
  .note__label-checkbox {
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
  }

  .note__checkbox {
    display: none;
  }

  .note__checkbox-custom {
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 5px;
  }

  .note__checkbox-custom:before {
    content: '';
    position: absolute;
    border-radius: 5px;
    top: 3px;
    left: 3px;
    bottom: 3px;
    right: 3px;
    background-color: green;
    transform: scale(0);
    transition: 0.5s;
  }

  .note__checkbox:checked + .note__checkbox-custom:before {
    transform: scale(1);
  }
</style>
