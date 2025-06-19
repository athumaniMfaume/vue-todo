<template>
  <div class="app-wrapper">
    <div class="todo-container">
      <h1 class="todo-title">Vue To-Do App</h1>

      <!-- Add Todo -->
      <form @submit.prevent="addTodo" class="todo-form">
        <input
          v-model="text"
          placeholder="Add a new task..."
          class="todo-input"
          autocomplete="off"
        />
        <button type="submit" class="todo-add">Add</button>
      </form>

      <!-- Filter Buttons -->
      <div class="todo-filters">
        <button @click="store.changeFilter('all')" :class="filterClass('all')">All</button>
        <button @click="store.changeFilter('active')" :class="filterClass('active')">Active</button>
        <button @click="store.changeFilter('completed')" :class="filterClass('completed')">
          Completed
        </button>
      </div>

      <!-- Todo List -->
      <ul class="todo-list">
        <li v-for="todo in store.filteredTodos" :key="todo.id" class="todo-item">
          <div
            v-if="editingId !== todo.id"
            @click="toggleTodo(todo.id)"
            :class="['todo-text', { completed: todo.completed }]"
          >
            {{ todo.text }}
          </div>
          <input
            v-else
            v-model="editingText"
            @keyup.enter="saveEdit(todo.id)"
            @blur="cancelEdit"
            class="todo-edit-input"
            type="text"
            autofocus
          />

          <div class="todo-actions">
            <button @click="startEdit(todo)" v-if="editingId !== todo.id">✎</button>
            <button @click="store.deleteTodo(todo.id)">✕</button>
          </div>
        </li>

        <li v-if="store.filteredTodos.length === 0" class="todo-empty">No tasks found.</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from './stores/todo'

const store = useTodoStore()
const text = ref('')
const editingId = ref(null)
const editingText = ref('')

function addTodo() {
  if (text.value.trim()) {
    store.addTodo(text.value)
    text.value = ''
  }
}

function toggleTodo(id) {
  store.toggleTodo(id)
}

function startEdit(todo) {
  editingId.value = todo.id
  editingText.value = todo.text
}

function saveEdit(id) {
  if (editingText.value.trim()) {
    store.updateTodo(id, editingText.value)
  }
  cancelEdit()
}

function cancelEdit() {
  editingId.value = null
  editingText.value = ''
}

function filterClass(type) {
  return store.filter === type ? 'active' : ''
}
</script>

<style scoped>
/* Fullscreen Fit and Center */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
  background-color: #f0f4f8;
}

.todo-container {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

/* Title */
.todo-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Form */
.todo-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 480px) {
  .todo-form {
    flex-direction: row;
  }
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.todo-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.todo-add {
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.todo-add:hover {
  background-color: #2563eb;
}

/* Filters */
.todo-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.todo-filters button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: #e5e7eb;
  font-weight: 500;
  color: #374151;
  transition: 0.2s;
  cursor: pointer;
}

.todo-filters button:hover {
  background-color: #d1d5db;
}

.todo-filters .active {
  background-color: #3b82f6;
  color: white;
}

/* Todo List */
.todo-list {
  max-height: 60vh;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.todo-text {
  font-size: 1rem;
  cursor: pointer;
  flex: 1;
  color: #1f2937;
  word-break: break-word;
}

.todo-text.completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.todo-edit-input {
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #3b82f6;
  border-radius: 6px;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.todo-actions button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #6b7280;
}

.todo-actions button:hover {
  color: #ef4444;
}

.todo-empty {
  text-align: center;
  color: #9ca3af;
  padding: 1rem 0;
}
</style>
