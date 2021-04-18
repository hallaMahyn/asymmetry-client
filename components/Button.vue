<template>
  <div
    :class="{'button': true, 'inactive': !isBtnActive}"
    @click="$emit('btnClick')"
  >
    <div class="button-title">
      <!-- {{ isloading === true ? 'Loading' : title }} -->
      {{ title }}
    </div>
  </div>
</template>


<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: false
    },
    isBtnActive: {
      type: Boolean,
      required: true
    },
    handleClick: {
        type: Function,
        required: false
    }
  },

  methods: {

  },



  mounted: function () {

  }
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  flex-flow:  column nowrap;
  align-items: center;
  width: 100%;
  height: 66px;
  background: #FFECED;
  color: #FC0D1B;
  box-shadow: -2px 2px 4px rgba(217, 201, 201, 0.2), 2px -2px 4px rgba(217, 201, 201, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(217, 201, 201, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(217, 201, 201, 0.5);
  border-radius: 12px;
  font-family: 'ONY-FORM Digital';
  padding: 12px 38px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &-title {
    font-size: 16px;
  }
}

.inactive {
  user-select: none;
  pointer-events: none;
  cursor: default;
  opacity: 0.7;
}

</style>