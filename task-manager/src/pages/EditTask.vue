  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useCategoriesStore } from '../stores/categories'
  import { getTask, updateTask, deleteTask } from '../services/api'

  const router = useRouter()
  const route = useRoute()
  const categoriesStore = useCategoriesStore()
  const loadVal = ref(false)
  const form_data = ref({
    title: '',
    description: '',
    category: '',
    priority: '',
    dueDate: '',
  })


  onMounted(async () => {
    categoriesStore.fetchCategories()
    const tt = Number(route.params.id)
    loadVal.value = true
    const xTask = await getTask(tt)
    if (xTask) {
      form_data.value.title = xTask.title || ''
      form_data.value.description = xTask.description || ''
      form_data.value.category = xTask.category_id || ''
      form_data.value.priority = xTask.priority || ''
      form_data.value.dueDate = xTask.due_date || ''
    }
    loadVal.value = false
  })

  async function doSave() {
    if (!form_data.value.title.trim()) {
      return
    }
    
    const tt = Number(route.params.id)
    const theData: any = {
      title: form_data.value.title,
      category_id: Number(form_data.value.category),
    }
    
    if (form_data.value.description) {
      theData.description = form_data.value.description
    }
    
    if (form_data.value.priority) {
      theData.priority = form_data.value.priority
    }
    
    if (form_data.value.dueDate) {
      theData.due_date = form_data.value.dueDate
    }
    
    await updateTask(tt, theData)
    router.push('/')
  }

  async function makeDelete() {
    const tt = Number(route.params.id)
    await deleteTask(tt)
    router.push('/')
  }
  </script>

<template>
  <div style="padding: 24px; max-width: 640px; margin: 0 auto; background: #fdfdfd; border: 1px solid #e5e5e5; border-radius: 8px;">
    <h1 style="margin-bottom: 16px;">Edit Task</h1>
    <div v-if="loadVal">loading...</div>
    <form v-else @submit.prevent="doSave" style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Title</label>
        <input v-model="form_data.title" type="text" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;" />
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Description</label>
        <input v-model="form_data.description" type="text" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;" />
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Category</label>
        <select v-model="form_data.category" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;">
          <option value="">Select Category</option>
          <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Priority</label>
        <select v-model="form_data.priority" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;">
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label>Due Date</label>
        <input v-model="form_data.dueDate" type="date" style="padding: 10px; border: 1px solid #d0d0d0; border-radius: 6px;" />
      </div>
      <div style="display: flex; gap: 10px; margin-top: 8px;">
        <button type="submit" style="padding: 10px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">Save</button>
        <button type="button" @click="makeDelete" style="padding: 10px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Delete</button>
      </div>
    </form>
  </div>
</template>

