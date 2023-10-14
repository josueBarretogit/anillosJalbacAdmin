<script setup lang="ts">
import carta from "./../components/cartaAnillo.vue";
import { ref } from "vue";
import { onMounted, watch } from "vue";
import { getAnillos } from "./../services/anilloApi";
import { loggedState } from "@/variables/store";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
let isLoading = ref(true);
let anillosinPage = ref();
let page = ref(1);
let totalItems = ref(6);
let numPages = ref(1);

const cookie = Cookies.get("refreshToken");
console.log(cookie);

loggedState.setToTrue();
onMounted(async () => {
  const ListAnillos = await getAnillos();
  let anillosCopy = ListAnillos;
  anillosinPage.value = anillosCopy?.slice(0, page.value * totalItems.value);

  numPages.value = Math.ceil(
    (ListAnillos?.length as number) / totalItems.value,
  ) as number;

  isLoading.value = false;
});

async function updatePage(index: number) {
  const ListAnillos = await getAnillos();
  let anillosCopy = ListAnillos;
  page.value = index;
  anillosinPage.value = anillosCopy?.slice(
    (page.value - 1) * totalItems.value,
    page.value * totalItems.value,
  );
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
              color="blue"
              prev-icon="mdi-menu-left"
              class="my-4"
              :length="numPages"
              @update:model-value="updatePage"
              :total-visible="5"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <template
    v-if="isLoading === true"
    class="d-flex justify-center align-center"
  >
    <div class="d-flex justify-center">
      <v-progress-circular
        :size="50"
        color="blue"
        indeterminate
      ></v-progress-circular>
    </div>
  </template>
  <v-container v-else class="">
    <v-row class="d-flex justify-center">
      <v-sheet v-if="anillosinPage.length == 0">
        <h1>No hay datos</h1>
      </v-sheet>
      <v-col
        v-else
        v-for="anillo in anillosinPage"
        class="d-flex justify-center flex-wrap"
      >
        <carta class="ml-5 mr-5" v-bind:anillo="anillo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
#inspire {
  background-color: rgb(0, 0, 0);
}
</style>
