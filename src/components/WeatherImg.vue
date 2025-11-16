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
const imgURL = computed(() => `${imgBase}/${imgCode.value}@4x.png`);
</script>

<template>
  <div class="weather-icon" v-if="weatherData">
    <img :src="imgURL" :alt="weatherData?.weather?.[0]?.description || 'Weather icon'">
  </div>
</template>

<style scoped>
.weather-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.weather-icon img {
  width: 180px;
  height: 180px;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 600px) {
  .weather-icon img {
    width: 140px;
    height: 140px;
  }
}
</style>
