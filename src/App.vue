<template>
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
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
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