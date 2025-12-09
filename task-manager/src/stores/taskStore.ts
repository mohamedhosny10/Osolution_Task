import { defineStore } from 'pinia'

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJkdGFjb3F2Z2NpanJremt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzUwNjAsImV4cCI6MjA3MTYxMTA2MH0.SAF_9jupuaVLHq0l7Zbew7t6avUdg_UkdVGqLZmHTQE'
const apiUrl = 'https://kbybdtacoqvgcijrkzkv.supabase.co/rest/v1/tasks'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as any[],
    loading: false,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'apikey': apiKey,
        },
      })
      const data = await response.json()
      this.tasks = data
      this.loading = false
    },
  },
})

