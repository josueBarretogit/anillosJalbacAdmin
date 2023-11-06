<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormCrear from "./../../components/formCrear.vue";
import { logOut } from "./../../services/anilloApi";
import { loggedState, tabs } from "./../../variables/store";

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
  <v-app-bar class="d-flex flex-wrap bg-white flex-column">
    <div class="ma-2 pa-2 flex-grow-0" style="width: 100px">
      <v-app-bar-title>Jalbac Admin</v-app-bar-title>
    </div>

    <div
      v-if="loggedState.isLogged"
      class="ma-2 pa-2 flex-grow-1 d-flex justify-center"
      style="width: 100px"
    >
      <v-tabs style="width: 500px" v-model="tabs.tabs" color="blue" show-arrows>
        <v-tab value="nombres">Nombres</v-tab>
        <v-tab value="solitarios">solitarios</v-tab>
        <v-tab value="dijes">Dijes</v-tab>
      </v-tabs>
    </div>

    <div class="ma-2 pa-2" style="width: 100px">
      <v-btn
        v-if="loggedState.isLogged"
        size="large"
        color="blue"
        prepend-icon="mdi-logout"
        @click="cerrarSesion"
      >
        Cerrar sesion
      </v-btn>
    </div>
  </v-app-bar>
</template>
