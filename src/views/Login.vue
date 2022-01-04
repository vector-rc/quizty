<template>
    <form class="form">
        <input type="email" placeholder="email" v-model="user.email" />
        <br />
        <input type="password" placeholder="password" v-model="user.password" />
        <br />
        <button @click.prevent="login">Ingresar</button>
    </form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    setup() {
        const user = reactive({email:'',password:''})

        const store = useStore();
        const login = async () => {
            const data = await store.dispatch('login',user)
            console.log(data.message);
        }

        return { user, login }
    },
})
</script>

