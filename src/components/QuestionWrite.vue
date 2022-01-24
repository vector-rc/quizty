<template>
  <div
    class="question-write"
    style="
      padding: 2rem;
      border-radius: 5px;
      background: #fff;
      margin: 1rem 0;
    "
  >
   <div class="fieldForm">
     
    <label>
      Pregunta:
      <input
        type="text"
        required
        style="width: 20rem"
        v-model="question.question"
        @keyup="saveQuestion"
      />
      
    </label><input
      type="button"
      value="Eliminar Pregunta"
      @click="removeQuestion"
      :disabled="questions.length <= 1"
    />
   </div>
    <div class="fieldForm">
    <label>
      <input
        v-model="question.required"
        type="checkbox"
        @change="saveQuestion"
      />
      respuesta obligatoria
    </label>
    </div>
     <div class="fieldForm">
    <label>tipo de respuesta</label>
    <select v-model="question.type_answer" @change="saveQuestion">
      <option value="multiple">Multiple</option>
      <option value="free">Libre</option>
      <option value="single">Unica</option>
    </select>
     </div>
    
    <div v-if="question.type_answer != 'free'" class="answers">
      <answer-write
        v-for="answer in answers"
        :key="answer.id"
        :answer="answer"
      />

      <input type="button" value="Agregar Respuesta" @click="addAnswer" />
    </div>
    <small
      style="color: tomato; border: solid 1px tomato; border-radius: 2px"
      v-if="haveAnswerCorrect"
      >Marque alguna respuesta</small
    >
  </div>
</template>

<script lang="ts">
import { computed, provide, ref, reactive, inject } from "vue";
import { useStore } from "vuex";

import AnswerWrite from "./AnswerWrite.vue";
import uuid from "../shared/uuid";

interface Question {
  id: string;
  question: string;
  required: boolean;
  type_answer: string;
}

export default {
  components: {
    AnswerWrite,
  },
  props: {
    question: Object,
    // test:Function,
  },
  emits: ["remove"],
  setup(props:any) {
    const store = useStore();

    const question = reactive(props.question as Question);
    const type_answer = computed(() => question.type_answer);
    provide("type_answer", type_answer);

   

    const questions = computed(() => store.state.questions);
    const answers = computed(() =>
      store.state.answers.filter((e: any) => e.questionId === question.id)
    );

    const haveAnswerCorrect = computed(() => {
      return (
        question.type_answer != "free" &&
        answers.value.filter((e: any) => e.isCorrect === true).length == 0
      );
    });
    const saveQuestion = () => {
      // props.test()
      
      if (question.type_answer != "free" && answers.value.length == 0) {
        store.commit("addAnswers", {
          answers: [
            {
              id: uuid(),
              questionId: question.id,
              answer: "Verdadero",
              isCorrect: false,
            },
            {
              id: uuid(),
              questionId: question.id,
              answer: "Falso",
              isCorrect: false,
            },
          ],
        });
      }

      store.commit("editQuestion", { question });
    };

    const removeQuestion = () => {
      if (questions.value.length > 1) {
        store.commit("removeQuestion", {
          questionId: question.id,
        });
      }
    };

    const addAnswer = () => {
      store.commit("addAnswers", {
        answers: [
          {
            id: uuid(),
            questionId: question.id,
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
      questions,
      haveAnswerCorrect,
    };
  },
};
</script>

<style>
</style>
