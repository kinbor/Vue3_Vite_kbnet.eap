<template>
  <div>
    <div @click="logoClick">
      <img :src="avatar" class="user-avatar" />
    </div>
    <el-dialog
      v-model="dialogVisible"
      :modal="false"
      :append-to-body="false"
      :show-close="false"
      top="50px"
    >
      <div>
        <span style="font-weight: bold">{{ name }}</span>
        <!--<span style="font-weight: bold">{{ goodTime }}</span>-->
      </div>
      <div>
        <div style="height: 130px; padding: 5px; text-align: center">
          <div v-html="goodWord" />
        </div>
      </div>
      <div>
        <el-button type="info" native-type="button" class="btn-logout" @click="logout"
          >退出登录</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Avatar',
  data() {
    return {
      dialogVisible: false,
      goodTime: this.getGoodTime(),
      goodWord: this.getGoodWord()
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar'])
  },
  methods: {
    logoClick() {
      this.dialogVisible = true
    },
    async logout() {
      await this.$store.dispatch('eap_rights/clearToken')
      this.$router.push(`/login`)
      this.$router.go(0)
    },
    getGoodTime() {
      const dateTime = new Date().getHours()
      let goodTime = '早上好'
      if (dateTime >= 6 && dateTime < 8) {
        goodTime = '早上好'
      } else if (dateTime >= 8 && dateTime < 12) {
        goodTime = '上午好'
      } else if (dateTime >= 12 && dateTime < 13) {
        goodTime = '中午好'
      } else if (dateTime >= 13 && dateTime < 18) {
        goodTime = '下午好'
      } else if (dateTime >= 18 && dateTime < 23) {
        goodTime = '晚上好'
      } else {
        goodTime = '夜深了'
      }
      return `，${goodTime}`
    },
    getGoodWord() {
      const dateTime = new Date().getHours()
      let goodWord = "<span style='color:"
      if (dateTime >= 6 && dateTime < 8) {
        goodWord += "green;'>"
        goodWord += '一天之计在于晨，呼噜...'
      } else if (dateTime >= 8 && dateTime < 12) {
        goodWord += "blue;'>"
        goodWord += '精力充沛，Fighting...'
      } else if (dateTime >= 12 && dateTime < 13) {
        goodWord += "black;'>"
        goodWord += '时间到了，该吃饭哦！'
      } else if (dateTime >= 13 && dateTime < 18) {
        goodWord += "blue;'>"
        goodWord += '继续战斗，前进前进...'
      } else if (dateTime >= 18 && dateTime < 23) {
        goodWord += "blue;'>"
        goodWord += '还在战斗，好努力哦！'
      } else {
        goodWord += "red;'>"
        goodWord += '夜深了，请注意休息！'
      }
      goodWord += '</span>'
      return goodWord
    }
  }
}
</script>

<style scoped>
:deep(.el-dialog) {
  margin: 40px 0px;
  float: right;
  width: 270px;
  height: 230px;
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
.user-avatar {
  float: right;
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 20px;
  margin: 6px 10px 0px 10px;
  color: #009dff;
}
.btn-logout {
  width: 240px;
}
</style>
