<script setup lang="ts">
import { FieldContext } from "vee-validate";

defineProps<{
  formaPiedra: FieldContext;
  tamanoPiedra: FieldContext;
  talla: FieldContext;
}>();
</script>
<template>
  <v-row no-gutters class="mt-3 mb-3">
    <v-col cols="12">
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
  <v-row no-gutters class="mt-3 mb-3">
    <v-col cols="12" sm="6">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="formaPiedra.value.value"
        :error-messages="formaPiedra.errorMessage.value"
        label="Forma piedra "
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="tamanoPiedra.value.value"
        :error-messages="tamanoPiedra.errorMessage.value"
        label="Tamaño piedra (mm)"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
