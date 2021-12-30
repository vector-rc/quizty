import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/createQuiz',
    name: 'CreateQuiz',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateQuiz.vue')
  },
  
  {
    path: '/Quiz',
    name: 'Quiz',
    redirect:'/',
    //component: () => import(/* webpackChunkName: "about" */ '../views/Quiz.vue')
  },
  {
    path: '/Quiz/:id',
    name: 'QuizId',
    component: () => import(/* webpackChunkName: "about" */ '../views/Quiz.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
