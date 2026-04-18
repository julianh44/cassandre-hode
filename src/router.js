import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/politique-confidentialite',
    name: 'politique',
    component: PolitiqueConfidentialitePage,
  },
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
