import Vue from 'vue'
import Router from 'vue-router'
import GameWindow from './views/GameWindow'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/room/:id',
      name: 'room',
      component: () => import(/* webpackChunkName: "about" */ './components/Room.vue')
    },
    {
      path: '/game/:id',
      name: 'game',
      component: GameWindow
    }
  ]
})
