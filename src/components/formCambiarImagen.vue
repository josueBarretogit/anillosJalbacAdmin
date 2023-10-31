<script setup lang="ts">
import { useCambiarImagen } from "@/customHooks/useCambiarImagen";
import { ref } from "vue";
import { Form } from "vee-validate";
const props = defineProps<{
  imageUrl: string;
  idAnillo: number;
}>();

const isLoading = ref(false);

const imagen = ref<File[]>([]);
function clickInput() {
  const input: HTMLElement | null = document.getElementById("hiddenInput");
  input?.click();
}
async function submitImage() {
  const valuesForm = new FormData();
  valuesForm.append("image", imagen?.value?.[0] as File);
  console.log(imagen.value);
  // const response = await replaceImage(valuesForm, id, token as string);

  // console.log(response);
  // isLoading.value = false;
  // if (!(response instanceof AxiosError)) {
  //   showRazonError.value = false;
  //   dialogRequestExitoso.setIsShow(true);
  //   creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
  // } else {
  //   razonError.value = (response as CreateError).response.data;
  //   showRazonError.value = true;
  // }
  //
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
      @update:model-value="submitImage()"
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
