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
const props = defineProps<{
  imageUrl: string;
  idAnillo: number;
}>();

const razonError = ref<unknown>("");
const showRazonError = ref(false);

const isLoading = ref(false);

const token = localStorage.getItem("accessToken");

const imagen = ref<File[]>([]);
function clickInput() {
  const input: HTMLElement | null = document.getElementById("hiddenInput");
  input?.click();
}
async function submitImage(data: File[]) {
  console.log(data);
  imagen.value = data;
  const valuesForm = new FormData();
  valuesForm.append("image", imagen?.value?.[0] as File);
  console.log(imagen.value[0]);

  imageReplacing.setIsLoading(true);

  const response = await replaceImage(
    valuesForm,
    props.idAnillo,
    token as string,
  );

  console.log(response);
  isLoading.value = false;
  if (!(response instanceof AxiosError)) {
    showRazonError.value = false;
    creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
    imageReplacing.setIsLoading(false);
  } else {
    razonError.value = (response as CreateError).response.data;
    showRazonError.value = true;
  }
}
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
      @update:model-value="submitImage($event)"
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
</template>
