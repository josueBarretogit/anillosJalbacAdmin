<script setup lang="ts">
import { FieldContext } from "vee-validate";
import { ref } from "vue";

defineProps<{
  referencia: FieldContext | undefined;
  talla: FieldContext | undefined;
  pesoOro: FieldContext | undefined;
  pesoPlata: FieldContext | undefined;
  categoria: FieldContext | undefined;
  nombre: FieldContext | undefined;
}>();

const categoriaSelect = ref(["Nombre", "Argolla"]);
</script>
<template>
  <v-row no-gutters class="mt-3 mb-3">
    <v-col cols="12" sm="6">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="nombre.value.value"
        :error-messages="nombre.errorMessage.value"
        label="nombre"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-select
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="categoria.value.value as string"
        :error-messages="categoria.errorMessage.value"
        :items="categoriaSelect"
        label="Categoria"
      ></v-select>
    </v-col>
  </v-row>
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
    <v-col cols="12" sm="6">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="referencia.value.value"
        :error-messages="referencia.errorMessage.value"
        label="Referencia"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="talla.value.value"
        :error-messages="talla.errorMessage.value"
        label="Talla"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
