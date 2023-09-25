import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
//import {store} from "core-js/internals/reflect-metadata";
import store from './store/index'
import CKEditor from "@mayasabha/ckeditor4-vue3";
import Cookies from "js-cookie";

// 부트스트랩
// import BootstrapVue3 from "bootstrap-vue-3";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

//createApp(App).use(router).mount('#app')
const app = createApp(App)
app.config.globalProperties.axios=axios;
// app.use(router).use(store).use(BootstrapVue3).mount("#app");
app.use(router).use(store).use(CKEditor).mount("#app");

//axios baseurl
axios.defaults.baseURL='http://localhost:8081'

//axios선수행
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
       // console.log("axios.interceptors.response.use : ", response);
       //  console.log("Request method:", response.config.method);
       //  console.log("Request URL:", response.config.url);
        return response;
    },
    function(error){
        console.log('axios.interceptors.response : ',error.response.data.message);
      
        if(error.response && error.response.status){
              // switch (error.response.status) {
              //   case 400:
              //     alert("400에러");
              //     break;
              //   case 401:
              //     alert("401에러");
              //     break;
              //   case 403:
              //     alert("사업자회원만 사용 가능합니다.");
              //     break;
              //   case 404:
              //     alert('404dpfj')
              //     break;
              //   case 405:
              //     alert("405 에러");
              //     break;
              //   case 406:
              //     alert(" 406에러 잠시 후 다시 시도해주세요.");
              //     break;
              //   case 500:
              //     alert("500에러 업로드 실패.");
              //     break;
              //   case 503:
              //     // ...
              //     break;
              // }
          alert(error.response.data.message);
        }
        return Promise.reject(new Error("Interceptor handled the error"));
    }
    
);

router.beforeEach(function (to, from, next) {
  // to : 이동할 url
  // from : 현재 url
  // next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
  axios.get("/ctg/account_check")
    .then((res) => {
        console.log('axios.router.beforeEach : ',res.data)
        if (res.data !== null && res.data !== "") {
          store.commit("setAccount", res.data);
        } else {
          store.commit("setAccount", null);
          store.dispatch("ctl_Log_Btn", false);
          sessionStorage.removeItem("user_id");
          Cookies.remove("token"); // 쿠키 삭제
        }
  })

    const requiresAuth = to.meta.requiresAuth !== undefined ? to.meta.requiresAuth : false;
    if (requiresAuth) {
      axios.post("/ctg/check-user-bn")
        .then((response) => {
          console.log("router beforeEach => ", response);
          if (response.data) {
            // 서버에서 true 반환 시
            next(); // 페이지 이동 허용
          } else {
            next(from); // 이전 컴포넌트로 이동
          }
        })
        .catch((error) => {
          console.log(error); // 에러 출력
          next(from); // 이전 컴포넌트로 이동
        });
    } else {
      // 인증이 필요하지 않은 페이지인 경우 그대로 진행
      next();
    }
        //위 if-else를 축약도 가능함
        // store.commit("setAccount", data || null);
  //next();
});