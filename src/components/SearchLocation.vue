<script setup>
import { defineProps, ref, defineEmits } from 'vue'

const location = ref('')

const emit = defineEmits()
const sendToParent = () => {
  emit('requiredLocation', { location: location.value })
}
</script>

<template>
  <form>
    <input type="text" v-model="location" placeholder="Search location" class="btn" />
    <button class="btn" @click="sendToParent">Search</button>
  </form>
</template>

<style scoped>
.btn {
  color: rgb(203, 192, 239);
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
  background-color: rgb(82, 82, 129);
  font-size: 18px;
}
</style>
