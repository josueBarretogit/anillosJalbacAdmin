<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormCrear from "./../../components/formCrear.vue";
import { logOut } from "./../../services/anilloApi";
import { loggedState, tabs } from "./../../variables/store";

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
const tab = ref(tabs.tabs);
tab.value = "solitarios";
</script>

<template>
  <v-app-bar>
    <v-sheet class="ma-2 pa-2 flex-grow-0">
      <v-app-bar-title>Jalbac Admin</v-app-bar-title>
    </v-sheet>
    <v-sheet class="ma-2 pa-2 flex-grow-1 d-flex justify-center">
      <v-tabs v-model="tab" color="blue" fixed-tabs>
        <v-tab value="anillos">Anillos</v-tab>
        <v-tab value="solitarios">Solitarios</v-tab>
        <v-tab value="Dijes">Dijes</v-tab>
      </v-tabs>
    </v-sheet>

    <v-sheet class="ma-2 pa-2">
      <FormCrear v-if="loggedState.isLogged" />

      <v-btn
        v-if="loggedState.isLogged"
        size="large"
        color="blue"
        prepend-icon="mdi-logout"
        @click="cerrarSesion"
      >
        Cerrar sesion
      </v-btn>
    </v-sheet>
  </v-app-bar>
</template>
