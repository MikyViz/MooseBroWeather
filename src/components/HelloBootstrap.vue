<template>
  <div class="container">
    <div class="bg-light p-5 rounded-lg">
      <h1 class="display-4">Bootstrap 5</h1>
      <p class="lead">Bootstrap v5 with Vue.js 3</p>
      <hr class="my-4">
      <p>Now running on native Vue.js 3</p>
      <button class="btn btn-primary" @click="showModal">Click me!</button>
      
      <!-- Bootstrap 5 Modal -->
      <div class="modal fade" ref="myModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Using Component Methods</h5>
              <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
              <h3>Hello From My Modal!</h3>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-danger" @click="hideModal">Close Me</button>
              <button type="button" class="btn btn-outline-warning" @click="toggleModal">Toggle Me</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const myModal = ref(null);
let modalInstance = null;

onMounted(() => {
  // Initialize Bootstrap modal
  if (myModal.value) {
    // Using native Bootstrap 5 Modal API
    modalInstance = new window.bootstrap.Modal(myModal.value);
  }
});

const showModal = () => {
  if (modalInstance) modalInstance.show();
};

const hideModal = () => {
  if (modalInstance) modalInstance.hide();
};

const toggleModal = () => {
  if (modalInstance) modalInstance.toggle();
};
</script>