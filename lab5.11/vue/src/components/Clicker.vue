<script setup>
import { ref } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['button-clicked'])

const count = ref(0)

function handleClick() {
  count.value += props.amount
  emit('button-clicked')
}
</script>

<template>
  <button class="clicker" @click="handleClick">
    <slot>Кликнуть</slot>
    <span> — очки: {{ count }}</span>
  </button>
</template>

<style scoped>
.clicker {
  padding: 8px 12px;
  margin: 6px;
  cursor: pointer;
}
</style>