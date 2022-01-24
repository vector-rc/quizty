<template>
  <n-message-provider placement="bottom">
    <app-header />
    <router-view />
    <app-footer/>
  </n-message-provider>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import { NMessageProvider } from 'naive-ui'
import AppFooter from './components/AppFooter.vue'
export default {
  components: {
    AppHeader,
    NMessageProvider,
    AppFooter
  }

}
</script>

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
  padding: 1rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
