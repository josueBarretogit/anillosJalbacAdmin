<script setup lang="ts">
import carta from "./../components/cartaAnillo.vue";
import { ref } from "vue";
import { onMounted, watch } from "vue";
import { loggedState, creacionAnillos, tabs } from "@/variables/store";
import FormCrear from "@/components/formCrear.vue";
import { getAnillos } from "@/services/anilloApi";
import { table } from "console";

let isLoading = ref(true);
let solitariosDataTable = ref();
let page = ref(1);
let totalItems = ref(6);
let numPages = ref(1);

loggedState.setToTrue();

const listSolitarios = await getAnillos(tabs.tabs);

let solitariosCopy = listSolitarios;

solitariosDataTable.value = solitariosCopy?.slice(
  0,
  page.value * totalItems.value,
);

numPages.value = Math.ceil(
  (solitariosCopy?.length as number) / totalItems.value,
) as number;

const colKey = ref(0);

const forceRender = () => {
  colKey.value = colKey.value + 1;
};

isLoading.value = false;

async function updatePage(index: number) {
  console.log(solitariosCopy);
  page.value = index;
  solitariosDataTable.value = solitariosCopy?.slice(
    (page.value - 1) * totalItems.value,
    page.value * totalItems.value,
  );

  numPages.value = Math.ceil(
    (solitariosCopy?.length as number) / totalItems.value,
  ) as number;
}

setTimeout(
  () => {
    window.location.reload();
  },
  1000 * 60 * 60 * 24,
);

watch(
  () => creacionAnillos.isCreated,
  async () => {
    isLoading.value = true;
    solitariosCopy = await getAnillos(tabs.tabs);

    isLoading.value = false;
    page.value = 1;

    solitariosDataTable.value = solitariosCopy?.slice(
      (page.value - 1) * totalItems.value,
      page.value * totalItems.value,
    );

    numPages.value = Math.ceil(
      (solitariosCopy?.length as number) / totalItems.value,
    ) as number;

    forceRender();
  },
);
</script>
<template>
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
      <v-sheet v-if="solitariosDataTable.length == 0">
        <h1>No hay datos</h1>
      </v-sheet>
      <v-col
        v-else
        v-for="solitario in solitariosDataTable"
        class="d-flex justify-center flex-wrap"
      >
        <carta
          class="ml-5 mr-5"
          v-bind:anillo="solitario"
          :key="solitario.id"
          :tipo="tabs.tabs"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
