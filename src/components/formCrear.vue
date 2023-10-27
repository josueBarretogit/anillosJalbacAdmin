<script lang="ts" setup>
import { useFormCrear } from "./../customHooks/useFormCrear";

import DialogMensajeRequest from "./../components/dialogMensajeRequest.vue";

defineProps<{
  tipo: string;
}>();

const {
  nombre,
  pesoOro,
  pesoPlata,
  categoria,
  talla,
  referencia,
  imagen,
  submit,
  dialog,
  dialog2,
  smAndUp,
  cerrarFormularioCancelar,
  isLoading,
  razonError,
  showRazonError,
} = useFormCrear();
</script>

<template>
  <v-dialog v-model="dialog" persistent width="auto" scrim="#000000">
    <template v-slot:activator="{ props }">
      <v-btn
        color="blue"
        v-bind="props"
        prepend-icon="mdi-plus"
        rounded="xl"
        size="large"
      >
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
            <v-row no-gutters justify="center" class="mt-3 mb-3">
              <v-col>
                <v-file-input
                  accept="image/*"
                  class="ml-4 mr-4"
                  clearable
                  show-size
                  label="Imagen"
                  color="blue"
                  variant="outlined"
                  v-model="imagen.value.value"
                  :error-messages="imagen.errorMessage.value"
                ></v-file-input>
              </v-col>
            </v-row>
            <div class="d-flex justify-center">
              <v-btn class="me-4" type="submit" color="blue">
                Crear anillo
              </v-btn>
            </div>
          </v-container>
          <div v-if="isLoading" class="ma-4 d-flex justify-center">
            <v-progress-circular
              :size="50"
              indeterminate
              color="blue"
            ></v-progress-circular>
          </div>
          <div class="ma-4 d-flex justify-center">
            <v-alert
              style="max-width: 320px"
              type="error"
              v-model="showRazonError"
              variant="tonal"
              closable
              close-label="Cerrar"
              title="Error"
              border="top"
            >
              {{ razonError }}
            </v-alert>
          </div>
        </form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="cerrarFormularioCancelar"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <DialogMensajeRequest
    v-if="dialog2"
    :dialog-request2="dialog2"
    :mensaje="`${tipo} creado exitosamente`"
  />
</template>
