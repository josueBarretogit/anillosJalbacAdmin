<script setup lang="ts">
import { loggedState, tabs } from "./../../variables/store";
import { drawer } from "./../../variables/store";
</script>

<template>
  <v-app-bar class="d-flex justify-space-around">
    <div class="ma-2 pa-2">
      <v-app-bar-title>Jalbac Admin</v-app-bar-title>
    </div>

    <div
      v-if="loggedState.isLogged"
      class="ma-2 pa-2 d-flex justify-center"
      style="width: 400px"
    >
      <v-tabs v-model="tabs.tabs" color="blue" show-arrows>
        <v-tab value="nombres">Nombres</v-tab>
        <v-tab value="solitarios">solitarios</v-tab>
        <v-tab value="dijes">Dijes</v-tab>
      </v-tabs>
    </div>
    <div class="d-flex justify-center align-center" v-if="loggedState.isLogged">
      <v-btn @click="drawer.setDrawer(!drawer.drawer)" icon="mdi-menu"> </v-btn>
    </div>
  </v-app-bar>
  <v-app-bar class="d-none justify-space-around">
    <div class="d-flex justify-center align-center" v-if="loggedState.isLogged">
      <v-btn @click="drawer.setDrawer(!drawer.drawer)" icon="mdi-menu"> </v-btn>
    </div>
  </v-app-bar>
</template>

<!--<v-btn size="large" color="blue" icon="mdi-menu" @click="cerrarSesion">-->
