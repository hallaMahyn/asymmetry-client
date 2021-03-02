<template>
  <div class="dialog-wrapper">
    <div :class="{'messages': true, 'highlight': highlightFeed}" >
      <div class="messages-wrapper" v-for="(m, index) in messages"  :key="m.id + index"
        :style="{
          opacity: startAnimation ? '1' : '0',
          transform: startAnimation ? 'translateY(0)' : 'translateY(-20px)',
          transitionDelay: `${index * 0.3}s`
        }"
      >
      <div
        :class="{
          'messages-message': true,
          'messages-message_regular': m.type === 'regular',
          'messages-message_task': m.type === 'task',
          'messages-message_system': m.type === 'system',
          'messages-message_option': m.type === 'answer',
          'messages-message_option--selected': m.id === answerSelected
        }"
      >
        <div class="messages-message-title" v-if="m.type === 'task'"> {{m.title}} </div>
        <div class="messages-message-text"> {{m.text}} </div>

      </div>
        <div
        :class="{
          'messages-message_option': true,
          'messages-message_option--selected': o.id === answerSelected,
          'messages-message_option--disabled': answerIds.includes(o.id)
        }"
        v-for="(o, i) in m.options"
        :key="o.id + i"
        @click="setAnswerSelected(o, m)"
        >
          <div class="messages-message_option_text">{{o.text}}</div>
        </div>
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

export default {

  data() {
    return {
    startAnimation: false,
    answerSelected: null,
    highlightFeed: false,
    doFilter: true,
    answerIds: [],
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
    characters: [
        {
          id: 1,
          fullName: "Plato",
          messages: [
            {
              id: 1,
              text: "hey!!",
              type: "regular",
            },
            {
              id: 2,
              text: "finally got around to downloading asymmetry, huh",
              type: "regular",
              options: [
                {
                  id: 3,
                  text: "hey plato. thanks for the invite!",
                  type: "answer"
                }
              ]
            },

          ]
        },
        {
          id: 2,
          fullName: "Krutaya Mamasha",
          messages: [
            {
              id: 4,
              text: "Я Крутая Мамаша, приветствую тебя, у меня есть для тебя кое что",
              type: "regular",
              },
            {
              id: 5,
              text: "Сейчас я буду задавать тебе вопросы а ты отвечай, только сначала подумай хорошенько, ладно?",
              type: "regular"
            },
            {
              id: 6,
              text: "Как зовут 2 хокаге?",
              title: "Task 1",
              type: "task",
              options: [
                {
                  id: 3,
                  text: "Tobirama",
                  isCorrect: true
                },
                {
                  id: 4,
                  text: "Obito",
                  isCorrect: true
                }
              ]
            },
          ]
        },
        { id: 3, fullName: "Longerthsayuaossd Jsaidasidaddosa" }
      ],
    }
  },

  computed: {
    messages: function() {
     return  this.characters[$nuxt.$route.params.id - 1].messages
    }
  },

  methods: {
    startTimer () {
      this.startAnimation = false
      setTimeout(() => {
        this.startAnimation = true
      }, 200)
    },

    setAnswerSelected (option, message) {
      if (this.answerIds.includes(option.id)) return

      let optionIds = message?.options.map(opt => opt.id)

      let nextSection = sections[this.currentSection] || []

      if (option?.highlight === false) {
        this.highlightFeed = !this.highlightFeed
      }


      if (option?.messages?.length > 0) {
        this.characters[$nuxt.$route.params.id - 1].messages.push(...option.messages)
        this.characters[$nuxt.$route.params.id - 1].messages.push(...nextSection)
      } else {
        this.characters[$nuxt.$route.params.id - 1].messages.push(...nextSection)
      }




      this.answerSelected = option.id
      this.answerIds.push(...optionIds)
      this.currentSection++
    }
  },

  mounted() {
    if (!this.startAnimation) {
      this.startTimer()
    }
  },

  watch: {
    '$nuxt.$route.params.id': function(val) {
      this.startTimer()
    },
    'messages': function(messages) {
      console.log("hui sosu", messages)
      if (this.doFilter) {
        let target = messages.find(el => el?.highlight === true)
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
.messages {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 20px;
  flex: 5;
   padding-bottom: 42px;

  &-message {
    max-width: 606px;
    padding: 21px 24px;
    border-radius: 12px;
    margin-bottom: 12px;

  }

}

.messages-wrapper {
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;

  opacity: 0;
  transform: translateY(0);
  transition: transform 0.2s ease, opacity 0.2s ease;
  will-change: transform, opacity;
}

.messages-message_task .messages-message-text {
  opacity: 0.5;
}

.messages-message_regular {
  background: #F3F3F3;
}

.messages-message_answer {
  align-self: flex-end;
}
.messages-message_system {
  align-self: center;
  max-width: 600px;
  font-size: 24px;
}

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

}

.messages-message_option_order {
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


}

.chapter-section {
  display: flex;
  line-height: 19px;
  flex-flow: column nowrap;
  flex: 1;
  align-items: center;
  justify-content: center;
    max-width: 100px;
}

.chapter-title {
  margin-bottom: 24px;
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


</style>>
