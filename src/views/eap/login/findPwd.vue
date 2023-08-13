<template>
  <div class="findPwd-main">
    <div class="findPwd-panel">
      <div class="findPwd-title">找回密码</div>
      <el-form ref="findPwdForm" :model="findPwdForm" :rules="findPwdRules" class="findPwd-form">
        <el-form-item id="deviceNo" prop="deviceNo">
          <el-input
            ref="deviceNo"
            v-model="findPwdForm.deviceNo"
            placeholder="请输入账号绑定的邮箱地址或手机号"
            name="deviceNo"
            type="text"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item id="deviceCode" prop="deviceCode">
          <el-input
            ref="deviceCode"
            v-model="findPwdForm.deviceCode"
            placeholder="验证码"
            name="deviceCode"
            type="text"
            tabindex="2"
            maxlength="6"
            show-word-limit
            style="width: 160px"
          />
          <el-button
            type="primary"
            :disabled="msgDisabled"
            style="margin-left: 12px"
            @click="handleMsgCode"
            >{{ msgBtnText }}</el-button
          >
        </el-form-item>
      </el-form>
      <slider-unlock
        v-if="!isMobileBrowser"
        show-text="请拖动滑块解锁"
        success-text="验证通过  √"
        failure-text="验证失败  ×"
        forbidden-text="重试次数太多已被禁用"
        :init-time="captchaInit"
        class="findPwd-slider"
        @captcha_status="handleCaptcha"
      />
      <div class="findPwd-box">
        <div class="findPwd-message">{{ messageText }}</div>
        <div style="margin: 5px 0px 0px 0px">
          <el-button
            :loading="loading"
            style="width: 320px; background-color: #1890ff; color: #ffffff; text-align: center"
            @click.prevent="handleFindPwd"
            >下&nbsp;&nbsp;&nbsp;&nbsp;一&nbsp;&nbsp;&nbsp;&nbsp;步</el-button
          >
        </div>
        <div style="margin-top: 10px; font-size: 12px; color: #465c71">
          <div style="float: right; cursor: pointer" @click="loginClick">马上登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SliderUnlock from '@/components/eap/SliderUnlock/index.vue'
import * as eapUtils from '@/utils'
import eapClient from '@/configs/eap/client'

export default {
  name: 'FindPwd',
  components: {
    SliderUnlock
  },
  data() {
    return {
      findPwdForm: {
        deviceNo: '',
        deviceCode: ''
      },
      findPwdRules: {
        deviceNo: [{ required: true, trigger: 'blur', message: '号码不允许为空!' }],
        deviceCode: [
          { required: true, trigger: 'blur', message: '验证码不允许为空!' },
          { min: 6, max: 6, trigger: 'blur', message: '验证码为6个字符!' }
        ]
      },
      captchaInit: '',
      captchaValue: '',
      messageText: '',
      isMobileBrowser: eapUtils.isMobile(),
      loading: false,
      stepNo: 0,
      msgBtnText: '发送验证码',
      msgDisabled: false,
      msgTimer: null,
      msgTimerCount: 0,
      msgTimerCountSum: 0,
      msgId: ''
    }
  },
  mounted() {
    this.countDownState()
  },
  beforeUnmount() {
    this.countDownStop()
  },
  methods: {
    loginClick() {
      this.$router.push('/login')
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
    handleMsgCode() {
      if (
        !eapUtils.isEmail(this.findPwdForm.deviceNo) &&
        !eapUtils.isPhone(this.findPwdForm.deviceNo)
      ) {
        this.messageText = '请输入正确的邮箱地址或手机号'
        return false
      }
      // 非手机浏览器下验证码
      if (!this.isMobileBrowser && !this.captchaValue) {
        this.messageText = '验证码失败'
        return false
      }

      // 通知后台发送验证码到邮箱或手机号，发送成功后stepNo改为1
      this.msgDisabled = true
      const dataForm = {
        receiverCode: this.findPwdForm.deviceNo,
        captchaId: this.captchaValue,
        isMobile: this.isMobileBrowser
      }
      this.$store
        .dispatch('eap_login/findPwd_code', dataForm)
        .then(data => {
          if (data.MsgCode === '200') {
            this.messageText = ''
            this.stepNo = 1
            this.msgId = data.MsgData

            // 发送按钮禁用倒计时
            this.countDownStart(true)
          } else {
            this.messageText = data.MsgError
            this.stepNo = 0
            this.msgId = ''
            this.msgDisabled = false
          }
        })
        .catch(error => {
          console.log(error)
          this.messageText = error
          this.msgDisabled = false
        })
    },
    countDownStart(isSet) {
      if (isSet) {
        this.msgTimerCount = 180
        this.msgTimerCountSum = parseInt(+new Date() / 1000, 10) + this.msgTimerCount
      }
      this.msgDisabled = true
      this.timer = setInterval(this.countDownInfo, 1000)
    },
    countDownInfo() {
      if (this.msgTimerCount > 0) {
        this.msgTimerCount -= 1
        this.msgBtnText = `发送验证码(${this.msgTimerCount}s)`
      } else {
        this.msgTimerCount = 0
        this.msgTimerCountSum = 0
        this.msgBtnText = '发送验证码'

        // 销毁timer
        this.countDownStop()
      }
    },
    countDownStop() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      if (this.msgTimerCount > 0) {
        localStorage.setItem(eapClient.eap_msg_f_timer_msgcode_count, this.msgTimerCountSum)
      } else {
        localStorage.removeItem(eapClient.eap_msg_f_timer_msgcode_count)
        this.msgDisabled = false
      }
    },
    countDownState() {
      const lastCountSum = parseInt(
        localStorage.getItem(eapClient.eap_msg_f_timer_msgcode_count),
        10
      )
      if (!isNaN(lastCountSum)) {
        const countSum = lastCountSum - parseInt(+new Date() / 1000, 10)
        if (countSum > 0) {
          this.msgTimerCount = countSum
          this.msgTimerCountSum = lastCountSum
          this.countDownStart(false)
        } else {
          localStorage.removeItem(eapClient.eap_msg_f_timer_msgcode_count)
        }
      }
    },
    handleFindPwd() {
      if (this.stepNo === 1) {
        const dataForm = {
          fid: this.msgId,
          code: this.findPwdForm.deviceCode
        }
        // 验证验证码是否正确，若正确跳转到重置密码页面
        this.$store
          .dispatch('eap_login/findPwd_verify', dataForm)
          .then(data => {
            if (data.MsgCode === '200') {
              this.$router.push({
                path: '/resetPwd',
                query: { fid: this.msgId }
              })
            } else {
              this.findPwdForm.deviceCode = ''
              this.messageText = data.MsgError
            }
            this.loading = false
          })
          .catch(error => {
            console.log(error)
            this.messageText = error
            this.loading = false
          })
      } else {
        this.messageText = '请输入账号绑定的号码，完成验证'
      }
    }
  }
}
</script>

<style lang="scss">
.findPwd-form {
  #deviceNo {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: #454545;
    .el-input__wrapper {
      box-shadow: none;
      display: flex;
    }
  }
  #deviceCode {
    .el-input {
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      color: #454545;
    }
    .el-input__wrapper {
      box-shadow: none;
      display: flex;
    }
  }
}
</style>
<style lang="scss" scoped>
.findPwd-main {
  padding-top: 10%;
  width: 100%;
  height: calc(100% - 100px);
}
.findPwd-panel {
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
.findPwd-title {
  text-align: center;
  height: 70px;
  line-height: 70px;
  font-size: 16px;
}
.findPwd-form {
  width: 318px;
  height: 100px;
  margin: auto;
}
.findPwd-svg {
  padding: 0px 5px 0px 15px;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.findPwd-box {
  margin: 0px auto;
  width: 320px;
}
.findPwd-message {
  margin: 5px 0px 0px 0px;
  text-align: center;
  color: red;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.findPwd-slider {
  margin: 16px 0px 0px 0px;
}
</style>
