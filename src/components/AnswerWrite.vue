<template>
  <div class="answer-write" style="margin: 1rem">
    <input
      v-if="typeAnswer === 'multiple'"
      type="checkbox"
      :checked="answer.isCorrect"
      @input="answer.isCorrect = $event.target.checked"
      @change="saveAnswer"
    />
    <input
      v-if="typeAnswer === 'single'"
      type="radio"
      :name="answer.questionId"
      :checked="answer.isCorrect"
      @change="saveAnswer"
      :required="typeAnswer === 'single'"
    />
    <input type="text" required style="width: 20rem" v-model="answer.answer" @keyup="saveAnswer" />
    <input type="button" value="🗑️" @click="removeAnswer" :disabled="answers.length <= 2" />
  </div>
</template>

<script>
import { inject, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    answer: Object
  },
  setup ({ answer }) {
    const typeAnswer = inject('typeAnswer')
    const store = useStore()
    const answers = computed(() =>
      store.state.answers.filter(
        (e) => e.questionId === answer.questionId
      )
    )
    const saveAnswer = () => {
      if (typeAnswer.value === 'single') {
        answers.value.forEach((e) => {
          e.isCorrect = false
        })
        answer.isCorrect = true
      }
      store.commit('editAnswer', {
        answer
      })
    }

    const removeAnswer = () => {
      if (answers.value.length > 2) {
        store.commit('removeAnswer', {
          answerId: answer.id
        })
      }
    }

    return {
      saveAnswer,
      removeAnswer,
      answers,
      typeAnswer
    }
  }
}
</script>

<style>
</style>
