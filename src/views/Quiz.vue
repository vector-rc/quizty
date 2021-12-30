<template>
  <div class="quiz">
    {{ $route.params.id }} | {{ quiz.name }} |
    {{ new Date(quiz.date_time).toLocaleString() }}
    <question
      v-for="question in quiz.questions"
      :key="question.id"
      :question="question"
    />
    <input type="button" value="Enviar respuestas">
  </div>
</template>

<script>
import Question from "../components/Question.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  components: { Question },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(async () => {
      await store.dispatch("fetchQuiz", {
        quizId: route.params.id,
      });
    });
    const quiz = computed(() => store.state.quiz);

    return {
      quiz,
    };
  },
};
</script>

<style>
.quiz {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 70%;
}
</style>
