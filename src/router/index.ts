import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
// import Tickets from "@/pages/Tickets.vue";
// import TicketDetails from "@/pages/TicketDetails.vue";
// import Login from "@/pages/Login.vue";
// import NotFound from "@/pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  //     path: "/login",
  //     name: "Login",
  //     component: Login,
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
