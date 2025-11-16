<script setup>
import { ref, defineEmits, watch } from 'vue'

const location = ref('')
const suggestions = ref([])
const showSuggestions = ref(false)
const isLoading = ref(false)
let debounceTimeout = null

const emit = defineEmits(['requiredLocation'])

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || ''

// Fetch city suggestions from OpenWeatherMap Geocoding API
const fetchCitySuggestions = async (query) => {
  if (!query || query.length < 2) {
    suggestions.value = []
    showSuggestions.value = false
    return
  }

  isLoading.value = true

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    )
    
    if (!response.ok) throw new Error('Failed to fetch suggestions')
    
    const data = await response.json()
    suggestions.value = data.map(item => ({
      name: item.name,
      country: item.country,
      state: item.state || '',
      lat: item.lat,
      lon: item.lon,
      fullName: `${item.name}${item.state ? ', ' + item.state : ''}, ${item.country}`
    }))
    showSuggestions.value = suggestions.value.length > 0
  } catch (error) {
    console.error('Error fetching city suggestions:', error)
    suggestions.value = []
    showSuggestions.value = false
  } finally {
    isLoading.value = false
  }
}

// Watch location input with debounce
watch(location, (newValue) => {
  clearTimeout(debounceTimeout)
  
  if (newValue.trim().length < 2) {
    suggestions.value = []
    showSuggestions.value = false
    return
  }
  
  debounceTimeout = setTimeout(() => {
    fetchCitySuggestions(newValue.trim())
  }, 300)
})

const selectCity = (city) => {
  location.value = city.fullName
  showSuggestions.value = false
  emit('requiredLocation', city.name)
  location.value = ''
}

const sendToParent = (e) => {
  e.preventDefault()
  if (location.value.trim()) {
    emit('requiredLocation', location.value.trim())
    location.value = ''
    showSuggestions.value = false
  }
}

const closeSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}
</script>

<template>
  <form @submit="sendToParent" class="search-form">
    <div class="search-container">
      <span class="material-symbols-outlined search-icon">search</span>
      <input 
        type="text" 
        v-model="location" 
        @blur="closeSuggestions"
        @focus="location.length >= 2 && suggestions.length > 0 ? showSuggestions = true : null"
        placeholder="Search city..." 
        class="search-input"
        autocomplete="off"
      />
      <button type="submit" class="search-btn">
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
      
      <!-- Suggestions Dropdown -->
      <div v-if="showSuggestions" class="suggestions-dropdown">
        <div v-if="isLoading" class="suggestion-item loading">
          <span class="mini-spinner"></span>
          <span>Loading...</span>
        </div>
        <div 
          v-else
          v-for="(city, index) in suggestions" 
          :key="index"
          @mousedown.prevent="selectCity(city)"
          class="suggestion-item"
        >
          <span class="material-symbols-outlined city-icon">location_on</span>
          <div class="city-info">
            <div class="city-name">{{ city.name }}</div>
            <div class="city-details">{{ city.state ? city.state + ', ' : '' }}{{ city.country }}</div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.search-form {
  flex: 1;
  max-width: 300px;
  position: relative;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 4px 4px 4px 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.search-container:focus-within {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.search-icon {
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  color: white;
  font-size: 15px;
  outline: none;
  padding: 8px 8px 8px 0;
  font-family: inherit;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  flex-shrink: 0;
}

.search-btn:hover {
  background: white;
  transform: scale(1.05);
}

.search-btn:active {
  transform: scale(0.95);
}

.search-btn .material-symbols-outlined {
  font-size: 20px;
  color: #667eea;
}

/* Suggestions Dropdown */
.suggestions-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;
  z-index: 1000;
  animation: slideDown 0.3s ease;
  max-height: 300px;
  overflow-y: auto;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.suggestions-dropdown::-webkit-scrollbar {
  width: 6px;
}

.suggestions-dropdown::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.suggestions-dropdown::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
  gap: 12px;
}

.suggestion-item:hover {
  background: rgba(102, 126, 234, 0.1);
}

.suggestion-item:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.suggestion-item.loading {
  justify-content: center;
  color: #667eea;
  cursor: default;
}

.suggestion-item.loading:hover {
  background: transparent;
}

.city-icon {
  font-size: 20px;
  color: #667eea;
  flex-shrink: 0;
}

.city-info {
  flex: 1;
  min-width: 0;
}

.city-name {
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
}

.city-details {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 600px) {
  .search-form {
    max-width: 100%;
  }
  
  .suggestions-dropdown {
    left: -10px;
    right: -10px;
  }
  
  .search-container {
    padding: 4px 4px 4px 12px;
  }
  
  .search-input {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .search-container {
    padding: 3px 3px 3px 10px;
  }
  
  .search-icon {
    font-size: 18px;
    margin-right: 6px;
  }
  
  .search-input {
    font-size: 13px;
    padding: 6px 6px 6px 0;
  }
  
  .search-btn {
    width: 32px;
    height: 32px;
  }
  
  .search-btn .material-symbols-outlined {
    font-size: 18px;
  }
  
  .suggestion-item {
    padding: 10px 12px;
  }
  
  .city-icon {
    font-size: 18px;
  }
  
  .city-name {
    font-size: 13px;
  }
  
  .city-details {
    font-size: 11px;
  }
}
</style>
