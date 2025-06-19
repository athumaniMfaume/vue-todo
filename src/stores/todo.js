import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const filter = ref('all')
  let nextId = 1

  // ✅ Create
  function addTodo(text) {
    todos.value.push({
      id: nextId++,
      text: text.trim(),
      completed: false,
    })
  }

  // ✅ Read (filtered)
  const filteredTodos = computed(() => {
    if (filter.value === 'active') {
      return todos.value.filter((todo) => !todo.completed)
    } else if (filter.value === 'completed') {
      return todos.value.filter((todo) => todo.completed)
    }
    return todos.value
  })

  // ✅ Update
  function updateTodo(id, newText) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.text = newText.trim()
    }
  }

  // ✅ Delete
  function deleteTodo(id) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  // ✅ Toggle completion
  function toggleTodo(id) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  // ✅ Change filter (all, active, completed)
  function changeFilter(type) {
    filter.value = type
  }

  return {
    todos,
    filter,
    filteredTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    changeFilter,
  }
})
