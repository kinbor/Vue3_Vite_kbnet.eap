<template>
  <el-dropdown trigger="click">
    <div>
      <KbSvgIcon id="iconLightBox" icon-class="global-lightbox" style="color: #009dff" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <div style="padding: 12px 8px 8px 8px">
          <el-slider
            v-model="value"
            vertical
            height="100px"
            :show-tooltip="false"
            @input="SliderInput"
            @change="SliderChange"
          />
        </div>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: 'LightBox',
  data() {
    return {
      value: parseInt(this.$store.state.eap_settings.tool_light, 10)
    }
  },
  mounted() {
    this.SliderInput()
  },
  methods: {
    SliderChange() {
      this.$store.dispatch('eap_settings/changeSetting', { key: 'tool_light', value: this.value })
    },
    SliderInput() {
      const newValue = (100 - this.value) / 200
      document.getElementById('appLight').style.backgroundColor = `rgba(0, 0, 0,${newValue})`
    }
  }
}
</script>

<style lang="scss" scoped>
#iconLightBox {
  width: 24px;
  height: 24px;
  margin: 8px 10px 8px 10px;
}
</style>
