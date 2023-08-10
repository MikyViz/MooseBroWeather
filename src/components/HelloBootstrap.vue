<template>
  <div class="container">
    <b-jumbotron header="Bootstrap-Vue" lead="Bootstrap v4 Components for Vue.js 2">
      <p>Now running on @vue/compat and Vue.js 3</p>
      <b-button variant="primary" @click="showModal"> Click me! </b-button>
      <b-modal ref="my-modal" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
          <h3>Hello From My Modal!</h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
        <b-button class="mt-2" variant="outline-warning" block @click="toggleModal"
          >Toggle Me</b-button
        >
      </b-modal>
    </b-jumbotron>
  </div>
</template>
<script>
// import { BIcon, BIconCamera } from 'bootstrap-vue'
export default {
  methods: {
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    toggleModal() {
      this.$refs['my-modal'].toggle()
    }
  }
}
</script>
