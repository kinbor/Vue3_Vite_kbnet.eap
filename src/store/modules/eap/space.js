import * as apiSpace from '@/api/eap/space'

/**
 * 状态存储：定义和存储space相关的数据
 */
const state = {
  boxList: []
}
/**
 * 状态更改：直接修改state中定义的数据
 */
const mutations = {
  SET_BOX_LIST: (state, dataList) => {
    for (let i = 0; i < dataList.length; i++) {
      if (!state.boxList.some(item => item.Id === dataList[i].Id)) {
        state.boxList.push(dataList[i])
      }
    }
  }
}
/**
 * 活动状态：定义数据的逻辑处理过程，执行commit状态更改操作，提交Promise()作业
 */
const actions = {
  getDataList({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      let goServer = true
      // 1.检验缓存中是否有数据
      if (state.boxList.length > 0) {
        const tmpList = state.boxList.filter(item => item.ParentId === itemId)
        if (tmpList && tmpList.length <= 0) {
          goServer = true
        } else {
          goServer = false
          resolve(tmpList)
        }
      }

      // 2.从服务器获取数据
      if (goServer) {
        apiSpace
          .GetBoxListByBoxId(itemId)
          .then(res => {
            const { MsgCode, MsgData, MsgError } = res
            if (MsgCode === '200') {
              const tmpList = JSON.parse(MsgData)
              commit('SET_BOX_LIST', tmpList)
              resolve(tmpList)
            } else {
              reject(MsgError)
            }
          })
          .catch(err => {
            reject(err)
          })
      }
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
