<template>
  <div>
    <h1>Bienvenido a OpenQuiz</h1>
    <span>Crea cuestionarios y encuestas de forma facil y rapida totalmente gratis</span>
    <br />
    <n-button @click="$router.push('/createQuiz')" type="success" ghost>Empezar a crear</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'

export default defineComponent({
  components: {
    NButton
  },
  setup () {}
})
</script>
<style>
a {
  text-decoration: none;
}
</style>
