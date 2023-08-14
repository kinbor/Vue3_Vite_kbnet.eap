<template>
  <div>
    <div @click="logoClick">
      <KbSvgIcon id="iconToolBox" icon-class="global-toolbox" style="color: #009dff" />
    </div>
    <el-dialog
      v-model="dialogVisible"
      :modal="false"
      :append-to-body="false"
      :show-close="false"
      top="50px"
    >
      <div>
        <light-box
          id="tool_lightbox"
          class="box-item hover-effect"
          @mouseover="styleOver('tool_lightbox')"
          @mouseout="styleLeave('tool_lightbox')"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LightBox from '@/components/eap/LightBox/index.vue'

export default {
  name: 'ToolBox',
  components: {
    LightBox
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    logoClick() {
      this.dialogVisible = true
    },
    styleOver(id) {
      document.getElementById(id).style.backgroundColor = '#E0E0E0'
    },
    styleLeave(id) {
      document.getElementById(id).style.backgroundColor = ''
    },
    childClick(id) {}
  }
}
</script>

<style scoped>
:deep(.el-dialog) {
  margin: 40px 0px;
  float: right;
  min-width: 360px;
  min-height: 300px;
  cursor: auto;
}
:deep(.el-dialog__header) {
  padding: 0px;
  padding-bottom: 0px;
  margin-right: 0px;
}
:deep(.el-dialog__body) {
  padding: 15px;
  color: #000000;
  font-size: 14px;
  word-break: break-all;
}
:deep(.el-dialog__footer) {
  padding: 0px;
  padding-bottom: 0px;
  margin-right: 0px;
}
</style>

<style scoped>
#iconToolBox {
  width: 32px;
  height: 32px;
  margin: 4px 8px 4px 8px;
}
.box-item {
  float: left;
  height: 100%;
  vertical-align: text-bottom;
  overflow: hidden;
}
.hover-effect {
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}
</style>
