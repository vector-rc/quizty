<template>
  <div class="answer-write" style="margin: 1rem">
    <input
      v-if="type_answer == 'multiple'"
      type="checkbox"
      :checked="answer.isCorrect"
      @input="isCorrect = $event.target.checked"
      @change="saveAnswer"
    />
    <input
      v-if="type_answer == 'single'"
      type="radio"
      :name="answer.questionId"
      :checked="isCorrect"
      @change="saveAnswer"
      :required="type_answer == 'single'"
    />
    <input
      type="text"
      style="width: 20rem"
      v-model="answer_text"
      @keyup="saveAnswer"
    />
    <input
      type="button"
      value="🗑️"
      @click="removeAnswer"
      :disabled="answers.length <= 2"
    />
  </div>
</template>

<script>
import { ref, inject, computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    answer: Object,
    multiple: Boolean,
  },
  setup(props) {
    const type_answer = inject("type_answer");
    const answer_text = ref(props.answer.answer);
    const isCorrect = ref(props.answer.isCorrect);
    const store = useStore();
    const answers = computed(() =>
      store.state.answers.filter(
        (e) => e.questionId === props.answer.questionId
      )
    );
    const saveAnswer = () => {
      if (type_answer.value == "single") {
        answers.value.forEach((e) => {
          e.isCorrect = false;
        });
        isCorrect.value = true;
      }
      store.commit("editAnswer", {
        answer: {
          id: props.answer.id,
          questionId: props.answer.questionId,
          answer: answer_text.value,
          isCorrect: isCorrect.value,
        },
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
      answer_text,
      isCorrect,
      removeAnswer,
      answers,
      type_answer,
    };
  },
};
</script>

<style>


</style>
