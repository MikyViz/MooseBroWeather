<script setup>
import CurentDate from './components/CurentDate.vue'
import WeatherImg from './components/WeatherImg.vue'
import SearchLocation from './components/SearchLocation.vue'
import { ref, provide, onMounted  } from 'vue'

const latitude = ref(44.34)
const longitude = ref(10.99)
const error = ref(null)

let APPID = '1e79072404f93c5b88c1afe026dbda5d'
let city ='';
const NameUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APPID}`;
const LatLonUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.value}&lon=${longitude.value}&appid=${APPID}&units=metric`
let URL = LatLonUrl;

const weatherData = ref(null)

const getData = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  weatherData.value = data
}

const getCurrentLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  } else {
    error.value = "Your bowser is too old man... it's time for update😉"
  }
}

function successCallback(position) {
  console.log("suka");
  latitude.value = position.coords.latitude
  longitude.value = position.coords.longitude
  getData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude.value}&lon=${longitude.value}&appid=${APPID}&units=metric`)
}

function errorCallback(err) {
  error.value = `Error of location reqwest: ${err.message}`
}

provide('getLocation', {getCurrentLocation})

const WeatherByRequriedLocation = (locatin)=>{
  city = location;
  // URL=NameUrl
  getData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APPID}`);
}

// onMounted(() => {
//   getCurrentLocation();
//   getData(LatLonUrl);
// });
getData(URL);
// getData(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=1e79072404f93c5b88c1afe026dbda5d`)
</script>

<template>
  <header>
    <div class="wrapper">
      <SearchLocation @requiredLocation="WeatherByRequriedLocation"/>
      <WeatherImg :weatherData="weatherData" />
      <CurentDate :weatherData="weatherData" />
      <div v-if="!weatherData" class="text-center">
        <div class="spinner-border spinner-border-sm"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.wrapper {
  background-color: rgb(54, 54, 93);
  height: 100vh;
  width: 90vw;
}
</style>
