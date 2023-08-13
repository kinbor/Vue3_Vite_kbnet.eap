<template>
  <div class="reset-main">
    <div class="reset-logo" />
    <div class="reset-panel">
      <div class="reset-title">重置密码</div>
      <el-form ref="resetForm" :model="resetForm" :rules="resetRules" class="reset-form">
        <el-form-item prop="newPwd">
          <span class="reset-svg">
            <KbSvgIcon icon-class="login-password" />
          </span>
          <el-input
            ref="newPwd"
            v-model="resetForm.newPwd"
            placeholder="新密码"
            name="newPwd"
            :type="passwordType"
            tabindex="1"
          />
          <span class="show-pwd" @click="showPwd(false)">
            <KbSvgIcon
              :icon-class="
                passwordType === 'password' ? 'login-password-eye-close' : 'login-password-eye-open'
              "
            />
          </span>
        </el-form-item>
        <el-form-item prop="enterPwd">
          <span class="reset-svg">
            <KbSvgIcon icon-class="login-password" />
          </span>
          <el-input
            ref="enterPwd"
            v-model="resetForm.enterPwd"
            placeholder="确认密码"
            name="enterPwd"
            :type="enterPasswordType"
            tabindex="2"
          />
          <span class="show-pwd" @click="showPwd(true)">
            <KbSvgIcon
              :icon-class="
                enterPasswordType === 'password'
                  ? 'login-password-eye-close'
                  : 'login-password-eye-open'
              "
            />
          </span>
        </el-form-item>
      </el-form>
      <div class="reset-box">
        <div class="reset-message">{{ messageText }}</div>
        <div style="margin: 5px 0px 0px 0px">
          <el-button
            :loading="loading"
            :disabled="btnResetPwdDisabled"
            style="width: 320px; background-color: #1890ff; color: #ffffff; text-align: center"
            @click.prevent="handleReset"
            >重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button
          >
        </div>
        <div style="margin-top: 10px; font-size: 12px; color: #465c71">
          <div
            id="loginGO"
            style="float: right; cursor: pointer; display: none"
            @click="loginClick"
          >
            马上登录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JSEncrypt from 'jsencrypt'

export default {
  name: 'ResetPwd',
  data() {
    return {
      resetForm: {
        newPwd: '',
        enterPwd: ''
      },
      resetRules: {
        newPwd: [
          { required: true, trigger: 'blur', message: '新密码不允许为空!' },
          { trigger: 'blur', min: 6, max: 30, message: '密码长度不少于6个字符!' }
        ],
        enterPwd: [
          { required: true, trigger: 'blur', message: '确认密码不允许为空!' },
          { trigger: 'blur', min: 6, max: 30, message: '密码长度不少于6个字符!' }
        ]
      },
      encryptValue: '',
      encryptPubKey: '',
      messageText: '',
      loading: false,
      passwordType: 'password',
      enterPasswordType: 'password',
      btnResetPwdDisabled: false,
      fid: ''
    }
  },
  created() {},
  mounted() {
    this.initPage()
    this.readEncrypt()
  },
  methods: {
    loginClick() {
      this.$router.push('/login')
    },
    initPage() {
      this.fid = this.$route.query.fid
      if (!this.fid) {
        this.$router.push('/findPwd')
      }
    },
    showPwd(isEnter) {
      if (isEnter) {
        if (this.enterPasswordType === 'password') {
          this.enterPasswordType = ''
        } else {
          this.enterPasswordType = 'password'
        }
      } else {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      }
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
    handleReset() {
      this.$refs.resetForm.validate(valid => {
        if (valid && this.validReset()) {
          this.loading = true

          const dataForm = {
            fid: this.fid,
            encryptId: this.encryptValue
          }
          const jse = new JSEncrypt()
          jse.setPublicKey(this.encryptPubKey)
          dataForm.newPwd = jse.encrypt(this.resetForm.newPwd)

          this.$store
            .dispatch('eap_login/findPwd_reset', dataForm)
            .then(data => {
              if (data.MsgCode === '200') {
                this.messageText = '密码重置成功，请使用新密码登录'
                document.getElementById('loginGO').style.display = 'block'
                this.btnResetPwdDisabled = true
              } else {
                this.messageText = data.MsgError
              }
              this.loading = false
            })
            .catch(error => {
              console.log(error)
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    validReset() {
      if (this.resetForm.newPwd !== this.resetForm.enterPwd) {
        this.messageText = '两次输入的密码不一致'
        return false
      }
      // 密码加密结果
      if (!this.encryptValue) {
        this.messageText = '密码加密失败，请重新打开页面'
        return false
      }

      this.messageText = ''
      return true
    }
  }
}
</script>
<style lang="scss">
.reset-form {
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
.reset-main {
  padding-top: 10%;
  width: 100%;
  height: calc(100% - 100px);
}
.reset-panel {
  margin: 0% auto;
  width: 360px;
  height: 340px;
  position: relative;
  // background-color: #fafafa;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  z-index: 98;
}
.reset-title {
  text-align: center;
  height: 70px;
  line-height: 70px;
  font-size: 16px;
}
.reset-form {
  width: 318px;
  height: 100px;
  margin: auto;
}
.reset-svg {
  padding: 0px 5px 0px 15px;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.reset-box {
  margin: 0px auto;
  width: 320px;
}
.reset-message {
  margin: 5px 0px 0px 0px;
  text-align: center;
  color: red;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
</style>
