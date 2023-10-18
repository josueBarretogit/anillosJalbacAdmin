<script lang="ts" setup>
import { useFormEditar } from "./../customHooks/useFormEditar";

import DialogMensajeRequest from "./../components/dialogMensajeRequest.vue";
import { Anillo } from "@/interfaces/interfaces";

const props = defineProps<{
  tipo: string;
  anillo: Anillo;
}>();

const {
  nombre,
  pesoOro,
  pesoPlata,
  categoria,
  talla,
  referencia,
  submit,
  dialog,
  dialog2,
  smAndUp,
  cerrarFormularioCancelar,
} = useFormEditar(props.anillo);
</script>

<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        prepend-icon="mdi-pencil"
        color="blue"
        v-bind="props"
        rounded="xl"
        size="large"
      >
        Editar anillo
      </v-btn>
    </template>

    <v-card :width="smAndUp ? 650 : 320">
      <v-card-text>
        <form @submit.prevent="submit">
          <v-container>
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
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="categoria.value.value"
                  :error-messages="categoria.errorMessage.value"
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

            <div class="d-flex justify-center">
              <v-btn class="me-4" type="submit" color="blue">
                Editar anillo
              </v-btn>
            </div>
          </v-container>
        </form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <DialogMensajeRequest
    v-if="dialog2"
    :dialog-request2="dialog2"
    :mensaje="`${props.tipo} creado exitosamente`"
  />
</template>
