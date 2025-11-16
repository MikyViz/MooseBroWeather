<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  weatherData: {
    type: Object,
    required: true
  },
  celsius: {
    type: Boolean,
    default: true
  }
});

const sunrise = computed(() => {
  if (!props.weatherData?.sys?.sunrise) return '--';
  const date = new Date(props.weatherData.sys.sunrise * 1000);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
});

const sunset = computed(() => {
  if (!props.weatherData?.sys?.sunset) return '--';
  const date = new Date(props.weatherData.sys.sunset * 1000);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
});

const pressure = computed(() => {
  if (!props.weatherData?.main?.pressure) return '--';
  return props.weatherData.main.pressure;
});

const visibility = computed(() => {
  if (!props.weatherData?.visibility) return '--';
  return (props.weatherData.visibility / 1000).toFixed(1);
});

const cloudiness = computed(() => {
  if (!props.weatherData?.clouds?.all) return '0';
  return props.weatherData.clouds.all;
});

const windDeg = computed(() => {
  if (!props.weatherData?.wind?.deg) return 0;
  return props.weatherData.wind.deg;
});

const windDirection = computed(() => {
  const deg = windDeg.value;
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
});
</script>

<template>
  <div class="weather-details">
    <h3 class="section-title">Weather Details</h3>
    
    <div class="details-grid">
      <!-- Sunrise/Sunset -->
      <div class="detail-card">
        <div class="detail-icon">
          <span class="material-symbols-outlined">wb_sunny</span>
        </div>
        <div class="detail-info">
          <p class="detail-label">Sunrise</p>
          <p class="detail-value">{{ sunrise }}</p>
        </div>
      </div>

      <div class="detail-card">
        <div class="detail-icon">
          <span class="material-symbols-outlined">wb_twilight</span>
        </div>
        <div class="detail-info">
          <p class="detail-label">Sunset</p>
          <p class="detail-value">{{ sunset }}</p>
        </div>
      </div>

      <!-- Pressure -->
      <div class="detail-card">
        <div class="detail-icon">
          <span class="material-symbols-outlined">compress</span>
        </div>
        <div class="detail-info">
          <p class="detail-label">Pressure</p>
          <p class="detail-value">{{ pressure }} hPa</p>
        </div>
      </div>

      <!-- Visibility -->
      <div class="detail-card">
        <div class="detail-icon">
          <span class="material-symbols-outlined">visibility</span>
        </div>
        <div class="detail-info">
          <p class="detail-label">Visibility</p>
          <p class="detail-value">{{ visibility }} km</p>
        </div>
      </div>

      <!-- Cloudiness -->
      <div class="detail-card">
        <div class="detail-icon">
          <span class="material-symbols-outlined">cloud</span>
        </div>
        <div class="detail-info">
          <p class="detail-label">Cloudiness</p>
          <p class="detail-value">{{ cloudiness }}%</p>
        </div>
      </div>

      <!-- Wind Direction -->
      <div class="detail-card">
        <div class="detail-icon">
          <span class="material-symbols-outlined" :style="{ transform: `rotate(${windDeg}deg)` }">navigation</span>
        </div>
        <div class="detail-info">
          <p class="detail-label">Wind Direction</p>
          <p class="detail-value">{{ windDirection }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-details {
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

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.detail-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.detail-icon .material-symbols-outlined {
  font-size: 28px;
  color: white;
}

.detail-info {
  flex: 1;
}

.detail-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .detail-card {
    padding: 12px;
  }
  
  .detail-icon {
    width: 40px;
    height: 40px;
  }
  
  .detail-icon .material-symbols-outlined {
    font-size: 24px;
  }
  
  .detail-value {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .weather-details {
    margin: 25px 0;
  }
  
  .details-title {
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .detail-card {
    padding: 12px;
    flex-direction: row;
    text-align: left;
  }
  
  .detail-icon {
    width: 38px;
    height: 38px;
  }
  
  .detail-icon .material-symbols-outlined {
    font-size: 22px;
  }
  
  .detail-label {
    font-size: 11px;
  }
  
  .detail-value {
    font-size: 14px;
  }
}
</style>
