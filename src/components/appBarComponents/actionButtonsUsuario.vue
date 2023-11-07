<script setup lang="ts">
import { useRouter } from "vue-router";
import { drawer } from "@/variables/store";
import FormCrear from "../formCrear.vue";

const router = useRouter();
function goToHome() {
  router.push({
    name: "viewNombres",
  });
  drawer.setVisitedUsuariosView(false);
}
</script>
<template>
  <div>
    <v-btn color="blue-darken-1" variant="tonal" @click="goToHome"
      >Regresar</v-btn
    >
    <FormCrear tipo="usuarios" />
  </div>
</template>
