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
const _temp = ref(null)

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
  <div style="padding: 20px;">
    <div v-if="loadVal">loading...</div>
    <div v-else-if="xTask">
      <h1>{{ xTask.title }}</h1>
      <div style="margin-top: 20px;">
        <div><strong>Description:</strong> {{ xTask.description || 'No description' }}</div>
        <div style="margin-top: 10px;"><strong>Category:</strong> {{ getOne(xTask.category_id) }}</div>
        <div style="margin-top: 10px;"><strong>Priority:</strong> {{ xTask.priority || 'Not set' }}</div>
        <div style="margin-top: 10px;"><strong>Due Date:</strong> {{ xTask.due_date || 'Not set' }}</div>
        <div style="margin-top: 20px;">
          <img v-if="xTask.image_url" :src="xTask.image_url" alt="Task image" style="max-width: 400px;" />
        </div>
        <div style="margin-top: 20px;">
          <button @click="changeIt">Edit</button>
          <button @click="makeDelete" style="margin-left: 10px;">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

