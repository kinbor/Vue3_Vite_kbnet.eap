import store from '@/store'
import eapClient from '@/configs/eap/client'
import * as funcRoute from '@/core/functions/routeFunc'
import pdtSettings from '@/configs/product/settings'
import * as apiApp from '@/api/product/app'

/**
 * 状态存储：定义和存储space相关的数据
 */
const state = {
  product: {
    Id: pdtSettings.product_id,
    Name: pdtSettings.product_name,
    Url: pdtSettings.product_url
  },
  rights: [],
  routes: []
}
/**
 * 状态更改：直接修改state中定义的数据
 */
const mutations = {
  SET_RIGHTS: (state, rights) => {
    state.rights = rights
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}
/**
 * 活动状态：定义数据的逻辑处理过程，执行commit状态更改操作，提交Promise()作业
 */
const actions = {
  getRightsById({ commit, state }) {
    return new Promise((resolve, reject) => {
      const orgId = localStorage.getItem(eapClient.eap_ls_f_account_org_id) || ''
      apiApp
        .GetRightsById(state.product.Id, store.getters.id, orgId)
        .then(async res => {
          const { MsgCode, MsgData, MsgError } = res
          if (MsgCode === '200') {
            // 1.存储权限信息
            const tmpRights = JSON.parse(MsgData)
            commit('SET_RIGHTS', tmpRights)

            // 2.加载路由信息
            const rightsRoutes = funcRoute.findAccessedRoutes(tmpRights)
            commit('SET_ROUTES', rightsRoutes)

            resolve()
          } else {
            reject(MsgError)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  loadRoutes({ commit }) {
    return new Promise(resolve => {
      const rightsRoutes = funcRoute.findAccessedRoutes(state.rights)
      commit('SET_ROUTES', rightsRoutes)

      resolve()
    })
  }
}
/**
 * 获取状态：实现只读运算的状态处理逻辑，避免在actions中实现非状态更改的操作
 */
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
