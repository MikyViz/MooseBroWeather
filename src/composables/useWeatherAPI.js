/**
 * Main composable for weather data management
 */

import { ref, computed } from 'vue';
import { weatherService } from '@/services/weatherService';

export function useWeatherAPI() {
  const weatherData = ref(null);
  const forecastData = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  /**
   * Fetch weather data by coordinates or city
   */
  const fetchWeatherData = async (params) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await weatherService.getWeatherData(params);
      weatherData.value = data.weather;
      forecastData.value = data.forecast;
      return data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch weather data';
      console.error('Weather fetch error:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch weather by city name
   */
  const fetchWeatherByCity = async (city, units = 'metric') => {
    return fetchWeatherData({ city, units });
  };

  /**
   * Fetch weather by coordinates
   */
  const fetchWeatherByCoords = async (lat, lon, units = 'metric') => {
    return fetchWeatherData({ lat, lon, units });
  };

  /**
   * Refresh current weather data
   */
  const refreshWeather = async (params) => {
    return fetchWeatherData(params);
  };

  /**
   * Clear all data
   */
  const clearWeatherData = () => {
    weatherData.value = null;
    forecastData.value = null;
    error.value = null;
  };

  /**
   * Clear error
   */
  const clearError = () => {
    error.value = null;
  };

  /**
   * Get background class based on weather condition
   */
  const backgroundClass = computed(() => {
    if (!weatherData.value?.weather) return 'default';
    return weatherData.value.weather[0].main.toLowerCase();
  });

  /**
   * Check if we have weather data
   */
  const hasWeatherData = computed(() => {
    return weatherData.value !== null;
  });

  /**
   * Check if we have forecast data
   */
  const hasForecastData = computed(() => {
    return forecastData.value !== null;
  });

  return {
    // State
    weatherData,
    forecastData,
    isLoading,
    error,
    
    // Computed
    backgroundClass,
    hasWeatherData,
    hasForecastData,
    
    // Methods
    fetchWeatherData,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    refreshWeather,
    clearWeatherData,
    clearError
  };
}
