import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('./views/Publish.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('./views/Posts.vue')
    },
    {
      path: '/infomation',
      name: 'infomation',
      component: () => import('./views/Infomation.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue')
    }
  ]
})
