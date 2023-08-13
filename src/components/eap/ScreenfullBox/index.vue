<template>
  <div @click="logoClick">
    <KbSvgIcon
      id="iconFullScreen"
      :icon-class="isFullscreen ? 'global-fullscreen-close' : 'global-fullscreen-open'"
      style="color: #009dff"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'ScreenfullBox',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.initCom()
  },
  beforeUnmount() {
    this.uninitCom()
  },
  methods: {
    logoClick() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    changeState() {
      this.isFullscreen = screenfull.isFullscreen
    },
    initCom() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.changeState)
      }
    },
    uninitCom() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.changeState)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#iconFullScreen {
  width: 20px;
  height: 20px;
  margin: 10px 10px 0px 10px;
}
</style>
