import * as eapLogin from '@/api/eap/login'

/**
 * 状态存储：定义和存储login相关的数据
 */
const state = {}
/**
 * 状态更改：直接修改state中定义的数据
 */
const mutations = {}
/**
 * 活动状态：定义数据的逻辑处理过程，执行commit状态更改操作，提交Promise()作业
 */
const actions = {
  login({ commit }, loginInfo) {
    return new Promise((resolve, reject) => {
      eapLogin
        .login(loginInfo)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  encrypt_get({ commit }) {
    return new Promise((resolve, reject) => {
      eapLogin
        .encrypt_get()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  captcha_get({ commit }) {
    return new Promise((resolve, reject) => {
      eapLogin
        .captcha_get()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  captcha_verify({ commit }, verifyInfo) {
    return new Promise((resolve, reject) => {
      eapLogin
        .captcha_verify(verifyInfo)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  findPwd_code({ commit }, dataInfo) {
    return new Promise((resolve, reject) => {
      eapLogin
        .findPwd_code(dataInfo.receiverCode, dataInfo.captchaId, dataInfo.isMobile)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  findPwd_verify({ commit }, dataInfo) {
    return new Promise((resolve, reject) => {
      eapLogin
        .findPwd_verify(dataInfo.fid, dataInfo.code)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  findPwd_reset({ commit }, dataInfo) {
    return new Promise((resolve, reject) => {
      eapLogin
        .findPwd_reset(dataInfo.fid, dataInfo.encryptId, dataInfo.newPwd)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
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
