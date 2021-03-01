<template>
  <NuxtLink class="nav-button" :to="`/${type}`">
    <messenger-icon v-if="type == 'messenger' "/>
    <dashboard-icon v-if="type == 'dashboard' "/>
    <map-icon v-if="type == 'map' "/>
  </NuxtLink>


</template>
<script>
import MessengerIcon from "@/assets/icons/messengerIcon.svg"
import DashboardIcon from "@/assets/icons/dashboardIcon.svg"
import MapIcon from "@/assets/icons/mapIcon.svg"

export default {
  props: {
    type: {
      type: String,
      required: true
    },

  },
  components: {
    MessengerIcon,
    DashboardIcon,
    MapIcon
  },

  methods: {

  },

  mounted: function () {
    console.log("current route", $nuxt.$route.path )
  }
}

</script>



<style lang="scss">
.nav-button {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 66px;
  width: 66px;
  border-radius: 12px;
  background: #FDFDFD;
  position: relative;
  margin-bottom: 12px;
  outline: none;
}

.nav-button:before {
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

.nav-button:after {
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

.nav-button:before {
  opacity: 1;
}

.nav-button:after {
  opacity: 0;
}

.nuxt-link-active.nav-button:after {
  opacity: 1;
}

.nuxt-link-active.nav-button::before {
  opacity: 0;
}



@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
