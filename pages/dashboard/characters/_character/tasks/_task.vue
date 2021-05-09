<template>
  <div class="task">
    <div class="center">
      <go-back-icon class="goBack" @click="goToBack()"/>
      <div class="task_title">{{title}}</div>
      <div class="task_tags">
        <div class="tag" v-for="(tag, i) in tags" :key="tag + i">
          {{tag}}
        </div>
      </div>
      <div class="task_desctiption_label">Description</div>
      <div class="task_desctiption">{{description}}</div>
      <a :href="taskFile" target="_blank" class="file shadow" v-if="taskFile && taskFile.length > 0">
        <div class="file_icon shadow">
          <download-icon />
        </div>
        <div class="file_title"> {{task.file_title}} </div>
        <div class="file_description">{{task.file_description}}</div>
      </a>

    </div>
    <div class="right_part shadow">
      <div class="deadline">
        <tricky-circle class="circle" title="" />
        <vue-countdown class="overflow_countdown" :time="timeToBurn" v-slot="{ days, hours, minutes, seconds }">
          {{ days }} days<br/>{{ hours }}:{{ minutes }}:{{ seconds }}
        </vue-countdown>
      </div>
      <div class="info-wrapper">
        <info-square :value="153" title="eX" />
        <info-square :value="12" title="Coints"/>
      </div>
      <div class="middlelane shadow" />
      <div :class="{
        'uploadButton': true,
        'shadow': true,
        'disabled': disabled
      }">
        <input
          :class="{'input_hidden': true, 'disabled': disabled}"
          type="file"
          id="file"
          ref="work"
          accept=".pdf, .xls, .xlsx, .doc, .docs, .csv, .jpg, .jpeg, .gif, .png"
          @change="handleFileUpload()"
        />
        <div class="file_icon shadow upload">
          <download-icon />
        </div>
        Upload your work
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';
import GoBackIcon from '@/assets/icons/option.svg'
import DownloadIcon from '@/assets/icons/download.svg'
Vue.component('vue-countdown', VueCountdown);
export default {
  components: {
    GoBackIcon,
    DownloadIcon
  },
  data() {
    return {
      timeToBurn: 0,
      work: '',
      task: null,
    }
  },
  created() {
    this.getTask()
  },

  computed: {
    title() {
      return this.task?.title
    },

    description() {
      return this.task?.description
    },

    tags() {
      return this.task?.tags
    },

    taskFile() {
      return this.task?.file
    },

    disabled() {
      return this.task?.options.length > 0
    }

  },

  methods: {
    async getTask() {
      const url = `api/tasks/${this.$route.params.task}`
      await this.$axios.$get(url).then(res => {
        this.task = res
        console.log(res)
        this.setTimer()
      }).catch(err => {
        console.log("err", err)
      })
    },

    goToBack() {
      this.$router.back()
    },

    handleFileUpload() {
      this.work = this.$refs.work.files[0]
      this.uploadWork(this.work)
    },

    uploadWork(workFile) {
      const url = `/api/tasks/${this.$route.params.task}`
      const characterId = this.$route.params.character

      let formData = new FormData()

      formData.append('file', workFile)
      formData.append('character_id', characterId)

      this.$axios.$post(url, formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }}).then(res => {
        this.$toast.success('Successfully Uploaded')
      }).catch(err => {
        console.log(err)
        this.$toast.error('Something was wrong')
      })
    },

    setTimer() {
      const countDownDate = new Date(this.task.end_date).getTime()
      let now = new Date().getTime();
      this.timeToBurn = countDownDate - now
    }
  }

}
</script>

<style lang="scss" scoped>
.task {
  padding-left: 50px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;

}

.center {
  display: flex;
  flex-flow: column nowrap;
  width: calc(100% - 50px);
  max-width: 1100px;
  margin-right: 50px;
}

.task_title {
  font-size: 20px;
  margin-bottom: 16px;
}

.task_tags {
  display: flex;
  flex-flow: row;
  margin-bottom: 40px;
}
.tag {
  padding: 10px 15px;
  border-radius: 12px;
  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3),
    -1px -1px 2px rgba(207, 207, 207, 0.5),
    inset -2px 2px 4px rgba(207, 207, 207, 0.2),
    inset 2px -2px 4px rgba(207, 207, 207, 0.2),
    inset -2px -2px 4px rgba(255, 255, 255, 0.9),
    inset 2px 2px 5px rgba(207, 207, 207, 0.9);
  margin-right: 12px;
}

.task_desctiption_label {
  font-size: 20px;
  margin-bottom: 16px;
}

.task_desctiption {
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
}


.file {
  position: relative;
  text-decoration: none;
  color: #FC0D1B;
  padding: 24px 18px 21px 76px;
  cursor: pointer;
  font-size: 16px;
  height: 108px;

  &_title {
    margin-bottom: 8px;
  }

  &_description {
    opacity: 0.6;
    /* max-width: 600px; */
    /* white-space: nowrap; */
    /* text-overflow: ellipsis; */
    /* overflow: hidden; */
  }

  &_icon {
    position: absolute;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    top: 32px;
    left: 20px;
    width: 40px;
    height: 40px;
  }
}



.right_part {
  padding-top: 32px;
  width: 269px;
  max-height: 416px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}


.info-wrapper {
  display: flex;
  flex-flow: row;
  margin-bottom: 24px;
  >div:first-child {
    margin-right: 12px;
  }
}


.middlelane {
  width: 150px;
  height: 4px;
  background: #FDFDFD;
  margin-bottom: 24px;
}


.goBack {
  width: 40px;
  height: 40px;
  transition: transform .2s ease;
  cursor: pointer;
  will-change: transform;
  margin-bottom: 32px;
  &:hover {
    transform: scale(1.1);
  }
}

.uploadButton {
  background: #FFECED;
  position: relative;
  width: 150px;
  height: 68px;
  padding-left: 64px;
  padding-top: 12px;
  padding-right: 12px;
  align-items: center;
  cursor: pointer;
}

.input_hidden {
  position: absolute;
  width: 150px;
  height: 68px;
  border: 1px solid black;
  top: 0px;
  left: 0;
  opacity: 0;
  cursor: pointer;
}


.deadline {
  /* border: 1px solid black; */
  position: relative;
}


.overflow_countdown {
  position: absolute;
  font-size: 20px;
  top: 50px;
  left: 36px;
  text-align: center;
  width: 80px;
}

.customToast {
   background: #FFECED !important;
  /* background: pink ; */
  color: #FC0D1B;
}
.upload {
  top: 13px;
  left: 10px;
}

.disabled {
  user-select: none;
  
  
  cursor: default;
}
</style>