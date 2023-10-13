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
        return config;
    },
    function(error){
        return Promise.reject(error);
    },
);


axios.interceptors.response.use(
    function(response){
        return response;
    },
    function(error){
      
        if(error.response && error.response.status){
          if (typeof error.response.data !== "string") {
            alert(error.response.data.message);
          } else {
            alert(error.response.data);
          }
              switch (error.response.status) {
                //서버로 요청이 전송되지만 잘못된 구문으로 서버가 이해하지 못할때
                // JSON형식이 잘못되었을 때
                case 400:
                  //alert("400에러");
                  break;
                //인증실패(로그인 유무)
                case 401:
                     store.commit("setAccount", null);
                    store.dispatch("ctl_Log_Btn", false);
                    sessionStorage.removeItem("user_id");

                  break;
                //권한없음
                case 403:
                  //alert("사업자회원만 사용 가능합니다.");
                  break;
                //요청페이지 부재
                case 404:
                  break;
                //GET/POST 접근 에러
                case 405:
                    router.push({
                      name: "errorPage",
                      params: { errorCode: 405, errorMessage: error.response.data.message }
                    });
                  break;
                //반환타입 에러 클라이언트요청JSON, 서버응답XML일경우 등
                case 406:
                    router.push({
                      name: "errorPage",
                      params: { errorCode: 500, errorMessage: error.response.data.message }
                    });
                  break;
                //서버내부에러(코드의버그, 예외처리 부재)
                case 500:
                   router.push("/common/error");
                  break;
                //일시적인 문제 혹은 과부화 등
                case 503:
                  // 잠시 후 다시 시도
                  break;
              }
         
        }
        return Promise.reject(new Error("Interceptor handled the error"));
    }
    
);

router.beforeEach(function (to, from, next) {
  // to : 이동할 url
  // from : 현재 url
  // next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
  if(store.state.user_id != null){
    axios.get("/ctg/account_check").then((res) => {
      if (res.data !== null && res.data !== "") {
        store.commit("setAccount", res.data);
        store.dispatch("ctl_Log_Btn", true);
      }
 });
  }
 
// 권한이 필요한 컴포넌트일경우
    const requiresAuth = to.meta.requiresAuth !== undefined ? to.meta.requiresAuth : false;
    if (requiresAuth) {
      axios.get("/ctg/check-user-bn")
        .then((response) => {
          if (response.data) {
            // 서버에서 true 반환 시
            next(); // 페이지 이동 허용
          }
        })
    } else {
      // 인증이 필요하지 않은 페이지인 경우 그대로 진행
      next();
    }
    
//로그인/로그아웃 페이지에 대해서 로그인 되어잇을경우 방지
    const check_Login = to.meta.check_Login !== undefined? to.meta.check_Login : false;
    if(check_Login){
      if (store.state.bool) {
        router.push({ name: "home" });
      }else{
        next();
      }  
    }
});

