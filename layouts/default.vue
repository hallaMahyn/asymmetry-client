<template>
  <div class="main-container">
    <Sidebar v-if="!excluded.includes(this.$route.name)"/>
    <Nuxt />
    <asm-logo class="logo" @click="goToMain()"/>
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
      goToMain() {
        let token = localStorage.getItem("user-token")
        if (token) {
          this.$router.push('/dashboard')
        } else {
          this.$router.push('/log_in')
        }
      },

      getUser() {
        const url = '/api/profile'
        let token = localStorage.getItem("user-token")

        if (!token) {
          return
        }

        this.$axios.setToken(token, 'Bearer')

        this.$axios.$get(url)
          .then(user => {
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

<style lang="scss">
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #FC0D1B;
}

.dashboard_left-card {
  width: 269px;
}

.row {
  display: flex;
  flex-flow: row nowrap;
  padding: 20px 20px 0 0 ;
  width: 100%;
}


.shadow {
  border-radius: 12px;
  box-shadow: -2px 2px 4px rgba(215, 215, 215, 0.2), 2px -2px 4px rgba(215, 215, 215, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(215, 215, 215, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(215, 215, 215, 0.5);
}

.customToast {
  background: #FFECED !important;
  color: #FC0D1B !important;
  border-radius: 12px !important;
  padding: 20px !important;
  box-shadow: -2px 2px 4px rgba(215, 215, 215, 0.2), 2px -2px 4px rgba(215, 215, 215, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(215, 215, 215, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(215, 215, 215, 0.5);
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
  cursor: pointer;
  transition: transform .2s ease;
  &:hover {
    transform: scale(1.1);
  }

}
</style>
