<template>
  <div class="dashboard_container">
    <div class="dashboard_left-card">
      <profile-card :user="user" />
    </div>
    <div class="dashboard_center">
      <div class="dashboard_characters">
        <div class="title"> Characters </div>
        <div class="characters">
          <character-card v-for="c in characters" :key="c.id" :character="c" location="dashboard/characters" />
        </div>

      </div>
      <NuxtChild :user="user" />
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      user: null,
      characters: [],
      chapters: [
        {id: 1, title: "first"},
        {id: 2, title: "two"},
        {id: 3, title: "3" },
        {id: 4, title: "4"},
        {id: 5, title: "first"},
        {id: 6, title: "two"},
        {id: 7, title: "3" },
        {id: 8, title: "4"},
        {id: 9, title: "3" },
        {id: 10, title: "4"}
      ],
    }
  },
  created() {
    this.user = this.$store.state.user
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

.dashboard_container {
  display: flex;
  flex-flow: row nowrap;
  padding: 20px 20px 20px 0px;
  width: 100%;
  height: 100vh;
  color: #FC0D1B;
}

.card {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  border-radius: 12px;
  background: #FDFDFD;
  align-items: center;
  min-height: 666px;
  height: 70%;
  padding: 34px 22px 46px 22px;
  box-shadow: -1px 1px 2px rgba(215, 215, 215, 0.2),
   1px -1px 2px rgba(215, 215, 215, 0.2),
    -1px -1px 2px rgba(255, 255, 255, 0.9),
     1px 1px 3px rgba(215, 215, 215, 0.9),
      inset 1px 1px 2px rgba(255, 255, 255, 0.3),
       inset -1px -1px 2px rgba(215, 215, 215, 0.5);
}


.dashboard-card_section_info-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.margin_bottom {
  margin-bottom: 24px;
}

.card_middleline {
  width: 150px;
  height: 4px;
  background: #FDFDFD;
  box-shadow: -1px 1px 2px rgba(215, 215, 215, 0.2),
   1px -1px 2px rgba(215, 215, 215, 0.2),
    -1px -1px 2px rgba(255, 255, 255, 0.9),
     1px 1px 3px rgba(215, 215, 215, 0.9),
      inset 1px 1px 2px rgba(255, 255, 255, 0.3),
       inset -1px -1px 2px rgba(215, 215, 215, 0.5);
  border-radius: 12px;
}

.dashboard_left-card {
  width: 269px;
}

.dashboard_center {
  width: 100%;
  /* flex: 3; */
  /* padding: 0px 50px; */
}


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
