import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../services/supabase";

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
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (to.meta.requiresAuth && !user) {
    return "/";
  }

  if (to.name === "auth" && user) {
    return "/dashboard";
  }
});

export default router;