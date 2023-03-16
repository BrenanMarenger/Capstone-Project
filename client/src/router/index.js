import Vue from 'vue'
import Router from 'vue-router'
import gallery from '@/components/gallery'
import register from '@/components/register'
import login from '@/components/login'
import display from '@/components/display'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
  routes: [
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
      path: '/display/:videoId/:time?',
      name: 'display',
      component: display,
      props: true
    },
    //
    {
      path: '/*',
      redirect: 'gallery'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = JSON.parse(window.localStorage.getItem('vuex'))
  
  if (token.isLoggedIn || to.name === 'register' || to.name === 'login') {
    next()
  } else {
    // Not logged in, redirect to login.
    next({ name: 'login' })
  }
}
);

export default router