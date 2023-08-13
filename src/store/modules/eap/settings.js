import eapClient from '@/configs/eap/client'
import * as eapSettings from '@/api/eap/settings'
import skinColor from '@/styles/scss/variables.module.scss'

/**
 * 状态存储：定义和存储settings相关的数据
 */
const state = {
  tool_fixedHeader: eapClient.eap_tool_v_fixedHeader,
  tool_theme: eapClient.eap_tool_v_theme,
  tool_light: eapClient.eap_tool_v_light,
  sidebar_showLogo: eapClient.eap_sidebar_v_showLogo,
  sidebar_menu_bg: skinColor.sidebar_menu_bg,
  sidebar_menu_color_text: skinColor.sidebar_menu_color_text,
  sidebar_menu_color_activeText: skinColor.sidebar_menu_color_activeText
}
/**
 * 状态更改：直接修改state中定义的数据
 */
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}
/**
 * 活动状态：定义数据的逻辑处理过程，执行commit状态更改操作，提交Promise()作业
 */
const actions = {
  initSettings({ commit }, dataList) {
    return new Promise((resolve, reject) => {
      if (dataList && dataList.length > 0) {
        for (let index = 0; index < dataList.length; index++) {
          if (dataList[index].SKey.toLowerCase() === 'tool_fixedHeader') {
            commit('CHANGE_SETTING', { key: 'tool_fixedHeader', value: dataList[index].SValue })
          }
          if (dataList[index].SKey.toLowerCase() === 'tool_theme') {
            commit('CHANGE_SETTING', { key: 'tool_theme', value: dataList[index].SValue })
          }
          if (dataList[index].SKey.toLowerCase() === 'tool_light') {
            commit('CHANGE_SETTING', { key: 'tool_light', value: dataList[index].SValue })
          }
        }
      }
      resolve()
    })
  },
  changeSetting({ commit }, data) {
    return new Promise((resolve, reject) => {
      // 1.提交变更数据
      commit('CHANGE_SETTING', data)

      if (data.key === 'tool_theme' || data.key === 'tool_light') {
        // 2.更新本地存储
        const dataValue = localStorage.getItem(data.key)
        if (dataValue && dataValue !== data.value) {
          localStorage.setItem(data.key, data.value)
        }
        // 3.保存变更数据
        eapSettings
          .toolSet(data.key, data.value)
          .then(res => {
            const { MsgCode, MsgError } = res
            if (MsgCode !== '200') {
              reject(MsgError)
            } else {
              resolve()
            }
          })
          .catch(err => {
            reject(err)
          })
      }
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
