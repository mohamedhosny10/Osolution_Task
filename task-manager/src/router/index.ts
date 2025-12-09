import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../pages/TaskList.vue'
import TaskDetails from '../pages/TaskDetails.vue'
import AddTask from '../pages/AddTask.vue'
import EditTask from '../pages/EditTask.vue'

const routes = [
  { path: '/', component: TaskList },
  { path: '/task/:id', component: TaskDetails },
  { path: '/add', component: AddTask },
  { path: '/edit/:id', component: EditTask },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

