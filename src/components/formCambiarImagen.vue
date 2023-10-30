<script setup lang="ts">
import { useCambiarImagen } from "@/customHooks/useCambiarImagen";
import { ref } from "vue";
import { Form } from "vee-validate";
const props = defineProps<{
  imageUrl: string;
  idAnillo: number;
}>();

const isLoading = ref(false);
const { submit, imagen } = useCambiarImagen(props.imageUrl, props.idAnillo);

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
    <form @submit.prevent="submit">
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
      >
      </v-file-input>
      <v-btn
        icon="mdi-camera-plus"
        size="x-large"
        color="black"
        :loading="isLoading"
        type="submit"
      >
      </v-btn>
    </form>
  </div>
</template>
