import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/market',
      name: 'market',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }, {
      path: '/create-trade',
      name: 'create-trade',
      component: () => import('../views/CreateTrade.vue')
    },
    {
      path: '/check-profile',
      name: 'check-profile',
      component: () => import('../views/AccountPage.vue')
    }
  ]
})

export default router
