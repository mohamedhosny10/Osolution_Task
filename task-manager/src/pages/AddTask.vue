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
const loadVal = ref(false)

onMounted(() => {
  categoriesStore.fetchCategories()
  loadVal.value = true
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
  <div style="padding: 20px;">
    <h1>Add Task</h1>
    <form @submit.prevent="doSave">
      <div style="margin-top: 20px;">
        <label>Title</label>
        <input v-model="myData.title" type="text" />
      </div>
      <div style="margin-top: 20px;">
        <label>Description</label>
        <input v-model="myData.description" type="text" />
      </div>
      <div style="margin-top: 20px;">
        <label>Category</label>
        <select v-model="myData.category">
          <option value="">Select Category</option>
          <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div style="margin-top: 20px;">
        <label>Priority</label>
        <select v-model="myData.priority">
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div style="margin-top: 20px;">
        <label>Due Date</label>
        <input v-model="myData.dueDate" type="date" />
      </div>
      <div style="margin-top: 20px;">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

