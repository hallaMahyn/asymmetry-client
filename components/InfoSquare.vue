<template>
  <div class="info_container">
    <div class="info_container_value">
      {{value}}
    </div>
    <div class="info_container_title">
      {{title}}
    </div>

  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }

}
</script>
<style lang="scss" scoped>
.info_container {
  text-align: center;
  width: 68px;
  height: 68px;
  background: #FDFDFD;
  padding-top: 10px;
  box-shadow: -2px 2px 4px rgba(215, 215, 215, 0.2),
   2px -2px 4px rgba(215, 215, 215, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9),
     2px 2px 5px rgba(215, 215, 215, 0.9),
      inset 1px 1px 2px rgba(255, 255, 255, 0.3),
       inset -1px -1px 2px rgba(215, 215, 215, 0.5);
  border-radius: 12px;
  user-select: none;

  &_value {
    font-size: 24px;
  }
  &_title {
    font-size: 16px;
    opacity: 0.5;
  }

}

</style>