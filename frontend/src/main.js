import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import VueAxios from 'vue-axios';

createApp(App).use(VueAxios, axios).use(router).mount('#app');
