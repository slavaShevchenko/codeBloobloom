import Vue from 'vue'
import VueRouter from 'vue-router'
import CollectionView from '../views/CollectionView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'spectacles-women' }
  },
  {
    path: '/spectacles-women',
    name: 'spectacles-women',
    component: CollectionView
  },
  {
    path: '/spectacles-men',
    name: 'spectacles-men',
    component: CollectionView
  },
  {
    path: '/sunglasses-women',
    name: 'sunglasses-women',
    component: CollectionView
  },
  {
    path: '/sunglasses-men',
    name: 'sunglasses-men',
    component: CollectionView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
