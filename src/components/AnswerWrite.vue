<template>
  <div class="answer-write" style="margin: 1rem">
    <input
      v-if="type_answer === 'multiple'"
      type="checkbox"
      :checked="answer.isCorrect"
      @input="answer.isCorrect = $event.target.checked"
      @change="saveAnswer"
    />
    <input
      v-if="type_answer === 'single'"
      type="radio"
      :name="answer.questionId"
      :checked="answer.isCorrect"
      @change="saveAnswer"
      :required="type_answer === 'single'"
    />
    <input type="text" required style="width: 20rem" v-model="answer.answer" @keyup="saveAnswer" />
    <input type="button" value="🗑️" @click="removeAnswer" :disabled="answers.length <= 2" />
  </div>
</template>

<script>
import {inject, computed, reactive } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    answer: Object,
  },
  setup(props) {
    const type_answer = inject("type_answer");
    const answer = reactive(props.answer)
    const store = useStore();
    const answers = computed(() =>
      store.state.answers.filter(
        (e) => e.questionId === props.answer.questionId
      )
    );
    const saveAnswer = () => {
      if (type_answer.value === "single") {
        answers.value.forEach((e) => {
          e.isCorrect = false;
        });
        answer.isCorrect = true;
      }
      store.commit("editAnswer", {
        answer,
      });
    };

    const removeAnswer = () => {
      if (answers.value.length > 2) {
        store.commit("removeAnswer", {
          answerId: props.answer.id,
        });
      }
    };

    return {
      saveAnswer,
      answer,
      removeAnswer,
      answers,
      type_answer,
    };
  },
};
</script>

<style>
</style>
