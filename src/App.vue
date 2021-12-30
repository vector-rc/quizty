<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/createQuiz">CreateTest</router-link> |
    <router-link to="/Quiz">quiz</router-link>|
    <router-link to="/signup">Signup</router-link>|
    <router-link to="/login">Login</router-link>
  </div> -->
  <app-header />
  <router-view />
</template>

<style>
#app {
  background: #ededed;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
}
* {
  font-family: Century Gothic, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import AppHeader from './components/AppHeader.vue'
export default {
  components:{
    AppHeader
  }
  
}
</script>

AppHeader