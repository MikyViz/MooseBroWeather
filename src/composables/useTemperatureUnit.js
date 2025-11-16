/**
 * Composable for managing temperature units (Celsius/Fahrenheit)
 */

import { ref, computed } from 'vue';

export function useTemperatureUnit() {
  const isCelsius = ref(true);

  const unit = computed(() => isCelsius.value ? 'metric' : 'imperial');
  const unitSymbol = computed(() => isCelsius.value ? 'C' : 'F');
  const speedUnit = computed(() => isCelsius.value ? 'm/s' : 'mph');

  const toggleUnit = () => {
    isCelsius.value = !isCelsius.value;
  };

  const setToCelsius = () => {
    isCelsius.value = true;
  };

  const setToFahrenheit = () => {
    isCelsius.value = false;
  };

  return {
    isCelsius,
    unit,
    unitSymbol,
    speedUnit,
    toggleUnit,
    setToCelsius,
    setToFahrenheit
  };
}
