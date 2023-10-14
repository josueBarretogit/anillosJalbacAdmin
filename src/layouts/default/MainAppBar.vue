<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormCrear from "./../../components/formCrear.vue";
import { logOut } from "./../../services/anilloApi";
import { loggedState } from "./../../variables/store";

const token = localStorage.getItem("accessToken");
const router = useRouter();
async function cerrarSesion() {
  const response = await logOut(token);
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
  <v-app-bar color="grey-darken-4">
    <v-app-bar-title>Jalbac Admin</v-app-bar-title>

    <FormCrear v-if="loggedState.isLogged" />
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
