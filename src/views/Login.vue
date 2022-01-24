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
import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useMessage } from "naive-ui";
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const message = useMessage();

    onMounted(() => {
      if (store.state.session_id != null) {
        router.push("/");
      }
    });

    const user = reactive({ email: "" as string, password: "" });
    const login = async () => {
      if (!user.email || !user.password) {
        message.error("Rellene todos los campos");
        return;
      }

      const data = await store.dispatch("login", user);

      data.success
        ? message.success(data.message)
        : message.error(data.message);

      router.push("/");
    };

    return { user, login };
  },
});
</script>

