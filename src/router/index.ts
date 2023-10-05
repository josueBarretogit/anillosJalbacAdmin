// Composables
import { createRouter, createWebHistory } from 'vue-router'
import login from './../views/login.vue'
import FormLayout from './../layouts/LoginLayout.vue'
const routes = [

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
