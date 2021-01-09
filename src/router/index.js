import Vue from 'vue'
import VueRouter from 'vue-router'
import DogImages from '../components/DogImages.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/dogimages' },
  { path: '/dogimages', component: DogImages }
]

const router = new VueRouter({
  routes
})

export default router
