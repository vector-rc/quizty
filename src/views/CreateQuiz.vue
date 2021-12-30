<template>
  <form class="quiz">
    <label
      >Nombre de la prueba
      <input
        style="width: 20rem; border: none"
        required
        placeholder="Nombre del Quiz"
        type="text"
        v-model="name_quiz"
    /></label>
    <select >
      <option value="quiz">Examen</option>
      <option value="survey">Encuesta</option>
    </select>

    <label for="duration">Duracion</label>
    <label for="ilimited">
      <input type="checkbox" v-model="unlimited_time" />
      Ilimitado
    </label>
    <label v-if="!unlimited_time">
      <input type="number" id="duration" v-model="duration_quiz" min="1" />
      minutos
    </label>
    <input type="submit" value="Guardar Test" @click.prevent="saveQuiz" />

    <question-write
      v-for="question in questions"
      :key="question.id"
      :question="question"
    />
    <input type="button" value="Agregar pregunta" @click="addQuestion" />
  </form>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import uuid from "../shared/uuid";

import QuestionWrite from "../components/QuestionWrite.vue";
export default {
  name: "CreateTest",
  components: { QuestionWrite },
  setup(props) {
    const store = useStore();
    const answers = computed(() => store.state.answers);
    const addQuestion = () => {
      const questionId = uuid();
      store.commit("addQuestion", {
        question: {
          id: questionId,
          question: "",
          type_answers: "single",
          required: true,
        },

        answers: [
          {
            id: uuid(),
            questionId: questionId,
            answer: "Verdadero",
            isCorrect: false,
          },
          {
            id: uuid(),
            questionId: questionId,
            answer: "Falso",
            isCorrect: false,
          },
        ],
      });
    };
    const questions = computed(() => store.state.questions);
    const name_quiz = ref("");
    const duration_quiz = ref(1);
    const unlimited_time = ref(false);

    const saveQuiz = async () => {
      store.state.name_quiz = name_quiz.value;
      store.state.duration_quiz = unlimited_time.value
        ? -1
        : duration_quiz.value * 60;
      store.state.questions.forEach((e) => {
        if (e.type_answers == "free") {
          store.commit("removeQuestionAnswers", { questionId: e.id });
        }
      });
      console.log(store.state.answers);

      const quizId = await store.dispatch("saveQuiz");
      await alert(
        `Quiz creado, ingres a ${window.location.origin + "/#/Quiz/" + quizId}`
      );
    };

    return {
      addQuestion,
      name_quiz,
      questions,
      saveQuiz,
      answers,
      duration_quiz,
      unlimited_time,
    };
  },
};
</script>

<style>
input[type="text"] {
  outline: none;
  border:none;
  box-shadow: none;
  border-bottom: 1px #2c3e5044 solid;
}
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
