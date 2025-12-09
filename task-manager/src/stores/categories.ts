import { defineStore } from 'pinia'

const apiKey = 'YOUR_API_KEY'
const apiUrl = 'https://kbybdtacoqvgcijrkzkv.supabase.co/rest/v1/categories'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as any[],
  }),
  actions: {
    async fetchCategories() {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'apikey': apiKey,
        },
      })
      const data = await response.json()
      this.categories = data
    },
  },
})

