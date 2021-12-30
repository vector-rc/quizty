import { createStore } from "vuex";
import uuid from "../shared/uuid.js";

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
        type_answers: "free",
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
      state.nameQuiz = payload.nameQuiz;
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
    async login({ }, { user, password }) {
      console.log(user, password);
      const req = await fetch(process.env.VUE_APP_API_URL, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ user, password })
      })

      const { success, data, msg } = await req.json()
      localStorage.session_id = data.session_id
      localStorage.user = user.value
      document.cookie = `session_id=${data.session_id}`

      return msg

    },
    async saveQuiz({ commit, state }) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}/add/quiz`, {
        method: "POST",
        body: JSON.stringify({
          id: uuid(),
          name: state.name_quiz,
          duration: state.duration_quiz,
          questions: state.questions,
          answers: state.answers,
        }),
      })

      const data = await req.json()
      return data.id
    },
    async fetchQuiz({ commit }, { quizId }) {
      let request = await fetch(`${process.env.VUE_APP_API_URL}/quiz/${quizId}`);
      let data = await request.json();
      commit("setQuiz", { quiz: data });
    },
    async fetchQuizes({ commit }) {
      let request = await fetch(`${process.env.VUE_APP_API_URL}/quizes`);
      let data = await request.json();
      commit("setQuiz", { quiz: data });
      return data;
    },
  },
  modules: {},
});
