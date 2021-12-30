<template>
  <div class="question">
    <label class="question-title"
      >{{ question.question }}
      {{ question.required ? " (Obligatorio)" : "(opcional)" }}</label
    >
    <input
      class="answer"
      style="border: none; border-bottom: 1px solid #2c3e5066"
      type="text"
      v-model="checkedAnswers"
      v-if="question.type_answers == 'free'"
    />
    <div v-if="question.type_answers != 'free'" class="answers">
      <answer
        v-for="answer in answers"
        :key="answer.id"
        :answer="answer"
        :type_answers="question.type_answers"
        @checkAnswer="checkAnswer($event)"
        v-model="checkedAnswers"
      />
    </div>
    <!-- <button @click="seeChecked">ver respuesta</button> -->
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Answer from "./Answer.vue";
export default {
  components: { Answer },

  props: {
    question: Object,
  },
  setup(props) {
    const store = useStore();
    const checkedAnswers = ref([]);

    const checkAnswer = (e) => {
      let index = checkedAnswers.value.findIndex((i) => i === e);
      if (index != -1) {
        checkedAnswers.value.splice(index, 1);
        return;
      }
      checkedAnswers.value.push(e);
    };
    const seeChecked = () => {
      console.log(checkedAnswers.value);
    };

    const answers = computed(() =>
      store.state.quiz.answers.filter((e) => e.questionId == props.question.id)
    );

    return {
      answers,
      checkedAnswers,
      checkAnswer,
      seeChecked,
    };
  },
};
</script>

<style>
.question {
  background: #fff;
  border-radius: 5px;
  width: 40rem;
  margin: 1rem 0;
  text-align: start;
  padding: 0.5rem;
  transition: all;
  transition-duration: 0.3s;
}

.question:hover {
  box-shadow: 0 0 10px #aaa;
}

.question-title {
  display: block;
  font-weight: bold;
  width: 100%;
}
</style>
