<script lang="ts" setup>
import { FieldContext } from "vee-validate";
import InputsNombres from "./inputsNombres.vue";
import InputsSolitario from "./inputsSolitario.vue";
import InputsDije from "./inputsDije.vue";
import { tabs } from "@/variables/store";

defineProps<{
  tamanoPiedra: FieldContext;
  formaPiedra: FieldContext;
  nombre: FieldContext;
  categoria: FieldContext;
  categoriaDije: FieldContext;
  alto: FieldContext;
  ancho: FieldContext;
  talla: FieldContext;
}>();
</script>

<template>
  <InputsNombres
    v-if="tabs.tabs == 'nombres'"
    :nombre="nombre"
    :talla="talla"
    :categoria="categoria"
  />

  <InputsSolitario
    v-else-if="tabs.tabs == 'solitarios'"
    :forma-piedra="formaPiedra"
    :talla="talla"
    :tamano-piedra="tamanoPiedra"
  />

  <InputsDije
    v-else-if="tabs.tabs == 'dijes'"
    :alto="alto"
    :ancho="ancho"
    :categoria-dije="categoriaDije"
  />
</template>
