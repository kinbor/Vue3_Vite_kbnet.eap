<template>
  <el-dropdown title="切换公司" trigger="click" @command="changeOrg">
    <div>
      <svg-icon icon-class="global-changeorg" />
    </div>
    <el-dropdown-menu>
      <el-dropdown-item
        v-for="(item, index) in orgList"
        :key="index"
        :command="index"
        :class="index === Number(currentIndex) ? 'active' : ''"
        >{{ item.OrgShortName }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import eapClient from '@/configs/eap/client'

export default {
  name: 'OrgBox',
  data() {
    return {
      orgList: JSON.parse(localStorage.getItem(eapClient.eap_ls_f_account_org_list)),
      // orgId: localStorage.getItem(LS_ACCOUNT_ORGANIZATION_ID),
      currentIndex: localStorage.getItem(eapClient.eap_ls_f_account_org_index) || 0
    }
  },
  methods: {
    changeOrg(val) {
      this.orgList.forEach((e, i) => {
        if (val === i) {
          this.currentIndex = val
          localStorage.setItem(eapClient.eap_ls_f_account_org_id, e.OrgId)
          localStorage.setItem(eapClient.eap_ls_f_account_org_index, this.currentIndex)
          // 进入到主页面
          window.location.href = '/'
          // 刷新页面，重新获取新机构的权限
          window.location.reload()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.changeorg-node-name {
  font-size: 14px;
  color: #606266;
}
.active {
  color: #409eff;
  background: transparent;
}
</style>
