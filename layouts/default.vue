<template>
  <div class="main-container">
    <Sidebar v-if="!excluded.includes(this.$route.name)"/>
    <Nuxt />
    <asm-logo class="logo" />
  </div>
</template>

<script>

import asmLogo from '@/assets/icons/asmLogo.svg'

  export default {
    components: {
      asmLogo
    },
    data() {
      return {
        excluded: ['log_in', 'sign_up', 'forgot_password']
      }
    },

    mounted() {
      this.getUser()
    },

    created() {
      let token = localStorage.getItem("user-token")
      if (!this.excluded.includes(this.$route.name) && !token ) {
        this.$router.push('/log_in')
      } else if (this.excluded.includes(this.$route.name) && token) {
        this.$router.push('/dashboard')
      }

    },

    methods: {

      getUser() {
        const url = '/api/profile'
        let token = localStorage.getItem("user-token")

        if (!token) {
          return
        }

        this.$axios.setToken(token, 'Bearer')

        this.$axios.$get(url)
          .then(user => {
            console.log("default vue", user.first_name)
            this.$store.commit('add', user)
          })
          .catch(err => {
            this.$router.push('/log_in')
          })
    },

    },
    // middleware: 'authenticated'

  }
</script>

<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.main-container {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
}

.logo {
  position: absolute;
  width: 40px;
  height: 36px;
  bottom: 24px;
  left: 33px;

}
</style>
