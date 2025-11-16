<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  forecastData: {
    type: Object,
    required: true
  },
  celsius: {
    type: Boolean,
    default: true
  }
});

// Group forecast by day and get one forecast per day (at noon)
const dailyForecast = computed(() => {
  if (!props.forecastData?.list) return [];
  
  const days = {};
  props.forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    // Get forecast at noon (12:00) for each day
    if (item.dt_txt.includes('12:00:00') || !days[dateKey]) {
      days[dateKey] = item;
    }
  });
  
  return Object.values(days).slice(0, 5);
});

const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const getTemp = (temp) => {
  return Math.round(temp);
};

const getIconUrl = (iconCode) => {
  const imgBase = import.meta.env.VITE_OPENWEATHER_IMG_URL || 'https://openweathermap.org/img/wn';
  return `${imgBase}/${iconCode}@2x.png`;
};
</script>

<template>
  <div class="weather-forecast">
    <h3 class="section-title">5-Day Forecast</h3>
    
    <div class="forecast-container">
      <div 
        v-for="day in dailyForecast" 
        :key="day.dt" 
        class="forecast-card"
      >
        <p class="forecast-day">{{ getDayName(day.dt) }}</p>
        <img 
          :src="getIconUrl(day.weather[0].icon)" 
          :alt="day.weather[0].description"
          class="forecast-icon"
        >
        <div class="forecast-temps">
          <span class="temp-high">{{ getTemp(day.main.temp_max) }}°</span>
          <span class="temp-low">{{ getTemp(day.main.temp_min) }}°</span>
        </div>
        <p class="forecast-desc">{{ day.weather[0].main }}</p>
        <div class="forecast-details">
          <span class="material-symbols-outlined" title="Humidity">water_drop</span>
          <span>{{ day.main.humidity }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-forecast {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.section-title {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  opacity: 0.9;
}

.forecast-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  overflow-x: auto;
}

.forecast-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px 15px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}

.forecast-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
}

.forecast-day {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.forecast-icon {
  width: 60px;
  height: 60px;
  margin: 5px 0;
}

.forecast-temps {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 10px 0 5px;
}

.temp-high {
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.temp-low {
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
}

.forecast-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin: 5px 0 10px;
}

.forecast-details {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.forecast-details .material-symbols-outlined {
  font-size: 16px;
}

@media (max-width: 600px) {
  .forecast-container {
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 10px;
  }
  
  .forecast-card {
    padding: 15px 10px;
  }
  
  .forecast-icon {
    width: 50px;
    height: 50px;
  }
  
  .temp-high {
    font-size: 18px;
  }
  
  .temp-low {
    font-size: 14px;
  }
}
</style>
