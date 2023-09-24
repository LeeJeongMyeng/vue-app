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

axios.interceptors.request.use(
    function(config){
        console.log(config)
        return config;
    },
    function(error){
        console.log(error)
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    function(response){
        console.log(response);
        return response;
    },
    function(error){
        console.log(error);
        if(error.response && error.response.status){
              switch (error.response.status) {
                case 503:
                  // ...
                  break;
                case 400:
                  alert('400에러')
                  break;
                case 401:
                  logout();
                  break;
                case 404:
                  alert("404 에러");
                  break;
                case 405:
                   alert("405 에러");
                  break;
                case 406:
                  alert(" 406에러 잠시 후 다시 시도해주세요.");
                  break;
                case 500:
                  alert("500에러 업로드 실패.");
                  break;
              }

        }
        return Promise.reject(new Error("Interceptor handled the error"));
    }
);
