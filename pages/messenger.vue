<template>
  <div class="messenger">
    <div class="messenger-contacts">
      <character-card v-for="c in characters" :key="c.id" :character="c" location="messenger" />
    </div>
    <NuxtChild :mainSocket="socket" />
  </div>
</template>

<script>

import CharacterCard from '@/components/CharacterCard.vue'
import { Socket } from 'phoenix-channels'

export default {
  components: { CharacterCard },
  data() {
    return {
      socket: null,
      characters: [],
    }
  },
  methods: {
    async getCharacters() {
      try {
        const url = 'api/characters'
        this.$axios.$get(url)
          .then(res => {
            this.characters = res || []
          })
          .catch(err => {
            console.log(err)
          })
      } catch (error) {
        console.error(error);
      }
    }

  },

  mounted() {
    const token = localStorage.getItem('user-token')
    const isProduction = process.env.NODE_ENV === 'production'
    const socketUrl = isProduction
      ? 'wss://23.105.248.11:4443/socket'
      : 'ws://localhost:4000/socket'

    this.socket = new Socket(socketUrl, { params: { token: token } })

    this.getCharacters()
  },



}
</script>

<style lang="scss" scoped>

.messenger{
  display: flex;
  width: 100%;
  height: 100vh;
  &-contacts {
    width: 300px;
    height: 100%;
    padding: 20px 30px 20px 0px;
  }
}


</style>