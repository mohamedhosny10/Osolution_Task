<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTask, deleteTask } from '../services/api'
import { useCategoriesStore } from '../stores/categories'

const route = useRoute()
const router = useRouter()
const categoriesStore = useCategoriesStore()
const xTask = ref<any>(null)
const loadVal = ref(false)


onMounted(async () => {
  categoriesStore.fetchCategories()
  const tt = Number(route.params.id)
  loadVal.value = true
  xTask.value = await getTask(tt)
  loadVal.value = false
})

function getOne(cat_id: number) {
  const theCat = categoriesStore.categories.find(cat => cat.id === cat_id)
  return theCat ? theCat.name : ''
}

async function makeDelete() {
  const tt = Number(route.params.id)
  await deleteTask(tt)
  router.push('/')
}

function changeIt() {
  router.push(`/edit/${route.params.id}`)
}
</script>

<template>
  <div style="padding: 24px; max-width: 720px; margin: 0 auto;">
    <div v-if="loadVal" style="padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px; background: #fdfdfd;">loading...</div>
    <div v-else-if="xTask" style="padding: 24px; border: 1px solid #e5e5e5; border-radius: 8px; background: #fdfdfd;">
      <h1 style="margin-bottom: 16px;">{{ xTask.title }}</h1>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div><strong>Description:</strong> {{ xTask.description || 'No description' }}</div>
        <div><strong>Category:</strong> {{ getOne(xTask.category_id) }}</div>
        <div><strong>Priority:</strong> {{ xTask.priority || 'Not set' }}</div>
        <div><strong>Due Date:</strong> {{ xTask.due_date || 'Not set' }}</div>
        <div style="margin-top: 8px;">
          <img v-if="xTask.image_url" :src="xTask.image_url" alt="Task image" style="max-width: 420px; width: 100%; border-radius: 6px; border: 1px solid #e5e5e5;" />
        </div>
        <div style="display: flex; gap: 10px; margin-top: 12px;">
          <button @click="changeIt" style="padding: 10px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Edit</button>
          <button @click="makeDelete" style="padding: 10px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

