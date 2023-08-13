import axios from 'axios'
import store from '@/store'
import eapServer from '@/configs/eap/server'
import eapClient from '@/configs/eap/client'
import * as eapToken from '@/core/browser/eap/token'
import * as funcHttpx from '@/core/functions/httpxFunc'

// create an axios instance
const service = axios.create({
  baseURL: funcHttpx.genBaseUrl(eapServer.eap_svcAddress), // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: eapServer.eap_svcTimeout // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = eapToken.token_get()
    config.headers['ApplicationType'] = eapToken.applicationType_get()
    config.headers['LanguageType'] = eapToken.languageType_get()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const { data } = response
    if (data.MsgCode !== undefined) {
      // 1.更新Token
      const tokenData = response.headers['Set-Token']
      if (tokenData) {
        eapToken.token_set(tokenData)
      } else {
        const tokenData2 = response.headers['set-token']
        if (tokenData2) {
          eapToken.token_set(tokenData2)
        }
      }

      // 2.验证令牌码
      const tmpCode = parseInt(data.MsgCode, 10)
      if (tmpCode === 50002 || tmpCode === 50006 || tmpCode === 50013) {
        // 2.1.权限无效
        if (response.request.responseURL.indexOf(eapClient.eap_api_f_login) < 0) {
          store.dispatch('eap_rights/clearToken').then(() => {
            window.location.reload()
            localStorage.setItem(eapClient.eap_msg_f_no_auth_rights, 0)
          })
        }
      } else if (tmpCode === 50005 || tmpCode === 50010 || tmpCode === 50012) {
        // 2.2.令牌无效
        store.dispatch('eap_rights/clearToken').then(() => {
          window.location.reload()
          localStorage.setItem(eapClient.eap_msg_f_no_auth_rights, 1)
        })
      }
    }
    return data
  },
  error => {
    console.log(`err${error}`)
    return Promise.reject(error)
  }
)

export default service
