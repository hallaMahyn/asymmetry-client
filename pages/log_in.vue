<template>
  <div class="login">
<!-- init flow -->
    <div v-if="currentFlow === 'log_in'" class="login-container">
      <div class="login-container_title"> Login or sign up</div>
      <div class="login-container_wrapper">
        <div class="login-container_email">
          <div class="login-container_input-label">
            E-mail
          </div>
          <input
            v-model="email"
            class="login-container_input"
            placeholder="Enter e-mail"
            @keyup.enter="checkPresence"
          />
        </div>

        <div class="login-container_button">
          <Button
            title="Next"
            :isBtnActive="btnActive"
            :isLoading="isLoading"
            @btnClick="checkPresence"
          />
        </div>
      </div>
    </div>
<!-- user found flow here -->
    <div v-if="user && currentFlow === 'userFound'" class="login-container">
      <div class="login-container_title"> Hello! </div>
      <div class="login-container_user-card">
        <img class="login-container_user-card_avatar" :src="userAvatar || defaultPhoto" />
        <div class="login-container_user-card_name"> {{user.first_name + ' ' + user.last_name }} </div>
      </div>
      <div class="login-container_wrapper">
        <div class="login-container_password">
          <div class="login-container_input-label">
            Password
          </div>
          <div class="login-container_input-wrapper">
            <input
              class="login-container_input"
              type="password"
              v-model="password"
              placeholder="Enter your password"
              id="password-input"
              @keyup.enter="logIn"
            />
            <glaz class="glas" v-if="password.length > 0" @click="showPassword"  />
          </div>
        </div>

        <div class="login-container_button">
          <Button
            title="Log in"
            :isBtnActive="password.length > 3"
            :isLoading="isLoading"
            @btnClick="logIn"
          />
        </div>
      </div>
      <span class="errorMessages">{{errorMessages}}</span>

      <div class="forgot_password" @click="forgotPassword">Forgot your password?</div>
    </div>
    <div v-if="currentFlow === 'forgotPassword'" class="login-container">
      <div class="login-container_title"> We've sent you a letter</div>
      <div class="login-container_user-card">
        <img class="login-container_user-card_avatar" :src="userAvatar || defaultPhoto" />
        <div class="login-container_user-card_name"> {{user.first_name + ' ' + user.last_name }} </div>
      </div>
      <div class="login-container_wrapper text">
      <span>
        To recover you password <br/>
        follow the link in the email <br/>
        we sent you to {{email}}
      </span>

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
      email: '',
      password: '',
      user: null,
      userAvatar: null,
      isLoading: false,
      isBtnActive: false,
      currentFlow: 'log_in',
      defaultPhoto: "https://img-tv.vl.ru/fhd/a55b9339c5ab0062776074644a5470d519012c.jpg",
      errorMessages: '',
    }

  },

  mounted() {
    // let token = localStorage.getItem("user-token")
    // if (token?.length > 0) {
    //   this.$router.push('/')
    // }
  },

  middleware: 'authenticated',

  methods: {
    checkPresence() {
      this.getUser()
    },

    logIn() {
        this.isLoading = true
        this.errorMessages = ''
        const params = { email: this.user.email, password: this.password }
        const url = `/api/sign_in`
        this.$axios.$post(url, params)
          .then(res => {
            this.$axios.setToken(res.data.token, 'Bearer')

            localStorage.setItem('user-token', res.data.token)

            this.$store.commit('add', this.user)
            localStorage.setItem('user', JSON.stringify(this.user))
            this.$router.push('/dashboard')
          })
          .catch(err => {
            this.isLoading = false
            this.errorMessages = "Wrong password"
          })
    },

    forgotPassword () {
      this.errorMessages = ''
      this.currentFlow = 'forgotPassword'
      const url = `/api/forgot_password`
      const params = { email: this.user.email }
      this.$axios.$post(url, params)
        .then(res => {
          this.currentFlow = 'forgotPassword'
        })
        .catch(err => {
          this.errorMessages = "Something was wrong"
          console.log(err)
        })
    },

    getUser() {
      const url = `/api/user_info/${this.email}`

      this.$axios.$get(url)
        .then(user => {
          this.user = user
          this.currentFlow = 'userFound'
          this.userAvatar = user.avatar?.url
        })
        .catch(err => {
          this.$router.push(`sign_up/?email=${this.email}`)
        })
    },

    showPassword() {
      let input = document.getElementById("password-input")
      if (input.type === "password") {
        input.type = "text"
      } else {
        input.type = "password"
      }
    }

  },

  computed: {
    btnActive: function() {
     const regex = /^[A-Za-z0-9+_.-]+@.+\..+$/g
     let result = this.email.match(regex)
     return result?.length > 0
    },

  }

}
</script>
<style lang="scss" scoped>
.login {

  display: flex;
  flex-flow: column nowrap;
  justify-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  /* background: blueviolet; */


}
.login-container {
  width: 460px;
  height: 100%;
  padding: 100px 0px;
  font-size: 32px;
  line-height: 38px;
  color: #FC0D1B;
  &_title {
    margin-bottom: 40px;
  }

}

.login-container_wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
}

.login-container_email, .login-container_password {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  /* margin-right: 12px; */
  /* flex: 2; */
}

.login-container_button {
  width: 124px;
}

.login-container_input-label {
  font-size: 20px;
  margin-bottom: 12px;
}

.login-container_input-wrapper {
  height: 66px;
  position: relative;
}

.login-container_input {
  width: 320px;
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


.login-container_user-card {
  padding: 15px;
  display: flex;
  flex-flow: row nowrap;
  height: 66px;
  width: 320px;
  border-radius: 12px;
  user-select: none;
  box-shadow: -2px 2px 4px rgba(215, 215, 215, 0.2),
    2px -2px 4px rgba(215, 215, 215, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9),
    2px 2px 5px rgba(215, 215, 215, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(215, 215, 215, 0.5);
  font-size: 16px;
  margin-bottom: 24px;
  &_avatar {
    min-width: 36px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
  }
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

.errorMessages{
  display: block;
  min-height: 70px;
  font-size: 16px;
}
.forgot_password {
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;

}

.text {
  text-align: left;
  font-size: 20px;
  line-height: 24px;
  /* max-width: 260px; */
}

</style>