import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/user/signIn",
    name: "SignIn",
    component: () => import("../views/User/SignIn.vue"),
  },
  {
    path: "/user/signUp",
    name: "signUp",
    component: () => import("../views/User/SignUp.vue"),
  },
  {
    path: "/ctg/reg_FleaMarketPage",
    name: "reg_FleaMarket",
    component: () => import("../views/FleaMarket/reg_FleaMarket.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/ctg/get_FleaMarket",
    name: "get_FleaMarket",
    component: () => import("../views/FleaMarket/get_FleaMarket.vue"),
  },
  {
    path: "/ctg/upt_FleaMarketPage",
    name: "upt_FleaMarket",
    component: () => import("../views/FleaMarket/upt_FleaMarket.vue"),
  },
  {
    path: "/ctg/Notic_Home",
    name: "Notic_Home",
    component: () => import("../views/Notic/NoticHome.vue"),
  },
  {
    path: "/ctg/get_Notic",
    name: "get_Notic",
    component: () => import("../views/Notic/get_Notic.vue"),
  },
  {
    path: "/ctg/my_List",
    name: "my_List",
    component: () => import("../views/User/my_List.vue"),
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: "/Common/Error",
    name: "errorPage",
    component: () => import("../views/Common/Error.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "errorPage" },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router

