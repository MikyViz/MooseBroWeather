<script setup>
import { provide, onMounted, ref } from 'vue';
import CurentDate from './components/CurentDate.vue';
import WeatherImg from './components/WeatherImg.vue';
import SearchLocation from './components/SearchLocation.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import WeatherDetails from './components/WeatherDetails.vue';
import TemperatureChart from './components/TemperatureChart.vue';

// Composables
import { useWeatherAPI } from './composables/useWeatherAPI';
import { useGeolocation } from './composables/useGeolocation';
import { useTemperatureUnit } from './composables/useTemperatureUnit';

// Weather API composable
const {
  weatherData,
  forecastData,
  isLoading,
  error,
  backgroundClass,
  fetchWeatherByCity,
  fetchWeatherByCoords
} = useWeatherAPI();

// Geolocation composable
const {
  latitude,
  longitude,
  getCurrentPosition
} = useGeolocation();

// Temperature unit composable
const {
  isCelsius,
  unit,
  toggleUnit,
  setToCelsius,
  setToFahrenheit
} = useTemperatureUnit();

// Store last search to re-fetch when unit changes
const lastSearchCity = ref(null);
const lastSearchCoords = ref(null);

// Handle temperature unit change
const handleUnitChange = async (newUnit) => {
  // Don't do anything if clicking the already active button
  if (newUnit === 'celsius' && isCelsius.value) return;
  if (newUnit === 'fahrenheit' && !isCelsius.value) return;
  
  toggleUnit();
  
  // Refresh weather data with new units using last search
  if (lastSearchCity.value) {
    await fetchWeatherByCity(lastSearchCity.value, unit.value);
  } else if (lastSearchCoords.value) {
    await fetchWeatherByCoords(
      lastSearchCoords.value.lat, 
      lastSearchCoords.value.lon, 
      unit.value
    );
  }
};

// Handle location request
const handleGetCurrentLocation = async () => {
  try {
    const coords = await getCurrentPosition();
    lastSearchCity.value = null;
    lastSearchCoords.value = { lat: coords.lat, lon: coords.lon };
    await fetchWeatherByCoords(coords.lat, coords.lon, unit.value);
  } catch (err) {
    console.error('Failed to get current location:', err);
  }
};

// Provide geolocation function to child components
provide('getLocation', { getCurrentLocation: handleGetCurrentLocation });

// Handle city search
const handleCitySearch = async (city) => {
  try {
    lastSearchCity.value = city;
    lastSearchCoords.value = null;
    await fetchWeatherByCity(city, unit.value);
  } catch (err) {
    console.error('Failed to fetch weather for city:', err);
  }
};

// Initialize with default location on mount
onMounted(async () => {
  // Default coordinates (can be changed to user's preference)
  const defaultLat = 44.34;
  const defaultLon = 10.99;
  
  lastSearchCoords.value = { lat: defaultLat, lon: defaultLon };
  
  try {
    await fetchWeatherByCoords(defaultLat, defaultLon, unit.value);
  } catch (err) {
    console.error('Failed to load initial weather data:', err);
  }
});
</script>

<template>
  <div class="weather-app" :class="backgroundClass">
    <div class="app-container">
      <!-- Left Panel: Controls & Current Weather -->
      <div class="left-panel">
        <div class="panel-content">
          <!-- Header with temp controls -->
          <div class="header">
            <div class="temp-toggle">
              <button 
                @click="handleUnitChange('celsius')" 
                :class="{ active: isCelsius }" 
                class="temp-btn"
              >°C</button>
              <button 
                @click="handleUnitChange('fahrenheit')" 
                :class="{ active: !isCelsius }" 
                class="temp-btn"
              >°F</button>
            </div>
          </div>

          <SearchLocation @requiredLocation="handleCitySearch"/>

          <!-- Loading State -->
          <div v-if="isLoading" class="loading">
            <div class="spinner"></div>
            <p>Loading...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="error">
            <span class="material-symbols-outlined">error</span>
            <p>{{ error }}</p>
          </div>

          <!-- Weather Content -->
          <div v-else-if="weatherData" class="weather-content">
            <WeatherImg :weatherData="weatherData" />
            <CurentDate :weatherData="weatherData" :celsius="isCelsius" />
            <WeatherDetails :weatherData="weatherData" :celsius="isCelsius" />
          </div>
        </div>
      </div>

      <!-- Vertical Divider -->
      <div class="divider"></div>

      <!-- Right Panel: Logo & Temperature History -->
      <div class="right-panel">
        <div class="panel-content">
          <!-- Logo -->
          <div class="logo-container">
            <img src="./assets/HorizontalLogoMB.png" alt="Weather Logo" class="app-logo" />
          </div>

          <!-- Temperature Chart -->
          <div v-if="forecastData" class="chart-section">
            <TemperatureChart :forecastData="forecastData" :celsius="isCelsius" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-app {
  min-height: 100vh;
  display: flex;
  padding: 0;
  transition: background 0.6s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Dynamic backgrounds based on weather */
.weather-app.clear {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.weather-app.clouds {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.weather-app.rain,
.weather-app.drizzle {
  background: linear-gradient(135deg, #5f72bd 0%, #9b23ea 100%);
}

.weather-app.snow {
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
}

.weather-app.thunderstorm {
  background: linear-gradient(135deg, #2d3561 0%, #c05c7e 100%);
}

.weather-app.mist,
.weather-app.fog,
.weather-app.haze {
  background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%);
}

/* App Container - Two Column Layout */
.app-container {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2px 2fr;
  gap: 0;
}

/* Left Panel - 1/3 width */
.left-panel {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  overflow-y: auto;
  animation: slideInLeft 0.6s ease;
}

/* Right Panel - 2/3 width */
.right-panel {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  overflow-y: auto;
  animation: slideInRight 0.6s ease;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Vertical Divider */
.divider {
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.3) 20%,
    rgba(255, 255, 255, 0.3) 80%,
    transparent
  );
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.5);
  }
}

/* Panel Content */
.panel-content {
  padding: 40px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* Custom scrollbars */
.left-panel::-webkit-scrollbar,
.right-panel::-webkit-scrollbar {
  width: 8px;
}

.left-panel::-webkit-scrollbar-track,
.right-panel::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.left-panel::-webkit-scrollbar-thumb,
.right-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.left-panel::-webkit-scrollbar-thumb:hover,
.right-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Logo Styles - Now in Right Panel */
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px 0;
  flex-shrink: 0;
}

.app-logo {
  width: 80%;
  height: auto;
  max-height: 100px;
  object-fit: contain;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.15));
  animation: logoFloat 3s ease-in-out infinite, logoGlow 2s ease-in-out infinite alternate;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.app-logo:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 8px 30px rgba(255, 255, 255, 0.4));
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes logoGlow {
  0% {
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.15));
  }
  100% {
    filter: drop-shadow(0 4px 30px rgba(255, 255, 255, 0.3));
  }
}

/* Header */
.header {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.temp-toggle {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px;
  border-radius: 50px;
}

.temp-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
}

.temp-btn.active {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.temp-btn:hover:not(.active) {
  color: white;
}

/* Loading & Error States */
.loading,
.error {
  text-align: center;
  padding: 40px 20px;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.error .material-symbols-outlined {
  font-size: 48px;
  color: #ff6b6b;
}

/* Weather Content */
.weather-content {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Chart Section */
.chart-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

/* Responsive Design */

/* Large Desktop */
@media (max-width: 1400px) {
  .app-container {
    grid-template-columns: 1fr 2px 2fr;
  }
}

/* Desktop / Tablet Landscape */
@media (max-width: 1024px) {
  .app-container {
    grid-template-columns: 1fr 2px 1.5fr;
  }
  
  .panel-content {
    padding: 30px;
  }
  
  .app-logo {
    width: 70%;
    max-height: 80px;
  }
}

/* Tablet Portrait */
@media (max-width: 768px) {
  .app-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto 2px 1fr;
    height: auto;
    min-height: 100vh;
  }
  
  .left-panel {
    max-height: 60vh;
    min-height: 400px;
  }
  
  .right-panel {
    min-height: 500px;
  }
  
  .divider {
    height: 2px;
    width: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3) 20%,
      rgba(255, 255, 255, 0.3) 80%,
      transparent
    );
  }
  
  .divider::before {
    top: 50%;
    left: 50%;
  }
  
  .panel-content {
    padding: 25px 20px;
  }
  
  .app-logo {
    width: 60%;
    max-height: 70px;
  }
  
  .header {
    margin-bottom: 20px;
  }
  
  .temp-toggle {
    width: 100%;
    justify-content: center;
  }
  
  .temp-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .panel-content {
    padding: 20px 15px;
  }
  
  .left-panel {
    min-height: 350px;
  }
  
  .app-logo {
    width: 50%;
    max-height: 60px;
  }
  
  .logo-container {
    margin-bottom: 20px;
    padding: 10px 0;
  }
  
  .temp-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  .chart-section {
    padding: 0;
  }
}

/* Small Mobile */
@media (max-width: 360px) {
  .panel-content {
    padding: 15px 10px;
  }
  
  .temp-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
