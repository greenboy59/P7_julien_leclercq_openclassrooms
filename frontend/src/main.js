import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import VueAxios from 'vue-axios';
import store from './store'
import initAxios from '@/config/axios'

initAxios()
createApp(App).use(store).use(VueAxios, axios).use(router).mount('#app');
