/**
 * Weather utility functions
 */

/**
 * Format temperature to rounded integer
 */
export const formatTemperature = (temp) => {
  if (temp === null || temp === undefined) return '--';
  return Math.round(temp);
};

/**
 * Format date from timestamp
 */
export const formatDate = (timestamp, options = {}) => {
  if (!timestamp) return '';
  
  const defaultOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  };
  
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', { ...defaultOptions, ...options });
};

/**
 * Format time from timestamp
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return '--';
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Get day name from timestamp
 */
export const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (deg) => {
  if (deg === null || deg === undefined) return 'N';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

/**
 * Get weather icon URL
 */
export const getWeatherIconUrl = (iconCode, size = '2x') => {
  const imgBase = import.meta.env.VITE_OPENWEATHER_IMG_URL || 'https://openweathermap.org/img/wn';
  return `${imgBase}/${iconCode}@${size}.png`;
};

/**
 * Format visibility to km
 */
export const formatVisibility = (visibility) => {
  if (!visibility) return '--';
  return (visibility / 1000).toFixed(1);
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Group forecast data by day
 */
export const groupForecastByDay = (forecastList, limit = 5) => {
  if (!forecastList) return [];
  
  const days = {};
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    // Get forecast at noon (12:00) for each day
    if (item.dt_txt.includes('12:00:00') || !days[dateKey]) {
      days[dateKey] = item;
    }
  });
  
  return Object.values(days).slice(0, limit);
};

/**
 * Check if data is valid
 */
export const isValidWeatherData = (data) => {
  return data && data.main && data.weather && data.weather.length > 0;
};

/**
 * Get weather condition class for styling
 */
export const getWeatherConditionClass = (weatherData) => {
  if (!weatherData?.weather) return 'default';
  return weatherData.weather[0].main.toLowerCase();
};
