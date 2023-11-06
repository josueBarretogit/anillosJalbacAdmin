<script lang="ts" setup>
import { useFormEditar } from "./../customHooks/useFormEditar";
import InputsCrearEditar from "./formComponents/inputsCrearEditar.vue";
import DialogMensajeRequest from "./../components/dialogMensajeRequest.vue";
import { Anillo, Solitario } from "@/interfaces/interfaces";
import { dialogRequestExitoso } from "@/variables/store";
const props = defineProps<{
  tipo: string;
  anillo: Anillo & Solitario;
}>();

const {
  nombre,
  formaPiedra,
  tamanoPiedra,
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
  showRazonError,
  razonError,
} = useFormEditar(props.anillo, props.tipo);
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
              :forma-piedra="formaPiedra"
              :tamano-piedra="tamanoPiedra"
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
              <v-btn class="me-4" type="submit" color="blue">
                Editar anillo
              </v-btn>
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
  <DialogMensajeRequest
    v-if="dialogMensaje"
    :mensaje="`${tipo.slice(0, -1)} editado exitosamente`"
    :fallo="dialogRequestExitoso.fallo"
    :mensaje-error="`${dialogRequestExitoso.mensajeError}`"
  />
</template>
