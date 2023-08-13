<template>
  <div>
    <div @click="logoClick">
      <img src="/src/static/images/kbnet/logo.png" class="logo-avatar" />
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="product.Name"
        :disabled="tooltipDisabled"
        placement="right"
      >
        <div class="logo-name">
          <span id="logoNameTip">{{ product.Name }}</span>
        </div>
      </el-tooltip>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :modal="false"
      :append-to-body="false"
      :show-close="false"
      top="40px"
    >
      <!--由于更改el-dialog组件的样式使用:deep，所以append-to-body不能为true-->
      <template #header></template>
      <el-tabs tab-position="left">
        <el-tab-pane label="模块">
          <div style="margin: 0px 10px 6px 10px">
            <logo-box-item
              v-for="mItem in mdlRights"
              :key="mItem.Id"
              :item="mItem"
              @execNavigate="panelState"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="导航">
          <div style="margin: 0px 10px 6px 10px">
            <el-link :underline="false" href="/">平台空间</el-link>
            <el-link :underline="false" href="/">便捷工具</el-link>
          </div>
        </el-tab-pane>
      </el-tabs>
      <template #footer></template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LogoBoxItem from '@/components/eap/LogoBox/LogoBoxItem.vue'

export default {
  name: 'LogoBox',
  components: { LogoBoxItem },
  data() {
    return {
      tooltipDisabled: true,
      dialogVisible: false,
      mdlRights: []
    }
  },
  computed: {
    ...mapGetters(['product'])
  },
  mounted() {
    this.initData()
    this.initTip()
  },
  methods: {
    logoClick() {
      this.dialogVisible = true
    },
    panelState(isNavigate) {
      this.dialogVisible = !isNavigate
    },
    initTip() {
      const tmpEle = document.getElementById('logoNameTip')
      if (tmpEle) {
        if (tmpEle.parentNode.offsetWidth >= tmpEle.offsetWidth) {
          this.tooltipDisabled = true
        } else {
          this.tooltipDisabled = false
        }
      }
    },
    initData() {
      // 初始化：模块
      const { rights, product } = this.$store.getters
      for (let i = 0; i < rights.length; i++) {
        if (rights[i].OwnerId === product.Id) {
          if (rights[i].Type === 'Module' && rights[i].ParentId === '') {
            this.mdlRights.push(rights[i])
          }
        }
      }

      // 初始化：导航
    }
  }
}
</script>

<style scoped>
:deep(.el-dialog) {
  margin: 40px 0px;
  max-width: 720px;
  min-width: 320px;
  cursor: auto;
}
:deep(.el-dialog__header) {
  padding: 0px;
  padding-bottom: 0px;
  margin-right: 0px;
}
:deep(.el-dialog__body) {
  padding: 15px 15px;
  color: #000000;
  font-size: 14px;
  word-break: break-all;
}
:deep(.el-dialog__footer) {
  padding: 0px;
  padding-bottom: 0px;
  margin-right: 0px;
}
.logo-avatar {
  float: left;
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 9px 6px 0px 6px;
}
.logo-name {
  float: left;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  margin: 2px 0px 0px 0px;

  max-width: 144px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-link {
  margin: 0px 10px;
}
</style>
