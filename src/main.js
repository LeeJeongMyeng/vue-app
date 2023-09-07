import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
//import {store} from "core-js/internals/reflect-metadata";
import store from './store/index'
import CKEditor from "@mayasabha/ckeditor4-vue3";


// 부트스트랩
// import BootstrapVue3 from "bootstrap-vue-3";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

//createApp(App).use(router).mount('#app')
const app = createApp(App)
app.config.globalProperties.axios=axios;
// app.use(router).use(store).use(BootstrapVue3).mount("#app");
app.use(router).use(store).use(CKEditor).mount("#app");
axios.defaults.baseURL='http://localhost:8081'

