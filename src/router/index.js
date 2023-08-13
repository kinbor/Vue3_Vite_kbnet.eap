import * as vueRouter from 'vue-router'

import eapRouter from './modules/eap'
import errorRouter from './modules/error'
import productRouter from './modules/product'

export const routes_all = eapRouter.concat(errorRouter).concat(productRouter)
const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: routes_all
})

export default router
