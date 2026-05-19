<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import TodoItem from './components/TodoItem.vue'
import Popup from './components/Popup.vue'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

const todos = ref([])
const newTodoTitle = ref('')

const showPopup = ref(false)
const todoForDelete = ref(null)

const errorMessage = ref('')

onMounted(() => {
  const savedTodos = localStorage.getItem('todos')

  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  } else {
    todos.value = [
      {
        id: 1,
        title: 'First item',
        completed: true
      },
      {
        id: 2,
        title: 'Second item',
        completed: false
      },
      {
        id: 3,
        title: 'Third item',
        completed: false
      }
    ]
  }
})

watch(
  todos,
  () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  },
  { deep: true }
)

async function addTodo() {
  const title = newTodoTitle.value.trim()

  if (!title) {
    return
  }

  errorMessage.value = ''

  try {
    const response = await axios.post(API_URL, {
      title,
      completed: false,
      userId: 1
    })

    if (response.status === 201) {
      const newTodo = {
        id: Date.now(),
        title,
        completed: false
      }

      todos.value.push(newTodo)
      newTodoTitle.value = ''
    }
  } catch (error) {
    errorMessage.value = 'Ошибка при добавлении задачи'
  }
}

async function toggleTodo(todo) {
  errorMessage.value = ''

  try {
    const response = await axios.patch(`${API_URL}/${todo.id}`, {
      completed: !todo.completed
    })

    if (response.status === 200) {
      todo.completed = !todo.completed
    }
  } catch (error) {
    errorMessage.value = 'Ошибка при изменении задачи'
  }
}

function askDelete(todo) {
  todoForDelete.value = todo
  showPopup.value = true
}

function cancelDelete() {
  todoForDelete.value = null
  showPopup.value = false
}

async function confirmDelete() {
  if (!todoForDelete.value) {
    return
  }

  errorMessage.value = ''

  try {
    const response = await axios.delete(`${API_URL}/${todoForDelete.value.id}`)

    if (response.status === 200) {
      todos.value = todos.value.filter((todo) => {
        return todo.id !== todoForDelete.value.id
      })

      todoForDelete.value = null
      showPopup.value = false
    }
  } catch (error) {
    errorMessage.value = 'Ошибка при удалении задачи'
  }
}
</script>

<template>
  <main class="app">
    <h1>To Do List</h1>

    <form class="form" @submit.prevent="addTodo">
      <input
        v-model="newTodoTitle"
        type="text"
        placeholder="New Task"
      >

      <button type="submit">
        Add
      </button>
    </form>

    <p v-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>

    <ul class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="askDelete"
      />
    </ul>

    <Popup
      :show="showPopup"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </main>
</template>

<style scoped>
.app {
  max-width: 700px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
}

h1 {
  font-weight: normal;
}

.form {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

input[type='text'] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
}

.form button {
  padding: 8px 18px;
  border: none;
  background: #2f80c9;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}

.todo-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.error {
  color: red;
}
</style>