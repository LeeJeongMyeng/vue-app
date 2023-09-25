import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
export default createStore({
  state: {
    bool: false,
    user_id: "",
    currentPage: 1,
    title: "",
    F_currentPage: 1,
    A_currentPage: 1,
  },
  //state값을 변경하는 로직
  mutations: {
    setAccount(state, payload) {
      console.log("mutations:", payload);
      state.user_id = payload;
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
    Plus_F_CurrentPage(state) {
      state.F_currentPage++;
    },
    Minus_F_CurrentPage(state) {
      state.F_currentPage--;
    },
    Plus_A_CurrentPage(state) {
      state.A_currentPage++;
    },
    Minus_A_CurrentPage(state) {
      state.A_currentPage--;
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
    Plus_F_CurrentPage: function (context) {
      return context.commit("Plus_F_CurrentPage");
    },
    Minus_F_CurrentPage: function (context) {
      return context.commit("Minus_F_CurrentPage");
    },
    Plus_A_CurrentPage: function (context) {
      return context.commit("Plus_A_CurrentPage");
    },
    Minus_A_CurrentPage: function (context) {
      return context.commit("Minus_A_CurrentPage");
    },
  },
  plugins: [
    createPersistedState({
      //주목! : 여기에 쓴 모듈만 저장됩니다.
      paths: [
        "bool",
        "user_id",
        "currentPage",
        "title",
        "F_currentPage",
        "A_currentPage",
      ],
    }),
  ],
});