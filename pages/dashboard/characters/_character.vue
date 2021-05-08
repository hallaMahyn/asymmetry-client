<template>
  <div class="row">
    <div class="dashboard_left-card">
      <profile-card :user="user" />
    </div>
    <div class="dashboard_character_container" v-if="!$route.params.task">
      <div class="content" >
        <div class="inner">
          <div class="title">
            Last Messages
          </div>
          <div class="character_card_with_description">
            <character-card :character="character" location="messenger"/>
            <div class="description">
              Click character to go to the chat
            </div>
          </div>
          <div class="message">
            tratatatata tataattatatatataatat dasdsasdasdads dsadadasdsadasdsds saddaadas asdsadasdsadasd asdadadasdsadas sadadadasdsd asdadsd adssa dasd asda ddsa ad 
          </div>
        </div>
        <div class="tasks_container inner">
          <div class="title">
            Tasks
          </div>
          <div class="tasks">
            <task-plug
              v-for="t in tasks"
              :key="t.id"
              :task="t"
              :location="`/dashboard/characters/${$route.params.character}/tasks/${t.id}`"
            />
          </div>
        </div>
      </div>
      <course-card />
    </div>
    <NuxtChild v-else />
  </div>
</template>
<script>

export default {

  data() {
    return {
      character: {},
      user: null,
      tasks: [
        {
          id: 1,
          title: 'Task 1. Some title',
          description: 'Some description task lorem ipsum amogus aboba privet davaite',
          deadline: "May 12, 2021 15:37:25"
        },
        {
          id: 2,
          title: 'Task 2. Some title',
          description: 'Some description task lorem ipsum amogus aboba privet davaite',
          deadline: "May 15, 2021 20:37:17"
        }
      ]
    }
  },

  created() {
    this.user = this.$store.state.user
  },

  mounted() {
    this.getCharacter()
  },



  methods: {
    async getCharacter() {
      const url = `api/characters/${this.$route.params.character}`
      await this.$axios.$get(url).then(res => {
        this.character = res
      }).catch(err => {
        console.log("err", err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard_character_container {
  display: flex;
  flex-flow: row nowrap;
}

.content {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  min-width: 400px;
  padding: 0px 20px 0px 50px;
}

.title {
  font-size: 20px;
  margin-bottom: 24px;
}

.character_card_with_description {
  display: flex;
  height: 70px;
  margin-bottom: 12px;
}

.description {
  width: 170px;
  user-select: none;
  padding: 10px 20px;
  opacity: 0.6;
}

.inner {
  margin-bottom: 40px;
}

.message {
  padding: 24px;
  display: inline-block;
  background: #F3F3F3;
  border-radius: 12px;
  user-select: none;
}
</style>

