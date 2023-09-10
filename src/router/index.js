import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/user",
    name: "ListView",
    component: () => import("../views/ListView.vue"),
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
    path: "/ctg/reg_FleaMarket",
    name: "reg_FleaMarket",
    component: () => import("../views/FleaMarket/reg_FleaMarket.vue"),
  },
  {
    path: "/ctg/get_FleaMarket",
    name: "get_FleaMarket",
    component: () => import("../views/FleaMarket/get_FleaMarket.vue"),
  },
  {
    path: "/ctg/upt_FleaMarket",
    name: "upt_FleaMarket",
    component: () => import("../views/FleaMarket/upt_FleaMarket.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
