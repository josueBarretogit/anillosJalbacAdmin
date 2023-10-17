// Composables
import { createRouter, createWebHistory } from "vue-router";
import viewNombres from "@/views/nombresView.vue";
import defaultLayout from "@/layouts/default/DefaultLayout.vue";
import loginView from "@/views/LoginView.vue";

const routes = [
  {
    path: "/",
    component: defaultLayout,
    children: [
      {
        path: "/login",
        name: "Home",
        component: loginView,
      },
      {
        path: "/viewNombres",
        name: "viewNombres",

        component: viewNombres,

        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const token = localStorage.getItem("accessToken");
  if (!token && to.name != "Home") {
    return { name: "Home" };
  }
});

export default router;
