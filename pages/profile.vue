<template>
  <div class="profile">
    <div class="profile_card">
      <div class="profile_card_section">
        <div class="file_input">
          <tricky-circle :avatar="userAvatar" :withAvatar="true"/>
          <img class="uploaded_avatar" v-if="upload.length > 0" :src="upload"  />
          <input
            class="input_hidden"
            type="file"
            id="file"
            ref="avatar"
            accept=".png, .jpg, .jpeg"
            @change="handleFileUpload()"
          />
        </div>
        <div class="user-info">
          <span class="user-info_full-name">{{firstName}} <br/> {{lastName}}</span>
          <span class="user-info_profession">Business Semiotics</span>
        </div>
        <div class="card_middleline" />
      </div>
      <div class="profile_card_section">
        <div class="profile_card_section_title"> Level 1 </div>
        <tricky-circle
          :progress="0"
          title="Senior Analyst"
        />
        <div class="profile_section_info-wrapper">
          <info-square :value="88" title="Karma" />
          <info-square :value="12" title="Coints"/>
        </div>
      </div>
    </div>

    <div class="profile_inputs">
      <div class="profile_inputs_email">
        <div class="profile_inputs_label">
          Name
        </div>
        <div class="inner">
          <input
            v-model="updatedUser.first_name"
            class="profile_inputs_input"
            placeholder="Enter your name"
          />
          <div class="update_button">
            <Button
              v-if="user.first_name !== updatedUser.first_name"
              title="Save"
              :isLoading="isLoading"
              :isBtnActive="true"
              @btnClick="updateProfile('first_name', updatedUser.first_name)"
            />
          </div>
        </div>

      </div>

      <div class="profile_inputs_email">
        <div class="profile_inputs_label">
          Last name
        </div>
        <div class="inner">
          <input
            v-model="updatedUser.last_name"
            class="profile_inputs_input"
            placeholder="Enter e-mail"

          />
          <div class="update_button">
            <Button
              v-if="user.last_name !== updatedUser.last_name"
              title="Save"
              :isLoading="isLoading"
              :isBtnActive="true"
              @btnClick="updateProfile('last_name', updatedUser.last_name)"
            />
          </div>
        </div>
      </div>
      <div class="profile_inputs_email">
        <div class="profile_inputs_label">
          Mail
        </div>
        <div class="inner">
          <input
            v-model="updatedUser.email"
            class="profile_inputs_input"
            placeholder="Enter e-mail"
          />
          <div class="update_button">
            <Button
              v-if="user.email !== updatedUser.email"
              title="Save"
              :isLoading="isLoading"
              :isBtnActive="true"
              @btnClick="updateProfile('email', updatedUser.email)"
            />
          </div>
        </div>
      </div>

      <div class="profile_inputs_email without_margin password_input">
        <div class="profile_inputs_label">
          New password
        </div>
        <input
          v-model="password"
          type="password"
          class="profile_inputs_input"
          placeholder="Enter new password"
          id="password-input"

        />
        <glaz class="glas" v-if="password.length > 0" @click="showPassword('password-input')"  />
      </div>
      <div class="inner">
        <div v-if="password.length > 0" class="profile_inputs_email password_input">
          <div class="profile_inputs_label">
          </div>
          <input
            v-model="passwordConfirm"
            type="password"
            class="profile_inputs_input"
            placeholder="Re-Enter your new password"
            id="password-confirm-input"

          />
          <glaz class="glas" v-if="passwordConfirm.length > 0" @click="showPassword('password-confirm-input')"  />
        </div>
        <div class="update_button with_margin">
          <Button
            v-if="password.length > 0"
            title="Save"
            :isLoading="isLoading"
            :isBtnActive="validationMessages.every(el => el === null)"
            @btnClick="updateProfile('password', password)"
          />
        </div>
      </div>
      <div class="input_validations"  v-if="password.length > 0">
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
import { cloneDeep } from 'lodash'

export default {
  components: {
    Glaz
  },
  data() {
    return {
      user: null,
      password: '',
      passwordConfirm: '',
      userAvatar: null,
      updatedUser: null,
      file: '',
      upload: '',
      isLoading: false
    }
  },
  created() {
    this.initStuff()
  },

  mounted() {
    this.initStuff()
  },


  computed: {
    validationMessages() {
      return [this.checkLatin(), this.checkLength(), this.checkDigit(), this.checkEqual()]
    },

    firstName() {
      return this.user?.first_name
    },

    lastName() {
      return this.user?.last_name
    }
  },


  methods: {
    checkLength() {
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

    initStuff() {
      this.user = this.$store.state.user
      this.updatedUser = cloneDeep(this.$store.state.user)
      this.userAvatar = this.user?.avatar
    },

    showPassword(id) {
      let input = document.getElementById(id)
      if (input.type === "password") {
        input.type = "text"
      } else {
        input.type = "password"
      }
    },

    updateProfile(field, value) {
      this.isLoading = true

      const url = `/api/update_profile`

      let formData = new FormData()

      formData.append(field, value)

      this.$axios.$patch(url, formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }}).then(user => {
        this.$store.commit('add', user)
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
        this.password = ''
        this.passwordConfirm = ''
        this.isLoading = false
        this.$toast.success('Saved')

      }).catch(err => {
        console.log(err)
        this.$toast.error('Something was wrong')
      })
    },

    handleFileUpload(){
      this.file = this.$refs.avatar.files[0]
      this.upload = URL.createObjectURL(this.file)
      this.updateProfile('avatar', this.file)
    },
  }
}
</script>

<style lang="scss" scoped>
.profile {
  margin-top: 20px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  color: #FC0D1B;
}

.profile_card {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  border-radius: 12px;
  background: #FDFDFD;
  align-items: center;
  min-height: 666px;
  height: 70%;
  width: 269px;
  padding: 34px 22px 46px 22px;
  box-shadow: -1px 1px 2px rgba(215, 215, 215, 0.2),
   1px -1px 2px rgba(215, 215, 215, 0.2),
    -1px -1px 2px rgba(255, 255, 255, 0.9),
     1px 1px 3px rgba(215, 215, 215, 0.9),
      inset 1px 1px 2px rgba(255, 255, 255, 0.3),
       inset -1px -1px 2px rgba(215, 215, 215, 0.5);
}

.profile_section_info-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.profile_card_section {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  text-align: center;
  min-height: 280px;

  &_title {
    font-size: 20px;
    margin-bottom: 12px;
  }
}


.user-info {
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  line-height: 24px;
  margin-bottom: 24px;

  user-select: none;
  &_full-name {
    margin-bottom: 12px;
    font-size: 20px;
  }
  &_profession {
    opacity: 0.5;
    font-size: 16px;
  }
}

.profile_inputs_email {
  margin-bottom: 24px;
}

.without_margin {
  margin-bottom: 0px;
}
.password_input {
 position: relative;
}

.profile_inputs_input {
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
  input {
    width: 100%;
  }
}

.profile_inputs_label {
  font-size: 20px;
  margin-bottom: 12px;
}

.profile_inputs {
  padding: 0 50px;
}

.card_middleline {
  width: 150px;
  height: 4px;
  background: #FDFDFD;
  box-shadow: -1px 1px 2px rgba(215, 215, 215, 0.2),
   1px -1px 2px rgba(215, 215, 215, 0.2),
    -1px -1px 2px rgba(255, 255, 255, 0.9),
     1px 1px 3px rgba(215, 215, 215, 0.9),
      inset 1px 1px 2px rgba(255, 255, 255, 0.3),
       inset -1px -1px 2px rgba(215, 215, 215, 0.5);
  border-radius: 12px;
}

.inner {
  display: flex;
  input {
    margin-right: 12px;
  }
}

.update_button {
  width: 124px;
}

.glas {
  position: absolute;
  cursor: pointer;
  bottom: 28px;
  left: 280px;
  width: 22px;
  height: 12px;
  object-fit: contain;
}

.file_input {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.uploaded_avatar {
  position: absolute;
  object-fit: cover;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  padding: 13px;
}

.with_margin {
  margin-top: 12px;
}

.input_hidden {
  position: absolute;
  width: 150px;
  height: 150px;
  border: 1px solid black;
  top: 0px;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
</style>