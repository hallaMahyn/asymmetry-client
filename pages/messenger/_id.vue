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
            @setSelected="setAnswerSelected" />
        </transition-group>
        </div>
      </div>

      <div class="chapter-section">
        <div class="chapter-title">Chapters</div>
        <div class="chapter-wrapper">
          <div class="chapter-one" v-for="(ch, i) in chapters" :key="ch.id + i">
            {{i + 1}}
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import sections  from "./data.js"
import { Socket } from 'phoenix-channels'
import axios from 'axios'

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
      highlightFeed: false,
      doFilter: true,
      answerIds: [],
      feed: [],
      chapters: [
        {id: 1, title: "first"},
        {id: 2, title: "two"},
        {id: 3, title: "3" },
        {id: 4, title: "4"},
        {id: 5, title: "first"},
        {id: 6, title: "two"},
        {id: 7, title: "3" },
        {id: 8, title: "4"}
      ],
      currentSection: 0,
    }
  },

  computed: {
    messages: function() {
     return  this.feed
    }
  },

  methods: {
    startTimer () {
      this.startAnimation = false
      setTimeout(() => {
        this.startAnimation = true
      }, 200)
    },

    scrollToBottom() {
      this.$refs.messages.scrollTo(0, this.$refs.messages.scrollHeight);
    },

    async setAnswerSelected (option, message) {
      console.log("TYT")

      if (this.answerIds.includes(option.id)) return

      await this.channel.push("next_message",
        {
          answer: {
            chapter_id: 1,
            message_id: message.id,
            option_id: option.id
          }
        }
      )

      await this.channel.on("next_message", resp => {
          console.log("next", resp.messages)
          resp.messages.map(async (el, i) => {
          // let time = el.text.length * 0.7 * 300
          return setTimeout(() => {
            this.feed.push(el)
          // }, time)
          }, (i + 1) *  700)
        })
      })


      let optionIds = message?.options.map(opt => opt.id)

      if (option?.highlight === false) {
        this.highlightFeed = !this.highlightFeed
      }


      this.answersSelected.push(option.id)
      this.answerIds.push(...optionIds)
      // this.currentSection++
    },

    async initData() {
      await this.getCharacter()
      await this.connectSocket()
    },

    async connectSocket() {
      const isProduction = process.env.NODE_ENV === 'production'
      const socketUrl = isProduction
        ? 'wss://lk2.staging.newprolab.com/socket'
        : 'ws://0.0.0.0:4000/socket'

      let defaultSocket = new Socket(socketUrl)
      this.socket = this.mainSocket || defaultSocket

      this.socket.connect()

      let currentChapter = this.character.chapters[0]

      this.channel = this.socket.channel("user:default", {})
      this.channel.join()
        .receive("ok", _ => {
          console.log("Joined successfully")
          this.channel.push("start_data", {chapter_id: currentChapter.id})

          this.channel.on("start_data", payload => {
            let selectedOptionIds = payload.messages.map(m => m.options).flat().filter(o => o.disabled === true).map(o => o.id)

            this.answerIds = selectedOptionIds
            this.feed = payload.messages || []
          })

        })
        .receive("error", resp => { console.log("Unable to join", resp) })
    },

    async getCharacter() {
      try {
        const resp = await axios.get(`http://localhost:4000/api/characters/${this.$route.params.id}`)
        this.character = resp.data.data
      } catch (error) {
        console.error(error);
        return null
      }
    }
  },

  mounted() {
    this.initData()

    if (!this.startAnimation) {
      this.startTimer()
    }
  },

  watch: {
    '$nuxt.$route.params.id': function(val) {
      this.startTimer()
    },
    'messages': function(messages) {
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
  /* width: 100%; */
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  flex: 2;
}
.messages-scroll-wrapper::-webkit-scrollbar {
  display: none;
}
/* .messages {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 20px;
  flex: 5;
  padding-bottom: 24px;


  &-message {
    max-width: 606px;
    padding: 21px 24px;
    border-radius: 12px;
    margin-bottom: 12px;
  }

}
.messages > span {
  width: 100%;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  margin-bottom: 12px;
} */

/* .messages-wrapper {
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;

  transform: translateY(0);
  transition: transform 0.2s ease, opacity 0.2s ease;
  will-change: transform, opacity;
} */

/* .messages-message-with-avatar {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
} */

/* .messages-message_task .messages-message-text {
  opacity: 0.5;
} */

/* .messages-message_regular {
  background: #F3F3F3;
}

.messages-message_answer {
  align-self: flex-end;
}
.messages-message_system {
  align-self: center;
  max-width: 600px;
  font-size: 24px;
} */
/* 
.messages-message_task {
  background: #FFECED;
  min-width: 606px;
  max-width: 606px;
  box-shadow: -5px 5px 10px rgba(224, 208, 209, 0.2),
    5px -5px 10px rgba(224, 208, 209, 0.2),
    -5px -5px 10px rgba(255, 255, 255, 0.9),
    5px 5px 13px rgba(224, 208, 209, 0.9);
  margin-bottom: 40px;

}

.messages-message_option {
  display: flex;
  flex-flow: row nowrap;
  max-width: 452px;
  width: 100%;
  align-self: flex-end;
  align-items: center;
  box-shadow: -2px 2px 4px rgba(207, 207, 207, 0.2),
   2px -2px 4px rgba(207, 207, 207, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9),
     2px 2px 5px rgba(207, 207, 207, 0.9),
      inset 1px 1px 2px rgba(255, 255, 255, 0.3),
       inset -1px -1px 2px rgba(207, 207, 207, 0.5);
  border-radius: 12px;
  margin-bottom: 12px;
  padding: 18px;
  justify-content: flex-start;
  cursor: pointer;
  &--disabled {
    user-select: none;
    opacity: 0.7;
    cursor: default;
  }

} */

/* .messages-message_option_order {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  box-shadow: -2px 2px 4px rgba(207, 207, 207, 0.2),
    2px -2px 4px rgba(207, 207, 207, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9),
    2px 2px 5px rgba(207, 207, 207, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(207, 207, 207, 0.5);
  border-radius: 12px;
  margin-right: 18px;
}



.messages-message_option--selected {
  position: relative;
}

.messages-message_option--selected:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  box-shadow: -2px 2px 4px rgba(215, 215, 215, 0.2),
    2px -2px 4px rgba(215, 215, 215, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9),
    2px 2px 5px rgba(215, 215, 215, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(215, 215, 215, 0.5);
  opacity: 1;
  transition: opacity 0.3s ease;
}

.messages-message_option--selected:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 12px;
  width: 100%;
  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3),
    -1px -1px 2px rgba(207, 207, 207, 0.5),
    inset -2px 2px 4px rgba(207, 207, 207, 0.2),
    inset 2px -2px 4px rgba(207, 207, 207, 0.2),
    inset -2px -2px 4px rgba(255, 255, 255, 0.9),
    inset 2px 2px 5px rgba(207, 207, 207, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.messages-message_option:before {
  opacity: 1;
}

.messages-message_option:after {
  opacity: 0;
}

.messages-message_option--selected:after {
  opacity: 1;
}

.messages-message_option--selected::before {
  opacity: 0;
}

.messages-message_option_text {
} */

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
  justify-content: center;
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
  &:first-child {
    box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3),
      -1px -1px 2px rgba(207, 207, 207, 0.5),
        inset -2px 2px 4px rgba(207, 207, 207, 0.2),
         inset 2px -2px 4px rgba(207, 207, 207, 0.2),
          inset -2px -2px 4px rgba(255, 255, 255, 0.9),
           inset 2px 2px 5px rgba(207, 207, 207, 0.9);
  }
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
