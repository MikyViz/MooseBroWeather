<script setup>
import { defineProps, computed, ref } from 'vue'
import MyLocation from './MyLocation.vue'

const props = defineProps({
  weatherData: {
    type: Object,
    required: false,
    default: null
  }
})
let dt = props.weatherData && props.weatherData.dt * 1000 || new Date()
const date = ref(dt)
const formattedDate = computed(() => {
  const options = {
    timeZone: 'UTC',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return date.value.toLocaleString('en-US', options)
})

</script>

<template>
  <MyLocation />

  <div class="greetings">
    <h1 v-if="props.weatherData && props.weatherData.main">{{ props.weatherData.main.temp }}</h1>
    <h2>{{ weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].main : 'await please' }}</h2>
    <p>{{ formattedDate }}</p>
    <p><span class="material-symbols-outlined">place</span> {{ weatherData ? weatherData.name : "await please"}} </p>
  </div>
</template>

<style scoped>
* {
  color: beige;
}
</style>
