<template>
    <suspense>
      <list-quizes />
    </suspense>
</template>

<script lang="ts">
import ListQuizes from '@/components/ListQuizes.vue'
import { defineComponent} from 'vue'

export default defineComponent({
  components: { ListQuizes },
  
})
</script>
00dc82