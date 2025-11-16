<script setup>
import { inject } from 'vue';
const { getCurrentLocation } = inject("getLocation");
</script>

<template>
  <button @click="getCurrentLocation" class="location-btn" title="Use my location">
    <span class="material-symbols-outlined">my_location</span>
  </button>
</template>

<style scoped>
.location-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  margin: 0 auto 20px;
}

.location-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.location-btn:active {
  transform: scale(0.95);
}

.location-btn .material-symbols-outlined {
  color: white;
  font-size: 24px;
}
</style>
