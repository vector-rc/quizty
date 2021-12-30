<template>
    <form action="">
        <input type="text" v-model="user">
        <input type="password" v-model="password">
        <button @click.prevent="login">ver</button>
    </form>
</template>
<script lang="ts">
import { defineComponent ,ref} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
    setup() {
        const user=ref('')
        const password=ref('')

        const store=useStore();
        const login=async ()=>{            
            const data = await store.dispatch('login',{user:user.value,password:password.value})
            console.log(data.message);
        }

        return {user,password,login}
    },
})
</script>
