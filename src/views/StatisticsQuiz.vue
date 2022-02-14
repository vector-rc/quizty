<template>
    <h2>Estadisticas</h2>
    <ul v-if="success">
        <li v-for="question in quiz.questions" :key="question.id">
            {{ question.question }}
            <div v-if="question.typeAnswer != 'free'">
                <span
                    style="display:block;color:#00dc82"
                    v-for="answer in filterAnswers(question.id)"
                    :key="answer.id"
                >{{ answer.answer }} ==> {{ statistics[answer.id] }}</span>
            </div>
            <div v-else>
                <span
                    style="display:block;color:#00dc82"
                    v-for="(answer, index) in getResponsesByQuestionId(question.id)"
                    :key="index"
                >{{ answer.response }}</span>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Question from '../shared/Question'
import Quiz from '../shared/Quiz'

export default defineComponent({
  setup () {
    const store = useStore()
    const route = useRoute()
    const statistics = ref<any>([])
    const success = ref(false)
    const quiz: any = ref<Quiz | {}>({})
    const responses = ref([])
    const filterAnswers = (questionId: string) => {
      return quiz.value.answers.filter(
        (el: any) => el.questionId === questionId
      )
    }
    const getResponsesByQuestionId = (questionId: string) => {
      return responses.value.filter(
        (el: any) => el.questionId === questionId
      ) as any
    }
    onMounted(async () => {
      const data = await store.dispatch('fetchStatistics', {
        quiz_id: route.params.quiz_id
      })
      statistics.value = data.data.responses
      success.value = data.success
      let results: any = data.data.responses
      quiz.value = data.data.quiz
      results = results.map((res: any) => res.answers).flat()
      responses.value = results

      const n: any = {}
      quiz.value.questions.forEach((question: Question) => {
        if (question.typeAnswer === 'single') {
          filterAnswers(question.id).forEach((answer: any) => {
            const cant = getResponsesByQuestionId(question.id).filter(
              (response: any) => response.response === answer.id
            ).length
            console.log(answer.answer, '=>', cant)
            n[answer.id] = cant
          })
        }
        if (question.typeAnswer === 'multiple') {
          filterAnswers(question.id).forEach((answer: any) => {
            const cant = getResponsesByQuestionId(question.id)
              .map((el: any) => el.response)
              .flat()
              .filter((response: any) => response === answer.id).length
            console.log(answer.answer, '=>', cant)
            n[answer.id] = cant
          })
        }
      })

      statistics.value = n
    })

    return {
      statistics,
      success,
      quiz,
      filterAnswers,
      responses,
      getResponsesByQuestionId
    }
  }
})
</script>
