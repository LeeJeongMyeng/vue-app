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
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/ListView.vue"),
  },
  {
    path: "/user/signIn",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/User/SignIn.vue"),
  },
  {
    path: "/user/signUp",
    name: "signUp",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/User/SignUp.vue"),
  },
  {
    path: "/user/editById",
    name: "UpdateView",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/UpdateView.vue"),
  },
  {
    path: "/user/Save",
    name: "CreateView",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/CreateView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
