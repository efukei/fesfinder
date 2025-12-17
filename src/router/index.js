import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import SearchResult from '../views/SearchResult.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/search', name: 'search', component: SearchResult },
  { path: '/event/:slug', name: 'eventDetail', component: () => import('../views/EventDetail.vue') },
  { path: '/contact', name: 'contact', component: () => import('../views/Contact.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router