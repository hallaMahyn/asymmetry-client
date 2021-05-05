<template>
  <div class="messenger">
    <div class="messenger-contacts">
      <character-card v-for="c in characters" :key="c.id" :character="c" />
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
      characters: [
        // {
        //   id: 1,
        //   fullName: "Plato",
        //   avatar: "https://img-tv.vl.ru/fhd/a55b9339c5ab0062776074644a5470d519012c.jpg",
        // },
        // { id: 2, fullName: "Krutaya Mamasha", avatar: "https://super01.ru/pictures/product/big/42300_big.jpg", },
        // { id: 3, fullName: "Longertharteson Jsaidalosiaver", avatar: "https://vokrug-tv.ru/pic/person/0/d/6/8/0d681ba6ed916cc9d795ef6dfdeac19b.jpeg",}
      ],
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
      ? 'ws://23.105.248.11:4003/socket'
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