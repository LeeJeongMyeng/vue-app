import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
//import {store} from "core-js/internals/reflect-metadata";
import store from './store/index'


//createApp(App).use(router).mount('#app')
const app = createApp(App)
app.config.globalProperties.axios=axios;
app.use(router).use(store).mount('#app')
axios.defaults.baseURL='http://localhost:8080'


