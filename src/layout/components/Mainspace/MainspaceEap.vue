<template>
  <section class="app-main" :style="style_mainBG">
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script>
export default {
  name: 'MainspaceEap',
  computed: {
    key() {
      return this.$route.path
    },
    style_mainBG() {
      return {
        background: '#FFFFFF'
      }
    }
  }
}
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
