import { createStore } from 'vuex'
import uuid from '../shared/uuid'

export default createStore({
  state: {
    sessionId: '' as string | undefined,
    quiz: {} as any,
    quizOptions: {} as any,
    questions: [
      {
        id: uuid(),
        question: '¿Cual es tu nombre?',
        typeAnswer: 'free',
        required: true
      }
    ],
    answers: [] as Array<any>
  },
  mutations: {
    addQuestion (state) {
      state.questions.push({
        id: uuid(),
        question: '',
        typeAnswer: 'free',
        required: true
      })
    },

    editQuestion (state, payload) {
      const index = state.questions.findIndex((i) => i.id === payload.question.id)
      state.questions[index] = payload.question
    },

    removeQuestion (state, payload) {
      const index = state.questions.findIndex((i) => i.id === payload.questionId)
      state.answers = state.answers.filter((e) => payload.questionId !== e.questionId)
      state.questions.splice(index, 1)
    },
    removeQuestionAnswers (state, payload) {
      state.answers = state.answers.filter((e) => payload.questionId !== e.questionId)
    },

    addAnswers (state, payload) {
      state.answers.push(...payload.answers)
    },

    editAnswer ({ answers }, { answer }) {
      const indexAnswer = answers.findIndex(({ id }) => id === answer.id)
      answers[indexAnswer] = answer
    },
    removeAnswer (state, payload) {
      const indexAnswer = state.answers.findIndex((i) => i.id === payload.answerId)

      state.answers.splice(indexAnswer, 1)
    },
    setQuiz (state, payload) {
      state.quiz = payload.quiz
      console.log(state.quiz)
    }
  },
  actions: {
    async getIp () {
      const req = await fetch('https://api.myip.com')
      const res = await req.json()
      console.log(res)
    },
    async login ({ state }, { email, password }) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}login`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      const res = await req.json()
      state.sessionId = res.data.id
      localStorage.user_id = res.data.user_id
      document.cookie = `sessionId=${res.data.id}`

      return res
    },
    async signup ({ state }, payload) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}signup`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(payload)
      })

      const res = await req.json()
      state.sessionId = res.data.id
      localStorage.user_id = res.data.user_id

      document.cookie = `sessionId=${res.data.id}`

      return res.message
    },
    async saveQuiz ({ commit, state }) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}quiz/7`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          ...state.quiz,
          duration: state.quiz.duration * 60,
          questions: state.questions,
          answers: state.answers
        })
      })

      const data = await req.json()
      return data
    },
    async fetchQuiz ({ commit }, { quizId }) {
      const request = await fetch(`${process.env.VUE_APP_API_URL}quiz/${quizId}`, { credentials: 'include' })
      const data = await request.json()
      commit('setQuiz', { quiz: data.data })
      return data
    },
    async fetchQuizes () {
      const request = await fetch(`${process.env.VUE_APP_API_URL}quizes`)
      const data = await request.json()
      return data
    },
    async fetchQuizesByUserId () {
      const request = await fetch(`${process.env.VUE_APP_API_URL}my_quizes`, {
        credentials: 'include'
      })
      const data = await request.json()
      return data.data
    },

    async sendSolvedQuiz (_, { quizId, duration, responses }) {
      const request = await fetch(`${process.env.VUE_APP_API_URL}solved_quiz`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          quizId,
          duration,
          responses
        })
      })
      const data = await request.json()

      return data.message
    },
    async fetchStatistics (_, { quizId }) {
      const request = await fetch(`${process.env.VUE_APP_API_URL}statistics/${quizId}`, {
        credentials: 'include'
      })
      const data = await request.json()

      return data
    }
  },
  modules: {}
})
