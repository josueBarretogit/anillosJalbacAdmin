// Composables
import Cookies from "js-cookie";
import { loggedState } from "@/variables/store";
import { createRouter, createWebHistory } from "vue-router";
import viewAnillos from "@/views/AnillosView.vue";
import defaultLayout from "@/layouts/default/DefaultLayout.vue";
import loginView from "@/views/LoginView.vue";

const routes = [
  {
    path: "/",
    component: defaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: loginView,
      },
      {
        path: "/viewAnillos",
        name: "viewAnillos",

        component: viewAnillos,
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
