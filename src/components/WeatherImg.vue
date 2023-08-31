<script setup>
import { defineProps, ref } from 'vue';

const { weatherData } = defineProps({
  weatherData: {
    type: Object,
    required: true
  }
});

 const imgCode = ref(weatherData.weather[0].icon);
 const imgURL = ref(`https://openweathermap.org/img/wn/${imgCode.value}@2x.png`);

</script>

<template>
  <div>
    <img :src="imgURL" :alt="weatherData.weather[0].description">
  </div>
</template>

<style scoped>
</style>
