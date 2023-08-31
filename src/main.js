import './assets/main.css'

import Vue, { createApp } from '@vue/compat';
import App from './App.vue'
// import router from './router'
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const app = createApp(App)

Vue.use(BootstrapVue);

// app.use(router)

app.mount('#app')


