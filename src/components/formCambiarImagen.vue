<script setup lang="ts">
import { AxiosError } from "axios";
import { replaceImage } from "@/services/anilloApi";
import { ref } from "vue";
import {
  dialogRequestExitoso,
  creacionAnillos,
  imageReplacing,
} from "@/variables/store";

import type { CreateError } from "@/interfaces/interfaces";
import { useCambiarImagen } from "@/customHooks/useCambiarImagen";
const props = defineProps<{
  idAnillo: number;
}>();
const { clickInput, submitImage, imagen } = useCambiarImagen(props.idAnillo);
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
      :loading="imageReplacing.isLoading"
      @click="clickInput()"
    >
    </v-btn>
  </div>
</template>
