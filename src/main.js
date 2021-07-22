import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true


store.dispatch('auth/me').then(() => {
	createApp(App).use(VueSweetalert2).use(store).use(router).mount('#app')	
})

