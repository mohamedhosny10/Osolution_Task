<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useCategoriesStore } from '../stores/categories'
import { updateTask } from '../services/api'

const taskStore = useTaskStore()
const categoriesStore = useCategoriesStore()
const theCat = ref('')


onMounted(() => {
  taskStore.fetchTasks()
  categoriesStore.fetchCategories()
})

function getTasks() {
  if (!theCat.value) {
    return taskStore.tasks
  }
  return taskStore.tasks.filter(task => task.category_id === Number(theCat.value))
}

async function changeIt(task: any) {
  const newVal = !task.completed
  await updateTask(task.id, { completed: newVal })
  task.completed = newVal
}
</script>

<template>
  <div style="padding: 24px; max-width: 900px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h1 style="margin: 0;">Task List</h1>
      <router-link to="/add">
        <button style="padding: 10px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Add Task</button>
      </router-link>
    </div>
    <div style="padding: 16px; border: 1px solid #e5e5e5; border-radius: 8px; background: #fdfdfd;">
      <select v-model="theCat" style="margin-bottom: 16px; padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px; width: 220px;">
        <option value="">All Categories</option>
        <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <div v-if="taskStore.loading" style="margin-top: 10px;">loading...</div>
      <div v-for="task in getTasks()" :key="task.id" style="margin-top: 12px; border: 1px solid #ddd; padding: 12px; background: #f9f9f9; border-radius: 6px; display: flex; gap: 12px; align-items: center;">
        <input type="checkbox" :checked="task.completed" @change="changeIt(task)" />
        <div style="flex: 1;">
          <div style="font-weight: 600;">{{ task.title }}</div>
          <div style="color: #555;">Category: {{ task.category_id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

