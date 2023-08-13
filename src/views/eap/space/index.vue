<template>
  <div class="space-container">
    <div
      v-for="boxItem in boxList"
      :key="boxItem.Id"
      class="tgtBox"
      @click="boxClick(boxItem.Id)"
      @mouseover="styleOver(boxItem.Id, $event)"
      @mouseout="styleLeave(boxItem.Id, $event)"
    >
      <img v-if="!boxItem.IsSvg" :src="boxItem.ImgData" class="tgtBoxImg" />
      <KbSvgIcon v-else :icon-class="boxItem.ImgData" class="tgtBoxSvg" :style="boxItem.SvgColor" />
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="boxItem.Name"
        :disabled="boxItem.DisabledTip"
        placement="right"
      >
        <div class="tgtBoxTip">
          <span :id="boxItem.Id">{{ boxItem.Name }}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpaceIndex',
  data() {
    return {
      boxId: '',
      boxList: [],
      pathList: []
    }
  },
  created() {
    this.loadData()
  },
  mounted() {
    window.space_boxClick = this.boxClick
    this.spacePathGen(this.boxId)
  },
  methods: {
    styleOver(id, event) {
      const el = event.currentTarget
      el.style.backgroundColor = '#E0E0E0'
      el.style.cursor = 'pointer'

      this.styleTip(id)
    },
    styleLeave(id, event) {
      const el = event.currentTarget
      el.style.backgroundColor = ''
      el.style.cursor = 'auto'
    },
    styleTip(id) {
      const tmpEle = document.getElementById(id)
      const boxItem = this.boxList.find(function (x) {
        return x.Id === id
      })
      if (tmpEle.parentNode.offsetWidth >= tmpEle.offsetWidth) {
        boxItem.DisabledTip = true
      } else {
        boxItem.DisabledTip = false
      }
    },
    loadData() {
      this.$store
        .dispatch('eap_space/getDataList', this.boxId)
        .then(data => {
          this.boxList = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    boxClick(id) {
      if (id) {
        const boxItem = this.$store.state.eap_space.boxList.find(function (x) {
          return x.Id === id
        })
        if (boxItem) {
          if (boxItem.HasChild) {
            this.boxList = []
            this.boxId = boxItem.Id
            this.spacePathGen(boxItem.Id)
            this.loadData()
          } else {
            let targetMethod = '_blank'
            if (boxItem.TargetMethod.toUpperCase() !== 'NEW') {
              targetMethod = '_self'
            }
            window.open(boxItem.TargetAddress, targetMethod)
          }
        }
      } else {
        this.boxList = []
        this.boxId = ''
        this.spacePathGen(id)
        this.loadData()
      }
    },
    spacePathGen(id) {
      // 生成Space数据
      this.pathList = []
      const tmpList = this.$store.state.eap_space.boxList
      this.spacePathFind(tmpList, id, false)

      // 生成Space路径
      const spacePath = document.getElementById('appSpacePath')
      spacePath.innerHTML = ''
      if (id) {
        spacePath.innerHTML += `<div style="float:left;cursor:pointer;color:#555555;" onClick="window.space_boxClick('')">主页</div>`
      }
      this.pathList.reverse().forEach(element => {
        spacePath.innerHTML += `<div style="float:left;color:#999999;">&nbsp;>&nbsp;</div>`
        spacePath.innerHTML += `<div style="float:left;cursor:pointer;color:#555555;" onClick="window.space_boxClick('${element.Id}')">${element.Name}</div>`
      })

      const spacePathMobile = document.getElementById('appSpacePathMobile')
      spacePathMobile.innerHTML = ''
      if (this.pathList.length > 0) {
        spacePathMobile.innerHTML += `<div style="float:left;cursor:pointer;color:#555555;" onClick="window.space_boxClick('${this.pathList[0].Id}')">返回上一级</div>`
      } else {
        if (id) {
          spacePathMobile.innerHTML += `<div style="float:left;cursor:pointer;color:#555555;" onClick="window.space_boxClick('')">返回上一级</div>`
        }
      }
    },
    spacePathFind(dataList, dataId, isSelf) {
      if (dataId) {
        for (let i = 0; i < dataList.length; i++) {
          if (dataList[i].Id === dataId) {
            if (isSelf) {
              this.pathList.push({
                Id: dataList[i].Id,
                Name: dataList[i].Name,
                Address: dataList[i].TargetAddress
              })
            }
            this.spacePathFind(dataList, dataList[i].ParentId, true)
            break
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.space-container {
  padding: 10px;
  background-color: #ffffff;
}
.tgtBox {
  display: inline-block;
  text-align: center;
  width: 90px;
  height: 90px;
  padding: 10px 0px;
  margin: 10px;
}
.tgtBoxImg {
  width: 50px;
  height: 50px;
}
.tgtBoxSvg {
  width: 50px;
  height: 50px;
}
.tgtBoxTip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
