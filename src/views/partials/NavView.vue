<template>
    <nav class="navbar container">
      <div id="navbar" class="navbar-menu">
       <ul>
          <li><router-link to="/" class="navbar-item">Home</router-link></li>
          <li><router-link to="/students" class="navbar-item">Personen</router-link></li>
        <li><router-link to="/about" class="navbar-item">About</router-link></li>
       </ul>
      </div>
    </nav>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue'
    export default defineComponent({
      name: 'NavView',
    });
  </script>
  <style lang="scss" scoped>
  ul{
    margin: 30px 0 0 0;
    padding: 0;
  }
  li {
    list-style-type: none;
    margin: 0;
    border-bottom: 1px solid;
    background-color: #444444;
  }
  .selected {
    background-color: white;
    color: black;
  }
  li a {
    color: white;
    display: block;
  }
  </style>