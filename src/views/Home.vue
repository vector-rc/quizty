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
import { NButton } from 'naive-ui';
import { Accessibility24Filled, Home16Regular } from '@vicons/fluent';
import { Icon } from '@vicons/utils'

export default defineComponent({
  components: {
    NButton,
    Accessibility24Filled,
    Icon,
    Home16Regular
  },
  setup() {

  },
})
</script>
<style>
a {
  text-decoration: none;
}
</style>

