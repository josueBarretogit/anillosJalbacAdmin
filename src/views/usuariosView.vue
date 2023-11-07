<script setup lang="ts">
import { watch } from "vue";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { usuario } from "@/variables/store";
import { getUsuarios } from "@/services/usuariosapi";
import FormCrear from "@/components/formCrear.vue";
import CartaUsuario from "@/components/cartaUsuario.vue";
import router from "@/router";

const { xs } = useDisplay();
const isLoading = ref(true);
const usuarioDataTable = ref<any[]>();
const colKey = ref(0);

usuarioDataTable.value = await getUsuarios();

isLoading.value = false;

const forceRender = () => {
  colKey.value = colKey.value + 1;
};

watch(
  () => usuario.isCreated,
  async () => {
    isLoading.value = true;
    usuarioDataTable.value = await getUsuarios();
    isLoading.value = false;

    forceRender();
  },
);
</script>
<template>
  <div style="position: fixed; z-index: 2; left: 20px; bottom: 20px">
    <v-btn
      color="blue-darken-1"
      variant="tonal"
      @click="
        router.push({
          name: 'viewNombres',
        })
      "
    >
      Regresar
    </v-btn>
  </div>

  <div style="position: fixed; z-index: 2; right: 20px; bottom: 20px">
    <FormCrear tipo="usuarios" />
  </div>

  <v-container class="">
    <v-row class="d-flex justify-center">
      <v-col
        v-for="usuario in usuarioDataTable"
        class="d-flex justify-center flex-wrap"
      >
        <CartaUsuario
          :class="!xs ? 'ml-5 mr-5' : ''"
          v-bind:usuario="usuario"
          :key="usuario.id"
          tipo="usuarios"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
