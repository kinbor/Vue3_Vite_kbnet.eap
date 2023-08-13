<template>
  <div>
    <div ref="code_box" class="code_Box">
      <img ref="code_imgBG" class="code_ImgBG" />
      <img ref="code_imgBlock" class="code_ImgBlock" />
    </div>
    <div
      ref="slider_box"
      class="slider_Box"
      @mouseover="fn_sliderbox_mouseover"
      @mouseout="fn_sliderbox_mouseout"
    >
      <div ref="slider_bg" class="slider_bg" />
      <span ref="slider_button" class="slider_button">{{ sliderButtonText }}</span>
      <span ref="slider_text" class="slider_text">{{ sliderText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderUnlock',
  props: {
    buttonText: {
      type: String,
      default: '>>'
    },
    showText: {
      type: String,
      default: 'Please puzzle'
    },
    successText: {
      type: String,
      default: 'Successfully Verified'
    },
    failureText: {
      type: String,
      default: 'Failure Verified'
    },
    forbiddenText: {
      type: String,
      default: 'Too many retries are disabled'
    },
    initTime: {
      type: String,
      default: ''
    }
  },
  emits: ['captcha_status'],
  data() {
    return {
      codeValue: '',
      codeState: '',
      sliderButtonText: this.buttonText,
      sliderText: this.showText,
      duration: 200,
      swipestart: false,
      min: 0,
      max: 100,
      index: 0,
      buttonIndex: 0
    }
  },
  watch: {
    initTime() {
      this.fn_reset()
      this.captcha_get()
    }
  },
  mounted() {
    this.fn_init()
    this.captcha_get()
  },
  methods: {
    fn_init() {
      this.fn_updateView()
      this.fn_sliderBtnEvent(true)
    },
    fn_handerIn() {
      this.swipestart = true
      this.min = 0
      this.max = this.$refs.slider_box.offsetWidth

      document.addEventListener('mousemove', this.fn_handerMove)
      document.addEventListener('mouseup', this.fn_handerOut)
      document.addEventListener('touchmove', this.fn_handerMoveMobile)
      document.addEventListener('touchend', this.fn_handerOut)
      this.fn_sliderbox_mouseover()
    },
    fn_handerOut() {
      this.swipestart = false

      document.removeEventListener('mousemove', this.fn_handerMove)
      document.removeEventListener('mouseup', this.fn_handerOut)
      document.removeEventListener('touchmove', this.fn_handerMoveMobile)
      document.removeEventListener('touchend', this.fn_handerOut)

      this.captcha_verify()
      this.fn_sliderbox_mouseout()
    },
    fn_handerMove(event) {
      if (this.swipestart) {
        event.preventDefault()
        event = event || window.event
        this.index = event.clientX - this.buttonIndex
        this.$refs.code_imgBlock.style.left = `${this.index}px`
        this.fn_move()
      }
    },
    fn_handerMoveMobile(event) {
      if (this.swipestart) {
        event = event || window.event
        this.index = event.touches[0].pageX - this.buttonIndex
        this.$refs.code_imgBlock.style.left = `${this.index}px`
        this.fn_move()
      }
    },
    fn_move() {
      if (this.index + this.$refs.slider_button.offsetWidth >= this.max) {
        this.index = this.max - this.$refs.slider_button.offsetWidth - 2
        this.swipestart = false
      }
      if (this.index < 0) {
        this.index = this.min
      }
      this.fn_updateView()
    },
    fn_updateView() {
      this.$refs.slider_bg.style.width = `${this.index}px`
      this.$refs.slider_button.style.left = `${this.index}px`
    },
    fn_sliderBtnEvent(isAdd) {
      if (isAdd === true) {
        this.$refs.slider_button.addEventListener('mousedown', this.fn_sliderbutton_mousedown)
        this.$refs.slider_button.addEventListener('touchstart', this.fn_sliderbutton_touchstart)
      } else {
        for (let i = 0; i < 5; i++) {
          this.$refs.slider_button.removeEventListener('mousedown', this.fn_sliderbutton_mousedown)
          this.$refs.slider_button.removeEventListener(
            'touchstart',
            this.fn_sliderbutton_touchstart
          )
        }
      }
    },
    fn_sliderbutton_mousedown(event) {
      const e = event || window.event
      this.buttonIndex = e.clientX - this.$refs.slider_button.offsetLeft
      this.fn_handerIn()
    },
    fn_sliderbutton_touchstart(event) {
      const e = event || window.event
      this.buttonIndex = e.touches[0].pageX - this.$refs.slider_button.offsetLeft
      this.fn_handerIn()
    },
    fn_sliderbox_mouseover() {
      if (!this.codeState) {
        this.$refs.code_box.style.display = 'block'
        if (!this.codeState) {
          const offset_x =
            parseInt(this.$refs.slider_box.getBoundingClientRect().left, 10) -
            parseInt(document.body.scrollLeft, 10)
          const offset_y =
            parseInt(this.$refs.slider_box.getBoundingClientRect().top, 10) -
            parseInt(document.body.scrollTop, 10) -
            parseInt(this.$refs.code_box.offsetHeight, 10)
          this.$refs.code_box.style.left = `${offset_x}px`
          this.$refs.code_box.style.top = `${offset_y}px`
        }
      }
    },
    fn_sliderbox_mouseout() {
      this.$refs.code_box.style.display = 'none'
    },
    fn_reset() {
      this.$refs.code_box.style.display = 'none'
      this.$refs.code_box.style.left = '0px'
      this.$refs.code_box.style.top = '0px'
      this.$refs.code_imgBlock.style.left = '0px'
      this.$refs.code_imgBlock.style.top = '0px'

      this.$refs.slider_bg.style.width = '0px'
      this.$refs.slider_bg.style.backgroundColor = '#75CDF9'
      this.$refs.slider_button.style.left = '0px'
      this.$refs.slider_button.style.display = 'block'

      this.swipestart = false
      this.index = 0
      this.buttonIndex = 0
      this.codeState = null
      this.codeValue = null

      this.sliderText = this.showText
      this.$refs.slider_text.style.color = '#222222'
      this.fn_init()
    },
    captcha_get() {
      this.$store
        .dispatch('eap_login/captcha_get')
        .then(res => {
          if (res.MsgCode === '200') {
            const dtItem = JSON.parse(res.MsgData)
            this.$refs.code_imgBG.src = dtItem.Image_Base64
            this.$refs.code_imgBlock.src = dtItem.Image2_Base64
            this.$refs.code_imgBlock.style.left = `${dtItem.Image2_Offset_X}px`
            this.$refs.code_imgBlock.style.top = `${dtItem.Image2_Offset_Y}px`
            this.codeValue = dtItem.Id
          } else {
            this.$emit('captcha_status', { MsgCode: '400', MsgData: '', MsgError: res.MsgError })
          }
        })
        .catch(err => {
          this.$emit('captcha_status', { MsgCode: '400', MsgData: '', MsgError: err })
          this.fn_sliderBtnEvent(false)
        })
    },
    captcha_verify() {
      const pItem = {}
      pItem.Id = this.codeValue
      pItem.Type = 'SlideImage'
      pItem.DataCode = parseInt(this.$refs.code_imgBlock.offsetLeft, 10)

      if (pItem.DataCode >= 0 && pItem.DataCode <= 500) {
        this.$refs.slider_button.style.display = 'none'
        this.$store
          .dispatch('eap_login/captcha_verify', pItem)
          .then(result => {
            const me = this
            if (result.MsgCode === '200') {
              // 成功
              me.sliderText = me.successText
              me.$refs.slider_text.style.color = '#00CC33'

              // 登记状态
              me.$refs.code_box.style.display = 'none'
              me.codeState = '1'
              me.$emit('captcha_status', { MsgCode: '200', MsgData: me.codeValue, MsgError: '' })
            } else {
              // 失败
              me.sliderText = me.failureText
              me.$refs.slider_text.style.color = '#ff0000'

              // 延迟重试
              setTimeout(function () {
                me.fn_reset() // 重置参数值
                me.captcha_get() // 刷新验证码
              }, 1000)
            }

            // me.$refs.slider_bg.style.backgroundColor = '#e8e8e8'
            me.$refs.slider_bg.style.backgroundColor = '#f5f7fa'
            me.index = me.max
            me.fn_updateView()
            me.fn_sliderBtnEvent(false)
          })
          .catch(error => {
            this.$emit('captcha_status', { MsgCode: '400', MsgData: '', MsgError: error })
            this.fn_sliderBtnEvent(false)
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.slider_Box {
  margin: 0px auto;
  width: 320px;
  height: 40px;
  position: relative;
  border-radius: 2px;
  // background-color: #e8e8e8;
  background-color: #f5f7fa;
  overflow: hidden;
  text-align: center;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.slider_bg {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #75cdf9;
  z-index: 1;
}

.slider_button {
  width: 38px;
  position: absolute;
  left: 0;
  top: 0;
  height: 38px;
  line-height: 38px;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3;
  cursor: move;
  color: #666;
  font-size: 14px;
  font-family: '宋体';
}

.slider_text {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family:
    microsoft yahei,
    serif;
  color: #222;
  line-height: 38px;
  text-align: center;
  z-index: 2;
}

.code_Box {
  margin: 0px auto;
  width: 320px;
  height: 170px;
  position: fixed;
  border-radius: 2px;
  background-color: #e8e8e8;
  overflow: hidden;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  z-index: 100;
  display: none;
}

.code_ImgBG {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 320px;
  height: 170px;
  z-index: 101;
}

.code_ImgBlock {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 40px;
  height: 40px;
  z-index: 102;
}
</style>
