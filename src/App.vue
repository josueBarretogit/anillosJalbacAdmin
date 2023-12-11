<script setup lang="ts">
import { useRouter } from "vue-router";
import useUsuarioApi from "./services/usuariosapi";
import { authorization, usuarioStore } from "./variables/store";
import { onMounted } from "vue";
import jwtDecode from "jwt-decode";

const cookie = document.cookie.replace("accessCookie=", "");
const router = useRouter();
const { refreshAuthorizationToken } = useUsuarioApi();

async function redirectIfUserHasLogged() {
  if (cookie) {
    const refreshedToken = await refreshAuthorizationToken();
    authorization.setAuthorizationToken(refreshedToken as string);

    const userData: { correo: string; rol: string; id: number } = jwtDecode(
      refreshedToken as string,
    );
    usuarioStore.setCorreo(userData.correo);
    router.push({ name: "viewNombres" });
  }
}

onMounted(() => {
  redirectIfUserHasLogged();
});
</script>
<template>
  <router-view />
</template>
