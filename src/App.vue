<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    hello world.
  </header> -->

  <RouterView />
</template>

<style scoped lang="scss">
header {
  position: fixed;
  inset: auto 16px 16px 16px;
  height: 64px;
  outline: 1px solid red
}
</style>
