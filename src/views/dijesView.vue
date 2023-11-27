<script setup lang="ts">
import carta from "./../components/cartaAnillo.vue";
import { onMounted, watch } from "vue";
import { tabs, searches } from "@/variables/store";
import FormCrear from "@/components/formCrear.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useDataAnillos } from "@/customHooks/useDataNombres";
import { filterByTermDije, updateDatatableOnFilter } from "@/helpers/helpers";
const { xs } = useDisplay();

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

watch(
  () => searches.searchTerm,
  () => {
    updateDatatableOnFilter(
      anillosDataTable,
      anillosCopy as any[],
      filterByTermDije,
      totalItems,
      page,
      numPages,
      setNumPages,
    );
  },
);
</script>
<template>
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
      <v-sheet v-if="anillosDataTable.length == 0">
        <v-card-title>No hay datos</v-card-title>
      </v-sheet>
      <v-col
        v-else
        v-for="dije in anillosDataTable"
        class="d-flex justify-center flex-wrap"
      >
        <carta
          :class="!xs ? 'ml-5 mr-5' : ''"
          v-bind:anillo="dije"
          :key="dije.id"
          tipo="dijes"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
