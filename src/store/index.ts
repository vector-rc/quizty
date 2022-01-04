import { createStore } from "vuex";
import uuid from "../shared/uuid";

const firstUUID = uuid();

export default createStore({
  state: {
    quiz: {},
    name_quiz: "",
    duration_quiz: -1,
    questions: [
      {
        id: firstUUID,
        question: "¿Cual es tu nombre?",
        type_answer: "free",
        required: true,
      },
    ],
    answers: [
      {
        id: uuid(),
        questionId: firstUUID,
        answer: "Fernando",
        isCorrect: false,
      },
      {
        id: uuid(),
        questionId: firstUUID,
        answer: "Fernando",
        isCorrect: false,
      },
    ],
  },
  mutations: {
    setNameQuiz(state, payload) {
      state.name_quiz = payload.nameQuiz;
    },
    addQuestion(state, payload) {
      state.questions.push(payload.question);
      state.answers.push(...payload.answers);
    },

    editQuestion(state, payload) {
      let index = state.questions.findIndex(
        (i) => i.id === payload.question.id
      );
      state.questions[index] = payload.question;
    },

    removeQuestion(state, payload) {
      let index = state.questions.findIndex((i) => i.id === payload.questionId);
      state.answers = state.answers.filter(
        (e) => payload.questionId != e.questionId
      );
      state.questions.splice(index, 1);
    },
    removeQuestionAnswers(state, payload) {
      state.answers = state.answers.filter(
        (e) => payload.questionId != e.questionId
      );
    },

    addAnswers(state, payload) {
      state.answers.push(...payload.answers);
      //console.log(payload.answers);
    },

    editAnswer(state, payload) {
      let indexAnswer = state.answers.findIndex(
        (i) => i.id === payload.answer.id
      );
      state.answers[indexAnswer].answer = payload.answer.answer;
      state.answers[indexAnswer].isCorrect = payload.answer.isCorrect;
    },
    removeAnswer(state, payload) {
      let indexAnswer = state.answers.findIndex(
        (i) => i.id === payload.answerId
      );

      state.answers.splice(indexAnswer, 1);
    },
    setQuiz(state, payload) {
      state.quiz = payload.quiz;
      console.log(state.quiz);
    },
  },
  actions: {
   async getIp()  {
     const req=await fetch('https://api.myip.com')
     const res=await req.json();
     console.log(res);
     
   },
    async login({ }, { email, password }) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}login`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      const res = await req.json()

      localStorage.session_id = res.data.id
      localStorage.user_id = res.data.user_id
      document.cookie = `session_id=${res.data.id}`

      return res.message

    },
    async signup({ }, payload) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}signup`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(payload)
      })

      const res= await req.json()

      localStorage.session_id = res.data.id
      localStorage.user = res.data.user_id
      document.cookie = `session_id=${res.data.id}`

      return res.message

    },
    async saveQuiz({ commit, state }) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}quiz/7`, {
        method: "POST",
        credentials:'include',
        body: JSON.stringify({
          id: uuid(),
          name: state.name_quiz,
          duration: state.duration_quiz,
          questions: state.questions,
          answers: state.answers,
        }),
      })

      const data = await req.json()
      return data.data.id
    },
    async fetchQuiz({ commit }, { quizId }) {
      let request = await fetch(`${process.env.VUE_APP_API_URL}quiz/${quizId}`,{credentials:'include'});
      let data = await request.json();
      commit("setQuiz", { quiz: data.data });
    },
    async fetchQuizes({ commit }) {
      let request = await fetch(`${process.env.VUE_APP_API_URL}quizes`);
      let data = await request.json();
      commit("setQuiz", { quiz: data });
      return data;
    },
    async fetchQuizesByUserId() {
      let request = await fetch(`${process.env.VUE_APP_API_URL}${localStorage.user_id}/quizes`);
      let data = await request.json();
      return data.data;
    },

    async sendSolvedQuiz({},{quiz_id,duration,responses}) {
      let request = await fetch(`${process.env.VUE_APP_API_URL}solved_quiz`,{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({
          quiz_id,
          duration,
          responses,
        })
      });
      let data = await request.json();
      
      return data.message;
    },
  },
  modules: {},
});
