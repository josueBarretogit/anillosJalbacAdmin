<script setup lang="ts">
import { drawer, loggedState, tabs, usuarioStore } from "@/variables/store";

import { logOut } from "@/services/anilloApi";
import { useRouter } from "vue-router";

const router = useRouter();

async function cerrarSesion() {
  const response = await logOut();
  drawer.setVisitedUsuariosView(false);
  if (response) {
    localStorage.removeItem("accessToken");
    loggedState.setToFalse();
    router.push({
      name: "Home",
    });
    tabs.tabs = "nombres";
  }
}

function goToUsuariosView() {
  router.push({
    name: "usuarios",
  });

  drawer.setVisitedUsuariosView(true);
}
</script>
<template>
  <v-navigation-drawer v-model="drawer.drawer" location="left" temporary>
    <v-list-item
      prepend-icon="mdi-account"
      :title="usuarioStore.UsuarioInterface.correo"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Cerrar sesión"
        @click="cerrarSesion"
      ></v-list-item>
      <v-list-item
        v-if="usuarioStore.UsuarioInterface.rol == 'Administrador'"
        prepend-icon="mdi-account-group"
        title="Usuarios"
        @click="goToUsuariosView"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
