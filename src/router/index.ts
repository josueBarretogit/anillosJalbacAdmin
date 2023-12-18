// Composables
import { createRouter, createWebHistory } from "vue-router";
import jwtDecode from "jwt-decode";
import useUsuarioApi from "@/services/usuariosapi";
import {
  authorization,
  drawer,
  loggedState,
  usuarioStore,
} from "@/variables/store";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/DefaultLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
      },
      {
        path: "viewNombres",
        name: "viewNombres",

        component: () => import("@/views/nombresView.vue"),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "usuarios",
        name: "usuarios",

        component: () => import("@/views/usuariosView.vue"),
      },
    ],
  },
];

async function redirectIfUserHasLogged() {
  try {
    const { refreshAuthorizationToken } = useUsuarioApi();
    const refreshedToken = await refreshAuthorizationToken();
    if (refreshedToken && (refreshedToken as number) != 401) {
      authorization.setAuthorizationToken(refreshedToken as string);
      const userData: {
        correo: string;
        rol: "Empleado" | "Administrador";
        id: number;
      } = jwtDecode(refreshedToken as string);

      loggedState.setToTrue();
      usuarioStore.setCorreo(userData.correo);
      usuarioStore.setRol(userData.rol);
      //router.push({ name: "viewNombres" });
      return true;
    } else {
      // router.push({ name: "login" });
      return false;
    }
  } catch (error) {
    return error;
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const isAuthenticated = await redirectIfUserHasLogged();

  if (!isAuthenticated && to.name != "login") {
    return { name: "login" };
  }

  if (to.name == "usuarios") {
    drawer.setVisitedUsuariosView(true);
  }
});

export default router;
