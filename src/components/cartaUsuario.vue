<script setup lang="ts">
import type { Usuario } from "@/interfaces/interfaces";
import FormEliminar from "./formEliminar.vue";
import FormEditar from "./formEditar.vue";
import { ref, watch } from "vue";

import { dialogRequestExitoso, imageReplacing, tabs } from "@/variables/store";
import { useDisplay } from "vuetify/lib/framework.mjs";
defineProps<{
  usuario: Usuario;
  tipo: string;
}>();

const { xs } = useDisplay();
</script>

<template>
  <v-card :width="450" color="grey-darken-4">
    <v-avatar color="info">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-avatar>

    <v-row no-gutters>
      <v-col sm="4" md="6">
        <v-card-title class="titulo">Correo</v-card-title>
        <v-card-title class="titulo">Contrasena</v-card-title>
      </v-col>

      <v-col sm="4" md="6">
        <v-card-title class="subtitlo">{{ usuario?.correo }}</v-card-title>
        <v-card-title class="subtitlo">{{ usuario?.contrasena }}</v-card-title>
      </v-col>
    </v-row>

    <v-card-actions class="d-flex flex-wrap"> </v-card-actions>
  </v-card>
</template>

<style scoped>
.subtitlo {
  color: grey;
  display: block;
  widows: 100%;
}
</style>
