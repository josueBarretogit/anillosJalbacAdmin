<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { loggedState, tabs, searches } from "./../../variables/store";
import { drawer } from "./../../variables/store";
import ActionButtonsUsuario from "@/components/appBarComponents/actionButtonsUsuario.vue";
const { xs } = useDisplay();

const AppBarHeight = 64;
</script>

<template>
  <v-app-bar :extension-height="xs ? AppBarHeight : 0">
    <template v-slot:prepend>
      <v-btn
        v-if="loggedState.isLogged"
        @click="drawer.setDrawer(!drawer.drawer)"
        icon="mdi-menu"
      >
      </v-btn>
      <v-app-bar-title class="mr-5">Jalbac Admin</v-app-bar-title>
    </template>

    <div
      class="searchbar"
      v-if="loggedState.isLogged && !drawer.visitedUsuariosView"
    >
      <v-text-field
        clearable
        density="comfortable"
        variant="outlined"
        v-model="searches.searchTerm"
        prepend-inner-icon="mdi-magnify"
        single-line
        :label="`Buscar ${searches.placeholderSearchBar}`"
        hide-details
      ></v-text-field>
    </div>

    <div
      class="searchbar"
      v-if="loggedState.isLogged && drawer.visitedUsuariosView"
    >
      <v-text-field
        clearable
        density="comfortable"
        variant="outlined"
        v-model="searches.searchTermUsuario"
        prepend-inner-icon="mdi-magnify"
        single-line
        :label="`Buscar usuarios`"
        hide-details
      ></v-text-field>
    </div>

    <div
      v-if="loggedState.isLogged && !drawer.visitedUsuariosView"
      :class="xs ? 'd-none' : 'ml-5 mb-1'"
    >
      <v-tabs
        v-model="tabs.tabs"
        color="blue"
        show-arrows
        @update:model-value="searches.setPlaceHolderSearchBar(tabs.tabs)"
      >
        <v-tab value="nombres">Nombres</v-tab>
        <v-tab value="solitarios">solitarios</v-tab>
        <v-tab value="dijes">Dijes</v-tab>
      </v-tabs>
    </div>

    <ActionButtonsUsuario
      v-else-if="loggedState.isLogged && drawer.visitedUsuariosView"
      :class="xs ? 'd-none' : 'ml-5'"
    />

    <template v-slot:extension>
      <div
        class="d-flex justify-center w-100"
        v-if="loggedState.isLogged && !drawer.visitedUsuariosView"
      >
        <v-tabs
          v-model="tabs.tabs"
          color="blue"
          show-arrows
          center-active
          @update:model-value="searches.setPlaceHolderSearchBar(tabs.tabs)"
        >
          <v-tab value="nombres">Nombres</v-tab>
          <v-tab value="solitarios">solitarios</v-tab>
          <v-tab value="dijes">Dijes</v-tab>
        </v-tabs>
      </div>

      <div
        class="d-flex justify-center w-100"
        v-if="loggedState.isLogged && drawer.visitedUsuariosView"
      >
        <ActionButtonsUsuario :class="!xs ? 'd-none' : ''" />
      </div>
    </template>
  </v-app-bar>
</template>
<style scoped>
.searchbar {
  width: 400px;
  margin-right: 20px;
}
</style>
