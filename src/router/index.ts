// Composables
import Cookies from "js-cookie";
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
        meta: {
          isLogged: false,
        },
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

router.beforeEach(async (to, from) => {
  const cookie = Cookies.get("refreshToken");
  const token = localStorage.getItem("accessToken");
  console.log(cookie);
  if (!cookie && to.name !== "Home") {
    return { name: "Home" };
  }
});
export default router;
