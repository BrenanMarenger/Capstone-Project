import Vue from 'vue'
import Router from 'vue-router'
import gallery from '@/components/gallery'
import register from '@/components/register'
import login from '@/components/login'
import start from '@/components/start'
import display from '@/components/display'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: start
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: gallery
    },
    {
      path: '/display/:videoId',
      name: 'display',
      component: display
    },
  ]
})

// const router = VueRouter.createRouter({
//   history: VueRouter.createWebHashHistory(),
//   routes,
// })