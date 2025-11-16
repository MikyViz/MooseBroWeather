/**
 * Composable for handling geolocation
 */

import { ref } from 'vue';

export function useGeolocation() {
  const latitude = ref(null);
  const longitude = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        const err = new Error("Your browser doesn't support geolocation");
        error.value = err.message;
        reject(err);
        return;
      }

      isLoading.value = true;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude.value = position.coords.latitude;
          longitude.value = position.coords.longitude;
          error.value = null;
          isLoading.value = false;
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (err) => {
          error.value = `Location error: ${err.message}`;
          isLoading.value = false;
          reject(err);
        }
      );
    });
  };

  const setCoordinates = (lat, lon) => {
    latitude.value = lat;
    longitude.value = lon;
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    latitude,
    longitude,
    error,
    isLoading,
    getCurrentPosition,
    setCoordinates,
    clearError
  };
}
