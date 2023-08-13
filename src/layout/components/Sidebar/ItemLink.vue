<template>
  <div>
    <a v-if="NavigateUrl()" :href="to" target="_blank" rel="noopener"><slot></slot></a>
    <router-link v-else :to="to"><slot></slot></router-link>
  </div>
</template>

<script>
import { isExternal } from '@/utils'

export default {
  name: 'ItemLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    NavigateUrl() {
      if (isExternal(this.to)) {
        return true
      }
      return false
    }
  }
}
</script>
