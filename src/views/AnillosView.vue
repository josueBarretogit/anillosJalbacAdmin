<script setup lang="ts">
import carta from "./../components/cartaAnillo.vue";
import { ref } from "vue";
import { onMounted, watch } from "vue";
import { getAnillos } from "./../services/anilloApi";
import { loggedState, creacionAnillos } from "@/variables/store";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

let isLoading = ref(true);
let anillosDataTable = ref();
let page = ref(1);
let totalItems = ref(6);
let numPages = ref(1);

loggedState.setToTrue();

const ListAnillos = await getAnillos();

watch(
  () => creacionAnillos.isCreated,
  async () => {
    isLoading.value = true;
    anillosCopy = await getAnillos();
    isLoading.value = false;
    page.value = 1;

    anillosDataTable.value = anillosCopy?.slice(
      (page.value - 1) * totalItems.value,
      page.value * totalItems.value,
    );

    numPages.value = Math.ceil(
      (anillosCopy?.length as number) / totalItems.value,
    ) as number;

    forceRender();
  },
);

let anillosCopy = ListAnillos;

anillosDataTable.value = anillosCopy?.slice(0, page.value * totalItems.value);

numPages.value = Math.ceil(
  (anillosCopy?.length as number) / totalItems.value,
) as number;

const colKey = ref(0);

const forceRender = () => {
  colKey.value = colKey.value + 1;
};

isLoading.value = false;

async function updatePage(index: number) {
  console.log(anillosCopy);
  page.value = index;
  anillosDataTable.value = anillosCopy?.slice(
    (page.value - 1) * totalItems.value,
    page.value * totalItems.value,
  );

  numPages.value = Math.ceil(
    (anillosCopy?.length as number) / totalItems.value,
  ) as number;
}

setTimeout(
  () => {
    window.location.reload();
  },
  1000 * 60 * 60 * 24,
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
      <v-sheet v-if="anillosDataTable.length == 0">
        <h1>No hay datos</h1>
      </v-sheet>
      <v-col
        v-else
        v-for="anillo in anillosDataTable"
        class="d-flex justify-center flex-wrap"
      >
        <carta class="ml-5 mr-5" v-bind:anillo="anillo" :key="anillo.id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
#inspire {
  background-color: rgb(0, 0, 0);
}
</style>
