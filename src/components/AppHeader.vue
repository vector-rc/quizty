<template>
  <div id="nav">
    <n-button type="success" @click="$router.push('/')">
      <i>
        <icon>
          <home16-regular />
        </icon>
      </i>Home
    </n-button>|
    <router-link v-if="isSessionInit" to="/myQuizes">My Quizes</router-link>|
    <router-link to="/createQuiz">
      CreateTest
      <icon>
        <home16-regular />
      </icon>
    </router-link>|
    <router-link v-if="!isSessionInit" to="/signup">Signup</router-link>|
    <router-link v-if="!isSessionInit" to="/login">Login</router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Home16Regular } from '@vicons/fluent'
import { Icon } from '@vicons/utils'
import { NButton } from 'naive-ui'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    Home16Regular,
    Icon,
    NButton
  },

  setup () {
    const store = useStore()

    const isSessionInit = computed(() => {
      return store.state.session_id != null
    })

    return {
      isSessionInit
    }
  }
})
</script>

<style>
#nav {
  width: 100vw;
  box-shadow: 0 0 5px;
}
</style>
