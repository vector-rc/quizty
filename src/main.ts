import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/app.css'

const app=createApp(App)
app.use(store).use(router).mount('#app')
app.config.globalProperties.$log=console.log

store.dispatch('getIp')