import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Screen from './views/Screens.vue'
import Slide from './views/Slides.vue'
import SlideDetails from './views/slides/SlidesDetails.vue'
import SlideAdd from './views/slides/SlideAdd.vue'
import ScreenDetails from './views/screens/ScreenDetails.vue'
import ScreenAdd from './views/screens/ScreenAdd.vue'
import Testing from './views/Testing.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/screens', component: Screen,
      children: [
        { 
          path: ':id/details',
          name: 'screen.detail',
          component: ScreenDetails
        },
        {
          path: 'add',
          name: 'screen.add',
          component: ScreenAdd
        }
      ]
    },
    {
      path: '/slides', component: Slide,
      children: [
        {
          path: ':id/details',
          name: 'slide.detail',
          component: SlideDetails
        },
        {
          path: 'add',
          name: 'slide.add',
          component: SlideAdd
        }
      ]
    },
    {
      path: '/test', //Path to test components
      name: 'testroute',
      component: Testing
    }
  ]
})
