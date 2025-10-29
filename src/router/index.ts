import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
// import Tickets from "@/pages/Tickets.vue";
// import TicketDetails from "@/pages/TicketDetails.vue";

// import NotFound from "@/pages/NotFound.vue";

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
  //   {
  //     path: "/tickets",
  //     name: "Tickets",
  //     component: Tickets,
  //   },
  //   {
  //     path: "/tickets/:id",
  //     name: "TicketDetails",
  //     component: TicketDetails,
  //     props: true, // allows access to the :id param as a prop
  //   },

  //   {
  //     path: "/:pathMatch(.*)*",
  //     name: "NotFound",
  //     component: NotFound,
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
