<script setup lang="ts">
import { drawer, loggedState, usuario } from "@/variables/store";

import { logOut } from "@/services/anilloApi";
import { useRouter } from "vue-router";

const router = useRouter();
async function cerrarSesion() {
  const response = await logOut();
  console.log(response);
  if (response) {
    localStorage.removeItem("accessToken");
    loggedState.setToFalse();
    router.push({
      name: "Home",
    });
  }
}
</script>
<template>
  <v-navigation-drawer v-model="drawer.drawer" location="right">
    <v-list-item
      prepend-icon="mdi-account"
      :title="usuario.correo"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Cerrar sesión"
        @click="cerrarSesion"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="About"
        value="about"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
