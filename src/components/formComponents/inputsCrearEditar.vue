<script setup lang="ts">
import { FieldContext } from "vee-validate";
import { ref } from "vue";
import Inputs from "./inputs.vue";

defineProps<{
  referencia: FieldContext;
  talla: FieldContext;
  pesoOro: FieldContext;
  pesoPlata: FieldContext;
  tamanoPiedra: FieldContext;
  formaPiedra: FieldContext;
  categoria: FieldContext;
  categoriaDije: FieldContext;
  alto: FieldContext;
  ancho: FieldContext;
  nombre: FieldContext;
}>();
</script>

<template>
  <Inputs
    :categoria-dije="categoriaDije"
    :alto="alto"
    :ancho="ancho"
    :talla="talla"
    :tamano-piedra="tamanoPiedra"
    :categoria="categoria"
    :nombre="nombre"
    :forma-piedra="formaPiedra"
  />

  <v-row no-gutters class="mt-3 mb-3">
    <v-col cols="12" sm="6">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="pesoOro.value.value"
        :error-messages="pesoOro.errorMessage.value"
        label="Peso oro"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="pesoPlata.value.value"
        :error-messages="pesoPlata.errorMessage.value"
        label="Peso plata"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row no-gutters class="mt-3 mb-3">
    <v-col cols="12">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="referencia.value.value"
        :error-messages="referencia.errorMessage.value"
        label="Referencia"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
