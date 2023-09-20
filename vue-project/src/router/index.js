import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main.vue'
import About from '../pages/About.vue'
import Contacts from '../pages/Contacts.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import Basket from '../pages/Basket.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
        {
          path:'/',
          name:'main',
          component:Main
        },
        {
          path:'/contacts',
          name:'contacts',
          component:Contacts
        },
        {
          path:'/about',
          name:'about',
          component:About
        },
        {
          path:'/basket',
          name:'basket',
          component:Basket
        },
        {
          path:'/product-details/:title',
          name:'product-details',
          component:ProductDetails
        },

  ]
})

export default router
