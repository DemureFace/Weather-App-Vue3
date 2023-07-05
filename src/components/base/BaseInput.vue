<script setup>
import { ref, defineProps } from "vue";

const isFocused = ref(false);

defineProps({
  icon: {
    type: String,
    default: "",
  },
  inputValue: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
});

defineEmits(["update:inputValue"]);
</script>

<template>
  <div class="flex flex-col relative mt-10">
    <span v-if="icon" class="icon-input">
      <i class="fa-solid" :class="icon" />
    </span>
    <input
      :v-model="inputValue"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="$emit('update:inputValue', $event.target.value)"
    />
    <label
      v-if="label"
      :for="id"
      class="label-anim"
      :class="{
        focused: isFocused || inputValue,
        labelError: error,
      }"
      >{{ label }}</label
    >
    <span v-if="error" class="">{{ error }}</span>
  </div>
</template>
