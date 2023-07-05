<script setup>
import { defineProps, defineEmits } from "vue";

defineEmits(["click"]);

const props = defineProps({
  tag: {
    type: String,
    default: "button",
  },
  path: {
    type: String,
    default: "",
  },
  click: {
    type: String,
    default: "",
  },
  textClasess: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <component
    :class="{
      'text-weather-secondary underline hover:no-underline': tag === 'a',
    }"
    :is="tag"
    :to="{ name: path }"
    @click="$emit('click')"
  >
    <span :class="textClasess">
      <slot name="default"></slot>
    </span>
  </component>
</template>
