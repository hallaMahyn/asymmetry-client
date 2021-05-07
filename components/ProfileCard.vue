<template>
  <div class="card">
    <div class="card_section">
      <tricky-circle :avatar="userAvatar" :withAvatar="true"/>
      <div class="user-info">
        <span class="user-info_full-name">{{firstName}} <br/> {{lastName}}</span>
        <span class="user-info_profession">Business Semiotics</span>
      </div>
      <div class="middleline" />
    </div>
    <div class="card_section">
      <div class="card_section_title"> Level 1 </div>
      <tricky-circle
        :progress="0"
        title="Senior Analyst"
      />
      <div class="card_section_info-wrapper">
        <info-square :value="88" title="Karma" />
        <info-square :value="12" title="Coints"/>
      </div>
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

    }
  },

  mounted() {

  },

  computed: {
    firstName() {
      return this.user?.first_name
    },

    lastName() {
      return this.user?.last_name
    },

    userAvatar() {
      return this.user?.avatar
    }

  }

}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  border-radius: 12px;
  background: #FDFDFD;
  align-items: center;
  min-height: 666px;
  width: 269px;
  height: 70%;
  padding: 34px 22px 46px 22px;
  box-shadow: -1px 1px 2px rgba(215, 215, 215, 0.2),
   1px -1px 2px rgba(215, 215, 215, 0.2),
    -1px -1px 2px rgba(255, 255, 255, 0.9),
     1px 1px 3px rgba(215, 215, 215, 0.9),
      inset 1px 1px 2px rgba(255, 255, 255, 0.3),
       inset -1px -1px 2px rgba(215, 215, 215, 0.5);
}

.middleline {
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

.card_section_info-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.card_section {
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

.user-info {
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

</style>