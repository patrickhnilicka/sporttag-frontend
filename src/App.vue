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
  <!--div id="app"-->
    <header>a</header>
    <NavView />
    <router-view id="content"/>
    <footer></footer>
  <!--/div-->
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  header, nav, section, article, aside, footer, hgroup {
    display: block;
  }
  nav {
    width: 210px;
  }
  header, footer, nav {
    margin: 0;
    padding: 0;
    border: none;
  }
  header {
    position: absolute;
    left: 10px;
    top: 10px;
    right: 10 px;
    height: 100px;
  }
  #content {
    position: absolute;
    left: 210px;
    top: 10px;
    right: 110 px;
    bottom: 30px;
  }
</style>

