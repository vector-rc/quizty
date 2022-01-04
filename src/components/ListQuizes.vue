<template>
  <ul>
    <li v-for="quiz in quizes" :key="quiz.index">
      <router-link :to="'/Quiz/' + quiz.id">{{ !quiz.name ? 'Sin Nombre' : quiz.name }}</router-link>|
      <router-link :to="'/Quiz/' + quiz.id">estadisticas</router-link>|
      <router-link :to="'/Quiz/' + quiz.id">eliminar</router-link>|
      <router-link :to="'/Quiz/' + quiz.id">editar</router-link>|
      <router-link :to="'/Quiz/' + quiz.id">desactivar</router-link>

    </li>
  </ul>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "ListQuizes",
  props: {
    user_id: String,
  },
  async setup() {
    const store = useStore();
    const quizes = await store.dispatch("fetchQuizesByUserId");
    return {
      quizes,
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
