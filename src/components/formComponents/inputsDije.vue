<script setup lang="ts">
import { FieldContext } from "vee-validate";
import { ref } from "vue";

defineProps<{
  alto: FieldContext;
  categoriaDije: FieldContext;
  ancho: FieldContext;
}>();
</script>
<template>
  <v-row no-gutters class="mt-3 mb-3">
    <v-col cols="12">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="categoriaDije.value.value as string"
        :error-messages="categoriaDije.errorMessage.value"
        label="Categoria"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row no-gutters class="mt-3 mb-3">
    <v-col cols="12" sm="6">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="ancho.value.value"
        :error-messages="ancho.errorMessage.value"
        label="Anchura (mm)"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="alto.value.value"
        :error-messages="alto.errorMessage.value"
        label="Altura (mm)"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
