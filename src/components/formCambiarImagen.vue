<script setup lang="ts">
import { useCambiarImagen } from "@/customHooks/useCambiarImagen";
const props = defineProps<{
  imageName: string;
}>();

const { submit } = useCambiarImagen(props.imageName);
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <v-btn type="submit">Cambiar imagen</v-btn>
    </form>
  </div>
</template>
