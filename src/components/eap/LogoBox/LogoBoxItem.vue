<template>
  <el-link
    v-if="item.Type === 'Module' && rightExists(item.Id)"
    :underline="false"
    @click="moduleClick()"
    >{{ name }}
  </el-link>
</template>

<script>
export default {
  name: 'LogoBoxItem',
  props: {
    // right object
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['execNavigate'],
  data() {
    return {
      id: '',
      name: '',
      routePath: ''
    }
  },
  methods: {
    moduleClick() {
      this.$emit('execNavigate', true)
      this.$router.push(this.routePath)
    },
    async rightExists(moduleId) {
      const mItem = await this.$store.dispatch('eap_rights/findRouteAndPath', moduleId)
      if (mItem) {
        this.id = mItem.meta.id
        this.name = mItem.meta.title
        this.routePath = mItem.routePath
        return true
      }
      return false
    }
  }
}
</script>
