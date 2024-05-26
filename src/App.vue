<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavView from './views/partials/NavView.vue';
import { useSporttagStore } from './stores/sporttag';
import { logout } from './services/logoutservice';

const sporttag = useSporttagStore()
const env = import.meta.env.VITE_ENVIRONMENT

</script>

<template>
  <!--div id="app"-->
    <header><div id="header">{{sporttag.sporttag?.bezeichnung}}</div></header><button id="logoutbutton" @click="logout()" class="btn btn-danger">Logout</button>
    <NavView />
    <div id="content"><router-view/></div>
    <footer><div id="footer">{{env}}</div></footer>
  <!--/div-->
</template>

<style lang="scss">
  header, footer, nav {
    margin: 0;
    padding: 0;
    border: none;
  }
  #header {
    position: absolute;
    left: 10px;
    top: 10px;
    right: 10px;
    height: 100px;
    font-size: 4em;
  }
  #logoutbutton {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  #content {
    position: absolute;
    left: 210px;
    top: 110px;
    right: 10px;
    bottom: 30px;
  }
  #nav {
    position: absolute;
    left: 10px;
    top: 100px;
    width: 190px;
    bottom: 30px;
  }
  footer{
    position: absolute;
    bottom: 20px;

  }
</style>

