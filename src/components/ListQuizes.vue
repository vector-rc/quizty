<template>
  <n-table :single-line="false" style="width: 50rem;align-self: center;">
    <tbody>
      <tr v-for="quiz in quizes" :key="quiz.index" style="border-bottom: 1px solid #000;">
        <td>{{ !quiz.name ? 'Sin Nombre' : quiz.name }}</td>
        <td>{{quiz.date_time}}</td>
        <td><n-button type="warning" round @click="$router.push('/statistics/' + quiz.id)">estadisticas</n-button>
        <n-button type="error" round >eliminar</n-button>
        <n-button color="purple" round>editar</n-button>
        <n-button color="#ff15ff" @click="$router.push('/Quiz/' + quiz.id)"  round>preview</n-button>
        <n-button color="#f77" round >desactivar</n-button></td>
      </tr>
    </tbody>
  </n-table>
</template>

<script>
import { useStore } from "vuex";
import {NTable,NButton} from 'naive-ui'
export default {
  name: "ListQuizes",
  components:{
    NTable,
    NButton
  },
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
