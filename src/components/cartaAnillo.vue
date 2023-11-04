<script setup lang="ts">
import type { Anillo } from "@/interfaces/interfaces";
import FormEliminar from "./formEliminar.vue";
import FormEditar from "./formEditar.vue";
import FormCambiarImagen from "./../components/formCambiarImagen.vue";
import { ref, watch } from "vue";

import { dialogRequestExitoso, imageReplacing } from "@/variables/store";
import { useDisplay } from "vuetify/lib/framework.mjs";
defineProps<{
  anillo: Anillo;
  tipo: string;
}>();

const { xs } = useDisplay();
</script>

<template>
  <v-card :width="450" color="grey-darken-4">
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-img
          v-bind="props"
          v-bind:lazy-src="anillo?.foto"
          :height="400"
          cover
          :src="anillo?.foto"
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="blue"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>

          <v-overlay
            :model-value="
              isHovering ||
              (imageReplacing.isLoading &&
                anillo?.id == imageReplacing.idAnilloLoading)
            "
            contained
            scrim="#405cff"
            class="align-center justify-center"
          >
            <form-cambiar-imagen :id-anillo="anillo.id" />
          </v-overlay>
        </v-img>
      </template>
    </v-hover>

    <v-row no-gutters>
      <v-col sm="4">
        <v-card-title class="titulo">Peso oro</v-card-title>
        <v-card-title class="titulo">Peso plata</v-card-title>
        <v-card-title class="titulo">Tipo</v-card-title>
        <v-card-title class="titulo">Talla</v-card-title>
        <v-card-title class="titulo">Nombre</v-card-title>
        <v-card-title class="titulo">Referencia</v-card-title>
      </v-col>

      <v-col sm="4" md="6">
        <v-card-title class="subtitlo">{{ anillo?.pesoOro }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.pesoPlata }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.categoria }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.talla }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.nombre }}</v-card-title>
        <v-card-title class="subtitlo">{{ anillo?.referencia }}</v-card-title>
      </v-col>
    </v-row>

    <v-card-actions class="d-flex flex-wrap">
      <FormEditar :anillo="anillo" :tipo="tipo" />
      <FormEliminar v-bind:id="anillo?.id" token="token" :tipo="tipo" />
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
