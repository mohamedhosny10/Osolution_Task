<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useCategoriesStore } from '../stores/categories'

const taskStore = useTaskStore()
const categoriesStore = useCategoriesStore()
const selectedCategory = ref('')

onMounted(() => {
  taskStore.fetchTasks()
  categoriesStore.fetchCategories()
})

function filteredTasks() {
  if (!selectedCategory.value) {
    return taskStore.tasks
  }
  return taskStore.tasks.filter(task => task.category_id === Number(selectedCategory.value))
}
</script>

<template>
  <div style="padding: 20px;">
    <h1>Task List</h1>
    <router-link to="/add">
      <button>Add Task</button>
    </router-link>
    <div style="margin-top: 20px;">
      <select v-model="selectedCategory" style="margin-bottom: 20px;">
        <option value="">All Categories</option>
        <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <div v-if="taskStore.loading">loading...</div>
      <div v-for="task in filteredTasks()" :key="task.id" style="margin-top: 10px; border: 1px solid #ddd; padding: 10px; background: #f9f9f9;">
        <div>{{ task.title }}</div>
        <div>{{ task.category_id }}</div>
      </div>
    </div>
  </div>
</template>

