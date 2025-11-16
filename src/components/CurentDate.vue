<script setup>
import { defineProps, computed } from 'vue'
import MyLocation from './MyLocation.vue'

const props = defineProps({
  weatherData: {
    type: Object,
    required: false,
    default: null
  },
  celsius: {
    type: Boolean,
    default: true
  }
})

const formattedDate = computed(() => {
  if (!props.weatherData?.dt) return '';
  const date = new Date(props.weatherData.dt * 1000);
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  };
  return date.toLocaleString('en-US', options);
})

const temperature = computed(() => {
  if (!props.weatherData?.main?.temp) return '--';
  return Math.round(props.weatherData.main.temp);
})

const feelsLike = computed(() => {
  if (!props.weatherData?.main?.feels_like) return '--';
  return Math.round(props.weatherData.main.feels_like);
})

const description = computed(() => {
  if (!props.weatherData?.weather?.[0]) return 'Loading...';
  return props.weatherData.weather[0].description.charAt(0).toUpperCase() + 
         props.weatherData.weather[0].description.slice(1);
})

const cityName = computed(() => {
  return props.weatherData?.name || 'Unknown';
})

const country = computed(() => {
  return props.weatherData?.sys?.country || '';
})

const tempRange = computed(() => {
  if (!props.weatherData?.main) return null;
  return {
    min: Math.round(props.weatherData.main.temp_min),
    max: Math.round(props.weatherData.main.temp_max)
  };
});
</script>

<template>
  <div class="weather-info">
    <MyLocation />
    
    <div class="location">
      <span class="material-symbols-outlined">location_on</span>
      <h2>{{ cityName }}<span v-if="country">, {{ country }}</span></h2>
    </div>
    
    <div class="date">{{ formattedDate }}</div>
    
    <div class="temperature">
      <h1>{{ temperature }}°<span class="unit">{{ celsius ? 'C' : 'F' }}</span></h1>
      <p class="description">{{ description }}</p>
      <p class="feels-like">Feels like {{ feelsLike }}°</p>
    </div>
    
    <div class="temp-range" v-if="tempRange">
      <div class="range-item">
        <span class="material-symbols-outlined">arrow_downward</span>
        <span>{{ tempRange.min }}°</span>
      </div>
      <div class="range-divider"></div>
      <div class="range-item">
        <span class="material-symbols-outlined">arrow_upward</span>
        <span>{{ tempRange.max }}°</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-info {
  color: white;
  text-align: center;
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 20px 0 10px;
}

.location h2 {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}

.location .material-symbols-outlined {
  font-size: 28px;
}

.date {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 30px;
}

.temperature {
  margin: 40px 0;
}

.temperature h1 {
  font-size: 96px;
  font-weight: 300;
  margin: 0;
  line-height: 1;
}

.temperature .unit {
  font-size: 48px;
  font-weight: 400;
}

.description {
  font-size: 24px;
  margin: 10px 0 0;
  opacity: 0.9;
  font-weight: 500;
}

.feels-like {
  font-size: 16px;
  margin: 10px 0 0;
  opacity: 0.7;
}

.temp-range {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
}

.range-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  font-weight: 600;
}

.range-item .material-symbols-outlined {
  font-size: 20px;
}

.range-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .location h2 {
    font-size: 24px;
  }
  
  .location .material-symbols-outlined {
    font-size: 24px;
  }
  
  .temperature {
    margin: 30px 0;
  }
  
  .temperature h1 {
    font-size: 80px;
  }
  
  .temperature .unit {
    font-size: 40px;
  }
  
  .description {
    font-size: 20px;
  }
  
  .temp-range {
    max-width: 180px;
    padding: 12px;
  }
  
  .range-item {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .location h2 {
    font-size: 20px;
  }
  
  .location .material-symbols-outlined {
    font-size: 20px;
  }
  
  .date {
    font-size: 13px;
    margin-bottom: 20px;
  }
  
  .temperature {
    margin: 25px 0;
  }
  
  .temperature h1 {
    font-size: 64px;
  }
  
  .temperature .unit {
    font-size: 32px;
  }
  
  .description {
    font-size: 18px;
  }
  
  .feels-like {
    font-size: 14px;
  }
  
  .temp-range {
    gap: 15px;
    padding: 10px;
    max-width: 160px;
  }
  
  .range-item {
    font-size: 15px;
  }
  
  .range-item .material-symbols-outlined {
    font-size: 18px;
  }
}
</style>
