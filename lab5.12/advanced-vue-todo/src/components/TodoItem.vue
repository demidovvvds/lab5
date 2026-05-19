<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'delete'])
</script>

<template>
  <li class="todo-item">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle', todo)"
    >

    <span :class="{ completed: todo.completed }">
      {{ todo.title }}
    </span>

    <button class="delete" @click="emit('delete', todo)">
      ×
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: grid;
  grid-template-columns: 30px 1fr 40px;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-bottom: none;
}

.todo-item:last-child {
  border-bottom: 1px solid #ddd;
}

.completed {
  text-decoration: line-through;
  color: #777;
}

.delete {
  border: none;
  background: white;
  color: red;
  font-size: 22px;
  cursor: pointer;
}
</style>