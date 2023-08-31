<script setup>
import { ref, inject } from 'vue';
const {getCurrentLocation} = inject("getLocation");
</script>

<template>
<span @click="getCurrentLocation" class="material-symbols-outlined pointer" >
my_location
</span>
</template>

<style scoped>
.pointer{
cursor: pointer;
}
</style>
