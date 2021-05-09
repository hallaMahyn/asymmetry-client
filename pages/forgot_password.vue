<template>
  <div class='forgot-password'>
    <div class="forgot-password-container">
      <div class="forgot-password-container_title"> New password</div>
      <div class="forgot-password-container_wrapper">
        <div class="forgot-password-container_email">
          <div class="forgot-password-container_password">
            <div class="forgot-password-container_input-label">
              Create password
            </div>
            <div class="forgot-password-container_input-wrapper">
              <input
                class="forgot-password-container_input"
                type="password"
                v-model="password"
                placeholder="Enter your password"
                id="password-input"
              />
              <glaz class="glas" v-if="password.length > 0" @click="showPassword('password-input')"  />
            </div>
          </div>
          <div class="forgot-password-container_password">
            <div class="forgot-password-container_input-label">
            </div>
            <div class="forgot-password-container_input-wrapper">
              <input
                class="forgot-password-container_input"
                type="password"
                v-model="passwordConfirm"
                placeholder="Re-Enter your password"
                @keyup.enter="changePassword"
                id="password-confirm-input"
              />
              <glaz class="glas" v-if="passwordConfirm.length > 0" @click="showPassword('password-confirm-input')"  />
            </div>
          </div>
        </div>

        <div class="forgot-password-container_button">
          <Button
            title="Next"
            :isBtnActive="validationMessages.every(el => el === null)"
            :isLoading="isLoading"
            @btnClick="changePassword"
          />
        </div>
      </div>
      <div class="input_validations" >
        <transition-group name="fade">
          <div v-for="(m,i) in validationMessages" :key="i + m">
            <span v-show="m">{{m}}</span>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Glaz from '@/assets/icons/glaz.svg'
export default {
  components: {
    Glaz
  },
  data() {
    return {
      isLoading: false,
      password: '',
      passwordConfirm: '',
      confirmToken: null
    }
  },

  mounted() {
    this.confirmToken = this.$route.query.token
  },

  computed: {
    validationMessages() {
      return [this.checkLatin(), this.checkLength(), this.checkDigit(), this.checkEqual()]
    }
  },

  methods: {
    checkLength() {
      // return this.password.match(/^.{8,}/g)?.length > 0 ? '' : 'A'
      return /^.{8,}/g.test(this.password) ? null : 'At least 8 symbols'
    },

    checkLatin() {
      return this.password.match(/[a-z][a-z0-9#?!@$%^&*-]*$/i)?.length > 0 ? null : "Latin letters only"
    },

    checkDigit() {
      const hasDigit = /(?=.*?[0-9])/g.test(this.password)
      const hasSpecial = /(?=.*?[#?!@$%^&*-])/g.test(this.password)
      return (hasDigit || hasSpecial) ? null : "At least 1 digit or special symbol"
    },

    checkEqual() {
      return this.password === this.passwordConfirm ? null : "Password do not match"
    },

    showPassword(id) {
      let input = document.getElementById(id)
      if (input.type === "password") {
        input.type = "text"
      } else {
        input.type = "password"
      }
    },

    changePassword() {
      this.isLoading = true
      const params = { token: this.confirmToken, password: this.password }
      const url = `/api/reset_password`
      this.$axios.$post(url, params)
        .then(res => {
          // this.$axios.setToken(res.data.token, 'Bearer')

          // localStorage.setItem('user-token', res.data.token)

          // this.$store.commit('add', this.user)

          // this.$auth.setUserToken(res.data.token)

          this.isLoading = false
          this.$router.push('/log_in')
        })
        .catch(err => {
          this.isLoading = false
          this.errorMessages = "Wrong password"
        })

    }
  },


}
</script>

<style lang="scss" scoped>

.forgot-password {
  display: flex;
  flex-flow: column nowrap;
  justify-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  /* background: blueviolet; */


}
.forgot-password-container {
  width: 465px;
  height: 100%;

  padding: 100px 0px;
  font-size: 32px;
  line-height: 38px;
  color: #FC0D1B;
  &_title {
    margin-bottom: 40px;
  }
}

.forgot-password-container_wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 12px;
}

.forgot-password-container_email, .forgot-password-container_password {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
}
.forgot-password-container_password {
  width: 100%;
  position: relative;
}


.forgot-password-container_button {
  min-width: 124px;
  width: 124px;
  &_large {
    width: 416px;
  }
}

.forgot-password-container_input-label {
  font-size: 20px;
  margin-bottom: 12px;
}

.forgot-password-container_input-wrapper {
  height: 66px;
  position: relative;
}

.forgot-password-container_input {
  width: 310px;
  height: 66px;
  border: none;
  outline: none;
  padding-left: 16px;
  background: #FDFDFD;
  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(207, 207, 207, 0.5), inset -2px 2px 4px rgba(207, 207, 207, 0.2), inset 2px -2px 4px rgba(207, 207, 207, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.9), inset 2px 2px 5px rgba(207, 207, 207, 0.9);
  border-radius: 12px;
  color: #FC0D1B;
  font-size: 16px;
}

.forgot-password-container_input_container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 24px;
}

.input_validations {
  font-size: 16px;
}

.glas {
  position: absolute;
  cursor: pointer;
  top: 25px;
  right: 12px;
  width: 22px;
  height: 12px;
  object-fit: contain;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
  /* color: blue */
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

</style>