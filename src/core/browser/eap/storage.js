import eapClient from '@/configs/eap/client'

export function ls_clear() {
  // 取出
  const ls_msgcode = localStorage.getItem(eapClient.eap_msg_f_timer_msgcode_count)
  const ls_noauthcode = localStorage.getItem(eapClient.eap_msg_f_no_auth_rights)
  // 清理
  localStorage.clear()
  // 存入
  localStorage.setItem(eapClient.eap_msg_f_timer_msgcode_count, ls_msgcode)
  localStorage.setItem(eapClient.eap_msg_f_no_auth_rights, ls_noauthcode)
}
