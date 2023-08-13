<template>
  <div class="navbar">
    <div id="leftMenu" class="left-menu">
      <logo-space
        id="logobox"
        class="left-menu-item hover-effect"
        style="width: 180px"
        @click="logoClick"
        @mouseover="styleOver('logobox')"
        @mouseout="styleLeave('logobox')"
      />
      <path-space id="appSpacePath" class="left-menu-item hover-effect" />
      <path-space id="appSpacePathMobile" class="left-menu-item hover-effect" />
    </div>
    <div id="rightMenu" class="right-menu">
      <light-box
        id="lightbox"
        class="right-menu-item hover-effect"
        @mouseover="styleOver('lightbox')"
        @mouseout="styleLeave('lightbox')"
      />
      <screenfull-box
        id="screenfull"
        ref="screenfull"
        class="right-menu-item hover-effect"
        @click="childClick('screenfull')"
        @mouseover="styleOver('screenfull')"
        @mouseout="styleLeave('screenfull')"
      />
      <avatar
        id="userAvatar"
        ref="userAvatar"
        class="right-menu-item hover-effect"
        @click="childClick('userAvatar')"
        @mouseover="styleOver('userAvatar')"
        @mouseout="styleLeave('userAvatar')"
      />
    </div>
    <div id="rightMenuMobile" class="right-menu">
      <tool-box
        id="toolBox"
        ref="toolBox"
        class="right-menu-item hover-effect"
        @click="childClick('toolBox')"
        @mouseover="styleOver('toolBox')"
        @mouseout="styleLeave('toolBox')"
      />
      <avatar
        id="userAvatarMobile"
        ref="userAvatarMobile"
        class="right-menu-item hover-effect"
        @click="childClick('userAvatarMobile')"
        @mouseover="styleOver('userAvatarMobile')"
        @mouseout="styleLeave('userAvatarMobile')"
      />
    </div>
  </div>
</template>

<script>
import LogoSpace from '@/layout/components/Spaces/LogoSpace/index.vue'
import PathSpace from '@/layout/components/Spaces/PathSpace/index.vue'
import ScreenfullBox from '@/components/eap/ScreenfullBox/index.vue'
import LightBox from '@/components/eap/LightBox/index.vue'
import Avatar from '@/components/eap/Avatar/index.vue'
import ToolBox from '@/components/eap/ToolBox/index.vue'

export default {
  components: {
    LogoSpace,
    PathSpace,
    ScreenfullBox,
    LightBox,
    Avatar,
    ToolBox
  },
  methods: {
    logoClick() {
      window.location.href = '/'
    },
    styleOver(id) {
      document.getElementById(id).style.backgroundColor = '#E0E0E0'
    },
    styleLeave(id) {
      document.getElementById(id).style.backgroundColor = ''
    },
    childClick(id) {
      switch (id) {
        case 'userAvatar':
          this.$refs.userAvatar.logoClick()
          break
        case 'userAvatarMobile':
          this.$refs.userAvatarMobile.logoClick()
          break
        case 'screenfull':
          this.$refs.screenfull.logoClick()
          break
        case 'toolBox':
          this.$refs.toolBox.logoClick()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#appSpacePath {
  display: inline-block;
  cursor: auto;
  vertical-align: bottom;
  font-size: 16px;
}
#appSpacePathMobile {
  display: none;
  cursor: auto;
  vertical-align: bottom;
  font-size: 16px;
}
#rightMenu {
  display: inline-block;
}
#rightMenuMobile {
  display: none;
}

// 屏幕宽度小于1024px
@media screen and (max-width: 1024px) {
  #appSpacePath {
    display: none;
    cursor: auto;
    vertical-align: bottom;
    font-size: 16px;
  }
  #appSpacePathMobile {
    display: inline-block;
    cursor: auto;
    vertical-align: bottom;
    font-size: 16px;
  }
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
