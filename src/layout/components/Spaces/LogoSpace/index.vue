<template>
  <div>
    <img src="/src/static/images/kbnet/logo.png" class="logo-image" />
    <div class="logo-name">{{ appName }}</div>
  </div>
</template>

<script>
import eapSettings from '@/configs/eap/settings.js'

export default {
  name: 'LogoSpace',
  data() {
    return {}
  },
  computed: {
    appName() {
      return eapSettings.eap_app_name
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-image {
  float: left;
  width: 24px;
  height: 24px;
  margin: 6px 10px 0px 10px;
}
.logo-name {
  float: left;
}
</style>
