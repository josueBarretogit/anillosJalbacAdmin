<script setup lang="ts">
import carta from "./../components/cartaAnillo.vue";

import { tabs } from "@/variables/store";
import solitariosView from "./solitariosView.vue";
import {
  anillosDataTable,
  colKey,
  numPages,
  page,
  updatePage,
} from "./scriptViews/nombreScript";
</script>

<template>
  <v-window v-model="tabs.tabs">
    <v-window-item value="anillos">
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
          <v-sheet v-if="anillosDataTable.length == 0">
            <h1>No hay datos</h1>
          </v-sheet>
          <v-col
            v-else
            v-for="anillo in anillosDataTable"
            class="d-flex justify-center flex-wrap"
          >
            <carta
              class="ml-5 mr-5"
              v-bind:anillo="anillo"
              :key="anillo.id"
              tipo="nombre"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>

    <v-window-item value="solitarios">
      <solitariosView />
    </v-window-item>

    <v-window-item value="dijes">
      <h1>ventana solitarios</h1>
    </v-window-item>
  </v-window>
</template>
