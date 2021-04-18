<template>
  <div class="login">
<!-- init flow -->
    <div v-if="userFound === false" class="login-container">
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
          />
        </div>

        <div class="login-container_button">
          <Button
            title="Next"
            :isBtnActive="btnActive"
            @btnClick="checkPresence"
          />
        </div>
      </div>
    </div>
<!-- user found flow here -->
    <div v-else class="login-container">
      <div class="login-container_title"> Hello! </div>
      <div class="login-container_user-card">
        <img class="login-container_user-card_avatar" :src="user.avatar" />
        <div class="login-container_user-card_name"> {{user.name + ' ' + user.last_name }} </div>
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
            />
            <div class="glas" v-if="password.length > 0" @click="showPassword"/>
          </div>
        </div>

        <div class="login-container_button">
          <Button
            title="Log in"
            :isBtnActive="password.length > 3"
            @btnClick="checkPresence"
          />
        </div>
      </div>
    </div>

  </div>
</template>


<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      user: null,
      isLoading: false,
      isBtnActive: false,
      userFound: false
    }

  },

  methods: {
    checkPresence() {
      this.user = this.getUser()
      this.userFound = true
    },

    getUser() {
      return {
        id: 1,
        avatar: 'https://img-tv.vl.ru/fhd/a55b9339c5ab0062776074644a5470d519012c.jpg',
        name: 'Mama',
        last_name: 'Papa'
      }
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
    }

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
  min-height: 300px;
  /* border: 1px solid red; */
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
  /* width: 124px; */
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
  height: 14px;
  background: red;
  background: url('../assets/icons/glaz.svg') no-repeat center / cover
  /* background: url(') center/cover; */
  /* background-image: url('../assets/icons/glaz.svg'); */

}

</style>