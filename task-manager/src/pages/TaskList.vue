<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useCategoriesStore } from '../stores/categories'
import { updateTask } from '../services/api'

const taskStore = useTaskStore()
const categoriesStore = useCategoriesStore()
const theCat = ref('')
const _temp = ref(null)

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
  <div style="padding: 20px;">
    <h1>Task List</h1>
    <router-link to="/add">
      <button>Add Task</button>
    </router-link>
    <div style="margin-top: 20px;">
      <select v-model="theCat" style="margin-bottom: 20px;">
        <option value="">All Categories</option>
        <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <div v-if="taskStore.loading">loading...</div>
      <div v-for="task in getTasks()" :key="task.id" style="margin-top: 10px; border: 1px solid #ddd; padding: 10px; background: #f9f9f9;">
        <input type="checkbox" :checked="task.completed" @change="changeIt(task)" />
        <div>{{ task.title }}</div>
        <div>{{ task.category_id }}</div>
      </div>
    </div>
  </div>
</template>

