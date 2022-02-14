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
     v-model="response"
      v-if="question.typeAnswer === 'free'"
    />
    <div v-if="question.typeAnswer !== 'free'" class="answers">
      <answer-view
        v-for="answer in answers"
        :key="answer.id"
        :answer="answer"
        :typeAnswer="question.typeAnswer"
        @checkAnswer="setResponse($event)"
        v-model="response"
      />
    </div>
    <!-- <button @click="seeChecked">ver respuesta</button> -->
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AnswerView from './AnswerView.vue'
export default {
  components: { AnswerView },

  props: {
    question: Object
  },
  setup (props) {
    const store = useStore()
    const response = ref([])

    const setResponse = (e) => {
      const index = response.value.findIndex((i) => i === e)

      if (index !== -1) {
        response.value.splice(index, 1)
        return
      }
      response.value.push(e)
      console.log(response.value)
    }
    const seeChecked = () => {
      console.log(response.value)
    }
    const getResponse = () => {
      return { question_id: props.question.id, response: response.value }
    }

    const answers = computed(() =>
      store.state.quiz.answers.filter((e) => e.questionId === props.question.id)
    )

    return {
      answers,
      response,
      setResponse,
      seeChecked,
      getResponse
    }
  }
}
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
