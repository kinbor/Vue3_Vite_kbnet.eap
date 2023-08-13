import eapSettings from '@/configs/eap/settings'

export default function genPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${eapSettings.eap_app_name}`
  }
  return `${eapSettings.eap_app_name}`
}
