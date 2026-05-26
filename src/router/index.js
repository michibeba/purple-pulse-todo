import { createRouter, createWebHistory } from "vue-router";

import AuthPage from "../pages/AuthPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";

const routes = [
  {
    path: "/",
    name: "auth",
    component: AuthPage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;