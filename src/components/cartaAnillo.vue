<script setup lang="ts">
import type { Anillo } from "@/interfaces/interfaces";
import FormEliminar from "./formEliminar.vue";
defineProps<{
  anillo: Anillo | undefined;
}>();
</script>

<template>
  <v-card width="400" color="grey-darken-4">
    <v-img v-bind:src="`http://localhost:4000/${anillo?.foto}`" cover></v-img>

    <v-row no-gutters>
      <v-col sm="6">
        <v-card-title class="titulo">Peso oro</v-card-title>
        <v-card-title class="titulo">Peso plata</v-card-title>
        <v-card-title class="titulo">Tipo</v-card-title>
        <v-card-title class="titulo">Talla</v-card-title>
        <v-card-title class="titulo">Nombre</v-card-title>
        <v-card-title class="titulo">Referencia</v-card-title>
      </v-col>

      <v-col sm="6">
        <v-card-title class="subtitlo">{{ anillo?.pesoOro }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.pesoPlata }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.categoria }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.talla }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.nombre }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.referencia }}</v-card-title>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-btn rounded="xl" color="blue">Editar</v-btn>
      <form-eliminar />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.subtitlo {
  color: grey;
}
</style>
