<script setup lang="ts">
import { ref } from "vue";

async function cerrarSesion() {
  const response = await logOut();
  console.log(response);
}
import { logOut } from "./../../services/anilloApi";
import { loggedState } from "./../../variables/store";
</script>

<template>
  <v-app-bar color="grey-darken-4">
    <v-app-bar-title>Jalbac Admin</v-app-bar-title>

    <v-btn
      v-if="loggedState.isLogged"
      size="large"
      color="blue"
      prepend-icon="mdi-pen-plus"
    >
      Agregar Anillo
    </v-btn>
    <v-btn
      v-if="loggedState.isLogged"
      size="large"
      color="blue"
      prepend-icon="mdi-pen-plus"
      @click="cerrarSesion"
    >
      Cerrar sesion
    </v-btn>
  </v-app-bar>
</template>
