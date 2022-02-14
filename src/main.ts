import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import "./styles/app.css";
import './styles/test.css'
import './styles/test2.css'
import { getCookie } from './shared/cookies'

const app = createApp(App)
app
  .use(store)
  .use(router)
  .mount('#app')
app.config.globalProperties.$log = console.log

store.state.sessionId = getCookie('session_id')

// store.dispatch("getIp");
