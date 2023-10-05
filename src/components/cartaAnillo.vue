
<script setup lang="ts">
import type { Anillo } from '@/interfaces/interfaces';
import FormEliminar from './formEliminar.vue'
import { ref } from 'vue'
defineProps<{
  anillo: Anillo | undefined
}>()
let dialog = ref(false)
</script>

<template>
  <v-card width="400" color="grey-darken-4">

    <v-img
      src="https://www.ifshe.com/cdn/shop/products/personalised-ring-promise-ring-3d-2-name-ring-with-2-birthstones-rose-gold_f1b11e76-444d-4bd9-8aa3-7be9a65d187e_720x.jpg?v=1660544987"
      cover></v-img>

    <v-row no-gutters>

      <v-col cols="12" sm="6">
        <v-card-title class="titulo">Peso</v-card-title>
        <v-card-title class="titulo">Tipo</v-card-title>
        <v-card-title class="titulo">Talla</v-card-title>
        <v-card-title class="titulo">Nombre</v-card-title>
        <v-card-title class="titulo">Referencia</v-card-title>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card-title class="subtitlo">{{ anillo?.pesos[0].pesoOro }}</v-card-title>
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
