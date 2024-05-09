import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentsView from '../views/StudentsView.vue'
import SettingView from '@/views/SettingView.vue'
import RiegenZuteilungView from '@/views/RiegenZuteilungView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/students',
      name: 'students',
      component: StudentsView
    },
    {
      path: '/riegenzuteilung',
      name: 'riegenzuteilung',
      component: RiegenZuteilungView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  ]
})

export default router
