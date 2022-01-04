<template>
    <suspense>
      <list-quizes :user_id="user_id" />
    </suspense>
</template>

<script lang="ts">
import ListQuizes from '@/components/ListQuizes.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { ListQuizes },
  setup() {
    const user_id = ref(localStorage.user_id)
    return {
      user_id
    }

  },
})
</script>
