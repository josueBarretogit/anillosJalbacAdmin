<script setup lang="ts">
import type { Usuario } from "@/interfaces/interfaces";
import FormEliminar from "./formEliminar.vue";
import FormEditar from "./formEditar.vue";
import { ref, watch } from "vue";
import { dialogRequestExitoso, imageReplacing, tabs } from "@/variables/store";
import { useDisplay } from "vuetify/lib/framework.mjs";
import FormCrearUsuario from "./usuariosComponents/formCrearUsuario.vue";

defineProps<{
  usuario: Usuario;
}>();
</script>

<template>
  <v-card :width="450" color="grey-darken-4">
    <v-avatar color="info">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-avatar>

    <v-row no-gutters>
      <v-col sm="4" md="6">
        <v-card-title class="titulo">Correo</v-card-title>
        <v-card-title class="titulo">Rol</v-card-title>
        <v-card-title class="titulo">Estado</v-card-title>
      </v-col>

      <v-col sm="4" md="6">
        <v-card-title class="subtitlo">{{ usuario?.correo }}</v-card-title>
        <v-card-title class="subtitlo">{{ usuario?.rol }}</v-card-title>
        <v-card-title class="subtitlo">{{
          usuario?.estado ? "Activo" : "Inactivo"
        }}</v-card-title>
      </v-col>
    </v-row>

    <v-card-actions class="d-flex flex-wrap">
      <v-btn color="red" variant="elevated">Desactivar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.subtitlo {
  color: grey;
  display: block;
  widows: 100%;
}
</style>
