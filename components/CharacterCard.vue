<template>
  <NuxtLink class="character-card" :to="`/${location}/${character.id}`" >
    <img class="character-card_avatar" :src="character.avatar || 'https://img-tv.vl.ru/fhd/a55b9339c5ab0062776074644a5470d519012c.jpg'"/>
    <div class="character-card_full-name">{{character.first_name}}</div>
  </NuxtLink>

</template>
<script>


export default {
  props: {
    character: {
      type: Object,
      required: true
    },
    handleClick: {
      type: Function,
      required: false
    },
    location: {
      type: String,
      required: true

    }
  },
  components: {

  },

  methods: {

  },

  mounted: function () {

  }
}

</script>



<style lang="scss">
.character-card {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 66px;
  width: 234px;
  border-radius: 12px;
  background: #FDFDFD;
  position: relative;
  margin-bottom: 12px;
  outline: none;
  color: #FC0D1B;
  padding: 15px;
  text-decoration: none;


  &_avatar {
    min-width: 36px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
  }
  &_full-name {
      background: transparent;

  }
}

.character-card:before {
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
  transition: opacity 0.5s ease;
}

.character-card:after {
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
  transition: opacity 0.5s ease;
}

.character-card:before {
  opacity: 1;
}

.character-card:after {
  opacity: 0;
}

.nuxt-link-active.character-card:after {
  opacity: 1;
}

.nuxt-link-active.character-card:before {
  opacity: 0;
}



@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
