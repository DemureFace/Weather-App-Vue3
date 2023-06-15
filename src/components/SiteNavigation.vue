<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-right-to-bracket text-xl hover:text-weather-secondary hover:bg-white rounded-full duration-150 cursor-pointer"
          @click="toggleModal('login')"
        ></i>
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal('info')"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <component
          :is="modalComponent"
          @change-modal="currentModalComponent = $event"
        />
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";

import { RouterLink, useRoute, useRouter } from "vue-router";

import { uid } from "uid";

import BaseModal from "@/components/base/BaseModal.vue";
import Login from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
import InfoModal from "@/components/InfoModal.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const currentModalComponent = ref(null);
const modalActive = ref(null);

const modalComponent = computed(() => {
  switch (currentModalComponent.value) {
    case "login":
      return Login;
    case "info":
      return InfoModal;
    case "signup":
      return SignUp;
    default:
      return null;
  }
});

const toggleModal = (component) => {
  modalActive.value = !modalActive.value;
  currentModalComponent.value = component;
};
</script>
