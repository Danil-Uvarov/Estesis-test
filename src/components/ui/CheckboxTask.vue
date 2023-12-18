<template>
  <label>
    <input
      v-model="value"
      :disabled="disable"
      type="checkbox"
      class="custom-checkbox" />
    <span></span
  ></label>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{ checked: boolean; disable?: boolean }>()
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
<style>
  label {
    display: flex;
    justify-content: center;
  }

  .custom-checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .custom-checkbox + span {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }

  .custom-checkbox + span::before {
    cursor: pointer;
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 2px solid #ff0000;
    border-radius: 0.25em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  .custom-checkbox:checked + span::before {
    border-color: #0b76ef;
    background-color: #0b76ef;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  .custom-checkbox:not(:disabled):not(:checked) + span:hover::before {
    border-color: #b3d7ff;
  }

  .custom-checkbox:not(:disabled):active + span::before {
    background-color: #b3d7ff;
    border-color: #b3d7ff;
  }

  .custom-checkbox:focus + span::before {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .custom-checkbox:focus:not(:checked) + span::before {
    border-color: #80bdff;
  }

  .custom-checkbox:disabled + span::before {
    cursor: auto;
  }
</style>
