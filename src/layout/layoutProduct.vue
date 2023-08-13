<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="clickOutside" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar-product />
      </div>
      <sidebar-product class="sidebar-container" />
      <mainspace-product />
    </div>
  </div>
</template>

<script>
import MainspaceProduct from '@/layout/components/Mainspace/MainspaceProduct.vue'
import NavbarProduct from '@/layout/components/Navbar/NavbarProduct.vue'
import SidebarProduct from '@/layout/components/Sidebar/Sidebar.vue'
import { useResize } from '@/layout/composables/ResizeHandler'

export default {
  name: 'LayoutProduct',
  components: {
    NavbarProduct,
    SidebarProduct,
    MainspaceProduct
  },
  setup() {
    useResize()
  },
  computed: {
    sidebar() {
      return this.$store.state.eap_app.sidebar
    },
    device() {
      return this.$store.state.eap_app.device
    },
    fixedHeader() {
      return this.$store.state.eap_settings.tool_fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    clickOutside() {
      this.$store.dispatch('eap_app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
scrollBar {
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}
relative {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile .openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
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
.hideSidebar .fixed-header {
  width: 100%;
}
.mobile .fixed-header {
  width: 100%;
}
</style>
