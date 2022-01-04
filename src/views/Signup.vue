<template>
    <form class="form">
        <input type="text" placeholder="Nombre" v-model="user.name" />
        <br />
        <input type="email" placeholder="Email" v-model="user.email" />
        <br />
        <input type="password" placeholder="contraseña" v-model="user.password" />
        <br />
        <span>{{ user.name }}</span>
        <b></b>
        <input type="password" placeholder="repetir contraseña" id="verify-pass" />
        <br />
        <button @click.prevent="signup">Registrarse</button>
    </form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
    setup() {
        const user = reactive({ name: '', email: '', password: '' })

        const store = useStore()

        const signup = () => {
            store.dispatch('signup', user)
        }

        return {
            signup, user
        }
    },
});
</script>
