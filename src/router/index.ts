// Composables
import { createRouter, createWebHistory } from "vue-router";
import viewNombres from "@/views/nombresView.vue";
import defaultLayout from "@/layouts/default/DefaultLayout.vue";
import loginView from "@/views/LoginView.vue";
import UsuarioView from "@/views/usuariosView.vue";
import Cookies from "js-cookie";
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
