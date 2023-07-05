<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <TheNavigation />
    <Transition name="page" mode="out-in">
      <Loader v-if="showLoading" />
    </Transition>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { RouterView } from "vue-router";
import Loader from "@/components/base/BaseLoader.vue";
import TheNavigation from "./components/TheNavigation.vue";

const store = useStore();
const showLoading = computed(() => store.state.showLoading);
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
