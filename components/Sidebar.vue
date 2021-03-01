<template>
  <div class="sidebar">
    <NavButton type="dashboard" />
    <NavButton type="messenger" />
    <NavButton type="map" />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  width: 106px;
  height: 100vh;
}

</style>
