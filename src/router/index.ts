// Composables
import Cookies from "js-cookie";
import { loggedState } from "@/variables/store";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/LoginView.vue"),
      },
      {
        path: "/viewAnillos",
        name: "viewAnillos",

        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/AnillosView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const cookie = Cookies.get("refreshToken");
  const token = localStorage.getItem("accessToken");
  console.log(cookie);
  if (cookie && to.name !== "viewAnillos") {
    loggedState.setToken(token);
    loggedState.setCookie(cookie);
    return { name: "viewAnillos" };
  }
  if (!loggedState.cookie && to.name !== "Home") {
    console.log(cookie);
    return { name: "Home" };
  }
});
export default router;
