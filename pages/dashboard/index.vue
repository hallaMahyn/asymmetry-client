<template>
  <div class="dashboard_characters">
    <div class="title"> Characters </div>
    <div class="characters">
      <character-card v-for="c in characters" :key="c.id" :character="c" location="dashboard" />
    </div>

  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    required: true
  },
  data() {
    return {
      characters: []
    }
  },
  mounted() {
    this.getCharacters()
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
  }
}
</script>

<style lang="scss" scoped>
.dashboard_characters {
  padding: 0 50px;
}

.title {
  font-size: 20px;
  margin-bottom: 24px;
}

.characters {
  width: 300px;
  height: 100%;
  padding: 0px 30px 20px 0px;
}

</style>