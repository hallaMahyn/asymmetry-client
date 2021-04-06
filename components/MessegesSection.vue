<template>
  <div class="messages-wrapper">
    <!-- <pre>{{message}}</pre> -->
    <div class="messages-message-with-avatar">
      <img
        v-if="message.type === 'text' || message.type === 'question'"
        class="avatar"
        src="https://img-tv.vl.ru/fhd/a55b9339c5ab0062776074644a5470d519012c.jpg"
      />
      <div
        :class="{
          'messages-message': true,
          'messages-message_regular': message.type === 'text' || message.type === 'question',
          'messages-message_task': message.type === 'task',
          'messages-message_system': message.type === 'system',
          'messages-message_option': message.type === 'option',
        }"
      >
        <div class="messages-message-title" v-if="message.type === 'task'"> {{message.title}} </div>
        <!-- <div class="messages-message-text"> {{message.title}} </div> -->
        <div class="messages-message-text"> {{message.description}} </div>
      </div>
    </div>
    <div
      :class="{
        'messages-message_option': true,
        'messages-message_option--selected': selected.includes(o.id) || o.selected === true,
        'messages-message_option--disabled': answerIds.includes(o.id),
      }"
      v-for="(o, i) in message.options"
      :key="o.id + i"
      @click="$emit('setSelected', o, message)"
    >

      <div class="messages-message_option_text">{{o.title}}</div>
    </div>
  </div>


</template>
<script>
import MessengerIcon from "@/assets/icons/messengerIcon.svg"


export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    selected: Array,
    answerIds: Array,
  },
  components: {

  },

  methods: {

  },

  mounted: function () {
    

  }
}

</script>



<style lang="scss" scoped>
.messages {
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
}

.messages-wrapper {
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding-right: 8px;

  /* opacity: 0; */
  transform: translateY(0);
  transition: transform 0.2s ease, opacity 0.2s ease;
  will-change: transform, opacity;
}

.messages-message-with-avatar {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
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



</style>
