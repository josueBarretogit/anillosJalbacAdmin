// Composables
import { createRouter, createWebHistory } from "vue-router";
import viewNombres from "@/views/nombresView.vue";
import defaultLayout from "@/layouts/default/DefaultLayout.vue";
import loginView from "@/views/LoginView.vue";
import UsuarioView from "@/views/usuariosView.vue";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const routes = [
  {
    path: "/",
    component: defaultLayout,
    children: [
      {
        path: "/login",
        name: "login",
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
      {
        path: "/usuarios",
        name: "usuarios",

        component: UsuarioView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const cookie = document.cookie.replace("accessCookie=", "");

  if (!cookie && to.name != "login") {
    return { name: "login" };
  }
});

export default router;
