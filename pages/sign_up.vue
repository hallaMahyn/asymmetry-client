<template>
  <div class="signup">
<!-- password part -->
    <div v-if="passwordEqual === false" class="signup-container">
      <div class="signup-container_title"> Sign up</div>
      <div class="signup-container_wrapper">
        <div class="signup-container_email">
          <div class="signup-container_password">
            <div class="signup-container_input-label">
            </div>
            <div class="signup-container_input-wrapper">
              <input
                class="signup-container_input"
                type="password"
                v-model="password"
                placeholder="Enter your password"
                id="password-input"
              />
              <glaz class="glas" v-if="password.length > 0" @click="showPassword('password-input')"  />
            </div>
          </div>
          <div class="signup-container_password">
            <div class="signup-container_input-label">
            </div>
            <div class="signup-container_input-wrapper">
              <input
                class="signup-container_input"
                type="password"
                v-model="passwordConfirm"
                placeholder="Re-Enter your password"
                @keyup.enter="comparePasswords"
                id="password-confirm-input"
              />
              <glaz class="glas" v-if="passwordConfirm.length > 0" @click="showPassword('password-confirm-input')"  />
            </div>
          </div>
        </div>

        <div class="signup-container_button">
          <Button
            title="Next"
            :isBtnActive="password.length >= 8 && password === passwordConfirm"
            @btnClick="comparePasswords"
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
<!-- name part -->
    <div v-if="passwordEqual === true && nameAdded === false" class="signup-container">
      <div class="signup-container_title"> Sign Up </div>

      <div class="signup-container_wrapper">
        <div class="signup-container_password">
          <div class="signup-container_input-label">
            What is you name?
          </div>
          <div class="signup-container_input-wrapper">
            <input
              class="signup-container_input"
              type="text"
              v-model="fullName"
              @keyup.enter="checkFullName"
              placeholder="Enter full name"
            />
          </div>

        </div>

        <div class="signup-container_button">
          <Button
            title="Next"
            :isBtnActive="fullName.length > 5"
            :isLoading="isLoading"
            @btnClick="checkFullName"
          />
        </div>
      </div>
    </div>
<!-- avatar part -->
    <div v-if="nameAdded === true && withAvatar === false" class="signup-container">
      <div class="signup-container_title"> Sign Up </div>

      <div class="signup-container_wrapper column">
        <div class="signup-container_password">
          <div class="signup-container_input-label">
            Upload your photo
          </div>
          <div class="signup-container_input_container">
            <div class="signup-container_input-avatar">
              <div class="signup-container_input-avatar_nested">
                Tap here <br/> to upload
                <img class="uploaded_avatar" v-if="upload.length > 0" :src="upload"  />
              </div>

            </div>
            <div class="uploaded_info">
              Max. 5 MB <br/>
              JPG or PNG formats <br/>
              Recommendated size: 500 <span>x</span> 500 px
            </div>
          </div>

          <input
            class="input_hidden"
            type="file"
            id="file"
            ref="avatar"
            accept=".png, .jpg, .jpeg"
            @change="handleFileUpload()"
          />

        </div>

        <div class="signup-container_button_large">
          <Button
            title="Start learning"
            :isBtnActive="upload.length > 0"
            :isLoading="isLoading"
            @btnClick="singUpUser"
          />
        </div>

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
      fullName: '',
      passwordConfirm: '',
      file: '',
      upload: '',
      passwordEqual: false,
      nameAdded: false,
      isLoading: false,
      isBtnActive: false,
      withAvatar: false,
      errorMessages: '',
      defaultPhoto: "https://img-tv.vl.ru/fhd/a55b9339c5ab0062776074644a5470d519012c.jpg"
    }

  },
  middleware: 'authenticated',

  mounted() {
    this.email = this.$route.query.email
  },

  methods: {
    comparePasswords() {
      this.passwordEqual = this.passwordConfirm === this.password
    },

    checkFullName() {
      this.nameAdded = true
    },

    handleFileUpload(){
      this.file = this.$refs.avatar.files[0];
      this.upload = URL.createObjectURL(this.file);
    },

    singUpUser() {
      const { email, fullName, password, file } = this
      const url = `/api/sign_up`
      const fName = fullName.split(' ')[0] || 'first_name'
      const lName = fullName.split(' ')[1] || 'last_name'
      let formData = new FormData()

      formData.append('avatar', file)
      formData.append('first_name', fName)
      formData.append('last_name', lName)
      formData.append('email', email)
      formData.append('password', password)

      this.$axios.$post(url, formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }}).then(res => {
        this.$axios.setToken(res.data.token, 'Bearer')

        this.$store.commit('add', res.data.user)
        localStorage.setItem('user-token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))

        this.$router.push('/dashboard')
      }).catch(err => {
        console.log(err)
      })
    },


    showPassword(id) {
      let input = document.getElementById(id)
      if (input.type === "password") {
        input.type = "text"
      } else {
        input.type = "password"
      }
    },

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
      return this.password === this.passwordConfirm ? null : "Password do now match"
    },



  },

  computed: {
    validationMessages() {
      return [this.checkLatin(), this.checkLength(), this.checkDigit(), this.checkEqual()]
    }

  }

}
</script>
<style lang="scss" scoped>
.signup {

  display: flex;
  flex-flow: column nowrap;
  justify-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  /* background: blueviolet; */


}
.signup-container {
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

.signup-container_wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 12px;
}

.signup-container_email, .signup-container_password {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
}
.signup-container_password {
  width: 100%;
  position: relative;
}


.signup-container_button {
  min-width: 124px;
  width: 124px;
  &_large {
    width: 416px;
  }
}

.signup-container_input-label {
  font-size: 20px;
  margin-bottom: 12px;
}

.signup-container_input-wrapper {
  height: 66px;
  position: relative;
}

.signup-container_input {
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

.signup-container_input_container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 24px;
}

.signup-container_input-avatar {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  /* background: green; */
  background:#ECDEDE;
  padding: 6px;
  border: 8px solid #FDFDFD;
  cursor: pointer;
  box-shadow: -2px 2px 4px rgba(215, 215, 215, 0.2),
    2px -2px 4px rgba(215, 215, 215, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9),
      2px 2px 5px rgba(215, 215, 215, 0.9),
       inset 2px 2px 2px rgba(255, 255, 255, 0.3),
        inset 1px 1px 2px rgba(255, 255, 255, 0.3),
         inset -1px -1px 2px rgba(215, 215, 215, 0.5);

  margin-right: 16px;

  &_nested {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    font-size: 16px;
    text-align: center;

    line-height: 19px;
    background: #FDFDFD;
    padding: 10px;
    box-shadow: -2px 2px 4px rgba(215, 215, 215, 0.2),
     2px -2px 4px rgba(215, 215, 215, 0.2),
      -2px -2px 4px rgba(255, 255, 255, 0.9),
       2px 2px 5px rgba(215, 215, 215, 0.9),
        inset 1px 1px 2px rgba(255, 255, 255, 0.3),
         inset -1px -1px 2px rgba(215, 215, 215, 0.5);
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

.input_hidden {
  position: absolute;
  width: 150px;
  height: 150px;
  border: 1px solid black;
  top: 25%;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

.uploaded_avatar {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
}


.uploaded_info {
  padding-top: 30px;
  font-size: 16px;
  line-height: 21px;
  span {
    font-size: 12px;
  }
}

.column {
  flex-flow: column nowrap;
  align-items: flex-start;
}

.input_validations {
  font-size: 16px;
}

</style>