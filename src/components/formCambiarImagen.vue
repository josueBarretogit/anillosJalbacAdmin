<script setup lang="ts">
import { useCambiarImagen } from "@/customHooks/useCambiarImagen";
import DialogMensajeRequest from "./dialogMensajeRequest.vue";
import { dialogRequestExitoso } from "@/variables/store";
const props = defineProps<{
  idAnillo: number;
}>();
const {
  clickInput,
  submitImage,
  imagen,
  isLoading,
  dialogMensaje,
  razonError,
} = useCambiarImagen(props.idAnillo);
</script>
<template>
  <div>
    <v-file-input
      accept="image/*"
      clearable
      show-size
      label="Imagen"
      color="blue"
      variant="outlined"
      @update:model-value="submitImage($event, idAnillo)"
      v-model="imagen"
      id="hiddenInput"
      class="d-none"
    >
    </v-file-input>
    <v-btn
      icon="mdi-camera-plus"
      size="x-large"
      color="black"
      :loading="isLoading"
      @click="clickInput()"
    >
    </v-btn>
  </div>
  <DialogMensajeRequest
    v-if="dialogMensaje"
    :mensaje="`Ocurrio el siguiente error: ${razonError}`"
    :fallo="dialogRequestExitoso.fallo"
    :mensaje-error="`${dialogRequestExitoso.mensajeError}`"
  />
</template>
