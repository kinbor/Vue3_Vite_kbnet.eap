/**
 * 状态存储：定义和存储account相关的数据
 */
const state = {}
/**
 * 状态更改：直接修改state中定义的数据
 */
const mutations = {}
/**
 * 活动状态：定义数据的逻辑处理过程，执行commit状态更改操作，提交Promise()作业
 */
const actions = {}
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
