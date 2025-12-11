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
  const _temp = ref(null)

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
  <div style="padding: 20px;">
    <h1>Edit Task</h1>
    <div v-if="loadVal">loading...</div>
    <form v-else @submit.prevent="doSave">
      <div style="margin-top: 20px;">
        <label>Title</label>
        <input v-model="form_data.title" type="text" />
      </div>
      <div style="margin-top: 20px;">
        <label>Description</label>
        <input v-model="form_data.description" type="text" />
      </div>
      <div style="margin-top: 20px;">
        <label>Category</label>
        <select v-model="form_data.category">
          <option value="">Select Category</option>
          <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div style="margin-top: 20px;">
        <label>Priority</label>
        <select v-model="form_data.priority">
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div style="margin-top: 20px;">
        <label>Due Date</label>
        <input v-model="form_data.dueDate" type="date" />
      </div>
      <div style="margin-top: 20px;">
        <button type="submit">Save</button>
        <button type="button" @click="makeDelete" style="margin-left: 10px;">Delete</button>
      </div>
    </form>
  </div>
</template>

