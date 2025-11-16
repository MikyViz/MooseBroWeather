<script setup>
import { computed, ref, watch } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

// Extract temperature data for chart
const forecastList = computed(() => {
  if (!props.forecastData?.list) return [];
  return props.forecastData.list.slice(0, 24); // 24 data points (3 days)
});

// Chart data
const chartData = computed(() => {
  const list = forecastList.value;
  
  return {
    labels: list.map(item => {
      const date = new Date(item.dt * 1000);
      return date.toLocaleString('en-US', { 
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }),
    datasets: [
      {
        label: 'Temperature',
        data: list.map(item => Math.round(item.main.temp)),
        borderColor: 'rgba(255, 255, 255, 0.9)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBackgroundColor: 'rgba(255, 107, 107, 1)',
        pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Feels Like',
        data: list.map(item => Math.round(item.main.feels_like)),
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(255, 255, 255, 0.7)',
        pointBorderColor: 'rgba(255, 255, 255, 0.7)',
        pointHoverBackgroundColor: 'rgba(100, 181, 246, 1)',
        pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
});

// Chart options
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 14,
          weight: '600'
        },
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'rgba(255, 255, 255, 1)',
      bodyColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: {
        title: (context) => {
          return context[0].label;
        },
        label: (context) => {
          const label = context.dataset.label || '';
          const value = context.parsed.y;
          const unit = props.celsius ? '°C' : '°F';
          return `${label}: ${value}${unit}`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 11
        },
        maxRotation: 45,
        minRotation: 45
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 12
        },
        callback: function(value) {
          const unit = props.celsius ? '°C' : '°F';
          return value + unit;
        }
      }
    }
  }
}));

// Temperature cards data
const tempCards = computed(() => {
  return forecastList.value.filter((_, idx) => idx % 3 === 0).map(item => {
    const date = new Date(item.dt * 1000);
    return {
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
      humidity: item.main.humidity,
      weather: item.weather[0].description
    };
  });
});
</script>

<template>
  <div class="chart-container">
    <h3 class="chart-title">Temperature Forecast (3 Days)</h3>
    
    <div v-if="forecastList.length > 0" class="chart-wrapper">
      <!-- Chart.js Line Chart -->
      <div class="chart-canvas-wrapper">
        <Line :data="chartData" :options="chartOptions" />
      </div>
      
      <!-- Temperature cards -->
      <div class="temp-cards">
        <div 
          v-for="(card, i) in tempCards" 
          :key="'card-' + i"
          class="temp-card"
        >
          <div class="card-time">{{ card.time }}</div>
          <div class="card-date">{{ card.date }}</div>
          <div class="card-temp">{{ card.temp }}°</div>
          <div class="card-feels">Feels {{ card.feels_like }}°</div>
          <div class="card-weather">{{ card.weather }}</div>
          <div class="card-humidity">💧 {{ card.humidity }}%</div>
        </div>
      </div>
    </div>
    
    <div v-else class="no-data">
      <p>No forecast data available</p>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: hidden;
}

.chart-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.chart-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  min-height: 0;
}

/* Custom scrollbar */
.chart-wrapper::-webkit-scrollbar {
  width: 6px;
}

.chart-wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.chart-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

/* Chart Canvas Wrapper */
.chart-canvas-wrapper {
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.6s ease;
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

/* Temperature Cards */
.temp-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
  padding-bottom: 20px;
}

.temp-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideIn 0.5s ease-out backwards;
}

.temp-card:hover {
  transform: translateY(-5px) scale(1.02);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-time {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.95);
}

.card-date {
  font-size: 12px;
  opacity: 0.7;
  margin-bottom: 15px;
}

.card-temp {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-feels {
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 10px;
}

.card-weather {
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 8px;
  text-transform: capitalize;
  font-style: italic;
}

.card-humidity {
  font-size: 12px;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.no-data {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  font-size: 16px;
}

/* Responsive */
@media (max-width: 1200px) {
  .chart-canvas-wrapper {
    height: 350px;
  }
  
  .temp-cards {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

@media (max-width: 768px) {
  .chart-canvas-wrapper {
    height: 300px;
    padding: 15px;
  }
  
  .temp-cards {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
  
  .temp-card {
    padding: 15px;
  }
  
  .card-temp {
    font-size: 28px;
  }
}
</style>
