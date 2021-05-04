<template>
  <div class="container">
    some onbording

  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state)
  }
}
</script>

<style>
.container {
  display: flex;
  flex-flow: row nowrap;

}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}


</style>
