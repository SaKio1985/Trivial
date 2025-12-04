import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GamePage from '../views/GamePage.vue'
import FInishPage from '@/views/FInishPage.vue'
import RankingPage from '@/views/RankingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage,
    },
    {
      path: '/finish/:score',
      name: 'finish',
      component: FInishPage,
    },
    {
      path: '/ranking/:score',
      name: 'ranking',
      component: RankingPage,
    },
  ],
})

export default router
