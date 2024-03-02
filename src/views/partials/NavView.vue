<template>
    <nav>
      <div id="nav">
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
  #nav {
    background-color: #444444;
  }
  ul{
    margin: 30px 0 0 0;
    padding: 0;
  }
  li {
    list-style-type: none;
    margin: 0px;
    border-bottom: 1px solid;
    background-color: #444444;
  }
  li ul {
    margin:0;
  }
  .selected {
    background-color: white;
    color: black;
  }
  li a {
    color: rgb(255, 255, 255);
    display: block;
    text-decoration-line: none;
    margin: 5px;
    margin-left: 10px;
  }
  li:hover{
    background-color: #bcbbbb;
  }
  a:hover{
    color: #444444;
  }
 
  </style>