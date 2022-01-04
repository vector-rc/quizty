<template>
  <div class="answer">
    <label>
      {{id}}
      <input
        v-if="type_answer == 'multiple'"
        @change="$emit('checkAnswer', id)"
        :name="modelValue"
        :value="modelValue"
        type="checkbox"
      />
      <input
        v-if="type_answer == 'single'"
        @input="$emit('update:modelValue', $event.target.value)"
        :name="modelValue"
        :value="answer.id"
        type="radio"
      />
      {{ answer.answer }}
    </label>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["update:modelValue", "checkAnswer"],
  props: {
    answer: Object,
    modelValue: [String, Array],
    type_answer: String,
  },
  setup(props) {
    const id = ref(props.answer.id);
    return {
      id,
    };
  },
};
</script>

<style>
.answer {
  text-align: start;
  margin: 0.5rem 0;
  width: 100%;
  outline: none;
}
</style>
