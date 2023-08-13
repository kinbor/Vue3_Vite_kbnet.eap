<template>
  <div class="login-main">
    <div class="login-panel">
      <div class="login-title" />
      <!-- <div class="login-title">系统登录</div> -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <el-form-item prop="username">
          <span class="login-svg">
            <KbSvgIcon icon-class="login-user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="账号(ID\登录名\手机号\邮箱)"
            name="username"
            type="text"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="login-svg">
            <KbSvgIcon icon-class="login-password" />
          </span>
          <el-input
            ref="password"
            v-model="loginForm.password"
            placeholder="密码"
            name="password"
            :type="passwordType"
            tabindex="2"
          />
          <span class="show-pwd" @click="showPwd">
            <KbSvgIcon
              :icon-class="
                passwordType === 'password' ? 'login-password-eye-close' : 'login-password-eye-open'
              "
            />
          </span>
        </el-form-item>
      </el-form>
      <slider-unlock
        v-if="!isMobileBrowser"
        show-text="请拖动滑块解锁"
        success-text="验证通过  √"
        failure-text="验证失败  ×"
        forbidden-text="重试次数太多已被禁用"
        :init-time="captchaInit"
        class="login-slider"
        @captcha_status="handleCaptcha"
      />
      <div class="login-box">
        <div class="login-message">{{ messageText }}</div>
        <div style="margin: 5px 0px 0px 0px">
          <!-- 登陆按钮：#337ab7 -->
          <el-button
            :loading="loading"
            style="width: 320px; background-color: #1890ff; color: #ffffff; text-align: center"
            @click.prevent="handleLogin"
            >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button
          >
        </div>
        <div style="margin-top: 10px; font-size: 12px; color: #465c71">
          <div style="float: right; cursor: pointer" @click="findPwd">忘记密码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JSEncrypt from 'jsencrypt'
import SliderUnlock from '@/components/eap/SliderUnlock/index.vue'
import eapClient from '@/configs/eap/client'
import * as eapStorage from '@/core/browser/eap/storage'
import * as funcHttpx from '@/core/functions/httpxFunc'
import * as eapUtils from '@/utils'

export default {
  name: 'Login',
  components: {
    SliderUnlock
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '账号不允许为空!' }],
        password: [
          { required: true, trigger: 'blur', message: '密码不允许为空!' },
          { min: 6, max: 30, message: '密码长度不少于6个字符!', trigger: 'blur' }
        ]
      },
      captchaInit: '',
      captchaValue: '',
      encryptValue: '',
      encryptPubKey: '',
      messageText: '',
      isMobileBrowser: eapUtils.isMobile(),
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    eapStorage.ls_clear()
  },
  mounted() {
    this.readEncrypt()
    this.readMsgcode()
  },
  methods: {
    findPwd() {
      this.$router.push('/findPwd')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    readEncrypt() {
      this.$store
        .dispatch('eap_login/encrypt_get')
        .then(data => {
          if (data.MsgCode === '200') {
            const dtItem = JSON.parse(data.MsgData)

            this.message = ''
            this.encryptValue = dtItem.Id
            this.encryptPubKey = dtItem.Code
          } else {
            this.messageText = data.MsgError
          }
        })
        .catch(error => {
          this.messageText = error
        })
    },
    readMsgcode() {
      const ls_noCode = localStorage.getItem(eapClient.eap_msg_f_no_auth_rights)
      if (ls_noCode) {
        localStorage.removeItem(eapClient.eap_msg_f_no_auth_rights)
        switch (ls_noCode) {
          case '0':
            this.$message.error({
              message: '没有权限请求目标资源',
              duration: 5 * 1000,
              showClose: false
            })
            break
          case '1':
            this.$message.error({
              message: '授权无效,请重新登录',
              duration: 5 * 1000,
              showClose: false
            })
            break
        }
      }
    },
    handleCaptcha(data) {
      if (data.MsgCode === '200') {
        this.messageText = ''
        this.captchaValue = data.MsgData
      } else {
        this.messageText = data.MsgError
        this.captchaValue = ''
      }
    },
    validLogin() {
      // 非手机浏览器下验证码
      if (!this.isMobileBrowser && !this.captchaValue) {
        this.messageText = '验证码失败'
        return false
      }
      // 密码加密结果
      if (!this.encryptValue) {
        this.messageText = '密码加密失败，请重新打开页面'
        return false
      }

      this.messageText = ''
      return true
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid && this.validLogin()) {
          this.loading = true

          const dataForm = {
            LoginId: this.loginForm.username,
            CaptchaId: this.captchaValue,
            EncryptId: this.encryptValue,
            IsMobile: this.isMobileBrowser
          }

          const jse = new JSEncrypt()
          jse.setPublicKey(this.encryptPubKey)
          dataForm.LoginPwd = jse.encrypt(this.loginForm.password)

          try {
            const loginData = await this.$store.dispatch('eap_login/login', dataForm)
            if (loginData.MsgCode === '200') {
              // 前后端分离模式，mock环境测试
              funcHttpx.setToken()

              this.messageText = ''
              this.$router.push({ path: this.redirect || '/' })
            } else {
              this.messageText = loginData.MsgError

              this.loginForm.username = ''
              this.loginForm.password = ''
              this.captchaValue = ''
              this.captchaInit = new Date().getTime().toString()
            }
            this.loading = false
          } catch (error) {
            console.log(error)
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-form {
  .el-input {
    width: 80%;
    display: inline-block;
    border: 0px;
  }
  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 18px;

    .el-input__wrapper {
      box-shadow: none;
    }
  }
}
</style>
<style lang="scss" scoped>
.login-main {
  padding-top: 10%;
  width: 100%;
  height: calc(100% - 100px);
}
.login-panel {
  margin: 0% auto;
  width: 360px;
  height: 340px;
  position: relative;
  // background-color: #fafafa;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  touch-action: none;
  touch-action: pan-y;
  z-index: 98;
}
.login-title {
  text-align: center;
  height: 70px;
  line-height: 70px;
  font-size: 16px;
}
.login-form {
  width: 318px;
  height: 100px;
  margin: auto;
}
.login-svg {
  padding: 0px 5px 0px 15px;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.login-box {
  margin: 0px auto;
  width: 320px;
}
.login-message {
  margin: 5px 0px 0px 0px;
  text-align: center;
  color: red;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.login-slider {
  margin: 16px 0px 0px 0px;
}
</style>
