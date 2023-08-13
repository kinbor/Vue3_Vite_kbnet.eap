import Cookies from 'js-cookie'
import eapClient from '@/configs/eap/client'
import eapSettings from '@/configs/eap/settings'

export function token_domain() {
  if (eapClient.eap_cookie_v_sso) {
    const name = window.location.hostname
    const arr = eapClient.eap_cookie_v_sso.split('|')
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < arr.length; index++) {
      const dname = arr[index]
      if (name.indexOf(dname) > 0) {
        return eapClient.eap_cookie_v_domain
      }
    }
  }
  return null
}
export function token_del() {
  const tokenDomain = token_domain()
  // 1.删除令牌数据
  Cookies.remove(eapClient.eap_cookie_f_tokenData, { path: '/', domain: tokenDomain })
  // 2.删除令牌有效时间
  Cookies.remove(eapClient.eap_cookie_f_tokenTime, { path: '/', domain: tokenDomain })
}
export function token_get() {
  if (eapSettings.eap_svc_mock_isOpen) {
    // 1.获取令牌数据
    let tmpToken = Cookies.get(eapClient.eap_cookie_f_tokenData)
    if (tmpToken) {
      // 2.获取账号所属组织单位ID
      const tmpOrgId = localStorage.getItem(eapClient.eap_ls_f_account_org_id)
      if (tmpOrgId) {
        const tmpArray = tmpToken.split('.')
        if (tmpArray.length > 3) {
          tmpArray[3] = tmpOrgId
          tmpToken = tmpArray.join('.')
        } else {
          tmpToken += `.${tmpOrgId}`
        }
      }
    }
    return tmpToken
  }

  // 1.获取令牌有效时间
  const tokenTime = Cookies.get(eapClient.eap_cookie_f_tokenTime)
  if (tokenTime) {
    const nowTime = new Date().getTime()
    if (nowTime < tokenTime) {
      // 2.获取令牌数据
      let tmpToken = Cookies.get(eapClient.eap_cookie_f_tokenData)
      if (tmpToken) {
        // 3.获取账号所属组织单位ID
        const tmpOrgId = localStorage.getItem(eapClient.eap_ls_f_account_org_id)
        if (tmpOrgId) {
          const tmpArray = tmpToken.split('.')
          if (tmpArray.length > 3) {
            tmpArray[3] = tmpOrgId
            tmpToken = tmpArray.join('.')
          } else {
            tmpToken += `.${tmpOrgId}`
          }
        }
      }
      return tmpToken
    }
  }
  token_del()
  return null
}
export function token_set(token) {
  // 1.保存令牌数据
  const tokenDomain = token_domain()
  Cookies.set(eapClient.eap_cookie_f_tokenData, token, { path: '/', domain: tokenDomain })
  // 2.保存令牌有效时间
  const tokenTime = new Date(new Date().getTime() + 20 * 60 * 1000)
  Cookies.set(eapClient.eap_cookie_f_tokenTime, tokenTime.getTime(), {
    path: '/',
    domain: tokenDomain
  })
}
export function applicationType_get() {
  return eapClient.eap_cookie_v_applicationType
}
export function languageType_get() {
  return eapClient.eap_cookie_v_languageType
}
