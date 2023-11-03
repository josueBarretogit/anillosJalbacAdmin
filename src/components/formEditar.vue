<script lang="ts" setup>
import { useFormEditar } from "./../customHooks/useFormEditar";
import InputsCrearEditar from "./formComponents/inputsCrearEditar.vue";
import DialogMensajeRequest from "./../components/dialogMensajeRequest.vue";
import { Anillo } from "@/interfaces/interfaces";
import { dialogRequestExitoso } from "@/variables/store";
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
  dialogMensaje,
  smAndUp,
  cerrarFormularioCancelar,
  isLoading,
} = useFormEditar(props.anillo);
</script>

<template>
  <v-dialog v-model="dialog" persistent width="auto" scrim="#000000">
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
            <InputsCrearEditar
              :categoria="categoria"
              :nombre="nombre"
              :referencia="referencia"
              :talla="talla"
              :peso-oro="pesoOro"
              :peso-plata="pesoPlata"
            />
            <div v-if="isLoading" class="ma-4 d-flex justify-center">
              <v-progress-circular
                :size="50"
                indeterminate
                color="blue"
              ></v-progress-circular>
            </div>
            <div class="d-flex justify-center">
              <v-btn class="me-4" type="submit" color="blue" @click="">
                Editar anillo
              </v-btn>
            </div>
          </v-container>
        </form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="cerrarFormularioCancelar"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
