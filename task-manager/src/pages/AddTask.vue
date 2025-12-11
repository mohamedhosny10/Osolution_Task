<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoriesStore } from '../stores/categories'
import { addTask } from '../services/api'

const router = useRouter()
const categoriesStore = useCategoriesStore()
const myData = ref({
  title: '',
  description: '',
  category: '',
  priority: '',
  dueDate: '',
})

onMounted(() => {
  categoriesStore.fetchCategories()
})

async function doSave() {
  if (!myData.value.title.trim()) {
    return
  }
  
  const xTask: any = {
    title: myData.value.title,
    category_id: Number(myData.value.category),
  }
  
  if (myData.value.description) {
    xTask.description = myData.value.description
  }
  
  if (myData.value.priority) {
    xTask.priority = myData.value.priority
  }
  
  if (myData.value.dueDate) {
    xTask.due_date = myData.value.dueDate
  }
  
  await addTask(xTask)
  router.push('/')
}
</script>

<template>
  <div style="padding: 24px; max-width: 640px; margin: 0 auto; background: #fdfdfd; border: 1px solid #e5e5e5; border-radius: 8px;">
    <h1 style="margin-bottom: 16px;">Add Task</h1>
    <form @submit.prevent="doSave" style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Title</label>
        <input v-model="myData.title" type="text" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;" />
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Description</label>
        <input v-model="myData.description" type="text" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;" />
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Category</label>
        <select v-model="myData.category" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;">
          <option value="">Select Category</option>
          <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Priority</label>
        <select v-model="myData.priority" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;">
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Due Date</label>
        <input v-model="myData.dueDate" type="date" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;" />
      </div>
      <div style="display: flex; gap: 10px; margin-top: 8px;">
        <button type="submit" style="padding: 10px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Submit</button>
      </div>
    </form>
  </div>
</template>

