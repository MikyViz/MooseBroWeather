<script setup>
import CurentDate from './components/CurentDate.vue';
import WeatherImg from './components/WeatherImg.vue';
import SearchLocation from './components/SearchLocation.vue';
import { ref, provide, onMounted  } from 'vue';

const latitude = ref(44.34);
const longitude = ref(10.99);
const error = ref(null);

// Use Vite env vars (must be prefixed with VITE_)
const APPID = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
let city = '';
let celsius = ref(true);

const setUrlName = ()=>{

}

const setUrl = (units, queries) => {
  // allow overriding base url via env, fallback to OpenWeatherMap
  let baseUrl = import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5/weather';
  let appId = APPID ? `appid=${APPID}` : '';
  const queryParts = [queries, appId].filter(Boolean).join('&');
  if (queryParts) return `${baseUrl}?${queryParts}&units=${units}`;
  return `${baseUrl}?units=${units}`;
};

const measurement = ()=>{
  celsius.value=!celsius.value;
  let unit = celsius.value ? 'metric' : "imperial";
  let url = setUrl(unit,`lat=${latitude.value}&lon=${longitude.value}`);
  getData(url);
}

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
  latitude.value = position.coords.latitude
  longitude.value = position.coords.longitude
  let unit = celsius.value ? 'metric' : "imperial";
  getData(setUrl(unit,`lat=${latitude.value}&lon=${longitude.value}`))
}

function errorCallback(err) {
  error.value = `Error of location reqwest: ${err.message}`
}

provide('getLocation', {getCurrentLocation})

const WeatherByRequriedLocation = ()=>{
  // city = location;
  let unit = celsius.value ? 'metric' : 'imperial';
  let url = setUrl(unit, `q=${city}`);
  getData(url);
}

// onMounted(() => {
//   getCurrentLocation();
//   getData(LatLonUrl);
// });
let URL = setUrl("metric", `lat=${latitude.value}&lon=${longitude.value}`);
getData(URL);
</script>

<template>
  <header>
    <div class="wrapper">
      <button @click="measurement" :class="{choised:celsius, unchoised:!celsius}" class="metric-btn">°C</button>
      <button @click="measurement" :class="{choised:!celsius, unchoised:celsius}" class="metric-btn">°F</button>
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
  width: 50vw;
}
.metric-btn{
  border-radius: 50%;
  padding: 10px;
  font-size: 19px;
  font-weight: bolder;
  border: none;
}
.choised{
  color: beige;
  background-color: rgb(79, 96, 181);
}
.unchoised{
color: rgb(79, 96, 181);
background-color: beige;
}
</style>
