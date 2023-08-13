<template>
  <router-view />
</template>

<script>
import { isMobile } from '@/utils'
import eapSettings from '@/configs/eap/settings'

export default {
  name: 'App',
  mounted() {
    // 1.修改手机模式布局方式
    if (isMobile()) {
      document
        .querySelector('meta[name="viewport"]')
        .setAttribute(
          'content',
          'width=device-width, initial-scale=0.8, maximum-scale=0.8, user-scalable=yes'
        )
    }

    // 2.修改标题
    document.title = eapSettings.eap_app_name
  }
}
</script>

<style scoped></style>
