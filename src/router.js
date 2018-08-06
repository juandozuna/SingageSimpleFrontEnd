import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Screen from './views/Screens.vue'
import Testing from './views/Testing.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/screens',
      component: Screen,
      children: [
        { 
          path: '/:name/details',
          name: 'screen.detail',
          component:  () => import('./views/screens/ScreenDetails.vue')
        }
      ]
    },
    ,
    {
      path: '/test', //Path to test components
      name: 'testroute',
      component: Testing
    }
  ]
})
