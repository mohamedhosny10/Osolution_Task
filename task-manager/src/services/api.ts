const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJkdGFjb3F2Z2NpanJremt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzUwNjAsImV4cCI6MjA3MTYxMTA2MH0.SAF_9jupuaVLHq0l7Zbew7t6avUdg_UkdVGqLZmHTQE'
const apiUrl = 'https://kbybdtacoqvgcijrkzkv.supabase.co/rest/v1/tasks'

export async function addTask(taskData: any) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'apikey': apiKey,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(taskData),
  })
  return response.json()
}

export async function getTask(id: number) {
  const response = await fetch(`${apiUrl}?id=eq.${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'apikey': apiKey,
    },
  })
  const data = await response.json()
  return data[0]
}

export async function updateTask(id: number, data: any) {
  const response = await fetch(`${apiUrl}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'apikey': apiKey,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function deleteTask(id: number) {
  const response = await fetch(`${apiUrl}?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'apikey': apiKey,
    },
  })
  return response
}

