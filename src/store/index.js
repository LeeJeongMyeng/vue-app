import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
export default createStore({
  state: {
    bool: false,
    member: "",
    member2:{
      userno:202020
    }
  },
  //state값을 변경하는 로직
  mutations: {
    setAccount(state, payload) {
      console.log("mutations:", payload);
      state.member = payload;
      // state.bool = payload.bool;
    },
    ctl_Log_Btn(state, payload) {
      state.bool = payload;
    },
  },
  actions: {
    //state에 저장
    setAccount: function (context, payload) {
      console.log(Context, payload);
      return context.commit("setAccount", payload);
    },
    //bool저장
    ctl_Log_Btn: function (context, payload) {
      return context.commit("ctl_Log_Btn", payload);
    },
  },
  plugins: [
    createPersistedState({
      //주목! : 여기에 쓴 모듈만 저장됩니다.
      paths: ["bool", "member"],
    }),
  ],
});