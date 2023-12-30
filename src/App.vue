<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavView from './views/partials/NavView.vue';
import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'app',
    components: {
    NavView
},
  });
</script>

<template>
  <div id="app">
    <NavView />
    <router-view />
  </div>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>

