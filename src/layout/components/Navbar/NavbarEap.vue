<template>
  <div class="navbar">
    <div id="leftMenu" class="left-menu">
      <div @click="logoClick">
        <img
          src="/src/static/images/kbnet/logo.png"
          class="left-menu-item hover-effect"
          style="float: left; margin: 6px 6px 0px 6px"
          width="24"
          height="24"
        />
        <div class="left-menu-item hover-effect">{{ appName }}</div>
      </div>
    </div>
    <div id="rightMenu" class="right-menu">
      <el-dropdown class="right-menu-item hover-effect" trigger="click">
        <div class="el-dropdown-link" style="height: 100%; line-height: 40px">
          语言<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div @click="langClick(false)">中文</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="langClick(true)">English</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import eapSettings from '@/configs/eap/settings.js'

export default {
  computed: {
    appName() {
      return eapSettings.eap_app_name
    }
  },
  methods: {
    logoClick() {
      window.location.href = '/'
    },
    langClick(isEnglish) {}
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  .left-menu {
    float: left;
    margin: 0px 8px 0px 8px;
    height: 100%;
    line-height: 40px;

    &:focus {
      outline: none;
    }

    .left-menu-item {
      display: inline-block;
      height: 100%;
      vertical-align: text-bottom;
      overflow: hidden;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
      }
    }
  }
  .right-menu {
    float: right;
    margin: 0px 8px 0px 8px;
    height: 100%;
    line-height: 40px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      vertical-align: text-bottom;
      overflow: hidden;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
      }
    }
  }
}
</style>
