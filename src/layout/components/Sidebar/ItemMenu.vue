<template>
  <div>
    <KbSvgIcon v-if="icon" style="width: 16px; height: 16px" :icon-class="icon" />
    <span v-if="title">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: 'ItemMenu',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
