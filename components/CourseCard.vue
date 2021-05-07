<template>
  <div class="card">
    <div class="card_section">
      <tricky-circle
        :progress="12"
        :percentage="true"
        title="Course Progress"
      />
      <div class="card_section_info-wrapper margin_bottom">
        <info-square :value="2" title="Tasks" />
        <info-square :value="1" title="P2P"/>
      </div>
      <div class="middleline" />
    </div>
    <div class="card_section">
      <div class="chapter-section">
        <div class="chapter-title">Chapters</div>
        <div class="chapter-wrapper">
          <div class="chapter-one" v-for="(ch, i) in chapters" :key="ch.id + i">
            {{i + 1}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  width: 269px;
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


.card_section_info-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.margin_bottom {
  margin-bottom: 24px;
}

.middleline {
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