<template>
  <div class="navbar">
    <div id="leftMenu" class="left-menu">
      <hamburger
        id="hamburger"
        :is-active="sidebar.opened"
        class="left-menu-item"
        @toggleClick="toggleSideBar"
        @mouseover="styleOver('hamburger')"
        @mouseout="styleLeave('hamburger')"
      />
      <logo-box
        id="logoBox"
        ref="logoBox"
        class="left-menu-item hover-effect"
        style="width: 180px"
        @mouseover="styleOver('logoBox')"
        @mouseout="styleLeave('logoBox')"
      />
    </div>
    <div id="rightMenu" class="right-menu">
      <light-box
        id="lightbox"
        class="right-menu-item hover-effect"
        @mouseover="styleOver('lightbox')"
        @mouseout="styleLeave('lightbox')"
      />
      <screenfull-box
        id="screenfullBox"
        ref="screenfullBox"
        class="right-menu-item hover-effect"
        @mouseover="styleOver('screenfullBox')"
        @mouseout="styleLeave('screenfullBox')"
      />
      <avatar
        id="userAvatar"
        ref="userAvatar"
        class="right-menu-item hover-effect"
        @mouseover="styleOver('userAvatar')"
        @mouseout="styleLeave('userAvatar')"
      />
    </div>
    <div id="rightMenuMobile" class="right-menu">
      <tool-box
        id="toolBox"
        ref="toolBox"
        class="right-menu-item hover-effect"
        @mouseover="styleOver('toolBox')"
        @mouseout="styleLeave('toolBox')"
      />
      <avatar
        id="userAvatarMobile"
        ref="userAvatarMobile"
        class="right-menu-item hover-effect"
        @mouseover="styleOver('userAvatarMobile')"
        @mouseout="styleLeave('userAvatarMobile')"
      />
    </div>
  </div>
</template>

<script>
import Hamburger from '@/components/eap/Hamburger/index.vue'
import LogoBox from '@/components/eap/LogoBox/index.vue'
import ScreenfullBox from '@/components/eap/ScreenfullBox/index.vue'
import LightBox from '@/components/eap/LightBox/index.vue'
import Avatar from '@/components/eap/Avatar/index.vue'
import ToolBox from '@/components/eap/ToolBox/index.vue'

export default {
  components: {
    Hamburger,
    LogoBox,
    ScreenfullBox,
    LightBox,
    Avatar,
    ToolBox
  },
  data() {
    return {
      sidebar: this.$store.state.eap_app.sidebar
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('eap_app/toggleSideBar')
    },
    styleOver(id) {
      document.getElementById(id).style.backgroundColor = '#E0E0E0'
    },
    styleLeave(id) {
      document.getElementById(id).style.backgroundColor = ''
    }
  }
}
</script>

<style lang="scss" scoped>
#rightMenu {
  display: inline-block;
}
#rightMenuMobile {
  display: none;
}

// 屏幕宽度小于1024px
@media screen and (max-width: 1024px) {
  #rightMenu {
    display: none;
  }
  #rightMenuMobile {
    display: inline-block;
  }
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #bbbbbb;

  .left-menu {
    float: left;
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
