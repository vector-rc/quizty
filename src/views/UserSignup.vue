<template>
  <form class="form">
    <input type="text" required placeholder="Nombre" v-model="user.name" />
    <br />
    <input placeholder="Email" v-model="user.email" />
    <br />
    <input type="password" placeholder="contraseña" v-model="user.password" />
    <br />
    <input type="password" placeholder="repetir contraseña" v-model="user.password_repeat" />
    <br />
    <button @click="signup">Registrarse</button>
  </form>
</template>
<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({

  setup () {
    const message = useMessage()
    const user = reactive({ name: '', email: '', password: '', password_repeat: '' })

    const store = useStore()

    const signup = () => {
      if (user.password !== user.password_repeat) {
        message.error('las contraseñas no coinciden')
        return
      }
      store.dispatch('signup', user)
    }

    return {
      signup,
      user
    }
  }
})
</script>
