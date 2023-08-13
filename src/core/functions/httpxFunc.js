import eapSettings from '@/configs/eap/settings'
import * as eapToken from '@/core/browser/eap/token'

export function genBaseUrl(svcAddress) {
  let serverUrl = svcAddress
  if (eapSettings.eap_svc_mock_isOpen) {
    // 更改为mock服务器
    serverUrl = eapSettings.eap_svc_mock_apiFlag
  }
  return serverUrl
}
export function setToken() {
  if (eapSettings.eap_svc_mock_isOpen) {
    // 设置Set-Token
    eapToken.token_set(
      '9484766273436437582.safhlasfhdasjkeuqfkasbljwrhlafjkdsagdflkjkgjfdagfsdjlkajsfsfasd.32483295477638682'
    )
  }
}
