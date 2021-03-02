<template>
  <div class="messenger">
    <div class="messenger-contacts">
      <character-card v-for="c in characters" :key="c.id" :character="c" />
    </div>
    <NuxtChild />
  </div>
</template>

<script>

import CharacterCard from '@/components/CharacterCard.vue'
export default {
  components: { CharacterCard },
  data() {
    return {
      characters: [
        {
          id: 1,
          fullName: "Plato",
          avatar: "https://img-tv.vl.ru/fhd/a55b9339c5ab0062776074644a5470d519012c.jpg",
          answers: [
            {
              id: 1,
              text: "privet я Магистр Момолов",
              type: "regular",
              },
            {
              id: 2,
              text: "хочешь поиграть со мной в ожну страненнькую игру?",
              type: "regular"
            },
            {
              id: 3,
              text: "как зовут 4 хокаге?",
              type: "question",
              options: [
                {
                  id: 1,
                  text: "Minato",
                  correct: true
                },
                {
                  id: 2,
                  text: "Obama",
                  correct: false
                }
              ]
            },

          ]
        },
        //  { id: 2, fullName: "Krutaya Mamasha", avatar: "https://super01.ru/pictures/product/big/42300_big.jpg", },
        // { id: 3, fullName: "Longertharteson Jsaidalosiaver", avatar: "https://vokrug-tv.ru/pic/person/0/d/6/8/0d681ba6ed916cc9d795ef6dfdeac19b.jpeg",}
      ],
    }
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