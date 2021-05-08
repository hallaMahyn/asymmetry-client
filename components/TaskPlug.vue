<template>
  <NuxtLink :to="location" class="task withShadow">
    <div class="content">
      <div class="title">{{task.title}}</div>
      <div class="description">{{task.description}}</div>
    </div>
    <div class="countdown-timer withShadow">
      <vue-countdown :time="timeToBurn" v-slot="{ days, hours, minutes, seconds }">
        {{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}
      </vue-countdown>
    </div>
  </NuxtLink>
</template>

<script>
import Vue from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';
Vue.component('vue-countdown', VueCountdown);

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      timeToBurn: 0

    }
  },
  mounted() {
    this.setUp()
  },

  methods: {
    setUp() {
      const countDownDate = new Date(this.task.end_date).getTime()
      let now = new Date().getTime();
      this.timeToBurn = countDownDate - now
    }
  },
  computed: {
    // timer() {
    //   const countDownDate = new Date(this.task.deadline).getTime()
    //   // let x = setInterval(function() {

    //     let now = new Date().getTime();

    //     // Find the distance between now and the count down date
    //     var distance = countDownDate - now;

    //     // Time calculations for days, hours, minutes and seconds
    //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //   return `${days}:${hours}:${minutes}:${seconds}`
    // }
  },


}
</script>

<style lang="scss" scoped>

.task {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 20px;
  background: #FDFDFD;
  border-radius: 12px;
  height: 108px;
  margin-bottom: 12px;
  text-decoration: none;
  color: #FC0D1B;
}


.title {
  font-size: 16px;
  margin-bottom: 8px;
}

.description {
  opacity: 0.6;
}

.withShadow {
  box-shadow: -1px 1px 2px rgba(215, 215, 215, 0.2),
   1px -1px 2px rgba(215, 215, 215, 0.2),
    -1px -1px 2px rgba(255, 255, 255, 0.9),
     1px 1px 3px rgba(215, 215, 215, 0.9),
      inset 1px 1px 2px rgba(255, 255, 255, 0.3),
       inset -1px -1px 2px rgba(215, 215, 215, 0.5);
}

.countdown-timer {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 8px;
  width: 92px;
}

</style>