<template>
    <form class="form">
        <n-input type="text" required placeholder="Nombre" v-model:value="user.name" />
        <br />
        <n-input placeholder="Email" v-model:value="user.email" />
        <br />
        <n-input type="password" placeholder="contraseña" v-model:value="user.password" />
        <br />
        <n-input
            type="password"
            placeholder="repetir contraseña"
            v-model:value="user.password_repeat"
        />
        <br />
        <n-button @click="signup">Registrarse</n-button>
    </form>
</template>
<script lang="ts">
import { useMessage, NInput, NButton } from 'naive-ui';
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
    components: {
        NInput,
        NButton
    },
    setup() {

        const message = useMessage()
        const user = reactive({ name: '', email: '', password: '', password_repeat: '' })

        const store = useStore()

        const signup = () => {
            if (user.password != user.password_repeat) {
                message.error('las contraseñas no coinciden')
                return
            }
            store.dispatch('signup', user)
        }

        return {
            signup, user
        }
    },
});
</script>
