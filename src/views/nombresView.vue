<script setup lang="ts">
import carta from "./../components/cartaAnillo.vue";
import { dataCopy, searches, tabs, usuarioStore } from "@/variables/store";
import FormCrear from "@/components/formCrear.vue";
import solitariosView from "./solitariosView.vue";
import { useDataAnillos } from "./../customHooks/useDataNombres";
import DialogMensajeRequest from "@/components/dialogMensajeRequest.vue";
import { imageReplacing } from "@/variables/store";
import { dialogRequestExitoso } from "@/variables/store";
import { useDisplay } from "vuetify/lib/framework.mjs";
import Drawer from "@/components/drawer.vue";
import { drawer } from "@/variables/store";
import jwtDecode from "jwt-decode";
import DijesView from "./dijesView.vue";
import { watch } from "vue";
import { filterByTerm, updateDatatableOnFilter } from "@/helpers/helpers";

const token = localStorage.getItem("accessToken");
const userData: { correo: string; rol: string; id: number } = jwtDecode(
  token as string,
);
usuarioStore.setCorreo(userData.correo);

const {
  anillosDataTable,
  colKey,
  numPages,
  page,
  updatePage,
  totalItems,
  anillosCopy,
  setNumPages,
} = await useDataAnillos(tabs.tabs);

const { xs } = useDisplay();

drawer.setDrawer(false);

watch(
  () => searches.searchTerm,
  () => {
    updateDatatableOnFilter(
      anillosDataTable,
      anillosCopy as any[],
      filterByTerm,
      totalItems,
      page,
      numPages,
      setNumPages,
    );
  },
);
</script>

<template>
  <v-window v-model="tabs.tabs" temporary>
    <Drawer />
    <v-window-item value="nombres">
      <div style="position: fixed; z-index: 2; right: 20px; bottom: 20px">
        <FormCrear :tipo="tabs.tabs" />
      </div>

      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  rounded="circle"
                  :key="colKey"
                  color="blue"
                  prev-icon="mdi-menu-left"
                  class="my-4"
                  :length="numPages"
                  @update:model-value="updatePage"
                  v-model="page"
                  :total-visible="5"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container class="">
        <v-row class="d-flex justify-center">
          <v-sheet v-if="anillosDataTable?.length == 0">
            <h1>No hay datos</h1>
          </v-sheet>
          <v-col
            v-else
            v-for="anillo in anillosDataTable"
            class="d-flex justify-center flex-wrap"
          >
            <carta
              :class="!xs ? 'ml-5 mr-5' : ''"
              v-bind:anillo="anillo"
              :key="anillo.id"
              tipo="nombres"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>

    <v-window-item value="solitarios">
      <solitariosView />
    </v-window-item>

    <v-window-item value="dijes">
      <DijesView />
    </v-window-item>
  </v-window>

  <DialogMensajeRequest
    v-if="imageReplacing.falloReplace"
    :mensaje="`Ocurrio el siguiente error`"
    :fallo="true"
    :mensaje-error="dialogRequestExitoso.mensajeError"
  />
</template>
