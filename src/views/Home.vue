<template>
<div>
  <h1>Bienvenido a OpenQuiz </h1>
  <span>Crea cuestionarios y encuestas de forma facil y rapida totalmente gratis</span>
  <br>
  <router-link to="createQuiz">Empezar a crear</router-link>
</div>
  <!-- <suspense>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <list-quizes />
    </div>
  </suspense> -->
</template>

<script>

// @ is an alias to /src
import ListQuizes from "../components/ListQuizes.vue";

export default {
  name: "Home",
  components: {
    ListQuizes
  },

  setup() {
    return {};
  },
};
</script>
