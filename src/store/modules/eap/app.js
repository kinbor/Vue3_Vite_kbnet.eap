import Cookies from 'js-cookie'
import eapClient from '@/configs/eap/client'

/**
 * 状态存储：定义和存储app相关的数据
 */
const state = {
  sidebar: {
    opened: Cookies.get(eapClient.eap_sidebar_f_cookie_status)
      ? !!+Cookies.get(eapClient.eap_sidebar_f_cookie_status)
      : true,
    withoutAnimation: false
  },
  device: 'desktop',
  deviceWidth: 0
}
/**
 * 状态更改：直接修改state中定义的数据
 */
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set(eapClient.eap_sidebar_f_cookie_status, 1)
    } else {
      Cookies.set(eapClient.eap_sidebar_f_cookie_status, 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set(eapClient.eap_sidebar_f_cookie_status, 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_DEVICE_WIDTH: (state, deviceWidth) => {
    state.deviceWidth = deviceWidth
  }
}
/**
 * 活动状态：定义数据的逻辑处理过程，执行commit状态更改操作，提交Promise()作业
 */
const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleDeviceWidth({ commit }, deviceWidth) {
    commit('TOGGLE_DEVICE_WIDTH', deviceWidth)
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
