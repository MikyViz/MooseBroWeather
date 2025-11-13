<script setup>
import { defineProps, computed } from 'vue';

const { weatherData } = defineProps({
  weatherData: {
    type: Object,
    required: false,
    default: null
  }
});

const imgBase = import.meta.env.VITE_OPENWEATHER_IMG_URL || 'https://openweathermap.org/img/wn';
const imgCode = computed(() => (weatherData && weatherData.weather ? weatherData.weather[0].icon : '04d'));
const imgURL = computed(() => `${imgBase}/${imgCode.value}@2x.png`);

</script>

<template>
  <div>
  <img :src="imgURL">
  </div>
</template>

<style scoped>
</style>
