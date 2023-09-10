import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
export default createStore({
  state: {
    bool: false,
    member: "",
    currentPage: 1,
    title:''
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
    PlusCurrentPage(state) {
      state.currentPage++;
    },
    MinusCurrentPage(state) {
      state.currentPage--;
    },
    ResetCurrentPage(state) {
      state.currentPage = 1;
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
    PlusCurrentPage: function (context) {
      return context.commit("PlusCurrentPage");
    },
    MinusCurrentPage: function (context) {
      return context.commit("MinusCurrentPage");
    },
    ResetCurrentPage: function (context) {
      return context.commit("ResetCurrentPage");
    },
  },
  plugins: [
    createPersistedState({
      //주목! : 여기에 쓴 모듈만 저장됩니다.
      paths: ["bool", "member", "currentPage","title"],
    }),
  ],
});