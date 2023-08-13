import { watchEffect, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import eapClient from '@/configs/eap/client'

export function useResize() {
  const { body } = document
  const store = useStore()

  function isMobile() {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < eapClient.eap_html_v_desptop_minwidth
  }
  function resizeHandler() {
    if (!document.hidden) {
      const isMbl = isMobile()
      store.dispatch('eap_app/toggleDevice', isMbl ? 'mobile' : 'desktop')

      if (isMbl) {
        store.dispatch('eap_app/closeSideBar', { withoutAnimation: true })
      }
      store.dispatch('eap_app/toggleDeviceWidth', body.getBoundingClientRect().width)
    }
  }

  watchEffect((newPath, oldPath) => {
    if (store.state.eap_app.device === 'mobile' && store.state.eap_app.sidebar.opened) {
      store.dispatch('eap_app/closeSideBar', { withoutAnimation: false })
    }
  })
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
  onMounted(() => {
    const isMbl = isMobile()
    if (isMbl) {
      store.dispatch('eap_app/toggleDevice', 'mobile')
      store.dispatch('eap_app/closeSideBar', { withoutAnimation: true })
    }
  })
}
