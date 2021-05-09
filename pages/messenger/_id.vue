<template>
  <div class="dialog-wrapper">
    <div class="messages-scroll-wrapper" ref="messages">

      <div :class="{'messages': true, 'highlight': highlightFeed}"  >

        <transition-group name="list-complete" appear>
          <messeges-section
            v-for="(m, i) in messages"
            :key="i + m.id" :message="m"
            :selected="answersSelected"
            :answerIds="answerIds"
            :ref="m.id"
            @setSelected="setAnswerSelected" />
        </transition-group>
        </div>
      </div>

      <div class="chapter-section">
        <div class="chapter-title">Chapters</div>
        <div class="chapter-wrapper">
          <div class="chapter-one" :class="{'currentChapter': ch.position <= currentChapter.position}" v-for="(ch, i) in chapters" :key="ch.id + i" @click="scrollToChapter(ch)">
            {{i + 1}}
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import { Socket } from 'phoenix-channels'
export default {
  props: {
    mainSocket: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      socket: null,
      channel: null,
      startAnimation: false,
      answersSelected: [],
      character: null,
      currentChapter: null,
      highlightFeed: false,
      doFilter: true,
      answerIds: [],
      feed: [],
      chapters: [
        // {id: 1, title: "first"},
        // {id: 2, title: "two"},
        // {id: 3, title: "3" },
        // {id: 4, title: "4"},
        // {id: 5, title: "first"},
        // {id: 6, title: "two"},
        // {id: 7, title: "3" },
        // {id: 8, title: "4"}
      ],
    }
  },

  computed: {
    messages() {
     return this.feed
    },

    currentUser() {
      this.$store.state.user
    }

  },

  methods: {
    startTimer () {
      this.startAnimation = false
      setTimeout(() => {
        this.startAnimation = true
      }, 200)
    },


    scrollToChapter(chapter) {
      const target = this.$refs['anchor' + chapter.id]?.[0]
      if (target){
        target.$el?.scrollIntoView({behavior: 'smooth'})
      }
    },

    scrollToBottom() {
      this.$refs.messages.scrollTo(0, this.$refs.messages.scrollHeight);
    },

    async setAnswerSelected (option, message) {

      if (this.answerIds.includes(option.id)) return

      await this.channel.push("next_message",
        {
          answer: {
            chapter_id: this.currentChapter.id,
            message_id: message.id,
            option_id: option.id
          }
        }
      )

      let optionIds = message?.options.map(opt => opt.id)

      if (option?.highlight === false) {
        this.highlightFeed = !this.highlightFeed
      }

      this.answersSelected.push(option.id)
      this.answerIds.push(...optionIds)
    },

     connectSocket() {
      const user = this.$store.state.user
      const isProduction = process.env.NODE_ENV === 'production'
      const socketUrl = isProduction
        ? 'wss://23.105.248.11:4003/socket'
        : 'ws://localhost:4000/socket'

      const token = localStorage.getItem('user-token')
      const defaultSocket = new Socket(socketUrl, { params: { token: token } })

      this.socket = this.mainSocket || defaultSocket
      this.socket.connect()

      this.channel = this.socket.channel(`user:${user.id}`)
      this.channel.join()
        .receive("ok", _ => {
          console.log("Joined successfully")
          this.channel.push("start_data", {chapter_id: this.currentChapter.id})

          this.channel.on("start_data", payload => {
            let selectedOptionIds = payload.messages.map(m => m.options).flat().filter(o => o?.disabled === true).map(o => o.id)

            this.answerIds = selectedOptionIds
            this.feed = payload.messages


            this.channel.on("next_message", resp => {
                resp.messages.map(async (el, i) => {
                return setTimeout(() => {
                  this.currentChapter = el.chapter
                  this.feed.push(el)
                }, (i + 1) *  700)
              })
            })

          })

        })
        .receive("error", resp => { console.log("Unable to join", resp) })
    },

    async getCharacter() {
      const url = `api/characters/${this.$route.params.id}`
      await this.$axios.$get(url).then(res => {
        this.chapters = res.character.chapters
        this.character = res.character
        this.currentChapter = res.chapter
        this.connectSocket()
      }).catch(err => {
        console.log("err", err)
      })
    }
  },

  mounted() {
    this.getCharacter()

    if (!this.startAnimation) {
      this.startTimer()
    }
  },

  watch: {
    '$nuxt.$route.params.id': function() {
      this.getCharacter()
      this.startTimer()
    },
    'messages': function() {
      setTimeout(() => this.scrollToBottom(), 0 )
      this.scrollToBottom()

      if (this.doFilter) {
        let target = this.messages.find(el => el?.highlight === true)
        if (target) {
          this.highlightFeed = !this.highlightFeed
          this.doFilter = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 20px 20px 20px;
  color: #FC0D1B;
  font-size: 16px;

}
.messages-scroll-wrapper {
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  flex: 2;
}
.messages-scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.chapter-section {
  display: flex;
  line-height: 19px;
  flex-flow: column nowrap;
  flex: 1;
  align-items: left;
  justify-content: center;
  max-width: 100px;
}

.chapter-title {
  margin-bottom: 24px;
  padding-left: 12px;
}

.chapter-wrapper {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
}

.chapter-one {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  align-items: center;
  margin-right: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  border-radius: 12px;
  /* &:first-child {
    box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3),
      -1px -1px 2px rgba(207, 207, 207, 0.5),
        inset -2px 2px 4px rgba(207, 207, 207, 0.2),
         inset 2px -2px 4px rgba(207, 207, 207, 0.2),
          inset -2px -2px 4px rgba(255, 255, 255, 0.9),
           inset 2px 2px 5px rgba(207, 207, 207, 0.9);
  } */
}

.currentChapter {
  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3),
    -1px -1px 2px rgba(207, 207, 207, 0.5),
      inset -2px 2px 4px rgba(207, 207, 207, 0.2),
        inset 2px -2px 4px rgba(207, 207, 207, 0.2),
        inset -2px -2px 4px rgba(255, 255, 255, 0.9),
          inset 2px 2px 5px rgba(207, 207, 207, 0.9);
}
.highlight {
  /* border: 5px solid blue */
}

.list-complete-item {
  transition: all 3s;
  display: inline-block;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px) translateX(30px);
}
.list-complete-leave-active {
  position: absolute;
}


</style>>
