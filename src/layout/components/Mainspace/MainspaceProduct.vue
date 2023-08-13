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
  name: 'MainspaceProduct',
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
  width: 100%;
  position: relative;
  overflow: hidden;
  top: 40px;
}
</style>
