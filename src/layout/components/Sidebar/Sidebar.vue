<template>
  <div :class="{ 'has-logo': showLogo }">
    <item-logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in rights_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ItemLogo from '@/layout/components/Sidebar/ItemLogo.vue'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'

export default {
  components: { SidebarItem, ItemLogo },
  computed: {
    ...mapGetters(['rights_routes']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.$store.state.eap_app.sidebar.opened
    },
    showLogo() {
      return this.$store.state.eap_settings.sidebar_showLogo
    },
    variables() {
      return {
        menuBg: this.$store.state.eap_settings.sidebar_menu_bg,
        menuText: this.$store.state.eap_settings.sidebar_menu_color_text,
        menuActiveText: this.$store.state.eap_settings.sidebar_menu_color_activeText
      }
    }
  }
}
</script>
