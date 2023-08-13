<template>
  <div class="app-container">
    <div class="app-header">
      <navbar-eap />
    </div>
    <mainspace-eap />
    <div class="app-footer">
      <div class="copyright">{{ copyright }}</div>
    </div>
  </div>
</template>

<script>
import MainspaceEap from '@/layout/components/Mainspace/MainspaceEap.vue'
import NavbarEap from '@/layout/components/Navbar/NavbarEap.vue'
import eapSettings from '@/configs/eap/settings.js'

export default {
  name: 'LayoutEap',
  components: {
    MainspaceEap,
    NavbarEap
  },
  data() {
    return {
      copyright: eapSettings.eap_app_copyright
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  // background-color: #d2d6de;
  background-color: #fff;
  margin: 0% auto;
  width: 100%;
  height: 100%;
  padding: 0px;
}
.app-header {
  width: 100%;
  height: 40px;
  padding: 0px;
  background: #fff;
  border-bottom: 1px solid #bbbbbb;
  // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.app-footer {
  width: 100%;
  height: 40px;
  border-top: 0px solid #bbbbbb;
  z-index: 1;
}
.copyright {
  width: 100%;
  padding: 15px 10px 0px 10px;
  text-align: center;
  color: #8f9bb2;
  position: relative;
  bottom: 0;
  font-size: 13px;
}
</style>
