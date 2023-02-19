import Vue from 'vue'
import Router from 'vue-router'
import gallery from '@/components/gallery'
import register from '@/components/register'
import login from '@/components/login'
import start from '@/components/start'
import display from '@/components/display'
//import store from '@/store/store'


Vue.use(Router)

const router = new Router({
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
    {
      path: '*',
      redirect: 'gallery' //use this if the user is not logged in?
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = JSON.parse(window.localStorage.getItem('vuex'))
  console.log(token.isLoggedIn)
  // If logged in, or going to the login page.
  if (token.isLoggedIn || to.name === 'register' || to.name === 'login') {
    next()
  } else {
    // Not logged in, redirect to login.
    next({ name: 'login' })
  }
}
);

export default router