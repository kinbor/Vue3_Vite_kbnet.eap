import store from '@/store'
import eapClient from '@/configs/eap/client'
import eapSettings from '@/configs/eap/settings'
import * as apiAccount from '@/api/eap/account'
import * as apiLogin from '@/api/eap/login'
import * as funcRoute from '@/core/functions/routeFunc'
import * as eapToken from '@/core/browser/eap/token'

/**
 * 状态存储：定义和存储rights相关的数据
 */
const state = {
  id: '',
  name: '',
  avatar: '',
  isPower: false,
  module: eapSettings.eap_spa_module_default,
  rights: [],
  routes: [],
  orgId: ''
}
/**
 * 状态更改：直接修改state中定义的数据
 */
const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ISPOWER: (state, isPower) => {
    state.isPower = isPower
  },
  SET_MODULE: (state, module) => {
    state.module = module
  },
  SET_RIGHTS: (state, rights) => {
    state.rights = rights
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_ORGID: (state, orgId) => {
    state.orgId = orgId
  }
}
/**
 * 活动状态：定义数据的逻辑处理过程，执行commit状态更改操作，提交Promise()作业
 */
const actions = {
  getUserOrgs({ commit, state }) {
    return new Promise((resolve, reject) => {
      apiAccount
        .getUserOrgs()
        .then(res => {
          const { MsgCode, MsgData, MsgError } = res
          if (MsgCode === '200') {
            const orgList = JSON.parse(MsgData)
            // 存储用户机构列表
            localStorage.setItem(eapClient.eap_ls_f_account_org_list, orgList)

            // 设置用户默认机构
            const defaultOrgList = []
            orgList.forEach(item => {
              if (item.IsDefault === true) {
                if (defaultOrgList.indexOf(item) === -1) {
                  defaultOrgList.push(item)
                }
              }
            })
            if (defaultOrgList.length > 0) {
              localStorage.setItem(eapClient.eap_ls_f_account_org_id, defaultOrgList[0].OrgId)
            } else {
              if (orgList.length > 0) {
                localStorage.setItem(eapClient.eap_ls_f_account_org_id, orgList[0].OrgId)
              }
            }

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
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const orgId = localStorage.getItem(eapClient.eap_ls_f_account_org_id) || ''
      apiAccount
        .getUserInfo(orgId, '')
        .then(async res => {
          const { MsgCode, MsgData, MsgError } = res
          if (MsgCode === '200') {
            // 1.设置mutations
            const dtItem = JSON.parse(MsgData)
            commit('SET_ID', dtItem.Id)
            commit('SET_NAME', dtItem.Name)
            commit('SET_AVATAR', dtItem.Avatar)
            commit('SET_ISPOWER', true)
            commit('SET_RIGHTS', dtItem.Rights)

            // 2.加载路由信息
            await store.dispatch('eap_rights/loadRoutes')

            // 3.设置settings
            if (dtItem.Settings) {
              await store.dispatch('eap_settings/initSettings', dtItem.Settings)
            }

            // 4.加载模块信息
            await store.dispatch('eap_rights/loadModules', state.module.id)

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
  loadModules({ commit }, moduleId) {
    return new Promise((resolve, reject) => {
      // 1.找出moduleId的所有菜单项，设置为可见状态
      const tmpRights = []
      store.getters.rights.forEach(right => {
        const tmpRight = { ...right }
        if (tmpRight.CascadeId === moduleId || tmpRight.Id === moduleId) {
          tmpRights.push(tmpRight)
        }
      })
      funcRoute.showRoutes(tmpRights)

      // 2.更新module对象
      const targetRoute = funcRoute.findRoute(moduleId)
      if (targetRoute && targetRoute.meta) {
        commit('SET_MODULE', { id: targetRoute.meta.id, name: targetRoute.meta.title })
      }

      resolve()
    })
  },
  loadRoutes({ commit }) {
    return new Promise(resolve => {
      const rightsRoutes = funcRoute.findAccessedRoutes(state.rights)
      commit('SET_ROUTES', rightsRoutes)

      resolve()
    })
  },
  findRoute({ commit }, moduleId) {
    return new Promise(resolve => {
      const targetRoute = funcRoute.findRoute(moduleId)
      resolve(targetRoute)
    })
  },
  findRouteAndPath({ commit }, moduleId) {
    return new Promise(resolve => {
      const targetRoute = funcRoute.findRouteAndPath(moduleId)
      resolve(targetRoute)
    })
  },
  clearToken({ commit }) {
    return new Promise((resolve, reject) => {
      // 通知服务器登出
      apiLogin
        .logout()
        .then(res => {
          // 清空Cookie中的令牌信息
          eapToken.token_del()
          // 清空本地存储中的数据
          localStorage.clear()

          resolve()
        })
        .catch(() => {
          // 清空Cookie中的令牌信息
          eapToken.token_del()
          // 清空本地存储中的数据
          localStorage.clear()

          resolve()
        })
    })
  },
  async getProductRights() {
    await store.dispatch('product_rights/getRightsById')
  },
  async reloadRoutes() {
    await store.dispatch('eap_rights/loadRoutes')
    await store.dispatch('product_rights/loadRoutes')
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
