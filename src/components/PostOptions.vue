<template>
  <div class="settings">
    <div class="fieldForm">
      <label for="type-quiz">Tipo de formulario</label>
      <select id="type-quiz" v-model="quizOptions.type">
        <option value="quiz">Prueba</option>
        <option value="survey">Encuesta</option>
      </select>
    </div>
    <div class="fieldForm">
      <label for="duration">Duracion</label>
      <label for="ilimited">
        <input type="checkbox" v-model="unlimited_time" />
        Sin tiempo
      </label>
      <label v-if="!unlimited_time">
        <input type="number" required id="duration" v-model="quizOptions.duration" min="1" />
        minutos
      </label>
    </div>
    <div class="fieldForm">
      <label>Establecer una contraseña para entrar<input type="checkbox" v-model="withPassword"/></label>
      <input required type="password" v-if="withPassword" v-model="quizOptions.password"/>
    </div>
    <div class="fieldForm">
      <label for="">quien puede responder</label>
      <select v-model="quizOptions.access">
        <option value="all">Todos</option>
        <option value="users">Usuarios Registrados</option>
      </select>
    </div>
    <div class="fieldForm">
      <label for="isForever">Disponible por siempre</label>
      <input type="checkbox" id="isForever" v-model="isForever" />
      <div v-if="!isForever">
        <label>Tiempo de disponibilidad</label>
        <label>desde<input required type="date"/></label>
        <label>hasta<input required type="date"/></label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed,ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const { state } = useStore();

    const publicNow = ref(true);

    const quizOptions = computed(() => {
      return state.quizOptions;
    });

    const withPassword = ref(false);
    const isForever = ref(false);
    const unlimited_time = ref(false);

    return {
      quizOptions,
      publicNow,

      unlimited_time,
      withPassword,
      isForever,
    };
  },
};
</script>
<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 5px;
  background: #fff;
  margin: 1rem 0;
}
</style>
