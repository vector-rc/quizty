<template>
  <div class="quiz">
    {{ $route.params.id }} | {{ quiz.name }} |
    {{ new Date(quiz.date_time).toLocaleString() }}
    <suspense>
      <question
        v-for="(question, index) in quiz.questions"
        :key="question.id"
        :question="question"
        :ref=" el => { if (el) questions[index] = el }"
      />
    </suspense>
    <h3 v-if="!state_quiz">
      Ocurrio un error es posible que el quiz no exista o haya dejado de ser publico
    </h3>

    <input v-if="isMyQuiz()" @click="sendResponses" type="button" value="Enviar respuestas" />
  </div>
</template>

<script>
import Question from "../components/Question.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: { Question },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const questions = ref([]);

    const state_quiz = ref(false);

    onMounted(async () => {
      let res = await store.dispatch("fetchQuiz", {
        quizId: route.params.id,
      });
      questions.value = [];
      state_quiz.value = res.success;
    });
    const quiz = computed(() => store.state.quiz);

    const isMyQuiz = () => {
      console.log(quiz.value);
      return localStorage.user_id != quiz.value.user_id;
    };

    const sendResponses = async () => {
      let responses = questions.value.map((el) => {
        return el.getResponse();
      });
      console.log(responses);
      const res = await store.dispatch("sendSolvedQuiz", {
        quiz_id: route.params.id,
        duration: 50,
        responses,
      });
      console.log(res);
      router.push("/");
    };
    return {
      quiz,
      sendResponses,
      questions,
      isMyQuiz,
      state_quiz,
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
