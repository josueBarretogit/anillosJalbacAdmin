<script setup lang="ts">
import type { Usuario } from "@/interfaces/interfaces";
import { watch } from "vue";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { drawer, usuarioStore } from "@/variables/store";
import { getUsuarios } from "@/services/usuariosapi";
import FormCrearUsuario from "@/components/usuariosComponents/formCrearUsuario.vue";
import CartaUsuario from "@/components/cartaUsuario.vue";
import Drawer from "@/components/drawer.vue";

const { xs } = useDisplay();
const isLoading = ref(true);
const usuarioDataTable = ref<any[]>();
const colKey = ref(0);

usuarioDataTable.value = await getUsuarios();

console.log(usuarioDataTable.value);
isLoading.value = false;

const forceRender = () => {
  colKey.value = colKey.value + 1;
};

watch(
  () => usuarioStore.isRegistered,
  async () => {
    isLoading.value = true;
    usuarioDataTable.value = await getUsuarios();

    isLoading.value = false;

    forceRender();
  },
);
</script>
<template>
  <v-container class="">
    <Drawer />

    <div style="position: fixed; z-index: 2; right: 20px; bottom: 20px">
      <FormCrearUsuario />
    </div>

    <v-row class="d-flex justify-center">
      <v-col
        v-for="usuario in usuarioDataTable"
        class="d-flex justify-center flex-wrap"
      >
        <CartaUsuario
          :class="!xs ? 'ml-4 mr-5' : ''"
          v-bind:usuario="usuario"
          :key="usuario.id"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
