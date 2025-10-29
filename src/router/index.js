import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";

import Signup from "../pages/Signup.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import TicketPage from "../pages/TicketPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: TicketPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
