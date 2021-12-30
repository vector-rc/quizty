<template>
  <div>
    <ul>
      <li v-for="quiz in quizes" :key="quiz.index">
        <a :href="'http://localhost:8080/#/quiz/' + quiz.id">
          {{ quiz.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "ListQuizes",
  async setup() {
    const store = useStore();
    const quizes = await store.dispatch("fetchQuizes");
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
