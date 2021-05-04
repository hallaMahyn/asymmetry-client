<template>
  <div class="dashboard_container">
    <div class="dashboard_left-card card">
      <div class="dashboard_left-card_section">
        <tricky-circle :avatar="userAvatar" :withAvatar="true"/>
        <div class="dashboard_user-info">
          <span class="dashboard_user-info_full-name">{{user.first_name}} <br/> {{user.last_name}}</span>
          <span class="dashboard_user-info_profession">Business Semiotics</span>
        </div>
        <div class="card_middleline" />
      </div>
      <div class="dashboard_left-card_section">
        <div class="dashboard_left-card_section_title"> Level 1 </div>
        <tricky-circle
          :progress="0"
          title="Senior Analyst"
        />
        <div class="dashboard-card_section_info-wrapper">
          <info-square :value="88" title="Karma" />
          <info-square :value="12" title="Coints"/>
        </div>
      </div>
    </div>
    <div class="dashboard_center">
      <div class="dashboard_center_last-messages">
        <div class="dashboard_center_last-messages_title"> Last Messages </div>
        <div class="dashboard_center_last-messages_container">

        </div>

      </div>

      <div class="dashboard_center_last-tasks">
        <div class="dashboard_center_last-tasks_title"> Last Task </div>
        <div class="dashboard_center_last-tasks_container">

        </div>

      </div>

    </div>
    <div class="dashboard_right-card card">
      <div class="dashboard_left-card_section">
        <tricky-circle
          :progress="12"
          :percentage="true"
          title="Course Progress"
        />
        <div class="dashboard-card_section_info-wrapper margin_bottom">
          <info-square :value="2" title="Tasks" />
          <info-square :value="1" title="P2P"/>
        </div>
        <div class="card_middleline" />
      </div>
      <div class="dashboard_left-card_section">
        <div class="chapter-section">
          <div class="chapter-title">Chapters</div>
          <div class="chapter-wrapper">
            <div class="chapter-one" v-for="(ch, i) in chapters" :key="ch.id + i">
              {{i + 1}}
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="card_middleline" /> -->
    </div>
  </div>
</template>

<script>
// import InfoSquare from '../components/InfoSquare.vue'
export default {
  // components: { InfoSquare },
  data() {
    return {
      user: null,
      userAvatar: null,
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
    this.userAvatar = this.user?.avatar?.url
  },
  methods: {

  },
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

.dashboard_left-card_section {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  text-align: center;
  min-height: 280px;

  &_title {
    font-size: 20px;
    margin-bottom: 12px;
  }
}
.margin_bottom {
  margin-bottom: 24px;
}

.card_middleline {
  /* top: 50%; */
  /* left: 0px; */
  /* position: absolute; */
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
  flex: 1;
}

.dashboard_center {
  flex: 3;
  padding: 0px 50px;
  &_last-messages_title {
    font-size: 20px;
  }
}

.dashboard_right-card {
  /* border: 1px solid maroon; */
  flex: 1;
}

.dashboard_user-info {
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  line-height: 24px;
  margin-bottom: 24px;
  user-select: none;
  &_full-name {
    margin-bottom: 12px;
    font-size: 20px;
  }
  &_profession {
    opacity: 0.5;
    font-size: 16px;
  }

}

.chapter-section {
  display: flex;
  line-height: 19px;
  flex-flow: column nowrap;
  flex: 1;
  align-items: center;
  justify-content: center;
  max-width: 125px;
}

.chapter-title {
  margin-bottom: 24px;
}

.chapter-wrapper {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding-left: 12px;
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
</style>