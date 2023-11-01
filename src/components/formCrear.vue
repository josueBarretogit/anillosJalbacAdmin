<script lang="ts" setup>
import { useFormCrear } from "./../customHooks/useFormCrear";
import InputsCrearEditar from "./formComponents/inputsCrearEditar.vue";
import DialogMensajeRequest from "./../components/dialogMensajeRequest.vue";
import { ref } from "vue";
import { dialogRequestExitoso } from "./../variables/store";

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
            <InputsCrearEditar
              :categoria="categoria"
              :nombre="nombre"
              :referencia="referencia"
              :talla="talla"
              :peso-oro="pesoOro"
              :peso-plata="pesoPlata"
            />
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
    :mensaje="`${tipo} creado exitosamente`"
    :fallo="true"
    :mensaje-error="'eso dio algo malo'"
  />
</template>
