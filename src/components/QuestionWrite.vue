<template>
  <div
    class="question-write"
    style="padding: 2rem; border-radius:5px;background:#fff;max-width:40rem;margin:1rem 0"
  >
    <label>
      Pregunta:
      <input
        type="text"
        required
        style="width: 20rem"
        v-model="question"
        @keyup="saveQuestion"
      />
    </label>
    <label>
      <input v-model="required" type="checkbox" @change="saveQuestion" />
      respuesta obligatoria
    </label>

    <label> tipo de respuesta </label>
    <select v-model="type_answer" @change="saveQuestion">
      <option value="multiple">Multiple</option>
      <option value="free">Libre</option>
      <option value="single">una respuesta</option>
    </select>

    <input
      type="button"
      value="Eliminar Pregunta"
      @click="removeQuestion"
      :disabled="questions.length <= 1"
    />
    <div v-if="type_answer != 'free'" class="answers">
      <answer-write
        v-for="answer in answers"
        :key="answer.id"
        :answer="answer"
      />

      <input type="button" value="Agregar Respuesta" @click="addAnswer" />
    </div>
    <small style="color: tomato; border: solid 1px tomato; border-radius: 2px" v-if="haveAnswerCorrect"
      >Marque alguna respuesta</small
    >
  </div>
</template>

<script>
import { computed, provide, ref } from "vue";
import { useStore } from "vuex";

import AnswerWrite from "./AnswerWrite.vue";
import uuid from "../shared/uuid";
export default {
  components: {
    AnswerWrite,
  },
  props: {
    question: Object,
  },
  emits: ["remove"],
  setup(props) {
    const store = useStore();
    const required = ref(props.question.required);
    const type_answer = ref(props.question.type_answer);
    provide("type_answer", type_answer);

    const question = ref(props.question.question);
    const questionId = ref(props.question.id);
    const questions = computed(() => store.state.questions);
    const answers = computed(() =>
      store.state.answers.filter((e) => e.questionId === questionId.value)
    );

    const haveAnswerCorrect = computed(() => {
      //console.log(answers.value);
      
      return (
        type_answer.value != "free" &&
        answers.value.filter((e) => e.isCorrect === true).length ==0
      );
    });
    const saveQuestion = () => {
      // console.log(type_answer.value);
      // console.log( answers.value.length);
      if (type_answer.value != "free" && answers.value.length == 0) {
        store.commit("addAnswers", {
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
      }

      store.commit("editQuestion", {
        question: {
          id: questionId.value,
          question: question.value,
          type_answer: type_answer.value,
          required: required.value,
        },
      });
    };

    const removeQuestion = () => {
      console.log(answers);

      if (questions.value.length > 1) {
        store.commit("removeQuestion", {
          questionId: questionId.value,
        });
      }
    };

    const addAnswer = () => {
      store.commit("addAnswers", {
        answers: [
          {
            id: uuid(),
            questionId: questionId.value,
            answer: "",
            isCorrect: false,
          },
        ],
      });
    };

    return {
      answers,
      addAnswer,
      question,
      saveQuestion,
      removeQuestion,
      required,
      questions,
      type_answer,
      haveAnswerCorrect,
    };
  },
};
</script>

<style>
</style>
