<template>
  <div class="app-container">
    <div :class="{ 'fixed-header': fixedHeader }">
      <navbar-space />
    </div>
    <mainspace-space />
  </div>
</template>

<script>
import MainspaceSpace from '@/layout/components/Mainspace/MainspaceSpace.vue'
import NavbarSpace from '@/layout/components/Navbar/NavbarSpace.vue'

export default {
  name: 'LayoutSpace',
  components: {
    MainspaceSpace,
    NavbarSpace
  },
  data() {
    return {}
  },
  computed: {
    fixedHeader() {
      return this.$store.state.eap_settings.tool_fixedHeader
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
  background-color: #ffffff;
  margin: 0% auto;
  width: 100%;
  height: 100%;
  padding: 0px;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
  padding: 0px;
}
</style>
