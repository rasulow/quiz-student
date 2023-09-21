import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/LoginPage.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/HomePage.vue')
  },
  {
    path: '/exams',
    name: 'exams',
    component: () => import('@/views/Exam/ExamPage.vue')
  },
  {
    path: '/passed-exams',
    name: 'passed',
    component: () => import('@/views/PassedExams/PassedExams.vue')
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('@/views/Quiz/QuizPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
