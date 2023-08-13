<template>
  <div style="margin: 0 auto; width: 600px; height: 500px; margin-top: 100px">登出页面</div>
</template>

<script>
export default {
  name: 'Logout',
  mounted() {
    this.logout()
  },
  methods: {
    logout() {
      this.$store
        .dispatch('eap_rights/clearToken')
        .then(() => {
          this.$router.push('/login')
          this.$router.go(0)
        })
        .catch(() => {
          this.$router.push('/login')
          this.$router.go(0)
        })
    }
  }
}
</script>
