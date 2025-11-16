<script setup>
import { ref, defineEmits } from 'vue'

const location = ref('')

const emit = defineEmits(['requiredLocation'])

const sendToParent = (e) => {
  e.preventDefault();
  if (location.value.trim()) {
    emit('requiredLocation', location.value.trim());
    location.value = '';
  }
}
</script>

<template>
  <form @submit="sendToParent" class="search-form">
    <div class="search-container">
      <span class="material-symbols-outlined search-icon">search</span>
      <input 
        type="text" 
        v-model="location" 
        placeholder="Search city..." 
        class="search-input"
      />
      <button type="submit" class="search-btn">
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  </form>
</template>

<style scoped>
.search-form {
  flex: 1;
  max-width: 300px;
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

@media (max-width: 600px) {
  .search-form {
    max-width: 100%;
  }
}
</style>
