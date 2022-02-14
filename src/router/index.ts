import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/AppHome.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/AppAbout.vue')
  },
  {
    path: '/createQuiz',
    name: 'CreateQuiz',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateQuiz.vue')
  },

  {
    path: '/myQuizes',
    name: 'myQuizes',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyQuizes.vue')
  },
  {
    path: '/Quiz/:id',
    name: 'QuizId',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuizView.vue')
  },
  {
    path: '/statistics/:quiz_id',
    name: 'Statistics',
    component: () => import(/* webpackChunkName: "about" */ '../views/StatisticsQuiz.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserLogin.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserSignup.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
