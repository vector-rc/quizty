<template>
<div>
  <label for="settings">Settings  </label><input class="hidden" type="radio" v-model="test" id="settings" name="test" value="settings">
  <label for="questions">Questions</label><input class="hidden"  type="radio" v-model="test" id="questions" name="test"  value="questions">
</div>
  <form class="quiz" id="formQuiz">
     <div class="fieldForm">
      <label for="quizName"> Nombre de la prueba</label>
      <input class="p-inputtext" required placeholder="Nombre del Quiz" id="quizName" v-model="quiz.name" />
      <div >
      <input type="submit" value="Publicar Ahora" @click.prevent="saveQuiz" />
      <input type="submit" value="Guardar y publicar mas tarde" @click.prevent="saveQuiz" />
    </div>
    </div>
    <post-options v-if="test==='settings'"/>
<div v-if="test==='questions'">

    <question-write v-for="question in questions" :key="question.id" :question="question" />
    <input type="button" value="Agregar pregunta" @click="addQuestion" />
</div>
  </form>
</template>

<script lang="ts">
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useMessage } from "naive-ui";
import QuestionWrite from "../components/QuestionWrite.vue";
import PostOptions from "../components/PostOptions.vue";

export default {
  name: "CreateTest",
  components: { QuestionWrite,PostOptions },
  setup() {
    const store = useStore();
    const message = useMessage();
    const test=ref('questions')

    const quiz = reactive({
      type: "quiz",
      name: "",
      duration: 60,
    });

    const questions = computed(() => store.state.questions);
    const addQuestion = () => store.commit("addQuestion");


    const saveQuiz = async () => {
      let form = document.getElementById("formQuiz") as HTMLFormElement;
      if (!form.checkValidity()) return form.reportValidity();

      //if (!quiz.name) return message.error("Complete el nombre");
      //const isSomeQuestionEmpty = store.state.questions.some(({ question }:any) => question === "");
      //if (isSomeQuestionEmpty) return message.error("Las pregunstas no pueden ser vacias");

      store.state.questions.forEach(({ type_answer, questionId }: any) => {
        if (type_answer === "free") store.commit("removeQuestionAnswers", { questionId });
      });

      
      store.state.quiz = quiz;
      const responseInfo = await store.dispatch("saveQuiz");

      alert(`Quiz creado, ingresa ${window.location.origin + "/Quiz/" + responseInfo.data.id}`);
    };

    return {
      addQuestion,
      questions,
      saveQuiz,
      quiz,test
    };
  },
};
</script>

<style>
input[type="text"] {
  outline: none;
  border: none;
  box-shadow: none;
  border-bottom: 1px #2c3e5044 solid;
}
.quiz {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 70%;
}
.fieldForm {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.hidden{
  display: none;
}

</style>
