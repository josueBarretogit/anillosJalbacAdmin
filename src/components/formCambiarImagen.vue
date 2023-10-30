<script setup lang="ts">
import { useCambiarImagen } from "@/customHooks/useCambiarImagen";
import { ref } from "vue";
const props = defineProps<{
  imageUrl: string;
}>();

const isLoading = ref(false);
const { submit, imagen } = useCambiarImagen(props.imageUrl);

function clickInput() {
  const input: HTMLElement | null = document.getElementById("hiddenInput");
  input?.click();
}

function hola() {
  alert("hola");
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
      v-model="imagen.value.value"
      :error-messages="imagen.errorMessage.value"
      id="hiddenInput"
      class="d-none"
      @update:model-value="submit()"
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
