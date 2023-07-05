<template>
  <draggable
    v-model="savedCities"
    class="city-list"
    animation="400"
    easing="cubic-bezier(.33,.03,.67,.93)"
    @update="handleUpdate"
    @change="handleDragChange"
  >
    <template
      v-for="city in savedCities"
      :key="city.id"
      v-slot:item="{ element }"
    >
      <div class="mt-4">
        <CityCard :city="element" @click="goToCityView(element)" />
      </div>
    </template>
  </draggable>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import CityCard from "./CityCard.vue";
import draggable from "vuedraggable";

const savedCities = ref([]);
const isCitiesUpdated = ref(false);

const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=fcf233f084353481ad039a0de542008e&units=metric`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    await new Promise((res) => setTimeout(res, 1000));

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};

watchEffect(() => {
  if (isCitiesUpdated.value) {
    saveCitiesToLocalStorage(savedCities.value);
    isCitiesUpdated.value = false;
  }
});

const handleUpdate = () => {
  isCitiesUpdated.value = true;
};
const handleDragChange = () => {
  isCitiesUpdated.value = true;
};
const saveCitiesToLocalStorage = (cities) => {
  localStorage.setItem("savedCities", JSON.stringify(cities));
};

await getCities();
const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>

<style>
.draggable {
  cursor: move;
}
</style>
