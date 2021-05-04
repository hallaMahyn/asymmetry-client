<template>
  <div class="tricky-circle_container">
    <div class="tricky-circle_external">
      <div class="tricky-circle_nested">
        <div class="tricky-circle_progress">
          {{progress}}<span v-if="percentage">%</span>

        </div>
        <div class="tricky-circle_title">
          {{title}}
        </div>
        <img class="uploaded_avatar" v-if="withAvatar" :src="avatar || defaultPhoto"  />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      avatar: {
        type: String,
        required: false,
      },
      withAvatar: {
        type: Boolean,
        required: false
      },
      percentage: {
        type: Boolean,
        required: false
      },
      title: {
        type: String,
        required: false
      },
      progress: {
        type: Number,
        required: false
      }

    },
    data(){
      return {
        defaultPhoto: "https://img-tv.vl.ru/fhd/a55b9339c5ab0062776074644a5470d519012c.jpg",

      }
    }
}
</script>

<style lang="scss" scoped>
.tricky-circle_container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 16px;
  user-select: none;
}

.tricky-circle {
  &_external {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background:#ECDEDE;
    padding: 6px;
    border: 8px solid #FDFDFD;
    box-shadow: -2px 2px 4px rgba(215, 215, 215, 0.2),
      2px -2px 4px rgba(215, 215, 215, 0.2),
      -2px -2px 4px rgba(255, 255, 255, 0.9),
        2px 2px 5px rgba(215, 215, 215, 0.9),
        inset 2px 2px 2px rgba(255, 255, 255, 0.3),
          inset 1px 1px 2px rgba(255, 255, 255, 0.3),
          inset -1px -1px 2px rgba(215, 215, 215, 0.5);
  }


  &_nested {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    /* justify-content: center; */
    width: 100%;
    height: 100%;
    border-radius: 100%;
    font-size: 16px;
    text-align: center;
    background: #FDFDFD;
    padding: 22px;
    box-shadow: -2px 2px 4px rgba(215, 215, 215, 0.2),
     2px -2px 4px rgba(215, 215, 215, 0.2),
      -2px -2px 4px rgba(255, 255, 255, 0.9),
       2px 2px 5px rgba(215, 215, 215, 0.9),
        inset 1px 1px 2px rgba(255, 255, 255, 0.3),
         inset -1px -1px 2px rgba(215, 215, 215, 0.5);
  }

  &_progress {
    font-size: 24px;
    margin-bottom: 8px;
  }
  &_title {
    font-size: 16px;
    opacity: 0.5;
  }
}

.uploaded_avatar {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  top: 0;
  left: 0;
}

</style>
