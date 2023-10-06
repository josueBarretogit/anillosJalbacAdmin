// Composables
import { createRouter, createWebHistory } from 'vue-router'
import login from './../views/login.vue'
import FormLayout from './../layouts/LoginLayout.vue'
import AnillosView from './../views/AnillosView.vue'

const routes = [
  {
    path: '/',
    component: AnillosView,
  },

  {
    path: '/usuario',
    component: FormLayout,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
